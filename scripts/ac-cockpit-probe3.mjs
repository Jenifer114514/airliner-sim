import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const PORT = 8151;
const root = new URL('..', import.meta.url).pathname;
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await delay(800);
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 640, height: 400 } });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await delay(2000);
// マニュアル飛行（chips[0]=manual? まず chips 一覧を取得）
const chips = await page.evaluate(() => Array.from(document.querySelectorAll('#mode-chips .chip')).map(c => c.textContent?.trim()));
console.log('chips:', JSON.stringify(chips));
await page.evaluate(() => { const c = document.querySelectorAll('#mode-chips .chip')[0]; c.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
await delay(250);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await delay(1200);
// rAF 生存チェック
const alive = await page.evaluate(async () => {
  const n1 = performance.now(); let frames = 0;
  await new Promise((res) => { let c = 0; const t = () => { c++; if (++frames >= 3 || c > 40) return res(); requestAnimationFrame(t); }; requestAnimationFrame(t); });
  return { frames, ms: (performance.now() - n1).toFixed(0) };
});
console.log('rAF alive:', JSON.stringify(alive));
// 機体が進むか（2秒差）
const p1 = await page.evaluate(() => window.__airliner.game.player.group.position.toArray().map(v => +v.toFixed(1)));
await delay(2000);
const p2 = await page.evaluate(() => window.__airliner.game.player.group.position.toArray().map(v => +v.toFixed(1)));
console.log('plane move:', JSON.stringify(p1), '->', JSON.stringify(p2));
// cockpit へ切替 → blendT の推移
await page.evaluate(() => { for (let i = 0; i < 6 && window.__airliner.game.rig.mode !== 'cockpit'; i++) window.__airliner.game.cycleCamera(1); });
for (let k = 0; k < 3; k++) {
  const s = await page.evaluate(() => ({
    mode: String(window.__airliner.game.rig.mode), blending: window.__airliner.game.rig.blending,
    blendT: +window.__airliner.game.rig.blendT.toFixed(3), near: window.__airliner.camera.near,
    fov: +window.__airliner.camera.fov.toFixed(1)
  }));
  console.log('t=' + k * 1.5 + 's', JSON.stringify(s));
  await delay(1500);
}
console.log('demo state:', await page.evaluate(() => ({ state: String(window.__airliner.game.state), finished: window.__airliner.game.demo.finished })));
await browser.close();
try { server.kill(); } catch {}
