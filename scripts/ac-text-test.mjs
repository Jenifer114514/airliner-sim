import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8144;
const root = '/home/user/airliner-sim';
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(600);
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 860, height: 460 }, deviceScaleFactor: 2 });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2200);
await page.evaluate(() => { const st=document.createElement('style'); st.textContent='body *{visibility:hidden!important} #game-canvas,#game-canvas *{visibility:visible!important}'; document.head.appendChild(st); });
await page.evaluate(() => { document.querySelectorAll('#mode-chips .chip')[1].dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})); });
await delay(200);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})));
await delay(1800);
await page.evaluate(() => {
  window.__airliner.game.demo.seek(62);
  const game = window.__airliner.game, cam = window.__airliner.camera;
  game.__off = [0,0,0];
  game.rig.snap = () => {};
  game.rig.update = function () {
    const g = game.player.group;
    g.quaternion.identity(); // 水平姿勢に強制（見た目のみ）
    const o = game.__off;
    cam.position.set(o[0], o[1], o[2]).add(g.position);
    cam.up.set(0,1,0); cam.lookAt(g.position.x, g.position.y, g.position.z);
    cam.near = 0.8; cam.updateProjectionMatrix();
  };
});
for (const [name, off] of [['right', [52, 1.5, 4]], ['left', [-52, 1.5, 4]]]) {
  await page.evaluate((o) => { window.__airliner.game.__off = o; }, off);
  await delay(900);
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.screenshot({ path: `/tmp/ac-text-${name}.png`, timeout: 180000 });
  console.log('shot', name);
}
await browser.close(); server.kill(); console.log('done');
