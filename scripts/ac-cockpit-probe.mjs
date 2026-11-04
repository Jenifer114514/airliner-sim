import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8149;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 640, height: 400 } });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2000);
await page.evaluate(() => { document.querySelectorAll('#mode-chips .chip')[1]?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
await delay(250);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await delay(1500);
await page.evaluate(() => window.__airliner.game.demo.seek(62));
await delay(800);
const r = await page.evaluate(() => {
  const THREE = window.__airliner.THREE;
  const game = window.__airliner.game;
  // cockpit モードへ
  for (let i = 0; i < 6 && String(game.rig.mode) !== 'cockpit'; i++) game.cycleCamera(1);
  const cam = window.__airliner.camera;
  const g = game.player.group;
  const local = g.worldToLocal(cam.position.clone());
  const hits = [];
  if (THREE) {
    const rc = new THREE.Raycaster();
    for (const [sx, sy] of [[0, 0], [0, 0.35], [-0.5, 0], [0.5, 0], [0, -0.4]]) {
      rc.setFromCamera(new THREE.Vector2(sx, sy), cam);
      const its = rc.intersectObjects([g, game.scene], true).slice(0, 2);
      hits.push([sx, sy, its.map(o => `${o.object.name || o.object.type}@${o.distance.toFixed(1)}m geo=${o.object.geometry?.parameters?.type ?? ''} vis=${o.object.visible}`).join(' | ') || 'EMPTY']);
    }
  }
  const cock = game.cockpit;
  return {
    mode: String(game.rig.mode), near: cam.near, far: cam.far, fov: cam.fov,
    camPos: [cam.position.x, cam.position.y, cam.position.z].map(v => v.toFixed(1)),
    planePos: [g.position.x, g.position.y, g.position.z].map(v => v.toFixed(1)),
    camInFuselage: [local.x.toFixed(2), local.y.toFixed(2), local.z.toFixed(2)],
    cockpitExists: !!cock, cockpitVisible: cock ? cock.group.visible : null,
    cockpitChildren: cock ? cock.group.children.length : -1,
    size: game.playerSpec.fuselageLength, span: game.playerSpec.wingspan,
    hits
  };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
try { server.kill(); } catch {}
