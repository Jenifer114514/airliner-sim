import { chromium } from 'playwright-core';
import { setTimeout as delay } from 'node:timers/promises';
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 700, height: 420 }, deviceScaleFactor: 1 });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
await page.goto('file:///home/user/airliner-sim/web-single/index.html', { waitUntil: 'load', timeout: 60000 });
await delay(4000);
const ok = await page.evaluate(() => !!window.__airliner?.game);
await page.screenshot({ path: '/home/user/airliner-sim/screenshots/v2/web-single-menu.png', timeout: 120000 });
await browser.close();
console.log('single file game:', ok, '| JS errors:', errs.length ? errs.slice(0,3) : 0);
process.exit(ok && !errs.length ? 0 : 1);
