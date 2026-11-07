/**
 * render/textures.ts — 手続き CanvasTexture 生成（外部アセット不使用）
 * 滑走路・路面・建物窓・機体窓列・ファン面・計器盤などを描画する。
 */
import * as THREE from 'three';
import { primeTex, primeRunwayTex } from '../world/prime.js';

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  // 古い Safari (iOS < 16.4) に roundRect がない場合のフォールバック
  const patched = ctx as CanvasRenderingContext2D & {
    roundRect?: (x: number, y: number, w: number, h: number, r: number) => void;
  };
  if (typeof patched.roundRect !== 'function') {
    patched.roundRect = function (this: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      this.beginPath();
      this.moveTo(x + r, y);
      this.arcTo(x + w, y, x + w, y + h, r);
      this.arcTo(x + w, y + h, x, y + h, r);
      this.arcTo(x, y + h, x, y, r);
      this.arcTo(x, y, x + w, y, r);
      this.closePath();
    };
  }
  return [c, ctx];
}

function toTexture(canvas: HTMLCanvasElement, repeat?: [number, number]): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}

/** 滑走路表面（prime 事前生成 → 未取得なら world/texDraw 同一コードで同期描画。画素一致） */
export function makeRunwayTexture(width: number, length: number, numA: string, numB: string, resPx = 512): THREE.CanvasTexture {
  void width; void length;
  return primeRunwayTex(numA, numB, resPx);
}
// v16: makeBuildingEmissiveTexture は削除（建物は building/buildingEm アトラスへ統合）

/** 誘導路（黄色センターライン + 縁 + 待機位置。prime 生成） */
export function makeTaxiwayTexture(): THREE.CanvasTexture {
  return primeTex('taxiway')!;
}

/** 誘導路標識（黄地に黒文字の簡易プレート） */
export function makeSignTexture(text: string): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 128);
  ctx.fillStyle = '#c9a227';
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 240, 112);
  ctx.fillStyle = '#141414';
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 68);
  return toTexture(c);
}

/** 誘導路/エプロン用のコンクリート（prime 生成。シームレス 256²・64px 目地） */
export function makeConcreteTexture(): THREE.CanvasTexture {
  return primeTex('concrete')!;
}

/** 胴体の窓列・ドア・ライン・社名（fusGeo 側で UV 入替済み: x=胴体長さ / y=周回角。
 *  y=0 と y=H が機体上面のシーム、y=H/2 が腹部。上下対称のデザインが必須）
 *  v2: 2048×1024 高解像 / 窓はフレーム+ガラス勾配+反射ストリーク / 双チートライン /
 *  社名・登録記号文字 / ドアは窓を跨ぐ形状＋窓 / 腹部汚れうっすら */
export function makeFuselageTexture(
  top: number, bottom: number, accent: number, windowCount: number,
  liveryName = 'SKYLINER', registration = 'JA00AI'
): THREE.CanvasTexture {
  const W = 2048, H = 1024, CY = H / 2; // CY = 腹部中心、0/H = 上面シーム
  const [c, ctx] = makeCanvas(W, H);
  const hex = (n: number) => `#${n.toString(16).padStart(6, '0')}`;
  const topHex = hex(top), bottomHex = hex(bottom), accentHex = hex(accent);

  // --- 基本塗装: 上面は機体色、腹部にアンチドラッグ色の帯（上下対称） ---
  ctx.fillStyle = topHex;
  ctx.fillRect(0, 0, W, H);
  const band = 118; // 腹部帯の半幅
  const g = ctx.createLinearGradient(0, CY - band, 0, CY + band);
  g.addColorStop(0, topHex);
  g.addColorStop(0.16, bottomHex);
  g.addColorStop(0.84, bottomHex);
  g.addColorStop(1, topHex);
  ctx.fillStyle = g;
  ctx.fillRect(0, CY - band, W, band * 2);
  // 腹部帯縁のすれ（汚れ 1px ライン）
  ctx.fillStyle = 'rgba(30,40,52,0.35)';
  ctx.fillRect(0, CY - band + 12, W, 3);
  ctx.fillRect(0, CY + band - 15, W, 3);

  // --- ダブルチートライン（窓列の上、対称 ±） ---
  const cheatY = CY - 192; // 上側（下側は H-cheatY で対称）
  ctx.fillStyle = accentHex;
  ctx.fillRect(0, cheatY, W, 11);
  ctx.fillRect(0, H - cheatY - 11, W, 11);
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillRect(0, cheatY + 15, W, 4);
  ctx.fillRect(0, H - cheatY - 19, W, 4);

  // --- 旅客窓列（フレーム + グラデガラス + 反射ストリーク） ---
  const step = 1840 / windowCount;
  const winW = Math.min(30, step - 12), winH = 34;
  for (const rowY of [CY - 132, CY + 132 - winH]) {
    for (let i = 0; i < windowCount; i++) {
      const x = 300 + i * step;
      // フレーム（アルミ光沢）
      ctx.fillStyle = 'rgba(190,200,212,0.9)';
      ctx.beginPath(); ctx.roundRect(x - 3, rowY - 3, winW + 6, winH + 6, 9); ctx.fill();
      // ガラス
      const wg = ctx.createLinearGradient(x, rowY, x, rowY + winH);
      wg.addColorStop(0, '#1c2c3c');
      wg.addColorStop(0.55, '#0a121b');
      wg.addColorStop(1, '#131e2a');
      ctx.fillStyle = wg;
      ctx.beginPath(); ctx.roundRect(x, rowY, winW, winH, 7); ctx.fill();
      // 斜め反射ストリーク
      ctx.strokeStyle = 'rgba(168,205,235,0.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 5, rowY + winH - 6);
      ctx.lineTo(x + winW - 6, rowY + 5);
      ctx.stroke();
    }
  }

  // --- ドア（前/後 × 両側、窓列を跨ぎ、上半分に乗客窓） ---
  for (const [dx, side] of [[228, 0], [1290, 0], [700, 1], [1560, 1]] as const) {
    const dy = side === 0 ? CY - 206 : CY + 206 - 130;
    ctx.fillStyle = 'rgba(40,60,84,0.05)';
    ctx.beginPath(); ctx.roundRect(dx, dy, 52, 130, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(24,36,48,0.42)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(dx, dy, 52, 130, 6); ctx.stroke();
    // ドア窓
    ctx.fillStyle = '#0c1622';
    ctx.beginPath(); ctx.roundRect(dx + 9, dy + 12, 16, 20, 5); ctx.fill();
    // ハンドル
    ctx.fillStyle = 'rgba(20,30,40,0.8)';
    ctx.fillRect(dx + 40, dy + 72, 6, 14);
  }

  // --- コックピット窓: ラドーム境(x212)より後方の回り込みバンド（2026-11-04l 修正）。
  //     旧実装は x26-196 = 機首 0.4-3.2m でラドーム円錐に張り付き、黒い点汚れに見えていた ---
  const WX0 = 250, WX1 = 470;
  ctx.fillStyle = '#101c29';
  // 上面バンド（天面シーム y0/H をまたぐ = 左右が連続して見える）
  ctx.fillRect(WX0 + 46, 0, WX1 - WX0 - 46, 54);
  ctx.fillRect(WX0 + 46, H - 54, WX1 - WX0 - 46, 54);
  // 側面台形（両側。前縁で下がり後縁へ水平気味）
  const off = (yy: number) => H - yy;
  for (const front of [true, false]) {
    const y = front ? (v: number) => v : off;
    ctx.beginPath();
    ctx.moveTo(WX0 + 6, y(66));
    ctx.lineTo(WX1, y(104));
    ctx.lineTo(WX1, y(276));
    ctx.lineTo(WX0 + 30, y(300));
    ctx.closePath();
    ctx.fill();
    // 内側の淡い反射（上端寄りに帯）
    ctx.fillStyle = 'rgba(120,160,200,0.16)';
    ctx.beginPath();
    ctx.moveTo(WX0 + 20, y(84));
    ctx.lineTo(WX1 - 8, y(118));
    ctx.lineTo(WX1 - 8, y(150));
    ctx.lineTo(WX0 + 20, y(118));
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#101c29';
    // 柱: 風防枠 3 本 + 側窓仕切り 1 本（機体色で欠く）
    ctx.strokeStyle = topHex;
    ctx.lineWidth = 8;
    for (const fx of [WX0 + 58, WX0 + 124, WX0 + 182]) {
      ctx.beginPath();
      ctx.moveTo(fx, y(56));
      ctx.lineTo(fx - 8, y(296));
      ctx.stroke();
    }
    ctx.lineWidth = 1;
    // 上縁の光沢
    ctx.strokeStyle = 'rgba(150,180,210,0.5)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(WX0 + 6, y(66));
    ctx.lineTo(WX1, y(104));
    ctx.stroke();
    // 天面バンドの柱（シーム直上 = 窓上端の枠）
    ctx.strokeStyle = topHex;
    ctx.lineWidth = 8;
    for (const fx of [WX0 + 58, WX0 + 124, WX0 + 182]) {
      ctx.beginPath();
      ctx.moveTo(fx, 50);
      ctx.lineTo(fx, 0);
      ctx.moveTo(fx, off(50));
      ctx.lineTo(fx, H);
      ctx.stroke();
    }
  }
  // --- 社名（前部・両側） ---
  ctx.fillStyle = bottomHex;
  ctx.font = 'italic bold 92px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(liveryName, 430, CY - 232);
  ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1);
  ctx.fillText(liveryName, 430, H - (CY - 232) - 60);
  ctx.restore();
  // --- 登録記号（後部・両側） ---
  ctx.font = 'bold 58px "Helvetica Neue", Arial, sans-serif';
  ctx.fillStyle = 'rgba(40,52,64,0.95)';
  ctx.fillText(registration, 1660, CY - 236);
  ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1);
  ctx.fillText(registration, 1660, H - (CY - 236) - 42);
  ctx.restore();
  // --- 貨物ハッチ輪郭（腹部後部） ---
  ctx.strokeStyle = 'rgba(28,40,52,0.5)';
  ctx.lineWidth = 3;
  for (const hx of [560, 1020, 1460]) {
    ctx.beginPath(); ctx.roundRect(hx, CY + 46, 96, 26, 8); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(hx, CY - 72, 96, 26, 8); ctx.stroke();
  }
  // --- ノーズシーム（ラドーム境）+ ピトー小印 ---
  ctx.strokeStyle = 'rgba(50,60,72,0.8)';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(212, 0); ctx.lineTo(212, H); ctx.stroke();
  ctx.fillStyle = 'rgba(40,50,60,0.9)';
  for (const py of [CY - 96, CY + 96]) ctx.fillRect(236, py, 16, 7);

  return toTexture(c);
}

/** 垂直尾翼サイドの liveried テクスチャ（u=弦方向 前縁→後縁 / v=根本→先端） */
export function makeTailTexture(top: number, bottom: number, accent: number, name: string): THREE.CanvasTexture {
  const W = 512, H = 384;
  const [c, ctx] = makeCanvas(W, H);
  const hex = (n: number) => `#${n.toString(16).padStart(6, '0')}`;
  // 根本→先端 で 機体色→ボトム色のグラデ
  const g = ctx.createLinearGradient(0, H, 0, 0);
  g.addColorStop(0, hex(top));
  g.addColorStop(0.34, hex(top));
  g.addColorStop(1, hex(bottom));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // アクセントの斜めスウッシュ（前縁下地从）
  ctx.fillStyle = hex(accent);
  ctx.beginPath();
  ctx.moveTo(0, H * 0.62);
  ctx.quadraticCurveTo(W * 0.55, H * 0.66, W * 0.78, H * 0.06);
  ctx.lineTo(W, H * 0.06);
  ctx.quadraticCurveTo(W * 0.72, H * 0.9, 0, H * 0.82);
  ctx.closePath();
  ctx.fill();
  // エンブレム: 白丸 + アクセントの翼印
  ctx.fillStyle = 'rgba(250,252,255,0.96)';
  ctx.beginPath(); ctx.arc(W * 0.5, H * 0.34, 64, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = hex(accent);
  ctx.beginPath();
  ctx.moveTo(W * 0.5 - 40, H * 0.34 + 14);
  ctx.quadraticCurveTo(W * 0.5, H * 0.34 - 44, W * 0.5 + 42, H * 0.34 + 6);
  ctx.quadraticCurveTo(W * 0.5, H * 0.34 - 16, W * 0.5 - 40, H * 0.34 + 14);
  ctx.fill();
  void name; // 尾翼は図案のみ（両側ミラーに写るため文字は置かない）
  return toTexture(c);
}

/** エンジンファン面 v2（放射ブレード + スワール入りハブ + 外周影） */
export function makeFanTexture(): THREE.CanvasTexture {
  const S = 256;
  const [c, ctx] = makeCanvas(S, S);
  ctx.fillStyle = '#0e1216';
  ctx.fillRect(0, 0, S, S);
  ctx.translate(S / 2, S / 2);
  // ブレード 30 枚（内径影 → 外径光、ねじれ勾配）
  for (let i = 0; i < 30; i++) {
    ctx.rotate((Math.PI * 2) / 30);
    const g = ctx.createLinearGradient(0, 0, 122, 0);
    g.addColorStop(0, '#3a434d');
    g.addColorStop(0.35, '#8d99a5');
    g.addColorStop(1, '#48525d');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(18, -5);
    ctx.lineTo(124, -17);
    ctx.lineTo(124, 4);
    ctx.lineTo(18, 6);
    ctx.closePath();
    ctx.fill();
    // ブレード陰
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.moveTo(18, 6); ctx.lineTo(124, 4); ctx.lineTo(124, 9); ctx.lineTo(18, 9);
    ctx.closePath(); ctx.fill();
  }
  // ハブ: スワール（白渦 3 本）
  const hub = ctx.createRadialGradient(0, 0, 2, 0, 0, 26);
  hub.addColorStop(0, '#c2ccd4');
  hub.addColorStop(0.75, '#7c8790');
  hub.addColorStop(1, '#2c343c');
  ctx.fillStyle = hub;
  ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(24,28,32,0.9)';
  ctx.lineWidth = 4;
  for (let k = 0; k < 3; k++) {
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 1.5; a += 0.08) {
      const r = 4 + a * 4.4;
      const x = Math.cos(a + (k * Math.PI * 2) / 3) * r;
      const y = Math.sin(a + (k * Math.PI * 2) / 3) * r;
      a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  return toTexture(c);
}


/**
 * 胴体Skin のパネルライン（継ぎ目＋リベット）の normal / roughness マップ。
 * 512² タイル = 横 8 列 × 縦 8 行。胴体へ repeat (2,3) で
 * 縦方向 ≈2.4m ピッチのフレーム線 × 周回 15° ピッチのストリンガー線。
 * normal は接空間エンコード（フラット=128,128,255）、溝の両側で ±傾斜。
 */
export function makePanelMaps(): { normalMap: THREE.CanvasTexture; roughnessMap: THREE.CanvasTexture } {
  const S = 512;
  const CELL = S / 8;
  // ---- normal map ----
  const [cn, n] = makeCanvas(S, S);
  n.fillStyle = 'rgb(128,128,255)';
  n.fillRect(0, 0, S, S);
  for (let p = 0; p < S; p += CELL) {
    // 縦線（フレーム）: 左壁 +x / 右壁 -x
    n.fillStyle = 'rgb(150,128,246)';
    n.fillRect((p + S - 3) % S, 0, 2, S);
    n.fillStyle = 'rgb(106,128,246)';
    n.fillRect(p + 1, 0, 2, S);
    // 横線（ストリンガー）: 上壁 +y(canvas y 下向き)=G150 / 下壁 G106
    n.fillStyle = 'rgb(128,150,246)';
    n.fillRect(0, (p + S - 3) % S, S, 2);
    n.fillStyle = 'rgb(128,106,246)';
    n.fillRect(0, p + 1, S, 2);
    // リベット: 溝に沿って等間隔の浅いくぼみ（上下に +/-y 傾斜のペア）
    for (let q = 10; q < S; q += 14) {
      n.fillStyle = 'rgb(128,140,250)';
      n.fillRect(q, (p + S - 5) % S, 2, 1);
      n.fillStyle = 'rgb(128,116,250)';
      n.fillRect(q, (p + S - 3) % S, 2, 1);
      n.fillStyle = 'rgb(140,128,250)';
      n.fillRect((p + S - 5) % S, q, 1, 2);
      n.fillStyle = 'rgb(116,128,250)';
      n.fillRect((p + S - 3) % S, q, 1, 2);
    }
  }
  const normalMap = new THREE.CanvasTexture(cn);
  normalMap.colorSpace = THREE.NoColorSpace;
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.anisotropy = 8;
  // ---- roughness map ----
  const [cr, r] = makeCanvas(S, S);
  r.fillStyle = 'rgb(206,206,206)';
  r.fillRect(0, 0, S, S);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let gx = 0; gx < 8; gx++) {
    for (let gy = 0; gy < 8; gy++) {
      const v = 186 + Math.floor(rnd() * 42);
      r.fillStyle = `rgb(${v},${v},${v})`;
      r.fillRect(gx * CELL + 1, gy * CELL + 1, CELL - 2, CELL - 2);
    }
  }
  r.fillStyle = 'rgb(238,238,238)'; // 溝の汚れ=粗
  for (let p = 0; p < S; p += CELL) {
    r.fillRect(p - 1, 0, 2, S);
    r.fillRect(0, p - 1, S, 2);
  }
  const roughnessMap = new THREE.CanvasTexture(cr);
  roughnessMap.colorSpace = THREE.NoColorSpace;
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  return { normalMap, roughnessMap };
}

/** ターミナルのガラス帯（窓 + 骨格） */
export function makeGlassTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 128);
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, '#9fc4dd');
  g.addColorStop(0.5, '#5d87a6');
  g.addColorStop(1, '#3c5f7c');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = 'rgba(30,42,54,0.9)';
  for (let x = 0; x < 512; x += 22) ctx.fillRect(x, 0, 6, 128);
  ctx.fillRect(0, 58, 512, 6);
  return toTexture(c, [6, 1]);
}

// v16: makeBuildingTexture は削除（建物は world/texDraw の building アトラスへ統合）

/** 雲スプライト（下影つきパフィー） */
export function makeCloudTexture(seed = 7, groundShade = true): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = 0; i < 12; i++) {
    const cx = 40 + rand() * 176;
    const cy = 70 + rand() * 116;
    const r = 30 + rand() * 52;
    const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
    grad.addColorStop(0, 'rgba(255,255,255,0.92)');
    grad.addColorStop(0.55, 'rgba(248,251,255,0.42)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  if (groundShade) {
    // 下方向の陰影で立体感
    const shade = ctx.createLinearGradient(0, 150, 0, 256);
    shade.addColorStop(0, 'rgba(140,160,190,0)');
    shade.addColorStop(1, 'rgba(110,130,170,0.34)');
    ctx.fillStyle = shade;
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillRect(0, 150, 256, 106);
    ctx.globalCompositeOperation = 'source-over';
  }
  return toTexture(c);
}

/** コックピット計器盤（PFD/ND の簡易表示を描画） */
export function makePanelTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(1024, 512);
  ctx.fillStyle = '#1a1f26';
  ctx.fillRect(0, 0, 1024, 512);
  const drawGauge = (x: number, y: number, r: number, label: string) => {
    ctx.fillStyle = '#0c1116';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#3d4c5c';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
    // 目盛り
    for (let i = 0; i <= 10; i++) {
      const a = -Math.PI * 0.75 + (i / 10) * Math.PI * 1.5;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * (r - 14), y + Math.sin(a) * (r - 14));
      ctx.lineTo(x + Math.cos(a) * (r - 4), y + Math.sin(a) * (r - 4));
      ctx.stroke();
    }
    // 針
    ctx.strokeStyle = '#ff9d3c';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(-Math.PI * 0.25) * (r - 26), y + Math.sin(-Math.PI * 0.25) * (r - 26));
    ctx.stroke();
    ctx.fillStyle = '#9fd6ff';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + r + 30);
  };
  drawGauge(190, 220, 130, 'AIRSPEED');
  drawGauge(512, 220, 130, 'ATTITUDE');
  drawGauge(834, 220, 130, 'ALTITUDE');
  // 下部スイッチ列
  ctx.fillStyle = '#2a323c';
  for (let i = 0; i < 14; i++) {
    ctx.fillRect(60 + i * 66, 420, 44, 30);
    ctx.fillStyle = i % 3 === 0 ? '#4a9c5c' : '#2a323c';
  }
  return toTexture(c);
}

// v16: 地面ディテールは world/prime（worker で世界生成と同時描画）へ移動済み。512²・NoColorSpace・Repeat
export function makeGroundDetailTexture(): THREE.CanvasTexture {
  return primeTex('detail')!;
}
