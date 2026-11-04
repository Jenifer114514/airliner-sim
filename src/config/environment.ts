/**
 * config/environment.ts — 天候・時刻・風プリセット（Phase 5）
 *
 * 【単位】風速 m/s、風向は「風の吹き来る方位」deg（0=北, 90=東）、
 * 時刻は太陽高度 sin(elev)（0=地平線, 1=真上）で表す近似。
 * 【近似】天候は視覚表現（空色・霧・雲量・雨）と乱流強度の組み合わせ。
 * 実気象モデルではない。
 */

export type TimeOfDayId = 'day' | 'sunset' | 'night';
export type WeatherId = 'clear' | 'cloudy' | 'rain';
export type WindId = 'calm' | 'breeze' | 'strong';

export interface TimePreset {
  id: TimeOfDayId;
  label: string;
  sub: string;
  /** 太陽高度 sin(elev)（sky シェーダ uSunElevation 互換） */
  sunElevation: number;
  /** 空（天頂）色 */
  skyTop: number;
  /** 空（地平線）色 */
  skyHorizon: number;
  /** 太陽/主光色 */
  sunColor: number;
  /** 平行光強度 */
  sunIntensity: number;
  /** 半球光強度 */
  hemiIntensity: number;
  /** フォグ色 */
  fogColor: number;
  /** 夜間灯（滑走路灯など）の明るさ 0..1 */
  nightLights: number;
}

export interface WeatherPreset {
  id: WeatherId;
  label: string;
  sub: string;
  /** 雲の表示数倍率（0=無し, 1=通常） */
  cloudScale: number;
  /** 雲の暗さ（雨天の鉛色雲） */
  cloudDarken: number;
  /** フォグ濃度倍率（1=通常, 3=濃い霧） */
  fogScale: number;
  /** 雨の強さ 0..1 */
  rain: number;
  /** 太陽光の減光倍率 */
  sunScale: number;
  /** 乱流強度 0..1（風と合成して機体に乱気流を与える） */
  turbulence: number;
}

export interface WindPreset {
  id: WindId;
  label: string;
  sub: string;
  /** 風速 [m/s] */
  speed: number;
  /** 風向（風の吹き来る方位）deg */
  directionDeg: number;
}

export const TIMES: TimePreset[] = [
  {
    id: 'day', label: '昼', sub: '晴天の白昼',
    sunElevation: 0.82, skyTop: 0x2e63c0, skyHorizon: 0xc4daee,
    sunColor: 0xffedcc, sunIntensity: 2.4, hemiIntensity: 0.75,
    fogColor: 0xc9dcef, nightLights: 0.15
  },
  {
    id: 'sunset', label: '夕焼け', sub: 'オレンジの空',
    sunElevation: 0.12, skyTop: 0x27417a, skyHorizon: 0xf2a25c,
    sunColor: 0xffb46a, sunIntensity: 1.7, hemiIntensity: 0.5,
    fogColor: 0xe0a272, nightLights: 0.55
  },
  {
    id: 'night', label: '夜', sub: '星空と滑走路灯',
    sunElevation: -0.12, skyTop: 0x060b1c, skyHorizon: 0x1a2740,
    sunColor: 0x9db4e8, sunIntensity: 0.35, hemiIntensity: 0.22,
    fogColor: 0x121c2e, nightLights: 1.0
  }
];

export const WEATHERS: WeatherPreset[] = [
  {
    id: 'clear', label: '快晴', sub: '雲少なめ・良好',
    cloudScale: 0.85, cloudDarken: 0, fogScale: 1, rain: 0, sunScale: 1, turbulence: 0.15
  },
  {
    id: 'cloudy', label: 'くもり', sub: '雲多め・やや荒れ',
    cloudScale: 1.6, cloudDarken: 0.35, fogScale: 1.6, rain: 0, sunScale: 0.55, turbulence: 0.45
  },
  {
    id: 'rain', label: '雨', sub: '暗い空・乱流・雨',
    cloudScale: 1.35, cloudDarken: 0.6, fogScale: 2.4, rain: 1, sunScale: 0.3, turbulence: 0.8
  }
];

export const WINDS: WindPreset[] = [
  { id: 'calm', label: '無風', sub: '0 m/s', speed: 0, directionDeg: 0 },
  { id: 'breeze', label: 'そよ風', sub: '5 m/s 北西', speed: 5, directionDeg: 315 },
  { id: 'strong', label: '強風', sub: '12 m/s 西', speed: 12, directionDeg: 270 }
];

export function getTimePreset(id: string): TimePreset {
  return TIMES.find((t) => t.id === id) ?? TIMES[0];
}
export function getWeatherPreset(id: string): WeatherPreset {
  return WEATHERS.find((w) => w.id === id) ?? WEATHERS[0];
}
export function getWindPreset(id: string): WindPreset {
  return WINDS.find((w) => w.id === id) ?? WINDS[0];
}

/**
 * 風向・風速 → ワールド速度ベクトル [m/s]
 * 方位: 0=北=−Z, 90=東=+X（heading 規約と同じ）。「風の吹き来る方位」から
 * 「風の流れる先」へ反転したベクトルを返す。
 */
export function windVector(speed: number, fromDeg: number): { x: number; z: number } {
  const rad = (fromDeg * Math.PI) / 180;
  // 風は from 方位から吹いてくる → 流れる方向は from+180°
  const to = rad + Math.PI;
  // 方位 → ワールド: 北(0)=−Z, 東(90)=+X
  return {
    x: speed * Math.sin(to),
    z: -speed * Math.cos(to)
  };
}
