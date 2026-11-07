/**
 * sim/audio.ts — サウンド一式（Phase 4 警告音 / Phase 5 エンジン・風・機械音）
 *
 * 【方式】WebAudio のオシレータ/ノイズを手続き生成（外部アセット無し・ライセンス不要）。
 * 【前提】iOS Safari はユーザー操作（タップ）後に AudioContext を作る必要があるため、
 * ensure() を開始ボタン等の pointerdown ハンドラから呼ぶ。自動再生は行わない。
 * 【単位】ias [m/s], throttle 0..1。音量はゲイン（0..1）で表す。
 */

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;

  // 連続音
  private engineOsc: OscillatorNode[] = [];
  private engineGain: GainNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private windGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;

  // 警告音
  private warnOsc: OscillatorNode | null = null;
  private warnGain: GainNode | null = null;

  private noiseBuffer: AudioBuffer | null = null;
  muted = false;
  /** 初回 ensure 済みか（テスト・表示用） */
  ready = false;

  /** ユーザー操作起点で初期化（複数回呼んでも安全） */
  ensure(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.85;
    this.master.connect(ctx.destination);

    // ノイズバッファ（2 秒ループ）
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuffer = buf;

    this.buildEngine();
    this.buildWind();
    this.buildWarn();
    this.ready = true;
    if (ctx.state === 'suspended') void ctx.resume();
  }

  setMuted(m: boolean): void {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.85, this.ctx.currentTime, 0.02);
    }
  }

  // ---------------------------------------------------------------- 連続音
  private buildEngine(): void {
    const ctx = this.ctx!;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    filter.connect(gain);
    gain.connect(this.master!);

    // 基音 + オクターブ + デチューンでエンジンらしさ
    const freqs = [48, 96, 71];
    const types: OscillatorType[] = ['sawtooth', 'sawtooth', 'square'];
    for (let i = 0; i < freqs.length; i++) {
      const o = ctx.createOscillator();
      o.type = types[i];
      o.frequency.value = freqs[i];
      const og = ctx.createGain();
      og.gain.value = i === 2 ? 0.12 : 0.4;
      o.connect(og);
      og.connect(filter);
      o.start();
      this.engineOsc.push(o);
    }
    // 排気ノイズ（低域）
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    noise.loop = true;
    const nf = ctx.createBiquadFilter();
    nf.type = 'lowpass';
    nf.frequency.value = 220;
    const ng = ctx.createGain();
    ng.gain.value = 0.35;
    noise.connect(nf);
    nf.connect(ng);
    ng.connect(filter);
    noise.start();

    this.engineGain = gain;
    this.engineFilter = filter;
  }

  private buildWind(): void {
    const ctx = this.ctx!;
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    noise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 700;
    filter.Q.value = 0.7;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.master!);
    noise.start();
    this.windGain = gain;
    this.windFilter = filter;
  }

  private buildWarn(): void {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 750;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(this.master!);
    osc.start();
    this.warnOsc = osc;
    this.warnGain = gain;
  }

  // v18: 毎帧 setTargetAtTime（AudioParam 書き込み 5 本）は重い。16Hz に間引き、
  // かつ前回適用値から微小ならスキップ。setTargetAtTime の時間定数（0.15〜0.25s）
  // より間隔が短いため、音の変化は知覚できない。
  private lastEngineSet = -1;
  private lastEngineThr = -9;
  private lastEngineIas = -9;
  private lastWindSet = -1;
  private lastWindIas = -9;
  private lastWarnKind = '';

  /** エンジン音: throttle 0..1, ias m/s（推力風切りで高回転化する近似） */
  setEngine(throttle: number, ias: number): void {
    if (!this.ctx || !this.engineGain || !this.engineFilter) return;
    const now = performance.now();
    // v18.1: 前回書込み値から微小変化なら（経過時間に関係なく）一切書かない —
    // 定常巡航でも 60ms ごとに 5 本の setTargetAtTime が走っていたのをゼロ化。
    if (Math.abs(throttle - this.lastEngineThr) < 0.004 && Math.abs(ias - this.lastEngineIas) < 0.5) return;
    const big = Math.abs(throttle - this.lastEngineThr) > 0.05 || Math.abs(ias - this.lastEngineIas) > 12;
    if (!big && now - this.lastEngineSet < 60) return;
    this.lastEngineSet = now;
    this.lastEngineThr = throttle;
    this.lastEngineIas = ias;
    const t = this.ctx.currentTime;
    const rpm = 0.25 + 0.75 * throttle + Math.min(ias / 400, 0.15);
    this.engineGain.gain.setTargetAtTime(0.10 + 0.30 * throttle, t, 0.15);
    this.engineFilter.frequency.setTargetAtTime(240 + 900 * rpm, t, 0.2);
    this.engineOsc[0]?.frequency.setTargetAtTime(48 * (0.7 + 0.9 * rpm), t, 0.2);
    this.engineOsc[1]?.frequency.setTargetAtTime(96 * (0.7 + 0.9 * rpm), t, 0.2);
    this.engineOsc[2]?.frequency.setTargetAtTime(71 * (0.75 + 0.85 * rpm), t, 0.2);
  }

  /** 風切り音: 速度比例 */
  setWind(ias: number): void {
    if (!this.ctx || !this.windGain || !this.windFilter) return;
    const now = performance.now();
    if (Math.abs(ias - this.lastWindIas) < 0.4) return; // v18.1: 微小差は書込み自体しない
    const big = Math.abs(ias - this.lastWindIas) > 12;
    if (!big && now - this.lastWindSet < 60) return;
    this.lastWindSet = now;
    this.lastWindIas = ias;
    const t = this.ctx.currentTime;
    this.windGain.gain.setTargetAtTime(Math.min(0.32, (ias / 250) * 0.38), t, 0.25);
    this.windFilter.frequency.setTargetAtTime(500 + ias * 4, t, 0.25);
  }

  /**
   * 警告音の状態設定（優先順位: overspeed > stall > gear）
   * kind は 'none' | 'stall' | 'overspeed' | 'gear'
   */
  setWarning(kind: 'none' | 'stall' | 'overspeed' | 'gear'): void {
    if (!this.ctx || !this.warnOsc || !this.warnGain) return;
    if (kind === this.lastWarnKind) return; // 状態文字列が変わったフレームのみ適用
    this.lastWarnKind = kind;
    const t = this.ctx.currentTime;
    if (kind === 'none') {
      this.warnGain.gain.setTargetAtTime(0, t, 0.05);
      return;
    }
    if (kind === 'stall') {
      this.warnOsc.frequency.setTargetAtTime(750, t, 0.02);
      this.warnGain.gain.setTargetAtTime(0.16, t, 0.02);
    } else if (kind === 'overspeed') {
      this.warnOsc.frequency.setTargetAtTime(1100, t, 0.02);
      this.warnGain.gain.setTargetAtTime(0.12, t, 0.02);
    } else {
      this.warnOsc.frequency.setTargetAtTime(420, t, 0.02);
      this.warnGain.gain.setTargetAtTime(0.14, t, 0.02);
    }
  }

  // ---------------------------------------------------------------- ワンショット
  private burst(freq: number, dur: number, gainDb: number, type: BiquadFilterType = 'bandpass'): void {
    if (!this.ctx || !this.noiseBuffer || !this.master) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = 1.2;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(gainDb, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master);
    src.start(t);
    src.stop(t + dur + 0.05);
  }

  private tone(freq: number, dur: number, vol: number, type: OscillatorType = 'sine'): void {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  /** 操作クリック（ボタン・チップ） */
  click(): void {
    this.burst(1600, 0.05, 0.18);
  }
  /** フラップ駆動音 */
  flap(): void {
    this.burst(500, 0.28, 0.22, 'lowpass');
  }
  /** ギア駆動音 */
  gear(): void {
    this.burst(300, 0.55, 0.26, 'lowpass');
    this.tone(180, 0.5, 0.05, 'triangle');
  }
  /** 着地（接地）音 */
  touchdown(): void {
    this.burst(220, 0.35, 0.4, 'lowpass');
    this.tone(140, 0.25, 0.12, 'triangle');
    this.burst(1800, 0.18, 0.2);
  }
  /** 爆発音：低域ドン + 破裂ノイズ + 破片サラサラ */
  boom(): void {
    if (!this.ctx || !this.master || !this.noiseBuffer) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + 0.01;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.Q.value = 0.9;
    f.frequency.setValueAtTime(1400, t0);
    f.frequency.exponentialRampToValueAtTime(55, t0 + 0.9);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.95, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 1.5);
    src.connect(f);
    f.connect(g);
    g.connect(this.master);
    src.start(t0);
    src.stop(t0 + 1.6);
    this.tone(46, 0.9, 0.5, 'triangle');
    this.tone(72, 0.55, 0.3, 'sawtooth');
    // 破片（遅れてバラバラ）
    for (let i = 0; i < 5; i++) {
      window.setTimeout(() => this.burst(1400 + Math.random() * 1600, 0.1, 0.12), 260 + i * 90);
    }
  }
  /** UI 決定音 */
  confirm(): void {
    this.tone(660, 0.12, 0.12);
    this.tone(880, 0.18, 0.1);
  }

  /** 一時停止・非表示時は連続音を止める */
  suspendAll(): void {
    this.setEngine(0, 0);
    this.setWind(0);
    this.setWarning('none');
    if (this.engineGain && this.ctx) this.engineGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
    if (this.windGain && this.ctx) this.windGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
  }
}
