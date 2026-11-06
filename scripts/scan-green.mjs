import { buildSync } from 'esbuild';
import { writeFileSync } from 'fs';
writeFileSync('scripts/.scan2-src.js', `
import { terrainHeight } from '/home/user/airliner-sim/src/render/terrain.js';
let best = null;
for (let x = -19000; x <= 19000; x += 500) {
  for (let z = -19000; z <= 19000; z += 500) {
    const h = terrainHeight(x, z);
    if (h < 750 || h > 1500) continue;
    let lo = 1e9, hi = -1e9;
    for (let a = 0; a < 8; a++) {
      const q = terrainHeight(x + Math.cos(a * 0.785) * 1300, z + Math.sin(a * 0.785) * 1300);
      lo = Math.min(lo, q); hi = Math.max(hi, q);
    }
    const relief = hi - lo;
    if (!best || relief > best.relief) best = { x, z, h: Math.round(h), relief: Math.round(relief) };
  }
}
console.log(JSON.stringify(best));
`);
buildSync({ entryPoints: ['scripts/.scan2-src.js'], bundle: true, format: 'esm', outfile: 'scripts/.scan2-bundled.mjs', external: ['three'], platform: 'node', logLevel: 'silent' });
