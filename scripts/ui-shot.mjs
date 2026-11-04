/**
 * scripts/ui-shot.mjs — 飛行中 UI・環境表現のスクリーンショット（レイアウト目視確認用）
 * 実行: node scripts/ui-shot.mjs
 */
import { chromium } from 'playwright-core';

const URL = process.env.AIRLINER_URL || 'http://127.0.0.1:8080/';
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 844, height: 390 },
  deviceScaleFactor: 2
});
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__airliner?.game, null, { timeout: 30000 });
await page.evaluate(() => {
  document.getElementById('btn-start')
    .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
});
// 描画安定待ち（SwiftShader 低速のため長め）
await page.waitForTimeout(3500);
await page.screenshot({ path: 'screenshots/ui-layout.png' });
console.log('saved screenshots/ui-layout.png');

// 夕焼け・強風
await page.evaluate(() => {
  window.__airliner.game.applyEnvironment('sunset', 'clear', 'strong');
});
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/env-sunset.png' });
console.log('saved screenshots/env-sunset.png');

// 夜・雨
await page.evaluate(() => {
  window.__airliner.game.applyEnvironment('night', 'rain', 'breeze');
});
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/env-night-rain.png' });
console.log('saved screenshots/env-night-rain.png');

console.log('JS errors:', errors.length, errors.slice(0, 2).join(' | '));
await browser.close();
