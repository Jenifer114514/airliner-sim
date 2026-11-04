/**
 * scripts/physics-test.mjs — 物理エンジンのスモークテスト（Node 実行）
 * esbuild で src/sim/physics.ts をバンドルし、以下を検証する:
 *  1. 3機体で NaN/発散なし
 *  2. 離陸滑走 → 抬頭 → 上昇
 *  3. 急ピッチ入力で G が正しく立ち上がる
 *  4. 失速: 大迎角で揚力低下・頭下げ傾向
 *  5. ロール応答が機体ごとに異なる（慣性の差）
 *  6. 急旋回でエネルギー損失
 *  7. 乱暴入力でも発散しない
 *  8. 地上でブレーキ停止
 */
import { buildSync } from 'esbuild';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const outDir = mkdtempSync(join(tmpdir(), 'phys-'));
const outFile = join(outDir, 'physics.bundle.mjs');
buildSync({
  entryPoints: [new URL('../src/sim/physics.ts', import.meta.url).pathname],
  bundle: true,
  format: 'esm',
  outfile: outFile,
  external: []
});
const mod = await import(pathToFileURL(outFile).href);
const { AircraftPhysics } = mod;
const THREE = await import('three');

const AIRCRAFT = (await import(pathToFileURL(join(outDir, 'aircraft.mjs')).href).catch(() => null)) ?? null;
// 機体スペックは physics に閉じたので手書き最小セット（config と同値）
const SPECS = [
  {
    id: 'b737', fuselageLength: 39.5, fuselageRadius: 1.88, wingspan: 35.8, rootChord: 7.2, tipChord: 1.6,
    mass: 79000, wingArea: 124, thrustMax: 214000
  },
  {
    id: 'a320', fuselageLength: 37.6, fuselageRadius: 1.98, wingspan: 35.8, rootChord: 7.4, tipChord: 1.7,
    mass: 78000, wingArea: 122, thrustMax: 220000
  },
  {
    id: 'b777', fuselageLength: 73.9, fuselageRadius: 3.10, wingspan: 64.8, rootChord: 13.0, tipChord: 2.6,
    mass: 299000, wingArea: 428, thrustMax: 720000
  }
].map((s) => ({
  ...s,
  description: '', name: s.id, sweep: 0.45, dihedral: 0.09, tailHeight: 12, tailRootChord: 5,
  engineDiameter: 1.6, engineLength: 4, engineSpanPos: 0.3, engineForward: 1.7,
  mainWheelCount: 2, liveryTop: 0xffffff, liveryBottom: 0x223344, liveryAccent: 0xff8800,
  vRotate: 74, vCruise: 230, vApproach: 69
}));

let pass = 0, fail = 0;
function check(name, ok, detail = '') {
  if (ok) { pass++; console.log(`  PASS ${name} ${detail}`); }
  else { fail++; console.log(`  FAIL ${name} ${detail}`); }
}

const H = 1 / 120;
const neutral = { elevator: 0, aileron: 0, rudder: 0, flapsDeg: 5, spoilers: 0, gearDown: true };
function run(ph, seconds, fn) {
  const steps = Math.round(seconds / H);
  for (let i = 0; i < steps; i++) {
    fn?.(i * H, ph);
    ph.step(H, neutral);
    const p = ph.position;
    if (!Number.isFinite(p.x + p.y + p.z + ph.velocity.x + ph.velocity.y + ph.velocity.z)) {
      return false;
    }
  }
  return true;
}

console.log('=== 物理スモークテスト ===');

// ---- 1. NaN/発散 ----
for (const spec of SPECS) {
  const ph = new AircraftPhysics(spec);
  ph.throttle = 1;
  const ok = run(ph, 60, (t, p) => {
    // 蛇行しないよう軽い操舵
    p.omega.x = Math.sin(t) * 0.001;
  });
  check(`[${spec.id}] 60秒飛行で NaN/発散なし`, ok, `(alt=${ph.position.y.toFixed(0)}m, IAS=${ph.telemetry().ias.toFixed(0)})`);
}

// ---- 2. 離陸 → 上昇 ----
{
  const ph = new AircraftPhysics(SPECS[0]);
  ph.throttle = 1;
  ph.flapsDeg = 15;
  let lifted = false, maxAlt = 0, rotateSpeed = 0;
  const steps = Math.round(130 / H);
  for (let i = 0; i < steps; i++) {
    const t = ph.telemetry();
    if (!lifted && t.ias > 74) {
      // 抬頭（機首上げ 0.4）
      const steps2 = Math.round(2.5 / H);
      for (let j = 0; j < steps2; j++) {
        ph.step(H, { ...neutral, elevator: 0.45, flapsDeg: 15 });
      }
      rotateSpeed = t.ias;
      lifted = true;
    }
    if (lifted) {
      ph.step(H, { ...neutral, elevator: 0.10, flapsDeg: 15 });
    } else {
      ph.step(H, neutral);
    }
    maxAlt = Math.max(maxAlt, ph.position.y);
  }
  const t = ph.telemetry();
  check('[b737] 離陸滑走→抬頭→上昇', lifted && maxAlt > 150 && !t.crashed,
    `(Vr=${rotateSpeed.toFixed(0)} m/s, maxAlt=${maxAlt.toFixed(0)}m, alt=${t.alt.toFixed(0)}m)`);
}

// ---- 3. G 応答 ----
{
  const ph = new AircraftPhysics(SPECS[0]);
  // 空中状態にリセット（機首 +Z 方向へ 230 m/s）
  ph.resetAirborne(new THREE.Vector3(0, 3000, 0), 0, 230);
  ph.throttle = 0.8;
  // まず水平飛行へ近づける
  run(ph, 4);
  // 急ピッチ入力
  let maxG = 0;
  for (let i = 0; i < Math.round(2 / H); i++) {
    ph.step(H, { ...neutral, elevator: 0.7, gearDown: false, flapsDeg: 0 });
    maxG = Math.max(maxG, ph.telemetry().gLoad);
  }
  check('[b737] 急ピッチ入力で G 上昇', maxG > 1.8, `(maxG=${maxG.toFixed(2)})`);
}

// ---- 4. 失速特性 ----
{
  const ph = new AircraftPhysics(SPECS[0]);
  ph.resetAirborne(new THREE.Vector3(0, 3000, 0), 0, 90); // 低速
  ph.throttle = 0;
  // 高迎角を作る: 機首を急に上げてから減速を待つ
  for (let i = 0; i < Math.round(1.2 / H); i++) {
    ph.step(H, { ...neutral, elevator: 0.8, gearDown: false, flapsDeg: 0 });
  }
  let minSpeed = 999, maxAoa = 0, noseDropped = false;
  const startPitch = ph.telemetry().pitch;
  for (let i = 0; i < Math.round(6 / H); i++) {
    ph.step(H, { ...neutral, elevator: 0.25, gearDown: false, flapsDeg: 0 });
    const t = ph.telemetry();
    minSpeed = Math.min(minSpeed, t.ias);
    maxAoa = Math.max(maxAoa, t.aoa);
    if (t.pitch < startPitch - 6) noseDropped = true;
  }
  const t = ph.telemetry();
  check('[b737] 失速: 大迎角・頭下げ傾向', maxAoa > 14 && (noseDropped || t.pitch < 12),
    `(maxAoa=${maxAoa.toFixed(1)}°, minIAS=${minSpeed.toFixed(1)}, pitch ${startPitch.toFixed(0)}→${t.pitch.toFixed(0)}°)`);
}

// ---- 5. ロール応答の機体差 ----
{
  const rates = {};
  for (const spec of SPECS) {
    const ph = new AircraftPhysics(spec);
    ph.resetAirborne(new THREE.Vector3(0, 3000, 0), 0, 220);
    ph.throttle = 0.8;
    run(ph, 3);
    let bank = 0;
    for (let i = 0; i < Math.round(1.2 / H); i++) {
      ph.step(H, { ...neutral, aileron: 0.6, gearDown: false, flapsDeg: 0 });
      bank = Math.max(bank, ph.telemetry().bank);
    }
    rates[spec.id] = bank;
  }
  check('[比較] ロール応答に機体差', rates.b737 > rates.b777 * 1.3,
    `(b737=${rates.b737.toFixed(1)}°, a320=${rates.a320.toFixed(1)}°, b777=${rates.b777.toFixed(1)}°)`);
}

// ---- 6. 旋回エネルギー損失 ----
{
  const ph = new AircraftPhysics(SPECS[0]);
  ph.resetAirborne(new THREE.Vector3(0, 3000, 0), 0, 230);
  ph.throttle = 0.5;
  run(ph, 3);
  const e0 = ph.spec.mass * 9.81 * ph.position.y + 0.5 * ph.spec.mass * ph.velocity.lengthSq();
  for (let i = 0; i < Math.round(12 / H); i++) {
    ph.step(H, { ...neutral, aileron: 0.55, elevator: 0.25, gearDown: false, flapsDeg: 0 });
  }
  const e1 = ph.spec.mass * 9.81 * ph.position.y + 0.5 * ph.spec.mass * ph.velocity.lengthSq();
  check('[b737] 急旋回でエネルギー損失', e1 < e0 * 0.97, `(${(e0 / 1000).toFixed(0)}→${(e1 / 1000).toFixed(0)} MJ)`);
}

// ---- 7. 乱暴入力で発散しない ----
{
  const ph = new AircraftPhysics(SPECS[2]); // 大型機
  ph.resetAirborne(new THREE.Vector3(0, 2000, 0), 0, 180);
  ph.throttle = 1;
  let ok = true;
  for (let i = 0; i < Math.round(30 / H); i++) {
    const t = i * H;
    ph.step(H, {
      elevator: Math.sin(t * 7.3) > 0 ? 1 : -1,
      aileron: Math.sin(t * 5.1) > 0 ? 1 : -1,
      rudder: Math.sin(t * 3.7) > 0 ? 1 : -1,
      flapsDeg: 30, spoilers: 1, gearDown: true
    });
    const p = ph.position, v = ph.velocity, w = ph.omega;
    if (!Number.isFinite(p.x + p.y + p.z + v.x + v.y + v.z + w.x + w.y + w.z)) { ok = false; break; }
    if (Math.abs(p.y) > 50000 || v.length() > 900) { ok = false; break; }
    if (w.length() > 3) { ok = false; break; }
  }
  check('[b777] 乱暴入力 30 秒で発散なし', ok);
}

// ---- 8. 地上ブレーキ停止 ----
{
  const ph = new AircraftPhysics(SPECS[0]);
  ph.reset(new THREE.Vector3(0, 0, 0), 0);
  ph.velocity.set(0, 0, 40); // 40 m/s で滑走
  let stopped = false;
  for (let i = 0; i < Math.round(40 / H); i++) {
    ph.step(H, { ...neutral, elevator: 0, rudder: 0 });
    ph.brakes = true;
    ph.throttle = 0;
    if (ph.velocity.length() < 0.8) { stopped = true; break; }
  }
  check('[b737] ブレーキで停止', stopped && ph.onGround && !ph.crashed,
    `(dist=${ph.distanceFlown.toFixed(0)}m)`);
}

console.log(`\n=== 結果: ${pass} PASS / ${fail} FAIL ===`);
process.exit(fail ? 1 : 0);
