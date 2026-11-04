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
export function makeRunwayTexture(width: number, length: number, numA: string, numB: string): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 4096);
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
  for (let i = 0; i < 6000; i++) {
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
  void width; void length;
  return toTexture(c);
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

/** 胴体の窓列・ドア・ライン（fusGeo 側で UV 入替済み: x=胴体長さ / y=周回角。
 *  y=0 と y=512 が機体上面のシーム、y=256 が腹部。上下対称のデザインが必須） */
export function makeFuselageTexture(top: number, bottom: number, accent: number, windowCount: number): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(1024, 512);
  const topHex = `#${top.toString(16).padStart(6, '0')}`;
  const bottomHex = `#${bottom.toString(16).padStart(6, '0')}`;
  const accentHex = `#${accent.toString(16).padStart(6, '0')}`;

  // 塗装: 機体色で全体を塗ってから、腹部のみ下地色の帯（上下対称: y 196..316 ≈ ±40°）
  ctx.fillStyle = topHex;
  ctx.fillRect(0, 0, 1024, 512);
  const g = ctx.createLinearGradient(0, 196, 0, 316);
  g.addColorStop(0, topHex);
  g.addColorStop(0.18, bottomHex);
  g.addColorStop(0.82, bottomHex);
  g.addColorStop(1, topHex);
  ctx.fillStyle = g;
  ctx.fillRect(0, 196, 1024, 120);

  // チートライン（窓列の上・両側面に 1 本ずつ、腹部中心から ±107px 対称）
  ctx.fillStyle = accentHex;
  ctx.fillRect(0, 146, 1024, 5);
  ctx.fillRect(0, 361, 1024, 5);

  // 旅客窓列（左右側面の中央下 47°、y=186 / 320）
  ctx.fillStyle = '#101820';
  const step = 900 / windowCount;
  for (let i = 0; i < windowCount; i++) {
    const x = 60 + i * step;
    for (const y of [186, 320]) {
      ctx.beginPath();
      ctx.roundRect(x, y, Math.min(13, step - 4), 12, 4);
      ctx.fill();
    }
  }
  // ドア（側面ごとに前後 2 箇所、窓列を跨ぐ縦長）
  ctx.strokeStyle = 'rgba(20,30,40,0.55)';
  ctx.lineWidth = 2.5;
  for (const [dx, dy] of [[150, 152], [640, 152], [350, 300], [850, 300]]) {
    ctx.strokeRect(dx, dy, 26, 60);
  }
  // コックピット窓（機首 u≈0 の両上側、腹部中心から ±160px 対称）
  ctx.fillStyle = '#0c141c';
  ctx.beginPath();
  ctx.roundRect(8, 96, 88, 42, 10);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(8, 416, 88, 42, 10);
  ctx.fill();

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

/** エンジンファン面（放射状ブレード） */
export function makeFanTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#22282e';
  ctx.fillRect(0, 0, 256, 256);
  ctx.translate(128, 128);
  for (let i = 0; i < 28; i++) {
    ctx.rotate((Math.PI * 2) / 28);
    const g = ctx.createLinearGradient(0, 0, 110, 0);
    g.addColorStop(0, '#8d99a5');
    g.addColorStop(1, '#4a5560');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(112, -16);
    ctx.lineTo(112, 4);
    ctx.closePath();
    ctx.fill();
  }
  const hub = ctx.createRadialGradient(0, 0, 4, 0, 0, 34);
  hub.addColorStop(0, '#aab4bd');
  hub.addColorStop(1, '#3a434c');
  ctx.fillStyle = hub;
  ctx.beginPath();
  ctx.arc(0, 0, 34, 0, Math.PI * 2);
  ctx.fill();
  return toTexture(c);
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
