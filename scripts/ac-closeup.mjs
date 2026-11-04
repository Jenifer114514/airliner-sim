/**
 * scripts/ac-closeup.mjs — 機体クローズアップ撮影（グラフィック改訂の視覚検証）
 * 巡航フェーズでカメラを直接プレイヤー機に被せ、4 角度から撮影する。
 * 実行: CHROME_BIN=/usr/bin/chromium node scripts/ac-closeup.mjs
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const PORT = 8143;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(700);
const SHOT = root + 'screenshots/v2/';
await mkdir(SHOT, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN || undefined,
  headless: true,
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage({ viewport: { width: 900, height: 540 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

console.log('起動 → デモ飛行・巡航へ');
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2500);
// HUD/パネルを隠して機体専用に
await page.evaluate(() => {
  const st = document.createElement('style');
  st.textContent = 'body *{visibility:hidden!important} #game-canvas,#game-canvas *{visibility:visible!important}';
  document.head.appendChild(st);
});
await page.evaluate(() => {
  document.querySelectorAll('#mode-chips .chip')[1].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await delay(300);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await delay(2000);
await page.evaluate(() => { window.__airliner.game.demo.seek(62); window.__airliner.game.cycleCamera(1); });
await delay(1500);

// カメラ追従: rig.update を乗っ取り、毎フレーム（game 描画前）で機体相対に置く
await page.evaluate(() => {
  const w = window;
  const game = w.__airliner.game, cam = w.__airliner.camera;
  game.__off = [40, 6, 34];
  game.rig.snap = () => {};
  game.rig.update = function () {
    const g = game.player.group;
    const o = game.__off;
    cam.position.set(o[0], o[1], o[2]).applyQuaternion(g.quaternion).add(g.position);
    cam.up.set(0, 1, 0);
    cam.lookAt(g.position.x, g.position.y + 1, g.position.z + 2);
    if (cam.near > 1) { cam.near = 0.8; cam.far = Math.max(cam.far, 40000); cam.updateProjectionMatrix(); }
  };
  w.__setOff = (a) => { game.__off = a; };
});

async function shoot(name) {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.screenshot({ path: SHOT + name, timeout: 180000 });
  console.log('  shot', name);
}

const SIZE = 74; // 巡航撮影は B777 基準で距離を取る
const go = async (off) => { await page.evaluate((o) => window.__setOff(o), off); await delay(900); };
console.log('1) 前脚・右側面（胴体文字/窓/ラドーム）');
await go([SIZE * 0.72, SIZE * 0.10, SIZE * 0.62]);
await shoot('closeup-side-R.png');

console.log('2) 左斜め前下方（エンジン/脚/翼下面）');
await go([-SIZE * 0.55, -SIZE * 0.12, SIZE * 0.75]);
await shoot('closeup-front-low.png');

console.log('3) 後方左斜め上（尾翼 liveried/シャークレット/APU）');
await go([-SIZE * 0.62, SIZE * 0.28, -SIZE * 0.62]);
await shoot('closeup-rear-top.png');

console.log('4) 真横近接（ノーズ 1/3、テクスチャ解像度確認）');
await go([SIZE * 0.60 * 0.55, SIZE * 0.02 * 0.55, SIZE * 0.16 * 0.55]);
await shoot('closeup-nose.png');

await browser.close();
server.kill();
console.log(errors.length ? 'ERRORS:\n' + errors.slice(0, 6).join('\n') : 'closeup done — JS errors: 0');
process.exit(errors.length ? 1 : 0);
