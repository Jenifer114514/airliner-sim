/** v21 検証: 再スタート廃止 / AP⚙=クラスタ最右下（同サイズ）/ 開時は AP 以外 visibility 隐藏 / ✕ で閉 */
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
  const R = (id) => { const el = document.getElementById(id); if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(innerWidth - r.right), bottom: Math.round(innerHeight - r.bottom), vis: getComputedStyle(el).visibility }; };
  const ov = (a, b) => a && b && Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const tap = (id) => document.getElementById(id).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  const set = R('btn-ap-set');
  const sound = R('btn-sound');
  const cam = R('btn-camera');
  const cluster = R('btn-cluster');
  const rail = R('throttle-rail');
  const inst = R('inst-panel');
  const replayGone = !document.getElementById('btn-replay');
  // 3×4 判定: セル座標から列/行を集計
  const ids = ['btn-flap-up','btn-yaw-l','btn-yaw-r','btn-flap-dn','btn-brake','btn-gear','btn-spoiler','btn-camera','btn-pause','btn-sound','btn-inst','btn-ap-set'];
  const rects = ids.map(i => R(i));
  const cols = new Set(rects.map(r => r.x)); const rows = new Set(rects.map(r => r.y));
  // 開く
  tap('btn-ap-set');
  const openState = { panel: getComputedStyle(document.getElementById('ap-panel')).display, camVis: R('btn-camera').vis, apVis: R('btn-ap-set').vis, setPos: R('btn-ap-set') };
  const panelRect = R('ap-panel');
  tap('ap-close');
  const closed = getComputedStyle(document.getElementById('ap-panel')).display;
  return { vw: innerWidth, vh: innerHeight, set, sound, cam, cluster, rail, inst, replayGone, cols: cols.size, rows: rows.size, apRow: set.y, apRight: set.right, openState, panelRect, closed, ovSetRail: ov(set, rail), ovPanelInst: ov(panelRect, inst), ovPanelSet: Math.max(0, Math.min(panelRect.y + panelRect.h, set.y + set.h) - panelRect.y - 0) * Math.max(0, Math.min(panelRect.x + panelRect.w, set.x + set.w) - Math.max(panelRect.x, set.x)) };
});
ok('①再スタートボタン削除', geo.replayGone);
ok('②AP⚙ が他と同じセルサイズ', geo.set.w === geo.sound.w && geo.set.h === geo.sound.h, JSON.stringify({ ap: [geo.set.w, geo.set.h], other: [geo.sound.w, geo.sound.h] }));
ok('③ボタン群が 横3×縦4', geo.cols === 3 && geo.rows === 4, `cols=${geo.cols} rows=${geo.rows}`);
ok('④AP⚙ は最下行の右端（画面右下隅）', geo.set.bottom <= 12 && geo.set.x + geo.set.w >= geo.cluster.x + geo.cluster.w - 2 && geo.set.y + geo.set.h >= geo.cluster.y + geo.cluster.h - 2, `bottom=${geo.set.bottom} right=${geo.apRight}`);
ok('⑤AP⚙⇔throttle-rail 重複なし', geo.ovSetRail === 0);
ok('⑥開: パネル表示・AP 以外 hidden・AP は押せる位置不変', geo.openState.panel === 'block' && geo.openState.camVis === 'hidden' && geo.openState.apVis === 'visible', JSON.stringify(geo.openState.openState ?? geo.openState));
ok('⑦✕ で閉じる', geo.closed === 'none');
ok('⑧パネルが計器帯と重複せず AP 行の上に収まる', geo.ovPanelInst === 0 && geo.panelRect.y + geo.panelRect.h <= geo.set.y + 4, `panel=${JSON.stringify(geo.panelRect)} apY=${geo.set.y}`);
console.log(errors.length ? `console errors(${errors.length}): ${errors.slice(0, 3).join(' | ')}` : 'errors 0');
if (errors.length) fail++;
await browser.close();
srv.kill('SIGTERM');
console.log(fail === 0 ? '>>> v21 CHECK ALL PASS' : `>>> v21 CHECK FAIL x${fail}`);
process.exit(fail === 0 ? 0 : 1);
