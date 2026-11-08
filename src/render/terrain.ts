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
import { AIRPORTS } from '../config/airports.js';
import { makeGroundDetailTexture, makeGroundSplatTextures } from './textures.js';

// ═════════ v16: 高度場の純関数は world/field.ts（本体と worldgen worker が共有）═════════
// 本ファイルは侵食ベイクの DataTexture・GLSL ミラー・メッシュ構築のみ。
// reliefRaw/flatMaskRaw/seaMaskRaw の re-export は scripts/bake-erosion.mjs 用。
// 【契約】下の GLSL 文字列は field.ts の CPU 式と完全一致していなければならない
//（v10-C の教訓: 式レベル一致でないと機体振動になる。flicker/terrain 一致テストが検証）。
import {
  terrainHeight, terrainBakeDelta,
  bakeState, bakeInstall, reliefRaw, flatMask, seaMask
} from '../world/field.js';
export { reliefRaw, flatMask as flatMaskRaw, seaMask as seaMaskRaw };
export { terrainHeight, terrainBakeDelta };

// ═════════════════ v15-B: 侵食ベイクの GPU 側 ═════════════════
// scripts/bake-erosion.mjs がビルド時に D8 流域侵食を解き、public/terrain-bake.bin
// （ヘッダ32B + N²×uint32[R32UI: low16=(δ+128)*256 / high16=wear] + N²×RGBA8
//  [傾き.xy / wear / 堆積]）へベイクする。ここではそれを 2 枚のテクスタへ展開し、
// CPU（配置・物理＝field.ts）と GLSL（頂点変位）が**同一の手動バイリニア式**で参照する。
// .bin 不在時は 1×1 無効テーブルで従来手順生成のみ（fetch 失敗＝無害な劣化）。
let gBakeEroTex: THREE.DataTexture | null = null;
let gBakeShadeTex: THREE.DataTexture | null = null;
let gBakeLightTex: THREE.DataTexture | null = null;

/** ブート時に一度 await すること（main.ts）。失敗/不在は resolve（手生成のみで継続）。
 *  配置 worker へは field.bakeBufferCopy() で clone を渡す（本体の所有は保持）。 */
export async function loadTerrainBake(): Promise<void> {
  if (typeof window === 'undefined' || typeof fetch !== 'function' || bakeState()) return;
  try {
    const url = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? './';
    const res = await fetch(url + 'terrain-bake.bin', { cache: 'force-cache' });
    if (!res.ok) return;
    bakeInstall(await res.arrayBuffer());
    const st = bakeState();
    if (!st) return;
    const eT = new THREE.DataTexture(st.ero, st.N, st.N, THREE.RedIntegerFormat, THREE.UnsignedIntType);
    eT.minFilter = eT.magFilter = THREE.NearestFilter;
    eT.generateMipmaps = false;
    eT.needsUpdate = true;
    const sT = new THREE.DataTexture(st.shade, st.N, st.N, THREE.RGBAFormat, THREE.UnsignedByteType);
    sT.minFilter = sT.magFilter = THREE.LinearFilter;
    sT.generateMipmaps = false;
    sT.needsUpdate = true;
    gBakeEroTex = eT;
    gBakeShadeTex = sT;
    if (st.light) {
      const lT = new THREE.DataTexture(st.light, st.N >> 1, st.N >> 1, THREE.RGBAFormat, THREE.UnsignedByteType);
      lT.minFilter = lT.magFilter = THREE.LinearFilter;
      lT.generateMipmaps = false;
      lT.needsUpdate = true;
      gBakeLightTex = lT;
    }
  } catch {
    /* ベイク無し運用（開発サーバー直叩き等）でもゲームは成立する */
  }
}

/** ユーニフォーム詰替用（未ロード時は 1×1 無効テーブル → delta 0・ティルト 0） */
const dummyEro = (): THREE.DataTexture =>
  (gBakeEroTex ?? (() => {
    const t = new THREE.DataTexture(new Uint32Array([32768]), 1, 1, THREE.RedIntegerFormat, THREE.UnsignedIntType);
    t.minFilter = t.magFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
    return t;
  })());
const dummyShade = (): THREE.DataTexture =>
  (gBakeShadeTex ?? (() => {
    const t = new THREE.DataTexture(new Uint8Array([128, 128, 0, 0]), 1, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
    t.minFilter = t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
    return t;
  })());
/** v23: 光場（AO/影/流量）。1×1 ニュートラル = AO1・影1・flow0 → 従来描画と無害一致 */
const dummyLight = (): THREE.DataTexture =>
  (gBakeLightTex ?? (() => {
    const t = new THREE.DataTexture(new Uint8Array([255, 255, 255, 0]), 1, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
    t.minFilter = t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
    return t;
  })());

/** 地面ディテールタイル（遅延生成・全レベル共有） */
let gDetailTex: THREE.Texture | null = null;
const detailTex = (): THREE.Texture => (gDetailTex ??= makeGroundDetailTexture());
let gSplatTex: THREE.Texture[] | null = null;
const splatTex = (): THREE.Texture[] => (gSplatTex ??= makeGroundSplatTextures());

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
// v23: 多重フラクタル（world/field.ts fbmM と同一式 — reliefV ミラー契約）
float fbm2M(vec2 p, int oct) {
  float amp = 0.5, freq = 1.0, sum = 0.0, norm = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= oct) break;
    float n = vnoise(p * freq);
    sum += amp * n; norm += amp;
    amp = min(0.98, amp * (0.42 + 1.16 * n));
    freq *= 2.03;
  }
  return sum / norm;
}
float reliefV(vec2 p) {
  vec2 wp = p + 900.0 * (vec2(
    fbm2(p * 0.000021 + vec2(5.2, 1.3), 2) - 0.5,
    fbm2(p * 0.000021 + vec2(9.1, 4.4), 2) - 0.5));
  float base = fbm2(wp * 0.000045 + vec2(3.1, 7.7), 3);
  float r1 = pow(1.0 - abs(2.0 * fbm2M(wp * 0.00013 + vec2(21.3, 5.9), 3) - 1.0), 2.2);
  float r2 = pow(1.0 - abs(2.0 * fbm2M(wp * 0.00009 + vec2(40.7, 17.2), 3) - 1.0), 2.6);
  float r3 = pow(1.0 - abs(2.0 * fbm2M(wp * 0.00026 + vec2(61.3, 33.7), 3) - 1.0), 3.1);
  float mask = smoothstep(0.45, 0.68, base);
  float hills = (fbm2(p * 0.00028 + vec2(11.7, 2.4), 2) - 0.5) * 260.0;
  float detail = (vnoise(p * 0.0011 + vec2(2.2, 6.6)) - 0.5) * 22.0;
  float swell = (fbm2(p * 0.00035 + vec2(8.3, 4.1), 2) - 0.5) * 150.0;
  return (base - 0.31) * 900.0 + (r1 * 1900.0 + r2 * 1100.0 + r3 * 300.0) * mask + hills + detail + swell;
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

// ── v15-B: 侵食ベイク（ビルド時解いた δ-場。CPU terrainBakeDelta と同一の
//    テクセル中心基準・手動バイリニア。タイル外 texel は 0） ──
uniform highp usampler2D uEro;      // R32UI: low16=(δ+128)*256 / high16=wear
uniform mediump vec4 uEroGeo;       // (cell, minX, minZ, N)
float eroDeltaV(vec2 p) {
  vec2 u = (p - uEroGeo.yz) / uEroGeo.x - 0.5;
  ivec2 i0 = ivec2(floor(u));
  vec2 fr = u - vec2(i0);
  float acc = 0.0;
  for (int j = 0; j < 2; j++) {
    for (int i = 0; i < 2; i++) {
      ivec2 c = i0 + ivec2(i, j);
      float w = (i == 1 ? fr.x : 1.0 - fr.x) * (j == 1 ? fr.y : 1.0 - fr.y);
      if (w > 0.0 && c.x >= 0 && c.y >= 0 && c.x < int(uEroGeo.w) && c.y < int(uEroGeo.w)) {
        acc += w * (float(texelFetch(uEro, c, 0).r & 65535u) / 256.0 - 128.0);
      }
    }
  }
  return acc;
}

float terrH(vec2 p) {
  float f = flatMaskV(p);
  return (reliefV(p) + eroDeltaV(p)) * f - seaMaskV(p) * 520.0 * f;
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
uniform sampler2D uDetail;
uniform mediump sampler2D uShade;
uniform sampler2D uLight;
uniform sampler2D uSplatG;
uniform sampler2D uSplatD;
uniform sampler2D uSplatR;
uniform sampler2D uSplatS;
uniform vec3 uSunView;
uniform vec3 uFogWarm;
uniform float uShadeMix;
uniform float uShadeAmt;
float gDetQ;
vec3 gDet;
vec4 gLight;
// v15-B: ベイク法線の有効度（遠方でフェード。1×1 ダミーテーブルでは値 0）
float bakeQ() {
  return 1.0 - smoothstep(6500.0, 14000.0, length(cameraPosition - vec3(vTXZ.x, vTH, vTXZ.y)));
}
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
  // 遠景ガード: 13km 以遠はノイズ系（農地・雪のゆらぎ）を打ち切る（遠景は粗く描き、
  // 負荷を近接地に回す方針。遠方は fog で淡くなるため見た目差は小さい）
  float nearQ = 1.0 - smoothstep(9000.0, 13000.0, length(camPos - vec3(vTXZ.x, vTH, vTXZ.y)));
  vec3 cGrass = vec3(0.286, 0.392, 0.212);
  vec3 cForest = vec3(0.188, 0.286, 0.161);
  vec3 cRock = vec3(0.451, 0.424, 0.369);
  vec3 cSnow = vec3(0.804, 0.847, 0.898);
  vec3 cSand = vec3(0.722, 0.659, 0.478);
  vec3 cSea = vec3(0.420, 0.494, 0.408);
  vec3 cAirfield = vec3(0.337, 0.451, 0.263);
  vec3 col;
  float distC = length(camPos - vec3(vTXZ.x, vTH, vTXZ.y));
  float af = airfieldMaskV(vTXZ);
  float nA = vnoise(vTXZ * 0.00108 + vec2(21.7, 5.3));
  float nB = vnoise(vTXZ * 0.0058 + vec2(3.3, 12.1));
  float snowLine = 1750.0 - 320.0 * (1.0 - clamp(vTN.z * 0.5 + 0.5, 0.0, 1.0));
  float snow = clamp((h - snowLine) / 430.0, 0.0, 1.0) * (1.0 - clamp(slope / 1.15, 0.0, 1.0) * 0.65);
  if (h < 2.0) {
    col = mix(cSea, cSand, smoothstep(-3.0, 2.0, h));
  } else {
    float forestT = clamp((h - 10.0) / 240.0, 0.0, 1.0);
    col = mix(cGrass, cForest, forestT);
    // ===== 中~遠景の地面もみ上げ（のっぺり防止: ~930m 色调 / ~170m 斑 / 樹冠 / ~51m 粒）=====
    float nA = vnoise(vTXZ * 0.00108 + vec2(21.7, 5.3));
    col *= 0.84 + 0.32 * nA;
    // 南東向き斜面の減光（擬似 hillshade。うねりの面持ちを強調する）
    col *= 0.94 + 0.09 * clamp(vTN.z * 0.8 + vTN.x * 0.35 + 0.55, 0.0, 1.0);
    col = mix(col, col * vec3(0.78, 0.84, 0.70), 0.55 * smoothstep(0.40, 0.74, nB));
    if (distC < 7000.0) col *= 0.962 + 0.076 * vnoise(vTXZ * 0.0195 + vec2(7.7, 1.3));
    float rock = clamp((slope - 0.22) / 0.40, 0.0, 1.0) * 0.9 + clamp((h - 620.0) / 520.0, 0.0, 1.0) * 0.8;
    rock = clamp(rock, 0.0, 1.0);
    // A-3: 岩盤は高さ帯の地層ゆらぎで暖/寒の岩色を分ける（ベタ塗り感の排除）
    float band = 0.5 + 0.5 * sin(h * 0.038 + nA * 4.2);
    col = mix(col, mix(cRock, vec3(0.353, 0.302, 0.255), band * 0.75), rock);
    // A-2: 侵食溝（色のみ。高度は不変 → 物理/配置に無影響。7.4km 外は打ち切り）
    float erQ = (1.0 - smoothstep(4200.0, 7400.0, distC)) * nearQ * smoothstep(6.0, 60.0, h) * (1.0 - af);
    if (erQ > 0.02) {
      float er = vnoise(vTXZ * 0.042 + vec2(13.7, 4.2));
      float er2 = vnoise(vTXZ * 0.0106 + vec2(8.8, 2.5));
      float rill = smoothstep(0.56, 0.74, er) * (0.35 + 0.65 * er2) * clamp(slope * 4.0, 0.0, 1.0);
      col *= mix(1.0, 0.865, rill * 0.8 * erQ);
      col *= mix(1.0, 0.955 + 0.09 * er2, erQ * 0.8);
    }
    // v23: 谷底収斂影はベイク AO（gLight.r）へ移行。雪は稜線級のみ（snow は冒頭計算）
    float snowNoise = 0.92 + 0.10 * vnoise(vTXZ * 0.0016 + vec2(3.7, 8.2)) * nearQ;
    col = mix(col, cSnow * snowNoise, snow);
    // 農地パッチワーク（緩斜面・低高度・飛行場外）: geometry ゼロの手続き decals
    float flatness = 1.0 - smoothstep(0.05, 0.13, slope);
    float lowband = (1.0 - smoothstep(300.0, 430.0, h)) * smoothstep(3.0, 10.0, h);
    float w = flatness * lowband * (1.0 - af) * nearQ;
    if (w > 0.01) {
      vec2 cell0 = floor(vTXZ / 600.0);
      vec2 fr0 = fract(vTXZ / 600.0);
      float ch0 = h2i(int(cell0.x), int(cell0.y));
      vec2 cell = cell0; vec2 fr = fr0; float ch = ch0;
      if (ch0 > 0.44) {  // 約半数の区画を 300m の四小区へ分割（区画を細かく見せる）
        vec2 sub = floor(fr0 * 2.0);
        cell = cell0 * 2.0 + sub;
        fr = fract(fr0 * 2.0);
        ch = h2i(int(cell.x), int(cell.y));
      }
      vec3 crop = ch < 0.20 ? vec3(0.580, 0.498, 0.294)
                : ch < 0.38 ? vec3(0.373, 0.459, 0.235)
                : ch < 0.55 ? vec3(0.439, 0.357, 0.243)
                : ch < 0.72 ? vec3(0.522, 0.541, 0.337)
                : ch < 0.86 ? vec3(0.470, 0.420, 0.286)
                :             vec3(0.612, 0.562, 0.373);
      crop *= 0.83 + 0.32 * h2i(int(cell.x) * 5 + 13, int(cell.y) * 7 - 5);
      crop *= 0.94 + 0.09 * fr.x + 0.05 * vnoise(vTXZ * 0.021 + vec2(2.3, 9.8));
      float hedge = min(step(fr.x, 0.045) + step(fr.y, 0.045), 1.0);
      crop = mix(crop * (1.0 - 0.30 * hedge), vec3(0.155, 0.235, 0.125), hedge * 0.55);
      col = mix(col, crop, w * 0.72);
    }
    // 砂浜〜低地: 中距離でもらえる粒（潮だまり風の明暗）
    if (h < 34.0) {
      float bw = 1.0 - smoothstep(10.0, 34.0, h);
      col *= mix(1.0, 0.90 + 0.20 * vnoise(vTXZ * 0.0130 + vec2(6.1, 3.3)), bw * nearQ);
    }
  }
  // ===== マイクロ表面（近接地のざらつき: 草むら・砂粒・作物の畝）=====
  float microQ = 1.0 - smoothstep(1100.0, 2900.0, distC);
  if (microQ > 0.012) {
    float g1 = vnoise(vTXZ * 0.34 + vec2(4.1, 9.3));
    float g2 = vnoise(vTXZ * 0.90 + vec2(1.7, 6.2));
    col *= mix(1.0, (0.885 + 0.200 * g1) * (0.930 + 0.130 * g2), microQ);
    // 農地の畝（作物セル内 19m 周期ストライプ、1.5km 外はエイリアス防止でフェード）
    float stripQ = (1.0 - smoothstep(700.0, 1900.0, distC)) * (1.0 - smoothstep(280.0, 430.0, h));
    if (stripQ > 0.02 && h > 6.0 && slope < 0.09 && af < 0.5) {
      vec2 c2 = floor(vTXZ / 600.0);
      float rs = h2i(int(c2.x) * 7 + 3, int(c2.y) * 13 + 5);
      if (rs > 0.18 && rs < 0.82) {
        float ax = rs < 0.5 ? vTXZ.x : vTXZ.y;
        float stripe = 0.5 + 0.5 * sin(ax * 0.3307 + rs * 41.0);
        col *= mix(1.0, 0.93 + 0.14 * stripe, stripQ);
      }
    }
  }
  // 飛行場平坦帯: 海面(=砂)ブランチより前に一律上書き（h=0 は砂帯に該当するため）
  col = mix(col, cAirfield, af);
  if (af > 0.02) {
    float aq = af * (0.55 + 0.45 * microQ);
    col *= mix(1.0, 0.88 + 0.26 * vnoise(vTXZ * 0.28 + vec2(5.7, 2.9)), aq);
    col *= mix(1.0, 0.955 + 0.09 * vnoise(vTXZ * 0.062 + vec2(1.9, 8.8)) * 2.0 - 0.09, aq * 0.9);
    float mowQ = aq * (1.0 - smoothstep(2600.0, 4600.0, distC));
    col *= mix(1.0, 0.965 + 0.07 * sin(vTXZ.y * 0.2618), mowQ);
  }
  // v15-B: 侵食の痕跡 — 谷底の堆積色・浸食崖の岩盤露出・扇状地の砂礫（ベイク wear/deposit）。
  // 滑走路オーバーライドの後ろに置いて空港色を不変に保つ。ダミーテーブルでは b=a=0 で無影響。
  { vec4 sb = texture2D(uShade, (vTXZ - uEroGeo.yz) / (uEroGeo.x * uEroGeo.w));
    float wet = sb.b * (1.0 - smoothstep(2400.0, 3800.0, h)) * (1.0 - af);
    col = mix(col, col * vec3(0.68, 0.72, 0.62), wet * 0.85);
    col = mix(col, cRock * 0.94, clamp(wet * 1.9 - 0.62, 0.0, 1.0) * smoothstep(0.30, 0.52, slope) * smoothstep(160.0, 420.0, h));
    col = mix(col, vec3(0.60, 0.562, 0.478), sb.a * (1.0 - smoothstep(2600.0, 3400.0, h)) * 0.8);
  }
  // ===== v23-1: ベイク影×AO（谷の収斂影・夕方の長影。光場 1 サンプル = gLight）=====
  {
    float ao = gLight.r;
    float sh = mix(gLight.g, gLight.b, uShadeMix);
    col *= mix(1.0, (0.50 + 0.50 * ao) * (0.40 + 0.60 * sh), uShadeAmt);
  }
  // ===== v23-3: 川・湖（流域蓄積 field から。谷と一致。水深で色相）=====
  {
    float fl = gLight.a;
    float riv = smoothstep(0.235, 0.40, fl) * (1.0 - smoothstep(0.115, 0.30, slope))
              * (1.0 - af) * (1.0 - smoothstep(160.0, 480.0, h));
    if (h > 1.2 && riv > 0.012) {
      float dep = smoothstep(0.40, 0.88, fl);
      vec3 wc = mix(vec3(0.36, 0.455, 0.40), vec3(0.078, 0.185, 0.285), dep);
      wc *= 0.92 + 0.16 * vnoise(vTXZ * 0.02 + vec2(4.7, 9.1)); // 浅瀬の揺らぎ
      col = mix(col, wc, min(1.0, riv) * 0.93);
    }
  }
  // ===== v23-6: 樹林帯（近景 canopy + 遠景を林帯テクスチャ風に。森林限界つき）=====
  {
    float tl = 760.0 + 300.0 * vnoise(vTXZ * 0.00022 + vec2(31.7, 12.1));
    float forestT2 = clamp((h - 10.0) / 240.0, 0.0, 1.0);
    float humid = 0.55 + 0.45 * smoothstep(0.06, 0.42, gLight.a) + 0.22 * nA;
    float fMask = forestT2 * (1.0 - smoothstep(tl - 130.0, tl + 170.0, h))
                * (1.0 - smoothstep(0.30, 0.62, slope)) * clamp(humid, 0.0, 1.0);
    float canNear = smoothstep(0.52, 0.80, vnoise(vTXZ * 0.0088 + vec2(1.1, 4.4)));
    float canFar = smoothstep(0.46, 0.74, vnoise(vTXZ * 0.0031 + vec2(2.6, 7.9)));
    float canopy = mix(canFar, canNear, step(distC, 7000.0));
    col = mix(col, col * vec3(0.66, 0.80, 0.62) * 0.94, clamp(fMask * canopy * 1.15, 0.0, 1.0) * 0.62 * (1.0 - snow));
  }
  // ===== v23-4: 地表スプラット（傾斜・高度で 草/土/岩/砂 を混合、タイル回転で繰り返し消去）=====
  if (gDetQ > 0.015 && h > 1.2 && af < 0.5) {
    vec2 sp = vTXZ * (1.0 / 15.0);
    vec2 c15 = floor(sp);
    float hj = h2i(int(c15.x) * 7 + 11, int(c15.y) * 13 + 5);
    vec2 f0 = fract(sp) - 0.5;
    vec2 f1 = hj < 0.25 ? f0 : (hj < 0.5 ? vec2(-f0.y, f0.x) : (hj < 0.75 ? -f0 : vec2(f0.y, -f0.x)));
    vec2 uvS = c15 + f1;
    float wr = clamp((slope - 0.20) / 0.36 + clamp((h - 900.0) / 700.0, 0.0, 1.0) * 0.7, 0.0, 1.0);
    float ws2 = (1.0 - smoothstep(6.0, 40.0, h)) * (1.0 - wr) + snow * 0.0;
    float wGr = max(0.0, 1.0 - wr - ws2);
    float wDi = 0.24 * smoothstep(0.34, 0.62, nB) * wGr;
    wGr -= wDi;
    vec3 spl = texture2D(uSplatG, uvS).rgb * wGr + texture2D(uSplatD, uvS).rgb * wDi
             + texture2D(uSplatR, uvS).rgb * wr + texture2D(uSplatS, uvS).rgb * ws2;
    col = mix(col, col * (0.50 + 1.16 * spl), min(1.0, gDetQ) * 0.78);
  }
  return col;
}
`;

function makeGeoUniforms() {
  const apArr = AIRPORTS.slice(0, 4).map((a) => new THREE.Vector4(a.center.x, a.center.z, 0, 0));
  while (apArr.length < 4) apArr.push(new THREE.Vector4(1e7, 1e7, 0, 0)); // シェーダ側 vec4[4] と長さ一致（未使用スロットは uApN で break される）
  const uAirports = { value: apArr };
  const uApN = { value: Math.min(4, AIRPORTS.length) };
  return { uAirports, uApN };
}

interface LevelCfg { size: number; seg: number; parent: number; half: number; morphW: number; snap: number }

interface Level { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; depth: THREE.MeshDepthMaterial; cfg: LevelCfg; u: Record<string, THREE.IUniform> }
function buildLevel(cfg: LevelCfg, nearSeg: number): Level {
  const seg = cfg.parent === 0 ? cfg.seg : (cfg.size <= 2200 ? nearSeg : cfg.seg);
  const geo = new THREE.PlaneGeometry(cfg.size, cfg.size, seg, seg);
  geo.rotateX(-Math.PI / 2);
  // 変位後の高さ（最大約 2600m）を考慮したバウンディング球
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), Math.hypot(cfg.size * 0.71, 3000));

  const uni = makeGeoUniforms();
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.94, metalness: 0.0 });
  (mat as unknown as { glslVersion: string }).glslVersion = THREE.GLSL3;
  const local = {
    uSnap: { value: new THREE.Vector2(0, 0) },
    uSpacing: { value: cfg.size / seg },
    uParent: { value: cfg.parent },
    uHalf: { value: cfg.half },
    uMorphW: { value: cfg.morphW },
    uDetail: { value: detailTex() },
    // v15-B: 侵食ベイク（未ロード時は 1×1 無効テーブル → 従来動作と完全一致）
    uEro: { value: dummyEro() },
    uShade: { value: dummyShade() },
    uEroGeo: { value: (() => { const st = bakeState(); return st ? new THREE.Vector4(st.cell, st.min, st.min, st.N) : new THREE.Vector4(1, 0, 0, 1); })() },
    // v23: 光場（AO・太陽2方向影・流域流量）/ splat タイル / 大気・影ミックス
    uLight: { value: dummyLight() },
    uSplatG: { value: splatTex()[0] },
    uSplatD: { value: splatTex()[1] },
    uSplatR: { value: splatTex()[2] },
    uSplatS: { value: splatTex()[3] },
    uSunView: { value: new THREE.Vector3(0.55, 0.62, 0.28) },
    uFogWarm: { value: new THREE.Color(1.0, 0.93, 0.8) },
    uShadeMix: { value: 0 },
    uShadeAmt: { value: 1 }
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
      .replace('#include <color_fragment>', '#include <color_fragment>\n  diffuseColor.rgb = terrainColorV(cameraPosition);\n  diffuseColor.rgb *= 1.0 + (gDet - 0.5) * vec3(0.44, 0.34, 0.26) * gDetQ;')
      .replace('#include <clipping_planes_fragment>',
               '#include <clipping_planes_fragment>\nif (vTH < -3.0) discard;\n{ gDetQ = 1.0 - smoothstep(320.0, 2600.0, length(cameraPosition - vec3(vTXZ.x, vTH, vTXZ.y)));\n  gDet = texture2D(uDetail, vTXZ * (1.0 / 30.0)).rgb;\n  gLight = texture2D(uLight, (vTXZ - uEroGeo.yz) / (uEroGeo.x * uEroGeo.w)); }')
      .replace('#include <normal_fragment_begin>',
               '#include <normal_fragment_begin>\nif (vTH > -2.0 && (gDetQ > 0.01 || bakeQ() > 0.01)) {\n  float eD = 0.0533333;\n  vec2 duv = vTXZ * (1.0 / 30.0);\n  float hx = texture2D(uDetail, duv + vec2(eD, 0.0)).r - texture2D(uDetail, duv - vec2(eD, 0.0)).r;\n  float hz = texture2D(uDetail, duv + vec2(0.0, eD)).r - texture2D(uDetail, duv - vec2(0.0, eD)).r;\n  vec4 sb = texture2D(uShade, (vTXZ - uEroGeo.yz) / (uEroGeo.x * uEroGeo.w));\n  vec3 nW = (inverse(viewMatrix) * vec4(normal, 0.0)).xyz;\n  nW += vec3(-hx, 0.0, -hz) * 2.6 * gDetQ;\n  nW += vec3(-(sb.r - 0.5), 0.0, -(sb.g - 0.5)) * 1.5 * bakeQ();\n  normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);\n}')
      .replace('#include <fog_fragment>',
               '#include <fog_fragment>\n#ifdef USE_FOG\n  float haze = smoothstep(4500.0, 15000.0, vFogDepth) * 0.45 + smoothstep(13000.0, 24000.0, vFogDepth) * 0.55;\n  // v23: 高さフォグ（低い所ほど濃い）+ 太陽方向の前方散乱（明るく暖色に）\n  float altF = 0.40 + 0.60 * exp(-max(vTH, 0.0) * 0.00135) * (0.72 + 0.28 * exp(-max(cameraPosition.y, 0.0) * 0.0011));\n  vec3 vd = normalize(vec3(vTXZ.x, vTH, vTXZ.y) - cameraPosition);\n  float fwd = pow(clamp(dot(vd, normalize(uSunView)), 0.0, 1.0), 3.2);\n  vec3 fcol = mix(fogColor, uFogWarm, fwd * 0.60);\n  gl_FragColor.rgb = mix(gl_FragColor.rgb, fcol, min(1.0, haze * altF * (0.86 + 0.5 * fwd)));\n#endif');
  };
  mat.customProgramCacheKey = () => 'terrain-v2-' + cfg.size + (bakeState() ? '-B' : '-b');

  const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  (depth as unknown as { glslVersion: string }).glslVersion = THREE.GLSL3;
  const localD = {
    uSnap: local.uSnap, uSpacing: local.uSpacing, uParent: local.uParent, uHalf: local.uHalf, uMorphW: local.uMorphW,
    uEro: local.uEro, uEroGeo: local.uEroGeo
  };
  depth.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uni, localD);
    shader.fragmentShader = GLSL3_OUT + shader.fragmentShader;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\n' + GLSL_LIB)
      .replace('#include <begin_vertex>', GLSL_VS_DISP);
  };
  depth.customProgramCacheKey = () => 'terrain-v2-depth-' + cfg.size + (bakeState() ? '-B' : '-b');

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
  /** v23: 環境追従 — 太陽方向（大気の前方散乱）・ベイク影ミックス（昼=0/夕=1）・減幅度 */
  setAtmos(o: { sunDir: THREE.Vector3; warm: THREE.Color; shadeMix: number; shadeAmt: number }): void;
  levels: Level[];
}

export function buildTerrain(scene: THREE.Scene, nearSeg = 160, midOn = true): TerrainObjects {
  const group = new THREE.Group();
  // 遠: 48km/250m（morph なし）／中: 8km/50m（親250）／近: 2km/12.5m（親50 or 250）
  const coarse = buildLevel({ size: 48000, seg: 152, parent: 0, half: 24000, morphW: 0, snap: 0 }, nearSeg);
  const mid = buildLevel({ size: 8000, seg: 128, parent: 250, half: 4000, morphW: 500, snap: 250 }, nearSeg);
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
    },
    setAtmos(o) {
      const u = coarse.u;
      (u.uSunView.value as THREE.Vector3).copy(o.sunDir);
      (u.uFogWarm.value as THREE.Color).copy(o.warm);
      u.uShadeMix.value = o.shadeMix;
      u.uShadeAmt.value = o.shadeAmt;
    }
  };
}

