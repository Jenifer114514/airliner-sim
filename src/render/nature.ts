/**
 * render/nature.ts — 森林（チャンクバケット InstancedMesh + 距離 LOD、v16）
 * 配置計算は world/layout.ts（computeNature）。ここでは GPU リソース化のみ。
 * 近いバケット: 2 段コーン樹冠（頂点色）+ 樹幹 / 遠いバケット: 単コーン Lambert。
 * 各メッシュ computeBoundingSphere 済み → チャンク単位で Frustum Culling が効く。
 */
import * as THREE from 'three';
import { getNatureLayout } from '../world/prime.js';
import type { Bucket } from '../world/layout.js';
import { registerLod, LOD_NEAR } from './lod.js';

export function buildNature(scene: THREE.Scene, count: number): THREE.Group {
  const L = getNatureLayout(count);
  const group = new THREE.Group();

  // 樹冠（2 段コーン結合）
  const cone1 = new THREE.ConeGeometry(2.6, 8, 6);
  cone1.translate(0, 6.2, 0);
  const cone2 = new THREE.ConeGeometry(1.9, 6, 6);
  cone2.translate(0, 10.2, 0);
  const foliageGeo = mergeGeoms(cone1, cone2);
  const trunkGeo = new THREE.CylinderGeometry(0.36, 0.52, 3.6, 5);
  trunkGeo.translate(0, 1.8, 0);
  // 遠景用の単コーン（1 mesh・影なし・頂点色なし）
  const foliageGeoLo = new THREE.ConeGeometry(2.5, 11, 4);
  foliageGeoLo.translate(0, 6.6, 0);

  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x2f5232, roughness: 0.88 });
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x584434, roughness: 0.9 });
  const loMat = new THREE.MeshLambertMaterial({ color: 0x2c4c30 });

  const lodEntries: Array<{ hi: THREE.Object3D[]; lo: THREE.Object3D; b: Bucket }> = [];
  for (const b of L.buckets) {
    const foliage = new THREE.InstancedMesh(foliageGeo, foliageMat, b.n);
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, b.n);
    for (const m of [foliage, trunks]) {
      (m.instanceMatrix.array as Float32Array).set(b.m);
      m.instanceMatrix.needsUpdate = true;
      m.computeBoundingSphere();
    }
    foliage.instanceColor = new THREE.InstancedBufferAttribute(b.c, 3);
    foliage.instanceColor.needsUpdate = true;
    foliage.castShadow = true;
    group.add(foliage, trunks);
    const lo = new THREE.InstancedMesh(foliageGeoLo, loMat, b.n);
    (lo.instanceMatrix.array as Float32Array).set(b.m);
    lo.instanceMatrix.needsUpdate = true;
    lo.computeBoundingSphere();
    group.add(lo);
    lodEntries.push({ hi: [foliage, trunks], lo, b });
  }

  registerLod({
    update: (cam: THREE.Vector3) => {
      for (const e of lodEntries) {
        const n = Math.hypot(e.b.cx - cam.x, e.b.cz - cam.z) < LOD_NEAR;
        if (e.hi[0].visible !== n) {
          for (const h of e.hi) h.visible = n;
          e.lo.visible = !n;
        }
      }
    }
  });

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
