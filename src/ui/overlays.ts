/** ui/overlays.ts — 縦画面誘導 / WebGL エラー / 一時停止 */
export class Overlays {
  private els = {
    pause: document.getElementById('pause-overlay') as HTMLElement,
    portrait: document.getElementById('portrait-overlay') as HTMLElement,
    webgl: document.getElementById('webgl-error') as HTMLElement,
    webglDetail: document.getElementById('webgl-error-detail') as HTMLElement
  };
  private actions: Record<string, () => void> = {};

  constructor() {
    const bind = (id: string, key: string) => {
      (document.getElementById(id) as HTMLElement).addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.actions[key]?.();
      });
    };
    bind('btn-resume', 'resume');
    bind('btn-restart', 'restart');
    bind('btn-to-menu', 'toMenu');
  }

  on(key: string, fn: () => void): void {
    this.actions[key] = fn;
  }

  showPause(): void { this.els.pause.classList.remove('hidden'); }
  hidePause(): void { this.els.pause.classList.add('hidden'); }

  updateOrientation(): boolean {
    const portrait = window.innerHeight > window.innerWidth;
    this.els.portrait.classList.toggle('hidden', !portrait);
    return !portrait;
  }

  showWebglError(detail: string): void {
    this.els.webglDetail.innerHTML = detail;
    this.els.webgl.classList.remove('hidden');
  }
  /** v17: webglcontextrestored 時の復帰用（エラーオーバーレイを閉じて続行） */
  hideWebglError(): void {
    this.els.webgl.classList.add('hidden');
  }
}
