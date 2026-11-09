// v25-lite: 同一検査を低メモリ（?nomodel=1 → 手続機体+cockpit.glb のみ）で回す
// 目的: ①〜⑧のうち ext モデル不要な検査を CI 的に通す。ext 併用は v24 チェックと live 目視で担保。
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { statSync } from 'node:fs';
const PORT = 8212;
const size = statSync('web/cockpit.glb').size;
const errs = [];
let pass = 0, fail = 0;
const check = (name, cond, extra = '') => { if (cond) { pass++; console.log('  PASS', name); } else { fail++; console.log('  FAIL', name, extra); } };
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({
  headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
async function boot(query) {
  const page = await browser.newPage({ viewport: { width: 720, height: 420 } });
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await page.goto(`http://127.0.0.1:${PORT}/${query}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !!window.__airliner?.game, null, { timeout: 40000 });
  return page;
}
const resp = await fetch(`http://127.0.0.1:${PORT}/cockpit.glb`);
check('① cockpit.glb 200・サイズ一致', resp.status === 200 && (await resp.arrayBuffer()).byteLength === size);
const p = await boot('?nomodel=1');
await p.evaluate(() => document.getElementById('btn-start')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
for (let i = 0; i < 60; i++) { if (await p.evaluate(() => window.__airliner?.game?.state === 'flying')) break; await p.waitForTimeout(400); }
await p.evaluate(() => { const g = window.__airliner.game; g.rig.setMode('cockpit'); g.cockpit.group.visible = true; });
await p.waitForFunction(() => window.__airliner.game.cockpit?.hasModel?.() === true, null, { timeout: 60000 }).catch(() => undefined);
check('② hasModel（GLB 内装 attach 済）', await p.evaluate(() => window.__airliner.game.cockpit.hasModel()));
const st = await p.evaluate(() => {
  const cg = window.__airliner.game.cockpit.group;
  const model = cg.getObjectByName('cockpit-model');
  const proc = cg.children.find((c) => c !== model && c.type === 'Group');
  return { modelVis: !!model && model.visible, procVis: !!proc && proc.visible, modelKids: model ? model.children.length : -1 };
});
check('③ model可視・proc非視・子供>0', st.modelVis && !st.procVis && st.modelKids > 0, JSON.stringify(st));
async function bandStats(page) {
  return page.evaluate(async () => {
    const gm = window.__airliner.game;
    gm.render && gm.render(); await new Promise((r) => setTimeout(r, 60)); gm.render && gm.render();
    const cv = document.getElementById('game-canvas') || document.querySelector('canvas');
    const off = document.createElement('canvas'); off.width = cv.width; off.height = cv.height;
    const ctx = off.getContext('2d'); ctx.drawImage(cv, 0, 0);
    const g = (y0, y1) => {
      const d = ctx.getImageData(0, Math.floor(off.height * y0), off.width, Math.floor(off.height * (y1 - y0))).data;
      let sum = 0, dark = 0, uniq = new Set();
      for (let i = 0; i < d.length; i += 4) { const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]; sum += lum; if (lum < 80) dark++; if (uniq.size < 3000) uniq.add((d[i] >> 4) * 256 + (d[i + 1] >> 4) * 16 + (d[i + 2] >> 4)); }
      const n = d.length / 4;
      return { lum: +(sum / n).toFixed(1), darkFrac: +(dark / n).toFixed(3), uniq: uniq.size };
    };
    return { upper: g(0.18, 0.42), lower: g(0.55, 0.9) };
  });
}
const bs = await bandStats(p);
check('④ 窓が空で上・内装の暗部が下', bs.upper.lum > 60 && bs.lower.darkFrac > 0.05, JSON.stringify(bs));
check('⑤ 手続フォールバックなし（nomodel=外観のみなので常に可視）', await p.evaluate(() => { const g = window.__airliner.game; return !!g.player && !g.player.group.userData.extModel && g.cockpit.group.visible; }));
await p.screenshot({ path: '.shots/v25lite-cockpit.png', timeout: 60000 });
check('⑥ error 0', errs.length === 0, errs.slice(0, 3).join(' | '));
await p.close();
const p2 = await boot('?nomodel=1&nocockpitmodel=1');
await p2.evaluate(() => document.getElementById('btn-start')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
for (let i = 0; i < 40; i++) { if (await p2.evaluate(() => window.__airliner?.game?.state === 'flying')) break; await p2.waitForTimeout(400); }
await p2.waitForTimeout(1500);
check('⑦ ?nocockpitmodel=1 で手続コックピット', await p2.evaluate(() => window.__airliner.game.cockpit.hasModel() === false));
check('⑧ error 0（二枚目）', errs.length === 0, errs.slice(0, 3).join(' | '));
await p2.close();
await browser.close(); srv.kill();
console.log(`\n>>> v25-lite: ${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
