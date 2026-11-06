import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const PORT = 8152;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 800));
const b = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 800, height: 480 } });
await p.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(1000);
const dump = async (tag) => console.log(tag, JSON.stringify(await p.evaluate(() => {
  const el = document.getElementById('btn-fs');
  const tu = document.getElementById('touch-ui');
  const r = el?.getBoundingClientRect();
  return {
    exists: !!el, rect: r ? [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] : null,
    tuDisplay: tu ? getComputedStyle(tu).display : 'no touch-ui',
    state: window.__airliner?.game?.state ?? (document.getElementById('btn-start') ? 'menu' : '?')
  };
})));
await dump('menu');
await p.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await p.waitForTimeout(1500);
await dump('after-start');
await b.close(); srv.kill('SIGTERM');
