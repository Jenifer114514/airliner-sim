import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8152;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
const SHOT = root + '/screenshots/v7/';
await mkdir(SHOT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 960, height: 600 }, deviceScaleFactor: 2 });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2000);
await page.evaluate(() => {
  const st = document.createElement('style');
  st.textContent = 'body *{visibility:hidden!important} #game-canvas,#game-canvas *{visibility:visible!important}';
  document.head.appendChild(st);
});
await page.evaluate(() => { document.querySelectorAll('#mode-chips .chip')[1]?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
await delay(250);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await delay(1500);
await page.evaluate(() => window.__airliner.game.demo.seek(62));
await delay(800);
const r = await page.evaluate(() => {
  const game = window.__airliner.game;
  for (let i = 0; i < 6 && String(game.rig.mode) !== 'cockpit'; i++) game.cycleCamera(1);
  // 手動ステップで blend を完走させる（pose は現在の機体から構築）
  const s = game.lastDemoState ?? { position: game.player.group.position, quaternion: game.player.group.quaternion, velocity: new (game.player.group.position.constructor)(0, 0, 0) };
  const pose = { position: s.position, quaternion: s.quaternion, velocity: s.velocity ?? s.position.clone().set(0,0,0), size: game.playerSpec.fuselageLength };
  for (let k = 0; k < 12; k++) game.rig.update(0.1, pose);
  game.updateWorld(1.0);
  return {
    mode: String(game.rig.mode), blending: game.rig.blending, blendT: +game.rig.blendT.toFixed(2),
    near: game.camera.near, fov: +game.camera.fov.toFixed(1),
    camLocal: game.player.group.worldToLocal(game.camera.position.clone()).toArray().map(v => +v.toFixed(2))
  };
});
console.log(JSON.stringify(r));
await page.screenshot({ path: SHOT + 'cockpit-forced.png', timeout: 180000 });
console.log('shot ok');
await browser.close();
try { server.kill(); } catch {}
