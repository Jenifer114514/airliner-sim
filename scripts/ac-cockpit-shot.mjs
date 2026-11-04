/** ac-cockpit-shot.mjs — コックピットビュー+機首外観クローズアップ（表示異常の再現撮影） */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8148;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
const SHOT = root + '/screenshots/v7/';
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
await page.evaluate(() => window.__airliner.game.demo.seek(62));
await delay(1000);
async function shoot(name) {
  await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
  await page.screenshot({ path: SHOT + name, timeout: 180000 });
  console.log(' shot', name);
}
// 1) コックピットビュー（cycleCamera は chase→cockpit の順のはず。2回トライして mode 表示付きで撮る）
const mode0 = await page.evaluate(() => window.__airliner.game.cameraModeName?.() ?? String(window.__airliner.game.rig?.mode));
console.log(' mode now:', mode0);
for (let i = 0; i < 6; i++) {
  const m = await page.evaluate(() => String(window.__airliner.game.rig.mode));
  if (m === 'cockpit') break;
  await page.evaluate(() => window.__airliner.game.cycleCamera(1));
  await delay(350);
}
await delay(600);
await shoot('cockpit-cruise.png');
// 2) 機首外観（左前方・正面寄りを rig 乗っ取りで）
await page.evaluate(() => {
  const game = window.__airliner.game, cam = window.__airliner.camera;
  game.__off = [-26, 7, 30];
  game.rig.snap = () => {};
  game.rig.update = function () {
    const g = game.player.group, o = game.__off;
    cam.position.set(o[0], o[1], o[2]).applyQuaternion(g.quaternion).add(g.position);
    cam.up.set(0, 1, 0);
    const v = new (Object.getPrototypeOf(cam.position).constructor)(0, 1.6, 20).applyQuaternion(g.quaternion).add(g.position);
    cam.lookAt(v);
    if (cam.near > 1) { cam.near = 0.8; cam.far = Math.max(cam.far, 46000); cam.updateProjectionMatrix(); }
  };
  w3 = window; w3.__setNose = (a) => { game.__off = a; };
});
await delay(700);
await shoot('nose-frontleft.png');
await page.evaluate(() => window.__setNose([6, 3, 34]));
await delay(700);
await shoot('nose-front.png');
console.log('errors', errs.slice(0, 3));
await browser.close();
try { server.kill(); } catch {}
