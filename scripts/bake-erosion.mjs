// v15-B: ビルド時侵食ベイク。
// src/render/terrain.ts の reliefRaw/flatMaskRaw を node で直接呼び、D8 流域蓄積 +
// 流水侵食（滑積場を太ばかせた V 谷掘り + 勾配折れ曲がり堆積）を 1024² グリッドで解く。
//   実行: node scripts/bake-erosion.mjs   （地形関数を変えたら必ず再実行 → 再ビルド）
// フォーマット（全 LE）:
//   @0  'ERA1' | u32 N | u32 ver(=1) | u32 rsv | f64 cell | f64 minCoord
//   @32  N²×uint32  R32UI  low16=round(δ*256)+32768（δ は m）  high16=wear*65535
//   @32+N²·4  N²×RGBA8  r=128+nx·127  g=128+nz·127（法線ティルト）  b=wear  a=堆積
import { build } from 'esbuild';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';

const N = 1024;
const CELL = 44; // 1 texel = 44 m（±22.5 km を覆う）
const MIN = -(N * CELL) / 2;

mkdirSync('scripts/.bake-tmp', { recursive: true });
mkdirSync('public', { recursive: true });
// v23: terrain.ts → textures.ts → prime.ts が ?worker を import する（bake では実行されないが
// bundle 解決は必要）→ no-op スタブで置換
const workerStub = {
  name: 'worker-stub',
  setup(b) {
    b.onResolve({ filter: /\?worker$/ }, (a) => ({ path: a.path, namespace: 'wstub' }));
    b.onLoad({ filter: /.*/, namespace: 'wstub' }, () => ({
      contents: 'export default class { postMessage() {} terminate() {} addEventListener() {} removeEventListener() {} }',
      loader: 'js'
    }));
  }
};
await build({
  entryPoints: ['src/render/terrain.ts'],
  bundle: true, format: 'esm', platform: 'node', target: 'node18',
  external: ['three'], outfile: 'scripts/.bake-tmp/terrain.mjs', logLevel: 'error',
  plugins: [workerStub],
});
const T = await import('./.bake-tmp/terrain.mjs');

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const idx = (i, j) => j * N + i;
const clampC = (k) => Math.max(0, Math.min(N - 1, k));

// ── 1) 基礎場 ──
const t0 = Date.now();
const h0 = new Float64Array(N * N);
const flat = new Float32Array(N * N);
for (let j = 0; j < N; j++) {
  const z = MIN + (j + 0.5) * CELL;
  for (let i = 0; i < N; i++) {
    const x = MIN + (i + 0.5) * CELL;
    h0[idx(i, j)] = T.reliefRaw(x, z);
    flat[idx(i, j)] = T.flatMaskRaw(x, z);
  }
}
console.log(`sample ${((Date.now() - t0) / 1000).toFixed(1)}s`);

// ── 2) D8 下流 + 流域蓄積（高さ降順 bucket sort）──
const down = new Int32Array(N * N).fill(-1);
const slope = new Float32Array(N * N);
for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
  const k = idx(i, j); const h = h0[k];
  let best = 0, bj = -1;
  for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
    if (!di || !dj) continue;
    const ii = i + di, jj = j + dj;
    if (ii < 0 || jj < 0 || ii >= N || jj >= N) continue;
    const s = (h - h0[idx(ii, jj)]) / (Math.hypot(di, dj) * CELL);
    if (s > best) { best = s; bj = idx(ii, jj); }
  }
  down[k] = bj; slope[k] = best;
}
const qx = (v) => Math.max(0, Math.min(65534, Math.round((v + 900) * 2)));
const buckets = new Int32Array(65536);
for (let k = 0; k < N * N; k++) buckets[qx(h0[k])]++;
let run = 0;
for (let b = 65535; b >= 0; b--) { const c = buckets[b]; buckets[b] = run; run += c; }
const order = new Int32Array(N * N);
for (let k = 0; k < N * N; k++) order[buckets[qx(h0[k])]++] = k;
const accum = new Float32Array(N * N).fill(1);
for (let n = 0; n < N * N; n++) {
  const k = order[n]; const j = down[k];
  if (j >= 0) accum[j] += accum[k];
}

// 蓄積場を太ばせる（半径2×2パス ≈ 谷幅 250〜600m。1セル幅の刻明な水路を谷地形へ変換）
const blur = (src, r, passes) => {
  let cur = Float32Array.from(src);
  for (let p = 0; p < passes; p++) {
    const nx = new Float32Array(N * N);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      let acc = 0, w = 0;
      for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) {
        acc += cur[idx(clampC(i + di), clampC(j + dj))]; w++;
      }
      nx[idx(i, j)] = acc / w;
    }
    cur = nx;
  }
  return cur;
};
const accumB = blur(accum, 2, 2);
console.log(`flow ${((Date.now() - t0) / 1000).toFixed(1)}s  accum max=${accum.reduce((a, b) => Math.max(a, b), 0) | 0}`);

// ── 3) 侵食＋堆積（単一パス）──
const delta = new Float32Array(N * N);
const dep = new Float32Array(N * N);
const carveArr = new Float32Array(N * N);
const wear = new Float32Array(N * N);
for (let n = 0; n < N * N; n++) {
  const k = order[n];
  const h = h0[k];
  const upland = smooth(2, 26, h);
  if (upland <= 0 || flat[k] < 0.02) continue;
  const amp = 8 + 46 * smooth(200, 1600, h);
  const v = smooth(18, 420, accumB[k]) * smooth(0.006, 0.05, slope[k]) * (0.45 + 0.55 * smooth(800, 20000, accumB[k]));
  const carve = Math.min(amp, amp * v * 2.7);
  if (carve < 0.05) continue;
  carveArr[k] = carve;
  wear[k] = Math.min(1, 0.55 * Math.min(1, carve / amp) + 0.45 * smooth(500, 20000, accumB[k]));
  const j = down[k];
  if (j >= 0) {
    const break0 = 1 - Math.min(1, Math.max(0, slope[j] / Math.max(slope[k], 1e-4)));
    dep[j] += carve * 0.8 * break0 * smooth(2, 26, h0[j]);
  }
}
// 堆積が大きいセルは自らの掘削を打ち消す（扇状地は盛土、河谷继续部は掘り残し減）
for (let k = 0; k < N * N; k++) {
  const d = dep[k];
  if (d < 0.05 && carveArr[k] < 0.05) continue;
  delta[k] = -carveArr[k] * Math.max(0, 1 - Math.min(0.92, d / Math.max(d, 10))) + Math.min(26, d);
}
for (let k = 0; k < N * N; k++) delta[k] = Math.max(-72, Math.min(26, delta[k]));

// ── 4) マスク（空港不変・海岸フェード・タイル端窓）⇄ 平滑 ──
const applyMask = () => {
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const k = idx(i, j);
    const win = smooth(0, 3, i) * smooth(0, 3, j) * smooth(0, 3, N - 1 - i) * smooth(0, 3, N - 1 - j);
    delta[k] *= smooth(0.02, 0.25, flat[k]) * win;
  }
};
applyMask();
delta.set(blur(delta, 1, 2)); // 3×3×2 — 稜線波長 300m+ は保持、セルジャギのみ除去
applyMask();

// ── 5) エンコード + 検証 ──
const ero = new Uint32Array(N * N);
const shade = new Uint8Array(N * N * 4);
let maxD = 0, maxU = 0, nWear = 0, airportLeak = 0;
for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
  const k = idx(i, j);
  const d = delta[k];
  maxD = Math.max(maxD, -d); maxU = Math.max(maxU, d);
  if (wear[k] > 0.3) nWear++;
  const du = Math.max(0, Math.min(65535, Math.round(d * 256) + 32768)) & 0xffff;
  ero[k] = du | (Math.round(Math.min(1, wear[k]) * 65535) << 16);
  const x = MIN + (i + 0.5) * CELL, z = MIN + (j + 0.5) * CELL;
  if (T.flatMaskRaw(x, z) < 0.02 && Math.abs(d) > 1e-4) airportLeak++;
  const gx = (delta[idx(clampC(i + 1), j)] - delta[idx(clampC(i - 1), j)]) / (2 * CELL);
  const gz = (delta[idx(i, clampC(j + 1))] - delta[idx(i, clampC(j - 1))]) / (2 * CELL);
  const cl = (v) => Math.max(0, Math.min(255, Math.round(v)));
  shade[k * 4] = cl(128 - gx * 0.75 * 127);
  shade[k * 4 + 1] = cl(128 - gz * 0.75 * 127);
  shade[k * 4 + 2] = cl(wear[k] * 255);
  shade[k * 4 + 3] = cl(Math.min(1, dep[k] / 18) * 255);
}
// ── 5.5) v23: 光場（512²）— ベイク AO + 太陽2方向影 + 流域流量 ──
// 太陽影マップは ±2800m までなので遠景の山影は出ない → 高さ場から静的に焼く。
// 時刻プリセットは昼(0.82)/夕(0.12)/夜 の固定なので影は 2 方向ぶん用意し GPU で mipmap 風の
// mix を選ぶ。AO は 8 方向円錐標本（谷の収斂影）。flow は D8 蓄積の対数正規化。
const H = N >> 1;
const CELL2 = CELL * 2;
{ const accs = new Float32Array(accum).sort();
  console.log(`accum p50=${accs[accs.length * 0.5] | 0} p99=${accs[accs.length * 0.99] | 0} p99.9=${accs[accs.length * 0.999] | 0} p99.99=${accs[accs.length * 0.9999] | 0}`); }
const tL0 = Date.now();
const hFin = new Float32Array(H * H);
for (let j = 0; j < H; j++) for (let i = 0; i < H; i++) {
  let sv = 0;
  for (let dj = 0; dj < 2; dj++) for (let di = 0; di < 2; di++) {
    const kk = idx(i * 2 + di, j * 2 + dj);
    sv += h0[kk] + delta[kk];
  }
  hFin[j * H + i] = sv * 0.25;
}
const clH = (k) => Math.max(0, Math.min(H - 1, k));
const smp = (i, j) => hFin[clH(Math.round(j)) * H + clH(Math.round(i))];
// 太陽（config/environment.ts と対応）: day sinEl=0.82 / sunset sinEl=0.12、方位 SUN_DIR xz=(0.55,0.28) 正規化
const SUNX = 0.55 / Math.hypot(0.55, 0.28), SUNZ = 0.28 / Math.hypot(0.55, 0.28);
const suns = [
  { sin: 0.82 }, // 昼
  { sin: 0.12 }  // 夕
];
for (const su of suns) {
  const cos = Math.sqrt(Math.max(1e-4, 1 - su.sin * su.sin));
  su.tan = su.sin / cos;
  // 水平单位方向（逆光）のみ — 高度は tan*水平距離で ray 高さを作る（march と同一物差し）
  su.dx = -SUNX; su.dz = -SUNZ;
}
const SH_STEP = CELL2 * 2.5; // 220m
const SH_N = 24;             // ≈5.3km
const AO_DIRS = 8, AO_N = 14, AO_STEP = CELL2;
const light = new Uint8Array(H * H * 4);
let aoSum = 0, shSum = [0, 0], flowPix = 0;
for (let j = 0; j < H; j++) {
  for (let i = 0; i < H; i++) {
    const k = j * H + i;
    const hC = hFin[k];
    // 影（2 太陽方向・サンプル行を共有する単一 march）
    const sh = [1, 1];
    let d1 = 0, d2 = 0;
    for (let t = 1; t <= SH_N; t++) {
      const dist = t * SH_STEP;
      const hs0 = smp(i + suns[0].dx * t * 2.5, j + suns[0].dz * t * 2.5);
      const hs1 = smp(i + suns[1].dx * t * 2.5, j + suns[1].dz * t * 2.5);
      d1 = Math.max(d1, hs0 - (hC + suns[0].tan * dist));
      d2 = Math.max(d2, hs1 - (hC + suns[1].tan * dist));
    }
    const ss = (dd) => { const v = 1 - Math.min(1, Math.max(0, dd / 26)); return v * v * (3 - 2 * v); };
    sh[0] = ss(d1); sh[1] = ss(d2);
    shSum[0] += sh[0]; shSum[1] += sh[1];
    // AO: 8 方向 × 14 ステップの傾き最大値で遮蔽率
    let aoAcc = 0;
    for (let d = 0; d < AO_DIRS; d++) {
      const ang = (d / AO_DIRS) * Math.PI * 2;
      const ux = Math.cos(ang), uz = Math.sin(ang);
      let mx = 0;
      for (let t = 1; t <= AO_N; t++) {
        const hs = smp(i + ux * t, j + uz * t);
        const slopeV = (hs - hC) / (t * AO_STEP);
        if (slopeV > mx) mx = slopeV;
      }
      aoAcc += Math.min(1, Math.max(0, mx * 1.45));
    }
    const ao = 1 - 0.72 * (aoAcc / AO_DIRS);
    aoSum += ao;
    // 流量（accum 2×2 平均の対数正規化）＋空港平坦域では川を描かない
    // 川筋は 1〜2 セル幅なので細密 accum の 2×2 max を採用（平均だと細い川が消える）
    let acc4 = 0;
    for (let dj = 0; dj < 2; dj++) for (let di = 0; di < 2; di++) acc4 = Math.max(acc4, accum[idx(i * 2 + di, j * 2 + dj)]);
    let fl = Math.log(1 + acc4 / 110) / Math.log(1 + 2600 / 110);
    fl = Math.max(0, Math.min(1, fl));
    let flat4 = 0;
    for (let dj = 0; dj < 2; dj++) for (let di = 0; di < 2; di++) flat4 += flat[idx(i * 2 + di, j * 2 + dj)];
    if (flat4 > 1.4) fl = 0;
    if (fl > 0.3) flowPix++;
    const q = (v) => Math.max(0, Math.min(255, Math.round(v * 255)));
    light[k * 4] = q(ao); light[k * 4 + 1] = q(sh[0]); light[k * 4 + 2] = q(sh[1]); light[k * 4 + 3] = q(fl);
  }
}
console.log(`light ${((Date.now() - tL0) / 1000).toFixed(1)}s  ao_mean=${(aoSum / (H * H)).toFixed(3)} shDay_mean=${(shSum[0] / (H * H)).toFixed(3)} shDusk_mean=${(shSum[1] / (H * H)).toFixed(3)} flow>0.3=${(100 * flowPix / (H * H)).toFixed(2)}%`);
const aoMean = aoSum / (H * H), flowCov = 100 * flowPix / (H * H);
if (!(aoMean > 0.4 && aoMean < 0.995)) { console.error('BAKE AO NG'); process.exit(1); }
if (!(flowCov > 0.05 && flowCov < 9)) { console.error('BAKE FLOW NG'); process.exit(1); }

const header = new ArrayBuffer(32);
const hv = new DataView(header);
hv.setUint8(0, 69); hv.setUint8(1, 82); hv.setUint8(2, 65); hv.setUint8(3, 50); // 'ERA2'（v23: +light 場）
hv.setUint32(4, N, true); hv.setUint32(8, 1, true); hv.setUint32(12, 0, true);
hv.setFloat64(16, CELL, true); hv.setFloat64(24, MIN, true);
writeFileSync('public/terrain-bake.bin', Buffer.concat([
  Buffer.from(header), Buffer.from(ero.buffer), Buffer.from(shade.buffer), Buffer.from(light.buffer),
]));

const bb = readFileSync('public/terrain-bake.bin');
const back = new Uint32Array(bb.buffer, bb.byteOffset + 32, N * N);
let worst = 0;
for (let k = 0; k < N * N; k += 37) worst = Math.max(worst, Math.abs(((back[k] & 0xffff) - 32768) / 256 - delta[k]));
console.log(`bake: carve_max=${maxD.toFixed(1)}m deposit_max=${maxU.toFixed(1)}m wear>0.3=${(100 * nWear / (N * N)).toFixed(1)}% airportLeak=${airportLeak} roundtripErr=${worst.toFixed(5)}m size=${((32 + N * N * 8 + H * H * 4) / 1e6).toFixed(1)}MB ${((Date.now() - t0) / 1000).toFixed(1)}s`);
if (airportLeak > 0 || worst > 0.004 || maxD < 8) { console.error('BAKE VALIDATION FAILED'); process.exit(1); }
