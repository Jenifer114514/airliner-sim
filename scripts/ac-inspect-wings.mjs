import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 800, height: 500 } });
const errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.goto('http://127.0.0.1:8146/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.evaluate(() => {
  document.querySelectorAll('#mode-chips .chip')[1]?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await page.waitForTimeout(300);
await page.evaluate(() => document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await page.waitForTimeout(2000);
const out = await page.evaluate(() => {
  const THREEBOX = (m) => {
    if (!m.geometry) return null;
    m.geometry.computeBoundingBox();
    const b = m.geometry.boundingBox;
    return [b.min.x.toFixed(2), b.max.x.toFixed(2), b.min.y.toFixed(2), b.max.y.toFixed(2), b.min.z.toFixed(2), b.max.z.toFixed(2), m.geometry.attributes.position.count];
  };
  const g = window.__airliner.game;
  const root = g.player.group;
  const rows = [];
  const walk = (o, depth, path) => {
    for (const c of o.children) {
      const bb = c.isMesh ? THREEBOX(c) : null;
      if (bb) rows.push({ path: path + '/' + (c.name || c.type), depth, pos: [c.position.x.toFixed(2), c.position.y.toFixed(2), c.position.z.toFixed(2)].join(','), rot: [c.rotation.x.toFixed(2), c.rotation.y.toFixed(2), c.rotation.z.toFixed(2)].join(','), bb: bb.join('|') });
      if (depth < 1 && c.children.length) walk(c, depth + 1, path + '/' + (c.name || c.type));
    }
  };
  walk(root, 0, '');
  return { count: root.children.length, rows: rows.length, sample: rows.filter(r => { const n = r.bb.split('|').map(Number); const dx=n[1]-n[0], dy=n[3]-n[2], dz=n[5]-n[4]; return (dx>8||dz>6) && Math.max(dx,dy,dz)>10; }).slice(0, 40) };
});
console.log(JSON.stringify(out, null, 1).slice(0, 4200));
console.log('errs', errs.slice(0,2));
await browser.close();
