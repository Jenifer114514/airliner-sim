# Airliner Sim — 高グラフィック品質 3D 旅客機フライトシミュレーター（iPhone Safari / Phase 1）

**グラフィック品質を最優先**した 3D 旅客機フライトシミュレーター。
離陸→巡航→着陸を体験できる最終目標に向け、Phase 1（3D 描画基盤）が動作確認済みです。
技術設計は [docs/DESIGN.md](docs/DESIGN.md) を参照。

---

## 1. 実行方法

```bash
cd airliner-sim
npm install              # 初回のみ（three@0.170.0 / vite@5.4.11 / typescript@5.6.3 を固定取得）
npm run build            # web/ を生成
npm run serve            # http://localhost:8080/ で配信
```

開発サーバ（HMR 付き）: `npm run dev -- --host`

### iPhone からのアクセス

| 方法 | 手順 |
|---|---|
| **公開トンネル（手軽）** | `node scripts/serve.mjs 8080` + `/home/user/skyfighter/tools/cloudflared tunnel --protocol http2 --url http://127.0.0.1:8080 --metrics 127.0.0.1:21024` → 表示された `https://xxx.trycloudflare.com` を開く。`--metrics` は必須（既定の 20241 は Arena プレビューと衝突する）。現行 URL は **`TUNNEL_URL.txt`** に常に同期 |
| **自動回復** | `scripts/tunnel-watchdog.sh` を起動しておくと、30 秒ごとにトンネル URL へ疎通検査し、3 回連続失敗（error 1033/530 相当）で cloudflared を kill → スーパーバイザが約 10 秒で新 URL を再発行、`TUNNEL_URL.txt` も自動更新。ログは `/tmp/cf.log`、現在 URL は `/tmp/tunnel-url.txt` |
| **同一 Wi-Fi** | `npm run dev -- --host` → iPhone で `http://<PCのLAN IP>:5173/` |
| **静的ホスティング** | `web/` を Netlify Drop / GitHub Pages 等へ（HTTPS 推奨） |

**操作**: カメラ切替（▶VIEW で戻る）/ デモ再始動 / 一時停止。横画面推奨（縦画面は案内表示）。
iPhone Safari は `file://` 直開きでは動作しません。必ず HTTP(S) 経由で開いてください。

---

## 2. テスト・検証

```bash
npm run typecheck            # TypeScript 型検査（strict）
npm run build                # ビルド
node scripts/physics-test.mjs   # 物理スモークテスト（Node + esbuild）
node scripts/browser-smoke.mjs  # 実ブラウザ回帰テスト（離陸操縦・計器・音声・環境・UI・SOP・AP・空港選択、26 項目）
node scripts/autopilot-test.mjs # オートパイロット法則テスト（Node 直接駆動 30 項目: ALT/V/S/HDG/LOC/GS/A/T/安全性）
node scripts/flicker-test.mjs   # 地形シェーダの z-fight/スimmer 回帰（4 ビュー色分散比較）
node scripts/env-test.mjs       # 風・燃料・乱流・ナビ計算テスト
node scripts/sop-test.mjs       # JAL/JTA マニュアル反映データ検証（V 速度・V_FE・Vref/Vapp）
node scripts/layout-test.mjs    # UI 重なり自動検証（iPhone 横 5 解像度）
node scripts/ui-shot.mjs        # 計器盤・環境（夕焼け/夜雨）スクリーンショット
node scripts/manual-shot.mjs    # マニュアル改良部（SOP バナー・V 速度バグ）スクリーンショット
node scripts/shots.mjs          # スクリーンショット検証
```

### 本納品時に確認した内容（2026-10-09 / UI 修正・Phase 4-6 追加 2026-10-10 / AP・ヨーク・PMS 2026-10-13）

| 項目 | 結果 |
|---|---|
| TypeScript strict 型検査 | PASS |
| 物理スモークテスト | **10/10 PASS**（3機体で NaN/発散なし / 離陸滑走→抬頭→上昇 / 急ピッチで G=5.3 / 失速で大迎角→頭下げ / ロール応答の機体差 b737>b777 / 急旋回でエネルギー損失 / 乱暴入力30秒発散なし / ブレーキ停止） |
| 環境・ナビテスト（env-test） | **17/17 PASS**（風方位規約 / 横風で風見発生 / 燃料消費（飛行中のみ）/ 乱流30秒安定 / 滑走路残距離 / 進入整合 / 滑走路番号・方位） |
| 実ブラウザ回帰テスト | **19/19 PASS**（自由飛行開始 / 滑走 IAS73 / 離陸 AGL66m・pitch 8.8° / **計器盤描画** / **音声準備** / **環境チップ** / **風12 m/s 適用** / カメラ / フラップ・ギア / **SOP コールアウト 5 項目**（80kt/V1/ROTATE・POSITIVE RATE・1000/500/50/30ft・60kt・バナー要素）/ 一時停止 / メニュー / **第2空港 SKY 開始 (2980,-1400)** / **JS エラー 0 件**） |
| UI 重なり自動検証（layout-test） | **5/5 PASS**（iPhone SE/13-14/Pro Max/iPad/極小 横画面すべてで計器・ボタン・スロットルの矩形交差 0 件） |
| マニュアル反映データ検証（sop-test） | **53/53 PASS**（単位換算 / 第2章 離陸 V1/VR/V2・N1・トリム 5 行と補間 / 第1章 V_FE・実務推奨速度 8 行 / VMO 340kt と OVERSPEED 閾値 / 第5章 Vref 表・Vapp 風補正ルール（マニュアル例 130+5+(15-10)=140 一致）/ ロード率近似式） |
| スクリーンショット | 計器盤 6 セル描画 / 夕焼け・夜+雨の空色変化 / SKY 空港の描画をカラー解析で確認 |

#### 2026-10-10 スティック固定化・低感度化（v3）＋ 地形 v2

- **スティック**: ベース円をゾーン内に**常時固定表示**。入力は**タッチ点からの相対ドラッグ**
  （触った瞬間＝中立・円外タップで初期バイアス無し）。デッドゾーン 8px・べき乗カーブ 1.45・
  スルトレート 2.2/s・満舵出力 0.9 上限（方向: 上=機首上げ・右=右バンク）。ベース径は画面高さで
  96〜128px に可変。キーボードは従来どおり（矢印=満舵）。
- **地形 v2**: GPU 変位クリップマップ（48km/8km/2km の 3 層・境界 morph）で実際の立体起伏、
  山脈/谷/河川/農地、太陽影、高度連動フォグ（詳細: docs/DESIGN.md §3.6）。
- **検証**: browser-smoke **21/21 PASS**（スティック方向 + 低感度チェック追加: 満舵 0.9 /
  離すと 0 復帰 / 8px 以内は中立）/ layout-test 5 PASS / layout-audit 縦 0 件・横は
  非操作レイヤー（pointer-events:none）の意図的重なりを「許容」に分類 / physics 10・
  env 17・sop 53・flicker 4/4 PASS。スクショ: screenshots/stick-fixed-*.png・terrain-*.png

#### 2026-10-10 スティック方向修正（実機指摘「スティックと反対に動く」対応）

- **原因**: タッチスティックのピッチのみヨーク規約（下ドラッグ=機首上げ）になっており、
  ノブの動き（指と同方向）と機体の応答が逆に見えた。キーボード（↑=機首上げ）とも不一致だった
- **修正**: 直感方向へ統一 — **上ドラッグ=機首上げ / 下=機首下げ / 右=右ロール / 左=左ロール**（キーボードと同じ規約）。
  物理側（elevator +1=機首上げ / aileron +1=右ロール）は検証済みで正常、変更なし
- **回帰テスト**: browser-smoke にスティック方向チェックを追加（上/下/右ドラッグ → pitch/roll 符号を実測）

#### 2026-10-10 の UI レイアウト修正（実機指摘「操作ボタンと計器の重なり」対応）

- **原因**: スロットルレバーとヨー/ギアボタンが同一座標帯（right 168px）に配置 / スロットル上端が右上計器パネルに接触 / カメラ名が中央下でボタンと衝突
- **修正**: 右下ボタン 9 個を CSS grid（3×3・`#btn-cluster`）に集約し内部重なりを構造的に排除 / スロットルをクラスタ左（間隔 16px 固定）に移動・高さ clamp(104px, 38vh, 160px) / HUD を 4 行コンパクト化 / カメラ名をクラスタ先頭行へ / 再スタート・VIEW ボタンを左下へ / 低さ ≤380px でさらにコンパクト化するメディアクエリ追加 / スティック領域を 50%×62% に縮小（左下ボタンと非接触）
- **回帰テスト修正**: 離陸 PD の減衰符号が逆（`-ωx` → 速度比例の正帰還）でオーバーシュート→偶発失速していたのを `+ωx`（機体座標・rad/s）に修正。pitch 25° オーバーシュート → 目標 10° に安定追従

#### 2026-10-10 JAL/JTA B737-700 標準運航マニュアル反映（Phase 7）

用户提供の「B737-700 JAL-JTA標準運航マニュアル (完全版)」（FCOM & SOP・全 9 ページ）を
`docs/manual-b737.txt` に抽出・精読し、以下の数値/機能を実装した（出典章節を併記）。

- **機体データ**（`src/config/aircraft.ts` b737）: 全長 33.6 m（実機）/ MTOW 70,081 kg 未満の典型運航重量 62,000 kg / CFM56-7B×2 約 235 kN（近似）/ VR 73 m/s・Vapp 68 m/s を V 速度表から整合
- **フラップ detents**（`src/sim/flight-controls.ts`）: 0/1/5/10/15/25/30/**40°**（第1章 1.2 表）。初期 5°（離陸標準）。揚力/抗力係数は 40° 正規化
- **V 速度データ一元化**（`src/config/manual.ts`）:
  - 第1章 1.1: MTOW 154,500 lbs / MLW 128,000 lbs / 41,000 ft / **VMO 340 KIAS / M0.82**
  - 第1章 1.2: V_FE 限界と実務推奨展開速度 8 行（Flap1 250/230 … Flap40 162/140 KIAS）
  - 第2章 2.4: 重量別離陸 V1/VR/V2・N1・ピッチトリム 5 行（Load 10-20%: 125/125/135 … 90%+: 148/148/158）
  - 第5章 5.2: 着陸重量別 Vref 表（100,000 lbs: 121/118 … MLW: 137/134）と **Vapp = Vref + 向かい風/2 + ガスト成分**（補正 +5〜+20 kt。マニュアル例 140 kt と一致）
- **SOP コールアウト**（`src/ui/callouts.ts`）: マニュアル第4-5章の標準コールを画面バナー + speechSynthesis（英語）で発行
  - 離陸: **80 KNOTS → V1 → ROTATE（15°/2°/s）→ POSITIVE RATE — GEAR UP**
  - 着陸: **1000ft Stabilized → 500ft → 50 FT（フレア 2.5-3.0°）→ 30 FT（IDLE）→ 60 KNOTS（リバース解除）**
  - フラップ速度注意: 実務推奨展開速度超過で「FLAP SPEED」表示（第1章 1.2 の運用思想）
- **計器盤**（`src/ui/instruments.ts`）: 対気速度計をマニュアル準拠の色帯に刷新（緑=推奨以下/黄=推奨超〜V_FE/赤=超過）+ **VMO 340kt 白線** + **V2 バグ**（離陸）/ **VAPP バグ**（Flap≥25+ギア DOWN・風補正込み）+ VFE 併記。警告の OVERSPEED は VMO/V_FE の厳しい方、地上 20kt 超で GS 黄（第3章 3.2 タキシング）
- **運航技術の表示**: 抬頭 15°（2-2.5°/s）・着陸ピッチ 2.5-3.0°・50ft フレア/30ft IDLE の目標値をコールアウト文言に反映（第4章 4.1 / 第7章）

#### 2026-10-13 オートパイロット v4 + ボーイング ヨーク規約 + パーム島空港（Phase 8）

- **ヨーク規約反転（実機指摘対応）**: 元「上ドラッグ=機首上げ」をボーイング ヨーク本来の
  **下ドラッグ（手前引き）=機首上げ / 上ドラッグ（押し出し）=機首下げ**へ統一（キーボード ↑=機首上げは不変）。
  ノブはバンク分に比例して回転描画。同時に**物理側ロールのミラー不整合**（右舵で左へ傾く）を修正 —
  browser-smoke が実ルート（スティック→物理）で「右ドラッグ→右バンク 19°→右旋回 方位+3.6°」を通過
- **オートパイロット（`src/sim/autopilot.ts`）**: ピッチ軸 ALT（高度保持）・V/S（分当り上昇率）・A/T（速度保持 ±1 m/s デッドバンド）、
  横軸 HDG（±28°バンク制限・協調旋回）、ILS LOC/GS→APPR（カットオフで GA/ミニマルアラート）。
  高度外ループは**仮想高度積分**（V/S モード）+ 内姿勢ループ PID（kP .25/kI .15/kD .18・抗windup）—
  限界発散なしで autopilot-test **30/30 PASS**（レベルオフ vs −0.08 m/s、LOC 横方向 0.8 m、GS −1.5 m、接地 ias 116kt・AP 自動切断）
- **AP UI**: `AP` トグル（`btn-ap`・A キー）/ ステータス strip / `btn-ap-set`（現高度・現速度Capture）/
  ALT ±100・V/S ±100・SPD ±10・HDG ±10 ドラッグつまみパネル（`#ap-panel`）
- **パーム島空港 PMS**（`src/config/airports.ts`）: 洋上離島、滑走路 09/27（1,800 m）、進入・復行とも海面。
  地形は空港 carve で海面以上フラット（島）。メニュー空港チップ 3 件目として選択可
- **不具合修正（実ブラウザ）**: 地形シェーダ `uniform vec4 uAirports[4]` に対し JS 側配列が 3 件のままで
  uniform アップロード時 `undefined.toArray` クラッシュ → 未使用スロットをダミーでパディング。
  **JS エラー 0 件**（browser-smoke 最終ゲートで回帰固定）
- **検証**: typecheck PASS / browser-smoke **30/30** / autopilot-test **30/30** / physics 10 / env 17 / sop 53 /
  layout 5 / flicker 4 PASS。スクショ: screenshots/palm-gspawn.png（離陸滑走）・palm-overview.png（島上空）

#### 2026-10-13c 爆笑 → 炎上の衝突爆発へ（実機要望）

- **😂 ボタン廃止** → 地面・建物への衝突で **爆発**するようになった
- **建物当たり判定**（`src/render/city.ts` `buildingColliders`: 通常市街 260 棟 + タワー 46 棟を円近似+高さで登録）。
  main ループが毎フレーム機体位置と照合し、命中で `game.forceCrash()`（残骸非表示・AP 自動遮断）
- **地面ハードインパクト**: 物理の大接地判定（-8 m/s）未満でも、降下率 -5.5 m/s × 対地速度 28 m/s 超、
  またはギア未展開 46 m/s 超の接地で爆発吹っ飛びに格上げ
- **爆発 FX**（`src/render/explosion.ts`）: Points シェーダで炎球（加算・赤→橙→黄）+ 破片 + 黒煙（上昇・膨張）、
  2.5s の残煙サック、PointLight フラッシュ、**カメラ近傍の煙は自動フォールド**（画面が曇らない）、
  画面シェイク（指数減衰）。音は 1400→55 Hz スイープの破裂ノイズ + 超低域 + 破片サラサラ 5 発
- **検証**: browser-smoke **30/30**（建物テレポート衝突→crash+パーティクル実在・😂 撤去確認を新アサート化）、
  autopilot 30/30・physics 10/10・typecheck・build PASS。スクショ: screenshots/boom-fireball.png

#### 2026-10-13b 「操縦桿の左右が逆」対策 + HDG/V/S チップ + 爆笑 + 高層ビル

- **ADI（姿勢指示器）左右ミラー修正 — が本体**: 機体挙動（スティック右=右旋回）は物理・メッシュ・計器数値
  すべて正常と実測確認（クォータリオン直接スキャンで左舷 +X 上昇=右バンク一致）。しかし**姿勢指示器の
  地平線だけ `ctx.rotate(+bank)` で逆回転**しており「計器上は左バンク」に見えていた → `rotate(−bank)` に修正。
  回帰として browser-smoke に **ADI 地平線傾きのピクセル実測アサート**（右バンク→右列の地面が上、
  期待傾き tan(bank) 許容窓）を常設
- **AP ストリップ・モードチップ**: ストリップ上に **HDG / NAV / V/S / ALT** のダイレクトチップ（1 タップで
  接続済みならモード切替、未接続なら自動接続してからセット）。パネルを開かなくても操作可。
  V/S は nudgeVs(0) で現在選択値のままレートモードへ
- **爆笑エモーション 😂**: 左下 `btn-laugh`（😂）で笑い SE（triangle 波 8チャンク・ピッチ揺れ）+ 画面中央に
  BIG 😂 と小 😂🤣 が舞い上がるパーティクル（Web Animations）。**クラッシュ/ハードランディング時に自動発動**
  （「吹っこけた！ 爆笑 😂」バナー + 笑い SE）。1 クラッシュ 1 回制限付き
- **高層ビル（スカイライン）**: `src/render/city.ts` に都心核+副核 3 箇所の **46 棟上限・150〜335 m グラス
  タワー群**（InstancedMesh 'towers'、金属調・45°スナップ回転・海面/砂浜回避）。夜景用 emit はなし
- **検証**: browser-smoke **30/30**（チップ 4 動作・爆笑パーティクル・towers≥20・ADI 符号 追加）/
  autopilot 30 / physics 10 / typecheck / build PASS。スクショ: screenshots/towers-city.png

#### 2026-11-04 画質強化: 胴体リペイント修正 + パネルライン + ultra 階層

| 項目 | 内容 |
|---|---|
| **胴体 UV 修正（バグ）** | `LatheGeometry` の UV は u=周回/v=長さだが、胴体テクスチャは x=長さ/y=周回で描画されており **窓列が機首回りのリング状になる**誤りが長期潜伏していた（スクショで赤帯が機首を一周しているのが証拠）。`airliner.ts` で fusGeo の uv を入替えて整合、`makeFuselageTexture` を上下対称レイアウト（腹部バンド y196-316 / 左右チートライン y146,361 / 窓列 y186,320 / ドア左右各2 / 対称コックピット窓）に再設計 |
| **パネルライン** | `textures.ts` に `makePanelMaps()`（512² タイル、フレーム+ストリンガーの溝を接空間 normal map、パネル単位の粗さ変化+汚れを roughness map、リベット刻点）。胴体専用 `matFuselage = matPaint.clone()` に `normalScale 0.6` / `repeat (2,3)`（縦≈2.4m・周回15°ピッチ）で適用。ナセル等は素の matPaint のまま |
| **ultra 階層** | `QUALITY.ultra = { pixelRatio 3.0, shadowMap 4096, tree 1400, city 420, cloud 36, terrainNearSeg 200 }`。メニューチップ「画質: 最高」、`QUALITY_ORDER` に追記（自動調整の上限はメニュー選択のまま） |
| 検証 | typecheck/build GREEN（`index-BbAtJMGh.js`）/ autopilot 30/30 / physics 10/10 / browser-smoke 30/30 / `shots.mjs low` 11 ショット JS エラー 0 / ultra 起動無エラー確認（SwiftShader ため撮影タイムアウトのみ）/ 至近スクショ `screenshots/fuse-side-check*.png` で窓列・塗装対称性・パネルライン視認 |

#### 2026-11-04b サーバー非依存化: 静的デプロイ & 単一HTML

| 項目 | 内容 |
|---|---|
| 前提確認 | 実行時の外部取得なし（fetch/XHR/SW/localStorage ゼロ、音声も手続き生成）→ サーバー不要で成立。`vite.config` は `base:'./'` 済み（サブパスの GitHub Pages 対応） |
| **デプロイ用 zip** | `web/` 直下（index.html+assets）を **Netlify Drop / Cloudflare Pages / GitHub Pages** に置くだけ（Drop は zip ごとドラッグ可）。同梱成果物: `deploy/airliner-sim-static.zip`（178KB、`cd web && zip -r ../deploy/airliner-sim-static.zip .` で再生成可） |
| **単一HTML（file:// 可）** | `node scripts/inline-single.mjs` → `web-single/index.html`（641KB、JS/CSS インライン）。PC のブラウザでダブルクリック起動・オフライン動作。**iOS Safari ではローカル HTML を実行できない点に注意**（iPhone で使うなら静的ホストの URL を開く） |
| 検証 | file:// 実測 PASS（headless Chromium: menu rendered / state=flying / JS errors 0）。`</script>` 早期閉じエスケープと `String.replace` の `$&` 展開バグ検知ガードつき（実際に関数置換で修正） |
| 運用変更 | 静的ホストに常設後は serve.mjs/tunnel/watchdog は退役可。現在の暫定URL: `TUNNEL_URL.txt` 参照（trycloudflare は ephemeral） |
| 恒久ホスト自動発行の試み | surge.sh は CLI デプロイ成功後も**新規アカウントのメール認証ゲート（403）**で公開不可。使い捨てメールドメイン（mail.tm 等）には認証メールが配信されず（8分×2アカウントで不達確認）。`netlify-cli` の `--allow-anonymous` も廃止済み（v17 で unknown option）。Netlify Drop / GitHub Pages はブラウザ側のログイン操作が必要なため手動運用（zip 投入で 1 分） |

#### 2026-11-04c GitHub Pages 運用（恒久URL・自動デプロイ）

リポジトリを GitHub に置くだけで `https://<user>.github.io/airliner-sim/` に恒久公開。push ごとに **typecheck→build→Pages デプロイが自動**（`.github/workflows/pages.yml`）。

**ルートA: フルリポジトリ + Actions（推奨・更新自動化）**
1. github.com/new で `airliner-sim`（Public）作成
2. `deploy/airliner-sim-repo.zip` を**解凍した中身ごと**「uploading an existing file」でドラッグ（zip そのままは解凍されない。1.6MB・91ファイル、node_modules/web 除く全ソース）。または `git init` 済みなので `git remote add origin … && git push -u origin main`
3. Settings → Pages → **Source: GitHub Actions**（ブランチ選択式のままにしない）
4. Actions タブの "Deploy to GitHub Pages" 成功後、上記URLで公開済み（ビルド約1〜2分）

**ルートB: 静的zipのみ（即公開・更新は手動）**
1. 新規リポジトリに `deploy/airliner-sim-static.zip` を解凍した 4ファイル（`index.html` / `assets/` / `.nojekyll`）を選択して upload
2. Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)` → Save → 約1分で `https://<user>.github.io/<repo>/`

注意点: `vite.config` の `base:'./'` によりサブパス `/repo/` で動作確認済み（絶対パス不要）。`web/` 直下に **CNAME ファイルを残さない**（サロゲート独自ドメイン指定と誤読される。surge 実験時の残骸は削除済み）。

#### 2026-11-04f 環境 bloom・夜景灯光・海面リフレクション・滑走路 4K

- **bloom（UnrealBloom 0.42/0.62/0.8）**: high/ultra で有効。EffectComposer+OutputPass 経路（ACES は OutputPass 適用で二重掛けなし）。`game.syncPostFx()` で resize/pixelRatio 変更に追随、low/medium は素通しのまま
- **夜景灯光**: 時刻プリセット `nightLights` を実消費——滑走路縁灯/誘導路青灯/PAPI を夜のみ高輝度化（昼は減光）、市街は窓 emissive マップ（暖色点滅パターン）+超高層障害灯（赤クンビーコン InstancedMesh）、星空 1400 点（夜のみ・ソフトスプライト加算、夕刻では出ない閾値）
- **海面**: 実空パレット同期リフレクション（反射線が指す空勾配+太陽方位の暖色、sunset で海が橙に）、低太陽角の glitter 帯。環境マップは時間帯ごとに PMREM 再焼成（機体 IBL が夕焼けを映す）
- **滑走路テクスチャ**: ultra/high で 1024×8192（4 倍画素、ctx スケールで旧描画ロジック全互換）+ランウェイグルービング+aniso16。medium/low は 512 維持
- ultra プリセット増強: tree 2000 / city 520 / cloud 44 / terrainNearSeg 256 / shadowRange 2800
- 検証: typecheck✓ build✓（666KB）smoke **29/30**（1 件は baseline worktree でも同一の既存ハーネス事象）/ autopilot 30/30 / physics 10/10 / JS error 0（bloom 有効時の全環境ショット込み）。夜/夕/昼スクショ `screenshots/v3/`
- 既知: 敷居マーキングのローリングモアレ（旧来からの現象、本次改動で悪化なし=旧スクショと同一確認済）

#### 2026-11-05 地面の距離感・立体感パック（開発依頼への正式対応）

**A. 地形の立体感** — CPU `relief()` と GLSL `reliefV()` の**両方に同一式**でメソうねりを追加（`fbm(p*0.00035+(8.3,4.1),2)*±150m`、波長 ~2.9km）。平野が完全平面でなくなり、低空で地平線のうねりが視差を持って動く。空港平坦域は flatMask ゲートのまま所以、滑走路/誘導路は完全に平坦維持。物理高度場は同一関数のため接地判定は自動整合（physics 10/10・autopilot 30/30 で確認）。中距離色に擬似 hillshade（斜面向きで ±9% 明暗）を追加し起伏の読み取りを支援

**B. 地表の遠近 3 層** — 近距離: タイルディテール+マイクロノイズ（既存 v5i）/ 中距離: **道路網の連続化**（リングロード+放射 2 本を追加生成、沿道に家屋集落を配置）+農地モザイク（既存）/ 遠距離: 色相ムラ 4 周波+フォグ ramp（既存）を維持し、13km 超のノイズ打ち切りで負荷を近接に配分

**C. 地上物** — ①**沿道集落**: 道路ポリライン 200m ごとに両側 56〜176m へ小box 家屋（InstancedMesh・最大 340 棟・**draw call +1**・窓テクスチャ/夜間点灯は市街地とマテリアル共有）。都心 r4.1km 内と空港 3.7km 内は自動回避 ②**空港外周ベルト**: 各空港 3.65〜5.2km に低層倉庫・工場 120 棟（+1 draw call）→ 進入開始地帯にスケール参照 ③市街外周（r>2.75km）は 55% の確率で 9〜24m の低層高密度帯に変更（高さの尺度変化）④森林: 1.6km 周期の valueNoise で**林班むら**（空隙模様）+高さゆらぎ拡張 ⑤**空港环岛樹林帯**: 樹高 20〜30m 相当 44 本/空港。滑走路延長線上（軸 ±38°）は配置しない進入安全考慮

**D. 機体の影** — blob を真下固定から**太陽方位投影**へ変更: 影先 = 機体位置 − 太陽水平成分 × `agl/tan(elev)`（上限 agl×1.6+46m）。低太陽角で楕円が引き伸ばされ、 elongation に応じて**ぼかし（ソフト化）と減光**が入る。地面高さへ追従（地形上の影が浮かない）、機体位置基準化で orbital カメラでも機体下に追従。日没後は太陽高度係数で auto fade。実シャドウマップは品質プリセット依存のまま（low/medium での追加計算なし）

**E. カメラ** — ①chase: `pose.agl`（新規・両飛行モードで供給）による低空 FOV 補正 +0〜3.2°。**AGL<300m で地面が画面外へ流れ、速度感が距離情報に変わる** ②コックピット FOV 68→62（魚眼歪みを減らし計器盤・風防枠の収まりを改善）③フォグは v5 で調整済（near 2600/far 34000+高度連動）を維持

**パフォーマンス**: draw call +3（village/suburb/環状木帯は既存 InstancedMesh 内で増やしたため 0）。新規頂点コスト=うねり項（fbm2×2 octave/頂点のみ）。フラグメント追加は hillshade の clamp 1 本。低/中品質プリセットで有効な追加負荷はほぼゼロ。iPhone 実機未検証（スコープ外・要実機確認）

**検証**: typecheck✓ build✓ browser-smoke **30/30**（AP 環境 FAIL も今回 PASS）/ autopilot 30/30 / physics 10/10 / ac-qc 5 ショット JS errors 0（climb: 樹林帯と村、sunset: 長影、approach: 平坦維持確認）

#### 2026-11-04l 機首外観の「黒ずみ」修正（コックピット窓位置 + 胴体小物）

- **報告**: 「機体のコックピット周りが黒い」→ **バグだった**
- **原因①**: `makeFuselageTexture` のコックピット窓描画が **x=26〜196px（機首 0.4〜3.2m）** = ラドーム円錐の上。半径の小さい領域に引っ掛かり、境界際に黒い点汚れが浮いて見えていた
- **修正①**: 窓を x=250〜470（ラドーム境 212px の後ろ、実機の風防位置 4〜7.5m）へ移動。**天面シームをまたぐ回り込みバンド**（上面 fillRect 2 枚 + 側面台形）+ 機体色の柱 3 本 + 上縁ハイライトで「風防がノーズを囲む」外観に。ドア枠は黒線 lw3 → 淡地+lw2 細線に減光
- **原因②**: 背中の黒いトゲ = ブレードアンテナ 4 本が `0x39424b`（ほぼ黒）。実機は胴体色。`0xaeb9c4` の低金属に変更。水平尾翼端の静電放電素子は v5j の尾翼移動（0.32→0.25 / y0.55→0.12 / z-0.38→-0.415L）に未追従で空中に浮いていたため新位置へ追従（`hstabTip()` は廃止）
- **検証**: `scripts/ac-nose-close.mjs`（chase モードのまま rig 乗っ取り、コクピット内装を隠して正しく外観判定）before/after スクショ。browser-smoke 29/30・build ✓

#### 2026-11-04k コックピットビュー修正（目線が計器盤より前方にあった）

- **症状**: 機体切替でコックピットビューにすると計器盤・内装が一切出ず、太い黒柱が画面を横切る謎の画になる
- **原因**: 2 つが重なっていた——①`cameras.ts` cockpit の目線 `z=size*0.365`(=+12.3m) がコックピット群の計器盤 z11.09・グローシールド z13.27 より**前方**で、カメラが内装の外（窓柱の間）に出ていた。旧機体寸法基準のオフセットが胴体再設計（G パック）後も更新されていなかった ②目線が計器盤前面ガラスの中を向くため、実体は窓柱 3 本と計器盤縁の帯だけが大きく写っていた
- **修正**: 目線を `z=size*0.305・y=size*0.026`（計器盤 0.84m 後方・目線高さ 0.87m）へ後退。グローシールド下面 + 双流れ窓柱 + 双ヨーク + 計器盤上端が画面下 1/4 に収まる標準的なコックピット画に
- **検証**: 強制 blend 完走 + 手動 render ハーネス（`scripts/ac-cockpit-probe*.mjs`、headless は rAF が ~0.2fps なので blend をステップ送りで完了させる手法を確立）で seat-A.png 確認。camera forward・plane nose dot=1（向き正）/ browser-smoke 29/30・autopilot 30/30 / build ✓
- 教訓: headless SwiftShader でのカメラ検証は **`page.screenshot` 前の明示 `renderer.render`** が必須。rAF マレのフレームを撮ると blend 中断位置が写って誤診する

#### 2026-11-04j 三人称で「翼が 2 枚」問題（水平尾翼の比率・位置修正）

- **症状**: 後方視点で主翼の下にもう 1 組同じような白い翼面が見える → 「羽が 2 枚」
- **原因**: 主翼の複製ではなく**水平尾翼のデカさ**。`hStabSpan = wingspan*0.32`（半幅基準で主翼の 64%、実機比 ~50%）+ 取付高 `R*0.55`（胴体中央より上）+ 後退 `sweep+0.08` が、後方から主翼ラインとほぼ同じ大きさ・角度で重ねて見せていた
- **修正**: 半幅 `wingspan*0.25`（実機 777 相当の比率）、コード 0.52/0.22 に縮小、後退 `+0.14`、取付 `y=R*0.12・z=-0.415L`（テールコーン基部寄り・下方）へ。基部フェアリングも追従（`y R*0.22/z -0.40L`、y 方向 0.55 スケール）
- **検証**: 専用ハーネス `scripts/ac-wing-view.mjs`（後方固定 3 角度・水平/追従比較）で before/after スクショ。後方・左後方 1/4 とも尾翼として読めるシルエットに。browser-smoke 29/30（既知環境 FAIL 1）・autopilot 30/30 / build ✓

#### 2026-11-04i 距離別ディテール配分（近接=実テクスチャ / 遠景=粗描画）

- **近接地の画質**: 地面ディテールタイル `makeGroundDetailTexture()`（512²・30m タイル・r=粒/g=斑/b=草葉、シード固定 LCG で決定論的、継ぎ目は wrap 描画でゼロ化）を地形 shader に導入。`vTXZ/30` でサンプリングし**mip+aniso8** により至近距離でも破綻しない実粒度（ハッシュノイズのべたつきが消える）。アルベド乗算 `(gDet-0.5)*vec3(.44,.34,.26)*gDetQ` に加え、**勾波 4 タップで視空間法線を摂動**（`inverse(viewMatrix)` で world に回して傾き加算、強度 2.6）→ 芝・土の微观リリーフが光で動く
- **距離ゲート**: `gDetQ = 1-smoothstep(300, 1450, dist)`。遠方は 1 サンプルのみで乗算ゼロ（分岐で法線摂動はスキップ）
- **遠景の減量**: 手続きノイズの打ち切りを 14〜20km → **9〜13km** に手前化（crop/snow/モトルの nearQ）、森林キャノピー+粒レイヤー <7km（旧 <9km）。クリップマップは coarse 192→152・mid 160→128 seg（morph 継ぎは同一ポリライン保証）で**遠方の地網を粗く**、その分 near を ultra 320/high 256 seg に増強し機体周囲の起伏シルエットと影を密に
- **検証**: typecheck✓ build✓ / browser-smoke 29/30（既知環境 FAIL 1）・autopilot 30/30・physics 10/10 / ac-qc JS error 0（v6-roll/climb/cruise ショット: 離陸地上の微观凹凸・低空の農地小区鮮明・巡航遠景の粗化を確認）

#### 2026-11-04h 地面テクスチャ密度アップ（「のっぺり」第 2 弾）

- **中~遠景のもみ上げ**: 陸地色に 4 周波数を追加——~930m 色调ムラ（±16%）、~170m 明暗斑（緑を削る混色）、~115m 森林キャノピー斑（forestT weighted の暗緑塊）、~51m 粒子（<9km ゲート）。従来の micro ノイズが 2.9km で切れるため中距離が無テクスチャだった領域を解消
- **農地モザイク強化**: 600m セルの約半数を 300m 四小区に分割（h2i で決定）、作物パレット 4→6 色、セル明度 ±16% 揺らぎ、区内湿分勾配+斑点、生垣を暗緑の植生色に置換
- **飛行場芝**: af 上書き後に 2 周波ノイズ（粒+斑）+ 24m ピッチの刈り跡バンド（x 軸、2.6km 以降フェード）。駐機帯周辺の「塗った平面」感を解消
- **砂浜**: 0〜34m 高度帯に潮だまり風の明暗（115m 周期、nearQ ゲート）
- 検証: typecheck✓ build✓ / ac-qc JS error 0（roll・cruise ショットでパッチワーク/モトル視認）/ browser-smoke 29/30（既知環境 FAIL 1）

#### 2026-11-04g 地面画質パック + 距離感（大気遠近・高度ブラブ）

| 項目 | 内容 |
|---|---|
| **地面マイクロテクスチャ** | `terrain.ts` の GLSL カラーに距離ゲート付きノイズ 2 層（`microQ`: 1.1km 内フル→2.9km でゼロ。0.34/0.90 空間周波数で草むら・砂粒のざらつき）。600m セル単位のフラット色面だった近接地にPerPixel のムラが出、低空で「塗った感」が解消 |
| **農地の畝（うね）** | 作物セルにハッシュで軸（x/y）と位相を決め 19m 周期の明暗ストライプ。700m 超でエイリアス防止フェード、高度 280m 以上（低地帯の外）と急斜面・飛行場敷地は対象外 |
| **大気遠近（距離感）** | `FOG_NEAR 6000→2600`（5km 沖が完全クリアだったのを薄霧に）/ `FOG_FAR 42000→34000`。地形のみ追加ヘイズ ramp（`smoothstep(4500,15000)*0.45 + smoothstep(13000,24000)*0.55`）で陸地が空より先に霞み、等深度の海と遠近の段差が出ないように整合 |
| **高度ブラブ（ground blob）** | `game.ts`: 機体真下の地面にソフト radial-gradient 楕円（半径=全幅×0.42+AGL×0.11、AGL<360m のみ可視、低いほど濃く小径）。影マップ ON/OFF・時刻に関係なく常に薄く出て、フレア時の接地距離判断を補助。海上は海面高にクリップ |
| 検証 | typecheck✓ build✓ browser-smoke **29/30**（1 件は既知の環境 FAIL・baseline 同一）/ autopilot 30/30 / physics 10/10 / ac-qc 全ショット JS error 0。スクショ `screenshots/v3/v3-day-roll|day-cruise|sunset-cruise|day-approach2.png` |
| 注意 | shader 内 `\n` は**JS 文字列内で一重エスケープ**（`\\n` にすると GLSL にリテラル \n が渡りコンパイル失敗の実例あり） |

#### 2026-11-04e 機体グラフィック G パック（胴体専用に絞った大型改訂）

- **塗装**: 胴体テクスチャ 2048×1024 化（窓=フレーム+ガラス勾配+反射/ドア窓/双チートライン/コックピット 4 枚窓/貨物ハッチ/腹部汚れ）、**社名 SKYLINER・登録記号（JA73AI 等）** を対向側で文字が読めるようミラーペア描画。機体色は **MeshPhysical クリアコート**（駐機機は Standard 据え置き）
- **形状**: ラドーム別メッシュ、APU テールコーン、翼胴/尾翼基部フェアリング、**曲率付きシャークレット**（リバータ継ぎ目・インテークリップ・実体ファンブレード 22 枚 InstancedMesh・スピナー・排気ノズル+プラグ）、主脚オレオ 2 段+トークリンク+ハブ/ボギー、**ベイ戸 4 枚が格納/展開に連動開閉**、ブレードアンテナ/SATCOM×2/TCAS 上下/静電放電素子 8 本、ランディングライトレンズ（降脚連動発光）
- **尾翼 liveried**: 根本→先端グラデ+スウォッシュ+エンブレム（両側対称のため文字なし）
- ナセル/パイロンは無地塗装（胴体テクスチャの引き伸ばしを解消）
- メニュープレビューを **フルディテール化**（1 機のみ・low は駐機機だけ）
- 検証: typecheck✓ build✓ browser-smoke **29/30**（1 件は HEAD 側 worktree でも同一 FAIL=当 VM の chromium 切替起因のハーネスタイミングで本改動と無関係／AP 自体は単独 repro で engage 保持・autopilot 30/30・physics 10/10 PASS）、closeup 4 角度スクショ `screenshots/v2/`
- 未承認スコープ（滑走路 4K/bloom/海面反射）は引き続き未着手

#### 2026-11-04d 恒久公開済み（GitHub Pages・branch deploy）

**公開 URL: https://jenifer114514.github.io/airliner-sim/**（検証済: 200×3 / title一致 / `index-BbAtJMGh.js` 200 / 404処理正常）

- 構成: `gh-pages` ブランチにビルド成果物（`web/` の中身）を push → Settings→Pages「Deploy from a branch / gh-pages / root」
- 経緯: Actions 自動デプロイ（pages.yml）は fine-grained PAT に `workflows` 権限が必要で拒否されたため branch 方式に切替。`main`（ソース）は権限不足で未 push。リポジトリ: `Jenifer114514/airliner-sim`
- **更新手順**: セッションで「更新」と依頼 → ビルド → gh-pages へ再 push（contents:write のトークンがあれば代行、無ければ `deploy/airliner-sim-static.zip` を gh-pages に手動 upload でも可）

### 未確認 / 既知の制約

- **未確認**: 実機 iPhone のフレームレート・発熱・タッチ操作感・実際の音量バランス / 自動画質調整の実機挙動 / **speechSynthesis による英語コールの実機 iPhone 音質・遅延**（ヘッドレスでは発話自体を確認できない。バナー表示は browser-smoke で検証済み）
- **既知の制約**: ①音声は WebAudio 合成（外部音源なし）で iOS は初回タップ後に有効 ②夜間灯は滑走路灯・航行灯ベースの簡易表現
  ③雲はスプライト方式（雲影つき）④機体は手続き生成（GLB 差替は別途）
  ⑤画質の配置数変更（樹木/市街地）は再スタート時に反映 ⑥接地モデルはギア 1 点近似（転倒は 38° でクラッシュ判定）
  ⑦燃料は表示用消費モデル（質量変化 <2% は未反映）⑧雨はカメラ追従パーティクルの近似
  ⑨ロード率（V 速度算出）は OEW 41,140 kg の**近似値**に基づく線形式（マニュアルの Load % 表へ機械的に補間）⑩Vref は着陸重量に離陸時の質量を使用（燃料減による軽減は未反映のためやや高め）

### Phase 実装状況

- **Phase 1（3D 描画基盤）**: 完了・動作確認済み
- **Phase 2（グラフィック品質向上）**: 完了 — 雲（クラスタースプライト + 雲影 + 巻雲）/ 滑走路ゴム付着・補修パッチ / 誘導路黄色ライン・待機位置・標識 / ジェットブリッジ / エプロンマーキング / 航行灯・ストロボ・ビーコン / フラップトラックフェアリング
- **Phase 3（飛行システム）**: 完了 — 6-DOF 物理（L=½ρV²S·CL / D=½ρV²S·CD / モーメント / 失速 / G / 接地・車輪摩擦・ブレーキ）/ 仮想スティック / スロットル / ヨー / フラップ / スポイラー / ギア / キーボード操作
- **Phase 4（コックピット計器）**: 完了 — Canvas 2D 計器盤 6 セル（対気速度計・姿勢指示器・高度計・昇降計・方位計 HSI・状態パネル）/ HUD 拡張（燃料・風・対地速度・滑走路距離・FPS）/ 滑走路方位バグ / 警告（STALL・OVERSPEED・GEAR・FUEL）/ 警告音・計器 ON/OFF
- **Phase 5（空港拡張・天候・時刻・音声）**: 完了 — **複数空港**（HLM 湾岸 34/16 + SKY 丘陵 27/09）/ **時刻**（昼・夕焼け・夜 = 空色・光量・夜間灯）/ **天候**（快晴・くもり・雨 = 雲量/暗さ/フォグ/雨パーティクル/乱流）/ **風**（無風・そよ風 5 m/s・強風 12 m/s。物理の対気速度・風見に反映）/ **サウンド一式**（WebAudio 手続き生成: エンジン・風切り・警告ホーン・フラップ/ギア駆動・着地・UI クリック）
- **Phase 6（最適化と QA）**: 完了 — FPS 監視（中央値サンプラー）→ **自動画質調整**（低 FPS で段階降下・高 FPS で回復、上限はメニュー選択値）/ 計器盤に FPS 表示 / UI 重なり自動検証 / 全 46 テスト PASS。**実機 iPhone の FPS/メモリ/発熱計測は未実施**（ヘッドレス環境では測定不能のため）
- **Phase 7（JAL/JTA マニュアル反映）**: 完了 — B737-700 FCOM & SOP 実データ（V 速度・V_FE・Vref/Vapp・フラップ 40°）を config/manual.ts へ一元化 / SOP コールアウト（バナー + 英語音声）/ 速度計 V 速度バグ・色帯刷新 / OVERSPEED 閾値を VMO/V_FE 準拠に。**全 104 テスト PASS**（physics 10 + env 17 + sop 53 + layout 5 + browser 19）
- **Phase 8（オートパイロット・第 3 空港・ヨーク規約）**: 完了 — AP v4（ALT/V/S/HDG/LOC/GS + A/T。法則詳細 docs/DESIGN.md §6）/ パーム島空港 PMS（洋上 1,800 m）/ ボーイング ヨーク反転 + 物理ロールミラー修正。**全 145 テスト PASS**（physics 10 + env 17 + sop 53 + layout 5 + autopilot 30 + browser 26 + flicker 4）

---

## 3. ファイル構成

```
airliner-sim/
├── index.html / package.json / tsconfig.json / vite.config.ts
├── docs/DESIGN.md            # 技術設計（選定理由・物理方針・フェーズ計画）
├── docs/manual-b737.txt      # JAL/JTA B737-700 マニュアル抽出テキスト（Phase 7 出典）
├── scripts/serve.mjs         # web/ 静的配信
├── scripts/physics-test.mjs / env-test.mjs / sop-test.mjs / layout-test.mjs / browser-smoke.mjs / autopilot-test.mjs / flicker-test.mjs
├── scripts/ui-shot.mjs / manual-shot.mjs / shots.mjs  # スクリーンショット検証
├── scripts/png2ascii.py / color_ascii.py / review.py  # 画像検証ツール
└── src/
    ├── main.ts               # 起動・ライフサイクル・警告/SOP 配線
    ├── config/               # constants / aircraft（B737・B777・A320）/ airports
    │                         # ** manual（JAL/JTA B737-700 V 速度・V_FE・Vref/Vapp）**
    ├── core/                 # math（fBm ノイズ）/ quality（画質・FPS 監視）
    ├── render/               # renderer / sky（大気シェーダ+IBL）/ terrain / water
    │                         # airport / city / nature / textures / airliner / cockpit / cameras
    ├── sim/                  # physics / aero / flight-controls / nav / audio / demoFlight
    ├── ui/                   # menu（3D プレビュー）/ instruments（計器盤）/
    │                         # **callouts（SOP コールアウト）** / overlays
    └── game/game.ts          # 状態機械・配線
```

## 4. 依存関係（固定）とライセンス

| 物 | バージョン | ライセンス |
|---|---|---|
| three | 0.170.0 | MIT |
| vite | 5.4.11 | MIT |
| typescript | 5.6.3 | Apache-2.0 |
| @types/three | 0.170.0 | MIT |

外部 3D モデル・テクスチャ・音声は**不使用**（全アセット手続き生成）。
