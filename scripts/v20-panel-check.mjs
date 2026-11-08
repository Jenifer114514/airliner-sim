/** v20 検証: AP⚙ 右下配置 / 開閉で右クラスタ表示切替 / ✕閉じる / 位置重複なし */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const PORT = 8182;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', ...(process.env.CHROME_EXTRA_ARGS ? process.env.CHROME_EXTRA_ARGS.split(' ') : [])] });
const page = await browser.newPage({ viewport: { width: 740, height: 390 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 140)); });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!(window.__airliner?.game), null, { timeout: 30000 });
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
// headless 起動が重い時は rAF poll が詰まるため手動ポーリング（fs-test と同方式）
{
  let up = false;
  for (let i = 0; i < 40 && !up; i++) {
    up = await page.evaluate(() => window.__airliner?.game?.state === 'flying' && getComputedStyle(document.getElementById('hud')).display !== 'none');
    if (!up) await page.waitForTimeout(500);
  }
  if (!up) throw new Error('flying HUD 起動待ちタイムアウト');
}
await page.waitForTimeout(800);
let fail = 0;
const ok = (name, cond, info) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${info ? '  ' + info : ''}`); if (!cond) fail++; };

const geo = await page.evaluate(() => {
  const R = (id) => { const el = document.getElementById(id); if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(innerWidth - r.right), bottom: Math.round(innerHeight - r.bottom) }; };
  const ov = (a, b) => a && b && Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const set = R('btn-ap-set');
  const cluster = R('btn-cluster');
  const rail = R('throttle-rail');
  const tap = (id) => document.getElementById(id).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  const open = () => getComputedStyle(document.getElementById('ap-panel')).display;
  const cls = () => getComputedStyle(document.getElementById('btn-cluster')).display;
  const hudCls = () => document.body.classList.contains('ap-settings');
  // ① 開く
  tap('btn-ap-set');
  const o1 = { panel: open(), cluster: cls(), hud: hudCls() };
  const panelRect = R('ap-panel');
  // ② ✕ で閉じる
  tap('ap-close');
  const c1 = { panel: open(), cluster: cls(), hud: hudCls() };
  // ③ AP⚙ 再タップで開→閉トグル
  tap('btn-ap-set');
  const o2 = open();
  tap('btn-ap-set');
  const c2 = open();
  const overlapNow = ov(set, cluster); // 閉じた状態での AP⚙⇔クラスタ重複
  return { vw: innerWidth, vh: innerHeight, set, cluster, rail, panelRect, o1, c1, o2, c2, overlapNow };
});
ok('①AP⚙ が右下隅', geo.set && geo.set.right <= 20 && geo.set.bottom <= 20, JSON.stringify(geo.set));
ok('①AP⚙ と throttle-rail 重複なし', geo.rail && geo.set && (geo.set.x + geo.set.w <= geo.rail.x + geo.rail.w + geo.rail.w * 0 || true) && geo.set.x >= geo.rail.x + geo.rail.w, `set.x=${geo.set?.x} rail.right=${(geo.rail?.x ?? 0) + (geo.rail?.w ?? 0)}`);
ok('②AP⚙⇔クラスタ（閉時）重複なし', geo.overlapNow === 0);
ok('③開: パネル表示・クラスタ非表示・hud クラス', geo.o1.panel === 'block' && geo.o1.cluster === 'none' && geo.o1.hud === true, JSON.stringify(geo.o1));
ok('④✕ で閉: 元通り', geo.c1.panel === 'none' && geo.c1.cluster === 'grid' && geo.c1.hud === false, JSON.stringify(geo.c1));
ok('⑤AP⚙ 再タップで開閉トグル', geo.o2 === 'block' && geo.c2 === 'none', `${geo.o2}/${geo.c2}`);
ok('⑥パネルが AP⚙ の上・右側に配置', geo.panelRect && geo.panelRect.right >= 0 && geo.panelRect.right <= 40 && geo.panelRect.y + geo.panelRect.h <= (geo.set?.y ?? 0) + 8, JSON.stringify(geo.panelRect));
console.log(errors.length ? `console errors(${errors.length}): ${errors.slice(0, 3).join(' | ')}` : 'errors 0');
if (errors.length) fail++;
await browser.close();
srv.kill('SIGTERM');
console.log(fail === 0 ? '>>> v20 CHECK ALL PASS' : `>>> v20 CHECK FAIL x${fail}`);
process.exit(fail === 0 ? 0 : 1);
