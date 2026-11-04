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
  /** 星の強さ 0..1（nightLights に同期） */
  setStars(f: number): void;
  /** 現パレットで PMREM 環境マップを再焼成（機体 IBL・海面空色と一致させる） */
  regenerateEnv(scene: THREE.Scene): void;
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
  const pmrem0 = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const envSky = new THREE.Mesh(new THREE.SphereGeometry(100, 32, 16), skyMat);
  envSky.frustumCulled = false;
  envScene.add(envSky);
  let envRT = pmrem0.fromScene(envScene, 0.04);
  scene.environment = envRT.texture;
  // 再焼成用は軽量 PMREMGenerator を常時保持（dispose せず再利用。切替は 1回/操作）
  const pmrem = pmrem0;
  void renderer;

  // ===== ライト =====
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.4);
  sun.position.copy(sunDir).multiplyScalar(3200);
  scene.add(sun);
  scene.add(sun.target);

  const hemi = new THREE.HemisphereLight(0xbcd8f0, 0x6a7a58, 0.75);
  scene.add(hemi);

  // ===== 星（夜間のみ。Points・加算・bloom 映え） =====
  const N = 1400;
  const starPos = new Float32Array(N * 3);
  const starSize = new Float32Array(N);
  {
    let sd = 20261104;
    const rnd = () => { sd = (sd * 1103515245 + 12345) & 0x7fffffff; return sd / 0x7fffffff; };
    for (let i = 0; i < N; i++) {
      // 上半球のみ均一
      const u = rnd() * Math.PI * 2;
      const v = Math.acos(1 - rnd()); // 天頂密度重み
      const rr = 21000;
      starPos[i * 3] = Math.sin(v) * Math.cos(u) * rr;
      starPos[i * 3 + 1] = Math.cos(v) * rr;
      starPos[i * 3 + 2] = Math.sin(v) * Math.sin(u) * rr;
      starSize[i] = 0; // 予備（sizeAttenuation なしの一律 px サイズで代用）
    }
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  // 丸いソフトスプライト（スクエア点のギザギザを防止）+ 2〜3px
  const starTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const g2 = c.getContext('2d')!;
    const grad = g2.createRadialGradient(16, 16, 1, 16, 16, 15);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(235,242,255,0.85)');
    grad.addColorStop(1, 'rgba(235,242,255,0)');
    g2.fillStyle = grad;
    g2.fillRect(0, 0, 32, 32);
    const t = new THREE.CanvasTexture(c);
    return t;
  })();
  const starMat = new THREE.PointsMaterial({
    color: 0xdfe8ff, size: 3.2, sizeAttenuation: false, map: starTex, alphaTest: 0.02,
    transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false
  });
  const stars = new THREE.Points(starGeo, starMat);
  stars.renderOrder = -9;
  stars.frustumCulled = false;
  scene.add(stars);

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
      hemi.color.setHex(skyHorizon);
    },
    setStars(f: number) {
      starMat.opacity = Math.max(0, Math.min(1, f)) * 0.8;
      stars.visible = f > 0.02;
    },
    regenerateEnv(sceneRef: THREE.Scene) {
      const prev = envRT;
      envRT = pmrem.fromScene(envScene, 0.04);
      sceneRef.environment = envRT.texture;
      prev.dispose();
    }
  };
}
