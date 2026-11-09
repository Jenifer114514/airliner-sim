/**
 * render/cockpit.ts — コックピット内装（計器盤・操縦桿・窓枠）
 * 機体グループに取り付けて表示（コックピットカメラ時のみ visible）。
 * 計器は Phase 4 で完全化。Phase 1 は静的計器盤テクスチャ。
 *
 * public/cockpit.glb（実機風モデル, render/cockpitModel.ts）が読み込めた場合は、
 * 手続の内装（proc）を隠してモデルに差し替える。読み込み前・失敗時は手続コックピットのまま。
 */
import * as THREE from 'three';
import type { AirlinerSpec } from '../config/aircraft.js';
import { makePanelTexture } from './textures.js';
import { cockpitEyeLocal } from './cameras.js';
import { instantiateCockpitModel, loadCockpitModel, setCockpitFill } from './cockpitModel.js';

export interface CockpitParts {
  group: THREE.Group;
  /** fill: 室内の環境光の強さ（昼 1 / 夜 ≈ 0.12）。GLB コックピットの暗部底上げに使う */
  update(fill?: number): void;
  /** GLB モデルに差し替え済みか（検証用） */
  hasModel(): boolean;
}

export function buildCockpit(spec: AirlinerSpec): CockpitParts {
  const group = new THREE.Group();
  // extModel の「手続機体を束ねて非表示」から除外する（非同期接続でコックピットが隠れるのを防ぐ）
  group.userData.keepOutOfProc = true;
  const proc = new THREE.Group(); // 手続の内装（GLB が使えるときは非表示）
  group.add(proc);
  const R = spec.fuselageRadius;
  const L = spec.fuselageLength;

  const matDark = new THREE.MeshStandardMaterial({ color: 0x232a32, metalness: 0.25, roughness: 0.7 });
  const matPanel = new THREE.MeshStandardMaterial({
    map: makePanelTexture(),
    metalness: 0.15,
    roughness: 0.55,
    emissive: 0x223344,
    emissiveIntensity: 0.35
  });
  const matFrame = new THREE.MeshStandardMaterial({ color: 0x3a4048, metalness: 0.5, roughness: 0.5 });

  // 計器盤（パイロット目の前・やや下向き）
  const panel = new THREE.Mesh(new THREE.BoxGeometry(R * 1.55, R * 0.85, 0.12), matPanel);
  panel.position.set(0, -R * 0.28, L * 0.30);
  panel.rotation.x = 0.28;
  proc.add(panel);

  // グレアシールド
  const glare = new THREE.Mesh(new THREE.BoxGeometry(R * 1.7, 0.10, R * 0.55), matDark);
  glare.position.set(0, R * 0.18, L * 0.33);
  glare.rotation.x = -0.18;
  proc.add(glare);

  // 操縦桿（2 本）
  for (const side of [-1, 1]) {
    const yoke = new THREE.Group();
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, R * 0.55, 8), matFrame);
    column.position.y = R * 0.26;
    yoke.add(column);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(R * 0.16, 0.032, 8, 18, Math.PI), matFrame);
    handle.position.y = R * 0.52;
    handle.rotation.x = Math.PI / 2;
    yoke.add(handle);
    yoke.position.set(side * R * 0.52, -R * 0.22, L * 0.34);
    proc.add(yoke);
  }

  // 窓枠（A ピラー + 中央ポスト + 上部アイブロウ）
  for (const side of [-1, 1]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.10, R * 1.05, 0.14), matFrame);
    pillar.position.set(side * R * 0.62, R * 0.42, L * 0.385);
    pillar.rotation.x = -0.55;
    proc.add(pillar);
    const sideWindow = new THREE.Mesh(new THREE.BoxGeometry(0.06, R * 0.5, R * 0.5), matFrame);
    sideWindow.position.set(side * R * 0.86, R * 0.28, L * 0.31);
    proc.add(sideWindow);
  }
  const centerPost = new THREE.Mesh(new THREE.BoxGeometry(0.09, R * 1.0, 0.12), matFrame);
  centerPost.position.set(0, R * 0.42, L * 0.395);
  centerPost.rotation.x = -0.55;
  proc.add(centerPost);
  const brow = new THREE.Mesh(new THREE.BoxGeometry(R * 1.5, 0.12, 0.35), matDark);
  brow.position.set(0, R * 0.86, L * 0.345);
  brow.rotation.x = -0.35;
  proc.add(brow);

  // ===== GLB コックピットへの差し替え =====
  let model: THREE.Group | null = null;
  const attachModel = (): void => {
    if (model) return;
    const m = instantiateCockpitModel(spec);
    if (!m) return;
    cockpitEyeLocal(spec.fuselageLength, m.position); // 原点＝機長の目 → カメラ位置に一致
    group.add(m);
    proc.visible = false;
    model = m;
  };
  attachModel(); // 読み込み済みなら即時（フラッシュ防止）
  if (!model) void loadCockpitModel().then(attachModel); // 未読み込みなら完了後に差し替え

  return {
    group,
    update(fill = 1) {
      if (model) setCockpitFill(fill);
      // Phase 4 で計器針を動かす
    },
    hasModel: () => model !== null
  };
}
