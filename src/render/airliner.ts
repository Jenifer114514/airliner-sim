/**
 * render/airliner.ts — 旅客機の手続き生成（滑らかな曲面）
 *
 * 【座標系】機体: +Z = 機首, +Y = 上, +X = 右翼（group.lookAt() で機首を進行方向へ）
 * 【構成】
 *   胴体: LatheGeometry（プロファイル回転）+ 尾部アップスイープ変形 + 窓列テクスチャ
 *   鼻先: ラドーム別メッシュ（濃灰） / 尾部: APU コンシーン
 *   主翼/尾翼: NACA 系翼型断面のロフト（後退角・上反角・テーパー）+ パネルマップ
 *   翼端: 曲率付きシャークレット（ロフト）
 *   エンジン: ナセル + インテークリップ + ジオメトリファン（InstancedMesh）+ スワールハブ + リバータ線
 *   着陸装置: オレオ 2 段 + トークリンク + ハブ付き車輪 + 格納庫戸（格納連動で開閉）
 *   小物: ブレードアンテナ / SATCOM ドーム / TCAS / 静電放電素子
 *   塗装: クリアコート（MeshPhysical）+ 尾翼 liveried + 社名・登録記号
 *
 * 【モデルの前提】形状は公開情報に基づく近似。実機 GLB に差し替え可能な構造。
 */
import * as THREE from 'three';
import type { AirlinerSpec } from '../config/aircraft.js';
import { attachExtModel, updateExtModel } from './extModel.js';
import {
  makeFuselageTexture,
  makeFanTexture,
  makePanelMaps,
  makeTailTexture
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
  fanMeshes: THREE.Object3D[];
  setGearPosition(t: number): void;
  setFlaps(deg: number): void;
  setSpoilers(t: number): void;
  spinFans(dt: number): void;
  updateLights(timeSec: number): void;
}

interface BuildOptions {
  /** 低ディテール（駐機機用） */
  low?: boolean;
  /** v24: public/airliner.glb の実モデルを外観へ差し替える（既定 false＝手続描画）。
   *  メニュープレビュー/駐機機が構図崩れしないよう、有効化はプレイヤー機のみ。 */
  ext?: boolean;
}

export function buildAirliner(spec: AirlinerSpec, options: BuildOptions = {}): AirlinerParts {
  const group = new THREE.Group();
  const low = options.low ?? false;
  const ext = options.ext ?? false;

  // ===== マテリアル（PBR） =====
  const fusTex = makeFuselageTexture(
    spec.liveryTop, spec.liveryBottom, spec.liveryAccent,
    Math.round(spec.fuselageLength * 1.6),
    spec.liveryName, spec.liveryRegistration
  );
  fusTex.anisotropy = 16;
  // 胴体塗装: 非 low はクリアコート（航空塗装の艶）。low は従来 Standard のまま。
  const matPaint: THREE.MeshStandardMaterial = low
    ? new THREE.MeshStandardMaterial({
        map: fusTex, metalness: 0.42, roughness: 0.32, envMapIntensity: 1.15
      })
    : new THREE.MeshPhysicalMaterial({
        map: fusTex,
        metalness: 0.28,
        roughness: 0.36,
        clearcoat: 0.65,
        clearcoatRoughness: 0.16,
        envMapIntensity: 1.35
      });
  const matWingBase = new THREE.MeshStandardMaterial({
    color: 0xc9d2da,
    metalness: 0.55,
    roughness: 0.38,
    envMapIntensity: 1.1
  });
  // 主翼専用: パネルラインの normal/roughness（翼面 UV: u=弦 / v=幅）
  const matWing = matWingBase.clone();
  const panel = makePanelMaps();
  if (!low) {
    const wn = panel.normalMap.clone(); wn.needsUpdate = true;
    const wr = panel.roughnessMap.clone(); wr.needsUpdate = true;
    wn.wrapS = wn.wrapT = THREE.RepeatWrapping;
    wr.wrapS = wr.wrapT = THREE.RepeatWrapping;
    wn.repeat.set(3, 10);
    wr.repeat.set(3, 10);
    matWing.normalMap = wn;
    matWing.normalScale = new THREE.Vector2(0.45, 0.45);
    matWing.roughnessMap = wr;
  }
  const matDark = new THREE.MeshStandardMaterial({
    color: 0x2a3138,
    metalness: 0.5,
    roughness: 0.5
  });
  // ナセル/パイロン用: 胴体テクスチャ（窓・文字）を引き伸ばさないよう無地の機体色
  const cowlColor = new THREE.Color(spec.liveryTop);
  const matCowl: THREE.MeshStandardMaterial = low
    ? new THREE.MeshStandardMaterial({ color: cowlColor, metalness: 0.42, roughness: 0.34, envMapIntensity: 1.15 })
    : new THREE.MeshPhysicalMaterial({ color: cowlColor, metalness: 0.28, roughness: 0.36, clearcoat: 0.65, clearcoatRoughness: 0.16, envMapIntensity: 1.35 });
  const matRadome = new THREE.MeshStandardMaterial({
    color: 0x525a63, metalness: 0.15, roughness: 0.62
  });
  const matMetal = new THREE.MeshStandardMaterial({
    color: 0xb9c3cc, metalness: 0.95, roughness: 0.22, envMapIntensity: 1.4
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
  // 垂直尾翼 liveried（両面同じサイドビューが写る）
  const matFin = low ? matWingBase : new THREE.MeshPhysicalMaterial({
    map: makeTailTexture(spec.liveryTop, spec.liveryBottom, spec.liveryAccent, spec.liveryName),
    metalness: 0.25,
    roughness: 0.34,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.25,
    side: THREE.DoubleSide
  });
  // シャークレットはボトム色の差し色
  const matWinglet = low ? matWingBase : new THREE.MeshPhysicalMaterial({
    color: spec.liveryBottom,
    metalness: 0.3,
    roughness: 0.3,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.3,
    side: THREE.DoubleSide
  });

  const R = spec.fuselageRadius;
  const L = spec.fuselageLength;

  // ============================================================
  // 胴体（ラシ + アップスイープ）
  // ============================================================
  const profile: THREE.Vector2[] = [];
  const PROFILE_STEPS = low ? 14 : 30;
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
  const fusGeo = new THREE.LatheGeometry(profile, low ? 18 : 48);
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
  {
    const pn = panel.normalMap.clone(); pn.needsUpdate = true;
    const pr = panel.roughnessMap.clone(); pr.needsUpdate = true;
    pn.wrapS = pn.wrapT = THREE.RepeatWrapping;
    pr.wrapS = pr.wrapT = THREE.RepeatWrapping;
    pn.repeat.set(3, 4);
    pr.repeat.set(3, 4);
    (matFuselage as THREE.MeshStandardMaterial).normalMap = pn;
    matFuselage.normalScale = new THREE.Vector2(0.6, 0.6);
    (matFuselage as THREE.MeshStandardMaterial).roughnessMap = pr;
  }
  const fuselage = new THREE.Mesh(fusGeo, matFuselage);
  fuselage.castShadow = true;
  fuselage.receiveShadow = true;
  group.add(fuselage);

  // ---- ラドーム（鼻先を覆う別メッシュ、塗装境界を立体的に） ----
  if (!low) {
    const radProfile: THREE.Vector2[] = [];
    const RSTEPS = 10;
    for (let i = 0; i <= RSTEPS; i++) {
      const t = (i / RSTEPS) * 0.085; // 鼻先 8.5% だけ
      const r = R * Math.sqrt(1 - Math.pow(1 - t / 0.10, 2.1)) * 0.98 + 0.02;
      radProfile.push(new THREE.Vector2(Math.max(r * 1.014, 0.05), t * L));
    }
    const radGeo = new THREE.LatheGeometry(radProfile, 40);
    radGeo.rotateX(-Math.PI / 2);
    radGeo.translate(0, 0, L / 2);
    const radome = new THREE.Mesh(radGeo, matRadome);
    radome.castShadow = true;
    group.add(radome);
  }

  // ---- APU テールコーン（尾部先端 + 排気口） ----
  if (!low) {
    const tailY = R * 1.15, tailZ = -L / 2;
    const apu = new THREE.Mesh(
      new THREE.CylinderGeometry(R * 0.11, R * 0.2, R * 0.8, 14),
      matRadome
    );
    apu.rotation.x = Math.PI / 2;
    apu.position.set(0, tailY + R * 0.22, tailZ - R * 0.3);
    group.add(apu);
  }

  // ============================================================
  // 主翼（ロフト翼型 × 2）
  // ============================================================
  const halfSpan = spec.wingspan / 2;
  const wingGroupL = makeWingSurface(
    spec.rootChord, spec.tipChord, halfSpan, spec.sweep, spec.dihedral,
    matWing, low, -1, false, spec.liveryAccent, matWinglet
  );
  const wingGroupR = makeWingSurface(
    spec.rootChord, spec.tipChord, halfSpan, spec.sweep, spec.dihedral,
    matWing, low, 1, false, spec.liveryAccent, matWinglet
  );
  group.add(wingGroupL, wingGroupR);

  // 翼胴接合フェアリング（上面/下面の塗り込み代替の滑らかな盛り上がり）
  if (!low) {
    for (const s of [-1, 1]) {
      for (const yy of [0.05, -0.1]) {
        const fil = new THREE.Mesh(
          new THREE.CapsuleGeometry(R * 0.16, spec.rootChord * 0.5, 4, 10),
          matWingBase
        );
        fil.rotation.z = Math.PI / 2;
        fil.scale.set(1, 1, yy > 0 ? 0.55 : 0.7);
        fil.position.set(s * R * 1.05, yy * R + Math.tan(spec.dihedral) * R * 1.05, -L * 0.02);
        group.add(fil);
      }
    }
  }

  // ============================================================
  // 垂直尾翼・水平尾翼
  // ============================================================
  const fin = makeWingSurface(
    spec.tailRootChord, spec.tailRootChord * 0.42, spec.tailHeight * 0.92,
    spec.sweep + 0.12, 0, matFin, low, 1, true
  );
  fin.position.set(0, R * 0.55, -L * 0.36);
  group.add(fin);

  // 水平尾翼: 実機比（全幅の約 5 割）に縮小・下方後退配置。
  // 旧値（64%/中央より上）は後方視点で「主翼が 2 枚」に見える原因になっていた
  const hStabSpan = spec.wingspan * 0.25;
  const hStabL = makeWingSurface(
    spec.tailRootChord * 0.52, spec.tailRootChord * 0.22, hStabSpan,
    spec.sweep + 0.14, 0.035, matWingBase, low, -1
  );
  hStabL.position.set(0, R * 0.12, -L * 0.415);
  const hStabR = makeWingSurface(
    spec.tailRootChord * 0.52, spec.tailRootChord * 0.22, hStabSpan,
    spec.sweep + 0.14, 0.035, matWingBase, low, 1
  );
  hStabR.position.set(0, R * 0.12, -L * 0.415);
  group.add(hStabL, hStabR);
  // 尾翼基部フェアリング（胴体 ⇄ 水平尾翼の段差）
  if (!low) {
    const tb = new THREE.Mesh(
      new THREE.CapsuleGeometry(R * 0.3, L * 0.16, 4, 12),
      matWingBase
    );
    tb.rotation.x = Math.PI / 2;
    tb.position.set(0, R * 0.22, -L * 0.40);
    tb.scale.set(1.0, 0.55, 1.0);
    group.add(tb);
  }

  // ============================================================
  // エンジン（左右）
  // ============================================================
  const fanMeshes: THREE.Object3D[] = [];
  for (const side of [-1, 1]) {
    const engine = makeEngine(spec, matDark, matFan, matCowl, matMetal, low);
    const spanX = side * spec.engineSpanPos * halfSpan;
    // 主翼前縁位置（後退角ぶん後退）
    const leZ = spec.engineForward - Math.tan(spec.sweep) * Math.abs(spanX) * 0.55;
    const wingY = Math.abs(spanX) * Math.tan(spec.dihedral);
    engine.position.set(spanX, wingY - spec.engineDiameter * 0.78, leZ + spec.engineLength * 0.28);
    group.add(engine);
    fanMeshes.push(...(engine.userData.rotors as THREE.Object3D[]));

    // パイロン（翼形断面で角を取った形状）
    const pylon = new THREE.Mesh(
      new THREE.BoxGeometry(
        spec.engineDiameter * 0.22, spec.engineDiameter * 1.15, spec.engineLength * 0.5
      ),
      matCowl
    );
    pylon.position.set(
      spanX,
      wingY - spec.engineDiameter * 0.22,
      leZ + spec.engineLength * 0.12
    );
    pylon.castShadow = !low;
    group.add(pylon);
    if (!low) {
      // パイロン前縁の尖り（ウェッジ）
      const wedge = new THREE.Mesh(
        new THREE.CylinderGeometry(
          spec.engineDiameter * 0.11, spec.engineDiameter * 0.11,
          spec.engineDiameter * 1.15, 3
        ),
        matCowl
      );
      wedge.rotation.z = Math.PI / 2;
      wedge.rotation.y = Math.PI / 2;
      wedge.position.set(
        spanX,
        wingY - spec.engineDiameter * 0.2,
        leZ + spec.engineLength * 0.42
      );
      group.add(wedge);
    }
  }

  // ============================================================
  // 着陸装置
  // ============================================================
  const gearGroups: THREE.Group[] = [];
  const gearDoors: { mesh: THREE.Mesh; sign: number }[] = [];
  if (!low) {
    const noseGear = makeGear(matStrut, matTire, matMetal, 2, R, R * (GEAR_REACH - 0.92), false);
    noseGear.position.set(0, -R * 0.92, L * 0.30);
    group.add(noseGear);
    gearGroups.push(noseGear);
    addBayDoors(group, gearDoors, new THREE.Vector3(0, -R * 0.9, L * 0.3), R, L, 1, 1.1);

    for (const side of [-1, 1]) {
      const mainGear = makeGear(matStrut, matTire, matMetal, spec.mainWheelCount * 2, R, R * (GEAR_REACH - 0.95), true);
      mainGear.position.set(side * R * 1.35, -R * 0.95, -L * 0.02);
      group.add(mainGear);
      gearGroups.push(mainGear);
      addBayDoors(group, gearDoors, new THREE.Vector3(side * R * 1.35, -R * 0.92, -L * 0.02), R, L, side, 1.5);
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
  // 機体小物ディテール（low ではスキップ）
  // ============================================================
  if (!low) addFuselageDetails(group, spec, R, L);

  // ============================================================
  // 航行灯・ストロボ・アクティブビーコン・ランディングライト
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

  // ランディングライト（降脚連動で点灯する発光レンズ: 翼根前縁 ×2 + ノーズギア）
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x30353b, emissive: 0xfff3cf, emissiveIntensity: 0, roughness: 0.2, metalness: 0.4
  });
  if (!low) {
    for (const s of [-1, 1]) {
      const lens = new THREE.Mesh(new THREE.CircleGeometry(R * 0.13, 12), lensMat);
      lens.position.set(s * R * 1.25, -R * 0.52, L * 0.16);
      lens.rotation.x = -Math.PI / 2 + 0.28;
      lens.rotation.y = s * 0.18;
      group.add(lens);
      const bezel = new THREE.Mesh(new THREE.TorusGeometry(R * 0.145, R * 0.025, 6, 16), matMetal);
      bezel.position.copy(lens.position);
      bezel.rotation.copy(lens.rotation);
      group.add(bezel);
    }
  }

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
      // 戸: 降脚時は開きっぱなし（上面に寝かせる）、収納時は閉じる
      for (const d of gearDoors) d.mesh.rotation.x = d.sign * k * 1.15;
      lensMat.emissiveIntensity = k > 0.55 ? 2.6 : 0;
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
      updateExtModel(group, dt); // v24: GLB プロペラ/車輪クリップ
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
  // v24: 外部 GLB（public/airliner.glb）があれば外観を差し替え。失敗は手続維持。
  if (ext) void attachExtModel(group);
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
  vertical = false,
  accentColor?: number,
  wingletMat?: THREE.Material
): THREE.Group {
  const group = new THREE.Group();
  const SECTIONS = low ? 6 : 14;
  const POINTS = low ? 12 : 24; // 翼型周回点数
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
  const uvs: number[] = [];
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
      uvs.push(t, u); // u=弦方向 / v=翼幅方向 → テイル/パネルマップ用
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
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  // 翼端シャークレット（曲率付きロフト。垂直尾翼は不要）
  if (!vertical && !low && wingletMat) {
    const h = Math.max(1.4, span * 0.115);
    const wlet = makeWinglet(side, span, h, tipChord * 0.92, tipChord * 0.4, sweep, dihedral, wingletMat);
    group.add(wlet);
    void accentColor;
  }
  return group;
}

/** 曲率付き翼端シャークレット: 翼端から外側+上方向へ湾曲しながら立ち上がる小翼面 */
function makeWinglet(
  side: 1 | -1,
  span: number,
  height: number,
  rootChord: number,
  tipChord: number,
  sweep: number,
  wingDihedral: number,
  mat: THREE.Material
): THREE.Mesh {
  const SECT = 7;
  const PTS = 14;
  const TH = 0.1;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const loop: Array<[number, number]> = [];
  for (let i = 0; i <= PTS / 2; i++) {
    const t = i / (PTS / 2);
    const y = 2 * TH * (0.2969 * Math.sqrt(t) - 0.126 * t - 0.3516 * t * t + 0.2843 * t ** 3 - 0.1015 * t ** 4);
    loop.push([t, 0.02 + y]);
  }
  for (let i = PTS / 2 - 1; i > 0; i--) {
    const t = i / (PTS / 2);
    const y = 2 * TH * (0.2969 * Math.sqrt(t) - 0.126 * t - 0.3516 * t * t + 0.2843 * t ** 3 - 0.1015 * t ** 4);
    loop.push([t, 0.02 - y]);
  }
  const loopN = loop.length;
  const baseY = Math.abs(side * span) * Math.tan(wingDihedral);
  for (let s = 0; s <= SECT; s++) {
    const u = s / SECT;
    const yy = baseY + Math.pow(u, 0.82) * height;          // 立ち上がり（先端で垂直気味）
    const xx = side * (span + Math.sin(u * Math.PI * 0.5) * height * 0.34); // 外側への開き
    const chord = rootChord + (tipChord - rootChord) * u;
    const swz = -Math.tan(sweep) * span - u * chord * 0.42;  // 後縁へ巻き込む
    for (let p = 0; p < loopN; p++) {
      const [t, th] = loop[p];
      positions.push(xx, yy + th * chord * 0.16, swz - t * chord);
      uvs.push(t, u);
    }
  }
  for (let s = 0; s < SECT; s++) {
    for (let p = 0; p < loopN; p++) {
      const p2 = (p + 1) % loopN;
      const a = s * loopN + p, b = s * loopN + p2;
      const c = (s + 1) * loopN + p, d = (s + 1) * loopN + p2;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = true;
  return m;
}

// ============================================================
// エンジン
// ============================================================
function makeEngine(
  spec: AirlinerSpec,
  matDark: THREE.MeshStandardMaterial,
  matFan: THREE.MeshStandardMaterial,
  matPaint: THREE.MeshStandardMaterial,
  matMetal: THREE.MeshStandardMaterial,
  low: boolean
): THREE.Group {
  const g = new THREE.Group();
  const d = spec.engineDiameter;
  const len = spec.engineLength;

  // ナセル（ラシ）
  const profile: THREE.Vector2[] = [];
  const STEPS = low ? 8 : 20;
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
  const nacelleGeo = new THREE.LatheGeometry(profile, low ? 12 : 28);
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

  // ファンロータ（ジオメトリブレード + ハブ + 面テクスチャ）— 回転ユニット
  const rotor = new THREE.Group();
  rotor.position.z = len * 0.19;
  const fanDisc = new THREE.Mesh(new THREE.CircleGeometry(d * 0.40, 28), matFan);
  rotor.add(fanDisc);
  if (!low) {
    // 実体ブレード 22 枚（InstancedMesh: 薄いねじれ箱）
    const bladeGeo = new THREE.BoxGeometry(d * 0.02, d * 0.145, d * 0.3);
    const blades = new THREE.InstancedMesh(
      bladeGeo,
      new THREE.MeshStandardMaterial({ color: 0x8b97a4, metalness: 0.9, roughness: 0.32, flatShading: true }),
      22
    );
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const eul = new THREE.Euler();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3(1, 1, 1);
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2;
      const rr = d * 0.15 + d * 0.15;
      pos.set(Math.cos(a) * rr, Math.sin(a) * rr, 0);
      eul.set(0.62, 0, a); // ねじれ角 + 放射方向
      q.setFromEuler(eul);
      m4.compose(pos, q, scl);
      blades.setMatrixAt(i, m4);
    }
    blades.instanceMatrix.needsUpdate = true;
    rotor.add(blades);
    // スピナー cones（ハブ前部）
    const spinner = new THREE.Mesh(
      new THREE.ConeGeometry(d * 0.09, d * 0.16, 12),
      new THREE.MeshStandardMaterial({ color: 0xaeb8c2, metalness: 0.9, roughness: 0.25 })
    );
    spinner.rotation.x = -Math.PI / 2;
    spinner.position.z = d * 0.06;
    rotor.add(spinner);
  }
  g.add(rotor);

  if (!low) {
    // インテークリップ（光沢金属リング）
    const lip = new THREE.Mesh(new THREE.TorusGeometry(d * 0.485, d * 0.048, 10, 30), matMetal);
    lip.position.z = len * 0.005;
    g.add(lip);
    // リバータ（ thrust reverser ）継ぎ目: 細い暗リング ×1
    const seam = new THREE.Mesh(new THREE.TorusGeometry(d * 0.505, d * 0.014, 6, 28), matDark);
    seam.position.z = -len * 0.28;
    g.add(seam);
    // 排気ノズル: メタルリング + 中心プラグコーン
    const nozzle = new THREE.Mesh(
      new THREE.CylinderGeometry(d * 0.27, d * 0.21, len * 0.16, 18, 1, true),
      matMetal
    );
    nozzle.rotation.x = Math.PI / 2;
    nozzle.position.z = -len * 0.42;
    g.add(nozzle);
    const plug = new THREE.Mesh(new THREE.ConeGeometry(d * 0.16, len * 0.2, 14), matDark);
    plug.rotation.x = Math.PI / 2;
    plug.position.z = -len * 0.46;
    g.add(plug);
  } else {
    // 低ディテール: 従来どおり簡易排気コア
    const exhaust = new THREE.Mesh(
      new THREE.CylinderGeometry(d * 0.16, d * 0.12, len * 0.3, 12),
      matDark
    );
    exhaust.rotation.x = Math.PI / 2;
    exhaust.position.z = -len * 0.38;
    g.add(exhaust);
  }

  g.userData.rotors = [rotor];
  return g;
}

// ============================================================
// 着陸装置
// ============================================================
function makeGear(
  matStrut: THREE.MeshStandardMaterial,
  matTire: THREE.MeshStandardMaterial,
  matMetal: THREE.MeshStandardMaterial,
  wheelCount: number,
  R: number,
  strutLen: number,
  isMain: boolean
): THREE.Group {
  const g = new THREE.Group();
  // オレオ: 細い上筒（クローム）+ 太い下筒
  const upper = new THREE.Mesh(
    new THREE.CylinderGeometry(R * 0.075, R * 0.085, strutLen * 0.52, 10),
    matMetal
  );
  upper.position.y = -strutLen * 0.26;
  g.add(upper);
  const lower = new THREE.Mesh(
    new THREE.CylinderGeometry(R * 0.105, R * 0.115, strutLen * 0.56, 10),
    matStrut
  );
  lower.position.y = -strutLen * 0.72;
  g.add(lower);

  // トークリンク（主脚だけ: 斜めプレートのペア）
  if (isMain) {
    for (const s of [-1, 1]) {
      const link = new THREE.Mesh(
        new THREE.BoxGeometry(R * 0.05, strutLen * 0.34, R * 0.09),
        matStrut
      );
      link.position.set(s * R * 0.11, -strutLen * 0.44, 0);
      link.rotation.z = s * 0.42;
      g.add(link);
    }
  }

  // 車輪: タイヤ + ハブ（ブレーキリング）
  const tireGeo = new THREE.CylinderGeometry(R * 0.3, R * 0.3, R * 0.2, 16);
  const hubGeo = new THREE.CylinderGeometry(R * 0.16, R * 0.16, R * 0.235, 12);
  const perRow = 2;
  const rows = Math.max(1, Math.floor(wheelCount / perRow));
  for (let row = 0; row < rows; row++) {
    // ボギービーム（多輪主脚）
    if (isMain && rows > 1) {
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(R * 0.98, R * 0.1, R * 0.16),
        matStrut
      );
      beam.position.set(0, -strutLen + R * 0.3, (row - (rows - 1) / 2) * R * 0.72);
      g.add(beam);
    }
    for (let i = 0; i < perRow; i++) {
      const wheel = new THREE.Mesh(tireGeo, matTire);
      wheel.rotation.z = Math.PI / 2;
      const xOff = (i - (perRow - 1) / 2) * R * 0.42;
      const zOff = (row - (rows - 1) / 2) * R * 0.72;
      wheel.position.set(xOff, -strutLen + R * 0.3, zOff);
      g.add(wheel);
      const hub = new THREE.Mesh(hubGeo, matMetal);
      hub.rotation.z = Math.PI / 2;
      hub.position.copy(wheel.position);
      g.add(hub);
    }
  }
  return g;
}

/** 降開閉に連動する簡易戸（暗いベイ + 戸板 2 枚） */
function addBayDoors(
  group: THREE.Group,
  out: { mesh: THREE.Mesh; sign: number }[],
  at: THREE.Vector3,
  R: number,
  L: number,
  side: number,
  size: number
): void {
  void L;
  const bay = new THREE.Mesh(
    new THREE.BoxGeometry(R * 0.62 * size, R * 0.1, R * 1.5 * size),
    new THREE.MeshStandardMaterial({ color: 0x14181d, roughness: 0.9, metalness: 0.2 })
  );
  bay.position.set(at.x, -R * 0.99, at.z);
  group.add(bay);
  for (const ds of [-1, 1]) {
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(R * 0.6 * size, R * 0.045, R * 1.44 * size),
      new THREE.MeshStandardMaterial({ color: 0xd7dee5, roughness: 0.42, metalness: 0.3 })
    );
    door.position.set(at.x + ds * side * R * 0.31 * size, -R * 1.02, at.z);
    // 戸の片縁をヒンジに（ジオメトリ中心補正）
    door.geometry.translate(-ds * R * 0.3 * size, 0, 0);
    door.position.x = at.x + ds * side * R * 0.02;
    group.add(door);
    out.push({ mesh: door, sign: ds * side });
  }
}

/** 胴体小物: アンテナ / SATCOM / TCAS / 静電放電素子 */
function addFuselageDetails(group: THREE.Group, spec: AirlinerSpec, R: number, L: number): void {
  const matAnt = new THREE.MeshStandardMaterial({ color: 0xaeb9c4, metalness: 0.15, roughness: 0.55 });
  const blade = (x: number, z: number, up: boolean, h: number) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.06, h, h * 0.42), matAnt);
    b.position.set(x, (up ? 1 : -1) * (R + h * 0.42), z);
    if (!up) b.rotation.x = Math.PI;
    group.add(b);
  };
  blade(0, L * 0.1, true, R * 0.42);
  blade(0, -L * 0.16, true, R * 0.34);
  blade(0, -L * 0.05, false, R * 0.4);
  blade(0.7, -L * 0.2, false, R * 0.28);
  // SATCOM ドーム（上面の白い膨らみ ×2）
  const domeMat = new THREE.MeshStandardMaterial({ color: 0xeef2f6, roughness: 0.4, metalness: 0.1 });
  for (const dz of [L * 0.24, -L * 0.2]) {
    const dome = new THREE.Mesh(new THREE.SphereGeometry(R * 0.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    dome.scale.set(1, 0.55, 1.4);
    dome.position.set(0, R * 0.985, dz);
    group.add(dome);
  }
  // TCAS（上下の薄板アンテナ）
  for (const up of [true, false]) {
    const tcas = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.24, R * 0.2, 0.07, 12), domeMat);
    tcas.position.set(0, (up ? 1.02 : -1.02) * R, up ? L * 0.02 : -L * 0.1);
    group.add(tcas);
  }
  // 静電放電素子（主翼後縁 ×3/側 + 水平尾翼後縁 ×1/側）
  const halfSpan = spec.wingspan / 2;
  const wickMat = new THREE.MeshStandardMaterial({ color: 0x20262c, roughness: 0.7, metalness: 0.3 });
  const wick = (x: number, y: number, z: number) => {
    const w = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.4, 6), wickMat);
    w.position.set(x, y, z);
    w.rotation.x = Math.PI / 2;
    group.add(w);
  };
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const wx = side * (halfSpan * (0.45 + i * 0.18));
      const wz = -Math.tan(spec.sweep) * Math.abs(wx) - (spec.rootChord + (spec.tipChord - spec.rootChord) * (wx / halfSpan)) * 0.98;
      wick(wx, Math.abs(wx) * Math.tan(spec.dihedral), wz);
    }
    // 水平尾翼後縁（v5j で半幅 0.25・y R*0.12・z -0.415L へ移動したのに合わせて追従）
    const hs = spec.wingspan * 0.25 * 0.88;
    wick(side * hs, R * 0.12, -L * 0.415 - Math.tan(spec.sweep + 0.14) * hs - spec.tailRootChord * 0.52 * 0.98);
  }
  void spec;
}
