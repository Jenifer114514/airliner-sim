#!/usr/bin/env python3
# 2026-11-05 距離感・立体感パックのパッチ（game/cameras/constants/city/nature）
import io

def rd(p): return io.open(p, encoding='utf-8').read()
def wr(p, s): io.open(p, 'w', encoding='utf-8').write(s)

# ============ game.ts: 影を太陽方位へ + rig pose に agl ============
p = 'src/game/game.ts'
s = rd(p)
old = """      // 高度基準ブラブ: AGL>360m で消え、低いほど濃く小さく（接地直感は影より輪郭）
      if (this.groundBlob) {
        const gb = this.groundBlob;
        if (alt < 360) {
          const k = 1 - alt / 360;
          const gy = Math.max(terrainHeight(pos.x, pos.z), WORLD.SEA_LEVEL) + 0.5;
          gb.position.set(pos.x, gy, pos.z);
          const span = this.playerSpec.wingspan;
          const r = span * 0.42 + alt * 0.11;
          gb.scale.set(r, r * 0.86, 1);
          (gb.material as THREE.MeshBasicMaterial).opacity = 0.10 + 0.26 * k * k;
          gb.visible = true;
        } else gb.visible = false;
      }"""
new = """      // 機体影（高度基準 + 太陽方位）: 低いほど濃く小さく、低い太陽ほど逆光方向へ引き伸ばす。
      // 機体真下固定ではなく地面高さへ追従 so 外部視点で接地方位・浮きが読める。
      if (this.groundBlob && this.player) {
        const gb = this.groundBlob;
        const pp = this.player.group.position;
        const altP = Math.max(0, pp.y - terrainHeight(pp.x, pp.z));
        if (altP < 400) {
          const sd = this.sky.sunDir;
          const elev = Math.max(sd.y, 0.06);
          const len = Math.min(altP / Math.max(Math.tan(elev), 0.16), altP * 1.6 + 46);
          const hl = Math.hypot(sd.x, sd.z) || 1;
          const ux = sd.x / hl, uz = sd.z / hl;
          const bx = pp.x - ux * len, bz = pp.z - uz * len;
          const gy = Math.max(terrainHeight(bx, bz), WORLD.SEA_LEVEL) + 0.5;
          gb.position.set(bx, gy, bz);
          const k = 1 - altP / 400;
          const r = this.playerSpec.wingspan * 0.42 + altP * 0.10;
          gb.scale.set(r * (1 + len / (r * 2.4)), r * 0.86, 1);
          const ang = Math.atan2(-uz, ux);
          gb.quaternion.setFromAxisAngle(UP_Y, ang).multiply(QUAT_RX90);
          const soft = 1 / (1 + len * 0.0035);
          const day = 0.45 + 0.55 * Math.min(elev / 0.5, 1);
          (gb.material as THREE.MeshBasicMaterial).opacity = (0.09 + 0.27 * k * k) * soft * day;
          gb.visible = true;
        } else gb.visible = false;
      }"""
assert old in s, 'game blob block'
s = s.replace(old, new, 1)

anchor = "export class Game {"
pre = "const UP_Y = new THREE.Vector3(0, 1, 0);\nconst QUAT_RX90 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);\n\nexport class Game {"
assert anchor in s, 'game class anchor'
s = s.replace(anchor, pre, 1)

mp_old = """      this.rig.update(dt, {
        position: t.position,
        quaternion: t.quaternion,
        velocity: t.velocity,
        size: this.playerSpec.fuselageLength
      });"""
mp_new = """      this.rig.update(dt, {
        position: t.position,
        quaternion: t.quaternion,
        velocity: t.velocity,
        size: this.playerSpec.fuselageLength,
        agl: Math.max(0, t.position.y - terrainHeight(t.position.x, t.position.z))
      });"""
assert mp_old in s, 'manual pose'
s = s.replace(mp_old, mp_new, 1)
dp_old = """      this.rig.update(dt, {
        position: s.position,
        quaternion: s.quaternion,
        velocity: s.velocity,
        size: this.playerSpec.fuselageLength
      });"""
dp_new = """      this.rig.update(dt, {
        position: s.position,
        quaternion: s.quaternion,
        velocity: s.velocity,
        size: this.playerSpec.fuselageLength,
        agl: Math.max(0, s.position.y - terrainHeight(s.position.x, s.position.z))
      });"""
assert dp_old in s, 'demo pose'
s = s.replace(dp_old, dp_new, 1)
wr(p, s)
print('game ok')

# ============ cameras.ts ============
p = 'src/render/cameras.ts'
s = rd(p)
o = "  velocity: THREE.Vector3;\n  size: number; // "
assert o in s
idx = s.index(o)
end = s.index('\n}', idx)
addition = "  /** 対地高度 [m]（chase FOV の低空補正用） */\n  agl?: number;\n"
# pose interface に agl を足す: size 行の直後
o2 = s[idx:end]
s = s[:idx] + o2 + "\n" + addition + s[end:]
o3 = "const targetFov = CAMERA.FOV + clamp(velocity.length() * 0.03, 0, 8);"
assert o3 in s, 'fov line'
n3 = ("const lowQ = pose.agl !== undefined ? clamp(1 - pose.agl / 300, 0, 1) : 0;\n"
      "        const targetFov = CAMERA.FOV + clamp(velocity.length() * 0.03, 0, 8) + lowQ * 3.2;")
s = s.replace(o3, n3, 1)
wr(p, s)
print('cam ok')

# ============ constants: COCKPIT FOV ============
p = 'src/config/constants.ts'
s = rd(p)
assert "FOV_COCKPIT: 68," in s
s = s.replace("FOV_COCKPIT: 68,", "FOV_COCKPIT: 62,", 1)
wr(p, s)
print('const ok')

# ============ city.ts: リングロード+放射路 / 郊外低層密度 / 沿道集落 / 空港外周帯 ============
p = 'src/render/city.ts'
s = rd(p)
o = """    const suburb = radius > 2750 && rand() < 0.55; // 2026-11-05: 外周は低層高密度帯に（尺度変化＝距離感）
    const h = suburb ? 9 + rand() * 15 : 22 + rand() * 90 * (0.35 + centerFactor * 1.4);"""
o_old = """    const h = 22 + rand() * 90 * (0.35 + centerFactor * 1.4);
    const w = 26 + rand() * 38;
    const d = 26 + rand() * 38;"""
o_new = """    const suburb = radius > 2750 && rand() < 0.55; // 2026-11-05: 外周は低層高密度帯（尺度変化＝距離感）
    const h = suburb ? 9 + rand() * 15 : 22 + rand() * 90 * (0.35 + centerFactor * 1.4);
    const w = suburb ? 13 + rand() * 16 : 26 + rand() * 38;
    const d = suburb ? 13 + rand() * 16 : 26 + rand() * 38;"""
assert o_old in s, 'city loop'
s = s.replace(o_old, o_new, 1)

# import AIRPORTS
o = "import { terrainHeight } from './terrain.js';"
assert o in s
s = s.replace(o, o + "\nimport { AIRPORTS } from '../config/airports.js';", 1)

# 道路ネットワーク拡張（リング+放射2本）: 空港アクセス road push の後ろ
o = """  // 空港アクセス道路（滑走路端 → 市街地）
  roads.push([
    new THREE.Vector2(2100, -1900), new THREE.Vector2(3200, -2200), new THREE.Vector2(4500, -2600),
    new THREE.Vector2(6000, -3000), new THREE.Vector2(CX, CZ), new THREE.Vector2(CX + 800, CZ - 300)
  ]);"""
assert o in s, 'road push'
n = o + """
  // 2026-11-05: リングロード（市街外周）+ 放射 2 本（西河畔・南郊外）で道路網を連続化
  {
    const ring: THREE.Vector2[] = [];
    for (let i = 0; i <= 34; i++) {
      const a = (i / 34) * Math.PI * 2;
      const rr = 2450 + Math.sin(a * 5 + 1.3) * 190;
      ring.push(new THREE.Vector2(CX + Math.cos(a) * rr * 1.24, CZ + Math.sin(a) * rr));
    }
    roads.push(ring);
  }
  roads.push([new THREE.Vector2(CX - 2260, CZ + 420), new THREE.Vector2(1200, -1000), new THREE.Vector2(-1400, -2500)]);
  roads.push([new THREE.Vector2(CX + 1250, CZ + 1560), new THREE.Vector2(4100, 3600), new THREE.Vector2(2900, 6300)]);"""
s = s.replace(o, n, 1)

# リボン生成ループで村の沿道点を収集（villagePts）
o = """  const rPos: number[] = [];
  const rIdx: number[] = [];
  let vBase = 0;"""
n = """  const rPos: number[] = [];
  const rIdx: number[] = [];
  const villagePts: Array<[number, number, number]> = []; // x,z,進行角（沿道集落の配置基準）
  let vBase = 0;"""
assert o in s, 'rpos'
s = s.replace(o, n, 1)
o = """      const hw = 11;
      const y = Math.max(terrainHeight(pts[i].x, pts[i].y) + 0.35, -2.6);"""
n = """      const hw = 11;
      if (i % 2 === 0) villagePts.push([pts[i].x, pts[i].y, Math.atan2(d.y, d.x)]);
      const y = Math.max(terrainHeight(pts[i].x, pts[i].y) + 0.35, -2.6);"""
assert o in s, 'hw line'
s = s.replace(o, n, 1)

# 沿道集落 + 空港外周ベルト（InstancedMesh 1 種ずつ・計 +2 draw call）
o = """  // ===== 超高層の障害灯"""
assert o in s
n = """  // ===== 沿道集落（道路に沿って連続する低層家屋。中距離の構造手掛かり）=====
  const VMAX = 340;
  const vMesh = new THREE.InstancedMesh(geo, mat, VMAX);
  vMesh.name = 'village';
  vMesh.castShadow = true;
  vMesh.receiveShadow = true;
  {
    let vi = 0;
    for (const [vx, vz, va] of villagePts) {
      if (vi >= VMAX - 2) break;
      if (Math.hypot(vx - CX, vz - CZ) < 4100) continue; // 都心と重複させない
      let nearAp = false;
      for (const ap of AIRPORTS) if (Math.hypot(vx - ap.center.x, vz - ap.center.z) < 3700) nearAp = true;
      if (nearAp) continue;
      for (const side of [-1, 1] as const) {
        if (vi >= VMAX) break;
        if (rand() > 0.6) continue;
        const offd = 56 + rand() * 120;
        const nx = -Math.sin(va) * side, nz = Math.cos(va) * side;
        const x = vx + nx * offd + (rand() - 0.5) * 44;
        const z = vz + nz * offd + (rand() - 0.5) * 44;
        const y = terrainHeight(x, z);
        if (y < 4) continue;
        const hh = 7 + rand() * 16, ww = 12 + rand() * 15, dd = 12 + rand() * 15;
        dummy.position.set(x, y - 1, z);
        dummy.rotation.set(0, va + (rand() - 0.5) * 0.3, 0);
        dummy.scale.set(ww, hh, dd);
        dummy.updateMatrix();
        vMesh.setMatrixAt(vi, dummy.matrix);
        const vt = 0.78 + rand() * 0.22;
        color.setRGB(vt, vt * 0.97, vt * 0.93);
        vMesh.setColorAt(vi, color);
        buildingColliders.push({ x, z, r: 0.4 * Math.hypot(ww, dd) + 3, top: y + hh });
        vi++;
      }
    }
    vMesh.count = vi;
    vMesh.instanceMatrix.needsUpdate = true;
    if (vMesh.instanceColor) vMesh.instanceColor.needsUpdate = true;
  }
  group.add(vMesh);

  // ===== 空港外周の郊外ベルト（滑走路 3.6km 外に低層の倉庫・工場・住宅）=====
  const BMAX = 120;
  const bMesh = new THREE.InstancedMesh(geo, mat, BMAX);
  bMesh.name = 'airport-suburb';
  bMesh.castShadow = false;
  bMesh.receiveShadow = true;
  {
    let bi = 0;
    for (const ap of AIRPORTS) {
      const per = Math.floor(BMAX / AIRPORTS.length);
      for (let i = 0; i < per && bi < BMAX; i++) {
        const a = rand() * Math.PI * 2;
        const rr = 3650 + rand() * 1500;
        const x = ap.center.x + Math.cos(a) * rr * 1.12;
        const z = ap.center.z + Math.sin(a) * rr;
        const y = terrainHeight(x, z);
        if (y < 4) continue;
        const hh = 8 + rand() * 20, ww = 16 + rand() * 30, dd = 16 + rand() * 30;
        dummy.position.set(x, y - 1, z);
        dummy.rotation.set(0, Math.round(rand() * 4) * (Math.PI / 2), 0);
        dummy.scale.set(ww, hh, dd);
        dummy.updateMatrix();
        bMesh.setMatrixAt(bi, dummy.matrix);
        const bt = 0.7 + rand() * 0.3;
        color.setRGB(bt * 0.96, bt * 0.97, bt);
        bMesh.setColorAt(bi, color);
        buildingColliders.push({ x, z, r: 0.4 * Math.hypot(ww, dd) + 3, top: y + hh });
        bi++;
      }
    }
    bMesh.count = bi;
    bMesh.instanceMatrix.needsUpdate = true;
    if (bMesh.instanceColor) bMesh.instanceColor.needsUpdate = true;
  }
  group.add(bMesh);

  // ===== 超高層の障害灯"""
s = s.replace(o, n, 1)
# nightLights も village（mat 共有のため自動）で OK。bMesh も同じ mat。
wr(p, s)
print('city ok')

# ============ nature.ts: 密度むら + airport tree line ============
p = 'src/render/nature.ts'
s = rd(p)
s = s.replace("""import { terrainHeight } from './terrain.js';""",
              """import { terrainHeight } from './terrain.js';
import { AIRPORTS } from '../config/airports.js';
import { valueNoise } from '../core/math.js';""", 1)
o = """    const y = terrainHeight(x, z);
    if (y < 12 || y > 520) continue;"""
n = """    const y = terrainHeight(x, z);
    if (y < 12 || y > 520) continue;
    // 2026-11-05: 林班むら（~2.6km 周期で空隙）→ 遠望時に市松の森＝密度の立体感
    if (valueNoise(x * 0.00062 + 17.3, z * 0.00062 + 3.9) < 0.44) continue;"""
assert o in s, 'nature y gate'
s = s.replace(o, n, 1)
o = "    const s = 0.8 + rand() * 1.5;"
n = "    const s = 0.8 + rand() * 1.5 * (0.8 + valueNoise(x * 0.004 + 5.5, z * 0.004 + 8.1) * 0.5);"
assert o in s
s = s.replace(o, n, 1)
o = """  group.add(foliage, trunks);
  scene.add(group);
  return group;"""
n = """  // ===== 空港环岛の樹林帯（進入・離陸の低空で目視できる高度目安。滑走路軸方向は避ける）=====
  for (const ap of AIRPORTS) {
    const N = 44;
    for (let i = 0; i < N && placed < count; i++) {
      const a = (i / N) * Math.PI * 2 + (rand() - 0.5) * 0.06;
      const rel = a - ap.heading;
      if (Math.abs(Math.cos(rel)) > 0.62) continue; // 滑走路延長線上に置かない
      const rr = 3760 + rand() * 260;
      const x = ap.center.x + Math.cos(a) * rr * 1.14;
      const z = ap.center.z + Math.sin(a) * rr;
      const y = terrainHeight(x, z);
      if (y < 1) continue;
      const s2 = 1.0 + rand() * 0.9;
      dummy.position.set(x, y - 0.6, z);
      dummy.rotation.y = rand() * Math.PI * 2;
      dummy.scale.set(s2, s2 * (0.9 + rand() * 0.5), s2);
      dummy.updateMatrix();
      foliage.setMatrixAt(placed, dummy.matrix);
      trunks.setMatrixAt(placed, dummy.matrix);
      const tint = 0.68 + rand() * 0.4;
      color.setRGB(tint * 0.88, tint, tint * 0.8);
      foliage.setColorAt(placed, color);
      placed++;
    }
  }
  group.add(foliage, trunks);
  scene.add(group);
  return group;"""
assert o in s, 'nature add'
s = s.replace(o, n, 1)
wr(p, s)
print('nature ok')
