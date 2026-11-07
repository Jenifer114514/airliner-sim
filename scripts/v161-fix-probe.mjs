/** v16.1 回帰: ①空中（agl>6）の急降下は爆発しない／接地ハードインパクトは従来どおり爆発 ②再スタートで機体可視復元 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const PORT = 8178;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!(window.__airliner?.game), null, { timeout: 30000 });
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(800);

// ① 巡航中に降下率 -9 m/s・対地 90 m/s を 6 秒維持 → crashed=false が期待値
const mid = await page.evaluate(async () => {
  const g = window.__airliner.game;
  g.physics.resetAirborne({ x: 2000, y: 2200, z: -6000 }, 0.6, 90);
  await new Promise((r) => setTimeout(r, 300));
  g.physics.velocity.y = -9; g.physics.throttle = 0.35;
  g.physics.gearDown = false;
  await new Promise((r) => setTimeout(r, 4000));
  const t = g.physics.telemetry();
  return { crashed: g.physics.crashed, agl: Math.round(t.agl), vspeed: Math.round(t.vspeed * 10) / 10, gs: Math.round(t.groundSpeed) };
});
// ② 滑走路へ降下し vspeed -6.5 で接地 → 爆発（ゲート後の有効動作）
const slam = await (async () => {
  await page.evaluate(() => {
    const g = window.__airliner.game;
    const th = window.__airliner.terrainHeight;
    const x = 1200, z = -4200;
    window.__fc = 0; window.__tk = 0;
    const fc0 = g.forceCrash.bind(g);
    g.forceCrash = () => { window.__fc++; fc0(); };
    const uf = g.updateFlight.bind(g);
    g.updateFlight = (dt, c) => { window.__tk++; uf(dt, c); };
    // 本物の激突：agl 10 から降下率 -20 m/s（1〜2 tick で接地 → slam ゲート or 物理大接地）
    g.physics.resetAirborne({ x, y: th(x, z) + 10, z }, Math.atan2(2980 - 1200, -1400 + 4200), 70);
    g.physics.velocity.y = -20;
    g.physics.throttle = 0.3; g.physics.gearDown = true;
  });
  await page.waitForTimeout(14000);
  return await page.evaluate(() => {
    const g = window.__airliner.game;
    const t = g.physics.telemetry();
    return { crashed: g.physics.crashed, agl: Math.round(t.agl), vspeed: Math.round(t.vspeed * 10) / 10, gs: Math.round(t.groundSpeed), tk: window.__tk, fc: window.__fc, state: g.state };
  });
})();

// ③ 再スタート → 機体可視が戻る
const rest = await page.evaluate(async () => {
  const g = window.__airliner.game;
  const beforeVisible = g.player.group.visible;
  g.forceCrash();
  const hidden = g.player.group.visible;
  g.restartDemo();
  await new Promise((r) => setTimeout(r, 600));
  return { beforeVisible, hidden, after: g.player.group.visible, state: g.state, crashed: g.physics.crashed };
});
console.log(JSON.stringify({ mid, slam, rest, errors: errors.length }));
await browser.close(); srv.kill('SIGTERM');
