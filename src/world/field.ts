/**
 * world/field.ts — 純関数高度場（three.js 非依存）
 * メインスレッド（物理・配置・河川水位）と worldgen worker（配置の並列計算）が
 * 同一モジュールを共有する。GLSL ミラーは render/terrain.ts に残る
 * （CPU=GPU 一致の契約 — v10-C の教訓: 式レベルで一致を保たないと機体振動になる）。
 */
import { WORLD } from '../config/constants.js';
import { fbm, smoothstep, clamp, valueNoise } from '../core/math.js';
import { AIRPORTS } from '../config/airports.js';

// ===== 河川ポリライン（ワールド座標 [m]）=====
export const RIVERS: { pts: [number, number][]; width: number }[] = [
  { pts: [[-14000, -7000], [-9000, -5600], [-4000, -4800], [1000, -4300], [6000, -2000], [10000, 2000], [13000, 7000]], width: 70 },
  { pts: [[-16000, 3000], [-11000, 3600], [-6500, 4200], [-2000, 5200], [2500, 7000], [7000, 9500]], width: 54 }
];

export interface Seg { x0: number; z0: number; x1: number; z1: number; w: number }
export const SEGS: Seg[] = [];
for (const r of RIVERS) {
  for (let i = 0; i < r.pts.length - 1; i++) {
    SEGS.push({ x0: r.pts[i][0], z0: r.pts[i][1], x1: r.pts[i + 1][0], z1: r.pts[i + 1][1], w: r.width });
  }
}

function distSeg(x: number, z: number, s: Seg): number {
  const dx = s.x1 - s.x0, dz = s.z1 - s.z0;
  const t = clamp(((x - s.x0) * dx + (z - s.z0) * dz) / (dx * dx + dz * dz), 0, 1);
  return Math.hypot(x - (s.x0 + dx * t), z - (s.z0 + dz * t));
}

/** 河川の彫り込み深さ [m]（水路 + 幅広い谷） */
export function riverCarve(x: number, z: number): number {
  let c = 0;
  for (const s of SEGS) {
    const d = distSeg(x, z, s);
    const ch = 26 * (1 - smoothstep(s.w * 0.5, s.w * 1.6, d));
    const val = 14 * (1 - smoothstep(s.w * 2, 1300, d));
    c = Math.max(c, ch + val);
  }
  return c;
}

/** 起伏本体（平坦マスク・海・河川なし）。GLSL reliefV と完全一致必須 */
export function reliefRaw(x: number, z: number): number {
  const wx = x + 900 * (fbm(x * 0.000021 + 5.2, z * 0.000021 + 1.3, 2) - 0.5);
  const wz = z + 900 * (fbm(x * 0.000021 + 9.1, z * 0.000021 + 4.4, 2) - 0.5);
  const base = fbm(wx * 0.000045 + 3.1, wz * 0.000045 + 7.7, 3);
  const r1 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00013 + 21.3, wz * 0.00013 + 5.9, 3) - 1), 2.2);
  const r2 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00009 + 40.7, wz * 0.00009 + 17.2, 3) - 1), 2.6);
  const r3 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00026 + 61.3, wz * 0.00026 + 33.7, 3) - 1), 3.1);
  const mask = smoothstep(0.45, 0.68, base);
  const hills = (fbm(x * 0.00028 + 11.7, z * 0.00028 + 2.4, 2) - 0.5) * 260;
  const detail = (valueNoise(x * 0.0011 + 2.2, z * 0.0011 + 6.6) - 0.5) * 22;
  const swell = (fbm(x * 0.00035 + 8.3, z * 0.00035 + 4.1, 2) - 0.5) * 150;
  return (base - 0.31) * 900 + (r1 * 1900 + r2 * 1100 + r3 * 300) * mask + hills + detail + swell;
}

/**
 * 平坦マスク（空港ごとの円形平坦域の和集合。1=地形そのまま / 0=空港平面）。
 * GLSL 側 flatMaskV と必ず同一式であること（flicker/terrain 一致テストの対象）。
 */
export function flatMask(x: number, z: number): number {
  let flat = 0;
  for (const ap of AIRPORTS) {
    const r = Math.hypot(x - ap.center.x, z - ap.center.z);
    flat = Math.max(flat, 1 - smoothstep(WORLD.FLAT_RADIUS, WORLD.FLAT_RADIUS + 3800, r));
  }
  return 1 - flat;
}
export function seaMask(x: number, z: number): number {
  return smoothstep(7000, 12000, (x + z) * 0.7071);
}

// ═════════ v15-B 侵食ベイク（表は scripts/bake-erosion.mjs が解く）═════════
export interface TerrainBake {
  N: number; cell: number; min: number;
  ero: Uint32Array;   // low16=(δ+128)*256 高度 / high16=wear
  shade: Uint8Array;  // RGBA8: 傾き.xy / wear / 堆積
  buf: ArrayBuffer;   // 元バッファ（worker へ転送可能な clone として取得可）
}
let gBake: TerrainBake | null = null;

export function bakeInstall(buf: ArrayBuffer): void {
  const dv = new DataView(buf);
  const magic = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
  if (magic !== 'ERA1' || buf.byteLength < 32) throw new Error('bake magic/size');
  const N = dv.getUint32(4, true);
  const cell = dv.getFloat64(16, true);
  const min = dv.getFloat64(24, true);
  if (buf.byteLength < 32 + N * N * 4 * 2) throw new Error('bake truncated');
  gBake = { N, cell, min, buf, ero: new Uint32Array(buf, 32, N * N), shade: new Uint8Array(buf, 32 + N * N * 4, N * N * 4) };
}
export const bakeState = (): TerrainBake | null => gBake;
/** worker 転送用の独立コピー（転送で本体が detached にならないよう clone） */
export const bakeBufferCopy = (): ArrayBuffer | null => (gBake ? gBake.buf.slice(0) : null);

/** δ[x,z]（CPU 版・手動バイリニア）。タイル外 texel は寄与 0（境界窓で δ 側が既に 0）。
 *  GLSL 側 eroDeltaV と同一式。 */
export function terrainBakeDelta(x: number, z: number): number {
  if (!gBake) return 0;
  const { N, ero, cell, min } = gBake;
  const u = (x - min) / cell - 0.5, v = (z - min) / cell - 0.5;
  const i0 = Math.floor(u), j0 = Math.floor(v);
  const fx = u - i0, fy = v - j0;
  const dec = (i: number, j: number): number =>
    i < 0 || j < 0 || i >= N || j >= N ? 0 : (ero[j * N + i] & 0xffff) / 256 - 128;
  return dec(i0, j0) * (1 - fx) * (1 - fy) + dec(i0 + 1, j0) * fx * (1 - fy)
       + dec(i0, j0 + 1) * (1 - fx) * fy + dec(i0 + 1, j0 + 1) * fx * fy;
}

/** 河川彫り込みなしの地形高 [m]（河川水面リボンの水位計算用） */
export function terrainBase(x: number, z: number): number {
  const f = flatMask(x, z);
  return (reliefRaw(x, z) + terrainBakeDelta(x, z)) * f - seaMask(x, z) * 520 * f;
}

/**
 * 地形高さ [m]（決定的・純関数。物理/配置/GLSL と一致）。
 * 海彫り込みも平坦マスクでゲートする（空港が海域に載る場合、島表面が 0m で出る。
 * パーム島はこれにより周囲海面上へ环岛する）。
 */
export function terrainHeight(x: number, z: number): number {
  const f = flatMask(x, z);
  return (reliefRaw(x, z) + terrainBakeDelta(x, z) - riverCarve(x, z) * f) * f - seaMask(x, z) * 520 * f;
}
