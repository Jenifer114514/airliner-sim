/**
 * world/texDraw.ts — テクスチャ描画コア（DOM/three 非依存）
 * textures.ts（HTMLCanvasElement + CanvasTexture）と worldgen.worker（OffscreenCanvas
 * → ImageBitmap）が同一実装を共有する。描画のみを行い、テクスチャ化・色空間設定は
 * 呼び出し側の責務。決定論的 LCG を使うため出力は環境非依存（スクショ再現性維持）。
 */
export type Ctx2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
export type Canvas2 = { canvas: HTMLCanvasElement | OffscreenCanvas; ctx: Ctx2D };
export type NewCanvas = (w: number, h: number) => Canvas2;

/** 滑走路表面（中央線・停止線・番号・タッチダウンゾーン・ゴム付着）。設計解像度 512×4096 */
export function drawRunway(ctx: Ctx2D, numA: string, numB: string, resPx: number): void {
  const K = resPx / 512;
  ctx.save();
  ctx.scale(K, K);
  ctx.fillStyle = '#31363c';
  ctx.fillRect(0, 0, 512, 4096);
  let seed = 1234;
  const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  for (let i = 0; i < 90; i++) {
    const v = 42 + rand() * 26;
    ctx.fillStyle = `rgba(${v},${v + 2},${v + 6},0.35)`;
    ctx.fillRect(rand() * 512 - 40, rand() * 4096 - 60, 40 + rand() * 120, 60 + rand() * 220);
  }
  for (let i = 0; i < 6000 * K * K; i++) {
    const v = 34 + rand() * 44;
    ctx.fillStyle = `rgba(${v},${v + 2},${v + 7},0.5)`;
    ctx.fillRect(rand() * 512, rand() * 4096, 1 + rand() * 3, 1 + rand() * 3);
  }
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
  ctx.fillStyle = '#dde2e6';
  ctx.fillRect(18, 0, 8, 4096);
  ctx.fillRect(486, 0, 8, 4096);
  for (let y = 120; y < 3976; y += 150) ctx.fillRect(248, y, 16, 80);
  for (const endY of [40, 3936]) {
    ctx.fillRect(30, endY, 452, 26);
    for (let i = 0; i < 8; i++) ctx.fillRect(60 + i * 52, endY + 34, 30, 110);
  }
  for (const sideY of [280, 3596]) {
    for (let g = 0; g < 3; g++) {
      const off = 150 * g;
      const y0 = sideY > 2000 ? sideY - off : sideY + off;
      for (const x of [70, 130, 352, 412]) ctx.fillRect(x, y0, 26, 120);
    }
  }
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
  ctx.strokeStyle = 'rgba(16,18,22,0.13)';
  ctx.lineWidth = 1;
  for (let y = 60; y < 4036; y += 13) {
    ctx.beginPath(); ctx.moveTo(96, y); ctx.lineTo(416, y); ctx.stroke();
  }
  ctx.restore();
}

/** 誘導路（黄色センターライン + 縁 + 待機位置）。256×1024、縦 26 回タイル前提 */
export function drawTaxiway(ctx: Ctx2D): void {
  ctx.fillStyle = '#3a4046';
  ctx.fillRect(0, 0, 256, 1024);
  let seed = 555;
  const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  for (let i = 0; i < 1800; i++) {
    const v = 50 + rand() * 30;
    ctx.fillStyle = `rgba(${v},${v + 3},${v + 8},0.45)`;
    ctx.fillRect(rand() * 256, rand() * 1024, 2 + rand() * 5, 2 + rand() * 5);
  }
  ctx.fillStyle = '#d8b64a';
  ctx.fillRect(122, 0, 12, 1024);
  ctx.fillStyle = 'rgba(210,215,220,0.5)';
  ctx.fillRect(6, 0, 5, 1024);
  ctx.fillRect(245, 0, 5, 1024);
  for (const y of [200, 512, 824]) {
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(20, y, 216, 10);
    ctx.fillStyle = '#d8b64a';
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(24 + i * 36, y + 16, 12, 26);
      ctx.fillRect(24 + i * 36, y - 32, 12, 26);
    }
  }
}

/** 誘導路/エプロン用のコンクリート（継ぎ目つき・シームレス 64px タイル） */
export function drawConcrete(ctx: Ctx2D): void {
  ctx.fillStyle = '#5a6068';
  ctx.fillRect(0, 0, 256, 256);
  let seed = 999;
  const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
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
}

/** 誘導路標識（黄地に黒文字の簡易プレート）。256×128 */
export function drawSign(ctx: Ctx2D, text: string): void {
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
}

/**
 * 地面ディテールタイル（地形 shader 用・非色彩）: r=細粒、g=広斑、b=草葉ストローク。
 * 0.5 中心の乗算/勾配データ。512²=30m 繰り返し。シード固定 LCG で決定論的。
 */
export function drawGroundDetail(newCanvas: NewCanvas, ctx: Ctx2D): void {
  const S = 512;
  let seed = 987654321;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const layer = (draw: (x: Ctx2D) => void): ImageData => {
    const l = newCanvas(S, S);
    l.ctx.fillStyle = '#808080';
    l.ctx.fillRect(0, 0, S, S);
    draw(l.ctx);
    return l.ctx.getImageData(0, 0, S, S);
  };
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
  // 3 レイヤ合成（旧 textures.ts と同一ピクセル式）
  const oi = ctx.createImageData(S, S);
  for (let i = 0; i < S * S * 4; i += 4) {
    oi.data[i] = lr.data[i];
    oi.data[i + 1] = lg.data[i + 1];
    oi.data[i + 2] = lb.data[i + 2];
    oi.data[i + 3] = 255;
  }
  ctx.putImageData(oi, 0, 0);
}

// ═════════ v16: 建物ファサード Texture Atlas ═════════
// 2048² の 4×4 セル（各 512²）。1 セル = 1 様式（壁色・窓ピッチ・階帯・ガラス帯）。
// 建物はインスタンス属性 aFace（0..15）でセルを選ぶ。旧 makeBuildingTexture の
// repeat[2,3] 相当をセル内へベイク済み（アトラスでは repeat を使わない）。
export const BA_CELL = 512;
export const BA_GRID = 4;
export const BA_SIZE = BA_CELL * BA_GRID;

interface FacadeStyle { wall: string; win: string; slab: string; glass: number; litRate: number; cool: boolean }
const STYLES: FacadeStyle[] = [
  { wall: '#6c7480', win: '#45525e', slab: 'rgba(40,46,54,0.55)', glass: 0.0, litRate: 0.5, cool: false },   // 旧既定（継承様式）
  { wall: '#7d8590', win: '#3c4652', slab: 'rgba(52,58,66,0.5)', glass: 0.0, litRate: 0.42, cool: false },
  { wall: '#586270', win: '#39434f', slab: 'rgba(30,36,44,0.6)', glass: 0.18, litRate: 0.55, cool: false },
  { wall: '#8a8f94', win: '#515c66', slab: 'rgba(70,74,80,0.45)', glass: 0.0, litRate: 0.38, cool: false },
  { wall: '#46525c', win: '#7fa2b8', slab: 'rgba(24,30,36,0.6)', glass: 0.55, litRate: 0.6, cool: true },     // カーテンウォール
  { wall: '#71818e', win: '#8fb6c8', slab: 'rgba(36,44,52,0.5)', glass: 0.4, litRate: 0.52, cool: true },
  { wall: '#6e6a62', win: '#4a453d', slab: 'rgba(52,48,42,0.5)', glass: 0.0, litRate: 0.44, cool: false },    // 暖岩調
  { wall: '#5d6672', win: '#33404c', slab: 'rgba(26,32,40,0.6)', glass: 0.12, litRate: 0.58, cool: false },
  { wall: '#767e86', win: '#48525c', slab: 'rgba(58,64,72,0.4)', glass: 0.0, litRate: 0.35, cool: false },   // 低層住宅向きの粗ピッチ
  { wall: '#675f58', win: '#3e382f', slab: 'rgba(46,40,34,0.5)', glass: 0.0, litRate: 0.4, cool: false },
  { wall: '#7c8a94', win: '#9cc2d4', slab: 'rgba(40,50,60,0.45)', glass: 0.5, litRate: 0.62, cool: true },
  { wall: '#555d66', win: '#2f3842', slab: 'rgba(22,26,32,0.6)', glass: 0.08, litRate: 0.5, cool: false },
  { wall: '#84857f', win: '#5a5c58', slab: 'rgba(64,64,60,0.4)', glass: 0.0, litRate: 0.3, cool: false },
  { wall: '#5a6a74', win: '#86b0c4', slab: 'rgba(30,40,48,0.5)', glass: 0.45, litRate: 0.58, cool: true },
  { wall: '#6a6470', win: '#423d4a', slab: 'rgba(42,38,50,0.5)', glass: 0.0, litRate: 0.46, cool: false },
  { wall: '#78808a', win: '#4e5a66', slab: 'rgba(54,62,72,0.45)', glass: 0.2, litRate: 0.5, cool: false }
];

/** アトラス全 16 セルの diffuse を描画 */
export function drawBuildingAtlas(ctx: Ctx2D): void {
  ctx.clearRect(0, 0, BA_SIZE, BA_SIZE);
  for (let s = 0; s < STYLES.length; s++) {
    const cx0 = (s % BA_GRID) * BA_CELL, cy0 = Math.floor(s / BA_GRID) * BA_CELL;
    const st = STYLES[s];
    const pitchY = 40 + (s % 5) * 6;        // 階高（旧 16px タイルの 2.5 倍スケール相当）
    const pitchX = 34 + (s % 3) * 12;
    ctx.fillStyle = st.wall;
    ctx.fillRect(cx0, cy0, BA_CELL, BA_CELL);
    // 縦の壁柱むら（セル内シームレス：端で色を合わせる必要はないが窓列で潰れる）
    for (let y = 0; y < BA_CELL; y += pitchY) {
      for (let x = 0; x < BA_CELL; x += pitchX) {
        const ww = pitchX * 0.58, wh = pitchY * 0.62;
        ctx.fillStyle = st.win;
        ctx.fillRect(cx0 + x + pitchX * 0.16, cy0 + y + pitchY * 0.18, ww, wh);
        if (st.glass > 0) {
          ctx.fillStyle = `rgba(255,255,255,${0.10 * st.glass})`;
          ctx.fillRect(cx0 + x + pitchX * 0.16, cy0 + y + pitchY * 0.18, ww * 0.45, wh);
        }
      }
      // 床スラブ線（下 3px）
      ctx.fillStyle = st.slab;
      ctx.fillRect(cx0, cy0 + y + pitchY - 3, BA_CELL, 3);
    }
    // 屋上設備帯（上部 6%: 機械室シルエット）
    ctx.fillStyle = 'rgba(24,28,34,0.55)';
    let sd = 7 + s * 13;
    const rnd = () => ((sd = (sd * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    for (let i = 0; i < 6; i++) {
      const bw2 = 26 + rnd() * 70, bx = cx0 + rnd() * (BA_CELL - 60);
      ctx.fillRect(bx, cy0 - 0 + 4, bw2, 10 + rnd() * 8);
    }
  }
}

/** アトラス全 16 セルの夜間窓 emissive（様式ごとに点灯率/色温度変化） */
export function drawBuildingEmissiveAtlas(ctx: Ctx2D): void {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, BA_SIZE, BA_SIZE);
  for (let s = 0; s < STYLES.length; s++) {
    const cx0 = (s % BA_GRID) * BA_CELL, cy0 = Math.floor(s / BA_GRID) * BA_CELL;
    const st = STYLES[s];
    const pitchY = 40 + (s % 5) * 6, pitchX = 34 + (s % 3) * 12;
    let seed = 4242 + s * 777;
    const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    for (let y = 0; y < BA_CELL; y += pitchY) {
      for (let x = 0; x < BA_CELL; x += pitchX) {
        const r = rand();
        if (r < 1 - st.litRate) continue;
        const base = 170 + Math.floor(rand() * 80);
        const col = st.cool
          ? `rgb(${Math.floor(base * 0.72)},${Math.floor(base * 0.86)},${base})`
          : r > 0.94 ? `rgb(${base},${base},${base})` : `rgb(${base},${Math.floor(base * 0.78)},${Math.floor(base * 0.5)})`;
        ctx.fillStyle = col;
        ctx.fillRect(cx0 + x + pitchX * 0.16, cy0 + y + pitchY * 0.18, pitchX * 0.58, pitchY * 0.62);
      }
    }
  }
}

// ═════════ テクスチャ定義レイヤー（worker と同期フォールバックの単一ソース）═════════
export type PaintKind = 'detail' | 'building' | 'buildingEm' | 'taxiway' | 'concrete' | 'runway';
export interface TexDef {
  id: string; kind: PaintKind;
  w: number; h: number;
  srgb: boolean; aniso: number;
  repeat: [number, number] | null; // null → ClampToEdge
  nums?: [string, string];         // runway 用滑走路番号
}

/** runway 定義 id（数値ペアと解像度で一意）。textures.ts と prime で共有 */
export const rwId = (numA: string, numB: string, resPx: number): string => `rw:${numA}/${numB}@${resPx}`;

/** 起動時に worker へ依頼する既定セット（detail + 建物 atlas×2 + 空港舗装） */
export function makeTexDefs(airports: Array<{ nums: [string, string] }>, runwayTexPx: number): TexDef[] {
  const defs: TexDef[] = [
    // detail: 地形 shader が UV を自作スケールするため repeat は (1,1) だが wrap は Repeat
    { id: 'detail', kind: 'detail', w: 512, h: 512, srgb: false, aniso: 8, repeat: [1, 1] },
    { id: 'building', kind: 'building', w: BA_SIZE, h: BA_SIZE, srgb: true, aniso: 8, repeat: null },
    { id: 'buildingEm', kind: 'buildingEm', w: BA_SIZE, h: BA_SIZE, srgb: true, aniso: 8, repeat: null },
    { id: 'taxiway', kind: 'taxiway', w: 256, h: 1024, srgb: true, aniso: 8, repeat: [1, 26] },
    { id: 'concrete', kind: 'concrete', w: 256, h: 256, srgb: true, aniso: 8, repeat: [24, 24] }
  ];
  for (const ap of airports) {
    defs.push({
      id: rwId(ap.nums[0], ap.nums[1], runwayTexPx), kind: 'runway',
      w: runwayTexPx, h: runwayTexPx * 8,
      srgb: true, aniso: 16, repeat: null, nums: ap.nums
    });
  }
  return defs;
}

/** def に従いキャンバスへ描画（決定論・環境非依存）。テクスチャ化は呼び出し側 */
export function paintTex(def: TexDef, newCanvas: NewCanvas): Canvas2 {
  const c = newCanvas(def.w, def.h);
  switch (def.kind) {
    case 'detail': drawGroundDetail(newCanvas, c.ctx); break;
    case 'building': drawBuildingAtlas(c.ctx); break;
    case 'buildingEm': drawBuildingEmissiveAtlas(c.ctx); break;
    case 'taxiway': drawTaxiway(c.ctx); break;
    case 'concrete': drawConcrete(c.ctx); break;
    case 'runway': drawRunway(c.ctx, def.nums![0], def.nums![1], def.w); break;
  }
  return c;
}
