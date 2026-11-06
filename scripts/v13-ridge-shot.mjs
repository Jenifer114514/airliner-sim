/**
 * scripts/v13-ridge-shot.mjs — A-1~A-4（稜線強化パッケージ）の before/after 比較用ショット
 * ページ内で山岳部を探索し、同一機位から 2 枚撮る（決め打ちの座標依存を回避）。
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

const TAG = process.env.TAG || 'pre';
const PORT = Number(process.env.PORT || 8155);
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || undefined,
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log('PAGE ERROR:', String(e).slice(0, 200)));
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(800);

const spot = await page.evaluate(() => {
  const th = window.__airliner.terrainHeight;
  let bx = 0, bz = 0, bh = -1e9;
  for (let x = -19000; x <= 19000; x += 650) {
    for (let z = -19000; z <= 19000; z += 650) {
      const h = th(x, z);
      if (h > bh) { bh = h; bx = x; bz = z; }
    }
  }
  return { x: bx, z: bz, h: Math.round(bh) };
});
// SPOT="-13150,10900" 指定時は before/after で同一機位を強制（ヒルサイド検索のぶれ防止）
if (process.env.SPOT) {
  const [fx, fz] = process.env.SPOT.split(',').map(Number);
  spot.x = fx; spot.z = fz;
  spot.h = await page.evaluate(([x, z]) => Math.round(window.__airliner.terrainHeight(x, z)), [fx, fz]);
}
console.log('summit:', JSON.stringify(spot));

const pose = async (tm, ox, oz, altOff, spd) => {
  await page.evaluate(([t, p]) => {
    const g = window.__airliner.game;
    g.applyEnvironment(t, 'clear', 'calm');
    const v = { x: p.x, y: p.y, z: p.z };
    g.physics.resetAirborne(v, p.hdg, p.spd);
    g.physics.gearDown = false;
    g.physics.flapsDeg = 0;
    g.state = 'flying';
  }, [tm, {
    x: spot.x + ox, y: spot.h + altOff, z: spot.z + oz,
    hdg: Math.atan2(spot.x - (spot.x + ox), spot.z - (spot.z + oz)), spd
  }]);
  await page.waitForTimeout(2800);
};
const shot = async (n) => {
  const t0 = Date.now();
  await page.screenshot({ path: `screenshots/v13/${n}.png`, timeout: 240000 });
  console.log(`shot ${n} ok (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
};

import { mkdirSync } from 'node:fs';
mkdirSync('screenshots/v13', { recursive: true });
// 南東 4.2km から黄昏の低角度光で山稚へ（立体感が最も出るアングル）
await pose(16.7, 4200, 4200, 620, 105);
await shot(`${TAG}-ridge-low`);
// 真北 7km・高度+1500 の遠景俯瞰
await pose(11.2, 0, -7000, 1500, 120);
await shot(`${TAG}-ridge-high`);
await browser.close();
srv.kill('SIGTERM');
console.log('V13 SHOT DONE');
