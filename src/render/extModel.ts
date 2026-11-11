// ═════════════════ v24: 外部 GLB 実モデル差し替え（機体外観） ═════════════════
// public/airliner.glb があれば buildAirliner の外観を差し替える。手順:
//  1) ブート時 fetch+parse したテンプレを全機体で共有（clone は geometry/material 共有）
//  2) 手続グループの children を proc ラッパへ束ねて非表示（gear/flap アニメの
//     個別 visible トグルに干渉されない）→ 手続は ?nomodel=1 で従来描画
//  3) 寸法合わせ: 前後軸は Prop/Spinner ノードの偏りで自動検出し +Z（本シムの機首）へ
//     90° 単位回転、全長を手続 bbox の z スパンへ統一。下面（車輪/フロート）を
//     手続の下面＝接地面に揃える。
// 不在/parse 失敗は false を返し手続機体のまま（テスト・フォールバック契約）。
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface GltfLite {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

interface ExtModelHandle {
  root: THREE.Group;
  mixer: THREE.AnimationMixer;
  /** 整定情報（検証用・素数値のみ）: [modelLen*scale, modelSpan, modelH] と全長基準 */
  fit: { size: number[]; refLen: number; scale: number };
  /** 再生アニメ数（v26: アニメなし GLB でも ⑤ 検証が落ちないように） */
  clips: number;
  /** v26: 機体に内蔵されたコックピット（MergedCockpit）。コックピット視点では非表示に */
  mergedCockpit: THREE.Object3D | null;
}

/** v26: airliner.glb（787 Singapore + 757 cockpit 内蔵の結合モデル）のクレジット */
export const AIRLINER_MODEL_CREDIT =
  'This work is based on "Boeing 787-9 Singapore Airlines" ' +
  '(sketchfab.com/3d-models/boeing-787-9-singapore-airlines-d383b7e3b858407e8cff7365820cc4dd) ' +
  'by mudkipz321 (sketchfab.com/mudkipz321), licensed under CC-BY-4.0. ' +
  'The embedded cockpit is based on "Boeing 757-200 Icelandair Cockpit" by VTX, CC-BY-NC-SA-4.0.';

let template: Promise<GltfLite | null> | null = null;
let creditLogged = false;

/** 一度だけ読む（複数機体で共有）。fetch/parse 失敗は null。 */
export function extModelTemplate(): Promise<GltfLite | null> {
  if (typeof window === 'undefined' || typeof fetch !== 'function') return Promise.resolve(null);
  if (new URLSearchParams(window.location.search).has('nomodel')) return Promise.resolve(null);
  template ??= (async (): Promise<GltfLite | null> => {
    try {
      const url = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? './';
      // v27: no-cache（force-cache だと 404 応答の再生成後も古い NotFound が使い回され機体が消える）
      const res = await fetch(url + 'airliner.glb', { cache: 'no-cache' });
      if (!res.ok) { console.warn('[ext] airliner.glb fetch 失敗:', res.status, url + 'airliner.glb'); return null; }
      const buf = await res.arrayBuffer();
      return await new Promise<GltfLite | null>((ok) => {
        new GLTFLoader().parse(
          buf, '',
          (g) => ok(g as unknown as GltfLite),
          (e) => { console.warn('[ext] GLB parse 失敗:', e); ok(null); }
        );
      });
    } catch (e) {
      console.warn('[ext] airliner.glb 読込例外:', e);
      return null;
    }
  })();
  return template;
}

/** buildAirliner の group に実モデルを接続。proc は非表示化。成功時 true。 */
export async function attachExtModel(group: THREE.Group): Promise<boolean> {
  // buildAirliner 直後、機体がワールドに配置される前にローカル基準を保存する。
  // 読込完了を待ってから測ると移動・回転後のワールド座標やコックピットが混ざり、
  // その座標を子のローカル位置として使うことでモデルが機体から遠く離れてしまう。
  const pb = new THREE.Box3().setFromObject(group);
  const pc = pb.getCenter(new THREE.Vector3());
  const ps = pb.getSize(new THREE.Vector3());
  const t = await extModelTemplate();
  if (!t) return false;
  if (group.userData.extModel) return false; // 二重接続ガード

  const root = t.scene.clone(true);
  const mixer = new THREE.AnimationMixer(root);
  for (const a of t.animations) mixer.clipAction(a).play();

  root.updateMatrixWorld(true);
  const mb = new THREE.Box3().setFromObject(root);
  const ms = mb.getSize(new THREE.Vector3());
  const mc = mb.getCenter(new THREE.Vector3());

  // 前後軸検出: 水平で長い軸 → Prop/Spinner ノード重心の偏りで機首符号
  const fwdAxis: 'x' | 'z' = ms.x >= ms.z ? 'x' : 'z';
  const propC = new THREE.Vector3();
  let propN = 0;
  root.traverse((o) => {
    if (/prop|spinner/i.test(o.name)) {
      propC.add(o.getWorldPosition(new THREE.Vector3()));
      propN++;
    }
  });
  let sign = 1;
  if (propN > 0) {
    propC.divideScalar(propN);
    sign = (fwdAxis === 'x' ? propC.x - mc.x : propC.z - mc.z) >= 0 ? 1 : -1;
  }
  const scale = ps.z / Math.max(ms[fwdAxis], 0.001);
  root.scale.setScalar(scale);
  // 検出した機首方向 → シム機首 +Z への 90° 単位回転
  root.rotation.y = fwdAxis === 'x' ? (sign > 0 ? -Math.PI / 2 : Math.PI / 2) : (sign > 0 ? 0 : Math.PI);

  root.updateMatrixWorld(true);
  const mb2 = new THREE.Box3().setFromObject(root);
  root.position.x += pc.x - mb2.getCenter(new THREE.Vector3()).x;
  root.position.z += pc.z - mb2.getCenter(new THREE.Vector3()).z;
  root.position.y += pb.min.y - mb2.min.y; // 下面（接地面）揃え

  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) m.castShadow = true;
  });

  // proc 束ね → 非表示（個別 visible トグルの影響を受けない）→ root を兄弟へ
  const proc = new THREE.Group();
  for (const c of [...group.children]) {
    if (c.userData.keepOutOfProc) continue; // コックピット群は手続機体ではない（非同期接続で隠れるバグ防止）
    group.remove(c);
    proc.add(c);
  }
  proc.visible = false;
  group.add(proc, root);
  const fs2 = new THREE.Box3().setFromObject(root).getSize(new THREE.Vector3());
  // v26: 内蔵コックピット（MergedCockpit / extras.mergedCockpit）を特定
  let mergedCockpit: THREE.Object3D | null = null;
  root.traverse((o) => {
    if (!mergedCockpit && (o.name === 'MergedCockpit' || o.userData?.extras?.mergedCockpit || (o.userData as { mergedCockpit?: boolean })?.mergedCockpit)) {
      mergedCockpit = o;
    }
  });
  group.userData.extModel = {
    root, mixer,
    fit: { size: [+fs2.x.toFixed(2), +fs2.y.toFixed(2), +fs2.z.toFixed(2)], refLen: +ps.z.toFixed(2), scale: +scale.toFixed(4) },
    clips: t.animations.length,
    mergedCockpit
  } satisfies ExtModelHandle;
  if (!creditLogged) { creditLogged = true; console.info('[ext]', AIRLINER_MODEL_CREDIT); }
  return true;
}

/** 機体の毎フレーム（spinFans に相乗り）。プロペラ等のクリップ再生。 */
export function updateExtModel(group: THREE.Group, dt: number): void {
  const h = group.userData.extModel as ExtModelHandle | undefined;
  if (!h) return;
  if (h.clips > 0) h.mixer.update(dt);
  // v26: コックピット視点では機体内蔵の cockpit を隠す（専用 cockpit.glb と二重描画防止）
  if (h.mergedCockpit) h.mergedCockpit.visible = !group.userData.extCockpitView;
}
