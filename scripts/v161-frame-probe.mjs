import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const PORT = 8179;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!(window.__airliner?.game), null, { timeout: 30000 });
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(1200);
await page.evaluate(() => {
  const g = window.__airliner.game;
  window.__gt = 0;
  const gt0 = g.getTelemetry.bind(g);
  g.getTelemetry = () => { window.__gt++; return gt0(); };
  window.__raf = 0;
  const raf0 = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => { window.__raf++; return raf0(cb); };
});
await page.waitForTimeout(3000);
const r = await page.evaluate(() => ({ gt: window.__gt, raf: window.__raf, state: window.__airliner.game.state, fps: window.__airliner.game.quality.getFps() }));
console.log(JSON.stringify(r));
await browser.close(); srv.kill('SIGTERM');
