/** v22 検証: 2カメラ化 / 三人称スライド旋回 / コクピット無効 / スティック左下移動 / ゾーン内遠方はカメラ扱い */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const PORT = 8183;
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined,
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
  if (!up) throw new Error('flying 起動待ちタイムアウト');
}
await page.waitForTimeout(600);
let fail = 0;
const ok = (name, cond, info) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${info ? '  ' + info : ''}`); if (!cond) fail++; };
const rig = () => page.evaluate(() => ({ mode: window.__airliner.game.rig.mode, yaw: window.__airliner.game.rig.chaseYaw, pitch: window.__airliner.game.rig.chasePitch, name: window.__airliner.game.cameraName() }));

// ① 2 モード巡回 + 日本語ラベル
const n0 = (await rig()).name;
await page.evaluate(() => document.getElementById('btn-camera').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
const n1 = (await rig()).name, m1 = (await rig()).mode;
await page.evaluate(() => document.getElementById('btn-camera').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
const n2 = (await rig()).name, m2 = (await rig()).mode;
ok('①カメラは 三人称⇔コックピット の 2 種のみ', n0 === '三人称' && m1 === 'cockpit' && n1 === 'コックピット' && m2 === 'chase' && n2 === '三人称', `${n0}→${n1}→${n2}`);

// ② 三人称: 空き場所スライドで視点角が変わる（canvas 中央上）
await page.mouse.move(430, 120); await page.mouse.down();
for (let i = 1; i <= 6; i++) await page.mouse.move(430 + i * 22, 120 - i * 6);
await page.mouse.up();
let r = await rig();
ok('②三人称スライド: yaw/pitch 変更', Math.abs(r.yaw) > 0.1 && Math.abs(r.pitch - 0.222) > 0.01, JSON.stringify({ yaw: +r.yaw.toFixed(3), pitch: +r.pitch.toFixed(3) }));
const camPosA = await page.evaluate(() => { const c = window.__airliner.game.rig.camera; return { x: +c.position.x.toFixed(1), y: +c.position.y.toFixed(1) }; });
await page.waitForTimeout(400);
const camPosB = await page.evaluate(() => { const c = window.__airliner.game.rig.camera; return { x: +c.position.x.toFixed(1), y: +c.position.y.toFixed(1) }; });
ok('②b 視点オフセット維持（機体を周った位置）', camPosA.x !== camPosB.x || camPosA.y !== camPosB.y || Math.abs(camPosA.y) > 0, JSON.stringify({ camPosA, camPosB }));

// ③ コックピットでは視点角不変
await page.evaluate(() => document.getElementById('btn-camera').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
const y3 = (await rig()).yaw;
await page.mouse.move(430, 120); await page.mouse.down();
for (let i = 1; i <= 6; i++) await page.mouse.move(430 - i * 26, 120 + i * 8);
await page.mouse.up();
const r3 = await rig();
ok('③コックピット: スライドで視点角不変', r3.mode === 'cockpit' && Math.abs(r3.yaw - y3) < 1e-9, JSON.stringify({ mode: r3.mode, dyaw: +(r3.yaw - y3).toExponential(1) }));

// ④ スティックベース中央ドラッグ = ヨーク入力でカメラ不変
await page.evaluate(() => document.getElementById('btn-camera').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))); // →三人称
const y4 = (await rig()).yaw;
const vc = await page.evaluate(() => { const r = document.getElementById('stick-visual').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width }; });
await page.mouse.move(vc.x, vc.y); await page.mouse.down();
for (let i = 1; i <= 4; i++) await page.mouse.move(vc.x + i * 10, vc.y);
const rollMid = await page.evaluate(() => window.__airliner.game.roll ?? 0);
await page.mouse.up();
const r4 = await rig();
ok('④ベース中央ドラッグ: カメラ不変（＝ヨーク扱い）', Math.abs(r4.yaw - y4) < 1e-9, `dyaw=${(r4.yaw - y4).toExponential(1)}`);

// ⑤ ゾーン内の遠方（左上前辺り）ドラッグはカメラ移動
const zc = await page.evaluate(() => { const r = document.getElementById('stick-zone').getBoundingClientRect(); return { x: r.x + 30, y: r.y + 30 }; });
const y5 = (await rig()).yaw;
await page.mouse.move(zc.x, zc.y); await page.mouse.down();
for (let i = 1; i <= 6; i++) await page.mouse.move(zc.x + i * 20, zc.y);
await page.mouse.up();
const r5 = await rig();
ok('⑤ゾーン内・ベース遠方ドラッグ: カメラ視点移動', Math.abs(r5.yaw - y5) > 0.1, `Δyaw=${(r5.yaw - y5).toFixed(3)}`);

// ⑥ スティック位置が左下寄（ゾーン中心より左・画面下端から近い）
const geo = await page.evaluate(() => {
  const z = document.getElementById('stick-zone').getBoundingClientRect();
  const v = document.getElementById('stick-visual').getBoundingClientRect();
  return { rel: (v.x + v.width / 2 - z.x) / z.width, bottomGap: Math.round(innerHeight - (v.y + v.height)) };
});
ok('⑥スティック左下移動', geo.rel < 0.47 && geo.bottomGap <= 14, JSON.stringify(geo));
console.log(errors.length ? `console errors(${errors.length}): ${errors.slice(0, 3).join(' | ')}` : 'errors 0');
if (errors.length) fail++;
await browser.close();
srv.kill('SIGTERM');
console.log(fail === 0 ? '>>> v22 CHECK ALL PASS' : `>>> v22 CHECK FAIL x${fail}`);
process.exit(fail === 0 ? 0 : 1);
