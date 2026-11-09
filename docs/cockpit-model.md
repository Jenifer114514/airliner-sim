# 実機風コックピット（GLB）の組み込み

`public/cockpit.glb` があると、コックピット視点で手続コックピットの代わりに B757 のフライトデッキが表示されます。
無い・読めない場合は従来の手続コックピットのまま動きます（`airliner.glb` と同じフォールバック）。

## 使い方
1. `cockpit.glb` を **`public/cockpit.glb`** に置く（9 MB・約 12.5 万三角形・46 マテリアル）
2. `.gitignore` に `public/cockpit.glb` を追加（公開リポジトリに入れない）
3. `package.json` に `"postbuild": "node scripts/strip-private-assets.mjs"` を追加（公開ビルドから自動で除外）
   - 非公開で配信するビルドに残したいときは `KEEP_COCKPIT=1 npm run build`
4. 無効化して比較したいときは URL に `?nocockpitmodel=1`

## ライセンス（重要）
モデルは **CC-BY-NC-SA-4.0**: 「Boeing 757-200 Icelandair Cockpit」by VTX
https://sketchfab.com/3d-models/boeing-757-200-icelandair-cockpit-1cb8f8109cb145849282ad703a652859
- 営利利用は不可 / 共有するなら表記必須 / 改変版（この最適化 GLB）は同じライセンスで共有
- 表記文は `src/render/cockpitModel.ts` の `COCKPIT_MODEL_CREDIT`（GLB の `asset.extras` にも入っています）
- 公開サイトに載せる場合は、非営利であること・クレジットを画面上に出すことを必ず守ってください
  （既定の `postbuild` は、うっかり公開しないための安全策です）

## 作り直し・調整（`scripts/optimize-cockpit.py`）
依存は numpy と Pillow のみ。

    python3 scripts/optimize-cockpit.py <scene.gltf のあるフォルダ> public/cockpit.glb --preview preview.png

主な調整値（ファイル冒頭）:
- `DEFAULT_EYE` / `--eye X Y Z`: 元モデル座標での機長の目の位置。**ここが視点の見え方を決める**
- `TEX_CAP_*`: テクスチャの最大辺（GPU メモリ。既定の推定は約 120 MB）
- `REAR_CULL`: 目より後方の除去ライン
- 可視性カリングの視点リスト `VIEWS`: 頭の可動域を増やすと残る三角形も増える

処理内容: skin の rest pose 焼き込み → シム座標系へ変換（目が原点・機首 +Z）→ 目の後方を除去 →
z バッファで「どの視点からも見えない」三角形を除去（447,695 → 124,820）→ 同一マテリアル結合 →
clearcoat/specular 除去 → テクスチャ縮小（4096² → 最大 2048²）→ 不要な BLEND を OPAQUE/MASK 化 → 単一 GLB。

## 仕組み
- `render/cockpitModel.ts`: GLB を一度だけ読み込み、全フライトで共有（clone は geometry/material/texture を共有）
- `render/cockpit.ts`: 読み込めたら手続の内装を隠してモデルに差し替え。原点（機長の目）をカメラ位置に一致させる
- `render/cameras.ts`: `cockpitEyeLocal()` に目の位置を一本化（カメラとモデルが必ず一致）
- `game/game.ts`: 共有リソースを破棄しない / 昼夜の明るさに追従 / テクスチャの GPU アップロードを 1 フレーム 1 枚に分散
- `render/extModel.ts`: 外観 GLB（`airliner.glb`）を後から置いてもコックピットが隠れないよう除外

## 未検証・既知の制約
- **実ブラウザ（three.js）での描画は未確認**。確認できたのはジオメトリ構造と簡易ソフトレンダラの画像まで
- 窓ガラス（BLEND）の見え方・テクスチャ色・昼夜の明るさは実機で要調整
- 計器画面は静的テクスチャ（画面上の 2D 計器が引き続き実データ表示）。PFD/ND を 3D 画面に貼るのは次の段階
- ヨークやスロットルは動かない（静的メッシュ）。操作連動にはパーツ分割が必要
- 近接面は 0.45 m のまま。モデル内で視錐台内の最近接は 0.61 m なのでクリップしない
- 可視性カリングの検証: 学習外の視点・解像度で見える三角形の欠落は 0.01〜0.23%（目の位置ちょうどでは 0.02% 以下）
