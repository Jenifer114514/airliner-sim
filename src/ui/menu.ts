/**
 * ui/menu.ts — メニュー（機体カード・空港・画質・開始ボタン）
 * 背景の 3D プレビューは game.ts が描画する。
 */
import { AIRCRAFT, type AirlinerSpec } from '../config/aircraft.js';
import { AIRPORTS } from '../config/airports.js';
import type { QualityLevel } from '../config/constants.js';
import { TIMES, WEATHERS, WINDS, type TimeOfDayId, type WeatherId, type WindId } from '../config/environment.js';

export interface MenuConfig {
  aircraftId: string;
  airportId: string;
  quality: QualityLevel;
  mode: 'free' | 'demo';
  time: TimeOfDayId;
  weather: WeatherId;
  wind: WindId;
  /** 2026-11-06: 全画面設定（ホーム画面で選択。飛行開始ジェスチャで適用） */
  fullscreen: boolean;
}

export class Menu {
  config: MenuConfig = {
    aircraftId: AIRCRAFT[0].id, airportId: AIRPORTS[0].id, quality: 'high', mode: 'free',
    time: 'day', weather: 'clear', wind: 'calm', fullscreen: false
  };
  private els = {
    root: document.getElementById('menu-overlay') as HTMLElement,
    cards: document.getElementById('aircraft-cards') as HTMLElement,
    airports: document.getElementById('airport-chips') as HTMLElement,
    quality: document.getElementById('quality-chips') as HTMLElement,
    modes: document.getElementById('mode-chips') as HTMLElement,
    display: document.getElementById('display-chips') as HTMLElement,
    times: document.getElementById('time-chips') as HTMLElement,
    weathers: document.getElementById('weather-chips') as HTMLElement,
    winds: document.getElementById('wind-chips') as HTMLElement
  };

  constructor(onStart: () => void) {
    this.buildAircraftCards();
    this.buildChips(
      this.els.airports,
      AIRPORTS.map((a) => ({ id: a.id, label: `${a.code} ${a.name}`, sub: a.description })),
      this.config.airportId,
      (id) => { this.config.airportId = id; }
    );
    this.buildChips(
      this.els.modes,
      [
        { id: 'free', label: '自由飛行', sub: '自分で操縦（滑走路開始）' },
        { id: 'demo', label: 'デモ飛行', sub: '自動操縦の観察' }
      ],
      this.config.mode,
      (id) => { this.config.mode = id as 'free' | 'demo'; }
    );
    this.buildChips(
      this.els.quality,
      [
        { id: 'ultra', label: '画質: 最高', sub: 'Retina3.0×・影4k' },
        { id: 'high', label: '画質: 高', sub: '影・高解像度' },
        { id: 'medium', label: '画質: 中', sub: 'バランス' },
        { id: 'low', label: '画質: 低', sub: '軽量' }
      ],
      this.config.quality,
      (id) => { this.config.quality = id as QualityLevel; }
    );
    this.buildChips(
      this.els.times,
      TIMES.map((t) => ({ id: t.id, label: `時刻: ${t.label}`, sub: t.sub })),
      this.config.time,
      (id) => { this.config.time = id as TimeOfDayId; }
    );
    this.buildChips(
      this.els.weathers,
      WEATHERS.map((w) => ({ id: w.id, label: `天候: ${w.label}`, sub: w.sub })),
      this.config.weather,
      (id) => { this.config.weather = id as WeatherId; }
    );
    this.buildChips(
      this.els.winds,
      WINDS.map((w) => ({ id: w.id, label: `風: ${w.label}`, sub: w.sub })),
      this.config.wind,
      (id) => { this.config.wind = id as WindId; }
    );
    // 2026-11-06: 表示（全画面）— ホーム画面でトグル。タップ即時適用＋飛行開始時にも反映
    this.buildChips(
      this.els.display,
      [
        { id: 'fs', label: '表示: 全画面', sub: '画面いっぱいに拡大' },
        { id: 'win', label: '表示: ウィンドウ', sub: 'ブラウザ枠のまま' }
      ],
      this.config.fullscreen ? 'fs' : 'win',
      (id) => {
        const want = id === 'fs';
        this.config.fullscreen = want;
        this.onDisplaySelect?.(want);
      }
    );
    for (const c of this.els.display.children) (c as HTMLElement).dataset.fs = (c as HTMLElement).classList.contains('chip') && (c === this.els.display.children[0]) ? '1' : '0';
    (document.getElementById('btn-start') as HTMLElement).addEventListener('pointerdown', (e) => {
      e.preventDefault();
      onStart();
    });
  }

  private buildAircraftCards(): void {
    this.els.cards.innerHTML = '';
    for (const a of AIRCRAFT) {
      const el = document.createElement('div');
      el.className = 'card' + (a.id === this.config.aircraftId ? ' selected' : '');
      el.innerHTML = `<h3>${a.name}</h3><p>${a.description}</p>`;
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.config.aircraftId = a.id;
        for (const c of this.els.cards.children) c.classList.remove('selected');
        el.classList.add('selected');
        this.onAircraftChange?.(a);
      });
      this.els.cards.appendChild(el);
    }
  }

  private buildChips(
    row: HTMLElement,
    items: Array<{ id: string; label: string; sub: string }>,
    selected: string,
    onSelect: (id: string) => void
  ): void {
    row.innerHTML = '';
    for (const item of items) {
      const el = document.createElement('div');
      el.className = 'chip' + (item.id === selected ? ' selected' : '');
      el.innerHTML = `${item.label}<br><small>${item.sub}</small>`;
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        onSelect(item.id);
        for (const c of row.children) c.classList.remove('selected');
        el.classList.add('selected');
      });
      row.appendChild(el);
    }
  }

  /** 機体カード変更時コールバック（3D プレビュー差し替え用） */
  onAircraftChange: ((spec: AirlinerSpec) => void) | null = null;
  /** 表示（全画面/ウィンドウ）切替コールバック（main が Fullscreen API を適用） */
  onDisplaySelect: ((fullscreen: boolean) => void) | null = null;

  /** 2026-11-06: 実機フルスクリーン状態をチップへ逆同期（Esc 解除・イベント追従用） */
  syncDisplay(): void {
    const fs = this.config.fullscreen;
    for (const c of this.els.display.children) c.classList.toggle('selected', (c as HTMLElement).dataset.fs === '1' && fs || (c as HTMLElement).dataset.fs !== '1' && !fs);
  }

  /** 外部（fullscreenchange）からの現在値設定 */
  setDisplay(fullscreen: boolean): void {
    this.config.fullscreen = fullscreen;
    this.syncDisplay();
  }

  show(): void { this.els.root.classList.remove('hidden'); this.syncDisplay(); }
  hide(): void { this.els.root.classList.add('hidden'); }
}
