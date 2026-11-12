// Uses the full airliner.glb. Run after placing the licensed model in public/.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { writeFile, unlink } from 'node:fs/promises';
const html = '.ground-contact-test.html';
await writeFile(html, `<!doctype html><script type="module">
import * as THREE from 'three';
import { buildAirliner } from '/src/render/airliner.ts';
import { AIRCRAFT } from '/src/config/aircraft.ts';
import { attachExtModel } from '/src/render/extModel.ts';
try {
 const out=[];
 for (const spec of AIRCRAFT) {
  const p=buildAirliner(spec); if (!await attachExtModel(p.group)) throw Error('GLB missing or failed to load');
  const root=p.group.userData.extModel.root; root.updateMatrixWorld(true);
  const contact=-spec.fuselageRadius*1.95;
  for (const name of ['Main_Wheels_Left_31','Main_Wheels_Right_43','Wheel_101']) {
   const node=root.getObjectByName(name); if(!node) throw Error('missing '+name);
   // The first child is the wheel mesh; descendants include struts and lights.
   const mesh=node.children.find(o=>o.isMesh); if(!mesh) throw Error('missing wheel mesh '+name);
   const offset=new THREE.Box3().setFromObject(mesh).min.y-contact;
   out.push({aircraft:spec.id,name,offset});
   if(Math.abs(offset)>0.1) throw Error(spec.id+' '+name+' contact error '+offset);
  }
 }
 window.result={ok:true,out};
} catch(e) { window.result={ok:false,error:String(e.stack)}; }
</script>`);
const server=spawn('node',['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','8228','--strictPort'],{stdio:'ignore'});
let browser;
try {
 await new Promise(r=>setTimeout(r,1200));
 browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage(); await page.goto('http://127.0.0.1:8228/'+html);
 await page.waitForFunction(()=>window.result,{timeout:60000}); const result=await page.evaluate(()=>window.result);
 if(!result.ok) throw Error(result.error); console.log('PASS wheel ground alignment',JSON.stringify(result.out));
} finally { if(browser) await browser.close(); server.kill(); await unlink(html).catch(()=>{}); }
