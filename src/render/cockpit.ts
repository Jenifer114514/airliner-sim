/**
 * render/cockpit.ts — コックピット内装（計器盤・操縦桿・窓枠）
 * 機体グループに取り付けて表示（コックピットカメラ時のみ visible）。
 * 計器は Phase 4 で完全化。Phase 1 は静的計器盤テクスチャ。
 */
import * as THREE from 'three';
import type { AirlinerSpec } from '../config/aircraft.js';
import { makePanelTexture } from './textures.js';

export interface CockpitParts {
  group: THREE.Group;
  update(): void;
}

export function buildCockpit(spec: AirlinerSpec): CockpitParts {
  const group = new THREE.Group();
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
  group.add(panel);

  // グレアシールド
  const glare = new THREE.Mesh(new THREE.BoxGeometry(R * 1.7, 0.10, R * 0.55), matDark);
  glare.position.set(0, R * 0.18, L * 0.33);
  glare.rotation.x = -0.18;
  group.add(glare);

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
    group.add(yoke);
  }

  // 窓枠（A ピラー + 中央ポスト + 上部アイブロウ）
  for (const side of [-1, 1]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.10, R * 1.05, 0.14), matFrame);
    pillar.position.set(side * R * 0.62, R * 0.42, L * 0.385);
    pillar.rotation.x = -0.55;
    group.add(pillar);
    const sideWindow = new THREE.Mesh(new THREE.BoxGeometry(0.06, R * 0.5, R * 0.5), matFrame);
    sideWindow.position.set(side * R * 0.86, R * 0.28, L * 0.31);
    group.add(sideWindow);
  }
  const centerPost = new THREE.Mesh(new THREE.BoxGeometry(0.09, R * 1.0, 0.12), matFrame);
  centerPost.position.set(0, R * 0.42, L * 0.395);
  centerPost.rotation.x = -0.55;
  group.add(centerPost);
  const brow = new THREE.Mesh(new THREE.BoxGeometry(R * 1.5, 0.12, 0.35), matDark);
  brow.position.set(0, R * 0.86, L * 0.345);
  brow.rotation.x = -0.35;
  group.add(brow);

  return {
    group,
    update() {
      // Phase 4 で計器針を動かす
    }
  };
}
