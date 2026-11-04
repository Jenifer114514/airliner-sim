/**
 * render/nature.ts — 森林（InstancedMesh 2 種: 樹冠 + 樹幹）
 * 空港の西〜北の丘陵地帯に樹林帯を作る。
 */
import * as THREE from 'three';
import { makeRandom, clamp } from '../core/math.js';
import { terrainHeight } from './terrain.js';

export function buildNature(scene: THREE.Scene, count: number): THREE.Group {
  const group = new THREE.Group();
  const rand = makeRandom(777001);

  // 樹冠（2 段コーン結合）
  const cone1 = new THREE.ConeGeometry(2.6, 8, 6);
  cone1.translate(0, 6.2, 0);
  const cone2 = new THREE.ConeGeometry(1.9, 6, 6);
  cone2.translate(0, 10.2, 0);
  const foliageGeo = mergeGeoms(cone1, cone2);
  const trunkGeo = new THREE.CylinderGeometry(0.36, 0.52, 3.6, 5);
  trunkGeo.translate(0, 1.8, 0);

  const foliage = new THREE.InstancedMesh(
    foliageGeo,
    new THREE.MeshStandardMaterial({ color: 0x2f5232, roughness: 0.88 }),
    count
  );
  const trunks = new THREE.InstancedMesh(
    trunkGeo,
    new THREE.MeshStandardMaterial({ color: 0x584434, roughness: 0.9 }),
    count
  );
  foliage.castShadow = true;

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  let placed = 0;
  let guard = 0;
  while (placed < count && guard++ < count * 40) {
    const angle = rand() * Math.PI * 2;
    const radius = 3800 + rand() * 14000;
    const x = Math.cos(angle) * radius - 2000;
    const z = Math.sin(angle) * radius - 2000;
    const y = terrainHeight(x, z);
    if (y < 12 || y > 520) continue;
    const slope = Math.hypot(
      terrainHeight(x + 40, z) - y,
      terrainHeight(x, z + 40) - y
    ) / 40;
    if (slope > 0.85) continue;

    const s = 0.8 + rand() * 1.5;
    dummy.position.set(x, y - 0.6, z);
    dummy.rotation.y = rand() * Math.PI * 2;
    dummy.scale.set(s, s * (0.85 + rand() * 0.55), s);
    dummy.updateMatrix();
    foliage.setMatrixAt(placed, dummy.matrix);
    trunks.setMatrixAt(placed, dummy.matrix);
    const tint = 0.72 + rand() * 0.45;
    color.setRGB(tint * 0.9, tint, tint * 0.82);
    foliage.setColorAt(placed, color);
    placed++;
  }
  foliage.count = placed;
  trunks.count = placed;
  foliage.instanceMatrix.needsUpdate = true;
  trunks.instanceMatrix.needsUpdate = true;
  if (foliage.instanceColor) foliage.instanceColor.needsUpdate = true;

  group.add(foliage, trunks);
  scene.add(group);
  return group;
}

function mergeGeoms(a: THREE.BufferGeometry, b: THREE.BufferGeometry): THREE.BufferGeometry {
  const ai = a.toNonIndexed();
  const bi = b.toNonIndexed();
  const pos = new Float32Array(ai.attributes.position.array.length + bi.attributes.position.array.length);
  pos.set(ai.attributes.position.array as Float32Array, 0);
  pos.set(bi.attributes.position.array as Float32Array, ai.attributes.position.array.length);
  const norm = new Float32Array(ai.attributes.normal.array.length + bi.attributes.normal.array.length);
  norm.set(ai.attributes.normal.array as Float32Array, 0);
  norm.set(bi.attributes.normal.array as Float32Array, ai.attributes.normal.array.length);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(norm, 3));
  return geo;
}

export function clampTreeScale(s: number): number {
  return clamp(s, 0.5, 2.5);
}
