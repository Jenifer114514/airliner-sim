/**
 * scripts/v12-city-shot.mjs — v12 配置/影の視覚 QC
 *  1) day-street : AGL~360 で市街上空を低速通過（格子街路×建物整列×街路樹）
 *  2) sunset-shadow : 黄昏・機体正面光で影の引き伸ばし+斜面追従を見る
 *  3) cockpit-street : コクピット視で沿道の流れ（両視点の自然さ）
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

const PORT = 8147;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || undefined,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox', '--disable-gpu-sandbox']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log('PAGE ERROR:', String(e).slice(0, 200)));
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(800);

const shot = async (n) => {
  const t0 = Date.now();
  await page.screenshot({ path: `screenshots/v3/${n}.png`, timeout: 240000 });
  console.log(`shot ${n} ok (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
};
const fly = async (tm, x, y, z, hdg, spd) => {
  await page.evaluate(([t, p]) => {
    const g = window.__airliner.game;
    g.applyEnvironment(t, 'clear', 'calm');
    const v = { x: p[0], y: p[1], z: p[2] };
    g.physics.resetAirborne(v, p[3], p[4]);
    g.physics.gearDown = false;
    g.physics.flapsDeg = 0;
    g.state = 'flying';
  }, [tm, [x, y, z, hdg, spd]]);
  await page.waitForTimeout(2600);
};

// 機首=+Z・heading は rotY（数学角）。目標への向き = atan2(dx, dz)
const CXc = 7800, CZc = -3200;
const hdgTo = (x, z) => Math.atan2(CXc - x, CZc - z);
await fly(11.0, 1450, 380, -9000, hdgTo(1450, -9000), 95);
await shot('v12-day-street');
await fly(17.3, 13500, 260, 300, hdgTo(13500, 300), 88);
await shot('v12-sunset-shadow');
// コクピット視点へ cycleCamera で到達
await page.evaluate(async () => {
  const g = window.__airliner.game;
  for (let i = 0; i < 6 && g.cameraName() !== 'cockpit'; i++) g.cycleCamera(1);
});
await fly(17.3, 12900, 300, -1200, hdgTo(12900, -1200), 88);
await shot('v12-cockpit-street');

const diag = await page.evaluate(() => ({
  game: !!window.__airliner?.game,
  roads: window.__airliner?.game?.scene?.getObjectByName('roads') ? true : false,
  village: !!window.__airliner?.game?.scene?.getObjectByName('village')
}));
console.log('diag:', JSON.stringify(diag));
await browser.close();
srv.kill('SIGTERM');
console.log('V12 SHOTS DONE');
