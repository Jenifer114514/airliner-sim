// usage: node scripts/glb-preview.mjs <file.glb> [out.png]  — web/_glbpreview を再生してスクショ
import { build } from 'esbuild';
import { copyFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';
const [glb, out] = [process.argv[2], process.argv[3] || '.shots/glb-preview.png'];
mkdirSync('web/_glbpreview', { recursive: true }); mkdirSync('.shots', { recursive: true });
copyFileSync(glb, 'web/_glbpreview/model.glb');
await build({
  stdin: { contents: `
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const canvas = document.getElementById('c');
const r = new THREE.WebGLRenderer({ canvas, antialias: true }); r.setSize(800, 500, false); r.setPixelRatio(1);
const sc = new THREE.Scene(); sc.background = new THREE.Color(0xbfd6e8);
const cam = new THREE.PerspectiveCamera(48, 1.6, 0.1, 500);
sc.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 1.4));
const d = new THREE.DirectionalLight(0xffffff, 1.8); d.position.set(5, 8, 4); sc.add(d);
new GLTFLoader().load('model.glb', (g: any) => {
  const o = g.scene as THREE.Group;
  sc.add(o);
  const box = new THREE.Box3().setFromObject(o);
  const s = box.getSize(new THREE.Vector3()); const c = box.getCenter(new THREE.Vector3());
  const dist = Math.max(s.x, s.y, s.z) * 1.9 + 6;
  let mix: THREE.AnimationMixer | null = null;
  if (g.animations.length) { mix = new THREE.AnimationMixer(o); g.animations.forEach((a: THREE.AnimationClip) => mix!.clipAction(a).play()); }
  (window as any).__mi = { size: [s.x, s.y, s.z].map((n: number) => +n.toFixed(2)), anims: g.animations.map((a: THREE.AnimationClip) => a.name), state: 'loaded' };
  let t0 = performance.now(); let done = false;
  const loop = () => {
    const now = performance.now(); const dt = (now - t0) / 1000; t0 = now;
    if (mix) mix.update(dt);
    const a = now / 1500;
    cam.position.set(c.x + Math.sin(a) * dist, c.y + dist * 0.28, c.z + Math.cos(a) * dist);
    cam.lookAt(c);
    r.render(sc, cam);
    if (!done && now > 1400) { done = true; (window as any).__done = true; }
    requestAnimationFrame(loop);
  }; loop();
}, undefined, (e: unknown) => { (window as any).__mi = { state: 'loaderr ' + e }; (window as any).__done = true; });
`, resolveDir: '.', loader: 'ts' }, bundle: true, format: 'iife', outfile: 'web/_glbpreview/preview.js', logLevel: 'silent' });
writeFileSync('web/_glbpreview/index.html', '<!doctype html><meta charset="utf-8"><canvas id=c width=800 height=500></canvas><script src="preview.js"></script>');
const srv = spawn('node', ['scripts/serve.mjs', '8205'], { stdio: 'ignore' });
await new Promise((r2) => setTimeout(r2, 700));
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/chromium', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 800, height: 500 } });
try {
  await page.goto('http://127.0.0.1:8205/_glbpreview/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__done === true, null, { timeout: 40000 }).catch(() => undefined);
  await page.waitForTimeout(400);
  console.log('modelinfo:', JSON.stringify(await page.evaluate(() => window.__mi)));
  await page.screenshot({ path: out });
  console.log('shot:', out);
} finally {
  await browser.close(); srv.kill('SIGTERM');
}
process.exit(0);
