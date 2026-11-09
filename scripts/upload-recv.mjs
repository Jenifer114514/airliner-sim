// 簡易ファイル受付（ワンショット用・LAN/tunnel 想定）: POST multipart file → /home/user/uploads-in/
import http from 'node:http';
import { Readable } from 'node:stream';
import { writeFile } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';
const OUT = '/home/user/uploads-in';
mkdirSync(OUT, { recursive: true });
const MAX = 25 * 1024 * 1024;
const PAGE = `<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>cockpit.glb アップロード</title><style>body{font-family:sans-serif;max-width:460px;margin:40px auto;padding:0 16px;background:#10151c;color:#e8eef5}
input,button{font-size:17px;padding:12px;margin:8px 0;width:100%;box-sizing:border-box}button{background:#2f81f7;color:#fff;border:0;border-radius:8px}</style>
<p>この下の「選択」から <b>cockpit.glb</b> を選んで「アップロード」をタップしてください。<br>（zip も送れる場合は同じフォームで続けてどうぞ）</p>
<form id=f enctype=multipart/form-data method=post><input type=file name=file><button>アップロード</button></form>
<pre id=log></pre>
<script>document.getElementById('f').addEventListener('submit',async e=>{e.preventDefault();
const fd=new FormData(e.target);document.getElementById('log').textContent='送信中…';
try{const r=await fetch('/',{method:'POST',body:fd});document.getElementById('log').textContent='→ '+(await r.text());}
catch(err){document.getElementById('log').textContent='失敗: '+err;}});</script>`;
const srv = http.createServer(async (req, res) => {
  if (req.method === 'GET') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); res.end(PAGE); return; }
  if (req.method !== 'POST') { res.writeHead(405); res.end('POST only'); return; }
  const len = Number(req.headers['content-length'] || 0);
  if (len > MAX) { res.writeHead(413, { 'content-type': 'text/plain; charset=utf-8' }); res.end('ファイルが大きすぎます（25MB まで）'); return; }
  try {
    const req2 = new Request('http://up/', { method: 'POST', headers: req.headers, body: Readable.toWeb(req), duplex: 'half' });
    const fd = await req2.formData();
    const f = fd.get('file');
    if (!f || typeof f === 'string') { res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' }); res.end('ファイルが付きませんでした'); return; }
    const name = basename(String(f.name || 'upload.bin')).replace(/[^\w.\-]/g, '_');
    const buf = Buffer.from(await f.arrayBuffer());
    await writeFile(join(OUT, name), buf);
    console.log(`SAVED ${name} ${buf.length}B (${(buf.length / 1024 / 1024).toFixed(1)}MB)`);
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    res.end(`OK — ${name} (${buf.length} bytes) を受け取りました。チャットに「送った」と書いてください`);
  } catch (e) {
    console.log('ERR', String(e).slice(0, 200));
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' }); res.end('エラー: ' + String(e).slice(0, 120));
  }
});
srv.listen(8090, '0.0.0.0', () => console.log('upload-recv on 0.0.0.0:8090'));
