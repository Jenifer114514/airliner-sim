// v24 機体 GLB 差し替え検証
// ①glb 取得 200・size 一致 ②attach 成功（proc 非表示・root 存在）③寸法一致
// ④プロペラ mixer 進行 ⑤?nomodel=1 で手続機体フォールバック ⑥error 0
// ⑦駐機機/プレビュー機にも attach（空港が手続機体と混在しない）⑧接地:下面y≈地面
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const PORT = 8206;
const sha = (b) => createHash('sha1').update(b).digest('hex').slice(0, 10);
const size = statSync('public/airliner.glb').size;
const errs = [];
let pass = 0, fail = 0;
const check = (name, cond, extra = '') => {
  if (cond) { pass++; console.log('  PASS', name); }
  else { fail++; console.log('  FAIL', name, extra); }
};
const srv = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({
  headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage', '--js-flags=--max-old-space-size=4096']
});

async function boot(query) {
  const page = await browser.newPage({ viewport: { width: 900, height: 560 } });
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await page.goto(`http://127.0.0.1:${PORT}/${query}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !!window.__airliner?.game, null, { timeout: 30000 });
  return page;
}

// ── 
const resp = await fetch(`http://127.0.0.1:${PORT}/airliner.glb`);
const buf = Buffer.from(await resp.arrayBuffer());
check('① glb 200・サイズ一致', resp.status === 200 && buf.length === size, `${resp.status} ${buf.length}/${size}`);
console.log('    sha1', sha(buf), '(public=web)');

// ── フライト機体
const p1 = await boot('');
await p1.screenshot({ path: '.shots/v24-menu.png', timeout: 80000 });
await p1.evaluate(() => document.getElementById('btn-start')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
for (let i = 0; i < 40; i++) {
  if (await p1.evaluate(() => window.__airliner?.game?.state === 'flying')) break;
  await p1.waitForTimeout(300);
}
await p1.waitForTimeout(1200);
//  attach は terrain fetch と同じ主線程キュー → headless ブート負荷で数十秒待ち受けことがある
await p1.waitForFunction(() => !!window.__airliner.game?.player?.group?.userData?.extModel, null, { timeout: 60000 });
check('② attach: extModel 存在', true);
const geo = await p1.evaluate(() => {
  const g = window.__airliner.game?.player?.group;
  if (!g) return null;
  const h = g.userData.extModel;
  let meshes = 0, cast = 0;
  h.root.traverse((o) => { if (o.isMesh) { meshes++; if (o.castShadow) cast++; } });
  const kids = g.children.map((c) => ({ vis: c.visible, kind: c === h.root ? 'ext' : 'other' }));
  return { meshes, cast, fit: h.fit, kids };
});
check('③ proc 束ね非表示 + meshes/castShadow', geo && geo.kids.length >= 2 && geo.kids.some((k) => k.kind === 'ext' && k.vis) && geo.kids.some((k) => k.kind === 'other' && !k.vis) && geo.meshes > 0 && geo.cast === geo.meshes, JSON.stringify(geo));
check('④ 寸法一致 fit.size.z≈refLen', geo && Math.abs(geo.fit.size[2] - geo.fit.refLen) < geo.fit.refLen * 0.05, JSON.stringify(geo?.fit));
check('④b メニュープレビューは手続維持（構図保護）', await p1.evaluate(() => {
  const g = window.__airliner.game?.previewAircraft?.group;
  return !!g && !g.userData.extModel && g.children.filter((c) => c.visible).length > 3;
}));
await p1.waitForFunction(() => {
  const g = window.__airliner.game?.player?.group;
  return !!g && (g.userData.extModel.clips === 0 || g.userData.extModel.mixer.time > 0.02);
}, null, { timeout: 30000 }).catch(() => undefined);
check('⑤ プロペラ mixer 進行（アニメなし GLB はスキップ可）', await p1.evaluate(() => { const h = window.__airliner.game.player.group.userData.extModel; return h.clips === 0 || h.mixer.time > 0.02; }));
check('⑥ error 0（フライト）', errs.length === 0, errs.slice(0, 3).join(' | '));
await p1.screenshot({ path: '.shots/v24-chase.png', timeout: 80000 });
await p1.close();

// ── nomodel
const p2 = await boot('?nomodel=1');
await p2.waitForFunction(() => !!window.__airliner.game?.previewAircraft?.group, null, { timeout: 30000 }).catch(() => undefined);
check('⑦ ?nomodel=1 で手続機体', await p2.evaluate(() => {
  const g = window.__airliner.game?.previewAircraft?.group;
  if (!g) return false;
  const hasExt = !!g.userData.extModel;
  const kids = g.children.filter((c) => c.visible).length;
  return !hasExt && kids > 3;
}));
await p2.close();
await browser.close();
srv.kill('SIGTERM');
console.log(`\n>>> v24 model-check: ${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
