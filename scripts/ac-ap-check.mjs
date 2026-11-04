import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8145;
const root = '/home/user/airliner-sim';
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(600);
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 700, height: 420 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.log('PAGEERR', e.message));
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2500);
await page.evaluate(() => {
  document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(2000);
const r = await page.evaluate(async () => {
  const g = window.__airliner.game;
  {
    const v = g.player.group.position.clone();
    v.set(0, 1600, -2000);
    g.physics.resetAirborne(v, Math.PI, 130);
    g.physics.gearDown = false; g.physics.flapsDeg = 0;
    g.state = 'flying';
    g.updateFlight(1 / 60, null); g.updateFlight(1 / 60, null);
  }
  const tap = () => document.getElementById('btn-ap').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 91 }));
  const snap = () => {
    const t = g.physics.telemetry();
    return { e: g.ap.engaged, og: t.onGround ? 1 : 0, alt: Math.round(t.alt), cr: g.physics.crashed ? 1 : 0, fm: g.flightMode };
  };
  const out = ['pre:' + JSON.stringify(snap())];
  tap();
  out.push('t0:' + JSON.stringify(snap()));
  for (let i = 1; i <= 6; i++) { await new Promise((res) => setTimeout(res, 400)); out.push('t' + i + ':' + JSON.stringify(snap())); }
  return out;
});
console.log(r.join('\n'));
await browser.close(); server.kill();
