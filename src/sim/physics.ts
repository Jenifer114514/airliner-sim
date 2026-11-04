/**
 * sim/physics.ts — 6-DOF 剛体飛行力学（描画から分離・SI 単位）
 *
 * 【機体座標系】+Z = 機首 / +Y = 上 / +X = 右（描画と同じ。右手系）
 * 【角速度 ω（機体軸まわり）】
 *   +ωx = ピッチ下げ（+X=右軸の右手回転で機首が下がる）
 *   +ωy = 右ヨー
 *   +ωz = 左ロール
 * 【運動方程式】
 *   F = m·dv/dt : 推力（機首方向）+ 揚力 L=½ρV²S·CL + 抗力 D=½ρV²S·CD + 横力 + 重力
 *   M = I·dω/dt + ω×(Iω) : ピッチ/ヨー/ロールモーメント（aero.ts の係数 × q S 参照長）
 *   dq/dt = ½ q ⊗ (0, ω)（機体角速度を積分）
 * 【接地モデル】ギア先端で地面と接触。車輪摩擦（転がり抵抗+ブレーキ+横摩擦）、
 *   小さい反発、起き上がりモーメント。大接地（>8m/s）はクラッシュ扱い。
 * 【近似】風は一定ベクトル。地面は静的高さ関数。プロペラ/ピッチングモーメントの
 *   エンジン位置影響は未モデル化。係数は公開情報ベースの概数（config/aircraft.ts も参照）。
 */
import * as THREE from 'three';
import type { AirlinerSpec } from '../config/aircraft.js';
import { airDensity, dynamicPressure, indicatedAirspeed, G, RHO0 } from './atmosphere.js';
import { computeCoefficients, type ControlState } from './aero.js';

export interface PhysicsTelemetry {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  velocity: THREE.Vector3;
  omega: THREE.Vector3;
  tas: number;
  ias: number;
  alt: number;
  agl: number;
  heading: number;   // deg 0..360（北 = −Z）
  pitch: number;     // deg
  bank: number;      // deg（+ = 右バンク）
  vspeed: number;
  aoa: number;       // deg
  sideslip: number;  // deg
  gLoad: number;
  throttle: number;
  onGround: boolean;
  crashed: boolean;
  distanceFlown: number;
  /** 燃料残量 0..1（表示用。質量変化は未反映 = 近似） */
  fuelFrac: number;
  /** 対地速度 [m/s] */
  groundSpeed: number;
  /** 風速 [m/s] */
  windSpeed: number;
  /** 風向（吹き来る方位）deg 0..360 */
  windDirDeg: number;
}

export class AircraftPhysics {
  readonly spec: AirlinerSpec;

  position = new THREE.Vector3();
  quaternion = new THREE.Quaternion();
  velocity = new THREE.Vector3();
  omega = new THREE.Vector3();

  throttle = 1;
  flapsDeg = 5;
  spoilers = 0;
  gearDown = true;
  brakes = false;
  crashed = false;
  onGround = true;

  /** 風（ワールド一定） */
  wind = new THREE.Vector3();
  /** 乱流強度 0..1（0=なし, 1=強） */
  turbulence = 0;
  /** 燃料残量 0..1 */
  fuelFrac = 1;

  private tSim = 0;
  private gust = new THREE.Vector3();

  private mass: number;
  private inertia = new THREE.Vector3(); // (Ixx ピッチ, Iyy ヨー, Izz ロール)
  private wingArea: number;
  private chord: number;
  private span: number;
  private gearHeight: number;
  private groundHeight: (x: number, z: number) => number;
  private distanceFlown = 0;
  private gLoadSmooth = 1;

  private tmpV = new THREE.Vector3();
  private tmpV2 = new THREE.Vector3();
  private tmpQ = new THREE.Quaternion();
  private fBody = new THREE.Vector3();
  private mBody = new THREE.Vector3();

  constructor(spec: AirlinerSpec, groundHeight: (x: number, z: number) => number = () => 0) {
    this.spec = spec;
    this.groundHeight = groundHeight;
    this.mass = spec.mass;
    this.wingArea = spec.wingArea;
    this.span = spec.wingspan;
    this.chord = spec.rootChord * 0.55 + spec.tipChord * 0.45; // 平均空力弦（近似）
    // 慣性モーメント（近似式: 実機データが無い機体でも調整可能に質量・寸法から推定）
    const L = spec.fuselageLength;
    const B = spec.wingspan;
    this.inertia.set(
      0.35 * this.mass * Math.pow(L * 0.28, 2),   // Ixx: ピッチ
      0.32 * this.mass * Math.pow(L * 0.30, 2),   // Iyy: ヨー
      0.25 * this.mass * Math.pow(B * 0.22, 2)    // Izz: ロール
    );
    this.gearHeight = spec.fuselageRadius * 1.35 + spec.fuselageRadius * 0.30 + spec.fuselageRadius * 0.30;
    this.reset(new THREE.Vector3(0, 0, 1500), 0);
  }

  /** 滑走路上に配置（headingRad: 機首方位、北 = −Z） */
  reset(position: THREE.Vector3, headingRad: number): void {
    this.resetBase(position, headingRad);
    // 地面高さに接地させる
    const gh = this.groundHeight(this.position.x, this.position.z);
    this.position.y = gh + this.gearHeight;
    this.onGround = true;
  }

  /** 空中配置（テスト・リスポーン用） */
  resetAirborne(position: THREE.Vector3, headingRad: number, speed: number): void {
    this.resetBase(position, headingRad);
    // 機首方向（+Z）へ speed [m/s] で直進
    this.velocity.set(0, 0, speed).applyQuaternion(this.quaternion);
    this.onGround = false;
  }

  private resetBase(position: THREE.Vector3, headingRad: number): void {
    this.position.copy(position);
    this.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), headingRad);
    this.velocity.set(0, 0, 0);
    this.omega.set(0, 0, 0);
    this.throttle = 1;
    this.flapsDeg = 5;
    this.spoilers = 0;
    this.gearDown = true;
    this.brakes = false;
    this.crashed = false;
    this.distanceFlown = 0;
    this.gLoadSmooth = 1;
    this.fuelFrac = 1;
    this.tSim = 0;
    this.gust.set(0, 0, 0);
  }

  /** 固定時間刻み（デフォルト 1/120 s）で 1 ステップ */
  step(dt: number, controls: ControlState, elevatorTrim = 0): void {
    if (this.crashed) return;
    const q0 = this.quaternion;

    // ---------- 0. 乱流ガスト・燃料（Phase 5） ----------
    this.tSim += dt;
    // 乱流: 3 成分の正弦波重ね合わせで滑らかなガスト風 [m/s]（近似）
    const amp = this.turbulence * 6;
    if (amp > 0) {
      const t = this.tSim;
      this.gust.set(
        amp * (Math.sin(t * 1.7) * 0.5 + Math.sin(t * 0.91 + 1.3) * 0.3 + Math.sin(t * 2.3 + 4.1) * 0.2),
        amp * 0.7 * (Math.sin(t * 1.13 + 2.2) * 0.5 + Math.sin(t * 2.7 + 0.6) * 0.5),
        amp * (Math.sin(t * 1.37 + 5.0) * 0.5 + Math.sin(t * 0.77 + 3.3) * 0.3 + Math.sin(t * 2.9 + 1.9) * 0.2)
      );
    } else {
      this.gust.set(0, 0, 0);
    }
    // 燃料消費: 全推力で約 77 分で 100%（表示用。質量変化は <2% のため未反映 = 近似）
    if (this.fuelFrac > 0 && this.throttle > 0.02 && !this.onGround) {
      this.fuelFrac = Math.max(0, this.fuelFrac - 0.00006 * this.throttle * dt);
    }

    // ---------- 1. 大気・対気速度 ----------
    const alt = this.position.y;
    const rho = airDensity(alt);
    this.tmpV.copy(this.velocity).sub(this.wind).sub(this.gust); // 対気速度（ワールド・乱流込み）
    const tas = this.tmpV.length();
    // 機体座標へ
    this.tmpQ.copy(q0).invert();
    const bv = this.tmpV2.copy(this.tmpV).applyQuaternion(this.tmpQ); // (right, up, forward)
    const u = bv.z, v = bv.x, w = bv.y;
    const alpha = Math.atan2(-w, Math.max(u, 0.1));
    const beta = Math.atan2(v, Math.max(u, 0.1));

    // ---------- 2. 空力係数 ----------
    const pitchRateUp = -this.omega.x;
    const yawRateRight = this.omega.y;
    const rollRateRight = -this.omega.z;
    // 人間系整合ミラー補正: 機体フレームの +X は three.js 右手系で「左舷」に該当する
    // （fwd=+Z, up=+Y のとき右舷=−X）。動力学系はその内で自己整合だが操縦系が鏡像に
    // なるため、操舵入力と姿勢表示をヒューマン規約（+=右）へ揃える。elevator は対称軸で不変。
    const ctrl: ControlState = {
      elevator: controls.elevator + elevatorTrim,
      aileron: -controls.aileron,
      rudder: -controls.rudder,
      flapsDeg: controls.flapsDeg,
      spoilers: controls.spoilers,
      gearDown: controls.gearDown
    };
    const co = computeCoefficients(
      alpha, beta, ctrl,
      { pitchRateUp, rollRateRight, yawRateRight },
      tas, this.chord, this.span
    );

    // ---------- 3. 力（機体座標） ----------
    const qbar = dynamicPressure(rho, tas);
    this.fBody.set(0, 0, 0);
    this.mBody.set(0, 0, 0);
    if (tas > 0.5) {
      // 抗力: 対気速度と逆方向
      const drag = qbar * this.wingArea * co.CD;
      this.fBody.addScaledVector(bv.divideScalar(tas), -drag); // bv は単位ベクトル化済み
      // 揚力: 対気速度に直交し機体縦平面内（vHat × 右軸で +Y 側）
      const liftDir = this.tmpV.set(0, 0, 0)
        .copy(bv).cross(this.tmpV2.set(1, 0, 0)).normalize(); // vHat × X → (0, cosα, sinα) 系
      // ↑ bv は vHat。cross 後に tmpV2 を使い回すため順序注意 → 下で再計算し直す
      const lift = qbar * this.wingArea * co.CL;
      this.fBody.addScaledVector(liftDir, lift);
      // 横力: +X（右）方向
      this.fBody.x += qbar * this.wingArea * co.CY;
      // 推力: 機首 +Z
      const thrust = this.spec.thrustMax
        * Math.pow(rho / RHO0, 0.8)
        * (1 - 0.35 * Math.min(tas / 700, 1))
        * this.throttle;
      this.fBody.z += thrust;
      // モーメント（q S 参照長）
      const pitchUp = qbar * this.wingArea * this.chord * co.Cm;
      const yawRight = qbar * this.wingArea * this.span * co.Cn;
      const rollRight = qbar * this.wingArea * this.span * co.Cl;
      this.mBody.x += -pitchUp;   // +ωx = ピッチ下げ
      this.mBody.y += yawRight;
      this.mBody.z += -rollRight; // +ωz = 左ロール
    } else {
      // ほぼ静止: 推力のみ
      const thrust = this.spec.thrustMax * Math.pow(rho / RHO0, 0.8) * this.throttle;
      this.fBody.z += thrust;
    }

    // ---------- 4. 並進運動 ----------
    this.tmpQ.copy(q0); // 機体→ワールド
    this.tmpV.copy(this.fBody).applyQuaternion(this.tmpQ);
    this.tmpV.y -= this.mass * G; // 重力
    this.tmpV.divideScalar(this.mass); // 加速度
    // G 計測（機体縦方向の荷重 ≈ 機体 +Y 抗力込み）
    const gLoadBody = this.fBody.y / (this.mass * G) + 0; // 揚力側
    this.gLoadSmooth += (Math.max(gLoadBody, -0.4) - this.gLoadSmooth) * Math.min(dt * 6, 1);

    this.velocity.addScaledVector(this.tmpV, dt);
    this.position.addScaledVector(this.velocity, dt);
    this.distanceFlown += this.velocity.length() * dt;

    // ---------- 5. 回転運動 ----------
    if (!this.onGround) {
      // τ = M - ω×(Iω)
      const I = this.inertia;
      const wx = this.omega.x, wy = this.omega.y, wz = this.omega.z;
      this.tmpV.set(
        this.mBody.x - (wy * I.z * wz - wz * I.y * wy),
        this.mBody.y - (wz * I.x * wx - wx * I.z * wz),
        this.mBody.z - (wx * I.y * wy - wy * I.x * wx)
      );
      this.omega.x += (this.tmpV.x / I.x) * dt;
      this.omega.y += (this.tmpV.y / I.y) * dt;
      this.omega.z += (this.tmpV.z / I.z) * dt;
    } else {
      // 地上: モーメントは起き上がり + タッチで減衰
      this.omega.x += (this.mBody.x / this.inertia.x) * dt;
      this.omega.y += (this.mBody.y / this.inertia.y) * dt;
      this.omega.z += (this.mBody.z / this.inertia.z) * dt;
      this.omega.multiplyScalar(Math.exp(-3.5 * dt));
    }

    // 発散防止: 角速度クランプ（旅客機の体感上限）
    const maxW = 1.6;
    if (this.omega.length() > maxW) this.omega.setLength(maxW);
    if (!Number.isFinite(this.omega.x + this.omega.y + this.omega.z)) this.omega.set(0, 0, 0);

    // クォータニオン積分: dq = ½ q ⊗ (0, ω)
    this.tmpQ.set(this.omega.x * dt / 2, this.omega.y * dt / 2, this.omega.z * dt / 2, 1);
    this.quaternion.multiply(this.tmpQ).normalize();

    // ---------- 6. 接地 ----------
    const gh = this.groundHeight(this.position.x, this.position.z);
    const contactY = gh + this.gearHeight;
    if (this.position.y <= contactY + 0.02) {
      const impactVy = this.velocity.y;
      if (impactVy > 0) {
        // 揚力 > 重量の瞬間: 上昇速度は殺さず接地を解除する（離陸を可能にする）
        this.onGround = false;
      } else {
        this.position.y = contactY;
        this.onGround = true;
        if (impactVy < -8.0) {
          this.crashed = true; // 大接地
          this.velocity.multiplyScalar(0.2);
          return;
        }
        if (impactVy < -0.4) this.velocity.y = -impactVy * 0.12;
        else this.velocity.y = 0;

        // 車輪力: 機体座標で横・縦の摩擦
        const bvG = this.tmpV2.copy(this.velocity).applyQuaternion(this.tmpQ.copy(this.quaternion).invert());
        // 横滑り摩擦（強い）
        bvG.x -= bvG.x * Math.min(6.0 * dt, 1);
        // 転がり抵抗 + ブレーキ
        const rollMu = 0.022 + (this.brakes ? 0.32 : 0) + this.spoilers * 0.06;
        const vz = bvG.z;
        const decel = rollMu * G * dt;
        if (Math.abs(vz) > decel) bvG.z -= Math.sign(vz) * decel;
        else bvG.z = 0;
        this.velocity.copy(bvG).applyQuaternion(this.quaternion);

        // 低速ヨー（前輪操作）: ラダーで方向転換（+ = 右）
        const speed = this.velocity.length();
        if (speed < 30) {
          const steer = -controls.rudder * Math.min(speed / 8, 1) * 0.55; // ミラー整合
          this.tmpQ.setFromAxisAngle(new THREE.Vector3(0, 1, 0), steer * dt);
          this.quaternion.multiply(this.tmpQ);
        }

        // 姿勢の起き上がり（転倒防止）
        // 重力を機体座標へ投影し、方位に依存しない復元トルクを作る
        //   gBody.x > 0 = 右バンク / gBody.z > 0 = 機首下げ
        // ピッチは離陸抬頭のために操縦入力を優先（入力中は位置スプリングを切る）。
        // 転倒は下の傾き判定 + 静止時のスプリングで防止する。
        const ctrlActivity = Math.min(1, Math.abs(controls.elevator) + Math.abs(controls.aileron));
        const rollSpring = (1 - Math.abs(controls.aileron) * 0.9) * 6.5;
        const pitchSpring = Math.abs(controls.elevator) < 0.1 ? 6.5 : 0;
        const gBody = this.tmpV.set(0, -1, 0).applyQuaternion(this.tmpQ.copy(this.quaternion).invert());
        // +ωz = 左ロール: 右バンク(gBody.x>0) → +ωz（戻す）
        this.omega.z += (gBody.x * rollSpring - this.omega.z * 2.2) * dt * 2;
        // +ωx = ピッチ下げ: 機首下げ(gBody.z>0) → −ωx（戻す）
        this.omega.x += (-gBody.z * pitchSpring - this.omega.x * 2.2) * dt * 2;
        void ctrlActivity;

        // 地上転倒判定（重力の傾きで判定: |g水平| > 0.62 ≒ 38°）
        if (Math.hypot(gBody.x, gBody.z) > 0.62) {
          this.crashed = true;
          this.velocity.multiplyScalar(0.1);
        }
      }
    } else {
      this.onGround = false;
    }
  }

  /** テレメトリ（表示用に変換） */
  telemetry(): PhysicsTelemetry {
    const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(this.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.quaternion);
    const rho = airDensity(this.position.y);
    const vAir = new THREE.Vector3().copy(this.velocity).sub(this.wind);
    const tas = vAir.length();
    const vBody = vAir.applyQuaternion(new THREE.Quaternion().copy(this.quaternion).invert());
    return {
      position: this.position.clone(),
      quaternion: this.quaternion.clone(),
      velocity: this.velocity.clone(),
      omega: this.omega.clone(),
      tas,
      ias: indicatedAirspeed(tas, rho),
      alt: this.position.y,
      agl: this.position.y - this.groundHeight(this.position.x, this.position.z),
      heading: ((Math.atan2(fwd.x, -fwd.z) * 180) / Math.PI + 360) % 360,
      pitch: (Math.asin(Math.min(1, Math.max(-1, fwd.y))) * 180) / Math.PI,
      bank: -(Math.atan2(-right.y, up.y) * 180) / Math.PI,  // +=右バンク（ミラー補正後）
      vspeed: this.velocity.y,
      aoa: (Math.atan2(-vBody.y, Math.max(vBody.z, 0.1)) * 180) / Math.PI,
      sideslip: -(Math.atan2(vBody.x, Math.max(vBody.z, 0.1)) * 180) / Math.PI,  // +=右スリップ
      gLoad: this.gLoadSmooth,
      throttle: this.throttle,
      onGround: this.onGround,
      crashed: this.crashed,
      distanceFlown: this.distanceFlown,
      fuelFrac: this.fuelFrac,
      groundSpeed: Math.hypot(this.velocity.x, this.velocity.z),
      windSpeed: Math.hypot(this.wind.x, this.wind.z),
      windDirDeg: ((Math.atan2(-this.wind.x, this.wind.z) * 180) / Math.PI + 360) % 360
    };
  }
}
