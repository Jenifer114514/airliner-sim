import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8154;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 640, height: 400 } });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(1800);
await page.evaluate(() => { document.querySelectorAll('#mode-chips .chip')[1]?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
await delay(200);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await delay(1200);
const r = await page.evaluate(() => {
  const game = window.__airliner.game;
  const g = game.player.group;
  const rows = [];
  game.cockpit.group.children.forEach(c => {
    const wp = c.getWorldPosition(new (c.position.constructor)());
    const lp = g.worldToLocal(wp.clone());
    rows.push({ name: c.name || c.type, local: [+lp.x.toFixed(2), +lp.y.toFixed(2), +lp.z.toFixed(2)] });
  });
  // buildCockpit 内部のグループ位置も（panel は sub-group かも）
  return { rows, camSeatNote: 'plane local coords, +Z=nose' };
});
console.log(JSON.stringify(r, null, 0).slice(0, 2000));
await browser.close();
try { server.kill(); } catch {}
