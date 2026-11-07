/**
 * scripts/v16-city-shot.mjs — v16（worker/Atlas/Chunk LOD）検証: 市街日を昼/黄昏で撮影
 *  usage: TAG=base|v16 node scripts/v16-city-shot.mjs   （cwd=リポジトリルート）
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const TAG = process.env.TAG || 'base';
const PORT = Number(process.env.PORT || 8163);
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log('PAGE ERROR:', String(e).slice(0, 200)));
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(1000);

mkdirSync('screenshots/v16', { recursive: true });

// 衝突体フィンガープリント（レイアウト決定論の回帰基準）
const fp = await page.evaluate(() => {
  const c = window.__airliner.buildingColliders || [];
  let h = 0;
  const arr = c.length ? c : [];
  for (const b of arr) h = (h + Math.round((b.x * 7 + b.z * 13 + b.top * 3 + b.r * 17) * 100)) | 0;
  return { n: arr.length, h };
});
console.log('colliders FP:', JSON.stringify(fp));
writeFileSync(`screenshots/v16/fp-${TAG}.json`, JSON.stringify(fp));

const T = { x: 7800, z: -3200 }; // 市街中心
const cam = await page.evaluate(() => Math.round(window.__airliner.terrainHeight(7800, -1200)));
const pose = async (tm, ox, oz, altOff) => {
  await page.evaluate(([t, m, p]) => {
    const g = window.__airliner.game;
    g.applyEnvironment(t, 'clear', 'calm');
    g.physics.resetAirborne({ x: p.x, y: p.y, z: p.z }, Math.atan2(7800 - p.x, -1200 - p.z), 90);
    g.physics.gearDown = false; g.physics.flapsDeg = 0; g.state = 'flying';
  }, [tm, cam, { x: T.x + ox, y: cam + altOff, z: -1200 + oz }]);
  await page.waitForTimeout(2600);
};
await page.evaluate(() => { window.__airliner.game.player.group.visible = false; });
await pose(12.5, -5200, 4600, 900);
await page.screenshot({ path: `screenshots/v16/${TAG}-city-day.png`, timeout: 240000 });
console.log(`${TAG}-city-day ok (h=${cam})`);
await pose(18.6, -4600, 4200, 700);
await page.screenshot({ path: `screenshots/v16/${TAG}-city-dusk.png`, timeout: 240000 });
console.log(`${TAG}-city-dusk ok`);
await browser.close();
srv.kill('SIGTERM');
