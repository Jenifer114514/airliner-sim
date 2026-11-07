import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const PORT = 8180;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!(window.__airliner?.game), null, { timeout: 30000 });
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(600);
await page.evaluate(() => {
  const g = window.__airliner.game;
  g.physics.resetAirborne({ x: 2000, y: 3000, z: -6000 }, 0.6, 90);
  g.physics.velocity.y = -9; g.physics.throttle = 0.3; g.physics.gearDown = false;
  const uf = g.updateFlight.bind(g);
  g.updateFlight = (dt, c) => { g.physics.velocity.y = -9; uf(dt, c); }; // 降下率維持（tick 内で）
});
await page.waitForTimeout(16000);
console.log('MID RESULT:', JSON.stringify(await page.evaluate(() => {
  const g = window.__airliner.game; const t = g.physics.telemetry();
  return { crashed: g.physics.crashed, agl: Math.round(t.agl), vspeed: Math.round(t.vspeed * 10) / 10 };
})));
await browser.close(); srv.kill('SIGTERM');
