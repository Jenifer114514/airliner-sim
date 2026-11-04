/**
 * scripts/terrain-shot.mjs — 地形の立体感・距離感の目視検証（5条件スクショ）
 *  1 low      : 低高度 AGL300m 平野上（地上の細部・起伏の明瞭さ）
 *  2 high     : FL350（広い範囲・地平線の連続性・空気遠近法）
 *  3 mountain : 山岳 AGL1200m（山脈の陰影・谷）
 *  4 plain    : 平野 AGL150m（農地・河川・樹林の通過感）
 *  5 approach : 滑走路進入 2km（空港平坦帯の回帰確認）
 * 地面高は __airliner.terrainHeight（CPU 実装＝GPU 変位と一致）で正確に置く。
 * 実行: node scripts/terrain-shot.mjs（server 起動必須）
 */
import { chromium } from 'playwright-core';

const PAGE_URL = process.env.AIRLINER_URL || 'http://127.0.0.1:8080/';
const OUT = new globalThis.URL('../screenshots/', import.meta.url).pathname;
const W = 960, H = 540;

const VIEWS = [
  { name: 'low',      cam: [1500, 300, -6500],   look: [1500, -100, 4000] },
  { name: 'high',     cam: [3000, 10600, -9000], look: [9000, -13000, 26000] },
  { name: 'mountain', cam: [-7000, 1800, 4200], look: [-13500, 1800, 11500] },
  { name: 'plain',    cam: [-5200, 150, 2600],   look: [-1500, -60, 9000] },
  { name: 'approach', cam: [-140, 235, -2450],   look: [0, 20 - 0, 800] }
];

const browser = await chromium.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox']
});
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errs.push('CONSOLE: ' + m.text()); });

await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__airliner?.renderer, null, { timeout: 40000 });
await page.evaluate(() => {
  document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await page.waitForTimeout(1500);
await page.evaluate(() => {
  const A = window.__airliner;
  A.game.state = 'paused';
  A.game.updateWorld = () => {};
  A.game.render = () => {};
});

for (const v of VIEWS) {
  const info = await page.evaluate((v) => {
    const A = window.__airliner;
    const { scene, camera, renderer, game } = A;
    const ground = A.terrainHeight(v.cam[0], v.cam[2]);
    const y = v.name === 'approach' || v.name === 'high' ? v.cam[1] : ground + v.cam[1];
    game.terrain.update(v.cam[0], v.cam[2]);
    camera.position.set(v.cam[0], y, v.cam[2]);
    camera.lookAt(v.look[0], ground + v.look[1], v.look[2]);
    camera.updateMatrixWorld();
    game.updateTerrainAndFog?.();
    renderer.render(scene, camera);
    return { y: Math.round(y), ground: Math.round(ground) };
  }, v);
  await page.screenshot({ path: `${OUT}terrain-${v.name}.png` });
  console.log(`terrain-${v.name}.png  cam=(${v.cam[0]}, ${info.y}, ${v.cam[2]}) ground=${info.ground}`);
}

// ---- 6) 離陸→上昇（simulate で確定的に進行）: 機影・地表の通過感・追跡カメラ ----
const flight = await page.evaluate(() => {
  const A = window.__airliner;
  const g = A.game;
  g.state = 'paused';
  g.updateWorld = () => {};
  g.render = () => {};
  g.startFlight('b737', 'free', 'hlm');
  g.simulate(32, { pitch: 0, roll: 0, yaw: 0, throttle: 1, brakes: false, flapsDeg: 5, spoilers: 0, gearDown: true });
  const rollIas = g.getTelemetry().ias;
  const C = (p, t, gear) => ({ pitch: p, roll: 0, yaw: 0, throttle: t, brakes: false, flapsDeg: 5, spoilers: 0, gearDown: gear });
  for (let i = 0; i < 400; i++) {
    const t = g.getTelemetry();
    if (t.agl > 1400) break;
    const err = 12 - t.pitch;
    const cmd = Math.max(-0.25, Math.min(0.55, err * 0.05 + t.omega.x * 0.8));
    g.simulate(0.5, C(cmd, 0.95, t.agl > 60 ? false : true));
  }
  const tel = g.getTelemetry();
  // 機体状態を凍結して描画用カメラを置く（rig の rAF は停止済み）
  const grp = g.getPlayerGroup();
  const { scene, camera, renderer } = A;
  const pos = grp.position.clone();
  const fwd = new pos.constructor(0, 0, 1).applyQuaternion(grp.quaternion);
  camera.position.copy(pos).addScaledVector(fwd, -120).add(new pos.constructor(0, 34, 0));
  camera.up.set(0, 1, 0);
  camera.lookAt(pos.clone().addScaledVector(fwd, 160).add(new pos.constructor(0, -30, 0)));
  camera.updateMatrixWorld();
  g.terrain.update(pos.x, pos.z);
  g.updateTerrainAndFog();
  renderer.render(scene, camera);
  return { rollIas: Math.round(rollIas * 1.944), agl: Math.round(tel.agl), ias: Math.round(tel.ias * 1.944), vs: Math.round(tel.vspeed * 196.85), x: Math.round(pos.x), z: Math.round(pos.z) };
});
console.log('flight:', JSON.stringify(flight));
await page.screenshot({ path: `${OUT}terrain-climb.png`, timeout: 120000 });
// 遠景俯瞰: 飛行中の地上通過（機体上方後方から緩い俯瞰）
await page.evaluate(() => {
  const A = window.__airliner;
  const g = A.game;
  const grp = g.getPlayerGroup();
  const pos = grp.position.clone();
  const { scene, camera, renderer } = A;
  camera.position.copy(pos).add(new pos.constructor(260, 700, 900));
  camera.lookAt(pos.clone().add(new pos.constructor(-400, -260, -1600)));
  camera.updateMatrixWorld();
  g.terrain.update(pos.x + 1000, pos.z + 2000);
  g.updateTerrainAndFog();
  renderer.render(scene, camera);
});
await page.screenshot({ path: `${OUT}terrain-overfly.png`, timeout: 120000 });

console.log('errors:', errs.length);
if (errs.length) console.log(errs.slice(0, 4).join('\n'));
await browser.close();
