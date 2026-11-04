/**
 * scripts/autopilot-test.mjs — オートパイロットの Node レグレッション（1/60 s フレーム + 1/120 s 物理）
 *  1. ALT ホールド: 巡航高度を ±40 m に保持、バンク静定
 *  2. HDG 変更: ±5° 未満で選定方位へ安定旋回
 *  3. ALT  climb: 500 m  climbed 後のレベルオフ、失速しない
 *  4. V/S: 選定上昇率 ±1 m/s、ピッチ符号=機首上げ
 *  5. NAV/APPR: 7 km -final から LOC・GS 捕捉 → 滑走路タッチダウン、AP 自動切断
 *  6. 場周超過: missed イベントで HDG 復帰
 *  7. 低高度セーフティ: min-alt で目標高度引き上げ
 *  8. 地上: pitch/roll 不干渉・A/T 有限
 */
import { buildSync } from 'esbuild';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const outDir = mkdtempSync(join(tmpdir(), 'ap-'));
const outFile = join(outDir, 'ap.bundle.mjs');
buildSync({
  stdin: {
    contents: [
      "export * from './physics';",
      "export * from './autopilot';",
      "export { AIRPORTS, getAirportSpec } from '../config/airports';"
    ].join('\n'),
    resolveDir: new URL('../src/sim', import.meta.url).pathname,
    loader: 'ts',
    sourcefile: 'ap-entry.ts'
  },
  bundle: true,
  format: 'esm',
  outfile: outFile,
  external: []
});
const mod = await import(pathToFileURL(outFile).href);
const { AircraftPhysics, Autopilot, AIRPORTS } = mod;

const THREE = await import('three');
// scripts/physics-test.mjs の b737 スペックと同一（aero は physics 内蔵定数）
const SPEC = {
  id: 'b737', fuselageLength: 39.5, fuselageRadius: 1.88, wingspan: 35.8, rootChord: 7.2, tipChord: 1.6,
  mass: 79000, wingArea: 124, thrustMax: 214000,
  description: '', name: 'b737', sweep: 0.45, dihedral: 0.09, tailHeight: 12, tailRootChord: 5,
  engineDiameter: 1.6, engineLength: 4, engineSpanPos: 0.3, engineForward: 1.7,
  mainWheelCount: 2, liveryTop: 0xffffff, liveryBottom: 0x223344, liveryAccent: 0xff8800,
  vRotate: 74, vCruise: 230, vApproach: 69
};
const terrainHeight = () => 0;

let pass = 0;
let fail = 0;
function ok(cond, name, detail = '') {
  if (cond) { pass++; console.log(`  ✓ ${name}${detail ? ` (${detail})` : ''}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`); }
}

const R2D = 180 / Math.PI;
function apInput(ph) {
  const t = ph.telemetry();
  return {
    ias: t.ias, alt: t.alt, agl: t.agl, heading: t.heading, bank: t.bank,
    pitch: t.pitch, q: -t.omega.x * R2D, p: t.omega.z * R2D,
    vs: t.vspeed, x: t.position.x, z: t.position.z, onGround: t.onGround,
    vx: t.velocity.x, vz: t.velocity.z
  };
}
/** sec 秒間、AP step(1/60) → 物理 step(1/120)×2 を回す */
function fly(ph, ap, airport, sec, extra = null) {
  const n = Math.round(sec * 60);
  for (let i = 0; i < n; i++) {
    let pitch = 0, roll = 0, thr = ph.throttle;
    if (ap) {
      const c = ap.step(1 / 60, apInput(ph), airport ?? null);
      if (c) { pitch = c.pitch; roll = c.roll; thr = c.throttle; }
    }
    if (extra) { const e = extra(i / 60, ph); if (e) { pitch = e.pitch ?? pitch; roll = e.roll ?? roll; thr = e.thr ?? thr; } }
    ph.throttle = thr;
    for (let k = 0; k < 2; k++) ph.step(1 / 120, { elevator: pitch, aileron: roll, rudder: 0, flapsDeg: ph.flapsDeg, spoilers: 0, gearDown: ph.gearDown });
  }
}
function finite(ph) {
  const t = ph.telemetry();
  return Number.isFinite(t.alt) && Number.isFinite(t.ias) && Number.isFinite(t.position.x) && !t.crashed;
}

/** 巡航姿勢で生成。物理の spawn 規約: θ = (180 − 方位)·π/180（θ=0 → 方位180） */
function cruise(ph, alt, hdgDeg, iasMs) {
  const pos = new THREE.Vector3(0, alt, 0);
  ph.resetAirborne(pos, ((180 - hdgDeg) * Math.PI) / 180, iasMs);
  ph.flapsDeg = 0;
  ph.gearDown = false;
  ph.throttle = 0.55;
  fly(ph, null, null, 8);            // 安定化
}

const HLM = AIRPORTS[0];

console.log('--- 1. ALT ホールド ---');
{
  const ph = new AircraftPhysics(SPEC, terrainHeight);
  cruise(ph, 1500, 359, 130);
  const ap = new Autopilot();
  ap.toggle(apInput(ph));
  ok(ap.engaged, 'engage');
  const a0 = ph.telemetry().alt;
  fly(ph, ap, HLM, 60);
  const t = ph.telemetry();
  ok(Math.abs(t.alt - a0) < 40, '高度保持 ±40m', `Δ=${(t.alt - a0).toFixed(1)}m`);
  ok(Math.abs(t.bank) < 8, 'バンク静定', `b=${t.bank.toFixed(1)}°`);
  ok(finite(ph), '発散なし');
}

console.log('--- 2. HDG 変更 ---');
{
  const ph = new AircraftPhysics(SPEC, terrainHeight);
  cruise(ph, 1500, 90, 130);
  const ap = new Autopilot();
  ap.toggle(apInput(ph));
  ap.nudgeHdg(60);
  fly(ph, ap, HLM, 60);
  let t = ph.telemetry();
  const err = ((t.heading - 150 + 540) % 360) - 180;
  ok(Math.abs(err) < 4, '選定方位へ安定', `hdg=${t.heading.toFixed(1)} err=${err.toFixed(1)}°`);
  ap.nudgeHdg(-90);
  fly(ph, ap, HLM, 75);
  t = ph.telemetry();
  const err2 = ((t.heading - 60 + 540) % 360) - 180;
  ok(Math.abs(err2) < 4, '戻り旋回も追従', `err=${err2.toFixed(1)}°`);
  ok(Math.abs(t.alt - 1500) < 120, '旋回中の高度保持 ±120m', `alt=${t.alt.toFixed(0)}`);
}

console.log('--- 3. ALT 上昇 500m ---');
{
  const ph = new AircraftPhysics(SPEC, terrainHeight);
  cruise(ph, 1500, 0, 130);
  const ap = new Autopilot();
  ap.toggle(apInput(ph));
  ap.nudgeAlt(500);
  fly(ph, ap, HLM, 110);
  const t = ph.telemetry();
  ok(Math.abs(t.alt - 2000) < 150, '目標高度到達 ±150m（A/T 飽和考慮）', `alt=${t.alt.toFixed(0)}`);
  ok(Math.abs(t.vspeed) < 2.2, 'レベルオフ', `vs=${t.vspeed.toFixed(2)}`);
  ok(t.ias > 55, '失速せず', `ias=${(t.ias * 1.94404).toFixed(0)}kt`);
}

console.log('--- 4. V/S +500 fpm ---');
{
  const ph = new AircraftPhysics(SPEC, terrainHeight);
  cruise(ph, 1500, 0, 125);
  const ap = new Autopilot();
  ap.toggle(apInput(ph));
  ap.nudgeVs(500);
  const a0 = ph.telemetry().alt;
  fly(ph, ap, HLM, 100);
  const t = ph.telemetry();
  ok(ap.verMode === 'VS', 'V/S モード', ap.verMode);
  ok(Math.abs(t.vspeed - 2.54) < 1.2, '選定 V/S 追従', `vs=${t.vspeed.toFixed(2)}m/s`);
  ok(t.alt - a0 > 20, '高度上昇（符号検査）', `Δalt=${(t.alt - a0).toFixed(0)}m`);
}

console.log('--- 5. NAV/APPR → タッチダウン ---');
{
  const ph = new AircraftPhysics(SPEC, terrainHeight);
  // 湾岸国際: 南→北進入（方位 0 → 物理 θ=π）。敷居=北端 (0,−2000)、7km ファイナル、100m 右オフセット
  const along0 = 7000;
  const gsAlt = along0 * Math.tan(3 * Math.PI / 180);
  // 進入速度 88 m/s（171kt。この機体の flaps 付失速端 +余裕。物理 vApproach=69 は低すぎ実測）
  const pos = new THREE.Vector3(100, gsAlt + 35, -2000 + along0);
  ph.resetAirborne(pos, Math.PI, 88);
  ph.flapsDeg = 25;
  ph.gearDown = true;
  ph.throttle = 0.55;
  fly(ph, null, null, 4);        // 安定化のみ（無操縦）
  const ap = new Autopilot();
  ap.toggle(apInput(ph));
  ap.alignApproach();
  ok(ap.latMode === 'NAV' && ap.verMode === 'APPR', 'APPR アライン');
  fly(ph, ap, HLM, 55);
  let st = ap.status();
  ok(st.loc, 'LOC 捕捉', `xtk=${st.xtk.toFixed(0)}m`);
  ok(st.gs, 'GS 捕捉', `dev=${st.gsDev.toFixed(1)}m`);
  st = ap.status();
  ok(Math.abs(st.xtk) < 20, 'LOC トラッキング ±20m', `xtk=${st.xtk.toFixed(1)}m`);
  ok(Math.abs(st.gsDev) < 12, 'GS トラッキング ±12m', `dev=${st.gsDev.toFixed(1)}m`);
  let evsAll = ap.drainEvents().join(',');
  // 接地まで推進
  let touch = null;
  for (let s = 0; s < 110 && !touch; s += 2) {
    fly(ph, ap, HLM, 2);
    const t = ph.telemetry();
    if (t.onGround) touch = t;
  }
  ok(touch !== null, 'タッチダウン成立', touch ? `ias=${(touch.ias * 1.94404).toFixed(0)}kt` : '未接地');
  if (touch) {
    ok(Math.abs(touch.position.x) < 45, '滑走路中心線 ±45m 接地', `x=${touch.position.x.toFixed(1)}m`);
    // 北進入の敷居は z=-2000。接地は -2300..-800 想定
    ok(touch.position.z < -2000 + 1500 && touch.position.z > -2000 - 350, 'タッチダウンは進入端付近', `z=${touch.position.z.toFixed(0)}`);
  }
  fly(ph, ap, HLM, 1.5);   // 接地後の 1 ステップで自動切断させる
  evsAll += ',' + ap.drainEvents().join(',');
  ok(!ap.engaged, '接地後 AP 自動切断');
  ok(/loc-alive/.test(evsAll) && /gs-alive/.test(evsAll), '捕捉イベント', evsAll.slice(0, 90));
  ok(/ap-touchdown/.test(evsAll), 'タッチダウン自動切断イベント');
}

console.log('--- 6. 場周超過（missed） ---');
{
  const ph = new AircraftPhysics(SPEC, terrainHeight);
  const pos = new THREE.Vector3(0, 220, -2000 + 2600); // 北端 2.6km 手前・GS より低く進入 → 捕捉→場周通過
  ph.resetAirborne(pos, Math.PI, 80);  // 方位 0（北）= θ=π
  ph.flapsDeg = 25; ph.gearDown = true; ph.throttle = 0.45;
  fly(ph, null, null, 3);
  const ap = new Autopilot();
  ap.toggle(apInput(ph));
  ap.alignApproach();
  fly(ph, ap, HLM, 120);       // 通過 → missed 判定（沿線 -500 超）
  const st = ap.status();
  ok(st.lat === 'HDG' || !ap.locAlive, '場周超過後 HDG 復帰', `lat=${st.lat} loc=${ap.locAlive}`);
}

console.log('--- 7. 低高度セーフティ ---');
{
  const ph = new AircraftPhysics(SPEC, terrainHeight);
  const pos = new THREE.Vector3(500, 130, 3000);
  ph.resetAirborne(pos, 0, 120);  // 方位 180（南）へ離陸場から遠ざかる。低高度降下のみが目的
  ph.throttle = 0.2;
  fly(ph, null, null, 3);
  const ap = new Autopilot();
  ap.toggle(apInput(ph));
  ap.holdAlt();
  ap.nudgeAlt(-80);            // 地面に向かって下げる（セーフティが発動する状況）
  fly(ph, ap, HLM, 40);
  const t = ph.telemetry();
  ok(ap.drainEvents().includes('min-alt') || t.agl > 140, 'min-alt 割込作動', `agl=${t.agl.toFixed(0)}m`);
  ok(t.vspeed > -1, '降下停止', `vs=${t.vspeed.toFixed(1)}`);
}

console.log('--- 8. 地上: 操縦不干渉 ---');
{
  const ph = new AircraftPhysics(SPEC, terrainHeight);
  ph.reset(new THREE.Vector3(0, 0, 1800), Math.PI / 2);  // 方位 90（東）
  ph.throttle = 0.6;
  const ap = new Autopilot();
  ap.toggle(apInput(ph));
  ap.spd = 75;
  for (let i = 0; i < 60 * 5; i++) {
    const c = ap.step(1 / 60, apInput(ph), HLM);
    ph.throttle = c ? c.throttle : ph.throttle;
    ph.step(1 / 120, { elevator: c ? c.pitch : 0, aileron: c ? c.roll : 0, rudder: 0, flapsDeg: 0, spoilers: 0, gearDown: true });
    ph.step(1 / 120, { elevator: c ? c.pitch : 0, aileron: c ? c.roll : 0, rudder: 0, flapsDeg: 0, spoilers: 0, gearDown: true });
  }
  const t = ph.telemetry();
  ok(t.agl < 5, '地上維持（AP が離陸させない）', `agl=${t.agl.toFixed(1)}`);
  ok(t.throttle > 0.55, 'A/T が加速要求', `thr=${t.throttle.toFixed(2)}`);
  ok(finite(ph), '発散なし');
}

console.log(`\nautopilot-test: ${pass} pass / ${fail} fail`);
process.exit(fail === 0 ? 0 : 1);
