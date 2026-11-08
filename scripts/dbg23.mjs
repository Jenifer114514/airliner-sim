import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const srv = spawn('node', ['scripts/serve.mjs', '8191'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 700));
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium', args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-vsync','--disable-frame-rate-limit','--disable-background-timer-throttling','--disable-renderer-backgrounding'] });
const page = await browser.newPage({ viewport: { width: 900, height: 420 } });
page.on('pageerror', e => console.log('PAGEERR', String(e).slice(0,200)));
await page.goto('http://127.0.0.1:8191/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__airliner?.game, null, { timeout: 30000 });
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
for (let i=0;i<40;i++){ if (await page.evaluate(() => window.__airliner?.game?.state==='flying')) break; await page.waitForTimeout(500); }
const out = await page.evaluate(async () => {
  const G = () => window.__airliner.game;
  const g = G();
  if (g.physics) { const v = g.player.group.position.clone(); v.set(0, 1600, -2000); g.physics.resetAirborne(v, Math.PI, 130); g.physics.gearDown = false; g.physics.flapsDeg = 0; g.state = 'flying'; }
  const tap = (id) => document.getElementById(id).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  tap('ap-master');
  let strip = 'none';
  for (let i = 0; i < 20; i++) { await new Promise(r => setTimeout(r, 250)); if (getComputedStyle(document.getElementById('ap-strip')).display !== 'none') { strip = 'shown'; break; } }
  return { engaged: G().ap.engaged, strip, txt: (document.getElementById('ap-strip-txt').textContent||'').slice(0,30) };
});
console.log(JSON.stringify(out));
await browser.close(); srv.kill('SIGTERM'); process.exit(0);
