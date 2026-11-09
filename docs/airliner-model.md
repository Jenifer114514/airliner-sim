# 実機 GLB 統合（v26）— 787 外観 × 757 コックピット 結合モデル

`public/airliner.glb`（ローカル）は検証用の**結合モデル**（24.4MB）。外観 A とコックピット B を
単一 GLB にマージしたもので、**CC-BY-NC-SA（B 由来）を継ぐため公開デプロイには含めない**
（`scripts/strip-private-assets.mjs` が postbuild で `web/` から自動除去＝gitignore 済。
リポジトリ上の `public/airliner.glb` は従来どおり CC-BY の小型モデル）。

## クレジット

- 外観 A: *Boeing 787-9 Singapore Airlines* by mudkipz321
  https://sketchfab.com/3d-models/boeing-787-9-singapore-airlines-d383b7e3b858407e8cff7365820cc4dd
  ライセンス: CC-BY-4.0（**表示必須**）
- コックピット B: *Boeing 757-200 Icelandair Cockpit* by VTX_car
  https://sketchfab.com/3d-models/boeing-757-200-icelandair-cockpit-1cb8f8109cb145849282ad703a652859
  ライセンス: CC-BY-NC-SA-4.0（非営利・同一条件継承）
  帰属表示（原文）:
  > This work is based on "Boeing 757-200 Icelandair Cockpit"
  > (sketchfab.com/3d-models/boeing-757-200-icelandair-cockpit-1cb8f8109cb145849282ad703a652859)
  > by VTX (sketchfab.com/VTX_car) licensed under CC-BY-NC-SA-4.0

## 結合結果

- 151 meshes / 569,240 tris。実尺 787: 全長 67.46m × 翼幅 65.21m × 高さ 20.9m、下面 y=0・鼻 +Z・中心化。
- B を scale 1.4614 でノーズスラブ（幅 5.71m × 高さ 6.13m）に埋設（z = zmax−0.31、床 = y0+0.30H、幅 0.92）。
  `MergedCockpit` ノードに `extras.mergedCockpit = true`。
- テクスチャ縮退: A→最大 1024px（`MAXTA`）、B→最大 256px（`MAXTB`）。

## 再生成手順（ローカルのみ）

1. 素材: `/home/user/models/inbound-raw/787-exterior/`（A）と B 元データ（zip 直下）。
2. `node scripts/v26-merge-glb.mjs` — `scripts/_merge-src/merge.html` を serve（8213）し、
   GLTFExporter で結合 GLB を生成、POST（9099）で `public/airliner.glb` へ保存。
   ※テクチャごとに新規キャンバス必須（キャンバス使い回しは全マテリアル同一画像化＋export 暴走で禁止）。
   ※exporter 起動前に renderer.dispose + forceContextLoss、node heap 7GB。
3. `npm run build`（既定 = strip 有効。フル検証は `KEEP_COCKPIT=1 npm run build`）。

## ゲーム側の挙動（v26）

- `src/render/extModel.ts` — 外観+内蔵コックピットを attach（proc 機体は非表示、寸法 fit、clips 0）。
- `src/game/game.ts` — 専用 `cockpit.glb` が存在するか cockpit 視点のとき、
  結合物の内蔵コックピットを毎フレーム非表示（`extCockpitView = mode === 'cockpit' || cockpit.hasModel()`）。
  内蔵版が見えるのは `?nocockpitmodel=1` か `cockpit.glb` 欠如時のみ。
- headless（SwiftShader）では 24MB+9MB 併用ページのピクセル検証は不能（shader VALIDATE 失敗で全黒、
  もしくは attach 中 OOM）。併用の目視合致は実機ブラウザでのみ確認すること。
  検証スクリプトは `SOFT=1` でピixel系を WARN 降格（attach ロジック①②③⑤⑧は厳密維持）。

## 検証実績（sandbox）

- v24（外観 attach・fallback・proc 非表示）: 8/8（A512/B256 版。A1024/B256 はテクチャ解像度差のみで同一経路）。
- v25-lite（?nomodel 系コックピット全検査）: 8/8。
- v25（併用モード）: ①②③⑤⑧ PASS、④⑥⑦ は headless GPU 制限により SOFT WARN。
