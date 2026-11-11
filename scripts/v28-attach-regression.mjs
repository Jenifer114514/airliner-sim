// Reproduce delayed loading after the aircraft has moved/rotated in the world.
import { build } from 'esbuild';
import { writeFile, unlink } from 'node:fs/promises';
const entry = 'scripts/.v28-test-entry.mjs';
const bundled = 'scripts/.v28-test-bundle.mjs';
await writeFile(entry, `
import * as THREE from 'three';
import { attachExtModel } from '../src/render/extModel.ts';
globalThis.window = { location: { search: '' } };
let finish;
globalThis.fetch = () => new Promise(resolve => { finish = () => resolve({ ok: true, arrayBuffer: async () => new ArrayBuffer(1) }); });
const plane = new THREE.Group();
plane.add(new THREE.Mesh(new THREE.BoxGeometry(10, 4, 40)));
const pending = attachExtModel(plane);
// Like startFlight: add cockpit and move the aircraft before fetch completes.
const cockpit = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4));
cockpit.userData.keepOutOfProc = true;
plane.add(cockpit);
plane.position.set(5000, 100, -8000); plane.rotation.y = 1.2;
const scene = new THREE.Scene(); scene.add(plane); scene.updateMatrixWorld(true);
finish();
if (!await pending) throw Error('attach failed');
const {root, fit} = plane.userData.extModel;
if (Math.abs(root.position.x) > 0.01 || Math.abs(root.position.z) > 0.01 || Math.abs(fit.refLen - 40) > 0.01) throw Error('bad local fit: '+JSON.stringify({position:root.position.toArray(),fit}));
if (!cockpit.parent || !cockpit.visible) throw Error('cockpit hidden');
console.log('PASS delayed attachment remains at aircraft local origin after movement and rotation');
`);
try {
  await build({ entryPoints: [entry], outfile: bundled, bundle: true, platform: 'node', format: 'esm', packages: 'external', plugins: [{ name: 'mock-gltf', setup(b) {
    b.onResolve({ filter: /three\/examples\/jsm\/loaders\/GLTFLoader\.js/ }, () => ({path:'mock', namespace:'mock'}));
    b.onLoad({filter:/.*/, namespace:'mock'}, () => ({contents: `import * as THREE from 'three'; export class GLTFLoader { parse(buf,path,ok) { const scene=new THREE.Group(); scene.add(new THREE.Mesh(new THREE.BoxGeometry(10,4,40))); ok({scene,animations:[]}); } }`, loader:'js', resolveDir:process.cwd()}));
  }}] });
  await import('./.v28-test-bundle.mjs');
} finally { await unlink(entry).catch(()=>{}); await unlink(bundled).catch(()=>{}); }
