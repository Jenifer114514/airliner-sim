/**
 * world/layout.ts — 世界配置の純計算（three.js/DOM 非依存）
 * 旧 render/city.ts・render/nature.ts にあった配置ループをそのまま移植した。
 * 【决定論の契約】rand() の消費順序を旧実装と完全一致させている（skips を含む）
 * ため、buildingColliders フィンガープリント（screenshots/v16/fp-*.json）は
 * 移行前後で一致する。worldgen worker とメインスレッド同期フォールバックの両方が
 * これを呼ぶ（単一実装）。
 * v16: 出力をバケット（2400m 格子）へ分割 → city/nature 側でチャンク単位の
 * Frustum Culling と Material LOD（近=フル/遠=簡易）に使う。
 */
import { makeRandom, clamp, valueNoise } from '../core/math.js';
import { terrainHeight, terrainBakeFlow } from './field.js';
import { smoothstep as sstep } from '../core/math.js';
import { AIRPORTS } from '../config/airports.js';

export const BUCKET = 2400;

export interface MeshData {
  m: Float32Array;   // 16n（column-major，Y 回転+縮尺+平行移動のみ）
  c: Float32Array;   // 3n（instanceColor）
  n: number;
}
export interface Bucket extends MeshData {
  cx: number; cy: number; cz: number; // LOD 距離判定中心
  r: number;                            // 水平半径（bounding 用参考）
}
export interface CityLayout {
  buckets: Bucket[];
  towers: MeshData;
  beacons: Float32Array;      // 3n（塔頂クンビーコン）
  colliders: Float64Array;    // 4n: x,z,r,top（旧 buildingColliders と同順。物理 FP のため float64 保持）
  roads: { pos: Float32Array; idx: Uint32Array };
  roadside: Float32Array;     // 3n: x,z,s（街路樹アンカー → nature が消費）
}
export interface NatureLayout { buckets: Bucket[]; n: number }
export interface WorldLayout { city: CityLayout; nature: NatureLayout }

/** Y 回転＋縮尺＋並進の TRS を column-major で直接合成（Object3D.updateMatrix と同値） */
function putM(a: Float32Array, i: number, x: number, y: number, z: number, rotY: number, sx: number, sy: number, sz: number): void {
  const c = Math.cos(rotY), s = Math.sin(rotY), o = i * 16;
  a[o] = c * sx; a[o + 1] = 0; a[o + 2] = -s * sx; a[o + 3] = 0;
  a[o + 4] = 0; a[o + 5] = sy; a[o + 6] = 0; a[o + 7] = 0;
  a[o + 8] = s * sz; a[o + 9] = 0; a[o + 10] = c * sz; a[o + 11] = 0;
  a[o + 12] = x; a[o + 13] = y; a[o + 14] = z; a[o + 15] = 1;
}

// ───────── バケットビルダ ─────────
class Buckets {
  private map = new Map<string, { x: number[]; z: number[]; y: number[]; m: number[]; c: number[] }>();
  add(x: number, z: number, y: number, m: ArrayLike<number>, c?: ArrayLike<number>): void {
    const key = `${Math.floor(x / BUCKET)},${Math.floor(z / BUCKET)}`;
    let b = this.map.get(key);
    if (!b) this.map.set(key, (b = { x: [], z: [], y: [], m: [], c: [] }));
    b.x.push(x); b.z.push(z); b.y.push(y);
    for (let k = 0; k < 16; k++) b.m.push(m[k]);
    if (c) for (let k = 0; k < 3; k++) b.c.push(c[k]);
    // m/c は ArrayLike（Float32Array 許容）
  }
  pack(): Bucket[] {
    const out: Bucket[] = [];
    for (const b of this.map.values()) {
      let sx = 0, sy = 0, sz = 0;
      for (let i = 0; i < b.x.length; i++) { sx += b.x[i]; sy += b.y[i]; sz += b.z[i]; }
      const cx = sx / b.x.length, cy = sy / b.x.length, cz = sz / b.x.length;
      let r = 0;
      for (let i = 0; i < b.x.length; i++) r = Math.max(r, Math.hypot(b.x[i] - cx, b.z[i] - cz));
      out.push({
        cx, cy, cz, r: r + 320,
        n: b.x.length,
        m: Float32Array.from(b.m),
        c: b.c.length ? Float32Array.from(b.c) : new Float32Array(b.x.length * 3)
      });
    }
    return out;
  }
}

// ───────── 市街地（旧 buildCity と同一順序）─────────
export function computeCity(cityCount: number): CityLayout {
  const rand = makeRandom(20261009);
  const buckets = new Buckets();
  const coll: number[] = [];
  const tm: number[] = [];
  const tc: number[] = [];
  const tPos: number[] = []; // タワー頂点（beacon 算出用）

  const CX = 7800, CZ = -3200, CELL = 210;
  const mw = new Float32Array(16), cw = new Float32Array(3);

  // ===== 市街ブロック =====
  for (let i = 0; i < cityCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 600 + Math.pow(rand(), 0.7) * 3400;
    const bx = CX + Math.cos(angle) * radius;
    const bz = CZ + Math.sin(angle) * radius * 0.8;
    const bcx = Math.round(bx / CELL) * CELL, bcz = Math.round(bz / CELL) * CELL;
    const ed = rand() < 0.5 ? 0 : 1;
    const sgn = (ed === 0 ? Math.sign(bx - bcx) : Math.sign(bz - bcz)) || 1;
    const along = (rand() - 0.5) * (CELL - 70);
    const x = ed === 0 ? bcx + sgn * (CELL / 2 - 26) : bcx + along;
    const z = ed === 1 ? bcz + sgn * (CELL / 2 - 26) : bcz + along;
    const rxx = (x - CX) / 1.24, rzz = z - CZ;
    const rt = 2450 + Math.sin(Math.atan2(rzz, rxx) * 5 + 1.3) * 190;
    if (Math.abs(Math.hypot(rxx, rzz) - rt) < 62) continue;
    const y = terrainHeight(x, z);
    if (y < 4) continue;
    const centerFactor = clamp(1 - radius / 3800, 0, 1);
    const suburb = radius > 2750 && rand() < 0.55;
    const h = suburb ? 9 + rand() * 15 : 22 + rand() * 90 * (0.35 + centerFactor * 1.4);
    const w = suburb ? 13 + rand() * 16 : 26 + rand() * 38;
    const d = suburb ? 13 + rand() * 16 : 26 + rand() * 38;
    const rotY = (rand() - 0.5) * 0.1;
    if (ed === 0) putM(mw, 0, x, y - 1, z, rotY, d, h, w);
    else putM(mw, 0, x, y - 1, z, rotY, w, h, d);
    const tint = 0.72 + rand() * 0.28;
    cw[0] = tint * 0.95; cw[1] = tint * 0.97; cw[2] = tint;
    buckets.add(x, z, y, mw, cw);
    coll.push(x, z, 0.4 * Math.hypot(w, d) + 3, y + h);
  }

  // ===== 超高層タワー（tMesh.count は ti で確定）=====
  const TOWERS = 46;
  const cores: [number, number, number][] = [
    [CX, CZ, 1.0], [CX + 1500, CZ + 900, 0.62], [CX - 1350, CZ - 650, 0.55], [CX + 350, CZ - 1500, 0.45]
  ];
  let ti = 0;
  for (let k = 0; k < cores.length && ti < TOWERS; k++) {
    const [ox, oz, w] = cores[k];
    const per = Math.min(k === 0 ? 22 : 8, TOWERS - ti);
    for (let j = 0; j < per; j++) {
      const a = rand() * Math.PI * 2;
      const rr = Math.pow(rand(), 0.8) * (k === 0 ? 620 : 380);
      const x = ox + Math.cos(a) * rr * 1.25;
      const z = oz + Math.sin(a) * rr;
      const y = terrainHeight(x, z);
      if (y < 5) continue;
      const h = 150 + Math.pow(rand(), 1.7) * 185 * (0.55 + w * 0.75);
      const bw = 24 + rand() * 20;
      const bd = 24 + rand() * 20;
      const ry = Math.round(rand() * 4) * (Math.PI / 2) + (rand() - 0.5) * 0.12;
      putM(mw, 0, x, y - 2, z, ry, bw, h, bd);
      for (let q = 0; q < 16; q++) tm.push(mw[q]);
      const gt = 0.82 + rand() * 0.18;
      tc.push(gt * 0.86, gt * 0.95, gt);
      tPos.push(x, y - 2, z, h);
      coll.push(x, z, 0.42 * Math.max(bw, bd) + 4, y + h);
      ti++;
    }
  }
  const beacons: number[] = [];
  for (let i = 0; i < tPos.length; i += 4) beacons.push(tPos[i], tPos[i + 1] + tPos[i + 3] - 2, tPos[i + 2]);

  // ===== 道路網（poly 生成→リボン/villagePts/roadside。旧 code と同一数式）=====
  interface V2 { x: number; y: number }
  const roads: V2[][] = [];
  const mkV = (x: number, y: number): V2 => ({ x, y });
  const addLine = (cx0: number, cz0: number, a: number, span: number): void => {
    const dx = Math.sin(a), dz = Math.cos(a);
    roads.push([mkV(cx0 - dx * span, cz0 - dz * span), mkV(cx0 + dx * span, cz0 + dz * span)]);
  };
  for (let i = 0; i < 3; i++) {
    const a = 0.5 + i * 0.55;
    addLine(CX - 2600 + i * 1900, CZ + 800, a, 4500);
  }
  roads.push([mkV(2100, -1900), mkV(3200, -2200), mkV(4500, -2600), mkV(6000, -3000), mkV(CX, CZ), mkV(CX + 800, CZ - 300)]);
  {
    const ring: V2[] = [];
    for (let i = 0; i <= 34; i++) {
      const a = (i / 34) * Math.PI * 2;
      const rr = 2450 + Math.sin(a * 5 + 1.3) * 190;
      ring.push(mkV(CX + Math.cos(a) * rr * 1.24, CZ + Math.sin(a) * rr));
    }
    roads.push(ring);
  }
  roads.push([mkV(CX - 2260, CZ + 420), mkV(1200, -1000), mkV(-1400, -2500)]);
  roads.push([mkV(CX + 1250, CZ + 1560), mkV(4100, 3600), mkV(2900, 6300)]);
  const gridRoadStart = roads.length;
  {
    const half = 3650;
    const inside = (px: number, pz: number) =>
      Math.hypot(px - CX, (pz - CZ) / 0.8) > 640 && Math.hypot(px - CX, (pz - CZ) / 0.8) < half;
    const n0 = Math.round((CX - half) / CELL), n1 = Math.round((CX + half) / CELL);
    const m0 = Math.round((CZ - half * 0.8) / CELL), m1 = Math.round((CZ + half * 0.8) / CELL);
    for (let n = n0; n <= n1; n++) {
      const px = (n + 0.5) * CELL;
      const poly: V2[] = [];
      let run = 0;
      for (let k = m0 - 2; k <= m1 + 2; k++) {
        const pz = (k + 0.5) * CELL;
        if (inside(px, pz)) { poly.push(mkV(px, pz)); run = 0; }
        else if (++run > 2 && poly.length) break;
      }
      if (poly.length > 2) roads.push(poly);
    }
    for (let m = m0; m <= m1; m++) {
      const pz = (m + 0.5) * CELL;
      const poly: V2[] = [];
      let run = 0;
      for (let k = n0 - 2; k <= n1 + 2; k++) {
        const px = (k + 0.5) * CELL;
        if (inside(px, pz)) { poly.push(mkV(px, pz)); run = 0; }
        else if (++run > 2 && poly.length) break;
      }
      if (poly.length > 2) roads.push(poly);
    }
  }

  const rPos: number[] = [];
  const rIdx: number[] = [];
  const villagePts: Array<[number, number, number, boolean]> = [];
  const roadside: number[] = [];
  let vBase = 0;
  for (let ri = 0; ri < roads.length; ri++) {
    const poly = roads[ri];
    const pts: V2[] = [];
    for (let i = 0; i < poly.length - 1; i++) {
      const n = Math.max(1, Math.round(Math.hypot(poly[i + 1].x - poly[i].x, poly[i + 1].y - poly[i].y) / 120));
      for (let k = 0; k < n; k++) {
        pts.push(mkV(poly[i].x + (poly[i + 1].x - poly[i].x) * (k / n), poly[i].y + (poly[i + 1].y - poly[i].y) * (k / n)));
      }
    }
    pts.push(mkV(poly[poly.length - 1].x, poly[poly.length - 1].y));
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const len = Math.hypot(next.x - prev.x, next.y - prev.y) || 1;
      const dx = (next.x - prev.x) / len, dz = (next.y - prev.y) / len;
      const nx = -dz, nz = dx;
      const hw = 11;
      if (i % 2 === 0) villagePts.push([pts[i].x, pts[i].y, Math.atan2(dz, dx), ri < gridRoadStart]);
      if (i % 6 === 2 && roadside.length < 4500) {
        for (const sd2 of [-1, 1] as const) {
          roadside.push(pts[i].x + nx * sd2 * 27, pts[i].y + nz * sd2 * 27, 0.72 + rand() * 0.55);
        }
      }
      const y = Math.max(terrainHeight(pts[i].x, pts[i].y) + 0.35, -2.6);
      rPos.push(pts[i].x + nx * hw, y, pts[i].y + nz * hw);
      rPos.push(pts[i].x - nx * hw, y, pts[i].y - nz * hw);
      if (i < pts.length - 1) {
        const a = vBase + i * 2;
        rIdx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    vBase += pts.length * 2;
  }

  // ===== 沿道集落（village）=====
  const VMAX = 620;
  let vi = 0;
  for (const [vx, vz, va, townOK] of villagePts) {
    if (vi >= VMAX - 2) break;
    const inner = Math.hypot(vx - CX, vz - CZ) < 4100;
    if (inner && !townOK) continue;
    let nearAp = false;
    for (const ap of AIRPORTS) if (Math.hypot(vx - ap.center.x, vz - ap.center.z) < 3700) nearAp = true;
    if (nearAp) continue;
    for (const side of [-1, 1] as const) {
      if (vi >= VMAX) break;
      if (!inner && rand() > 0.6) continue;
      const offd = (inner ? 62 : 56) + rand() * (inner ? 42 : 120);
      const nx2 = -Math.sin(va) * side, nz2 = Math.cos(va) * side;
      const x = vx + nx2 * offd + (rand() - 0.5) * 44;
      const z = vz + nz2 * offd + (rand() - 0.5) * 44;
      const y = terrainHeight(x, z);
      if (y < (inner ? 2.5 : 4)) continue;
      const hh = inner ? 9 + rand() * 15 : 7 + rand() * 16, ww = 12 + rand() * 15, dd = 12 + rand() * 15;
      putM(mw, 0, x, y - 1, z, va + (rand() - 0.5) * 0.3, ww, hh, dd);
      const vt = 0.78 + rand() * 0.22;
      cw[0] = vt; cw[1] = vt * 0.97; cw[2] = vt * 0.93;
      buckets.add(x, z, y, mw, cw);
      coll.push(x, z, 0.4 * Math.hypot(ww, dd) + 3, y + hh);
      vi++;
    }
  }

  // ===== 空港郊外ベルト =====
  const BMAX = 120;
  let bi = 0;
  for (const ap of AIRPORTS) {
    const per = Math.floor(BMAX / AIRPORTS.length);
    for (let i = 0; i < per && bi < BMAX; i++) {
      const a = rand() * Math.PI * 2;
      const rr = 3650 + rand() * 1500;
      const x = ap.center.x + Math.cos(a) * rr * 1.12;
      const z = ap.center.z + Math.sin(a) * rr;
      const y = terrainHeight(x, z);
      if (y < 4) continue;
      const hh = 8 + rand() * 20, ww = 16 + rand() * 30, dd = 16 + rand() * 30;
      putM(mw, 0, x, y - 1, z, Math.round(rand() * 4) * (Math.PI / 2), ww, hh, dd);
      const bt = 0.7 + rand() * 0.3;
      cw[0] = bt * 0.96; cw[1] = bt * 0.97; cw[2] = bt;
      buckets.add(x, z, y, mw, cw);
      coll.push(x, z, 0.4 * Math.hypot(ww, dd) + 3, y + hh);
      bi++;
    }
  }

  return {
    buckets: buckets.pack(),
    towers: { m: new Float32Array(tm), c: new Float32Array(tc), n: tm.length / 16 },
    beacons: new Float32Array(beacons),
    colliders: new Float64Array(coll),
    roads: { pos: new Float32Array(rPos), idx: new Uint32Array(rIdx) },
    roadside: new Float32Array(roadside)
  };
}

// ───────── 森林（旧 buildNature と同一順序）─────────
export function computeNature(roadside: Float32Array, treeCount: number): NatureLayout {
  const rand = makeRandom(777001);
  const buckets = new Buckets();
  const mw = new Float32Array(16), cw = new Float32Array(3);
  let placed = 0, guard = 0;
  while (placed < treeCount && guard++ < treeCount * 40) {
    const angle = rand() * Math.PI * 2;
    const radius = 3800 + rand() * 14000;
    const x = Math.cos(angle) * radius - 2000;
    const z = Math.sin(angle) * radius - 2000;
    const y = terrainHeight(x, z);
    if (y < 12) continue;
    // v23: 森林限界（GLSL 樹林帯の tl と同一式）— 頂上荒れノイズでゆらぐ林帯上限
    const tl = 760 + 300 * valueNoise(x * 0.00022 + 31.7, z * 0.00022 + 12.1);
    if (y > tl) continue;
    if (valueNoise(x * 0.00062 + 17.3, z * 0.00062 + 3.9) < 0.44) continue;
    const slope = Math.hypot(terrainHeight(x + 40, z) - y, terrainHeight(x, z + 40) - y) / 40;
    if (slope > 0.72) continue;
    // v23: 密度は湿度（流域蓄積＝谷筋・扇状地）と緩斜面に連動。ベイク無しは定数フォールバック
    const flow = terrainBakeFlow(x, z);
    const damp = (flow > 0 ? 0.30 + 0.85 * flow : 0.55) + 0.22 * (1 - sstep(0.25, 0.72, slope));
    if (rand() > Math.min(1, damp)) continue;
    const s = 0.8 + rand() * 1.5 * (0.8 + valueNoise(x * 0.004 + 5.5, z * 0.004 + 8.1) * 0.5);
    const rot = rand() * Math.PI * 2;
    const sy = s * (0.85 + rand() * 0.55);
    putM(mw, 0, x, y - 0.6, z, rot, s, sy, s);
    const tint = 0.72 + rand() * 0.45;
    cw[0] = tint * 0.9; cw[1] = tint; cw[2] = tint * 0.82;
    buckets.add(x, z, y, mw, cw);
    placed++;
  }
  for (const ap of AIRPORTS) {
    const N = 44;
    for (let i = 0; i < N && placed < treeCount; i++) {
      const a = (i / N) * Math.PI * 2 + (rand() - 0.5) * 0.06;
      const rel = a - ap.heading;
      if (Math.abs(Math.cos(rel)) > 0.62) continue;
      const rr = 3760 + rand() * 260;
      const x = ap.center.x + Math.cos(a) * rr * 1.14;
      const z = ap.center.z + Math.sin(a) * rr;
      const y = terrainHeight(x, z);
      if (y < 1) continue;
      const s2 = 1.0 + rand() * 0.9;
      const rot = rand() * Math.PI * 2;
      const sy2 = s2 * (0.9 + rand() * 0.5);
      putM(mw, 0, x, y - 0.6, z, rot, s2, sy2, s2);
      const tint = 0.68 + rand() * 0.4;
      cw[0] = tint * 0.88; cw[1] = tint; cw[2] = tint * 0.8;
      buckets.add(x, z, y, mw, cw);
      placed++;
    }
  }
  for (let r = 0; r + 2 < roadside.length; r += 3) {
    if (placed >= treeCount) break;
    const rx = roadside[r], rz = roadside[r + 1], rs = roadside[r + 2];
    const y = terrainHeight(rx, rz);
    if (y < 0.5) continue;
    const rot = rand() * Math.PI * 2;
    putM(mw, 0, rx, y - 0.5, rz, rot, rs, rs, rs);
    const tint = 0.8 + rand() * 0.3;
    cw[0] = tint * 0.72; cw[1] = tint; cw[2] = tint * 0.7;
    buckets.add(rx, rz, y, mw, cw);
    placed++;
  }
  return { buckets: buckets.pack(), n: placed };
}

/** worker 転送用：Transferable の一覧化 */
export function layoutTransfers(l: WorldLayout): Transferable[] {
  const t: Transferable[] = [];
  for (const b of l.city.buckets) t.push(b.m.buffer as Transferable, b.c.buffer as Transferable);
  t.push(l.city.towers.m.buffer as Transferable, l.city.towers.c.buffer as Transferable);
  t.push(l.city.beacons.buffer as Transferable, l.city.colliders.buffer as Transferable);
  t.push(l.city.roads.pos.buffer as Transferable, l.city.roads.idx.buffer as Transferable);
  t.push(l.city.roadside.buffer as Transferable);
  for (const b of l.nature.buckets) t.push(b.m.buffer as Transferable, b.c.buffer as Transferable);
  return t;
}
