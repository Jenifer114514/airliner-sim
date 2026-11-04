/**
 * render/city.ts — 市街地（InstancedMesh）と道路
 * 建物は 1 ドローコール。窓テクスチャのボックスを高さ・色味バリエーションで配置。
 */
import * as THREE from 'three';
import { makeRandom, clamp } from '../core/math.js';
import { terrainHeight } from './terrain.js';
import { makeBuildingTexture, makeBuildingEmissiveTexture } from './textures.js';

/** 建物当たり判定（main の衝突爆発用）。x,z=中心 r=半径 top=陸部高さ */
export const buildingColliders: { x: number; z: number; r: number; top: number }[] = [];

export function buildCity(scene: THREE.Scene, count: number): THREE.Group {
  buildingColliders.length = 0;
  const group = new THREE.Group();
  const rand = makeRandom(20261009);

  const geo = new THREE.BoxGeometry(1, 1, 1);
  geo.translate(0, 0.5, 0); // バウンディングボックスを底面基準に
  const emiTex = makeBuildingEmissiveTexture();
  const mat = new THREE.MeshStandardMaterial({
    map: makeBuildingTexture(),
    emissiveMap: emiTex,
    emissive: new THREE.Color(0xffd9a0),
    emissiveIntensity: 0.0,
    metalness: 0.18,
    roughness: 0.72
  });
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  // 市街地中心: 空港の東北（滑走路から約 6〜12km）
  const CX = 7800;
  const CZ = -3200;

  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 600 + Math.pow(rand(), 0.7) * 3400;
    const x = CX + Math.cos(angle) * radius;
    const z = CZ + Math.sin(angle) * radius * 0.8;
    const y = terrainHeight(x, z);
    if (y < 4) continue; // 海・砂浜には置かない

    // 高層ほど中心に
    const centerFactor = clamp(1 - radius / 3800, 0, 1);
    const h = 22 + rand() * 90 * (0.35 + centerFactor * 1.4);
    const w = 26 + rand() * 38;
    const d = 26 + rand() * 38;
    dummy.position.set(x, y - 1, z);
    dummy.rotation.y = rand() * Math.PI;
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    const tint = 0.72 + rand() * 0.28;
    color.setRGB(tint * 0.95, tint * 0.97, tint);
    mesh.setColorAt(i, color);
    buildingColliders.push({ x, z, r: 0.4 * Math.hypot(w, d) + 3, top: y + h });
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  group.add(mesh);

  // ---- 超高層ビル（スカイライン）: 都心核に 150〜330m グラスタワー群 ----
  const TOWERS = 46;
  const tGeo = new THREE.BoxGeometry(1, 1, 1);
  tGeo.translate(0, 0.5, 0);
  const tMat = new THREE.MeshStandardMaterial({
    map: makeBuildingTexture(),
    color: 0xbdd8ee,
    emissiveMap: emiTex,
    emissive: new THREE.Color(0xfff0c8),
    emissiveIntensity: 0.0,
    metalness: 0.55,
    roughness: 0.3
  });
  const tMesh = new THREE.InstancedMesh(tGeo, tMat, TOWERS);
  tMesh.name = 'towers';
  tMesh.castShadow = true;
  tMesh.receiveShadow = false;
  // 都心核（CX,CZ）+ 副核 3 箇所（浜・北・南ミクストユース）
  const cores: [number, number, number][] = [
    [CX, CZ, 1.0], [CX + 1500, CZ + 900, 0.62], [CX - 1350, CZ - 650, 0.55], [CX + 350, CZ - 1500, 0.45]
  ];
  let ti = 0;
  for (let k = 0; k < cores.length && ti < TOWERS; k++) {
    const [ox, oz, w] = cores[k];
    const per = Math.min(k === 0 ? 22 : 8, TOWERS - ti);
    for (let j = 0; j < per; j++) {
      const a = rand() * Math.PI * 2;
      const rr = Math.pow(rand(), 0.8) * (k === 0 ? 620 : 380);
      const x = ox + Math.cos(a) * rr * 1.25;
      const z = oz + Math.sin(a) * rr;
      const y = terrainHeight(x, z);
      if (y < 5) continue; // 海面・砂浜回避
      const h = (150 + Math.pow(rand(), 1.7) * 185 * (0.55 + w * 0.75));
      const bw = 24 + rand() * 20;
      const bd = 24 + rand() * 20;
      dummy.position.set(x, y - 2, z);
      dummy.rotation.set(0, Math.round(rand() * 4) * (Math.PI / 2) + (rand() - 0.5) * 0.12, 0);
      dummy.scale.set(bw, h, bd);
      dummy.updateMatrix();
      tMesh.setMatrixAt(ti, dummy.matrix);
      const gt = 0.82 + rand() * 0.18;
      color.setRGB(gt * 0.86, gt * 0.95, gt);
      tMesh.setColorAt(ti, color);
      buildingColliders.push({ x, z, r: 0.42 * Math.max(bw, bd) + 4, top: y + h });
      ti++;
    }
  }
  tMesh.count = ti;
  tMesh.instanceMatrix.needsUpdate = true;
  if (tMesh.instanceColor) tMesh.instanceColor.needsUpdate = true;
  group.add(tMesh);

  // 主要道路（地形追従リボン。旧: 平坦 Plane@y2.2 → 起伏と不整合で浮き/埋まりしていた）
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x2e3339, roughness: 0.95 });
  const roads: THREE.Vector2[][] = [];
  for (let i = 0; i < 3; i++) {
    const a = 0.5 + i * 0.55;
    const cx0 = CX - 2600 + i * 1900, cz0 = CZ + 800;
    const dir = new THREE.Vector2(Math.sin(a), Math.cos(a));
    roads.push([
      new THREE.Vector2(cx0, cz0).addScaledVector(dir, -4500),
      new THREE.Vector2(cx0, cz0).addScaledVector(dir, 4500)
    ]);
  }
  // 空港アクセス道路（滑走路端 → 市街地）
  roads.push([
    new THREE.Vector2(2100, -1900), new THREE.Vector2(3200, -2200), new THREE.Vector2(4500, -2600),
    new THREE.Vector2(6000, -3000), new THREE.Vector2(CX, CZ), new THREE.Vector2(CX + 800, CZ - 300)
  ]);

  const rPos: number[] = [];
  const rIdx: number[] = [];
  let vBase = 0;
  for (const poly of roads) {
    // 120m 間隔で再サンプリング
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i < poly.length - 1; i++) {
      const n = Math.max(1, Math.round(poly[i].distanceTo(poly[i + 1]) / 120));
      for (let k = 0; k < n; k++) pts.push(poly[i].clone().lerp(poly[i + 1], k / n));
    }
    pts.push(poly[poly.length - 1].clone());
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const d = new THREE.Vector2(next.x - prev.x, next.y - prev.y).normalize();
      const nrm = new THREE.Vector2(-d.y, d.x);
      const hw = 11;
      const y = Math.max(terrainHeight(pts[i].x, pts[i].y) + 0.35, -2.6);
      rPos.push(pts[i].x + nrm.x * hw, y, pts[i].y + nrm.y * hw);
      rPos.push(pts[i].x - nrm.x * hw, y, pts[i].y - nrm.y * hw);
      if (i < pts.length - 1) {
        const a = vBase + i * 2;
        rIdx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    vBase += pts.length * 2;
  }
  const roadGeo = new THREE.BufferGeometry();
  roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(rPos, 3));
  roadGeo.setIndex(rIdx);
  roadGeo.computeVertexNormals();
  const roadMesh = new THREE.Mesh(roadGeo, roadMat);
  roadMesh.name = 'roads';
  roadMesh.receiveShadow = true;
  group.add(roadMesh);

  // ===== 超高層の障害灯（赤クンビーコン: 塔頂に 1 灯。夜間のみ発光→bloom） =====
  const beacons: THREE.Vector3[] = [];
  {
    const mm = new THREE.Matrix4();
    for (let i = 0; i < tMesh.count; i++) {
      tMesh.getMatrixAt(i, mm);
      const p = new THREE.Vector3();
      const qq = new THREE.Quaternion();
      const sc = new THREE.Vector3();
      mm.decompose(p, qq, sc);
      beacons.push(new THREE.Vector3(p.x, p.y + sc.y - 2, p.z));
    }
  }
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff2a18, fog: false, transparent: true, opacity: 0 });
  const beaconGeo = new THREE.SphereGeometry(1.6, 8, 6);
  const beaconMesh = new THREE.InstancedMesh(beaconGeo, beaconMat, Math.max(1, beacons.length));
  beaconMesh.name = 'beacons';
  {
    const bm = new THREE.Matrix4();
    beacons.forEach((b, i) => { bm.makeTranslation(b.x, b.y, b.z); beaconMesh.setMatrixAt(i, bm); });
    beaconMesh.instanceMatrix.needsUpdate = true;
  }
  group.add(beaconMesh);

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
