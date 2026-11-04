/**
 * render/textures.ts — 手続き CanvasTexture 生成（外部アセット不使用）
 * 滑走路・路面・建物窓・機体窓列・ファン面・計器盤などを描画する。
 */
import * as THREE from 'three';

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

/** 滑走路表面（中央線・停止線・番号・タッチダウンゾーン・ゴム付着） */
export function makeRunwayTexture(width: number, length: number, numA: string, numB: string, resPx = 512): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(resPx, resPx * 8);
  // 既定ロジックは 512×4096 設計 → 解像度分を transform でスケール（線幅・文字も追随）
  const K = resPx / 512;
  ctx.scale(K, K);
  // アスファルト（継ぎ目とパッチ）
  ctx.fillStyle = '#31363c';
  ctx.fillRect(0, 0, 512, 4096);
  let seed = 1234;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < 90; i++) {
    // 補修パッチ
    const v = 42 + rand() * 26;
    ctx.fillStyle = `rgba(${v},${v + 2},${v + 6},0.35)`;
    ctx.fillRect(rand() * 512 - 40, rand() * 4096 - 60, 40 + rand() * 120, 60 + rand() * 220);
  }
  for (let i = 0; i < 6000 * K * K; i++) {
    const v = 34 + rand() * 44;
    ctx.fillStyle = `rgba(${v},${v + 2},${v + 7},0.5)`;
    ctx.fillRect(rand() * 512, rand() * 4096, 1 + rand() * 3, 1 + rand() * 3);
  }
  // 輪跡 + ゴム付着（タッチダウンゾーン濃い）
  for (const x of [148, 205, 307, 364]) {
    const g = ctx.createLinearGradient(x - 24, 0, x + 24, 0);
    g.addColorStop(0, 'rgba(18,20,24,0)');
    g.addColorStop(0.5, 'rgba(18,20,24,0.40)');
    g.addColorStop(1, 'rgba(18,20,24,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - 24, 300, 48, 3500);
  }
  for (const sideY of [220, 3500]) {
    const g = ctx.createLinearGradient(0, sideY - 200, 0, sideY + 420);
    g.addColorStop(0, 'rgba(12,13,16,0)');
    g.addColorStop(0.5, 'rgba(12,13,16,0.42)');
    g.addColorStop(1, 'rgba(12,13,16,0)');
    ctx.fillStyle = g;
    ctx.fillRect(30, sideY - 200, 452, 620);
  }
  // 側線
  ctx.fillStyle = '#dde2e6';
  ctx.fillRect(18, 0, 8, 4096);
  ctx.fillRect(486, 0, 8, 4096);
  // 中央線（破線）
  for (let y = 120; y < 3976; y += 150) {
    ctx.fillRect(248, y, 16, 80);
  }
  // 停止線・ピアノキー（両端）
  for (const endY of [40, 3936]) {
    ctx.fillRect(30, endY, 452, 26);
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(60 + i * 52, endY + 34, 30, 110);
    }
  }
  // タッチダウンゾーンマーカー（3 組）
  for (const sideY of [280, 3596]) {
    for (let g = 0; g < 3; g++) {
      const off = 150 * g;
      const y0 = sideY > 2000 ? sideY - off : sideY + off;
      for (const x of [70, 130, 352, 412]) {
        ctx.fillRect(x, y0, 26, 120);
      }
    }
  }
  // 滑走路番号 + 矢印
  ctx.fillStyle = '#e6eaee';
  ctx.font = 'bold 150px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.save();
  ctx.translate(256, 210);
  ctx.rotate(Math.PI);
  ctx.fillText(numA, 0, 0);
  ctx.restore();
  ctx.fillText(numB, 256, 3886);
  // ランウェイ・グルービング（センター両側 1/3 に横溝。近接時にうっすら見える）
  ctx.strokeStyle = 'rgba(16,18,22,0.13)';
  ctx.lineWidth = 1;
  for (let y = 60; y < 4036; y += 13) {
    ctx.beginPath(); ctx.moveTo(96, y); ctx.lineTo(416, y); ctx.stroke();
  }
  void width; void length;
  const tex = toTexture(c);
  tex.anisotropy = 16;
  return tex;
}

/** 市街地の夜間窓（emissive 用: 窓の明滅パターン。dark=消灯 / 暖色=点灯） */
export function makeBuildingEmissiveTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 256);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 128, 256);
  let seed = 4242;
  const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  for (let y = 8; y < 250; y += 16) {
    for (let x = 6; x < 122; x += 14) {
      const r = rand();
      if (r < 0.42) continue; // 消灯
      const warm = 180 + Math.floor(r * 70);
      ctx.fillStyle = r > 0.9 ? `rgb(${warm},${warm},${warm})` : `rgb(${warm},${Math.floor(warm * 0.78)},${Math.floor(warm * 0.5)})`;
      ctx.fillRect(x, y, 9, 10);
    }
  }
  return toTexture(c, [2, 3]);
}

/** 誘導路（黄色センターライン + 縁 + 待機位置） */
export function makeTaxiwayTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 1024);
  ctx.fillStyle = '#3a4046';
  ctx.fillRect(0, 0, 256, 1024);
  let seed = 555;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < 1800; i++) {
    const v = 50 + rand() * 30;
    ctx.fillStyle = `rgba(${v},${v + 3},${v + 8},0.45)`;
    ctx.fillRect(rand() * 256, rand() * 1024, 2 + rand() * 5, 2 + rand() * 5);
  }
  // 黄色センターライン
  ctx.fillStyle = '#d8b64a';
  ctx.fillRect(122, 0, 12, 1024);
  // 縁線
  ctx.fillStyle = 'rgba(210,215,220,0.5)';
  ctx.fillRect(6, 0, 5, 1024);
  ctx.fillRect(245, 0, 5, 1024);
  // 待機位置マーク（3 箇所）
  for (const y of [200, 512, 824]) {
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(20, y, 216, 10);
    ctx.fillStyle = '#d8b64a';
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(24 + i * 36, y + 16, 12, 26);
      ctx.fillRect(24 + i * 36, y - 32, 12, 26);
    }
  }
  return toTexture(c, [1, 26]);
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

/** 誘導路/エプロン用のコンクリート（継ぎ目つき） */
export function makeConcreteTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#5a6068';
  ctx.fillRect(0, 0, 256, 256);
  let seed = 999;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < 900; i++) {
    const v = 78 + rand() * 30;
    ctx.fillStyle = `rgba(${v},${v + 3},${v + 8},0.4)`;
    ctx.fillRect(rand() * 256, rand() * 256, 2 + rand() * 5, 2 + rand() * 5);
  }
  ctx.strokeStyle = 'rgba(40,44,50,0.8)';
  ctx.lineWidth = 2;
  for (let i = 0; i <= 256; i += 64) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
  }
  return toTexture(c, [24, 24]);
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
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath(); ctx.roundRect(dx, dy, 52, 130, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(24,36,48,0.75)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(dx, dy, 52, 130, 6); ctx.stroke();
    // ドア窓
    ctx.fillStyle = '#0c1622';
    ctx.beginPath(); ctx.roundRect(dx + 9, dy + 12, 16, 20, 5); ctx.fill();
    // ハンドル
    ctx.fillStyle = 'rgba(20,30,40,0.8)';
    ctx.fillRect(dx + 40, dy + 72, 6, 14);
  }

  // --- コックピット窓（機首、両側対称。4枚窓風の台形 + 柱） ---
  for (const my of [CY - 336, CY + 336]) {
    const dir = my < CY ? 1 : -1; // 上側は下がり気味、下側は上がり気味に台形化
    ctx.fillStyle = '#0b141d';
    ctx.beginPath();
    ctx.moveTo(26, my);
    ctx.lineTo(196, my + dir * 4);
    ctx.lineTo(196, my + dir * 66);
    ctx.lineTo(34, my + dir * 52);
    ctx.closePath();
    ctx.fill();
    // 窓柱 3 本（機体色で塗り分け）
    ctx.strokeStyle = topHex;
    ctx.lineWidth = 7;
    for (let k = 0; k < 3; k++) {
      const fx = 62 + k * 44;
      ctx.beginPath();
      ctx.moveTo(fx, my + dir * (2 + k * 4));
      ctx.lineTo(fx + 8, my + dir * (58 + k * 2));
      ctx.stroke();
    }
    // 縁の光沢
    ctx.strokeStyle = 'rgba(150,180,210,0.55)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(26, my); ctx.lineTo(196, my + dir * 4);
    ctx.stroke();
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

/** 建物の窓（市街地用・夜は非対応=昼固定） */
export function makeBuildingTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 256);
  ctx.fillStyle = '#6c7480';
  ctx.fillRect(0, 0, 128, 256);
  ctx.fillStyle = '#45525e';
  for (let y = 8; y < 250; y += 16) {
    for (let x = 6; x < 122; x += 14) {
      ctx.fillRect(x, y, 9, 10);
    }
  }
  return toTexture(c, [2, 3]);
}

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

/**
 * 地面ディテールタイル（地形 shader 用・NoColorSpace）: r=細粒、g=広斑、b=草葉ストローク。
 * 0.5 中心の乗算/勾配データ。512²=30m 繰り返し。シード固定 LCG で決定論的（スクショ再現性）。
 */
export function makeGroundDetailTexture(): THREE.CanvasTexture {
  const S = 512;
  let seed = 987654321;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const layer = (draw: (x: CanvasRenderingContext2D) => void): ImageData => {
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, S, S);
    draw(ctx);
    return ctx.getImageData(0, 0, S, S);
  };
  // 端をまたぐprimitiveはラップ描画（タイル継ぎ目ゼロ）
  const wrap = (fn: (dx: number, dy: number) => void) => {
    for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) fn(ox, oy);
  };
  const lr = layer((x) => {
    for (let i = 0; i < 9000; i++) {
      const px = rnd() * S, py = rnd() * S;
      const v = rnd() < 0.5 ? 0 : 255;
      x.fillStyle = `rgba(${v},${v},${v},${0.05 + rnd() * 0.12})`;
      const wdt = 1 + (i % 2);
      wrap((dx, dy) => x.fillRect(px + dx, py + dy, wdt, 1 + ((i >> 1) % 2)));
    }
  });
  const lg = layer((x) => {
    for (let i = 0; i < 260; i++) {
      const px = rnd() * S, py = rnd() * S, rad = 34 + rnd() * 110;
      const dark = rnd() < 0.5;
      const v = dark ? 0 : 255;
      wrap((dx, dy) => {
        const g = x.createRadialGradient(px + dx, py + dy, 2, px + dx, py + dy, rad);
        g.addColorStop(0, `rgba(${v},${v},${v},${0.10 + rnd() * 0.10})`);
        g.addColorStop(1, `rgba(${v},${v},${v},0)`);
        x.fillStyle = g;
        x.beginPath();
        x.arc(px + dx, py + dy, rad, 0, Math.PI * 2);
        x.fill();
      });
    }
  });
  const lb = layer((x) => {
    x.lineWidth = 1;
    for (let i = 0; i < 5200; i++) {
      const px = rnd() * S, py = rnd() * S;
      const ang = -0.5 + rnd() * 1.0, len = 2 + rnd() * 4;
      const v = rnd() < 0.55 ? 0 : 255;
      x.strokeStyle = `rgba(${v},${v},${v},${0.10 + rnd() * 0.16})`;
      wrap((dx, dy) => {
        x.beginPath();
        x.moveTo(px + dx, py + dy);
        x.lineTo(px + dx + Math.cos(ang) * len, py + dy + Math.sin(ang) * len);
        x.stroke();
      });
    }
  });
  const out = document.createElement('canvas');
  out.width = out.height = S;
  const ox = out.getContext('2d')!;
  const oi = ox.createImageData(S, S);
  for (let i = 0; i < S * S * 4; i += 4) {
    oi.data[i] = lr.data[i];
    oi.data[i + 1] = lg.data[i + 1];
    oi.data[i + 2] = lb.data[i + 2];
    oi.data[i + 3] = 255;
  }
  ox.putImageData(oi, 0, 0);
  const t = new THREE.CanvasTexture(out);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 8;
  t.needsUpdate = true;
  return t;
}
