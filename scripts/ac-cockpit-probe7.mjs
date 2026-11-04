import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8155;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 960, height: 600 }, deviceScaleFactor: 2 });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(1800);
await page.evaluate(() => {
  const st = document.createElement('style');
  st.textContent = 'body *{visibility:hidden!important} #game-canvas,#game-canvas *{visibility:visible!important}';
  document.head.appendChild(st);
});
await page.evaluate(() => { document.querySelectorAll('#mode-chips .chip')[1]?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
await delay(200);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await delay(1200);
await page.evaluate(() => window.__airliner.game.demo.seek(62));
await delay(700);
const r = await page.evaluate(async () => {
  const A = window.__airliner, game = A.game;
  for (let i = 0; i < 6 && String(game.rig.mode) !== 'cockpit'; i++) game.cycleCamera(1);
  const s = game.lastDemoState;
  const pose = { position: s.position, quaternion: s.quaternion, velocity: s.velocity, size: game.playerSpec.fuselageLength };
  for (let k = 0; k < 12; k++) game.rig.update(0.1, pose);
  const cam = A.camera;
  const Vf = cam.position.constructor;
  const cf = new Vf(0, 0, -1).applyQuaternion(cam.quaternion);   // camera forward (world)
  const pf = new Vf(0, 0, 1).applyQuaternion(game.player.group.quaternion); // plane nose (world)
  const dot = +cf.dot(pf).toFixed(3);
  // fuselage material side
  let fus = null;
  game.player.group.children.forEach(c => { if (c.isMesh && c.geometry?.type === 'LatheGeometry') fus = { side: c.material.side, transparent: c.material.transparent, opacity: c.material.opacity }; });
  const out = { cf: [cf.x, cf.y, cf.z].map(v => +v.toFixed(2)), pf: [pf.x, pf.y, pf.z].map(v => +v.toFixed(2)), dot, fus };
  // ショット1: 現在（cockpit group 有）
  game.updateWorld(1); A.renderer.render(A.scene, cam);
  await new Promise(res => requestAnimationFrame(() => res()));
  return out;
});
await page.screenshot({ path: root + '/screenshots/v7/seat-A.png', timeout: 180000 });
console.log(JSON.stringify(r));
// ショット2: fuselage を隠して前方視界（コクピット内装のみ）
await page.evaluate(() => {
  const game = window.__airliner.game;
  game.player.group.children.forEach(c => { if (c.isMesh && c.geometry?.type === 'LatheGeometry') c.visible = false; });
  window.__airliner.renderer.render(window.__airliner.scene, window.__airliner.camera);
});
await page.screenshot({ path: root + '/screenshots/v7/seat-B-nofus.png', timeout: 180000 });
console.log('shots done');
await browser.close();
try { server.kill(); } catch {}
