/**
 * render/city.ts — 市街地（チャンクバケット InstancedMesh + Texture Atlas + 距離 LOD）
 * 配置計算自体は world/layout.ts（worldgen worker と共有）が持つ。ここでは
 * レイアウト → GPU リソース化のみを行う。
 * v16: 2.4km 格子のバケットへ分割し、近いバケットは Standard+アトラス map+影、
 * 遠いは Lambert 単色（影なし）へ 0.25s 周期で切替。各メッシュは
 * computeBoundingSphere() 済みなので Frustum Culling がチャンク単位で効く。
 */
import * as THREE from 'three';
import { getCityLayout, primeTex } from '../world/prime.js';
import type { Bucket } from '../world/layout.js';
import { registerLod, LOD_NEAR } from './lod.js';

/** 建物当たり判定（main の衝突爆発用）。x,z=中心 r=半径 top=陸部高さ */
export const buildingColliders: { x: number; z: number; r: number; top: number }[] = [];

/** インスタンス番号→アトラス様式セル（0..15）。rand 非消費の決定論ハッシュ */
const faceOf = (i: number): number => (Math.imul(i + 1, 2654435761) >>> 27) & 15;

/** アトラス 4×4 セル選択を <uv_vertex> 後に上書きするシェーダパッチ */
function patchAtlasUV(mat: THREE.MeshStandardMaterial | THREE.MeshLambertMaterial): void {
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aFace;')
      .replace('#include <uv_vertex>', `#include <uv_vertex>
      {
        vec2 cell = vec2(mod(aFace, 4.0), floor(aFace * 0.25));
        #ifdef USE_MAP
        vMapUv = (uv + cell) * 0.25;
        #endif
        #ifdef USE_EMISSIVEMAP
        vEmissiveMapUv = (uv + cell) * 0.25;
        #endif
      }`);
  };
  mat.customProgramCacheKey = () => 'atlas-cell4x4';
}

export function buildCity(scene: THREE.Scene, count: number): THREE.Group {
  const L = getCityLayout(count);
  const group = new THREE.Group();

  // 建物コライダー（物理・衝突爆発）はレイアウトの flat 配列から復元
  buildingColliders.length = 0;
  {
    const c = L.colliders; // float64 のままなので値は旧実装とビット一致
    for (let i = 0; i + 3 < c.length; i += 4) {
      buildingColliders.push({ x: c[i], z: c[i + 1], r: c[i + 2], top: c[i + 3] });
    }
  }

  const geo = new THREE.BoxGeometry(1, 1, 1);
  geo.translate(0, 0.5, 0); // バウンディングボックスを底面基準に
  const atlas = primeTex('building')!;
  const atlasEm = primeTex('buildingEm')!;
  const mat = new THREE.MeshStandardMaterial({
    map: atlas,
    emissiveMap: atlasEm,
    emissive: new THREE.Color(0xffd9a0),
    emissiveIntensity: 0.0,
    metalness: 0.18,
    roughness: 0.72
  });
  patchAtlasUV(mat);
  const matLo = new THREE.MeshLambertMaterial({ color: 0x8d949d });

  const lodEntries: Array<{ hi: THREE.Object3D; lo: THREE.Object3D; b: Bucket }> = [];
  let faceSeq = 0;
  const addBucket = (b: Bucket) => {
    const gHi = geo.clone();
    const faces = new Float32Array(b.n);
    for (let i = 0; i < b.n; i++) faces[i] = faceOf(faceSeq++);
    gHi.setAttribute('aFace', new THREE.InstancedBufferAttribute(faces, 1));
    const hi = new THREE.InstancedMesh(gHi, mat, b.n);
    (hi.instanceMatrix.array as Float32Array).set(b.m);
    hi.instanceMatrix.needsUpdate = true;
    hi.instanceColor = new THREE.InstancedBufferAttribute(b.c, 3);
    hi.instanceColor.needsUpdate = true;
    hi.castShadow = true;
    hi.receiveShadow = true;
    hi.computeBoundingSphere();
    const lo = new THREE.InstancedMesh(geo, matLo, b.n);
    (lo.instanceMatrix.array as Float32Array).set(b.m);
    lo.instanceMatrix.needsUpdate = true;
    lo.computeBoundingSphere();
    group.add(hi, lo);
    lodEntries.push({ hi, lo, b });
  };
  for (const b of L.buckets) addBucket(b);

  // ---- 超高層タワー（towers）: スカイラインなので LOD せず常にフル ----
  const tMat = new THREE.MeshStandardMaterial({
    map: atlas,
    color: 0xbdd8ee,
    emissiveMap: atlasEm,
    emissive: new THREE.Color(0xfff0c8),
    emissiveIntensity: 0.0,
    metalness: 0.55,
    roughness: 0.3
  });
  patchAtlasUV(tMat);
  {
    const n = L.towers.n;
    const gT = geo.clone();
    const faces = new Float32Array(n);
    for (let i = 0; i < n; i++) faces[i] = faceOf(faceSeq++);
    gT.setAttribute('aFace', new THREE.InstancedBufferAttribute(faces, 1));
    const tMesh = new THREE.InstancedMesh(gT, tMat, n);
    tMesh.name = 'towers';
    (tMesh.instanceMatrix.array as Float32Array).set(L.towers.m);
    tMesh.instanceMatrix.needsUpdate = true;
    tMesh.instanceColor = new THREE.InstancedBufferAttribute(L.towers.c, 3);
    tMesh.instanceColor.needsUpdate = true;
    tMesh.castShadow = true;
    tMesh.receiveShadow = false;
    tMesh.computeBoundingSphere();
    group.add(tMesh);
  }

  // ---- 主要道路（地形追従リボン）----
  {
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x2e3339, roughness: 0.95 });
    const roadGeo = new THREE.BufferGeometry();
    roadGeo.setAttribute('position', new THREE.BufferAttribute(L.roads.pos, 3));
    roadGeo.setIndex(new THREE.BufferAttribute(L.roads.idx, 1));
    roadGeo.computeVertexNormals();
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.name = 'roads';
    roadMesh.receiveShadow = true;
    roadMesh.frustumCulled = true; // computeVertexNormals の後に球が作られる
    group.add(roadMesh);
  }

  // ---- 超高層の障害灯（赤ランビーコン: 塔頂に 1 灯。夜間のみ発光→bloom）----
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff2a18, fog: false, transparent: true, opacity: 0 });
  const beaconMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(1.6, 8, 6), beaconMat, Math.max(1, L.beacons.length / 3));
  beaconMesh.name = 'beacons';
  {
    const bm = new THREE.Matrix4();
    for (let i = 0; i * 3 + 2 < L.beacons.length; i++) {
      bm.makeTranslation(L.beacons[i * 3], L.beacons[i * 3 + 1], L.beacons[i * 3 + 2]);
      beaconMesh.setMatrixAt(i, bm);
    }
    beaconMesh.instanceMatrix.needsUpdate = true;
    beaconMesh.computeBoundingSphere();
  }
  group.add(beaconMesh);

  // ---- 距離 LOD（0.25s スロットルで game から呼ばれる）----
  registerLod({
    update: (cam: THREE.Vector3) => {
      for (const e of lodEntries) {
        const near = Math.hypot(e.b.cx - cam.x, e.b.cz - cam.z) < LOD_NEAR;
        if (e.hi.visible !== near) {
          e.hi.visible = near;
          e.lo.visible = !near;
        }
      }
    }
  });

  // ===== 夜間系 API =====
  (group.userData as Record<string, unknown>).setNightLights = (f: number) => {
    const k = Math.max(0, Math.min(1, (f - 0.12) / 0.88)); // 昼 0.15 → ほぼ消灯 / 夕 0.55 → 点灯開始
    mat.emissiveIntensity = k * 1.35;
    tMat.emissiveIntensity = k * 1.55;
    beaconMat.opacity = k * 0.95;
    beaconMesh.visible = k > 0.03;
  };

  scene.add(group);
  return group;
}
