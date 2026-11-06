import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const srv = spawn('node', ['scripts/serve.mjs', '8099'], { cwd: '/home/user/airliner-sim', stdio: 'ignore' });
await new Promise(r => setTimeout(r, 900));
const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox','--use-gl=swiftshader'] });
const p = await b.newPage();
p.on('pageerror', e => console.log('PAGEERR', String(e).slice(0,200)));
await p.goto('http://127.0.0.1:8099/', { waitUntil: 'load' });
const out = await p.evaluate(async () => {
  const G = () => window.__airliner.game;
  for (let i=0;i<200 && !G(); i++) await new Promise(r=>setTimeout(r,100));
  const g = G();
  if (g.startFlight) {} // noop
  if (g.physics) { const v = g.player.group.position.clone(); v.set(0,1600,-2000); g.physics.resetAirborne(v, Math.PI, 130); g.physics.gearDown=false; g.physics.flapsDeg=0; g.state='flying'; }
  const t0 = performance.now();
  document.getElementById('btn-ap').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:91}));
  const afterSync = g.ap.engaged;
  const t1 = performance.now();
  await new Promise(r=>setTimeout(r,600));
  const after600 = g.ap.engaged;
  return { afterSync, after600, dt: Math.round(t1-t0), state: g.state };
});
console.log(JSON.stringify(out));
await b.close(); srv.kill('SIGTERM');
