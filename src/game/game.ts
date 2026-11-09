/**
 * game/game.ts — 状態機械とシーン配線
 * 状態: 'menu'（3D プレビュー）| 'flying'（デモ飛行）| 'paused'
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { WORLD, type QualityLevel } from '../config/constants.js';
import { getAircraftSpec, AIRCRAFT, type AirlinerSpec } from '../config/aircraft.js';
import { getAirportSpec, AIRPORTS } from '../config/airports.js';
import { QualityManager } from '../core/quality.js';
import { buildSky, type SkyObjects } from '../render/sky.js';
import { buildTerrain, type TerrainObjects } from '../render/terrain.js';
import { buildWater, type WaterObjects } from '../render/water.js';
import { buildClouds, type CloudObjects } from '../render/clouds.js';
import { buildAirport } from '../render/airport.js';
import { buildCity } from '../render/city.js';
import { buildNature } from '../render/nature.js';
import { buildAirliner, type AirlinerParts } from '../render/airliner.js';
import { buildCockpit, type CockpitParts } from '../render/cockpit.js';
import { warmCockpitTextures } from '../render/cockpitModel.js';
import { CameraRig, CAMERA_NAMES, type CameraMode } from '../render/cameras.js';
import { DemoFlight, type DemoState } from '../sim/demoFlight.js';
import { computeNavInfo, runwayEnds, type NavInfo } from '../sim/nav.js';
import { getTimePreset, getWeatherPreset, getWindPreset, windVector } from '../config/environment.js';
import { buildRain, type RainObjects } from '../render/rain.js';
import { AircraftPhysics, type PhysicsTelemetry } from '../sim/physics.js';
import { Autopilot, type ApInput, type ApStatus } from '../sim/autopilot.js';

const AP_R2D = 180 / Math.PI;
/** 物理テレメトリ → AP 入力（姿勢角速度は機体フレーム q=-ωx（上げ正）/ p=+ωz（右正）） */
function gameTelToApInput(t: PhysicsTelemetry): ApInput {
  return {
    ias: t.ias, pitch: t.pitch, alt: t.alt, agl: t.agl, heading: t.heading,
    bank: t.bank, q: -t.omega.x * AP_R2D, p: t.omega.z * AP_R2D,
    vs: t.vspeed, x: t.position.x, z: t.position.z,
    vx: t.velocity.x, vz: t.velocity.z, onGround: t.onGround
  };
}
import type { NormalizedControls } from '../sim/flight-controls.js';
import { terrainHeight } from '../render/terrain.js';
import { updateLodGroups } from '../render/lod.js';

export type GameState = 'menu' | 'flying' | 'paused';
export type FlightMode = 'free' | 'demo';

const UP_Y = new THREE.Vector3(0, 1, 0);
const QUAT_RX90 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
const BLOB_NOR = new THREE.Vector3();
const QUAT_TILT = new THREE.Quaternion();
const QUAT_LAYOUT = new THREE.Quaternion();

/** three.js サブツリーの GPU リソースを解放する（v17）。
 *  texture は textures.ts の共有キャッシュ側が所有するため dispose しない —
 *  機体切替/再スタートのたびに 2048×1024 級テクスチャがリークしていた対策の後半。*/
function disposeSubtree(root: THREE.Object3D): void {
  // 共有リソース（コックピット GLB テンプレート等）は破棄しない: 次の飛行で再利用する
  if (root.userData.sharedResources) return;
  const mesh = root as THREE.Mesh;
  if (mesh.geometry) mesh.geometry.dispose();
  const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
  if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
  else mat?.dispose();
  for (const c of root.children) disposeSubtree(c);
}

/** デモ軌道状態 → 汎用テレメトリ変換（getTelemetry のデモ側） */
function demoToTelemetry(s: DemoState): PhysicsTelemetry {
  return {
    position: s.position,
    quaternion: s.quaternion,
    velocity: s.velocity,
    omega: new THREE.Vector3(),
    tas: s.speed,
    ias: s.speed,
    alt: s.altitude,
    agl: s.altitude,
    heading: s.heading,
    pitch: s.pitch,
    bank: s.bank,
    vspeed: s.vspeed,
    aoa: 0,
    sideslip: 0,
    gLoad: 1,
    throttle: s.throttle,
    onGround: s.altitude < 4,
    crashed: false,
    distanceFlown: 0,
    fuelFrac: 0.8,
    groundSpeed: s.speed,
    windSpeed: 0,
    windDirDeg: 0
  };
}

export class Game {
  state: GameState = 'menu';
  readonly quality = new QualityManager();
  private lodTimer = 0;
  readonly rig: CameraRig;
  readonly demo = new DemoFlight();

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private sky!: SkyObjects;
  private water!: WaterObjects;
  private terrain!: TerrainObjects;
  /** 品質で縮尺する前のフォグ基準距離 [m]（高度連動の係数を掛ける前の値） */
  private fogBaseNear = WORLD.FOG_NEAR;
  private fogBaseFar = WORLD.FOG_FAR;
  private clouds!: CloudObjects;
  private rain!: RainObjects;
  private airport = getAirportSpec('hlm');
  /** 選択中の環境風（物理開始時に physics.wind へコピー） */
  private envWind = new THREE.Vector3();
  private envTurbulence = 0.15;

  // プレイヤー機体
  private player: AirlinerParts | null = null;
  private cockpit: CockpitParts | null = null;
  private playerSpec: AirlinerSpec = AIRCRAFT[0];

  // 飛行モード
  flightMode: FlightMode = 'free';
  private physics: AircraftPhysics | null = null;
  private physicsAccum = 0;
  /** オートパイロット（自由飛行のみ。描画・入力は干渉しない） */
  readonly ap = new Autopilot();
  private lastTel: PhysicsTelemetry | null = null;
  private lastTelVersion = -1;
  private apAccum = 0;
  private lastApCmd: import('../sim/autopilot.js').ApCommand | null = null;
  private lastDemoState: DemoState | null = null;

  // ポスト処理（bloom）: high/ultra のみ有効
  private composer: EffectComposer | null = null;
  private bloomPass: UnrealBloomPass | null = null;
  private cityGroup: THREE.Group | null = null;
  private airportGroups: THREE.Group[] = [];
  /** 地上高度リファレンス（機体真下の楕円ブラブ: 接地直後の高さ判断用） */
  private groundBlob: THREE.Mesh | null = null;

  // メニュー用 3D プレビュー
  private previewScene: THREE.Scene;
  private previewAircraft: AirlinerParts | null = null;
  private previewAngle = 0.6;

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.rig = new CameraRig(camera);

    // ===== ワールド構築 =====
    this.sky = buildSky(scene, renderer);
    scene.fog = new THREE.Fog(0xc4daee, WORLD.FOG_NEAR, WORLD.FOG_FAR);
    const p = this.quality.preset;
    this.terrain = buildTerrain(scene, p.terrainNearSeg, p.terrainMid);
    // v23: 河川は侵食ベイクの流域蓄積（light.a）で描画 — 手書き水面リボン buildRivers は廃止
    this.water = buildWater(scene);
    // 太陽影（地形・機体・建物に落ちる。範囲/解像度は品質プリセットで制限）
    this.renderer.shadowMap.enabled = p.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.applyShadowSettings();
    this.clouds = buildClouds(scene, this.quality.preset.cloudCount);
    this.rain = buildRain(scene);
    for (const ap of AIRPORTS) this.airportGroups.push(buildAirport(scene, ap, AIRCRAFT, this.quality.preset.runwayTexPx));
    this.cityGroup = buildCity(scene, this.quality.preset.cityCount);
    buildNature(scene, this.quality.preset.treeCount);

    // ===== bloom composer（最終アウトプットのみ経路。プレビューは素通し） =====
    if (this.quality.preset.bloom) this.enableBloom();

    // ===== 高度基準ブラブ（ソフト影楕円。時刻/影の有無に関係なく常に弱く出す） =====
    {
      const bc = document.createElement('canvas');
      bc.width = bc.height = 128;
      const bx = bc.getContext('2d')!;
      const bg = bx.createRadialGradient(64, 64, 6, 64, 64, 62);
      bg.addColorStop(0, 'rgba(0,0,0,0.85)');
      bg.addColorStop(0.6, 'rgba(0,0,0,0.38)');
      bg.addColorStop(1, 'rgba(0,0,0,0)');
      bx.fillStyle = bg;
      bx.fillRect(0, 0, 128, 128);
      const btex = new THREE.CanvasTexture(bc);
      const blob = new THREE.Mesh(
        new THREE.CircleGeometry(1, 20),
        new THREE.MeshBasicMaterial({ map: btex, transparent: true, opacity: 0, depthWrite: false, fog: true })
      );
      blob.rotation.x = -Math.PI / 2;
      blob.renderOrder = 2;
      blob.visible = false;
      scene.add(blob);
      this.groundBlob = blob;
    }

    // ===== メニュー用プレビューシーン =====
    this.previewScene = new THREE.Scene();
    this.previewScene.background = new THREE.Color(0x111820);
    this.previewScene.environment = scene.environment;
    const pLight = new THREE.HemisphereLight(0xbcd8f0, 0x334455, 1.0);
    this.previewScene.add(pLight);
    const pSun = new THREE.DirectionalLight(0xfff1dc, 2.0);
    pSun.position.set(60, 80, 40);
    this.previewScene.add(pSun);
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(260, 48),
      new THREE.MeshStandardMaterial({ color: 0x1b242e, metalness: 0.2, roughness: 0.8 })
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -32;
    this.previewScene.add(disc);

    this.buildPreview(AIRCRAFT[0]);
  }

  /** 画質変更（再描画パラメータの適用。配置数は再起動時に反映される） */
  setQuality(level: QualityLevel): void {
    this.quality.setLevel(level);
    const p = this.quality.preset;
    this.renderer.shadowMap.enabled = p.shadows;
    this.terrain.setMid(p.terrainMid);
    this.applyShadowSettings();
    if (p.bloom && !this.composer) this.enableBloom();
    this.syncPostFx();
  }

  private enableBloom(): void {
    const r = this.renderer;
    const size = new THREE.Vector2();
    r.getSize(size);
    const composer = new EffectComposer(r);
    composer.addPass(new RenderPass(this.scene, this.camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.42, 0.62, 0.8);
    composer.addPass(bloom);
    composer.addPass(new OutputPass()); // ACES + sRGB をここで適用（renderer 設定を継承）
    composer.setPixelRatio(r.getPixelRatio());
    this.composer = composer;
    this.bloomPass = bloom;
  }

  /** renderer のピクセル比/サイズ変更時に composer を同期（main の resize/applyPixelRatio から呼ぶ） */
  syncPostFx(): void {
    if (this.bloomPass) this.bloomPass.enabled = this.quality.preset.bloom;
    if (!this.composer) return;
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    const size = new THREE.Vector2();
    this.renderer.getSize(size);
    this.composer.setSize(size.x, size.y);
  }

  /** 現在の環境（時刻）を灯光・空・海面へ再適用（setQuality で runwayTex 等が変わらなくても安全） */
  private lastEnvIds: [string, string, string] | null = null;
  reapplyEnvironment(): void {
    if (this.lastEnvIds) this.applyEnvironment(...this.lastEnvIds);
  }

  private lastShadowKey = '';
  /** 太陽影カメラの範囲・解像度をプリセットから適用（map は破棄して作り直し）。
   *  v17: プリセットの影パラメータが前回と同一なら dispose・再生成をスキップ
   *  （自動品質の降格→復帰のたびに 1024²/2048² を積み直すコストの防止）。*/
  private applyShadowSettings(): void {
    const sun = this.sky.sun;
    const p = this.quality.preset;
    const key = p.shadows ? `on:${p.shadowMapSize}:${p.shadowRange}` : 'off';
    if (key === this.lastShadowKey) return;
    this.lastShadowKey = key;
    sun.castShadow = p.shadows;
    if (!p.shadows) return;
    if (sun.shadow.map) {
      sun.shadow.map.dispose();
      (sun.shadow as unknown as { map: null }).map = null;
    }
    sun.shadow.mapSize.set(p.shadowMapSize, p.shadowMapSize);
    const cam = sun.shadow.camera;
    const r = p.shadowRange;
    cam.left = -r; cam.right = r; cam.top = r; cam.bottom = -r;
    cam.near = 200; cam.far = 9000;
    cam.updateProjectionMatrix();
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 6;
    sun.target.position.set(0, 0, 0);
    this.scene.add(sun.target);
  }

  /**
   * 環境適用（Phase 5）: 時刻・天候・風をシーンと物理へ反映。
   * 単位: 風速 m/s、乱流 0..1。雨の強さ 0..1。
   */
  applyEnvironment(timeId: string, weatherId: string, windId: string): void {
    this.lastEnvIds = [timeId, weatherId, windId];
    const t = getTimePreset(timeId);
    const w = getWeatherPreset(weatherId);
    const wind = getWindPreset(windId);

    // 空・光
    this.sky.setSunElevation(t.sunElevation);
    this.sky.setPalette(
      t.skyTop, t.skyHorizon, t.sunColor,
      t.sunIntensity * w.sunScale,
      t.hemiIntensity * (0.55 + 0.45 * w.sunScale)
    );
    // 夜進行: 星・滑走路/市街の灯光・海面リフレクション・環境マップ再焼成
    this.sky.setStars(Math.max(0, (t.nightLights - 0.62) / 0.38)); // 夕刻(0.55)では出さない
    const setNight = (g: THREE.Group | null) => {
      const fn = g?.userData?.setNightLights as ((f: number) => void) | undefined;
      fn?.(t.nightLights * (0.55 + 0.45 * w.sunScale));
    };
    setNight(this.cityGroup);
    for (const g of this.airportGroups) setNight(g);
    this.water.setPalette(t.skyTop, t.skyHorizon, t.sunColor, t.sunElevation);
    this.sky.regenerateEnv(this.scene); // 機体 IBL もその時間帯の空に追従
    // v23: 地形大気・ベイク影の追従（昼=shDay / 夕=shDusk / 夜=浅く両方、天候で減衰）
    this.terrain?.setAtmos({
      sunDir: this.sky.sunDir,
      warm: new THREE.Color(t.sunColor),
      shadeMix: t.id === 'sunset' ? 1 : t.id === 'night' ? 0.55 : 0,
      shadeAmt: (t.id === 'night' ? 0.5 : 1) * (0.35 + 0.65 * w.sunScale)
    });

    // フォグ（天候で濃く）
    const fog = this.scene.fog as THREE.Fog;
    fog.color.setHex(t.fogColor);
    const k = Math.max(0.25, w.fogScale);
    fog.near = WORLD.FOG_NEAR / k;
    fog.far = WORLD.FOG_FAR / k;
    this.fogBaseNear = fog.near;
    this.fogBaseFar = fog.far;
    // 遠景の水面色を fog 色へ同期（地平線で空・地形・海の色が連続する）
    this.water.setHorizon(fog.color);

    // 雲・雨
    this.clouds.setDensity(Math.min(1, w.cloudScale));
    this.clouds.setDarken(w.cloudDarken);
    this.rain.setIntensity(w.rain);

    // 風・乱流（物理へは startFlight 時とこの時点の両方で適用）
    const v = windVector(wind.speed, wind.directionDeg);
    this.envWind.set(v.x, 0, v.z);
    this.envTurbulence = w.turbulence;
    if (this.physics) {
      this.physics.wind.copy(this.envWind);
      this.physics.turbulence = this.envTurbulence;
      // v17: テレメトリは simVersion ゲートでキャッシュ — 停止中に風を変えても
      // 次のステップが来るまで計器が古いままにならないよう無効化する
      this.lastTelVersion = -1;
    }
  }

  /** AP 入力（前フレームのテレメトリ。非接続や物理無しなら null） */
  private apInput(): ApInput | null {
    if (!this.ap.engaged || !this.lastTel || !this.physics) return null;
    return gameTelToApInput(this.lastTel);
  }
  /** AP マスタトグル（現在値キャプチャ）。返り値 = 接続状態 */
  toggleAp(): boolean {
    const t = this.lastTel ?? this.physics?.telemetry();
    if (t) {
      this.ap.toggle(gameTelToApInput(t));
    } else {
      this.ap.toggle({ ias: 62, alt: 0, agl: 0, heading: 0, bank: 0, pitch: 0, q: 0, p: 0, vs: 0, x: 0, z: 0, vx: 0, vz: 0, onGround: true });
    }
    return this.ap.engaged;
  }
  getApStatus(): ApStatus {
    return this.ap.status();
  }
  /** AP の状態変化トークンを取出（main が音声/バナーへ） */
  drainApEvents(): string[] {
    return this.ap.drainEvents();
  }

  /** 滑走路ナビ情報（Phase 4: 滑走路距離・HSI バグ用） */
  getNavInfo(): NavInfo | null {
    const t = this.getTelemetry();
    if (!t) return null;
    return computeNavInfo(this.airport, t.position.x, t.position.z, t.velocity.x, t.velocity.z);
  }

  /** 自機グループ（検証・デバッグ用アクセサ） */
  getPlayerGroup(): THREE.Group | null {
    return this.player ? this.player.group : null;
  }

  // ============================================================
  // メニュー 3D プレビュー
  // ============================================================
  private buildPreview(spec: AirlinerSpec): void {
    if (this.previewAircraft) {
      const g = this.previewAircraft.group;
      disposeSubtree(g); // v17: texture は共有キャッシュ（textures.ts）なので dispose 不要
      this.previewScene.remove(g);
    }
    // メニュープレビューは 1 機のみ・フルディテール（機体グラフィックの魅せ場）
    this.previewAircraft = buildAirliner(spec, { low: false });
    this.previewAircraft.setGearPosition(1);
    // プレビューはやや斜めに見せる
    const size = spec.fuselageLength;
    this.previewAircraft.group.position.set(0, -size * 0.06, 0);
    this.previewScene.add(this.previewAircraft.group);
    this.previewAngle = 0.7;
  }

  selectAircraft(spec: AirlinerSpec): void {
    this.buildPreview(spec);
  }

  renderPreview(dt: number): void {
    this.previewAngle += dt * 0.22;
    const spec = this.previewAircraft ? getAircraftSpec(this.playerSpec.id) : null;
    void spec;
    if (this.previewAircraft) {
      this.previewAircraft.group.rotation.y = this.previewAngle;
      this.previewAircraft.spinFans(dt);
    }
    const size = this.playerSpec.fuselageLength;
    const r = size * 1.55;
    this.camera.position.set(Math.cos(this.previewAngle * 0.35) * r, size * 0.32, Math.sin(this.previewAngle * 0.35) * r);
    this.camera.lookAt(0, size * 0.02, 0);
    this.renderer.render(this.previewScene, this.camera);
  }

  // ============================================================
  // 飛行
  // ============================================================
  /** 選択空港の滑走路開始姿勢（端 A 手前 220 m、滑走路軸の反対側を向く） */
  private runwayStartPose(): { pos: THREE.Vector3; headingRad: number } {
    const ap = this.airport;
    const [endA] = runwayEnds(ap);
    const ax = Math.sin(ap.heading);
    const az = Math.cos(ap.heading);
    return {
      pos: new THREE.Vector3(endA.x - ax * 220, 0, endA.z - az * 220),
      headingRad: ap.heading + Math.PI
    };
  }

  startFlight(aircraftId: string, mode: FlightMode, airportId?: string): void {
    if (airportId) this.airport = getAirportSpec(airportId);
    this.playerSpec = getAircraftSpec(aircraftId);
    this.flightMode = mode;

    // 既存プレイヤー機体を破棄（v17: 旧実装は scene.remove のみで geometry/material がリーク）
    if (this.player) {
      this.scene.remove(this.player.group);
      disposeSubtree(this.player.group);
    }
    this.player = buildAirliner(this.playerSpec, { ext: true }); // v24: 実モデルはプレイヤー機のみ
    this.cockpit = buildCockpit(this.playerSpec);
    this.player.group.add(this.cockpit.group);
    this.cockpit.group.visible = this.rig.mode === 'cockpit';
    this.player.group.userData.extCockpitView = this.rig.mode === 'cockpit' || this.cockpit.hasModel(); // v26
    this.scene.add(this.player.group);

    if (mode === 'free') {
      // 選択空港の滑走路端に機首を滑走路方向へ向けて配置
      this.physics = new AircraftPhysics(this.playerSpec, terrainHeight);
      const pose = this.runwayStartPose();
      this.physics.reset(pose.pos, pose.headingRad);
      this.physics.throttle = 0;
      this.physics.flapsDeg = 5;
      this.ap.reset();
      this.lastTel = this.physics.telemetry();
      this.lastTelVersion = this.physics.simVersion; // v17: 初帧からゲートを一致させる
      this.physics.wind.copy(this.envWind);
      this.physics.turbulence = this.envTurbulence;
      this.physicsAccum = 0;
      const t = this.telemetryNow();
      this.rig.snap({
        position: t.position,
        quaternion: t.quaternion,
        velocity: t.velocity,
        size: this.playerSpec.fuselageLength
      });
    } else {
      this.physics = null;
      this.demo.reset();
      const s = this.demo.update(1e-3);
      this.lastDemoState = s;
      this.applyDemoState(s);
      this.rig.snap({
        position: s.position,
        quaternion: s.quaternion,
        velocity: s.velocity,
        size: this.playerSpec.fuselageLength
      });
    }
    this.state = 'flying';
  }

  pause(): void {
    if (this.state === 'flying') this.state = 'paused';
  }
  resume(): void {
    if (this.state === 'paused') this.state = 'flying';
  }
  toMenu(): void {
    this.state = 'menu';
    this.buildPreview(getAircraftSpec(this.playerSpec.id));
  }
  restartDemo(): void {
    if (!this.player) return;
    // v16.1: 衝突で forceCrash が隠した機体を必ず復元（再スタートで「機体が見えない」対策）
    this.player.group.visible = true;
    if (this.flightMode === 'free' && this.physics) {
      const pose = this.runwayStartPose();
      this.physics.reset(pose.pos, pose.headingRad);
      this.physics.throttle = 0;
      this.ap.reset();
      this.lastTel = this.physics.telemetry();
      this.lastTelVersion = this.physics.simVersion;
    } else {
      this.demo.reset();
    }
    this.state = 'flying';
  }

  cycleCamera(dir: 1 | -1): CameraMode {
    const mode = dir === 1 ? this.rig.nextMode() : this.rig.prevMode();
    if (this.cockpit) this.cockpit.group.visible = mode === 'cockpit';
    if (this.player) this.player.group.userData.extCockpitView = mode === 'cockpit'; // v26
    return mode;
  }

  cameraName(): string {
    return CAMERA_NAMES[this.rig.mode];
  }

  getDemoState(): DemoState | null {
    return this.lastDemoState;
  }

  /** 物理テレメトリ（simVersion ゲート付き・physics 存在が自明な場所用） */
  private telemetryNow(): PhysicsTelemetry {
    const p = this.physics!;
    if (p.simVersion !== this.lastTelVersion || !this.lastTel) {
      this.lastTel = p.telemetry();
      this.lastTelVersion = p.simVersion;
    }
    return this.lastTel;
  }

  /** HUD 用テレメトリ（物理 or デモの両対応）。v17: physics.simVersion が
   *  進んだフレームでのみ telemetry() を再計算（1 フレームに 4 回呼ばれても 1 回）。*/
  getTelemetry(): PhysicsTelemetry | null {
    if (this.flightMode === 'free' && this.physics) {
      if (this.physics.simVersion !== this.lastTelVersion || !this.lastTel) {
        this.lastTel = this.physics.telemetry();
        this.lastTelVersion = this.physics.simVersion;
      }
      return this.lastTel;
    }
    const s = this.lastDemoState;
    return s ? demoToTelemetry(s) : null;
  }


  getFlightInfo(): { flapsDeg: number; gearDown: boolean; phase: string; crashed: boolean } {
    if (this.flightMode === 'free' && this.physics) {
      const t = this.telemetryNow();
      const phase = t.crashed ? 'CRASHED'
        : t.onGround
          ? (t.ias > 3 ? 'TAKEOFF ROLL' : (t.throttle > 0.02 ? 'GROUND' : 'PARKED'))
          : (t.agl < 300 && t.vspeed < 0 ? 'APPROACH' : 'FLIGHT');
      return {
        flapsDeg: this.physics.flapsDeg,
        gearDown: this.physics.gearDown,
        phase,
        crashed: t.crashed
      };
    }
    const s = this.lastDemoState;
    return {
      flapsDeg: s?.flaps ?? 0,
      gearDown: (s?.gear ?? 1) > 0.5,
      phase: s?.phase ?? '—',
      crashed: false
    };
  }

  /** 検証用: 描画を挟まずに物理だけ進める（テスト・リプレイ用） */
  simulate(seconds: number, ctrl: NormalizedControls): void {
    if (!this.physics) return;
    this.physics.throttle = ctrl.throttle;
    this.physics.flapsDeg = ctrl.flapsDeg;
    this.physics.spoilers = ctrl.spoilers;
    this.physics.gearDown = ctrl.gearDown;
    this.physics.brakes = ctrl.brakes;
    const h = 1 / 120;
    const steps = Math.round(seconds / h);
    for (let i = 0; i < steps; i++) {
      this.physics.step(h, {
        elevator: ctrl.pitch,
        aileron: ctrl.roll,
        rudder: ctrl.yaw,
        flapsDeg: ctrl.flapsDeg,
        spoilers: ctrl.spoilers,
        gearDown: ctrl.gearDown
      });
    }
    const t = this.physics.telemetry();
    this.player?.group.position.copy(t.position);
    this.player?.group.quaternion.copy(t.quaternion);
    this.rig.snap({
      position: t.position,
      quaternion: t.quaternion,
      velocity: t.velocity,
      size: this.playerSpec.fuselageLength
    });
  }

  /** 1 フレーム更新（飛行中） */
  updateFlight(dt: number, controls: NormalizedControls | null): void {
    if (!this.player) return;

    if (this.flightMode === 'free' && this.physics) {
      // 固定時間刻み 1/120 s で物理を積む（描画フレーム非依存）
      const base = controls ?? {
        pitch: 0, roll: 0, yaw: 0, throttle: this.physics.throttle,
        brakes: this.physics.brakes, flapsDeg: this.physics.flapsDeg,
        spoilers: this.physics.spoilers, gearDown: this.physics.gearDown
      };
      const ctrl = { ...base };
      // AP 接続中は操縦系を置換（rudder/ブレーキ/フラップ/ギアは手動のまま）
      const apIn = this.apInput();
      let cmd = this.lastApCmd;
      if (apIn) {
        // v17: AP 更新を固定 60 Hz 刻みに（従来は描画 dt 直渡しが 120Hz でゲイン
        // 2 倍・30Hz で半分、物理サブステップに対する取りこぼしも発生）。
        // サブステップ間の指令は直前値をホールド（1 フレームぶん古いだけ）。
        this.apAccum += dt;
        const H = 1 / 60;
        let guard = 0;
        while (this.apAccum >= H && guard < 8) {
          const c = this.ap.step(H, apIn, this.airport);
          if (c) cmd = c;
          this.apAccum -= H;
          guard++;
        }
        if (guard >= 8) this.apAccum = 0; // 長時間フレームでバックログ爆発させない
      } else {
        this.apAccum = 0;
        cmd = null;
      }
      this.lastApCmd = cmd;
      if (cmd) {
        ctrl.pitch = cmd.pitch;
        ctrl.roll = cmd.roll;
        ctrl.throttle = cmd.throttle;
      }
      this.physics.throttle = ctrl.throttle;
      this.physics.flapsDeg = ctrl.flapsDeg;
      this.physics.spoilers = ctrl.spoilers;
      this.physics.gearDown = ctrl.gearDown;
      this.physics.brakes = ctrl.brakes;

      this.physicsAccum = Math.min(this.physicsAccum + dt, 0.25);
      const h = 1 / 120;
      while (this.physicsAccum >= h) {
        this.physics.step(h, {
          elevator: ctrl.pitch,
          aileron: ctrl.roll,
          rudder: ctrl.yaw,
          flapsDeg: ctrl.flapsDeg,
          spoilers: ctrl.spoilers,
          gearDown: ctrl.gearDown
        });
        this.physicsAccum -= h;
      }
      const t = this.telemetryNow(); // v17: simVersion ゲートで同一フレームは 1 計算のみ
      if (t.crashed && this.ap.engaged) this.ap.reset();
      this.player.group.position.copy(t.position);
      this.player.group.quaternion.copy(t.quaternion);
      this.player.setGearPosition(this.physics.gearDown ? 1 : 0);
      this.player.setFlaps(this.physics.flapsDeg);
      this.player.setSpoilers(this.physics.spoilers);
      this.rig.update(dt, {
        position: t.position,
        quaternion: t.quaternion,
        velocity: t.velocity,
        size: this.playerSpec.fuselageLength,
        agl: Math.max(0, t.position.y - terrainHeight(t.position.x, t.position.z))
      });
    } else {
      const s = this.demo.update(dt);
      this.lastDemoState = s;
      this.applyDemoState(s);
      this.rig.update(dt, {
        position: s.position,
        quaternion: s.quaternion,
        velocity: s.velocity,
        size: this.playerSpec.fuselageLength,
        agl: Math.max(0, s.position.y - terrainHeight(s.position.x, s.position.z))
      });
    }
    if (this.cockpit) {
      // v26: 内蔵cockpitの可視性——毎フレーム同期（rig.setMode 直呼びでも壊れない）
      if (this.player) this.player.group.userData.extCockpitView = this.rig.mode === 'cockpit' || this.cockpit.hasModel(); // 専用cockpit存在時は内蔵版非描画（二重描画防止）
      // 室内の明るさ: 昼=1 / 夜≈0.12（空の半球光に追従）。GLB コックピットの環境光の底上げに使う
      this.cockpit.update(Math.min(1, Math.max(0.12, this.sky.hemi.intensity / 0.75)));
      warmCockpitTextures(this.renderer); // GPU アップロードを 1 フレーム 1 枚に分散（初回切替のカクつき防止）
    }
  }

  /** 描画共通（世界アニメーション） */
  updateWorld(timeSec: number, dt = 1 / 60): void {
    this.sky.sky.position.copy(this.camera.position);
    // v16: city/nature のチャンク LOD 切替（0.25s スロットル・距離判定のみで安価）
    this.lodTimer -= dt; // v17: 実 dt（従来は固定 1/60 で 120Hz 環境で LOD 間隔が倍速に）
    if (this.lodTimer <= 0) {
      this.lodTimer = 0.25;
      updateLodGroups(this.camera.position);
    }
    this.water.update(timeSec);
    this.updateTerrainAndFog();
    this.clouds.update(dt); // v17: 実 dt
    this.rain.update(dt, this.camera.position);
    this.player?.spinFans(dt); // v17: 実 dt
    this.player?.updateLights(timeSec);
    if (this.demo.finished && this.state === 'flying') {
      this.demo.reset();
    }
  }

  /**
   * 地形クリップマップの追随＋影カメラのプレイヤー追従＋高度連動フォグ。
   * 単位: すべて m。パッチは地形グリッドにスナップして移動するため、
   * 移動量が閾値を超えたフレームだけで行列が更新される（毎フレームの再計算なし）。
   */
  private updateTerrainAndFog(): void {
    const pos = this.camera.position;
    this.terrain.update(pos.x, pos.z);

    const fog = this.scene.fog as THREE.Fog;
    if (fog) {
      // 対地高度が高いほど遠くを見通せる（遠近の階層を保つための緩い係数）
      const alt = Math.max(0, pos.y - terrainHeight(pos.x, pos.z));
      // 機体影（高度基準 + 太陽方位）: 低いほど濃く小さく、低い太陽ほど逆光方向へ引き伸ばす。
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
          const gy = Math.max(terrainHeight(bx, bz), WORLD.SEA_LEVEL) + 0.7;
          gb.position.set(bx, gy, bz);
          const k = 1 - altP / 400;
          const r = this.playerSpec.wingspan * 0.42 + altP * 0.10;
          gb.scale.set(r * (1 + len / (r * 2.4)), r * 0.86, 1);
          const ang = Math.atan2(-uz, ux);
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
          (gb.material as THREE.MeshBasicMaterial).opacity = (0.12 + 0.34 * k * k) * soft * day;
          gb.visible = true;
        } else gb.visible = false;
      }
      const a = Math.min(alt / 4000, 2.2); // 0..2.2
      fog.near = this.fogBaseNear * (1 + 0.7 * a);
      fog.far = this.fogBaseFar * (1 + 0.55 * a);
    }

    const sun = this.sky.sun;
    if (sun.castShadow) {
      const target = this.player?.group.position ?? pos;
      sun.position.copy(target).addScaledVector(this.sky.sunDir, 5200);
      sun.target.position.copy(target);
      sun.target.updateMatrixWorld();
    }
  }

  /** 衝突爆発フック：強制クラッシュ + 残骸非表示（炎上は爆発エフェクト側） */
  forceCrash(): void {
    if (!this.physics || this.physics.crashed) return;
    this.physics.crashed = true;
    if (this.player) this.player.group.visible = false;
    if (this.ap.engaged) this.ap.reset();
  }

  render(): void {
    if (this.composer && this.quality.preset.bloom) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  private applyDemoState(s: DemoState): void {
    if (!this.player) return;
    const g = this.player.group;
    g.position.copy(s.position);
    g.quaternion.copy(s.quaternion);
    this.player.setGearPosition(s.gear);
    this.player.setFlaps(s.flaps);
    this.player.setSpoilers(s.spoilers);
  }

  /** 観察カメラのドラッグ（v22: 三人称 chase でも有効 — 画面スライドで視点角変更） */
  orbitDrag(dx: number, dy: number): void {
    if (this.rig.mode === 'orbit') this.rig.addOrbitDelta(dx, dy);
    else if (this.rig.mode === 'chase') this.rig.addChaseDelta(dx, dy);
  }

  disposePlayer(): void {
    if (this.player) {
      this.scene.remove(this.player.group);
      disposeSubtree(this.player.group); // v17: cockpit 群もこのサブツリーに含まれる
      this.player = null;
    }
    this.cockpit = null;
  }
}
