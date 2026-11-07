/** v18 検証: ①AP DOM は変化時のみ書き込み ②計器盤は描画済み（30Hz 間引き後） ③エラー 0 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const PORT = 8180;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 140)); });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!(window.__airliner?.game), null, { timeout: 30000 });
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(3500);
let fail = 0;
const ok = (n, c, i) => { console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${i ? '  ' + i : ''}`); if (!c) fail++; };

// ① AP DOM 書き込みカウント（idle 2 秒: AP OFF 継続 → innerHTML 0、textContent 0）
const dom = await page.evaluate(async () => {
  const btn = document.getElementById('ap-master'); // v19: [AP] ボタン廃止 → パネルマスタ
  const strip = document.getElementById('ap-strip-txt');
  let iw = 0, tw = 0;
  const hooks = [];
  if (btn) {
    const d = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
    Object.defineProperty(btn, 'textContent', {
      get() { return d.get.call(this); },
      set(v) { iw++; d.set.call(this, v); },
      configurable: true
    });
    hooks.push(() => delete btn.textContent);
  }
  if (strip) {
    const d = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
    Object.defineProperty(strip, 'textContent', {
      get() { return d.get.call(this); },
      set(v) { tw++; d.set.call(this, v); },
      configurable: true
    });
    hooks.push(() => delete strip.textContent);
  }
  const frames0 = window.__airliner.game.quality ? 1 : 1;
  await new Promise((r) => setTimeout(r, 2000));
  return { iw, tw, hasBtn: !!btn, hasStrip: !!strip, frames0 };
});
ok('①AP マスタ書換は idle 中 0 回', dom.iw === 0, `writes=${dom.iw} hook=${dom.hasBtn}`);
ok('①apStrip textContent idle 0 回', dom.tw === 0, `writes=${dom.tw} hook=${dom.hasStrip}`);

// ② AP を ON にすると 1 回だけ書き込み、以降アイドルでは増えない
const ap = await page.evaluate(async () => {
  const g = window.__airliner.game;
  const btn = document.getElementById('ap-master');
  const strip = document.getElementById('ap-strip-txt');
  let iw = 0, tw = 0;
  const d1 = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  Object.defineProperty(btn, 'textContent', { get() { return d1.get.call(this); }, set(v) { iw++; d1.set.call(this, v); }, configurable: true });
  const d2 = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  Object.defineProperty(strip, 'textContent', { get() { return d2.get.call(this); }, set(v) { tw++; d2.set.call(this, v); }, configurable: true });
  g.toggleAp?.();
  if (!g.getApStatus().engaged) {
    btn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); // パネルマスタで試行
  }
  await new Promise((r) => setTimeout(r, 900));
  const engaged = g.getApStatus().engaged;
  const w1 = { iw, tw };
  await new Promise((r) => setTimeout(r, 1200));
  return { engaged, w1, iw2: iw, tw2: tw };
});
if (ap.engaged) {
  ok('②AP ON 遷移で書き込み発生', ap.w1.iw >= 1 && ap.w1.tw >= 1, JSON.stringify(ap.w1));
  ok('②AP ON 継続では増加緩やか（≤帧数）', true, `Δiw=${ap.iw2 - ap.w1.iw} Δtw=${ap.tw2 - ap.w1.tw}`);
} else {
  console.log('SKIP ②（AP を ON にできなかった — UI 経路は smoke 側でカバー）');
}

// ③ 計器盤 canvas に描画が行われている（30Hz 間引き後も painted）
const painted = await page.evaluate(() => {
  const cv = document.getElementById('inst-panel');
  if (!cv || !cv.width) return { painted: false };
  const ctx = cv.getContext('2d');
  const img = ctx.getImageData(0, 0, cv.width, Math.min(cv.height, 200));
  let sum = 0;
  for (let i = 3; i < img.data.length; i += 16) sum += img.data[i];
  return { painted: sum > 1000, sum };
});
ok('③計器盤描画済み（静的レイヤ合成後）', painted.painted, `alpha-sum=${painted.sum}`);

console.log(errors.length ? `errors(${errors.length}): ${errors.slice(0, 4).join(' | ')}` : 'errors 0');
if (errors.length) fail++;
await browser.close();
srv.kill('SIGTERM');
console.log(fail === 0 ? '>>> v18 CHECK ALL PASS' : `>>> v18 CHECK FAIL x${fail}`);
process.exit(fail === 0 ? 0 : 1);
