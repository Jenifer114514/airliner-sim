(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sl="170",Ed=0,ac=1,Ad=2,qh=1,Yh=2,Ln=3,ri=0,ke=1,fn=2,Un=0,wi=1,Qs=2,oc=3,lc=4,Rd=5,xi=100,Cd=101,Pd=102,Ld=103,Dd=104,Id=200,Ud=201,Nd=202,Fd=203,xo=204,Mo=205,Od=206,Bd=207,zd=208,kd=209,Hd=210,Gd=211,Vd=212,Wd=213,Xd=214,yo=0,So=1,wo=2,as=3,bo=4,To=5,Eo=6,Ao=7,wl=0,qd=1,Yd=2,ni=0,$h=1,Kh=2,Zh=3,bl=4,$d=5,Qh=6,Jh=7,jh=300,os=301,ls=302,Ro=303,Co=304,pa=306,rn=1e3,Mn=1001,Po=1002,He=1003,Kd=1004,pr=1005,an=1006,wa=1007,yi=1008,vn=1009,tu=1010,eu=1011,Js=1012,Tl=1013,zn=1014,yn=1015,Nn=1016,El=1017,Al=1018,cs=1020,nu=35902,iu=1021,su=1022,Je=1023,ru=1024,au=1025,es=1026,hs=1027,Rl=1028,hr=1029,ou=1030,Cl=1031,Pl=1033,Kr=33776,Zr=33777,Qr=33778,Jr=33779,Lo=35840,Do=35841,Io=35842,Uo=35843,No=36196,Fo=37492,Oo=37496,Bo=37808,zo=37809,ko=37810,Ho=37811,Go=37812,Vo=37813,Wo=37814,Xo=37815,qo=37816,Yo=37817,$o=37818,Ko=37819,Zo=37820,Qo=37821,jr=36492,Jo=36494,jo=36495,lu=36283,tl=36284,el=36285,nl=36286,Zd=3200,cu=3201,Ll=0,Qd=1,pn="",Be="srgb",Ms="srgb-linear",ma="linear",re="srgb",Di=7680,cc=519,Jd=512,jd=513,tf=514,hu=515,ef=516,nf=517,sf=518,rf=519,il=35044,na="300 es",Dn=2e3,ia=2001;class ys{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hc=1234567;const Xs=Math.PI/180,js=180/Math.PI;function Fn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[i&255]+Ie[i>>8&255]+Ie[i>>16&255]+Ie[i>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Se(i,t,e){return Math.max(t,Math.min(e,i))}function Dl(i,t){return(i%t+t)%t}function af(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function of(i,t,e){return i!==t?(e-i)/(t-i):0}function qs(i,t,e){return(1-e)*i+e*t}function lf(i,t,e,n){return qs(i,t,1-Math.exp(-e*n))}function cf(i,t=1){return t-Math.abs(Dl(i,t*2)-t)}function hf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function uf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function df(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ff(i,t){return i+Math.random()*(t-i)}function pf(i){return i*(.5-Math.random())}function mf(i){i!==void 0&&(hc=i);let t=hc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function gf(i){return i*Xs}function vf(i){return i*js}function _f(i){return(i&i-1)===0&&i!==0}function xf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Mf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yf(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),h=r((t+n)/2),c=a((t+n)/2),u=r((t-n)/2),d=a((t-n)/2),p=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*c,l*u,l*d,o*h);break;case"YZY":i.set(l*d,o*c,l*u,o*h);break;case"ZXZ":i.set(l*u,l*d,o*c,o*h);break;case"XZX":i.set(o*c,l*g,l*p,o*h);break;case"YXY":i.set(l*p,o*c,l*g,o*h);break;case"ZYZ":i.set(l*g,l*p,o*c,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function mn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const uc={DEG2RAD:Xs,RAD2DEG:js,generateUUID:Fn,clamp:Se,euclideanModulo:Dl,mapLinear:af,inverseLerp:of,lerp:qs,damp:lf,pingpong:cf,smoothstep:hf,smootherstep:uf,randInt:df,randFloat:ff,randFloatSpread:pf,seededRandom:mf,degToRad:gf,radToDeg:vf,isPowerOfTwo:_f,ceilPowerOfTwo:xf,floorPowerOfTwo:Mf,setQuaternionFromProperEuler:yf,normalize:ae,denormalize:mn};class it{constructor(t=0,e=0){it.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vt{constructor(t,e,n,s,r,a,o,l,h){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,h)}set(t,e,n,s,r,a,o,l,h){const c=this.elements;return c[0]=t,c[1]=s,c[2]=o,c[3]=e,c[4]=r,c[5]=l,c[6]=n,c[7]=a,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],c=n[4],u=n[7],d=n[2],p=n[5],g=n[8],v=s[0],m=s[3],f=s[6],w=s[1],M=s[4],_=s[7],L=s[2],T=s[5],E=s[8];return r[0]=a*v+o*w+l*L,r[3]=a*m+o*M+l*T,r[6]=a*f+o*_+l*E,r[1]=h*v+c*w+u*L,r[4]=h*m+c*M+u*T,r[7]=h*f+c*_+u*E,r[2]=d*v+p*w+g*L,r[5]=d*m+p*M+g*T,r[8]=d*f+p*_+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8];return e*a*c-e*o*h-n*r*c+n*o*l+s*r*h-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=c*a-o*h,d=o*l-c*r,p=h*r-a*l,g=e*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*h-c*n)*v,t[2]=(o*n-s*a)*v,t[3]=d*v,t[4]=(c*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=p*v,t[7]=(n*l-h*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),h=Math.sin(r);return this.set(n*l,n*h,-n*(l*a+h*o)+a+t,-s*h,s*l,-s*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ba.makeScale(t,e)),this}rotate(t){return this.premultiply(ba.makeRotation(-t)),this}translate(t,e){return this.premultiply(ba.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ba=new Vt;function uu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function sa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Sf(){const i=sa("canvas");return i.style.display="block",i}const dc={};function Gs(i){i in dc||(dc[i]=!0,console.warn(i))}function wf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function bf(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Tf(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $t={enabled:!0,workingColorSpace:Ms,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===re&&(i.r=On(i.r),i.g=On(i.g),i.b=On(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===re&&(i.r=ns(i.r),i.g=ns(i.g),i.b=ns(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===pn?ma:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function On(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ns(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const fc=[.64,.33,.3,.6,.15,.06],pc=[.2126,.7152,.0722],mc=[.3127,.329],gc=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vc=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$t.define({[Ms]:{primaries:fc,whitePoint:mc,transfer:ma,toXYZ:gc,fromXYZ:vc,luminanceCoefficients:pc,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:fc,whitePoint:mc,transfer:re,toXYZ:gc,fromXYZ:vc,luminanceCoefficients:pc,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}});let Ii;class Ef{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ii===void 0&&(Ii=sa("canvas")),Ii.width=t.width,Ii.height=t.height;const n=Ii.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ii}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=sa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=On(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(On(e[n]/255)*255):e[n]=On(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Af=0;class du{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=Fn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ta(s[a].image)):r.push(Ta(s[a]))}else r=Ta(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ta(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ef.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rf=0;class Ne extends ys{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,n=Mn,s=Mn,r=an,a=yi,o=Je,l=vn,h=Ne.DEFAULT_ANISOTROPY,c=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Fn(),this.name="",this.source=new du(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==jh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case rn:t.x=t.x-Math.floor(t.x);break;case Mn:t.x=t.x<0?0:1;break;case Po:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case rn:t.y=t.y-Math.floor(t.y);break;case Mn:t.y=t.y<0?0:1;break;case Po:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=jh;Ne.DEFAULT_ANISOTROPY=1;class Qt{constructor(t=0,e=0,n=0,s=1){Qt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,h=l[0],c=l[4],u=l[8],d=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(c-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(h+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(h+1)/2,_=(p+1)/2,L=(f+1)/2,T=(c+d)/4,E=(u+v)/4,C=(g+m)/4;return M>_&&M>L?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=T/n,r=E/n):_>L?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=C/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=E/r,s=C/r),this.set(n,s,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-c)*(d-c));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-v)/w,this.z=(d-c)/w,this.w=Math.acos((h+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cf extends ys{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Qt(0,0,t,e),this.scissorTest=!1,this.viewport=new Qt(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ne(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new du(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gn extends Cf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class fu extends Ne{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Pf extends Ne{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ce{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],h=n[s+1],c=n[s+2],u=n[s+3];const d=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||h!==p||c!==g){let m=1-o;const f=l*d+h*p+c*g+u*v,w=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const L=Math.sqrt(M),T=Math.atan2(L,f*w);m=Math.sin(m*T)/L,o=Math.sin(o*T)/L}const _=o*w;if(l=l*m+d*_,h=h*m+p*_,c=c*m+g*_,u=u*m+v*_,m===1-o){const L=1/Math.sqrt(l*l+h*h+c*c+u*u);l*=L,h*=L,c*=L,u*=L}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],h=n[s+2],c=n[s+3],u=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+c*u+l*p-h*d,t[e+1]=l*g+c*d+h*u-o*p,t[e+2]=h*g+c*p+o*d-l*u,t[e+3]=c*g-o*u-l*d-h*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(n/2),c=o(s/2),u=o(r/2),d=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*c*u+h*p*g,this._y=h*p*u-d*c*g,this._z=h*c*g+d*p*u,this._w=h*c*u-d*p*g;break;case"YXZ":this._x=d*c*u+h*p*g,this._y=h*p*u-d*c*g,this._z=h*c*g-d*p*u,this._w=h*c*u+d*p*g;break;case"ZXY":this._x=d*c*u-h*p*g,this._y=h*p*u+d*c*g,this._z=h*c*g+d*p*u,this._w=h*c*u-d*p*g;break;case"ZYX":this._x=d*c*u-h*p*g,this._y=h*p*u+d*c*g,this._z=h*c*g-d*p*u,this._w=h*c*u+d*p*g;break;case"YZX":this._x=d*c*u+h*p*g,this._y=h*p*u+d*c*g,this._z=h*c*g-d*p*u,this._w=h*c*u-d*p*g;break;case"XZY":this._x=d*c*u-h*p*g,this._y=h*p*u-d*c*g,this._z=h*c*g+d*p*u,this._w=h*c*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],h=e[2],c=e[6],u=e[10],d=n+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(c-l)*p,this._y=(r-h)*p,this._z=(a-s)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(c-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+h)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-h)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+h)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,h=e._z,c=e._w;return this._x=n*c+a*o+s*h-r*l,this._y=s*c+a*l+r*o-n*h,this._z=r*c+a*h+n*l-s*o,this._w=a*c-n*o-s*l-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const h=Math.sqrt(l),c=Math.atan2(h,o),u=Math.sin((1-e)*c)/h,d=Math.sin(e*c)/h;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(_c.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(_c.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*s-o*n),c=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*h+a*u-o*c,this.y=n+l*c+o*h-r*u,this.z=s+l*u+r*c-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ea.copy(this).projectOnVector(t),this.sub(Ea)}reflect(t){return this.sub(Ea.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ea=new R,_c=new Ce;class Ri{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),mr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),mr.copy(n.boundingBox)),mr.applyMatrix4(t.matrixWorld),this.union(mr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(As),gr.subVectors(this.max,As),Ui.subVectors(t.a,As),Ni.subVectors(t.b,As),Fi.subVectors(t.c,As),Vn.subVectors(Ni,Ui),Wn.subVectors(Fi,Ni),ci.subVectors(Ui,Fi);let e=[0,-Vn.z,Vn.y,0,-Wn.z,Wn.y,0,-ci.z,ci.y,Vn.z,0,-Vn.x,Wn.z,0,-Wn.x,ci.z,0,-ci.x,-Vn.y,Vn.x,0,-Wn.y,Wn.x,0,-ci.y,ci.x,0];return!Aa(e,Ui,Ni,Fi,gr)||(e=[1,0,0,0,1,0,0,0,1],!Aa(e,Ui,Ni,Fi,gr))?!1:(vr.crossVectors(Vn,Wn),e=[vr.x,vr.y,vr.z],Aa(e,Ui,Ni,Fi,gr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(En),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const En=[new R,new R,new R,new R,new R,new R,new R,new R],hn=new R,mr=new Ri,Ui=new R,Ni=new R,Fi=new R,Vn=new R,Wn=new R,ci=new R,As=new R,gr=new R,vr=new R,hi=new R;function Aa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){hi.fromArray(i,r);const o=s.x*Math.abs(hi.x)+s.y*Math.abs(hi.y)+s.z*Math.abs(hi.z),l=t.dot(hi),h=e.dot(hi),c=n.dot(hi);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const Lf=new Ri,Rs=new R,Ra=new R;class Ci{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Lf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);const e=Rs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ra.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rs.copy(t.center).add(Ra)),this.expandByPoint(Rs.copy(t.center).sub(Ra))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new R,Ca=new R,_r=new R,Xn=new R,Pa=new R,xr=new R,La=new R;class pu{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ca.copy(t).add(e).multiplyScalar(.5),_r.copy(e).sub(t).normalize(),Xn.copy(this.origin).sub(Ca);const r=t.distanceTo(e)*.5,a=-this.direction.dot(_r),o=Xn.dot(this.direction),l=-Xn.dot(_r),h=Xn.lengthSq(),c=Math.abs(1-a*a);let u,d,p,g;if(c>0)if(u=a*l-o,d=a*o-l,g=r*c,u>=0)if(d>=-g)if(d<=g){const v=1/c;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+h}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+h;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+h;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+h):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+h):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+h);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ca).addScaledVector(_r,d),p}intersectSphere(t,e){An.subVectors(t.center,this.origin);const n=An.dot(this.direction),s=An.dot(An)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const h=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,d=this.origin;return h>=0?(n=(t.min.x-d.x)*h,s=(t.max.x-d.x)*h):(n=(t.max.x-d.x)*h,s=(t.min.x-d.x)*h),c>=0?(r=(t.min.y-d.y)*c,a=(t.max.y-d.y)*c):(r=(t.max.y-d.y)*c,a=(t.min.y-d.y)*c),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,n,s,r){Pa.subVectors(e,t),xr.subVectors(n,t),La.crossVectors(Pa,xr);let a=this.direction.dot(La),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xn.subVectors(this.origin,t);const l=o*this.direction.dot(xr.crossVectors(Xn,xr));if(l<0)return null;const h=o*this.direction.dot(Pa.cross(Xn));if(h<0||l+h>a)return null;const c=-o*Xn.dot(La);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Jt{constructor(t,e,n,s,r,a,o,l,h,c,u,d,p,g,v,m){Jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,h,c,u,d,p,g,v,m)}set(t,e,n,s,r,a,o,l,h,c,u,d,p,g,v,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=h,f[6]=c,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Oi.setFromMatrixColumn(t,0).length(),r=1/Oi.setFromMatrixColumn(t,1).length(),a=1/Oi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),h=Math.sin(s),c=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*c,p=a*u,g=o*c,v=o*u;e[0]=l*c,e[4]=-l*u,e[8]=h,e[1]=p+g*h,e[5]=d-v*h,e[9]=-o*l,e[2]=v-d*h,e[6]=g+p*h,e[10]=a*l}else if(t.order==="YXZ"){const d=l*c,p=l*u,g=h*c,v=h*u;e[0]=d+v*o,e[4]=g*o-p,e[8]=a*h,e[1]=a*u,e[5]=a*c,e[9]=-o,e[2]=p*o-g,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*c,p=l*u,g=h*c,v=h*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*c,e[9]=v-d*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*c,p=a*u,g=o*c,v=o*u;e[0]=l*c,e[4]=g*h-p,e[8]=d*h+v,e[1]=l*u,e[5]=v*h+d,e[9]=p*h-g,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,p=a*h,g=o*l,v=o*h;e[0]=l*c,e[4]=v-d*u,e[8]=g*u+p,e[1]=u,e[5]=a*c,e[9]=-o*c,e[2]=-h*c,e[6]=p*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,p=a*h,g=o*l,v=o*h;e[0]=l*c,e[4]=-u,e[8]=h*c,e[1]=d*u+v,e[5]=a*c,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*c,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Df,t,If)}lookAt(t,e,n){const s=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),qn.crossVectors(n,Ye),qn.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),qn.crossVectors(n,Ye)),qn.normalize(),Mr.crossVectors(Ye,qn),s[0]=qn.x,s[4]=Mr.x,s[8]=Ye.x,s[1]=qn.y,s[5]=Mr.y,s[9]=Ye.y,s[2]=qn.z,s[6]=Mr.z,s[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],c=n[1],u=n[5],d=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],w=n[3],M=n[7],_=n[11],L=n[15],T=s[0],E=s[4],C=s[8],y=s[12],x=s[1],P=s[5],k=s[9],I=s[13],N=s[2],H=s[6],U=s[10],Y=s[14],z=s[3],Q=s[7],et=s[11],rt=s[15];return r[0]=a*T+o*x+l*N+h*z,r[4]=a*E+o*P+l*H+h*Q,r[8]=a*C+o*k+l*U+h*et,r[12]=a*y+o*I+l*Y+h*rt,r[1]=c*T+u*x+d*N+p*z,r[5]=c*E+u*P+d*H+p*Q,r[9]=c*C+u*k+d*U+p*et,r[13]=c*y+u*I+d*Y+p*rt,r[2]=g*T+v*x+m*N+f*z,r[6]=g*E+v*P+m*H+f*Q,r[10]=g*C+v*k+m*U+f*et,r[14]=g*y+v*I+m*Y+f*rt,r[3]=w*T+M*x+_*N+L*z,r[7]=w*E+M*P+_*H+L*Q,r[11]=w*C+M*k+_*U+L*et,r[15]=w*y+M*I+_*Y+L*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],h=t[13],c=t[2],u=t[6],d=t[10],p=t[14],g=t[3],v=t[7],m=t[11],f=t[15];return g*(+r*l*u-s*h*u-r*o*d+n*h*d+s*o*p-n*l*p)+v*(+e*l*p-e*h*d+r*a*d-s*a*p+s*h*c-r*l*c)+m*(+e*h*u-e*o*p-r*a*u+n*a*p+r*o*c-n*h*c)+f*(-s*o*c-e*l*u+e*o*d+s*a*u-n*a*d+n*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=t[9],d=t[10],p=t[11],g=t[12],v=t[13],m=t[14],f=t[15],w=u*m*h-v*d*h+v*l*p-o*m*p-u*l*f+o*d*f,M=g*d*h-c*m*h-g*l*p+a*m*p+c*l*f-a*d*f,_=c*v*h-g*u*h+g*o*p-a*v*p-c*o*f+a*u*f,L=g*u*l-c*v*l-g*o*d+a*v*d+c*o*m-a*u*m,T=e*w+n*M+s*_+r*L;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=w*E,t[1]=(v*d*r-u*m*r-v*s*p+n*m*p+u*s*f-n*d*f)*E,t[2]=(o*m*r-v*l*r+v*s*h-n*m*h-o*s*f+n*l*f)*E,t[3]=(u*l*r-o*d*r-u*s*h+n*d*h+o*s*p-n*l*p)*E,t[4]=M*E,t[5]=(c*m*r-g*d*r+g*s*p-e*m*p-c*s*f+e*d*f)*E,t[6]=(g*l*r-a*m*r-g*s*h+e*m*h+a*s*f-e*l*f)*E,t[7]=(a*d*r-c*l*r+c*s*h-e*d*h-a*s*p+e*l*p)*E,t[8]=_*E,t[9]=(g*u*r-c*v*r-g*n*p+e*v*p+c*n*f-e*u*f)*E,t[10]=(a*v*r-g*o*r+g*n*h-e*v*h-a*n*f+e*o*f)*E,t[11]=(c*o*r-a*u*r-c*n*h+e*u*h+a*n*p-e*o*p)*E,t[12]=L*E,t[13]=(c*v*s-g*u*s+g*n*d-e*v*d-c*n*m+e*u*m)*E,t[14]=(g*o*s-a*v*s-g*n*l+e*v*l+a*n*m-e*o*m)*E,t[15]=(a*u*s-c*o*s+c*n*l-e*u*l-a*n*d+e*o*d)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,h=r*a,c=r*o;return this.set(h*a+n,h*o-s*l,h*l+s*o,0,h*o+s*l,c*o+n,c*l-s*a,0,h*l-s*o,c*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,h=r+r,c=a+a,u=o+o,d=r*h,p=r*c,g=r*u,v=a*c,m=a*u,f=o*u,w=l*h,M=l*c,_=l*u,L=n.x,T=n.y,E=n.z;return s[0]=(1-(v+f))*L,s[1]=(p+_)*L,s[2]=(g-M)*L,s[3]=0,s[4]=(p-_)*T,s[5]=(1-(d+f))*T,s[6]=(m+w)*T,s[7]=0,s[8]=(g+M)*E,s[9]=(m-w)*E,s[10]=(1-(d+v))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Oi.set(s[0],s[1],s[2]).length();const a=Oi.set(s[4],s[5],s[6]).length(),o=Oi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],un.copy(this);const h=1/r,c=1/a,u=1/o;return un.elements[0]*=h,un.elements[1]*=h,un.elements[2]*=h,un.elements[4]*=c,un.elements[5]*=c,un.elements[6]*=c,un.elements[8]*=u,un.elements[9]*=u,un.elements[10]*=u,e.setFromRotationMatrix(un),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Dn){const l=this.elements,h=2*r/(e-t),c=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let p,g;if(o===Dn)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===ia)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Dn){const l=this.elements,h=1/(e-t),c=1/(n-s),u=1/(a-r),d=(e+t)*h,p=(n+s)*c;let g,v;if(o===Dn)g=(a+r)*u,v=-2*u;else if(o===ia)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Oi=new R,un=new Jt,Df=new R(0,0,0),If=new R(1,1,1),qn=new R,Mr=new R,Ye=new R,xc=new Jt,Mc=new Ce;class on{constructor(t=0,e=0,n=0,s=on.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],h=s[5],c=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Se(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Se(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return xc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Mc.setFromEuler(this),this.setFromQuaternion(Mc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class mu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Uf=0;const yc=new R,Bi=new Ce,Rn=new Jt,yr=new R,Cs=new R,Nf=new R,Ff=new Ce,Sc=new R(1,0,0),wc=new R(0,1,0),bc=new R(0,0,1),Tc={type:"added"},Of={type:"removed"},zi={type:"childadded",child:null},Da={type:"childremoved",child:null};class we extends ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new R,e=new on,n=new Ce,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Jt},normalMatrix:{value:new Vt}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.premultiply(Bi),this}rotateX(t){return this.rotateOnAxis(Sc,t)}rotateY(t){return this.rotateOnAxis(wc,t)}rotateZ(t){return this.rotateOnAxis(bc,t)}translateOnAxis(t,e){return yc.copy(t).applyQuaternion(this.quaternion),this.position.add(yc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Sc,t)}translateY(t){return this.translateOnAxis(wc,t)}translateZ(t){return this.translateOnAxis(bc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?yr.copy(t):yr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(Cs,yr,this.up):Rn.lookAt(yr,Cs,this.up),this.quaternion.setFromRotationMatrix(Rn),s&&(Rn.extractRotation(s.matrixWorld),Bi.setFromRotationMatrix(Rn),this.quaternion.premultiply(Bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Tc),zi.child=t,this.dispatchEvent(zi),zi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Of),Da.child=t,this.dispatchEvent(Da),Da.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Tc),zi.child=t,this.dispatchEvent(zi),zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,t,Nf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,Ff,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const u=l[h];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),c=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}we.DEFAULT_UP=new R(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new R,Cn=new R,Ia=new R,Pn=new R,ki=new R,Hi=new R,Ec=new R,Ua=new R,Na=new R,Fa=new R,Oa=new Qt,Ba=new Qt,za=new Qt;class sn{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),dn.subVectors(t,e),s.cross(dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){dn.subVectors(s,e),Cn.subVectors(n,e),Ia.subVectors(t,e);const a=dn.dot(dn),o=dn.dot(Cn),l=dn.dot(Ia),h=Cn.dot(Cn),c=Cn.dot(Ia),u=a*h-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(h*l-o*c)*d,g=(a*c-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pn.x),l.addScaledVector(a,Pn.y),l.addScaledVector(o,Pn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Oa.setScalar(0),Ba.setScalar(0),za.setScalar(0),Oa.fromBufferAttribute(t,e),Ba.fromBufferAttribute(t,n),za.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Oa,r.x),a.addScaledVector(Ba,r.y),a.addScaledVector(za,r.z),a}static isFrontFacing(t,e,n,s){return dn.subVectors(n,e),Cn.subVectors(t,e),dn.cross(Cn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),dn.cross(Cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return sn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;ki.subVectors(s,n),Hi.subVectors(r,n),Ua.subVectors(t,n);const l=ki.dot(Ua),h=Hi.dot(Ua);if(l<=0&&h<=0)return e.copy(n);Na.subVectors(t,s);const c=ki.dot(Na),u=Hi.dot(Na);if(c>=0&&u<=c)return e.copy(s);const d=l*u-c*h;if(d<=0&&l>=0&&c<=0)return a=l/(l-c),e.copy(n).addScaledVector(ki,a);Fa.subVectors(t,r);const p=ki.dot(Fa),g=Hi.dot(Fa);if(g>=0&&p<=g)return e.copy(r);const v=p*h-l*g;if(v<=0&&h>=0&&g<=0)return o=h/(h-g),e.copy(n).addScaledVector(Hi,o);const m=c*g-p*u;if(m<=0&&u-c>=0&&p-g>=0)return Ec.subVectors(r,s),o=(u-c)/(u-c+(p-g)),e.copy(s).addScaledVector(Ec,o);const f=1/(m+v+d);return a=v*f,o=d*f,e.copy(n).addScaledVector(ki,a).addScaledVector(Hi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const gu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function ka(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Et{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=Dl(t,1),e=Se(e,0,1),n=Se(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ka(a,r,t+1/3),this.g=ka(a,r,t),this.b=ka(a,r,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=Be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){const n=gu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=On(t.r),this.g=On(t.g),this.b=On(t.b),this}copyLinearToSRGB(t){return this.r=ns(t.r),this.g=ns(t.g),this.b=ns(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return $t.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Se(Ue.r*255,0,255))*65536+Math.round(Se(Ue.g*255,0,255))*256+Math.round(Se(Ue.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(Ue.copy(this),e);const n=Ue.r,s=Ue.g,r=Ue.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,h;const c=(o+a)/2;if(o===a)l=0,h=0;else{const u=a-o;switch(h=c<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Be){$t.fromWorkingColorSpace(Ue.copy(this),t);const e=Ue.r,n=Ue.g,s=Ue.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(Sr);const n=qs(Yn.h,Sr.h,e),s=qs(Yn.s,Sr.s,e),r=qs(Yn.l,Sr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new Et;Et.NAMES=gu;let Bf=0;class oi extends ys{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=Fn(),this.name="",this.blending=wi,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xo,this.blendDst=Mo,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Et(0,0,0),this.blendAlpha=0,this.depthFunc=as,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xo&&(n.blendSrc=this.blendSrc),this.blendDst!==Mo&&(n.blendDst=this.blendDst),this.blendEquation!==xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==as&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Qe extends oi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new R,wr=new it;class xe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=il,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wr.fromBufferAttribute(this,e),wr.applyMatrix3(t),this.setXY(e,wr.x,wr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=mn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=mn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=mn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=mn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=mn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==il&&(t.usage=this.usage),t}}class vu extends xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class _u extends xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class le extends xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let zf=0;const en=new Jt,Ha=new we,Gi=new R,$e=new Ri,Ps=new Ri,Ee=new R;class ge extends ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(uu(t)?_u:vu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return Ha.lookAt(t),Ha.updateMatrix(),this.applyMatrix4(Ha.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new le(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ri);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Ps.setFromBufferAttribute(o),this.morphTargetsRelative?(Ee.addVectors($e.min,Ps.min),$e.expandByPoint(Ee),Ee.addVectors($e.max,Ps.max),$e.expandByPoint(Ee)):($e.expandByPoint(Ps.min),$e.expandByPoint(Ps.max))}$e.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ee));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)Ee.fromBufferAttribute(o,h),l&&(Gi.fromBufferAttribute(t,h),Ee.add(Gi)),s=Math.max(s,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new R,l[C]=new R;const h=new R,c=new R,u=new R,d=new it,p=new it,g=new it,v=new R,m=new R;function f(C,y,x){h.fromBufferAttribute(n,C),c.fromBufferAttribute(n,y),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,C),p.fromBufferAttribute(r,y),g.fromBufferAttribute(r,x),c.sub(h),u.sub(h),p.sub(d),g.sub(d);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(v.copy(c).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(P),m.copy(u).multiplyScalar(p.x).addScaledVector(c,-g.x).multiplyScalar(P),o[C].add(v),o[y].add(v),o[x].add(v),l[C].add(m),l[y].add(m),l[x].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let C=0,y=w.length;C<y;++C){const x=w[C],P=x.start,k=x.count;for(let I=P,N=P+k;I<N;I+=3)f(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const M=new R,_=new R,L=new R,T=new R;function E(C){L.fromBufferAttribute(s,C),T.copy(L);const y=o[C];M.copy(y),M.sub(L.multiplyScalar(L.dot(y))).normalize(),_.crossVectors(T,y);const P=_.dot(l[C])<0?-1:1;a.setXYZW(C,M.x,M.y,M.z,P)}for(let C=0,y=w.length;C<y;++C){const x=w[C],P=x.start,k=x.count;for(let I=P,N=P+k;I<N;I+=3)E(t.getX(I+0)),E(t.getX(I+1)),E(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new R,r=new R,a=new R,o=new R,l=new R,h=new R,c=new R,u=new R;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,m),o.add(c),l.add(c),h.add(c),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),n.setXYZ(d+0,c.x,c.y,c.z),n.setXYZ(d+1,c.x,c.y,c.z),n.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(o,l){const h=o.array,c=o.itemSize,u=o.normalized,d=new h.constructor(l.length*c);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*c;for(let f=0;f<c;f++)d[g++]=h[p++]}return new xe(d,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ge,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],h=t(l,n);e.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const l=[],h=r[o];for(let c=0,u=h.length;c<u;c++){const d=h[c],p=t(d,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let u=0,d=h.length;u<d;u++){const p=h[u];c.push(p.toJSON(t.data))}c.length>0&&(s[l]=c,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const h in s){const c=s[h];this.setAttribute(h,c.clone(e))}const r=t.morphAttributes;for(const h in r){const c=[],u=r[h];for(let d=0,p=u.length;d<p;d++)c.push(u[d].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,c=a.length;h<c;h++){const u=a[h];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ac=new Jt,ui=new pu,br=new Ci,Rc=new R,Tr=new R,Er=new R,Ar=new R,Ga=new R,Rr=new R,Cc=new R,Cr=new R;class at extends we{constructor(t=new ge,e=new Qe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Rr.set(0,0,0);for(let l=0,h=r.length;l<h;l++){const c=o[l],u=r[l];c!==0&&(Ga.fromBufferAttribute(u,t),a?Rr.addScaledVector(Ga,c):Rr.addScaledVector(Ga.sub(e),c))}e.add(Rr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(r),ui.copy(t.ray).recast(t.near),!(br.containsPoint(ui.origin)===!1&&(ui.intersectSphere(br,Rc)===null||ui.origin.distanceToSquared(Rc)>(t.far-t.near)**2))&&(Ac.copy(r).invert(),ui.copy(t.ray).applyMatrix4(Ac),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ui)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,h=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=a[m.materialIndex],w=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let _=w,L=M;_<L;_+=3){const T=o.getX(_),E=o.getX(_+1),C=o.getX(_+2);s=Pr(this,f,t,n,h,c,u,T,E,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const w=o.getX(m),M=o.getX(m+1),_=o.getX(m+2);s=Pr(this,a,t,n,h,c,u,w,M,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=a[m.materialIndex],w=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=w,L=M;_<L;_+=3){const T=_,E=_+1,C=_+2;s=Pr(this,f,t,n,h,c,u,T,E,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const w=m,M=m+1,_=m+2;s=Pr(this,a,t,n,h,c,u,w,M,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function kf(i,t,e,n,s,r,a,o){let l;if(t.side===ke?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ri,o),l===null)return null;Cr.copy(o),Cr.applyMatrix4(i.matrixWorld);const h=e.ray.origin.distanceTo(Cr);return h<e.near||h>e.far?null:{distance:h,point:Cr.clone(),object:i}}function Pr(i,t,e,n,s,r,a,o,l,h){i.getVertexPosition(o,Tr),i.getVertexPosition(l,Er),i.getVertexPosition(h,Ar);const c=kf(i,t,e,n,Tr,Er,Ar,Cc);if(c){const u=new R;sn.getBarycoord(Cc,Tr,Er,Ar,u),s&&(c.uv=sn.getInterpolatedAttribute(s,o,l,h,u,new it)),r&&(c.uv1=sn.getInterpolatedAttribute(r,o,l,h,u,new it)),a&&(c.normal=sn.getInterpolatedAttribute(a,o,l,h,u,new R),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const d={a:o,b:l,c:h,normal:new R,materialIndex:0};sn.getNormal(Tr,Er,Ar,d.normal),c.face=d,c.barycoord=u}return c}class oe extends ge{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],h=[],c=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new le(h,3)),this.setAttribute("normal",new le(c,3)),this.setAttribute("uv",new le(u,2));function g(v,m,f,w,M,_,L,T,E,C,y){const x=_/E,P=L/C,k=_/2,I=L/2,N=T/2,H=E+1,U=C+1;let Y=0,z=0;const Q=new R;for(let et=0;et<U;et++){const rt=et*P-I;for(let St=0;St<H;St++){const xt=St*x-k;Q[v]=xt*w,Q[m]=rt*M,Q[f]=N,h.push(Q.x,Q.y,Q.z),Q[v]=0,Q[m]=0,Q[f]=T>0?1:-1,c.push(Q.x,Q.y,Q.z),u.push(St/E),u.push(1-et/C),Y+=1}}for(let et=0;et<C;et++)for(let rt=0;rt<E;rt++){const St=d+rt+H*et,xt=d+rt+H*(et+1),G=d+(rt+1)+H*(et+1),J=d+(rt+1)+H*et;l.push(St,xt,J),l.push(xt,G,J),z+=6}o.addGroup(p,z,y),p+=z,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function us(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Oe(i){const t={};for(let e=0;e<i.length;e++){const n=us(i[e]);for(const s in n)t[s]=n[s]}return t}function Hf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function xu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const tr={clone:us,merge:Oe};var Gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Re extends oi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gf,this.fragmentShader=Vf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=us(t.uniforms),this.uniformsGroups=Hf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Mu extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=Dn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const $n=new R,Pc=new it,Lc=new it;class Ze extends Mu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=js*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Xs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return js*2*Math.atan(Math.tan(Xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,Pc,Lc),e.subVectors(Lc,Pc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Xs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/h,s*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Vi=-90,Wi=1;class Wf extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ze(Vi,Wi,t,e);s.layers=this.layers,this.add(s);const r=new Ze(Vi,Wi,t,e);r.layers=this.layers,this.add(r);const a=new Ze(Vi,Wi,t,e);a.layers=this.layers,this.add(a);const o=new Ze(Vi,Wi,t,e);o.layers=this.layers,this.add(o);const l=new Ze(Vi,Wi,t,e);l.layers=this.layers,this.add(l);const h=new Ze(Vi,Wi,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const h of e)this.remove(h);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ia)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,h,c]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,h),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,c),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class yu extends Ne{constructor(t,e,n,s,r,a,o,l,h,c){t=t!==void 0?t:[],e=e!==void 0?e:os,super(t,e,n,s,r,a,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Xf extends gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new yu(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:an}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new oe(5,5,5),r=new Re({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:Un});r.uniforms.tEquirect.value=e;const a=new at(s,r),o=e.minFilter;return e.minFilter===yi&&(e.minFilter=an),new Wf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Va=new R,qf=new R,Yf=new Vt;class vi{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Va.subVectors(n,e).cross(qf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Va),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Yf.getNormalMatrix(t),s=this.coplanarPoint(Va).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const di=new Ci,Lr=new R;class Il{constructor(t=new vi,e=new vi,n=new vi,s=new vi,r=new vi,a=new vi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],h=s[4],c=s[5],u=s[6],d=s[7],p=s[8],g=s[9],v=s[10],m=s[11],f=s[12],w=s[13],M=s[14],_=s[15];if(n[0].setComponents(l-r,d-h,m-p,_-f).normalize(),n[1].setComponents(l+r,d+h,m+p,_+f).normalize(),n[2].setComponents(l+a,d+c,m+g,_+w).normalize(),n[3].setComponents(l-a,d-c,m-g,_-w).normalize(),n[4].setComponents(l-o,d-u,m-v,_-M).normalize(),e===Dn)n[5].setComponents(l+o,d+u,m+v,_+M).normalize();else if(e===ia)n[5].setComponents(o,u,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(t){return di.center.set(0,0,0),di.radius=.7071067811865476,di.applyMatrix4(t.matrixWorld),this.intersectsSphere(di)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Lr.x=s.normal.x>0?t.max.x:t.min.x,Lr.y=s.normal.y>0?t.max.y:t.min.y,Lr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Su(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function $f(i){const t=new WeakMap;function e(o,l){const h=o.array,c=o.usage,u=h.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,h,c),o.onUploadCallback();let p;if(h instanceof Float32Array)p=i.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=i.SHORT;else if(h instanceof Uint32Array)p=i.UNSIGNED_INT;else if(h instanceof Int32Array)p=i.INT;else if(h instanceof Int8Array)p=i.BYTE;else if(h instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,h){const c=l.array,u=l.updateRanges;if(i.bindBuffer(h,o),u.length===0)i.bufferSubData(h,0,c);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const v=u[p];i.bufferSubData(h,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:s,remove:r,update:a}}class Ve extends ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),h=o+1,c=l+1,u=t/o,d=e/l,p=[],g=[],v=[],m=[];for(let f=0;f<c;f++){const w=f*d-a;for(let M=0;M<h;M++){const _=M*u-r;g.push(_,-w,0),v.push(0,0,1),m.push(M/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<o;w++){const M=w+h*f,_=w+h*(f+1),L=w+1+h*(f+1),T=w+1+h*f;p.push(M,_,T),p.push(_,L,T)}this.setIndex(p),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(v,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ve(t.width,t.height,t.widthSegments,t.heightSegments)}}var Kf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Qf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ep=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ip=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,sp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ap=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,op=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_p=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ep=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ap=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Up=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$p=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,em=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,am=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,om=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_m=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Em=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Lm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Dm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Im=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Um=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Om=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,km=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ym=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $m=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Km=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,e0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,n0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,i0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,r0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,o0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,l0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,c0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,f0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,m0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,g0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,x0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,E0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,A0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xt={alphahash_fragment:Kf,alphahash_pars_fragment:Zf,alphamap_fragment:Qf,alphamap_pars_fragment:Jf,alphatest_fragment:jf,alphatest_pars_fragment:tp,aomap_fragment:ep,aomap_pars_fragment:np,batching_pars_vertex:ip,batching_vertex:sp,begin_vertex:rp,beginnormal_vertex:ap,bsdfs:op,iridescence_fragment:lp,bumpmap_pars_fragment:cp,clipping_planes_fragment:hp,clipping_planes_pars_fragment:up,clipping_planes_pars_vertex:dp,clipping_planes_vertex:fp,color_fragment:pp,color_pars_fragment:mp,color_pars_vertex:gp,color_vertex:vp,common:_p,cube_uv_reflection_fragment:xp,defaultnormal_vertex:Mp,displacementmap_pars_vertex:yp,displacementmap_vertex:Sp,emissivemap_fragment:wp,emissivemap_pars_fragment:bp,colorspace_fragment:Tp,colorspace_pars_fragment:Ep,envmap_fragment:Ap,envmap_common_pars_fragment:Rp,envmap_pars_fragment:Cp,envmap_pars_vertex:Pp,envmap_physical_pars_fragment:Hp,envmap_vertex:Lp,fog_vertex:Dp,fog_pars_vertex:Ip,fog_fragment:Up,fog_pars_fragment:Np,gradientmap_pars_fragment:Fp,lightmap_pars_fragment:Op,lights_lambert_fragment:Bp,lights_lambert_pars_fragment:zp,lights_pars_begin:kp,lights_toon_fragment:Gp,lights_toon_pars_fragment:Vp,lights_phong_fragment:Wp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:Yp,lights_fragment_begin:$p,lights_fragment_maps:Kp,lights_fragment_end:Zp,logdepthbuf_fragment:Qp,logdepthbuf_pars_fragment:Jp,logdepthbuf_pars_vertex:jp,logdepthbuf_vertex:tm,map_fragment:em,map_pars_fragment:nm,map_particle_fragment:im,map_particle_pars_fragment:sm,metalnessmap_fragment:rm,metalnessmap_pars_fragment:am,morphinstance_vertex:om,morphcolor_vertex:lm,morphnormal_vertex:cm,morphtarget_pars_vertex:hm,morphtarget_vertex:um,normal_fragment_begin:dm,normal_fragment_maps:fm,normal_pars_fragment:pm,normal_pars_vertex:mm,normal_vertex:gm,normalmap_pars_fragment:vm,clearcoat_normal_fragment_begin:_m,clearcoat_normal_fragment_maps:xm,clearcoat_pars_fragment:Mm,iridescence_pars_fragment:ym,opaque_fragment:Sm,packing:wm,premultiplied_alpha_fragment:bm,project_vertex:Tm,dithering_fragment:Em,dithering_pars_fragment:Am,roughnessmap_fragment:Rm,roughnessmap_pars_fragment:Cm,shadowmap_pars_fragment:Pm,shadowmap_pars_vertex:Lm,shadowmap_vertex:Dm,shadowmask_pars_fragment:Im,skinbase_vertex:Um,skinning_pars_vertex:Nm,skinning_vertex:Fm,skinnormal_vertex:Om,specularmap_fragment:Bm,specularmap_pars_fragment:zm,tonemapping_fragment:km,tonemapping_pars_fragment:Hm,transmission_fragment:Gm,transmission_pars_fragment:Vm,uv_pars_fragment:Wm,uv_pars_vertex:Xm,uv_vertex:qm,worldpos_vertex:Ym,background_vert:$m,background_frag:Km,backgroundCube_vert:Zm,backgroundCube_frag:Qm,cube_vert:Jm,cube_frag:jm,depth_vert:t0,depth_frag:e0,distanceRGBA_vert:n0,distanceRGBA_frag:i0,equirect_vert:s0,equirect_frag:r0,linedashed_vert:a0,linedashed_frag:o0,meshbasic_vert:l0,meshbasic_frag:c0,meshlambert_vert:h0,meshlambert_frag:u0,meshmatcap_vert:d0,meshmatcap_frag:f0,meshnormal_vert:p0,meshnormal_frag:m0,meshphong_vert:g0,meshphong_frag:v0,meshphysical_vert:_0,meshphysical_frag:x0,meshtoon_vert:M0,meshtoon_frag:y0,points_vert:S0,points_frag:w0,shadow_vert:b0,shadow_frag:T0,sprite_vert:E0,sprite_frag:A0},ut={common:{diffuse:{value:new Et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Et(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},xn={basic:{uniforms:Oe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Oe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Et(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Oe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Et(0)},specular:{value:new Et(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Oe([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Oe([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Et(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Oe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Oe([ut.points,ut.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Oe([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Oe([ut.common,ut.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Oe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Oe([ut.sprite,ut.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:Oe([ut.common,ut.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:Oe([ut.lights,ut.fog,{color:{value:new Et(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};xn.physical={uniforms:Oe([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Et(0)},specularColor:{value:new Et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const Dr={r:0,b:0,g:0},fi=new on,R0=new Jt;function C0(i,t,e,n,s,r,a){const o=new Et(0);let l=r===!0?0:1,h,c,u=null,d=0,p=null;function g(w){let M=w.isScene===!0?w.background:null;return M&&M.isTexture&&(M=(w.backgroundBlurriness>0?e:t).get(M)),M}function v(w){let M=!1;const _=g(w);_===null?f(o,l):_&&_.isColor&&(f(_,1),M=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(w,M){const _=g(M);_&&(_.isCubeTexture||_.mapping===pa)?(c===void 0&&(c=new at(new oe(1,1,1),new Re({name:"BackgroundCubeMaterial",uniforms:us(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(L,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),fi.copy(M.backgroundRotation),fi.x*=-1,fi.y*=-1,fi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),c.material.uniforms.envMap.value=_,c.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(R0.makeRotationFromEuler(fi)),c.material.toneMapped=$t.getTransfer(_.colorSpace)!==re,(u!==_||d!==_.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,p=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(h===void 0&&(h=new at(new Ve(2,2),new Re({name:"BackgroundMaterial",uniforms:us(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=_,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.toneMapped=$t.getTransfer(_.colorSpace)!==re,_.matrixAutoUpdate===!0&&_.updateMatrix(),h.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,p=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null))}function f(w,M){w.getRGB(Dr,xu(i)),n.buffers.color.setClear(Dr.r,Dr.g,Dr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(w,M=1){o.set(w),l=M,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(o,l)},render:v,addToRenderList:m}}function P0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(x,P,k,I,N){let H=!1;const U=u(I,k,P);r!==U&&(r=U,h(r.object)),H=p(x,I,k,N),H&&g(x,I,k,N),N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,_(x,P,k,I),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function l(){return i.createVertexArray()}function h(x){return i.bindVertexArray(x)}function c(x){return i.deleteVertexArray(x)}function u(x,P,k){const I=k.wireframe===!0;let N=n[x.id];N===void 0&&(N={},n[x.id]=N);let H=N[P.id];H===void 0&&(H={},N[P.id]=H);let U=H[I];return U===void 0&&(U=d(l()),H[I]=U),U}function d(x){const P=[],k=[],I=[];for(let N=0;N<e;N++)P[N]=0,k[N]=0,I[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:I,object:x,attributes:{},index:null}}function p(x,P,k,I){const N=r.attributes,H=P.attributes;let U=0;const Y=k.getAttributes();for(const z in Y)if(Y[z].location>=0){const et=N[z];let rt=H[z];if(rt===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(rt=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(rt=x.instanceColor)),et===void 0||et.attribute!==rt||rt&&et.data!==rt.data)return!0;U++}return r.attributesNum!==U||r.index!==I}function g(x,P,k,I){const N={},H=P.attributes;let U=0;const Y=k.getAttributes();for(const z in Y)if(Y[z].location>=0){let et=H[z];et===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(et=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(et=x.instanceColor));const rt={};rt.attribute=et,et&&et.data&&(rt.data=et.data),N[z]=rt,U++}r.attributes=N,r.attributesNum=U,r.index=I}function v(){const x=r.newAttributes;for(let P=0,k=x.length;P<k;P++)x[P]=0}function m(x){f(x,0)}function f(x,P){const k=r.newAttributes,I=r.enabledAttributes,N=r.attributeDivisors;k[x]=1,I[x]===0&&(i.enableVertexAttribArray(x),I[x]=1),N[x]!==P&&(i.vertexAttribDivisor(x,P),N[x]=P)}function w(){const x=r.newAttributes,P=r.enabledAttributes;for(let k=0,I=P.length;k<I;k++)P[k]!==x[k]&&(i.disableVertexAttribArray(k),P[k]=0)}function M(x,P,k,I,N,H,U){U===!0?i.vertexAttribIPointer(x,P,k,N,H):i.vertexAttribPointer(x,P,k,I,N,H)}function _(x,P,k,I){v();const N=I.attributes,H=k.getAttributes(),U=P.defaultAttributeValues;for(const Y in H){const z=H[Y];if(z.location>=0){let Q=N[Y];if(Q===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(Q=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(Q=x.instanceColor)),Q!==void 0){const et=Q.normalized,rt=Q.itemSize,St=t.get(Q);if(St===void 0)continue;const xt=St.buffer,G=St.type,J=St.bytesPerElement,lt=G===i.INT||G===i.UNSIGNED_INT||Q.gpuType===Tl;if(Q.isInterleavedBufferAttribute){const ht=Q.data,yt=ht.stride,Pt=Q.offset;if(ht.isInstancedInterleavedBuffer){for(let st=0;st<z.locationSize;st++)f(z.location+st,ht.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let st=0;st<z.locationSize;st++)m(z.location+st);i.bindBuffer(i.ARRAY_BUFFER,xt);for(let st=0;st<z.locationSize;st++)M(z.location+st,rt/z.locationSize,G,et,yt*J,(Pt+rt/z.locationSize*st)*J,lt)}else{if(Q.isInstancedBufferAttribute){for(let ht=0;ht<z.locationSize;ht++)f(z.location+ht,Q.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ht=0;ht<z.locationSize;ht++)m(z.location+ht);i.bindBuffer(i.ARRAY_BUFFER,xt);for(let ht=0;ht<z.locationSize;ht++)M(z.location+ht,rt/z.locationSize,G,et,rt*J,rt/z.locationSize*ht*J,lt)}}else if(U!==void 0){const et=U[Y];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(z.location,et);break;case 3:i.vertexAttrib3fv(z.location,et);break;case 4:i.vertexAttrib4fv(z.location,et);break;default:i.vertexAttrib1fv(z.location,et)}}}}w()}function L(){C();for(const x in n){const P=n[x];for(const k in P){const I=P[k];for(const N in I)c(I[N].object),delete I[N];delete P[k]}delete n[x]}}function T(x){if(n[x.id]===void 0)return;const P=n[x.id];for(const k in P){const I=P[k];for(const N in I)c(I[N].object),delete I[N];delete P[k]}delete n[x.id]}function E(x){for(const P in n){const k=n[P];if(k[x.id]===void 0)continue;const I=k[x.id];for(const N in I)c(I[N].object),delete I[N];delete k[x.id]}}function C(){y(),a=!0,r!==s&&(r=s,h(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:y,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:w}}function L0(i,t,e){let n;function s(h){n=h}function r(h,c){i.drawArrays(n,h,c),e.update(c,n,1)}function a(h,c,u){u!==0&&(i.drawArraysInstanced(n,h,c,u),e.update(c,n,u))}function o(h,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,c,0,u);let p=0;for(let g=0;g<u;g++)p+=c[g];e.update(p,n,1)}function l(h,c,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<h.length;g++)a(h[g],c[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,h,0,c,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=c[v]*d[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function D0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==Je&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const C=E===Nn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==vn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==yn&&!C)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:L,maxSamples:T}}function I0(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new vi,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=c(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?c(null):h();else{const w=r?0:n,M=w*4;let _=f.clippingState||null;l.value=_,_=c(g,d,M,p);for(let L=0;L!==M;++L)_[L]=e[L];f.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function c(u,d,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const f=p+v*4,w=d.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,_=p;M!==v;++M,_+=4)a.copy(u[M]).applyMatrix4(w,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function U0(i){let t=new WeakMap;function e(a,o){return o===Ro?a.mapping=os:o===Co&&(a.mapping=ls),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ro||o===Co)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new Xf(l.height);return h.fromEquirectangularTexture(i,a),t.set(a,h),a.addEventListener("dispose",s),e(h.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Ul extends Mu{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ji=4,Dc=[.125,.215,.35,.446,.526,.582],Mi=20,Wa=new Ul,Ic=new Et;let Xa=null,qa=0,Ya=0,$a=!1;const _i=(1+Math.sqrt(5))/2,Xi=1/_i,Uc=[new R(-_i,Xi,0),new R(_i,Xi,0),new R(-Xi,0,_i),new R(Xi,0,_i),new R(0,_i,-Xi),new R(0,_i,Xi),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class sl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Xa=this._renderer.getRenderTarget(),qa=this._renderer.getActiveCubeFace(),Ya=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Oc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Xa,qa,Ya),this._renderer.xr.enabled=$a,t.scissorTest=!1,Ir(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===os||t.mapping===ls?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Xa=this._renderer.getRenderTarget(),qa=this._renderer.getActiveCubeFace(),Ya=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:Nn,format:Je,colorSpace:Ms,depthBuffer:!1},s=Nc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=N0(r)),this._blurMaterial=F0(r,t,e)}return s}_compileMaterial(t){const e=new at(this._lodPlanes[0],t);this._renderer.compile(e,Wa)}_sceneToCubeUV(t,e,n,s){const o=new Ze(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,d=c.toneMapping;c.getClearColor(Ic),c.toneMapping=ni,c.autoClear=!1;const p=new Qe({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),g=new at(new oe,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(Ic),v=!0);for(let f=0;f<6;f++){const w=f%3;w===0?(o.up.set(0,l[f],0),o.lookAt(h[f],0,0)):w===1?(o.up.set(0,0,l[f]),o.lookAt(0,h[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,h[f]));const M=this._cubeSize;Ir(s,w*M,f>2?M:0,M,M),c.setRenderTarget(s),v&&c.render(g,o),c.render(t,o)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=d,c.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===os||t.mapping===ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Oc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new at(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ir(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Wa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Uc[(s-r-1)%Uc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new at(this._lodPlanes[s],h),d=h.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Mi-1),v=r/g,m=isFinite(r)?1+Math.floor(c*v):Mi;m>Mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Mi}`);const f=[];let w=0;for(let E=0;E<Mi;++E){const C=E/v,y=Math.exp(-C*C/2);f.push(y),E===0?w+=y:E<m&&(w+=2*y)}for(let E=0;E<f.length;E++)f[E]=f[E]/w;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const _=this._sizeLods[s],L=3*_*(s>M-Ji?s-M+Ji:0),T=4*(this._cubeSize-_);Ir(e,L,T,3*_,2*_),l.setRenderTarget(e),l.render(u,Wa)}}function N0(i){const t=[],e=[],n=[];let s=i;const r=i-Ji+1+Dc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ji?l=Dc[a-i+Ji-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),c=-h,u=1+h,d=[c,c,u,c,u,u,c,c,u,u,c,u],p=6,g=6,v=3,m=2,f=1,w=new Float32Array(v*g*p),M=new Float32Array(m*g*p),_=new Float32Array(f*g*p);for(let T=0;T<p;T++){const E=T%3*2/3-1,C=T>2?0:-1,y=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];w.set(y,v*g*T),M.set(d,m*g*T);const x=[T,T,T,T,T,T];_.set(x,f*g*T)}const L=new ge;L.setAttribute("position",new xe(w,v)),L.setAttribute("uv",new xe(M,m)),L.setAttribute("faceIndex",new xe(_,f)),t.push(L),s>Ji&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Nc(i,t,e){const n=new gn(i,t,e);return n.texture.mapping=pa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ir(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function F0(i,t,e){const n=new Float32Array(Mi),s=new R(0,1,0);return new Re({name:"SphericalGaussianBlur",defines:{n:Mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Fc(){return new Re({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Oc(){return new Re({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Nl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function O0(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===Ro||l===Co,c=l===os||l===ls;if(h||c){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new sl(i)),u=h?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return h&&p&&p.height>0||c&&p&&s(p)?(e===null&&(e=new sl(i)),u=h?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function r(o){const l=o.target;l.removeEventListener("dispose",r);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function B0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Gs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function z0(i,t,e,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,f=v.length;m<f;m++)t.remove(v[m])}d.removeEventListener("dispose",a),delete s[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const v=p[g];for(let m=0,f=v.length;m<f;m++)t.update(v[m],i.ARRAY_BUFFER)}}function h(u){const d=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const w=p.array;v=p.version;for(let M=0,_=w.length;M<_;M+=3){const L=w[M+0],T=w[M+1],E=w[M+2];d.push(L,T,T,E,E,L)}}else if(g!==void 0){const w=g.array;v=g.version;for(let M=0,_=w.length/3-1;M<_;M+=3){const L=M+0,T=M+1,E=M+2;d.push(L,T,T,E,E,L)}}else return;const m=new(uu(d)?_u:vu)(d,1);m.version=v;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function c(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&h(u)}else h(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:c}}function k0(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){i.drawElements(n,p,r,d*a),e.update(p,n,1)}function h(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*a,g),e.update(p,n,g))}function c(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)h(d[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,v,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*v[w];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function H0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function G0(i,t,e){const n=new WeakMap,s=new Qt;function r(a,o,l){const h=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let y=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",y)};d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),g===!0&&(M=2),v===!0&&(M=3);let _=o.attributes.position.count*M,L=1;_>t.maxTextureSize&&(L=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const T=new Float32Array(_*L*4*u),E=new fu(T,_,L,u);E.type=yn,E.needsUpdate=!0;const C=M*4;for(let x=0;x<u;x++){const P=m[x],k=f[x],I=w[x],N=_*L*4*x;for(let H=0;H<P.count;H++){const U=H*C;p===!0&&(s.fromBufferAttribute(P,H),T[N+U+0]=s.x,T[N+U+1]=s.y,T[N+U+2]=s.z,T[N+U+3]=0),g===!0&&(s.fromBufferAttribute(k,H),T[N+U+4]=s.x,T[N+U+5]=s.y,T[N+U+6]=s.z,T[N+U+7]=0),v===!0&&(s.fromBufferAttribute(I,H),T[N+U+8]=s.x,T[N+U+9]=s.y,T[N+U+10]=s.z,T[N+U+11]=I.itemSize===4?s.w:1)}}d={count:u,texture:E,size:new it(_,L)},n.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let v=0;v<h.length;v++)p+=h[v];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",h)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function V0(i,t,e,n){let s=new WeakMap;function r(l){const h=n.render.frame,c=l.geometry,u=t.get(l,c);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==h&&(d.update(),s.set(d,h))}return u}function a(){s=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:a}}class wu extends Ne{constructor(t,e,n,s,r,a,o,l,h,c=es){if(c!==es&&c!==hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===es&&(n=zn),n===void 0&&c===hs&&(n=cs),super(null,s,r,a,o,l,c,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:He,this.minFilter=l!==void 0?l:He,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const bu=new Ne,Bc=new wu(1,1),Tu=new fu,Eu=new Pf,Au=new yu,zc=[],kc=[],Hc=new Float32Array(16),Gc=new Float32Array(9),Vc=new Float32Array(4);function Ss(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=zc[s];if(r===void 0&&(r=new Float32Array(s),zc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ga(i,t){let e=kc[t];e===void 0&&(e=new Int32Array(t),kc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function W0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function X0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function q0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function Y0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function $0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(be(e,n))return;Vc.set(n),i.uniformMatrix2fv(this.addr,!1,Vc),Te(e,n)}}function K0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(be(e,n))return;Gc.set(n),i.uniformMatrix3fv(this.addr,!1,Gc),Te(e,n)}}function Z0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(be(e,n))return;Hc.set(n),i.uniformMatrix4fv(this.addr,!1,Hc),Te(e,n)}}function Q0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function J0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function j0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function tg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function eg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function ig(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function sg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function rg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Bc.compareFunction=hu,r=Bc):r=bu,e.setTexture2D(t||r,s)}function ag(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Eu,s)}function og(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Au,s)}function lg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Tu,s)}function cg(i){switch(i){case 5126:return W0;case 35664:return X0;case 35665:return q0;case 35666:return Y0;case 35674:return $0;case 35675:return K0;case 35676:return Z0;case 5124:case 35670:return Q0;case 35667:case 35671:return J0;case 35668:case 35672:return j0;case 35669:case 35673:return tg;case 5125:return eg;case 36294:return ng;case 36295:return ig;case 36296:return sg;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return ag;case 35680:case 36300:case 36308:case 36293:return og;case 36289:case 36303:case 36311:case 36292:return lg}}function hg(i,t){i.uniform1fv(this.addr,t)}function ug(i,t){const e=Ss(t,this.size,2);i.uniform2fv(this.addr,e)}function dg(i,t){const e=Ss(t,this.size,3);i.uniform3fv(this.addr,e)}function fg(i,t){const e=Ss(t,this.size,4);i.uniform4fv(this.addr,e)}function pg(i,t){const e=Ss(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function mg(i,t){const e=Ss(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function gg(i,t){const e=Ss(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function vg(i,t){i.uniform1iv(this.addr,t)}function _g(i,t){i.uniform2iv(this.addr,t)}function xg(i,t){i.uniform3iv(this.addr,t)}function Mg(i,t){i.uniform4iv(this.addr,t)}function yg(i,t){i.uniform1uiv(this.addr,t)}function Sg(i,t){i.uniform2uiv(this.addr,t)}function wg(i,t){i.uniform3uiv(this.addr,t)}function bg(i,t){i.uniform4uiv(this.addr,t)}function Tg(i,t,e){const n=this.cache,s=t.length,r=ga(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||bu,r[a])}function Eg(i,t,e){const n=this.cache,s=t.length,r=ga(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Eu,r[a])}function Ag(i,t,e){const n=this.cache,s=t.length,r=ga(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Au,r[a])}function Rg(i,t,e){const n=this.cache,s=t.length,r=ga(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Tu,r[a])}function Cg(i){switch(i){case 5126:return hg;case 35664:return ug;case 35665:return dg;case 35666:return fg;case 35674:return pg;case 35675:return mg;case 35676:return gg;case 5124:case 35670:return vg;case 35667:case 35671:return _g;case 35668:case 35672:return xg;case 35669:case 35673:return Mg;case 5125:return yg;case 36294:return Sg;case 36295:return wg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Tg;case 35679:case 36299:case 36307:return Eg;case 35680:case 36300:case 36308:case 36293:return Ag;case 36289:case 36303:case 36311:case 36292:return Rg}}class Pg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=cg(e.type)}}class Lg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Cg(e.type)}}class Dg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ka=/(\w+)(\])?(\[|\.)?/g;function Wc(i,t){i.seq.push(t),i.map[t.id]=t}function Ig(i,t,e){const n=i.name,s=n.length;for(Ka.lastIndex=0;;){const r=Ka.exec(n),a=Ka.lastIndex;let o=r[1];const l=r[2]==="]",h=r[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===s){Wc(e,h===void 0?new Pg(o,i,t):new Lg(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Dg(o),Wc(e,u)),e=u}}}class ta{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Ig(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Xc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Ug=37297;let Ng=0;function Fg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const qc=new Vt;function Og(i){$t._getMatrix(qc,$t.workingColorSpace,i);const t=`mat3( ${qc.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case ma:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Yc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Fg(i.getShaderSource(t),a)}else return s}function Bg(i,t){const e=Og(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function zg(i,t){let e;switch(t){case $h:e="Linear";break;case Kh:e="Reinhard";break;case Zh:e="Cineon";break;case bl:e="ACESFilmic";break;case Qh:e="AgX";break;case Jh:e="Neutral";break;case $d:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ur=new R;function kg(){$t.getLuminanceCoefficients(Ur);const i=Ur.x.toFixed(4),t=Ur.y.toFixed(4),e=Ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Hg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vs).join(`
`)}function Gg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Vg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Vs(i){return i!==""}function $c(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Wg=/^[ \t]*#include +<([\w\d./]+)>/gm;function rl(i){return i.replace(Wg,qg)}const Xg=new Map;function qg(i,t){let e=Xt[t];if(e===void 0){const n=Xg.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return rl(e)}const Yg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zc(i){return i.replace(Yg,$g)}function $g(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Kg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===qh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Yh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ln&&(t="SHADOWMAP_TYPE_VSM"),t}function Zg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case os:case ls:t="ENVMAP_TYPE_CUBE";break;case pa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Qg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ls:t="ENVMAP_MODE_REFRACTION";break}return t}function Jg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case wl:t="ENVMAP_BLENDING_MULTIPLY";break;case qd:t="ENVMAP_BLENDING_MIX";break;case Yd:t="ENVMAP_BLENDING_ADD";break}return t}function jg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function tv(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Kg(e),h=Zg(e),c=Qg(e),u=Jg(e),d=jg(e),p=Hg(e),g=Gg(r),v=s.createProgram();let m,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vs).join(`
`),f.length>0&&(f+=`
`)):(m=[Qc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vs).join(`
`),f=[Qc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ni?"#define TONE_MAPPING":"",e.toneMapping!==ni?Xt.tonemapping_pars_fragment:"",e.toneMapping!==ni?zg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,Bg("linearToOutputTexel",e.outputColorSpace),kg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Vs).join(`
`)),a=rl(a),a=$c(a,e),a=Kc(a,e),o=rl(o),o=$c(o,e),o=Kc(o,e),a=Zc(a),o=Zc(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===na?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===na?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=w+m+a,_=w+f+o,L=Xc(s,s.VERTEX_SHADER,M),T=Xc(s,s.FRAGMENT_SHADER,_);s.attachShader(v,L),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function E(P){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(v).trim(),I=s.getShaderInfoLog(L).trim(),N=s.getShaderInfoLog(T).trim();let H=!0,U=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,L,T);else{const Y=Yc(s,L,"vertex"),z=Yc(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+Y+`
`+z)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(I===""||N==="")&&(U=!1);U&&(P.diagnostics={runnable:H,programLog:k,vertexShader:{log:I,prefix:m},fragmentShader:{log:N,prefix:f}})}s.deleteShader(L),s.deleteShader(T),C=new ta(s,v),y=Vg(s,v)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let y;this.getAttributes=function(){return y===void 0&&E(this),y};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,Ug)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ng++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=T,this}let ev=0;class nv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new iv(t),e.set(t,n)),n}}class iv{constructor(t){this.id=ev++,this.code=t,this.usedTimes=0}}function sv(i,t,e,n,s,r,a){const o=new mu,l=new nv,h=new Set,c=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return h.add(y),y===0?"uv":`uv${y}`}function m(y,x,P,k,I){const N=k.fog,H=I.geometry,U=y.isMeshStandardMaterial?k.environment:null,Y=(y.isMeshStandardMaterial?e:t).get(y.envMap||U),z=Y&&Y.mapping===pa?Y.image.height:null,Q=g[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const et=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,rt=et!==void 0?et.length:0;let St=0;H.morphAttributes.position!==void 0&&(St=1),H.morphAttributes.normal!==void 0&&(St=2),H.morphAttributes.color!==void 0&&(St=3);let xt,G,J,lt;if(Q){const se=xn[Q];xt=se.vertexShader,G=se.fragmentShader}else xt=y.vertexShader,G=y.fragmentShader,l.update(y),J=l.getVertexShaderID(y),lt=l.getFragmentShaderID(y);const ht=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Pt=I.isInstancedMesh===!0,st=I.isBatchedMesh===!0,Mt=!!y.map,q=!!y.matcap,K=!!Y,D=!!y.aoMap,zt=!!y.lightMap,Ut=!!y.bumpMap,Ft=!!y.normalMap,_t=!!y.displacementMap,ie=!!y.emissiveMap,Nt=!!y.metalnessMap,A=!!y.roughnessMap,S=y.anisotropy>0,V=y.clearcoat>0,j=y.dispersion>0,nt=y.iridescence>0,Z=y.sheen>0,Lt=y.transmission>0,pt=S&&!!y.anisotropyMap,wt=V&&!!y.clearcoatMap,Kt=V&&!!y.clearcoatNormalMap,ot=V&&!!y.clearcoatRoughnessMap,bt=nt&&!!y.iridescenceMap,Ot=nt&&!!y.iridescenceThicknessMap,Bt=Z&&!!y.sheenColorMap,Tt=Z&&!!y.sheenRoughnessMap,Yt=!!y.specularMap,Wt=!!y.specularColorMap,ce=!!y.specularIntensityMap,F=Lt&&!!y.transmissionMap,ft=Lt&&!!y.thicknessMap,$=!!y.gradientMap,tt=!!y.alphaMap,vt=y.alphaTest>0,mt=!!y.alphaHash,Ht=!!y.extensions;let ve=ni;y.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(ve=i.toneMapping);const De={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:xt,fragmentShader:G,defines:y.defines,customVertexShaderID:J,customFragmentShaderID:lt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:st,batchingColor:st&&I._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&I.instanceColor!==null,instancingMorph:Pt&&I.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ht===null?i.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Ms,alphaToCoverage:!!y.alphaToCoverage,map:Mt,matcap:q,envMap:K,envMapMode:K&&Y.mapping,envMapCubeUVHeight:z,aoMap:D,lightMap:zt,bumpMap:Ut,normalMap:Ft,displacementMap:d&&_t,emissiveMap:ie,normalMapObjectSpace:Ft&&y.normalMapType===Qd,normalMapTangentSpace:Ft&&y.normalMapType===Ll,metalnessMap:Nt,roughnessMap:A,anisotropy:S,anisotropyMap:pt,clearcoat:V,clearcoatMap:wt,clearcoatNormalMap:Kt,clearcoatRoughnessMap:ot,dispersion:j,iridescence:nt,iridescenceMap:bt,iridescenceThicknessMap:Ot,sheen:Z,sheenColorMap:Bt,sheenRoughnessMap:Tt,specularMap:Yt,specularColorMap:Wt,specularIntensityMap:ce,transmission:Lt,transmissionMap:F,thicknessMap:ft,gradientMap:$,opaque:y.transparent===!1&&y.blending===wi&&y.alphaToCoverage===!1,alphaMap:tt,alphaTest:vt,alphaHash:mt,combine:y.combine,mapUv:Mt&&v(y.map.channel),aoMapUv:D&&v(y.aoMap.channel),lightMapUv:zt&&v(y.lightMap.channel),bumpMapUv:Ut&&v(y.bumpMap.channel),normalMapUv:Ft&&v(y.normalMap.channel),displacementMapUv:_t&&v(y.displacementMap.channel),emissiveMapUv:ie&&v(y.emissiveMap.channel),metalnessMapUv:Nt&&v(y.metalnessMap.channel),roughnessMapUv:A&&v(y.roughnessMap.channel),anisotropyMapUv:pt&&v(y.anisotropyMap.channel),clearcoatMapUv:wt&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&v(y.sheenRoughnessMap.channel),specularMapUv:Yt&&v(y.specularMap.channel),specularColorMapUv:Wt&&v(y.specularColorMap.channel),specularIntensityMapUv:ce&&v(y.specularIntensityMap.channel),transmissionMapUv:F&&v(y.transmissionMap.channel),thicknessMapUv:ft&&v(y.thicknessMap.channel),alphaMapUv:tt&&v(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Ft||S),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!H.attributes.uv&&(Mt||tt),fog:!!N,useFog:y.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:yt,skinning:I.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:St,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ve,decodeVideoTexture:Mt&&y.map.isVideoTexture===!0&&$t.getTransfer(y.map.colorSpace)===re,decodeVideoTextureEmissive:ie&&y.emissiveMap.isVideoTexture===!0&&$t.getTransfer(y.emissiveMap.colorSpace)===re,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===fn,flipSided:y.side===ke,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ht&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&y.extensions.multiDraw===!0||st)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return De.vertexUv1s=h.has(1),De.vertexUv2s=h.has(2),De.vertexUv3s=h.has(3),h.clear(),De}function f(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)x.push(P),x.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(w(x,y),M(x,y),x.push(i.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function w(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function M(y,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),y.push(o.mask)}function _(y){const x=g[y.type];let P;if(x){const k=xn[x];P=tr.clone(k.uniforms)}else P=y.uniforms;return P}function L(y,x){let P;for(let k=0,I=c.length;k<I;k++){const N=c[k];if(N.cacheKey===x){P=N,++P.usedTimes;break}}return P===void 0&&(P=new tv(i,x,y,r),c.push(P)),P}function T(y){if(--y.usedTimes===0){const x=c.indexOf(y);c[x]=c[c.length-1],c.pop(),y.destroy()}}function E(y){l.remove(y)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:_,acquireProgram:L,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:C}}function rv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function av(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Jc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function jc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,d,p,g,v,m){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=v,f.group=m),t++,f}function o(u,d,p,g,v,m){const f=a(u,d,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(u,d,p,g,v,m){const f=a(u,d,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function h(u,d){e.length>1&&e.sort(u||av),n.length>1&&n.sort(d||Jc),s.length>1&&s.sort(d||Jc)}function c(){for(let u=t,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:c,sort:h}}function ov(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new jc,i.set(n,[a])):s>=r.length?(a=new jc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function lv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new Et};break;case"SpotLight":e={position:new R,direction:new R,color:new Et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Et,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Et,groundColor:new Et};break;case"RectAreaLight":e={color:new Et,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function cv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let hv=0;function uv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function dv(i){const t=new lv,e=cv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new R);const s=new R,r=new Jt,a=new Jt;function o(h){let c=0,u=0,d=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,w=0,M=0,_=0,L=0,T=0,E=0;h.sort(uv);for(let y=0,x=h.length;y<x;y++){const P=h[y],k=P.color,I=P.intensity,N=P.distance,H=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)c+=k.r*I,u+=k.g*I,d+=k.b*I;else if(P.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(P.sh.coefficients[U],I);E++}else if(P.isDirectionalLight){const U=t.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Y=P.shadow,z=e.get(P);z.shadowIntensity=Y.intensity,z.shadowBias=Y.bias,z.shadowNormalBias=Y.normalBias,z.shadowRadius=Y.radius,z.shadowMapSize=Y.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=H,n.directionalShadowMatrix[p]=P.shadow.matrix,w++}n.directional[p]=U,p++}else if(P.isSpotLight){const U=t.get(P);U.position.setFromMatrixPosition(P.matrixWorld),U.color.copy(k).multiplyScalar(I),U.distance=N,U.coneCos=Math.cos(P.angle),U.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),U.decay=P.decay,n.spot[v]=U;const Y=P.shadow;if(P.map&&(n.spotLightMap[L]=P.map,L++,Y.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[v]=Y.matrix,P.castShadow){const z=e.get(P);z.shadowIntensity=Y.intensity,z.shadowBias=Y.bias,z.shadowNormalBias=Y.normalBias,z.shadowRadius=Y.radius,z.shadowMapSize=Y.mapSize,n.spotShadow[v]=z,n.spotShadowMap[v]=H,_++}v++}else if(P.isRectAreaLight){const U=t.get(P);U.color.copy(k).multiplyScalar(I),U.halfWidth.set(P.width*.5,0,0),U.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=U,m++}else if(P.isPointLight){const U=t.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),U.distance=P.distance,U.decay=P.decay,P.castShadow){const Y=P.shadow,z=e.get(P);z.shadowIntensity=Y.intensity,z.shadowBias=Y.bias,z.shadowNormalBias=Y.normalBias,z.shadowRadius=Y.radius,z.shadowMapSize=Y.mapSize,z.shadowCameraNear=Y.camera.near,z.shadowCameraFar=Y.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=U,g++}else if(P.isHemisphereLight){const U=t.get(P);U.skyColor.copy(P.color).multiplyScalar(I),U.groundColor.copy(P.groundColor).multiplyScalar(I),n.hemi[f]=U,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=u,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==v||C.rectAreaLength!==m||C.hemiLength!==f||C.numDirectionalShadows!==w||C.numPointShadows!==M||C.numSpotShadows!==_||C.numSpotMaps!==L||C.numLightProbes!==E)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+L-T,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,C.directionalLength=p,C.pointLength=g,C.spotLength=v,C.rectAreaLength=m,C.hemiLength=f,C.numDirectionalShadows=w,C.numPointShadows=M,C.numSpotShadows=_,C.numSpotMaps=L,C.numLightProbes=E,n.version=hv++)}function l(h,c){let u=0,d=0,p=0,g=0,v=0;const m=c.matrixWorldInverse;for(let f=0,w=h.length;f<w;f++){const M=h[f];if(M.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(M.isSpotLight){const _=n.spot[p];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function th(i){const t=new dv(i),e=[],n=[];function s(c){h.camera=c,e.length=0,n.length=0}function r(c){e.push(c)}function a(c){n.push(c)}function o(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function fv(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new th(i),t.set(s,[o])):r>=a.length?(o=new th(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Ru extends oi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Zd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class pv extends oi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const mv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vv(i,t,e){let n=new Il;const s=new it,r=new it,a=new Qt,o=new Ru({depthPacking:cu}),l=new pv,h={},c=e.maxTextureSize,u={[ri]:ke,[ke]:ri,[fn]:fn},d=new Re({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:mv,fragmentShader:gv}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new ge;g.setAttribute("position",new xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new at(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qh;let f=this.type;this.render=function(T,E,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const y=i.getRenderTarget(),x=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Un),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const I=f!==Ln&&this.type===Ln,N=f===Ln&&this.type!==Ln;for(let H=0,U=T.length;H<U;H++){const Y=T[H],z=Y.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const Q=z.getFrameExtents();if(s.multiply(Q),r.copy(z.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/Q.x),s.x=r.x*Q.x,z.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/Q.y),s.y=r.y*Q.y,z.mapSize.y=r.y)),z.map===null||I===!0||N===!0){const rt=this.type!==Ln?{minFilter:He,magFilter:He}:{};z.map!==null&&z.map.dispose(),z.map=new gn(s.x,s.y,rt),z.map.texture.name=Y.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const et=z.getViewportCount();for(let rt=0;rt<et;rt++){const St=z.getViewport(rt);a.set(r.x*St.x,r.y*St.y,r.x*St.z,r.y*St.w),k.viewport(a),z.updateMatrices(Y,rt),n=z.getFrustum(),_(E,C,z.camera,Y,this.type)}z.isPointLightShadow!==!0&&this.type===Ln&&w(z,C),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(y,x,P)};function w(T,E){const C=t.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new gn(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(E,null,C,d,v,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(E,null,C,p,v,null)}function M(T,E,C,y){let x=null;const P=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)x=P;else if(x=C.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const k=x.uuid,I=E.uuid;let N=h[k];N===void 0&&(N={},h[k]=N);let H=N[I];H===void 0&&(H=x.clone(),N[I]=H,E.addEventListener("dispose",L)),x=H}if(x.visible=E.visible,x.wireframe=E.wireframe,y===Ln?x.side=E.shadowSide!==null?E.shadowSide:E.side:x.side=E.shadowSide!==null?E.shadowSide:u[E.side],x.alphaMap=E.alphaMap,x.alphaTest=E.alphaTest,x.map=E.map,x.clipShadows=E.clipShadows,x.clippingPlanes=E.clippingPlanes,x.clipIntersection=E.clipIntersection,x.displacementMap=E.displacementMap,x.displacementScale=E.displacementScale,x.displacementBias=E.displacementBias,x.wireframeLinewidth=E.wireframeLinewidth,x.linewidth=E.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const k=i.properties.get(x);k.light=C}return x}function _(T,E,C,y,x){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&x===Ln)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);const I=t.update(T),N=T.material;if(Array.isArray(N)){const H=I.groups;for(let U=0,Y=H.length;U<Y;U++){const z=H[U],Q=N[z.materialIndex];if(Q&&Q.visible){const et=M(T,Q,y,x);T.onBeforeShadow(i,T,E,C,I,et,z),i.renderBufferDirect(C,null,I,et,T,z),T.onAfterShadow(i,T,E,C,I,et,z)}}}else if(N.visible){const H=M(T,N,y,x);T.onBeforeShadow(i,T,E,C,I,H,null),i.renderBufferDirect(C,null,I,H,T,null),T.onAfterShadow(i,T,E,C,I,H,null)}}const k=T.children;for(let I=0,N=k.length;I<N;I++)_(k[I],E,C,y,x)}function L(T){T.target.removeEventListener("dispose",L);for(const C in h){const y=h[C],x=T.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const _v={[yo]:So,[wo]:Eo,[bo]:Ao,[as]:To,[So]:yo,[Eo]:wo,[Ao]:bo,[To]:as};function xv(i,t){function e(){let F=!1;const ft=new Qt;let $=null;const tt=new Qt(0,0,0,0);return{setMask:function(vt){$!==vt&&!F&&(i.colorMask(vt,vt,vt,vt),$=vt)},setLocked:function(vt){F=vt},setClear:function(vt,mt,Ht,ve,De){De===!0&&(vt*=ve,mt*=ve,Ht*=ve),ft.set(vt,mt,Ht,ve),tt.equals(ft)===!1&&(i.clearColor(vt,mt,Ht,ve),tt.copy(ft))},reset:function(){F=!1,$=null,tt.set(-1,0,0,0)}}}function n(){let F=!1,ft=!1,$=null,tt=null,vt=null;return{setReversed:function(mt){if(ft!==mt){const Ht=t.get("EXT_clip_control");ft?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);const ve=vt;vt=null,this.setClear(ve)}ft=mt},getReversed:function(){return ft},setTest:function(mt){mt?ht(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(mt){$!==mt&&!F&&(i.depthMask(mt),$=mt)},setFunc:function(mt){if(ft&&(mt=_v[mt]),tt!==mt){switch(mt){case yo:i.depthFunc(i.NEVER);break;case So:i.depthFunc(i.ALWAYS);break;case wo:i.depthFunc(i.LESS);break;case as:i.depthFunc(i.LEQUAL);break;case bo:i.depthFunc(i.EQUAL);break;case To:i.depthFunc(i.GEQUAL);break;case Eo:i.depthFunc(i.GREATER);break;case Ao:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=mt}},setLocked:function(mt){F=mt},setClear:function(mt){vt!==mt&&(ft&&(mt=1-mt),i.clearDepth(mt),vt=mt)},reset:function(){F=!1,$=null,tt=null,vt=null,ft=!1}}}function s(){let F=!1,ft=null,$=null,tt=null,vt=null,mt=null,Ht=null,ve=null,De=null;return{setTest:function(se){F||(se?ht(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(se){ft!==se&&!F&&(i.stencilMask(se),ft=se)},setFunc:function(se,ln,bn){($!==se||tt!==ln||vt!==bn)&&(i.stencilFunc(se,ln,bn),$=se,tt=ln,vt=bn)},setOp:function(se,ln,bn){(mt!==se||Ht!==ln||ve!==bn)&&(i.stencilOp(se,ln,bn),mt=se,Ht=ln,ve=bn)},setLocked:function(se){F=se},setClear:function(se){De!==se&&(i.clearStencil(se),De=se)},reset:function(){F=!1,ft=null,$=null,tt=null,vt=null,mt=null,Ht=null,ve=null,De=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,h=new WeakMap;let c={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,w=null,M=null,_=null,L=null,T=null,E=new Et(0,0,0),C=0,y=!1,x=null,P=null,k=null,I=null,N=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,Y=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(z)[1]),U=Y>=1):z.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),U=Y>=2);let Q=null,et={};const rt=i.getParameter(i.SCISSOR_BOX),St=i.getParameter(i.VIEWPORT),xt=new Qt().fromArray(rt),G=new Qt().fromArray(St);function J(F,ft,$,tt){const vt=new Uint8Array(4),mt=i.createTexture();i.bindTexture(F,mt),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<$;Ht++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ft+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return mt}const lt={};lt[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),lt[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),lt[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),lt[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ht(i.DEPTH_TEST),a.setFunc(as),Ut(!1),Ft(ac),ht(i.CULL_FACE),D(Un);function ht(F){c[F]!==!0&&(i.enable(F),c[F]=!0)}function yt(F){c[F]!==!1&&(i.disable(F),c[F]=!1)}function Pt(F,ft){return u[F]!==ft?(i.bindFramebuffer(F,ft),u[F]=ft,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function st(F,ft){let $=p,tt=!1;if(F){$=d.get(ft),$===void 0&&($=[],d.set(ft,$));const vt=F.textures;if($.length!==vt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let mt=0,Ht=vt.length;mt<Ht;mt++)$[mt]=i.COLOR_ATTACHMENT0+mt;$.length=vt.length,tt=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,tt=!0);tt&&i.drawBuffers($)}function Mt(F){return g!==F?(i.useProgram(F),g=F,!0):!1}const q={[xi]:i.FUNC_ADD,[Cd]:i.FUNC_SUBTRACT,[Pd]:i.FUNC_REVERSE_SUBTRACT};q[Ld]=i.MIN,q[Dd]=i.MAX;const K={[Id]:i.ZERO,[Ud]:i.ONE,[Nd]:i.SRC_COLOR,[xo]:i.SRC_ALPHA,[Hd]:i.SRC_ALPHA_SATURATE,[zd]:i.DST_COLOR,[Od]:i.DST_ALPHA,[Fd]:i.ONE_MINUS_SRC_COLOR,[Mo]:i.ONE_MINUS_SRC_ALPHA,[kd]:i.ONE_MINUS_DST_COLOR,[Bd]:i.ONE_MINUS_DST_ALPHA,[Gd]:i.CONSTANT_COLOR,[Vd]:i.ONE_MINUS_CONSTANT_COLOR,[Wd]:i.CONSTANT_ALPHA,[Xd]:i.ONE_MINUS_CONSTANT_ALPHA};function D(F,ft,$,tt,vt,mt,Ht,ve,De,se){if(F===Un){v===!0&&(yt(i.BLEND),v=!1);return}if(v===!1&&(ht(i.BLEND),v=!0),F!==Rd){if(F!==m||se!==y){if((f!==xi||_!==xi)&&(i.blendEquation(i.FUNC_ADD),f=xi,_=xi),se)switch(F){case wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qs:i.blendFunc(i.ONE,i.ONE);break;case oc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qs:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case oc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}w=null,M=null,L=null,T=null,E.set(0,0,0),C=0,m=F,y=se}return}vt=vt||ft,mt=mt||$,Ht=Ht||tt,(ft!==f||vt!==_)&&(i.blendEquationSeparate(q[ft],q[vt]),f=ft,_=vt),($!==w||tt!==M||mt!==L||Ht!==T)&&(i.blendFuncSeparate(K[$],K[tt],K[mt],K[Ht]),w=$,M=tt,L=mt,T=Ht),(ve.equals(E)===!1||De!==C)&&(i.blendColor(ve.r,ve.g,ve.b,De),E.copy(ve),C=De),m=F,y=!1}function zt(F,ft){F.side===fn?yt(i.CULL_FACE):ht(i.CULL_FACE);let $=F.side===ke;ft&&($=!$),Ut($),F.blending===wi&&F.transparent===!1?D(Un):D(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const tt=F.stencilWrite;o.setTest(tt),tt&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ie(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(F){x!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),x=F)}function Ft(F){F!==Ed?(ht(i.CULL_FACE),F!==P&&(F===ac?i.cullFace(i.BACK):F===Ad?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),P=F}function _t(F){F!==k&&(U&&i.lineWidth(F),k=F)}function ie(F,ft,$){F?(ht(i.POLYGON_OFFSET_FILL),(I!==ft||N!==$)&&(i.polygonOffset(ft,$),I=ft,N=$)):yt(i.POLYGON_OFFSET_FILL)}function Nt(F){F?ht(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function A(F){F===void 0&&(F=i.TEXTURE0+H-1),Q!==F&&(i.activeTexture(F),Q=F)}function S(F,ft,$){$===void 0&&(Q===null?$=i.TEXTURE0+H-1:$=Q);let tt=et[$];tt===void 0&&(tt={type:void 0,texture:void 0},et[$]=tt),(tt.type!==F||tt.texture!==ft)&&(Q!==$&&(i.activeTexture($),Q=$),i.bindTexture(F,ft||lt[F]),tt.type=F,tt.texture=ft)}function V(){const F=et[Q];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function nt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Lt(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function wt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Kt(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ot(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function bt(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ot(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Bt(F){xt.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),xt.copy(F))}function Tt(F){G.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),G.copy(F))}function Yt(F,ft){let $=h.get(ft);$===void 0&&($=new WeakMap,h.set(ft,$));let tt=$.get(F);tt===void 0&&(tt=i.getUniformBlockIndex(ft,F.name),$.set(F,tt))}function Wt(F,ft){const tt=h.get(ft).get(F);l.get(ft)!==tt&&(i.uniformBlockBinding(ft,tt,F.__bindingPointIndex),l.set(ft,tt))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},Q=null,et={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,w=null,M=null,_=null,L=null,T=null,E=new Et(0,0,0),C=0,y=!1,x=null,P=null,k=null,I=null,N=null,xt.set(0,0,i.canvas.width,i.canvas.height),G.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ht,disable:yt,bindFramebuffer:Pt,drawBuffers:st,useProgram:Mt,setBlending:D,setMaterial:zt,setFlipSided:Ut,setCullFace:Ft,setLineWidth:_t,setPolygonOffset:ie,setScissorTest:Nt,activeTexture:A,bindTexture:S,unbindTexture:V,compressedTexImage2D:j,compressedTexImage3D:nt,texImage2D:bt,texImage3D:Ot,updateUBOMapping:Yt,uniformBlockBinding:Wt,texStorage2D:Kt,texStorage3D:ot,texSubImage2D:Z,texSubImage3D:Lt,compressedTexSubImage2D:pt,compressedTexSubImage3D:wt,scissor:Bt,viewport:Tt,reset:ce}}function eh(i,t,e,n){const s=Mv(n);switch(e){case iu:return i*t;case ru:return i*t;case au:return i*t*2;case Rl:return i*t/s.components*s.byteLength;case hr:return i*t/s.components*s.byteLength;case ou:return i*t*2/s.components*s.byteLength;case Cl:return i*t*2/s.components*s.byteLength;case su:return i*t*3/s.components*s.byteLength;case Je:return i*t*4/s.components*s.byteLength;case Pl:return i*t*4/s.components*s.byteLength;case Kr:case Zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Qr:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Do:case Uo:return Math.max(i,16)*Math.max(t,8)/4;case Lo:case Io:return Math.max(i,8)*Math.max(t,8)/2;case No:case Fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case zo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ko:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ho:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Go:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Vo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Xo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case qo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case $o:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Zo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Qo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case jr:case Jo:case jo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case lu:case tl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case el:case nl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Mv(i){switch(i){case vn:case tu:return{byteLength:1,components:1};case Js:case eu:case Nn:return{byteLength:2,components:1};case El:case Al:return{byteLength:2,components:4};case zn:case Tl:case yn:return{byteLength:4,components:1};case nu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function yv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new it,c=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return p?new OffscreenCanvas(A,S):sa("canvas")}function v(A,S,V){let j=1;const nt=Nt(A);if((nt.width>V||nt.height>V)&&(j=V/Math.max(nt.width,nt.height)),j<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(j*nt.width),Lt=Math.floor(j*nt.height);u===void 0&&(u=g(Z,Lt));const pt=S?g(Z,Lt):u;return pt.width=Z,pt.height=Lt,pt.getContext("2d").drawImage(A,0,0,Z,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+Z+"x"+Lt+")."),pt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),A;return A}function m(A){return A.generateMipmaps}function f(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(A,S,V,j,nt=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=S;if(S===i.RED&&(V===i.FLOAT&&(Z=i.R32F),V===i.HALF_FLOAT&&(Z=i.R16F),V===i.UNSIGNED_BYTE&&(Z=i.R8)),S===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.R8UI),V===i.UNSIGNED_SHORT&&(Z=i.R16UI),V===i.UNSIGNED_INT&&(Z=i.R32UI),V===i.BYTE&&(Z=i.R8I),V===i.SHORT&&(Z=i.R16I),V===i.INT&&(Z=i.R32I)),S===i.RG&&(V===i.FLOAT&&(Z=i.RG32F),V===i.HALF_FLOAT&&(Z=i.RG16F),V===i.UNSIGNED_BYTE&&(Z=i.RG8)),S===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RG8UI),V===i.UNSIGNED_SHORT&&(Z=i.RG16UI),V===i.UNSIGNED_INT&&(Z=i.RG32UI),V===i.BYTE&&(Z=i.RG8I),V===i.SHORT&&(Z=i.RG16I),V===i.INT&&(Z=i.RG32I)),S===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),V===i.UNSIGNED_INT&&(Z=i.RGB32UI),V===i.BYTE&&(Z=i.RGB8I),V===i.SHORT&&(Z=i.RGB16I),V===i.INT&&(Z=i.RGB32I)),S===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),V===i.UNSIGNED_INT&&(Z=i.RGBA32UI),V===i.BYTE&&(Z=i.RGBA8I),V===i.SHORT&&(Z=i.RGBA16I),V===i.INT&&(Z=i.RGBA32I)),S===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),S===i.RGBA){const Lt=nt?ma:$t.getTransfer(j);V===i.FLOAT&&(Z=i.RGBA32F),V===i.HALF_FLOAT&&(Z=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Z=Lt===re?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(A,S){let V;return A?S===null||S===zn||S===cs?V=i.DEPTH24_STENCIL8:S===yn?V=i.DEPTH32F_STENCIL8:S===Js&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===zn||S===cs?V=i.DEPTH_COMPONENT24:S===yn?V=i.DEPTH_COMPONENT32F:S===Js&&(V=i.DEPTH_COMPONENT16),V}function L(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==He&&A.minFilter!==an?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function T(A){const S=A.target;S.removeEventListener("dispose",T),C(S),S.isVideoTexture&&c.delete(S)}function E(A){const S=A.target;S.removeEventListener("dispose",E),x(S)}function C(A){const S=n.get(A);if(S.__webglInit===void 0)return;const V=A.source,j=d.get(V);if(j){const nt=j[S.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&y(A),Object.keys(j).length===0&&d.delete(V)}n.remove(A)}function y(A){const S=n.get(A);i.deleteTexture(S.__webglTexture);const V=A.source,j=d.get(V);delete j[S.__cacheKey],a.memory.textures--}function x(A){const S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let nt=0;nt<S.__webglFramebuffer[j].length;nt++)i.deleteFramebuffer(S.__webglFramebuffer[j][nt]);else i.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)i.deleteFramebuffer(S.__webglFramebuffer[j]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const V=A.textures;for(let j=0,nt=V.length;j<nt;j++){const Z=n.get(V[j]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(V[j])}n.remove(A)}let P=0;function k(){P=0}function I(){const A=P;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function N(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function H(A,S){const V=n.get(A);if(A.isVideoTexture&&_t(A),A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){const j=A.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(V,A,S);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+S)}function U(A,S){const V=n.get(A);if(A.version>0&&V.__version!==A.version){G(V,A,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+S)}function Y(A,S){const V=n.get(A);if(A.version>0&&V.__version!==A.version){G(V,A,S);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+S)}function z(A,S){const V=n.get(A);if(A.version>0&&V.__version!==A.version){J(V,A,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+S)}const Q={[rn]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[Po]:i.MIRRORED_REPEAT},et={[He]:i.NEAREST,[Kd]:i.NEAREST_MIPMAP_NEAREST,[pr]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[wa]:i.LINEAR_MIPMAP_NEAREST,[yi]:i.LINEAR_MIPMAP_LINEAR},rt={[Jd]:i.NEVER,[rf]:i.ALWAYS,[jd]:i.LESS,[hu]:i.LEQUAL,[tf]:i.EQUAL,[sf]:i.GEQUAL,[ef]:i.GREATER,[nf]:i.NOTEQUAL};function St(A,S){if(S.type===yn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===an||S.magFilter===wa||S.magFilter===pr||S.magFilter===yi||S.minFilter===an||S.minFilter===wa||S.minFilter===pr||S.minFilter===yi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Q[S.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Q[S.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Q[S.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,et[S.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,et[S.minFilter]),S.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,rt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===He||S.minFilter!==pr&&S.minFilter!==yi||S.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function xt(A,S){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",T));const j=S.source;let nt=d.get(j);nt===void 0&&(nt={},d.set(j,nt));const Z=N(S);if(Z!==A.__cacheKey){nt[Z]===void 0&&(nt[Z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),nt[Z].usedTimes++;const Lt=nt[A.__cacheKey];Lt!==void 0&&(nt[A.__cacheKey].usedTimes--,Lt.usedTimes===0&&y(S)),A.__cacheKey=Z,A.__webglTexture=nt[Z].texture}return V}function G(A,S,V){let j=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=i.TEXTURE_3D);const nt=xt(A,S),Z=S.source;e.bindTexture(j,A.__webglTexture,i.TEXTURE0+V);const Lt=n.get(Z);if(Z.version!==Lt.__version||nt===!0){e.activeTexture(i.TEXTURE0+V);const pt=$t.getPrimaries($t.workingColorSpace),wt=S.colorSpace===pn?null:$t.getPrimaries(S.colorSpace),Kt=S.colorSpace===pn||pt===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let ot=v(S.image,!1,s.maxTextureSize);ot=ie(S,ot);const bt=r.convert(S.format,S.colorSpace),Ot=r.convert(S.type);let Bt=M(S.internalFormat,bt,Ot,S.colorSpace,S.isVideoTexture);St(j,S);let Tt;const Yt=S.mipmaps,Wt=S.isVideoTexture!==!0,ce=Lt.__version===void 0||nt===!0,F=Z.dataReady,ft=L(S,ot);if(S.isDepthTexture)Bt=_(S.format===hs,S.type),ce&&(Wt?e.texStorage2D(i.TEXTURE_2D,1,Bt,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,Bt,ot.width,ot.height,0,bt,Ot,null));else if(S.isDataTexture)if(Yt.length>0){Wt&&ce&&e.texStorage2D(i.TEXTURE_2D,ft,Bt,Yt[0].width,Yt[0].height);for(let $=0,tt=Yt.length;$<tt;$++)Tt=Yt[$],Wt?F&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Tt.width,Tt.height,bt,Ot,Tt.data):e.texImage2D(i.TEXTURE_2D,$,Bt,Tt.width,Tt.height,0,bt,Ot,Tt.data);S.generateMipmaps=!1}else Wt?(ce&&e.texStorage2D(i.TEXTURE_2D,ft,Bt,ot.width,ot.height),F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ot.width,ot.height,bt,Ot,ot.data)):e.texImage2D(i.TEXTURE_2D,0,Bt,ot.width,ot.height,0,bt,Ot,ot.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Wt&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Bt,Yt[0].width,Yt[0].height,ot.depth);for(let $=0,tt=Yt.length;$<tt;$++)if(Tt=Yt[$],S.format!==Je)if(bt!==null)if(Wt){if(F)if(S.layerUpdates.size>0){const vt=eh(Tt.width,Tt.height,S.format,S.type);for(const mt of S.layerUpdates){const Ht=Tt.data.subarray(mt*vt/Tt.data.BYTES_PER_ELEMENT,(mt+1)*vt/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,mt,Tt.width,Tt.height,1,bt,Ht)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Tt.width,Tt.height,ot.depth,bt,Tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,Bt,Tt.width,Tt.height,ot.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Tt.width,Tt.height,ot.depth,bt,Ot,Tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,Bt,Tt.width,Tt.height,ot.depth,0,bt,Ot,Tt.data)}else{Wt&&ce&&e.texStorage2D(i.TEXTURE_2D,ft,Bt,Yt[0].width,Yt[0].height);for(let $=0,tt=Yt.length;$<tt;$++)Tt=Yt[$],S.format!==Je?bt!==null?Wt?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,Tt.width,Tt.height,bt,Tt.data):e.compressedTexImage2D(i.TEXTURE_2D,$,Bt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?F&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Tt.width,Tt.height,bt,Ot,Tt.data):e.texImage2D(i.TEXTURE_2D,$,Bt,Tt.width,Tt.height,0,bt,Ot,Tt.data)}else if(S.isDataArrayTexture)if(Wt){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Bt,ot.width,ot.height,ot.depth),F)if(S.layerUpdates.size>0){const $=eh(ot.width,ot.height,S.format,S.type);for(const tt of S.layerUpdates){const vt=ot.data.subarray(tt*$/ot.data.BYTES_PER_ELEMENT,(tt+1)*$/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,ot.width,ot.height,1,bt,Ot,vt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,bt,Ot,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Bt,ot.width,ot.height,ot.depth,0,bt,Ot,ot.data);else if(S.isData3DTexture)Wt?(ce&&e.texStorage3D(i.TEXTURE_3D,ft,Bt,ot.width,ot.height,ot.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,bt,Ot,ot.data)):e.texImage3D(i.TEXTURE_3D,0,Bt,ot.width,ot.height,ot.depth,0,bt,Ot,ot.data);else if(S.isFramebufferTexture){if(ce)if(Wt)e.texStorage2D(i.TEXTURE_2D,ft,Bt,ot.width,ot.height);else{let $=ot.width,tt=ot.height;for(let vt=0;vt<ft;vt++)e.texImage2D(i.TEXTURE_2D,vt,Bt,$,tt,0,bt,Ot,null),$>>=1,tt>>=1}}else if(Yt.length>0){if(Wt&&ce){const $=Nt(Yt[0]);e.texStorage2D(i.TEXTURE_2D,ft,Bt,$.width,$.height)}for(let $=0,tt=Yt.length;$<tt;$++)Tt=Yt[$],Wt?F&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,bt,Ot,Tt):e.texImage2D(i.TEXTURE_2D,$,Bt,bt,Ot,Tt);S.generateMipmaps=!1}else if(Wt){if(ce){const $=Nt(ot);e.texStorage2D(i.TEXTURE_2D,ft,Bt,$.width,$.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,bt,Ot,ot)}else e.texImage2D(i.TEXTURE_2D,0,Bt,bt,Ot,ot);m(S)&&f(j),Lt.__version=Z.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function J(A,S,V){if(S.image.length!==6)return;const j=xt(A,S),nt=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+V);const Z=n.get(nt);if(nt.version!==Z.__version||j===!0){e.activeTexture(i.TEXTURE0+V);const Lt=$t.getPrimaries($t.workingColorSpace),pt=S.colorSpace===pn?null:$t.getPrimaries(S.colorSpace),wt=S.colorSpace===pn||Lt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const Kt=S.isCompressedTexture||S.image[0].isCompressedTexture,ot=S.image[0]&&S.image[0].isDataTexture,bt=[];for(let tt=0;tt<6;tt++)!Kt&&!ot?bt[tt]=v(S.image[tt],!0,s.maxCubemapSize):bt[tt]=ot?S.image[tt].image:S.image[tt],bt[tt]=ie(S,bt[tt]);const Ot=bt[0],Bt=r.convert(S.format,S.colorSpace),Tt=r.convert(S.type),Yt=M(S.internalFormat,Bt,Tt,S.colorSpace),Wt=S.isVideoTexture!==!0,ce=Z.__version===void 0||j===!0,F=nt.dataReady;let ft=L(S,Ot);St(i.TEXTURE_CUBE_MAP,S);let $;if(Kt){Wt&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Yt,Ot.width,Ot.height);for(let tt=0;tt<6;tt++){$=bt[tt].mipmaps;for(let vt=0;vt<$.length;vt++){const mt=$[vt];S.format!==Je?Bt!==null?Wt?F&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,mt.width,mt.height,Bt,mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,Yt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,mt.width,mt.height,Bt,Tt,mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,Yt,mt.width,mt.height,0,Bt,Tt,mt.data)}}}else{if($=S.mipmaps,Wt&&ce){$.length>0&&ft++;const tt=Nt(bt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Yt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ot){Wt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,bt[tt].width,bt[tt].height,Bt,Tt,bt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Yt,bt[tt].width,bt[tt].height,0,Bt,Tt,bt[tt].data);for(let vt=0;vt<$.length;vt++){const Ht=$[vt].image[tt].image;Wt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,Ht.width,Ht.height,Bt,Tt,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,Yt,Ht.width,Ht.height,0,Bt,Tt,Ht.data)}}else{Wt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Bt,Tt,bt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Yt,Bt,Tt,bt[tt]);for(let vt=0;vt<$.length;vt++){const mt=$[vt];Wt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,Bt,Tt,mt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,Yt,Bt,Tt,mt.image[tt])}}}m(S)&&f(i.TEXTURE_CUBE_MAP),Z.__version=nt.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function lt(A,S,V,j,nt,Z){const Lt=r.convert(V.format,V.colorSpace),pt=r.convert(V.type),wt=M(V.internalFormat,Lt,pt,V.colorSpace),Kt=n.get(S),ot=n.get(V);if(ot.__renderTarget=S,!Kt.__hasExternalTextures){const bt=Math.max(1,S.width>>Z),Ot=Math.max(1,S.height>>Z);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,Z,wt,bt,Ot,S.depth,0,Lt,pt,null):e.texImage2D(nt,Z,wt,bt,Ot,0,Lt,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),Ft(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,nt,ot.__webglTexture,0,Ut(S)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,nt,ot.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(A,S,V){if(i.bindRenderbuffer(i.RENDERBUFFER,A),S.depthBuffer){const j=S.depthTexture,nt=j&&j.isDepthTexture?j.type:null,Z=_(S.stencilBuffer,nt),Lt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=Ut(S);Ft(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,Z,S.width,S.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,Z,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Z,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,A)}else{const j=S.textures;for(let nt=0;nt<j.length;nt++){const Z=j[nt],Lt=r.convert(Z.format,Z.colorSpace),pt=r.convert(Z.type),wt=M(Z.internalFormat,Lt,pt,Z.colorSpace),Kt=Ut(S);V&&Ft(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Kt,wt,S.width,S.height):Ft(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Kt,wt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,wt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function yt(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),H(S.depthTexture,0);const nt=j.__webglTexture,Z=Ut(S);if(S.depthTexture.format===es)Ft(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0);else if(S.depthTexture.format===hs)Ft(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function Pt(A){const S=n.get(A),V=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const j=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){const nt=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",nt)};j.addEventListener("dispose",nt),S.__depthDisposeCallback=nt}S.__boundDepthTexture=j}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");yt(S.__webglFramebuffer,A)}else if(V){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=i.createRenderbuffer(),ht(S.__webglDepthbuffer[j],A,!1);else{const nt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ht(S.__webglDepthbuffer,A,!1);else{const j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,nt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(A,S,V){const j=n.get(A);S!==void 0&&lt(j.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Pt(A)}function Mt(A){const S=A.texture,V=n.get(A),j=n.get(S);A.addEventListener("dispose",E);const nt=A.textures,Z=A.isWebGLCubeRenderTarget===!0,Lt=nt.length>1;if(Lt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=S.version,a.memory.textures++),Z){V.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer[pt]=[];for(let wt=0;wt<S.mipmaps.length;wt++)V.__webglFramebuffer[pt][wt]=i.createFramebuffer()}else V.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer=[];for(let pt=0;pt<S.mipmaps.length;pt++)V.__webglFramebuffer[pt]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let pt=0,wt=nt.length;pt<wt;pt++){const Kt=n.get(nt[pt]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&Ft(A)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let pt=0;pt<nt.length;pt++){const wt=nt[pt];V.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[pt]);const Kt=r.convert(wt.format,wt.colorSpace),ot=r.convert(wt.type),bt=M(wt.internalFormat,Kt,ot,wt.colorSpace,A.isXRRenderTarget===!0),Ot=Ut(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ot,bt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,V.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ht(V.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),St(i.TEXTURE_CUBE_MAP,S);for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0)for(let wt=0;wt<S.mipmaps.length;wt++)lt(V.__webglFramebuffer[pt][wt],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,wt);else lt(V.__webglFramebuffer[pt],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(S)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let pt=0,wt=nt.length;pt<wt;pt++){const Kt=nt[pt],ot=n.get(Kt);e.bindTexture(i.TEXTURE_2D,ot.__webglTexture),St(i.TEXTURE_2D,Kt),lt(V.__webglFramebuffer,A,Kt,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),m(Kt)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(pt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,j.__webglTexture),St(pt,S),S.mipmaps&&S.mipmaps.length>0)for(let wt=0;wt<S.mipmaps.length;wt++)lt(V.__webglFramebuffer[wt],A,S,i.COLOR_ATTACHMENT0,pt,wt);else lt(V.__webglFramebuffer,A,S,i.COLOR_ATTACHMENT0,pt,0);m(S)&&f(pt),e.unbindTexture()}A.depthBuffer&&Pt(A)}function q(A){const S=A.textures;for(let V=0,j=S.length;V<j;V++){const nt=S[V];if(m(nt)){const Z=w(A),Lt=n.get(nt).__webglTexture;e.bindTexture(Z,Lt),f(Z),e.unbindTexture()}}}const K=[],D=[];function zt(A){if(A.samples>0){if(Ft(A)===!1){const S=A.textures,V=A.width,j=A.height;let nt=i.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(A),pt=S.length>1;if(pt)for(let wt=0;wt<S.length;wt++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let wt=0;wt<S.length;wt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[wt]);const Kt=n.get(S[wt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Kt,0)}i.blitFramebuffer(0,0,V,j,0,0,V,j,nt,i.NEAREST),l===!0&&(K.length=0,D.length=0,K.push(i.COLOR_ATTACHMENT0+wt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(K.push(Z),D.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,K))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let wt=0;wt<S.length;wt++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[wt]);const Kt=n.get(S[wt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,Kt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Ut(A){return Math.min(s.maxSamples,A.samples)}function Ft(A){const S=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function _t(A){const S=a.render.frame;c.get(A)!==S&&(c.set(A,S),A.update())}function ie(A,S){const V=A.colorSpace,j=A.format,nt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==Ms&&V!==pn&&($t.getTransfer(V)===re?(j!==Je||nt!==vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),S}function Nt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(h.width=A.naturalWidth||A.width,h.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(h.width=A.displayWidth,h.height=A.displayHeight):(h.width=A.width,h.height=A.height),h}this.allocateTextureUnit=I,this.resetTextureUnits=k,this.setTexture2D=H,this.setTexture2DArray=U,this.setTexture3D=Y,this.setTextureCube=z,this.rebindTextures=st,this.setupRenderTarget=Mt,this.updateRenderTargetMipmap=q,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=lt,this.useMultisampledRTT=Ft}function Sv(i,t){function e(n,s=pn){let r;const a=$t.getTransfer(s);if(n===vn)return i.UNSIGNED_BYTE;if(n===El)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Al)return i.UNSIGNED_SHORT_5_5_5_1;if(n===nu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tu)return i.BYTE;if(n===eu)return i.SHORT;if(n===Js)return i.UNSIGNED_SHORT;if(n===Tl)return i.INT;if(n===zn)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===Nn)return i.HALF_FLOAT;if(n===iu)return i.ALPHA;if(n===su)return i.RGB;if(n===Je)return i.RGBA;if(n===ru)return i.LUMINANCE;if(n===au)return i.LUMINANCE_ALPHA;if(n===es)return i.DEPTH_COMPONENT;if(n===hs)return i.DEPTH_STENCIL;if(n===Rl)return i.RED;if(n===hr)return i.RED_INTEGER;if(n===ou)return i.RG;if(n===Cl)return i.RG_INTEGER;if(n===Pl)return i.RGBA_INTEGER;if(n===Kr||n===Zr||n===Qr||n===Jr)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Kr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Kr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Lo||n===Do||n===Io||n===Uo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Lo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Do)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Io)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Uo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===No||n===Fo||n===Oo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===No||n===Fo)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Oo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Bo||n===zo||n===ko||n===Ho||n===Go||n===Vo||n===Wo||n===Xo||n===qo||n===Yo||n===$o||n===Ko||n===Zo||n===Qo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Bo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ko)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ho)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Go)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Vo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Yo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$o)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ko)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===jr||n===Jo||n===jo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===jr)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Jo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lu||n===tl||n===el||n===nl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===jr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===el)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class wv extends Ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class me extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bv={type:"move"};class Za{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new me,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new me,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new me,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),f=this._getHandJoint(h,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const c=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],d=c.position.distanceTo(u.position),p=.02,g=.005;h.inputState.pinching&&d>p+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&d<=p-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bv)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new me;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Tv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ev=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Av{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ne,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Re({vertexShader:Tv,fragmentShader:Ev,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new at(new Ve(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Rv extends ys{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,h=null,c=null,u=null,d=null,p=null,g=null;const v=new Av,m=e.getContextAttributes();let f=null,w=null;const M=[],_=[],L=new it;let T=null;const E=new Ze;E.viewport=new Qt;const C=new Ze;C.viewport=new Qt;const y=[E,C],x=new wv;let P=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let J=M[G];return J===void 0&&(J=new Za,M[G]=J),J.getTargetRaySpace()},this.getControllerGrip=function(G){let J=M[G];return J===void 0&&(J=new Za,M[G]=J),J.getGripSpace()},this.getHand=function(G){let J=M[G];return J===void 0&&(J=new Za,M[G]=J),J.getHandSpace()};function I(G){const J=_.indexOf(G.inputSource);if(J===-1)return;const lt=M[J];lt!==void 0&&(lt.update(G.inputSource,G.frame,h||a),lt.dispatchEvent({type:G.type,data:G.inputSource}))}function N(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",N),s.removeEventListener("inputsourceschange",H);for(let G=0;G<M.length;G++){const J=_[G];J!==null&&(_[G]=null,M[G].disconnect(J))}P=null,k=null,v.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,w=null,xt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(G){h=G},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",N),s.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const J={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,J),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new gn(p.framebufferWidth,p.framebufferHeight,{format:Je,type:vn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let J=null,lt=null,ht=null;m.depth&&(ht=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=m.stencil?hs:es,lt=m.stencil?cs:zn);const yt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(yt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),w=new gn(d.textureWidth,d.textureHeight,{format:Je,type:vn,depthTexture:new wu(d.textureWidth,d.textureHeight,lt,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await s.requestReferenceSpace(o),xt.setContext(s),xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function H(G){for(let J=0;J<G.removed.length;J++){const lt=G.removed[J],ht=_.indexOf(lt);ht>=0&&(_[ht]=null,M[ht].disconnect(lt))}for(let J=0;J<G.added.length;J++){const lt=G.added[J];let ht=_.indexOf(lt);if(ht===-1){for(let Pt=0;Pt<M.length;Pt++)if(Pt>=_.length){_.push(lt),ht=Pt;break}else if(_[Pt]===null){_[Pt]=lt,ht=Pt;break}if(ht===-1)break}const yt=M[ht];yt&&yt.connect(lt)}}const U=new R,Y=new R;function z(G,J,lt){U.setFromMatrixPosition(J.matrixWorld),Y.setFromMatrixPosition(lt.matrixWorld);const ht=U.distanceTo(Y),yt=J.projectionMatrix.elements,Pt=lt.projectionMatrix.elements,st=yt[14]/(yt[10]-1),Mt=yt[14]/(yt[10]+1),q=(yt[9]+1)/yt[5],K=(yt[9]-1)/yt[5],D=(yt[8]-1)/yt[0],zt=(Pt[8]+1)/Pt[0],Ut=st*D,Ft=st*zt,_t=ht/(-D+zt),ie=_t*-D;if(J.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(ie),G.translateZ(_t),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),yt[10]===-1)G.projectionMatrix.copy(J.projectionMatrix),G.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Nt=st+_t,A=Mt+_t,S=Ut-ie,V=Ft+(ht-ie),j=q*Mt/A*Nt,nt=K*Mt/A*Nt;G.projectionMatrix.makePerspective(S,V,j,nt,Nt,A),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function Q(G,J){J===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(J.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let J=G.near,lt=G.far;v.texture!==null&&(v.depthNear>0&&(J=v.depthNear),v.depthFar>0&&(lt=v.depthFar)),x.near=C.near=E.near=J,x.far=C.far=E.far=lt,(P!==x.near||k!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,k=x.far),E.layers.mask=G.layers.mask|2,C.layers.mask=G.layers.mask|4,x.layers.mask=E.layers.mask|C.layers.mask;const ht=G.parent,yt=x.cameras;Q(x,ht);for(let Pt=0;Pt<yt.length;Pt++)Q(yt[Pt],ht);yt.length===2?z(x,E,C):x.projectionMatrix.copy(E.projectionMatrix),et(G,x,ht)};function et(G,J,lt){lt===null?G.matrix.copy(J.matrixWorld):(G.matrix.copy(lt.matrixWorld),G.matrix.invert(),G.matrix.multiply(J.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(J.projectionMatrix),G.projectionMatrixInverse.copy(J.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=js*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let rt=null;function St(G,J){if(c=J.getViewerPose(h||a),g=J,c!==null){const lt=c.views;p!==null&&(t.setRenderTargetFramebuffer(w,p.framebuffer),t.setRenderTarget(w));let ht=!1;lt.length!==x.cameras.length&&(x.cameras.length=0,ht=!0);for(let Pt=0;Pt<lt.length;Pt++){const st=lt[Pt];let Mt=null;if(p!==null)Mt=p.getViewport(st);else{const K=u.getViewSubImage(d,st);Mt=K.viewport,Pt===0&&(t.setRenderTargetTextures(w,K.colorTexture,d.ignoreDepthValues?void 0:K.depthStencilTexture),t.setRenderTarget(w))}let q=y[Pt];q===void 0&&(q=new Ze,q.layers.enable(Pt),q.viewport=new Qt,y[Pt]=q),q.matrix.fromArray(st.transform.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale),q.projectionMatrix.fromArray(st.projectionMatrix),q.projectionMatrixInverse.copy(q.projectionMatrix).invert(),q.viewport.set(Mt.x,Mt.y,Mt.width,Mt.height),Pt===0&&(x.matrix.copy(q.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ht===!0&&x.cameras.push(q)}const yt=s.enabledFeatures;if(yt&&yt.includes("depth-sensing")){const Pt=u.getDepthInformation(lt[0]);Pt&&Pt.isValid&&Pt.texture&&v.init(t,Pt,s.renderState)}}for(let lt=0;lt<M.length;lt++){const ht=_[lt],yt=M[lt];ht!==null&&yt!==void 0&&yt.update(ht,J,h||a)}rt&&rt(G,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const xt=new Su;xt.setAnimationLoop(St),this.setAnimationLoop=function(G){rt=G},this.dispose=function(){}}}const pi=new on,Cv=new Jt;function Pv(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,xu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,w,M,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),c(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,_)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,w,M):f.isSpriteMaterial?h(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ke&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ke&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const w=t.get(f),M=w.envMap,_=w.envMapRotation;M&&(m.envMap.value=M,pi.copy(_),pi.x*=-1,pi.y*=-1,pi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),m.envMapRotation.value.setFromMatrix4(Cv.makeRotationFromEuler(pi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,w,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=M*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ke&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const w=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Lv(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,M){const _=M.program;n.uniformBlockBinding(w,_)}function h(w,M){let _=s[w.id];_===void 0&&(g(w),_=c(w),s[w.id]=_,w.addEventListener("dispose",m));const L=M.program;n.updateUBOMapping(w,L);const T=t.render.frame;r[w.id]!==T&&(d(w),r[w.id]=T)}function c(w){const M=u();w.__bindingPointIndex=M;const _=i.createBuffer(),L=w.__size,T=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,L,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,_),_}function u(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const M=s[w.id],_=w.uniforms,L=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let T=0,E=_.length;T<E;T++){const C=Array.isArray(_[T])?_[T]:[_[T]];for(let y=0,x=C.length;y<x;y++){const P=C[y];if(p(P,T,y,L)===!0){const k=P.__offset,I=Array.isArray(P.value)?P.value:[P.value];let N=0;for(let H=0;H<I.length;H++){const U=I[H],Y=v(U);typeof U=="number"||typeof U=="boolean"?(P.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,k+N,P.__data)):U.isMatrix3?(P.__data[0]=U.elements[0],P.__data[1]=U.elements[1],P.__data[2]=U.elements[2],P.__data[3]=0,P.__data[4]=U.elements[3],P.__data[5]=U.elements[4],P.__data[6]=U.elements[5],P.__data[7]=0,P.__data[8]=U.elements[6],P.__data[9]=U.elements[7],P.__data[10]=U.elements[8],P.__data[11]=0):(U.toArray(P.__data,N),N+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(w,M,_,L){const T=w.value,E=M+"_"+_;if(L[E]===void 0)return typeof T=="number"||typeof T=="boolean"?L[E]=T:L[E]=T.clone(),!0;{const C=L[E];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return L[E]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function g(w){const M=w.uniforms;let _=0;const L=16;for(let E=0,C=M.length;E<C;E++){const y=Array.isArray(M[E])?M[E]:[M[E]];for(let x=0,P=y.length;x<P;x++){const k=y[x],I=Array.isArray(k.value)?k.value:[k.value];for(let N=0,H=I.length;N<H;N++){const U=I[N],Y=v(U),z=_%L,Q=z%Y.boundary,et=z+Q;_+=Q,et!==0&&L-et<Y.storage&&(_+=L-et),k.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=_,_+=Y.storage}}}const T=_%L;return T>0&&(_+=L-T),w.__size=_,w.__cache={},this}function v(w){const M={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(M.boundary=4,M.storage=4):w.isVector2?(M.boundary=8,M.storage=8):w.isVector3||w.isColor?(M.boundary=16,M.storage=12):w.isVector4?(M.boundary=16,M.storage=16):w.isMatrix3?(M.boundary=48,M.storage=48):w.isMatrix4?(M.boundary=64,M.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),M}function m(w){const M=w.target;M.removeEventListener("dispose",m);const _=a.indexOf(M.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function f(){for(const w in s)i.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:l,update:h,dispose:f}}class Dv{constructor(t={}){const{canvas:e=Sf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const w=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Be,this.toneMapping=ni,this.toneMappingExposure=1;const _=this;let L=!1,T=0,E=0,C=null,y=-1,x=null;const P=new Qt,k=new Qt;let I=null;const N=new Et(0);let H=0,U=e.width,Y=e.height,z=1,Q=null,et=null;const rt=new Qt(0,0,U,Y),St=new Qt(0,0,U,Y);let xt=!1;const G=new Il;let J=!1,lt=!1;const ht=new Jt,yt=new Jt,Pt=new R,st=new Qt,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let q=!1;function K(){return C===null?z:1}let D=n;function zt(b,O){return e.getContext(b,O)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sl}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",mt,!1),D===null){const O="webgl2";if(D=zt(O,b),D===null)throw zt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ut,Ft,_t,ie,Nt,A,S,V,j,nt,Z,Lt,pt,wt,Kt,ot,bt,Ot,Bt,Tt,Yt,Wt,ce,F;function ft(){Ut=new B0(D),Ut.init(),Wt=new Sv(D,Ut),Ft=new D0(D,Ut,t,Wt),_t=new xv(D,Ut),Ft.reverseDepthBuffer&&d&&_t.buffers.depth.setReversed(!0),ie=new H0(D),Nt=new rv,A=new yv(D,Ut,_t,Nt,Ft,Wt,ie),S=new U0(_),V=new O0(_),j=new $f(D),ce=new P0(D,j),nt=new z0(D,j,ie,ce),Z=new V0(D,nt,j,ie),Bt=new G0(D,Ft,A),ot=new I0(Nt),Lt=new sv(_,S,V,Ut,Ft,ce,ot),pt=new Pv(_,Nt),wt=new ov,Kt=new fv(Ut),Ot=new C0(_,S,V,_t,Z,p,l),bt=new vv(_,Z,Ft),F=new Lv(D,ie,Ft,_t),Tt=new L0(D,Ut,ie),Yt=new k0(D,Ut,ie),ie.programs=Lt.programs,_.capabilities=Ft,_.extensions=Ut,_.properties=Nt,_.renderLists=wt,_.shadowMap=bt,_.state=_t,_.info=ie}ft();const $=new Rv(_,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=Ut.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ut.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(b){b!==void 0&&(z=b,this.setSize(U,Y,!1))},this.getSize=function(b){return b.set(U,Y)},this.setSize=function(b,O,W=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=b,Y=O,e.width=Math.floor(b*z),e.height=Math.floor(O*z),W===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(U*z,Y*z).floor()},this.setDrawingBufferSize=function(b,O,W){U=b,Y=O,z=W,e.width=Math.floor(b*W),e.height=Math.floor(O*W),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(rt)},this.setViewport=function(b,O,W,X){b.isVector4?rt.set(b.x,b.y,b.z,b.w):rt.set(b,O,W,X),_t.viewport(P.copy(rt).multiplyScalar(z).round())},this.getScissor=function(b){return b.copy(St)},this.setScissor=function(b,O,W,X){b.isVector4?St.set(b.x,b.y,b.z,b.w):St.set(b,O,W,X),_t.scissor(k.copy(St).multiplyScalar(z).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(b){_t.setScissorTest(xt=b)},this.setOpaqueSort=function(b){Q=b},this.setTransparentSort=function(b){et=b},this.getClearColor=function(b){return b.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor.apply(Ot,arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha.apply(Ot,arguments)},this.clear=function(b=!0,O=!0,W=!0){let X=0;if(b){let B=!1;if(C!==null){const ct=C.texture.format;B=ct===Pl||ct===Cl||ct===hr}if(B){const ct=C.texture.type,gt=ct===vn||ct===zn||ct===Js||ct===cs||ct===El||ct===Al,At=Ot.getClearColor(),Rt=Ot.getClearAlpha(),kt=At.r,Gt=At.g,Ct=At.b;gt?(g[0]=kt,g[1]=Gt,g[2]=Ct,g[3]=Rt,D.clearBufferuiv(D.COLOR,0,g)):(v[0]=kt,v[1]=Gt,v[2]=Ct,v[3]=Rt,D.clearBufferiv(D.COLOR,0,v))}else X|=D.COLOR_BUFFER_BIT}O&&(X|=D.DEPTH_BUFFER_BIT),W&&(X|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),wt.dispose(),Kt.dispose(),Nt.dispose(),S.dispose(),V.dispose(),Z.dispose(),ce.dispose(),F.dispose(),Lt.dispose(),$.dispose(),$.removeEventListener("sessionstart",Jl),$.removeEventListener("sessionend",jl),li.stop()};function tt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const b=ie.autoReset,O=bt.enabled,W=bt.autoUpdate,X=bt.needsUpdate,B=bt.type;ft(),ie.autoReset=b,bt.enabled=O,bt.autoUpdate=W,bt.needsUpdate=X,bt.type=B}function mt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ht(b){const O=b.target;O.removeEventListener("dispose",Ht),ve(O)}function ve(b){De(b),Nt.remove(b)}function De(b){const O=Nt.get(b).programs;O!==void 0&&(O.forEach(function(W){Lt.releaseProgram(W)}),b.isShaderMaterial&&Lt.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,W,X,B,ct){O===null&&(O=Mt);const gt=B.isMesh&&B.matrixWorld.determinant()<0,At=wd(b,O,W,X,B);_t.setMaterial(X,gt);let Rt=W.index,kt=1;if(X.wireframe===!0){if(Rt=nt.getWireframeAttribute(W),Rt===void 0)return;kt=2}const Gt=W.drawRange,Ct=W.attributes.position;let jt=Gt.start*kt,he=(Gt.start+Gt.count)*kt;ct!==null&&(jt=Math.max(jt,ct.start*kt),he=Math.min(he,(ct.start+ct.count)*kt)),Rt!==null?(jt=Math.max(jt,0),he=Math.min(he,Rt.count)):Ct!=null&&(jt=Math.max(jt,0),he=Math.min(he,Ct.count));const de=he-jt;if(de<0||de===1/0)return;ce.setup(B,X,At,W,Rt);let Ge,te=Tt;if(Rt!==null&&(Ge=j.get(Rt),te=Yt,te.setIndex(Ge)),B.isMesh)X.wireframe===!0?(_t.setLineWidth(X.wireframeLinewidth*K()),te.setMode(D.LINES)):te.setMode(D.TRIANGLES);else if(B.isLine){let Dt=X.linewidth;Dt===void 0&&(Dt=1),_t.setLineWidth(Dt*K()),B.isLineSegments?te.setMode(D.LINES):B.isLineLoop?te.setMode(D.LINE_LOOP):te.setMode(D.LINE_STRIP)}else B.isPoints?te.setMode(D.POINTS):B.isSprite&&te.setMode(D.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)te.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Ut.get("WEBGL_multi_draw"))te.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Dt=B._multiDrawStarts,Tn=B._multiDrawCounts,ee=B._multiDrawCount,cn=Rt?j.get(Rt).bytesPerElement:1,Li=Nt.get(X).currentProgram.getUniforms();for(let qe=0;qe<ee;qe++)Li.setValue(D,"_gl_DrawID",qe),te.render(Dt[qe]/cn,Tn[qe])}else if(B.isInstancedMesh)te.renderInstances(jt,de,B.count);else if(W.isInstancedBufferGeometry){const Dt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Tn=Math.min(W.instanceCount,Dt);te.renderInstances(jt,de,Tn)}else te.render(jt,de)};function se(b,O,W){b.transparent===!0&&b.side===fn&&b.forceSinglePass===!1?(b.side=ke,b.needsUpdate=!0,fr(b,O,W),b.side=ri,b.needsUpdate=!0,fr(b,O,W),b.side=fn):fr(b,O,W)}this.compile=function(b,O,W=null){W===null&&(W=b),f=Kt.get(W),f.init(O),M.push(f),W.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(f.pushLight(B),B.castShadow&&f.pushShadow(B))}),b!==W&&b.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(f.pushLight(B),B.castShadow&&f.pushShadow(B))}),f.setupLights();const X=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ct=B.material;if(ct)if(Array.isArray(ct))for(let gt=0;gt<ct.length;gt++){const At=ct[gt];se(At,W,B),X.add(At)}else se(ct,W,B),X.add(ct)}),M.pop(),f=null,X},this.compileAsync=function(b,O,W=null){const X=this.compile(b,O,W);return new Promise(B=>{function ct(){if(X.forEach(function(gt){Nt.get(gt).currentProgram.isReady()&&X.delete(gt)}),X.size===0){B(b);return}setTimeout(ct,10)}Ut.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let ln=null;function bn(b){ln&&ln(b)}function Jl(){li.stop()}function jl(){li.start()}const li=new Su;li.setAnimationLoop(bn),typeof self<"u"&&li.setContext(self),this.setAnimationLoop=function(b){ln=b,$.setAnimationLoop(b),b===null?li.stop():li.start()},$.addEventListener("sessionstart",Jl),$.addEventListener("sessionend",jl),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(O),O=$.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,O,C),f=Kt.get(b,M.length),f.init(O),M.push(f),yt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),G.setFromProjectionMatrix(yt),lt=this.localClippingEnabled,J=ot.init(this.clippingPlanes,lt),m=wt.get(b,w.length),m.init(),w.push(m),$.enabled===!0&&$.isPresenting===!0){const ct=_.xr.getDepthSensingMesh();ct!==null&&Sa(ct,O,-1/0,_.sortObjects)}Sa(b,O,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(Q,et),q=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,q&&Ot.addToRenderList(m,b),this.info.render.frame++,J===!0&&ot.beginShadows();const W=f.state.shadowsArray;bt.render(W,b,O),J===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,B=m.transmissive;if(f.setupLights(),O.isArrayCamera){const ct=O.cameras;if(B.length>0)for(let gt=0,At=ct.length;gt<At;gt++){const Rt=ct[gt];ec(X,B,b,Rt)}q&&Ot.render(b);for(let gt=0,At=ct.length;gt<At;gt++){const Rt=ct[gt];tc(m,b,Rt,Rt.viewport)}}else B.length>0&&ec(X,B,b,O),q&&Ot.render(b),tc(m,b,O);C!==null&&(A.updateMultisampleRenderTarget(C),A.updateRenderTargetMipmap(C)),b.isScene===!0&&b.onAfterRender(_,b,O),ce.resetDefaultState(),y=-1,x=null,M.pop(),M.length>0?(f=M[M.length-1],J===!0&&ot.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Sa(b,O,W,X){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||G.intersectsSprite(b)){X&&st.setFromMatrixPosition(b.matrixWorld).applyMatrix4(yt);const gt=Z.update(b),At=b.material;At.visible&&m.push(b,gt,At,W,st.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||G.intersectsObject(b))){const gt=Z.update(b),At=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),st.copy(b.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),st.copy(gt.boundingSphere.center)),st.applyMatrix4(b.matrixWorld).applyMatrix4(yt)),Array.isArray(At)){const Rt=gt.groups;for(let kt=0,Gt=Rt.length;kt<Gt;kt++){const Ct=Rt[kt],jt=At[Ct.materialIndex];jt&&jt.visible&&m.push(b,gt,jt,W,st.z,Ct)}}else At.visible&&m.push(b,gt,At,W,st.z,null)}}const ct=b.children;for(let gt=0,At=ct.length;gt<At;gt++)Sa(ct[gt],O,W,X)}function tc(b,O,W,X){const B=b.opaque,ct=b.transmissive,gt=b.transparent;f.setupLightsView(W),J===!0&&ot.setGlobalState(_.clippingPlanes,W),X&&_t.viewport(P.copy(X)),B.length>0&&dr(B,O,W),ct.length>0&&dr(ct,O,W),gt.length>0&&dr(gt,O,W),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function ec(b,O,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[X.id]===void 0&&(f.state.transmissionRenderTarget[X.id]=new gn(1,1,{generateMipmaps:!0,type:Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float")?Nn:vn,minFilter:yi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const ct=f.state.transmissionRenderTarget[X.id],gt=X.viewport||P;ct.setSize(gt.z,gt.w);const At=_.getRenderTarget();_.setRenderTarget(ct),_.getClearColor(N),H=_.getClearAlpha(),H<1&&_.setClearColor(16777215,.5),_.clear(),q&&Ot.render(W);const Rt=_.toneMapping;_.toneMapping=ni;const kt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),f.setupLightsView(X),J===!0&&ot.setGlobalState(_.clippingPlanes,X),dr(b,W,X),A.updateMultisampleRenderTarget(ct),A.updateRenderTargetMipmap(ct),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let Ct=0,jt=O.length;Ct<jt;Ct++){const he=O[Ct],de=he.object,Ge=he.geometry,te=he.material,Dt=he.group;if(te.side===fn&&de.layers.test(X.layers)){const Tn=te.side;te.side=ke,te.needsUpdate=!0,nc(de,W,X,Ge,te,Dt),te.side=Tn,te.needsUpdate=!0,Gt=!0}}Gt===!0&&(A.updateMultisampleRenderTarget(ct),A.updateRenderTargetMipmap(ct))}_.setRenderTarget(At),_.setClearColor(N,H),kt!==void 0&&(X.viewport=kt),_.toneMapping=Rt}function dr(b,O,W){const X=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ct=b.length;B<ct;B++){const gt=b[B],At=gt.object,Rt=gt.geometry,kt=X===null?gt.material:X,Gt=gt.group;At.layers.test(W.layers)&&nc(At,O,W,Rt,kt,Gt)}}function nc(b,O,W,X,B,ct){b.onBeforeRender(_,O,W,X,B,ct),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(_,O,W,X,b,ct),B.transparent===!0&&B.side===fn&&B.forceSinglePass===!1?(B.side=ke,B.needsUpdate=!0,_.renderBufferDirect(W,O,X,B,b,ct),B.side=ri,B.needsUpdate=!0,_.renderBufferDirect(W,O,X,B,b,ct),B.side=fn):_.renderBufferDirect(W,O,X,B,b,ct),b.onAfterRender(_,O,W,X,B,ct)}function fr(b,O,W){O.isScene!==!0&&(O=Mt);const X=Nt.get(b),B=f.state.lights,ct=f.state.shadowsArray,gt=B.state.version,At=Lt.getParameters(b,B.state,ct,O,W),Rt=Lt.getProgramCacheKey(At);let kt=X.programs;X.environment=b.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(b.isMeshStandardMaterial?V:S).get(b.envMap||X.environment),X.envMapRotation=X.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,kt===void 0&&(b.addEventListener("dispose",Ht),kt=new Map,X.programs=kt);let Gt=kt.get(Rt);if(Gt!==void 0){if(X.currentProgram===Gt&&X.lightsStateVersion===gt)return sc(b,At),Gt}else At.uniforms=Lt.getUniforms(b),b.onBeforeCompile(At,_),Gt=Lt.acquireProgram(At,Rt),kt.set(Rt,Gt),X.uniforms=At.uniforms;const Ct=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ct.clippingPlanes=ot.uniform),sc(b,At),X.needsLights=Td(b),X.lightsStateVersion=gt,X.needsLights&&(Ct.ambientLightColor.value=B.state.ambient,Ct.lightProbe.value=B.state.probe,Ct.directionalLights.value=B.state.directional,Ct.directionalLightShadows.value=B.state.directionalShadow,Ct.spotLights.value=B.state.spot,Ct.spotLightShadows.value=B.state.spotShadow,Ct.rectAreaLights.value=B.state.rectArea,Ct.ltc_1.value=B.state.rectAreaLTC1,Ct.ltc_2.value=B.state.rectAreaLTC2,Ct.pointLights.value=B.state.point,Ct.pointLightShadows.value=B.state.pointShadow,Ct.hemisphereLights.value=B.state.hemi,Ct.directionalShadowMap.value=B.state.directionalShadowMap,Ct.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ct.spotShadowMap.value=B.state.spotShadowMap,Ct.spotLightMatrix.value=B.state.spotLightMatrix,Ct.spotLightMap.value=B.state.spotLightMap,Ct.pointShadowMap.value=B.state.pointShadowMap,Ct.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=Gt,X.uniformsList=null,Gt}function ic(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=ta.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function sc(b,O){const W=Nt.get(b);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function wd(b,O,W,X,B){O.isScene!==!0&&(O=Mt),A.resetTextureUnits();const ct=O.fog,gt=X.isMeshStandardMaterial?O.environment:null,At=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Ms,Rt=(X.isMeshStandardMaterial?V:S).get(X.envMap||gt),kt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Gt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ct=!!W.morphAttributes.position,jt=!!W.morphAttributes.normal,he=!!W.morphAttributes.color;let de=ni;X.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(de=_.toneMapping);const Ge=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,te=Ge!==void 0?Ge.length:0,Dt=Nt.get(X),Tn=f.state.lights;if(J===!0&&(lt===!0||b!==x)){const tn=b===x&&X.id===y;ot.setState(X,b,tn)}let ee=!1;X.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==Tn.state.version||Dt.outputColorSpace!==At||B.isBatchedMesh&&Dt.batching===!1||!B.isBatchedMesh&&Dt.batching===!0||B.isBatchedMesh&&Dt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Dt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Dt.instancing===!1||!B.isInstancedMesh&&Dt.instancing===!0||B.isSkinnedMesh&&Dt.skinning===!1||!B.isSkinnedMesh&&Dt.skinning===!0||B.isInstancedMesh&&Dt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Dt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Dt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Dt.instancingMorph===!1&&B.morphTexture!==null||Dt.envMap!==Rt||X.fog===!0&&Dt.fog!==ct||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==ot.numPlanes||Dt.numIntersection!==ot.numIntersection)||Dt.vertexAlphas!==kt||Dt.vertexTangents!==Gt||Dt.morphTargets!==Ct||Dt.morphNormals!==jt||Dt.morphColors!==he||Dt.toneMapping!==de||Dt.morphTargetsCount!==te)&&(ee=!0):(ee=!0,Dt.__version=X.version);let cn=Dt.currentProgram;ee===!0&&(cn=fr(X,O,B));let Li=!1,qe=!1,Ts=!1;const fe=cn.getUniforms(),_n=Dt.uniforms;if(_t.useProgram(cn.program)&&(Li=!0,qe=!0,Ts=!0),X.id!==y&&(y=X.id,qe=!0),Li||x!==b){_t.buffers.depth.getReversed()?(ht.copy(b.projectionMatrix),bf(ht),Tf(ht),fe.setValue(D,"projectionMatrix",ht)):fe.setValue(D,"projectionMatrix",b.projectionMatrix),fe.setValue(D,"viewMatrix",b.matrixWorldInverse);const Hn=fe.map.cameraPosition;Hn!==void 0&&Hn.setValue(D,Pt.setFromMatrixPosition(b.matrixWorld)),Ft.logarithmicDepthBuffer&&fe.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&fe.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),x!==b&&(x=b,qe=!0,Ts=!0)}if(B.isSkinnedMesh){fe.setOptional(D,B,"bindMatrix"),fe.setOptional(D,B,"bindMatrixInverse");const tn=B.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),fe.setValue(D,"boneTexture",tn.boneTexture,A))}B.isBatchedMesh&&(fe.setOptional(D,B,"batchingTexture"),fe.setValue(D,"batchingTexture",B._matricesTexture,A),fe.setOptional(D,B,"batchingIdTexture"),fe.setValue(D,"batchingIdTexture",B._indirectTexture,A),fe.setOptional(D,B,"batchingColorTexture"),B._colorsTexture!==null&&fe.setValue(D,"batchingColorTexture",B._colorsTexture,A));const Es=W.morphAttributes;if((Es.position!==void 0||Es.normal!==void 0||Es.color!==void 0)&&Bt.update(B,W,cn),(qe||Dt.receiveShadow!==B.receiveShadow)&&(Dt.receiveShadow=B.receiveShadow,fe.setValue(D,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(_n.envMap.value=Rt,_n.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(_n.envMapIntensity.value=O.environmentIntensity),qe&&(fe.setValue(D,"toneMappingExposure",_.toneMappingExposure),Dt.needsLights&&bd(_n,Ts),ct&&X.fog===!0&&pt.refreshFogUniforms(_n,ct),pt.refreshMaterialUniforms(_n,X,z,Y,f.state.transmissionRenderTarget[b.id]),ta.upload(D,ic(Dt),_n,A)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ta.upload(D,ic(Dt),_n,A),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&fe.setValue(D,"center",B.center),fe.setValue(D,"modelViewMatrix",B.modelViewMatrix),fe.setValue(D,"normalMatrix",B.normalMatrix),fe.setValue(D,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const tn=X.uniformsGroups;for(let Hn=0,Gn=tn.length;Hn<Gn;Hn++){const rc=tn[Hn];F.update(rc,cn),F.bind(rc,cn)}}return cn}function bd(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function Td(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(b,O,W){Nt.get(b.texture).__webglTexture=O,Nt.get(b.depthTexture).__webglTexture=W;const X=Nt.get(b);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Ut.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,O){const W=Nt.get(b);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,W=0){C=b,T=O,E=W;let X=!0,B=null,ct=!1,gt=!1;if(b){const Rt=Nt.get(b);if(Rt.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(D.FRAMEBUFFER,null),X=!1;else if(Rt.__webglFramebuffer===void 0)A.setupRenderTarget(b);else if(Rt.__hasExternalTextures)A.rebindTextures(b,Nt.get(b.texture).__webglTexture,Nt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ct=b.depthTexture;if(Rt.__boundDepthTexture!==Ct){if(Ct!==null&&Nt.has(Ct)&&(b.width!==Ct.image.width||b.height!==Ct.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(b)}}const kt=b.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(gt=!0);const Gt=Nt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Gt[O])?B=Gt[O][W]:B=Gt[O],ct=!0):b.samples>0&&A.useMultisampledRTT(b)===!1?B=Nt.get(b).__webglMultisampledFramebuffer:Array.isArray(Gt)?B=Gt[W]:B=Gt,P.copy(b.viewport),k.copy(b.scissor),I=b.scissorTest}else P.copy(rt).multiplyScalar(z).floor(),k.copy(St).multiplyScalar(z).floor(),I=xt;if(_t.bindFramebuffer(D.FRAMEBUFFER,B)&&X&&_t.drawBuffers(b,B),_t.viewport(P),_t.scissor(k),_t.setScissorTest(I),ct){const Rt=Nt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,Rt.__webglTexture,W)}else if(gt){const Rt=Nt.get(b.texture),kt=O||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Rt.__webglTexture,W||0,kt)}y=-1},this.readRenderTargetPixels=function(b,O,W,X,B,ct,gt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=Nt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(At=At[gt]),At){_t.bindFramebuffer(D.FRAMEBUFFER,At);try{const Rt=b.texture,kt=Rt.format,Gt=Rt.type;if(!Ft.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ft.textureTypeReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-X&&W>=0&&W<=b.height-B&&D.readPixels(O,W,X,B,Wt.convert(kt),Wt.convert(Gt),ct)}finally{const Rt=C!==null?Nt.get(C).__webglFramebuffer:null;_t.bindFramebuffer(D.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(b,O,W,X,B,ct,gt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=Nt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(At=At[gt]),At){const Rt=b.texture,kt=Rt.format,Gt=Rt.type;if(!Ft.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ft.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=b.width-X&&W>=0&&W<=b.height-B){_t.bindFramebuffer(D.FRAMEBUFFER,At);const Ct=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ct),D.bufferData(D.PIXEL_PACK_BUFFER,ct.byteLength,D.STREAM_READ),D.readPixels(O,W,X,B,Wt.convert(kt),Wt.convert(Gt),0);const jt=C!==null?Nt.get(C).__webglFramebuffer:null;_t.bindFramebuffer(D.FRAMEBUFFER,jt);const he=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await wf(D,he,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ct),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ct),D.deleteBuffer(Ct),D.deleteSync(he),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,O=null,W=0){b.isTexture!==!0&&(Gs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,b=arguments[1]);const X=Math.pow(2,-W),B=Math.floor(b.image.width*X),ct=Math.floor(b.image.height*X),gt=O!==null?O.x:0,At=O!==null?O.y:0;A.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,gt,At,B,ct),_t.unbindTexture()},this.copyTextureToTexture=function(b,O,W=null,X=null,B=0){b.isTexture!==!0&&(Gs("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,b=arguments[1],O=arguments[2],B=arguments[3]||0,W=null);let ct,gt,At,Rt,kt,Gt,Ct,jt,he;const de=b.isCompressedTexture?b.mipmaps[B]:b.image;W!==null?(ct=W.max.x-W.min.x,gt=W.max.y-W.min.y,At=W.isBox3?W.max.z-W.min.z:1,Rt=W.min.x,kt=W.min.y,Gt=W.isBox3?W.min.z:0):(ct=de.width,gt=de.height,At=de.depth||1,Rt=0,kt=0,Gt=0),X!==null?(Ct=X.x,jt=X.y,he=X.z):(Ct=0,jt=0,he=0);const Ge=Wt.convert(O.format),te=Wt.convert(O.type);let Dt;O.isData3DTexture?(A.setTexture3D(O,0),Dt=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),Dt=D.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),Dt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const Tn=D.getParameter(D.UNPACK_ROW_LENGTH),ee=D.getParameter(D.UNPACK_IMAGE_HEIGHT),cn=D.getParameter(D.UNPACK_SKIP_PIXELS),Li=D.getParameter(D.UNPACK_SKIP_ROWS),qe=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,de.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,de.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Rt),D.pixelStorei(D.UNPACK_SKIP_ROWS,kt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Gt);const Ts=b.isDataArrayTexture||b.isData3DTexture,fe=O.isDataArrayTexture||O.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const _n=Nt.get(b),Es=Nt.get(O),tn=Nt.get(_n.__renderTarget),Hn=Nt.get(Es.__renderTarget);_t.bindFramebuffer(D.READ_FRAMEBUFFER,tn.__webglFramebuffer),_t.bindFramebuffer(D.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let Gn=0;Gn<At;Gn++)Ts&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Nt.get(b).__webglTexture,B,Gt+Gn),b.isDepthTexture?(fe&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Nt.get(O).__webglTexture,B,he+Gn),D.blitFramebuffer(Rt,kt,ct,gt,Ct,jt,ct,gt,D.DEPTH_BUFFER_BIT,D.NEAREST)):fe?D.copyTexSubImage3D(Dt,B,Ct,jt,he+Gn,Rt,kt,ct,gt):D.copyTexSubImage2D(Dt,B,Ct,jt,he+Gn,Rt,kt,ct,gt);_t.bindFramebuffer(D.READ_FRAMEBUFFER,null),_t.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else fe?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(Dt,B,Ct,jt,he,ct,gt,At,Ge,te,de.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(Dt,B,Ct,jt,he,ct,gt,At,Ge,de.data):D.texSubImage3D(Dt,B,Ct,jt,he,ct,gt,At,Ge,te,de):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,B,Ct,jt,ct,gt,Ge,te,de.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,B,Ct,jt,de.width,de.height,Ge,de.data):D.texSubImage2D(D.TEXTURE_2D,B,Ct,jt,ct,gt,Ge,te,de);D.pixelStorei(D.UNPACK_ROW_LENGTH,Tn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ee),D.pixelStorei(D.UNPACK_SKIP_PIXELS,cn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Li),D.pixelStorei(D.UNPACK_SKIP_IMAGES,qe),B===0&&O.generateMipmaps&&D.generateMipmap(Dt),_t.unbindTexture()},this.copyTextureToTexture3D=function(b,O,W=null,X=null,B=0){return b.isTexture!==!0&&(Gs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,b=arguments[2],O=arguments[3],B=arguments[4]||0),Gs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,O,W,X,B)},this.initRenderTarget=function(b){Nt.get(b).__webglFramebuffer===void 0&&A.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?A.setTextureCube(b,0):b.isData3DTexture?A.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?A.setTexture2DArray(b,0):A.setTexture2D(b,0),_t.unbindTexture()},this.resetState=function(){T=0,E=0,C=null,_t.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class Fl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Et(t),this.near=e,this.far=n}clone(){return new Fl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ol extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Iv{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=il,this.updateRanges=[],this.version=0,this.uuid=Fn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Fe=new R;class ra{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=mn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=mn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=mn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=mn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=mn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new xe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ra(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class al extends oi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Et(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let qi;const Ls=new R,Yi=new R,$i=new R,Ki=new it,Ds=new it,Cu=new Jt,Nr=new R,Is=new R,Fr=new R,nh=new it,Qa=new it,ih=new it;class sh extends we{constructor(t=new al){if(super(),this.isSprite=!0,this.type="Sprite",qi===void 0){qi=new ge;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Iv(e,5);qi.setIndex([0,1,2,0,2,3]),qi.setAttribute("position",new ra(n,3,0,!1)),qi.setAttribute("uv",new ra(n,2,3,!1))}this.geometry=qi,this.material=t,this.center=new it(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Yi.setFromMatrixScale(this.matrixWorld),Cu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),$i.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Yi.multiplyScalar(-$i.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Or(Nr.set(-.5,-.5,0),$i,a,Yi,s,r),Or(Is.set(.5,-.5,0),$i,a,Yi,s,r),Or(Fr.set(.5,.5,0),$i,a,Yi,s,r),nh.set(0,0),Qa.set(1,0),ih.set(1,1);let o=t.ray.intersectTriangle(Nr,Is,Fr,!1,Ls);if(o===null&&(Or(Is.set(-.5,.5,0),$i,a,Yi,s,r),Qa.set(0,1),o=t.ray.intersectTriangle(Nr,Fr,Is,!1,Ls),o===null))return;const l=t.ray.origin.distanceTo(Ls);l<t.near||l>t.far||e.push({distance:l,point:Ls.clone(),uv:sn.getInterpolation(Ls,Nr,Is,Fr,nh,Qa,ih,new it),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Or(i,t,e,n,s,r){Ki.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ds.x=r*Ki.x-s*Ki.y,Ds.y=s*Ki.x+r*Ki.y):Ds.copy(Ki),i.copy(t),i.x+=Ds.x,i.y+=Ds.y,i.applyMatrix4(Cu)}class er extends Ne{constructor(t=null,e=1,n=1,s,r,a,o,l,h=He,c=He,u,d){super(null,a,o,l,h,c,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Si extends xe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Zi=new Jt,rh=new Jt,Br=[],ah=new Ri,Uv=new Jt,Us=new at,Ns=new Ci;class Sn extends at{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Si(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Uv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ri),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Zi),ah.copy(t.boundingBox).applyMatrix4(Zi),this.boundingBox.union(ah)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ci),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Zi),Ns.copy(t.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(Ns)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Us.geometry=this.geometry,Us.material=this.material,Us.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ns.copy(this.boundingSphere),Ns.applyMatrix4(n),t.ray.intersectsSphere(Ns)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Zi),rh.multiplyMatrices(n,Zi),Us.matrixWorld=rh,Us.raycast(t,Br);for(let a=0,o=Br.length;a<o;a++){const l=Br[a];l.instanceId=r,l.object=this,e.push(l)}Br.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Si(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new er(new Float32Array(s*this.count),s,this.count,Rl,yn));const r=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Bl extends oi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const oh=new Jt,ol=new pu,zr=new Ci,kr=new R;class zl extends we{constructor(t=new ge,e=new Bl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(s),zr.radius+=r,t.ray.intersectsSphere(zr)===!1)return;oh.copy(s).invert(),ol.copy(t.ray).applyMatrix4(oh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=d,v=p;g<v;g++){const m=h.getX(g);kr.fromBufferAttribute(u,m),lh(kr,m,l,s,t,e,this)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,v=p;g<v;g++)kr.fromBufferAttribute(u,g),lh(kr,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function lh(i,t,e,n,s,r,a){const o=ol.distanceSqToPoint(i);if(o<e){const l=new R;ol.closestPointToPoint(i,l),l.applyMatrix4(n);const h=s.ray.origin.distanceTo(l);if(h<s.near||h>s.far)return;r.push({distance:h,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class bi extends Ne{constructor(t,e,n,s,r,a,o,l,h){super(t,e,n,s,r,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,h;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),h=n[s]-a,h<0)o=s+1;else if(h>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const c=n[s],d=n[s+1]-c,p=(a-c)/d;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new it:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new R,s=[],r=[],a=[],o=new R,l=new Jt;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let h=Number.MAX_VALUE;const c=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);c<=h&&(h=c,n.set(1,0,0)),u<=h&&(h=u,n.set(0,1,0)),d<=h&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Se(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Se(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class kl extends wn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new it){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const c=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=h-this.aY;l=d*c-p*u+this.aX,h=d*u+p*c+this.aY}return n.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Nv extends kl{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Hl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,h){s(a,o,h*(o-r),h*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,h,c,u){let d=(a-r)/h-(o-r)/(h+c)+(o-a)/c,p=(o-a)/c-(l-a)/(c+u)+(l-o)/u;d*=c,p*=c,s(a,o,d,p)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Hr=new R,Ja=new Hl,ja=new Hl,to=new Hl;class Pu extends wn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new R){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let h,c;this.closed||o>0?h=s[(o-1)%r]:(Hr.subVectors(s[0],s[1]).add(s[0]),h=Hr);const u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?c=s[(o+2)%r]:(Hr.subVectors(s[r-1],s[r-2]).add(s[r-1]),c=Hr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(h.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(c),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Ja.initNonuniformCatmullRom(h.x,u.x,d.x,c.x,g,v,m),ja.initNonuniformCatmullRom(h.y,u.y,d.y,c.y,g,v,m),to.initNonuniformCatmullRom(h.z,u.z,d.z,c.z,g,v,m)}else this.curveType==="catmullrom"&&(Ja.initCatmullRom(h.x,u.x,d.x,c.x,this.tension),ja.initCatmullRom(h.y,u.y,d.y,c.y,this.tension),to.initCatmullRom(h.z,u.z,d.z,c.z,this.tension));return n.set(Ja.calc(l),ja.calc(l),to.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new R().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ch(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Fv(i,t){const e=1-i;return e*e*t}function Ov(i,t){return 2*(1-i)*i*t}function Bv(i,t){return i*i*t}function Ys(i,t,e,n){return Fv(i,t)+Ov(i,e)+Bv(i,n)}function zv(i,t){const e=1-i;return e*e*e*t}function kv(i,t){const e=1-i;return 3*e*e*i*t}function Hv(i,t){return 3*(1-i)*i*i*t}function Gv(i,t){return i*i*i*t}function $s(i,t,e,n,s){return zv(i,t)+kv(i,e)+Hv(i,n)+Gv(i,s)}class Lu extends wn{constructor(t=new it,e=new it,n=new it,s=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new it){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($s(t,s.x,r.x,a.x,o.x),$s(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Vv extends wn{constructor(t=new R,e=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new R){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($s(t,s.x,r.x,a.x,o.x),$s(t,s.y,r.y,a.y,o.y),$s(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Du extends wn{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wv extends wn{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Iu extends wn{constructor(t=new it,e=new it,n=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new it){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ys(t,s.x,r.x,a.x),Ys(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xv extends wn{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ys(t,s.x,r.x,a.x),Ys(t,s.y,r.y,a.y),Ys(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uu extends wn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],h=s[a],c=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(ch(o,l.x,h.x,c.x,u.x),ch(o,l.y,h.y,c.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new it().fromArray(s))}return this}}var hh=Object.freeze({__proto__:null,ArcCurve:Nv,CatmullRomCurve3:Pu,CubicBezierCurve:Lu,CubicBezierCurve3:Vv,EllipseCurve:kl,LineCurve:Du,LineCurve3:Wv,QuadraticBezierCurve:Iu,QuadraticBezierCurve3:Xv,SplineCurve:Uu});class qv extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new hh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),h=l===0?0:1-a/l;return o.getPointAt(h,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let h=0;h<l.length;h++){const c=l[h];n&&n.equals(c)||(e.push(c),n=c)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new hh[s.type]().fromJSON(s))}return this}}class Yv extends qv{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Du(this.currentPoint.clone(),new it(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Iu(this.currentPoint.clone(),new it(t,e),new it(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Lu(this.currentPoint.clone(),new it(t,e),new it(n,s),new it(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Uu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const h=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+h,e+c,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const h=new kl(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);const c=h.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ds extends ge{constructor(t=[new it(0,-.5),new it(.5,0),new it(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Se(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],h=[],c=1/e,u=new R,d=new it,p=new R,g=new R,v=new R;let m=0,f=0;for(let w=0;w<=t.length-1;w++)switch(w){case 0:m=t[w+1].x-t[w].x,f=t[w+1].y-t[w].y,p.x=f*1,p.y=-m,p.z=f*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[w+1].x-t[w].x,f=t[w+1].y-t[w].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(g)}for(let w=0;w<=e;w++){const M=n+w*c*s,_=Math.sin(M),L=Math.cos(M);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*_,u.y=t[T].y,u.z=t[T].x*L,a.push(u.x,u.y,u.z),d.x=w/e,d.y=T/(t.length-1),o.push(d.x,d.y);const E=l[3*T+0]*_,C=l[3*T+1],y=l[3*T+0]*L;h.push(E,C,y)}}for(let w=0;w<e;w++)for(let M=0;M<t.length-1;M++){const _=M+w*t.length,L=_,T=_+t.length,E=_+t.length+1,C=_+1;r.push(L,T,C),r.push(E,C,T)}this.setIndex(r),this.setAttribute("position",new le(a,3)),this.setAttribute("uv",new le(o,2)),this.setAttribute("normal",new le(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ds(t.points,t.segments,t.phiStart,t.phiLength)}}class Ks extends ds{constructor(t=1,e=1,n=4,s=8){const r=new Yv;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new Ks(t.radius,t.length,t.capSegments,t.radialSegments)}}class Ti extends ge{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],h=new R,c=new it;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const p=n+u/e*s;h.x=t*Math.cos(p),h.y=t*Math.sin(p),a.push(h.x,h.y,h.z),o.push(0,0,1),c.x=(a[d]/t+1)/2,c.y=(a[d+1]/t+1)/2,l.push(c.x,c.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new le(a,3)),this.setAttribute("normal",new le(o,3)),this.setAttribute("uv",new le(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ti(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Me extends ge{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const h=this;s=Math.floor(s),r=Math.floor(r);const c=[],u=[],d=[],p=[];let g=0;const v=[],m=n/2;let f=0;w(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(c),this.setAttribute("position",new le(u,3)),this.setAttribute("normal",new le(d,3)),this.setAttribute("uv",new le(p,2));function w(){const _=new R,L=new R;let T=0;const E=(e-t)/n;for(let C=0;C<=r;C++){const y=[],x=C/r,P=x*(e-t)+t;for(let k=0;k<=s;k++){const I=k/s,N=I*l+o,H=Math.sin(N),U=Math.cos(N);L.x=P*H,L.y=-x*n+m,L.z=P*U,u.push(L.x,L.y,L.z),_.set(H,E,U).normalize(),d.push(_.x,_.y,_.z),p.push(I,1-x),y.push(g++)}v.push(y)}for(let C=0;C<s;C++)for(let y=0;y<r;y++){const x=v[y][C],P=v[y+1][C],k=v[y+1][C+1],I=v[y][C+1];(t>0||y!==0)&&(c.push(x,P,I),T+=3),(e>0||y!==r-1)&&(c.push(P,k,I),T+=3)}h.addGroup(f,T,0),f+=T}function M(_){const L=g,T=new it,E=new R;let C=0;const y=_===!0?t:e,x=_===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*x,0),d.push(0,x,0),p.push(.5,.5),g++;const P=g;for(let k=0;k<=s;k++){const N=k/s*l+o,H=Math.cos(N),U=Math.sin(N);E.x=y*U,E.y=m*x,E.z=y*H,u.push(E.x,E.y,E.z),d.push(0,x,0),T.x=H*.5+.5,T.y=U*.5*x+.5,p.push(T.x,T.y),g++}for(let k=0;k<s;k++){const I=L+k,N=P+k;_===!0?c.push(N,N+1,I):c.push(N+1,N,I),C+=3}h.addGroup(f,C,_===!0?1:2),f+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Me(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ii extends Me{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ii(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ai extends ge{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let h=0;const c=[],u=new R,d=new R,p=[],g=[],v=[],m=[];for(let f=0;f<=n;f++){const w=[],M=f/n;let _=0;f===0&&a===0?_=.5/e:f===n&&l===Math.PI&&(_=-.5/e);for(let L=0;L<=e;L++){const T=L/e;u.x=-t*Math.cos(s+T*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(s+T*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(T+_,1-M),w.push(h++)}c.push(w)}for(let f=0;f<n;f++)for(let w=0;w<e;w++){const M=c[f][w+1],_=c[f][w],L=c[f+1][w],T=c[f+1][w+1];(f!==0||a>0)&&p.push(M,_,T),(f!==n-1||l<Math.PI)&&p.push(_,L,T)}this.setIndex(p),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(v,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class fs extends ge{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],h=[],c=new R,u=new R,d=new R;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const v=g/s*r,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),c.x=t*Math.cos(v),c.y=t*Math.sin(v),d.subVectors(u,c).normalize(),l.push(d.x,d.y,d.z),h.push(g/s),h.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const v=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,w=(s+1)*p+g;a.push(v,m,w),a.push(m,f,w)}this.setIndex(a),this.setAttribute("position",new le(o,3)),this.setAttribute("normal",new le(l,3)),this.setAttribute("uv",new le(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class $v extends Re{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class qt extends oi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ll,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Gr extends qt{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Se(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Et(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Et(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Et(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Nu extends oi{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ll,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Gl extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Et(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Fu extends Gl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Et(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const eo=new Jt,uh=new R,dh=new R;class Ou{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Il,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new Qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;uh.setFromMatrixPosition(t.matrixWorld),e.position.copy(uh),dh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(dh),e.updateMatrixWorld(),eo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(eo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(eo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const fh=new Jt,Fs=new R,no=new R;class Kv extends Ou{constructor(){super(new Ze(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new it(4,2),this._viewportCount=6,this._viewports=[new Qt(2,1,1,1),new Qt(0,1,1,1),new Qt(3,1,1,1),new Qt(1,1,1,1),new Qt(3,0,1,1),new Qt(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Fs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Fs),no.copy(n.position),no.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(no),n.updateMatrixWorld(),s.makeTranslation(-Fs.x,-Fs.y,-Fs.z),fh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fh)}}class Zv extends Gl{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Kv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Qv extends Ou{constructor(){super(new Ul(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Bu extends Gl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new Qv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Jv{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ph(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=ph();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function ph(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sl);function jv(i,t){let e;try{e=new Dv({canvas:i,antialias:!0,powerPreference:"high-performance",stencil:!1,depth:!0})}catch(n){return console.error("[render] WebGLRenderer 生成失敗:",n),null}return e.getContext()?(e.setPixelRatio(Math.min(window.devicePixelRatio||1,t)),e.setSize(window.innerWidth,window.innerHeight,!1),e.setClearColor(8894688,1),e.toneMapping=bl,e.toneMappingExposure=1.12,e.outputColorSpace=Be,e):null}function ll(i,t){i.setPixelRatio(Math.min(window.devicePixelRatio||1,t)),i.setSize(window.innerWidth,window.innerHeight,!1)}function t_(i,t){i.setSize(window.innerWidth,window.innerHeight,!1),t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix()}const zu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ws{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const e_=new Ul(-1,1,1,-1,0,1);class n_ extends ge{constructor(){super(),this.setAttribute("position",new le([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new le([0,2,0,0,2,0],2))}}const i_=new n_;class Vl{constructor(t){this._mesh=new at(i_,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,e_)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class s_ extends ws{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Re?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=tr.clone(t.uniforms),this.material=new Re({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Vl(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class mh extends ws{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class r_ extends ws{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class a_{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new it);this._width=n.width,this._height=n.height,e=new gn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Nn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new s_(zu),this.copyPass.material.blending=Un,this.clock=new Jv}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}mh!==void 0&&(a instanceof mh?n=!0:a instanceof r_&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new it);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class o_ extends ws{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Et}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}const l_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Et(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ps extends ws{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new it(t.x,t.y):new it(256,256),this.clearColor=new Et(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new gn(r,a,{type:Nn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new gn(r,a,{type:Nn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const p=new gn(r,a,{type:Nn});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),a=Math.round(a/2)}const o=l_;this.highPassUniforms=tr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Re({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new it(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=zu;this.copyUniforms=tr.clone(c.uniforms),this.blendMaterial=new Re({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:Qs,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Et,this.oldClearAlpha=1,this.basic=new Qe,this.fsQuad=new Vl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new it(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=ps.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ps.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Re({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new it(.5,.5)},direction:{value:new it(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new Re({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}ps.BlurDirectionX=new it(1,0);ps.BlurDirectionY=new it(0,1);const c_={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class h_ extends ws{constructor(){super();const t=c_;this.uniforms=tr.clone(t.uniforms),this.material=new $v({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Vl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},$t.getTransfer(this._outputColorSpace)===re&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===$h?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Kh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Zh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===bl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Qh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Jh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Jn={x:.55,y:.62,z:.28},We={SEA_LEVEL:-3,FLAT_RADIUS:3200,FOG_NEAR:2600,FOG_FAR:34e3},Kn={FOV:60,FOV_COCKPIT:62,BLEND_TIME:.65,ORBIT_SPEED:.12},nr={ultra:{pixelRatio:3,shadows:!0,shadowMapSize:4096,treeCount:2e3,cityCount:520,cloudCount:44,terrainNearSeg:320,terrainMid:!0,shadowRange:2800,bloom:!0,runwayTexPx:1024},high:{pixelRatio:2,shadows:!0,shadowMapSize:2048,treeCount:1400,cityCount:380,cloudCount:34,terrainNearSeg:256,terrainMid:!0,shadowRange:2600,bloom:!0,runwayTexPx:1024},medium:{pixelRatio:1.5,shadows:!0,shadowMapSize:1024,treeCount:650,cityCount:220,cloudCount:22,terrainNearSeg:128,terrainMid:!0,shadowRange:2e3,bloom:!1,runwayTexPx:512},low:{pixelRatio:1,shadows:!1,shadowMapSize:512,treeCount:320,cityCount:130,cloudCount:14,terrainNearSeg:96,terrainMid:!1,shadowRange:1400,bloom:!1,runwayTexPx:512}},Bn=[{id:"b737",name:"B737 相当「ナローボディ」",description:"B737-700 実データ準拠（JAL/JTA SOP マニュアル反映）。単通路機・翼下ナセル。",fuselageLength:33.6,fuselageRadius:1.88,wingspan:35.8,rootChord:7.2,tipChord:1.6,sweep:.436,dihedral:.096,tailHeight:12.6,tailRootChord:5.2,engineDiameter:1.55,engineLength:3.9,engineSpanPos:.3,engineForward:1.6,mainWheelCount:2,liveryName:"SKYLINER",liveryRegistration:"JA73AI",liveryTop:15265524,liveryBottom:2772860,liveryAccent:16757308,mass:62e3,wingArea:124,thrustMax:235e3,vRotate:73,vCruise:230,vApproach:68},{id:"a320",name:"A320 相当「ナローボディ」",description:"単通路機。シャークレット付きの現代的な翼形状。中短距離の主力。",fuselageLength:37.6,fuselageRadius:1.98,wingspan:35.8,rootChord:7.4,tipChord:1.7,sweep:.401,dihedral:.087,tailHeight:11.9,tailRootChord:5,engineDiameter:1.6,engineLength:4.1,engineSpanPos:.31,engineForward:1.7,mainWheelCount:2,liveryName:"SKYLINER",liveryRegistration:"JA20AS",liveryTop:15922423,liveryBottom:1916782,liveryAccent:5227511,mass:78e3,wingArea:122,thrustMax:22e4,vRotate:73,vCruise:232,vApproach:68},{id:"b777",name:"B777 相当「ワイドボディ」",description:"大型双通路機。巨大エンジンと長い胴体。長距離路線の主力。",fuselageLength:73.9,fuselageRadius:3.1,wingspan:64.8,rootChord:13,tipChord:2.6,sweep:.506,dihedral:.07,tailHeight:18.6,tailRootChord:9.4,engineDiameter:3.2,engineLength:7.2,engineSpanPos:.28,engineForward:2.6,mainWheelCount:3,liveryName:"SKYLINER",liveryRegistration:"JA77AJ",liveryTop:15659509,liveryBottom:1323086,liveryAccent:16739162,mass:299e3,wingArea:428,thrustMax:72e4,vRotate:82,vCruise:248,vApproach:76}];function io(i){return Bn.find(t=>t.id===i)??Bn[0]}const je=[{id:"hlm",name:"湾岸国際空港",code:"HLM",description:"海沿いの国際空港。滑走路 34/16、海岸線と市街地が隣接。",center:{x:0,z:0},heading:0,length:4e3,width:60,runwayNumbers:["34","16"]},{id:"sky",name:"丘陵空港",code:"SKY",description:"内陸の空港。東西滑走路 27/09（2600m）で風向きに強い。",center:{x:1900,z:-1400},heading:Math.PI/2,length:2600,width:45,runwayNumbers:["27","09"]},{id:"palm",name:"パーム島空港",code:"PMS",description:"南海上の環礁島にある離島空港。滑走路 09/27（1,800m）両端とも海。",center:{x:13500,z:9500},heading:Math.PI/2,length:1800,width:45,runwayNumbers:["09","27"]}];function gh(i){return je.find(t=>t.id===i)??je[0]}class u_{level="high";preset=nr.high;fpsSamples=[];fps=60;setLevel(t){this.level=t,this.preset=nr[t]}sample(t){if(t<=0)return;this.fpsSamples.push(1/t),this.fpsSamples.length>60&&this.fpsSamples.shift();const e=[...this.fpsSamples].sort((n,s)=>n-s);this.fps=e[Math.floor(e.length/2)]??60}getFps(){return this.fps}}function d_(i,t){const e=new R(Jn.x,Jn.y,Jn.z).normalize(),n={uTop:{value:new Et(3040192)},uHorizon:{value:new Et(12901102)},uSunDir:{value:e.clone()},uSunColor:{value:new Et(1,.93,.8)}},s=new Re({uniforms:n,vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, -0.06, 1.0);
        // 大気散乱の近似: 低い空ほど光路長が長く白っぽく
        vec3 col = mix(uHorizon, uTop, pow(max(h, 0.0), 0.52));
        float sunAmt = max(dot(d, normalize(uSunDir)), 0.0);
        col += uSunColor * pow(sunAmt, 1200.0) * 3.2;   // 太陽ディスク
        col += uSunColor * pow(sunAmt, 18.0) * 0.30;    // 内側グロー
        col += uSunColor * pow(sunAmt, 3.5) * 0.12;     // 広域ハズレ
        gl_FragColor = vec4(col, 1.0);
      }
    `,side:ke,depthWrite:!1,fog:!1}),r=new at(new ai(24e3,32,16),s);r.frustumCulled=!1,r.renderOrder=-10,i.add(r);const a=new sl(t),o=new Ol,l=new at(new ai(100,32,16),s);l.frustumCulled=!1,o.add(l);let h=a.fromScene(o,.04);i.environment=h.texture;const c=a,u=new Bu(16773596,2.4);u.position.copy(e).multiplyScalar(3200),i.add(u),i.add(u.target);const d=new Fu(12376304,6978136,.75);i.add(d);const p=1400,g=new Float32Array(p*3),v=new Float32Array(p);{let _=20261104;const L=()=>(_=_*1103515245+12345&2147483647,_/2147483647);for(let T=0;T<p;T++){const E=L()*Math.PI*2,C=Math.acos(1-L()),y=21e3;g[T*3]=Math.sin(C)*Math.cos(E)*y,g[T*3+1]=Math.cos(C)*y,g[T*3+2]=Math.sin(C)*Math.sin(E)*y,v[T]=0}}const m=new ge;m.setAttribute("position",new xe(g,3));const f=(()=>{const _=document.createElement("canvas");_.width=_.height=32;const L=_.getContext("2d"),T=L.createRadialGradient(16,16,1,16,16,15);return T.addColorStop(0,"rgba(255,255,255,1)"),T.addColorStop(.35,"rgba(235,242,255,0.85)"),T.addColorStop(1,"rgba(235,242,255,0)"),L.fillStyle=T,L.fillRect(0,0,32,32),new bi(_)})(),w=new Bl({color:14674175,size:3.2,sizeAttenuation:!1,map:f,alphaTest:.02,transparent:!0,opacity:0,blending:Qs,depthWrite:!1,fog:!1}),M=new zl(m,w);return M.renderOrder=-9,M.frustumCulled=!1,i.add(M),{sky:r,sun:u,hemi:d,sunDir:e,setSunElevation(_){const L=Math.sqrt(Math.max(1-_*_,1e-4));e.set(Jn.x*L,Math.max(_,.03),Jn.z*L).normalize(),n.uSunDir.value.copy(e),u.position.copy(e).multiplyScalar(3200)},setPalette(_,L,T,E,C){n.uTop.value.setHex(_),n.uHorizon.value.setHex(L),n.uSunColor.value.setHex(T),u.color.setHex(T),u.intensity=E,d.intensity=C,d.color.setHex(L)},setStars(_){w.opacity=Math.max(0,Math.min(1,_))*.8,M.visible=_>.02},regenerateEnv(_){const L=h;h=c.fromScene(o,.04),_.environment=h.texture,L.dispose()}}}function f_(i){return new Worker(""+new URL("worldgen.worker-e5VW3tDd.js",import.meta.url).href,{name:i?.name})}function is(i,t,e){return i<t?t:i>e?e:i}function so(i,t,e){return i+(t-i)*e}function ir(i,t,e){const n=is((e-i)/(t-i),0,1);return n*n*(3-2*n)}function vh(i,t){return 1-Math.exp(-i*t)}function Wl(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Vr(i,t){let e=Math.imul(i,374761393)+Math.imul(t,668265263);return e=Math.imul(e^e>>>13,1274126177),((e^e>>>16)>>>0)/4294967296}function aa(i,t){const e=Math.floor(i),n=Math.floor(t),s=i-e,r=t-n,a=s*s*(3-2*s),o=r*r*(3-2*r),l=Vr(e,n),h=Vr(e+1,n),c=Vr(e,n+1),u=Vr(e+1,n+1);return so(so(l,h,a),so(c,u,a),o)}function Zn(i,t,e){let n=.5,s=1,r=0,a=0;for(let o=0;o<e;o++)r+=n*aa(i*s,t*s),a+=n,n*=.5,s*=2.03;return r/a}const ku=[{pts:[[-14e3,-7e3],[-9e3,-5600],[-4e3,-4800],[1e3,-4300],[6e3,-2e3],[1e4,2e3],[13e3,7e3]],width:70},{pts:[[-16e3,3e3],[-11e3,3600],[-6500,4200],[-2e3,5200],[2500,7e3],[7e3,9500]],width:54}],oa=[];for(const i of ku)for(let t=0;t<i.pts.length-1;t++)oa.push({x0:i.pts[t][0],z0:i.pts[t][1],x1:i.pts[t+1][0],z1:i.pts[t+1][1],w:i.width});function p_(i,t,e){const n=e.x1-e.x0,s=e.z1-e.z0,r=is(((i-e.x0)*n+(t-e.z0)*s)/(n*n+s*s),0,1);return Math.hypot(i-(e.x0+n*r),t-(e.z0+s*r))}function m_(i,t){let e=0;for(const n of oa){const s=p_(i,t,n),r=26*(1-ir(n.w*.5,n.w*1.6,s)),a=14*(1-ir(n.w*2,1300,s));e=Math.max(e,r+a)}return e}function Hu(i,t){const e=i+900*(Zn(i*21e-6+5.2,t*21e-6+1.3,2)-.5),n=t+900*(Zn(i*21e-6+9.1,t*21e-6+4.4,2)-.5),s=Zn(e*45e-6+3.1,n*45e-6+7.7,3),r=Math.pow(1-Math.abs(2*Zn(e*13e-5+21.3,n*13e-5+5.9,3)-1),2.2),a=Math.pow(1-Math.abs(2*Zn(e*9e-5+40.7,n*9e-5+17.2,3)-1),2.6),o=Math.pow(1-Math.abs(2*Zn(e*26e-5+61.3,n*26e-5+33.7,3)-1),3.1),l=ir(.45,.68,s),h=(Zn(i*28e-5+11.7,t*28e-5+2.4,2)-.5)*260,c=(aa(i*.0011+2.2,t*.0011+6.6)-.5)*22,u=(Zn(i*35e-5+8.3,t*35e-5+4.1,2)-.5)*150;return(s-.31)*900+(r*1900+a*1100+o*300)*l+h+c+u}function Gu(i,t){let e=0;for(const n of je){const s=Math.hypot(i-n.center.x,t-n.center.z);e=Math.max(e,1-ir(We.FLAT_RADIUS,We.FLAT_RADIUS+3800,s))}return 1-e}function Vu(i,t){return ir(7e3,12e3,(i+t)*.7071)}let ms=null;function g_(i){const t=new DataView(i);if(String.fromCharCode(t.getUint8(0),t.getUint8(1),t.getUint8(2),t.getUint8(3))!=="ERA1"||i.byteLength<32)throw new Error("bake magic/size");const n=t.getUint32(4,!0),s=t.getFloat64(16,!0),r=t.getFloat64(24,!0);if(i.byteLength<32+n*n*4*2)throw new Error("bake truncated");ms={N:n,cell:s,min:r,buf:i,ero:new Uint32Array(i,32,n*n),shade:new Uint8Array(i,32+n*n*4,n*n*4)}}const Zs=()=>ms,v_=()=>ms?ms.buf.slice(0):null;function Wu(i,t){if(!ms)return 0;const{N:e,ero:n,cell:s,min:r}=ms,a=(i-r)/s-.5,o=(t-r)/s-.5,l=Math.floor(a),h=Math.floor(o),c=a-l,u=o-h,d=(p,g)=>p<0||g<0||p>=e||g>=e?0:(n[g*e+p]&65535)/256-128;return d(l,h)*(1-c)*(1-u)+d(l+1,h)*c*(1-u)+d(l,h+1)*(1-c)*u+d(l+1,h+1)*c*u}function __(i,t){const e=Gu(i,t);return(Hu(i,t)+Wu(i,t))*e-Vu(i,t)*520*e}function _e(i,t){const e=Gu(i,t);return(Hu(i,t)+Wu(i,t)-m_(i,t)*e)*e-Vu(i,t)*520*e}const _h=2400;function jn(i,t,e,n,s,r,a,o,l){const h=Math.cos(r),c=Math.sin(r),u=t*16;i[u]=h*a,i[u+1]=0,i[u+2]=-c*a,i[u+3]=0,i[u+4]=0,i[u+5]=o,i[u+6]=0,i[u+7]=0,i[u+8]=c*l,i[u+9]=0,i[u+10]=h*l,i[u+11]=0,i[u+12]=e,i[u+13]=n,i[u+14]=s,i[u+15]=1}class Xu{map=new Map;add(t,e,n,s,r){const a=`${Math.floor(t/_h)},${Math.floor(e/_h)}`;let o=this.map.get(a);o||this.map.set(a,o={x:[],z:[],y:[],m:[],c:[]}),o.x.push(t),o.z.push(e),o.y.push(n);for(let l=0;l<16;l++)o.m.push(s[l]);if(r)for(let l=0;l<3;l++)o.c.push(r[l])}pack(){const t=[];for(const e of this.map.values()){let n=0,s=0,r=0;for(let c=0;c<e.x.length;c++)n+=e.x[c],s+=e.y[c],r+=e.z[c];const a=n/e.x.length,o=s/e.x.length,l=r/e.x.length;let h=0;for(let c=0;c<e.x.length;c++)h=Math.max(h,Math.hypot(e.x[c]-a,e.z[c]-l));t.push({cx:a,cy:o,cz:l,r:h+320,n:e.x.length,m:Float32Array.from(e.m),c:e.c.length?Float32Array.from(e.c):new Float32Array(e.x.length*3)})}return t}}function Xl(i){const t=Wl(20261009),e=new Xu,n=[],s=[],r=[],a=[],o=7800,l=-3200,h=210,c=new Float32Array(16),u=new Float32Array(3);for(let I=0;I<i;I++){const N=t()*Math.PI*2,H=600+Math.pow(t(),.7)*3400,U=o+Math.cos(N)*H,Y=l+Math.sin(N)*H*.8,z=Math.round(U/h)*h,Q=Math.round(Y/h)*h,et=t()<.5?0:1,rt=Math.sign(et===0?U-z:Y-Q)||1,St=(t()-.5)*(h-70),xt=et===0?z+rt*(h/2-26):z+St,G=et===1?Q+rt*(h/2-26):Q+St,J=(xt-o)/1.24,lt=G-l,ht=2450+Math.sin(Math.atan2(lt,J)*5+1.3)*190;if(Math.abs(Math.hypot(J,lt)-ht)<62)continue;const yt=_e(xt,G);if(yt<4)continue;const Pt=is(1-H/3800,0,1),st=H>2750&&t()<.55,Mt=st?9+t()*15:22+t()*90*(.35+Pt*1.4),q=st?13+t()*16:26+t()*38,K=st?13+t()*16:26+t()*38,D=(t()-.5)*.1;et===0?jn(c,0,xt,yt-1,G,D,K,Mt,q):jn(c,0,xt,yt-1,G,D,q,Mt,K);const zt=.72+t()*.28;u[0]=zt*.95,u[1]=zt*.97,u[2]=zt,e.add(xt,G,yt,c,u),n.push(xt,G,.4*Math.hypot(q,K)+3,yt+Mt)}const d=46,p=[[o,l,1],[o+1500,l+900,.62],[o-1350,l-650,.55],[o+350,l-1500,.45]];let g=0;for(let I=0;I<p.length&&g<d;I++){const[N,H,U]=p[I],Y=Math.min(I===0?22:8,d-g);for(let z=0;z<Y;z++){const Q=t()*Math.PI*2,et=Math.pow(t(),.8)*(I===0?620:380),rt=N+Math.cos(Q)*et*1.25,St=H+Math.sin(Q)*et,xt=_e(rt,St);if(xt<5)continue;const G=150+Math.pow(t(),1.7)*185*(.55+U*.75),J=24+t()*20,lt=24+t()*20,ht=Math.round(t()*4)*(Math.PI/2)+(t()-.5)*.12;jn(c,0,rt,xt-2,St,ht,J,G,lt);for(let Pt=0;Pt<16;Pt++)s.push(c[Pt]);const yt=.82+t()*.18;r.push(yt*.86,yt*.95,yt),a.push(rt,xt-2,St,G),n.push(rt,St,.42*Math.max(J,lt)+4,xt+G),g++}}const v=[];for(let I=0;I<a.length;I+=4)v.push(a[I],a[I+1]+a[I+3]-2,a[I+2]);const m=[],f=(I,N)=>({x:I,y:N}),w=(I,N,H,U)=>{const Y=Math.sin(H),z=Math.cos(H);m.push([f(I-Y*U,N-z*U),f(I+Y*U,N+z*U)])};for(let I=0;I<3;I++){const N=.5+I*.55;w(o-2600+I*1900,l+800,N,4500)}m.push([f(2100,-1900),f(3200,-2200),f(4500,-2600),f(6e3,-3e3),f(o,l),f(o+800,l-300)]);{const I=[];for(let N=0;N<=34;N++){const H=N/34*Math.PI*2,U=2450+Math.sin(H*5+1.3)*190;I.push(f(o+Math.cos(H)*U*1.24,l+Math.sin(H)*U))}m.push(I)}m.push([f(o-2260,l+420),f(1200,-1e3),f(-1400,-2500)]),m.push([f(o+1250,l+1560),f(4100,3600),f(2900,6300)]);const M=m.length;{const N=(Q,et)=>Math.hypot(Q-o,(et-l)/.8)>640&&Math.hypot(Q-o,(et-l)/.8)<3650,H=Math.round((o-3650)/h),U=Math.round((o+3650)/h),Y=Math.round((l-3650*.8)/h),z=Math.round((l+3650*.8)/h);for(let Q=H;Q<=U;Q++){const et=(Q+.5)*h,rt=[];let St=0;for(let xt=Y-2;xt<=z+2;xt++){const G=(xt+.5)*h;if(N(et,G))rt.push(f(et,G)),St=0;else if(++St>2&&rt.length)break}rt.length>2&&m.push(rt)}for(let Q=Y;Q<=z;Q++){const et=(Q+.5)*h,rt=[];let St=0;for(let xt=H-2;xt<=U+2;xt++){const G=(xt+.5)*h;if(N(G,et))rt.push(f(G,et)),St=0;else if(++St>2&&rt.length)break}rt.length>2&&m.push(rt)}}const _=[],L=[],T=[],E=[];let C=0;for(let I=0;I<m.length;I++){const N=m[I],H=[];for(let U=0;U<N.length-1;U++){const Y=Math.max(1,Math.round(Math.hypot(N[U+1].x-N[U].x,N[U+1].y-N[U].y)/120));for(let z=0;z<Y;z++)H.push(f(N[U].x+(N[U+1].x-N[U].x)*(z/Y),N[U].y+(N[U+1].y-N[U].y)*(z/Y)))}H.push(f(N[N.length-1].x,N[N.length-1].y));for(let U=0;U<H.length;U++){const Y=H[Math.max(0,U-1)],z=H[Math.min(H.length-1,U+1)],Q=Math.hypot(z.x-Y.x,z.y-Y.y)||1,et=(z.x-Y.x)/Q,rt=(z.y-Y.y)/Q,St=-rt,xt=et,G=11;if(U%2===0&&T.push([H[U].x,H[U].y,Math.atan2(rt,et),I<M]),U%6===2&&E.length<4500)for(const lt of[-1,1])E.push(H[U].x+St*lt*27,H[U].y+xt*lt*27,.72+t()*.55);const J=Math.max(_e(H[U].x,H[U].y)+.35,-2.6);if(_.push(H[U].x+St*G,J,H[U].y+xt*G),_.push(H[U].x-St*G,J,H[U].y-xt*G),U<H.length-1){const lt=C+U*2;L.push(lt,lt+1,lt+2,lt+1,lt+3,lt+2)}}C+=H.length*2}const y=620;let x=0;for(const[I,N,H,U]of T){if(x>=y-2)break;const Y=Math.hypot(I-o,N-l)<4100;if(Y&&!U)continue;let z=!1;for(const Q of je)Math.hypot(I-Q.center.x,N-Q.center.z)<3700&&(z=!0);if(!z)for(const Q of[-1,1]){if(x>=y)break;if(!Y&&t()>.6)continue;const et=(Y?62:56)+t()*(Y?42:120),rt=-Math.sin(H)*Q,St=Math.cos(H)*Q,xt=I+rt*et+(t()-.5)*44,G=N+St*et+(t()-.5)*44,J=_e(xt,G);if(J<(Y?2.5:4))continue;const lt=Y?9+t()*15:7+t()*16,ht=12+t()*15,yt=12+t()*15;jn(c,0,xt,J-1,G,H+(t()-.5)*.3,ht,lt,yt);const Pt=.78+t()*.22;u[0]=Pt,u[1]=Pt*.97,u[2]=Pt*.93,e.add(xt,G,J,c,u),n.push(xt,G,.4*Math.hypot(ht,yt)+3,J+lt),x++}}const P=120;let k=0;for(const I of je){const N=Math.floor(P/je.length);for(let H=0;H<N&&k<P;H++){const U=t()*Math.PI*2,Y=3650+t()*1500,z=I.center.x+Math.cos(U)*Y*1.12,Q=I.center.z+Math.sin(U)*Y,et=_e(z,Q);if(et<4)continue;const rt=8+t()*20,St=16+t()*30,xt=16+t()*30;jn(c,0,z,et-1,Q,Math.round(t()*4)*(Math.PI/2),St,rt,xt);const G=.7+t()*.3;u[0]=G*.96,u[1]=G*.97,u[2]=G,e.add(z,Q,et,c,u),n.push(z,Q,.4*Math.hypot(St,xt)+3,et+rt),k++}}return{buckets:e.pack(),towers:{m:new Float32Array(s),c:new Float32Array(r),n:s.length/16},beacons:new Float32Array(v),colliders:new Float64Array(n),roads:{pos:new Float32Array(_),idx:new Uint32Array(L)},roadside:new Float32Array(E)}}function qu(i,t){const e=Wl(777001),n=new Xu,s=new Float32Array(16),r=new Float32Array(3);let a=0,o=0;for(;a<t&&o++<t*40;){const l=e()*Math.PI*2,h=3800+e()*14e3,c=Math.cos(l)*h-2e3,u=Math.sin(l)*h-2e3,d=_e(c,u);if(d<12||d>520||aa(c*62e-5+17.3,u*62e-5+3.9)<.44||Math.hypot(_e(c+40,u)-d,_e(c,u+40)-d)/40>.85)continue;const g=.8+e()*1.5*(.8+aa(c*.004+5.5,u*.004+8.1)*.5),v=e()*Math.PI*2,m=g*(.85+e()*.55);jn(s,0,c,d-.6,u,v,g,m,g);const f=.72+e()*.45;r[0]=f*.9,r[1]=f,r[2]=f*.82,n.add(c,u,d,s,r),a++}for(const l of je)for(let c=0;c<44&&a<t;c++){const u=c/44*Math.PI*2+(e()-.5)*.06,d=u-l.heading;if(Math.abs(Math.cos(d))>.62)continue;const p=3760+e()*260,g=l.center.x+Math.cos(u)*p*1.14,v=l.center.z+Math.sin(u)*p,m=_e(g,v);if(m<1)continue;const f=1+e()*.9,w=e()*Math.PI*2,M=f*(.9+e()*.5);jn(s,0,g,m-.6,v,w,f,M,f);const _=.68+e()*.4;r[0]=_*.88,r[1]=_,r[2]=_*.8,n.add(g,v,m,s,r),a++}for(let l=0;l+2<i.length&&!(a>=t);l+=3){const h=i[l],c=i[l+1],u=i[l+2],d=_e(h,c);if(d<.5)continue;const p=e()*Math.PI*2;jn(s,0,h,d-.5,c,p,u,u,u);const g=.8+e()*.3;r[0]=g*.72,r[1]=g,r[2]=g*.7,n.add(h,c,d,s,r),a++}return{buckets:n.pack(),n:a}}function x_(i,t,e,n){const s=n/512;i.save(),i.scale(s,s),i.fillStyle="#31363c",i.fillRect(0,0,512,4096);let r=1234;const a=()=>(r=r*1103515245+12345&2147483647,r/2147483647);for(let o=0;o<90;o++){const l=42+a()*26;i.fillStyle=`rgba(${l},${l+2},${l+6},0.35)`,i.fillRect(a()*512-40,a()*4096-60,40+a()*120,60+a()*220)}for(let o=0;o<6e3*s*s;o++){const l=34+a()*44;i.fillStyle=`rgba(${l},${l+2},${l+7},0.5)`,i.fillRect(a()*512,a()*4096,1+a()*3,1+a()*3)}for(const o of[148,205,307,364]){const l=i.createLinearGradient(o-24,0,o+24,0);l.addColorStop(0,"rgba(18,20,24,0)"),l.addColorStop(.5,"rgba(18,20,24,0.40)"),l.addColorStop(1,"rgba(18,20,24,0)"),i.fillStyle=l,i.fillRect(o-24,300,48,3500)}for(const o of[220,3500]){const l=i.createLinearGradient(0,o-200,0,o+420);l.addColorStop(0,"rgba(12,13,16,0)"),l.addColorStop(.5,"rgba(12,13,16,0.42)"),l.addColorStop(1,"rgba(12,13,16,0)"),i.fillStyle=l,i.fillRect(30,o-200,452,620)}i.fillStyle="#dde2e6",i.fillRect(18,0,8,4096),i.fillRect(486,0,8,4096);for(let o=120;o<3976;o+=150)i.fillRect(248,o,16,80);for(const o of[40,3936]){i.fillRect(30,o,452,26);for(let l=0;l<8;l++)i.fillRect(60+l*52,o+34,30,110)}for(const o of[280,3596])for(let l=0;l<3;l++){const h=150*l,c=o>2e3?o-h:o+h;for(const u of[70,130,352,412])i.fillRect(u,c,26,120)}i.fillStyle="#e6eaee",i.font="bold 150px sans-serif",i.textAlign="center",i.textBaseline="middle",i.save(),i.translate(256,210),i.rotate(Math.PI),i.fillText(t,0,0),i.restore(),i.fillText(e,256,3886),i.strokeStyle="rgba(16,18,22,0.13)",i.lineWidth=1;for(let o=60;o<4036;o+=13)i.beginPath(),i.moveTo(96,o),i.lineTo(416,o),i.stroke();i.restore()}function M_(i){i.fillStyle="#3a4046",i.fillRect(0,0,256,1024);let t=555;const e=()=>(t=t*1103515245+12345&2147483647,t/2147483647);for(let n=0;n<1800;n++){const s=50+e()*30;i.fillStyle=`rgba(${s},${s+3},${s+8},0.45)`,i.fillRect(e()*256,e()*1024,2+e()*5,2+e()*5)}i.fillStyle="#d8b64a",i.fillRect(122,0,12,1024),i.fillStyle="rgba(210,215,220,0.5)",i.fillRect(6,0,5,1024),i.fillRect(245,0,5,1024);for(const n of[200,512,824]){i.fillStyle="#e8e8e8",i.fillRect(20,n,216,10),i.fillStyle="#d8b64a";for(let s=0;s<6;s++)i.fillRect(24+s*36,n+16,12,26),i.fillRect(24+s*36,n-32,12,26)}}function y_(i){i.fillStyle="#5a6068",i.fillRect(0,0,256,256);let t=999;const e=()=>(t=t*1103515245+12345&2147483647,t/2147483647);for(let n=0;n<900;n++){const s=78+e()*30;i.fillStyle=`rgba(${s},${s+3},${s+8},0.4)`,i.fillRect(e()*256,e()*256,2+e()*5,2+e()*5)}i.strokeStyle="rgba(40,44,50,0.8)",i.lineWidth=2;for(let n=0;n<=256;n+=64)i.beginPath(),i.moveTo(n,0),i.lineTo(n,256),i.stroke(),i.beginPath(),i.moveTo(0,n),i.lineTo(256,n),i.stroke()}function S_(i,t){let n=987654321;const s=()=>(n=n*1664525+1013904223>>>0)/4294967296,r=u=>{const d=i(512,512);return d.ctx.fillStyle="#808080",d.ctx.fillRect(0,0,512,512),u(d.ctx),d.ctx.getImageData(0,0,512,512)},a=u=>{for(const d of[-512,0,512])for(const p of[-512,0,512])u(d,p)},o=r(u=>{for(let d=0;d<9e3;d++){const p=s()*512,g=s()*512,v=s()<.5?0:255;u.fillStyle=`rgba(${v},${v},${v},${.05+s()*.12})`;const m=1+d%2;a((f,w)=>u.fillRect(p+f,g+w,m,1+(d>>1)%2))}}),l=r(u=>{for(let d=0;d<260;d++){const p=s()*512,g=s()*512,v=34+s()*110,f=s()<.5?0:255;a((w,M)=>{const _=u.createRadialGradient(p+w,g+M,2,p+w,g+M,v);_.addColorStop(0,`rgba(${f},${f},${f},${.1+s()*.1})`),_.addColorStop(1,`rgba(${f},${f},${f},0)`),u.fillStyle=_,u.beginPath(),u.arc(p+w,g+M,v,0,Math.PI*2),u.fill()})}}),h=r(u=>{u.lineWidth=1;for(let d=0;d<5200;d++){const p=s()*512,g=s()*512,v=-.5+s()*1,m=2+s()*4,f=s()<.55?0:255;u.strokeStyle=`rgba(${f},${f},${f},${.1+s()*.16})`,a((w,M)=>{u.beginPath(),u.moveTo(p+w,g+M),u.lineTo(p+w+Math.cos(v)*m,g+M+Math.sin(v)*m),u.stroke()})}}),c=t.createImageData(512,512);for(let u=0;u<512*512*4;u+=4)c.data[u]=o.data[u],c.data[u+1]=l.data[u+1],c.data[u+2]=h.data[u+2],c.data[u+3]=255;t.putImageData(c,0,0)}const Ke=512,sr=4,ti=Ke*sr,la=[{wall:"#6c7480",win:"#45525e",slab:"rgba(40,46,54,0.55)",glass:0,litRate:.5,cool:!1},{wall:"#7d8590",win:"#3c4652",slab:"rgba(52,58,66,0.5)",glass:0,litRate:.42,cool:!1},{wall:"#586270",win:"#39434f",slab:"rgba(30,36,44,0.6)",glass:.18,litRate:.55,cool:!1},{wall:"#8a8f94",win:"#515c66",slab:"rgba(70,74,80,0.45)",glass:0,litRate:.38,cool:!1},{wall:"#46525c",win:"#7fa2b8",slab:"rgba(24,30,36,0.6)",glass:.55,litRate:.6,cool:!0},{wall:"#71818e",win:"#8fb6c8",slab:"rgba(36,44,52,0.5)",glass:.4,litRate:.52,cool:!0},{wall:"#6e6a62",win:"#4a453d",slab:"rgba(52,48,42,0.5)",glass:0,litRate:.44,cool:!1},{wall:"#5d6672",win:"#33404c",slab:"rgba(26,32,40,0.6)",glass:.12,litRate:.58,cool:!1},{wall:"#767e86",win:"#48525c",slab:"rgba(58,64,72,0.4)",glass:0,litRate:.35,cool:!1},{wall:"#675f58",win:"#3e382f",slab:"rgba(46,40,34,0.5)",glass:0,litRate:.4,cool:!1},{wall:"#7c8a94",win:"#9cc2d4",slab:"rgba(40,50,60,0.45)",glass:.5,litRate:.62,cool:!0},{wall:"#555d66",win:"#2f3842",slab:"rgba(22,26,32,0.6)",glass:.08,litRate:.5,cool:!1},{wall:"#84857f",win:"#5a5c58",slab:"rgba(64,64,60,0.4)",glass:0,litRate:.3,cool:!1},{wall:"#5a6a74",win:"#86b0c4",slab:"rgba(30,40,48,0.5)",glass:.45,litRate:.58,cool:!0},{wall:"#6a6470",win:"#423d4a",slab:"rgba(42,38,50,0.5)",glass:0,litRate:.46,cool:!1},{wall:"#78808a",win:"#4e5a66",slab:"rgba(54,62,72,0.45)",glass:.2,litRate:.5,cool:!1}];function w_(i){i.clearRect(0,0,ti,ti);for(let t=0;t<la.length;t++){const e=t%sr*Ke,n=Math.floor(t/sr)*Ke,s=la[t],r=40+t%5*6,a=34+t%3*12;i.fillStyle=s.wall,i.fillRect(e,n,Ke,Ke);for(let h=0;h<Ke;h+=r){for(let c=0;c<Ke;c+=a){const u=a*.58,d=r*.62;i.fillStyle=s.win,i.fillRect(e+c+a*.16,n+h+r*.18,u,d),s.glass>0&&(i.fillStyle=`rgba(255,255,255,${.1*s.glass})`,i.fillRect(e+c+a*.16,n+h+r*.18,u*.45,d))}i.fillStyle=s.slab,i.fillRect(e,n+h+r-3,Ke,3)}i.fillStyle="rgba(24,28,34,0.55)";let o=7+t*13;const l=()=>(o=o*1103515245+12345&2147483647)/2147483647;for(let h=0;h<6;h++){const c=26+l()*70,u=e+l()*(Ke-60);i.fillRect(u,n-0+4,c,10+l()*8)}}}function b_(i){i.fillStyle="#000000",i.fillRect(0,0,ti,ti);for(let t=0;t<la.length;t++){const e=t%sr*Ke,n=Math.floor(t/sr)*Ke,s=la[t],r=40+t%5*6,a=34+t%3*12;let o=4242+t*777;const l=()=>(o=o*1103515245+12345&2147483647,o/2147483647);for(let h=0;h<Ke;h+=r)for(let c=0;c<Ke;c+=a){const u=l();if(u<1-s.litRate)continue;const d=170+Math.floor(l()*80),p=s.cool?`rgb(${Math.floor(d*.72)},${Math.floor(d*.86)},${d})`:u>.94?`rgb(${d},${d},${d})`:`rgb(${d},${Math.floor(d*.78)},${Math.floor(d*.5)})`;i.fillStyle=p,i.fillRect(e+c+a*.16,n+h+r*.18,a*.58,r*.62)}}}const Yu=(i,t,e)=>`rw:${i}/${t}@${e}`;function T_(i,t){const e=[{id:"detail",kind:"detail",w:512,h:512,srgb:!1,aniso:8,repeat:[1,1]},{id:"building",kind:"building",w:ti,h:ti,srgb:!0,aniso:8,repeat:null},{id:"buildingEm",kind:"buildingEm",w:ti,h:ti,srgb:!0,aniso:8,repeat:null},{id:"taxiway",kind:"taxiway",w:256,h:1024,srgb:!0,aniso:8,repeat:[1,26]},{id:"concrete",kind:"concrete",w:256,h:256,srgb:!0,aniso:8,repeat:[24,24]}];for(const n of i)e.push({id:Yu(n.nums[0],n.nums[1],t),kind:"runway",w:t,h:t*8,srgb:!0,aniso:16,repeat:null,nums:n.nums});return e}function E_(i,t){const e=t(i.w,i.h);switch(i.kind){case"detail":S_(t,e.ctx);break;case"building":w_(e.ctx);break;case"buildingEm":b_(e.ctx);break;case"taxiway":M_(e.ctx);break;case"concrete":y_(e.ctx);break;case"runway":x_(e.ctx,i.nums[0],i.nums[1],i.w);break}return e}const rr=new Map,ca=new Map;let Ae=null,Wr=null,xh=!1;const A_=(i,t)=>{const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d",{alpha:!1}),s=n;return typeof s.roundRect!="function"&&(s.roundRect=function(r,a,o,l,h){this.beginPath(),this.moveTo(r+h,a),this.arcTo(r+o,a,r+o,a+l,h),this.arcTo(r+o,a+l,r,a+l,h),this.arcTo(r,a+l,r,a,h),this.arcTo(r,a,r+o,a,h),this.closePath()}),{canvas:e,ctx:n}};function $u(i,t){const e=new bi(t);return e.colorSpace=i.srgb?Be:pn,e.anisotropy=i.aniso,i.repeat?(e.wrapS=e.wrapT=rn,e.repeat.set(i.repeat[0],i.repeat[1])):e.wrapS=e.wrapT=Mn,e.needsUpdate=!0,e}function Ku(i){let t=rr.get(i.id);if(!t){const e=E_(i,A_);t=$u(i,e.canvas),rr.set(i.id,t)}return t}function R_(i,t){const e=Xl(i);return{cityCount:i,treeCount:t,city:e,nature:qu(e.roadside,t)}}function C_(){return Wr||(Wr=(async()=>{const i=performance.now(),t=nr.high,e=T_(je.map(s=>({nums:s.runwayNumbers})),t.runwayTexPx);for(const s of e)ca.set(s.id,s);if(!xh&&typeof Worker<"u")try{const s=await P_(t.cityCount,t.treeCount,e);Ae=s.world;for(const a of s.bitmaps)rr.set(a.id,$u(ca.get(a.id),a.bmp));const r=performance.now()-i;return console.info(`[prime] worldgen worker OK in ${r.toFixed(0)}ms (${s.bitmaps.length} tex atlas)`),{ok:!0,viaWorker:!0,ms:r}}catch(s){xh=!0,console.warn("[prime] worker フォールバック:",s)}Ae=R_(t.cityCount,t.treeCount);const n=performance.now()-i;return console.info(`[prime] sync fallback in ${n.toFixed(0)}ms`),{ok:!0,viaWorker:!1,ms:n}})(),Wr)}function P_(i,t,e){return new Promise((n,s)=>{let r;try{r=new f_}catch(l){s(l);return}const a=window.setTimeout(()=>{r.terminate(),s(new Error("worldgen worker timeout"))},5e3);r.onerror=()=>{window.clearTimeout(a),r.terminate(),s(new Error("worldgen worker error"))},r.onmessage=l=>{window.clearTimeout(a);const h=l.data;if(h.type!=="world"||!h.layout||!h.bitmaps){r.terminate(),s(new Error(h.message??"worldgen worker failed"));return}r.terminate(),n({world:{cityCount:i,treeCount:t,city:h.layout.city,nature:h.layout.nature},bitmaps:h.bitmaps})};const o=v_();r.postMessage({type:"world",bake:o,cityCount:i,treeCount:t,defs:e},o?[o]:[])})}function L_(i){if(Ae&&Ae.cityCount===i)return Ae.city;const t=Xl(i);return Ae?Ae={cityCount:i,treeCount:Ae.treeCount,city:t,nature:null}:Ae={cityCount:i,treeCount:nr.high.treeCount,city:t,nature:null},t}function D_(i){if(Ae&&Ae.treeCount===i&&Ae.nature)return Ae.nature;const t=Ae?Ae.city:Xl(nr.high.cityCount),e=qu(t.roadside,i);return Ae&&Ae.city===t&&(Ae.nature=e),e}function ar(i){const t=rr.get(i);if(t)return t;const e=ca.get(i);return e?Ku(e):void 0}function I_(i,t,e){const n=Yu(i,t,e);let s=rr.get(n);if(!s){const r={id:n,kind:"runway",w:e,h:e*8,srgb:!0,aniso:16,repeat:null,nums:[i,t]};ca.set(n,r),s=Ku(r)}return s}function kn(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d"),s=n;return typeof s.roundRect!="function"&&(s.roundRect=function(r,a,o,l,h){this.beginPath(),this.moveTo(r+h,a),this.arcTo(r+o,a,r+o,a+l,h),this.arcTo(r+o,a+l,r,a+l,h),this.arcTo(r,a+l,r,a,h),this.arcTo(r,a,r+o,a,h),this.closePath()}),[e,n]}function Pi(i,t){const e=new bi(i);return e.colorSpace=Be,e.anisotropy=8,t&&(e.wrapS=rn,e.wrapT=rn,e.repeat.set(t[0],t[1])),e}function U_(i,t,e,n,s=512){return I_(e,n,s)}function N_(){return ar("taxiway")}function F_(i){const[t,e]=kn(256,128);return e.fillStyle="#c9a227",e.fillRect(0,0,256,128),e.strokeStyle="#1a1a1a",e.lineWidth=10,e.strokeRect(8,8,240,112),e.fillStyle="#141414",e.font="bold 72px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(i,128,68),Pi(t)}function O_(){return ar("concrete")}function B_(i,t,e,n,s="SKYLINER",r="JA00AI"){const[h,c]=kn(2048,1024),u=C=>`#${C.toString(16).padStart(6,"0")}`,d=u(i),p=u(t),g=u(e);c.fillStyle=d,c.fillRect(0,0,2048,1024);const v=118,m=c.createLinearGradient(0,512-v,0,512+v);m.addColorStop(0,d),m.addColorStop(.16,p),m.addColorStop(.84,p),m.addColorStop(1,d),c.fillStyle=m,c.fillRect(0,512-v,2048,v*2),c.fillStyle="rgba(30,40,52,0.35)",c.fillRect(0,512-v+12,2048,3),c.fillRect(0,512+v-15,2048,3);const f=320;c.fillStyle=g,c.fillRect(0,f,2048,11),c.fillRect(0,1024-f-11,2048,11),c.fillStyle="rgba(255,255,255,0.75)",c.fillRect(0,f+15,2048,4),c.fillRect(0,1024-f-19,2048,4);const w=1840/n,M=Math.min(30,w-12),_=34;for(const C of[380,644-_])for(let y=0;y<n;y++){const x=300+y*w;c.fillStyle="rgba(190,200,212,0.9)",c.beginPath(),c.roundRect(x-3,C-3,M+6,_+6,9),c.fill();const P=c.createLinearGradient(x,C,x,C+_);P.addColorStop(0,"#1c2c3c"),P.addColorStop(.55,"#0a121b"),P.addColorStop(1,"#131e2a"),c.fillStyle=P,c.beginPath(),c.roundRect(x,C,M,_,7),c.fill(),c.strokeStyle="rgba(168,205,235,0.5)",c.lineWidth=3,c.beginPath(),c.moveTo(x+5,C+_-6),c.lineTo(x+M-6,C+5),c.stroke()}for(const[C,y]of[[228,0],[1290,0],[700,1],[1560,1]]){const x=y===0?306:588;c.fillStyle="rgba(40,60,84,0.05)",c.beginPath(),c.roundRect(C,x,52,130,6),c.fill(),c.strokeStyle="rgba(24,36,48,0.42)",c.lineWidth=2,c.beginPath(),c.roundRect(C,x,52,130,6),c.stroke(),c.fillStyle="#0c1622",c.beginPath(),c.roundRect(C+9,x+12,16,20,5),c.fill(),c.fillStyle="rgba(20,30,40,0.8)",c.fillRect(C+40,x+72,6,14)}const L=250,T=470;c.fillStyle="#101c29",c.fillRect(L+46,0,T-L-46,54),c.fillRect(L+46,970,T-L-46,54);const E=C=>1024-C;for(const C of[!0,!1]){const y=C?x=>x:E;c.beginPath(),c.moveTo(L+6,y(66)),c.lineTo(T,y(104)),c.lineTo(T,y(276)),c.lineTo(L+30,y(300)),c.closePath(),c.fill(),c.fillStyle="rgba(120,160,200,0.16)",c.beginPath(),c.moveTo(L+20,y(84)),c.lineTo(T-8,y(118)),c.lineTo(T-8,y(150)),c.lineTo(L+20,y(118)),c.closePath(),c.fill(),c.fillStyle="#101c29",c.strokeStyle=d,c.lineWidth=8;for(const x of[L+58,L+124,L+182])c.beginPath(),c.moveTo(x,y(56)),c.lineTo(x-8,y(296)),c.stroke();c.lineWidth=1,c.strokeStyle="rgba(150,180,210,0.5)",c.lineWidth=2.5,c.beginPath(),c.moveTo(L+6,y(66)),c.lineTo(T,y(104)),c.stroke(),c.strokeStyle=d,c.lineWidth=8;for(const x of[L+58,L+124,L+182])c.beginPath(),c.moveTo(x,50),c.lineTo(x,0),c.moveTo(x,E(50)),c.lineTo(x,1024),c.stroke()}c.fillStyle=p,c.font='italic bold 92px "Helvetica Neue", Arial, sans-serif',c.textAlign="left",c.textBaseline="alphabetic",c.fillText(s,430,280),c.save(),c.translate(2048,0),c.scale(-1,1),c.fillText(s,430,684),c.restore(),c.font='bold 58px "Helvetica Neue", Arial, sans-serif',c.fillStyle="rgba(40,52,64,0.95)",c.fillText(r,1660,276),c.save(),c.translate(2048,0),c.scale(-1,1),c.fillText(r,1660,706),c.restore(),c.strokeStyle="rgba(28,40,52,0.5)",c.lineWidth=3;for(const C of[560,1020,1460])c.beginPath(),c.roundRect(C,558,96,26,8),c.stroke(),c.beginPath(),c.roundRect(C,440,96,26,8),c.stroke();c.strokeStyle="rgba(50,60,72,0.8)",c.lineWidth=4,c.beginPath(),c.moveTo(212,0),c.lineTo(212,1024),c.stroke(),c.fillStyle="rgba(40,50,60,0.9)";for(const C of[416,608])c.fillRect(236,C,16,7);return Pi(h)}function z_(i,t,e,n){const[a,o]=kn(512,384),l=c=>`#${c.toString(16).padStart(6,"0")}`,h=o.createLinearGradient(0,384,0,0);return h.addColorStop(0,l(i)),h.addColorStop(.34,l(i)),h.addColorStop(1,l(t)),o.fillStyle=h,o.fillRect(0,0,512,384),o.fillStyle=l(e),o.beginPath(),o.moveTo(0,384*.62),o.quadraticCurveTo(512*.55,384*.66,512*.78,384*.06),o.lineTo(512,384*.06),o.quadraticCurveTo(512*.72,384*.9,0,384*.82),o.closePath(),o.fill(),o.fillStyle="rgba(250,252,255,0.96)",o.beginPath(),o.arc(512*.5,384*.34,64,0,Math.PI*2),o.fill(),o.fillStyle=l(e),o.beginPath(),o.moveTo(512*.5-40,384*.34+14),o.quadraticCurveTo(512*.5,384*.34-44,512*.5+42,384*.34+6),o.quadraticCurveTo(512*.5,384*.34-16,512*.5-40,384*.34+14),o.fill(),Pi(a)}function k_(){const[t,e]=kn(256,256);e.fillStyle="#0e1216",e.fillRect(0,0,256,256),e.translate(256/2,256/2);for(let s=0;s<30;s++){e.rotate(Math.PI*2/30);const r=e.createLinearGradient(0,0,122,0);r.addColorStop(0,"#3a434d"),r.addColorStop(.35,"#8d99a5"),r.addColorStop(1,"#48525d"),e.fillStyle=r,e.beginPath(),e.moveTo(18,-5),e.lineTo(124,-17),e.lineTo(124,4),e.lineTo(18,6),e.closePath(),e.fill(),e.fillStyle="rgba(0,0,0,0.4)",e.beginPath(),e.moveTo(18,6),e.lineTo(124,4),e.lineTo(124,9),e.lineTo(18,9),e.closePath(),e.fill()}const n=e.createRadialGradient(0,0,2,0,0,26);n.addColorStop(0,"#c2ccd4"),n.addColorStop(.75,"#7c8790"),n.addColorStop(1,"#2c343c"),e.fillStyle=n,e.beginPath(),e.arc(0,0,26,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(24,28,32,0.9)",e.lineWidth=4;for(let s=0;s<3;s++){e.beginPath();for(let r=0;r<=Math.PI*1.5;r+=.08){const a=4+r*4.4,o=Math.cos(r+s*Math.PI*2/3)*a,l=Math.sin(r+s*Math.PI*2/3)*a;r===0?e.moveTo(o,l):e.lineTo(o,l)}e.stroke()}return Pi(t)}function H_(){const[e,n]=kn(512,512);n.fillStyle="rgb(128,128,255)",n.fillRect(0,0,512,512);for(let c=0;c<512;c+=64){n.fillStyle="rgb(150,128,246)",n.fillRect((c+512-3)%512,0,2,512),n.fillStyle="rgb(106,128,246)",n.fillRect(c+1,0,2,512),n.fillStyle="rgb(128,150,246)",n.fillRect(0,(c+512-3)%512,512,2),n.fillStyle="rgb(128,106,246)",n.fillRect(0,c+1,512,2);for(let u=10;u<512;u+=14)n.fillStyle="rgb(128,140,250)",n.fillRect(u,(c+512-5)%512,2,1),n.fillStyle="rgb(128,116,250)",n.fillRect(u,(c+512-3)%512,2,1),n.fillStyle="rgb(140,128,250)",n.fillRect((c+512-5)%512,u,1,2),n.fillStyle="rgb(116,128,250)",n.fillRect((c+512-3)%512,u,1,2)}const s=new bi(e);s.colorSpace=pn,s.wrapS=s.wrapT=rn,s.anisotropy=8;const[r,a]=kn(512,512);a.fillStyle="rgb(206,206,206)",a.fillRect(0,0,512,512);let o=7;const l=()=>(o=o*16807%2147483647)/2147483647;for(let c=0;c<8;c++)for(let u=0;u<8;u++){const d=186+Math.floor(l()*42);a.fillStyle=`rgb(${d},${d},${d})`,a.fillRect(c*64+1,u*64+1,62,62)}a.fillStyle="rgb(238,238,238)";for(let c=0;c<512;c+=64)a.fillRect(c-1,0,2,512),a.fillRect(0,c-1,512,2);const h=new bi(r);return h.colorSpace=pn,h.wrapS=h.wrapT=rn,{normalMap:s,roughnessMap:h}}function G_(){const[i,t]=kn(512,128),e=t.createLinearGradient(0,0,0,128);e.addColorStop(0,"#9fc4dd"),e.addColorStop(.5,"#5d87a6"),e.addColorStop(1,"#3c5f7c"),t.fillStyle=e,t.fillRect(0,0,512,128),t.fillStyle="rgba(30,42,54,0.9)";for(let n=0;n<512;n+=22)t.fillRect(n,0,6,128);return t.fillRect(0,58,512,6),Pi(i,[6,1])}function ro(i=7,t=!0){const[e,n]=kn(256,256);let s=i;const r=()=>(s=s*1103515245+12345&2147483647,s/2147483647);for(let a=0;a<12;a++){const o=40+r()*176,l=70+r()*116,h=30+r()*52,c=n.createRadialGradient(o,l,2,o,l,h);c.addColorStop(0,"rgba(255,255,255,0.92)"),c.addColorStop(.55,"rgba(248,251,255,0.42)"),c.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=c,n.fillRect(0,0,256,256)}if(t){const a=n.createLinearGradient(0,150,0,256);a.addColorStop(0,"rgba(140,160,190,0)"),a.addColorStop(1,"rgba(110,130,170,0.34)"),n.fillStyle=a,n.globalCompositeOperation="source-atop",n.fillRect(0,150,256,106),n.globalCompositeOperation="source-over"}return Pi(e)}function V_(){const[i,t]=kn(1024,512);t.fillStyle="#1a1f26",t.fillRect(0,0,1024,512);const e=(n,s,r,a)=>{t.fillStyle="#0c1116",t.beginPath(),t.arc(n,s,r,0,Math.PI*2),t.fill(),t.strokeStyle="#3d4c5c",t.lineWidth=4,t.beginPath(),t.arc(n,s,r,0,Math.PI*2),t.stroke();for(let o=0;o<=10;o++){const l=-Math.PI*.75+o/10*Math.PI*1.5;t.beginPath(),t.moveTo(n+Math.cos(l)*(r-14),s+Math.sin(l)*(r-14)),t.lineTo(n+Math.cos(l)*(r-4),s+Math.sin(l)*(r-4)),t.stroke()}t.strokeStyle="#ff9d3c",t.lineWidth=5,t.beginPath(),t.moveTo(n,s),t.lineTo(n+Math.cos(-Math.PI*.25)*(r-26),s+Math.sin(-Math.PI*.25)*(r-26)),t.stroke(),t.fillStyle="#9fd6ff",t.font="bold 22px monospace",t.textAlign="center",t.fillText(a,n,s+r+30)};e(190,220,130,"AIRSPEED"),e(512,220,130,"ATTITUDE"),e(834,220,130,"ALTITUDE"),t.fillStyle="#2a323c";for(let n=0;n<14;n++)t.fillRect(60+n*66,420,44,30),t.fillStyle=n%3===0?"#4a9c5c":"#2a323c";return Pi(i)}function W_(){return ar("detail")}let Zu=null,Qu=null;async function X_(){if(!(typeof window>"u"||typeof fetch!="function"||Zs()))try{const t=await fetch("./"+"terrain-bake.bin",{cache:"force-cache"});if(!t.ok)return;g_(await t.arrayBuffer());const e=Zs();if(!e)return;const n=new er(e.ero,e.N,e.N,hr,zn);n.minFilter=n.magFilter=He,n.generateMipmaps=!1,n.needsUpdate=!0;const s=new er(e.shade,e.N,e.N,Je,vn);s.minFilter=s.magFilter=an,s.generateMipmaps=!1,s.needsUpdate=!0,Zu=n,Qu=s}catch{}}const q_=()=>Zu??(()=>{const i=new er(new Uint32Array([32768]),1,1,hr,zn);return i.minFilter=i.magFilter=He,i.generateMipmaps=!1,i.needsUpdate=!0,i})(),Y_=()=>Qu??(()=>{const i=new er(new Uint8Array([128,128,0,0]),1,1,Je,vn);return i.minFilter=i.magFilter=an,i.generateMipmaps=!1,i.needsUpdate=!0,i})();let $_=null;const K_=()=>$_??=W_(),Mh=`
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
`,ao=`
uniform vec2 uSnap;
uniform float uSpacing;
uniform float uParent;   // 親レベルの間隔（0 = morph なし＝最遠レベル）
uniform float uHalf;     // パッチ半辺 [m]
uniform float uMorphW;   // morph バンド幅 [m]
uniform vec4 uSeg[12];   // xyzw = x0,z0,x1,z1
uniform float uSegW[12];
uniform int uSegN;
uniform vec4 uAirports[4];
uniform int uApN;

uint h2u(uint ix, uint iz) {
  uint h = ix * 374761393u + iz * 668265263u;
  h = (h ^ (h >> 13u)) * 1274126177u;
  h ^= h >> 16u;
  return h;
}
float h2i(int ix, int iz) { return float(h2u(uint(ix), uint(iz))) * (1.0 / 4294967296.0); }
float vnoise(vec2 p) {
  vec2 p0 = floor(p); vec2 f = p - p0;
  vec2 s = f * f * (3.0 - 2.0 * f);
  float v00 = h2i(int(p0.x), int(p0.y));
  float v10 = h2i(int(p0.x) + 1, int(p0.y));
  float v01 = h2i(int(p0.x), int(p0.y) + 1);
  float v11 = h2i(int(p0.x) + 1, int(p0.y) + 1);
  return mix(mix(v00, v10, s.x), mix(v01, v11, s.x), s.y);
}
float fbm2(vec2 p, int oct) {
  float amp = 0.5, freq = 1.0, sum = 0.0, norm = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= oct) break;
    sum += amp * vnoise(p * freq); norm += amp; amp *= 0.5; freq *= 2.03;
  }
  return sum / norm;
}
float distSegV(vec2 p, vec4 s) {
  vec2 d = s.zw - s.xy;
  float t = clamp(dot(p - s.xy, d) / dot(d, d), 0.0, 1.0);
  return length(p - (s.xy + d * t));
}
float riverCarveV(vec2 p) {
  float c = 0.0;
  for (int i = 0; i < 12; i++) {
    if (i >= uSegN) break;
    float d = distSegV(p, uSeg[i]);
    float w = uSegW[i];
    float ch = 26.0 * (1.0 - smoothstep(w * 0.5, w * 1.6, d));
    float val = 14.0 * (1.0 - smoothstep(w * 2.0, 1300.0, d));
    c = max(c, ch + val);
  }
  return c;
}
float reliefV(vec2 p) {
  vec2 wp = p + 900.0 * (vec2(
    fbm2(p * 0.000021 + vec2(5.2, 1.3), 2) - 0.5,
    fbm2(p * 0.000021 + vec2(9.1, 4.4), 2) - 0.5));
  float base = fbm2(wp * 0.000045 + vec2(3.1, 7.7), 3);
  float r1 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00013 + vec2(21.3, 5.9), 3) - 1.0), 2.2);
  float r2 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00009 + vec2(40.7, 17.2), 3) - 1.0), 2.6);
  float r3 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00026 + vec2(61.3, 33.7), 3) - 1.0), 3.1);
  float mask = smoothstep(0.45, 0.68, base);
  float hills = (fbm2(p * 0.00028 + vec2(11.7, 2.4), 2) - 0.5) * 260.0;
  float detail = (vnoise(p * 0.0011 + vec2(2.2, 6.6)) - 0.5) * 22.0;
  float swell = (fbm2(p * 0.00035 + vec2(8.3, 4.1), 2) - 0.5) * 150.0;
  return (base - 0.31) * 900.0 + (r1 * 1900.0 + r2 * 1100.0 + r3 * 300.0) * mask + hills + detail + swell;
}
float flatMaskV(vec2 p) {
    float fl = 0.0;
    for (int i = 0; i < 4; i++) {
      if (i >= uApN) break;
      fl = max(fl, 1.0 - smoothstep(${We.FLAT_RADIUS}.0, ${(We.FLAT_RADIUS+3800).toFixed(1)}, length(p - uAirports[i].xy)));
    }
    return 1.0 - fl;
  }
float seaMaskV(vec2 p) { return smoothstep(7000.0, 12000.0, (p.x + p.y) * 0.7071); }

// ── v15-B: 侵食ベイク（ビルド時解いた δ-場。CPU terrainBakeDelta と同一の
//    テクセル中心基準・手動バイリニア。タイル外 texel は 0） ──
uniform highp usampler2D uEro;      // R32UI: low16=(δ+128)*256 / high16=wear
uniform mediump vec4 uEroGeo;       // (cell, minX, minZ, N)
float eroDeltaV(vec2 p) {
  vec2 u = (p - uEroGeo.yz) / uEroGeo.x - 0.5;
  ivec2 i0 = ivec2(floor(u));
  vec2 fr = u - vec2(i0);
  float acc = 0.0;
  for (int j = 0; j < 2; j++) {
    for (int i = 0; i < 2; i++) {
      ivec2 c = i0 + ivec2(i, j);
      float w = (i == 1 ? fr.x : 1.0 - fr.x) * (j == 1 ? fr.y : 1.0 - fr.y);
      if (w > 0.0 && c.x >= 0 && c.y >= 0 && c.x < int(uEroGeo.w) && c.y < int(uEroGeo.w)) {
        acc += w * (float(texelFetch(uEro, c, 0).r & 65535u) / 256.0 - 128.0);
      }
    }
  }
  return acc;
}

float terrH(vec2 p) {
  float f = flatMaskV(p);
  return (reliefV(p) + eroDeltaV(p) - riverCarveV(p) * f) * f - seaMaskV(p) * 520.0 * f;
}
float terrHBi(vec2 p, float sp) {
  vec2 c = floor(p / sp) * sp;
  vec2 t = (p - c) / sp;
  float h00 = terrH(c);
  float h10 = terrH(c + vec2(sp, 0.0));
  float h01 = terrH(c + vec2(0.0, sp));
  float h11 = terrH(c + vec2(sp, sp));
  return mix(mix(h00, h10, t.x), mix(h01, h11, t.x), t.y);
}
/** morph 込みの高さ: パッチ外周バンドで親レベル面へ連続接続 */
float terrHM(vec2 p) {
  float h = terrH(p);
  if (uParent > 0.5) {
    vec2 q = abs(p - uSnap);
    float e = max(q.x, q.y);
    float t = smoothstep(uHalf - uMorphW, uHalf, e);
    h = mix(h, terrHBi(p, uParent), t);
  }
  return h;
}
`,Z_=`
  vec2 wp2 = (modelMatrix * vec4(position, 1.0)).xz;
  float hM = terrHM(wp2);
  float eN = max(uSpacing * 0.6, 6.0);
  float hx = terrH(wp2 + vec2(eN, 0.0)) - terrH(wp2 - vec2(eN, 0.0));
  float hz = terrH(wp2 + vec2(0.0, eN)) - terrH(wp2 - vec2(0.0, eN));
  vTN = normalize(vec3(-hx / (2.0 * eN), 1.0, -hz / (2.0 * eN)));
  vTH = hM;
  vTXZ = wp2;
  vec3 objectNormal = vTN;
`,Q_=`
  vec3 transformed = vec3(position.x, hM, position.z);
`,J_=`
  vec2 wp2 = (modelMatrix * vec4(position, 1.0)).xz;
  float hM = terrHM(wp2);
  vec3 transformed = vec3(position.x, hM, position.z);
`,j_=`
varying float vTH;
varying vec3 vTN;
varying vec2 vTXZ;
uniform sampler2D uDetail;
uniform mediump sampler2D uShade;
float gDetQ;
vec3 gDet;
// v15-B: ベイク法線の有効度（遠方でフェード。1×1 ダミーテーブルでは値 0）
float bakeQ() {
  return 1.0 - smoothstep(6500.0, 14000.0, length(cameraPosition - vec3(vTXZ.x, vTH, vTXZ.y)));
}
float airfieldMaskV(vec2 p) {
  float m = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= uApN) break;
    float d = length(p - uAirports[i].xy);
    m = max(m, 1.0 - smoothstep(2200.0, 3000.0, d));
  }
  return m;
}
vec3 terrainColorV(vec3 camPos) {
  float h = vTH;
  float slope = 1.0 - clamp(vTN.y, 0.0, 1.0);
  // 遠景ガード: 13km 以遠はノイズ系（農地・雪のゆらぎ）を打ち切る（遠景は粗く描き、
  // 負荷を近接地に回す方針。遠方は fog で淡くなるため見た目差は小さい）
  float nearQ = 1.0 - smoothstep(9000.0, 13000.0, length(camPos - vec3(vTXZ.x, vTH, vTXZ.y)));
  vec3 cGrass = vec3(0.286, 0.392, 0.212);
  vec3 cForest = vec3(0.188, 0.286, 0.161);
  vec3 cRock = vec3(0.451, 0.424, 0.369);
  vec3 cSnow = vec3(0.804, 0.847, 0.898);
  vec3 cSand = vec3(0.722, 0.659, 0.478);
  vec3 cSea = vec3(0.420, 0.494, 0.408);
  vec3 cAirfield = vec3(0.337, 0.451, 0.263);
  vec3 col;
  float distC = length(camPos - vec3(vTXZ.x, vTH, vTXZ.y));
  float af = airfieldMaskV(vTXZ);
  if (h < 2.0) {
    col = mix(cSea, cSand, smoothstep(-3.0, 2.0, h));
  } else {
    float forestT = clamp((h - 10.0) / 240.0, 0.0, 1.0);
    col = mix(cGrass, cForest, forestT);
    // ===== 中~遠景の地面もみ上げ（のっぺり防止: ~930m 色调 / ~170m 斑 / 樹冠 / ~51m 粒）=====
    float nA = vnoise(vTXZ * 0.00108 + vec2(21.7, 5.3));
    col *= 0.84 + 0.32 * nA;
    // 南東向き斜面の減光（擬似 hillshade。うねりの面持ちを強調する）
    col *= 0.94 + 0.09 * clamp(vTN.z * 0.8 + vTN.x * 0.35 + 0.55, 0.0, 1.0);
    float nB = vnoise(vTXZ * 0.0058 + vec2(3.3, 12.1));
    col = mix(col, col * vec3(0.78, 0.84, 0.70), 0.55 * smoothstep(0.40, 0.74, nB));
    if (distC < 7000.0) {
      float can = smoothstep(0.52, 0.80, vnoise(vTXZ * 0.0088 + vec2(1.1, 4.4))) * forestT;
      col = mix(col, col * 0.70, can * 0.75);
      col *= 0.962 + 0.076 * vnoise(vTXZ * 0.0195 + vec2(7.7, 1.3));
    }
    float rock = clamp((slope - 0.22) / 0.40, 0.0, 1.0) * 0.9 + clamp((h - 620.0) / 520.0, 0.0, 1.0) * 0.8;
    rock = clamp(rock, 0.0, 1.0);
    // A-3: 岩盤は高さ帯の地層ゆらぎで暖/寒の岩色を分ける（ベタ塗り感の排除）
    float band = 0.5 + 0.5 * sin(h * 0.038 + nA * 4.2);
    col = mix(col, mix(cRock, vec3(0.353, 0.302, 0.255), band * 0.75), rock);
    // A-2: 侵食溝（色のみ。高度は不変 → 物理/配置に無影響。7.4km 外は打ち切り）
    float erQ = (1.0 - smoothstep(4200.0, 7400.0, distC)) * nearQ * smoothstep(6.0, 60.0, h) * (1.0 - af);
    if (erQ > 0.02) {
      float er = vnoise(vTXZ * 0.042 + vec2(13.7, 4.2));
      float er2 = vnoise(vTXZ * 0.0106 + vec2(8.8, 2.5));
      float rill = smoothstep(0.56, 0.74, er) * (0.35 + 0.65 * er2) * clamp(slope * 4.0, 0.0, 1.0);
      col *= mix(1.0, 0.865, rill * 0.8 * erQ);
      col *= mix(1.0, 0.955 + 0.09 * er2, erQ * 0.8);
    }
    // A-4: 谷底の収斂影（既存の低周波 nA 帯域を再利用。采样増ゼロの近似 AO）
    col *= 1.0 - 0.09 * (1.0 - smoothstep(45.0, 300.0, h)) * smoothstep(0.30, 0.56, nA);
    // 雪は稜線級（1750m 起）のみ・北向き斜面で残る。ゆらぎでツルテにしない
    float snowNoise = 0.92 + 0.10 * vnoise(vTXZ * 0.0016 + vec2(3.7, 8.2)) * nearQ;
    float snowLine = 1750.0 - 320.0 * (1.0 - clamp(vTN.z * 0.5 + 0.5, 0.0, 1.0));
    float snow = clamp((h - snowLine) / 430.0, 0.0, 1.0) * (1.0 - clamp(slope / 1.15, 0.0, 1.0) * 0.65);
    col = mix(col, cSnow * snowNoise, snow);
    // 農地パッチワーク（緩斜面・低高度・飛行場外）: geometry ゼロの手続き decals
    float flatness = 1.0 - smoothstep(0.05, 0.13, slope);
    float lowband = (1.0 - smoothstep(300.0, 430.0, h)) * smoothstep(3.0, 10.0, h);
    float w = flatness * lowband * (1.0 - af) * nearQ;
    if (w > 0.01) {
      vec2 cell0 = floor(vTXZ / 600.0);
      vec2 fr0 = fract(vTXZ / 600.0);
      float ch0 = h2i(int(cell0.x), int(cell0.y));
      vec2 cell = cell0; vec2 fr = fr0; float ch = ch0;
      if (ch0 > 0.44) {  // 約半数の区画を 300m の四小区へ分割（区画を細かく見せる）
        vec2 sub = floor(fr0 * 2.0);
        cell = cell0 * 2.0 + sub;
        fr = fract(fr0 * 2.0);
        ch = h2i(int(cell.x), int(cell.y));
      }
      vec3 crop = ch < 0.20 ? vec3(0.580, 0.498, 0.294)
                : ch < 0.38 ? vec3(0.373, 0.459, 0.235)
                : ch < 0.55 ? vec3(0.439, 0.357, 0.243)
                : ch < 0.72 ? vec3(0.522, 0.541, 0.337)
                : ch < 0.86 ? vec3(0.470, 0.420, 0.286)
                :             vec3(0.612, 0.562, 0.373);
      crop *= 0.83 + 0.32 * h2i(int(cell.x) * 5 + 13, int(cell.y) * 7 - 5);
      crop *= 0.94 + 0.09 * fr.x + 0.05 * vnoise(vTXZ * 0.021 + vec2(2.3, 9.8));
      float hedge = min(step(fr.x, 0.045) + step(fr.y, 0.045), 1.0);
      crop = mix(crop * (1.0 - 0.30 * hedge), vec3(0.155, 0.235, 0.125), hedge * 0.55);
      col = mix(col, crop, w * 0.72);
    }
    // 砂浜〜低地: 中距離でもらえる粒（潮だまり風の明暗）
    if (h < 34.0) {
      float bw = 1.0 - smoothstep(10.0, 34.0, h);
      col *= mix(1.0, 0.90 + 0.20 * vnoise(vTXZ * 0.0130 + vec2(6.1, 3.3)), bw * nearQ);
    }
  }
  // ===== マイクロ表面（近接地のざらつき: 草むら・砂粒・作物の畝）=====
  float microQ = 1.0 - smoothstep(1100.0, 2900.0, distC);
  if (microQ > 0.012) {
    float g1 = vnoise(vTXZ * 0.34 + vec2(4.1, 9.3));
    float g2 = vnoise(vTXZ * 0.90 + vec2(1.7, 6.2));
    col *= mix(1.0, (0.885 + 0.200 * g1) * (0.930 + 0.130 * g2), microQ);
    // 農地の畝（作物セル内 19m 周期ストライプ、1.5km 外はエイリアス防止でフェード）
    float stripQ = (1.0 - smoothstep(700.0, 1900.0, distC)) * (1.0 - smoothstep(280.0, 430.0, h));
    if (stripQ > 0.02 && h > 6.0 && slope < 0.09 && af < 0.5) {
      vec2 c2 = floor(vTXZ / 600.0);
      float rs = h2i(int(c2.x) * 7 + 3, int(c2.y) * 13 + 5);
      if (rs > 0.18 && rs < 0.82) {
        float ax = rs < 0.5 ? vTXZ.x : vTXZ.y;
        float stripe = 0.5 + 0.5 * sin(ax * 0.3307 + rs * 41.0);
        col *= mix(1.0, 0.93 + 0.14 * stripe, stripQ);
      }
    }
  }
  // 飛行場平坦帯: 海面(=砂)ブランチより前に一律上書き（h=0 は砂帯に該当するため）
  col = mix(col, cAirfield, af);
  if (af > 0.02) {
    float aq = af * (0.55 + 0.45 * microQ);
    col *= mix(1.0, 0.88 + 0.26 * vnoise(vTXZ * 0.28 + vec2(5.7, 2.9)), aq);
    col *= mix(1.0, 0.955 + 0.09 * vnoise(vTXZ * 0.062 + vec2(1.9, 8.8)) * 2.0 - 0.09, aq * 0.9);
    float mowQ = aq * (1.0 - smoothstep(2600.0, 4600.0, distC));
    col *= mix(1.0, 0.965 + 0.07 * sin(vTXZ.y * 0.2618), mowQ);
  }
  // v15-B: 侵食の痕跡 — 谷底の堆積色・浸食崖の岩盤露出・扇状地の砂礫（ベイク wear/deposit）。
  // 滑走路オーバーライドの後ろに置いて空港色を不変に保つ。ダミーテーブルでは b=a=0 で無影響。
  { vec4 sb = texture2D(uShade, (vTXZ - uEroGeo.yz) / (uEroGeo.x * uEroGeo.w));
    float wet = sb.b * (1.0 - smoothstep(2400.0, 3800.0, h)) * (1.0 - af);
    col = mix(col, col * vec3(0.68, 0.72, 0.62), wet * 0.85);
    col = mix(col, cRock * 0.94, clamp(wet * 1.9 - 0.62, 0.0, 1.0) * smoothstep(0.30, 0.52, slope) * smoothstep(160.0, 420.0, h));
    col = mix(col, vec3(0.60, 0.562, 0.478), sb.a * (1.0 - smoothstep(2600.0, 3400.0, h)) * 0.8);
  }
  return col;
}
`;function tx(){const i=oa.slice(0,12);for(;i.length<12;)i.push({x0:0,z0:0,x1:0,z1:0,w:0});const t={value:i.map(o=>new Qt(o.x0,o.z0,o.x1,o.z1))},e={value:i.map(o=>o.w)},n={value:Math.min(12,oa.length)},s=je.slice(0,4).map(o=>new Qt(o.center.x,o.center.z,0,0));for(;s.length<4;)s.push(new Qt(1e7,1e7,0,0));const r={value:s},a={value:Math.min(4,je.length)};return{uSeg:t,uSegW:e,uSegN:n,uAirports:r,uApN:a}}function oo(i,t){const e=i.parent===0?i.seg:i.size<=2200?t:i.seg,n=new Ve(i.size,i.size,e,e);n.rotateX(-Math.PI/2),n.boundingSphere=new Ci(new R(0,0,0),Math.hypot(i.size*.71,3e3));const s=tx(),r=new qt({roughness:.94,metalness:0});r.glslVersion=na;const a={uSnap:{value:new it(0,0)},uSpacing:{value:i.size/e},uParent:{value:i.parent},uHalf:{value:i.half},uMorphW:{value:i.morphW},uDetail:{value:K_()},uEro:{value:q_()},uShade:{value:Y_()},uEroGeo:{value:(()=>{const c=Zs();return c?new Qt(c.cell,c.min,c.min,c.N):new Qt(1,0,0,1)})()}};r.onBeforeCompile=c=>{Object.assign(c.uniforms,s,a),c.fragmentShader=Mh+c.fragmentShader,c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
`+ao+`
varying float vTH;
varying vec3 vTN;
varying vec2 vTXZ;`).replace("#include <beginnormal_vertex>",Z_).replace("#include <begin_vertex>",Q_),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
`+ao+`
`+j_).replace("#include <color_fragment>",`#include <color_fragment>
  diffuseColor.rgb = terrainColorV(cameraPosition);
  diffuseColor.rgb *= 1.0 + (gDet - 0.5) * vec3(0.44, 0.34, 0.26) * gDetQ;`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if (vTH < -3.0) discard;
{ gDetQ = 1.0 - smoothstep(320.0, 2600.0, length(cameraPosition - vec3(vTXZ.x, vTH, vTXZ.y)));
  gDet = texture2D(uDetail, vTXZ * (1.0 / 30.0)).rgb; }`).replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
if (vTH > -2.0 && (gDetQ > 0.01 || bakeQ() > 0.01)) {
  float eD = 0.0533333;
  vec2 duv = vTXZ * (1.0 / 30.0);
  float hx = texture2D(uDetail, duv + vec2(eD, 0.0)).r - texture2D(uDetail, duv - vec2(eD, 0.0)).r;
  float hz = texture2D(uDetail, duv + vec2(0.0, eD)).r - texture2D(uDetail, duv - vec2(0.0, eD)).r;
  vec4 sb = texture2D(uShade, (vTXZ - uEroGeo.yz) / (uEroGeo.x * uEroGeo.w));
  vec3 nW = (inverse(viewMatrix) * vec4(normal, 0.0)).xyz;
  nW += vec3(-hx, 0.0, -hz) * 2.6 * gDetQ;
  nW += vec3(-(sb.r - 0.5), 0.0, -(sb.g - 0.5)) * 1.5 * bakeQ();
  normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
}`).replace("#include <fog_fragment>",`#include <fog_fragment>
#ifdef USE_FOG
  float haze = smoothstep(4500.0, 15000.0, vFogDepth) * 0.45 + smoothstep(13000.0, 24000.0, vFogDepth) * 0.55;
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, min(1.0, haze));
#endif`)},r.customProgramCacheKey=()=>"terrain-v2-"+i.size+(Zs()?"-B":"-b");const o=new Ru({depthPacking:cu});o.glslVersion=na;const l={uSnap:a.uSnap,uSpacing:a.uSpacing,uParent:a.uParent,uHalf:a.uHalf,uMorphW:a.uMorphW,uEro:a.uEro,uEroGeo:a.uEroGeo};o.onBeforeCompile=c=>{Object.assign(c.uniforms,s,l),c.fragmentShader=Mh+c.fragmentShader,c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
`+ao).replace("#include <begin_vertex>",J_)},o.customProgramCacheKey=()=>"terrain-v2-depth-"+i.size+(Zs()?"-B":"-b");const h=new at(n,r);return h.customDepthMaterial=o,h.receiveShadow=!0,h.castShadow=!0,h.frustumCulled=!1,h.matrixAutoUpdate=!0,{mesh:h,mat:r,depth:o,cfg:i,u:a}}function ex(i,t=160,e=!0){const n=new me,s=oo({size:48e3,seg:152,parent:0,half:24e3,morphW:0,snap:0},t),r=oo({size:8e3,seg:128,parent:250,half:4e3,morphW:500,snap:250},t),a=oo({size:2e3,seg:t,parent:e?50:250,half:1e3,morphW:130,snap:e?50:250},t);s.mesh.name="terrain",r.mesh.name="terrain-mid",a.mesh.name="terrain-near",r.mesh.visible=e,n.add(s.mesh,r.mesh,a.mesh),i.add(n);const o=(d,p)=>Math.round(d/p)*p;let l="",h="";function c(d,p,g){d.mesh.position.set(p,0,g),d.u.uSnap.value.set(p,g)}function u(d,p){d.u.uParent.value=p,d.cfg.parent=p}return{group:n,levels:[s,r,a],update(d,p){const g=o(d,250),v=o(p,250),m=g+","+v;m!==h&&(h=m,c(r,g,v));const f=r.mesh.visible?50:250,w=o(d,f),M=o(p,f),_=w+","+M;_!==l&&(l=_,c(a,w,M),u(a,r.mesh.visible?50:250),a.cfg.snap=f)},setMid(d){r.mesh.visible=d,u(a,d?50:250),a.cfg.snap=d?50:250,l=""}}}function nx(i){const t=new me,e=new qt({color:2573658,roughness:.5,metalness:.02});for(const n of ku){const s=[];for(let c=0;c<n.pts.length-1;c++){const u=new it(n.pts[c][0],n.pts[c][1]),d=new it(n.pts[c+1][0],n.pts[c+1][1]),p=Math.max(2,Math.round(u.distanceTo(d)/220));for(let g=0;g<p;g++)s.push(u.clone().lerp(d,g/p))}s.push(new it(n.pts[n.pts.length-1][0],n.pts[n.pts.length-1][1]));const r=s.map(c=>Math.max(__(c.x,c.y)-14,We.SEA_LEVEL+1.2));for(let c=0;c<2;c++)for(let u=1;u<r.length-1;u++)r[u]=(r[u-1]+r[u]*2+r[u+1])/4;const a=[],o=[];for(let c=0;c<s.length;c++){const u=s[Math.max(0,c-1)],d=s[Math.min(s.length-1,c+1)],p=new it(d.x-u.x,d.y-u.y).normalize(),g=new it(-p.y,p.x),v=n.width*.5;if(a.push(s[c].x+g.x*v,r[c],s[c].y+g.y*v),a.push(s[c].x-g.x*v,r[c],s[c].y-g.y*v),c<s.length-1){const m=c*2;o.push(m,m+1,m+2,m+1,m+3,m+2)}}const l=new ge;l.setAttribute("position",new le(a,3)),l.setIndex(o),l.computeVertexNormals();const h=new at(l,e);h.name="river",t.add(h)}return i.add(t),t}function ix(i){const t={uTime:{value:0},uSunDir:{value:new R(Jn.x,Jn.y,Jn.z).normalize()},uDeep:{value:new Et(800082)},uShallow:{value:new Et(3044247)},uSky:{value:new Et(10274020)},uHorizon:{value:new Et(12901102)},uTop:{value:new Et(3040192)},uSunTint:{value:new Et(1,.93,.8)},uSunUp:{value:.82}},e=new Re({uniforms:t,vertexShader:`
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform vec3 uSunDir, uDeep, uShallow, uSky, uHorizon, uTop, uSunTint;
      uniform float uSunUp;
      varying vec3 vWorld;
      void main() {
        vec3 V = normalize(cameraPosition - vWorld);
        float dist = length(cameraPosition - vWorld);
        float w1 = sin(vWorld.x * 0.011 + uTime * 0.8) * cos(vWorld.z * 0.009 + uTime * 0.55);
        float w2 = sin(vWorld.x * 0.028 - uTime * 1.05) * cos(vWorld.z * 0.024 + uTime * 0.85);
        vec3 N = normalize(vec3(w1 * 0.05 + w2 * 0.028, 1.0, w2 * 0.045 - w1 * 0.028));
        // 遠距離では波動・鏡面を減衰させる（1px が波長に近付くと pow120 の
        // 高光が格子状エイリアス＝白ドットになる。実測: FL350 で海面に明滅ドット）
        float det = 1.0 - smoothstep(6000.0, 26000.0, dist);
        N = mix(vec3(0.0, 1.0, 0.0), N, 0.12 + 0.88 * det);
        float fres = pow(1.0 - max(V.y, 0.0), 3.0);
        vec3 col = mix(uDeep, uShallow, clamp(N.y * 0.35 + 0.4, 0.0, 1.0));
        // 空リフレクション: 反射線が指す空の色（天頂→地平の勾配 + 太陽方位の暖色）
        vec3 Rv = reflect(-V, N);
        float rh = clamp(Rv.y, 0.0, 1.0);
        vec3 skyRefl = mix(uHorizon, uTop, pow(rh, 0.55));
        float sunAz = max(dot(normalize(Rv), normalize(uSunDir)), 0.0);
        skyRefl += uSunTint * pow(sunAz, 6.0) * 0.25 * smoothstep(0.0, 0.35, uSunUp);
        col = mix(col, skyRefl, min(0.94, fres * 0.72 + 0.22));
        vec3 R = reflect(-normalize(uSunDir), N);
        float spec = pow(max(dot(R, V), 0.0), 120.0) * det * det;
        col += vec3(1.0, 0.96, 0.85) * spec * (1.0 + 2.4 * det);
        // 夕方の太陽カラム: 低角時に反射線上に伸びる glitter 帯
        float glitter = pow(max(dot(normalize(Rv), normalize(uSunDir)), 0.0), 26.0)
                      * smoothstep(0.45, 0.02, uSunUp) * det;
        col += uSunTint * glitter * (0.22 + 0.5 * w2 * 0.5 + 0.18);
        col = mix(col, uHorizon, smoothstep(9000.0, WORLD_FOG_FAR, dist));
        gl_FragColor = vec4(col, 1.0);
      }
    `.replace("WORLD_FOG_FAR",We.FOG_FAR.toFixed(1)),fog:!1,depthTest:!1,depthWrite:!1}),n=new at(new Ve(9e4,9e4),e);return n.rotation.x=-Math.PI/2,n.position.y=We.SEA_LEVEL,n.frustumCulled=!1,n.renderOrder=-9,i.add(n),{mesh:n,update(s){t.uTime.value=s},setHorizon(s){t.uHorizon.value.copy(s)},setPalette(s,r,a,o){t.uTop.value.setHex(s),t.uSky.value.setHex(r),t.uSunTint.value.setHex(a),t.uSunUp.value=o}}}function sx(i,t){const e=new me,n=Wl(918273),s=ro(11,!0),r=ro(23,!0),a=ro(47,!1),o=new Ti(1,20),l=new Qe({color:2241348,transparent:!0,opacity:.16,depthWrite:!1,fog:!0,polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:0}),h=Math.round(t*.62);for(let g=0;g<h;g++){const v=(n()-.5)*36e3,m=(n()-.5)*36e3,f=1200+n()*1400,w=420+n()*620,M=4+Math.floor(n()*5);for(let L=0;L<M;L++){const T=new al({map:n()>.5?s:r,transparent:!0,opacity:.78+n()*.18,depthWrite:!1,fog:!0}),E=new sh(T);E.position.set(v+(n()-.5)*w*1.6,f+(n()-.35)*w*.34,m+(n()-.5)*w*1.3);const C=w*(.55+n()*.6);E.scale.set(C,C*.52,1),E.renderOrder=2,e.add(E)}const _=_e(v,m);if(_>-2){const L=new at(o,l);L.rotation.x=-Math.PI/2,L.position.set(v,_+60,m);const T=w*1.9;L.scale.set(T,T,1),e.add(L)}}const c=Math.round(t*.38);for(let g=0;g<c;g++){const v=new al({map:a,transparent:!0,opacity:.3+n()*.22,depthWrite:!1,fog:!0}),m=new sh(v);m.position.set((n()-.5)*42e3,4600+n()*1600,(n()-.5)*42e3);const f=2400+n()*3400;m.scale.set(f,f*.16,1),m.renderOrder=1,e.add(m)}let u=0;i.add(e);const d=[],p=[];for(const g of e.children)if(g.isSprite){const v=g;d.push(v),p.push(v.material.opacity)}return{group:e,update(g){u+=g*2.2,u>4e4&&(u=0),e.position.x=u%800-400},setDensity(g){const v=Math.max(0,Math.min(1,g)),m=d.length;for(let f=0;f<m;f++)d[f].visible=m===0?!0:f/m<v},setDarken(g){const v=Math.max(0,Math.min(1,g));for(let m=0;m<d.length;m++){const f=d[m].material;f.color.setRGB(1-.45*v,1-.42*v,1-.36*v),f.opacity=p[m]*(1-.25*v)}l.opacity=.16*(1+v)}}}const yh=1.95;function cl(i,t={}){const e=new me,n=t.low??!1,s=B_(i.liveryTop,i.liveryBottom,i.liveryAccent,Math.round(i.fuselageLength*1.6),i.liveryName,i.liveryRegistration);s.anisotropy=16;const r=n?new qt({map:s,metalness:.42,roughness:.32,envMapIntensity:1.15}):new Gr({map:s,metalness:.28,roughness:.36,clearcoat:.65,clearcoatRoughness:.16,envMapIntensity:1.35}),a=new qt({color:13226714,metalness:.55,roughness:.38,envMapIntensity:1.1}),o=a.clone(),l=H_();if(!n){const q=l.normalMap.clone();q.needsUpdate=!0;const K=l.roughnessMap.clone();K.needsUpdate=!0,q.wrapS=q.wrapT=rn,K.wrapS=K.wrapT=rn,q.repeat.set(3,10),K.repeat.set(3,10),o.normalMap=q,o.normalScale=new it(.45,.45),o.roughnessMap=K}const h=new qt({color:2765112,metalness:.5,roughness:.5}),c=new Et(i.liveryTop),u=n?new qt({color:c,metalness:.42,roughness:.34,envMapIntensity:1.15}):new Gr({color:c,metalness:.28,roughness:.36,clearcoat:.65,clearcoatRoughness:.16,envMapIntensity:1.35}),d=new qt({color:5397091,metalness:.15,roughness:.62}),p=new qt({color:12174284,metalness:.95,roughness:.22,envMapIntensity:1.4}),g=new qt({map:k_(),metalness:.8,roughness:.35}),v=new qt({color:1382428,metalness:.1,roughness:.9}),m=new qt({color:10134701,metalness:.85,roughness:.3}),f=n?a:new Gr({map:z_(i.liveryTop,i.liveryBottom,i.liveryAccent,i.liveryName),metalness:.25,roughness:.34,clearcoat:.5,clearcoatRoughness:.2,envMapIntensity:1.25,side:fn}),w=n?a:new Gr({color:i.liveryBottom,metalness:.3,roughness:.3,clearcoat:.6,clearcoatRoughness:.15,envMapIntensity:1.3,side:fn}),M=i.fuselageRadius,_=i.fuselageLength,L=[],T=n?14:30;for(let q=0;q<=T;q++){const K=q/T;let D;if(K<.1)D=M*Math.sqrt(1-Math.pow(1-K/.1,2.1))*.98+.02;else if(K<.8)D=M;else{const zt=(K-.8)/.2;D=M*(1-zt*.86)}L.push(new it(Math.max(D,.05),K*_))}const E=new ds(L,n?18:48);E.rotateX(-Math.PI/2),E.translate(0,0,_/2);{const q=E.attributes.position;for(let K=0;K<q.count;K++){const D=q.getZ(K);if(D<-_*.18){const zt=Math.min((-D-_*.18)/(_*.32),1);q.setY(K,q.getY(K)+zt*zt*M*1.15)}}E.computeVertexNormals()}{const q=E.attributes.uv;for(let K=0;K<q.count;K++){const D=q.getX(K);q.setX(K,q.getY(K)),q.setY(K,D)}}const C=r.clone();{const q=l.normalMap.clone();q.needsUpdate=!0;const K=l.roughnessMap.clone();K.needsUpdate=!0,q.wrapS=q.wrapT=rn,K.wrapS=K.wrapT=rn,q.repeat.set(3,4),K.repeat.set(3,4),C.normalMap=q,C.normalScale=new it(.6,.6),C.roughnessMap=K}const y=new at(E,C);if(y.castShadow=!0,y.receiveShadow=!0,e.add(y),!n){const q=[];for(let Ut=0;Ut<=10;Ut++){const Ft=Ut/10*.085,_t=M*Math.sqrt(1-Math.pow(1-Ft/.1,2.1))*.98+.02;q.push(new it(Math.max(_t*1.014,.05),Ft*_))}const D=new ds(q,40);D.rotateX(-Math.PI/2),D.translate(0,0,_/2);const zt=new at(D,d);zt.castShadow=!0,e.add(zt)}if(!n){const q=M*1.15,K=-_/2,D=new at(new Me(M*.11,M*.2,M*.8,14),d);D.rotation.x=Math.PI/2,D.position.set(0,q+M*.22,K-M*.3),e.add(D)}const x=i.wingspan/2,P=Os(i.rootChord,i.tipChord,x,i.sweep,i.dihedral,o,n,-1,!1,i.liveryAccent,w),k=Os(i.rootChord,i.tipChord,x,i.sweep,i.dihedral,o,n,1,!1,i.liveryAccent,w);if(e.add(P,k),!n)for(const q of[-1,1])for(const K of[.05,-.1]){const D=new at(new Ks(M*.16,i.rootChord*.5,4,10),a);D.rotation.z=Math.PI/2,D.scale.set(1,1,K>0?.55:.7),D.position.set(q*M*1.05,K*M+Math.tan(i.dihedral)*M*1.05,-_*.02),e.add(D)}const I=Os(i.tailRootChord,i.tailRootChord*.42,i.tailHeight*.92,i.sweep+.12,0,f,n,1,!0);I.position.set(0,M*.55,-_*.36),e.add(I);const N=i.wingspan*.25,H=Os(i.tailRootChord*.52,i.tailRootChord*.22,N,i.sweep+.14,.035,a,n,-1);H.position.set(0,M*.12,-_*.415);const U=Os(i.tailRootChord*.52,i.tailRootChord*.22,N,i.sweep+.14,.035,a,n,1);if(U.position.set(0,M*.12,-_*.415),e.add(H,U),!n){const q=new at(new Ks(M*.3,_*.16,4,12),a);q.rotation.x=Math.PI/2,q.position.set(0,M*.22,-_*.4),q.scale.set(1,.55,1),e.add(q)}const Y=[];for(const q of[-1,1]){const K=ax(i,h,g,u,p,n),D=q*i.engineSpanPos*x,zt=i.engineForward-Math.tan(i.sweep)*Math.abs(D)*.55,Ut=Math.abs(D)*Math.tan(i.dihedral);K.position.set(D,Ut-i.engineDiameter*.78,zt+i.engineLength*.28),e.add(K),Y.push(...K.userData.rotors);const Ft=new at(new oe(i.engineDiameter*.22,i.engineDiameter*1.15,i.engineLength*.5),u);if(Ft.position.set(D,Ut-i.engineDiameter*.22,zt+i.engineLength*.12),Ft.castShadow=!n,e.add(Ft),!n){const _t=new at(new Me(i.engineDiameter*.11,i.engineDiameter*.11,i.engineDiameter*1.15,3),u);_t.rotation.z=Math.PI/2,_t.rotation.y=Math.PI/2,_t.position.set(D,Ut-i.engineDiameter*.2,zt+i.engineLength*.42),e.add(_t)}}const z=[],Q=[];if(!n){const q=Sh(m,v,p,2,M,M*(yh-.92),!1);q.position.set(0,-M*.92,_*.3),e.add(q),z.push(q),wh(e,Q,new R(0,-M*.9,_*.3),M,_,1,1.1);for(const K of[-1,1]){const D=Sh(m,v,p,i.mainWheelCount*2,M,M*(yh-.95),!0);D.position.set(K*M*1.35,-M*.95,-_*.02),e.add(D),z.push(D),wh(e,Q,new R(K*M*1.35,-M*.92,-_*.02),M,_,K,1.5)}}const et=[],rt=[];if(!n)for(const q of[-1,1]){const K=new me,D=new at(new oe(i.rootChord*.3,.1,x*.52),o);D.position.set(q*x*.34,Math.abs(x*.34)*Math.tan(i.dihedral)-.12,-i.rootChord*.72),K.add(D),e.add(K),et.push(K);for(let Ut=0;Ut<3;Ut++){const Ft=q*(x*.22+Ut*x*.13),_t=new at(new Ks(i.fuselageRadius*.09,i.rootChord*.34,4,8),o);_t.rotation.x=Math.PI/2,_t.position.set(Ft,Math.abs(Ft)*Math.tan(i.dihedral)-i.fuselageRadius*.16,-i.rootChord*.62),_t.castShadow=!n,e.add(_t)}const zt=new me;for(let Ut=0;Ut<3;Ut++){const Ft=new at(new oe(i.rootChord*.16,.07,x*.12),o),_t=q*(x*.18+Ut*x*.11);Ft.position.set(_t,Math.abs(_t)*Math.tan(i.dihedral)+.16,-i.rootChord*.28-Ut*i.rootChord*.1),zt.add(Ft)}e.add(zt),rt.push(zt)}n||ox(e,i,M,_);const St=[],xt=[],G=(q,K,D,zt,Ut,Ft=!1)=>{const _t=new Qe({color:q,fog:!1}),ie=new at(new ai(K,8,6),_t);return ie.position.set(D,zt,Ut),e.add(ie),(Ft?xt:St).push(_t),ie},J=x*Math.tan(i.dihedral),lt=-Math.tan(i.sweep)*x-i.tipChord*.45;G(16722458,i.fuselageRadius*.11,-x,J,lt),G(1769284,i.fuselageRadius*.11,x,J,lt),G(16773836,i.fuselageRadius*.1,0,M*.55+i.tailHeight*.95,-_*.42),G(16777215,i.fuselageRadius*.1,-x*.98,J+.3,lt-.4,!0),G(16777215,i.fuselageRadius*.1,x*.98,J+.3,lt-.4,!0);const ht=new Qe({color:16720401,fog:!1}),yt=new at(new ai(i.fuselageRadius*.1,8,6),ht);yt.position.set(0,M*1.02,-_*.12),e.add(yt);const Pt=new qt({color:3159355,emissive:16774095,emissiveIntensity:0,roughness:.2,metalness:.4});if(!n)for(const q of[-1,1]){const K=new at(new Ti(M*.13,12),Pt);K.position.set(q*M*1.25,-M*.52,_*.16),K.rotation.x=-Math.PI/2+.28,K.rotation.y=q*.18,e.add(K);const D=new at(new fs(M*.145,M*.025,6,16),p);D.position.copy(K.position),D.rotation.copy(K.rotation),e.add(D)}const st=z.map(q=>q.position.y);return{group:e,gearGroups:z,flapGroups:et,spoilerGroups:rt,fanMeshes:Y,setGearPosition(q){const K=Math.max(0,Math.min(1,q));z.forEach((D,zt)=>{D.position.y=st[zt]*K+M*.6*(1-K),D.visible=K>.02});for(const D of Q)D.mesh.rotation.x=D.sign*K*1.15;Pt.emissiveIntensity=K>.55?2.6:0},setFlaps(q){const K=q*Math.PI/180;for(const D of et)D.children.forEach(zt=>{zt.rotation.x=K*.7})},setSpoilers(q){const K=Math.max(0,Math.min(1,q));for(const D of rt)D.children.forEach(zt=>{zt.rotation.x=-K*.9})},spinFans(q){for(const K of Y)K.rotation.z+=q*14},updateLights(q){const K=q%1.2<.1;for(const zt of xt)zt.visible=K;const D=q%.8<.45;ht.visible=D;for(const zt of St)zt.visible=!0}}}function Os(i,t,e,n,s,r,a,o,l=!1,h,c){const u=new me,d=a?6:14,p=a?12:24,g=.11,v=[];for(let T=0;T<=p/2;T++){const E=T/(p/2),C=2*g*(.2969*Math.sqrt(E)-.126*E-.3516*E*E+.2843*E**3-.1015*E**4),y=.022*Math.sin(Math.PI*E);v.push([E,y+C])}for(let T=p/2-1;T>0;T--){const E=T/(p/2),C=2*g*(.2969*Math.sqrt(E)-.126*E-.3516*E*E+.2843*E**3-.1015*E**4),y=.022*Math.sin(Math.PI*E);v.push([E,y-C])}const m=[],f=[],w=[],M=v.length;for(let T=0;T<=d;T++){const E=T/d,C=o*E*e,y=i+(t-i)*E,x=-Math.tan(n)*Math.abs(C),P=l?0:Math.abs(C)*Math.tan(s);for(let k=0;k<M;k++){const[I,N]=v[k],H=x-I*y;if(l)m.push(N*y,Math.abs(C),H);else{const U=C,Y=P+N*y;m.push(U,Y,H)}f.push(I,E)}}for(let T=0;T<d;T++)for(let E=0;E<M;E++){const C=(E+1)%M,y=T*M+E,x=T*M+C,P=(T+1)*M+E,k=(T+1)*M+C;w.push(y,P,x,x,P,k)}const _=new ge;_.setAttribute("position",new le(m,3)),_.setAttribute("uv",new le(f,2)),_.setIndex(w),_.computeVertexNormals();const L=new at(_,r);if(L.castShadow=!0,L.receiveShadow=!0,u.add(L),!l&&!a&&c){const T=Math.max(1.4,e*.115),E=rx(o,e,T,t*.92,t*.4,n,s,c);u.add(E)}return u}function rx(i,t,e,n,s,r,a,o){const u=[],d=[],p=[],g=[];for(let M=0;M<=14/2;M++){const _=M/7,L=2*.1*(.2969*Math.sqrt(_)-.126*_-.3516*_*_+.2843*_**3-.1015*_**4);g.push([_,.02+L])}for(let M=14/2-1;M>0;M--){const _=M/7,L=2*.1*(.2969*Math.sqrt(_)-.126*_-.3516*_*_+.2843*_**3-.1015*_**4);g.push([_,.02-L])}const v=g.length,m=Math.abs(i*t)*Math.tan(a);for(let M=0;M<=7;M++){const _=M/7,L=m+Math.pow(_,.82)*e,T=i*(t+Math.sin(_*Math.PI*.5)*e*.34),E=n+(s-n)*_,C=-Math.tan(r)*t-_*E*.42;for(let y=0;y<v;y++){const[x,P]=g[y];u.push(T,L+P*E*.16,C-x*E),d.push(x,_)}}for(let M=0;M<7;M++)for(let _=0;_<v;_++){const L=(_+1)%v,T=M*v+_,E=M*v+L,C=(M+1)*v+_,y=(M+1)*v+L;p.push(T,C,E,E,C,y)}const f=new ge;f.setAttribute("position",new le(u,3)),f.setAttribute("uv",new le(d,2)),f.setIndex(p),f.computeVertexNormals();const w=new at(f,o);return w.castShadow=!0,w}function ax(i,t,e,n,s,r){const a=new me,o=i.engineDiameter,l=i.engineLength,h=[],c=r?8:20;for(let m=0;m<=c;m++){const f=m/c;let w;f<.12?w=o*.5*(.72+.28*Math.sin(f/.12*Math.PI*.5)):f<.5?w=o*.5:w=o*.5*(1-(f-.5)*.52),h.push(new it(w,f*l))}const u=new ds(h,r?12:28);u.rotateX(-Math.PI/2);const d=new at(u,n);d.castShadow=!0,a.add(d);const p=new at(new Me(o*.44,o*.42,l*.42,20,1,!0),t);p.rotation.x=Math.PI/2,p.position.z=l*.18,a.add(p);const g=new me;g.position.z=l*.19;const v=new at(new Ti(o*.4,28),e);if(g.add(v),!r){const m=new oe(o*.02,o*.145,o*.3),f=new Sn(m,new qt({color:9148324,metalness:.9,roughness:.32,flatShading:!0}),22),w=new Jt,M=new Ce,_=new on,L=new R,T=new R(1,1,1);for(let C=0;C<22;C++){const y=C/22*Math.PI*2,x=o*.15+o*.15;L.set(Math.cos(y)*x,Math.sin(y)*x,0),_.set(.62,0,y),M.setFromEuler(_),w.compose(L,M,T),f.setMatrixAt(C,w)}f.instanceMatrix.needsUpdate=!0,g.add(f);const E=new at(new ii(o*.09,o*.16,12),new qt({color:11450562,metalness:.9,roughness:.25}));E.rotation.x=-Math.PI/2,E.position.z=o*.06,g.add(E)}if(a.add(g),r){const m=new at(new Me(o*.16,o*.12,l*.3,12),t);m.rotation.x=Math.PI/2,m.position.z=-l*.38,a.add(m)}else{const m=new at(new fs(o*.485,o*.048,10,30),s);m.position.z=l*.005,a.add(m);const f=new at(new fs(o*.505,o*.014,6,28),t);f.position.z=-l*.28,a.add(f);const w=new at(new Me(o*.27,o*.21,l*.16,18,1,!0),s);w.rotation.x=Math.PI/2,w.position.z=-l*.42,a.add(w);const M=new at(new ii(o*.16,l*.2,14),t);M.rotation.x=Math.PI/2,M.position.z=-l*.46,a.add(M)}return a.userData.rotors=[g],a}function Sh(i,t,e,n,s,r,a){const o=new me,l=new at(new Me(s*.075,s*.085,r*.52,10),e);l.position.y=-r*.26,o.add(l);const h=new at(new Me(s*.105,s*.115,r*.56,10),i);if(h.position.y=-r*.72,o.add(h),a)for(const g of[-1,1]){const v=new at(new oe(s*.05,r*.34,s*.09),i);v.position.set(g*s*.11,-r*.44,0),v.rotation.z=g*.42,o.add(v)}const c=new Me(s*.3,s*.3,s*.2,16),u=new Me(s*.16,s*.16,s*.235,12),d=2,p=Math.max(1,Math.floor(n/d));for(let g=0;g<p;g++){if(a&&p>1){const v=new at(new oe(s*.98,s*.1,s*.16),i);v.position.set(0,-r+s*.3,(g-(p-1)/2)*s*.72),o.add(v)}for(let v=0;v<d;v++){const m=new at(c,t);m.rotation.z=Math.PI/2;const f=(v-(d-1)/2)*s*.42,w=(g-(p-1)/2)*s*.72;m.position.set(f,-r+s*.3,w),o.add(m);const M=new at(u,e);M.rotation.z=Math.PI/2,M.position.copy(m.position),o.add(M)}}return o}function wh(i,t,e,n,s,r,a){const o=new at(new oe(n*.62*a,n*.1,n*1.5*a),new qt({color:1316893,roughness:.9,metalness:.2}));o.position.set(e.x,-n*.99,e.z),i.add(o);for(const l of[-1,1]){const h=new at(new oe(n*.6*a,n*.045,n*1.44*a),new qt({color:14147301,roughness:.42,metalness:.3}));h.position.set(e.x+l*r*n*.31*a,-n*1.02,e.z),h.geometry.translate(-l*n*.3*a,0,0),h.position.x=e.x+l*r*n*.02,i.add(h),t.push({mesh:h,sign:l*r})}}function ox(i,t,e,n){const s=new qt({color:11450820,metalness:.15,roughness:.55}),r=(c,u,d,p)=>{const g=new at(new oe(.06,p,p*.42),s);g.position.set(c,(d?1:-1)*(e+p*.42),u),d||(g.rotation.x=Math.PI),i.add(g)};r(0,n*.1,!0,e*.42),r(0,-n*.16,!0,e*.34),r(0,-n*.05,!1,e*.4),r(.7,-n*.2,!1,e*.28);const a=new qt({color:15659766,roughness:.4,metalness:.1});for(const c of[n*.24,-n*.2]){const u=new at(new ai(e*.2,12,8,0,Math.PI*2,0,Math.PI/2),a);u.scale.set(1,.55,1.4),u.position.set(0,e*.985,c),i.add(u)}for(const c of[!0,!1]){const u=new at(new Me(e*.24,e*.2,.07,12),a);u.position.set(0,(c?1.02:-1.02)*e,c?n*.02:-n*.1),i.add(u)}const o=t.wingspan/2,l=new qt({color:2106924,roughness:.7,metalness:.3}),h=(c,u,d)=>{const p=new at(new ii(.05,.4,6),l);p.position.set(c,u,d),p.rotation.x=Math.PI/2,i.add(p)};for(const c of[-1,1]){for(let d=0;d<3;d++){const p=c*(o*(.45+d*.18)),g=-Math.tan(t.sweep)*Math.abs(p)-(t.rootChord+(t.tipChord-t.rootChord)*(p/o))*.98;h(p,Math.abs(p)*Math.tan(t.dihedral),g)}const u=t.wingspan*.25*.88;h(c*u,e*.12,-n*.415-Math.tan(t.sweep+.14)*u-t.tailRootChord*.52*.98)}}const mi={apron:.05,taxiway:.055,runway:.06,marking:.09},Qi={marking:{polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:0},runway:{polygonOffset:!1,polygonOffsetFactor:0,polygonOffsetUnits:0},taxiMain:{polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:0},taxi:{polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:0}};function lx(i,t,e,n=512){const s=new me,{length:r,width:a,center:o,heading:l}=t,h=U_(a,r,t.runwayNumbers[0],t.runwayNumbers[1],n);h.wrapS=Mn,h.wrapT=Mn;const c=new at(new Ve(a,r),new qt({map:h,roughness:.92,metalness:.02,...Qi.runway}));c.rotation.x=-Math.PI/2,c.position.y=mi.runway,c.receiveShadow=!0,s.add(c);const u=O_(),d=new qt({map:u,roughness:.9,...Qi.taxi}),p=N_(),g=new qt({map:p,roughness:.9,...Qi.taxi}),v=new qt({map:p,roughness:.9,...Qi.taxiMain}),m=new at(new Ve(26,r*.92),v);m.rotation.x=-Math.PI/2,m.position.set(240,mi.taxiway,0),m.receiveShadow=!0,s.add(m);for(const st of[-r*.36,-r*.05,r*.28]){const Mt=new at(new Ve(197,24),g);Mt.rotation.x=-Math.PI/2,Mt.position.set(128.5,mi.apron,st),Mt.receiveShadow=!0,s.add(Mt);const q=new at(new Ve(24,3.2),new Qe({color:14170666,...Qi.marking}));q.rotation.x=-Math.PI/2,q.position.set(22,mi.marking,st),s.add(q)}const f=new at(new Ve(520,900),d);f.rotation.x=-Math.PI/2,f.position.set(620,mi.apron,-100),f.receiveShadow=!0,s.add(f);const w=new Qe({color:14202442,...Qi.marking});for(let st=0;st<3;st++)for(const Mt of[-1,1]){const q=new at(new Ve(3,90),w);q.rotation.x=-Math.PI/2,q.position.set(620+Mt*70,mi.marking,-330+st*170),s.add(q)}const M=[{text:"34",x:-22,z:1720,rot:0},{text:"16",x:-22,z:-1720,rot:Math.PI},{text:"A",x:210,z:-640,rot:-Math.PI/2},{text:"B",x:210,z:-100,rot:-Math.PI/2},{text:"G",x:210,z:1120,rot:-Math.PI/2}];for(const st of M){const Mt=new qt({map:F_(st.text),roughness:.7}),q=new at(new Ve(7,3.2),Mt);q.position.set(st.x,2.6,st.z),q.rotation.y=st.rot,s.add(q);const K=new at(new Me(.18,.18,2.2,6),new qt({color:5594984}));K.position.set(st.x,1.1,st.z),s.add(K)}const _=new qt({map:G_(),metalness:.75,roughness:.18,envMapIntensity:1.4}),L=new qt({color:12107976,metalness:.2,roughness:.6}),T=new qt({color:9081499,metalness:.35,roughness:.55}),E=new me,C=new at(new oe(260,26,620),L);C.position.y=13,C.castShadow=!0,C.receiveShadow=!0,E.add(C);const y=new at(new oe(262,12,622),_);y.position.y=16,E.add(y);const x=new at(new oe(272,3,632),T);x.position.y=27.5,x.castShadow=!0,E.add(x);for(let st=0;st<6;st++){const Mt=new at(new oe(18,6,14),T);Mt.position.set(-80+st%3*80,32,-180+Math.floor(st/3)*340),Mt.castShadow=!0,E.add(Mt)}E.position.set(850,0,-60),s.add(E);for(let st=0;st<3;st++){const Mt=new me,q=new at(new oe(70,6.5,8),L);q.position.set(-24,12,0),q.castShadow=!0,Mt.add(q);const K=new at(new oe(12,8,10),_);K.position.set(-64,11,0),Mt.add(K);const D=new at(new Me(1.2,1.2,12,8),T);D.position.set(-30,6,0),Mt.add(D),Mt.position.set(740,0,-330+st*170),s.add(Mt)}const P=new me,k=new at(new Me(7,11,52,12),L);k.position.y=26,k.castShadow=!0,P.add(k);const I=new at(new Me(13,10,10,12),_);I.position.y=56,I.castShadow=!0,P.add(I);const N=new at(new Me(14,14,2,12),T);N.position.y=62,P.add(N),P.position.set(430,0,420),s.add(P);for(let st=0;st<2;st++){const Mt=new me,q=new at(new Me(38,38,96,18,1,!1,0,Math.PI),T);q.rotation.z=Math.PI/2,q.rotation.y=Math.PI/2,q.position.y=0,q.castShadow=!0,Mt.add(q);const K=new at(new Ve(96,36),_);K.rotation.y=Math.PI/2,K.position.set(-.5,18,0),Mt.add(K),Mt.position.set(980,0,520+st*130),s.add(Mt)}[{x:700,z:-330,rot:Math.PI},{x:700,z:160,rot:Math.PI},{x:640,z:-520,rot:Math.PI*.92}].forEach((st,Mt)=>{const q=e[Mt%e.length],K=cl(q,{low:!0});K.setGearPosition(1),K.group.position.set(st.x,q.fuselageRadius*1.95+mi.runway,st.z),K.group.rotation.y=st.rot,s.add(K.group)});const U=new oe(.9,.5,.9),Y=new Qe({color:16771496,fog:!1}),z=2*68,Q=new Sn(U,Y,z),et=new Jt;let rt=0;for(let st=0;st<68;st++){const Mt=-r/2+st*r/67;for(const q of[-1,1])et.makeTranslation(q*(a/2+1.2),.6,Mt),Q.setMatrixAt(rt++,et)}Q.instanceMatrix.needsUpdate=!0,s.add(Q);const xt=[new Et(16777215),new Et(16777215),new Et(16722456),new Et(16722456)].map(st=>new Qe({color:st,fog:!1})),G=new oe(.7,.5,1.4);for(const st of[1,-1])for(let Mt=0;Mt<4;Mt++){const q=new at(G,xt[Mt]);q.position.set(a/2+9+Mt*1.6,.55,st*(r/2-210)),q.rotation.y=st<0?Math.PI:0,s.add(q)}const J=new Qe({color:4491519,fog:!1}),lt=new Sn(U,J,2*40);rt=0;for(let st=0;st<40;st++){const Mt=-r*.45+st*r*.9/39;for(const q of[-1,1])et.makeTranslation(240+q*14,.6,Mt),lt.setMatrixAt(rt++,et)}lt.instanceMatrix.needsUpdate=!0,s.add(lt),s.position.set(o.x,0,o.z),s.rotation.y=l;const ht=Y.color.clone(),yt=J.color.clone(),Pt=xt.map(st=>st.color.clone());return s.userData.setNightLights=st=>{const Mt=.16+1.5*st;Y.color.copy(ht).multiplyScalar(Mt),J.color.copy(yt).multiplyScalar(Mt),xt.forEach((q,K)=>q.color.copy(Pt[K]).multiplyScalar(.2+1.5*st))},i.add(s),s}const Ju=new Set,ju=i=>{Ju.add(i)},cx=i=>{for(const t of Ju)t.update(i)},td=2600,ss=[],bh=i=>Math.imul(i+1,2654435761)>>>27&15;function Th(i){i.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float aFace;`).replace("#include <uv_vertex>",`#include <uv_vertex>
      {
        vec2 cell = vec2(mod(aFace, 4.0), floor(aFace * 0.25));
        #ifdef USE_MAP
        vMapUv = (uv + cell) * 0.25;
        #endif
        #ifdef USE_EMISSIVEMAP
        vEmissiveMapUv = (uv + cell) * 0.25;
        #endif
      }`)},i.customProgramCacheKey=()=>"atlas-cell4x4"}function hx(i,t){const e=L_(t),n=new me;ss.length=0;{const v=e.colliders;for(let m=0;m+3<v.length;m+=4)ss.push({x:v[m],z:v[m+1],r:v[m+2],top:v[m+3]})}const s=new oe(1,1,1);s.translate(0,.5,0);const r=ar("building"),a=ar("buildingEm"),o=new qt({map:r,emissiveMap:a,emissive:new Et(16767392),emissiveIntensity:0,metalness:.18,roughness:.72});Th(o);const l=new Nu({color:9278621}),h=[];let c=0;const u=v=>{const m=s.clone(),f=new Float32Array(v.n);for(let _=0;_<v.n;_++)f[_]=bh(c++);m.setAttribute("aFace",new Si(f,1));const w=new Sn(m,o,v.n);w.instanceMatrix.array.set(v.m),w.instanceMatrix.needsUpdate=!0,w.instanceColor=new Si(v.c,3),w.instanceColor.needsUpdate=!0,w.castShadow=!0,w.receiveShadow=!0,w.computeBoundingSphere();const M=new Sn(s,l,v.n);M.instanceMatrix.array.set(v.m),M.instanceMatrix.needsUpdate=!0,M.computeBoundingSphere(),n.add(w,M),h.push({hi:w,lo:M,b:v})};for(const v of e.buckets)u(v);const d=new qt({map:r,color:12441838,emissiveMap:a,emissive:new Et(16773320),emissiveIntensity:0,metalness:.55,roughness:.3});Th(d);{const v=e.towers.n,m=s.clone(),f=new Float32Array(v);for(let M=0;M<v;M++)f[M]=bh(c++);m.setAttribute("aFace",new Si(f,1));const w=new Sn(m,d,v);w.name="towers",w.instanceMatrix.array.set(e.towers.m),w.instanceMatrix.needsUpdate=!0,w.instanceColor=new Si(e.towers.c,3),w.instanceColor.needsUpdate=!0,w.castShadow=!0,w.receiveShadow=!1,w.computeBoundingSphere(),n.add(w)}{const v=new qt({color:3027769,roughness:.95}),m=new ge;m.setAttribute("position",new xe(e.roads.pos,3)),m.setIndex(new xe(e.roads.idx,1)),m.computeVertexNormals();const f=new at(m,v);f.name="roads",f.receiveShadow=!0,f.frustumCulled=!0,n.add(f)}const p=new Qe({color:16722456,fog:!1,transparent:!0,opacity:0}),g=new Sn(new ai(1.6,8,6),p,Math.max(1,e.beacons.length/3));g.name="beacons";{const v=new Jt;for(let m=0;m*3+2<e.beacons.length;m++)v.makeTranslation(e.beacons[m*3],e.beacons[m*3+1],e.beacons[m*3+2]),g.setMatrixAt(m,v);g.instanceMatrix.needsUpdate=!0,g.computeBoundingSphere()}return n.add(g),ju({update:v=>{for(const m of h){const f=Math.hypot(m.b.cx-v.x,m.b.cz-v.z)<td;m.hi.visible!==f&&(m.hi.visible=f,m.lo.visible=!f)}}}),n.userData.setNightLights=v=>{const m=Math.max(0,Math.min(1,(v-.12)/.88));o.emissiveIntensity=m*1.35,d.emissiveIntensity=m*1.55,p.opacity=m*.95,g.visible=m>.03},i.add(n),n}function ux(i,t){const e=D_(t),n=new me,s=new ii(2.6,8,6);s.translate(0,6.2,0);const r=new ii(1.9,6,6);r.translate(0,10.2,0);const a=dx(s,r),o=new Me(.36,.52,3.6,5);o.translate(0,1.8,0);const l=new ii(2.5,11,4);l.translate(0,6.6,0);const h=new qt({color:3101234,roughness:.88}),c=new qt({color:5784628,roughness:.9}),u=new Nu({color:2903088}),d=[];for(const p of e.buckets){const g=new Sn(a,h,p.n),v=new Sn(o,c,p.n);for(const f of[g,v])f.instanceMatrix.array.set(p.m),f.instanceMatrix.needsUpdate=!0,f.computeBoundingSphere();g.instanceColor=new Si(p.c,3),g.instanceColor.needsUpdate=!0,g.castShadow=!0,n.add(g,v);const m=new Sn(l,u,p.n);m.instanceMatrix.array.set(p.m),m.instanceMatrix.needsUpdate=!0,m.computeBoundingSphere(),n.add(m),d.push({hi:[g,v],lo:m,b:p})}return ju({update:p=>{for(const g of d){const v=Math.hypot(g.b.cx-p.x,g.b.cz-p.z)<td;if(g.hi[0].visible!==v){for(const m of g.hi)m.visible=v;g.lo.visible=!v}}}}),i.add(n),n}function dx(i,t){const e=i.toNonIndexed(),n=t.toNonIndexed(),s=new Float32Array(e.attributes.position.array.length+n.attributes.position.array.length);s.set(e.attributes.position.array,0),s.set(n.attributes.position.array,e.attributes.position.array.length);const r=new Float32Array(e.attributes.normal.array.length+n.attributes.normal.array.length);r.set(e.attributes.normal.array,0),r.set(n.attributes.normal.array,e.attributes.normal.array.length);const a=new ge;return a.setAttribute("position",new xe(s,3)),a.setAttribute("normal",new xe(r,3)),a}function fx(i){const t=new me,e=i.fuselageRadius,n=i.fuselageLength,s=new qt({color:2304562,metalness:.25,roughness:.7}),r=new qt({map:V_(),metalness:.15,roughness:.55,emissive:2241348,emissiveIntensity:.35}),a=new qt({color:3817544,metalness:.5,roughness:.5}),o=new at(new oe(e*1.55,e*.85,.12),r);o.position.set(0,-e*.28,n*.3),o.rotation.x=.28,t.add(o);const l=new at(new oe(e*1.7,.1,e*.55),s);l.position.set(0,e*.18,n*.33),l.rotation.x=-.18,t.add(l);for(const u of[-1,1]){const d=new me,p=new at(new Me(.035,.045,e*.55,8),a);p.position.y=e*.26,d.add(p);const g=new at(new fs(e*.16,.032,8,18,Math.PI),a);g.position.y=e*.52,g.rotation.x=Math.PI/2,d.add(g),d.position.set(u*e*.52,-e*.22,n*.34),t.add(d)}for(const u of[-1,1]){const d=new at(new oe(.1,e*1.05,.14),a);d.position.set(u*e*.62,e*.42,n*.385),d.rotation.x=-.55,t.add(d);const p=new at(new oe(.06,e*.5,e*.5),a);p.position.set(u*e*.86,e*.28,n*.31),t.add(p)}const h=new at(new oe(.09,e*1,.12),a);h.position.set(0,e*.42,n*.395),h.rotation.x=-.55,t.add(h);const c=new at(new oe(e*1.5,.12,.35),s);return c.position.set(0,e*.86,n*.345),c.rotation.x=-.35,t.add(c),{group:t,update(){}}}const px={cockpit:"COCKPIT",chase:"CHASE",wing:"WING",orbit:"ORBIT",landing:"LANDING"},gi=["cockpit","chase","wing","orbit","landing"];class ji{mode="chase";camera;static NEAR={cockpit:.45,chase:2.5,wing:.25,orbit:2.5,landing:2};static FAR=46e3;lastMode="chase";blending=!1;blendT=0;fromPos=new R;fromQuat=new Ce;desiredPos=new R;desiredQuat=new Ce;smoothFwd=new R(0,0,-1);tmpFwd=new R;tmpRight=new R;tmpUp=new R;worldUp=new R(0,1,0);orbitAzimuth=2.2;orbitElevation=.35;orbitAuto=!0;constructor(t){this.camera=t,this.camera.fov=Kn.FOV,this.updateDepthRange(),this.camera.updateProjectionMatrix()}updateDepthRange(){const t=ji.NEAR[this.mode],e=this.blending?Math.min(t,ji.NEAR[this.lastMode]):t;this.blending||(this.lastMode=this.mode),(Math.abs(this.camera.near-e)>1e-4||this.camera.far!==ji.FAR)&&(this.camera.near=e,this.camera.far=ji.FAR,this.camera.updateProjectionMatrix())}nextMode(){const t=gi.indexOf(this.mode);return this.setMode(gi[(t+1)%gi.length])}prevMode(){const t=gi.indexOf(this.mode);return this.setMode(gi[(t+gi.length-1)%gi.length])}setMode(t){return t!==this.mode&&(this.blending=!0,this.blendT=0,this.fromPos.copy(this.camera.position),this.fromQuat.copy(this.camera.quaternion)),this.mode=t,this.camera.fov=t==="cockpit"?Kn.FOV_COCKPIT:Kn.FOV,this.camera.updateProjectionMatrix(),this.mode}addOrbitDelta(t,e){this.orbitAzimuth-=t*.005,this.orbitElevation=is(this.orbitElevation+e*.004,-.25,1.25),this.orbitAuto=!1}update(t,e){const{position:n,quaternion:s,velocity:r,size:a}=e;switch(this.updateDepthRange(),this.mode){case"cockpit":{this.desiredPos.set(0,a*.026,a*.305).applyQuaternion(s).add(n),this.desiredQuat.copy(s),this.desiredQuat.multiply(Eh);break}case"wing":{this.desiredPos.set(-a*.16,a*.035,a*.06).applyQuaternion(s).add(n),this.desiredQuat.copy(s).multiply(Eh),this.desiredQuat.multiply(mx);break}case"orbit":{this.orbitAuto&&(this.orbitAzimuth+=t*Kn.ORBIT_SPEED);const o=a*1.35,l=Math.cos(this.orbitElevation);if(this.desiredPos.set(Math.cos(this.orbitAzimuth)*l*o,Math.sin(this.orbitElevation)*o+a*.05,Math.sin(this.orbitAzimuth)*l*o).add(n),this.tmpFwd.copy(n).sub(this.desiredPos).normalize(),this.camera.position.copy(this.desiredPos),this.camera.up.set(0,1,0),this.camera.lookAt(n),this.blending){this.blendT=Math.min(this.blendT+t/Kn.BLEND_TIME,1);const h=lo(this.blendT);this.camera.position.lerpVectors(this.fromPos,this.desiredPos,h),this.blendT>=1&&(this.blending=!1)}return}case"landing":{if(this.desiredPos.set(0,a*.1,-a*1.15).applyQuaternion(s).add(n),this.tmpFwd.set(0,0,1).applyQuaternion(s),this.tmpFwd.y*=.35,this.tmpFwd.normalize(),this.tmpUp.set(0,1,0).applyQuaternion(s).lerp(this.worldUp,.55).normalize(),this.camera.position.copy(this.desiredPos),this.camera.up.copy(this.tmpUp),this.camera.lookAt(n.clone().addScaledVector(this.tmpFwd,a*.9).addScaledVector(this.worldUp,-a*.02)),this.blending){this.blendT=Math.min(this.blendT+t/Kn.BLEND_TIME,1);const o=lo(this.blendT);this.camera.position.lerpVectors(this.fromPos,this.desiredPos,o),this.blendT>=1&&(this.blending=!1)}return}default:{this.tmpFwd.set(0,0,1).applyQuaternion(s);const o=vh(5.2,t);this.smoothFwd.lerp(this.tmpFwd,o),this.smoothFwd.lengthSq()<1e-8&&this.smoothFwd.copy(this.tmpFwd),this.smoothFwd.normalize(),this.tmpRight.crossVectors(this.smoothFwd,this.worldUp),this.tmpRight.lengthSq()<1e-6&&this.tmpRight.set(1,0,0),this.tmpRight.normalize(),this.tmpUp.crossVectors(this.tmpRight,this.smoothFwd).normalize(),this.desiredPos.copy(n).addScaledVector(this.smoothFwd,-a*.62).addScaledVector(this.tmpUp,a*.14),this.camera.position.copy(this.desiredPos),this.camera.up.copy(this.tmpUp),this.camera.lookAt(n.clone().addScaledVector(this.smoothFwd,a*.55));const l=e.agl!==void 0?is(1-e.agl/300,0,1):0,h=Kn.FOV+is(r.length()*.03,0,8)+l*3.2;this.camera.fov+=(h-this.camera.fov)*vh(2,t),this.camera.updateProjectionMatrix();return}}if(this.blending){this.blendT=Math.min(this.blendT+t/Kn.BLEND_TIME,1);const o=lo(this.blendT);this.camera.position.lerpVectors(this.fromPos,this.desiredPos,o),this.camera.quaternion.slerpQuaternions(this.fromQuat,this.desiredQuat,o),this.blendT>=1&&(this.blending=!1)}else this.camera.position.copy(this.desiredPos),this.camera.quaternion.copy(this.desiredQuat)}snap(t){this.blending=!1,this.smoothFwd.set(0,0,1).applyQuaternion(t.quaternion),this.update(1/60,t),this.blending=!1,this.update(1/60,t)}}const Eh=new Ce(0,1,0,0),mx=new Ce().setFromAxisAngle(new R(0,1,0),-.55);function lo(i){return i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2}class ql{curve;duration=118;t=0;prevPos=new R;bankSmooth=0;pitchSmooth=0;static TIMELINE=[[0,0,0],[20,.105,1],[42,.3,2],[78,.62,3],[106,.915,4],[118,1,5]];constructor(){const t=[new R(0,2.2,1850),new R(0,2.2,400),new R(0,2.2,-700),new R(0,24,-1800),new R(0,260,-4200),new R(1800,760,-8200),new R(6200,1500,-5200),new R(8200,1500,1200),new R(5200,1250,7200),new R(600,620,7600),new R(-1700,240,5200),new R(-1400,90,3e3),new R(0,26,1900),new R(0,6,400),new R(0,2.2,-1200),new R(0,2.2,-1850)];this.curve=new Pu(t,!1,"centripetal"),this.prevPos.copy(t[0])}reset(){this.t=0,this.bankSmooth=0,this.pitchSmooth=0,this.prevPos.copy(this.curve.getPointAt(0))}seek(t){this.t=Math.max(0,Math.min(t,this.duration))}get finished(){return this.t>=this.duration}update(t){this.t=Math.min(this.t+t,this.duration);const e=this.mapTimeToU(this.t),n=this.curve.getPointAt(e),s=this.curve.getTangentAt(e).normalize(),r=new Jt,a=new R(0,1,0);r.lookAt(n.clone().addScaledVector(s,100),n,a);const o=new Ce().setFromRotationMatrix(r),l=this.curve.getTangentAt(Math.min(e+.012,1)).normalize(),h=Math.atan2(s.x,s.z);let u=(Math.atan2(l.x,l.z)-h)/(.012*100);for(;u>Math.PI;)u-=Math.PI*2;for(;u<-Math.PI;)u+=Math.PI*2;const d=Math.max(n.distanceTo(this.prevPos)/Math.max(t,.001),1),p=uc.clamp(-u*d*1.15,-.62,.62);this.bankSmooth+=(p-this.bankSmooth)*Math.min(t*1.6,1),o.multiply(new Ce().setFromAxisAngle(new R(0,0,1),this.bankSmooth));const g=Math.asin(uc.clamp(s.y,-1,1));this.pitchSmooth+=(g-this.pitchSmooth)*Math.min(t*2.2,1);const v=n.clone().sub(this.prevPos).divideScalar(Math.max(t,.001));this.prevPos.copy(n);const m=this.phaseOf(this.t,n.y),f=this.gearOf(e),w=this.flapsOf(e,n.y),M=e>.975?.85:0,_=this.throttleOf(this.t),L=(Math.atan2(s.x,-s.z)*180/Math.PI+360)%360;return{position:n,quaternion:o,velocity:v,speed:d,altitude:n.y,heading:L,pitch:this.pitchSmooth*180/Math.PI,bank:this.bankSmooth*180/Math.PI,vspeed:v.y,throttle:_,gear:f,flaps:w,spoilers:M,phase:m}}mapTimeToU(t){const e=ql.TIMELINE;for(let n=0;n<e.length-1;n++){const[s,r]=e[n],[a,o]=e[n+1];if(t<=a){const l=(t-s)/(a-s),h=l*l*(3-2*l);return r+(o-r)*h}}return 1}phaseOf(t,e){return t<.5?"PREFLIGHT":t<16?"TAKEOFF ROLL":t<21?"ROTATE":e<900&&t<42?"CLIMB":t<78?"CRUISE":t<104?"DESCENT":t<114.5?"APPROACH":t<117?"LANDING":"ROLLOUT"}gearOf(t){return t<.1?1:t<.16?1-(t-.1)/.06:t<.86?0:t<.92?(t-.86)/.06:1}flapsOf(t,e){return t<.04?5:t<.12?15:t<.2?15-(t-.12)/.08*15:t<.8?0:t<.88?(t-.8)/.08*10:t<.95?25:(e<30,30)}throttleOf(t){return t<18?1:t<40?.92:t<80?.85:t<108?.55:t<116?.32:.15}}function ed(i){const t=Math.sin(i.heading),e=Math.cos(i.heading),n=i.center.x,s=i.center.z,r=i.length/2,a=(Math.atan2(-t,e)*180/Math.PI+360)%360,o=(a+180)%360;return[{name:i.runwayNumbers[0],headingDeg:(a%360+360)%360,x:n+t*r,z:s+e*r},{name:i.runwayNumbers[1],headingDeg:(o%360+360)%360,x:n-t*r,z:s-e*r}]}function gx(i,t,e,n,s){const[r,a]=ed(i),o=Math.sin(i.heading),l=Math.cos(i.heading),h=t-i.center.x,c=e-i.center.z,u=h*o+c*l,d=h*l-c*o,p=u>=0?r:a,g=u>=0?u-i.length/2:-u-i.length/2,v=Math.hypot(g,d),m=Math.hypot(n,s);let f=!1;if(m>2&&Math.abs(d)<1500){const _=p.x-t,L=p.z-e,T=Math.atan2(n,-s)*180/Math.PI,E=Math.atan2(_,-L)*180/Math.PI;f=Math.abs((T-E+540)%360-180)<30&&_*n+L*s>0}const w=Math.abs(d)<i.width/2+20&&Math.abs(u)<=i.length/2;let M=null;if(w){const _=m>2?Math.atan2(n,-s)*180/Math.PI:p.headingDeg;M=Math.abs((_-r.headingDeg+540)%360-180)>90?i.length/2-u:i.length/2+u,M=Math.max(0,Math.min(i.length,M))}return{nearest:p,distanceToThreshold:v,lateralOffset:d,alongTrack:g,aligned:f,onRunway:w,remainingRunway:M,groundSpeed:m}}const hl=[{id:"day",label:"昼",sub:"晴天の白昼",sunElevation:.82,skyTop:3040192,skyHorizon:12901102,sunColor:16772556,sunIntensity:2.4,hemiIntensity:.75,fogColor:13229295,nightLights:.15},{id:"sunset",label:"夕焼け",sub:"オレンジの空",sunElevation:.12,skyTop:2572666,skyHorizon:15901276,sunColor:16757866,sunIntensity:1.7,hemiIntensity:.5,fogColor:14721650,nightLights:.55},{id:"night",label:"夜",sub:"星空と滑走路灯",sunElevation:-.12,skyTop:396060,skyHorizon:1713984,sunColor:10335464,sunIntensity:.35,hemiIntensity:.22,fogColor:1186862,nightLights:1}],ul=[{id:"clear",label:"快晴",sub:"雲少なめ・良好",cloudScale:.85,cloudDarken:0,fogScale:1,rain:0,sunScale:1,turbulence:.15},{id:"cloudy",label:"くもり",sub:"雲多め・やや荒れ",cloudScale:1.6,cloudDarken:.35,fogScale:1.6,rain:0,sunScale:.55,turbulence:.45},{id:"rain",label:"雨",sub:"暗い空・乱流・雨",cloudScale:1.35,cloudDarken:.6,fogScale:2.4,rain:1,sunScale:.3,turbulence:.8}],dl=[{id:"calm",label:"無風",sub:"0 m/s",speed:0,directionDeg:0},{id:"breeze",label:"そよ風",sub:"5 m/s 北西",speed:5,directionDeg:315},{id:"strong",label:"強風",sub:"12 m/s 西",speed:12,directionDeg:270}];function vx(i){return hl.find(t=>t.id===i)??hl[0]}function _x(i){return ul.find(t=>t.id===i)??ul[0]}function xx(i){return dl.find(t=>t.id===i)??dl[0]}function Mx(i,t){const n=t*Math.PI/180+Math.PI;return{x:i*Math.sin(n),z:-i*Math.cos(n)}}const nn=260,Xr=900,yx=22;function Sx(i){const t=new Float32Array(Xr*3),e=new Float32Array(Xr);for(let a=0;a<Xr;a++)t[a*3+0]=(Math.random()-.5)*nn*2,t[a*3+1]=Math.random()*180,t[a*3+2]=(Math.random()-.5)*nn*2,e[a]=yx*(.8+Math.random()*.5);const n=new ge;n.setAttribute("position",new xe(t,3));const s=new Bl({color:10467532,size:1.1,transparent:!0,opacity:0,depthWrite:!1,fog:!0,sizeAttenuation:!0}),r=new zl(n,s);return r.frustumCulled=!1,r.visible=!1,i.add(r),{points:r,setIntensity(a){const o=Math.max(0,Math.min(1,a));s.opacity=.1+.35*o,r.visible=o>.01},update(a,o){if(!r.visible)return;const l=n.getAttribute("position"),h=l.array;for(let c=0;c<Xr;c++){h[c*3+1]-=e[c]*a;const u=h[c*3+0]-o.x,d=h[c*3+2]-o.z;u>nn?h[c*3+0]-=nn*2:u<-nn&&(h[c*3+0]+=nn*2),d>nn?h[c*3+2]-=nn*2:d<-nn&&(h[c*3+2]+=nn*2),h[c*3+1]<o.y-60&&(h[c*3+1]=o.y+120,h[c*3+0]=o.x+(Math.random()-.5)*nn*2,h[c*3+2]=o.z+(Math.random()-.5)*nn*2)}l.needsUpdate=!0}}}const ha=1.225,co=9.80665;function Ah(i){return ha*Math.exp(-Math.max(i,-500)/8500)}function wx(i,t){return .5*i*t*t}function bx(i,t){return i*Math.sqrt(t/ha)}const Rh=.3;function Tx(i,t,e){const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}function Ex(i,t,e,n,s,r,a){const o=Math.min(e.flapsDeg,40)/40,l=Math.min(Math.max(e.spoilers,0),1),h=Tx(Rh,Rh+.22,Math.abs(i)),c=.38+5.2*i+.85*o,u=1.15*Math.sin(2*i);let d=(1-h)*c+h*u;d*=1-.42*l;const p=.021+.048*c*c,g=1.2*Math.sin(i)*Math.sin(i)+.04;let v=(1-h)*p+h*g;v+=.055*o*o+.016*o,v+=.018*(e.gearDown?1:0),v+=.03*l,v+=.55*t*t;const m=-.9*t,f=Math.max(s,10),w=n.pitchRateUp*r/(2*f);let M=.025-1.15*i-12*w+1.25*e.elevator;M+=-.055*o,M+=-.02*l,h>0&&(M+=-.85*h*Math.sign(i||1)*Math.abs(i));const _=n.yawRateRight*a/(2*f),L=.12*t-.28*_+.1*e.rudder,T=n.rollRateRight*a/(2*f),E=-.09*t-.52*T+.16*e.aileron;return{CL:d,CD:v,CY:m,Cm:M,Cn:L,Cl:E}}class Ax{spec;position=new R;quaternion=new Ce;velocity=new R;omega=new R;throttle=1;flapsDeg=5;spoilers=0;gearDown=!0;brakes=!1;crashed=!1;onGround=!0;wind=new R;turbulence=0;fuelFrac=1;tSim=0;gust=new R;mass;inertia=new R;wingArea;chord;span;gearHeight;groundHeight;distanceFlown=0;gLoadSmooth=1;tmpV=new R;tmpV2=new R;tmpQ=new Ce;fBody=new R;mBody=new R;constructor(t,e=()=>0){this.spec=t,this.groundHeight=e,this.mass=t.mass,this.wingArea=t.wingArea,this.span=t.wingspan,this.chord=t.rootChord*.55+t.tipChord*.45;const n=t.fuselageLength,s=t.wingspan;this.inertia.set(.35*this.mass*Math.pow(n*.28,2),.32*this.mass*Math.pow(n*.3,2),.25*this.mass*Math.pow(s*.22,2)),this.gearHeight=t.fuselageRadius*1.35+t.fuselageRadius*.3+t.fuselageRadius*.3,this.reset(new R(0,0,1500),0)}reset(t,e){this.resetBase(t,e);const n=this.groundHeight(this.position.x,this.position.z);this.position.y=n+this.gearHeight,this.onGround=!0}resetAirborne(t,e,n){this.resetBase(t,e),this.velocity.set(0,0,n).applyQuaternion(this.quaternion),this.onGround=!1}resetBase(t,e){this.position.copy(t),this.quaternion.setFromAxisAngle(new R(0,1,0),e),this.velocity.set(0,0,0),this.omega.set(0,0,0),this.throttle=1,this.flapsDeg=5,this.spoilers=0,this.gearDown=!0,this.brakes=!1,this.crashed=!1,this.distanceFlown=0,this.gLoadSmooth=1,this.fuelFrac=1,this.tSim=0,this.gust.set(0,0,0)}step(t,e,n=0){if(this.crashed)return;const s=this.quaternion;this.tSim+=t;const r=this.turbulence*6;if(r>0){const y=this.tSim;this.gust.set(r*(Math.sin(y*1.7)*.5+Math.sin(y*.91+1.3)*.3+Math.sin(y*2.3+4.1)*.2),r*.7*(Math.sin(y*1.13+2.2)*.5+Math.sin(y*2.7+.6)*.5),r*(Math.sin(y*1.37+5)*.5+Math.sin(y*.77+3.3)*.3+Math.sin(y*2.9+1.9)*.2))}else this.gust.set(0,0,0);this.fuelFrac>0&&this.throttle>.02&&!this.onGround&&(this.fuelFrac=Math.max(0,this.fuelFrac-6e-5*this.throttle*t));const a=this.position.y,o=Ah(a);this.tmpV.copy(this.velocity).sub(this.wind).sub(this.gust);const l=this.tmpV.length();this.tmpQ.copy(s).invert();const h=this.tmpV2.copy(this.tmpV).applyQuaternion(this.tmpQ),c=h.z,u=h.x,d=h.y,p=Math.atan2(-d,Math.max(c,.1)),g=Math.atan2(u,Math.max(c,.1)),v=-this.omega.x,m=this.omega.y,f=-this.omega.z,w={elevator:e.elevator+n,aileron:-e.aileron,rudder:-e.rudder,flapsDeg:e.flapsDeg,spoilers:e.spoilers,gearDown:e.gearDown},M=Ex(p,g,w,{pitchRateUp:v,rollRateRight:f,yawRateRight:m},l,this.chord,this.span),_=wx(o,l);if(this.fBody.set(0,0,0),this.mBody.set(0,0,0),l>.5){const y=_*this.wingArea*M.CD;this.fBody.addScaledVector(h.divideScalar(l),-y);const x=this.tmpV.set(0,0,0).copy(h).cross(this.tmpV2.set(1,0,0)).normalize(),P=_*this.wingArea*M.CL;this.fBody.addScaledVector(x,P),this.fBody.x+=_*this.wingArea*M.CY;const k=this.spec.thrustMax*Math.pow(o/ha,.8)*(1-.35*Math.min(l/700,1))*this.throttle;this.fBody.z+=k;const I=_*this.wingArea*this.chord*M.Cm,N=_*this.wingArea*this.span*M.Cn,H=_*this.wingArea*this.span*M.Cl;this.mBody.x+=-I,this.mBody.y+=N,this.mBody.z+=-H}else{const y=this.spec.thrustMax*Math.pow(o/ha,.8)*this.throttle;this.fBody.z+=y}this.tmpQ.copy(s),this.tmpV.copy(this.fBody).applyQuaternion(this.tmpQ),this.tmpV.y-=this.mass*co,this.tmpV.divideScalar(this.mass);const L=this.fBody.y/(this.mass*co)+0;if(this.gLoadSmooth+=(Math.max(L,-.4)-this.gLoadSmooth)*Math.min(t*6,1),this.velocity.addScaledVector(this.tmpV,t),this.position.addScaledVector(this.velocity,t),this.distanceFlown+=this.velocity.length()*t,this.onGround)this.omega.x+=this.mBody.x/this.inertia.x*t,this.omega.y+=this.mBody.y/this.inertia.y*t,this.omega.z+=this.mBody.z/this.inertia.z*t,this.omega.multiplyScalar(Math.exp(-3.5*t));else{const y=this.inertia,x=this.omega.x,P=this.omega.y,k=this.omega.z;this.tmpV.set(this.mBody.x-(P*y.z*k-k*y.y*P),this.mBody.y-(k*y.x*x-x*y.z*k),this.mBody.z-(x*y.y*P-P*y.x*x)),this.omega.x+=this.tmpV.x/y.x*t,this.omega.y+=this.tmpV.y/y.y*t,this.omega.z+=this.tmpV.z/y.z*t}const T=1.6;this.omega.length()>T&&this.omega.setLength(T),Number.isFinite(this.omega.x+this.omega.y+this.omega.z)||this.omega.set(0,0,0),this.tmpQ.set(this.omega.x*t/2,this.omega.y*t/2,this.omega.z*t/2,1),this.quaternion.multiply(this.tmpQ).normalize();const C=this.groundHeight(this.position.x,this.position.z)+this.gearHeight;if(this.position.y<=C+.02){const y=this.velocity.y;if(y>0)this.onGround=!1;else{if(this.position.y=C,this.onGround=!0,y<-8){this.crashed=!0,this.velocity.multiplyScalar(.2);return}y<-.4?this.velocity.y=-y*.12:this.velocity.y=0;const x=this.tmpV2.copy(this.velocity).applyQuaternion(this.tmpQ.copy(this.quaternion).invert());x.x-=x.x*Math.min(6*t,1);const P=.022+(this.brakes?.32:0)+this.spoilers*.06,k=x.z,I=P*co*t;Math.abs(k)>I?x.z-=Math.sign(k)*I:x.z=0,this.velocity.copy(x).applyQuaternion(this.quaternion);const N=this.velocity.length();if(N<30){const z=-e.rudder*Math.min(N/8,1)*.55;this.tmpQ.setFromAxisAngle(new R(0,1,0),z*t),this.quaternion.multiply(this.tmpQ)}Math.min(1,Math.abs(e.elevator)+Math.abs(e.aileron));const H=(1-Math.abs(e.aileron)*.9)*6.5,U=Math.abs(e.elevator)<.1?6.5:0,Y=this.tmpV.set(0,-1,0).applyQuaternion(this.tmpQ.copy(this.quaternion).invert());this.omega.z+=(Y.x*H-this.omega.z*2.2)*t*2,this.omega.x+=(-Y.z*U-this.omega.x*2.2)*t*2,Math.hypot(Y.x,Y.z)>.62&&(this.crashed=!0,this.velocity.multiplyScalar(.1))}}else this.onGround=!1}telemetry(){const t=new R(0,0,1).applyQuaternion(this.quaternion),e=new R(1,0,0).applyQuaternion(this.quaternion),n=new R(0,1,0).applyQuaternion(this.quaternion),s=Ah(this.position.y),r=new R().copy(this.velocity).sub(this.wind),a=r.length(),o=r.applyQuaternion(new Ce().copy(this.quaternion).invert());return{position:this.position.clone(),quaternion:this.quaternion.clone(),velocity:this.velocity.clone(),omega:this.omega.clone(),tas:a,ias:bx(a,s),alt:this.position.y,agl:this.position.y-this.groundHeight(this.position.x,this.position.z),heading:(Math.atan2(t.x,-t.z)*180/Math.PI+360)%360,pitch:Math.asin(Math.min(1,Math.max(-1,t.y)))*180/Math.PI,bank:-(Math.atan2(-e.y,n.y)*180)/Math.PI,vspeed:this.velocity.y,aoa:Math.atan2(-o.y,Math.max(o.z,.1))*180/Math.PI,sideslip:-(Math.atan2(o.x,Math.max(o.z,.1))*180)/Math.PI,gLoad:this.gLoadSmooth,throttle:this.throttle,onGround:this.onGround,crashed:this.crashed,distanceFlown:this.distanceFlown,fuelFrac:this.fuelFrac,groundSpeed:Math.hypot(this.velocity.x,this.velocity.z),windSpeed:Math.hypot(this.wind.x,this.wind.z),windDirDeg:(Math.atan2(-this.wind.x,this.wind.z)*180/Math.PI+360)%360}}}function pe(i,t,e){return i<t?t:i>e?e:i}function Bs(i){let t=i%360;return t>180&&(t-=360),t<=-180&&(t+=360),t}const ho=1.94404,uo=Math.tan(3*Math.PI/180),Rx=150;function Cx(i,t,e,n){const s=Math.sin(i.heading),r=Math.cos(i.heading),a=i.length/2,o=i.center.x+s*a,l=i.center.z+r*a,h=i.center.x-s*a,c=i.center.z-r*a,u=n*Math.PI/180,d=Math.sin(u),p=-Math.cos(u),g=(o-t)*d+(l-e)*p,v=(h-t)*d+(c-e)*p,m=g>=v,f=m?o:h,w=m?l:c,M=m?h:o,_=m?c:l;let L=f-M,T=w-_;const E=Math.hypot(L,T)||1;L/=E,T/=E;const C=(Math.atan2(L,-T)*180/Math.PI%360+360)%360,y=t-f,x=e-w,P=-T,k=L,I=y*P+x*k,N=-(y*L+x*T);return{thrX:f,thrZ:w,rwyHdg:C,xtk:I,along:N,rightX:P,rightZ:k}}class Px{engaged=!1;latMode="HDG";verMode="ALT";spd=62;hdg=0;altTarget=0;vs=0;throttle=.6;events=[];locAlive=!1;gsAlive=!1;debugOn=!1;debug={};itP=0;itR=0;hInt=0;vsInt=0;vsAltV=0;vsAltRef=null;wasAirborne=!0;last={engaged:!1,lat:"HDG",ver:"ALT",spdKt:120,hdgDeg:0,altM:0,vsFpm:0,loc:!1,gs:!1,xtk:0,gsDev:0,dist:0};reset(){this.engaged=!1,this.vsInt=0,this.hInt=0,this.latMode="HDG",this.verMode="ALT",this.locAlive=!1,this.gsAlive=!1,this.wasAirborne=!0,this.events.length=0}drainEvents(){if(this.events.length===0)return this.events;const t=this.events.slice();return this.events.length=0,t}emit(t){this.events.length<8&&this.events.push(t)}toggle(t){if(this.engaged){this.engaged=!1,this.emit("ap-off");return}this.engaged=!0,this.spd=pe(t.ias,41,143),this.hdg=Math.round(t.heading),this.altTarget=t.onGround?t.alt:Math.round(t.alt),this.vs=0,this.verMode="ALT",this.locAlive||(this.latMode="HDG"),this.itP=.05,this.itR=0,this.hInt=0,this.vsInt=0,this.vsAltV=0,this.vsAltRef=null,this.emit("ap-on")}status(){return this.last}nudgeSpd(t){this.spd=pe(this.spd*ho+t,80,280)/ho}nudgeHdg(t){this.hdg=((this.hdg+t)%360+360)%360,this.latMode="HDG",this.hInt=0}setLat(t){this.latMode=t,this.hInt=0,t==="NAV"&&this.emit("nav-arm")}nudgeAlt(t){this.altTarget=Math.max(this.altTarget+t,60),this.verMode==="APPR"&&(this.verMode="ALT",this.emit("gs-off"))}nudgeVs(t){this.vs=pe(this.vs+t/196.85,-10,10),this.verMode="VS",this.vsInt=0,this.vsAltV=0,this.vsAltRef=null}holdAltReset(){this.verMode="ALT",this.vsInt=0}holdAlt(){this.verMode="ALT",this.vsInt=0}alignApproach(){this.latMode="NAV",this.verMode="APPR",this.hInt=0,this.vsInt=0,this.emit("appr-arm")}step(t,e,n){if(!this.engaged)return null;if(this.wasAirborne&&e.onGround)return this.engaged=!1,this.emit("ap-touchdown"),this.wasAirborne=!1,null;if(this.wasAirborne=!e.onGround,e.onGround)return{pitch:0,roll:0,throttle:pe(this.throttle,.02,1)};const s=pe(t,1/240,1/15);this.vsAltRef===null&&(this.vsAltRef=e.alt,this.vsAltV=0);let r=0,a=0,o=this.hdg,l=0,h;if(this.latMode==="NAV"&&n){const P=Cx(n,e.x,e.z,e.heading);l=e.vx*P.rightX+e.vz*P.rightZ,r=P.xtk,a=P.along,o=P.rwyHdg;const k=a>-800&&a<14e3,I=Math.abs(Bs(P.rwyHdg-e.heading))<16,N=this.locAlive;if(this.locAlive=N&&k&&Math.abs(r)<900||k&&I&&Math.abs(r)<260,this.locAlive){N||(this.emit("loc-alive"),this.hInt=0),this.hdg=Math.round(P.rwyHdg);const H=this.verMode==="APPR"?6:12,U=pe(-r*.05-l*.55,-H,H);h=Bs(P.rwyHdg+U-e.heading)}else N&&this.emit("loc-lost"),h=Bs(this.hdg-e.heading)}else this.locAlive&&this.emit("loc-lost"),this.locAlive=!1,h=Bs(this.hdg-e.heading);this.latMode!=="NAV"&&(this.hInt=pe(this.hInt+h*.08*s,-6,6));const c=pe(h*(this.latMode==="NAV"?.75:.6)+this.hInt,-28,28);if(this.verMode!=="APPR")this.gsAlive=!1;else if(this.locAlive){const P=this.gsAlive,k=Math.max(a,0)*uo,I=e.alt-k;this.gsAlive=P||a>400&&Math.abs(I)<60&&Math.abs(r)<260,this.gsAlive&&!P&&this.emit("gs-alive"),this.gsAlive}const u=Bs(c-e.bank),d=pe(u*1.6,-15,15),p=this.itR+.05*u-.01*(e.p-d),g=pe(p,-1,1);this.itR=pe(this.itR+.3*u*s-2*(p-g),-.5,.5);const v=this.gsAlive?e.alt-Math.max(a,0)*uo:0;let m;if(this.verMode==="APPR"&&this.gsAlive)m=-uo*Math.max(e.ias,40)+pe(-v*.35,-3.2,3.2),m=pe(m,-12,6);else if(this.verMode==="VS")m=this.vs;else{const P=this.altTarget-e.alt;m=pe(P*1.15,-8,8),Math.abs(P)<40&&(m*=Math.abs(P)/40)}const f=this.altTarget-e.alt,w=this.verMode==="APPR"&&this.gsAlive?0:.022,M=(1/Math.max(.66,Math.cos(e.bank*Math.PI/180))-1)*Math.max(e.alt,300)*.5;if(this.verMode==="VS"){this.vsAltV+=m*s;var _=.05*pe(this.vsAltV-(e.alt-this.vsAltRef),-240,240)+.45*(m-e.vs)}else{this.vsInt=pe(this.vsInt+(m-e.vs)*.05*s,-5,5),this.verMode==="ALT"&&(this.vsInt=pe(this.vsInt*(1-.8*s),-5,5));var _=this.vsInt+.45*(m-e.vs)}const L=pe(w*(f+M)+_,-4.5,12),T=L-e.pitch,E=this.itP+.25*T-.18*e.q,C=pe(E,-1,1);this.itP=pe(this.itP+.15*T*s-3*(E-C),-.4,.4),this.debugOn&&(this.debug={thDes:L,pitchErr:T,itP:this.itP,q:e.q,pitch:e.pitch}),this.verMode!=="APPR"&&e.agl<Rx&&e.vs<-.5&&(this.altTarget=e.alt+400,this.verMode="ALT",this.emit("min-alt")),this.latMode==="NAV"&&this.locAlive&&a<-500&&(this.locAlive=!1,this.gsAlive=!1,this.verMode=this.verMode==="APPR"?"ALT":this.verMode,this.latMode="HDG",this.hdg=Math.round(o),this.emit("missed"));const y=this.spd-e.ias,x=Math.abs(y)<1?0:y;return this.throttle=pe(this.throttle+pe(x*.05,-.3,.3)*s,.02,1),this.verMode==="APPR"&&this.gsAlive&&e.agl<30&&e.vs<-.4&&(this.throttle=.03),!Number.isFinite(C)||!Number.isFinite(g)?(this.engaged=!1,this.emit("ap-trip"),null):(this.last={engaged:!0,lat:this.latMode,ver:this.verMode,spdKt:Math.round(this.spd*ho),hdgDeg:this.hdg,altM:Math.round(this.altTarget),vsFpm:Math.round(this.vs*196.85),loc:this.locAlive,gs:this.gsAlive,xtk:r,gsDev:v,dist:Math.max(a,0)},{pitch:pe(C,-1,1),roll:pe(g,-1,1),throttle:this.throttle})}}const Ch=180/Math.PI;function Ph(i){return{ias:i.ias,pitch:i.pitch,alt:i.alt,agl:i.agl,heading:i.heading,bank:i.bank,q:-i.omega.x*Ch,p:i.omega.z*Ch,vs:i.vspeed,x:i.position.x,z:i.position.z,vx:i.velocity.x,vz:i.velocity.z,onGround:i.onGround}}const Lh=new R(0,1,0),Lx=new Ce().setFromAxisAngle(new R(1,0,0),-Math.PI/2),Dh=new R,Ih=new Ce,Dx=new Ce;class Ix{state="menu";quality=new u_;lodTimer=0;rig;demo=new ql;scene;camera;renderer;sky;water;terrain;fogBaseNear=We.FOG_NEAR;fogBaseFar=We.FOG_FAR;clouds;rain;airport=gh("hlm");envWind=new R;envTurbulence=.15;player=null;cockpit=null;playerSpec=Bn[0];flightMode="free";physics=null;physicsAccum=0;ap=new Px;lastTel=null;lastDemoState=null;composer=null;bloomPass=null;cityGroup=null;airportGroups=[];groundBlob=null;previewScene;previewAircraft=null;previewAngle=.6;constructor(t,e,n){this.renderer=t,this.scene=e,this.camera=n,this.rig=new ji(n),this.sky=d_(e,t),e.fog=new Fl(12901102,We.FOG_NEAR,We.FOG_FAR);const s=this.quality.preset;this.terrain=ex(e,s.terrainNearSeg,s.terrainMid),nx(e),this.water=ix(e),this.renderer.shadowMap.enabled=s.shadows,this.renderer.shadowMap.type=Yh,this.applyShadowSettings(),this.clouds=sx(e,this.quality.preset.cloudCount),this.rain=Sx(e);for(const l of je)this.airportGroups.push(lx(e,l,Bn,this.quality.preset.runwayTexPx));this.cityGroup=hx(e,this.quality.preset.cityCount),ux(e,this.quality.preset.treeCount),this.quality.preset.bloom&&this.enableBloom();{const l=document.createElement("canvas");l.width=l.height=128;const h=l.getContext("2d"),c=h.createRadialGradient(64,64,6,64,64,62);c.addColorStop(0,"rgba(0,0,0,0.85)"),c.addColorStop(.6,"rgba(0,0,0,0.38)"),c.addColorStop(1,"rgba(0,0,0,0)"),h.fillStyle=c,h.fillRect(0,0,128,128);const u=new bi(l),d=new at(new Ti(1,20),new Qe({map:u,transparent:!0,opacity:0,depthWrite:!1,fog:!0}));d.rotation.x=-Math.PI/2,d.renderOrder=2,d.visible=!1,e.add(d),this.groundBlob=d}this.previewScene=new Ol,this.previewScene.background=new Et(1120288),this.previewScene.environment=e.environment;const r=new Fu(12376304,3359829,1);this.previewScene.add(r);const a=new Bu(16773596,2);a.position.set(60,80,40),this.previewScene.add(a);const o=new at(new Ti(260,48),new qt({color:1778734,metalness:.2,roughness:.8}));o.rotation.x=-Math.PI/2,o.position.y=-32,this.previewScene.add(o),this.buildPreview(Bn[0])}setQuality(t){this.quality.setLevel(t);const e=this.quality.preset;this.renderer.shadowMap.enabled=e.shadows,this.terrain.setMid(e.terrainMid),this.applyShadowSettings(),e.bloom&&!this.composer&&this.enableBloom(),this.syncPostFx()}enableBloom(){const t=this.renderer,e=new it;t.getSize(e);const n=new a_(t);n.addPass(new o_(this.scene,this.camera));const s=new ps(new it(e.x,e.y),.42,.62,.8);n.addPass(s),n.addPass(new h_),n.setPixelRatio(t.getPixelRatio()),this.composer=n,this.bloomPass=s}syncPostFx(){if(this.bloomPass&&(this.bloomPass.enabled=this.quality.preset.bloom),!this.composer)return;this.composer.setPixelRatio(this.renderer.getPixelRatio());const t=new it;this.renderer.getSize(t),this.composer.setSize(t.x,t.y)}lastEnvIds=null;reapplyEnvironment(){this.lastEnvIds&&this.applyEnvironment(...this.lastEnvIds)}applyShadowSettings(){const t=this.sky.sun,e=this.quality.preset;if(t.castShadow=e.shadows,!e.shadows)return;t.shadow.map&&(t.shadow.map.dispose(),t.shadow.map=null),t.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize);const n=t.shadow.camera,s=e.shadowRange;n.left=-s,n.right=s,n.top=s,n.bottom=-s,n.near=200,n.far=9e3,n.updateProjectionMatrix(),t.shadow.bias=-4e-4,t.shadow.normalBias=6,t.target.position.set(0,0,0),this.scene.add(t.target)}applyEnvironment(t,e,n){this.lastEnvIds=[t,e,n];const s=vx(t),r=_x(e),a=xx(n);this.sky.setSunElevation(s.sunElevation),this.sky.setPalette(s.skyTop,s.skyHorizon,s.sunColor,s.sunIntensity*r.sunScale,s.hemiIntensity*(.55+.45*r.sunScale)),this.sky.setStars(Math.max(0,(s.nightLights-.62)/.38));const o=u=>{const d=u?.userData?.setNightLights;d?.(s.nightLights*(.55+.45*r.sunScale))};o(this.cityGroup);for(const u of this.airportGroups)o(u);this.water.setPalette(s.skyTop,s.skyHorizon,s.sunColor,s.sunElevation),this.sky.regenerateEnv(this.scene);const l=this.scene.fog;l.color.setHex(s.fogColor);const h=Math.max(.25,r.fogScale);l.near=We.FOG_NEAR/h,l.far=We.FOG_FAR/h,this.fogBaseNear=l.near,this.fogBaseFar=l.far,this.water.setHorizon(l.color),this.clouds.setDensity(Math.min(1,r.cloudScale)),this.clouds.setDarken(r.cloudDarken),this.rain.setIntensity(r.rain);const c=Mx(a.speed,a.directionDeg);this.envWind.set(c.x,0,c.z),this.envTurbulence=r.turbulence,this.physics&&(this.physics.wind.copy(this.envWind),this.physics.turbulence=this.envTurbulence)}apInput(){return!this.ap.engaged||!this.lastTel||!this.physics?null:Ph(this.lastTel)}toggleAp(){const t=this.lastTel??this.physics?.telemetry();return t?this.ap.toggle(Ph(t)):this.ap.toggle({ias:62,alt:0,agl:0,heading:0,bank:0,pitch:0,q:0,p:0,vs:0,x:0,z:0,vx:0,vz:0,onGround:!0}),this.ap.engaged}getApStatus(){return this.ap.status()}drainApEvents(){return this.ap.drainEvents()}getNavInfo(){const t=this.getTelemetry();return t?gx(this.airport,t.position.x,t.position.z,t.velocity.x,t.velocity.z):null}getPlayerGroup(){return this.player?this.player.group:null}buildPreview(t){if(this.previewAircraft){const n=this.previewAircraft.group;n.traverse(s=>{const r=s;r.geometry&&r.geometry.dispose();const a=r.material;Array.isArray(a)?a.forEach(o=>o.dispose()):a?.dispose()}),this.previewScene.remove(n)}this.previewAircraft=cl(t,{low:!1}),this.previewAircraft.setGearPosition(1);const e=t.fuselageLength;this.previewAircraft.group.position.set(0,-e*.06,0),this.previewScene.add(this.previewAircraft.group),this.previewAngle=.7}selectAircraft(t){this.buildPreview(t)}renderPreview(t){this.previewAngle+=t*.22,this.previewAircraft&&io(this.playerSpec.id),this.previewAircraft&&(this.previewAircraft.group.rotation.y=this.previewAngle,this.previewAircraft.spinFans(t));const e=this.playerSpec.fuselageLength,n=e*1.55;this.camera.position.set(Math.cos(this.previewAngle*.35)*n,e*.32,Math.sin(this.previewAngle*.35)*n),this.camera.lookAt(0,e*.02,0),this.renderer.render(this.previewScene,this.camera)}runwayStartPose(){const t=this.airport,[e]=ed(t),n=Math.sin(t.heading),s=Math.cos(t.heading);return{pos:new R(e.x-n*220,0,e.z-s*220),headingRad:t.heading+Math.PI}}startFlight(t,e,n){if(n&&(this.airport=gh(n)),this.playerSpec=io(t),this.flightMode=e,this.player&&this.scene.remove(this.player.group),this.player=cl(this.playerSpec),this.cockpit=fx(this.playerSpec),this.player.group.add(this.cockpit.group),this.cockpit.group.visible=this.rig.mode==="cockpit",this.scene.add(this.player.group),e==="free"){this.physics=new Ax(this.playerSpec,_e);const s=this.runwayStartPose();this.physics.reset(s.pos,s.headingRad),this.physics.throttle=0,this.physics.flapsDeg=5,this.ap.reset(),this.lastTel=this.physics.telemetry(),this.physics.wind.copy(this.envWind),this.physics.turbulence=this.envTurbulence,this.physicsAccum=0;const r=this.physics.telemetry();this.rig.snap({position:r.position,quaternion:r.quaternion,velocity:r.velocity,size:this.playerSpec.fuselageLength})}else{this.physics=null,this.demo.reset();const s=this.demo.update(.001);this.lastDemoState=s,this.applyDemoState(s),this.rig.snap({position:s.position,quaternion:s.quaternion,velocity:s.velocity,size:this.playerSpec.fuselageLength})}this.state="flying"}pause(){this.state==="flying"&&(this.state="paused")}resume(){this.state==="paused"&&(this.state="flying")}toMenu(){this.state="menu",this.buildPreview(io(this.playerSpec.id))}restartDemo(){if(this.player){if(this.player.group.visible=!0,this.flightMode==="free"&&this.physics){const t=this.runwayStartPose();this.physics.reset(t.pos,t.headingRad),this.physics.throttle=0,this.ap.reset(),this.lastTel=this.physics.telemetry()}else this.demo.reset();this.state="flying"}}cycleCamera(t){const e=t===1?this.rig.nextMode():this.rig.prevMode();return this.cockpit&&(this.cockpit.group.visible=e==="cockpit"),e}cameraName(){return px[this.rig.mode]}getDemoState(){return this.lastDemoState}getTelemetry(){if(this.flightMode==="free"&&this.physics)return this.physics.telemetry();const t=this.lastDemoState;return t?{position:t.position,quaternion:t.quaternion,velocity:t.velocity,omega:new R,tas:t.speed,ias:t.speed,alt:t.altitude,agl:t.altitude,heading:t.heading,pitch:t.pitch,bank:t.bank,vspeed:t.vspeed,aoa:0,sideslip:0,gLoad:1,throttle:t.throttle,onGround:t.altitude<4,crashed:!1,distanceFlown:0,fuelFrac:.8,groundSpeed:t.speed,windSpeed:0,windDirDeg:0}:null}getFlightInfo(){if(this.flightMode==="free"&&this.physics){const e=this.physics.telemetry(),n=e.crashed?"CRASHED":e.onGround?e.ias>3?"TAKEOFF ROLL":e.throttle>.02?"GROUND":"PARKED":e.agl<300&&e.vspeed<0?"APPROACH":"FLIGHT";return{flapsDeg:this.physics.flapsDeg,gearDown:this.physics.gearDown,phase:n,crashed:e.crashed}}const t=this.lastDemoState;return{flapsDeg:t?.flaps??0,gearDown:(t?.gear??1)>.5,phase:t?.phase??"—",crashed:!1}}simulate(t,e){if(!this.physics)return;this.physics.throttle=e.throttle,this.physics.flapsDeg=e.flapsDeg,this.physics.spoilers=e.spoilers,this.physics.gearDown=e.gearDown,this.physics.brakes=e.brakes;const n=1/120,s=Math.round(t/n);for(let a=0;a<s;a++)this.physics.step(n,{elevator:e.pitch,aileron:e.roll,rudder:e.yaw,flapsDeg:e.flapsDeg,spoilers:e.spoilers,gearDown:e.gearDown});const r=this.physics.telemetry();this.player?.group.position.copy(r.position),this.player?.group.quaternion.copy(r.quaternion),this.rig.snap({position:r.position,quaternion:r.quaternion,velocity:r.velocity,size:this.playerSpec.fuselageLength})}updateFlight(t,e){if(this.player){if(this.flightMode==="free"&&this.physics){const s={...e??{pitch:0,roll:0,yaw:0,throttle:this.physics.throttle,brakes:this.physics.brakes,flapsDeg:this.physics.flapsDeg,spoilers:this.physics.spoilers,gearDown:this.physics.gearDown}},r=this.apInput();if(r){const l=this.ap.step(t,r,this.airport);l&&(s.pitch=l.pitch,s.roll=l.roll,s.throttle=l.throttle)}this.physics.throttle=s.throttle,this.physics.flapsDeg=s.flapsDeg,this.physics.spoilers=s.spoilers,this.physics.gearDown=s.gearDown,this.physics.brakes=s.brakes,this.physicsAccum=Math.min(this.physicsAccum+t,.25);const a=1/120;for(;this.physicsAccum>=a;)this.physics.step(a,{elevator:s.pitch,aileron:s.roll,rudder:s.yaw,flapsDeg:s.flapsDeg,spoilers:s.spoilers,gearDown:s.gearDown}),this.physicsAccum-=a;const o=this.physics.telemetry();this.lastTel=o,o.crashed&&this.ap.engaged&&this.ap.reset(),this.player.group.position.copy(o.position),this.player.group.quaternion.copy(o.quaternion),this.player.setGearPosition(this.physics.gearDown?1:0),this.player.setFlaps(this.physics.flapsDeg),this.player.setSpoilers(this.physics.spoilers),this.rig.update(t,{position:o.position,quaternion:o.quaternion,velocity:o.velocity,size:this.playerSpec.fuselageLength,agl:Math.max(0,o.position.y-_e(o.position.x,o.position.z))})}else{const n=this.demo.update(t);this.lastDemoState=n,this.applyDemoState(n),this.rig.update(t,{position:n.position,quaternion:n.quaternion,velocity:n.velocity,size:this.playerSpec.fuselageLength,agl:Math.max(0,n.position.y-_e(n.position.x,n.position.z))})}this.cockpit?.update()}}updateWorld(t){this.sky.sky.position.copy(this.camera.position),this.lodTimer-=1/60,this.lodTimer<=0&&(this.lodTimer=.25,cx(this.camera.position)),this.water.update(t),this.updateTerrainAndFog(),this.clouds.update(1/60),this.rain.update(1/60,this.camera.position),this.player?.spinFans(1/60),this.player?.updateLights(t),this.demo.finished&&this.state==="flying"&&this.demo.reset()}updateTerrainAndFog(){const t=this.camera.position;this.terrain.update(t.x,t.z);const e=this.scene.fog;if(e){const s=Math.max(0,t.y-_e(t.x,t.z));if(this.groundBlob&&this.player){const a=this.groundBlob,o=this.player.group.position,l=Math.max(0,o.y-_e(o.x,o.z));if(l<400){const h=this.sky.sunDir,c=Math.max(h.y,.06),u=Math.min(l/Math.max(Math.tan(c),.16),l*1.6+46),d=Math.hypot(h.x,h.z)||1,p=h.x/d,g=h.z/d,v=o.x-p*u,m=o.z-g*u,f=Math.max(_e(v,m),We.SEA_LEVEL)+.7;a.position.set(v,f,m);const w=1-l/400,M=this.playerSpec.wingspan*.42+l*.1;a.scale.set(M*(1+u/(M*2.4)),M*.86,1);const _=Math.atan2(-g,p);Dh.set(-(_e(v+90,m)-_e(v-90,m))/180,1,-(_e(v,m+90)-_e(v,m-90))/180).normalize(),Ih.setFromUnitVectors(Lh,Dh),a.quaternion.copy(Ih).multiply(Dx.setFromAxisAngle(Lh,_).multiply(Lx));const L=.62+.38/(1+u*.0035),T=.45+.55*Math.min(c/.5,1);a.material.opacity=(.12+.34*w*w)*L*T,a.visible=!0}else a.visible=!1}const r=Math.min(s/4e3,2.2);e.near=this.fogBaseNear*(1+.7*r),e.far=this.fogBaseFar*(1+.55*r)}const n=this.sky.sun;if(n.castShadow){const s=this.player?.group.position??t;n.position.copy(s).addScaledVector(this.sky.sunDir,5200),n.target.position.copy(s),n.target.updateMatrixWorld()}}forceCrash(){!this.physics||this.physics.crashed||(this.physics.crashed=!0,this.player&&(this.player.group.visible=!1),this.ap.engaged&&this.ap.reset())}render(){this.composer&&this.quality.preset.bloom?this.composer.render():this.renderer.render(this.scene,this.camera)}applyDemoState(t){if(!this.player)return;const e=this.player.group;e.position.copy(t.position),e.quaternion.copy(t.quaternion),this.player.setGearPosition(t.gear),this.player.setFlaps(t.flaps),this.player.setSpoilers(t.spoilers)}orbitDrag(t,e){this.rig.mode==="orbit"&&this.rig.addOrbitDelta(t,e)}disposePlayer(){this.player&&(this.scene.remove(this.player.group),this.player=null),this.cockpit=null}}class Ux{config={aircraftId:Bn[0].id,airportId:je[0].id,quality:"high",mode:"free",time:"day",weather:"clear",wind:"calm",fullscreen:!1};els={root:document.getElementById("menu-overlay"),cards:document.getElementById("aircraft-cards"),airports:document.getElementById("airport-chips"),quality:document.getElementById("quality-chips"),modes:document.getElementById("mode-chips"),display:document.getElementById("display-chips"),times:document.getElementById("time-chips"),weathers:document.getElementById("weather-chips"),winds:document.getElementById("wind-chips")};constructor(t){this.buildAircraftCards(),this.buildChips(this.els.airports,je.map(e=>({id:e.id,label:`${e.code} ${e.name}`,sub:e.description})),this.config.airportId,e=>{this.config.airportId=e}),this.buildChips(this.els.modes,[{id:"free",label:"自由飛行",sub:"自分で操縦（滑走路開始）"},{id:"demo",label:"デモ飛行",sub:"自動操縦の観察"}],this.config.mode,e=>{this.config.mode=e}),this.buildChips(this.els.quality,[{id:"ultra",label:"画質: 最高",sub:"Retina3.0×・影4k"},{id:"high",label:"画質: 高",sub:"影・高解像度"},{id:"medium",label:"画質: 中",sub:"バランス"},{id:"low",label:"画質: 低",sub:"軽量"}],this.config.quality,e=>{this.config.quality=e}),this.buildChips(this.els.times,hl.map(e=>({id:e.id,label:`時刻: ${e.label}`,sub:e.sub})),this.config.time,e=>{this.config.time=e}),this.buildChips(this.els.weathers,ul.map(e=>({id:e.id,label:`天候: ${e.label}`,sub:e.sub})),this.config.weather,e=>{this.config.weather=e}),this.buildChips(this.els.winds,dl.map(e=>({id:e.id,label:`風: ${e.label}`,sub:e.sub})),this.config.wind,e=>{this.config.wind=e}),this.buildChips(this.els.display,[{id:"fs",label:"表示: 全画面",sub:"画面いっぱいに拡大"},{id:"win",label:"表示: ウィンドウ",sub:"ブラウザ枠のまま"}],this.config.fullscreen?"fs":"win",e=>{const n=e==="fs";this.config.fullscreen=n,this.onDisplaySelect?.(n)});for(const e of this.els.display.children)e.dataset.fs=e.classList.contains("chip")&&e===this.els.display.children[0]?"1":"0";document.getElementById("btn-start").addEventListener("pointerdown",e=>{e.preventDefault(),t()})}buildAircraftCards(){this.els.cards.innerHTML="";for(const t of Bn){const e=document.createElement("div");e.className="card"+(t.id===this.config.aircraftId?" selected":""),e.innerHTML=`<h3>${t.name}</h3><p>${t.description}</p>`,e.addEventListener("pointerdown",n=>{n.preventDefault(),this.config.aircraftId=t.id;for(const s of this.els.cards.children)s.classList.remove("selected");e.classList.add("selected"),this.onAircraftChange?.(t)}),this.els.cards.appendChild(e)}}buildChips(t,e,n,s){t.innerHTML="";for(const r of e){const a=document.createElement("div");a.className="chip"+(r.id===n?" selected":""),a.innerHTML=`${r.label}<br><small>${r.sub}</small>`,a.addEventListener("pointerdown",o=>{o.preventDefault(),s(r.id);for(const l of t.children)l.classList.remove("selected");a.classList.add("selected")}),t.appendChild(a)}}onAircraftChange=null;onDisplaySelect=null;syncDisplay(){const t=this.config.fullscreen;for(const e of this.els.display.children)e.classList.toggle("selected",e.dataset.fs==="1"&&t||e.dataset.fs!=="1"&&!t)}setDisplay(t){this.config.fullscreen=t,this.syncDisplay()}show(){this.els.root.classList.remove("hidden"),this.syncDisplay()}hide(){this.els.root.classList.add("hidden")}}const ze=.514444,Nx=.45359237,or={mtowLbs:154500,mlwLbs:128e3,vmoKias:340},Uh=[{flap:1,vfe:250,rec:230},{flap:2,vfe:250,rec:220},{flap:5,vfe:250,rec:200},{flap:10,vfe:210,rec:190},{flap:15,vfe:200,rec:180},{flap:25,vfe:190,rec:170},{flap:30,vfe:175,rec:150},{flap:40,vfe:162,rec:140}],Fx=[{load:.15,flap:5,n1:85,v1:125,vr:125,v2:135,trimPct:15,trimUnits:4},{load:.35,flap:5,n1:88,v1:130,vr:130,v2:140,trimPct:18,trimUnits:4.5},{load:.55,flap:15,n1:92,v1:135,vr:135,v2:145,trimPct:20,trimUnits:5},{load:.75,flap:15,n1:96,v1:142,vr:142,v2:152,trimPct:22,trimUnits:5.5},{load:.95,flap:15,n1:98,v1:148,vr:148,v2:158,trimPct:25,trimUnits:6}],Ox=[{lwLbs:1e5,f30:121,f40:118},{lwLbs:11e4,f30:127,f40:124},{lwLbs:115e3,f30:130,f40:126},{lwLbs:12e4,f30:133,f40:129},{lwLbs:128e3,f30:137,f40:134}],Nh=41140,zs={landingPitchMin:2.5,landingPitchMax:3,flareFt:50,idleFt:30,reverseOffKts:60};function Qn(i,t,e){return i+(t-i)*e}function va(i,t,e){return Math.max(t,Math.min(e,i))}function ua(i){const t=or.mtowLbs*Nx;return va((i-Nh)/(t-Nh),.05,1)}function nd(i){const t=Fx,e=va(i,t[0].load,t[t.length-1].load);for(let s=0;s<t.length-1;s++)if(e<=t[s+1].load){const r=(e-t[s].load)/(t[s+1].load-t[s].load);return{flap:Qn(t[s].flap,t[s+1].flap,r)>=10?15:5,n1:Qn(t[s].n1,t[s+1].n1,r),v1:Qn(t[s].v1,t[s+1].v1,r),vr:Qn(t[s].vr,t[s+1].vr,r),v2:Qn(t[s].v2,t[s+1].v2,r),trimPct:Qn(t[s].trimPct,t[s+1].trimPct,r),trimUnits:Qn(t[s].trimUnits,t[s+1].trimUnits,r)}}return{...t[t.length-1]}}function fl(i){const t=or.vmoKias;if(i<=.5)return{limitMs:t*ze,recMs:t*ze,limitKias:t,recKias:t};let e=Uh[0];for(const n of Uh)if(n.flap<=i+.01)e=n;else break;return{limitMs:e.vfe*ze,recMs:e.rec*ze,limitKias:e.vfe,recKias:e.rec}}function id(i){return Math.min(or.vmoKias,fl(i).limitKias)*ze}function Fh(i,t){const e=Ox,n=va(i,e[0].lwLbs,e[e.length-1].lwLbs),s=t===30?"f30":"f40";for(let r=0;r<e.length-1;r++)if(n<=e[r+1].lwLbs){const a=(n-e[r].lwLbs)/(e[r+1].lwLbs-e[r].lwLbs);return Qn(e[r][s],e[r+1][s],a)}return e[e.length-1][s]}function Bx(i,t,e){const n=Math.max(0,e-t),s=i+t/2+n;return va(s,i+5,i+20)}const It={face:"#0d1a2b",bezel:"#20364e",tick:"#9fd6ff",text:"#8fe3ff",digital:"#b9f3c9",needle:"#ffffff",needleHub:"#c9d6e4",red:"#ff5f4d",amber:"#ffc873",green:"#7ee787",sky:"#3f7fd0",ground:"#7a5230",sym:"#ff9d2e"};class zx{canvas;ctx;d=null;w=0;h=0;loadFrac;massKg;constructor(t,e){this.canvas=t,this.ctx=t.getContext("2d"),this.loadFrac=e?.loadFrac??.72,this.massKg=e?.massKg??62e3,this.resize()}setAircraft(t,e){this.loadFrac=t,this.massKg=e,this.d&&this.draw()}resize(){const t=this.canvas.getBoundingClientRect();if(t.width<10||t.height<10)return;const e=Math.min(window.devicePixelRatio||1,2);this.w=t.width,this.h=t.height,this.canvas.width=Math.round(this.w*e),this.canvas.height=Math.round(this.h*e),this.ctx.setTransform(e,0,0,e,0,0),this.d&&this.draw()}update(t){this.d=t,this.draw()}draw(){const t=this.d,e=this.ctx;if(this.w<50||this.h<30||(e.clearRect(0,0,this.w,this.h),!t))return;e.fillStyle="rgba(8, 16, 28, 0.62)",this.roundRect(0,0,this.w,this.h,10),e.fill();const n=6,s=(this.w-n*2)/6,r=this.h/2,a=Math.max(6,Math.min(s*.44,this.h*.42));this.drawSpeed(s*.5+n,r,a,t),this.drawAttitude(s*1.5+n,r,a*1.12,t),this.drawAlt(s*2.5+n,r,a,t),this.drawVsi(s*3.5+n,r,a,t),this.drawHsi(s*4.5+n,r,a,t),this.drawSys(s*5+n+2,n,s-4,this.h-n*2,t),this.drawWarnings(t)}roundRect(t,e,n,s,r){const a=this.ctx;a.beginPath(),a.moveTo(t+r,e),a.arcTo(t+n,e,t+n,e+s,r),a.arcTo(t+n,e+s,t,e+s,r),a.arcTo(t,e+s,t,e,r),a.arcTo(t,e,t+n,e,r),a.closePath()}gaugeFace(t,e,n){const s=this.ctx;s.beginPath(),s.arc(t,e,n+3,0,Math.PI*2),s.fillStyle=It.bezel,s.fill(),s.beginPath(),s.arc(t,e,n,0,Math.PI*2),s.fillStyle=It.face,s.fill(),s.strokeStyle="rgba(120, 175, 225, 0.35)",s.lineWidth=1,s.stroke()}sweepTicks(t,e,n,s,r,a,o,l){const h=this.ctx,c=-225*Math.PI/180,u=45*Math.PI/180,d=p=>c+(p-s)/(r-s)*(u-c);for(let p=s;p<=r+1e-6;p+=o){const g=d(p),v=Math.abs(p%a)<1e-6||Math.abs(p%a-a)<1e-6,m=n*.82,f=v?n*.66:n*.74;h.beginPath(),h.moveTo(t+Math.cos(g)*m,e+Math.sin(g)*m),h.lineTo(t+Math.cos(g)*f,e+Math.sin(g)*f),h.strokeStyle=v?It.tick:"rgba(140, 190, 235, 0.55)",h.lineWidth=v?2:1,h.stroke(),l&&v&&(h.fillStyle=It.tick,h.font=`600 ${Math.round(n*.2)}px -apple-system, sans-serif`,h.textAlign="center",h.textBaseline="middle",h.fillText(l(p),t+Math.cos(g)*n*.52,e+Math.sin(g)*n*.52))}}needle(t,e,n,s,r=.78,a=It.needle){const o=this.ctx,l=(s-90)*Math.PI/180;o.beginPath(),o.moveTo(t,e),o.lineTo(t+Math.cos(l)*n*r,e+Math.sin(l)*n*r),o.strokeStyle=a,o.lineWidth=Math.max(2,n*.06),o.lineCap="round",o.stroke(),o.beginPath(),o.arc(t,e,n*.09,0,Math.PI*2),o.fillStyle=It.needleHub,o.fill()}valToAngle(t,e,n){return-225+(Math.max(e,Math.min(n,t))-e)/(n-e)*270}drawSpeed(t,e,n,s){const r=this.ctx,a=190;this.gaugeFace(t,e,n);const o=fl(s.flapsDeg);this.drawArcBand(t,e,n*.9,0,o.recMs,It.green,0,a),o.recMs<o.limitMs-.5&&this.drawArcBand(t,e,n*.9,o.recMs,o.limitMs,It.amber,0,a),this.drawArcBand(t,e,n*.9,o.limitMs,a,It.red,0,a),this.sweepTicks(t,e,n,0,180,30,10,h=>String(h));{const h=(this.valToAngle(or.vmoKias*ze,0,a)-90)*Math.PI/180;r.beginPath(),r.moveTo(t+Math.cos(h)*n*.78,e+Math.sin(h)*n*.78),r.lineTo(t+Math.cos(h)*n*.96,e+Math.sin(h)*n*.96),r.strokeStyle="rgba(255,255,255,0.85)",r.lineWidth=Math.max(1.5,n*.035),r.stroke()}const l=nd(this.loadFrac);if(s.agl<120&&s.vspeed>-2&&s.ias>5&&this.speedBug(t,e,n,l.v2*ze,0,a,"#e46bff","V2"),s.gearDown&&s.flapsDeg>=25){const h=Math.min(this.massKg/.45359237,or.mlwLbs),c=s.flapsDeg>=40?Fh(h,40):Fh(h,30),u=s.windSpeed/ze*Math.cos((s.heading-s.windDirDeg)*Math.PI/180),d=Bx(c,u,u);this.speedBug(t,e,n,d*ze,0,a,"#5fd7ff","VAPP")}this.needle(t,e,n,this.valToAngle(s.ias,0,a),.8),r.fillStyle=It.digital,r.font=`700 ${Math.round(n*.32)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(s.ias.toFixed(0),t,e+n*.52),r.fillStyle=It.text,r.font=`600 ${Math.round(n*.17)}px -apple-system, sans-serif`,r.fillText("IAS m/s",t,e+n*.78),r.fillStyle=o.limitKias<=175?It.amber:It.text,r.font=`600 ${Math.round(n*.15)}px -apple-system, sans-serif`,r.fillText(`VFE ${Math.round(o.limitKias)}kt`,t,e+n*.95)}speedBug(t,e,n,s,r,a,o,l){const h=this.ctx,c=(this.valToAngle(s,r,a)-90)*Math.PI/180,u=n*1.02,d=t+Math.cos(c)*u,p=e+Math.sin(c)*u;h.save(),h.translate(d,p),h.rotate(c+Math.PI/2),h.fillStyle=o,h.beginPath(),h.moveTo(0,-n*.1),h.lineTo(-n*.07,0),h.lineTo(n*.07,0),h.closePath(),h.fill(),h.restore(),h.fillStyle=o,h.font=`700 ${Math.max(8,Math.round(n*.16))}px -apple-system, sans-serif`,h.textAlign="center",h.textBaseline="middle",h.fillText(l,t+Math.cos(c)*n*.72,e+Math.sin(c)*n*.72)}drawArcBand(t,e,n,s,r,a,o=0,l=180){const h=this.ctx,c=(this.valToAngle(s,o,l)-90)*Math.PI/180,u=(this.valToAngle(r,o,l)-90)*Math.PI/180;h.beginPath(),h.arc(t,e,n,c,u),h.strokeStyle=a,h.lineWidth=Math.max(2,n*.08),h.stroke()}drawAttitude(t,e,n,s){const r=this.ctx;this.gaugeFace(t,e,n),r.save(),r.beginPath(),r.arc(t,e,n*.92,0,Math.PI*2),r.clip();const a=s.pitch/90*n*1.6,o=-s.bank*Math.PI/180;r.translate(t,e+a),r.rotate(o),r.fillStyle=It.sky,r.fillRect(-n*3,-n*3,n*6,n*3),r.fillStyle=It.ground,r.fillRect(-n*3,0,n*6,n*3),r.beginPath(),r.moveTo(-n*3,0),r.lineTo(n*3,0),r.strokeStyle="#e8f4ff",r.lineWidth=2,r.stroke(),r.strokeStyle="rgba(240, 248, 255, 0.85)",r.fillStyle="rgba(240, 248, 255, 0.95)",r.lineWidth=1.5,r.font=`600 ${Math.round(n*.16)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle";for(let h=-20;h<=20;h+=5){if(h===0)continue;const c=-(h/90)*n*1.6,u=h%10===0?n*.34:n*.18;r.beginPath(),r.moveTo(-u,c),r.lineTo(u,c),r.stroke(),h%10===0&&(r.fillText(String(Math.abs(h)),-u-n*.14,c),r.fillText(String(Math.abs(h)),u+n*.14,c))}r.restore(),r.strokeStyle=It.tick,r.lineWidth=2;for(const h of[-60,-45,-30,-20,-10,0,10,20,30,45,60]){const c=(h-90)*Math.PI/180,u=n*.92,d=n*(h%30===0?.72:.8);r.beginPath(),r.moveTo(t+Math.cos(c)*u,e+Math.sin(c)*u),r.lineTo(t+Math.cos(c)*d,e+Math.sin(c)*d),r.stroke()}const l=(s.bank-90)*Math.PI/180;r.beginPath(),r.moveTo(t+Math.cos(l)*n*.66,e+Math.sin(l)*n*.66),r.lineTo(t+Math.cos(l+.12)*n*.56,e+Math.sin(l+.12)*n*.56),r.lineTo(t+Math.cos(l-.12)*n*.56,e+Math.sin(l-.12)*n*.56),r.closePath(),r.fillStyle=It.amber,r.fill(),r.strokeStyle=It.sym,r.lineWidth=Math.max(2.5,n*.08),r.lineCap="round",r.beginPath(),r.moveTo(t-n*.5,e),r.lineTo(t-n*.18,e),r.moveTo(t+n*.18,e),r.lineTo(t+n*.5,e),r.stroke(),r.beginPath(),r.arc(t,e,n*.07,0,Math.PI*2),r.fillStyle=It.sym,r.fill(),r.fillStyle=It.digital,r.font=`700 ${Math.round(n*.2)}px -apple-system, sans-serif`,r.textAlign="center",r.fillText(`P${s.pitch.toFixed(0)} B${s.bank.toFixed(0)}`,t,e+n*.72)}drawAlt(t,e,n,s){const r=this.ctx;this.gaugeFace(t,e,n),this.sweepTicks(t,e,n,0,2e3,500,100,a=>a===2e3?"2k":String(a/100)+"h"),this.needle(t,e,n,this.valToAngle(s.alt%2e3,0,2e3),.8),r.fillStyle=It.digital,r.font=`700 ${Math.round(n*.3)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(String(Math.round(s.alt)),t,e+n*.5),r.fillStyle=It.text,r.font=`600 ${Math.round(n*.17)}px -apple-system, sans-serif`,r.fillText(`ALT m · AGL ${Math.round(s.agl)}`,t,e+n*.76)}drawVsi(t,e,n,s){const r=this.ctx;this.gaugeFace(t,e,n),this.sweepTicks(t,e,n,-20,20,5,1,a=>String(a)),this.needle(t,e,n,this.valToAngle(s.vspeed,-20,20),.8),r.fillStyle=It.digital,r.font=`700 ${Math.round(n*.28)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText((s.vspeed>=0?"+":"")+s.vspeed.toFixed(1),t,e+n*.52),r.fillStyle=It.text,r.font=`600 ${Math.round(n*.17)}px -apple-system, sans-serif`,r.fillText("V/S m/s",t,e+n*.78)}drawHsi(t,e,n,s){const r=this.ctx;this.gaugeFace(t,e,n),r.save(),r.beginPath(),r.arc(t,e,n*.92,0,Math.PI*2),r.clip();const a=-s.heading*Math.PI/180;r.translate(t,e),r.rotate(a),r.font=`700 ${Math.round(n*.2)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle";for(let o=0;o<360;o+=30){const l=(o-90)*Math.PI/180,h=n*.86,c=n*(o%90===0?.68:.76);r.beginPath(),r.moveTo(Math.cos(l)*h,Math.sin(l)*h),r.lineTo(Math.cos(l)*c,Math.sin(l)*c),r.strokeStyle=o%90===0?It.tick:"rgba(140,190,235,0.6)",r.lineWidth=o%90===0?2:1,r.stroke();const u=o===0?"N":o===90?"E":o===180?"S":o===270?"W":String(o/10);r.fillStyle=o%90===0?"#e8f4ff":It.tick,r.fillText(u,Math.cos(l)*n*.52,Math.sin(l)*n*.52)}if(s.rwyHeading!==null){const o=(s.rwyHeading-90)*Math.PI/180;r.strokeStyle=It.green,r.lineWidth=3,r.beginPath(),r.moveTo(Math.cos(o)*n*.95,Math.sin(o)*n*.95),r.lineTo(Math.cos(o)*n*.62,Math.sin(o)*n*.62),r.stroke()}r.restore(),r.strokeStyle=It.sym,r.lineWidth=2.5,r.beginPath(),r.moveTo(t,e-n*.95),r.lineTo(t,e-n*.62),r.stroke(),r.beginPath(),r.moveTo(t-n*.12,e-n*.78),r.lineTo(t+n*.12,e-n*.78),r.stroke(),r.fillStyle=It.digital,r.font=`700 ${Math.round(n*.3)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(String(Math.round(s.heading)%360).padStart(3,"0")+"°",t,e+n*.45),r.fillStyle=It.text,r.font=`600 ${Math.round(n*.17)}px -apple-system, sans-serif`,r.fillText("HDG",t,e+n*.72)}drawSys(t,e,n,s,r){const a=this.ctx,o=s/9,l=Math.max(8,Math.round(o*.52));a.textAlign="left",a.textBaseline="middle";const h=(p,g,v,m=It.digital)=>{const f=e+o*(p+.5);a.fillStyle=It.text,a.font=`600 ${l*.85}px -apple-system, sans-serif`,a.fillText(g,t+2,f),a.fillStyle=m,a.font=`700 ${l}px -apple-system, sans-serif`,a.fillText(v,t+n*.36,f)},c=e+o*.5;a.fillStyle=It.text,a.font=`600 ${l*.85}px -apple-system, sans-serif`,a.fillText("THR",t+2,c),a.fillStyle="rgba(120,175,225,0.25)",a.fillRect(t+n*.3,c-l*.5,n*.42,l),a.fillStyle=r.throttle>.95?It.amber:It.green,a.fillRect(t+n*.3,c-l*.5,n*.42*Math.min(1,r.throttle),l),a.fillStyle=It.digital,a.font=`700 ${l}px -apple-system, sans-serif`,a.fillText(`${Math.round(r.throttle*100)}%`,t+n*.75,c);const u=e+o*1.5;a.fillStyle=It.text,a.font=`600 ${l*.85}px -apple-system, sans-serif`,a.fillText("FUEL",t+2,u),a.fillStyle="rgba(120,175,225,0.25)",a.fillRect(t+n*.3,u-l*.5,n*.42,l),a.fillStyle=r.fuelFrac<.15?It.red:It.green,a.fillRect(t+n*.3,u-l*.5,n*.42*r.fuelFrac,l),a.fillStyle=It.digital,a.fillText(`${Math.round(r.fuelFrac*100)}%`,t+n*.75,u),h(2,"FLAP",`${r.flapsDeg}°`),h(3,"GEAR",r.gearDown?"DOWN":"UP",r.gearDown?It.green:It.digital),h(4,"SPD BRK",r.spoilers>0?"ON":"OFF",r.spoilers>0?It.amber:It.digital);const d=r.agl<3&&r.groundSpeed>.5;if(h(5,"GS",`${r.groundSpeed.toFixed(0)} m/s`,d?r.groundSpeed>10.29?It.amber:It.green:It.digital),h(6,"WIND",`${Math.round(r.windDirDeg).toString().padStart(3,"0")}°/${r.windSpeed.toFixed(0)} m/s`),r.rwyName!==null&&r.rwyDist!==null){const p=r.rwyRemaining!==null&&r.rwyRemaining>=0?`${r.rwyName} 残${Math.round(r.rwyRemaining)}m`:`${r.rwyName} ${r.rwyDist>=1e3?(r.rwyDist/1e3).toFixed(1)+"km":Math.round(r.rwyDist)+"m"}`;h(7,"RWY",p,It.amber)}else h(7,"RWY","—");h(8,"FPS",`${Math.round(r.fps)} / ${r.phase}`,r.crashed?It.red:It.text)}drawWarnings(t){const e=this.ctx,n=Math.floor(performance.now()/500)%2===0,s=[],r=id(t.flapsDeg),a=fl(t.flapsDeg);if(t.crashed&&s.push({text:"CRASHED — 再スタート",color:It.red}),t.ias>r&&s.push({text:"OVERSPEED",color:It.red}),t.agl>15&&t.agl<300&&!t.gearDown&&t.vspeed<-1&&s.push({text:"GEAR",color:It.amber}),t.aoa>15&&t.agl>10&&s.push({text:"STALL",color:It.red}),t.fuelFrac<=0&&s.push({text:"FUEL EMPTY",color:It.red}),t.flapsDeg>.5&&t.ias>a.recMs&&s.push({text:"FLAP SPD",color:It.amber}),s.length===0)return;const o=s.filter((c,u)=>n||u===0||t.crashed);let l=this.w*.28;const h=2;e.font=`800 ${Math.round(this.h*.13)}px -apple-system, sans-serif`,e.textAlign="left",e.textBaseline="top";for(const c of o){const u=e.measureText(c.text).width+14;e.fillStyle=c.color,this.roundRect(l,h,u,this.h*.16,6),e.fill(),e.fillStyle="#0b1220",e.fillText(c.text,l+7,h+this.h*.02),l+=u+6}}}function Oh(i){try{const t=window.speechSynthesis;if(!t)return;const e=new SpeechSynthesisUtterance(i);e.lang="en-US",e.rate=1.05,t.speak(e)}catch{}}class kx{constructor(t){this.loadFrac=t}call80=!1;callV1=!1;callRotate=!1;callPosRate=!1;ldg1000=!1;ldg500=!1;ldg50=!1;ldg30=!1;call60=!1;wasAirborne=!1;flapCautionAt=0;setLoadFrac(t){this.loadFrac=t,this.reset()}reset(){this.call80=!1,this.callV1=!1,this.callRotate=!1,this.callPosRate=!1,this.ldg1000=!1,this.ldg500=!1,this.ldg50=!1,this.ldg30=!1,this.call60=!1,this.wasAirborne=!1,this.flapCautionAt=0}speeds(){const t=nd(this.loadFrac);return{v1:t.v1*ze,vr:t.vr*ze,v2:t.v2*ze}}update(t){const e=[],{v1:n,vr:s}=this.speeds();return t.onGround&&(!this.call80&&t.ias>=80*ze&&(this.call80=!0,e.push({text:"80 KNOTS",speech:"Eighty knots",kind:"info"})),!this.callV1&&t.ias>=n&&(this.callV1=!0,e.push({text:"V1",speech:"V one",kind:"info"})),!this.callRotate&&t.ias>=s&&(this.callRotate=!0,e.push({text:"ROTATE — 15° へ 2°/s",speech:"Rotate",kind:"info"}))),!t.onGround&&!this.callPosRate&&t.vspeed>1.2&&this.wasAirborne===!1&&(this.callPosRate=!0,e.push({text:"POSITIVE RATE — GEAR UP",speech:"Positive rate. Gear up.",kind:"info"})),!t.onGround&&t.vspeed<-.5&&(t.agl>400&&(this.ldg1000=this.ldg500=this.ldg50=this.ldg30=!1),!this.ldg1000&&t.agl<=305&&(this.ldg1000=!0,e.push({text:"1000ft — STABILIZED",speech:"One thousand",kind:"info"})),!this.ldg500&&t.agl<=152&&(this.ldg500=!0,e.push({text:"500ft",speech:"Five hundred",kind:"info"})),!this.ldg50&&t.agl<=zs.flareFt*.3048&&(this.ldg50=!0,e.push({text:`50 FT — フレア ${zs.landingPitchMin}-${zs.landingPitchMax}°`,speech:"Fifty",kind:"info"})),!this.ldg30&&t.agl<=zs.idleFt*.3048&&(this.ldg30=!0,e.push({text:"30 FT — スロットル IDLE",speech:"Thirty",kind:"info"}))),t.onGround&&this.wasAirborne&&(!this.call60&&t.ias<=zs.reverseOffKts*ze&&(this.call60=!0,e.push({text:"60 KNOTS — リバース解除",speech:"Sixty knots",kind:"info"})),t.ias<5&&(this.call80=this.callV1=this.callRotate=this.callPosRate=!1,this.call60=!1)),t.onGround&&t.ias<5&&!this.wasAirborne&&(this.call80=this.callV1=this.callRotate=this.callPosRate=!1),this.wasAirborne=!t.onGround,e}flapCaution(t,e){if(t.flapsDeg<=.5)return null;const n=[1,2,5,10,15,25,30,40],s=[230,220,200,190,180,170,150,140];let r=s[0];for(let a=0;a<n.length;a++)n[a]<=t.flapsDeg+.01&&(r=s[a]);return t.ias<=r*ze||e-this.flapCautionAt<5e3?null:(this.flapCautionAt=e,{text:`FLAP SPEED — ${r}kt 以下で展開（マニュアル 1.2）`,speech:null,kind:"warn"})}}class Hx{el;timer=0;constructor(){this.el=document.getElementById("sop-banner")}show(t,e=3500){this.el&&(this.el.textContent=t.text,this.el.classList.toggle("warn",t.kind==="warn"),this.el.classList.add("show"),window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this.el?.classList.remove("show")},e))}}class Gx{ctx=null;master=null;engineOsc=[];engineGain=null;engineFilter=null;windGain=null;windFilter=null;warnOsc=null;warnGain=null;noiseBuffer=null;muted=!1;ready=!1;ensure(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext??window.webkitAudioContext;if(!t)return;const e=new t;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.muted?0:.85,this.master.connect(e.destination);const n=e.sampleRate*2,s=e.createBuffer(1,n,e.sampleRate),r=s.getChannelData(0);for(let a=0;a<n;a++)r[a]=Math.random()*2-1;this.noiseBuffer=s,this.buildEngine(),this.buildWind(),this.buildWarn(),this.ready=!0,e.state==="suspended"&&e.resume()}setMuted(t){this.muted=t,this.master&&this.ctx&&this.master.gain.setTargetAtTime(t?0:.85,this.ctx.currentTime,.02)}buildEngine(){const t=this.ctx,e=t.createGain();e.gain.value=0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=300,n.connect(e),e.connect(this.master);const s=[48,96,71],r=["sawtooth","sawtooth","square"];for(let h=0;h<s.length;h++){const c=t.createOscillator();c.type=r[h],c.frequency.value=s[h];const u=t.createGain();u.gain.value=h===2?.12:.4,c.connect(u),u.connect(n),c.start(),this.engineOsc.push(c)}const a=t.createBufferSource();a.buffer=this.noiseBuffer,a.loop=!0;const o=t.createBiquadFilter();o.type="lowpass",o.frequency.value=220;const l=t.createGain();l.gain.value=.35,a.connect(o),o.connect(l),l.connect(n),a.start(),this.engineGain=e,this.engineFilter=n}buildWind(){const t=this.ctx,e=t.createBufferSource();e.buffer=this.noiseBuffer,e.loop=!0;const n=t.createBiquadFilter();n.type="bandpass",n.frequency.value=700,n.Q.value=.7;const s=t.createGain();s.gain.value=0,e.connect(n),n.connect(s),s.connect(this.master),e.start(),this.windGain=s,this.windFilter=n}buildWarn(){const t=this.ctx,e=t.createOscillator();e.type="square",e.frequency.value=750;const n=t.createGain();n.gain.value=0,e.connect(n),n.connect(this.master),e.start(),this.warnOsc=e,this.warnGain=n}setEngine(t,e){if(!this.ctx||!this.engineGain||!this.engineFilter)return;const n=this.ctx.currentTime,s=.25+.75*t+Math.min(e/400,.15);this.engineGain.gain.setTargetAtTime(.1+.3*t,n,.15),this.engineFilter.frequency.setTargetAtTime(240+900*s,n,.2),this.engineOsc[0]?.frequency.setTargetAtTime(48*(.7+.9*s),n,.2),this.engineOsc[1]?.frequency.setTargetAtTime(96*(.7+.9*s),n,.2),this.engineOsc[2]?.frequency.setTargetAtTime(71*(.75+.85*s),n,.2)}setWind(t){if(!this.ctx||!this.windGain||!this.windFilter)return;const e=this.ctx.currentTime;this.windGain.gain.setTargetAtTime(Math.min(.32,t/250*.38),e,.25),this.windFilter.frequency.setTargetAtTime(500+t*4,e,.25)}setWarning(t){if(!this.ctx||!this.warnOsc||!this.warnGain)return;const e=this.ctx.currentTime;if(t==="none"){this.warnGain.gain.setTargetAtTime(0,e,.05);return}t==="stall"?(this.warnOsc.frequency.setTargetAtTime(750,e,.02),this.warnGain.gain.setTargetAtTime(.16,e,.02)):t==="overspeed"?(this.warnOsc.frequency.setTargetAtTime(1100,e,.02),this.warnGain.gain.setTargetAtTime(.12,e,.02)):(this.warnOsc.frequency.setTargetAtTime(420,e,.02),this.warnGain.gain.setTargetAtTime(.14,e,.02))}burst(t,e,n,s="bandpass"){if(!this.ctx||!this.noiseBuffer||!this.master)return;const r=this.ctx,a=r.createBufferSource();a.buffer=this.noiseBuffer;const o=r.createBiquadFilter();o.type=s,o.frequency.value=t,o.Q.value=1.2;const l=r.createGain(),h=r.currentTime;l.gain.setValueAtTime(n,h),l.gain.exponentialRampToValueAtTime(.001,h+e),a.connect(o),o.connect(l),l.connect(this.master),a.start(h),a.stop(h+e+.05)}tone(t,e,n,s="sine"){if(!this.ctx||!this.master)return;const r=this.ctx,a=r.createOscillator();a.type=s,a.frequency.value=t;const o=r.createGain(),l=r.currentTime;o.gain.setValueAtTime(n,l),o.gain.exponentialRampToValueAtTime(.001,l+e),a.connect(o),o.connect(this.master),a.start(l),a.stop(l+e+.05)}click(){this.burst(1600,.05,.18)}flap(){this.burst(500,.28,.22,"lowpass")}gear(){this.burst(300,.55,.26,"lowpass"),this.tone(180,.5,.05,"triangle")}touchdown(){this.burst(220,.35,.4,"lowpass"),this.tone(140,.25,.12,"triangle"),this.burst(1800,.18,.2)}boom(){if(!this.ctx||!this.master||!this.noiseBuffer)return;const t=this.ctx,e=t.currentTime+.01,n=t.createBufferSource();n.buffer=this.noiseBuffer;const s=t.createBiquadFilter();s.type="lowpass",s.Q.value=.9,s.frequency.setValueAtTime(1400,e),s.frequency.exponentialRampToValueAtTime(55,e+.9);const r=t.createGain();r.gain.setValueAtTime(.95,e),r.gain.exponentialRampToValueAtTime(.001,e+1.5),n.connect(s),s.connect(r),r.connect(this.master),n.start(e),n.stop(e+1.6),this.tone(46,.9,.5,"triangle"),this.tone(72,.55,.3,"sawtooth");for(let a=0;a<5;a++)window.setTimeout(()=>this.burst(1400+Math.random()*1600,.1,.12),260+a*90)}confirm(){this.tone(660,.12,.12),this.tone(880,.18,.1)}suspendAll(){this.setEngine(0,0),this.setWind(0),this.setWarning("none"),this.engineGain&&this.ctx&&this.engineGain.gain.setTargetAtTime(0,this.ctx.currentTime,.08),this.windGain&&this.ctx&&this.windGain.gain.setTargetAtTime(0,this.ctx.currentTime,.08)}}function Vx(){const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,2,32,32,31);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.55,"rgba(255,255,255,0.55)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new bi(i);return n.needsUpdate=!0,n}const Wx=`
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vAlpha = aAlpha;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(aSize * (300.0 / max(1.0, -mv.z)), 1.0, 120.0);
  gl_Position = projectionMatrix * mv;
}`,Xx=`
uniform sampler2D uTex;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec4 t = texture2D(uTex, gl_PointCoord);
  gl_FragColor = vec4(vColor, t.a * vAlpha);
  if (gl_FragColor.a < 0.004) discard;
}`;class Bh{cap;list=[];geo;pts;posA;sizeA;alphaA;colorA;constructor(t,e,n,s){this.cap=e,this.posA=new Float32Array(e*3),this.sizeA=new Float32Array(e),this.alphaA=new Float32Array(e),this.colorA=new Float32Array(e*3),this.geo=new ge,this.geo.setAttribute("position",new xe(this.posA,3)),this.geo.setAttribute("aSize",new xe(this.sizeA,1)),this.geo.setAttribute("aAlpha",new xe(this.alphaA,1)),this.geo.setAttribute("aColor",new xe(this.colorA,3)),this.geo.setDrawRange(0,0);const r=new Re({uniforms:{uTex:{value:n}},vertexShader:Wx,fragmentShader:Xx,transparent:!0,depthWrite:!1,blending:s});this.pts=new zl(this.geo,r),this.pts.frustumCulled=!1,this.pts.renderOrder=6,t.add(this.pts)}add(t){this.list.length>=this.cap&&this.list.shift(),this.list.push(t)}update(t,e){let n=0;for(let s=0;s<this.list.length;s++){const r=this.list[s];if(r.life-=t,r.life<=0)continue;r.vy+=(r.buoy-r.grav)*t,r.x+=r.vx*t,r.y+=r.vy*t,r.z+=r.vz*t;const a=r.life/r.maxLife;this.posA[n*3]=r.x,this.posA[n*3+1]=r.y,this.posA[n*3+2]=r.z,this.sizeA[n]=r.size0+(r.size1-r.size0)*(1-a)+r.grow*(1-a);let o=Math.min(1,a*2.6)*Math.min(1,(1-a)*9+.15);e&&(o*=e(r),o<.004)||(this.alphaA[n]=o,this.colorA[n*3]=r.r,this.colorA[n*3+1]=r.g,this.colorA[n*3+2]=r.b,this.list[n]=r,n++)}this.list.length=n,this.geo.setDrawRange(0,n),this.geo.getAttribute("position").needsUpdate=!0,this.geo.getAttribute("aSize").needsUpdate=!0,this.geo.getAttribute("aAlpha").needsUpdate=!0,this.geo.getAttribute("aColor").needsUpdate=!0}get live(){return this.list.length}dispose(t){t.remove(this.pts),this.geo.dispose(),this.pts.material.dispose()}}class qx{fire;smoke;flash;embers=[];scene;time=0;camera=null;constructor(t){this.scene=t;const e=Vx();this.fire=new Bh(t,320,e,Qs),this.smoke=new Bh(t,240,e,wi),this.flash=new Zv(16757066,0,1600,1.6),this.flash.visible=!1,t.add(this.flash)}boom(t,e,n,s=1){const r=Math.random,a=Math.round(52*s),o=Math.round(24*s),l=Math.round(26*s);for(let h=0;h<a;h++){const c=r()*Math.PI*2,u=(r()*.9+.15)*Math.PI*.5,d=(7+r()*19)*s,p=r()<.55;this.fire.add({x:t,y:e+2,z:n,vx:Math.cos(c)*Math.cos(u)*d,vy:Math.sin(u)*d*.85,vz:Math.sin(c)*Math.cos(u)*d,life:.32+r()*.55,maxLife:.8,size0:26+r()*46,size1:6,grow:10*s,buoy:2.2,grav:0,r:1,g:p?.52+r()*.3:.18+r()*.12,b:p?.08:.02})}for(let h=0;h<o;h++){const c=r()*Math.PI*2,u=(2.5+r()*7)*s,d=.16+r()*.2;this.smoke.add({x:t+Math.cos(c)*4,y:e+5+r()*8,z:n+Math.sin(c)*4,vx:Math.cos(c)*u,vy:2.5+r()*4.5,vz:Math.sin(c)*u,life:2.2+r()*2.6,maxLife:4.8,size0:26+r()*44,size1:66+r()*60,grow:0,buoy:1.1,grav:0,r:d*.9,g:d,b:d*.95})}for(let h=0;h<l;h++){const c=r()*Math.PI*2,u=(24+r()*52)*s;this.fire.add({x:t,y:e+2,z:n,vx:Math.cos(c)*u,vy:10+r()*26,vz:Math.sin(c)*u,life:.5+r()*.75,maxLife:1.2,size0:5+r()*7,size1:2,grow:0,buoy:0,grav:34,r:1,g:.85+r()*.15,b:.45+r()*.4})}this.embers.push({x:t,y:e,z:n,t:this.time+.45,power:s}),this.flash.position.set(t,e+14,n),this.flash.intensity=1500*s,this.flash.visible=!0}get live(){return this.fire.live+this.smoke.live+this.embers.length}update(t){this.time+=t;for(let n=this.embers.length-1;n>=0;n--){const s=this.embers[n];if(this.time>=s.t){const r=Math.random;for(let a=0;a<5;a++){const o=r()*Math.PI*2,l=.14+r()*.16;this.smoke.add({x:s.x+Math.cos(o)*6,y:s.y+2+r()*5,z:s.z+Math.sin(o)*6,vx:Math.cos(o)*1.6,vy:5+r()*4,vz:Math.sin(o)*1.6,life:2.8+r()*2.6,maxLife:5,size0:30+r()*40,size1:120+r()*80,grow:0,buoy:1.2,grav:0,r:l*.85,g:l*.92,b:l})}s.t=this.time+.5,s.power*=.72,s.power<.28&&this.embers.splice(n,1)}}this.flash.intensity*=Math.exp(-9*t),this.flash.intensity<2&&(this.flash.visible=!1),this.fire.update(t);const e=this.camera;if(e){const n=e.position;this.smoke.update(t,s=>{const r=Math.hypot(s.x-n.x,s.y-n.y,s.z-n.z);return r<60?0:r<220?(r-60)/160:1})}else this.smoke.update(t)}clear(){this.embers.length=0}dispose(){this.fire.dispose(this.scene),this.smoke.dispose(this.scene),this.scene.remove(this.flash)}}class Yx{els={pause:document.getElementById("pause-overlay"),portrait:document.getElementById("portrait-overlay"),webgl:document.getElementById("webgl-error"),webglDetail:document.getElementById("webgl-error-detail")};actions={};constructor(){const t=(e,n)=>{document.getElementById(e).addEventListener("pointerdown",s=>{s.preventDefault(),this.actions[n]?.()})};t("btn-resume","resume"),t("btn-restart","restart"),t("btn-to-menu","toMenu")}on(t,e){this.actions[t]=e}showPause(){this.els.pause.classList.remove("hidden")}hidePause(){this.els.pause.classList.add("hidden")}updateOrientation(){const t=window.innerHeight>window.innerWidth;return this.els.portrait.classList.toggle("hidden",!t),!t}showWebglError(t){this.els.webglDetail.innerHTML=t,this.els.webgl.classList.remove("hidden")}}const fo=[0,1,5,10,15,25,30,40];class $x{pitch=0;roll=0;yaw=0;throttle=.9;brakes=!1;spoilers=0;gearDown=!0;flapIndex=2;keys=new Set;keyHandler=t=>this.onKey(t,!0);keyUpHandler=t=>this.onKey(t,!1);attachKeyboard(){window.addEventListener("keydown",this.keyHandler),window.addEventListener("keyup",this.keyUpHandler)}detach(){window.removeEventListener("keydown",this.keyHandler),window.removeEventListener("keyup",this.keyUpHandler)}onKey(t,e){const n=t.key.toLowerCase();e?(this.keys.add(n),n==="g"&&(this.gearDown=!this.gearDown),n==="v"&&this.flapUp(),n==="f"&&this.flapDown(),n==="x"&&(this.spoilers=this.spoilers>0?0:1)):this.keys.delete(n)}flapUp(){this.flapIndex=Math.max(0,this.flapIndex-1)}flapDown(){this.flapIndex=Math.min(fo.length-1,this.flapIndex+1)}get flapsDeg(){return fo[this.flapIndex]}setFlapIndex(t){this.flapIndex=Math.max(0,Math.min(fo.length-1,t))}updateFromKeys(t){const e=this.keys.has("arrowup")||this.keys.has("w"),n=this.keys.has("arrowdown")||this.keys.has("s"),s=this.keys.has("arrowleft")||this.keys.has("a"),r=this.keys.has("arrowright")||this.keys.has("d"),a=this.keys.has("q"),o=this.keys.has("e"),l=this.keys.has("b")||this.keys.has(" "),h=this.keys.has("shift"),c=this.keys.has("control");(e||n||s||r)&&(this.pitch=(e?1:0)-(n?1:0),this.roll=(r?1:0)-(s?1:0)),this.yaw=(o?1:0)-(a?1:0),this.brakes=l,h&&(this.throttle=Math.min(1,this.throttle+t*.55)),c&&(this.throttle=Math.max(0,this.throttle-t*.55))}normalized(){return{pitch:po(this.pitch),roll:po(this.roll),yaw:po(this.yaw),throttle:Math.max(0,Math.min(1,this.throttle)),brakes:this.brakes,flapsDeg:this.flapsDeg,spoilers:this.spoilers,gearDown:this.gearDown}}releaseStick(){this.pitch=0,this.roll=0}}function po(i){return Math.max(-1,Math.min(1,i))}const bs=document.getElementById("game-canvas"),Xe=new Yx,sd=jv(bs,2);if(!sd)throw Xe.showWebglError("WebGL コンテキストを取得できませんでした。<br>Safari の設定を確認するか、iOS を最新版に更新してください。"),new Error("WebGL not available");const gs=sd;bs.addEventListener("webglcontextlost",i=>{i.preventDefault(),Xe.showWebglError("WebGL コンテキストが失われました。ページを再読み込みしてください。")});const Yl=new Ol,ei=new Ze(60,window.innerWidth/window.innerHeight,2.5,46e3);await X_();await C_();const dt=new Ix(gs,Yl,ei),_a=new qx(Yl);_a.camera=ei;const ne=new $x;ne.attachKeyboard();const pl=Bn.find(i=>i.id==="b737")??Bn[0],ur=new zx(document.getElementById("inst-panel"),{loadFrac:ua(pl.mass),massKg:pl.mass}),Ei=new kx(ua(pl.mass)),ts=new Hx,Zt=new Gx;window.__airliner={game:dt,scene:Yl,camera:ei,controls:ne,audio:Zt,callouts:Ei,renderer:gs,terrainHeight:_e,explosion:_a,buildingColliders:ss};const vs=document.getElementById("hud");vs.style.display="none";let rd="high",ks=0,Hs=0;const ad=document.getElementById("touch-ui"),mo=document.getElementById("flight-note");let go=null;function Kx(){mo&&(mo.classList.remove("fade"),go!==null&&clearTimeout(go),go=window.setTimeout(()=>mo.classList.add("fade"),9e3))}const Pe=new Ux(()=>{Zt.ensure(),Zt.confirm(),dt.setQuality(Pe.config.quality),rd=Pe.config.quality,ll(gs,dt.quality.preset.pixelRatio),dt.syncPostFx(),dt.applyEnvironment(Pe.config.time,Pe.config.weather,Pe.config.wind),Pe.hide(),vs.style.display="block",ad.style.display="block",ur.resize(),Ei.reset(),dd()&&!In()&&Zl(),dt.startFlight(Pe.config.aircraftId,Pe.config.mode,Pe.config.airportId),Kl(dt.cameraName()),Kx()});Pe.onAircraftChange=i=>{dt.selectAircraft(i),ur.setAircraft(ua(i.mass),i.mass),Ei.setLoadFrac(ua(i.mass))};function Zx(){dt.state==="flying"?(dt.pause(),Zt.suspendAll(),Xe.showPause()):dt.state==="paused"&&(dt.resume(),Xe.hidePause())}function ue(i,t){const e=document.getElementById(i);e.addEventListener("pointerdown",n=>{n.preventDefault(),e.classList.add("active"),Zt.ensure(),Zt.click(),t()}),e.addEventListener("pointerup",()=>e.classList.remove("active")),e.addEventListener("pointercancel",()=>e.classList.remove("active"))}function $l(i,t,e){const n=document.getElementById(i);n.addEventListener("pointerdown",r=>{r.preventDefault(),n.classList.add("active"),t()});const s=()=>{n.classList.remove("active"),e()};n.addEventListener("pointerup",s),n.addEventListener("pointercancel",s)}const Qx=document.getElementById("cam-name");function Kl(i){Qx.textContent=i}ue("btn-camera",()=>Kl(dt.cycleCamera(1)));ue("btn-view-prev",()=>Kl(dt.cycleCamera(-1)));ue("btn-replay",()=>{dt.restartDemo(),Ei.reset(),Xe.hidePause()});ue("btn-pause",Zx);const zh=document.getElementById("btn-ap"),Jx=document.getElementById("btn-ap-set"),ml=document.getElementById("ap-panel"),kh=document.getElementById("ap-strip");let gl="";const jx={"ap-on":{text:"オートパイロット 接続",speech:"autopilot engaged",kind:"info"},"ap-off":{text:"オートパイロット 切断",speech:"autopilot disconnect",kind:"info"},"ap-touchdown":{text:"接地 — AP 自動切断",speech:null,kind:"info"},"loc-alive":{text:"LOC 捕捉 — 滑走路延長線",speech:"localizer alive",kind:"info"},"loc-lost":{text:"LOC ロスト — 選定方位へ復帰",speech:"localizer lost",kind:"warn"},"gs-alive":{text:"GS 捕捉 — 3.00° 降下経路",speech:"glide slope alive",kind:"info"},"gs-off":{text:"GS 脱離 — ALT ホールド復帰",speech:null,kind:"info"},"appr-arm":{text:"APPR アライン — 捕捉待ち",speech:"approach armed",kind:"info"},missed:{text:"場周超過 — LOC/GS 解除",speech:"missed approach, heading mode",kind:"warn"},"min-alt":{text:"最低高度割込 — 目標高度引き上げ",speech:"minimums, altitude hold",kind:"warn"},retard:{text:"RETARD — スラストアイドル",speech:"retard",kind:"info"},"ap-trip":{text:"AP 保護遮断",speech:"autopilot disconnect",kind:"warn"}},tM=document.getElementById("ap-strip-txt"),od=document.getElementById("ap-ch-hdg"),ld=document.getElementById("ap-ch-nav"),cd=document.getElementById("ap-ch-vs"),hd=document.getElementById("ap-ch-alt");let vo=!1,Hh=!1,Ws=0;function eM(i){const t=dt.getTelemetry();t&&(_a.boom(t.position.x,Math.max(t.alt-Math.max(t.agl,0)+2,t.alt),t.position.z,i),Zt.boom(),Ws=Math.min(1.4,.7+i*.55))}function xa(i,t){i.addEventListener("pointerdown",e=>{e.preventDefault(),i.classList.add("on"),setTimeout(()=>i.classList.remove("on"),160),Zt.ensure(),Zt.click(),t(),Le()})}function Ma(i){const t=dt.ap;dt.flightMode==="free"&&!t.engaged&&dt.toggleAp(),i==="hdg"&&t.setLat("HDG"),i==="nav"&&t.setLat("NAV"),i==="vs"&&t.nudgeVs(0),i==="alt"&&t.holdAlt()}xa(od,()=>Ma("hdg"));xa(ld,()=>Ma("nav"));xa(cd,()=>Ma("vs"));xa(hd,()=>Ma("alt"));function qr(i,t){const e=document.getElementById(i);e&&(e.textContent=t)}function Le(){const i=dt.getApStatus();qr("ap-v-spd",`${i.spdKt} kt`),qr("ap-v-hdg",`${String(i.hdgDeg).padStart(3,"0")}°`),qr("ap-v-alt",`${i.altM} m`),qr("ap-v-vs",`${i.vsFpm} fpm`);const t=document.getElementById("ap-lat");t&&(t.textContent=i.loc?`${i.lat}·LOC`:i.lat,t.classList.toggle("on",i.lat==="NAV"));const e=document.getElementById("ap-vrt-alt");e&&e.classList.toggle("on",i.ver!=="APPR");const n=document.getElementById("ap-vrt-appr");n&&(n.textContent=i.gs?"APPR·GS":i.ver==="APPR"?"APPR":`APPR${i.loc&&i.dist>0?` ${Math.round(i.dist/1e3)}k`:""}`,n.classList.toggle("on",i.ver==="APPR")),Jx.classList.toggle("on",dt.ap.engaged)}ue("btn-ap",()=>{if(dt.flightMode!=="free"){ts.show({text:"AP は自由飛行モードでのみ使用可能",speech:null,kind:"warn"});return}dt.toggleAp(),Le()});ue("btn-ap-set",()=>{ml.style.display=ml.style.display==="block"?"none":"block",gl="",Le()});ue("ap-spd-dn",()=>{dt.ap.nudgeSpd(-5),Le()});ue("ap-spd-up",()=>{dt.ap.nudgeSpd(5),Le()});ue("ap-hdg-l",()=>{dt.ap.nudgeHdg(-5),Le()});ue("ap-hdg-r",()=>{dt.ap.nudgeHdg(5),Le()});ue("ap-alt-dn",()=>{dt.ap.nudgeAlt(-100),Le()});ue("ap-alt-up",()=>{dt.ap.nudgeAlt(100),Le()});ue("ap-vs-dn",()=>{dt.ap.nudgeVs(-500),Le()});ue("ap-vs-up",()=>{dt.ap.nudgeVs(500),Le()});ue("ap-lat",()=>{dt.ap.setLat(dt.ap.latMode==="HDG"?"NAV":"HDG"),Le()});ue("ap-vrt-alt",()=>{dt.ap.holdAlt(),Le()});ue("ap-vrt-appr",()=>{dt.ap.alignApproach(),Le()});ue("ap-align",()=>{dt.ap.alignApproach(),Le()});ue("ap-off",()=>{dt.ap.engaged&&dt.toggleAp(),Le()});$l("btn-yaw-l",()=>{ne.yaw=-1},()=>{ne.yaw=0});$l("btn-yaw-r",()=>{ne.yaw=1},()=>{ne.yaw=0});$l("btn-brake",()=>{ne.brakes=!0},()=>{ne.brakes=!1});ue("btn-gear",()=>{Zt.ensure(),ne.gearDown=!ne.gearDown;const i=document.getElementById("btn-gear");i.innerHTML=ne.gearDown?"ギア<br>DOWN":"ギア<br>UP",i.classList.toggle("on",!ne.gearDown),Zt.gear()});ue("btn-flap-up",()=>{Zt.ensure(),ne.flapUp(),Zt.flap()});ue("btn-flap-dn",()=>{Zt.ensure(),ne.flapDown(),Zt.flap()});ue("btn-spoiler",()=>{Zt.ensure(),ne.spoilers=ne.spoilers>0?0:1,document.getElementById("btn-spoiler").classList.toggle("on",ne.spoilers>0),Zt.click()});ue("btn-sound",()=>{Zt.ensure(),Zt.setMuted(!Zt.muted);const i=document.getElementById("btn-sound");i.innerHTML=Zt.muted?"音<br>OFF":"音<br>ON",i.classList.toggle("on",Zt.muted)});ue("btn-inst",()=>{const i=vs.style.display==="none";vs.style.display=i?"block":"none",i&&ur.resize();const t=document.getElementById("btn-inst");t.innerHTML=i?"計器<br>ON":"計器<br>OFF",t.classList.toggle("on",!i)});const vl=document,Yr=document.getElementById("app")??document.documentElement,ud="airliner.fs",In=()=>document.fullscreenElement!=null||vl.webkitFullscreenElement!=null;function dd(){try{return localStorage.getItem(ud)==="1"}catch{return!1}}function si(i){try{localStorage.setItem(ud,i?"1":"0")}catch{}}function _s(){const i=document.getElementById("btn-fs");i.innerHTML=In()?"解除":"全画面",i.classList.toggle("on",In()),Pe.setDisplay(In()),si(In()),ya()}function Zl(){try{Yr.requestFullscreen?Yr.requestFullscreen().then(()=>_s()).catch(()=>{_o(),Pe.setDisplay(!1),si(!1)}):Yr.webkitRequestFullscreen?(Yr.webkitRequestFullscreen(),setTimeout(_s,0)):(_o(),Pe.setDisplay(!1),si(!1))}catch{_o(),Pe.setDisplay(!1),si(!1)}}function fd(){document.exitFullscreen?document.exitFullscreen().then(()=>_s()).catch(()=>{}):vl.webkitExitFullscreen&&(vl.webkitExitFullscreen(),setTimeout(_s,0))}ue("btn-fs",()=>{In()?(si(!1),fd()):(si(!0),Zl())});function _o(){ts.show({text:"このブラウザは全画面 API 非対応です。iPhone は共有→「ホーム画面に追加」で全画面起動",speech:null,kind:"warn"})}document.addEventListener("fullscreenchange",_s);document.addEventListener("webkitfullscreenchange",_s);Pe.setDisplay(In()||dd());Pe.onDisplaySelect=i=>{i?In()||(si(!0),Zl()):(si(!1),In()&&fd())};Xe.on("resume",()=>{dt.resume(),Xe.hidePause()});Xe.on("restart",()=>{dt.restartDemo(),Ei.reset(),Xe.hidePause()});Xe.on("toMenu",()=>{dt.toMenu(),Xe.hidePause(),Zt.suspendAll(),vs.style.display="none",ad.style.display="none",Pe.show()});const lr=document.getElementById("stick-zone"),nM=document.getElementById("stick-visual"),rs=document.getElementById("stick-knob"),Gh=8,iM=1.45,sM=2.2,Vh=.9;let Ai=null,ea=44,pd=0,md=0,Ql=0,da=0,_l=!1;function gd(){const i=nM.getBoundingClientRect();ea=Math.max(26,i.width/2-24)}function vd(i,t){const e=i-pd,n=t-md,s=Math.hypot(e,n),r=s>ea?ea/s:1,a=e*r,o=n*r,l=s*r,h=rM((l-Gh)/Math.max(1,ea-Gh)),c=l>.001?Math.pow(h,iM)*Vh/l:0;da=a*c,Ql=o*c,rs.style.left=`calc(50% + ${a}px)`,rs.style.top=`calc(50% + ${o}px)`,rs.style.transform=`rotate(${(da/Vh*20).toFixed(1)}deg)`}function rM(i){return i<0?0:i>1?1:i}lr.addEventListener("pointerdown",i=>{if(dt.state==="flying"&&Ai===null){i.preventDefault(),Ai=i.pointerId,_l=!0,gd(),pd=i.clientX,md=i.clientY,vd(i.clientX,i.clientY);try{lr.setPointerCapture(i.pointerId)}catch{}}});lr.addEventListener("pointermove",i=>{i.pointerId===Ai&&vd(i.clientX,i.clientY)});const _d=i=>{i.pointerId===Ai&&(Ai=null,Ql=0,da=0,rs.style.left="50%",rs.style.top="50%",rs.style.transform="rotate(0deg)")};lr.addEventListener("pointerup",_d);lr.addEventListener("pointercancel",_d);window.addEventListener("resize",()=>{Ai!==null&&gd()});function aM(i){if(!_l||i<=0)return;const t=sM*i,e=Ql,n=da,s=e-ne.pitch,r=n-ne.roll;ne.pitch=Math.abs(s)<=t?e:ne.pitch+Math.sign(s)*t,ne.roll=Math.abs(r)<=t?n:ne.roll+Math.sign(r)*t,Ai===null&&ne.pitch===0&&ne.roll===0&&(_l=!1,ne.releaseStick())}const xs=document.getElementById("throttle-rail"),Wh=document.getElementById("throttle-knob");function xd(i){const t=xs.getBoundingClientRect(),e=1-Math.max(0,Math.min(1,(i-t.top-15)/(t.height-30)));ne.throttle=e,Wh.style.top=`${(1-e)*(t.height-30)+0}px`,Wh.textContent=`${Math.round(e*100)}%`}let fa=null;xs.addEventListener("pointerdown",i=>{dt.state==="flying"&&(i.preventDefault(),fa=i.pointerId,xs.setPointerCapture(i.pointerId),xd(i.clientY))});xs.addEventListener("pointermove",i=>{i.pointerId===fa&&xd(i.clientY)});const Md=i=>{i.pointerId===fa&&(fa=null)};xs.addEventListener("pointerup",Md);xs.addEventListener("pointercancel",Md);let cr=null,xl=0,Ml=0;bs.addEventListener("pointerdown",i=>{dt.state==="flying"&&cr===null&&(cr=i.pointerId,xl=i.clientX,Ml=i.clientY)});bs.addEventListener("pointermove",i=>{if(i.pointerId!==cr)return;const t=i.clientX-xl,e=i.clientY-Ml;xl=i.clientX,Ml=i.clientY,dt.orbitDrag(t,e)});const yd=i=>{i.pointerId===cr&&(cr=null)};bs.addEventListener("pointerup",yd);bs.addEventListener("pointercancel",yd);function ya(){t_(gs,ei),dt.syncPostFx(),Xe.updateOrientation(),ur.resize()}window.addEventListener("resize",ya);window.addEventListener("orientationchange",()=>setTimeout(ya,250));ya();let yl=performance.now();document.addEventListener("visibilitychange",()=>{document.hidden?dt.state==="flying"&&(dt.pause(),Xe.showPause()):(yl=performance.now(),Xe.updateOrientation())});let Xh=!0;const $r=["low","medium","high","ultra"];function Sd(i){requestAnimationFrame(Sd);let t=(i-yl)/1e3;yl=i,t>0||(t=0),t>.25&&(t=.25),dt.quality.sample(t);const e=i*.001;if(dt.state==="menu"){dt.renderPreview(t);return}if(dt.state==="flying"){ne.updateFromKeys(t),aM(t),dt.updateFlight(t,ne.normalized());const a=dt.getTelemetry();if(a){const o=dt.getFlightInfo(),l=dt.getNavInfo(),h={ias:a.ias,alt:a.alt,agl:a.agl,vspeed:a.vspeed,heading:a.heading,pitch:a.pitch,bank:a.bank,aoa:a.aoa,gLoad:a.gLoad,throttle:a.throttle,fuelFrac:a.fuelFrac,groundSpeed:a.groundSpeed,windSpeed:a.windSpeed,windDirDeg:a.windDirDeg,flapsDeg:o.flapsDeg,gearDown:o.gearDown,spoilers:ne.spoilers,phase:o.phase,crashed:o.crashed,rwyName:l?l.nearest.name:null,rwyDist:l?l.distanceToThreshold:null,rwyRemaining:l?l.remainingRunway:null,rwyHeading:l?l.nearest.headingDeg:null,fps:dt.quality.getFps(),onGround:a.onGround};if(!a.crashed){if(!a.onGround&&ss.length){const c=a.position.x,u=a.position.z,d=a.alt;for(let p=0;p<ss.length;p++){const g=ss[p],v=c-g.x,m=u-g.z,f=g.r+8;if(v*v+m*m<f*f&&d<g.top+5&&d>g.top-420){dt.forceCrash();break}}}if(Hh&&(a.onGround||a.agl<6)){const c=a.vspeed<-5.5&&a.groundSpeed>28,u=!o.gearDown&&a.groundSpeed>46&&a.agl<4;(c||u)&&dt.forceCrash()}}Hh=!a.onGround,a.crashed&&!vo&&(vo=!0,eM(1.35),ts.show({text:"ドカーン！！ 💥 衝突爆発",speech:"mayday mayday",kind:"warn"})),a.crashed||(vo=!1);{const c=dt.getApStatus();if(zh.classList.toggle("on",c.engaged),zh.innerHTML=c.engaged?"AP<br>ON":"AP<br>OFF",c.engaged?(kh.style.display="flex",tM.textContent=`AP ${c.lat}${c.loc?"·LOC":""} | ${c.ver}${c.gs?"·GS":""} · IAS ${Math.round(a.ias*1.94404)}kt · HDG ${String(c.hdgDeg).padStart(3,"0")}° · ALT ${c.altM}m${c.ver==="VS"?` · V/S ${c.vsFpm}`:""}`,od.classList.toggle("on",c.lat==="HDG"),ld.classList.toggle("on",c.lat==="NAV"),cd.classList.toggle("on",c.ver==="VS"),hd.classList.toggle("on",c.ver==="ALT")):kh.style.display="none",ml.style.display==="block"){const u=`${c.engaged?1:0}|${c.lat}|${c.ver}|${c.spdKt}|${c.hdgDeg}|${c.altM}|${c.vsFpm}|${c.loc?1:0}|${c.gs?1:0}`;u!==gl&&(gl=u,Le())}for(const u of dt.drainApEvents()){const d=jx[u];d&&(ts.show(d),!Zt.muted&&d.speech&&Oh(d.speech))}}if(vs.style.display!=="none"){ur.update(h);for(const u of Ei.update(h))ts.show(u),!Zt.muted&&u.speech&&Oh(u.speech);const c=Ei.flapCaution(h,performance.now());c&&ts.show(c)}if(Zt.ready&&!Zt.muted){Zt.setEngine(a.throttle,a.ias),Zt.setWind(a.ias);const c=a.crashed||o.crashed?"none":a.ias>id(o.flapsDeg)?"overspeed":a.aoa>15&&a.agl>10?"stall":a.agl<300&&!o.gearDown&&a.vspeed<-1?"gear":"none";Zt.setWarning(c)}Xh===!1&&a.onGround&&a.vspeed<-.5&&Zt.ready&&!Zt.muted&&Zt.touchdown(),Xh=a.onGround}}const n=dt.quality.getFps(),s=$r.indexOf(dt.quality.level),r=$r.indexOf(rd);if(dt.state==="flying"&&(n<26&&s>0?(Hs=0,ks+=t,ks>3&&(ks=0,dt.setQuality($r[s-1]),ll(gs,dt.quality.preset.pixelRatio),dt.syncPostFx(),dt.syncPostFx())):n>55&&s<r?(ks=0,Hs+=t,Hs>8&&(Hs=0,dt.setQuality($r[s+1]),ll(gs,dt.quality.preset.pixelRatio),dt.syncPostFx(),dt.syncPostFx())):(ks=0,Hs=0)),dt.updateWorld(e),_a.update(t),Ws>.02){const a=Ws*1.15;ei.position.x+=(Math.random()-.5)*a,ei.position.y+=(Math.random()-.5)*a,ei.position.z+=(Math.random()-.5)*a,ei.rotateZ((Math.random()-.5)*a*.011),Ws*=Math.exp(-2.6*t)}else Ws=0;dt.render()}requestAnimationFrame(Sd);
