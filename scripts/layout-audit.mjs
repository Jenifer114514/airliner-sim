/**
 * scripts/layout-audit.mjs — 飛行 UI 全要素の矩形を採取し「全ペアの重なり」を監査する
 * layout-test.mjs（合格判定）とは別に、重なりの実体を列挙して原因特定に使う。
 * 実行: node scripts/layout-audit.mjs [viewport幅x高 ...]
 */
import { chromium } from 'playwright-core';

const URL = process.env.AIRLINER_URL || 'http://127.0.0.1:8080/';

const VIEWPORTS = (process.argv.slice(2).length
  ? process.argv.slice(2).map((s) => {
      const [w, h] = s.split('x').map(Number);
      return { name: `${w}x${h}`, width: w, height: h };
    })
  : [
      { name: 'iPhone SE 横 (667x375)', width: 667, height: 375 },
      { name: 'iPhone 13/14 横 (844x390)', width: 844, height: 390 },
      { name: 'iPhone 15 Pro Max 横 (932x430)', width: 932, height: 430 },
      { name: 'iPhone 縦 (390x844)', width: 390, height: 844 },
      { name: 'iPad 横 (1024x768)', width: 1024, height: 768 },
      { name: '極小 横 (640x320)', width: 640, height: 320 }
    ]
);

/** 安全エリア（iPhone 横画面の実機相当: 左右 47px / 下 21px）を注入して検証 */
const SAFE = { top: 0, right: 47, bottom: 21, left: 47 };

const SELECTORS = [
  'inst-panel', 'sop-banner', 'stick-zone', 'stick-visual', 'flight-note',
  'throttle-rail', 'throttle-knob', 'throttle-label',
  'btn-cluster', 'cam-name', 'bottom-left',
  'btn-flap-up', 'btn-yaw-l', 'btn-yaw-r', 'btn-flap-dn', 'btn-brake',
  'btn-gear', 'btn-spoiler', 'btn-camera', 'btn-pause', 'btn-sound', 'btn-inst',
  'btn-view-prev', 'btn-replay'
];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  // env(safe-area-inset-*) をエミュレート（Playwright には直接 API が無いので CSS 変数で上書き）
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  // env(safe-area-inset-*) は headless で 0 になるため、実機相当値を CSS 変数で再現する。
  // index.html 側は全位置を --sa-* 変数から導出しているので、変数の上書きだけで実機と等価になる。
  await page.addStyleTag({
    content: `:root{
      --sa-t:${SAFE.top}px; --sa-r:${SAFE.right}px; --sa-b:${SAFE.bottom}px; --sa-l:${SAFE.left}px;
    }`
  });
  await page.waitForFunction(() => !!window.__airliner?.game, null, { timeout: 30000 });
  await page.evaluate(() => {
    document.getElementById('btn-start')
      .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
  });
  await page.waitForTimeout(500);
  // SOP バナーを表示状態にして高さを含めて監査
  await page.evaluate(() => {
    const b = document.getElementById('sop-banner');
    b.textContent = '50 FT — フレア 2.5-3.0° / POSITIVE RATE — GEAR UP（最長ケース）';
    b.classList.add('show');
  });
  await page.waitForTimeout(120);

  const rects = await page.evaluate((ids) => {
    const out = {};
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) { out[id] = null; continue; }
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      out[id] = {
        left: +r.left.toFixed(1), top: +r.top.toFixed(1),
        right: +r.right.toFixed(1), bottom: +r.bottom.toFixed(1),
        w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        display: cs.display, visibility: cs.visibility, opacity: cs.opacity,
        z: cs.zIndex, pe: cs.pointerEvents
      };
    }
    return out;
  }, SELECTORS);

  console.log(`\n===== ${vp.name}  (safe-area L${SAFE.left}/R${SAFE.right}/B${SAFE.bottom}) =====`);
  const visible = Object.entries(rects).filter(([, r]) => r && r.w > 1 && r.h > 1 && r.display !== 'none');
  for (const [id, r] of visible) {
    console.log(`  ${id.padEnd(15)} x[${String(r.left).padStart(6)}..${String(r.right).padStart(6)}] y[${String(r.top).padStart(6)}..${String(r.bottom).padStart(6)}] ${String(r.w).padStart(6)}x${String(r.h).padEnd(6)} z=${r.z}`);
  }
  // 全ペアの交差面積
  const overlap = [];
  const benign = [];
  for (let i = 0; i < visible.length; i++) {
    for (let j = i + 1; j < visible.length; j++) {
      const [ia, a] = visible[i];
      const [ib, b] = visible[j];
      // 双方 pointer-events:none の非操作レイヤー同士の重なりは意図的（許容）:
      // flight-note（自動フェードのヒント）/ sop-banner / stick-visual（固定スティック円）など。
      if (a.pe === 'none' && b.pe === 'none') { benign.push(`${ia} × ${ib}`); continue; }
      // 親子（包含）は「重なり」では無い → 完全包含は除外
      const aInB = a.left >= b.left - 0.5 && a.right <= b.right + 0.5 && a.top >= b.top - 0.5 && a.bottom <= b.bottom + 0.5;
      const bInA = b.left >= a.left - 0.5 && b.right <= a.right + 0.5 && b.top >= a.top - 0.5 && b.bottom <= a.bottom + 0.5;
      if (aInB || bInA) continue;
      const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ox > 0.5 && oy > 0.5) overlap.push({ pair: `${ia} × ${ib}`, ox: +ox.toFixed(1), oy: +oy.toFixed(1), area: +(ox * oy).toFixed(0) });
    }
  }
  overlap.sort((p, q) => q.area - p.area);
  if (benign.length) console.log(`  → 意図的オーバーレイ（非操作層同士・許容）: ${benign.join(', ')}`);
  if (!overlap.length) console.log('  → 重なり 0 件');
  else {
    console.log(`  → 重なり ${overlap.length} 件:`);
    for (const o of overlap) console.log(`     ${o.pair.padEnd(38)} 交差 ${String(o.ox).padStart(6)} x ${String(o.oy).padStart(6)} px  (面積 ${o.area})`);
  }
  // 画面外はみ出し
  const off = visible.filter(([, r]) => r.left < -0.5 || r.top < -0.5 || r.right > vp.width + 0.5 || r.bottom > vp.height + 0.5);
  if (off.length) console.log('  → 画面外: ' + off.map(([id]) => id).join(', '));
  await page.close();
}

await browser.close();
