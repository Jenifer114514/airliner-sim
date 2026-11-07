/**
 * sim/atmosphere.ts — 大気モデル（SI 単位）
 *
 * 【モデルの前提（近似）】
 * - 国際標準大気(ISA)の指数近似: ρ = ρ0 · exp(−h / 8500)
 * - h = 海抜高度 [m], ρ0 = 1.225 kg/m³（海面・15°C）
 * - 実際の ISA は対流圏で線形温度変化だが、ゲーム用途の近似として明記する。
 */
export const RHO0 = 1.225;
export const G = 9.80665;

export function airDensity(alt: number): number {
  return RHO0 * Math.exp(-Math.max(alt, -500) / 8500);
}

/** 動圧 q = ½ρV² [Pa] */
export function dynamicPressure(rho: number, speed: number): number {
  return 0.5 * rho * speed * speed;
}

/** 換算対気速度（IAS）: TAS · √(ρ/ρ0) [m/s] */
export function indicatedAirspeed(tas: number, rho: number): number {
  return tas * Math.sqrt(rho / RHO0);
}
