/**
 * scripts/inline-single.mjs — web/ を単一 HTML に圧縮して web-single/index.html を生成
 * file:// 直接開き・オフライン配布用（vite の base:'./' ビルドが前提）
 * 実行: node scripts/inline-single.mjs  （npm run build 後に行うこと）
 */
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const webDir = join(root, 'web');
const outDir = join(root, 'web-single');

let html = await readFile(join(webDir, 'index.html'), 'utf8');

// 1) 外部 JS（単一チャンク想定）を <script type="module"> としてインライン化
//    file:// では CORS により src 参照の module が読めないため、インラインが必須
const assets = await readdir(join(webDir, 'assets'));
const jsFiles = assets.filter((f) => f.endsWith('.js'));
if (jsFiles.length !== 1) {
  throw new Error(`JS チャンクが ${jsFiles.length} 個。単一チャンク（manualChunks 無し）のみ対応`);
}
let js = await readFile(join(webDir, 'assets', jsFiles[0]), 'utf8');
// インライン script を早期閉じさせないためのエスケープ
js = js.replace(/<\/script/gi, '<\\/script');
// 置換文字列内の $ pattern（$&/$'/$`）展開を防ぐため関数返却にする
html = html.replace(
  /<script[^>]*src="\.\/assets\/[^"]+"[^>]*><\/script>/,
  () => '<script type="module">\n' + js + '\n</script>'
);

// 2) 残る外部参照（css 等）があればインライン化、assets 引用ゼロを確認
const cssFiles = assets.filter((f) => f.endsWith('.css'));
for (const f of cssFiles) {
  const css = await readFile(join(webDir, 'assets', f), 'utf8');
  html = html.replace(
    new RegExp(`<link[^>]*href="\\./assets/${f}"[^>]*/?>`),
    () => '<style>\n' + css.replace(/<\/style/gi, '<\\/style') + '\n</style>'
  );
}
if (/src="\.\/|href="\.\/|url\(\.\/|url\("\.\/|url\('\.\//.test(html)) {
  throw new Error('外部相対参照が残存。file:// で壊れるため対応が必要');
}

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, 'index.html'), html);
console.log(`web-single/index.html 生成: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
