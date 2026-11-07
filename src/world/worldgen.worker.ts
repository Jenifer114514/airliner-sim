/**
 * worldgen.worker.ts — 世界生成 Web Worker（v16）
 * terrain bake のインストール → city/nature レイアウト計算 → テクスチャ描画を
 * ワーカーで行い、TypedArray と ImageBitmap を Transferable で本体へ返す。
 * テクスチャは OffscreenCanvas → transferToImageBitmap（画素コピー 0 回）。
 * 失敗時（OffscreenCanvas 非対応等）は {type:'error'} → 本体側が同期フォールバック。
 */
import { bakeInstall } from './field.js';
import { computeCity, computeNature, type WorldLayout } from './layout.js';
import { paintTex, type NewCanvas, type TexDef, type Canvas2 } from './texDraw.js';

interface Req {
  type: 'world';
  bake: ArrayBuffer | null;
  cityCount: number;
  treeCount: number;
  defs: TexDef[];
}

const newCanvas: NewCanvas = (w: number, h: number): Canvas2 => {
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d', { alpha: false }) as unknown as Canvas2['ctx'];
  return { canvas, ctx };
};

self.onmessage = (e: MessageEvent<Req>) => {
  const d = e.data;
  if (!d || d.type !== 'world') return;
  try {
    if (d.bake) bakeInstall(d.bake);
    const city = computeCity(d.cityCount);
    const nature = computeNature(city.roadside, d.treeCount);
    const layout: WorldLayout = { city, nature };
    const transfers: Transferable[] = [];
    const bitmaps: Array<{ id: string; bmp: ImageBitmap }> = [];
    for (const def of d.defs) {
      const c = paintTex(def, newCanvas);
      const bmp = (c.canvas as OffscreenCanvas).transferToImageBitmap();
      bitmaps.push({ id: def.id, bmp });
      transfers.push(bmp);
    }
    const grab = (a: { buffer: ArrayBufferLike } | undefined): void => {
      if (a) transfers.push(a.buffer as Transferable);
    };
    for (const b of layout.city.buckets) { grab(b.m); grab(b.c); }
    grab(layout.city.towers.m); grab(layout.city.towers.c);
    grab(layout.city.beacons); grab(layout.city.colliders);
    grab(layout.city.roads.pos); grab(layout.city.roads.idx); grab(layout.city.roadside);
    for (const b of layout.nature.buckets) { grab(b.m); grab(b.c); }
    (self as unknown as Worker).postMessage({ type: 'world', layout, bitmaps }, transfers);
  } catch (err) {
    (self as unknown as Worker).postMessage({ type: 'error', message: String(err) });
  }
};
