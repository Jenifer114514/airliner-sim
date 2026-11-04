/**
 * scripts/browser-smoke.mjs — 実ブラウザ回帰テスト（JS エラー・離陸操縦・UI）
 * 実行: node scripts/browser-smoke.mjs
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const PORT = 8142;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(700);

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage({ viewport: { width: 844, height: 390 } });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

let pass = 0, fail = 0;
const check = (name, ok, detail = '') => {
  if (ok) { pass++; console.log(`  PASS ${name} ${detail}`); }
  else { fail++; console.log(`  FAIL ${name} ${detail}`); }
};

await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2000);
check('ページ起動', true);

// 自由飛行開始
await page.evaluate(() => {
  document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(800);
let s = await page.evaluate(() => ({
  state: window.__airliner.game.state,
  mode: window.__airliner.game.flightMode
}));
check('自由飛行開始', s.state === 'flying' && s.mode === 'free', JSON.stringify(s));

// スロットル最大 → 滑走加速（simulate で確定的に進める）
await page.evaluate(() => {
  const g = window.__airliner.game;
  g.simulate(32, { pitch: 0, roll: 0, yaw: 0, throttle: 1, brakes: false, flapsDeg: 15, spoilers: 0, gearDown: true });
});
s = await page.evaluate(() => {
  const t = window.__airliner.game.getTelemetry();
  return { ias: t.ias, onGround: t.onGround };
});
check('滑走加速', s.ias > 65 && s.onGround, `(IAS=${s.ias.toFixed(1)} m/s)`);

// 抬頭 → 上昇（ピッチ 10° 目標の PD 制御で確実に離陸）
await page.evaluate(() => {
  const g = window.__airliner.game;
  const C = (pitch, thr) => ({ pitch, roll: 0, yaw: 0, throttle: thr, brakes: false, flapsDeg: 15, spoilers: 0, gearDown: true });
  for (let i = 0; i < 40; i++) {
    const t = g.getTelemetry();
    const err = 10 - t.pitch;
    // PD: 比例 + 角速度減衰（ωx は + = 機首下げ = rad/s。減衰項は pitch レートと逆向き）
    const cmd = Math.max(-0.25, Math.min(0.55, err * 0.05 + t.omega.x * 0.8));
    g.simulate(0.5, C(cmd, i < 20 ? 1 : 0.95));
  }
  // AGL 36m 超過まで追加上昇（rAF 併走による sim 時間の揺らぎを吸収。上限 12 秒）
  for (let i = 0; i < 24; i++) {
    const t2 = g.getTelemetry();
    if (t2.agl > 36) break;
    const err2 = 12 - t2.pitch;
    const cmd2 = Math.max(-0.25, Math.min(0.55, err2 * 0.05 + t2.omega.x * 0.8));
    g.simulate(0.5, C(cmd2, 0.95));
  }
});
s = await page.evaluate(() => {
  const t = window.__airliner.game.getTelemetry();
  return { alt: t.alt, agl: t.agl, ias: t.ias, pitch: t.pitch, crashed: t.crashed };
});
check('離陸して上昇', s.agl > 30 && !s.crashed,
  `(AGL=${s.agl.toFixed(0)}m, IAS=${s.ias.toFixed(1)}, pitch=${s.pitch.toFixed(1)}°)`);

// ---- Phase 4/5: 計器盤・音声・環境 ----
await delay(2000); // 計器描画を数フレーム回す
const inst = await page.evaluate(() => {
  const cv = document.getElementById('inst-panel');
  return { w: cv.width, h: cv.height };
}).catch(() => null);
const instPaint = await page.evaluate(() => {
  const cv = document.getElementById('inst-panel');
  const ctx = cv.getContext('2d');
  const img = ctx.getImageData(0, 0, cv.width, cv.height);
  let sum = 0;
  for (let i = 3; i < img.data.length; i += 16) sum += img.data[i];
  return { painted: sum > 1000, audioReady: window.__airliner.audio.ready === true };
});
check('計器盤が描画されている', instPaint.painted, `canvas ${inst?.w}x${inst?.h}`);
check('音声エンジン準備完了', instPaint.audioReady);

const envDom = await page.evaluate(() => ({
  time: !!document.getElementById('time-chips')?.children.length,
  weather: !!document.getElementById('weather-chips')?.children.length,
  wind: !!document.getElementById('wind-chips')?.children.length
}));
check('環境チップ（時刻/天候/風）', envDom.time && envDom.weather && envDom.wind, JSON.stringify(envDom));

const envApplied = await page.evaluate(() => {
  window.__airliner.game.applyEnvironment('day', 'rain', 'strong');
  const t = window.__airliner.game.getTelemetry();
  return { windSpeed: t.windSpeed };
});
check('環境適用（風 12 m/s）', Math.abs(envApplied.windSpeed - 12) < 0.01, JSON.stringify(envApplied));

// カメラ切替
await page.evaluate(() => window.__airliner.game.cycleCamera(1));
await delay(300);
const cam = await page.evaluate(() => window.__airliner.game.cameraName());
check('カメラ切替', typeof cam === 'string' && cam.length > 0, `(${cam})`);

// フラップ・ギア操作（操作状態を直接確認）
await page.evaluate(() => {
  window.__airliner.controls.flapDown();
  window.__airliner.controls.gearDown = false;
});
await delay(100);
s = await page.evaluate(() => ({
  flapsDeg: window.__airliner.controls.flapsDeg,
  gearDown: window.__airliner.controls.gearDown
}));
// 初期フラップ 5°（離陸設定）→ 1 段階展開で 10°（B737-700 detents: 0/1/5/10/15/25/30/40）
check('フラップ/ギア操作', s.flapsDeg === 10 && s.gearDown === false, JSON.stringify(s));

// スティック（固定ベース・相対ドラッグ）: 上ドラッグ=機首上げ / 右=右ロール / 下=機首下げ
// + 回帰: 円の外の点を触っただけでは中立（初期バイアス無し: 「倒すと逆へ傾く」報告の根因）
const stickSign = await page.evaluate(async () => {
  const zone = document.getElementById('stick-zone');
  const vis = document.getElementById('stick-visual');
  const r = vis.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const R = r.width / 2 - 24; // ノブ最大半径（main.ts と同一計算）
  const ev = (type, x, y, id) => zone.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: id, clientX: x, clientY: y }));
  const C = () => window.__airliner.controls;
  // SwiftShader ではフレーム間隔が不定なので「値が 2 連続不変」で収束判定
  const settle = async () => {
    let prev = '', same = 0;
    for (let i = 0; i < 40; i++) {
      await Promise.race([
        new Promise((res) => requestAnimationFrame(res)),
        new Promise((res) => setTimeout(res, 2500))
      ]);
      const cur = C().pitch.toFixed(4) + ',' + C().roll.toFixed(4);
      same = cur === prev ? same + 1 : 0;
      prev = cur;
      if (same >= 2) return;
    }
  };
  const drag = async (dx, dy, id) => {
    ev('pointerdown', cx, cy, id);
    ev('pointermove', cx + dx, cy + dy, id);
    // 満舵チャネルが 0.45 に到達するまで（またはタイムアウト）フレームを待つ — rAF 餓死耐性
    for (let i = 0; i < 80; i++) {
      await Promise.race([new Promise((res) => requestAnimationFrame(res)), new Promise((res) => setTimeout(res, 2500))]);
      if (Math.max(Math.abs(C().pitch), Math.abs(C().roll)) >= 0.45) break;
    }
    const v = { p: C().pitch, r: C().roll };
    ev('pointerup', cx + dx, cy + dy, id);
    for (let i = 0; i < 80; i++) {
      await Promise.race([new Promise((res) => requestAnimationFrame(res)), new Promise((res) => setTimeout(res, 2500))]);
      if (Math.abs(C().pitch) + Math.abs(C().roll) < 0.01) break;
    }
    return v;
  };
  const up = await drag(0, -R, 21);
  const right = await drag(R, 0, 22);
  const dn = await drag(0, R, 23);
  const dead = await drag(4, -4, 24);
  // 円の大きく外（左 220px）をタップだけ → 中立のまま
  ev('pointerdown', cx - 220, cy, 25);
  await settle();
  const tapOff = Math.abs(C().pitch) + Math.abs(C().roll);
  // そこから右へ 30px ドラッグ → 右ロール
  ev('pointermove', cx - 190, cy, 25);
  await settle();
  const offRoll = C().roll;
  ev('pointerup', cx - 190, cy, 25);
  await settle();
  const released = Math.abs(C().pitch) + Math.abs(C().roll);
  return { up, right, dn, dead, tapOff, offRoll, released };
});
check('ヨーク方向 (下=手前引き=機首上げ/上=押し=機首下げ/右=右ロール)',
  stickSign.up.p < -0.5 && stickSign.right.r > 0.5 && stickSign.dn.p > 0.5,
  JSON.stringify(stickSign));
check('ヨーク低感度 (満舵<=0.95・デッドゾーン・復帰0)',
  Math.abs(stickSign.up.p) <= 0.95 && stickSign.dead.p + Math.abs(stickSign.dead.r) < 0.02 && stickSign.released < 0.01,
  JSON.stringify(stickSign));
check('スティック相対入力 (円外タップ=中立・ドラッグで右ロール)',
  stickSign.tapOff < 0.01 && stickSign.offRoll > 0.3,
  JSON.stringify({ tapOff: stickSign.tapOff, offRoll: +stickSign.offRoll.toFixed(2) }));

// ---- 空中操縦実証（物理ミラー修正の回帰）: 右スティック保持 = 右バンク + 右旋回 ----
const flyTest = await page.evaluate(() => {
  const G = () => window.__airliner.game;
  const g = G();
  const ph = g.physics;
  if (!ph) return { skip: true };
  const fresh = (alt) => {
    const v = g.player.group.position.clone();
    v.set(0, alt, -2000);
    ph.resetAirborne(v, Math.PI, 130);   // θ=π → 方位 0（北）
    ph.gearDown = false; ph.flapsDeg = 0;
    return v;
  };
  fresh(1600);
  const ctrl = (roll, pitch = 0) => ({ pitch, roll, yaw: 0, throttle: 0.5, brakes: false, flapsDeg: 0, spoilers: 0, gearDown: false });
  for (let i = 0; i < 180; i++) g.updateFlight(1 / 60, ctrl(0));      // 安定化 3s
  const before = g.getTelemetry();
  for (let i = 0; i < 60; i++) g.updateFlight(1 / 60, ctrl(0.22));    // 右パルス 1s
  const mid = g.getTelemetry();
  for (let i = 0; i < 120; i++) g.updateFlight(1 / 60, ctrl(0.22));    // 保持 → 合計 3s
  const mid2 = g.getTelemetry();
  const r = ((mid2.heading - before.heading + 540) % 360) - 180;
  for (let i = 0; i < 150; i++) g.updateFlight(1 / 60, ctrl(0, 0));    // 水平復帰
  const lvl = g.getTelemetry();
  // ピッチ: 手前引き相当 +pitch で機首が上がるか
  const p0 = lvl.pitch;
  for (let i = 0; i < 90; i++) g.updateFlight(1 / 60, ctrl(0, 0.5));
  const p1 = g.getTelemetry().pitch;
  for (let i = 0; i < 120; i++) g.updateFlight(1 / 60, ctrl(0, 0));   // 復調
  const t = g.getTelemetry();
  return {
    bank: +mid.bank.toFixed(1), bank2: +mid2.bank.toFixed(1),
    hdgDelta: +r.toFixed(1), pitchUp: +(p1 - p0).toFixed(1),
    alt: +t.alt.toFixed(0), crashed: t.crashed === true
  };
});
check('操舵→右バンク+右旋回+ピッチ上げ（ミラー修正の実機同経路検証）',
  flyTest.skip === true || (flyTest.bank > 4 && flyTest.bank < 90 && flyTest.hdgDelta > 1.5 && flyTest.pitchUp > 1 && !flyTest.crashed),
  JSON.stringify(flyTest));

// ---- オートパイロット: [AP] ボタン接続/切断・パネル操作・ステータス表示 ----
const apUi = await page.evaluate(async () => {
  const G = () => window.__airliner.game;
  { // 機体を新しい巡航状態へ（前テストの状態に依存しない）
    const g = G();
    if (g.physics) {
      const v = g.player.group.position.clone();
      v.set(0, 1600, -2000);
      g.physics.resetAirborne(v, Math.PI, 130);
      g.physics.gearDown = false; g.physics.flapsDeg = 0;
      g.state = 'flying';
      g.updateFlight(1 / 60, null);
      g.updateFlight(1 / 60, null);
    }
  }
  const raf = async (n) => { for (let i = 0; i < n; i++) await Promise.race([new Promise((res) => requestAnimationFrame(res)), new Promise((res) => setTimeout(res, 1500))]); };
  const tap = (id) => document.getElementById(id).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 90 + Math.random() } ));
  tap('btn-ap');
  await raf(3);
  const engaged = G().ap.engaged;
  const altBefore = G().ap.altTarget;
  // SwiftShader では rAF が枯れることがある → main loop が strip を描画するまで条件待ち
  let stripVisible = false, stripText = '';
  for (let i = 0; i < 32; i++) {
    const el = document.getElementById('ap-strip');
    stripVisible = getComputedStyle(el).display !== 'none';
    stripText = el.textContent || '';
    if (stripVisible && /AP/.test(stripText)) break;
    await new Promise((res) => setTimeout(res, 250));
  }
  const spdKt = G().getApStatus().spdKt;
  tap('btn-ap-set');
  await raf(2);
  const panelOpen = getComputedStyle(document.getElementById('ap-panel')).display === 'block';
  for (let i = 0; i < 3; i++) tap('ap-alt-up');
  await raf(2);
  const altAfter = G().ap.altTarget;
  const btnText = document.getElementById('btn-ap').textContent || '';
  tap('btn-ap');
  await raf(2);
  const disengaged = !G().ap.engaged;
  tap('btn-ap-set');
  return { engaged, stripVisible, stripHasAP: /AP/.test(stripText), spdKept: spdKt > 60, panelOpen, altGain: altAfter - altBefore, disengaged, btnOn: /ON/.test(btnText) };
});
check('AP 接続/切断とステータス（[AP] トグル・strip 表示・ON ラベル）',
  apUi.engaged && apUi.stripVisible && apUi.stripHasAP && apUi.disengaged && apUi.btnOn,
  JSON.stringify(apUi));
check('AP パネル（ALT +100×3 = +300m・SPD 保持）',
  apUi.panelOpen && apUi.altGain === 300 && apUi.spdKept,
  JSON.stringify(apUi));

// ---- 空港セレクタ: 3空港目が並び、選んで離陸できる ----
const ap3 = await page.evaluate(async () => {
  const chips = Array.from(document.querySelectorAll('#airport-chips .chip, #airport-chips .menu-chip, #airport-chips > *')).map((e) => e.textContent || '');
  return { n: chips.length, hasPalm: chips.some((t) => /パーム/.test(t)) };
});
// ---- AP ストリップ・モードチップ（HDG/NAV/V/S/ALT）----
const chipTest = await page.evaluate(async () => {
  const G = () => window.__airliner.game;
  const g = G();
  if (!g.physics) return { skip: true };
  {
    const v = g.player.group.position.clone();
    v.set(0, 1600, -2000);
    g.physics.resetAirborne(v, Math.PI, 130);
    g.physics.gearDown = false; g.physics.flapsDeg = 0;
    g.state = 'flying';
    g.updateFlight(1 / 60, null);
  }
  const raf = async (n) => { for (let i = 0; i < n; i++) await Promise.race([new Promise((res) => requestAnimationFrame(res)), new Promise((res) => setTimeout(res, 1500))]); };
  const tapChip = (id) => document.getElementById(id).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 71 }));
  if (!G().ap.engaged) tapChip('ap-ch-vs');           // 未接続ならこの 1 タップで接続+VS
  else tapChip('ap-ch-vs');
  const vs = { engaged: G().ap.engaged, ver: G().ap.verMode };
  tapChip('ap-ch-alt');
  const alt = { ver: G().ap.verMode };
  await raf(2);
  tapChip('ap-ch-nav');
  const nav = { lat: G().ap.latMode };
  tapChip('ap-ch-hdg');
  const hdg = { lat: G().ap.latMode };
  const stripVisible = getComputedStyle(document.getElementById('ap-strip')).display !== 'none';
  return {
    engaged: vs.engaged, vsMode: vs.ver, altMode: alt.ver,
    latNav: nav.lat, latHdg: hdg.lat, stripVisible,
    chipSizes: ['ap-ch-hdg','ap-ch-nav','ap-ch-vs','ap-ch-alt'].map(i => {
      const r = document.getElementById(i).getBoundingClientRect();
      return r.width > 14 && r.height > 8;
    })
  };
});
check('AP ストリップ・チップ（V/S→ALT・NAV→HDG・接続自動）',
  chipTest.skip === true || (chipTest.engaged && chipTest.vsMode === 'VS' && chipTest.altMode === 'ALT'
    && chipTest.latNav === 'NAV' && chipTest.latHdg === 'HDG' && chipTest.stripVisible && chipTest.chipSizes.every(Boolean)),
  JSON.stringify(chipTest));
if (chipTest.skip !== true) { await page.evaluate(() => { const G=()=>window.__airliner.game; if (G().ap.engaged) G().toggleAp(); }); }

// ---- 冲突爆発：生前の爆笑ボタン削除 + 建物辞突で crash/エフェクト ----
const boom = await page.evaluate(async () => {
  const A = window.__airliner;
  const g = A.game;
  const btnGone = document.getElementById('btn-laugh') === null;
  if (!g.physics || !A.explosion || !A.buildings || !A.buildings.length) return { skip: true };
  let best = A.buildings[0];
  for (const b of A.buildings) if (b.top > best.top) best = b;
  const v = g.player.group.position.clone();
  v.set(best.x, best.top - 30, best.z);
  g.physics.resetAirborne(v, 0, 55);
  g.state = 'flying';
  let crashed = false, fx = 0;
  for (let i = 0; i < 60; i++) {
    await Promise.race([new Promise((res) => requestAnimationFrame(res)), new Promise((res) => setTimeout(res, 300))]);
    const t = g.getTelemetry();
    if (t && t.crashed) { crashed = true; fx = A.explosion.live; break; }
  }
  return { btnGone, crashed, fx: fx > 3, top: Math.round(best.top) };
});
check('建物辞突で爆発（残骸化+エフェクト、😂ボタン削除込み）',
  boom.skip === true || (boom.btnGone && boom.crashed && boom.fx), JSON.stringify(boom));

// ---- 高層ビル（scene towers InstancedMesh）----
const towers = await page.evaluate(() => {
  const g = window.__airliner.game;
  const obj = g.scene && g.scene.getObjectByName ? g.scene.getObjectByName('towers') : null;
  return obj ? { n: obj.count, h: +(obj.instanceMatrix ? 1 : 0) } : null;
});
check('高層ビル群（towers ≥20 棟）', !!towers && towers.n >= 20, JSON.stringify(towers));

// ---- ADI（姿勢指示器）bank 符号: 右バンクで地平線が「右上がり」に描画されるか ----
const adi = await page.evaluate(async () => {
  const A = window.__airliner;
  const g = A.game;
  if (!g.physics) return { skip: true };
  const v = g.player.group.position.clone();
  v.set(0, 1600, -2000);
  g.physics.resetAirborne(v, Math.PI, 130);
  g.physics.gearDown = false; g.physics.flapsDeg = 0;
  g.state = 'flying';
  const raf1 = () => Promise.race([new Promise((res) => requestAnimationFrame(res)), new Promise((res) => setTimeout(res, 900))]);
  for (let i = 0; i < 90; i++) g.updateFlight(1 / 60, { pitch: 0, roll: 0, yaw: 0, throttle: 0.5, brakes: false, flapsDeg: 0, spoilers: 0, gearDown: false });
  const c = document.getElementById('inst-panel');
  if (!c || !c.width || !c.height) return { skip: true };
  const ctx = c.getContext('2d');
  const cx = Math.round(c.width / 6 * 1.5), cy = Math.round(c.height / 2);
  const scan = (x) => {
    for (let y = Math.max(0, cy - 50); y < c.height; y++) {
      const d = ctx.getImageData(x, y, 1, 1).data;
      if (d[0] > d[2] + 18 && d[0] > 60 && d[1] < d[0] + 12) return y;
    }
    return null;
  };
  let out = { bank: null, L: null, R: null };
  for (let i = 0; i < 40; i++) {
    const b = g.getTelemetry().bank;
    A.controls.roll = b > 30 ? -0.4 : 0.4;          // 10〜30° 窓に保持しながら描画フレームを待つ
    await raf1();
    const bank = g.getTelemetry().bank;
    if (bank >= 8 && bank <= 34) {
      const L = scan(cx - 30), R = scan(cx + 30);
      if (L !== null && R !== null) { out = { bank: +bank.toFixed(1), L, R }; break; }
    }
  }
  A.controls.roll = 0;
  return out;
});
check('ADI 符号: 右バンク→地平線が右上がり', adi.skip === true || (adi.bank >= 6 && adi.L !== null && adi.R !== null && adi.R < adi.L), JSON.stringify(adi));

check('空港セレクタに 3 件目（パーム島）', ap3.n >= 3 && ap3.hasPalm, JSON.stringify(ap3));

// ---- SOP コールアウト（JAL/JTA マニュアル第4-5章） ----
check('SOP バナー要素', await page.evaluate(() => !!document.getElementById('sop-banner')));

await page.evaluate(() => window.__airliner.callouts.reset());
const toCallouts = await page.evaluate(() => {
  const mk = (over) => Object.assign({
    ias: 0, alt: 20, agl: 0, vspeed: 0, heading: 90, pitch: 0, bank: 0,
    aoa: 2, gLoad: 1, throttle: 1, fuelFrac: 0.8, groundSpeed: 0,
    windSpeed: 0, windDirDeg: 0, flapsDeg: 5, gearDown: true, spoilers: 0,
    phase: 'ground', crashed: false,
    rwyName: '27', rwyDist: 0, rwyRemaining: 2500, rwyHeading: 90, fps: 60,
    onGround: true
  }, over);
  const c = window.__airliner.callouts;
  const texts = [];
  // 80kt → V1(142kt) → ROTATE(142kt) 相当（Load 72% 近似）
  for (const ias of [10, 42, 70, 74]) {
    for (const e of c.update(mk({ ias }))) texts.push(e.text);
  }
  // 離陸直後: POSITIVE RATE
  for (const e of c.update(mk({ onGround: false, vspeed: 3, agl: 15, ias: 76 }))) texts.push(e.text);
  // 着陸進入: 1000/500/50/30ft クロス
  for (const agl of [320, 300, 160, 140, 20, 8]) {
    for (const e of c.update(mk({ onGround: false, vspeed: -4, agl, ias: 68, gearDown: true }))) texts.push(e.text);
  }
  // 接地後 60kt
  for (const e of c.update(mk({ onGround: true, vspeed: -1, agl: 0, ias: 30 }))) texts.push(e.text);
  return texts;
});
const has = (p) => toCallouts.some((t) => t.includes(p));
check('SOP 離陸コール (80kt/V1/ROTATE)',
  has('80 KNOTS') && has('V1') && has('ROTATE'), JSON.stringify(toCallouts));
check('SOP POSITIVE RATE', has('POSITIVE RATE'), JSON.stringify(toCallouts));
check('SOP 着陸高度コール (1000/500/50/30ft)',
  has('1000ft') && has('500ft') && has('50 FT') && has('30 FT'), JSON.stringify(toCallouts));
check('SOP 60kt コール', has('60 KNOTS'), JSON.stringify(toCallouts));

// 一時停止・再開
await page.evaluate(() => {
  document.getElementById('btn-pause').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(300);
const paused = await page.evaluate(() => window.__airliner.game.state);
await page.evaluate(() => {
  document.getElementById('btn-resume').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(300);
const resumed = await page.evaluate(() => window.__airliner.game.state);
check('一時停止→再開', paused === 'paused' && resumed === 'flying', `(${paused}→${resumed})`);

// メニューへ戻る
await page.evaluate(() => {
  document.getElementById('btn-pause').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(250);
await page.evaluate(() => {
  document.getElementById('btn-to-menu').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(400);
const menu = await page.evaluate(() => window.__airliner.game.state);
check('メニューへ戻る', menu === 'menu', `(${menu})`);

// 第 2 空港（SKY 滑走路 27/09）で開始できること
await page.evaluate(() => {
  window.__airliner.game.startFlight('b737', 'free', 'sky');
});
await delay(300);
const sky = await page.evaluate(() => {
  const t = window.__airliner.game.getTelemetry();
  return { x: Math.round(t.position.x), z: Math.round(t.position.z) };
});
check('第2空港 SKY で開始', Math.abs(sky.x - 2980) < 60 && Math.abs(sky.z + 1400) < 60, JSON.stringify(sky));

check('JS エラー 0 件', errors.length === 0, errors.slice(0, 3).join(' | '));

await browser.close();
server.kill();
console.log(`\n=== ブラウザテスト: ${pass} PASS / ${fail} FAIL ===`);
process.exit(fail ? 1 : 0);
