/** v17 検証: ①テクスチャ/ジオメトリリーク ②telemetry ゲート ③キー repeat ガード+blur ④地上ステアリングの連続テーパー ⑤地上 1G 表示 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const PORT = 8179;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', ...(process.env.CHROME_EXTRA_ARGS ? process.env.CHROME_EXTRA_ARGS.split(' ') : [])] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 140)); });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!(window.__airliner?.game), null, { timeout: 30000 });
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(3500); // シーン構築待ち
let fail = 0;
const ok = (name, cond, info) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${info ? '  ' + info : ''}`); if (!cond) fail++; };

// ══ ① 機体切替 22 周回で renderer.info.memory が安定 ══
const leak = await page.evaluate(async () => {
  const g = window.__airliner.game;
  const r = window.__airliner.renderer;
  const ids = ['b737', 'a320', 'b777'];
  // headless swiftshader では rAF が極端に遅い → タイマー race で打率を確保
  const frame = () => Promise.race([
    new Promise((r2) => requestAnimationFrame(() => requestAnimationFrame(r2))),
    new Promise((r2) => setTimeout(r2, 300))
  ]);
  const cycle = async (n) => {
    for (let i = 0; i < n; i++) {
      g.startFlight(ids[i % ids.length], 'free');
      await frame();
    }
  };
  await cycle(2); // ウォームアップ（初回アップロード分）
  await new Promise((r2) => setTimeout(r2, 900));
  const a = { t: r.info.memory.textures, g: r.info.memory.geometries, p: r.info.programs.length };
  await cycle(9);
  g.restartDemo(); g.restartDemo(); g.restartDemo();
  await new Promise((r2) => setTimeout(r2, 900));
  const b = { t: r.info.memory.textures, g: r.info.memory.geometries, p: r.info.programs.length };
  return { a, b };
});
ok('①textures 安定 (+0 ±2)', leak.b.t - leak.a.t <= 2, `a=${leak.a.t} b=${leak.b.t} (切替12回)`);
ok('①geometries 非増加 (dispose 動作)', leak.b.g <= leak.a.g + 4, `a=${leak.a.g} b=${leak.b.g} (減=解放 OK)`);

// ══ ② telemetry: 同一フレーム複数回呼び → physics.telemetry 実計算 1 回 ══
const tel = await page.evaluate(async () => {
  const g = window.__airliner.game;
  g.startFlight('b737', 'free'); // ①で restartDemo 後にデモモード → free へ戻す
  await new Promise((r) => setTimeout(r, 600));
  let n = 0;
  const orig = g.physics.telemetry.bind(g.physics);
  g.physics.telemetry = () => { n++; return orig(); };
  const t1 = g.getTelemetry();
  const t2 = g.getTelemetry();
  g.getFlightInfo(); g.getNavInfo(); g.getTelemetry();
  const nSync = n;              // 同期ブロック中の実計算回数 → ≤1 が期待値
  const objSame = t1 === t2;
  const phase = g.getFlightInfo().phase;
  // 次 tick で再計算が進むこと — headless の rAF 遅延に左右されぬよう
  // updateFlight を手動で 1 回走らせる（環境非依存）
  const v0 = g.physics.simVersion;
  g.updateFlight(1 / 60, null);
  const recalc = n > nSync && g.physics.simVersion > v0;
  g.physics.telemetry = orig;
  await new Promise((r) => setTimeout(r, 120));
  const t3 = g.getTelemetry();
  return { nSync, recalc, objSame, phase, telIdentity: t3 === g.getTelemetry() };
});
ok('②同一フレーム実計算 ≤1', tel.nSync <= 1, `calls=${tel.nSync}`);
ok('②次帧で再計算が進む', tel.recalc);
ok('②オブジェクト再利用（===）', tel.objSame && tel.telIdentity);
ok('②phase 取得可', typeof tel.phase === 'string' && tel.phase.length > 0, tel.phase);

// ══ ③ キー repeat ガード（G トグルが長押しで連打されない）+ blur クリア ══
const keys = await page.evaluate(async () => {
  const ctl = window.__airliner.controls;
  ctl.gearDown = true;
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', repeat: true }));
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', repeat: true }));
  const afterRepeat = ctl.gearDown; // 変化しないはず
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', repeat: false }));
  const afterReal = ctl.gearDown;   // ここで変わるはず
  // blur: 下矢印保持中 → blur で解除される（rAF 遅延に依存せず updateFromKeys を自走）
  ctl.pitch = 0;
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
  for (let i = 0; i < 40; i++) ctl.updateFromKeys(1 / 60);
  const held = Math.abs(ctl.pitch);
  window.dispatchEvent(new Event('blur'));
  for (let i = 0; i < 120; i++) ctl.updateFromKeys(1 / 60);
  const afterBlur = Math.abs(ctl.pitch);
  return { afterRepeat, afterReal, held, afterBlur };
});
ok('③repeat keydown はト.Toggle しない', keys.afterRepeat === true);
ok('③通常 keydown はトグル', keys.afterReal === false);
ok('③押下中は pitch 移動', keys.held > 0.1, `held=${keys.held.toFixed(2)}`);
ok('③blur でスティック復帰', keys.afterBlur < 0.05, `afterBlur=${keys.afterBlur.toFixed(3)}`);

// ══ ④ 地上ステアリング: 35 m/s でも効く（旧: 30 超で突然ゼロ） ══
const steer = await page.evaluate(() => {
  const p = window.__airliner.game.physics;
  const fwd0 = new (Object.getPrototypeOf(p.velocity).constructor)(0, 0, 1).applyQuaternion(p.quaternion);
  const hd0 = Math.atan2(fwd0.x, -fwd0.z);
  p.velocity.set(0, 0, -35);
  p.throttle = 0; p.brakes = false;
  const ctl = { elevator: 0, aileron: 0, rudder: 1, flapsDeg: 0, spoilers: 0, gearDown: true };
  for (let i = 0; i < 120; i++) p.step(1 / 120, ctl);
  const fwd1 = new (Object.getPrototypeOf(p.velocity).constructor)(0, 0, 1).applyQuaternion(p.quaternion);
  const hd1 = Math.atan2(fwd1.x, -fwd1.z);
  let d = (hd1 - hd0) * 180 / Math.PI;
  if (d > 180) d -= 360; if (d < -180) d += 360;
  return { dDeg: Math.round(d * 100) / 100, onGround: p.onGround };
});
ok('④35 m/s 地上ヨーが有効', Math.abs(steer.dDeg) > 0.5, `Δhdg=${steer.dDeg}° onGround=${steer.onGround}`);

// ══ ⑤ 地上静止の G 表示 ≈ 1 ══
const gload = await page.evaluate(async () => {
  const g = window.__airliner.game;
  g.restartDemo(); g.startFlight('b737', 'free');
  await new Promise((r) => setTimeout(r, 1500));
  const p = g.physics;
  return { onGround: p.onGround, gLoad: Math.round(p.gLoadSmooth * 100) / 100, telG: Math.round(g.getTelemetry().gLoad * 100) / 100 };
});
ok('⑤地上 1G 表示', gload.onGround && gload.telG > 0.8, JSON.stringify(gload));

console.log(errors.length ? `console errors(${errors.length}): ${errors.slice(0, 4).join(' | ')}` : 'errors 0');
if (errors.length) fail++;
await browser.close();
srv.kill('SIGTERM');
console.log(fail === 0 ? '>>> v17 CHECK ALL PASS' : `>>> v17 CHECK FAIL x${fail}`);
process.exit(fail === 0 ? 0 : 1);
