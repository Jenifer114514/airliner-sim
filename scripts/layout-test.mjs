/**
 * scripts/layout-test.mjs — 操作ボタンと計器パネルの「重なり」自動検証
 *
 * iPhone 横画面の代表ビューポートで実ブラウザを起動し、飛行 UI の各要素の
 * getBoundingClientRect を取得して、衝突（矩形交差）を機械的に検出する。
 *
 * 検証ルール:
 *  - 以下の視覚要素どうしは矩形が一切交差してはならない
 *      hud-left / hud-right / hud-phase / throttle-rail / btn-cluster /
 *      btn-replay / flight-note
 *  - スティックのタッチ領域（stick-zone）は操作ボタン・スロットルに
 *    かかってはならない（誤タッチ防止）
 *  - 画面外へはみ出していないこと
 *
 * 実行: node scripts/layout-test.mjs
 */
import { chromium } from 'playwright-core';

const URL = process.env.AIRLINER_URL || 'http://127.0.0.1:8080/';

const VIEWPORTS = [
  { name: 'iPhone SE 横 (667x375)', width: 667, height: 375 },
  { name: 'iPhone 13/14 横 (844x390)', width: 844, height: 390 },
  { name: 'iPhone Pro Max 横 (932x430)', width: 932, height: 430 },
  { name: 'iPad 横 (1024x768)', width: 1024, height: 768 },
  { name: '極小 横 (640x320)', width: 640, height: 320 }
];

/** 互いに重なってはならない視覚要素（ID） */
const NO_OVERLAP = [
  'inst-panel',
  'throttle-rail', 'btn-cluster',
  'btn-replay', 'flight-note'
];

/** スティック領域に触れてはならない操作系要素（ID） */
const STICK_EXCLUSIVE = ['throttle-rail', 'btn-cluster', 'btn-replay'];

function intersects(a, b) {
  const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return x * y;
}

const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
let pass = 0;
let fail = 0;

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !!window.__airliner?.game, null, { timeout: 30000 });
  // 自由飛行を開始して HUD + タッチ UI を表示（開始ボタンは pointerdown で起動）
  await page.evaluate(() => {
    document.getElementById('btn-start')
      .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
  });
  await page.waitForTimeout(600);

  const rects = await page.evaluate((ids) => {
    const out = {};
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) { out[id] = null; continue; }
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      out[id] = {
        visible: cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0,
        left: r.left, top: r.top, right: r.right, bottom: r.bottom
      };
    }
    return out;
  }, [...NO_OVERLAP, 'stick-zone']);

  console.log(`\n=== ${vp.name} ===`);
  let vpFail = 0;

  // 1) 視覚要素どうしの重なり
  for (let i = 0; i < NO_OVERLAP.length; i++) {
    for (let j = i + 1; j < NO_OVERLAP.length; j++) {
      const A = rects[NO_OVERLAP[i]];
      const B = rects[NO_OVERLAP[j]];
      if (!A?.visible || !B?.visible) continue;
      const area = intersects(A, B);
      if (area > 4) {
        console.log(`  ✗ 重なり: #${NO_OVERLAP[i]} × #${NO_OVERLAP[j]} (${Math.round(area)} px²)`);
        vpFail++;
      }
    }
  }

  // 2) スティック領域 × 操作系
  const S = rects['stick-zone'];
  if (S?.visible) {
    for (const id of STICK_EXCLUSIVE) {
      const B = rects[id];
      if (!B?.visible) continue;
      const area = intersects(S, B);
      if (area > 4) {
        console.log(`  ✗ スティック領域が #${id} に接触 (${Math.round(area)} px²)`);
        vpFail++;
      }
    }
  }

  // 3) 画面外はみ出し
  for (const id of [...NO_OVERLAP, 'stick-zone']) {
    const R = rects[id];
    if (!R?.visible) continue;
    if (R.left < -1 || R.top < -1 || R.right > vp.width + 1 || R.bottom > vp.height + 1) {
      console.log(`  ✗ 画面外: #${id} (${Math.round(R.left)},${Math.round(R.top)})-(${Math.round(R.right)},${Math.round(R.bottom)}) vs ${vp.width}x${vp.height}`);
      vpFail++;
    }
  }

  // 参考: 主要素の矩形を表示
  for (const id of NO_OVERLAP) {
    const R = rects[id];
    if (R?.visible) {
      console.log(`    ${id}: (${Math.round(R.left)},${Math.round(R.top)})-(${Math.round(R.right)},${Math.round(R.bottom)})`);
    }
  }

  if (vpFail === 0) {
    console.log(`  PASS`);
    pass++;
  } else {
    console.log(`  FAIL (${vpFail} 件)`);
    fail++;
  }
  await page.close();
}

await browser.close();
console.log(`\nlayout-test: ${pass} PASS / ${fail} FAIL`);
process.exit(fail > 0 ? 1 : 0);
