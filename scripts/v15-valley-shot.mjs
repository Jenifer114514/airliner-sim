/**
 * scripts/v15-valley-shot.mjs — v15-B 侵食ベイク効果確認: 最深掘削谷を同一機位で撮影
 *  usage: TAG=pre|post node scripts/v15-valley-shot.mjs
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const TAG = process.env.TAG || 'post';
const PORT = Number(process.env.PORT || 8161);
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
const T = { x: Number(process.env.TX ?? -19206), z: Number(process.env.TZ ?? 13442) }; // 既定=ベイク最深掘削点
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
await page.evaluate(() => { window.__airliner.game.player.group.visible = false; });
// 谷軸に斜めから: 遠景（V 谷列+扇状地）と近景（掘削断面+ティルト明暗）
await pose(16.4, 4400, -4400, 1600, 95);
await page.waitForTimeout(600);
await page.screenshot({ path: `screenshots/v13/${TAG}-valley-wide.png`, timeout: 240000 });
console.log(`${TAG}-valley-wide done (targetH=${cam})`);
await pose(16.4, 1500, -1500, 520, 90);
await page.waitForTimeout(600);
await page.screenshot({ path: `screenshots/v13/${TAG}-valley-near.png`, timeout: 240000 });
console.log(`${TAG}-valley-near done`);
await browser.close();
srv.kill('SIGTERM');
