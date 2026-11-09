// v26: 787外装(A: web/_recon/scene.gltf) + 757コックピット(B: web/_recon/cockpit.glb) を
// 1つの GLB（既定 public/airliner.glb）に結合。ブラウザ(three)で合成→POST で受け取る。
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const OUT = (() => { const i = process.argv.indexOf('--out'); return i > 0 ? process.argv[i + 1] : 'public/airliner.glb'; })();
const SRV_PORT = 8213, UP_PORT = 9099;
const queue = [];
let notify = null;
const up = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') { res.writeHead(204).end(); return; }
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    const buf = Buffer.concat(chunks);
    const sep = buf.indexOf(0);
    let meta = {};
    try { meta = JSON.parse(buf.subarray(0, sep).toString()); } catch {}
    queue.push({ meta, data: buf.subarray(sep + 1) });
    if (notify) { notify(); notify = null; }
    res.writeHead(200).end('ok');
  });
});
await new Promise((r) => up.listen(UP_PORT, '127.0.0.1', r));
execSync('bash scripts/_merge-src/setup-web.sh',{stdio:'inherit'});
const srv = spawn('node', ['scripts/serve.mjs', String(SRV_PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch({
  headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 880, height: 560 } });
page.on('pageerror', (e) => console.log('PAGEERR', String(e).slice(0, 400)));
page.on('console', (m) => console.log('[page]', m.text().slice(0, 220)));
try {
  await page.goto(`http://127.0.0.1:${SRV_PORT}/_recon/merge.html`, { waitUntil: 'domcontentloaded' });
  const deadline = Date.now() + 540000;
  let gotGlb = false;
  while (!gotGlb && Date.now() < deadline) {
    if (!queue.length) {
      const err = await page.evaluate(() => window.__mergeErr || null);
      if (err) throw new Error('page: ' + err);
      await Promise.race([new Promise((r) => (notify = r)), new Promise((r) => setTimeout(r, 5000))]);
      continue;
    }
    const it = queue.shift();
    if (it.meta.kind === 'shot') {
      fs.mkdirSync('.shots', { recursive: true });
      fs.writeFileSync(`.shots/v26-${it.meta.name}.png`, it.data);
      console.log('SHOT', it.meta.name, it.data.length + 'B');
    } else {
      fs.writeFileSync(OUT, Buffer.from(it.data));
      console.log('WROTE', OUT, (it.data.length / 1048576).toFixed(2) + 'MB');
      gotGlb = true;
    }
  }
  if (!gotGlb) throw new Error('glb not received in time');
  console.log('STATS', JSON.stringify(await page.evaluate(() => window.__mergeStats)));
  const err2 = await page.evaluate(() => window.__mergeErr || null);
  if (err2) throw new Error('post: ' + err2);
} finally {
  await browser.close().catch(() => {});
  srv.kill(); up.close();
}
