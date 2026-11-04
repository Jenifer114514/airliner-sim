/**
 * scripts/manual-shot.mjs — マニュアル改良部分の見た目確認用スクリーンショット
 * 1. 離陸滑走中: SOP バナー「80 KNOTS」と速度計の V2/VFE 帯
 * 2. 着陸形態: フラップ40°+ギア DOWN で VAPP バグ・VFE 162kt 帯
 */
import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox']
});
const page = await browser.newPage({ viewport: { width: 667, height: 375 } });
page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
await page.goto('http://127.0.0.1:8080/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
await page.evaluate(() => {
  document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await page.waitForTimeout(800);

// 滑走加速 → 80kt 超でバナー表示（20 m/s 相当の状態を合成）
await page.evaluate(() => {
  const g = window.__airliner.game;
  const t = g.getTelemetry();
  void t;
  // 実際に滑走させつつ、速度が乗る前に banner を出すため 80kt 相当で合成表示
  const c = window.__airliner.callouts;
  const mk = (over) => Object.assign({
    ias: 45, alt: 20, agl: 0, vspeed: 0, heading: 90, pitch: 0, bank: 0,
    aoa: 2, gLoad: 1, throttle: 1, fuelFrac: 0.8, groundSpeed: 45,
    windSpeed: 0, windDirDeg: 0, flapsDeg: 5, gearDown: true, spoilers: 0,
    phase: 'ground', crashed: false,
    rwyName: '27', rwyDist: 0, rwyRemaining: 2000, rwyHeading: 90, fps: 60,
    onGround: true
  }, over);
  const evs = c.update(mk({}));
  const banner = document.getElementById('sop-banner');
  if (evs.length > 0) {
    banner.textContent = evs[evs.length - 1].text;
    banner.classList.add('show');
    banner.classList.remove('warn');
  }
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/manual-sop-takeoff.png' });

// 着陸形態（フラップ40・ギアDOWN）: VAPP バグ確認
await page.evaluate(() => {
  const c = window.__airliner.controls;
  for (let i = 0; i < 6; i++) c.flapDown();   // → 40°
  c.gearDown = true;
  const banner = document.getElementById('sop-banner');
  banner.textContent = 'VREF/VAPP 表示確認（Flap40 + Gear Down）';
  banner.classList.add('show');
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/manual-sop-landing.png' });

const st = await page.evaluate(() => ({
  flaps: window.__airliner.controls.flapsDeg,
  gear: window.__airliner.controls.gearDown
}));
console.log('state:', JSON.stringify(st));
await browser.close();
console.log('shots saved');
