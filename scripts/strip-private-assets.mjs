// scripts/strip-private-assets.mjs — 公開ビルドから非公開アセット（コックピット GLB）を除く
//
// package.json に追加:   "postbuild": "node scripts/strip-private-assets.mjs"
// 非公開で使うために dist にも残したいときは:   KEEP_COCKPIT=1 npm run build
//
// 理由: public/ の中身は dist にそのままコピーされ、GitHub Pages に載ると誰でもダウンロードできる。
//       cockpit.glb は CC-BY-NC-SA-4.0 のモデル由来（非営利・要クレジット・継承）なので、既定では公開物に含めない。
import { existsSync, rmSync } from 'node:fs';

if (process.env.KEEP_COCKPIT === '1') {
  console.log('[strip] KEEP_COCKPIT=1 → dist/cockpit.glb を残します');
} else {
  for (const f of ['dist/cockpit.glb', 'web/cockpit.glb']) {
    if (existsSync(f)) {
      rmSync(f);
      console.log('[strip] removed', f);
    }
  }
}
