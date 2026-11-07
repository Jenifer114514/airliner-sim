/** v16 近接検証: 市街近景（アトラス窓）+ 空港滑走路（worker テクスチャ） */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const TAG = process.env.TAG || 'v16';
const PORT = Number(process.env.PORT || 8165);
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log('PAGE ERROR:', String(e).slice(0, 200)));
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(1000);
mkdirSync('screenshots/v16', { recursive: true });
await page.evaluate(() => { window.__airliner.game.player.group.visible = false; });
const pose = async (tm, x, z, alt, heading) => {
  const cam = await page.evaluate(([xx, zz]) => Math.round(window.__airliner.terrainHeight(xx, zz)), [x, z]);
  await page.evaluate(([t, xx, yy, zz, hd]) => {
    const g = window.__airliner.game;
    g.applyEnvironment(t, 'clear', 'calm');
    g.physics.resetAirborne({ x: xx, y: yy, z: zz }, hd, 80);
    g.physics.gearDown = false; g.physics.flapsDeg = 0; g.state = 'flying';
  }, [tm, x, cam + alt, z, heading]);
  await page.waitForTimeout(2600);
};
await pose(12.5, 6500, -2150, 240, Math.atan2(7800 - 6500, -3200 + 2150));
await page.screenshot({ path: `screenshots/v16/${TAG}-close-city.png`, timeout: 240000 });
console.log('close-city ok');
const ap = await page.evaluate(() => { const a = window.__airliner.game.airportGroups[0]; return { x: a.position.x, z: a.position.z, y: a.position.y }; });
await pose(12.8, ap.x - 1200, ap.z - 2600, 320, Math.atan2(7800 - ap.x, -3200 - ap.z));
await page.waitForTimeout(2200);
await page.screenshot({ path: `screenshots/v16/${TAG}-close-airport.png`, timeout: 240000 });
console.log('close-airport ok');
await browser.close();
srv.kill('SIGTERM');
