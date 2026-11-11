// Verify the default external view does not fetch the cockpit, and the aircraft attaches.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const srv = spawn('node', ['scripts/serve.mjs', '8213'], {stdio:'ignore'});
await new Promise(r=>setTimeout(r,700));
const br = await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
 const p = await br.newPage({viewport:{width:640,height:360}}); const urls=[];p.on('request',r=>{if(r.url().includes('.glb')) urls.push(r.url());});
 await p.goto('http://127.0.0.1:8213/',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>!!window.__airliner?.game,null,{timeout:60000});
 await p.evaluate(()=>document.getElementById('btn-start').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})));
 await p.waitForFunction(()=>!!window.__airliner.game.player?.group.userData.extModel,null,{timeout:120000});
 if (!urls.some(x=>x.includes('airliner.glb')) || urls.some(x=>x.includes('cockpit.glb'))) throw Error('unexpected initial requests '+urls.join(','));
 console.log('PASS: default external view attaches real GLB, cockpit GLB not requested');
 await p.evaluate(()=>window.__airliner.game.rig.setMode('cockpit'));
 await p.waitForFunction(()=>window.__airliner.game.cockpit.hasModel(),null,{timeout:120000});
 if (!urls.some(x=>x.includes('cockpit.glb'))) throw Error('cockpit GLB was not requested');
 console.log('PASS: cockpit GLB requested and attached upon entering cockpit view');
} finally {await br.close(); srv.kill();}
