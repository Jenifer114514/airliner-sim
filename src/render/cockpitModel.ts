/**
 * render/cockpitModel.ts — 実機風コックピット GLB（任意アセット）
 *
 * public/cockpit.glb があればコックピット視点で手続コックピットの代わりに表示する。
 * 無い / 読み込み失敗 / ?nocockpitmodel=1 のときは null を返し、手続コックピットのまま動く
 * （extModel.ts の airliner.glb と同じフォールバック契約）。
 *
 * cockpit.glb は scripts/optimize-cockpit.py が作る。座標規約:
 *   原点 = 機長の目 / +Z = 機首 / +Y = 上 / +X = 機体左 / 単位 m
 *
 * 設計メモ
 *  - テンプレートは一度だけ parse して全フライトで共有する。インスタンスは clone(true) で
 *    geometry / material / texture を共有し、`userData.sharedResources` を立てて
 *    game.ts の disposeSubtree から保護する（破棄すると次の飛行で壊れる）。
 *  - 影は落とさず受けもしない（室内は太陽の影マップの範囲外で、自己影のアーティファクトになる）。
 *  - 室内は太陽が直接当たるが影が無いため、ベース色テクスチャを弱いエミッシブとして重ね、
 *    昼夜の環境光（hemi 光）に追従させて暗部を底上げする。
 *  - テクスチャ（約 120MB の GPU 推定）の GPU アップロードを 1 フレーム 1 枚に分散する。
 *
 * ライセンス: 同梱を想定するモデルは CC-BY-NC-SA-4.0（非営利・要クレジット・継承）。
 *            公開リポジトリ / GitHub Pages には置かない（docs/cockpit-model.md 参照）。
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { AirlinerSpec } from '../config/aircraft.js';

/** モデルを共有・公開する場合は、必ずこの表記を併記すること。 */
export const COCKPIT_MODEL_CREDIT =
  'This work is based on "Boeing 757-200 Icelandair Cockpit" ' +
  '(https://sketchfab.com/3d-models/boeing-757-200-icelandair-cockpit-1cb8f8109cb145849282ad703a652859) ' +
  'by VTX (https://sketchfab.com/VTX_car) ' +
  'licensed under CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)';

const MODEL_FILE = 'cockpit.glb';
/** モデル元（B757）の胴体半径 [m]。これより太い機体では内装を少し拡大する */
const REF_RADIUS = 1.88;
const MAX_SCALE = 1.15;
/** 暗部底上げのエミッシブ強度（昼, fill=1 のとき） */
const FILL_BASE = 0.22;

interface Template {
  root: THREE.Group;
  fillMats: THREE.MeshStandardMaterial[];
  textures: THREE.Texture[];
}

let loading: Promise<Template | null> | null = null;
let tpl: Template | null = null;
let warmIndex = 0;
let lastFill = -1;

/** 一度だけ読む（全機体・全フライトで共有）。fetch / parse 失敗は null。 */
export function loadCockpitModel(): Promise<THREE.Group | null> {
  if (typeof window === 'undefined' || typeof fetch !== 'function') return Promise.resolve(null);
  if (new URLSearchParams(window.location.search).has('nocockpitmodel')) return Promise.resolve(null);
  loading ??= (async (): Promise<Template | null> => {
    try {
      const base = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? './';
      const res = await fetch(base + MODEL_FILE, { cache: 'force-cache' });
      if (!res.ok) return null;
      const buf = await res.arrayBuffer();
      // dev サーバは存在しないパスに index.html を返すことがある → 'glTF' マジックで弾く
      if (buf.byteLength < 12 || new DataView(buf).getUint32(0, true) !== 0x46546c67) return null;
      const gltf = await new Promise<{ scene: THREE.Group } | null>((ok) => {
        new GLTFLoader().parse(
          buf,
          '',
          (g) => ok(g as unknown as { scene: THREE.Group }),
          () => ok(null)
        );
      });
      if (!gltf) return null;
      tpl = prepare(gltf.scene);
      console.info('[cockpit]', COCKPIT_MODEL_CREDIT);
      return tpl;
    } catch {
      return null;
    }
  })();
  return loading.then((t) => t?.root ?? null);
}

/** テンプレートの下ごしらえ（影の無効化・暗部底上げ・テクスチャ収集） */
function prepare(root: THREE.Group): Template {
  const fillMats = new Set<THREE.MeshStandardMaterial>();
  const textures = new Set<THREE.Texture>();
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.matrixAutoUpdate = false; // 内装は静的: 毎フレームの行列更新を省く
    mesh.updateMatrix();
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) {
      const std = m as THREE.MeshStandardMaterial;
      if (!std.isMeshStandardMaterial) continue;
      std.envMapIntensity = 0.8;
      // 不透明で自前のエミッシブが無いパネル類: ベース色を弱いエミッシブとして重ねる（暗部の底上げ）
      if (!std.transparent && std.map && !std.emissiveMap) {
        std.emissive.set(0xffffff);
        std.emissiveMap = std.map;
        std.emissiveIntensity = FILL_BASE;
        fillMats.add(std);
      }
      for (const t of [std.map, std.emissiveMap]) {
        if (t) {
          t.anisotropy = 4; // 実際の上限は three 側が GPU 能力にクランプする
          textures.add(t);
        }
      }
    }
  });
  return { root, fillMats: [...fillMats], textures: [...textures] };
}

/**
 * 読み込み済みなら、機体用にインスタンス化して返す（未読み込みは null）。
 * 原点＝機長の目。呼び出し側が cockpitEyeLocal() の位置へ置く。
 */
export function instantiateCockpitModel(spec: AirlinerSpec): THREE.Group | null {
  if (!tpl) return null;
  const g = new THREE.Group();
  g.name = 'cockpit-model';
  g.add(tpl.root.clone(true)); // geometry / material / texture は共有
  g.scale.setScalar(Math.min(MAX_SCALE, Math.max(1, spec.fuselageRadius / REF_RADIUS)));
  g.userData.sharedResources = true;
  return g;
}

/** 昼夜の環境光に合わせて暗部の底上げ量を調整（fill: 昼 1 / 夜 ≈ 0.12）。 */
export function setCockpitFill(fill: number): void {
  if (!tpl || Math.abs(fill - lastFill) < 0.01) return;
  lastFill = fill;
  for (const m of tpl.fillMats) m.emissiveIntensity = FILL_BASE * fill;
}

/**
 * テクスチャの GPU アップロードを 1 フレーム 1 枚に分散する。
 * 毎フレーム呼んでよい（全部終われば何もしない）。
 */
export function warmCockpitTextures(renderer: THREE.WebGLRenderer): void {
  if (!tpl || warmIndex >= tpl.textures.length) return;
  renderer.initTexture(tpl.textures[warmIndex++]);
}
