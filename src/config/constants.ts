/** 世界・カメラ・品質の定数（SI 単位: m, s, rad） */
export const SUN_DIR = { x: 0.55, y: 0.62, z: 0.28 };

export const WORLD = {
  /** 地形メッシュ一辺 [m] */
  TERRAIN_SIZE: 52000,
  /** 地形分割数 */
  TERRAIN_SEGMENTS: 192,
  /** 海面高さ [m] */
  SEA_LEVEL: -3,
  /** 空港（原点）周辺の平坦半径 [m] */
  FLAT_RADIUS: 3200,
  /** フォグ開始/終了 [m] */
  FOG_NEAR: 2600,
  FOG_FAR: 34000
};

export const CAMERA = {
  FOV: 60,
  FOV_COCKPIT: 62,
  /** 視点切替の補間時間 [s] */
  BLEND_TIME: 0.65,
  /** 観察カメラの自動旋回速度 [rad/s] */
  ORBIT_SPEED: 0.12
};

/** 画質プリセット */
export type QualityLevel = 'ultra' | 'high' | 'medium' | 'low';
export interface QualityPreset {
  pixelRatio: number;
  shadows: boolean;
  shadowMapSize: number;
  treeCount: number;
  cityCount: number;
  cloudCount: number;
  /** 地形クリップマップ: 近景パッチの分割数（頂点数の平方） */
  terrainNearSeg: number;
  /** 中景パッチ（8km）を使うか */
  terrainMid: boolean;
  /** 太陽影のカバー範囲 [m]（プレイヤー中心） */
  shadowRange: number;
  /** UnrealBloom（夜間灯・太陽・雲高光の発光）。high/ultra のみ */
  bloom: boolean;
  /** 滑走路テクスチャの横幅 px（縦は 8 倍。512→1024 で 4 倍画素） */
  runwayTexPx: number;
}
export const QUALITY: Record<QualityLevel, QualityPreset> = {
  ultra:  { pixelRatio: 3.0, shadows: true,  shadowMapSize: 4096, treeCount: 2000, cityCount: 520, cloudCount: 44, terrainNearSeg: 320, terrainMid: true,  shadowRange: 2800, bloom: true,  runwayTexPx: 1024 },
  high:   { pixelRatio: 2.0, shadows: true,  shadowMapSize: 2048, treeCount: 1400, cityCount: 380, cloudCount: 34, terrainNearSeg: 256, terrainMid: true,  shadowRange: 2600, bloom: true,  runwayTexPx: 1024 },
  medium: { pixelRatio: 1.5, shadows: true,  shadowMapSize: 1024, treeCount: 650,  cityCount: 220, cloudCount: 22, terrainNearSeg: 128, terrainMid: true,  shadowRange: 2000, bloom: false, runwayTexPx: 512 },
  low:    { pixelRatio: 1.0, shadows: false, shadowMapSize: 512,  treeCount: 320,  cityCount: 130, cloudCount: 14, terrainNearSeg: 96,  terrainMid: false, shadowRange: 1400, bloom: false, runwayTexPx: 512 }
};
