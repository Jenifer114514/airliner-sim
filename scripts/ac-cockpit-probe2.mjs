import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8150;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 960, height: 600 }, deviceScaleFactor: 2 });
const errs = [];
page.on('pageerror', e => errs.push('PE:' + e.message));
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2000);
await page.evaluate(() => { document.querySelectorAll('#mode-chips .chip')[1]?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
await delay(250);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await delay(1500);
await page.evaluate(() => window.__airliner.game.demo.seek(62));
await delay(800);
// cockpit へ（非同期に1フレームずつ進める）
for (let i = 0; i < 6; i++) {
  const m = await page.evaluate(() => String(window.__airliner.game.rig.mode));
  if (m === 'cockpit') break;
  await page.evaluate(() => window.__airliner.game.cycleCamera(1));
  await delay(500);
}
await delay(1200);
const r = await page.evaluate(async () => {
  const game = window.__airliner.game, cam = window.__airliner.camera;
  const g = game.player.group;
  const local = g.worldToLocal(cam.position.clone());
  const THREE = cam.constructor.prototype; // dummy
  // 子可視性
  const vis = [];
  game.cockpit.group.traverse(o => { if (o.isMesh) vis.push([o.visible, !!o.material]); });
  // 前方中心レイ: camera matrixWorld から +Z forward を手計算
  cam.updateMatrixWorld();
  const f = new cam.position.constructor(0, 0, -1).applyQuaternion(cam.quaternion);
  const samples = [];
  for (const d of [0.3, 0.6, 1, 2, 5, 12, 30]) {
    const p = cam.position.clone().addScaledVector(f, d);
    const lp = g.worldToLocal(p.clone());
    samples.push([d, `(${lp.x.toFixed(1)},${lp.y.toFixed(1)},${lp.z.toFixed(1)})`]);
  }
  return {
    mode: String(game.rig.mode), near: cam.near, far: cam.far, fov: cam.fov.toFixed(1),
    camLocal: [local.x.toFixed(2), local.y.toFixed(2), local.z.toFixed(2)],
    blending: game.rig.blending, blendT: game.rig.blendT,
    meshesVisible: vis.filter(v => v[0]).length, meshesTotal: vis.length,
    forwardWorldPosOnPlane: samples
  };
});
console.log(JSON.stringify(r, null, 1));
await page.screenshot({ path: root + '/screenshots/v7/cockpit-after-blend.png', timeout: 180000 });
console.log('errors', errs.slice(0, 3));
await browser.close();
try { server.kill(); } catch {}
