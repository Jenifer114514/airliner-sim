/**
 * sim/aero.ts — 空力係数モデル（迎角・横滑り角・操舵面・フラップ連動）
 *
 * 【モデルの前提（近似）】
 * - CL は迎角 α で線形（CL0 + CLα·α）→ 失速角を超えたらフラットプレートへ滑らかに遷移
 *   CL_flat = 1.1·sin(2α)（抗力は 1.2·sin²α 前後）
 * - CD = CD0 + k·CL² + フラップ/ギア/スポイラー/横滑り増分
 * - モーメント係数 Cm/Cn/Cl は静安定（Cmα<0, Cnβ>0, Clβ<0）+ 減衰項 + 操舵項
 * - 翼端渦・マッハ数・地面効果・プロペラ/エンジン位置によるピッチモーメントは未モデル化
 */

export interface ControlState {
  /** [-1,1] + = 機首上げ */
  elevator: number;
  /** [-1,1] + = 右ロール */
  aileron: number;
  /** [-1,1] + = 右ヨー */
  rudder: number;
  /** フラップ角度 [deg]（0..30） */
  flapsDeg: number;
  /** スポイラー [0..1] */
  spoilers: number;
  /** ギア展開 true */
  gearDown: boolean;
}

export interface AeroResult {
  CL: number;
  CD: number;
  CY: number;
  /** 機首上げ方向モーメント係数（正 = 機首上げ） */
  Cm: number;
  /** 右ヨー方向モーメント係数（正 = 右向き） */
  Cn: number;
  /** 右ロール方向モーメント係数（正 = 右ロール） */
  Cl: number;
}

/** 失速角 [rad] */
export const ALPHA_STALL = 0.30;

/** 2 次滑らかステップ */
function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

export function computeCoefficients(
  alpha: number,
  beta: number,
  controls: ControlState,
  rates: { pitchRateUp: number; rollRateRight: number; yawRateRight: number },
  speed: number,
  chord: number,
  span: number
): AeroResult {
  const flapFrac = Math.min(controls.flapsDeg, 40) / 40;  // 40° = フルフラップ（B737-700）
  const sp = Math.min(Math.max(controls.spoilers, 0), 1);

  // ---- 揚力係数 ----
  const s = smoothstep(ALPHA_STALL, ALPHA_STALL + 0.22, Math.abs(alpha));
  const clLinear = 0.38 + 5.2 * alpha + 0.85 * flapFrac;
  const clFlat = 1.15 * Math.sin(2 * alpha);
  let CL = (1 - s) * clLinear + s * clFlat;
  CL *= 1 - 0.42 * sp;

  // ---- 抗力係数 ----
  const cdLinear = 0.021 + 0.048 * clLinear * clLinear;
  const cdFlat = 1.2 * Math.sin(alpha) * Math.sin(alpha) + 0.04;
  let CD = (1 - s) * cdLinear + s * cdFlat;
  CD += 0.055 * flapFrac * flapFrac + 0.016 * flapFrac;
  CD += 0.018 * (controls.gearDown ? 1 : 0);
  CD += 0.030 * sp;
  CD += 0.55 * beta * beta; // 横滑り抗力

  // ---- 横力係数（β で復元） ----
  const CY = -0.9 * beta;

  // ---- ピッチングモーメント係数（正 = 機首上げ） ----
  const speedRef = Math.max(speed, 10);
  const pitchRate = (rates.pitchRateUp * chord) / (2 * speedRef);
  let Cm = 0.025 - 1.15 * alpha - 12.0 * pitchRate + 1.25 * controls.elevator;
  Cm += -0.055 * flapFrac;            // フラップで機首下がり
  Cm += -0.020 * sp;                  // スポイラーで機首下がり
  if (s > 0) Cm += -0.85 * s * Math.sign(alpha || 1) * Math.abs(alpha); // 頭下げ（ポストストール）

  // ---- ヨーイングモーメント係数（正 = 右ヨー・風見安定） ----
  const yawRate = (rates.yawRateRight * span) / (2 * speedRef);
  const Cn = 0.12 * beta - 0.28 * yawRate + 0.10 * controls.rudder;

  // ---- ローリングモーメント係数（正 = 右ロール・ジヘドラル安定） ----
  const rollRate = (rates.rollRateRight * span) / (2 * speedRef);
  const Cl = -0.09 * beta - 0.52 * rollRate + 0.16 * controls.aileron;

  return { CL, CD, CY, Cm, Cn, Cl };
}
