/**
 * render/cameras.ts — 5 カメラモード・滑らかな補間・タッチオービット
 *
 * 1. cockpit : コックピット（計器盤が見える目線）
 * 2. chase   : 機体追従（遅れゼロ・ロールデカップル・旋回に自然追従）
 * 3. wing    : 翼上からの外観
 * 4. orbit   : 機体を周囲から観察（自動旋回 + ドラッグで角度変更）
 * 5. landing : 着陸用の後方高位カメラ（滑走路方向を注視）
 *
 * 【機体座標系】+Z = 機首, +Y = 上, +X = 右
 */
import * as THREE from 'three';
import { CAMERA } from '../config/constants.js';
import { expSmooth, clamp } from '../core/math.js';

export type CameraMode = 'cockpit' | 'chase' | 'wing' | 'orbit' | 'landing';

export const CAMERA_NAMES: Record<CameraMode, string> = {
  cockpit: 'コックピット',
  chase: '三人称',
  wing: '翼上',
  orbit: '周回',
  landing: '進入'
};

/* v22: 運用は 2 モードのみ — コックピット ⇔ 三人称（chase）。
   三人称では画面スライドで視点オフセット（chaseYaw/Pitch）を動かせる（下方の追記）。
   wing/orbit/landing はコード遺存だが切替サイクルからは除外。 */
const MODE_ORDER: CameraMode[] = ['cockpit', 'chase'];

export interface AircraftPose {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  velocity: THREE.Vector3;
  size: number; // 機体全長 [m]（カメラ距離の基準）
  /** 対地高度 [m]（chase FOV の低空補正用） */
  agl?: number;

}

export class CameraRig {
  mode: CameraMode = 'chase';
  private camera: THREE.PerspectiveCamera;

  /**
   * 視点ごとの近クリップ面 [m]（深度精度＝チカチカ防止の要）。
   * 透視投影の深度分解能は Δz ≈ z² / (near · 2^24) なので、near を大きくするほど
   * 遠方の地面（滑走路 vs 地形）の食い違いが消える。
   * ただし wing は翼面がカメラ直下 0.7m、cockpit は計器盤/窓枠が 0.6m のため小さめにする。
   */
  private static readonly NEAR: Record<CameraMode, number> = {
    cockpit: 0.45,
    chase: 2.5,
    wing: 0.25,
    orbit: 2.5,
    landing: 2.0
  };
  /** 遠クリップ面 [m]（フォグ遠端 42km を覆いつつ、旧値 60km より深度精度を稼ぐ） */
  private static readonly FAR = 46000;
  private lastMode: CameraMode = 'chase';

  // 視点切替の補間
  private blending = false;
  private blendT = 0;
  private fromPos = new THREE.Vector3();
  private fromQuat = new THREE.Quaternion();
  private desiredPos = new THREE.Vector3();
  private desiredQuat = new THREE.Quaternion();

  // 追従カメラ用の平滑機首方向
  private smoothFwd = new THREE.Vector3(0, 0, -1);
  private tmpFwd = new THREE.Vector3();
  private tmpRight = new THREE.Vector3();
  private tmpUp = new THREE.Vector3();
  private worldUp = new THREE.Vector3(0, 1, 0);
  private lookTarget = new THREE.Vector3(); // v18: lookAt 用（旧: position.clone() を毎帧生成）

  // オービットカメラ
  orbitAzimuth = 2.2;
  orbitElevation = 0.35;
  private orbitAuto = true;

  // v22: 三人称（chase）視点オフセット — 画面スライドで変更、切替・飛行継続でも維持
  chaseYaw = 0;
  chasePitch = 0.222; // 既定の視点高さ（旧 chase の -0.62 fwd +0.14 up と同角）

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    this.camera.fov = CAMERA.FOV;
    this.updateDepthRange();
    this.camera.updateProjectionMatrix();
  }

  /** near/far を視点に合わせて更新（視点切替の補間中は小さい near を使いクリッピングを防ぐ） */
  private updateDepthRange(): void {
    const target = CameraRig.NEAR[this.mode];
    const near = this.blending ? Math.min(target, CameraRig.NEAR[this.lastMode]) : target;
    if (!this.blending) this.lastMode = this.mode;
    if (Math.abs(this.camera.near - near) > 1e-4 || this.camera.far !== CameraRig.FAR) {
      this.camera.near = near;
      this.camera.far = CameraRig.FAR;
      this.camera.updateProjectionMatrix();
    }
  }

  nextMode(): CameraMode {
    const i = MODE_ORDER.indexOf(this.mode);
    return this.setMode(MODE_ORDER[(i + 1) % MODE_ORDER.length]);
  }
  prevMode(): CameraMode {
    const i = MODE_ORDER.indexOf(this.mode);
    return this.setMode(MODE_ORDER[(i + MODE_ORDER.length - 1) % MODE_ORDER.length]);
  }
  setMode(mode: CameraMode): CameraMode {
    if (mode !== this.mode) {
      this.blending = true;
      this.blendT = 0;
      this.fromPos.copy(this.camera.position);
      this.fromQuat.copy(this.camera.quaternion);
    }
    this.mode = mode;
    this.camera.fov = mode === 'cockpit' ? CAMERA.FOV_COCKPIT : CAMERA.FOV;
    this.camera.updateProjectionMatrix();
    return this.mode;
  }

  /** 観察カメラのドラッグ入力（ピクセル差分） */
  addOrbitDelta(dx: number, dy: number): void {
    this.orbitAzimuth -= dx * 0.005;
    this.orbitElevation = clamp(this.orbitElevation + dy * 0.004, -0.25, 1.25);
    this.orbitAuto = false;
  }

  /** v22: 三人称カメラの画面スライド入力（ピクセル差分）— 機体を周る視点角 */
  addChaseDelta(dx: number, dy: number): void {
    this.chaseYaw -= dx * 0.005;
    this.chasePitch = clamp(this.chasePitch + dy * 0.004, 0.03, 1.25);
  }

  update(dt: number, pose: AircraftPose): void {
    const { position, quaternion, velocity, size } = pose;

    this.updateDepthRange();

    switch (this.mode) {
      case 'cockpit': {
        // パイロット目線: 計器盤（中央 z≈0.33size）・ヨーク（0.34size）より **後方** に置く。
        // 旧値 0.365 は旧機体寸法ベースで、再設計後のコクピット群ではカメラが計器盤より
        // 前に出てしまい「内装が一切見えない」状態になっていた（2026-11-04k 修正）
        this.desiredPos.set(0, size * 0.026, size * 0.305).applyQuaternion(quaternion).add(position);
        this.desiredQuat.copy(quaternion);
        // 機首 +Z をカメラ前方（−Z）へ合わせるため 180° ヨー補正
        this.desiredQuat.multiply(q180Y);
        break;
      }
      case 'wing': {
        this.desiredPos.set(-size * 0.16, size * 0.035, size * 0.06).applyQuaternion(quaternion).add(position);
        this.desiredQuat.copy(quaternion).multiply(q180Y);
        // やや前方を見る
        this.desiredQuat.multiply(qSmallYaw);
        break;
      }
      case 'orbit': {
        if (this.orbitAuto) this.orbitAzimuth += dt * CAMERA.ORBIT_SPEED;
        const r = size * 1.35;
        const cy = Math.cos(this.orbitElevation);
        this.desiredPos.set(
          Math.cos(this.orbitAzimuth) * cy * r,
          Math.sin(this.orbitElevation) * r + size * 0.05,
          Math.sin(this.orbitAzimuth) * cy * r
        ).add(position);
        // 機体を見る（lookAt 用に desiredQuat を直接計算）
        this.tmpFwd.copy(position).sub(this.desiredPos).normalize();
        this.camera.position.copy(this.desiredPos);
        this.camera.up.set(0, 1, 0);
        this.camera.lookAt(position);
        if (this.blending) {
          this.blendT = Math.min(this.blendT + dt / CAMERA.BLEND_TIME, 1);
          const k = easeInOut(this.blendT);
          this.camera.position.lerpVectors(this.fromPos, this.desiredPos, k);
          if (this.blendT >= 1) this.blending = false;
        }
        return;
      }
      case 'landing': {
        this.desiredPos.set(0, size * 0.10, -size * 1.15).applyQuaternion(quaternion).add(position);
        // 進行方向の先（滑走路側）を見る
        this.tmpFwd.set(0, 0, 1).applyQuaternion(quaternion);
        this.tmpFwd.y *= 0.35;
        this.tmpFwd.normalize();
        this.tmpUp.set(0, 1, 0).applyQuaternion(quaternion).lerp(this.worldUp, 0.55).normalize();
        this.camera.position.copy(this.desiredPos);
        this.camera.up.copy(this.tmpUp);
        this.camera.lookAt(this.lookTarget.copy(position).addScaledVector(this.tmpFwd, size * 0.9).addScaledVector(this.worldUp, -size * 0.02));
        if (this.blending) {
          this.blendT = Math.min(this.blendT + dt / CAMERA.BLEND_TIME, 1);
          const k = easeInOut(this.blendT);
          this.camera.position.lerpVectors(this.fromPos, this.desiredPos, k);
          if (this.blendT >= 1) this.blending = false;
        }
        return;
      }
      default: {
        // ===== chase（三人称）: 遅れゼロ追従 + v22 スライド視点 =====
        this.tmpFwd.set(0, 0, 1).applyQuaternion(quaternion);
        const k = expSmooth(5.2, dt);
        this.smoothFwd.lerp(this.tmpFwd, k);
        if (this.smoothFwd.lengthSq() < 1e-8) this.smoothFwd.copy(this.tmpFwd);
        this.smoothFwd.normalize();

        // 機体→視点の単位方向: -fwd を yaw で worldUp 周りに回し、pitch で持ち上げる
        this.tmpRight.copy(this.smoothFwd).multiplyScalar(-1);
        this.tmpRight.applyAxisAngle(this.worldUp, this.chaseYaw);
        this.tmpUp.crossVectors(this.tmpRight, this.worldUp);
        if (this.tmpUp.lengthSq() < 1e-6) this.tmpUp.set(1, 0, 0);
        this.tmpUp.normalize();
        this.tmpRight.applyAxisAngle(this.tmpUp, this.chasePitch);
        // 視点方向が揃った枠で up を再直交化（チンアップ時の roll 跳ね防止）
        this.lookTarget.crossVectors(this.tmpUp, this.tmpRight).normalize();

        this.desiredPos.copy(position).addScaledVector(this.tmpRight, size * 0.635);
        this.camera.position.copy(this.desiredPos);
        this.camera.up.copy(this.lookTarget);
        // 見中心: 視点方向が真後ろの時は機首前方を引き、周回位置では機体中心へ
        this.tmpUp.copy(this.smoothFwd).multiplyScalar(size * 0.55 * Math.max(0, this.tmpRight.dot(this.tmpFwd.copy(this.smoothFwd).multiplyScalar(-1))));
        this.camera.lookAt(this.lookTarget.copy(position).add(this.tmpUp));
        // 速度に応じて画角をわずかに広げる（速度感）
        const lowQ = pose.agl !== undefined ? clamp(1 - pose.agl / 300, 0, 1) : 0;
        const targetFov = CAMERA.FOV + clamp(velocity.length() * 0.03, 0, 8) + lowQ * 3.2;
        this.camera.fov += (targetFov - this.camera.fov) * expSmooth(2, dt);
        this.camera.updateProjectionMatrix();
        return;
      }
    }

    // cockpit / wing: 補間つきで姿勢を適用
    if (this.blending) {
      this.blendT = Math.min(this.blendT + dt / CAMERA.BLEND_TIME, 1);
      const k = easeInOut(this.blendT);
      this.camera.position.lerpVectors(this.fromPos, this.desiredPos, k);
      this.camera.quaternion.slerpQuaternions(this.fromQuat, this.desiredQuat, k);
      if (this.blendT >= 1) this.blending = false;
    } else {
      this.camera.position.copy(this.desiredPos);
      this.camera.quaternion.copy(this.desiredQuat);
    }
  }

  /** 初期化（デモ再始動時） */
  snap(pose: AircraftPose): void {
    this.blending = false;
    this.smoothFwd.set(0, 0, 1).applyQuaternion(pose.quaternion);
    this.update(1 / 60, pose);
    this.blending = false;
    this.update(1 / 60, pose);
  }
}

const q180Y = new THREE.Quaternion(0, 1, 0, 0);           // 180° Y ヨー
const qSmallYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -0.55); // やや前方外側

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
