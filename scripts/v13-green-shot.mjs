/**
 * scripts/v13-green-shot.mjs — A-2/A-3 効果確認: 緑の中高度急斜面（雪線下）を同一機位で撮影
 *  usage: TAG=pre|post node scripts/v13-green-shot.mjs
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const TAG = process.env.TAG || 'post';
const PORT = Number(process.env.PORT || 8156);
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

mkdirSync('screenshots/v13', { recursive: true });
const T = { x: -13500, z: 15500 }; // 目標（斜面の険しい地点）
const cam = await page.evaluate(([t]) => Math.round(window.__airliner.terrainHeight(t.x, t.z)), [T]);
const pose = async (tm, ox, oz, altOff, spd) => {
  await page.evaluate(([t, m, p]) => {
    const g = window.__airliner.game;
    g.applyEnvironment(t, 'clear', 'calm');
    const v = { x: p.x, y: p.y, z: p.z };
    g.physics.resetAirborne(v, p.hdg, p.spd);
    g.physics.gearDown = false;
    g.physics.flapsDeg = 0;
    g.state = 'flying';
  }, [tm, cam, {
    x: T.x + ox, y: cam + altOff, z: T.z + oz,
    hdg: Math.atan2(T.x - (T.x + ox), T.z - (T.z + oz)), spd
  }]);
  await page.waitForTimeout(2800);
};
// 機体を隠して「追いかけカメラ目線の平地画面」にする（写り込み防止）
await page.evaluate(() => { window.__airliner.game.player.group.visible = false; });
// 南東 3.9km・斜面+1200・低斜光（溝と地層の陰影を見る）
await pose(16.2, 3900, -3900, 1200, 95);
await page.waitForTimeout(600);
await page.screenshot({ path: `screenshots/v13/${TAG}-green-low.png`, timeout: 240000 });
console.log(`${TAG}-green-low done (targetH=${cam})`);
await browser.close();
srv.kill('SIGTERM');
