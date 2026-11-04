/**
 * render/airport.ts — 空港（滑走路・誘導路・エプロン・ターミナル・管制塔・格納庫・駐機機・灯光）
 * 近景高精細: 滑走路テクスチャは実寸マッピング、建物は影を落とす。
 */
import * as THREE from 'three';
import type { AirportSpec } from '../config/airports.js';
import type { AirlinerSpec } from '../config/aircraft.js';
import { makeRunwayTexture, makeConcreteTexture, makeGlassTexture, makeTaxiwayTexture, makeSignTexture } from './textures.js';
import { buildAirliner } from './airliner.js';

/**
 * 地面レイヤーの高さ [m] と polygonOffset 順位（チカチカ防止・第2版）。
 *
 * 【原理】polygonOffset の units は「深度バッファの LSB 何個分」のバイアスなので、
 *  2 面が完全同一高さなら Δunits がそのまま LSB 整数差になり、どんな距離でも
 *  必ず分離する（近い距離では LSB が極小、遠方では LSB が数 m でも Δunits 倍で勝つ）。
 *  一方「数 cm の実ギャップ + units 差」の併用は、距離とともに units バイアスが
 *  実ギャップを追い越す交叉点で正味差≈0 となり、その距離帯で全面が明滅する
 *  （実測: 地上 12m の視点で diff>24 が 19.6%、特定の向きで二状態化）。
 *  → XZ で重なる面は全て「完全同一高さ y=0」に揃え、順位は units 差だけで付ける。
 *  実ギャップで分離するのは重ならない面同士（海面 y=-3、雲影 y=+22）のみとし、
 *  それらは地形と同じ units(16) にしてバイアス差をゼロにする（純幾何分離）。
 *   手前 → 奥: マーキング(-8) / 滑走路(0) / 誘導路(2) / 接続・エプロン(4) /
 *              路盤上面(8) / 地形・海面・雲影(16)
 */
const GROUND_Y = {
  // 舗装スタックの高さ [m]。物理接地面 terrainHeight()=0 に対し「µm 級」の差だけ付ける。
  // 【理由】幾何ギャップ g と units バイアス Δu・r(z)（r は深度 1LSB, ∝z²）は
  //   g = Δu・r(z*) で正味ゼロになり、その距離 z* の帯で全面が明滅する（実測 19.6%）。
  //   g を 5〜25µm にすれば z* = sqrt(g/Δu・2^24/0.4) ≈ 7〜13m ＝ カメラ真下（視野外）へ逃げ、
  //   それ以遠は units 差（≥4LSB）のみが順位を決め距離に依らず安定する。
  //   g が 1µm 級だと float32 の頂点/補導誤差（カメラ高さ12m で約1.4µm）に埋もれるため 5µm 以上。
  base: -0.26,   // 路盤ボックス中心（上面 = +0.000005）
  apron: 0.05,   // 接続誘導路・エプロン
  taxiway: 0.055, // 誘導路本体
  runway: 0.06,  // 滑走路（基準面）
  marking: 0.09  // 待機位置バー・駐機枠マーキング
};
// factor は 0 固定: 深度勾配に比例する factor を巨大な地面平面に使うと、
// 見通し角で数十〜数百 m のバイアスになり「海面が地形を飲み込む」等の逆転が起きる。
// 間隔は 2 以上: 巨大三角形はフラグメント毎の深度丸めで ±1 刻み揺れるため。
const OFFSET = {
  marking: { polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: 0 },
  runway: { polygonOffset: false, polygonOffsetFactor: 0, polygonOffsetUnits: 0 },
  // 誘導路本体は接続誘導路と 13m 重なるため手前側（4 vs 8）
  taxiMain: { polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: 0 },
  taxi: { polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: 0 },
  base: { polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: 0 }
};

export function buildAirport(
  scene: THREE.Scene,
  airport: AirportSpec,
  aircraftForParked: AirlinerSpec[],
  runwayTexPx = 512
): THREE.Group {
  const group = new THREE.Group();
  const { length: L, width: W, center, heading } = airport;

  // ===== 滑走路 =====
  const rwTex = makeRunwayTexture(W, L, airport.runwayNumbers[0], airport.runwayNumbers[1], runwayTexPx);
  rwTex.wrapS = THREE.ClampToEdgeWrapping;
  rwTex.wrapT = THREE.ClampToEdgeWrapping;
  const runway = new THREE.Mesh(
    new THREE.PlaneGeometry(W, L),
    new THREE.MeshStandardMaterial({ map: rwTex, roughness: 0.92, metalness: 0.02, ...OFFSET.runway })
  );
  runway.rotation.x = -Math.PI / 2;
  runway.position.y = GROUND_Y.runway;   // 舗装スタック基準面（units 0）
  runway.receiveShadow = true;
  group.add(runway);

  // 路盤ボックスは廃止: 舗装の真下に「別の大きな平面」を置くと、数 cm の実ギャップが
  // 深度バッファの量子化（24bit, Δdepth≈0.05/z²）に埋もれる距離（約 0.9km 以遠）で
  // 全面がタイ状態になり明滅する（実測 19.6%）。下地は地形（平坦帯 y=0）に任せ、
  // 舗装同士も重ねずに突合せで配置する＝深度競争そのものを排除する。

  // ===== 誘導路・エプロン =====
  const concrete = makeConcreteTexture();
  const matConcrete = new THREE.MeshStandardMaterial({ map: concrete, roughness: 0.9, ...OFFSET.taxi });

  // 誘導路（黄色センターライン入り）
  // 誘導路 (x=227..253) と接続誘導路 (x=20..240) は継ぎ目を消すため x=227..240 で
  // 意図的に重ねる。全舗装が同一高さ y=0 なので、順位は units 差（2 vs 4）のみで決定し、
  // 距離に依らず常に誘導路が勝つ（= 明滅しない）。
  const taxiTex = makeTaxiwayTexture();
  const matTaxi = new THREE.MeshStandardMaterial({ map: taxiTex, roughness: 0.9, ...OFFSET.taxi });
  const matTaxiMain = new THREE.MeshStandardMaterial({ map: taxiTex, roughness: 0.9, ...OFFSET.taxiMain });
  const taxiway = new THREE.Mesh(new THREE.PlaneGeometry(26, L * 0.92), matTaxiMain);
  taxiway.rotation.x = -Math.PI / 2;
  taxiway.position.set(240, GROUND_Y.taxiway, 0);
  taxiway.receiveShadow = true;
  group.add(taxiway);

  for (const tz of [-L * 0.36, -L * 0.05, L * 0.28]) {
    // 滑走路端 x=30 〜 誘導路端 x=227 に突合せ（重ねない＝深度競争なし）
    const connector = new THREE.Mesh(new THREE.PlaneGeometry(197, 24), matTaxi);
    connector.rotation.x = -Math.PI / 2;
    connector.position.set(128.5, GROUND_Y.apron, tz);
    connector.receiveShadow = true;
    group.add(connector);
    // 待機位置（滑走路手前の赤いバー）
    const hold = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 3.2),
      new THREE.MeshBasicMaterial({ color: 0xd83a2a, ...OFFSET.marking })
    );
    hold.rotation.x = -Math.PI / 2;
    hold.position.set(22, GROUND_Y.marking, tz);
    group.add(hold);
  }

  const apron = new THREE.Mesh(new THREE.PlaneGeometry(520, 900), matConcrete);
  apron.rotation.x = -Math.PI / 2;
  apron.position.set(620, GROUND_Y.apron, -100);
  apron.receiveShadow = true;
  group.add(apron);

  // エプロンの駐機枠マーキング
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xd8b64a, ...OFFSET.marking });
  for (let i = 0; i < 3; i++) {
    for (const side of [-1, 1]) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(3, 90), lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(620 + side * 70, GROUND_Y.marking, -330 + i * 170);
      group.add(line);
    }
  }

  // 誘導路標識
  const signSpecs: Array<{ text: string; x: number; z: number; rot: number }> = [
    { text: '34', x: -22, z: 1720, rot: 0 },
    { text: '16', x: -22, z: -1720, rot: Math.PI },
    { text: 'A', x: 210, z: -640, rot: -Math.PI / 2 },
    { text: 'B', x: 210, z: -100, rot: -Math.PI / 2 },
    { text: 'G', x: 210, z: 1120, rot: -Math.PI / 2 }
  ];
  for (const s of signSpecs) {
    const mat = new THREE.MeshStandardMaterial({ map: makeSignTexture(s.text), roughness: 0.7 });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(7, 3.2), mat);
    sign.position.set(s.x, 2.6, s.z);
    sign.rotation.y = s.rot;
    group.add(sign);
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 2.2, 6),
      new THREE.MeshStandardMaterial({ color: 0x555f68 })
    );
    post.position.set(s.x, 1.1, s.z);
    group.add(post);
  }

  // ===== ターミナル =====
  const matGlass = new THREE.MeshStandardMaterial({
    map: makeGlassTexture(),
    metalness: 0.75,
    roughness: 0.18,
    envMapIntensity: 1.4
  });
  const matWall = new THREE.MeshStandardMaterial({ color: 0xb8c0c8, metalness: 0.2, roughness: 0.6 });
  const matRoof = new THREE.MeshStandardMaterial({ color: 0x8a929b, metalness: 0.35, roughness: 0.55 });

  const terminal = new THREE.Group();
  const tBody = new THREE.Mesh(new THREE.BoxGeometry(260, 26, 620), matWall);
  tBody.position.y = 13;
  tBody.castShadow = true;
  tBody.receiveShadow = true;
  terminal.add(tBody);
  const tGlass = new THREE.Mesh(new THREE.BoxGeometry(262, 12, 622), matGlass);
  tGlass.position.y = 16;
  terminal.add(tGlass);
  const tRoof = new THREE.Mesh(new THREE.BoxGeometry(272, 3, 632), matRoof);
  tRoof.position.y = 27.5;
  tRoof.castShadow = true;
  terminal.add(tRoof);
  // 屋上設備
  for (let i = 0; i < 6; i++) {
    const unit = new THREE.Mesh(new THREE.BoxGeometry(18, 6, 14), matRoof);
    unit.position.set(-80 + (i % 3) * 80, 32, -180 + Math.floor(i / 3) * 340);
    unit.castShadow = true;
    terminal.add(unit);
  }
  terminal.position.set(850, 0, -60);
  group.add(terminal);

  // ジェットブリッジ（可動式の簡易表現: ターミナル → 駐機位置）
  for (let i = 0; i < 3; i++) {
    const bridge = new THREE.Group();
    const tube = new THREE.Mesh(new THREE.BoxGeometry(70, 6.5, 8), matWall);
    tube.position.set(-24, 12, 0);
    tube.castShadow = true;
    bridge.add(tube);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 10), matGlass);
    cab.position.set(-64, 11, 0);
    bridge.add(cab);
    const support = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 12, 8), matRoof);
    support.position.set(-30, 6, 0);
    bridge.add(support);
    bridge.position.set(740, 0, -330 + i * 170);
    group.add(bridge);
  }

  // ===== 管制塔 =====
  const tower = new THREE.Group();
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(7, 11, 52, 12),
    matWall
  );
  shaft.position.y = 26;
  shaft.castShadow = true;
  tower.add(shaft);
  const cab = new THREE.Mesh(
    new THREE.CylinderGeometry(13, 10, 10, 12),
    matGlass
  );
  cab.position.y = 56;
  cab.castShadow = true;
  tower.add(cab);
  const cabRoof = new THREE.Mesh(new THREE.CylinderGeometry(14, 14, 2, 12), matRoof);
  cabRoof.position.y = 62;
  tower.add(cabRoof);
  tower.position.set(430, 0, 420);
  group.add(tower);

  // ===== 格納庫 =====
  for (let i = 0; i < 2; i++) {
    const hangar = new THREE.Group();
    const shell = new THREE.Mesh(
      new THREE.CylinderGeometry(38, 38, 96, 18, 1, false, 0, Math.PI),
      matRoof
    );
    shell.rotation.z = Math.PI / 2;
    shell.rotation.y = Math.PI / 2;
    shell.position.y = 0;
    shell.castShadow = true;
    hangar.add(shell);
    const door = new THREE.Mesh(new THREE.PlaneGeometry(96, 36), matGlass);
    door.rotation.y = Math.PI / 2;
    door.position.set(-0.5, 18, 0);
    hangar.add(door);
    hangar.position.set(980, 0, 520 + i * 130);
    group.add(hangar);
  }

  // ===== 駐機中の航空機（低ディテール） =====
  const parkedPositions: Array<{ x: number; z: number; rot: number }> = [
    { x: 700, z: -330, rot: Math.PI },
    { x: 700, z: 160, rot: Math.PI },
    { x: 640, z: -520, rot: Math.PI * 0.92 }
  ];
  parkedPositions.forEach((p, i) => {
    const spec = aircraftForParked[i % aircraftForParked.length];
    const parked = buildAirliner(spec, { low: true });
    parked.setGearPosition(1);
    // 車輪下面が舗装面にちょうど触れる高さ（physics.gearHeight = R*1.95 と一致させる）
    parked.group.position.set(p.x, spec.fuselageRadius * 1.95 + GROUND_Y.runway, p.z);
    parked.group.rotation.y = p.rot;
    group.add(parked.group);
  });

  // ===== 滑走路・誘導路の灯光 =====
  const lightGeo = new THREE.BoxGeometry(0.9, 0.5, 0.9);
  const edgeMat = new THREE.MeshBasicMaterial({ color: 0xffe9a8, fog: false });
  const nEdge = 2 * 68;
  const edgeLights = new THREE.InstancedMesh(lightGeo, edgeMat, nEdge);
  const m = new THREE.Matrix4();
  let idx = 0;
  for (let i = 0; i < 68; i++) {
    const z = -L / 2 + (i * L) / 67;
    for (const side of [-1, 1]) {
      m.makeTranslation(side * (W / 2 + 1.2), 0.6, z);
      edgeLights.setMatrixAt(idx++, m);
    }
  }
  edgeLights.instanceMatrix.needsUpdate = true;
  group.add(edgeLights);

  // ===== PAPI（進入角 indicator: 白2+赤2、閾値右側）=====
  const papiOn = [new THREE.Color(0xffffff), new THREE.Color(0xffffff), new THREE.Color(0xff2a18), new THREE.Color(0xff2a18)];
  const papiMats = papiOn.map((c) => new THREE.MeshBasicMaterial({ color: c, fog: false }));
  const papiGeo = new THREE.BoxGeometry(0.7, 0.5, 1.4);
  for (const endSign of [1, -1]) {
    for (let k = 0; k < 4; k++) {
      const unit = new THREE.Mesh(papiGeo, papiMats[k]);
      // 滑走路終端側は逆向き（赤白反転は簡略: 同一配置）
      unit.position.set(W / 2 + 9 + k * 1.6, 0.55, endSign * (L / 2 - 210));
      unit.rotation.y = endSign < 0 ? Math.PI : 0;
      group.add(unit);
    }
  }

  // 誘導路の青色灯
  const blueMat = new THREE.MeshBasicMaterial({ color: 0x4488ff, fog: false });
  const taxiLights = new THREE.InstancedMesh(lightGeo, blueMat, 2 * 40);
  idx = 0;
  for (let i = 0; i < 40; i++) {
    const z = -L * 0.45 + (i * L * 0.9) / 39;
    for (const side of [-1, 1]) {
      m.makeTranslation(240 + side * 14, 0.6, z);
      taxiLights.setMatrixAt(idx++, m);
    }
  }
  taxiLights.instanceMatrix.needsUpdate = true;
  group.add(taxiLights);

  // 空港全体の向き・位置
  group.position.set(center.x, 0, center.z);
  group.rotation.y = heading;

  // ===== 夜間灯光: 昼は消し気味・夜は発光（bloom 映え） =====
  const baseEdge = edgeMat.color.clone();
  const baseBlue = blueMat.color.clone();
  const basePapi = papiMats.map((m) => m.color.clone());
  (group.userData as Record<string, unknown>).setNightLights = (f: number) => {
    const k = 0.16 + 1.5 * f; // 昼 0.16 → 夜 1.66
    edgeMat.color.copy(baseEdge).multiplyScalar(k);
    blueMat.color.copy(baseBlue).multiplyScalar(k);
    papiMats.forEach((m, i) => m.color.copy(basePapi[i]).multiplyScalar(0.2 + 1.5 * f));
  };

  scene.add(group);
  return group;
}
