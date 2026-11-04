/**
 * ui/instruments.ts — コックピット計器盤（Phase 4）
 *
 * Canvas 2D でアナログ計器 5 針 + 状態パネルを描画する。
 * 表示する数値はすべてシミュレーションのテレメトリのみを参照し、
 * UI 側で推測計算しない。描画はこのモジュールに閉じる（物理・3D 非依存）。
 *
 * 【計器構成】（左→右）
 *   1. 対気速度計 IAS [m/s]（白=通常, 緑=離着陸, 黄=警告, 赤=超過）
 *   2. 姿勢指示器（人工地平線・ピッチラダー・バンク目盛）
 *   3. 高度計 ALT [m]（1 周 = 2000 m）+ AGL デジタル
 *   4. 昇降計 V/S [m/s]（±20）
 *   5. 方位計 HSI（回転式コンパスカード + 滑走路方位バグ）
 *   6. 状態: スラスト/燃料/フラップ/ギア/風/対地速度/滑走路距離/フェーズ/FPS
 *
 * 【近似】速度計・高度計の目盛は実機の kt/ft ではなく SI（m/s・m）だが、
 * 速度計の色帯・V 速度バグは JAL/JTA マニュアル（config/manual.ts）の KIAS 実測値を
 * 変換して表示する。姿勢指示器は航空機シンボル固定・球はピッチ/バンクで移動する簡易式。
 */
import { B737_LIMITS, KT, computeVapp, overspeedLimitMs, takeoffSpeeds, vfeForFlap, vref } from '../config/manual.js';

export interface InstrumentData {
  ias: number;         // m/s
  alt: number;         // m (MSL)
  agl: number;         // m
  vspeed: number;      // m/s
  heading: number;     // deg 0..360
  pitch: number;       // deg
  bank: number;        // deg (+ 右)
  aoa: number;         // deg
  gLoad: number;
  throttle: number;    // 0..1
  fuelFrac: number;    // 0..1
  groundSpeed: number; // m/s
  windSpeed: number;   // m/s
  windDirDeg: number;  // deg（吹き来る方位）
  flapsDeg: number;
  gearDown: boolean;
  spoilers: number;    // 0..1
  phase: string;
  crashed: boolean;
  // 滑走路ナビ（nav.ts の出力。空港未選択時は null）
  rwyName: string | null;
  rwyDist: number | null;        // 閾値まで [m]
  rwyRemaining: number | null;   // 残距離 [m]（滑走路上のみ）
  rwyHeading: number | null;     // 滑走路方位 deg（HSI バグ用）
  fps: number;
  onGround: boolean;
}

const C = {
  face: '#0d1a2b',
  bezel: '#20364e',
  tick: '#9fd6ff',
  text: '#8fe3ff',
  digital: '#b9f3c9',
  needle: '#ffffff',
  needleHub: '#c9d6e4',
  red: '#ff5f4d',
  amber: '#ffc873',
  green: '#7ee787',
  sky: '#3f7fd0',
  ground: '#7a5230',
  sym: '#ff9d2e'
};

export class InstrumentPanel {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private d: InstrumentData | null = null;
  private w = 0;
  private h = 0;
  private loadFrac: number;
  private massKg: number;

  constructor(canvas: HTMLCanvasElement, opts?: { loadFrac?: number; massKg?: number }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.loadFrac = opts?.loadFrac ?? 0.72;
    this.massKg = opts?.massKg ?? 62000;
    this.resize();
  }

  /** 機体変更時: V 速度バグ用のロード率・重量を更新 */
  setAircraft(loadFrac: number, massKg: number): void {
    this.loadFrac = loadFrac;
    this.massKg = massKg;
    if (this.d) this.draw();
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    // 非表示（display:none）中は 0×0 になるため据え置き。表示時に再呼び出しされる
    if (rect.width < 10 || rect.height < 10) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = rect.width;
    this.h = rect.height;
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.d) this.draw();
  }

  update(d: InstrumentData): void {
    this.d = d;
    this.draw();
  }

  // ------------------------------------------------------------------
  private draw(): void {
    const d = this.d;
    const ctx = this.ctx;
    if (this.w < 50 || this.h < 30) return; // サイズ未確定（非表示直後）は描画しない
    ctx.clearRect(0, 0, this.w, this.h);
    if (!d) return;

    // パネル背景（角丸ストリップ）
    ctx.fillStyle = 'rgba(8, 16, 28, 0.62)';
    this.roundRect(0, 0, this.w, this.h, 10);
    ctx.fill();

    const pad = 6;
    const cellW = (this.w - pad * 2) / 6;
    const cy = this.h / 2;
    const r = Math.max(6, Math.min(cellW * 0.44, this.h * 0.42));

    // 1. 対気速度計
    this.drawSpeed(cellW * 0.5 + pad, cy, r, d);
    // 2. 姿勢指示器
    this.drawAttitude(cellW * 1.5 + pad, cy, r * 1.12, d);
    // 3. 高度計
    this.drawAlt(cellW * 2.5 + pad, cy, r, d);
    // 4. 昇降計
    this.drawVsi(cellW * 3.5 + pad, cy, r, d);
    // 5. 方位計
    this.drawHsi(cellW * 4.5 + pad, cy, r, d);
    // 6. 状態パネル
    this.drawSys(cellW * 5 + pad + 2, pad, cellW - 4, this.h - pad * 2, d);

    // 警告フラッシュ帯（上端）
    this.drawWarnings(d);
  }

  private roundRect(x: number, y: number, w: number, h: number, r: number): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /** 丸計器の枠・目盛の土台 */
  private gaugeFace(cx: number, cy: number, r: number): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 3, 0, Math.PI * 2);
    ctx.fillStyle = C.bezel;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = C.face;
    ctx.fill();
    ctx.strokeStyle = 'rgba(120, 175, 225, 0.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  /** 270° スイープ目盛（start: -225°, end: +45° の計器規約） */
  private sweepTicks(
    cx: number, cy: number, r: number,
    min: number, max: number,
    majorEvery: number, minorEvery: number,
    labelFn: ((v: number) => string) | null
  ): void {
    const ctx = this.ctx;
    const a0 = (-225 * Math.PI) / 180;
    const a1 = (45 * Math.PI) / 180;
    const valToAng = (v: number) => a0 + ((v - min) / (max - min)) * (a1 - a0);
    for (let v = min; v <= max + 1e-6; v += minorEvery) {
      const a = valToAng(v);
      const major = Math.abs(v % majorEvery) < 1e-6 || Math.abs((v % majorEvery) - majorEvery) < 1e-6;
      const r1 = r * 0.82;
      const r2 = major ? r * 0.66 : r * 0.74;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.strokeStyle = major ? C.tick : 'rgba(140, 190, 235, 0.55)';
      ctx.lineWidth = major ? 2 : 1;
      ctx.stroke();
      if (labelFn && major) {
        ctx.fillStyle = C.tick;
        ctx.font = `600 ${Math.round(r * 0.2)}px -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelFn(v), cx + Math.cos(a) * r * 0.52, cy + Math.sin(a) * r * 0.52);
      }
    }
  }

  private needle(cx: number, cy: number, r: number, angle: number, lenFrac = 0.78, color = C.needle): void {
    const ctx = this.ctx;
    const a = ((angle - 90) * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * r * lenFrac, cy + Math.sin(a) * r * lenFrac);
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, r * 0.06);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.09, 0, Math.PI * 2);
    ctx.fillStyle = C.needleHub;
    ctx.fill();
  }

  /** 270° スイープの値 → 針角度 deg */
  private valToAngle(v: number, min: number, max: number): number {
    const clamped = Math.max(min, Math.min(max, v));
    return -225 + ((clamped - min) / (max - min)) * 270;
  }

  // ---------- 1. 対気速度計（JAL/JTA マニュアル 1.2/5.2 の V 速度準拠） ----------
  private drawSpeed(cx: number, cy: number, r: number, d: InstrumentData): void {
    const ctx = this.ctx;
    const VMAX = 190; // m/s（≒ 369 kt）
    this.gaugeFace(cx, cy, r);

    // 色帯: 緑=実務推奨以下 / 黄=推奨超〜V_FE 限界 / 赤=超過
    const vfe = vfeForFlap(d.flapsDeg);
    this.drawArcBand(cx, cy, r * 0.9, 0, vfe.recMs, C.green, 0, VMAX);
    if (vfe.recMs < vfe.limitMs - 0.5) {
      this.drawArcBand(cx, cy, r * 0.9, vfe.recMs, vfe.limitMs, C.amber, 0, VMAX);
    }
    this.drawArcBand(cx, cy, r * 0.9, vfe.limitMs, VMAX, C.red, 0, VMAX);

    this.sweepTicks(cx, cy, r, 0, 180, 30, 10, (v) => String(v));
    // VMO ライン（340 kt ≒ 175 m/s）: 白の細線（リム内側へ放射）
    {
      const a = ((this.valToAngle(B737_LIMITS.vmoKias * KT, 0, VMAX) - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r * 0.78, cy + Math.sin(a) * r * 0.78);
      ctx.lineTo(cx + Math.cos(a) * r * 0.96, cy + Math.sin(a) * r * 0.96);
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = Math.max(1.5, r * 0.035);
      ctx.stroke();
    }

    // V 速度バグ（マニュアル 2.4 の V2 / 5.2 の Vapp）
    const to = takeoffSpeeds(this.loadFrac);
    if (d.agl < 120 && d.vspeed > -2 && d.ias > 5) {
      this.speedBug(cx, cy, r, to.v2 * KT, 0, VMAX, '#e46bff', 'V2');
    }
    if (d.gearDown && d.flapsDeg >= 25) {
      const lwLbs = Math.min(this.massKg / 0.45359237, B737_LIMITS.mlwLbs);
      const vrefKias = d.flapsDeg >= 40 ? vref(lwLbs, 40) : vref(lwLbs, 30);
      const headwindKts = (d.windSpeed / KT) * Math.cos(((d.heading - d.windDirDeg) * Math.PI) / 180);
      const vappKias = computeVapp(vrefKias, headwindKts, headwindKts); // ガスト成分 0 → 最小補正 +5kt
      this.speedBug(cx, cy, r, vappKias * KT, 0, VMAX, '#5fd7ff', 'VAPP');
    }

    this.needle(cx, cy, r, this.valToAngle(d.ias, 0, VMAX), 0.8);
    ctx.fillStyle = C.digital;
    ctx.font = `700 ${Math.round(r * 0.32)}px -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(d.ias.toFixed(0), cx, cy + r * 0.52);
    ctx.fillStyle = C.text;
    ctx.font = `600 ${Math.round(r * 0.17)}px -apple-system, sans-serif`;
    ctx.fillText('IAS m/s', cx, cy + r * 0.78);
    // 現フラップの V_FE（kt）表示
    ctx.fillStyle = vfe.limitKias <= 175 ? C.amber : C.text;
    ctx.font = `600 ${Math.round(r * 0.15)}px -apple-system, sans-serif`;
    ctx.fillText(`VFE ${Math.round(vfe.limitKias)}kt`, cx, cy + r * 0.95);
  }

  /** 速度計 rim 上の V 速度バグ（三角形 + ラベル） */
  private speedBug(
    cx: number, cy: number, r: number,
    v: number, vmin: number, vmax: number,
    color: string, label: string
  ): void {
    const ctx = this.ctx;
    const a = ((this.valToAngle(v, vmin, vmax) - 90) * Math.PI) / 180;
    const rr = r * 1.02;
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a + Math.PI / 2);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.10);
    ctx.lineTo(-r * 0.07, 0);
    ctx.lineTo(r * 0.07, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = color;
    ctx.font = `700 ${Math.max(8, Math.round(r * 0.16))}px -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, cx + Math.cos(a) * r * 0.72, cy + Math.sin(a) * r * 0.72);
  }

  private drawArcBand(
    cx: number, cy: number, r: number,
    v0: number, v1: number, color: string,
    vmin = 0, vmax = 180
  ): void {
    const ctx = this.ctx;
    const a0 = ((this.valToAngle(v0, vmin, vmax) - 90) * Math.PI) / 180;
    const a1 = ((this.valToAngle(v1, vmin, vmax) - 90) * Math.PI) / 180;
    ctx.beginPath();
    ctx.arc(cx, cy, r, a0, a1);
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, r * 0.08);
    ctx.stroke();
  }

  // ---------- 2. 姿勢指示器 ----------
  private drawAttitude(cx: number, cy: number, r: number, d: InstrumentData): void {
    const ctx = this.ctx;
    this.gaugeFace(cx, cy, r);
    // 球をクリップしてピッチ/バンクで動かす
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.92, 0, Math.PI * 2);
    ctx.clip();

    const pitchPx = (d.pitch / 90) * r * 1.6;
    // telemetry bank は += 右バンク。右バンク時は「世界（地平線）」が画面基準で反時計回りに
    // 倒れて見える → canvas の rotate（正 = 時計回り）には − を渡す
    const bank = (-d.bank * Math.PI) / 180;
    ctx.translate(cx, cy + pitchPx);
    ctx.rotate(bank);
    // 空と地面
    ctx.fillStyle = C.sky;
    ctx.fillRect(-r * 3, -r * 3, r * 6, r * 3);
    ctx.fillStyle = C.ground;
    ctx.fillRect(-r * 3, 0, r * 6, r * 3);
    // 地平線
    ctx.beginPath();
    ctx.moveTo(-r * 3, 0);
    ctx.lineTo(r * 3, 0);
    ctx.strokeStyle = '#e8f4ff';
    ctx.lineWidth = 2;
    ctx.stroke();
    // ピッチラダー（±20°, 5° 刻み）
    ctx.strokeStyle = 'rgba(240, 248, 255, 0.85)';
    ctx.fillStyle = 'rgba(240, 248, 255, 0.95)';
    ctx.lineWidth = 1.5;
    ctx.font = `600 ${Math.round(r * 0.16)}px -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let p = -20; p <= 20; p += 5) {
      if (p === 0) continue;
      const y = -(p / 90) * r * 1.6;
      const halfW = p % 10 === 0 ? r * 0.34 : r * 0.18;
      ctx.beginPath();
      ctx.moveTo(-halfW, y);
      ctx.lineTo(halfW, y);
      ctx.stroke();
      if (p % 10 === 0) {
        ctx.fillText(String(Math.abs(p)), -halfW - r * 0.14, y);
        ctx.fillText(String(Math.abs(p)), halfW + r * 0.14, y);
      }
    }
    ctx.restore();

    // バンク目盛（固定）
    ctx.strokeStyle = C.tick;
    ctx.lineWidth = 2;
    for (const b of [-60, -45, -30, -20, -10, 0, 10, 20, 30, 45, 60]) {
      const a = ((b - 90) * Math.PI) / 180;
      const r1 = r * 0.92;
      const r2 = r * (b % 30 === 0 ? 0.72 : 0.8);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
    }
    // バンク矢印（実姿勢）
    const ba = ((d.bank - 90) * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ba) * r * 0.66, cy + Math.sin(ba) * r * 0.66);
    ctx.lineTo(cx + Math.cos(ba + 0.12) * r * 0.56, cy + Math.sin(ba + 0.12) * r * 0.56);
    ctx.lineTo(cx + Math.cos(ba - 0.12) * r * 0.56, cy + Math.sin(ba - 0.12) * r * 0.56);
    ctx.closePath();
    ctx.fillStyle = C.amber;
    ctx.fill();

    // 航空機シンボル（固定）
    ctx.strokeStyle = C.sym;
    ctx.lineWidth = Math.max(2.5, r * 0.08);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.5, cy);
    ctx.lineTo(cx - r * 0.18, cy);
    ctx.moveTo(cx + r * 0.18, cy);
    ctx.lineTo(cx + r * 0.5, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.07, 0, Math.PI * 2);
    ctx.fillStyle = C.sym;
    ctx.fill();

    // デジタル
    ctx.fillStyle = C.digital;
    ctx.font = `700 ${Math.round(r * 0.2)}px -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`P${d.pitch.toFixed(0)} B${d.bank.toFixed(0)}`, cx, cy + r * 0.72);
  }

  // ---------- 3. 高度計 ----------
  private drawAlt(cx: number, cy: number, r: number, d: InstrumentData): void {
    const ctx = this.ctx;
    this.gaugeFace(cx, cy, r);
    this.sweepTicks(cx, cy, r, 0, 2000, 500, 100, (v) => (v === 2000 ? '2k' : String(v / 100) + 'h'));
    this.needle(cx, cy, r, this.valToAngle(d.alt % 2000, 0, 2000), 0.8);
    ctx.fillStyle = C.digital;
    ctx.font = `700 ${Math.round(r * 0.3)}px -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(Math.round(d.alt)), cx, cy + r * 0.5);
    ctx.fillStyle = C.text;
    ctx.font = `600 ${Math.round(r * 0.17)}px -apple-system, sans-serif`;
    ctx.fillText(`ALT m · AGL ${Math.round(d.agl)}`, cx, cy + r * 0.76);
  }

  // ---------- 4. 昇降計 ----------
  private drawVsi(cx: number, cy: number, r: number, d: InstrumentData): void {
    const ctx = this.ctx;
    this.gaugeFace(cx, cy, r);
    this.sweepTicks(cx, cy, r, -20, 20, 5, 1, (v) => String(v));
    this.needle(cx, cy, r, this.valToAngle(d.vspeed, -20, 20), 0.8);
    ctx.fillStyle = C.digital;
    ctx.font = `700 ${Math.round(r * 0.28)}px -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((d.vspeed >= 0 ? '+' : '') + d.vspeed.toFixed(1), cx, cy + r * 0.52);
    ctx.fillStyle = C.text;
    ctx.font = `600 ${Math.round(r * 0.17)}px -apple-system, sans-serif`;
    ctx.fillText('V/S m/s', cx, cy + r * 0.78);
  }

  // ---------- 5. 方位計 HSI ----------
  private drawHsi(cx: number, cy: number, r: number, d: InstrumentData): void {
    const ctx = this.ctx;
    this.gaugeFace(cx, cy, r);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.92, 0, Math.PI * 2);
    ctx.clip();
    // コンパスカード（機首方位で回転）
    const rot = (-d.heading * Math.PI) / 180;
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.font = `700 ${Math.round(r * 0.2)}px -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let hd = 0; hd < 360; hd += 30) {
      const a = ((hd - 90) * Math.PI) / 180;
      const r1 = r * 0.86;
      const r2 = r * (hd % 90 === 0 ? 0.68 : 0.76);
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
      ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
      ctx.strokeStyle = hd % 90 === 0 ? C.tick : 'rgba(140,190,235,0.6)';
      ctx.lineWidth = hd % 90 === 0 ? 2 : 1;
      ctx.stroke();
      const label = hd === 0 ? 'N' : hd === 90 ? 'E' : hd === 180 ? 'S' : hd === 270 ? 'W' : String(hd / 10);
      ctx.fillStyle = hd % 90 === 0 ? '#e8f4ff' : C.tick;
      ctx.fillText(label, Math.cos(a) * r * 0.52, Math.sin(a) * r * 0.52);
    }
    // 滑走路方位バグ
    if (d.rwyHeading !== null) {
      const a = ((d.rwyHeading - 90) * Math.PI) / 180;
      ctx.strokeStyle = C.green;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r * 0.95, Math.sin(a) * r * 0.95);
      ctx.lineTo(Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.62);
      ctx.stroke();
    }
    ctx.restore();
    // 固定の機首マーク
    ctx.strokeStyle = C.sym;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 0.95);
    ctx.lineTo(cx, cy - r * 0.62);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.12, cy - r * 0.78);
    ctx.lineTo(cx + r * 0.12, cy - r * 0.78);
    ctx.stroke();

    ctx.fillStyle = C.digital;
    ctx.font = `700 ${Math.round(r * 0.3)}px -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(Math.round(d.heading) % 360).padStart(3, '0') + '°', cx, cy + r * 0.45);
    ctx.fillStyle = C.text;
    ctx.font = `600 ${Math.round(r * 0.17)}px -apple-system, sans-serif`;
    ctx.fillText('HDG', cx, cy + r * 0.72);
  }

  // ---------- 6. 状態パネル ----------
  private drawSys(x: number, y: number, w: number, h: number, d: InstrumentData): void {
    const ctx = this.ctx;
    const lineH = h / 9;
    const fs = Math.max(8, Math.round(lineH * 0.52));
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const row = (i: number, label: string, value: string, color = C.digital): void => {
      const yy = y + lineH * (i + 0.5);
      ctx.fillStyle = C.text;
      ctx.font = `600 ${fs * 0.85}px -apple-system, sans-serif`;
      ctx.fillText(label, x + 2, yy);
      ctx.fillStyle = color;
      ctx.font = `700 ${fs}px -apple-system, sans-serif`;
      ctx.fillText(value, x + w * 0.36, yy);
    };

    // スラストバー
    const yy0 = y + lineH * 0.5;
    ctx.fillStyle = C.text;
    ctx.font = `600 ${fs * 0.85}px -apple-system, sans-serif`;
    ctx.fillText('THR', x + 2, yy0);
    ctx.fillStyle = 'rgba(120,175,225,0.25)';
    ctx.fillRect(x + w * 0.3, yy0 - fs * 0.5, w * 0.42, fs);
    ctx.fillStyle = d.throttle > 0.95 ? C.amber : C.green;
    ctx.fillRect(x + w * 0.3, yy0 - fs * 0.5, w * 0.42 * Math.min(1, d.throttle), fs);
    ctx.fillStyle = C.digital;
    ctx.font = `700 ${fs}px -apple-system, sans-serif`;
    ctx.fillText(`${Math.round(d.throttle * 100)}%`, x + w * 0.75, yy0);

    // 燃料バー
    const yy1 = y + lineH * 1.5;
    ctx.fillStyle = C.text;
    ctx.font = `600 ${fs * 0.85}px -apple-system, sans-serif`;
    ctx.fillText('FUEL', x + 2, yy1);
    ctx.fillStyle = 'rgba(120,175,225,0.25)';
    ctx.fillRect(x + w * 0.3, yy1 - fs * 0.5, w * 0.42, fs);
    ctx.fillStyle = d.fuelFrac < 0.15 ? C.red : C.green;
    ctx.fillRect(x + w * 0.3, yy1 - fs * 0.5, w * 0.42 * d.fuelFrac, fs);
    ctx.fillStyle = C.digital;
    ctx.fillText(`${Math.round(d.fuelFrac * 100)}%`, x + w * 0.75, yy1);

    row(2, 'FLAP', `${d.flapsDeg}°`);
    row(3, 'GEAR', d.gearDown ? 'DOWN' : 'UP', d.gearDown ? C.green : C.digital);
    row(4, 'SPD BRK', d.spoilers > 0 ? 'ON' : 'OFF', d.spoilers > 0 ? C.amber : C.digital);
    // 地上: タキシング速度 20kt（10.3 m/s）超で黄（マニュアル 3.2）
    const taxiing = d.agl < 3 && d.groundSpeed > 0.5;
    row(5, 'GS', `${d.groundSpeed.toFixed(0)} m/s`,
      taxiing ? (d.groundSpeed > 10.29 ? C.amber : C.green) : C.digital);
    row(6, 'WIND', `${Math.round(d.windDirDeg).toString().padStart(3, '0')}°/${d.windSpeed.toFixed(0)} m/s`);
    // 滑走路距離
    if (d.rwyName !== null && d.rwyDist !== null) {
      const rw = d.rwyRemaining !== null && d.rwyRemaining >= 0
        ? `${d.rwyName} 残${Math.round(d.rwyRemaining)}m`
        : `${d.rwyName} ${d.rwyDist >= 1000 ? (d.rwyDist / 1000).toFixed(1) + 'km' : Math.round(d.rwyDist) + 'm'}`;
      row(7, 'RWY', rw, C.amber);
    } else {
      row(7, 'RWY', '—');
    }
    row(8, 'FPS', `${Math.round(d.fps)} / ${d.phase}`, d.crashed ? C.red : C.text);
  }

  // ---------- 警告フラッシュ ----------
  private drawWarnings(d: InstrumentData): void {
    const ctx = this.ctx;
    const blinkOn = Math.floor(performance.now() / 500) % 2 === 0;
    const msgs: Array<{ text: string; color: string }> = [];
    // VMO/V_FE 限界（マニュアル 1.1/1.2）超過
    const over = overspeedLimitMs(d.flapsDeg);
    const vfe = vfeForFlap(d.flapsDeg);
    if (d.crashed) msgs.push({ text: 'CRASHED — 再スタート', color: C.red });
    if (d.ias > over) msgs.push({ text: 'OVERSPEED', color: C.red });
    if (d.agl > 15 && d.agl < 300 && !d.gearDown && d.vspeed < -1) msgs.push({ text: 'GEAR', color: C.amber });
    if (d.aoa > 15 && d.agl > 10) msgs.push({ text: 'STALL', color: C.red });
    if (d.fuelFrac <= 0) msgs.push({ text: 'FUEL EMPTY', color: C.red });
    // 実務推奨展開速度超過（マニュアル 1.2: フラップは推奨速度以下で展開）
    if (d.flapsDeg > 0.5 && d.ias > vfe.recMs) msgs.push({ text: 'FLAP SPD', color: C.amber });

    if (msgs.length === 0) return;
    const shown = msgs.filter((_, i) => blinkOn || i === 0 || d.crashed);
    let x = this.w * 0.28;
    const y = 2;
    ctx.font = `800 ${Math.round(this.h * 0.13)}px -apple-system, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    for (const m of shown) {
      const wTxt = ctx.measureText(m.text).width + 14;
      ctx.fillStyle = m.color;
      this.roundRect(x, y, wTxt, this.h * 0.16, 6);
      ctx.fill();
      ctx.fillStyle = '#0b1220';
      ctx.fillText(m.text, x + 7, y + this.h * 0.02);
      x += wTxt + 6;
    }
  }
}
