/**
 * world/field.ts — 純関数高度場（three.js 非依存）
 * メインスレッド（物理・配置・河川水位）と worldgen worker（配置の並列計算）が
 * 同一モジュールを共有する。GLSL ミラーは render/terrain.ts に残る
 * （CPU=GPU 一致の契約 — v10-C の教訓: 式レベルで一致を保たないと機体振動になる）。
 */
import { WORLD } from '../config/constants.js';
import { fbm, fbmM, smoothstep, valueNoise } from '../core/math.js';
import { AIRPORTS } from '../config/airports.js';

// v23: 手書き河川ポリライン（RIVERS/SEGS/riverCarve）は廃止 — 谷と一致する川は
// 侵食ベイクの D8 流域蓄積場（light.a）から描く。height は河川彫り込みなしの
// 侵食結果そのものになる（物理・配置は安全側に単純化）。

/** 起伏本体（平坦マスク・海・河川なし）。GLSL reliefV と完全一致必須 */
export function reliefRaw(x: number, z: number): number {
  const wx = x + 900 * (fbm(x * 0.000021 + 5.2, z * 0.000021 + 1.3, 2) - 0.5);
  const wz = z + 900 * (fbm(x * 0.000021 + 9.1, z * 0.000021 + 4.4, 2) - 0.5);
  const base = fbm(wx * 0.000045 + 3.1, wz * 0.000045 + 7.7, 3);
  // v23: 山頂荒れ・谷滑らかの多重フラクタル（GLSL reliefV の r1..r3 と同一式）
  const r1 = Math.pow(1 - Math.abs(2 * fbmM(wx * 0.00013 + 21.3, wz * 0.00013 + 5.9, 3) - 1), 2.2);
  const r2 = Math.pow(1 - Math.abs(2 * fbmM(wx * 0.00009 + 40.7, wz * 0.00009 + 17.2, 3) - 1), 2.6);
  const r3 = Math.pow(1 - Math.abs(2 * fbmM(wx * 0.00026 + 61.3, wz * 0.00026 + 33.7, 3) - 1), 3.1);
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
  light: Uint8Array | null; // (N/2)²×RGBA8（v23）: r=AO g=影@昼 b=影@夕 a=流域流量
  buf: ArrayBuffer;   // 元バッファ（worker へ転送可能な clone として取得可）
}
let gBake: TerrainBake | null = null;

export function bakeInstall(buf: ArrayBuffer): void {
  const dv = new DataView(buf);
  const magic = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
  if ((magic !== 'ERA1' && magic !== 'ERA2') || buf.byteLength < 32) throw new Error('bake magic/size');
  const N = dv.getUint32(4, true);
  const cell = dv.getFloat64(16, true);
  const min = dv.getFloat64(24, true);
  if (buf.byteLength < 32 + N * N * 4 * 2) throw new Error('bake truncated');
  const H = N >> 1;
  const hasLight = magic === 'ERA2' && buf.byteLength >= 32 + N * N * 8 + H * H * 4;
  gBake = {
    N, cell, min, buf,
    ero: new Uint32Array(buf, 32, N * N),
    shade: new Uint8Array(buf, 32 + N * N * 4, N * N * 4),
    light: hasLight ? new Uint8Array(buf, 32 + N * N * 8, H * H * 4) : null
  };
}

/** v23: 流域蓄積の正規化（0..1）。川・湿潤度の色レイヤーで、地形高さ契約には関与しない。
 *  GLSL 側 uLight.a（texture バイリニア）と同一正規化座標・同一セル中心。 */
export function terrainBakeFlow(x: number, z: number): number {
  const b = gBake;
  if (!b?.light) return 0;
  const H = b.N >> 1;
  const u = ((x - b.min) / (b.cell * b.N)) * H - 0.5;
  const v = ((z - b.min) / (b.cell * b.N)) * H - 0.5;
  const i0 = Math.floor(u), j0 = Math.floor(v);
  const fx = u - i0, fy = v - j0;
  const dec = (i: number, j: number): number =>
    i < 0 || j < 0 || i >= H || j >= H ? 0 : b.light![(j * H + i) * 4 + 3] / 255;
  return dec(i0, j0) * (1 - fx) * (1 - fy) + dec(i0 + 1, j0) * fx * (1 - fy)
       + dec(i0, j0 + 1) * (1 - fx) * fy + dec(i0 + 1, j0 + 1) * fx * fy;
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

/**
 * 地形高さ [m]（決定的・純関数。物理/配置/GLSL と一致）。
 * 海彫り込みも平坦マスクでゲートする（空港が海域に載る場合、島表面が 0m で出る。
 * パーム島はこれにより周囲海面上へ环岛する）。v23: 河川は色レイヤーのみ（height 不変）。
 */
export function terrainHeight(x: number, z: number): number {
  const f = flatMask(x, z);
  return (reliefRaw(x, z) + terrainBakeDelta(x, z)) * f - seaMask(x, z) * 520 * f;
}
