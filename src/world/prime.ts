/**
 * world/prime.ts — 起動時プリメイン（Web Worker で世界生成、v16）
 * main.ts が loadTerrainBake の後に primeWorld() を await → city/nature/空港は
 * getCityLayout()/getNatureLayout()/primeTex() で結果を受け取る（未取得時は
 * 同一コードをメインスレッドで同期実行 = 従来動作。出力は worker 版とビット一致）。
 */
import * as THREE from 'three';
import WorldWorker from './worldgen.worker?worker';
import { AIRPORTS } from '../config/airports.js';
import { QUALITY } from '../config/constants.js';
import { bakeBufferCopy } from './field.js';
import { computeCity, computeNature, type CityLayout, type NatureLayout } from './layout.js';
import { makeTexDefs, paintTex, rwId, type NewCanvas, type TexDef, type Canvas2 } from './texDraw.js';

export interface PrimeResult { ok: boolean; viaWorker: boolean; ms: number }

interface PrimedWorld {
  cityCount: number; treeCount: number;
  city: CityLayout; nature: NatureLayout | null;
}

const gTex = new Map<string, THREE.CanvasTexture>();
const gDef = new Map<string, TexDef>();
let gWorld: PrimedWorld | null = null;
let gPromise: Promise<PrimeResult> | null = null;
let gWorkerBroken = false;

/** メインスレッド同期描画用 canvas（フォールバック経路。旧 textures.ts と同一手段） */
const domCanvas: NewCanvas = (w: number, h: number): Canvas2 => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { alpha: false })!;
  const patched = ctx as CanvasRenderingContext2D & { roundRect?: unknown };
  if (typeof patched.roundRect !== 'function') {
    (patched as unknown as Record<string, unknown>).roundRect = function (this: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      this.beginPath();
      this.moveTo(x + r, y);
      this.arcTo(x + w, y, x + w, y + h, r);
      this.arcTo(x + w, y + h, x, y + h, r);
      this.arcTo(x, y + h, x, y, r);
      this.arcTo(x, y, x + w, y, r);
      this.closePath();
    };
  }
  return { canvas, ctx: ctx as Canvas2['ctx'] };
};

function toTex(def: TexDef, src: HTMLCanvasElement | ImageBitmap): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(src);
  t.colorSpace = def.srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = def.aniso;
  if (def.repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(def.repeat[0], def.repeat[1]);
  } else {
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  }
  t.needsUpdate = true;
  return t;
}

function ensureTex(def: TexDef): THREE.CanvasTexture {
  let t = gTex.get(def.id);
  if (!t) {
    const c = paintTex(def, domCanvas);
    t = toTex(def, c.canvas as HTMLCanvasElement);
    gTex.set(def.id, t);
  }
  return t;
}

function syncWorld(cityCount: number, treeCount: number): PrimedWorld {
  const city = computeCity(cityCount);
  return { cityCount, treeCount, city, nature: computeNature(city.roadside, treeCount) };
}

/** 起動プリメイン。二重呼び出しは同一 Promise を返す */
export function primeWorld(): Promise<PrimeResult> {
  if (gPromise) return gPromise;
  gPromise = (async (): Promise<PrimeResult> => {
    const t0 = performance.now();
    const p = QUALITY.high; // Game 構築時品質（QualityManager 既定）と一致させる
    const defs = makeTexDefs(AIRPORTS.map((ap) => ({ nums: ap.runwayNumbers })), p.runwayTexPx);
    for (const d of defs) gDef.set(d.id, d);
    if (!gWorkerBroken && typeof Worker !== 'undefined') {
      try {
        const res = await runWorker(p.cityCount, p.treeCount, defs);
        gWorld = res.world;
        for (const b of res.bitmaps) gTex.set(b.id, toTex(gDef.get(b.id)!, b.bmp));
        const ms = performance.now() - t0;
        console.info(`[prime] worldgen worker OK in ${ms.toFixed(0)}ms (${res.bitmaps.length} tex atlas)`);
        return { ok: true, viaWorker: true, ms };
      } catch (err) {
        gWorkerBroken = true;
        console.warn('[prime] worker フォールバック:', err);
      }
    }
    gWorld = syncWorld(p.cityCount, p.treeCount);
    const ms = performance.now() - t0;
    console.info(`[prime] sync fallback in ${ms.toFixed(0)}ms`);
    return { ok: true, viaWorker: false, ms };
  })();
  return gPromise;
}

function runWorker(
  cityCount: number, treeCount: number, defs: TexDef[]
): Promise<{ world: PrimedWorld; bitmaps: Array<{ id: string; bmp: ImageBitmap }> }> {
  return new Promise((resolve, reject) => {
    let w: Worker;
    try {
      w = new WorldWorker();
    } catch (err) {
      reject(err);
      return;
    }
    const timer = window.setTimeout(() => {
      w.terminate();
      reject(new Error('worldgen worker timeout'));
    }, 5000);
    w.onerror = () => { window.clearTimeout(timer); w.terminate(); reject(new Error('worldgen worker error')); };
    w.onmessage = (e: MessageEvent) => {
      window.clearTimeout(timer);
      const d = e.data as {
        type: string; message?: string;
        layout?: { city: CityLayout; nature: NatureLayout };
        bitmaps?: Array<{ id: string; bmp: ImageBitmap }>;
      };
      if (d.type !== 'world' || !d.layout || !d.bitmaps) {
        w.terminate();
        reject(new Error(d.message ?? 'worldgen worker failed'));
        return;
      }
      w.terminate();
      resolve({ world: { cityCount, treeCount, city: d.layout.city, nature: d.layout.nature }, bitmaps: d.bitmaps });
    };
    const bake = bakeBufferCopy();
    w.postMessage({ type: 'world', bake, cityCount, treeCount, defs }, bake ? [bake] : []);
  });
}

// ───────── 参照 API ─────────
/** プリメイン済み市街レイアウト。count 不一致（実験的品質変更時）は同期計算 */
export function getCityLayout(cityCount: number): CityLayout {
  if (gWorld && gWorld.cityCount === cityCount) return gWorld.city;
  const city = computeCity(cityCount);
  // 別 count へ差し替える場合、旧 count で植えた nature は失効（treeCount 一致でも返さない）
  if (gWorld) gWorld = { cityCount, treeCount: gWorld.treeCount, city, nature: null };
  else gWorld = { cityCount, treeCount: QUALITY.high.treeCount, city, nature: null };
  return city;
}
export function getNatureLayout(treeCount: number): NatureLayout {
  if (gWorld && gWorld.treeCount === treeCount && gWorld.nature) return gWorld.nature;
  const city = gWorld ? gWorld.city : computeCity(QUALITY.high.cityCount);
  const nature = computeNature(city.roadside, treeCount);
  if (gWorld && gWorld.city === city) gWorld.nature = nature;
  return nature;
}
/** ワーカー生成テクスチャ（未取得なら同一コードの同期描画）。未知 id は undefined */
export function primeTex(id: string): THREE.CanvasTexture | undefined {
  const hit = gTex.get(id);
  if (hit) return hit;
  const def = gDef.get(id);
  return def ? ensureTex(def) : undefined;
}
/** 空港別滑走路テクスチャ（quality の runwayTexPx を跨いでも決定論的に 1 生成 1 キャッシュ） */
export function primeRunwayTex(numA: string, numB: string, resPx: number): THREE.CanvasTexture {
  const id = rwId(numA, numB, resPx);
  let t = gTex.get(id);
  if (!t) {
    const def: TexDef = { id, kind: 'runway', w: resPx, h: resPx * 8, srgb: true, aniso: 16, repeat: null, nums: [numA, numB] };
    gDef.set(id, def);
    t = ensureTex(def);
  }
  return t;
}
