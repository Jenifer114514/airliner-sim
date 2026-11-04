/**
 * core/quality.ts — 画質設定と FPS 監視
 * 描画品質（ピクセル比・影・配置数）をプリセットで管理し、
 * Phase 6 の自動調整に接続できるよう FPS サンプラーを持つ。
 */
import type { QualityLevel, QualityPreset } from '../config/constants.js';
import { QUALITY } from '../config/constants.js';

export class QualityManager {
  level: QualityLevel = 'high';
  preset: QualityPreset = QUALITY.high;

  private fpsSamples: number[] = [];
  private fps = 60;

  setLevel(level: QualityLevel): void {
    this.level = level;
    this.preset = QUALITY[level];
  }

  /** 各フレームの dt [s] を記録 */
  sample(dt: number): void {
    if (dt <= 0) return;
    this.fpsSamples.push(1 / dt);
    if (this.fpsSamples.length > 60) this.fpsSamples.shift();
    const sorted = [...this.fpsSamples].sort((a, b) => a - b);
    this.fps = sorted[Math.floor(sorted.length / 2)] ?? 60;
  }

  /** 直近の中央値 FPS */
  getFps(): number {
    return this.fps;
  }
}
