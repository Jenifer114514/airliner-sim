/** ac-wing-view.mjs — 三人称(後方)・左右後方からの機体スクショ: 翼の二重見せ検証 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8147;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
const SHOT = root + '/screenshots/v6/';
await mkdir(SHOT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 960, height: 600 }, deviceScaleFactor: 2 });
const errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2200);
await page.evaluate(() => {
  const st = document.createElement('style');
  st.textContent = 'body *{visibility:hidden!important} #game-canvas,#game-canvas *{visibility:visible!important}';
  document.head.appendChild(st);
});
await page.evaluate(() => { document.querySelectorAll('#mode-chips .chip')[1]?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
await delay(250);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await delay(1500);
await page.evaluate(() => { window.__airliner.game.demo.seek(40); });
await delay(1200);
// カメラ乗っ取り（closeup と同一手法）: roll は機体に追従させず水平の“後方から見た三人称”も比較
await page.evaluate(() => {
  const game = window.__airliner.game, cam = window.__airliner.camera;
  game.__off = [0, 10, -60]; game.__rollFollow = false;
  game.rig.snap = () => {};
  game.rig.update = function () {
    const g = game.player.group, o = game.__off;
    cam.position.set(o[0], o[1], o[2]).applyQuaternion(g.quaternion).add(g.position);
    if (game.__rollFollow) cam.up.set(0,1,0).applyQuaternion(g.quaternion);
    else cam.up.set(0,1,0);
    const look = new (Object.getPrototypeOf(cam.position).constructor)(0, 0, 12).applyQuaternion(g.quaternion).add(g.position);
    cam.lookAt(look);
    if (cam.near > 1) { cam.near = 0.8; cam.far = Math.max(cam.far, 46000); cam.updateProjectionMatrix(); }
  };
  w2 = window; w2.__set = (a, rf) => { game.__off = a; game.__rollFollow = !!rf; };
});
async function shoot(name, off, rf) {
  await page.evaluate(([o, r]) => window.__set(o, r), [off, rf]);
  await delay(700);
  await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
  await page.screenshot({ path: SHOT + name, timeout: 180000 });
  console.log(' shot', name);
}
await shoot('rear-level.png', [0, 10, -60], false);
await shoot('rear-follow.png', [0, 10, -60], true);
await shoot('rearleft.png', [-34, 14, -44], true);
console.log('errors', errs.slice(0,3));
await browser.close();
try { server.kill(); } catch {}
