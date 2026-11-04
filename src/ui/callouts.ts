/**
 * ui/callouts.ts — JAL/JTA B737-700 SOP 標準コールアウト（マニュアル第4-5章）
 *
 * 【機能】テレメトリから SOP のコールアウト時点を判定し、画面バナー表示と
 *         speechSynthesis による英語コール（音声が無い環境ではバナーのみ）を行う。
 * 【音声】iOS Safari は初回ユーザー操作（飛行開始ボタン）後に speechSynthesis が
 *         動くため、main.ts はタップ後に speak() を呼ぶ。ミュート時は音声を出さない。
 * 【確認状態】コールアウト閾値はマニュアル実測値（80kt/V1/ROTATE/50ft/30ft/60kt 等）。
 *             speechSynthesis の実機 iPhone 再生は未確認（ヘッドレスでは動作確認のみ）。
 */
import { FLIGHT_TECHNIQUE, KT, takeoffSpeeds } from '../config/manual.js';
import type { InstrumentData } from './instruments.js';

export interface CalloutEvent {
  text: string;      // バナー表示（日本語混じり）
  speech: string | null; // 英語コール（null = 音声なし）
  kind: 'info' | 'warn';
}

/** 英語コールを読み上げる（環境に speechSynthesis が無ければ無音で継続） */
export function speak(text: string): void {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 1.05;
    synth.speak(u);
  } catch {
    /* 音声非対応環境では無視 */
  }
}

/**
 * SOP コールアウト状態機械。
 * 離陸（80 KNOTS → V1 → ROTATE → POSITIVE RATE）と
 * 着陸（1000ft → 500ft → 50ft → 30ft → 60kt）を一度ずつ発行する。
 */
export class SOPCallouts {
  private call80 = false;
  private callV1 = false;
  private callRotate = false;
  private callPosRate = false;
  private ldg1000 = false;
  private ldg500 = false;
  private ldg50 = false;
  private ldg30 = false;
  private call60 = false;
  private wasAirborne = false;
  private flapCautionAt = 0;

  constructor(private loadFrac: number) {}

  /** 機体変更時: 離陸 V 速度のロード率を更新（コール状態はリセット） */
  setLoadFrac(v: number): void {
    this.loadFrac = v;
    this.reset();
  }

  reset(): void {
    this.call80 = false;
    this.callV1 = false;
    this.callRotate = false;
    this.callPosRate = false;
    this.ldg1000 = false;
    this.ldg500 = false;
    this.ldg50 = false;
    this.ldg30 = false;
    this.call60 = false;
    this.wasAirborne = false;
    this.flapCautionAt = 0;
  }

  /** マニュアル第2章の離陸 V 速度（KIAS → m/s 変換済み） */
  private speeds(): { v1: number; vr: number; v2: number } {
    const s = takeoffSpeeds(this.loadFrac);
    return { v1: s.v1 * KT, vr: s.vr * KT, v2: s.v2 * KT };
  }

  update(t: InstrumentData): CalloutEvent[] {
    const out: CalloutEvent[] = [];
    const { v1, vr } = this.speeds();

    // ---- 離陸滑走（マニュアル 4.1） ----
    if (t.onGround) {
      if (!this.call80 && t.ias >= 80 * KT) {
        this.call80 = true;
        out.push({ text: '80 KNOTS', speech: 'Eighty knots', kind: 'info' });
      }
      if (!this.callV1 && t.ias >= v1) {
        this.callV1 = true;
        out.push({ text: 'V1', speech: 'V one', kind: 'info' });
      }
      if (!this.callRotate && t.ias >= vr) {
        this.callRotate = true;
        out.push({ text: 'ROTATE — 15° へ 2°/s', speech: 'Rotate', kind: 'info' });
      }
    }

    // ---- POSITIVE RATE（マニュアル 4.1: VSI と高度計の上昇確認後に GEAR UP） ----
    if (!t.onGround && !this.callPosRate && t.vspeed > 1.2 && this.wasAirborne === false) {
      // 離陸直後（離陸滑走からの初離陸）のみ
      this.callPosRate = true;
      out.push({ text: 'POSITIVE RATE — GEAR UP', speech: 'Positive rate. Gear up.', kind: 'info' });
    }

    // ---- 着陸高度コール（マニュアル 5.3: 1000ft/500ft/50ft/30ft） ----
    if (!t.onGround && t.vspeed < -0.5) {
      if (t.agl > 400) {
        // 新たな進入（ゴーアラウンド後含む）で再アーム
        this.ldg1000 = this.ldg500 = this.ldg50 = this.ldg30 = false;
      }
      if (!this.ldg1000 && t.agl <= 305) {
        this.ldg1000 = true;
        out.push({ text: '1000ft — STABILIZED', speech: 'One thousand', kind: 'info' });
      }
      if (!this.ldg500 && t.agl <= 152) {
        this.ldg500 = true;
        out.push({ text: '500ft', speech: 'Five hundred', kind: 'info' });
      }
      if (!this.ldg50 && t.agl <= FLIGHT_TECHNIQUE.flareFt * 0.3048) {
        this.ldg50 = true;
        out.push({
          text: `50 FT — フレア ${FLIGHT_TECHNIQUE.landingPitchMin}-${FLIGHT_TECHNIQUE.landingPitchMax}°`,
          speech: 'Fifty',
          kind: 'info',
        });
      }
      if (!this.ldg30 && t.agl <= FLIGHT_TECHNIQUE.idleFt * 0.3048) {
        this.ldg30 = true;
        out.push({ text: '30 FT — スロットル IDLE', speech: 'Thirty', kind: 'info' });
      }
    }

    // ---- 接地後 60 kt（マニュアル 5.4: リバース解除のコール） ----
    if (t.onGround && this.wasAirborne) {
      // 今回の接地で 60kt コールを一度だけ許可
      if (!this.call60 && t.ias <= FLIGHT_TECHNIQUE.reverseOffKts * KT) {
        this.call60 = true;
        out.push({ text: '60 KNOTS — リバース解除', speech: 'Sixty knots', kind: 'info' });
      }
      if (t.ias < 5) {
        // 完全停止 → 次の滑走のために離陸コールを再アーム
        this.call80 = this.callV1 = this.callRotate = this.callPosRate = false;
        this.call60 = false;
      }
    }
    if (t.onGround && t.ias < 5 && !this.wasAirborne) {
      this.call80 = this.callV1 = this.callRotate = this.callPosRate = false;
    }

    this.wasAirborne = !t.onGround;
    return out;
  }

  /**
   * フラップ速度注意（マニュアル 1.2: 実務推奨展開速度を超えたら注意表示）。
   * 表示は 5 秒に 1 回まで。
   */
  flapCaution(t: InstrumentData, nowMs: number): CalloutEvent | null {
    if (t.flapsDeg <= 0.5) return null;
    const table = [1, 2, 5, 10, 15, 25, 30, 40];
    const recKiasTable = [230, 220, 200, 190, 180, 170, 150, 140];
    let rec = recKiasTable[0];
    for (let i = 0; i < table.length; i++) {
      if (table[i] <= t.flapsDeg + 0.01) rec = recKiasTable[i];
    }
    if (t.ias <= rec * KT) return null;
    if (nowMs - this.flapCautionAt < 5000) return null;
    this.flapCautionAt = nowMs;
    return {
      text: `FLAP SPEED — ${rec}kt 以下で展開（マニュアル 1.2）`,
      speech: null,
      kind: 'warn',
    };
  }
}

/** 画面中央上部の SOP バナー。空のときは display:none。 */
export class SopBanner {
  private el: HTMLElement | null;
  private timer = 0;

  constructor() {
    this.el = document.getElementById('sop-banner');
  }

  show(e: CalloutEvent, ms = 3500): void {
    if (!this.el) return;
    this.el.textContent = e.text;
    this.el.classList.toggle('warn', e.kind === 'warn');
    this.el.classList.add('show');
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.el?.classList.remove('show');
    }, ms);
  }
}
