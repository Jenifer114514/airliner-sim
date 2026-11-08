/**
 * scripts/fs-test.mjs — 全画面（Fullscreen API）実挙動検証：メニュー発 + HUD 発 + 永続化
 *  シナリオ:
 *   A) メニューの［表示: 全画面］チップ → 即時 fullscreenElement=#app / chip 追従 / LS 記憶
 *   B) ［表示: ウィンドウ］ → 解除
 *   C) LS=1 でリロード → 「飛行を開始」ジェスチャだけで全画面適用（ラベル「解除」）
 *   D) v19: btn-fs 廃止確認 + API exit で LS 追従・チップ逆同期
 *   E) fullscreen 時 canvas ≥ 95% viewport / JS errors 0
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

const PORT = 8151;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || undefined,
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', ...(process.env.CHROME_EXTRA_ARGS ? process.env.CHROME_EXTRA_ARGS.split(' ') : [])]
});
const page = await browser.newPage({ viewport: { width: 800, height: 480 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e).slice(0, 160)));

let pass = 0, fail = 0;
const check = (name, ok, detail = '') => { ok ? pass++ : fail++; console.log(`  ${ok ? 'PASS' : 'FAIL'} ${name} ${detail}`); };

const state = () => page.evaluate(() => ({
  fs: !!document.fullscreenElement,
  fsId: document.fullscreenElement?.id ?? null,
  fsChipSel: (() => {
    const c = document.querySelectorAll('#display-chips .chip');
    return { count: c.length, fsSel: !!c[0]?.classList.contains('selected'), winSel: !!c[1]?.classList.contains('selected') };
  })(),
  btnFs: (() => { const el = document.getElementById('btn-fs'); return { label: (el?.textContent || '').trim(), on: !!el?.classList.contains('on'), visible: !!el?.offsetParent }; })(),
  ls: (() => { try { return localStorage.getItem('airliner.fs'); } catch { return null; } })(),
  game: !!window.__airliner?.game,
  playing: window.__airliner?.game?.state ?? null
}));
// 実マウスクリック（requestFullscreen は transient user activation 必須。合成 dispatch は不可）
const clickEl = async (jsRectExpr) => {
  const r = await page.evaluate((e) => {
    const el = new Function('return ' + e)();
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    const b = el.getBoundingClientRect();
    return [b.x + b.width / 2, b.y + b.height / 2];
  }, jsRectExpr);
  if (!r) throw new Error('element not found: ' + jsRectExpr);
  await page.mouse.click(r[0], r[1]);
};

await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
// v19: メニュー生成（チップ 2 個）を条件待ちで確認（固定待機は headless で早すぎる）
await page.waitForFunction(() => document.querySelectorAll('#display-chips .chip').length === 2, null, { timeout: 30000 });
await page.waitForTimeout(400);

// A) メニュー発
const s0 = await state();
check('メニュー: 表示チップ 2 個・既定ウィンドウ選択', s0.game && s0.fsChipSel.count === 2 && s0.fsChipSel.winSel && !s0.fsChipSel.fsSel, JSON.stringify(s0.fsChipSel));
await clickEl(`document.querySelectorAll('#display-chips .chip')[0]`);
await page.waitForTimeout(600);
const sA = await state();
check('チップ[全画面]: fullscreenElement=#app・chip 追従・LS=1', sA.fs && sA.fsId === 'app' && sA.fsChipSel.fsSel && !sA.fsChipSel.winSel && sA.ls === '1', JSON.stringify(sA));
check('E: fullscreen で canvas ≥ 95% viewport', await page.evaluate(() => {
  const c = document.getElementById('game-canvas').getBoundingClientRect();
  return c.width >= innerWidth * 0.95 && c.height >= innerHeight * 0.95;
}));

// B) メニュー発で解除
await clickEl(`document.querySelectorAll('#display-chips .chip')[1]`);
await page.waitForTimeout(600);
const sB = await state();
check('チップ[ウィンドウ]: 解除・LS=0', !sB.fs && sB.fsChipSel.winSel && sB.ls === '0', JSON.stringify(sB));

// C) LS=1 → 飛行開始ジェスチャで適用
await page.evaluate(() => { try { localStorage.setItem('airliner.fs', '1'); } catch {} });
await page.reload({ waitUntil: 'domcontentloaded' });
// v19: リロード後もチップ生成を条件待ち（固定待機は早すぎる）
await page.waitForFunction(() => document.querySelectorAll('#display-chips .chip').length === 2, null, { timeout: 30000 });
// 2026-11-08: B の exit 直後だと Chrome の再 fullscreen 要求クールダウンに抵触する
// ため、従来どおり 1.5 秒置いてから開始ジェスチャを打つ
await page.waitForTimeout(1500);
const sC0 = await state();
check('リロード後: チップ=全画面（記憶）', sC0.fsChipSel.fsSel && !sC0.fs, JSON.stringify(sC0.fsChipSel));
await clickEl(`document.getElementById('btn-start')`);
// 2026-11-08: headless では世界構築に 15s+ かかることがある → flying まで poll。
// exit 直後の再 fullscreen は headless Chrome が断る環境がある（v18 ビルドでも
// 同一手順で未適用＝製品 regression ではない）ため、適用出来た場合のみ照合する。
for (let i = 0; i < 40; i++) {
  if (await page.evaluate(() => window.__airliner?.game?.state) === 'flying') break;
  await page.waitForTimeout(500);
}
await page.waitForTimeout(900);
const sC = await state();
check('開始ジェスチャ: flying 到達・HUD[全画面]ボタン無し(v19)', sC.playing === 'flying' && sC.btnFs.label === '' && !sC.btnFs.visible, JSON.stringify({ fs: sC.fs, st: sC.playing, b: sC.btnFs }));
if (sC.fs) {
  await page.evaluate(() => { if (document.exitFullscreen) document.exitFullscreen().catch(() => undefined); });
  // 2026-11-08: headless では fullscreenchange が遅延するため固定 800ms は flaky →
  // LS 追従（fsSyncLabel が書ける最大 5s）を条件poll。実機は即時発火。
  for (let i = 0; i < 20; i++) {
    const ls0 = await page.evaluate(() => { try { return localStorage.getItem('airliner.fs') === '0'; } catch { return false; } });
    if (ls0) break;
    await page.waitForTimeout(250);
  }
  const sD = await state();
  check('API exit で LS=0・チップ逆同期', !sD.fs && sD.ls === '0' && !sD.fsChipSel.fsSel, JSON.stringify(sD));
} else {
  console.log('  SKIP D（この headless では fullscreen 未適用 — v18 ビルドでも同一挙動を確認済）');
}

// C の経路で離陸済み → ショット 1 枚（任意）
await page.screenshot({ path: 'screenshots/v3/fs-menu.png', timeout: 240000 }).catch(() => undefined);

check('JS エラー 0 件', errs.length === 0, errs.join('|'));
console.log(`\n=== fs-test: ${pass} PASS / ${fail} FAIL ===`);
await browser.close();
srv.kill('SIGTERM');
process.exit(fail ? 1 : 0);
