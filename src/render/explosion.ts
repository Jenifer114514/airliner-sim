/**
 * render/explosion.ts — 衝突爆発（地面・建物）
 *  Points + 軽量シェーダで炎/火花（加算）と黒煙（通常）を描く。
 *  boom() で断片的な炎球 + 煙 + フラッシュライト、以降 2.5s ほど残煙が湧く。
 *  依存なし（シーンに add して毎フレーム update(dt) を呼ぶ）。
 */
import * as THREE from 'three';

type Particle = {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  life: number; maxLife: number;
  size0: number; size1: number;
  r: number; g: number; b: number;
  grow: number; buoy: number; grav: number;
};

function makeSoftTex(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const rad = g.createRadialGradient(32, 32, 2, 32, 32, 31);
  rad.addColorStop(0, 'rgba(255,255,255,1)');
  rad.addColorStop(0.55, 'rgba(255,255,255,0.55)');
  rad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = rad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

const VERT = `
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vAlpha = aAlpha;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(aSize * (300.0 / max(1.0, -mv.z)), 1.0, 120.0);
  gl_Position = projectionMatrix * mv;
}`;
const FRAG = `
uniform sampler2D uTex;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec4 t = texture2D(uTex, gl_PointCoord);
  gl_FragColor = vec4(vColor, t.a * vAlpha);
  if (gl_FragColor.a < 0.004) discard;
}`;

class ParticleSystem {
  readonly cap: number;
  list: Particle[] = [];
  private geo: THREE.BufferGeometry;
  private pts: THREE.Points;
  private posA: Float32Array;
  private sizeA: Float32Array;
  private alphaA: Float32Array;
  private colorA: Float32Array;

  constructor(scene: THREE.Scene, cap: number, tex: THREE.Texture, blending: THREE.Blending) {
    this.cap = cap;
    this.posA = new Float32Array(cap * 3);
    this.sizeA = new Float32Array(cap);
    this.alphaA = new Float32Array(cap);
    this.colorA = new Float32Array(cap * 3);
    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.posA, 3));
    this.geo.setAttribute('aSize', new THREE.BufferAttribute(this.sizeA, 1));
    this.geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphaA, 1));
    this.geo.setAttribute('aColor', new THREE.BufferAttribute(this.colorA, 3));
    this.geo.setDrawRange(0, 0);
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTex: { value: tex } },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending
    });
    this.pts = new THREE.Points(this.geo, mat);
    this.pts.frustumCulled = false;
    this.pts.renderOrder = 6;
    scene.add(this.pts);
  }

  add(p: Particle): void {
    if (this.list.length >= this.cap) this.list.shift(); // 古いものから退避
    this.list.push(p);
  }

  update(dt: number, nearFade?: (p: Particle) => number): void {
    let n = 0;
    for (let i = 0; i < this.list.length; i++) {
      const p = this.list[i];
      p.life -= dt;
      if (p.life <= 0) continue;
      p.vy += (p.buoy - p.grav) * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      const f = p.life / p.maxLife;              // 1→0
      this.posA[n * 3] = p.x; this.posA[n * 3 + 1] = p.y; this.posA[n * 3 + 2] = p.z;
      this.sizeA[n] = p.size0 + (p.size1 - p.size0) * (1 - f) + p.grow * (1 - f);
      let a = Math.min(1, f * 2.6) * Math.min(1, (1 - f) * 9 + 0.15);
      if (nearFade) { a *= nearFade(p); if (a < 0.004) continue; }
      this.alphaA[n] = a;
      this.colorA[n * 3] = p.r; this.colorA[n * 3 + 1] = p.g; this.colorA[n * 3 + 2] = p.b;
      this.list[n] = p;
      n++;
    }
    this.list.length = n;
    this.geo.setDrawRange(0, n);
    (this.geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.getAttribute('aSize') as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.getAttribute('aAlpha') as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.getAttribute('aColor') as THREE.BufferAttribute).needsUpdate = true;
  }

  get live(): number { return this.list.length; }

  dispose(scene: THREE.Scene): void {
    scene.remove(this.pts);
    this.geo.dispose();
    (this.pts.material as THREE.Material).dispose();
  }
}

export class ExplosionFX {
  private fire: ParticleSystem;
  private smoke: ParticleSystem;
  private flash: THREE.PointLight;
  private embers: { x: number; y: number; z: number; t: number; power: number }[] = [];
  private readonly scene: THREE.Scene;
  private time = 0;
  /** 追跡カメラ（近い煙をフォールドして画面が曇るのを防ぐ）。main から代入 */
  camera: THREE.PerspectiveCamera | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    const tex = makeSoftTex();
    this.fire = new ParticleSystem(scene, 320, tex, THREE.AdditiveBlending);
    this.smoke = new ParticleSystem(scene, 240, tex, THREE.NormalBlending);
    this.flash = new THREE.PointLight(0xffb14a, 0, 1600, 1.6);
    this.flash.visible = false;
    scene.add(this.flash);
  }

  /** 爆発を発生させる（power: 1=通常クラッシュ、1.4=高速直撃） */
  boom(x: number, y: number, z: number, power = 1): void {
    const R = Math.random;
    const nf = Math.round(52 * power), ns = Math.round(24 * power), nk = Math.round(26 * power);
    for (let i = 0; i < nf; i++) {
      const a = R() * Math.PI * 2, e = (R() * 0.9 + 0.15) * Math.PI * 0.5;
      const sp = (7 + R() * 19) * power;
      const hot = R() < 0.55;
      this.fire.add({
        x, y: y + 2, z,
        vx: Math.cos(a) * Math.cos(e) * sp, vy: Math.sin(e) * sp * 0.85, vz: Math.sin(a) * Math.cos(e) * sp,
        life: 0.32 + R() * 0.55, maxLife: 0.8,
        size0: 26 + R() * 46, size1: 6, grow: 10 * power, buoy: 2.2, grav: 0,
        r: hot ? 1 : 1, g: hot ? 0.52 + R() * 0.3 : 0.18 + R() * 0.12, b: hot ? 0.08 : 0.02
      });
    }
    for (let i = 0; i < ns; i++) {
      const a = R() * Math.PI * 2;
      const sp = (2.5 + R() * 7) * power;
      const g = 0.16 + R() * 0.2;
      this.smoke.add({
        x: x + Math.cos(a) * 4, y: y + 5 + R() * 8, z: z + Math.sin(a) * 4,
        vx: Math.cos(a) * sp, vy: 2.5 + R() * 4.5, vz: Math.sin(a) * sp,
        life: 2.2 + R() * 2.6, maxLife: 4.8,
        size0: 26 + R() * 44, size1: 66 + R() * 60, grow: 0, buoy: 1.1, grav: 0,
        r: g * 0.9, g, b: g * 0.95
      });
    }
    for (let i = 0; i < nk; i++) {
      const a = R() * Math.PI * 2;
      const sp = (24 + R() * 52) * power;
      this.fire.add({
        x, y: y + 2, z,
        vx: Math.cos(a) * sp, vy: 10 + R() * 26, vz: Math.sin(a) * sp,
        life: 0.5 + R() * 0.75, maxLife: 1.2,
        size0: 5 + R() * 7, size1: 2, grow: 0, buoy: 0, grav: 34,
        r: 1, g: 0.85 + R() * 0.15, b: 0.45 + R() * 0.4
      });
    }
    // 残煙：2.5 秒かけて数回サック
    this.embers.push({ x, y, z, t: this.time + 0.45, power });
    this.flash.position.set(x, y + 14, z);
    this.flash.intensity = 1500 * power;
    this.flash.visible = true;
  }

  /** 生存パーティクル数（テスト用） */
  get live(): number {
    return this.fire.live + this.smoke.live + this.embers.length;
  }

  update(dt: number): void {
    this.time += dt;
    // 残煙の再投入
    for (let i = this.embers.length - 1; i >= 0; i--) {
      const e = this.embers[i];
      if (this.time >= e.t) {
        const R = Math.random;
        for (let j = 0; j < 5; j++) {
          const a = R() * Math.PI * 2;
          const g = 0.14 + R() * 0.16;
          this.smoke.add({
            x: e.x + Math.cos(a) * 6, y: e.y + 2 + R() * 5, z: e.z + Math.sin(a) * 6,
            vx: Math.cos(a) * 1.6, vy: 5 + R() * 4, vz: Math.sin(a) * 1.6,
            life: 2.8 + R() * 2.6, maxLife: 5,
            size0: 30 + R() * 40, size1: 120 + R() * 80, grow: 0, buoy: 1.2, grav: 0,
            r: g * 0.85, g: g * 0.92, b: g
          });
        }
        e.t = this.time + 0.5;
        e.power *= 0.72;
        if (e.power < 0.28) this.embers.splice(i, 1);
      }
    }
    this.flash.intensity *= Math.exp(-9 * dt);
    if (this.flash.intensity < 2) this.flash.visible = false;
    this.fire.update(dt);
    const cam = this.camera;
    if (cam) {
      const cp = cam.position;
      this.smoke.update(dt, (p) => {
        const d = Math.hypot(p.x - cp.x, p.y - cp.y, p.z - cp.z);
        return d < 60 ? 0 : d < 220 ? (d - 60) / 160 : 1;
      });
    } else {
      this.smoke.update(dt);
    }
  }

  clear(): void {
    this.embers.length = 0;
  }

  dispose(): void {
    this.fire.dispose(this.scene);
    this.smoke.dispose(this.scene);
    this.scene.remove(this.flash);
  }
}
