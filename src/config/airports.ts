/** 空港定義（Phase 1 は 1 空港。滑走路は原点・北西/南東方向） */
export interface AirportSpec {
  id: string;
  name: string;
  code: string;
  description: string;
  /** 滑走路中心 [m]（ワールド） */
  center: { x: number; z: number };
  /** 滑走路方位（真北 = 0, 東 = π/2）。この角度で滑走路は回転する */
  heading: number;
  /** 滑走路寸法 [m] */
  length: number;
  width: number;
  /** 滑走路番号（表示用） */
  runwayNumbers: [string, string];
}

export const AIRPORTS: AirportSpec[] = [
  {
    id: 'hlm',
    name: '湾岸国際空港',
    code: 'HLM',
    description: '海沿いの国際空港。滑走路 34/16、海岸線と市街地が隣接。',
    center: { x: 0, z: 0 },
    heading: 0,
    length: 4000,
    width: 60,
    runwayNumbers: ['34', '16']
  },
  {
    id: 'sky',
    name: '丘陵空港',
    code: 'SKY',
    description: '内陸の空港。東西滑走路 27/09（2600m）で風向きに強い。',
    center: { x: 1900, z: -1400 },
    heading: Math.PI / 2,
    length: 2600,
    width: 45,
    runwayNumbers: ['27', '09']
  },
  {
    id: 'palm',
    name: 'パーム島空港',
    code: 'PMS',
    description: '南海上の環礁島にある離島空港。滑走路 09/27（1,800m）両端とも海。',
    center: { x: 13500, z: 9500 },
    heading: Math.PI / 2,
    length: 1800,
    width: 45,
    runwayNumbers: ['09', '27']
  }
];

export function getAirportSpec(id: string): AirportSpec {
  return AIRPORTS.find((a) => a.id === id) ?? AIRPORTS[0];
}
