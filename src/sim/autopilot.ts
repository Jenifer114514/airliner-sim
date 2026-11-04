/**
 * オートパイロット（純ロジック。three / DOM 非依存。単位は SI、方位のみ deg）。
 *
 * チャネル:
 *  - 横方向 (LAT): HDG（選定方位ホールド）/ NAV（滑走路延長線＝LOC 等価。捕捉でトラッキング）
 *  - 鉛直   (VRT): ALT（気圧高度ホールド＋プロポーショナル・レベルオフ）/ V/S / APPR（3.00° 降下経路＝GS 等価）
 *  - A/T: 選定 IAS ホールド（比例＋スルーレート制限 0.28/s、下限 0.02）
 *
 * 出力規約は NormalizedControls と同一: pitch + = 機首上げ（ヨーク手前引き）、roll + = 右バンク。
 * game.ts が自由飛行の物理ステップに合成する（描画・入力は干渉しない。テストは esbuild 経由）。
 *
 * 方位規約（nav.ts / physics と一致）: compass = atan2(dx, −dz)、北 = −Z、+X = 東。
 * 進行方向 = (sin c, −cos c)。
 *
 * 実機との意図的簡略化:
 *  - ローカライザ/GP は空港幾何からの等価計算（DDM・ノイズ・ドット极限なし）
 *  - 自動キャプチャ予測（capture zone）なし。捕捉は |xtk|<260m & 近接のゲートのみ
 *  - GO-AROUND 自動ロジックなし（手動スロットル全開で ALT が追従）。接地時自動_disconnect
 *  - 風補償・エネルギーモード（speed vs flight path angle）なし
 */
import type { AirportSpec } from '../config/airports.js';

export type ApLatMode = 'HDG' | 'NAV';
export type ApVerMode = 'ALT' | 'VS' | 'APPR';

export interface ApInput {
  /** 指示対気速度 [m/s] */ ias: number;
  /** 俯角 [deg +機首上げ] */ pitch: number;
  /** 気圧高度 [m] */ alt: number;
  /** 地上高 [m] */ agl: number;
  /** 方位 [deg 0..360] */ heading: number;
  /** バンク [deg +右] */ bank: number;
  /** 上昇率 [m/s] */ vs: number;
  /** ワールド位置 [m] */ x: number;
  z: number;
  /** 水平速度 [m/s]（横減衰用） */ vx: number;
  vz: number;
  onGround: boolean;
  /** 機首上げ角速度 [deg/s]（+ = 上げ） */ q: number;
  /** ロール角速度 [deg/s]（+ = 右バンク） */ p: number;
}

export interface ApCommand {
  /** -1..1（+=機首上げ） */ pitch: number;
  /** -1..1（+=右バンク） */ roll: number;
  /** 0..1 */ throttle: number;
}

export interface ApStatus {
  engaged: boolean;
  lat: ApLatMode;
  ver: ApVerMode;
  spdKt: number;
  hdgDeg: number;
  altM: number;
  vsFpm: number;
  /** LOC（延長線）捕捉済み */ loc: boolean;
  /** GS 捕捉済み */ gs: boolean;
  /** 滑走路延長線のオフセット [m]（+=右） */ xtk: number;
  /** GS 偏差 [m]（+=上） */ gsDev: number;
  /** 進入端までの沿線距離 [m] */ dist: number;
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}
/** (-180, 180] に巻取り */
function wrapDeg(a: number): number {
  let x = a % 360;
  if (x > 180) x -= 360;
  if (x <= -180) x += 360;
  return x;
}

const KTS = 1.94404; // m/s → kt
const GS_SLOPE = Math.tan((3.0 * Math.PI) / 180);
/** APPR 以外のチャネルが低高度降下へ入らないための割込 [m AGL] */
export const AP_MIN_AGL = 150;

/** 空港幾何に対する進入情報（AP 軽量版。nav.ts と同じ規約） */
export interface ApApproach {
  /** 進入端（機首方向で最も前方の敷居） */
  thrX: number;
  thrZ: number;
  /** 進入方位 [deg compass]（滑走路の向いている側の番号方位） */
  rwyHdg: number;
  /** 延長線オフセット [m] +=右 */
  xtk: number;
  /** 敷居までの沿線距離 [m]（通過後は負） */
  along: number;
  /** 進入方向の右軸 [x,z]（横速度の射影用） */
  rightX: number;
  rightZ: number;
}

export function approachInfo(ap: AirportSpec, x: number, z: number, hdgDeg: number): ApApproach {
  const ax = Math.sin(ap.heading), az = Math.cos(ap.heading);
  const half = ap.length / 2;
  const e1x = ap.center.x + ax * half, e1z = ap.center.z + az * half;
  const e2x = ap.center.x - ax * half, e2z = ap.center.z - az * half;
  const h = (hdgDeg * Math.PI) / 180;
  const fx = Math.sin(h), fz = -Math.cos(h); // 進行方向
  const d1 = (e1x - x) * fx + (e1z - z) * fz;
  const d2 = (e2x - x) * fx + (e2z - z) * fz;
  // 機首前方（または後方ならより近い）の端 = 進入端
  const t1 = d1 >= d2;
  const thrX = t1 ? e1x : e2x, thrZ = t1 ? e1z : e2z;
  const opX = t1 ? e2x : e1x, opZ = t1 ? e2z : e1z;
  let ux = thrX - opX, uz = thrZ - opZ;
  const ul = Math.hypot(ux, uz) || 1;
  ux /= ul; uz /= ul; // 進入方向（反対端→敷居）
  const rwyHdg = (((Math.atan2(ux, -uz) * 180) / Math.PI) % 360 + 360) % 360;
  const qx = x - thrX, qz = z - thrZ;
  const rightX = -uz, rightZ = ux;
  const xtk = qx * rightX + qz * rightZ; // 右 = (−uz, ux)
  const along = -(qx * ux + qz * uz);
  return { thrX, thrZ, rwyHdg, xtk, along, rightX, rightZ };
}

export class Autopilot {
  engaged = false;
  latMode: ApLatMode = 'HDG';
  verMode: ApVerMode = 'ALT';
  /** 選定値（内部 SI） */
  spd = 62; // ≈120 kt
  hdg = 0;
  altTarget = 0;
  vs = 0; // V/S [m/s]
  /** A/T 積分状態 */
  private throttle = 0.6;
  /** イベント（main が drain → 音声/バナー）。'ap-on' 等のトークン */
  private events: string[] = [];
  locAlive = false;
  gsAlive = false;
  /** デバッグ用内部状態スナップショット（test/コンソール検査のみ。既定 off） */
  debugOn = false;
  debug: Record<string, number> = {};
  /** カスケード外ループの姿勢トリム積分状態 */
  private itP = 0;
  private itR = 0;
  /** 方位追従の積分項 [deg 相当] */
  private hInt = 0;
  /** V/S・GS レートループの積分項 [deg] */
  private vsInt = 0;
  /** V/S 仮想高度標的（レート誤差の位置積分。定常外れを構造的に消す） */
  private vsAltV = 0;
  private vsAltRef: number | null = null;
  private wasAirborne = true;
  private last: ApStatus = {
    engaged: false, lat: 'HDG', ver: 'ALT', spdKt: 120, hdgDeg: 0, altM: 0, vsFpm: 0,
    loc: false, gs: false, xtk: 0, gsDev: 0, dist: 0
  };

  reset(): void {
    this.engaged = false;
    this.vsInt = 0;
    this.hInt = 0;
    this.latMode = 'HDG';
    this.verMode = 'ALT';
    this.locAlive = false;
    this.gsAlive = false;
    this.wasAirborne = true;
    this.events.length = 0;
  }

  drainEvents(): string[] {
    if (this.events.length === 0) return this.events;
    const out = this.events.slice();
    this.events.length = 0;
    return out;
  }
  private emit(e: string): void {
    if (this.events.length < 8) this.events.push(e);
  }

  /** マスタスイッチ。engage は現在値キャプチャ（実機と同じ）。 */
  toggle(inp: ApInput): void {
    if (this.engaged) {
      this.engaged = false;
      this.emit('ap-off');
      return;
    }
    this.engaged = true;
    this.spd = clamp(inp.ias, 41, 143);
    this.hdg = Math.round(inp.heading);
    this.altTarget = inp.onGround ? inp.alt : Math.round(inp.alt);
    this.vs = 0;
    this.verMode = 'ALT';
    if (!this.locAlive) this.latMode = 'HDG';
    this.itP = 0.05;   // 巡航天位（b737 系 e≒0.05 付近）から積分開始
    this.itR = 0;
    this.hInt = 0;
    this.vsInt = 0;
    this.vsAltV = 0;
    this.vsAltRef = null;
    this.emit('ap-on');
  }

  status(): ApStatus {
    return this.last;
  }

  // ---- セレクタ（HUD パネルから。非接続時でも選定値は変わる） ----
  nudgeSpd(kt: number): void {
    this.spd = clamp(this.spd * KTS + kt, 80, 280) / KTS;
  }
  nudgeHdg(deg: number): void {
    this.hdg = (((this.hdg + deg) % 360) + 360) % 360;
    this.latMode = 'HDG'; // 実機の HDGSEL 割り込み相当
    this.hInt = 0;
  }
  setLat(m: ApLatMode): void {
    this.latMode = m;
    this.hInt = 0;
    if (m === 'NAV') this.emit('nav-arm');
  }
  nudgeAlt(m: number): void {
    this.altTarget = Math.max(this.altTarget + m, 60);
    if (this.verMode === 'APPR') {
      // 実機: ALT セレクタ操作で GS 脱離 → ALT ホールドへ
      this.verMode = 'ALT';
      this.emit('gs-off');
    }
  }
  nudgeVs(fpm: number): void {
    this.vs = clamp(this.vs + fpm / 196.85, -10, 10);
    this.verMode = 'VS';
    this.vsInt = 0;
    this.vsAltV = 0;
    this.vsAltRef = null;   // 次段で現高度基準に再設定
  }
  holdAltReset(): void {
    this.verMode = 'ALT';
    this.vsInt = 0;
  }
  holdAlt(): void {
    this.verMode = 'ALT';
    this.vsInt = 0;
  }
  /** LOC+GS アライメント（捕捉前は armed 的な振る舞い: 近づくまで HDG/ALT 維持） */
  alignApproach(): void {
    this.latMode = 'NAV';
    this.verMode = 'APPR';
    this.hInt = 0;
    this.vsInt = 0;
    this.emit('appr-arm');
  }

  /**
   * 1 フレーム分の AP 制御。null = 非接続（入力をそのまま通す）。
   * 物理サブステップ（1/120s）とは独立で、フレーム dt で 1 回呼ぶ。
   */
  step(dt: number, inp: ApInput, airport: AirportSpec | null): ApCommand | null {
    if (!this.engaged) return null;
    // 接地検知 → 自動切断（タッチダウン後）
    if (this.wasAirborne && inp.onGround) {
      this.engaged = false;
      this.emit('ap-touchdown');
      this.wasAirborne = false;
      return null;
    }
    this.wasAirborne = !inp.onGround;
    if (inp.onGround) {
      // 地上滑走: ピッチ/ロール不干渉、A/T 選定のみ維持
      return { pitch: 0, roll: 0, throttle: clamp(this.throttle, 0.02, 1) };
    }
    const dts = clamp(dt, 1 / 240, 1 / 15);
    if (this.vsAltRef === null) {
      this.vsAltRef = inp.alt;
      this.vsAltV = 0;
    }

    // ===== 横方向（目標トラック角 → バンク。方位/EXT が同じ外ループ） =====
    let xtk = 0;
    let along = 0;
    let rwyHdg = this.hdg;
    let ydot = 0;
    let trkErr: number;
    if (this.latMode === 'NAV' && airport) {
      const g = approachInfo(airport, inp.x, inp.z, inp.heading);
      ydot = inp.vx * g.rightX + inp.vz * g.rightZ;
      xtk = g.xtk;
      along = g.along;
      rwyHdg = g.rwyHdg;
      const near = along > -800 && along < 14000;
      const onPath = Math.abs(wrapDeg(g.rwyHdg - inp.heading)) < 16;
      const wasLoc = this.locAlive;
      this.locAlive = (wasLoc && near && Math.abs(xtk) < 900) || (near && onPath && Math.abs(xtk) < 260);
      if (this.locAlive) {
        if (!wasLoc) { this.emit('loc-alive'); this.hInt = 0; }
        this.hdg = Math.round(g.rwyHdg); // 実機の HDG バックフィル
        const capDeg = this.verMode === 'APPR' ? 6 : 12;
        // トラック角 = 滑走路方位 − 偏差比例 ∓ 横速度減衰（オーバーシュート抑制）
        const offDeg = clamp(-xtk * 0.05 - ydot * 0.55, -capDeg, capDeg);
        trkErr = wrapDeg(g.rwyHdg + offDeg - inp.heading);
      } else {
        if (wasLoc) this.emit('loc-lost');
        trkErr = wrapDeg(this.hdg - inp.heading);
      }
    } else {
      if (this.locAlive) this.emit('loc-lost');
      this.locAlive = false;
      trkErr = wrapDeg(this.hdg - inp.heading);
    }
    // 定常外れ積分は HDG のみ（LOC 追跡で weaving を作らない）
    if (this.latMode !== 'NAV') this.hInt = clamp(this.hInt + trkErr * 0.08 * dts, -6, 6);
    const bankTarget = clamp(trkErr * (this.latMode === 'NAV' ? 0.75 : 0.6) + this.hInt, -28, 28);
    if (this.verMode !== 'APPR') {
      this.gsAlive = false;
    } else if (this.locAlive) {
      const was = this.gsAlive;
      const gsAlt = Math.max(along, 0) * GS_SLOPE;
      const gsDev = inp.alt - gsAlt;
      this.gsAlive = was || (along > 400 && Math.abs(gsDev) < 60 && Math.abs(xtk) < 260);
      if (this.gsAlive && !was) this.emit('gs-alive');
      if (!this.gsAlive) {
        // 未捕捉: ALT で高度保持しながら接近（armed 相当）
      }
    }

    // ===== 横方向（バンク→ロールレート副ループ。物理の強い減衰を積分で追う） =====
    const bankErr = wrapDeg(bankTarget - inp.bank);
    const pDes = clamp(bankErr * 1.6, -15, 15);
    const rollRaw = this.itR + 0.05 * bankErr - 0.01 * (inp.p - pDes);
    const rollCmd = clamp(rollRaw, -1, 1);
    this.itR = clamp(this.itR + 0.30 * bankErr * dts - 2 * (rollRaw - rollCmd), -0.5, 0.5);

    // ===== 鉛直（カスケード: 高度誤差→目標V/S→目標ピッチ→エレベータ） =====
    const gsDev = this.gsAlive ? inp.alt - Math.max(along, 0) * GS_SLOPE : 0;
    let vsDes: number;
    if (this.verMode === 'APPR' && this.gsAlive) {
      // 降下角フィードフォワード（-3° の降下率）+ 偏差比例（±3.2 m/s まで穏や捕获）
      vsDes = -GS_SLOPE * Math.max(inp.ias, 40) + clamp(-gsDev * 0.35, -3.2, 3.2);
      vsDes = clamp(vsDes, -12, 6);   // 降下側は経路追従で深くなることを許容
    } else if (this.verMode === 'VS') {
      vsDes = this.vs;
    } else {
      const dAlt0 = this.altTarget - inp.alt;
      vsDes = clamp(dAlt0 * 1.15, -8, 8);
      if (Math.abs(dAlt0) < 40) vsDes *= Math.abs(dAlt0) / 40;   // レベルオフ・テーパー
    }
    const dAlt = this.altTarget - inp.alt;
    const kpA = this.verMode === 'APPR' && this.gsAlive ? 0.0 : 0.022;
    // 旋回補正: バンクで失う高度を目標に加算（1/cosφ 近似。実機 LVL TRN COMP と同趣旨）
    const turnComp = (1 / Math.max(0.66, Math.cos((inp.bank * Math.PI) / 180)) - 1) * Math.max(inp.alt, 300) * 0.5;
    // V/S（レートモード）は仮想高度追従: 目標どおり飛ばなければ誤差が積算され確実収束
    if (this.verMode === 'VS') {
      this.vsAltV += vsDes * dts;
      const dV = clamp(this.vsAltV - (inp.alt - this.vsAltRef), -240, 240);
      var vsPosTerm = 0.05 * dV + 0.45 * (vsDes - inp.vs);
    } else {
      this.vsInt = clamp(this.vsInt + (vsDes - inp.vs) * 0.05 * dts, -5, 5);
      if (this.verMode === 'ALT') this.vsInt = clamp(this.vsInt * (1 - 0.8 * dts), -5, 5);
      var vsPosTerm = this.vsInt + 0.45 * (vsDes - inp.vs);
    }
    const thDes = clamp(kpA * (dAlt + turnComp) + vsPosTerm, -4.5, 12);
    // 姿勢内ループ（PID。ゲインは scripts/.ap-inner.mjs のグリッドサーチで実機物理に校正済み:
    //  kP 0.25 / kI 0.15 / kD 0.18 — ±0.0 超えなし 5 秒収束）
    const pitchErr = thDes - inp.pitch;
    const pitchRaw = this.itP + 0.25 * pitchErr - 0.18 * inp.q;
    const pitchCmd = clamp(pitchRaw, -1, 1);
    this.itP = clamp(this.itP + 0.15 * pitchErr * dts - 3 * (pitchRaw - pitchCmd), -0.4, 0.4);
    if (this.debugOn) this.debug = { thDes, pitchErr, itP: this.itP, q: inp.q, pitch: inp.pitch };
    // 低高度セーフティ（APPR 以外）: 150m AGL 未満で降下中なら目標高度を強制設定
    if (this.verMode !== 'APPR' && inp.agl < AP_MIN_AGL && inp.vs < -0.5) {
      this.altTarget = inp.alt + 400;
      this.verMode = 'ALT';
      this.emit('min-alt');
    }
    // 場周超過（敷居通過 500m 超）で LOC 追跡解除 → 選定方位へ（missed の自動版はしない）
    if (this.latMode === 'NAV' && this.locAlive && along < -500) {
      this.locAlive = false;
      this.gsAlive = false;
      this.verMode = this.verMode === 'APPR' ? 'ALT' : this.verMode;
      this.latMode = 'HDG';
      this.hdg = Math.round(rwyHdg); // 滑走路方向へトラッキング継続（実機の GA 初期動作の近似）
      this.emit('missed');
    }

    // ===== A/T =====
    const spdErr = this.spd - inp.ias;
    // デッドバンド ±1 m/s（≈2kt）+緩い律速: A/T 発振（スラスト平均値の損耗）を防ぐ
    const seAdj = Math.abs(spdErr) < 1.0 ? 0 : spdErr;
    this.throttle = clamp(this.throttle + clamp(seAdj * 0.05, -0.30, 0.30) * dts, 0.02, 1);
    if (this.verMode === 'APPR' && this.gsAlive && inp.agl < 30 && inp.vs < -0.4) {
      this.throttle = 0.03; // RETARD 相当（自動ランディングのアイドル）
    }

    if (!Number.isFinite(pitchCmd) || !Number.isFinite(rollCmd)) {
      this.engaged = false;
      this.emit('ap-trip');
      return null;
    }
    this.last = {
      engaged: true, lat: this.latMode, ver: this.verMode,
      spdKt: Math.round(this.spd * KTS), hdgDeg: this.hdg,
      altM: Math.round(this.altTarget), vsFpm: Math.round(this.vs * 196.85),
      loc: this.locAlive, gs: this.gsAlive,
      xtk: xtk, gsDev: gsDev, dist: Math.max(along, 0)
    };
    return { pitch: clamp(pitchCmd, -1, 1), roll: clamp(rollCmd, -1, 1), throttle: this.throttle };
  }
}
