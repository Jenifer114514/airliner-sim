import { chromium } from 'playwright-core';
import { setTimeout as delay } from 'node:timers/promises';
const URL_SITE = 'https://jenifer114514.github.io/airliner-sim/';
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 900, height: 540 }, deviceScaleFactor: 1 });
const errors = []; const reqFail = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message.slice(0, 200)));
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text().slice(0, 200)); });
page.on('requestfailed', (r) => reqFail.push(r.url().slice(-60) + ' :: ' + (r.failure()?.errorText || '?')));
page.on('response', (r) => { if (r.status() >= 400) reqFail.push('HTTP ' + r.status() + ' ' + r.url().slice(-60)); });
console.log('goto', URL_SITE);
let httpStatus = 'n/a';
try {
  const resp = await page.goto(URL_SITE, { waitUntil: 'networkidle', timeout: 45000 });
  httpStatus = resp ? resp.status() : 'null';
} catch (e) { console.log('GOTO FAIL:', e.message.slice(0, 300)); }
console.log('http:', httpStatus);
await delay(4000);
const diag = await page.evaluate(() => ({
  game: !!(window.__airliner && window.__airliner.game),
  canvas: !!document.querySelector('#game-canvas'),
  title: document.title,
  bodyLen: document.body ? document.body.innerHTML.length : 0
})).catch((e) => ({ err: e.message.slice(0, 120) }));
console.log('diag:', JSON.stringify(diag));
await page.screenshot({ path: 'screenshots/v3/live-check.png', timeout: 180000 }).catch((e) => console.log('shot fail', e.message.slice(0, 120)));
console.log('errors:', errors.length ? errors.slice(0, 5) : 0);
console.log('reqFail:', reqFail.length ? reqFail.slice(0, 5) : 0);
await browser.close();
