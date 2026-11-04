/**
 * scripts/sop-test.mjs — JAL/JTA B737-700 マニュアル反映データの検証（Node 実行）
 *
 * esbuild で src/config/manual.ts をバンドルし、マニュアル（docs/manual-b737.txt）の
 * 実測値と純関数の出力が一致するかを確認する:
 *  1. 単位換算（kt→m/s, lbs→kg）
 *  2. 第2章 2.4 離陸性能データ（V1/VR/V2・N1・トリム）と補間
 *  3. 第1章 1.2 フラップ V_FE/実務推奨速度
 *  4. 第1章 1.1 VMO と OVERSPEED 閾値
 *  5. 第5章 5.2 Vref 表と Vapp 風補正ルール（マニュアル例の算術一致）
 */
import { buildSync } from 'esbuild';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const outDir = mkdtempSync(join(tmpdir(), 'sop-'));
const outFile = join(outDir, 'manual.bundle.mjs');
buildSync({
  entryPoints: [new URL('../src/config/manual.ts', import.meta.url).pathname],
  bundle: true,
  format: 'esm',
  outfile: outFile,
});
const m = await import(pathToFileURL(outFile).href);

let pass = 0;
let fail = 0;
function ok(name, cond, detail = '') {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.error(`  ✗ ${name} ${detail}`);
  }
}
const eq = (name, got, want, eps = 1e-6) =>
  ok(name, Math.abs(got - want) <= eps, `(got ${got}, want ${want})`);

console.log('== 単位換算 ==');
eq('1 kt = 0.514444 m/s', m.KT, 0.514444, 1e-9);
eq('80 kt = 41.16 m/s', 80 * m.KT, 41.1555, 0.01);
eq('154500 lbs = 70080.0 kg', 154500 * m.LBS, 70080.02, 0.05);

console.log('== 第2章 2.4 離陸性能データ ==');
{
  const s1 = m.takeoffSpeeds(0.15);
  eq('Load15% V1=125', s1.v1, 125);
  eq('Load 15% VR=125', s1.vr, 125);
  eq('Load 15% V2=135', s1.v2, 135);
  eq('Load 15% N1=85.0', s1.n1, 85.0);
  eq('Load 15% Flap=5', s1.flap, 5);
  eq('Load 15% Trim=4.0u', s1.trimUnits, 4.0);
  const s3 = m.takeoffSpeeds(0.55);
  eq('Load 55% V1=135', s3.v1, 135);
  eq('Load 55% V2=145', s3.v2, 145);
  eq('Load 55% Flap=15', s3.flap, 15);
  const s5 = m.takeoffSpeeds(0.95);
  eq('Load 95% V1=148', s5.v1, 148);
  eq('Load 95% V2=158', s5.v2, 158);
  eq('Load 95% N1=98.0', s5.n1, 98.0);
  const mid = m.takeoffSpeeds(0.25);
  eq('Load 25% V1 補間=127.5', mid.v1, 127.5, 0.01);
  const cl = m.takeoffSpeeds(0);
  eq('Load 0% は下限クランプ 125', cl.v1, 125);
  ok('N1 単調増加', s1.n1 < s3.n1 && s3.n1 < s5.n1);
}

console.log('== 第1章 1.2 フラップ V_FE / 実務推奨速度 ==');
{
  ok('FLAP_VFE は 8 行', m.FLAP_VFE.length === 8);
  const f1 = m.vfeForFlap(1);
  eq('Flap1 V_FE=250kt', f1.limitKias, 250);
  eq('Flap1 推奨=230kt', f1.recKias, 230);
  const f5 = m.vfeForFlap(5);
  eq('Flap5 V_FE=250kt', f5.limitKias, 250);
  eq('Flap5 推奨=200kt', f5.recKias, 200);
  const f15 = m.vfeForFlap(15);
  eq('Flap15 V_FE=200kt', f15.limitKias, 200);
  eq('Flap15 推奨=180kt', f15.recKias, 180);
  const f30 = m.vfeForFlap(30);
  eq('Flap30 V_FE=175kt', f30.limitKias, 175);
  eq('Flap30 推奨=150kt', f30.recKias, 150);
  const f40 = m.vfeForFlap(40);
  eq('Flap40 V_FE=162kt', f40.limitKias, 162);
  eq('Flap40 推奨=140kt', f40.recKias, 140);
  eq('Flap40 V_FE(m/s)=83.4', f40.limitMs, 162 * m.KT, 0.01);
  const f0 = m.vfeForFlap(0);
  eq('Flap0 限界=VMO 340kt', f0.limitKias, 340);
  const f10 = m.vfeForFlap(10);
  eq('Flap10 V_FE=210kt', f10.limitKias, 210);
  const f25 = m.vfeForFlap(25);
  eq('Flap25 V_FE=190kt', f25.limitKias, 190);
  // V_FE はフラップが増えるほど厳しい
  let mono = true;
  for (let i = 1; i < m.FLAP_VFE.length; i++) {
    if (m.FLAP_VFE[i].vfe > m.FLAP_VFE[i - 1].vfe) mono = false;
  }
  ok('V_FE 単調非増加', mono);
}

console.log('== 第1章 1.1 VMO / OVERSPEED 閾値 ==');
{
  eq('VMO=340kt', m.B737_LIMITS.vmoKias, 340);
  eq('Flap0 OVERSPEED=340kt(m/s)', m.overspeedLimitMs(0), 340 * m.KT, 0.01);
  eq('Flap30 OVERSPEED=175kt(m/s)', m.overspeedLimitMs(30), 175 * m.KT, 0.01);
  eq('Flap40 OVERSPEED=162kt(m/s)', m.overspeedLimitMs(40), 162 * m.KT, 0.01);
  ok('Flap 展開時は V_FE が VMO より厳しい', m.overspeedLimitMs(5) < m.overspeedLimitMs(0));
  eq('Flap5 OVERSPEED=250kt(m/s)', m.overspeedLimitMs(5), 250 * m.KT, 0.01);
}

console.log('== 第5章 5.2 Vref / Vapp ==');
{
  eq('LW100,000 F30 Vref=121', m.vref(100000, 30), 121);
  eq('LW100,000 F40 Vref=118', m.vref(100000, 40), 118);
  eq('LW115,000 F30 Vref=130', m.vref(115000, 30), 130);
  eq('LW115,000 F40 Vref=126', m.vref(115000, 40), 126);
  eq('LW128,000 F30 Vref=137 (MLW)', m.vref(128000, 30), 137);
  eq('LW128,000 F40 Vref=134 (MLW)', m.vref(128000, 40), 134);
  eq('LW105,000 F30 補間=124', m.vref(105000, 30), 124, 0.01);
  // マニュアル例: Vref 130・向かい風 10kt・gust 15kt → 140kt
  eq('Vapp 例: 130/10/15 → 140', m.computeVapp(130, 10, 15), 140, 0.01);
  // 最小補正 +5kt
  eq('Vapp 最小補正 +5', m.computeVapp(121, 0, 0), 126, 0.01);
  // 最大補正 +20kt
  eq('Vapp 最大補正 +20', m.computeVapp(130, 60, 80), 150, 0.01);
}

console.log('== ロード率（近似式） ==');
{
  eq('OEW で下限クランプ 0.05', m.loadFracFromMass(m.OEW_KG), 0.05);
  eq('MTOW で 1.0', m.loadFracFromMass(m.B737_LIMITS.mtowLbs * m.LBS), 1.0);
  eq('62t で約 0.72', m.loadFracFromMass(62000), (62000 - m.OEW_KG) / (m.B737_LIMITS.mtowLbs * m.LBS - m.OEW_KG), 0.01);
}

console.log(`\nSOP/Manual test: ${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
