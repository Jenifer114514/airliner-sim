/**
 * core/math.ts — 純粋数学ユーティリティ（three.js 非依存のロジック）
 * 乱数・バリューノイズ・fBm・smoothstep。すべて決定的（シード固定）。
 */

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : (v > hi ? hi : v);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function expSmooth(rate: number, dt: number): number {
  return 1 - Math.exp(-rate * dt);
}

/** 決定的擬似乱数（mulberry32） */
export function makeRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 整数格子ハッシュ → [0,1) */
function hash2(ix: number, iz: number): number {
  let h = Math.imul(ix, 374761393) + Math.imul(iz, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** バリューノイズ（2 次元・C1 連続） */
export function valueNoise(x: number, z: number): number {
  const x0 = Math.floor(x), z0 = Math.floor(z);
  const fx = x - x0, fz = z - z0;
  const sx = fx * fx * (3 - 2 * fx);
  const sz = fz * fz * (3 - 2 * fz);
  const v00 = hash2(x0, z0), v10 = hash2(x0 + 1, z0);
  const v01 = hash2(x0, z0 + 1), v11 = hash2(x0 + 1, z0 + 1);
  return lerp(lerp(v00, v10, sx), lerp(v01, v11, sx), sz);
}

/** フラクションal ブラウン運動（0..1 に正規化） */
export function fbm(x: number, z: number, octaves: number): number {
  let amp = 0.5, freq = 1, sum = 0, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise(x * freq, z * freq);
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}
