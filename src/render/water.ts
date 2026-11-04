/**
 * render/water.ts — 海面（波の法線ゆらぎ + 太陽グリッター + フレネル）
 * terrain.ts の地形より下に広がる巨大水面。時間アニメーション付き。
 */
import * as THREE from 'three';
import { WORLD, SUN_DIR } from '../config/constants.js';

export interface WaterObjects {
  mesh: THREE.Mesh;
  update(timeSec: number): void;
  /** 遠景の水面色を fog 色に同期（地平線の連続性） */
  setHorizon(c: THREE.Color): void;
}

export function buildWater(scene: THREE.Scene): WaterObjects {
  const uniforms = {
    uTime: { value: 0 },
    uSunDir: { value: new THREE.Vector3(SUN_DIR.x, SUN_DIR.y, SUN_DIR.z).normalize() },
    uDeep: { value: new THREE.Color(0x0c3552) },
    uShallow: { value: new THREE.Color(0x2e7397) },
    uSky: { value: new THREE.Color(0x9cc4e4) },
    uHorizon: { value: new THREE.Color(0xc4daee) }
  };

  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uSunDir, uDeep, uShallow, uSky, uHorizon;
      varying vec3 vWorld;
      void main() {
        vec3 V = normalize(cameraPosition - vWorld);
        float dist = length(cameraPosition - vWorld);
        float w1 = sin(vWorld.x * 0.011 + uTime * 0.8) * cos(vWorld.z * 0.009 + uTime * 0.55);
        float w2 = sin(vWorld.x * 0.028 - uTime * 1.05) * cos(vWorld.z * 0.024 + uTime * 0.85);
        vec3 N = normalize(vec3(w1 * 0.05 + w2 * 0.028, 1.0, w2 * 0.045 - w1 * 0.028));
        // 遠距離では波動・鏡面を減衰させる（1px が波長に近付くと pow120 の
        // 高光が格子状エイリアス＝白ドットになる。実測: FL350 で海面に明滅ドット）
        float det = 1.0 - smoothstep(6000.0, 26000.0, dist);
        N = mix(vec3(0.0, 1.0, 0.0), N, 0.12 + 0.88 * det);
        float fres = pow(1.0 - max(V.y, 0.0), 3.0);
        vec3 col = mix(uDeep, uShallow, clamp(N.y * 0.35 + 0.4, 0.0, 1.0));
        col = mix(col, uSky, fres * 0.72);
        vec3 R = reflect(-normalize(uSunDir), N);
        float spec = pow(max(dot(R, V), 0.0), 120.0) * det * det;
        col += vec3(1.0, 0.96, 0.85) * spec * (1.0 + 2.4 * det);
        col = mix(col, uHorizon, smoothstep(9000.0, WORLD_FOG_FAR, dist));
        gl_FragColor = vec4(col, 1.0);
      }
    `.replace('WORLD_FOG_FAR', WORLD.FOG_FAR.toFixed(1)),
    fog: false,
    // 海面は「背景レイヤー」として描く（depthTest/Write 無効・renderOrder -9 = 空の直後）。
    // 海岸線では地形との実ギャップ(0〜3m)が約 10km 以遠で深度量子化(24bit, Δ≈0.05/z²)に
    // 埋もれてタイ＝明滅になる（実測 0.8%）。深度比較そのものを廃止すれば原理的に発生しない。
    // 陸は後から通常描画で海面を正しく覆い、海面下の地形は terrain.ts 側で discard 済み。
    depthTest: false,
    depthWrite: false
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(90000, 90000), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = WORLD.SEA_LEVEL;
  mesh.frustumCulled = false;
  mesh.renderOrder = -9;
  scene.add(mesh);

  return {
    mesh,
    update(timeSec: number) {
      uniforms.uTime.value = timeSec;
    },
    setHorizon(c: THREE.Color) {
      uniforms.uHorizon.value.copy(c);
    }
  };
}
