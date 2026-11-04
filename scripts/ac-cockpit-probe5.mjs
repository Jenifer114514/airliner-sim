import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8153;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
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
  const A = window.__airliner, game = A.game;
  for (let i = 0; i < 6 && String(game.rig.mode) !== 'cockpit'; i++) game.cycleCamera(1);
  const s = game.lastDemoState;
  const pose = { position: s.position, quaternion: s.quaternion, velocity: s.velocity, size: game.playerSpec.fuselageLength };
  for (let k = 0; k < 12; k++) game.rig.update(0.1, pose);
  game.updateWorld(1.0);
  A.renderer.render(A.scene, A.camera);
  // コックピットグループの実体検査
  const boxes = [];
  game.cockpit.group.traverse(o => {
    if (o.isMesh) {
      o.geometry.computeBoundingBox();
      const b = o.geometry.boundingBox;
      boxes.push({ v: o.visible, mat: o.material.type, min: [b.min.x, b.min.y, b.min.z].map(n => +n.toFixed(1)), max: [b.max.x, b.max.y, b.max.z].map(n => +n.toFixed(1)) });
    }
  });
  const camL = game.player.group.worldToLocal(game.camera.position.clone()).toArray().map(v => +v.toFixed(2));
  // cockpit group の機体ローカル位置
  const cgL = game.player.group.worldToLocal(game.cockpit.group.getWorldPosition(new (game.camera.position.constructor)())).toArray().map(v => +v.toFixed(2));
  return { camLocal: camL, cockpitGroupLocal: cgL, meshes: boxes, near: game.camera.near };
});
console.log(JSON.stringify(r).slice(0, 1600));
await page.screenshot({ path: root + '/screenshots/v7/cockpit-rendered.png', timeout: 180000 });
console.log('shot done');
await browser.close();
try { server.kill(); } catch {}
