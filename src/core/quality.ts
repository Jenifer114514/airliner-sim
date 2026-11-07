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
  // v18: 中央値（60 要素のコピー+ソート）を毎フレームやらず 0.25s に 1 回へ。
  // fps は自動画質の 3 秒ウィンドウ判定と HUD 表示にしか使われないため、
  // 4Hz の更新で十分（判定は中央値ベースなので位相ずれの影響もない）。
  private medAccum = 0;

  setLevel(level: QualityLevel): void {
    this.level = level;
    this.preset = QUALITY[level];
  }

  /** 各フレームの dt [s] を記録 */
  sample(dt: number): void {
    if (dt <= 0) return;
    this.fpsSamples.push(1 / dt);
    if (this.fpsSamples.length > 60) this.fpsSamples.shift();
    this.medAccum += dt;
    if (this.medAccum >= 0.25) {
      this.medAccum = 0;
      const sorted = [...this.fpsSamples].sort((a, b) => a - b);
      this.fps = sorted[Math.floor(sorted.length / 2)] ?? 60;
    }
  }

  /** 直近の中央値 FPS */
  getFps(): number {
    return this.fps;
  }
}
