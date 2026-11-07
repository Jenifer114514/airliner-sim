/** v18.1 補完検証: ①音声=定常時 setTargetAtTime ゼロ書込 ②quality 中央値=総当たり一致（0.25s リフレッシュ境界） ③計器=同一帧burst 1 描画/resize 直後に追加描画なし ④静的レイヤが flaps 変化時のみ再生成 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const PORT = 8181;
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
const ok = (name, cond, info) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${info ? '  ' + info : ''}`); if (!cond) fail++; };

// ══ ② quality: 0.25s リフレッシュ境界でブルートフォース中央値と一致 ══
const qual = await page.evaluate(() => {
  const q = window.__airliner.game.quality;
  q.fpsSamples.length = 0; // 実フレーム分の窓を空にする
  const samples = [];
  let medAccum = 0;
  let checked = 0, mism = null;
  for (let i = 0; i < 240; i++) {
    const dt = 0.008 + 0.012 * Math.abs(Math.sin(i * 2.399));
    q.sample(dt);
    samples.push(1 / dt);
    medAccum += dt;
    if (medAccum >= 0.25) { // 実装と同じ条件でリフレッシュ直後に照合
      medAccum = 0;
      const win = samples.slice(-60).slice().sort((a, b) => a - b);
      const exp = win[win.length >> 1];
      const got = q.getFps();
      checked++;
      if (Math.abs(exp - got) > 1e-9 && !mism) mism = { i, exp, got };
    }
  }
  return { checked, mism };
});
ok('②quality 中央値=総当たり一致', qual.checked >= 8 && !qual.mism, JSON.stringify(qual));

// ══ ③ 計器: burst 1 描画 + resize 直後の追加描画なし + flaps 変更で静的レイヤ再生成 ══
const inst = await page.evaluate(async () => {
  const panel = window.__airliner?.instruments;
  if (!panel) return { exposed: false };
  const cvs = document.getElementById('inst-panel');
  const ctx = cvs.getContext('2d');
  let clears = 0;
  const orig = ctx.clearRect.bind(ctx);
  ctx.clearRect = (...a) => { clears++; orig(...a); };
  let statBuilds = 0;
  const ob = panel.buildStatic.bind(panel);
  panel.buildStatic = (d) => { statBuilds++; return ob(d); };
  const prevState = window.__airliner.game.state;
  window.__airliner.game.state = 'paused'; // 計測中、メインループ自身の update を止める
  const d = { ias: 70, alt: 1200, agl: 1100, vspeed: 1, heading: 265, pitch: 2, bank: 0, aoa: 3,
    gLoad: 1, throttle: 0.5, fuelFrac: 0.7, groundSpeed: 71, windSpeed: 3, windDirDeg: 120,
    flapsDeg: 0, gearDown: false, spoilers: 0, phase: 'FLIGHT', crashed: false,
    rwyName: '34L', rwyDist: 3000, rwyRemaining: null, rwyHeading: 340, fps: 60, onGround: false };
  const wait = () => new Promise((r) => setTimeout(r, 60)); // 32ms スロットル窓あけ
  await wait();
  panel.update(d);                                  // 基準描画（この間の生成カウントは除外）
  clears = 0; statBuilds = 0;
  const first = 0;
  for (let i = 0; i < 30; i++) panel.update(d);     // 同一帧 burst → 全部スキップ
  const burst = clears - first;
  await wait();
  panel.update({ ...d, flapsDeg: 5 });              // flaps 変化 → 静的レイヤ再生成を伴う描画
  const statAfterFlap = statBuilds;
  panel.update({ ...d, flapsDeg: 5 });              // 直後（throttle 内）→ 追加なし
  const statSame = statBuilds - statAfterFlap;
  const b1 = clears;
  panel.resize();                                   // resize 自身が 1 描画
  for (let i = 0; i < 5; i++) panel.update(d);      // 32ms 内 → 二重描画なし
  const resizeDraws = clears - b1;
  window.__airliner.game.state = prevState;
  return { exposed: true, burst, statAfterFlap, statSame, resizeDraws };
});
ok('③同一帧burst 追加描画 0', inst.exposed && inst.burst === 0, `clears=${inst.burst}`);
ok('③flaps 変化で静的レイヤ再生成（1 回）/直後の重複なし', inst.statAfterFlap === 1 && inst.statSame === 0, `flap=${inst.statAfterFlap} same=${inst.statSame}`);
ok('③resize 直後の描画は 1（二重なし）', inst.resizeDraws === 1, `draws=${inst.resizeDraws}`);

// ══ ① 音声: 定常値で setTargetAtTime ゼロ、変化中は間引く ══
const aud = await page.evaluate(() => {
  const a = window.__airliner.audio;
  if (!a.ctx) return { skip: true };
  let n = 0;
  const orig = AudioParam.prototype.setTargetAtTime;
  AudioParam.prototype.setTargetAtTime = function (...args) { n++; return orig.apply(this, args); };
  a.setEngine(0.5, 70); a.setWind(70); a.setWarning('none'); // 初期化 1 バースト
  const afterInit = n;
  for (let i = 0; i < 240; i++) { a.setEngine(0.5, 70); a.setWind(70); a.setWarning('none'); }
  const idle = n - afterInit;
  const b1 = n;
  for (let i = 0; i < 240; i++) { a.setEngine(0.5 + i * 0.02, 70 + i * 4); a.setWind(70 + i * 4); a.setWarning(i % 2 ? 'stall' : 'gear'); }
  const active = n - b1;
  AudioParam.prototype.setTargetAtTime = orig;
  return { skip: false, idle, active };
});
if (aud.skip) {
  console.log('SKIP  ①音声（AudioContext 未起動）');
} else {
  ok('①定常値 240 呼びで書込み 0 回', aud.idle === 0, `idle=${aud.idle}`);
  ok('①変化中は間引いて書込む（0 < active < 1440）', aud.active > 0 && aud.active < 1440, `active=${aud.active}/1440`);
}

console.log(errors.length ? `console errors(${errors.length}): ${errors.slice(0, 4).join(' | ')}` : 'errors 0');
if (errors.length) fail++;
await browser.close();
srv.kill('SIGTERM');
console.log(fail === 0 ? '>>> v18b CHECK ALL PASS' : `>>> v18b CHECK FAIL x${fail}`);
process.exit(fail === 0 ? 0 : 1);
