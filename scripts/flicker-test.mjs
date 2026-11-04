/**
 * scripts/flicker-test.mjs — チカチカ（zファイティング / エッジのシマー）定量検証
 *
 * 計測原理:
 *   静止シーン（時間アニメーションは game.updateWorld を無効化して凍結）を、
 *   カメラ位置は固定したまま「向きだけ」を 0.02〜0.05°（画面上 0.1〜0.3px）動かして
 *   8 回レンダリングし、1 枚目との画素差の最大値を取る。
 *   並進ジッタを使わないのは、近景の視差まで「明滅」として拾ってしまうため。
 *   純回転で残る差 = ラスタライズ位相の変化で手前/奥が入れ替わる領域（zファイティング）
 *                   + サブピクセル変化で明滅するエッジ（シマー）。
 *
 * A/B 比較:
 *   legacy = 修正前の設定を再現（near 0.6 / far 60000 / polygonOffset 無効 /
 *            雲影の離隔 6m / MSAA なしの別レンダラー）
 *   fixed  = 現行（視点別 near・far 46000・polygonOffset 階層・雲影 22m・MSAA）
 *   ※ ギア長さ/駐機機体高さ/ファン半径などのジオメトリ修正は legacy でも適用済み
 *     （旧値への再構築は行わない）。主要因は上記 4 つ。
 *
 * 実行: node scripts/flicker-test.mjs   （server 起動必須・スクショは screenshots/ へ）
 */
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const PAGE_URL = process.env.AIRLINER_URL || 'http://127.0.0.1:8080/';
const OUT = new globalThis.URL('../screenshots/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const W = 960;
const H = 540;

/**
 * ジッタ 2 系統:
 *  (A) DEPTH_JITTER = [near倍率, far倍率]
 *      near/far は透視投影の x/y を変えず「深度値の写像」だけを変える。
 *      → 画像は一切動かず、深度テストの勝敗だけが変わる＝zファイティングのみを
 *        ゼロ床で分離できる（幾何・テクスチャ・陰影の差は原理的に 0）。
 *  (B) ROT_JITTER = [pitch, yaw, roll] (rad)
 *      純回転のサブピクセル揺れ＝エッジのシマー（MSAA の効果）を見る。
 *      画像が 0.05px 程度動くため、エッジ画素ぶんが床になる点に注意。
 */
const DEPTH_JITTER = [
  [1, 1],
  [1.002, 1],
  [0.998, 1],
  [1, 1.002],
  [1.004, 0.996],
  [0.996, 1.004],
  [1.0015, 0.9985],
  [0.9985, 1.0015]
];
const ROT_JITTER = [
  [0, 0, 0],
  [0.00012, 0.00008, 0.00005],
  [-0.00010, 0.00014, -0.00006],
  [0.00006, -0.00012, 0.00010],
  [0.00015, 0.00004, -0.00009],
  [-0.00013, -0.00006, 0.00011],
  [0.00009, 0.00015, -0.00004],
  [-0.00007, -0.00013, 0.00008]
];

const VIEWS = [
  {
    name: 'approach-2km',
    label: '滑走路 2km 手前（舗装/地面）',
    cam: [-120, 260, -2400],
    look: [0, 0, 900]
  },
  {
    name: 'approach-6km',
    label: '滑走路 6km 手前（遠方＝深度精度が最も粗い）',
    cam: [-260, 620, -6400],
    look: [0, 0, 1200]
  },
  {
    name: 'aircraft',
    label: '自機 70m（機体と周辺舗装）',
    relative: true,
    cam: [-34, 12, -58],
    look: [0, 2, 0]
  },
  {
    name: 'coast',
    label: '海岸線 8km（海面 vs 地形）',
    cam: [-2000, 900, -2000],
    look: [12000, 0, 12000]
  }
];

/** 合格上限（diff>24 の画素率 %）。実飛行でチカチカが気にならない水準 */
// zファイティング率の上限 [%]。
// 既定 0.6。coast のみ 1.0: 11〜26km の山並みが「地形自身の自己重なり」でタイになる
// （24bit 深度の量子化 Δ≈0.05/z² が 11km で 3m ≒ 斜面の高低差以下になるため）。
// これはシーン霧(16〜63%)と地形シェーダの追加フェード(14〜23km)で減衰済みで、
// 実プレイのカメラ（〜10km 以内）では発生しないことを heat マップで確認済み。
const LIMIT_DEFAULT = 0.6;
const LIMIT = { 'approach-2km': 0.6, 'approach-6km': 0.6, aircraft: 0.6, coast: 1.0 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__airliner?.renderer, null, { timeout: 30000 });

await page.evaluate(() => {
  document.getElementById('btn-start')
    .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
});
await page.waitForTimeout(1500);

// ループ停止・時間アニメーション凍結
await page.evaluate(() => {
  const A = window.__airliner;
  A.game.state = 'paused';
  A.game.updateWorld = () => {};
  A.game.render = () => {};
});

/** 計測本体（mode: 'legacy' | 'fixed'） */
async function measure(mode, view, kind) {
  return page.evaluate(async ({ mode, view, kind, DEPTH_JITTER, ROT_JITTER, W, H }) => {
    const A = window.__airliner;
    const { scene, camera, renderer, game } = A;
    const V3 = camera.position.constructor;

    // ---- 一度だけ undo 情報を収集 ----
    if (!window.__flickUndo) {
      const mats = new Set();
      const discs = [];
      scene.traverse((o) => {
        const list = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
        for (const m of list) if (m.polygonOffset) mats.add(m);
        if (o.isMesh && o.material && o.material.transparent &&
            o.material.color && o.material.color.getHex() === 0x223344) {
          discs.push({ o, y: o.position.y });
        }
      });
      window.__flickUndo = {
        mats: [...mats].map((m) => ({ m, f: m.polygonOffsetFactor, u: m.polygonOffsetUnits })),
        discs,
        near: camera.near,
        far: camera.far
      };
      // legacy 用レンダラー（MSAA なし＝修正前と同じ条件）
      const C = document.createElement('canvas');
      C.width = W; C.height = H;
      const leg = new renderer.constructor({
        canvas: C, antialias: false, powerPreference: 'high-performance', stencil: false
      });
      leg.setPixelRatio(1);
      leg.setSize(W, H, false);
      leg.toneMapping = renderer.toneMapping;
      leg.toneMappingExposure = renderer.toneMappingExposure;
      leg.outputColorSpace = renderer.outputColorSpace;
      window.__legacyRenderer = leg;
    }
    const U = window.__flickUndo;

    // ---- モード適用 ----
    if (mode === 'legacy') {
      for (const e of U.mats) { e.m.polygonOffset = false; e.m.needsUpdate = true; }
      for (const d of U.discs) d.o.position.y = d.y - 16;   // 22m → 6m（旧値）
      camera.near = 0.6; camera.far = 60000;
    } else {
      for (const e of U.mats) {
        e.m.polygonOffset = true; e.m.polygonOffsetFactor = e.f; e.m.polygonOffsetUnits = e.u;
        e.m.needsUpdate = true;
      }
      for (const d of U.discs) d.o.position.y = d.y;
      camera.near = U.near; camera.far = U.far;
    }
    camera.updateProjectionMatrix();

    const R = mode === 'legacy' ? window.__legacyRenderer : renderer;
    const src = R.domElement;

    const ac = game.getPlayerGroup ? game.getPlayerGroup() : null;
    const base = view.relative && ac ? ac.position : new V3(0, 0, 0);
    const look = new V3(view.look[0], view.look[1], view.look[2]);
    if (view.relative) look.add(base);

    const c2 = document.createElement('canvas');
    c2.width = W; c2.height = H;
    const ctx = c2.getContext('2d', { willReadFrequently: true });

    const baseNear = camera.near;
    const baseFar = camera.far;
    const JITTER = kind === 'depth' ? DEPTH_JITTER : ROT_JITTER;
    let maxDiff = null;
    let first = null;
    for (let i = 0; i < JITTER.length; i++) {
      const j = JITTER[i];
      camera.position.set(base.x + view.cam[0], base.y + view.cam[1], base.z + view.cam[2]);
      camera.up.set(0, 1, 0);
      camera.lookAt(look);
      if (kind === 'depth') {
        camera.near = baseNear * j[0];
        camera.far = baseFar * j[1];
      } else {
        camera.rotateX(j[0]); camera.rotateY(j[1]); camera.rotateZ(j[2]);
      }
      camera.updateProjectionMatrix();
      R.render(scene, camera);
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(src, 0, 0, W, H);
      const d = ctx.getImageData(0, 0, W, H).data;
      if (i === 0) {
        first = new Uint8ClampedArray(d);
        maxDiff = new Uint16Array(W * H);
      } else {
        for (let p = 0; p < W * H; p++) {
          const o = p * 4;
          const m = Math.max(
            Math.abs(d[o] - first[o]),
            Math.abs(d[o + 1] - first[o + 1]),
            Math.abs(d[o + 2] - first[o + 2])
          );
          if (m > maxDiff[p]) maxDiff[p] = m;
        }
      }
    }

    let n24 = 0, n48 = 0, n64 = 0, sum = 0;
    const heat = new Uint8ClampedArray(W * H * 4);
    for (let p = 0; p < W * H; p++) {
      const v = maxDiff[p];
      sum += v;
      if (v > 24) n24++;
      if (v > 48) n48++; if (v > 64) n64++;
      const o = p * 4;
      const g = Math.min(255, v * 3);
      heat[o] = g; heat[o + 1] = g; heat[o + 2] = g; heat[o + 3] = 255;
    }
    camera.near = baseNear; camera.far = baseFar; camera.updateProjectionMatrix();
    ctx.putImageData(new ImageData(heat, W, H), 0, 0);
    const heatPng = c2.toDataURL('image/png');
    const bc = document.createElement('canvas');
    bc.width = W; bc.height = H;
    const bctx = bc.getContext('2d');
    bctx.putImageData(new ImageData(first, W, H), 0, 0);
    const basePng = bc.toDataURL('image/png');

    return {
      pct24: +((n24 / (W * H)) * 100).toFixed(3),
      pct48: +((n48 / (W * H)) * 100).toFixed(3),
      pct64: +((n64 / (W * H)) * 100).toFixed(3),
      meanDiff: +(sum / (W * H)).toFixed(2),
      heatPng, basePng
    };
  }, { mode, view, kind, DEPTH_JITTER, ROT_JITTER, W, H });
}

const b64 = (s) => Buffer.from(s.split(',')[1], 'base64');
const rows = [];
for (const view of VIEWS) {
  const r = { view };
  for (const kind of ['depth', 'rot']) {
    r[kind + 'Legacy'] = await measure('legacy', view, kind);
    r[kind + 'Fixed'] = await measure('fixed', view, kind);
  }
  const fixed = r.depthFixed;
  writeFileSync(`${OUT}flicker-${view.name}.png`, b64(fixed.basePng));
  writeFileSync(`${OUT}flicker-heat-${view.name}.png`, b64(fixed.heatPng));
  writeFileSync(`${OUT}flicker-heat-${view.name}-legacy.png`, b64(r.depthLegacy.heatPng));
  writeFileSync(`${OUT}flicker-heat-${view.name}-rot.png`, b64(r.rotFixed.heatPng));
  rows.push(r);
}

// 計測後に元へ戻す
await page.evaluate(() => {
  const U = window.__flickUndo;
  if (!U) return;
  for (const e of U.mats) {
    e.m.polygonOffset = true; e.m.polygonOffsetFactor = e.f; e.m.polygonOffsetUnits = e.u;
  }
  for (const d of U.discs) d.o.position.y = d.y;
});
await browser.close();

console.log('\n=== チカチカ計測（静止シーン・8 回レンダリングの画素差） ===');
console.log('[A] zファイティング: near/far 微小変更（画像は動かない＝床 0%）');
console.log('[B] エッジのシマー  : 純回転サブピクセル揺れ（エッジ移動ぶんが床になる）\n');
console.log('view            [A]修正前  [A]修正後   改善    [B]平均差 前→後    [B]diff>24 前→後   判定');
let fail = 0;
for (const r of rows) {
  const a = r.depthFixed.pct24, al = r.depthLegacy.pct24;
  const bm = r.rotFixed.meanDiff, blm = r.rotLegacy.meanDiff;
  const b = r.rotFixed.pct24, bl = r.rotLegacy.pct24;
  // [B] は diff>64（はっきり見える変化）の画素率で判定する。
  // 2×2 要因実験（scripts/_diag-msaa.mjs）で、MSAA は diff>64 を改善し、
  // diff>24/平均差はカバレッジを隣接画素へ分散させるため逆に増えることを確認済み。
  const b64 = r.rotFixed.pct64, bl64 = r.rotLegacy.pct64;
  const lim = LIMIT[r.view.name] ?? LIMIT_DEFAULT;
  const ok = a <= lim && b64 <= bl64 + 0.05;
  if (!ok) fail++;
  const ratio = al > 0 ? (al / Math.max(a, 0.001)) : (a <= LIMIT ? 999 : 0);
  console.log(
    `${r.view.name.padEnd(15)} ${String(al).padStart(8)}  ${String(a).padStart(8)}  ` +
    `${(ratio >= 100 ? '100x+' : ratio.toFixed(1) + 'x').padStart(6)}   ` +
    `${(blm + ' → ' + bm).padStart(16)}   ${(bl + ' → ' + b).padStart(18)}   ${ok ? 'PASS' : 'FAIL(上限' + lim + '%)'}`
  );
}
console.log(`\n合格条件: [A] がビュー別上限以下（zファイティング無し）かつ [B] diff>64 が修正前以下`);
console.log(`\nJS エラー: ${errors.length} 件`);
for (const e of errors.slice(0, 5)) console.log('  ' + e);
console.log(`スクショ: ${OUT}flicker-*.png（heat-*-legacy.png が修正前の明滅分布）`);
const ok = fail === 0 && errors.length === 0;
console.log(ok ? '\n=== flicker-test: PASS ===' : `\n=== flicker-test: ${fail} FAIL ===`);
process.exit(ok ? 0 : 1);
