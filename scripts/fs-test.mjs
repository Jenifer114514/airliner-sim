/**
 * scripts/fs-test.mjs — 全画面トグル（Fullscreen API）の実挙動検証
 * 期待: tap→fullscreenElement=#app & ラベル「解除」→再tap→解除 & ラベル「全画面」。JS error 0。
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

const PORT = 8151;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || undefined,
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage({ viewport: { width: 800, height: 480 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e).slice(0, 160)));
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
// メニュー画面では HUD 非表示 → 離陸して touch-ui を出す
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(1000);

const btn = () => page.evaluate(() => {
  const el = document.getElementById('btn-fs');
  return {
    fs: !!document.fullscreenElement,
    fsId: document.fullscreenElement?.id ?? null,
    label: (el.textContent || '').trim(),
    on: el.classList.contains('on')
  };
});
// 全画面には「実ユーザージェスチャ」が必要（合成 dispatchEvent は transient activation を与えない）
const tapFs = async () => {
  const r = await page.evaluate(() => {
    const b = document.getElementById('btn-fs').getBoundingClientRect();
    return [b.x + b.width / 2, b.y + b.height / 2];
  });
  await page.mouse.click(r[0], r[1]);
};

let pass = 0, fail = 0;
const check = (name, ok, detail = '') => { ok ? pass++ : fail++; console.log(`  ${ok ? 'PASS' : 'FAIL'} ${name} ${detail}`); };

const s0 = await btn();
check('初期: 全画面でない・ラベル全画面', !s0.fs && s0.label.includes('全画面') && !s0.on, JSON.stringify(s0));
await tapFs();
await page.waitForTimeout(700);
const s1 = await btn();
check('トグル1: fullscreenElement=#app', s1.fs && s1.fsId === 'app', JSON.stringify(s1));
check('トグル1: ラベル解除+.on', s1.label.includes('解除') && s1.on, JSON.stringify(s1));
// fullscreen 状態でキャンバスがビューポート全域か
const geo = await page.evaluate(() => {
  const c = document.getElementById('game-canvas').getBoundingClientRect();
  return { w: Math.round(c.width), h: Math.round(c.height), iw: innerWidth, ih: innerHeight };
});
check('fullscreen: canvas >= 95% viewport', geo.w >= geo.iw * 0.95 && geo.h >= geo.ih * 0.95, JSON.stringify(geo));
await page.screenshot({ path: 'screenshots/v3/fs-on.png', timeout: 240000 });
await tapFs();
await page.waitForTimeout(700);
const s2 = await btn();
check('トグル2: 解除される', !s2.fs && s2.label.includes('全画面') && !s2.on, JSON.stringify(s2));
check('JS エラー 0 件', errs.length === 0, errs.join('|'));
console.log(`\n=== fs-test: ${pass} PASS / ${fail} FAIL ===`);
await browser.close();
srv.kill('SIGTERM');
process.exit(fail ? 1 : 0);
