/**
 * render/clouds.ts — 立体感のある雲（クラスタースプライト + 雲影）
 * 低層積雲クラスター（複数スプライトの塊）+ 高層巻雲 + 地表の雲影パッチ。
 * iPhone 配慮: Sprite のみ・シェーダなしで軽量。
 */
import * as THREE from 'three';
import { makeRandom, clamp } from '../core/math.js';
import { terrainHeight } from './terrain.js';
import { makeCloudTexture } from './textures.js';

export interface CloudObjects {
  group: THREE.Group;
  update(dt: number): void;
  /** 雲の表示密度（0=無し, 1=通常, >1=全て） */
  setDensity(scale: number): void;
  /** 雲の暗さ 0..1（雨天の鉛色雲） */
  setDarken(v: number): void;
}

export function buildClouds(scene: THREE.Scene, count: number): CloudObjects {
  const group = new THREE.Group();
  const rand = makeRandom(918273);

  // テクスチャ 3 種
  const texA = makeCloudTexture(11, true);
  const texB = makeCloudTexture(23, true);
  const texC = makeCloudTexture(47, false);

  const shadowGeo = new THREE.CircleGeometry(1, 20);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x223344,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    fog: true,
    // 地形より手前（-3）: 雲影の円盤は地形とほぼ平行な巨大平面なので、
    // 離隔だけでは遠方（深度精度が数 m〜十数 m）で地形と順位が入れ替わり明滅する
    polygonOffset: true,
    polygonOffsetFactor: 0,
    polygonOffsetUnits: 0
  });

  const clusterCount = Math.round(count * 0.62);
  for (let i = 0; i < clusterCount; i++) {
    // 低層積雲クラスター
    const cx = (rand() - 0.5) * 36000;
    const cz = (rand() - 0.5) * 36000;
    const cy = 1200 + rand() * 1400;
    const scale = 420 + rand() * 620;
    const puffs = 4 + Math.floor(rand() * 5);

    for (let p = 0; p < puffs; p++) {
      const mat = new THREE.SpriteMaterial({
        map: rand() > 0.5 ? texA : texB,
        transparent: true,
        opacity: 0.78 + rand() * 0.18,
        depthWrite: false,
        fog: true
      });
      const sp = new THREE.Sprite(mat);
      sp.position.set(
        cx + (rand() - 0.5) * scale * 1.6,
        cy + (rand() - 0.35) * scale * 0.34,
        cz + (rand() - 0.5) * scale * 1.3
      );
      const s = scale * (0.55 + rand() * 0.6);
      sp.scale.set(s, s * 0.52, 1);
      sp.renderOrder = 2;
      group.add(sp);
    }

    // 雲影（地形上に薄い暗円盤）
    const gy = terrainHeight(cx, cz);
    if (gy > -2) {
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      // 離隔 22m: 遠方の深度分解能（near=2.5 で 10km 先 ≈ 2.4m / 20km 先 ≈ 9.5m）に対し
      // 十分な余裕を持たせ、polygonOffset と併せて地形との食い違いを無くす
      shadow.position.set(cx, gy + 60, cz);
      const ss = scale * 1.9;
      shadow.scale.set(ss, ss, 1);
      group.add(shadow);
    }
  }

  // 高層巻雲（横に長く薄く）
  const cirrusCount = Math.round(count * 0.38);
  for (let i = 0; i < cirrusCount; i++) {
    const mat = new THREE.SpriteMaterial({
      map: texC,
      transparent: true,
      opacity: 0.30 + rand() * 0.22,
      depthWrite: false,
      fog: true
    });
    const sp = new THREE.Sprite(mat);
    sp.position.set((rand() - 0.5) * 42000, 4600 + rand() * 1600, (rand() - 0.5) * 42000);
    const s = 2400 + rand() * 3400;
    sp.scale.set(s, s * 0.16, 1);
    sp.renderOrder = 1;
    group.add(sp);
  }

  // 静的にしておき、カメラに僅かに追随（動きは風でドリフト）
  let drift = 0;
  scene.add(group);

  // 密度・暗さ制御用にスプライトを記録（雲影は除外）
  const sprites: THREE.Sprite[] = [];
  const baseOpacity: number[] = [];
  for (const ch of group.children) {
    if ((ch as THREE.Sprite).isSprite) {
      const sp = ch as THREE.Sprite;
      sprites.push(sp);
      baseOpacity.push((sp.material as THREE.SpriteMaterial).opacity);
    }
  }

  return {
    group,
    update(dt: number) {
      drift += dt * 2.2;
      if (drift > 40000) drift = 0;
      group.position.x = (drift % 800) - 400;
    },
    setDensity(scale: number) {
      const s = Math.max(0, Math.min(1, scale));
      const n = sprites.length;
      for (let i = 0; i < n; i++) {
        // 決定的な順序で先頭 s 割を表示
        sprites[i].visible = n === 0 ? true : i / n < s;
      }
    },
    setDarken(v: number) {
      const k = Math.max(0, Math.min(1, v));
      for (let i = 0; i < sprites.length; i++) {
        const mat = sprites[i].material as THREE.SpriteMaterial;
        // 白 → すすけた灰色へ
        mat.color.setRGB(1 - 0.45 * k, 1 - 0.42 * k, 1 - 0.36 * k);
        mat.opacity = baseOpacity[i] * (1 - 0.25 * k);
      }
      shadowMat.opacity = 0.16 * (1 + k);
    }
  };
}

export function clampCloudOpacity(v: number): number {
  return clamp(v, 0.15, 0.95);
}
