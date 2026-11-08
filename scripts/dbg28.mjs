import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const srv = spawn('node', ['scripts/serve.mjs', '8197'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 700));
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium', args: ['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 844, height: 390 } });
page.on('pageerror', e => console.log('PAGEERR', String(e).slice(0,160)));
await page.goto('http://127.0.0.1:8197/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__airliner?.game, null, { timeout: 25000 });
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
for (let i=0;i<40;i++){ if (await page.evaluate(() => window.__airliner?.game?.state==='flying')) break; await page.waitForTimeout(400); }
const out = await page.evaluate(async () => {
  const G = () => window.__airliner.game;
  const g = G();
  if (g.physics) { const v = g.player.group.position.clone(); v.set(0, 1600, -2000); g.physics.resetAirborne(v, Math.PI, 130); g.physics.gearDown = false; g.physics.flapsDeg = 0; g.state = 'flying'; }
  const tap = (id) => document.getElementById(id).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 91 }));
  for (let i = 0; i < 4 && G().ap.engaged; i++) { tap('ap-master'); await new Promise(r=>setTimeout(r,300)); }
  tap('ap-master');
  let engaged = G().ap.engaged;
  const altBefore = G().ap.altTarget;
  let stripVisible = false, stripText = '';
  for (let i = 0; i < 40; i++) {
    const el = document.getElementById('ap-strip');
    stripVisible = getComputedStyle(el).display !== 'none';
    stripText = el.textContent || '';
    if (stripVisible && /AP/.test(stripText)) break;
    await new Promise((res) => setTimeout(res, 300));
  }
  tap('btn-ap-set');
  await new Promise(r=>setTimeout(r,300));
  const panelOpen = getComputedStyle(document.getElementById('ap-panel')).display === 'block';
  for (let i = 0; i < 3; i++) tap('ap-alt-up');
  await new Promise(r=>setTimeout(r,300));
  const altAfter = G().ap.altTarget;
  tap('ap-master');
  await new Promise(r=>setTimeout(r,300));
  const disengaged = !G().ap.engaged;
  return { engaged, stripVisible, stripHasAP: /AP/.test(stripText), panelOpen, altGain: altAfter - altBefore, disengaged };
});
console.log(JSON.stringify(out));
await browser.close(); srv.kill('SIGTERM'); process.exit(0);
