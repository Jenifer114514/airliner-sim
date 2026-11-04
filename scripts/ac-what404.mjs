import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
const p = await b.newPage();
p.on('response', r => { if (r.status() >= 400) console.log('HTTP', r.status(), r.url()); });
await p.goto('https://jenifer114514.github.io/airliner-sim/', { waitUntil: 'networkidle', timeout: 40000 });
await b.close();
