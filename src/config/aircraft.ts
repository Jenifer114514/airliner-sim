/**
 * 機体スペック一元管理（B737 / B777 / A320 相当）
 *
 * 【重要な前提】寸法・外観パラメータは公開情報に基づく**おおよその近似値**であり、
 * 実機の正確なデータを保証するものではない。全数値はこのファイルで調整可能。
 * Phase 3 の飛行物理でもこの値（質量・翼面積・推力）を基盤に使う。
 */

export interface AirlinerSpec {
  id: string;
  name: string;
  description: string;
  /** ===== 幾何（メートル実寸） ===== */
  fuselageLength: number;
  fuselageRadius: number;
  wingspan: number;
  rootChord: number;
  tipChord: number;
  /** 主翼後退角 [rad] */
  sweep: number;
  /** 上反角 [rad] */
  dihedral: number;
  /** 垂直尾翼高さ（胴体中心から） [m] */
  tailHeight: number;
  tailRootChord: number;
  /** エンジン */
  engineDiameter: number;
  engineLength: number;
  /** 翼幅方向のエンジン位置（半翼幅比 0..1） */
  engineSpanPos: number;
  /** エンジンの機首方向オフセット（主翼前縁から前へ） [m] */
  engineForward: number;
  /** 主脚の車輪数（片側） */
  mainWheelCount: number;
  /** ===== リバリー（塗装色） ===== */
  liveryTop: number;
  liveryBottom: number;
  liveryAccent: number;
  /** ===== Phase 3 で使う飛行パラメータ（暫定近似） ===== */
  mass: number;          // kg（離陸重量）
  wingArea: number;      // m²
  thrustMax: number;     // N（両エンジン合計）
  vRotate: number;       // m/s（離陸抬頭速度）
  vCruise: number;       // m/s（巡航）
  vApproach: number;     // m/s（着陸侵入）
}

export const AIRCRAFT: AirlinerSpec[] = [
  {
    id: 'b737',
    name: 'B737 相当「ナローボディ」',
    description: 'B737-700 実データ準拠（JAL/JTA SOP マニュアル反映）。単通路機・翼下ナセル。',
    // 737-700 実寸（マニュアル準拠: 全長 33.6 m / 翼幅 35.8 m）
    fuselageLength: 33.6,
    fuselageRadius: 1.88,
    wingspan: 35.8,
    rootChord: 7.2,
    tipChord: 1.6,
    sweep: 0.436,          // 25°
    dihedral: 0.096,       // 5.5°
    tailHeight: 12.6,
    tailRootChord: 5.2,
    engineDiameter: 1.55,
    engineLength: 3.9,
    engineSpanPos: 0.30,
    engineForward: 1.6,
    mainWheelCount: 2,
    liveryTop: 0xe8eef4,
    liveryBottom: 0x2a4f7c,
    liveryAccent: 0xffb23c,
    // 離陸重量 62,000 kg（MTOW 70,081 kg 未満の典型運航重量・近似）
    mass: 62000,
    wingArea: 124,
    // CFM56-7B × 2（TO 推力 約 235 kN 合計・近似）
    thrustMax: 235000,
    // VR ≒ 142 kt（Load ~72%）→ 73 m/s / Vapp ≒ 132 kt → 68 m/s（Vref 表から）
    vRotate: 73,
    vCruise: 230,
    vApproach: 68
  },
  {
    id: 'a320',
    name: 'A320 相当「ナローボディ」',
    description: '単通路機。シャークレット付きの現代的な翼形状。中短距離の主力。',
    fuselageLength: 37.6,
    fuselageRadius: 1.98,
    wingspan: 35.8,
    rootChord: 7.4,
    tipChord: 1.7,
    sweep: 0.401,          // 23°
    dihedral: 0.087,       // 5°
    tailHeight: 11.9,
    tailRootChord: 5.0,
    engineDiameter: 1.60,
    engineLength: 4.1,
    engineSpanPos: 0.31,
    engineForward: 1.7,
    mainWheelCount: 2,
    liveryTop: 0xf2f4f7,
    liveryBottom: 0x1d3f6e,
    liveryAccent: 0x4fc3f7,
    mass: 78000,
    wingArea: 122,
    thrustMax: 220000,
    vRotate: 73,
    vCruise: 232,
    vApproach: 68
  },
  {
    id: 'b777',
    name: 'B777 相当「ワイドボディ」',
    description: '大型双通路機。巨大エンジンと長い胴体。長距離路線の主力。',
    fuselageLength: 73.9,
    fuselageRadius: 3.10,
    wingspan: 64.8,
    rootChord: 13.0,
    tipChord: 2.6,
    sweep: 0.506,          // 29°
    dihedral: 0.070,       // 4°
    tailHeight: 18.6,
    tailRootChord: 9.4,
    engineDiameter: 3.20,
    engineLength: 7.2,
    engineSpanPos: 0.28,
    engineForward: 2.6,
    mainWheelCount: 3,
    liveryTop: 0xeef1f5,
    liveryBottom: 0x14304e,
    liveryAccent: 0xff6b5a,
    mass: 299000,
    wingArea: 428,
    thrustMax: 720000,
    vRotate: 82,
    vCruise: 248,
    vApproach: 76
  }
];

export function getAircraftSpec(id: string): AirlinerSpec {
  return AIRCRAFT.find((a) => a.id === id) ?? AIRCRAFT[0];
}
