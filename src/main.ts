/**
 * main.ts — 起動・ライフサイクル・rAF ループ・入力配線
 *
 * 【レイヤ構成】
 *   main: ブラウザ接続（DOM, rAF, ライフサイクル, タッチ/キー入力）
 *   game: 状態機械・シーン配線
 *   render: three.js 描画 / sim: 物理・操縦 / ui: 表示
 */
import * as THREE from 'three';
import { createRenderer, resizeRenderer, applyPixelRatio } from './render/renderer.js';
import { Game } from './game/game.js';
import { loadTerrainBake } from './render/terrain.js';
import { primeWorld } from './world/prime.js';
import { terrainHeight } from './render/terrain.js';
import { Menu } from './ui/menu.js';
import { InstrumentPanel } from './ui/instruments.js';
import type { InstrumentData } from './ui/instruments.js';
import { SOPCallouts, SopBanner, speak, type CalloutEvent } from './ui/callouts.js';
import { loadFracFromMass, overspeedLimitMs } from './config/manual.js';
import { AIRCRAFT } from './config/aircraft.js';
import { AudioEngine } from './sim/audio.js';
import { ExplosionFX } from './render/explosion.js';
import { buildingColliders } from './render/city.js';
import { Overlays } from './ui/overlays.js';
import { FlightControls } from './sim/flight-controls.js';
import type { QualityLevel } from './config/constants.js';

// ============================================================
// 0. DOM
// ============================================================
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const overlays = new Overlays();

// ============================================================
// 1. WebGL 検出
// ============================================================
const rendererOrNull = createRenderer(canvas, 2.0);
if (!rendererOrNull) {
  overlays.showWebglError(
    'WebGL コンテキストを取得できませんでした。<br>' +
    'Safari の設定を確認するか、iOS を最新版に更新してください。'
  );
  throw new Error('WebGL not available');
}
const renderer = rendererOrNull;

canvas.addEventListener('webglcontextlost', (e) => {
  e.preventDefault(); // v17: preventDefault で復旧試行を許可（three.js が内部で再初期化）
  overlays.showWebglError(
    'WebGL コンテキストが失われました。ページを再読み込みしてください。'
  );
});
// v17: コンテキスト復旧時 — three.js がシェーダ/テクスチャを再アップロードするため、
// シャドウマップの再生成だけ促してオーバーレイを閉じる（従来は復旧しても画面が
// 黒いまま・エラー表示が残った）。
canvas.addEventListener('webglcontextrestored', () => {
  renderer.shadowMap.needsUpdate = true;
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  overlays.hideWebglError();
});

// ============================================================
// 2. シーン・ゲーム・操縦
// ============================================================
const scene = new THREE.Scene();
// near/far は CameraRig.updateDepthRange() が視点ごとに最適化する（深度精度＝チカチカ防止）
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 2.5, 46000);
// v15-B: 侵食ベイクを世界構築の前に読む — 配置/物理が使う CPU terrainHeight と
// GPU 頂点変位が同一テーブルを参照するにはこれが順序条件。不在/失敗は resolve のまま
// （loadTerrainBake 内部で catch）→ 従来手続き生成のみでゲームは成立する。
await loadTerrainBake();
// v16: 配置（city/nature レイアウト）と手続きテクスチャを Web Worker で先行生成。
// 失敗・未対応環境は prime 内で同期フォールバック（同一コードなので出力は同一）。
await primeWorld();
const game = new Game(renderer, scene, camera);
const explosion = new ExplosionFX(scene);
explosion.camera = camera;
const controls = new FlightControls();
controls.attachKeyboard();

// ============================================================
// 3. UI
// ============================================================
const initialSpec = AIRCRAFT.find((a) => a.id === 'b737') ?? AIRCRAFT[0];
const instShared: InstrumentData = {
  ias: 0, alt: 0, agl: 0, vspeed: 0,
  heading: 0, pitch: 0, bank: 0,
  aoa: 0, gLoad: 1,
  throttle: 0, fuelFrac: 1,
  groundSpeed: 0,
  windSpeed: 0, windDirDeg: 0,
  flapsDeg: 0, gearDown: true, spoilers: 0,
  phase: 'PARKED', crashed: false,
  rwyName: null, rwyDist: null, rwyRemaining: null, rwyHeading: null,
  fps: 60, onGround: true
};
const instruments = new InstrumentPanel(document.getElementById('inst-panel') as HTMLCanvasElement, {
  loadFrac: loadFracFromMass(initialSpec.mass),
  massKg: initialSpec.mass
});
const callouts = new SOPCallouts(loadFracFromMass(initialSpec.mass));
const sopBanner = new SopBanner();
const audio = new AudioEngine();

// デバッグ/検証用フック
(window as unknown as Record<string, unknown>).__airliner = { game, scene, camera, controls, audio, callouts, renderer, terrainHeight, explosion, buildingColliders };

const hudRoot = document.getElementById('hud') as HTMLElement;
hudRoot.style.display = 'none';

// Phase 6: 自動画質調整（FPS 監視 → 画質ステップ変更。最大はメニュー選択値）
let autoQualityMax: QualityLevel = 'high';
let autoLowTimer = 0;
let autoHighTimer = 0;
// v17: 自動降格後の昇格抑止（秒）。降格直後のフレームタイム改善を「余裕」と
// 誤読して即昇格 → 負荷で再降格…の ping-pong（たびに影 map 再生成・
// マテリアル更新）を防止するため 60 秒は据え置く。
let autoPromoteDelay = 0;

const touchUI = document.getElementById('touch-ui') as HTMLElement;

// 操作ヒント: 飛行開始時に表示し、9 秒後に自動フェード（スティック操作の邪魔をしない）
const flightNote = document.getElementById('flight-note') as HTMLElement | null;
let noteTimer: number | null = null;
function showFlightNote(): void {
  if (!flightNote) return;
  flightNote.classList.remove('fade');
  if (noteTimer !== null) clearTimeout(noteTimer);
  noteTimer = window.setTimeout(() => flightNote.classList.add('fade'), 9000);
}

const menu = new Menu(() => {
  audio.ensure(); // ユーザー操作起点（iOS Safari の自動再生制限対策）
  audio.confirm();
  game.setQuality(menu.config.quality);
  autoQualityMax = menu.config.quality;
  applyPixelRatio(renderer, game.quality.preset.pixelRatio);
  game.syncPostFx();
  game.applyEnvironment(menu.config.time, menu.config.weather, menu.config.wind);
  menu.hide();
  hudRoot.style.display = 'block';
  touchUI.style.display = 'block';
  instruments.resize();
  callouts.reset();
  if (fsStored() && !isFs()) fsRequest(); // メニューで「全画面」選中 → 開始ジェスチャ内で適用
  game.startFlight(menu.config.aircraftId, menu.config.mode, menu.config.airportId);
  setCameraName(game.cameraName());
  showFlightNote();
});
menu.onAircraftChange = (spec) => {
  game.selectAircraft(spec);
  instruments.setAircraft(loadFracFromMass(spec.mass), spec.mass);
  callouts.setLoadFrac(loadFracFromMass(spec.mass));
};

function requestPause(): void {
  if (game.state === 'flying') {
    game.pause();
    audio.suspendAll();
    overlays.showPause();
  } else if (game.state === 'paused') {
    game.resume();
    overlays.hidePause();
  }
}

function bindButton(id: string, fn: () => void): void {
  const el = document.getElementById(id) as HTMLElement;
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    el.classList.add('active');
    audio.ensure();
    audio.click();
    fn();
  });
  el.addEventListener('pointerup', () => el.classList.remove('active'));
  el.addEventListener('pointercancel', () => el.classList.remove('active'));
}

/** ホールド系ボタン（押している間 true） */
function bindHoldButton(id: string, onDown: () => void, onUp: () => void): void {
  const el = document.getElementById(id) as HTMLElement;
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    el.classList.add('active');
    onDown();
  });
  const up = () => {
    el.classList.remove('active');
    onUp();
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
}

const camName = document.getElementById('cam-name') as HTMLElement;
function setCameraName(name: string): void {
  camName.textContent = name;
}

bindButton('btn-camera', () => setCameraName(game.cycleCamera(1)));
bindButton('btn-view-prev', () => setCameraName(game.cycleCamera(-1)));
bindButton('btn-replay', () => {
  game.restartDemo();
  callouts.reset();
  overlays.hidePause();
});
bindButton('btn-pause', requestPause);

// ============================================================
// 4.5 オートパイロット UI — [AP]=マスタトグル / [AP⚙]=セレクタパネル
//   接続時に現在値キャプチャ（SPD/HDG/ALT）。横=HDG|NAV(LOC) 鉛直=ALT|V/S|APPR(GS)
// ============================================================
const apBtn = document.getElementById('btn-ap') as HTMLElement;
const apSetBtn = document.getElementById('btn-ap-set') as HTMLElement;
const apPanel = document.getElementById('ap-panel') as HTMLElement;
const apStrip = document.getElementById('ap-strip') as HTMLElement;
let apLastSig = '';
// v18: AP 系 DOM は「値が変わった帧だけ」書き込む（従来は毎帧 innerHTML 再パース
// と textContent 代入で、タップ中のボタン見た目を不安定にしていた）
let apUiEngaged = false;
let apUiStripDisp = '';
let apStripLastTxt = '';
let apUiChips = '';

const AP_MSG: Record<string, CalloutEvent | undefined> = {
  'ap-on': { text: 'オートパイロット 接続', speech: 'autopilot engaged', kind: 'info' },
  'ap-off': { text: 'オートパイロット 切断', speech: 'autopilot disconnect', kind: 'info' },
  'ap-touchdown': { text: '接地 — AP 自動切断', speech: null, kind: 'info' },
  'loc-alive': { text: 'LOC 捕捉 — 滑走路延長線', speech: 'localizer alive', kind: 'info' },
  'loc-lost': { text: 'LOC ロスト — 選定方位へ復帰', speech: 'localizer lost', kind: 'warn' },
  'gs-alive': { text: 'GS 捕捉 — 3.00° 降下経路', speech: 'glide slope alive', kind: 'info' },
  'gs-off': { text: 'GS 脱離 — ALT ホールド復帰', speech: null, kind: 'info' },
  'appr-arm': { text: 'APPR アライン — 捕捉待ち', speech: 'approach armed', kind: 'info' },
  'missed': { text: '場周超過 — LOC/GS 解除', speech: 'missed approach, heading mode', kind: 'warn' },
  'min-alt': { text: '最低高度割込 — 目標高度引き上げ', speech: 'minimums, altitude hold', kind: 'warn' },
  'retard': { text: 'RETARD — スラストアイドル', speech: 'retard', kind: 'info' },
  'ap-trip': { text: 'AP 保護遮断', speech: 'autopilot disconnect', kind: 'warn' }
};

const apStripTxt = document.getElementById('ap-strip-txt') as HTMLElement;
const apChHdg = document.getElementById('ap-ch-hdg') as HTMLElement;
const apChNav = document.getElementById('ap-ch-nav') as HTMLElement;
const apChVs = document.getElementById('ap-ch-vs') as HTMLElement;
const apChAlt = document.getElementById('ap-ch-alt') as HTMLElement;
let boomedCrash = false;
let wasAirborne = false;
let shakeAmp = 0;
/** 衝突爆発：crash エッジで炎上 + 画面シェイク + 爆音（1 クラッシュ 1 回） */
function triggerBoom(power: number): void {
  const t = game.getTelemetry();
  if (!t) return;
  explosion.boom(t.position.x, Math.max(t.alt - Math.max(t.agl, 0) + 2, t.alt), t.position.z, power);
  audio.boom();
  shakeAmp = Math.min(1.4, 0.7 + power * 0.55);
}

function bindChip(el: HTMLElement, fn: () => void): void {
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    el.classList.add('on');
    setTimeout(() => el.classList.remove('on'), 160);
    audio.ensure();
    audio.click();
    fn();
    renderApPanel();
  });
}
/** モードチップ: AP 未接続なら接続してからモードをたたく（FCU 相当） */
function apChip(mode: 'hdg' | 'nav' | 'vs' | 'alt'): void {
  const ap = game.ap;
  if (game.flightMode === 'free' && !ap.engaged) game.toggleAp();
  if (mode === 'hdg') ap.setLat('HDG');
  if (mode === 'nav') ap.setLat('NAV');
  if (mode === 'vs') ap.nudgeVs(0);
  if (mode === 'alt') ap.holdAlt();
}
bindChip(apChHdg, () => apChip('hdg'));
bindChip(apChNav, () => apChip('nav'));
bindChip(apChVs, () => apChip('vs'));
bindChip(apChAlt, () => apChip('alt'));
void apPanel;

function apPanelSet(id: string, txt: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = txt;
}
function renderApPanel(): void {
  const st = game.getApStatus();
  apPanelSet('ap-v-spd', `${st.spdKt} kt`);
  apPanelSet('ap-v-hdg', `${String(st.hdgDeg).padStart(3, '0')}°`);
  apPanelSet('ap-v-alt', `${st.altM} m`);
  apPanelSet('ap-v-vs', `${st.vsFpm} fpm`);
  const lat = document.getElementById('ap-lat');
  if (lat) {
    lat.textContent = st.loc ? `${st.lat}·LOC` : st.lat;
    lat.classList.toggle('on', st.lat === 'NAV');
  }
  const altB = document.getElementById('ap-vrt-alt');
  if (altB) altB.classList.toggle('on', st.ver !== 'APPR');
  const apprB = document.getElementById('ap-vrt-appr');
  if (apprB) {
    apprB.textContent = st.gs ? 'APPR·GS' : st.ver === 'APPR' ? 'APPR' : `APPR${st.loc && st.dist > 0 ? ` ${Math.round(st.dist / 1000)}k` : ''}`;
    apprB.classList.toggle('on', st.ver === 'APPR');
  }
  apSetBtn.classList.toggle('on', game.ap.engaged);
  void apBtn;
}
bindButton('btn-ap', () => {
  if (game.flightMode !== 'free') {
    sopBanner.show({ text: 'AP は自由飛行モードでのみ使用可能', speech: null, kind: 'warn' });
    return;
  }
  game.toggleAp();
  renderApPanel();
});
bindButton('btn-ap-set', () => {
  apPanel.style.display = apPanel.style.display === 'block' ? 'none' : 'block';
  apLastSig = '';
  renderApPanel();
});
bindButton('ap-spd-dn', () => { game.ap.nudgeSpd(-5); renderApPanel(); });
bindButton('ap-spd-up', () => { game.ap.nudgeSpd(5); renderApPanel(); });
bindButton('ap-hdg-l', () => { game.ap.nudgeHdg(-5); renderApPanel(); });
bindButton('ap-hdg-r', () => { game.ap.nudgeHdg(5); renderApPanel(); });
bindButton('ap-alt-dn', () => { game.ap.nudgeAlt(-100); renderApPanel(); });
bindButton('ap-alt-up', () => { game.ap.nudgeAlt(100); renderApPanel(); });
bindButton('ap-vs-dn', () => { game.ap.nudgeVs(-500); renderApPanel(); });
bindButton('ap-vs-up', () => { game.ap.nudgeVs(500); renderApPanel(); });
bindButton('ap-lat', () => { game.ap.setLat(game.ap.latMode === 'HDG' ? 'NAV' : 'HDG'); renderApPanel(); });
bindButton('ap-vrt-alt', () => { game.ap.holdAlt(); renderApPanel(); });
bindButton('ap-vrt-appr', () => { game.ap.alignApproach(); renderApPanel(); });
bindButton('ap-align', () => { game.ap.alignApproach(); renderApPanel(); });
bindButton('ap-off', () => { if (game.ap.engaged) game.toggleAp(); renderApPanel(); });
// 離陸前も使われるボタン: 機体状態に依らず常にタップ可能（接続は現在値キャプチャ）
void apPanel;

// --- ヨー（押下中） ---
bindHoldButton('btn-yaw-l', () => { controls.yaw = -1; }, () => { controls.yaw = 0; });
bindHoldButton('btn-yaw-r', () => { controls.yaw = 1; }, () => { controls.yaw = 0; });
// --- ブレーキ（押下中） ---
bindHoldButton('btn-brake', () => { controls.brakes = true; }, () => { controls.brakes = false; });
// --- ギア ---
bindButton('btn-gear', () => {
  audio.ensure();
  controls.gearDown = !controls.gearDown;
  const el = document.getElementById('btn-gear') as HTMLElement;
  el.innerHTML = controls.gearDown ? 'ギア<br>DOWN' : 'ギア<br>UP';
  el.classList.toggle('on', !controls.gearDown);
  audio.gear();
});
// --- フラップ ---
bindButton('btn-flap-up', () => { audio.ensure(); controls.flapUp(); audio.flap(); });
bindButton('btn-flap-dn', () => { audio.ensure(); controls.flapDown(); audio.flap(); });
// --- スポイラー ---
bindButton('btn-spoiler', () => {
  audio.ensure();
  controls.spoilers = controls.spoilers > 0 ? 0 : 1;
  const el = document.getElementById('btn-spoiler') as HTMLElement;
  el.classList.toggle('on', controls.spoilers > 0);
  audio.click();
});
// --- 音 ON/OFF（Phase 4/5） ---
bindButton('btn-sound', () => {
  audio.ensure();
  audio.setMuted(!audio.muted);
  const el = document.getElementById('btn-sound') as HTMLElement;
  el.innerHTML = audio.muted ? '音<br>OFF' : '音<br>ON';
  el.classList.toggle('on', audio.muted);
});
// --- 計器盤 ON/OFF（Phase 4） ---
bindButton('btn-inst', () => {
  const hidden = hudRoot.style.display === 'none';
  hudRoot.style.display = hidden ? 'block' : 'none';
  if (hidden) instruments.resize();
  const el = document.getElementById('btn-inst') as HTMLElement;
  el.innerHTML = hidden ? '計器<br>ON' : '計器<br>OFF';
  el.classList.toggle('on', !hidden);
});
// --- 全画面（Fullscreen API。2026-11-06 / ホーム画面・飛行HUD 共通）---
// iPhone Safari は要素 fullscreen 非対応 →「ホーム画面に追加」(standalone) へ誘導。
// Android Chrome / デスクトップは requestFullscreen、旧 Safari は webkit 経由。
// 選択は localStorage に永続化し、メニューの「表示: 全画面」は飛行開始ジェスチャ内でも適用。
type FsElement = HTMLElement & { webkitRequestFullscreen?: () => void };
type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
};
const fsDoc = document as FsDocument;
const fsEl = (document.getElementById('app') ?? document.documentElement) as FsElement;
const FS_KEY = 'airliner.fs';
const isFs = (): boolean => document.fullscreenElement != null || fsDoc.webkitFullscreenElement != null;
function fsStored(): boolean { try { return localStorage.getItem(FS_KEY) === '1'; } catch { return false; } }
function fsRemember(on: boolean): void { try { localStorage.setItem(FS_KEY, on ? '1' : '0'); } catch { /* シークレットモード等は永続化しない */ } }
function fsSyncLabel(): void {
  const el = document.getElementById('btn-fs') as HTMLElement;
  el.innerHTML = isFs() ? '解除' : '全画面';
  el.classList.toggle('on', isFs());
  menu.setDisplay(isFs()); // ホーム画面のチップを実状態へ逆同期
  fsRemember(isFs());
  onResize(); // 全画面前後で safe-area/viewport が変わるため明示再同期
}
function fsRequest(): void {
  // ラベル/チップは fullscreenchange でも同期するが、イベントが遅延/非発火の環境があるため
  // プロミス解決時に明示同期も行う（冪等なので二重発火は無害）
  try {
    if (fsEl.requestFullscreen) {
      void fsEl.requestFullscreen()
        .then(() => fsSyncLabel())
        .catch(() => { fsUnsupported(); menu.setDisplay(false); fsRemember(false); });
    } else if (fsEl.webkitRequestFullscreen) { fsEl.webkitRequestFullscreen(); setTimeout(fsSyncLabel, 0); }
    else { fsUnsupported(); menu.setDisplay(false); fsRemember(false); }
  } catch {
    fsUnsupported(); menu.setDisplay(false); fsRemember(false);
  }
}
function fsExit(): void {
  if (document.exitFullscreen) void document.exitFullscreen().then(() => fsSyncLabel()).catch(() => undefined);
  else if (fsDoc.webkitExitFullscreen) { fsDoc.webkitExitFullscreen(); setTimeout(fsSyncLabel, 0); }
}
bindButton('btn-fs', () => {
  if (isFs()) { fsRemember(false); fsExit(); }
  else { fsRemember(true); fsRequest(); }
});
function fsUnsupported(): void {
  sopBanner.show({
    text: 'このブラウザは全画面 API 非対応です。iPhone は共有→「ホーム画面に追加」で全画面起動',
    speech: null,
    kind: 'warn'
  });
}
document.addEventListener('fullscreenchange', fsSyncLabel);
document.addEventListener('webkitfullscreenchange' as 'fullscreenchange', fsSyncLabel);
menu.setDisplay(isFs() || fsStored()); // 起動時チップ＝実状態 or 記憶設定（fs 自体はタップ/開始ジェスチャで適用）
// ホーム画面［表示］チップ：タップ（=実ジェスチャ）で即時適用・記憶
menu.onDisplaySelect = (want) => {
  if (want) {
    if (!isFs()) { fsRemember(true); fsRequest(); }
  } else {
    fsRemember(false);
    if (isFs()) fsExit();
  }
};

overlays.on('resume', () => {
  game.resume();
  overlays.hidePause();
});
overlays.on('restart', () => {
  game.restartDemo();
  callouts.reset();
  overlays.hidePause();
});
overlays.on('toMenu', () => {
  game.toMenu();
  overlays.hidePause();
  audio.suspendAll();
  hudRoot.style.display = 'none';
  touchUI.style.display = 'none';
  menu.show();
});

// ============================================================
// 4. 仮想スティック（固定ベース・左ゾーン: ピッチ/ロール）
//   v3: ベースは画面に固定表示（タッチ位置へジャンプしない）。入力はタッチ点からの
//   相対ドラッグ（触った瞬間＝中立＝初期ジャンプ/バイアスなし）。感度低減の 3 段構え:
//   デッドゾーン 8px / べき乗カーブ 1.45（中立付近が鈍い）/ スルトレート 2.2/s。
//   ボーイング ヨーク規約 (v3.2): 下=手前引き=機首上げ(+pitch) / 上=押し出し=機首下げ。
//   ロールは従来通り 右=右ロール(+roll)。キーボードは ↑=機首上げ のまま（ABS キーは機首上げが自然）。
// ============================================================
const stickZone = document.getElementById('stick-zone') as HTMLElement;
const stickVisual = document.getElementById('stick-visual') as HTMLElement;
const stickKnob = document.getElementById('stick-knob') as HTMLElement;
const STICK_DEAD = 8;     // px: 中立デッドゾーン
const STICK_CURVE = 1.45; // >1 で中心感度低下（エッジは満舵維持）
const STICK_RATE = 2.2;   // /s: 出力変化率上限
const STICK_MAX = 0.9;    // 満舵時の出力上限（操舵余裕）

let stickPointer: number | null = null;
let stickRange = 44;
let stickOriginX = 0;
let stickOriginY = 0;
let stickTargetP = 0;
let stickTargetR = 0;
let stickEngaged = false; // true = タッチ中 or 中立復帰ランプ中

function stickMeasure(): void {
  const r = stickVisual.getBoundingClientRect();
  stickRange = Math.max(26, r.width / 2 - 24);
}
/**
 * 入力は「タッチ点からの相対ドラッグ」（固定ベース・相対入力 = ハイブリッド方式）。
 * 絶対マッピングだと親指の初期接触位置がベース中心から左に寄っているだけで
 * 常時左バンク入力が掛かり、「右へ倒すと左へ傾く（逆）」に感じていた（実機報告）。
 * 相対方式では触った瞬間＝中立なので初期ジャンプもバイアスも発生しない。
 */
function stickSetFromPointer(clientX: number, clientY: number): void {
  const dx0 = clientX - stickOriginX;
  const dy0 = clientY - stickOriginY;
  const len = Math.hypot(dx0, dy0);
  const k = len > stickRange ? stickRange / len : 1;
  const dx = dx0 * k;
  const dy = dy0 * k;
  const cl = len * k;
  const t = clamp01((cl - STICK_DEAD) / Math.max(1, stickRange - STICK_DEAD));
  const gain = cl > 0.001 ? (Math.pow(t, STICK_CURVE) * STICK_MAX) / cl : 0;
  stickTargetR = dx * gain;
  // ヨーク規約: 下ドラッグ(dy>0)=手前引き=機首上げ(+) / 上ドラッグ=押し出し=機首下げ(-)
  stickTargetP = dy * gain;
  stickKnob.style.left = `calc(50% + ${dx}px)`;
  stickKnob.style.top = `calc(50% + ${dy}px)`;
  // ヨークを倒した向きにノブを回転（視覚フィードバック。右ロール=時計回り）
  stickKnob.style.transform = `rotate(${((stickTargetR / STICK_MAX) * 20).toFixed(1)}deg)`;
}
function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

stickZone.addEventListener('pointerdown', (e) => {
  if (game.state !== 'flying') return;
  if (stickPointer !== null) return;
  e.preventDefault();
  stickPointer = e.pointerId;
  stickEngaged = true;
  stickMeasure();
  stickOriginX = e.clientX;
  stickOriginY = e.clientY;
  stickSetFromPointer(e.clientX, e.clientY);
  try {
    stickZone.setPointerCapture(e.pointerId);
  } catch {
    /* 合成 PointerEvent 等で capture 不可の場合も操作は継続 */
  }
});
stickZone.addEventListener('pointermove', (e) => {
  if (e.pointerId !== stickPointer) return;
  stickSetFromPointer(e.clientX, e.clientY);
});
const releaseStick = (e: PointerEvent) => {
  if (e.pointerId !== stickPointer) return;
  stickPointer = null;
  stickTargetP = 0;
  stickTargetR = 0;
  stickKnob.style.left = '50%';
  stickKnob.style.top = '50%';
  stickKnob.style.transform = 'rotate(0deg)';
};
stickZone.addEventListener('pointerup', releaseStick);
stickZone.addEventListener('pointercancel', releaseStick);
window.addEventListener('resize', () => {
  if (stickPointer !== null) {
    stickMeasure();
  }
});

/** メインループ: controls.pitch/roll をターゲットへスルトレート追従させる */
function updateStick(dt: number): void {
  if (!stickEngaged || dt <= 0) return;
  const step = STICK_RATE * dt;
  const tp = stickTargetP;
  const tr = stickTargetR;
  const dp = tp - controls.pitch;
  const dr = tr - controls.roll;
  controls.pitch = Math.abs(dp) <= step ? tp : controls.pitch + Math.sign(dp) * step;
  controls.roll = Math.abs(dr) <= step ? tr : controls.roll + Math.sign(dr) * step;
  if (stickPointer === null && controls.pitch === 0 && controls.roll === 0) {
    stickEngaged = false;
    controls.releaseStick();
  }
}

// ============================================================
// 5. スロットル（右レバー）
// ============================================================
const throttleRail = document.getElementById('throttle-rail') as HTMLElement;
const throttleKnob = document.getElementById('throttle-knob') as HTMLElement;

function setThrottleFromPointer(clientY: number): void {
  const rect = throttleRail.getBoundingClientRect();
  const ratio = 1 - Math.max(0, Math.min(1, (clientY - rect.top - 15) / (rect.height - 30)));
  controls.throttle = ratio;
  throttleKnob.style.top = `${(1 - ratio) * (rect.height - 30) + 0}px`;
  throttleKnob.textContent = `${Math.round(ratio * 100)}%`;
}

let throttlePointer: number | null = null;
throttleRail.addEventListener('pointerdown', (e) => {
  if (game.state !== 'flying') return;
  e.preventDefault();
  throttlePointer = e.pointerId;
  throttleRail.setPointerCapture(e.pointerId);
  setThrottleFromPointer(e.clientY);
});
throttleRail.addEventListener('pointermove', (e) => {
  if (e.pointerId !== throttlePointer) return;
  setThrottleFromPointer(e.clientY);
});
const releaseThrottle = (e: PointerEvent) => {
  if (e.pointerId === throttlePointer) throttlePointer = null;
};
throttleRail.addEventListener('pointerup', releaseThrottle);
throttleRail.addEventListener('pointercancel', releaseThrottle);

// ============================================================
// 6. 観察カメラのドラッグ（canvas 上の 1 本指）
// ============================================================
let orbitPointer: number | null = null;
let lastOrbitX = 0;
let lastOrbitY = 0;
canvas.addEventListener('pointerdown', (e) => {
  if (game.state !== 'flying') return;
  if (orbitPointer !== null) return;
  orbitPointer = e.pointerId;
  lastOrbitX = e.clientX;
  lastOrbitY = e.clientY;
});
canvas.addEventListener('pointermove', (e) => {
  if (e.pointerId !== orbitPointer) return;
  const dx = e.clientX - lastOrbitX;
  const dy = e.clientY - lastOrbitY;
  lastOrbitX = e.clientX;
  lastOrbitY = e.clientY;
  game.orbitDrag(dx, dy);
});
const endOrbit = (e: PointerEvent) => {
  if (e.pointerId === orbitPointer) orbitPointer = null;
};
canvas.addEventListener('pointerup', endOrbit);
canvas.addEventListener('pointercancel', endOrbit);

// ============================================================
// 7. ライフサイクル
// ============================================================
function onResize(): void {
  resizeRenderer(renderer, camera);
  game.syncPostFx();
  overlays.updateOrientation();
  instruments.resize();
}
window.addEventListener('resize', onResize);
window.addEventListener('orientationchange', () => setTimeout(onResize, 250));
onResize();

let lastTime = performance.now();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (game.state === 'flying') {
      game.pause();
      overlays.showPause();
    }
  } else {
    lastTime = performance.now();
    overlays.updateOrientation();
  }
});

// ============================================================
// 8. メインループ
// ============================================================
let prevOnGround = true;

const QUALITY_ORDER: QualityLevel[] = ['low', 'medium', 'high', 'ultra'];

function frame(now: number): void {
  requestAnimationFrame(frame);
  let dt = (now - lastTime) / 1000;
  lastTime = now;
  if (!(dt > 0)) dt = 0;
  if (dt > 0.25) dt = 0.25;

  game.quality.sample(dt);
  const timeSec = now * 0.001;

  if (game.state === 'menu') {
    game.renderPreview(dt);
    return;
  }

  if (game.state === 'flying') {
    controls.updateFromKeys(dt);
    updateStick(dt);
    game.updateFlight(dt, controls.normalized());
    const t = game.getTelemetry();
    if (t) {
      const info = game.getFlightInfo();
      const nav = game.getNavInfo();
      // v18: 計器データはモジュール使い回し（25 項目リテラルを毎帧作らない）。
      // 消費側（InstrumentPanel / SOPCallouts）はいずれも当帧内で値を読む
      const inst = instShared;
      inst.ias = t.ias; inst.alt = t.alt; inst.agl = t.agl; inst.vspeed = t.vspeed;
      inst.heading = t.heading; inst.pitch = t.pitch; inst.bank = t.bank;
      inst.aoa = t.aoa; inst.gLoad = t.gLoad;
      inst.throttle = t.throttle; inst.fuelFrac = t.fuelFrac;
      inst.groundSpeed = t.groundSpeed;
      inst.windSpeed = t.windSpeed; inst.windDirDeg = t.windDirDeg;
      inst.flapsDeg = info.flapsDeg; inst.gearDown = info.gearDown; inst.spoilers = controls.spoilers;
      inst.phase = info.phase; inst.crashed = info.crashed;
      inst.rwyName = nav ? nav.nearest.name : null;
      inst.rwyDist = nav ? nav.distanceToThreshold : null;
      inst.rwyRemaining = nav ? nav.remainingRunway : null;
      inst.rwyHeading = nav ? nav.nearest.headingDeg : null;
      inst.fps = game.quality.getFps();
      inst.onGround = t.onGround;

      // ---- 衝突爆発：建物 / 地面ハードインパクト ----
      if (!t.crashed) {
        // 建物衝突（身体円近似 × 高さボックス）。地上はスキップ
        if (!t.onGround && buildingColliders.length) {
          const px = t.position.x, pz = t.position.z, py = t.alt;
          for (let bi = 0; bi < buildingColliders.length; bi++) {
            const b = buildingColliders[bi];
            const dx = px - b.x, dz = pz - b.z;
            const rr = b.r + 8;
            if (dx * dx + dz * dz < rr * rr && py < b.top + 5 && py > b.top - 420) {
              game.forceCrash();
              break;
            }
          }
        }
        // 高速ド直撃（物理の大接地関値未満でも降下率×対地速度で吹っ飛ぶ）。
        // v16.1: 接地直下でのみ判定 — 以前は高度条件がなく、巡航中に降下率 -5.5m/s 超えで
        // 空中爆発する誤発火があった（着地フレームは onGround 遷移前の wasAirborne で拾える）
        if (wasAirborne && (t.onGround || t.agl < 6)) {
          const slam = t.vspeed < -5.5 && t.groundSpeed > 28;
          const gearUpSlam = !info.gearDown && t.groundSpeed > 46 && t.agl < 4;
          if (slam || gearUpSlam) game.forceCrash();
        }
      }
      wasAirborne = !t.onGround;
      if (t.crashed && !boomedCrash) {
        boomedCrash = true;
        triggerBoom(1.35);
        sopBanner.show({ text: 'ドカーン！！ 💥 衝突爆発', speech: 'mayday mayday', kind: 'warn' });
      }
      if (!t.crashed) boomedCrash = false;
      // ---- AP 表示（ストリップ / パネル / イベント音声） ----
      {
        const aps = game.getApStatus();
        if (aps.engaged !== apUiEngaged) {
          apUiEngaged = aps.engaged;
          apBtn.classList.toggle('on', aps.engaged);
          apBtn.innerHTML = aps.engaged ? 'AP<br>ON' : 'AP<br>OFF';
        }
        if (aps.engaged) {
          if (apUiStripDisp !== 'flex') {
            apUiStripDisp = 'flex';
            apStrip.style.display = 'flex';
          }
          const stripTxt =
            `AP ${aps.lat}${aps.loc ? '·LOC' : ''} | ${aps.ver}${aps.gs ? '·GS' : ''} · ` +
            `IAS ${Math.round(t.ias * 1.94404)}kt · HDG ${String(aps.hdgDeg).padStart(3, '0')}° · ` +
            `ALT ${aps.altM}m${aps.ver === 'VS' ? ` · V/S ${aps.vsFpm}` : ''}`;
          if (stripTxt !== apStripLastTxt) {
            apStripLastTxt = stripTxt;
            apStripTxt.textContent = stripTxt;
          }
          const chips = `${aps.lat}|${aps.ver}`;
          if (chips !== apUiChips) {
            apUiChips = chips;
            apChHdg.classList.toggle('on', aps.lat === 'HDG');
            apChNav.classList.toggle('on', aps.lat === 'NAV');
            apChVs.classList.toggle('on', aps.ver === 'VS');
            apChAlt.classList.toggle('on', aps.ver === 'ALT');
          }
        } else if (apUiStripDisp !== 'none') {
          apUiStripDisp = 'none';
          apStrip.style.display = 'none';
        }
        if (apPanel.style.display === 'block') {
          const sig = `${aps.engaged ? 1 : 0}|${aps.lat}|${aps.ver}|${aps.spdKt}|${aps.hdgDeg}|${aps.altM}|${aps.vsFpm}|${aps.loc ? 1 : 0}|${aps.gs ? 1 : 0}`;
          if (sig !== apLastSig) {
            apLastSig = sig;
            renderApPanel();
          }
        }
        for (const e of game.drainApEvents()) {
          const m = AP_MSG[e];
          if (!m) continue;
          sopBanner.show(m);
          if (!audio.muted && m.speech) speak(m.speech);
        }
      }

      // ---- 計器盤（Phase 4） ----
      if (hudRoot.style.display !== 'none') {
        instruments.update(inst);

        // ---- SOP コールアウト（マニュアル第4-5章: 80kt/V1/ROTATE/高度コール/60kt） ----
        for (const e of callouts.update(inst)) {
          sopBanner.show(e);
          if (!audio.muted && e.speech) speak(e.speech);
        }
        const fc = callouts.flapCaution(inst, performance.now());
        if (fc) sopBanner.show(fc);
      }

      // ---- サウンド（Phase 4 警告 / Phase 5 エンジン・風） ----
      if (audio.ready && !audio.muted) {
        audio.setEngine(t.throttle, t.ias);
        audio.setWind(t.ias);
        const warn = t.crashed || info.crashed ? 'none'
          : t.ias > overspeedLimitMs(info.flapsDeg) ? 'overspeed'
            : (t.aoa > 15 && t.agl > 10) ? 'stall'
              : (t.agl < 300 && !info.gearDown && t.vspeed < -1) ? 'gear'
                : 'none';
        audio.setWarning(warn);
      }

      // ---- 着地音（接地遷移） ----
      if (prevOnGround === false && t.onGround && t.vspeed < -0.5 && audio.ready && !audio.muted) {
        audio.touchdown();
      }
      prevOnGround = t.onGround;
    }
  }

  // ---- Phase 6: 自動画質調整（FPS 中央値ベース・ヒステリシス付き） ----
  const fps = game.quality.getFps();
  autoPromoteDelay = Math.max(0, autoPromoteDelay - dt);
  const idx = QUALITY_ORDER.indexOf(game.quality.level);
  const maxIdx = QUALITY_ORDER.indexOf(autoQualityMax);
  if (game.state === 'flying') {
    if (fps < 26 && idx > 0) {
      autoHighTimer = 0;
      autoLowTimer += dt;
      if (autoLowTimer > 3) {
        autoLowTimer = 0;
        game.setQuality(QUALITY_ORDER[idx - 1]);
        applyPixelRatio(renderer, game.quality.preset.pixelRatio);
        game.syncPostFx(); // 1 回でよい（setQuality 内でも呼ぶが DPR 変更後の再同期）
        autoPromoteDelay = 60;
      }
    } else if (fps > 55 && idx < maxIdx && autoPromoteDelay <= 0) {
      autoLowTimer = 0;
      autoHighTimer += dt;
      if (autoHighTimer > 8) {
        autoHighTimer = 0;
        game.setQuality(QUALITY_ORDER[idx + 1]);
        applyPixelRatio(renderer, game.quality.preset.pixelRatio);
        game.syncPostFx();
      }
    } else {
      autoLowTimer = 0;
      autoHighTimer = 0;
    }
  }

  game.updateWorld(timeSec, dt);
  explosion.update(dt);
  if (shakeAmp > 0.02) {
    const a = shakeAmp * 1.15;
    camera.position.x += (Math.random() - 0.5) * a;
    camera.position.y += (Math.random() - 0.5) * a;
    camera.position.z += (Math.random() - 0.5) * a;
    camera.rotateZ((Math.random() - 0.5) * a * 0.011);
    shakeAmp *= Math.exp(-2.6 * dt);
  } else {
    shakeAmp = 0;
  }
  game.render();
}
requestAnimationFrame(frame);
