import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8146;
const root = '/home/user/airliner-sim';
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(600);
const SHOT = root + '/screenshots/v3/';
await mkdir(SHOT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 900, height: 500 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2500);

async function shot(n) {
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r()))));
  await page.screenshot({ path: SHOT + n, timeout: 240000 });
  console.log(' shot', n);
}
// 画質 high（bloom 既定 ON）でデモ飛行
await page.evaluate(() => {
  document.querySelectorAll('#mode-chips .chip')[1].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(250);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await delay(2500);

const scenes = JSON.parse(process.env.SCENES || '[]');
for (const [name, time, tsec] of scenes) {
  await page.evaluate(([tm, ts]) => {
    window.__airliner.game.applyEnvironment(tm, 'clear', 'calm');
    window.__airliner.game.demo.seek(ts);
  }, [time, tsec]);
  await delay(1200);
  await shot(name + '.png');
}
const perf = await page.evaluate(() => ({ fps: Math.round(window.__airliner.game.quality.getFps()), state: window.__airliner.game.state }));
console.log('perf:', JSON.stringify(perf));
await browser.close(); server.kill();
console.log(errors.length ? 'ERRORS:\n' + errors.slice(0,5).join('\n') : 'QC done — JS errors: 0');
process.exit(errors.length ? 1 : 0);
