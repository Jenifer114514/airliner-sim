/**
 * scripts/v16-metrics.mjs — worker プライム計測 + チャンク LOD/カリング統計
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

const PORT = Number(process.env.PORT || 8164);
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const logs = [];
page.on('console', (m) => { if (/prime|worker|error/i.test(m.text())) logs.push(m.text().slice(0, 160)); });
page.on('pageerror', (e) => logs.push('PAGE ERROR: ' + String(e).slice(0, 200)));
const t0 = Date.now();
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.__airliner && window.__airliner.game, null, { timeout: 60000 });
const bootMs = Date.now() - t0;
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(1200);

const stats = await page.evaluate(() => {
  const g = window.__airliner.game;
  const scene = window.__airliner.scene;
  let buckets = 0, vis = 0, inst = 0;
  scene.traverse((o) => {
    if (o.isInstancedMesh && o.name !== 'beacons' && !o.name.startsWith('ap')) {
      if (o.visible) vis++;
      inst += o.count || 0;
    }
  });
  buckets = vis;
  const info = window.__airliner.renderer.info.render;
  return {
    visInstMeshes: vis, totalInst: inst,
    calls: info.calls, tris: info.triangles,
    camY: Math.round(window.__airliner.camera.position.y)
  };
});
// 飛行視点（市街上空）での calls
await page.evaluate(() => {
  const g = window.__airliner.game;
  const cam = Math.round(window.__airliner.terrainHeight(7800, -1200));
  g.applyEnvironment(12.5, 'clear', 'calm');
  g.physics.resetAirborne({ x: 2600, y: cam + 900, z: 3400 }, Math.atan2(7800 - 2600, -1200 - 3400), 90);
  g.physics.gearDown = false; g.state = 'flying';
});
await page.waitForTimeout(2400);
const flight = await page.evaluate(() => {
  const info = window.__airliner.renderer.info.render;
  return { calls: info.calls, tris: info.triangles };
});
console.log(JSON.stringify({ bootMs, ...stats, flight, logs }, null, 1));
await browser.close();
srv.kill('SIGTERM');
