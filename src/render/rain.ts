/**
 * render/rain.ts — 雨（Phase 5）
 *
 * カメラ追従の Points 群で落下する雨線を近似する。
 * 【近似】実際の雨滴ではなく縦長に見せるため線状シェーダ（gl_PointSize + 縦スケール）
 * ではなく、細い Points を速度ベクトル分だけ下へ流す簡易表現。iPhone 負荷軽量のため
 * パーティクル数は固定 900、ワールド座標はカメラを中心にラップアラウンドする。
 * 【単位】速度 22 m/s（雨の終端速度近似）。
 */
import * as THREE from 'three';

export interface RainObjects {
  points: THREE.Points;
  /** 強度 0..1（0 で非表示） */
  setIntensity(v: number): void;
  update(dt: number, cameraPos: THREE.Vector3): void;
}

const AREA = 260; // カメラ半径 [m]
const COUNT = 900;
const FALL_SPEED = 22; // m/s

export function buildRain(scene: THREE.Scene): RainObjects {
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * AREA * 2;
    positions[i * 3 + 1] = Math.random() * 180;
    positions[i * 3 + 2] = (Math.random() - 0.5) * AREA * 2;
    speeds[i] = FALL_SPEED * (0.8 + Math.random() * 0.5);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x9fb8cc,
    size: 1.1,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: true,
    sizeAttenuation: true
  });

  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.visible = false;
  scene.add(points);

  return {
    points,
    setIntensity(v: number) {
      const vv = Math.max(0, Math.min(1, v));
      mat.opacity = 0.10 + 0.35 * vv;
      points.visible = vv > 0.01;
    },
    update(dt: number, cameraPos: THREE.Vector3) {
      if (!points.visible) return;
      const arr = geo.getAttribute('position') as THREE.BufferAttribute;
      const a = arr.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        a[i * 3 + 1] -= speeds[i] * dt;
        // カメラ中心のラップアラウンド（水平）
        const dx = a[i * 3 + 0] - cameraPos.x;
        const dz = a[i * 3 + 2] - cameraPos.z;
        if (dx > AREA) a[i * 3 + 0] -= AREA * 2;
        else if (dx < -AREA) a[i * 3 + 0] += AREA * 2;
        if (dz > AREA) a[i * 3 + 2] -= AREA * 2;
        else if (dz < -AREA) a[i * 3 + 2] += AREA * 2;
        if (a[i * 3 + 1] < cameraPos.y - 60) {
          a[i * 3 + 1] = cameraPos.y + 120;
          a[i * 3 + 0] = cameraPos.x + (Math.random() - 0.5) * AREA * 2;
          a[i * 3 + 2] = cameraPos.z + (Math.random() - 0.5) * AREA * 2;
        }
      }
      arr.needsUpdate = true;
    }
  };
}
