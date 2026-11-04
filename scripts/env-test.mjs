/**
 * scripts/env-test.mjs — Phase 4/5 スモークテスト（Node 実行・描画なし）
 * esbuild で sim/nav.ts + config/environment.ts をバンドルし、以下を検証する:
 *  1. 風ベクトルの方位規約（北風 = 南へ流れる = +Z）
 *  2. 風による航跡ドリフト（物理）
 *  3. 燃料消費（飛行中のみ・単調減少）
 *  4. 乱流ありでも発散しない
 *  5. ナビ: 滑走路上の残距離
 *  6. ナビ: 進入距離・整合判定
 *  7. ナビ: 横ずれ・滑走路外判定
 */
import { buildSync } from 'esbuild';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const outDir = mkdtempSync(join(tmpdir(), 'env-'));

function bundle(entry, name) {
  const outFile = join(outDir, name);
  buildSync({
    entryPoints: [new URL(entry, import.meta.url).pathname],
    bundle: true,
    format: 'esm',
    outfile: outFile,
    external: []
  });
  return outFile;
}

const navMod = await import(pathToFileURL(bundle('../src/sim/nav.ts', 'nav.mjs')).href);
const envMod = await import(pathToFileURL(bundle('../src/config/environment.ts', 'env.mjs')).href);
const physMod = await import(pathToFileURL(bundle('../src/sim/physics.ts', 'phys.mjs')).href);
const THREE = await import('three');

const { computeNavInfo, runwayEnds } = navMod;
const { windVector, getTimePreset, getWeatherPreset, getWindPreset, TIMES, WEATHERS, WINDS } = envMod;
const { AircraftPhysics } = physMod;

let pass = 0;
let fail = 0;
function check(name, cond, detail = '') {
  if (cond) { pass++; console.log(`  PASS ${name} ${detail}`); }
  else { fail++; console.log(`  FAIL ${name} ${detail}`); }
}

const AP = {
  id: 'hlm', name: 'x', code: 'HLM', description: '',
  center: { x: 0, z: 0 }, heading: 0, length: 4000, width: 60,
  runwayNumbers: ['34', '16']
};

const SPEC = {
  id: 't', description: '', name: 't', sweep: 0.45, dihedral: 0.09,
  fuselageLength: 39.5, fuselageRadius: 1.88, wingspan: 35.8,
  rootChord: 7.2, tipChord: 1.6, tailHeight: 12, tailRootChord: 5,
  engineDiameter: 1.6, engineLength: 4, engineSpanPos: 0.3, engineForward: 1.7,
  mass: 79000, wingArea: 124, thrustMax: 214000
};

console.log('=== env-test: 風・燃料・乱流・ナビ ===');

// ---- 1. 風ベクトル規約 ----
{
  const north = windVector(10, 0); // 北風: 南(+Z)へ流れる
  check('北風は +Z へ流れる', Math.abs(north.x) < 1e-9 && north.z > 9.9, `(${north.x.toFixed(2)}, ${north.z.toFixed(2)})`);
  const east = windVector(10, 90); // 東風: 西(-X)へ
  check('東風は -X へ流れる', east.x < -9.9 && Math.abs(east.z) < 1e-9, `(${east.x.toFixed(2)}, ${east.z.toFixed(2)})`);
}

// ---- 2. 風ドリフト（物理・無風ランとの比較） ----
{
  // 安定した機体は風上に風見（crab）するため、単純な横移動量ではなく
  // 「無風ランと比べて軌道が変わる」ことを確認する
  const run = (windX) => {
    const p = new AircraftPhysics(SPEC, () => 0);
    p.resetAirborne(new THREE.Vector3(0, 1000, 0), Math.PI, 80); // 北へ 80 m/s
    p.wind.set(windX, 0, 0);
    p.turbulence = 0;
    for (let i = 0; i < 1200; i++) {
      p.step(1 / 120, { elevator: 0, aileron: 0, rudder: 0, flapsDeg: 0, spoilers: 0, gearDown: true });
    }
    return p.telemetry();
  };
  const calm = run(0);
  const windy = run(-5); // 東風 5 m/s
  const dHdg = ((windy.heading - calm.heading + 540) % 360) - 180;
  check('横風で風見（heading 変化）', Math.abs(dHdg) > 1, `Δhdg=${dHdg.toFixed(1)}° / 10s`);
  check('風ありでも NaN なし', Number.isFinite(windy.position.x + windy.position.y + windy.ias), '');
}

// ---- 3. 燃料消費 ----
{
  const p = new AircraftPhysics(SPEC, () => 0);
  p.resetAirborne(new THREE.Vector3(0, 2000, 0), Math.PI, 90);
  p.throttle = 1;
  const f0 = p.telemetry().fuelFrac;
  for (let i = 0; i < 1200; i++) {
    p.step(1 / 120, { elevator: 0, aileron: 0, rudder: 0, flapsDeg: 0, spoilers: 0, gearDown: true });
  }
  const f1 = p.telemetry().fuelFrac;
  check('燃料が飛行中に消費される', f1 < f0 && f1 > f0 - 0.01, `${f0.toFixed(4)} → ${f1.toFixed(4)} (10s)`);
  p.onGround = true;
  const f2 = p.telemetry().fuelFrac;
  for (let i = 0; i < 600; i++) {
    p.step(1 / 120, { elevator: 0, aileron: 0, rudder: 0, flapsDeg: 0, spoilers: 0, gearDown: true });
    p.onGround = true;
  }
  check('地上では燃料消費しない', Math.abs(p.telemetry().fuelFrac - f2) < 1e-9, `${f2.toFixed(4)}`);
}

// ---- 4. 乱流の安定性 ----
{
  const p = new AircraftPhysics(SPEC, () => 0);
  p.resetAirborne(new THREE.Vector3(0, 1500, 0), Math.PI, 85);
  p.turbulence = 1;
  p.wind.set(3, 0, -2);
  let maxSpeed = 0;
  for (let i = 0; i < 3600; i++) {
    p.step(1 / 120, { elevator: 0, aileron: 0, rudder: 0, flapsDeg: 5, spoilers: 0, gearDown: true });
    const t = p.telemetry();
    maxSpeed = Math.max(maxSpeed, t.velocity.length());
  }
  const t = p.telemetry();
  const finite = Number.isFinite(t.position.x + t.position.y + t.position.z + t.ias);
  check('乱流 30 秒で発散なし', finite && maxSpeed < 250, `maxV=${maxSpeed.toFixed(0)}m/s`);
}

// ---- 5. ナビ: 滑走路上の残距離 ----
{
  // z=+1780（端 A=+2000 側 220m 手前）、北(-Z)へ滑走
  const n = computeNavInfo(AP, 0, 1780, 0, -30);
  check('滑走路上と判定', n.onRunway === true, '');
  check('残距離 ≈ 3780m（進行方向の端 B まで）', n.remainingRunway !== null && Math.abs(n.remainingRunway - 3780) < 30, `got=${n.remainingRunway?.toFixed(0)}`);
  check('最寄り端は 34', n.nearest.name === '34', `name=${n.nearest.name}`);
  // 端 A 閾値ぴったり
  const n2 = computeNavInfo(AP, 0, 2000, 0, -20);
  check('閾値上で残距離 4000m', n2.onRunway === true && Math.abs((n2.remainingRunway ?? 0) - 4000) < 5, `got=${n2.remainingRunway?.toFixed(0)}`);
}

// ---- 6. ナビ: 進入 ----
{
  // 滑走路 34 へ南から 8km 進入（北へ 70 m/s）
  const n = computeNavInfo(AP, 0, 8000, 0, -70);
  check('進入距離 ≈ 6km（端 A 閾値 z=2000 から）', Math.abs(n.distanceToThreshold - 6000) < 60, `got=${n.distanceToThreshold.toFixed(0)}`);
  check('進入整合と判定', n.aligned === true, '');
  check('滑走路外と判定', n.onRunway === false && n.remainingRunway === null, '');
  const off = computeNavInfo(AP, 2000, 8000, -40, -60); // 逸脱コース
  check('横にずれると不整合', off.aligned === false, '');
}

// ---- 7. ナビ: 端の向き（滑走路番号と方位） ----
{
  const [a, b] = runwayEnds(AP);
  check('端の方位が逆（差 180°）', Math.abs(Math.abs(a.headingDeg - b.headingDeg) - 180) < 1, `A=${a.headingDeg} B=${b.headingDeg}`);
  check('滑走路番号が 2 つ', /^[0-9]+$/.test(a.name) && /^[0-9]+$/.test(b.name), `${a.name}/${b.name}`);
}

console.log(`\n=== 結果: ${pass} PASS / ${fail} FAIL ===`);
process.exit(fail > 0 ? 1 : 0);
