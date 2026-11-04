/**
 * render/sky.ts — 大気散乱風の空シェーダ・太陽・PMREM 環境マップ
 *
 * 【モデルの前提】
 * - 地平線→天頂のグラデーション + 太陽ディスク + 2 段グロー + 太陽方位の暖色ハズレ
 * - uSunElevation で朝/昼/夕方へ展開可能（Phase 5。Phase 1 は昼固定）
 * - PMREM: 空シェーダから環境マップを生成し、機体塗装/ガラスの IBL 反射にする
 */
import * as THREE from 'three';
import { SUN_DIR } from '../config/constants.js';

export interface SkyObjects {
  sky: THREE.Mesh;
  sun: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  /** 太陽方向（単位ベクトル・setSunElevation で更新される live 参照） */
  sunDir: THREE.Vector3;
  setSunElevation(el: number): void;
  /** 空・光の色を時間帯/天候で変更（Phase 5） */
  setPalette(skyTop: number, skyHorizon: number, sunColor: number, sunIntensity: number, hemiIntensity: number): void;
}

export function buildSky(scene: THREE.Scene, renderer: THREE.WebGLRenderer): SkyObjects {
  const sunDir = new THREE.Vector3(SUN_DIR.x, SUN_DIR.y, SUN_DIR.z).normalize();

  const uniforms = {
    uTop: { value: new THREE.Color(0x2e63c0) },
    uHorizon: { value: new THREE.Color(0xc4daee) },
    uSunDir: { value: sunDir.clone() },
    uSunColor: { value: new THREE.Color(1.0, 0.93, 0.8) }
  };

  const skyMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, -0.06, 1.0);
        // 大気散乱の近似: 低い空ほど光路長が長く白っぽく
        vec3 col = mix(uHorizon, uTop, pow(max(h, 0.0), 0.52));
        float sunAmt = max(dot(d, normalize(uSunDir)), 0.0);
        col += uSunColor * pow(sunAmt, 1200.0) * 3.2;   // 太陽ディスク
        col += uSunColor * pow(sunAmt, 18.0) * 0.30;    // 内側グロー
        col += uSunColor * pow(sunAmt, 3.5) * 0.12;     // 広域ハズレ
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false
  });

  const sky = new THREE.Mesh(new THREE.SphereGeometry(24000, 32, 16), skyMat);
  sky.frustumCulled = false;
  sky.renderOrder = -10;
  scene.add(sky);

  // ===== PMREM 環境マップ（IBL）: 空シェーダを焼き込み =====
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const envSky = new THREE.Mesh(new THREE.SphereGeometry(100, 24, 12), skyMat);
  envSky.frustumCulled = false;
  envScene.add(envSky);
  const envRT = pmrem.fromScene(envScene, 0.04);
  scene.environment = envRT.texture;
  envSky.geometry.dispose();
  pmrem.dispose();

  // ===== ライト =====
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.4);
  sun.position.copy(sunDir).multiplyScalar(3200);
  scene.add(sun);
  scene.add(sun.target);

  const hemi = new THREE.HemisphereLight(0xbcd8f0, 0x6a7a58, 0.75);
  scene.add(hemi);

  return {
    sky,
    sun,
    hemi,
    sunDir,
    setSunElevation(el: number) {
      // el: 0=地平線, π/2=真上。方位は維持
      const horiz = Math.sqrt(Math.max(1 - el * el, 0.0001));
      sunDir.set(SUN_DIR.x * horiz, Math.max(el, 0.03), SUN_DIR.z * horiz).normalize();
      uniforms.uSunDir.value.copy(sunDir);
      sun.position.copy(sunDir).multiplyScalar(3200);
    },
    setPalette(skyTop: number, skyHorizon: number, sunColor: number, sunIntensity: number, hemiIntensity: number) {
      uniforms.uTop.value.setHex(skyTop);
      uniforms.uHorizon.value.setHex(skyHorizon);
      uniforms.uSunColor.value.setHex(sunColor);
      sun.color.setHex(sunColor);
      sun.intensity = sunIntensity;
      hemi.intensity = hemiIntensity;
    }
  };
}
