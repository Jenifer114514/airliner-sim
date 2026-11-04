/**
 * sim/demoFlight.ts — Phase 1 のデモ飛行（スプライン軌道 + 速度プロファイル）
 *
 * 【位置づけ】Phase 1 は描画基盤のため、物理操縦ではなく Catmull-Rom スプラインに
 * 沿ったキネマティックな飛行で「離陸→巡航→着陸」を見せる。姿勢は軌道の接線と
 * 曲率から算出し、バンク・ピッチは物理的に自然な値になるよう補間する。
 * Phase 3 で 6-DOF 物理 + タッチ操縦に置換する（このファイルはデモ/カメラ検証用に残す）。
 */
import * as THREE from 'three';

export type FlightPhase =
  | 'PREFLIGHT' | 'TAKEOFF ROLL' | 'ROTATE' | 'CLIMB' | 'CRUISE'
  | 'DESCENT' | 'APPROACH' | 'LANDING' | 'ROLLOUT';

export interface DemoState {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  velocity: THREE.Vector3;
  speed: number;       // 対気速度相当 [m/s]
  altitude: number;    // [m]
  heading: number;     // [deg 0-360]
  pitch: number;       // [deg]
  bank: number;        // [deg]
  vspeed: number;      // [m/s]
  throttle: number;    // 0..1
  gear: number;        // 0..1
  flaps: number;       // deg
  spoilers: number;    // 0..1
  phase: FlightPhase;
}

export class DemoFlight {
  private curve: THREE.CatmullRomCurve3;
  private duration = 118; // [s] 1 ループ
  private t = 0;
  private prevPos = new THREE.Vector3();
  private bankSmooth = 0;
  private pitchSmooth = 0;

  /** 軌道パラメータ u ∈ [0,1] の時間マッピング（区間ごとの速度） */
  private static readonly TIMELINE: Array<[number, number, number]> = [
    // [時間s, u, フェーズ]
    [0, 0.000, 0],
    [20, 0.105, 1],    // 離陸滑走 + 抬頭
    [42, 0.300, 2],    // 上昇
    [78, 0.620, 3],    // 巡航（大きく旋回）
    [106, 0.915, 4],   // 降下・進入
    [118, 1.000, 5]    // 着陸 + ロールアウト
  ];

  constructor() {
    // ワールド座標の経路（空港=原点, 滑走路は Z 軸、離陸は -Z 方向）
    const wp = [
      new THREE.Vector3(0, 2.2, 1850),      // 開始（滑走路端）
      new THREE.Vector3(0, 2.2, 400),       // 加速
      new THREE.Vector3(0, 2.2, -700),      // 抬頭手前
      new THREE.Vector3(0, 24, -1800),      // 抬頭
      new THREE.Vector3(0, 260, -4200),     // 上昇
      new THREE.Vector3(1800, 760, -8200),  // 上昇旋回
      new THREE.Vector3(6200, 1500, -5200), // 巡航
      new THREE.Vector3(8200, 1500, 1200),  // 巡航旋回
      new THREE.Vector3(5200, 1250, 7200),  // 降下開始
      new THREE.Vector3(600, 620, 7600),    // ベース
      new THREE.Vector3(-1700, 240, 5200),  // ベース旋回
      new THREE.Vector3(-1400, 90, 3000),   // ファイナル
      new THREE.Vector3(0, 26, 1900),       // 滑走路中心線上
      new THREE.Vector3(0, 6, 400),         // 接地
      new THREE.Vector3(0, 2.2, -1200),     // ロールアウト
      new THREE.Vector3(0, 2.2, -1850)      // 停止
    ];
    this.curve = new THREE.CatmullRomCurve3(wp, false, 'centripetal');
    this.prevPos.copy(wp[0]);
  }

  reset(): void {
    this.t = 0;
    this.bankSmooth = 0;
    this.pitchSmooth = 0;
    this.prevPos.copy(this.curve.getPointAt(0));
  }

  /** 検証用: タイムラインを任意の時刻へシーク */
  seek(t: number): void {
    this.t = Math.max(0, Math.min(t, this.duration));
  }

  get finished(): boolean {
    return this.t >= this.duration;
  }

  /** 1 フレーム進める */
  update(dt: number): DemoState {
    this.t = Math.min(this.t + dt, this.duration);
    const u = this.mapTimeToU(this.t);

    const pos = this.curve.getPointAt(u);
    const tangent = this.curve.getTangentAt(u).normalize();

    // 姿勢: 接線方向に機首を合わせる
    //   Matrix4.lookAt(eye, target, up) は +Z = eye→target の逆 = normalize(eye - target)。
    //   ここでは +Z（機首）= 接線 にしたいので eye = pos + tangent, target = pos とする。
    const m = new THREE.Matrix4();
    const up = new THREE.Vector3(0, 1, 0);
    m.lookAt(pos.clone().addScaledVector(tangent, 100), pos, up);
    const quat = new THREE.Quaternion().setFromRotationMatrix(m);

    // バンク: 水平方向の曲率から（旋回外側へ傾ける）
    const tangentAhead = this.curve.getTangentAt(Math.min(u + 0.012, 1)).normalize();
    const yawNow = Math.atan2(tangent.x, tangent.z);
    const yawAhead = Math.atan2(tangentAhead.x, tangentAhead.z);
    let yawRate = (yawAhead - yawNow) / (0.012 * 100); // 近似
    while (yawRate > Math.PI) yawRate -= Math.PI * 2;
    while (yawRate < -Math.PI) yawRate += Math.PI * 2;
    const speed = Math.max(pos.distanceTo(this.prevPos) / Math.max(dt, 1e-3), 1);
    const bankTarget = THREE.MathUtils.clamp(-yawRate * speed * 1.15, -0.62, 0.62);
    this.bankSmooth += (bankTarget - this.bankSmooth) * Math.min(dt * 1.6, 1);
    quat.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), this.bankSmooth));

    // ピッチ表示: 接線の仰角 + ソフト化
    const pitchTarget = Math.asin(THREE.MathUtils.clamp(tangent.y, -1, 1));
    this.pitchSmooth += (pitchTarget - this.pitchSmooth) * Math.min(dt * 2.2, 1);

    // 速度: 地速は位置微分、対気速度はフェーズ依存の簡易モデル
    const velocity = pos.clone().sub(this.prevPos).divideScalar(Math.max(dt, 1e-3));
    this.prevPos.copy(pos);

    const phase = this.phaseOf(this.t, pos.y);
    const gear = this.gearOf(u);
    const flaps = this.flapsOf(u, pos.y);
    const spoilers = u > 0.975 ? 0.85 : 0;
    const throttle = this.throttleOf(this.t);

    // 方位: 北 = −Z, 東 = +X, 時計回り 0..360°
    const heading = ((Math.atan2(tangent.x, -tangent.z) * 180) / Math.PI + 360) % 360;

    return {
      position: pos,
      quaternion: quat,
      velocity,
      speed,
      altitude: pos.y,
      heading,
      pitch: (this.pitchSmooth * 180) / Math.PI,
      bank: (this.bankSmooth * 180) / Math.PI,
      vspeed: velocity.y,
      throttle,
      gear,
      flaps,
      spoilers,
      phase
    };
  }

  private mapTimeToU(t: number): number {
    const tl = DemoFlight.TIMELINE;
    for (let i = 0; i < tl.length - 1; i++) {
      const [t0, u0] = tl[i];
      const [t1, u1] = tl[i + 1];
      if (t <= t1) {
        const k = (t - t0) / (t1 - t0);
        // 各区間内でイージング（加減速の自然さ）
        const e = k * k * (3 - 2 * k);
        return u0 + (u1 - u0) * e;
      }
    }
    return 1;
  }

  private phaseOf(t: number, alt: number): FlightPhase {
    if (t < 0.5) return 'PREFLIGHT';
    if (t < 16) return 'TAKEOFF ROLL';
    if (t < 21) return 'ROTATE';
    if (alt < 900 && t < 42) return 'CLIMB';
    if (t < 78) return 'CRUISE';
    if (t < 104) return 'DESCENT';
    if (t < 114.5) return 'APPROACH';
    if (t < 117) return 'LANDING';
    return 'ROLLOUT';
  }

  private gearOf(u: number): number {
    if (u < 0.10) return 1;
    if (u < 0.16) return 1 - (u - 0.10) / 0.06;
    if (u < 0.86) return 0;
    if (u < 0.92) return (u - 0.86) / 0.06;
    return 1;
  }

  private flapsOf(u: number, alt: number): number {
    if (u < 0.04) return 5;
    if (u < 0.12) return 15;
    if (u < 0.20) return 15 - ((u - 0.12) / 0.08) * 15;
    if (u < 0.80) return 0;
    if (u < 0.88) return ((u - 0.80) / 0.08) * 10;
    if (u < 0.95) return 25;
    if (alt < 30) return 30;
    return 30;
  }

  private throttleOf(t: number): number {
    if (t < 18) return 1;
    if (t < 40) return 0.92;
    if (t < 80) return 0.85;
    if (t < 108) return 0.55;
    if (t < 116) return 0.32;
    return 0.15;
  }
}
