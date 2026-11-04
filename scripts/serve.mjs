/**
 * scripts/serve.mjs
 * ビルド成果物（web/）を配信する静的サーバ（Host 制限なし・LAN/トンネル配信向け）
 *   node scripts/serve.mjs [port]
 */
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'web');
const port = Number(process.argv[2]) || 8080;
// --host: 特定アドレスのみバインド（既定 0.0.0.0）。プレビュープロキシが 0.0.0.0 を占有するポート用
const hostArg = process.argv.indexOf('--host');
const host = hostArg > 0 ? process.argv[hostArg + 1] : '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm'
};

const server = http.createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(root, path));
    if (!file.startsWith(root)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    const data = await readFile(file);
    res.writeHead(200, {
      'Content-Type': MIME[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(data);
  } catch {
    try {
      const data = await readFile(join(root, 'index.html'));
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(data);
    } catch {
      res.writeHead(404); res.end('Not Found');
    }
  }
});

server.listen(port, host, () => {
  console.log(`Airliner Sim: http://${host}:${port}/  (web/ を配信中)`);
});
