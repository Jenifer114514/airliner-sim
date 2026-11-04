/**
 * render/renderer.ts — WebGLRenderer（ACES/sRGB/DPR 管理・画質連動）
 */
import * as THREE from 'three';

export function createRenderer(canvas: HTMLCanvasElement, pixelRatio: number): THREE.WebGLRenderer | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      // MSAA: iPhone の GPU（TBDR）ではタイル内で解決されるため比較的安価。
      // 薄翼・遠景の地形エッジのサブピクセル明滅（シマー）を抑えるために有効化。
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      // 深度バッファは既定（iOS Safari は 24bit）。near/far は CameraRig が視点ごとに最適化する
      depth: true
    });
  } catch (e) {
    console.error('[render] WebGLRenderer 生成失敗:', e);
    return null;
  }
  if (!renderer.getContext()) return null;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x87b8e0, 1);
  // ACES トーンマッピング + sRGB 出力（PBR の階調表現の要）
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  return renderer;
}

export function applyPixelRatio(renderer: THREE.WebGLRenderer, pixelRatio: number): void {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
}

export function resizeRenderer(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
): void {
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
