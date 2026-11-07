/**
 * sim/flight-controls.ts — 操縦入力状態（タッチ UI / キーボード共通の正規化値）
 *
 * 【座標系】+1 = ピッチ上げ / ロール右 / ヨー右。スロットル 0..1。
 * 【仮想スティック】指を追従し、離すと中立へ復帰（機体の姿勢変化とは独立）。
 */
export interface NormalizedControls {
  pitch: number;
  roll: number;
  yaw: number;
  throttle: number;
  brakes: boolean;
  flapsDeg: number;
  spoilers: number;
  gearDown: boolean;
}

/** B737-700 実機フラップ位置（UP/1/5/10/15/25/30/40）。マニュアル 1.2 表に対応 */
const FLAP_DETENTS = [0, 1, 5, 10, 15, 25, 30, 40];

export class FlightControls {
  pitch = 0;
  roll = 0;
  yaw = 0;          // ボタン押下中: -1..1
  throttle = 0.9;
  brakes = false;
  spoilers = 0;
  gearDown = true;
  flapIndex = 2;    // FLAP_DETENTS の index（初期 = 5° 離陸設定）

  private keys = new Set<string>();
  private keyHandler = (e: KeyboardEvent) => this.onKey(e, true);
  private keyUpHandler = (e: KeyboardEvent) => this.onKey(e, false);
  // v17: ウィンドウがフォーカスを失ったらキー状態をクリア（Alt+Tab などで
  // 「押したまま離さない」入力が残留する事故を防ぐ）
  private blurHandler = () => {
    this.keys.clear();
    this.releaseStick(); // 押下中の pitch/roll ラッチも解除（復帰後の暴走防止）
  };

  attachKeyboard(): void {
    window.addEventListener('keydown', this.keyHandler);
    window.addEventListener('keyup', this.keyUpHandler);
    window.addEventListener('blur', this.blurHandler);
  }
  detach(): void {
    window.removeEventListener('keydown', this.keyHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
    window.removeEventListener('blur', this.blurHandler);
    this.keys.clear();
  }

  private onKey(e: KeyboardEvent, down: boolean): void {
    const k = e.key.toLowerCase();
    if (down) {
      this.keys.add(k);
      // 切り替え系 — v17: OS のキーリピート（長押し）では発火させない。
      // 従来は押しっぱなしで G（ギア）・F/V（フラップ）・X（ spoilers ）が
      // 数十 ms 間隔で高速トグルしていた。
      if (!e.repeat) {
        if (k === 'g') this.gearDown = !this.gearDown;
        if (k === 'v') this.flapUp();
        if (k === 'f') this.flapDown();
        if (k === 'x') this.spoilers = this.spoilers > 0 ? 0 : 1;
      }
    } else {
      this.keys.delete(k);
    }
  }

  flapUp(): void {
    this.flapIndex = Math.max(0, this.flapIndex - 1);
  }
  flapDown(): void {
    this.flapIndex = Math.min(FLAP_DETENTS.length - 1, this.flapIndex + 1);
  }
  get flapsDeg(): number {
    return FLAP_DETENTS[this.flapIndex];
  }
  setFlapIndex(i: number): void {
    this.flapIndex = Math.max(0, Math.min(FLAP_DETENTS.length - 1, i));
  }

  /** 毎フレーム: キー入力をスティック値に反映（タッチ入力は main から直接設定される） */
  updateFromKeys(dt: number): void {
    const kPitchUp = this.keys.has('arrowup') || this.keys.has('w');
    const kPitchDn = this.keys.has('arrowdown') || this.keys.has('s');
    const kRollL = this.keys.has('arrowleft') || this.keys.has('a');
    const kRollR = this.keys.has('arrowright') || this.keys.has('d');
    const kYawL = this.keys.has('q');
    const kYawR = this.keys.has('e');
    const kBrake = this.keys.has('b') || this.keys.has(' ');
    const kThrUp = this.keys.has('shift');
    const kThrDn = this.keys.has('control');

    if (kPitchUp || kPitchDn || kRollL || kRollR) {
      // キーはタッチスティックの値を上書き
      this.pitch = (kPitchUp ? 1 : 0) - (kPitchDn ? 1 : 0);
      this.roll = (kRollR ? 1 : 0) - (kRollL ? 1 : 0);
    }
    this.yaw = (kYawR ? 1 : 0) - (kYawL ? 1 : 0);
    this.brakes = kBrake;
    if (kThrUp) this.throttle = Math.min(1, this.throttle + dt * 0.55);
    if (kThrDn) this.throttle = Math.max(0, this.throttle - dt * 0.55);
  }

  /** 物理エンジン用の入力に変換 */
  normalized(): NormalizedControls {
    return {
      pitch: clamp1(this.pitch),
      roll: clamp1(this.roll),
      yaw: clamp1(this.yaw),
      throttle: Math.max(0, Math.min(1, this.throttle)),
      brakes: this.brakes,
      flapsDeg: this.flapsDeg,
      spoilers: this.spoilers,
      gearDown: this.gearDown
    };
  }

  /** スティックの中立復帰（指離し時） */
  releaseStick(): void {
    this.pitch = 0;
    this.roll = 0;
  }
}

function clamp1(v: number): number {
  return Math.max(-1, Math.min(1, v));
}
