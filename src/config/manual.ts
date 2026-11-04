/**
 * config/manual.ts — JAL/JTA B737-700 FCOM & SOP 実データ（ユーザ提供マニュアル準拠）
 *
 * 【出典】「B737-700 JAL-JTA標準運航マニュアル (完全版).docx.pdf」全 9 ページ
 *        （docs/manual-b737.txt にテキスト抽出済み）
 * 【単位】マニュアルの速度は KIAS（kt 対気速度）、重量は lbs。
 *        1 kt = 0.514444 m/s / 1 lbs = 0.45359237 kg で SI 変換して参照する。
 * 【区分】本ファイルの数値はマニュアル実測値。近似値を使う箇所はその旨を明記する。
 */

/** kt → m/s */
export const KT = 0.514444;
/** lbs → kg */
export const LBS = 0.45359237;

/** 第1章 1.1 基本重量・高度限界（マニュアル実測値） */
export const B737_LIMITS = {
  mtowLbs: 154500,       // 最大離陸重量 ≒ 70,081 kg
  mlwLbs: 128000,        // 最大着陸重量 ≒ 58,060 kg
  maxAltFt: 41000,       // 最大運用高度 ≒ 12,497 m
  vmoKias: 340,          // 最大運用速度 VMO
  mmo: 0.82,             // 最大運用マッハ数
} as const;

/** 第1章 1.2 フラップ制限速度 V_FE（限界）と実務推奨展開速度（KIAS） */
export const FLAP_VFE: ReadonlyArray<{ flap: number; vfe: number; rec: number }> = [
  { flap: 1, vfe: 250, rec: 230 },
  { flap: 2, vfe: 250, rec: 220 },
  { flap: 5, vfe: 250, rec: 200 },
  { flap: 10, vfe: 210, rec: 190 },
  { flap: 15, vfe: 200, rec: 180 },
  { flap: 25, vfe: 190, rec: 170 },
  { flap: 30, vfe: 175, rec: 150 },
  { flap: 40, vfe: 162, rec: 140 },
];

/**
 * 第2章 2.4 重量別離陸性能データ（マニュアル実測値）
 * Load % はペイロード負荷（10-20% … 90%以上）→ load は中点代表値で補間する。
 */
export const TAKEOFF_TABLE: ReadonlyArray<{
  load: number; flap: number; n1: number;
  v1: number; vr: number; v2: number;
  trimPct: number; trimUnits: number;
}> = [
  { load: 0.15, flap: 5, n1: 85.0, v1: 125, vr: 125, v2: 135, trimPct: 15, trimUnits: 4.0 },
  { load: 0.35, flap: 5, n1: 88.0, v1: 130, vr: 130, v2: 140, trimPct: 18, trimUnits: 4.5 },
  { load: 0.55, flap: 15, n1: 92.0, v1: 135, vr: 135, v2: 145, trimPct: 20, trimUnits: 5.0 },
  { load: 0.75, flap: 15, n1: 96.0, v1: 142, vr: 142, v2: 152, trimPct: 22, trimUnits: 5.5 },
  { load: 0.95, flap: 15, n1: 98.0, v1: 148, vr: 148, v2: 158, trimPct: 25, trimUnits: 6.0 },
];

/** 第5章 5.2 着陸重量別 Vref（KIAS・マニュアル実測値） */
export const VREF_TABLE: ReadonlyArray<{ lwLbs: number; f30: number; f40: number }> = [
  { lwLbs: 100000, f30: 121, f40: 118 },
  { lwLbs: 110000, f30: 127, f40: 124 },
  { lwLbs: 115000, f30: 130, f40: 126 },
  { lwLbs: 120000, f30: 133, f40: 129 },
  { lwLbs: 128000, f30: 137, f40: 134 },
];

/**
 * 【近似】空機重量 OEW（マニュアル非掲載）。737-700 の一般公称値 約 90,700 lbs
 * （≒ 41,140 kg）をロード率算出に用いる。
 */
export const OEW_KG = 41140;

/** 第3章〜第7章の運航技術値（マニュアル実測値） */
export const FLIGHT_TECHNIQUE = {
  taxiBreakawayN1: [0.25, 0.30],   // ブレイクアウェイ N1 25-30%
  taxiStraightKts: 20,             // 直線路 最大 20 kt
  taxiTurnKts: 10,                 // 旋回 10 kt 未満
  rotatePitchDeg: 15,              // 抬頭目標ピッチ角
  rotateRateDeg: 2.0,              // 抬頭ピッチレート 2-2.5°/s（代表 2.0）
  landingPitchMin: 2.5,            // 着陸ピッチ角 下限
  landingPitchMax: 3.0,            // 着陸ピッチ角 上限
  flareFt: 50,                     // フレア開始 50 ft
  idleFt: 30,                      // スロットル IDLE 開始 30 ft
  reverseOffKts: 60,               // リバース解除 60 kt
  gearUpFt: 0,                     // POSITIVE RATE 後ギアアップ（高度条件なし）
} as const;

// ------------------------------------------------------------------
// 純関数（sop-test.mjs から検証される）
// ------------------------------------------------------------------

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/** 重量からロード率（0..1）を算出。OEW〜MTOW の区間を線形に割当てる【近似式】 */
export function loadFracFromMass(massKg: number): number {
  const mtow = B737_LIMITS.mtowLbs * LBS;
  return clamp((massKg - OEW_KG) / (mtow - OEW_KG), 0.05, 1);
}

/** 第2章の離陸性能データをロード率で補間（速度は KIAS） */
export function takeoffSpeeds(loadFrac: number): {
  flap: number; n1: number; v1: number; vr: number; v2: number; trimPct: number; trimUnits: number;
} {
  const t = TAKEOFF_TABLE;
  const x = clamp(loadFrac, t[0].load, t[t.length - 1].load);
  for (let i = 0; i < t.length - 1; i++) {
    if (x <= t[i + 1].load) {
      const r = (x - t[i].load) / (t[i + 1].load - t[i].load);
      return {
        flap: lerp(t[i].flap, t[i + 1].flap, r) >= 10 ? 15 : 5,
        n1: lerp(t[i].n1, t[i + 1].n1, r),
        v1: lerp(t[i].v1, t[i + 1].v1, r),
        vr: lerp(t[i].vr, t[i + 1].vr, r),
        v2: lerp(t[i].v2, t[i + 1].v2, r),
        trimPct: lerp(t[i].trimPct, t[i + 1].trimPct, r),
        trimUnits: lerp(t[i].trimUnits, t[i + 1].trimUnits, r),
      };
    }
  }
  const last = t[t.length - 1];
  return { ...last };
}

/** 現フラップ位置の V_FE（限界）/実務推奨速度。flaps 0 は VMO を限界とする */
export function vfeForFlap(flapsDeg: number): { limitMs: number; recMs: number; limitKias: number; recKias: number } {
  const vmo = B737_LIMITS.vmoKias;
  if (flapsDeg <= 0.5) {
    return { limitMs: vmo * KT, recMs: vmo * KT, limitKias: vmo, recKias: vmo };
  }
  // テーブルは detent と一致するが、中間値でも安全側（低い方）の行を採る
  let row = FLAP_VFE[0];
  for (const r of FLAP_VFE) {
    if (r.flap <= flapsDeg + 0.01) row = r;
    else break;
  }
  return { limitMs: row.vfe * KT, recMs: row.rec * KT, limitKias: row.vfe, recKias: row.rec };
}

/** OVERSPEED 判定閾値（m/s）: VMO と当該フラップ V_FE のうち厳しい方 */
export function overspeedLimitMs(flapsDeg: number): number {
  return Math.min(B737_LIMITS.vmoKias, vfeForFlap(flapsDeg).limitKias) * KT;
}

/** 第5章 5.2 Vref（KIAS）。flap=30/40 を着陸重量 lbs で補間 */
export function vref(lwLbs: number, flap: 30 | 40): number {
  const t = VREF_TABLE;
  const x = clamp(lwLbs, t[0].lwLbs, t[t.length - 1].lwLbs);
  const key = flap === 30 ? 'f30' : 'f40';
  for (let i = 0; i < t.length - 1; i++) {
    if (x <= t[i + 1].lwLbs) {
      const r = (x - t[i].lwLbs) / (t[i + 1].lwLbs - t[i].lwLbs);
      return lerp(t[i][key], t[i + 1][key], r);
    }
  }
  return t[t.length - 1][key];
}

/**
 * 第5章 5.2 Vapp 風補正ルール（KIAS）
 *   Vapp = Vref + 1/2 向かい風 + ガスト成分全量、ただし補正は +5〜+20 kt に制限。
 *   「ガスト成分」はマニュアル例（Vref130/向かい風10/gust15 → 140）の算術に合わせ、
 *   (ガストピーク − 定常風) と定義する。
 */
export function computeVapp(vrefKias: number, headwindKts: number, gustPeakKts: number): number {
  const gustComp = Math.max(0, gustPeakKts - headwindKts);
  const raw = vrefKias + headwindKts / 2 + gustComp;
  return clamp(raw, vrefKias + 5, vrefKias + 20);
}
