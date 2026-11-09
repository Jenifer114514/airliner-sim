// fetch-glb.mjs — 指定URLのモデルを public/ に安全にダウンロードして検査
// usage: node scripts/fetch-glb.mjs <url> [url2 ...]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const PUB = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const ALLOW = /\.(glb|gltf|zip|bin)$/i;

function sha1(p) {
  const h = crypto.createHash('sha1');
  h.update(fs.readFileSync(p));
  return h.digest('hex');
}

async function fetchOne(url) {
  const name = decodeURIComponent(path.basename(url.startsWith('file://') ? new URL(url).pathname : (/^https?:/i.test(url) ? new URL(url).pathname : url))) || 'download.glb';
  if (!ALLOW.test(name)) { console.log(`SKIP ${name}: 拡張子が glb/gltf/zip/bin 以外`); return; }
  const out = path.join(PUB, name);
  const tmp = out + '.part';
  process.stdout.write(`GET ${url}\n`);
  fs.mkdirSync(PUB, { recursive: true });
  if (url.startsWith('file://') || (!/^https?:/i.test(url) && fs.existsSync(url))) {
    fs.copyFileSync(url.startsWith('file://') ? new URL(url) : url, tmp);
    fs.renameSync(tmp, out);
  } else {
    let res;
    try { res = await fetch(url, { redirect: 'follow' }); }
    catch (e) { console.log(`  fetch failed: ${String(e.cause||e).slice(0,140)}`); return; }
    if (!res.ok) { console.log(`  HTTP ${res.status} — 失敗（公開releaseか/リンク正確か確認）`); return; }
    await pipeline(res.body, fs.createWriteStream(tmp));
    fs.renameSync(tmp, out);
  }

  const st = fs.statSync(out);
  console.log(`  saved ${name}  ${(st.size / 1048576).toFixed(2)}MB  sha1=${sha1(out)}`);
  if (name.toLowerCase().endsWith('.glb')) {
    const buf = fs.readFileSync(out);
    const magic = buf.subarray(0, 4).toString('latin1');
    const ver = buf.readUInt32LE(4), total = buf.readUInt32LE(8);
    const jlen = buf.readUInt32LE(12);
    const jtyp = buf.subarray(16, 20).toString('latin1');
    let info = '';
    if (magic === 'glTF') {
      try {
        const j = JSON.parse(buf.subarray(20, 20 + jlen).toString('utf8'));
        info = ` meshes=${(j.meshes||[]).length} materials=${(j.materials||[]).length} nodes=${(j.nodes||[]).length} images=${(j.images||[]).length} samplers=${(j.samplers||[]).length} asset="${(j.asset&&j.asset.generator)||j.asset?.version||''}"`;
        const binChunk = buf.length > 20 + jlen + 8 ? buf.readUInt32LE(20 + jlen) : 0;
        const consistent = total === buf.length && (20 + jlen + 8 + binChunk === buf.length || binChunk === 0);
        info += ` BIN=${(binChunk/1048576).toFixed(2)}MB ${consistent ? 'size-ok' : 'SIZE?'}`;
        if ((j.images||[]).some(im => im.uri && !im.bufferView)) info += ` [外部画像参照あり: ${j.images.filter(i=>i.uri&&!i.bufferView).map(i=>i.uri).slice(0,4).join(', ')}]`;
      } catch { info = ' JSON-chunk parse failed'; }
      console.log(`  GLB v${ver} json=${(jlen/1024).toFixed(0)}KB/${jtyp}${info}`);
    } else {
      console.log(`  WARNING: glTF magic じゃない (${JSON.stringify(magic)}) — 中身が別物の可能性`);
    }
  }
}

for (const url of process.argv.slice(2)) await fetchOne(url);
