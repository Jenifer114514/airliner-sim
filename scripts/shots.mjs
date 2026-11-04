/**
 * scripts/shots.mjs — グラフィック/カメラ/デモ飛行のスクリーンショット検証
 * 各ステップで game.state / フェーズをアサーションし、描画完了を待ってから撮影する。
 * 実行: node scripts/shots.mjs [quality]
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const PORT = 8141;
const QUALITY = process.argv[2] || 'high';
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(700);
const SHOT = root + 'screenshots/';
await mkdir(SHOT, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage({ viewport: { width: 844, height: 390 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

const state = () => page.evaluate(() => ({
  state: window.__airliner.game.state,
  cam: window.__airliner.game.cameraName(),
  phase: window.__airliner.game.getDemoState()?.phase ?? null
}));

async function shoot(name) {
  // 描画安定のため複数フレーム待つ
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.screenshot({ path: SHOT + name, timeout: 180000 });
  console.log(`  shot ${name}  state=${JSON.stringify(await state())}`);
}

console.log('1) メニュー表示');
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2500);
await shoot('01-menu.png');

// B777 プレビュー
await page.evaluate(() => {
  document.querySelectorAll('#aircraft-cards .card')[2]
    .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(1500);
await shoot('02-menu-b777.png');

// デモ飛行モードを選択（自動操縦で世界を見せる）
await page.evaluate(() => {
  document.querySelectorAll('#mode-chips .chip')[1]
    .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(300);

// 画質指定（撮影は low でも可。high で美観確認）— id マッチ（ultra 追加でインデックス依存は不可に）
if (QUALITY !== 'high') {
  await page.evaluate((q) => {
    const chips = [...document.querySelectorAll('#quality-chips .chip')];
    const label = { ultra: '画質: 最高', medium: '画質: 中', low: '画質: 低' }[q];
    const el = chips.find((c) => c.textContent.indexOf(label) === 0) || chips[1];
    el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  }, QUALITY);
  await delay(300);
}

console.log('2) デモ飛行開始');
await page.evaluate(() => {
  document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(2500);
const s1 = await state();
if (s1.state !== 'flying') errors.push('START 後も state != flying: ' + JSON.stringify(s1));
await shoot('03-takeoff-roll.png');

console.log('3) 各フェーズをシークして撮影');
await page.evaluate(() => window.__airliner.game.demo.seek(17));
await delay(1800);
await shoot('04-rotate.png');

await page.evaluate(() => window.__airliner.game.demo.seek(32));
await delay(1800);
await shoot('05-climb-chase.png');

await page.evaluate(() => window.__airliner.game.demo.seek(62));
await delay(1200);
await page.evaluate(() => window.__airliner.game.cycleCamera(1)); // cockpit
await delay(1500);
await shoot('06-cruise-cockpit.png');

await page.evaluate(() => {
  window.__airliner.game.cycleCamera(1); // wing
  window.__airliner.game.cycleCamera(1); // orbit
});
await delay(1500);
await shoot('07-cruise-orbit.png');

await page.evaluate(() => {
  window.__airliner.game.cycleCamera(1); // landing
  window.__airliner.game.cycleCamera(1); // cockpit
  window.__airliner.game.cycleCamera(1); // chase
});
await delay(1500);
await shoot('08-cruise-chase.png');

await page.evaluate(() => {
  window.__airliner.game.demo.seek(109);
  window.__airliner.game.cycleCamera(1); // wing→landing: 次が landing
  window.__airliner.game.cycleCamera(1);
});
await delay(1500);
await shoot('09-approach.png');

await page.evaluate(() => window.__airliner.game.demo.seek(115.6));
await delay(1500);
await shoot('10-touchdown.png');

await page.evaluate(() => window.__airliner.game.demo.seek(117.4));
await delay(1500);
await shoot('11-rollout.png');

await browser.close();
server.kill();
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'shots done — JS errors: 0');
process.exit(errors.length ? 1 : 0);
