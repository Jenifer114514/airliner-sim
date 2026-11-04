/**
 * render/airliner.ts — 旅客機の手続き生成（滑らかな曲面）
 *
 * 【座標系】機体: +Z = 機首, +Y = 上, +X = 右翼（group.lookAt() で機首を進行方向へ）
 * 【構成】
 *   胴体: LatheGeometry（プロファイル回転）+ 尾部アップスイープ変形 + 窓列テクスチャ
 *   主翼/尾翼: NACA 系翼型断面のロフト（後退角・上反角・テーパー・翼端レット）
 *   エンジン: ナセル（ラシ）+ ファン面 + パイロン
 *   着陸装置: 前脚/主脚（機種別車輪数）+ setGearPosition() で展開/格納
 *   フラップ/スポイラー: 後縁パネル（setFlaps/setSpoilers で駆動）
 *
 * 【モデルの前提】形状は公開情報に基づく近似。実機 GLB に差し替え可能な構造。
 */
import * as THREE from 'three';
import type { AirlinerSpec } from '../config/aircraft.js';
import {
  makeFuselageTexture,
  makeFanTexture,
  makePanelMaps
} from './textures.js';

/**
 * 車輪下面までの距離 / 胴体半径。sim/physics.ts の gearHeight（= fuselageRadius * 1.95）と
 * 一致させる。ズレると車輪が地面にめり込み、接地縁がカメラ移動ごとに明滅する。
 */
const GEAR_REACH = 1.95;

export interface AirlinerParts {
  group: THREE.Group;
  gearGroups: THREE.Group[];
  flapGroups: THREE.Group[];
  spoilerGroups: THREE.Group[];
  fanMeshes: THREE.Mesh[];
  setGearPosition(t: number): void;
  setFlaps(deg: number): void;
  setSpoilers(t: number): void;
  spinFans(dt: number): void;
  updateLights(timeSec: number): void;
}

interface BuildOptions {
  /** 低ディテール（駐機機用） */
  low?: boolean;
}

export function buildAirliner(spec: AirlinerSpec, options: BuildOptions = {}): AirlinerParts {
  const group = new THREE.Group();
  const low = options.low ?? false;

  // ===== マテリアル（PBR） =====
  const fusTex = makeFuselageTexture(
    spec.liveryTop, spec.liveryBottom, spec.liveryAccent,
    Math.round(spec.fuselageLength * 1.6)
  );
  const matPaint = new THREE.MeshStandardMaterial({
    map: fusTex,
    metalness: 0.42,
    roughness: 0.32,
    envMapIntensity: 1.15
  });
  const matWing = new THREE.MeshStandardMaterial({
    color: 0xc9d2da,
    metalness: 0.55,
    roughness: 0.38,
    envMapIntensity: 1.1
  });
  const matDark = new THREE.MeshStandardMaterial({
    color: 0x2a3138,
    metalness: 0.5,
    roughness: 0.5
  });
  const matFan = new THREE.MeshStandardMaterial({
    map: makeFanTexture(),
    metalness: 0.8,
    roughness: 0.35
  });
  const matTire = new THREE.MeshStandardMaterial({
    color: 0x15181c,
    metalness: 0.1,
    roughness: 0.9
  });
  const matStrut = new THREE.MeshStandardMaterial({
    color: 0x9aa4ad,
    metalness: 0.85,
    roughness: 0.3
  });

  const R = spec.fuselageRadius;
  const L = spec.fuselageLength;

  // ============================================================
  // 胴体（ラシ + アップスイープ）
  // ============================================================
  const profile: THREE.Vector2[] = [];
  const PROFILE_STEPS = low ? 14 : 26;
  for (let i = 0; i <= PROFILE_STEPS; i++) {
    const t = i / PROFILE_STEPS; // 0=機首先端, 1=尾端
    let r: number;
    if (t < 0.10) {
      // 機首: 丸みのある曲線（sqrt 型）
      r = R * Math.sqrt(1 - Math.pow(1 - t / 0.10, 2.1)) * 0.98 + 0.02;
    } else if (t < 0.80) {
      // 定直径部
      r = R;
    } else {
      // 尾部テーパー
      const u = (t - 0.80) / 0.20;
      r = R * (1 - u * 0.86);
    }
    profile.push(new THREE.Vector2(Math.max(r, 0.05), t * L));
  }
  const fusGeo = new THREE.LatheGeometry(profile, low ? 18 : 36);
  // 尾部アップスイープ（機首 = +Z になるよう回転後に変形）
  fusGeo.rotateX(-Math.PI / 2);
  fusGeo.translate(0, 0, L / 2);
  {
    const p = fusGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const z = p.getZ(i);
      if (z < -L * 0.18) {
        const prog = Math.min((-z - L * 0.18) / (L * 0.32), 1);
        p.setY(i, p.getY(i) + prog * prog * R * 1.15);
      }
    }
    fusGeo.computeVertexNormals();
  }
  // UV 入替: LatheGeometry は u=周回 / v=長さ。胴体テクスチャは x=長さ / y=周回で
  // 描かれているため、メッシュ側で交換して整合させる（しないと窓列が周回方向に並ぶ）
  {
    const uv = fusGeo.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) {
      const a = uv.getX(i);
      uv.setX(i, uv.getY(i));
      uv.setY(i, a);
    }
  }
  // 胴体専用マテリアル: パネルライン normal/roughness を追加（ナセル等は matPaint 据え置き）
  const matFuselage = matPaint.clone();
  const panel = makePanelMaps();
  panel.normalMap.repeat.set(2, 3);
  panel.roughnessMap.repeat.set(2, 3);
  matFuselage.normalMap = panel.normalMap;
  matFuselage.normalScale = new THREE.Vector2(0.6, 0.6);
  matFuselage.roughnessMap = panel.roughnessMap;
  const fuselage = new THREE.Mesh(fusGeo, matFuselage);
  fuselage.castShadow = true;
  fuselage.receiveShadow = true;
  group.add(fuselage);

  // ============================================================
  // 主翼（ロフト翼型 × 2）
  // ============================================================
  const halfSpan = spec.wingspan / 2;
  const wingGroupL = makeWingSurface(
    spec.rootChord, spec.tipChord, halfSpan, spec.sweep, spec.dihedral,
    matWing, low, -1
  );
  const wingGroupR = makeWingSurface(
    spec.rootChord, spec.tipChord, halfSpan, spec.sweep, spec.dihedral,
    matWing, low, 1
  );
  group.add(wingGroupL, wingGroupR);

  // ============================================================
  // 垂直尾翼・水平尾翼
  // ============================================================
  const fin = makeWingSurface(
    spec.tailRootChord, spec.tailRootChord * 0.42, spec.tailHeight * 0.92,
    spec.sweep + 0.12, 0, matWing, low, 1, true
  );
  fin.position.set(0, R * 0.55, -L * 0.36);
  group.add(fin);

  const hStabSpan = spec.wingspan * 0.32;
  const hStabL = makeWingSurface(
    spec.tailRootChord * 0.62, spec.tailRootChord * 0.28, hStabSpan,
    spec.sweep + 0.08, 0.06, matWing, low, -1
  );
  hStabL.position.set(0, R * 0.55, -L * 0.38);
  const hStabR = makeWingSurface(
    spec.tailRootChord * 0.62, spec.tailRootChord * 0.28, hStabSpan,
    spec.sweep + 0.08, 0.06, matWing, low, 1
  );
  hStabR.position.set(0, R * 0.55, -L * 0.38);
  group.add(hStabL, hStabR);

  // ============================================================
  // エンジン（左右）
  // ============================================================
  const fanMeshes: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    const engine = makeEngine(spec, matDark, matFan, matPaint, low);
    const spanX = side * spec.engineSpanPos * halfSpan;
    // 主翼前縁位置（後退角ぶん後退）
    const leZ = spec.engineForward - Math.tan(spec.sweep) * Math.abs(spanX) * 0.55;
    const wingY = Math.abs(spanX) * Math.tan(spec.dihedral);
    engine.position.set(spanX, wingY - spec.engineDiameter * 0.78, leZ + spec.engineLength * 0.28);
    group.add(engine);
    fanMeshes.push(...engine.userData.fans as THREE.Mesh[]);

    // パイロン
    const pylon = new THREE.Mesh(
      new THREE.BoxGeometry(spec.engineDiameter * 0.22, spec.engineDiameter * 1.15, spec.engineLength * 0.5),
      matPaint
    );
    pylon.position.set(
      spanX,
      wingY - spec.engineDiameter * 0.22,
      leZ + spec.engineLength * 0.12
    );
    pylon.castShadow = !low;
    group.add(pylon);
  }

  // ============================================================
  // 着陸装置
  // ============================================================
  const gearGroups: THREE.Group[] = [];
  if (!low) {
    const noseGear = makeGear(matStrut, matTire, 2, R, R * (GEAR_REACH - 0.92));
    noseGear.position.set(0, -R * 0.92, L * 0.30);
    group.add(noseGear);
    gearGroups.push(noseGear);

    for (const side of [-1, 1]) {
      const mainGear = makeGear(matStrut, matTire, spec.mainWheelCount * 2, R, R * (GEAR_REACH - 0.95));
      mainGear.position.set(side * R * 1.35, -R * 0.95, -L * 0.02);
      group.add(mainGear);
      gearGroups.push(mainGear);
    }
  }

  // ============================================================
  // フラップ・スポイラー（後縁/上面パネル）+ フラップトラックフェアリング
  // ============================================================
  const flapGroups: THREE.Group[] = [];
  const spoilerGroups: THREE.Group[] = [];
  if (!low) {
    for (const side of [-1, 1]) {
      const flap = new THREE.Group();
      const flapMesh = new THREE.Mesh(
        new THREE.BoxGeometry(spec.rootChord * 0.30, 0.10, halfSpan * 0.52),
        matWing
      );
      flapMesh.position.set(side * halfSpan * 0.34, Math.abs(halfSpan * 0.34) * Math.tan(spec.dihedral) - 0.12, -spec.rootChord * 0.72);
      flap.add(flapMesh);
      group.add(flap);
      flapGroups.push(flap);

      // フラップトラックフェアリング（後縁下面の涙滴形フェアリング ×3）
      for (let i = 0; i < 3; i++) {
        const fx = side * (halfSpan * 0.22 + i * halfSpan * 0.13);
        const fairing = new THREE.Mesh(
          new THREE.CapsuleGeometry(spec.fuselageRadius * 0.09, spec.rootChord * 0.34, 4, 8),
          matWing
        );
        fairing.rotation.x = Math.PI / 2;
        fairing.position.set(
          fx,
          Math.abs(fx) * Math.tan(spec.dihedral) - spec.fuselageRadius * 0.16,
          -spec.rootChord * 0.62
        );
        fairing.castShadow = !low;
        group.add(fairing);
      }

      const spoiler = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const sp = new THREE.Mesh(
          new THREE.BoxGeometry(spec.rootChord * 0.16, 0.07, halfSpan * 0.12),
          matWing
        );
        const sx = side * (halfSpan * 0.18 + i * halfSpan * 0.11);
        sp.position.set(
          sx,
          Math.abs(sx) * Math.tan(spec.dihedral) + 0.16,
          -spec.rootChord * 0.28 - i * spec.rootChord * 0.10
        );
        spoiler.add(sp);
      }
      group.add(spoiler);
      spoilerGroups.push(spoiler);
    }
  }

  // ============================================================
  // 航行灯・ストロボ・アクティブビーコン
  // ============================================================
  const lightMats: THREE.MeshBasicMaterial[] = [];
  const strobeMats: THREE.MeshBasicMaterial[] = [];
  const makeLight = (color: number, size: number, x: number, y: number, z: number, strobe = false) => {
    const mat = new THREE.MeshBasicMaterial({ color, fog: false });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(size, 8, 6), mat);
    bulb.position.set(x, y, z);
    group.add(bulb);
    (strobe ? strobeMats : lightMats).push(mat);
    return bulb;
  };
  const tipY = halfSpan * Math.tan(spec.dihedral);
  const tipZ = -Math.tan(spec.sweep) * halfSpan - spec.tipChord * 0.45;
  // 左=赤 / 右=緑 / 尾部=白
  makeLight(0xff2a1a, spec.fuselageRadius * 0.11, -halfSpan, tipY, tipZ);
  makeLight(0x1aff44, spec.fuselageRadius * 0.11, halfSpan, tipY, tipZ);
  makeLight(0xfff2cc, spec.fuselageRadius * 0.10, 0, R * 0.55 + spec.tailHeight * 0.95, -L * 0.42);
  // ストロボ（翼端 + 尾部）
  makeLight(0xffffff, spec.fuselageRadius * 0.10, -halfSpan * 0.98, tipY + 0.3, tipZ - 0.4, true);
  makeLight(0xffffff, spec.fuselageRadius * 0.10, halfSpan * 0.98, tipY + 0.3, tipZ - 0.4, true);
  // 上部ビーコン
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff2211, fog: false });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(spec.fuselageRadius * 0.10, 8, 6), beaconMat);
  beacon.position.set(0, R * 1.02, -L * 0.12);
  group.add(beacon);

  // ===== 操作 API =====
  const gearExtendedY = gearGroups.map((g) => g.position.y);
  const parts: AirlinerParts = {
    group,
    gearGroups,
    flapGroups,
    spoilerGroups,
    fanMeshes,
    setGearPosition(t: number) {
      const k = Math.max(0, Math.min(1, t));
      gearGroups.forEach((g, i) => {
        g.position.y = gearExtendedY[i] * k + (R * 0.6) * (1 - k);
        g.visible = k > 0.02;
      });
    },
    setFlaps(deg: number) {
      const rad = (deg * Math.PI) / 180;
      for (const f of flapGroups) {
        f.children.forEach((m) => { m.rotation.x = rad * 0.7; });
      }
    },
    setSpoilers(t: number) {
      const k = Math.max(0, Math.min(1, t));
      for (const s of spoilerGroups) {
        s.children.forEach((m) => { m.rotation.x = -k * 0.9; });
      }
    },
    spinFans(dt: number) {
      for (const f of fanMeshes) f.rotation.z += dt * 14;
    },
    updateLights(timeSec: number) {
      // ストロボ: 1.2s 周期で 0.1s 点灯
      const strobeOn = (timeSec % 1.2) < 0.1;
      for (const m of strobeMats) m.visible = strobeOn;
      // ビーコン: 0.8s 周期
      const beaconOn = (timeSec % 0.8) < 0.45;
      beaconMat.visible = beaconOn;
      for (const m of lightMats) m.visible = true;
    }
  };
  return parts;
}

// ============================================================
// 翼面: 翼型断面のロフト
// ============================================================
function makeWingSurface(
  rootChord: number,
  tipChord: number,
  span: number,
  sweep: number,
  dihedral: number,
  mat: THREE.Material,
  low: boolean,
  side: 1 | -1,
  vertical = false
): THREE.Group {
  const group = new THREE.Group();
  const SECTIONS = low ? 6 : 12;
  const POINTS = low ? 12 : 22; // 翼型周回点数
  const THICKNESS = 0.11;

  // 翼型 2D ポイント（弦方向 t=0 前縁 → 1 後縁, クローズ）
  const airfoil: Array<[number, number]> = [];
  for (let i = 0; i <= POINTS / 2; i++) {
    const t = i / (POINTS / 2);
    const y = 2 * THICKNESS * (0.2969 * Math.sqrt(t) - 0.126 * t - 0.3516 * t * t + 0.2843 * t ** 3 - 0.1015 * t ** 4);
    const camber = 0.022 * Math.sin(Math.PI * t);
    airfoil.push([t, camber + y]);   // 上面
  }
  for (let i = POINTS / 2 - 1; i > 0; i--) {
    const t = i / (POINTS / 2);
    const y = 2 * THICKNESS * (0.2969 * Math.sqrt(t) - 0.126 * t - 0.3516 * t * t + 0.2843 * t ** 3 - 0.1015 * t ** 4);
    const camber = 0.022 * Math.sin(Math.PI * t);
    airfoil.push([t, camber - y]);   // 下面
  }

  const positions: number[] = [];
  const indices: number[] = [];
  const loopN = airfoil.length;

  for (let s = 0; s <= SECTIONS; s++) {
    const u = s / SECTIONS;
    const spanPos = side * u * span;
    const chord = rootChord + (tipChord - rootChord) * u;
    const sweepZ = -Math.tan(sweep) * Math.abs(spanPos);
    const dihedralY = vertical ? 0 : Math.abs(spanPos) * Math.tan(dihedral);
    for (let p = 0; p < loopN; p++) {
      const [t, th] = airfoil[p];
      // 翼弦: 前縁 z=0 → 後縁 z=-chord（+Z = 機首方向）
      const z = sweepZ - t * chord;
      if (vertical) {
        // 垂直尾翼: 展開方向 +Y・厚み方向 X
        positions.push(th * chord, Math.abs(spanPos), z);
      } else {
        const x = spanPos;
        const y = dihedralY + th * chord;
        positions.push(x, y, z);
      }
    }
  }

  for (let s = 0; s < SECTIONS; s++) {
    for (let p = 0; p < loopN; p++) {
      const p2 = (p + 1) % loopN;
      const a = s * loopN + p;
      const b = s * loopN + p2;
      const c = (s + 1) * loopN + p;
      const d = (s + 1) * loopN + p2;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  // 翼端レット（垂直尾翼は不要）
  if (!vertical && !low) {
    const tip = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, span * 0.075, tipChord * 0.8),
      mat
    );
    tip.position.set(side * span * 0.995, span * Math.tan(dihedral) + span * 0.032, -Math.tan(sweep) * span - tipChord * 0.45);
    tip.rotation.x = -0.35;
    group.add(tip);
  }
  return group;
}

// ============================================================
// エンジン
// ============================================================
function makeEngine(
  spec: AirlinerSpec,
  matDark: THREE.MeshStandardMaterial,
  matFan: THREE.MeshStandardMaterial,
  matPaint: THREE.MeshStandardMaterial,
  low: boolean
): THREE.Group {
  const g = new THREE.Group();
  const d = spec.engineDiameter;
  const len = spec.engineLength;

  // ナセル（ラシ）
  const profile: THREE.Vector2[] = [];
  const STEPS = low ? 8 : 16;
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS; // 0=インテーク, 1=排気
    let r: number;
    if (t < 0.12) {
      r = d * 0.5 * (0.72 + 0.28 * Math.sin((t / 0.12) * Math.PI * 0.5));
    } else if (t < 0.5) {
      r = d * 0.5;
    } else {
      r = d * 0.5 * (1 - (t - 0.5) * 0.52);
    }
    profile.push(new THREE.Vector2(r, t * len));
  }
  const nacelleGeo = new THREE.LatheGeometry(profile, low ? 12 : 24);
  nacelleGeo.rotateX(-Math.PI / 2); // +Y → +Z（排気側が -Z）
  const nacelle = new THREE.Mesh(nacelleGeo, matPaint);
  nacelle.castShadow = true;
  g.add(nacelle);

  // インテーク内壁（暗色）
  const inner = new THREE.Mesh(
    new THREE.CylinderGeometry(d * 0.44, d * 0.42, len * 0.42, 20, 1, true),
    matDark
  );
  inner.rotation.x = Math.PI / 2;
  inner.position.z = len * 0.18;
  g.add(inner);

  // ファン面
  const fan = new THREE.Mesh(new THREE.CircleGeometry(d * 0.40, 24), matFan);
  fan.position.z = len * 0.20;
  g.add(fan);

  // 排気コア
  const exhaust = new THREE.Mesh(
    new THREE.CylinderGeometry(d * 0.16, d * 0.12, len * 0.3, 12),
    matDark
  );
  exhaust.rotation.x = Math.PI / 2;
  exhaust.position.z = -len * 0.38;
  g.add(exhaust);

  g.userData.fans = [fan];
  return g;
}

// ============================================================
// 着陸装置
// ============================================================
function makeGear(
  matStrut: THREE.MeshStandardMaterial,
  matTire: THREE.MeshStandardMaterial,
  wheelCount: number,
  R: number,
  strutLen: number
): THREE.Group {
  const g = new THREE.Group();
  const strut = new THREE.Mesh(
    new THREE.CylinderGeometry(R * 0.085, R * 0.11, strutLen, 8),
    matStrut
  );
  strut.position.y = -strutLen / 2;
  g.add(strut);

  const wheelGeo = new THREE.CylinderGeometry(R * 0.30, R * 0.30, R * 0.18, 14);
  const perRow = 2;
  const rows = Math.max(1, Math.floor(wheelCount / perRow));
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < perRow; i++) {
      const wheel = new THREE.Mesh(wheelGeo, matTire);
      wheel.rotation.z = Math.PI / 2;
      const xOff = (i - (perRow - 1) / 2) * R * 0.42;
      const zOff = (row - (rows - 1) / 2) * R * 0.72;
      wheel.position.set(xOff, -strutLen + R * 0.30, zOff);
      g.add(wheel);
    }
  }
  return g;
}
