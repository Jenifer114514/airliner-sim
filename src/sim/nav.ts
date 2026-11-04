/**
 * sim/nav.ts — 滑走路ナビゲーション計算（Phase 4: 滑走路距離・HSI マーカー用）
 *
 * 【座標】ワールド: +X=東, +Z=南, 北=−Z（heading 規約と同じ）
 * 【単位】距離 m、方位 deg（0=北, 90=東）
 * 【近似】地形は平坦（滑走路は標高 0）。滑走路は直線・単一とし、
 * 端の閾値は center ± axis·L/2 で与える。
 */
import type { AirportSpec } from '../config/airports.js';

export interface RunwayEnd {
  /** 滑走路番号（例 '34'） */
  name: string;
  /** この端から離陸/着陸するときの進路方位 deg */
  headingDeg: number;
  /** 閾値位置（ワールド） */
  x: number;
  z: number;
}

export interface NavInfo {
  /** 最寄りの滑走路端 */
  nearest: RunwayEnd;
  /** 最寄り閾値までの水平距離 [m] */
  distanceToThreshold: number;
  /** 滑走路軸に対する横ずれ [m]（+ = 右側） */
  lateralOffset: number;
  /** 滑走路軸に沿った残距離 [m]（閾値通過後。0=閾値上） */
  alongTrack: number;
  /** 進入方向（閾値への進行方向）に整合しているか */
  aligned: boolean;
  /** 滑走路面上（幅 80m 以内・端から端の間）にいるか */
  onRunway: boolean;
  /** 滑走路残距離 [m]（滑走路面上のみ。それ以外 null） */
  remainingRunway: number | null;
  /** 対地速度 [m/s] */
  groundSpeed: number;
}

/** 滑走路の両端（端 A = center+axis·L/2、端 B = その反対） */
export function runwayEnds(ap: AirportSpec): [RunwayEnd, RunwayEnd] {
  // 滑走路長軸: heading=0 で +Z（南）方向。heading は group 回転（rad）
  const ax = Math.sin(ap.heading);
  const az = Math.cos(ap.heading);
  const hx = ap.center.x;
  const hz = ap.center.z;
  const half = ap.length / 2;
  // 端 A（+axis 側 = 南）の離陸方位 = 他端方向（-axis）のコンパス方位
  // 方位規約: compass = atan2(dx, −dz)（0=北=−Z）。進行方向 (−ax, −az) → atan2(−ax, az)
  const headA = ((Math.atan2(-ax, az) * 180) / Math.PI + 360) % 360;
  const headB = (headA + 180) % 360;
  return [
    {
      name: ap.runwayNumbers[0],
      headingDeg: ((headA % 360) + 360) % 360,
      x: hx + ax * half,
      z: hz + az * half
    },
    {
      name: ap.runwayNumbers[1],
      headingDeg: ((headB % 360) + 360) % 360,
      x: hx - ax * half,
      z: hz - az * half
    }
  ];
}

/**
 * 機体位置から滑走路ナビ情報を計算。
 * posX/posZ: 機体位置 [m]、velX/velZ: 対地速度 [m/s]（対気でなくてよい）
 */
export function computeNavInfo(
  ap: AirportSpec,
  posX: number,
  posZ: number,
  velX: number,
  velZ: number
): NavInfo {
  const [endA, endB] = runwayEnds(ap);
  const ax = Math.sin(ap.heading);
  const az = Math.cos(ap.heading);

  // 機体の滑走路軸沿い位置（center から +axis 方向へ +）と横ずれ
  const dx = posX - ap.center.x;
  const dz = posZ - ap.center.z;
  const along = dx * ax + dz * az;        // + = 端 A 側
  const lateral = dx * az - dz * ax;      // + = 右（axis 進行方向から見て）

  // 最寄り端: along が正なら端 A 側の閾値が近い（滑走路外なら外挿）
  const nearest = along >= 0 ? endA : endB;
  const alongSigned = along >= 0 ? along - ap.length / 2 : -along - ap.length / 2; // 閾値基準（外側は負）
  const distanceToThreshold = Math.hypot(alongSigned, lateral);

  // 進入整合: 横ずれ 1500m 以内 + 速度方向が閾値へ向かい ±30° + 接近中
  const gs = Math.hypot(velX, velZ);
  let aligned = false;
  if (gs > 2 && Math.abs(lateral) < 1500) {
    const toThrX = nearest.x - posX;
    const toThrZ = nearest.z - posZ;
    const trackDeg = (Math.atan2(velX, -velZ) * 180) / Math.PI;
    const bearingDeg = (Math.atan2(toThrX, -toThrZ) * 180) / Math.PI;
    const diff = Math.abs(((trackDeg - bearingDeg + 540) % 360) - 180); // 0=完全一致
    aligned = diff < 30 && toThrX * velX + toThrZ * velZ > 0;
  }

  const onRunway = Math.abs(lateral) < ap.width / 2 + 20 && Math.abs(along) <= ap.length / 2;
  // 残距離: 端 A 側にいるなら A の閾値までは length/2-along、進行方向の端まで
  let remainingRunway: number | null = null;
  if (onRunway) {
    // 進行方向側の端までの距離（速度がなければ機首ではなく近い方の端）
    const trackDeg = gs > 2
      ? (Math.atan2(velX, -velZ) * 180) / Math.PI
      : nearest.headingDeg;
    const towardA = Math.abs(((trackDeg - endA.headingDeg + 540) % 360) - 180) > 90;
    remainingRunway = towardA
      ? ap.length / 2 - along
      : ap.length / 2 + along;
    remainingRunway = Math.max(0, Math.min(ap.length, remainingRunway));
  }

  return {
    nearest,
    distanceToThreshold,
    lateralOffset: lateral,
    alongTrack: alongSigned,
    aligned,
    onRunway,
    remainingRunway,
    groundSpeed: gs
  };
}
