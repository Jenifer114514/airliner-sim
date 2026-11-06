import { buildSync } from 'esbuild';
import { writeFileSync } from 'fs';
writeFileSync('scripts/.scan-src.js', `
import { terrainHeight } from '/home/user/airliner-sim/src/render/terrain.js';
let best = [];
for (let x = -20000; x <= 20000; x += 700) {
  for (let z = -20000; z <= 20000; z += 700) {
    const h = terrainHeight(x, z);
    if (h > 900) best.push([x, z, Math.round(h)]);
  }
}
best.sort((a, b) => b[2] - a[2]);
console.log(JSON.stringify(best.slice(0, 12)));
`);
buildSync({ entryPoints: ['scripts/.scan-src.js'], bundle: true, format: 'esm', outfile: 'scripts/.scan-bundled.mjs', external: ['three'], platform: 'node', logLevel: 'silent' });
