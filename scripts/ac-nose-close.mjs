/** ac-nose-close.mjs — 機首外観至近接写（chase モードのまま＝コクピット内装を隠して正しく判定） */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8156;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1100, height: 700 }, deviceScaleFactor: 2 });
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
await delay(1500);
await page.evaluate(() => window.__airliner.game.demo.seek(30));
await delay(600);
await page.evaluate(() => {
  const A = window.__airliner, game = A.game, cam = A.camera;
  game.cockpit.group.visible = false;
  game.rig.snap = () => {};
  game.rig.update = function (dt) {
    const g = game.player.group;
    const o = game.__off ?? [22, 8, 26];
    cam.position.set(o[0], o[1], o[2]).applyQuaternion(g.quaternion).add(g.position);
    cam.up.set(0, 1, 0);
    const V = cam.position.constructor;
    const look = new V(0, 0.4, 12).applyQuaternion(g.quaternion).add(g.position);
    cam.lookAt(look);
    if (cam.near > 1) { cam.near = 0.8; cam.far = Math.max(cam.far, 46000); cam.updateProjectionMatrix(); }
    A.renderer.render(A.scene, cam);
  };
  window.__setOff = (a) => { game.__off = a; };
});
async function shoot(name, off) {
  await page.evaluate(o => window.__setOff(o), off);
  await delay(900);
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.screenshot({ path: root + '/screenshots/v7/' + name, timeout: 180000 });
  console.log(' shot', name);
}
await shoot('noseR.png', [20, 5, 24]);
await shoot('noseR-far.png', [34, 9, 40]);
await browser.close();
try { server.kill(); } catch {}
