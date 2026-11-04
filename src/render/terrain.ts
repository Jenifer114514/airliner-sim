/**
 * render/terrain.ts — 手続き高度場地形 v2（GPU クリップマップ / 立体感・距離感優先）
 *
 * v1 の問題（実測・コード確認に基づく）:
 *  - 52km を 192 分割 = 270m/quad の単一メッシュ → 低高度で視界に入る 2〜5km が
 *    10〜20 quad しかなく、270m 未満の起伏が存在しない＝「平面」に見える主原因。
 *  - 頂点カラー＆頂点法線が 193² _sample_ のみ → 斜面陰影が超低周波。
 *  - 太陽影が全く有効化されていなかった（sky.ts に castShadow 無し）→ 陰影手がかり不足。
 *
 * v2 の方針:
 *  - 高度関数 terrainHeight() は CPU（物理・配置）と GPU（変位）で**完全一致**させる
 *    （uint ハッシュを GLSL ES 3.0 でミラー）。ずれは cm 級に収まり接地・配置が壊れない。
 *  - 3 レベルのクリップマップ（遠 48km/250m・中 8km/50m・近 2km/12.5m）を
 *    **GPU 変位**で描画。パッチ境界は「親レベルの双一次補間へmorph」して突合せ、
 *    隙間・高さ不連続を原理的に作らない（境界線は両面で同一ポリラインになる）。
 *  - 法線は頂点シェーダで中央差分、色はフラグメントシェーダで per-pixel
 *    （斜面・岩・雪・砂・農地パッチワーク・飛行場芝）→ 陰影が明瞭。
 *  - 山脈（リッジノイズ）・谷（河川ポリラインの彫り込み）・丘陵・平野・海を同じ場で作る。
 */
import * as THREE from 'three';
import { WORLD } from '../config/constants.js';
import { fbm, smoothstep, clamp, valueNoise } from '../core/math.js';
import { AIRPORTS } from '../config/airports.js';

// ===== 河川ポリライン（ワールド座標 [m]）=====
export const RIVERS: { pts: [number, number][]; width: number }[] = [
  { pts: [[-14000, -7000], [-9000, -5600], [-4000, -4800], [1000, -4300], [6000, -2000], [10000, 2000], [13000, 7000]], width: 70 },
  { pts: [[-16000, 3000], [-11000, 3600], [-6500, 4200], [-2000, 5200], [2500, 7000], [7000, 9500]], width: 54 }
];

interface Seg { x0: number; z0: number; x1: number; z1: number; w: number }
const SEGS: Seg[] = [];
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
function riverCarve(x: number, z: number): number {
  let c = 0;
  for (const s of SEGS) {
    const d = distSeg(x, z, s);
    const ch = 26 * (1 - smoothstep(s.w * 0.5, s.w * 1.6, d));
    const val = 14 * (1 - smoothstep(s.w * 2, 1300, d));
    c = Math.max(c, ch + val);
  }
  return c;
}

/** 起伏本体（平坦マスク・海・河川なし） */
function relief(x: number, z: number): number {
  //  domen 歪み（有機的な輪郭）
  const wx = x + 900 * (fbm(x * 0.000021 + 5.2, z * 0.000021 + 1.3, 2) - 0.5);
  const wz = z + 900 * (fbm(x * 0.000021 + 9.1, z * 0.000021 + 4.4, 2) - 0.5);
  const base = fbm(wx * 0.000045 + 3.1, wz * 0.000045 + 7.7, 3);
  // 山脈: リッジノイズ 2 系統 × 存在マスク（base から導出して octave 節約）
  const r1 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00013 + 21.3, wz * 0.00013 + 5.9, 2) - 1), 2.2);
  const r2 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00009 + 40.7, wz * 0.00009 + 17.2, 2) - 1), 2.6);
  const mask = smoothstep(0.45, 0.68, base);
  const hills = (fbm(x * 0.00028 + 11.7, z * 0.00028 + 2.4, 2) - 0.5) * 260;
  const detail = (valueNoise(x * 0.0011 + 2.2, z * 0.0011 + 6.6) - 0.5) * 22;
  return (base - 0.31) * 900 + (r1 * 1900 + r2 * 1100) * mask + hills + detail;
}

/**
 * 平坦マスク（**空港ごとの円形平坦域**の和集合。1=地形そのまま / 0=空港平面）。
 * 旧版は原点中心の 1 円だけだったが、空港を原点から離す（パーム島など）と
 * 滑走路が海面彫り込みに沈むため、AIRPORTS を走査する方式に変更。
 * GLSL 側 flatMaskV と必ず同一式であること（flicker/terrain 一致テストの対象）。
 */
function flatMask(x: number, z: number): number {
  let flat = 0;
  for (const ap of AIRPORTS) {
    const r = Math.hypot(x - ap.center.x, z - ap.center.z);
    flat = Math.max(flat, 1 - smoothstep(WORLD.FLAT_RADIUS, WORLD.FLAT_RADIUS + 3800, r));
  }
  return 1 - flat;
}
function seaMask(x: number, z: number): number {
  return smoothstep(7000, 12000, (x + z) * 0.7071);
}

/** 河川彫り込みなしの地形高（河川水面リボンの水位計算用） */
export function terrainBase(x: number, z: number): number {
  const f = flatMask(x, z);
  return relief(x, z) * f - seaMask(x, z) * 520 * f;
}

/**
 * 地形高さ [m]（決定的・純関数。物理/配置/GLSL と一致）。
 * 海彫り込みも平坦マスクでゲートする（空港が海域に載る場合、島表面が 0m で出る。
 * パーム島はこれにより周囲海面上へ环岛する）。
 */
export function terrainHeight(x: number, z: number): number {
  const f = flatMask(x, z);
  return (relief(x, z) - riverCarve(x, z) * f) * f - seaMask(x, z) * 520 * f;
}

// GLSL ES 3.0 では gl_FragColor が廃止されている（three のビルトイン chunks は
// まだ gl_FragColor に書く）→ out 変数を自分で宣言して #define で橋渡しする。
const GLSL3_OUT = /* glsl */ `
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
`;

// ================= GLSL ミラー（uint ハッシュ＝CPU と完全一致） =================
const GLSL_LIB = /* glsl */ `
uniform vec2 uSnap;
uniform float uSpacing;
uniform float uParent;   // 親レベルの間隔（0 = morph なし＝最遠レベル）
uniform float uHalf;     // パッチ半辺 [m]
uniform float uMorphW;   // morph バンド幅 [m]
uniform vec4 uSeg[12];   // xyzw = x0,z0,x1,z1
uniform float uSegW[12];
uniform int uSegN;
uniform vec4 uAirports[4];
uniform int uApN;

uint h2u(uint ix, uint iz) {
  uint h = ix * 374761393u + iz * 668265263u;
  h = (h ^ (h >> 13u)) * 1274126177u;
  h ^= h >> 16u;
  return h;
}
float h2i(int ix, int iz) { return float(h2u(uint(ix), uint(iz))) * (1.0 / 4294967296.0); }
float vnoise(vec2 p) {
  vec2 p0 = floor(p); vec2 f = p - p0;
  vec2 s = f * f * (3.0 - 2.0 * f);
  float v00 = h2i(int(p0.x), int(p0.y));
  float v10 = h2i(int(p0.x) + 1, int(p0.y));
  float v01 = h2i(int(p0.x), int(p0.y) + 1);
  float v11 = h2i(int(p0.x) + 1, int(p0.y) + 1);
  return mix(mix(v00, v10, s.x), mix(v01, v11, s.x), s.y);
}
float fbm2(vec2 p, int oct) {
  float amp = 0.5, freq = 1.0, sum = 0.0, norm = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= oct) break;
    sum += amp * vnoise(p * freq); norm += amp; amp *= 0.5; freq *= 2.03;
  }
  return sum / norm;
}
float distSegV(vec2 p, vec4 s) {
  vec2 d = s.zw - s.xy;
  float t = clamp(dot(p - s.xy, d) / dot(d, d), 0.0, 1.0);
  return length(p - (s.xy + d * t));
}
float riverCarveV(vec2 p) {
  float c = 0.0;
  for (int i = 0; i < 12; i++) {
    if (i >= uSegN) break;
    float d = distSegV(p, uSeg[i]);
    float w = uSegW[i];
    float ch = 26.0 * (1.0 - smoothstep(w * 0.5, w * 1.6, d));
    float val = 14.0 * (1.0 - smoothstep(w * 2.0, 1300.0, d));
    c = max(c, ch + val);
  }
  return c;
}
float reliefV(vec2 p) {
  vec2 wp = p + 900.0 * (vec2(
    fbm2(p * 0.000021 + vec2(5.2, 1.3), 2) - 0.5,
    fbm2(p * 0.000021 + vec2(9.1, 4.4), 2) - 0.5));
  float base = fbm2(wp * 0.000045 + vec2(3.1, 7.7), 3);
  float r1 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00013 + vec2(21.3, 5.9), 2) - 1.0), 2.2);
  float r2 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00009 + vec2(40.7, 17.2), 2) - 1.0), 2.6);
  float mask = smoothstep(0.45, 0.68, base);
  float hills = (fbm2(p * 0.00028 + vec2(11.7, 2.4), 2) - 0.5) * 260.0;
  float detail = (vnoise(p * 0.0011 + vec2(2.2, 6.6)) - 0.5) * 22.0;
  return (base - 0.31) * 900.0 + (r1 * 1900.0 + r2 * 1100.0) * mask + hills + detail;
}
float flatMaskV(vec2 p) {
    float fl = 0.0;
    for (int i = 0; i < 4; i++) {
      if (i >= uApN) break;
      fl = max(fl, 1.0 - smoothstep(${WORLD.FLAT_RADIUS}.0, ${(WORLD.FLAT_RADIUS + 3800).toFixed(1)}, length(p - uAirports[i].xy)));
    }
    return 1.0 - fl;
  }
float seaMaskV(vec2 p) { return smoothstep(7000.0, 12000.0, (p.x + p.y) * 0.7071); }
float terrH(vec2 p) {
  float f = flatMaskV(p);
  return (reliefV(p) - riverCarveV(p) * f) * f - seaMaskV(p) * 520.0 * f;
}
float terrHBi(vec2 p, float sp) {
  vec2 c = floor(p / sp) * sp;
  vec2 t = (p - c) / sp;
  float h00 = terrH(c);
  float h10 = terrH(c + vec2(sp, 0.0));
  float h01 = terrH(c + vec2(0.0, sp));
  float h11 = terrH(c + vec2(sp, sp));
  return mix(mix(h00, h10, t.x), mix(h01, h11, t.x), t.y);
}
/** morph 込みの高さ: パッチ外周バンドで親レベル面へ連続接続 */
float terrHM(vec2 p) {
  float h = terrH(p);
  if (uParent > 0.5) {
    vec2 q = abs(p - uSnap);
    float e = max(q.x, q.y);
    float t = smoothstep(uHalf - uMorphW, uHalf, e);
    h = mix(h, terrHBi(p, uParent), t);
  }
  return h;
}
`;

// beginnormal_vertex 置き換え: 世界 XZ から高さ・中央差分法線・varying を計算
const GLSL_VS_NORMAL = /* glsl */ `
  vec2 wp2 = (modelMatrix * vec4(position, 1.0)).xz;
  float hM = terrHM(wp2);
  float eN = max(uSpacing * 0.6, 6.0);
  float hx = terrH(wp2 + vec2(eN, 0.0)) - terrH(wp2 - vec2(eN, 0.0));
  float hz = terrH(wp2 + vec2(0.0, eN)) - terrH(wp2 - vec2(0.0, eN));
  vTN = normalize(vec3(-hx / (2.0 * eN), 1.0, -hz / (2.0 * eN)));
  vTH = hM;
  vTXZ = wp2;
  vec3 objectNormal = vTN;
`;
// begin_vertex 置き換え（通常材質用: 既に計算済みの hM を再利用）
const GLSL_VS_MAIN = /* glsl */ `
  vec3 transformed = vec3(position.x, hM, position.z);
`;
// 影用 depth マテリアルは法線不要のため単独で変位だけ計算
const GLSL_VS_DISP = /* glsl */ `
  vec2 wp2 = (modelMatrix * vec4(position, 1.0)).xz;
  float hM = terrHM(wp2);
  vec3 transformed = vec3(position.x, hM, position.z);
`;

const GLSL_FS_COLOR = /* glsl */ `
varying float vTH;
varying vec3 vTN;
varying vec2 vTXZ;
float airfieldMaskV(vec2 p) {
  float m = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= uApN) break;
    float d = length(p - uAirports[i].xy);
    m = max(m, 1.0 - smoothstep(2200.0, 3000.0, d));
  }
  return m;
}
vec3 terrainColorV(vec3 camPos) {
  float h = vTH;
  float slope = 1.0 - clamp(vTN.y, 0.0, 1.0);
  // 遠景ガード: 20km 以遠はノイズ系（農地・雪のゆらぎ）を打ち切る（iPhone FS 負荷対策。
  // 遠方は fog で淡くなるため見た目の差はほぼない）
  float nearQ = 1.0 - smoothstep(14000.0, 20000.0, length(camPos - vec3(vTXZ.x, vTH, vTXZ.y)));
  vec3 cGrass = vec3(0.286, 0.392, 0.212);
  vec3 cForest = vec3(0.188, 0.286, 0.161);
  vec3 cRock = vec3(0.451, 0.424, 0.369);
  vec3 cSnow = vec3(0.804, 0.847, 0.898);
  vec3 cSand = vec3(0.722, 0.659, 0.478);
  vec3 cSea = vec3(0.420, 0.494, 0.408);
  vec3 cAirfield = vec3(0.337, 0.451, 0.263);
  vec3 col;
  float af = airfieldMaskV(vTXZ);
  if (h < 2.0) {
    col = mix(cSea, cSand, smoothstep(-3.0, 2.0, h));
  } else {
    col = mix(cGrass, cForest, clamp((h - 10.0) / 240.0, 0.0, 1.0));
    float rock = clamp((slope - 0.22) / 0.40, 0.0, 1.0) * 0.9 + clamp((h - 620.0) / 520.0, 0.0, 1.0) * 0.8;
    col = mix(col, cRock, clamp(rock, 0.0, 1.0));
    // 雪は稜線級（1750m 起）のみ・北向き斜面で残る。ゆらぎでツルテにしない
    float snowNoise = 0.92 + 0.10 * vnoise(vTXZ * 0.0016 + vec2(3.7, 8.2)) * nearQ;
    float snowLine = 1750.0 - 320.0 * (1.0 - clamp(vTN.z * 0.5 + 0.5, 0.0, 1.0));
    float snow = clamp((h - snowLine) / 430.0, 0.0, 1.0) * (1.0 - clamp(slope / 1.15, 0.0, 1.0) * 0.65);
    col = mix(col, cSnow * snowNoise, snow);
    // 農地パッチワーク（緩斜面・低高度・飛行場外）: geometry ゼロの手続き decals
    float flatness = 1.0 - smoothstep(0.05, 0.13, slope);
    float lowband = (1.0 - smoothstep(300.0, 430.0, h)) * smoothstep(3.0, 10.0, h);
    float w = flatness * lowband * (1.0 - af) * nearQ;
    if (w > 0.01) {
      vec2 cell = floor(vTXZ / 600.0);
      vec2 fr = fract(vTXZ / 600.0);
      float ch = h2i(int(cell.x), int(cell.y));
      vec3 crop = ch < 0.25 ? vec3(0.580, 0.498, 0.294)
                : ch < 0.50 ? vec3(0.373, 0.459, 0.235)
                : ch < 0.75 ? vec3(0.439, 0.357, 0.243)
                :             vec3(0.522, 0.541, 0.337);
      float hedge = min(step(fr.x, 0.045) + step(fr.y, 0.045), 1.0);
      crop *= 1.0 - 0.35 * hedge;
      col = mix(col, crop, w * 0.72);
    }
  }
  // 飛行場平坦帯: 海面(=砂)ブランチより前に一律上書き（h=0 は砂帯に該当するため）
  col = mix(col, cAirfield, af);
  return col;
}
`;

function makeSegUniforms() {
  const segs = SEGS.slice(0, 12);
  while (segs.length < 12) segs.push({ x0: 0, z0: 0, x1: 0, z1: 0, w: 0 });
  const uSeg = { value: segs.map((s) => new THREE.Vector4(s.x0, s.z0, s.x1, s.z1)) };
  const uSegW = { value: segs.map((s) => s.w) };
  const uSegN = { value: Math.min(12, SEGS.length) };
  const apArr = AIRPORTS.slice(0, 4).map((a) => new THREE.Vector4(a.center.x, a.center.z, 0, 0));
  while (apArr.length < 4) apArr.push(new THREE.Vector4(1e7, 1e7, 0, 0)); // シェーダ側 vec4[4] と長さ一致（未使用スロットは uApN で break される）
  const uAirports = { value: apArr };
  const uApN = { value: Math.min(4, AIRPORTS.length) };
  return { uSeg, uSegW, uSegN, uAirports, uApN };
}

interface LevelCfg { size: number; seg: number; parent: number; half: number; morphW: number; snap: number }

interface Level { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; depth: THREE.MeshDepthMaterial; cfg: LevelCfg; u: Record<string, THREE.IUniform> }
function buildLevel(cfg: LevelCfg, nearSeg: number): Level {
  const seg = cfg.parent === 0 ? cfg.seg : (cfg.size <= 2200 ? nearSeg : cfg.seg);
  const geo = new THREE.PlaneGeometry(cfg.size, cfg.size, seg, seg);
  geo.rotateX(-Math.PI / 2);
  // 変位後の高さ（最大約 2600m）を考慮したバウンディング球
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), Math.hypot(cfg.size * 0.71, 3000));

  const uni = makeSegUniforms();
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.94, metalness: 0.0 });
  (mat as unknown as { glslVersion: string }).glslVersion = THREE.GLSL3;
  const local = {
    uSnap: { value: new THREE.Vector2(0, 0) },
    uSpacing: { value: cfg.size / seg },
    uParent: { value: cfg.parent },
    uHalf: { value: cfg.half },
    uMorphW: { value: cfg.morphW }
  };
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uni, local);
    shader.fragmentShader = GLSL3_OUT + shader.fragmentShader;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\n' + GLSL_LIB + '\nvarying float vTH;\nvarying vec3 vTN;\nvarying vec2 vTXZ;')
      .replace('#include <beginnormal_vertex>', GLSL_VS_NORMAL)
      .replace('#include <begin_vertex>', GLSL_VS_MAIN);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\n' + GLSL_LIB + '\n' + GLSL_FS_COLOR)
      .replace('#include <color_fragment>', '#include <color_fragment>\n  diffuseColor.rgb = terrainColorV(cameraPosition);')
      .replace('#include <clipping_planes_fragment>',
               '#include <clipping_planes_fragment>\nif (vTH < -3.0) discard;')
      .replace('#include <fog_fragment>',
               '#include <fog_fragment>\n#ifdef USE_FOG\n  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, smoothstep(14000.0, 23000.0, vFogDepth));\n#endif');
  };
  mat.customProgramCacheKey = () => 'terrain-v2-' + cfg.size;

  const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  (depth as unknown as { glslVersion: string }).glslVersion = THREE.GLSL3;
  const localD = {
    uSnap: local.uSnap, uSpacing: local.uSpacing, uParent: local.uParent, uHalf: local.uHalf, uMorphW: local.uMorphW
  };
  depth.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uni, localD);
    shader.fragmentShader = GLSL3_OUT + shader.fragmentShader;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\n' + GLSL_LIB)
      .replace('#include <begin_vertex>', GLSL_VS_DISP);
  };
  depth.customProgramCacheKey = () => 'terrain-v2-depth-' + cfg.size;

  const mesh = new THREE.Mesh(geo, mat);
  mesh.customDepthMaterial = depth;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  mesh.frustumCulled = false;
  mesh.matrixAutoUpdate = true;
  return { mesh, mat, depth, cfg, u: local };
}

export interface TerrainObjects {
  group: THREE.Group;
  /** カメラ位置に応じてパッチをスナップ移動（毎フレーム呼ぶ） */
  update(cx: number, cz: number): void;
  /** 中景レベルの有効/無効（品質プリセット） */
  setMid(on: boolean): void;
  levels: Level[];
}

export function buildTerrain(scene: THREE.Scene, nearSeg = 160, midOn = true): TerrainObjects {
  const group = new THREE.Group();
  // 遠: 48km/250m（morph なし）／中: 8km/50m（親250）／近: 2km/12.5m（親50 or 250）
  const coarse = buildLevel({ size: 48000, seg: 192, parent: 0, half: 24000, morphW: 0, snap: 0 }, nearSeg);
  const mid = buildLevel({ size: 8000, seg: 160, parent: 250, half: 4000, morphW: 500, snap: 250 }, nearSeg);
  const near = buildLevel({ size: 2000, seg: nearSeg, parent: midOn ? 50 : 250, half: 1000, morphW: 130, snap: midOn ? 50 : 250 }, nearSeg);
  coarse.mesh.name = 'terrain';
  mid.mesh.name = 'terrain-mid';
  near.mesh.name = 'terrain-near';
  mid.mesh.visible = midOn;
  group.add(coarse.mesh, mid.mesh, near.mesh);
  scene.add(group);

  const snap = (v: number, s: number) => Math.round(v / s) * s;
  let lastNearKey = '', lastMidKey = '';

  function place(l: Level, x: number, z: number) {
    l.mesh.position.set(x, 0, z);
    (l.u.uSnap.value as THREE.Vector2).set(x, z);
  }
  function setParent(l: Level, p: number) {
    l.u.uParent.value = p;
    l.cfg.parent = p;
  }

  return {
    group,
    levels: [coarse, mid, near],
    update(cx: number, cz: number) {
      const mx = snap(cx, 250), mz = snap(cz, 250);
      const mk = mx + ',' + mz;
      if (mk !== lastMidKey) { lastMidKey = mk; place(mid, mx, mz); }
      const ns = mid.mesh.visible ? 50 : 250;
      const nx = snap(cx, ns), nz = snap(cz, ns);
      const nk = nx + ',' + nz;
      if (nk !== lastNearKey) {
        lastNearKey = nk;
        place(near, nx, nz);
        setParent(near, mid.mesh.visible ? 50 : 250);
        near.cfg.snap = ns;
      }
    },
    setMid(on: boolean) {
      mid.mesh.visible = on;
      setParent(near, on ? 50 : 250);
      near.cfg.snap = on ? 50 : 250;
      lastNearKey = '';
    }
  };
}

// ===== 河川水面リボン（地形に沿う静的 geometry） =====
export function buildRivers(scene: THREE.Scene): THREE.Group {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x27455a, roughness: 0.5, metalness: 0.02 });
  for (const r of RIVERS) {
    const pts: THREE.Vector2[] = [];
    // ポリラインを 220m 間隔で再サンプリング
    for (let i = 0; i < r.pts.length - 1; i++) {
      const a = new THREE.Vector2(r.pts[i][0], r.pts[i][1]);
      const b = new THREE.Vector2(r.pts[i + 1][0], r.pts[i + 1][1]);
      const n = Math.max(2, Math.round(a.distanceTo(b) / 220));
      for (let k = 0; k < n; k++) pts.push(a.clone().lerp(b, k / n));
    }
    pts.push(new THREE.Vector2(r.pts[r.pts.length - 1][0], r.pts[r.pts.length - 1][1]));
    // 水位（彫り込み前の地盤 - 14m、海面付近でクランプ）→ 3 タップ平滑
    const lvl = pts.map((p) => Math.max(terrainBase(p.x, p.y) - 14, WORLD.SEA_LEVEL + 1.2));
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 1; i < lvl.length - 1; i++) lvl[i] = (lvl[i - 1] + lvl[i] * 2 + lvl[i + 1]) / 4;
    }
    const pos: number[] = [];
    const idx: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const dir = new THREE.Vector2(next.x - prev.x, next.y - prev.y).normalize();
      const nrm = new THREE.Vector2(-dir.y, dir.x);
      const hw = r.width * 0.5;
      pos.push(pts[i].x + nrm.x * hw, lvl[i], pts[i].y + nrm.y * hw);
      pos.push(pts[i].x - nrm.x * hw, lvl[i], pts[i].y - nrm.y * hw);
      if (i < pts.length - 1) {
        const a = i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = 'river';
    group.add(mesh);
  }
  scene.add(group);
  return group;
}
