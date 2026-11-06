#!/usr/bin/env python3
# v12: 街路グリッド整合（建物スナップ+街道描画）+ リング沿い低層 + 街路樹 + 影の地形傾斜追従 + 環状樹林帯bugfix
import io

def patch(path, pairs):
    with io.open(path, encoding='utf-8') as f:
        s = f.read()
    for old, new in pairs:
        assert old in s, f"{path}: NOT FOUND -> {old[:70]!r}"
        assert s.count(old) == 1, f"{path}: AMBIGUOUS ({s.count(old)}) -> {old[:70]!r}"
        s = s.replace(old, new)
    with io.open(path, 'w', encoding='utf-8') as f:
        f.write(s)
    print('ok', path)

CITY = 'src/render/city.ts'
NATURE = 'src/render/nature.ts'
GAME = 'src/game/game.ts'

city_pairs = []

# 0) 街路樹アンカーの module export
city_pairs.append((
"""export function buildCity(scene: THREE.Scene, count: number): THREE.Group {""",
"""// 2026-11-06 v12: 幹線道路沿いの街路樹アンカー（buildCity で充填 → nature が実体化）
export const roadsidePts: Array<{ x: number; z: number; s: number }> = [];

export function buildCity(scene: THREE.Scene, count: number): THREE.Group {"""))

# 1) 建物主ループ: 極座標散乱 → グリッド街路沿いのスナップ配置 + リング回廊除外
city_pairs.append((
"""  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 600 + Math.pow(rand(), 0.7) * 3400;
    const x = CX + Math.cos(angle) * radius;
    const z = CZ + Math.sin(angle) * radius * 0.8;
    const y = terrainHeight(x, z);
    if (y < 4) continue; // 海・砂浜には置かない""",
"""  // 2026-11-06 v12: 格子整合 — 建物をブロック辺（=街道）へスナップし、内部は空地のままにする
  const CELL = 210;
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 600 + Math.pow(rand(), 0.7) * 3400;
    const bx = CX + Math.cos(angle) * radius;
    const bz = CZ + Math.sin(angle) * radius * 0.8;
    const bcx = Math.round(bx / CELL) * CELL, bcz = Math.round(bz / CELL) * CELL; // ブロック中心
    const ed = rand() < 0.5 ? 0 : 1; // 0=±x 辺に面する 1=±z 辺
    const sgn = (ed === 0 ? Math.sign(bx - bcx) : Math.sign(bz - bcz)) || 1;
    const along = (rand() - 0.5) * (CELL - 70); // 街道に沿った位置
    const x = ed === 0 ? bcx + sgn * (CELL / 2 - 26) : bcx + along;
    const z = ed === 1 ? bcz + sgn * (CELL / 2 - 26) : bcz + along;
    // 外周リングロードの回廊には建てない（道路の連続性を保つ）
    const rxx = (x - CX) / 1.24, rzz = z - CZ;
    const rt = 2450 + Math.sin(Math.atan2(rzz, rxx) * 5 + 1.3) * 190;
    if (Math.abs(Math.hypot(rxx, rzz) - rt) < 62) continue;
    const y = terrainHeight(x, z);
    if (y < 4) continue; // 海・砂浜には置かない"""))

# 2) 向き: 完全ランダム回転 → 街道に平行（スケール軸で面合わせ）
city_pairs.append((
"""    dummy.position.set(x, y - 1, z);
    dummy.rotation.y = rand() * Math.PI;
    dummy.scale.set(w, h, d);""",
"""    dummy.position.set(x, y - 1, z);
    dummy.rotation.y = (rand() - 0.5) * 0.1; // 街道へ整列（v12）
    if (ed === 0) dummy.scale.set(d, h, w); else dummy.scale.set(w, h, d);"""))

# 3) villagePts に「行商人列を許す幹線か」フラグ
city_pairs.append((
"""  const villagePts: Array<[number, number, number]> = []; // x,z,進行角（沿道集落の配置基準）""",
"""  // x,z,進行角, 行商人列 OK（v12: 格子街路は建物行が既にあるので村を作らない）
  const villagePts: Array<[number, number, number, boolean]> = [];"""))

city_pairs.append((
"""  for (const poly of roads) {""",
"""  for (let ri = 0; ri < roads.length; ri++) {
    const poly = roads[ri];"""))

city_pairs.append((
"""      if (i % 2 === 0) villagePts.push([pts[i].x, pts[i].y, Math.atan2(d.y, d.x)]);""",
"""      if (i % 2 === 0) villagePts.push([pts[i].x, pts[i].y, Math.atan2(d.y, d.x), ri < gridRoadStart]);
      // v12: 街路樹アンカー（約720m 間隔・両側 27m: 縁石 11m と建物前線 26m の間）
      if (i % 6 === 2 && roadsidePts.length < 1500) {
        for (const sd2 of [-1, 1] as const) {
          roadsidePts.push({ x: pts[i].x + nrm.x * sd2 * 27, z: pts[i].y + nrm.y * sd2 * 27, s: 0.72 + rand() * 0.55 });
        }
      }"""))

# 4) 格子街路そのものを既存リボン道路系で描画（建物配置と対応する街道）
city_pairs.append((
"""  roads.push([new THREE.Vector2(CX + 1250, CZ + 1560), new THREE.Vector2(4100, 3600), new THREE.Vector2(2900, 6300)]);""",
"""  roads.push([new THREE.Vector2(CX + 1250, CZ + 1560), new THREE.Vector2(4100, 3600), new THREE.Vector2(2900, 6300)]);
  // 2026-11-06 v12: 格子街路（街道=ブロック境界。建物スナップと同一系で整合）
  const gridRoadStart = roads.length;
  {
    const half = 3650;
    const inside = (px: number, pz: number) =>
      Math.hypot(px - CX, (pz - CZ) / 0.8) > 640 && Math.hypot(px - CX, (pz - CZ) / 0.8) < half;
    const n0 = Math.round((CX - half) / CELL), n1 = Math.round((CX + half) / CELL);
    const m0 = Math.round((CZ - half * 0.8) / CELL), m1 = Math.round((CZ + half * 0.8) / CELL);
    for (let n = n0; n <= n1; n++) {
      const px = (n + 0.5) * CELL;
      const poly: THREE.Vector2[] = [];
      let run = 0;
      for (let k = m0 - 2; k <= m1 + 2; k++) {
        const pz = (k + 0.5) * CELL;
        if (inside(px, pz)) { poly.push(new THREE.Vector2(px, pz)); run = 0; }
        else if (++run > 2 && poly.length) { break; }
      }
      if (poly.length > 2) roads.push(poly);
    }
    for (let m = m0; m <= m1; m++) {
      const pz = (m + 0.5) * CELL;
      const poly: THREE.Vector2[] = [];
      let run = 0;
      for (let k = n0 - 2; k <= n1 + 2; k++) {
        const px = (k + 0.5) * CELL;
        if (inside(px, pz)) { poly.push(new THREE.Vector2(px, pz)); run = 0; }
        else if (++run > 2 && poly.length) { break; }
      }
      if (poly.length > 2) roads.push(poly);
    }
  }"""))

# 5) 沿道集落: 予算増 + 内側(リング沿い)は低層行商人として活用
city_pairs.append((
"""  const VMAX = 340;""",
"""  const VMAX = 620; // v12: リング沿い低層列ぶん扩容（それでも 1 draw call）"""))

city_pairs.append((
"""    for (const [vx, vz, va] of villagePts) {
      if (vi >= VMAX - 2) break;
      if (Math.hypot(vx - CX, vz - CZ) < 4100) continue; // 都心と重複させない""",
"""    for (const [vx, vz, va, townOK] of villagePts) {
      if (vi >= VMAX - 2) break;
      const inner = Math.hypot(vx - CX, vz - CZ) < 4100; // v12: 幹線(リング・放射)沿いは低層行商人列で連続化
      if (inner && !townOK) continue;"""))

city_pairs.append((
"""        if (rand() > 0.6) continue;
        const offd = 56 + rand() * 120;""",
"""        if (!inner && rand() > 0.6) continue;
        const offd = (inner ? 62 : 56) + rand() * (inner ? 42 : 120);"""))

city_pairs.append((
"""        const y = terrainHeight(x, z);
        if (y < 4) continue;
        const hh = 7 + rand() * 16, ww = 12 + rand() * 15, dd = 12 + rand() * 15;""",
"""        const y = terrainHeight(x, z);
        if (y < (inner ? 2.5 : 4)) continue;
        const hh = inner ? 9 + rand() * 15 : 7 + rand() * 16, ww = 12 + rand() * 15, dd = 12 + rand() * 15;"""))

patch(CITY, city_pairs)

# ---------- nature.ts ----------
nat_pairs = []
nat_pairs.append((
"""import { AIRPORTS } from '../config/airports.js';""",
"""import { AIRPORTS } from '../config/airports.js';
import { roadsidePts } from './city.js';"""))

# v11 bugfix: count 確定が早すぎて環状帯が未表示 → 全ループ後へ移動
nat_pairs.append((
"""  foliage.count = placed;
  trunks.count = placed;
  foliage.instanceMatrix.needsUpdate = true;
  trunks.instanceMatrix.needsUpdate = true;
  if (foliage.instanceColor) foliage.instanceColor.needsUpdate = true;

  // ===== 空港环岛の樹林帯""",
"""  // 2026-11-06 v12: count 確定は全ループ後へ移動（v11 はこの位置で確定し環状帯が未表示だった）
  // ===== 空港环岛の樹林帯"""))

nat_pairs.append((
"""  group.add(foliage, trunks);""",
"""  // ===== v12: 幹線道路沿いの街路樹（道路の連続性を緑で補強）=====
  for (const rp of roadsidePts) {
    if (placed >= count) break;
    const y = terrainHeight(rp.x, rp.z);
    if (y < 0.5) continue;
    dummy.position.set(rp.x, y - 0.5, rp.z);
    dummy.rotation.y = rand() * Math.PI * 2;
    dummy.scale.setScalar(rp.s);
    dummy.updateMatrix();
    foliage.setMatrixAt(placed, dummy.matrix);
    trunks.setMatrixAt(placed, dummy.matrix);
    const tint = 0.8 + rand() * 0.3;
    color.setRGB(tint * 0.72, tint, tint * 0.7);
    foliage.setColorAt(placed, color);
    placed++;
  }
  foliage.count = placed;
  trunks.count = placed;
  foliage.instanceMatrix.needsUpdate = true;
  trunks.instanceMatrix.needsUpdate = true;
  if (foliage.instanceColor) foliage.instanceColor.needsUpdate = true;

  group.add(foliage, trunks);"""))

patch(NATURE, nat_pairs)

# ---------- game.ts ----------
game_pairs = []
game_pairs.append((
"""const QUAT_RX90 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);""",
"""const QUAT_RX90 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
const BLOB_NOR = new THREE.Vector3();
const QUAT_TILT = new THREE.Quaternion();
const QUAT_LAYOUT = new THREE.Quaternion();"""))

game_pairs.append((
"""          const gy = Math.max(terrainHeight(bx, bz), WORLD.SEA_LEVEL) + 0.5;
          gb.position.set(bx, gy, bz);""",
"""          const gy = Math.max(terrainHeight(bx, bz), WORLD.SEA_LEVEL) + 0.7;
          gb.position.set(bx, gy, bz);"""))

game_pairs.append((
"""          const ang = Math.atan2(-uz, ux);
          gb.quaternion.setFromAxisAngle(UP_Y, ang).multiply(QUAT_RX90);
          const soft = 1 / (1 + len * 0.0035);
          const day = 0.45 + 0.55 * Math.min(elev / 0.5, 1);
          (gb.material as THREE.MeshBasicMaterial).opacity = (0.09 + 0.27 * k * k) * soft * day;""",
"""          const ang = Math.atan2(-uz, ux);
          // 2026-11-06 v12: 影を地盤の傾斜へ倒す（起伏上で浮き・めり込み防止）。両視点で自然
          BLOB_NOR.set(
            -(terrainHeight(bx + 90, bz) - terrainHeight(bx - 90, bz)) / 180,
            1,
            -(terrainHeight(bx, bz + 90) - terrainHeight(bx, bz - 90)) / 180
          ).normalize();
          QUAT_TILT.setFromUnitVectors(UP_Y, BLOB_NOR);
          gb.quaternion.copy(QUAT_TILT).multiply(QUAT_LAYOUT.setFromAxisAngle(UP_Y, ang).multiply(QUAT_RX90));
          const soft = 0.62 + 0.38 / (1 + len * 0.0035);
          const day = 0.45 + 0.55 * Math.min(elev / 0.5, 1);
          (gb.material as THREE.MeshBasicMaterial).opacity = (0.12 + 0.34 * k * k) * soft * day;"""))

patch(GAME, game_pairs)
print('V12 PATCH DONE')
