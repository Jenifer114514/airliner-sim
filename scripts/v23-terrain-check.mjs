/** v23 検証: 光場ベイク（AO/影/流量）読込・shader 無錯誤・川描画・夕影・splat・森林限界 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
const PORT = 8198;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));

// ── 0) bin フォーマット検証（node 側）──
let fail = 0;
const ok = (name, cond, info) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${info ? '  ' + info : ''}`); if (!cond) fail++; };
{
  const bb = readFileSync('web/terrain-bake.bin');
  const magic = bb.subarray(0, 4).toString();
  const N = bb.readUInt32LE(4);
  const H = N >> 1;
  let flowCnt = 0, aoSum = 0, shDuskSum = 0;
  const lOff = 32 + N * N * 8;
  for (let k = 0; k < H * H; k++) {
    if (bb[lOff + k * 4 + 3] > 76) flowCnt++;
    aoSum += bb[lOff + k * 4];
    shDuskSum += bb[lOff + k * 4 + 2];
  }
  ok('①bin ERA2 + light 場', magic === 'ERA2' && bb.length === 32 + N * N * 8 + H * H * 4, `${magic} ${(bb.length / 1e6).toFixed(1)}MB`);
  const flowPct = 100 * flowCnt / (H * H);
  ok('②川（flow>0.3）が谷に分布 0.1〜8%', flowPct > 0.1 && flowPct < 8, `${flowPct.toFixed(2)}%`);
  ok('③AO/夕影が統計的正常', aoSum / (H * H) > 180 && shDuskSum / (H * H) < 235, `ao=${(aoSum / H / H).toFixed(0)} shD=${(shDuskSum / H / H).toFixed(0)}`);
}

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!(window.__airliner?.game), null, { timeout: 30000 });
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
{
  let up = false;
  for (let i = 0; i < 40 && !up; i++) {
    up = await page.evaluate(() => window.__airliner?.game?.state === 'flying');
    if (!up) await page.waitForTimeout(500);
  }
  if (!up) throw new Error('flying 起動待ちタイムアウト');
}
await page.waitForTimeout(500);
ok('④地形シェーダ（光場/splat/大気）で JS/GL エラー 0', errors.length === 0, errors.slice(0, 2).join('|'));

// ── 5) 河川沿い機位で昼/夕のスクリーンショット統計 ──
// 太い flow セルを CPU 側（bin 直接）から選び、その上流寄りに機体を置く
const shot = async (timeId) => page.evaluate(async ([tm]) => {
  const g = window.__airliner.game;
  g.applyEnvironment(tm, 'clear', 'calm');
  const t = window.__airliner;
  const pos = window.__riverSpot;
  const v = { x: pos.x, y: pos.y + 220, z: pos.z };
  g.physics.resetAirborne(v, Math.PI, 90);
  g.state = 'flying';
  g.render();
  await new Promise((r) => setTimeout(r, 60));
  g.render();
  const cv = document.getElementById('game-canvas');
  const c = document.createElement('canvas');
  c.width = cv.width; c.height = cv.height;
  c.getContext('2d').drawImage(cv, 0, 0);
  const d = c.getContext('2d').getImageData(0, Math.floor(cv.height * 0.52), cv.width, Math.floor(cv.height * 0.38)).data;
  let lum = 0, wet = 0, n = 0;
  for (let i = 0; i < d.length; i += 16) {
    const r = d[i], gg = d[i + 1], b = d[i + 2];
    lum += (r + gg + b) / 3; n++;
    // 川色: 中〜暗部の青緑（明るい空を除外）
    if (b > r + 8 && b > 26 && b < 150 && r < 110) wet++;
  }
  return { lum: lum / n, wetPct: 100 * wet / n };
}, [timeId]);
// 川筋探索: page 内で fetch した light の a 最大列 → 地上高算出（CPU 契約関数経由）
const spotOk = await page.evaluate(async () => {
  const res = await fetch('./terrain-bake.bin');
  const bb = new Uint8Array(await res.arrayBuffer());
  const dv = new DataView(bb.buffer);
  const N = dv.getUint32(4, true), cell = dv.getFloat64(16, true), min = dv.getFloat64(24, true);
  const H = N >> 1;
  const off = 32 + N * N * 8;
  // flow 上位候補を地上高で検証し「陸上の川」を採用（海への集水面を回避）
  const cands = [];
  for (let j = 40; j < H - 40; j += 7) for (let i = 40; i < H - 40; i += 7) {
    let sv = 0;
    for (let dj = 0; dj < 4; dj++) for (let di = 0; di < 4; di++) sv += bb[off + ((j + dj) * H + i + di) * 4 + 3];
    cands.push([sv, i, j]);
  }
  cands.sort((a, b) => b[0] - a[0]);
  for (const [sv, i, j] of cands.slice(0, 40)) {
    const x = min + (i + 2) * cell * 2, z = min + (j + 2) * cell * 2;
    const y = window.__airliner.terrainHeight(x, z);
    if (y > 8 && y < 260) { window.__riverSpot = { x, z, y }; return true; }
  }
  return false;
});
ok('⑤川 spot 確保（陸上 flow 最大帯）', spotOk);
const day = await shot('day');
const dusk = await shot('sunset');
ok('⑥描画成立（両時点とも非黒画面）', day.lum > 18 && dusk.lum > 10, JSON.stringify({ day: { lum: +day.lum.toFixed(1), wet: +day.wetPct.toFixed(2) }, dusk: { lum: +dusk.lum.toFixed(1), wet: +dusk.wetPct.toFixed(2) } }));
ok('⑦川色ピクセル（青系）が昼画面に存在', day.wetPct > 0.12, `wet=${day.wetPct.toFixed(2)}%`);
ok('⑧夕方は影×散乱で平均輝度が下がる', dusk.lum < day.lum * 0.96, `day=${day.lum.toFixed(1)} dusk=${dusk.lum.toFixed(1)}`);
// ── 9) 高度場連続性: multifractal 変更で接地物理が破綻していないか（ground 付近 600 歩）──
const ground = await page.evaluate(() => {
  const t = window.__airliner;
  const g = t.game;
  let bad = 0, maxJump = 0;
  let prev = t.terrainHeight(0, 0);
  for (let k = 1; k <= 600; k++) {
    const h = t.terrainHeight(k * 7.3, Math.sin(k * 0.11) * 900);
    maxJump = Math.max(maxJump, Math.abs(h - prev));
    prev = h;
    if (!isFinite(h)) bad++;
  }
  return { bad, maxJump };
});
ok('⑨高度場有限連続（600 サンプル・段差<120m）', ground.bad === 0 && ground.maxJump < 120, JSON.stringify(ground));
console.log(errors.length ? `console errors: ${errors.slice(0, 3).join(' | ')}` : 'errors 0');
if (errors.length) { console.log('FAIL ⑩ errors'); fail++; }
await browser.close();
srv.kill('SIGTERM');
console.log(fail === 0 ? '>>> v23 CHECK ALL PASS' : `>>> v23 CHECK FAIL x${fail}`);
process.exit(fail === 0 ? 0 : 1);
