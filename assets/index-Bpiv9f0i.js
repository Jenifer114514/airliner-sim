(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sc="170",hp=0,lh=1,up=2,gd=1,vd=2,Gn=3,Zn=0,Ke=1,fn=2,qn=0,Bi=1,Ar=2,ch=3,hh=4,dp=5,Fi=100,fp=101,pp=102,mp=103,gp=104,vp=200,_p=201,xp=202,yp=203,gl=204,vl=205,Mp=206,Sp=207,wp=208,bp=209,Tp=210,Ap=211,Ep=212,Rp=213,Cp=214,_l=0,xl=1,yl=2,bs=3,Ml=4,Sl=5,wl=6,bl=7,wc=0,Pp=1,Ip=2,vi=0,_d=1,xd=2,yd=3,bc=4,Lp=5,Md=6,Sd=7,uh="attached",Dp="detached",wd=300,Ts=301,As=302,Tl=303,Al=304,Jo=306,He=1e3,bn=1001,Ho=1002,Oe=1003,bd=1004,pr=1005,Ne=1006,Lo=1007,Ln=1008,ln=1009,Td=1010,Ad=1011,Er=1012,Tc=1013,Qn=1014,Tn=1015,Yn=1016,Ac=1017,Ec=1018,Es=1020,Ed=35902,Rd=1021,Cd=1022,Ve=1023,Pd=1024,Id=1025,vs=1026,Rs=1027,Rc=1028,zr=1029,Ld=1030,Cc=1031,Pc=1033,Do=33776,No=33777,Uo=33778,Fo=33779,El=35840,Rl=35841,Cl=35842,Pl=35843,Il=36196,Ll=37492,Dl=37496,Nl=37808,Ul=37809,Fl=37810,Ol=37811,Bl=37812,kl=37813,zl=37814,Hl=37815,Vl=37816,Gl=37817,Wl=37818,Xl=37819,ql=37820,Yl=37821,Oo=36492,Kl=36494,$l=36495,Dd=36283,jl=36284,Zl=36285,Ql=36286,Np=2200,Up=2201,Fp=2202,Rr=2300,Cr=2301,pa=2302,us=2400,ds=2401,Vo=2402,Ic=2500,Op=2501,Bp=0,Nd=1,Jl=2,kp=3200,Ud=3201,Lc=0,zp=1,pn="",Ae="srgb",$e="srgb-linear",ta="linear",le="srgb",Xi=7680,dh=519,Hp=512,Vp=513,Gp=514,Fd=515,Wp=516,Xp=517,qp=518,Yp=519,tc=35044,Go="300 es",Xn=2e3,Wo=2001;class Vi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fh=1234567;const _r=Math.PI/180,Cs=180/Math.PI;function En(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[s&255]+ke[s>>8&255]+ke[s>>16&255]+ke[s>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function Ee(s,t,e){return Math.max(t,Math.min(e,s))}function Dc(s,t){return(s%t+t)%t}function Kp(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function $p(s,t,e){return s!==t?(e-s)/(t-s):0}function xr(s,t,e){return(1-e)*s+e*t}function jp(s,t,e,n){return xr(s,t,1-Math.exp(-e*n))}function Zp(s,t=1){return t-Math.abs(Dc(s,t*2)-t)}function Qp(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Jp(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function tm(s,t){return s+Math.floor(Math.random()*(t-s+1))}function em(s,t){return s+Math.random()*(t-s)}function nm(s){return s*(.5-Math.random())}function im(s){s!==void 0&&(fh=s);let t=fh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function sm(s){return s*_r}function rm(s){return s*Cs}function om(s){return(s&s-1)===0&&s!==0}function am(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function lm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function cm(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ce(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const ec={DEG2RAD:_r,RAD2DEG:Cs,generateUUID:En,clamp:Ee,euclideanModulo:Dc,mapLinear:Kp,inverseLerp:$p,lerp:xr,damp:jp,pingpong:Zp,smoothstep:Qp,smootherstep:Jp,randInt:tm,randFloat:em,randFloatSpread:nm,seededRandom:im,degToRad:sm,radToDeg:rm,isPowerOfTwo:om,ceilPowerOfTwo:am,floorPowerOfTwo:lm,setQuaternionFromProperEuler:cm,normalize:ce,denormalize:wn};class it{constructor(t=0,e=0){it.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(t,e,n,i,r,o,a,l,c){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],y=i[1],x=i[4],_=i[7],A=i[2],T=i[5],E=i[8];return r[0]=o*v+a*y+l*A,r[3]=o*m+a*x+l*T,r[6]=o*p+a*_+l*E,r[1]=c*v+h*y+u*A,r[4]=c*m+h*x+u*T,r[7]=c*p+h*_+u*E,r[2]=d*v+f*y+g*A,r[5]=d*m+f*x+g*T,r[8]=d*p+f*_+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ma.makeScale(t,e)),this}rotate(t){return this.premultiply(ma.makeRotation(-t)),this}translate(t,e){return this.premultiply(ma.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new Xt;function Od(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Pr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function hm(){const s=Pr("canvas");return s.style.display="block",s}const ph={};function mr(s){s in ph||(ph[s]=!0,console.warn(s))}function um(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function dm(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function fm(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jt={enabled:!0,workingColorSpace:$e,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===le&&(s.r=Kn(s.r),s.g=Kn(s.g),s.b=Kn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===le&&(s.r=_s(s.r),s.g=_s(s.g),s.b=_s(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===pn?ta:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Kn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function _s(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const mh=[.64,.33,.3,.6,.15,.06],gh=[.2126,.7152,.0722],vh=[.3127,.329],_h=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xh=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[$e]:{primaries:mh,whitePoint:vh,transfer:ta,toXYZ:_h,fromXYZ:xh,luminanceCoefficients:gh,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:mh,whitePoint:vh,transfer:le,toXYZ:_h,fromXYZ:xh,luminanceCoefficients:gh,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}});let qi;class pm{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{qi===void 0&&(qi=Pr("canvas")),qi.width=t.width,qi.height=t.height;const n=qi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=qi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Pr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Kn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Kn(e[n]/255)*255):e[n]=Kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let mm=0;class Bd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=En(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(ga(i[o].image)):r.push(ga(i[o]))}else r=ga(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function ga(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?pm.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gm=0;class Re extends Vi{constructor(t=Re.DEFAULT_IMAGE,e=Re.DEFAULT_MAPPING,n=bn,i=bn,r=Ne,o=Ln,a=Ve,l=ln,c=Re.DEFAULT_ANISOTROPY,h=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=En(),this.name="",this.source=new Bd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case He:t.x=t.x-Math.floor(t.x);break;case bn:t.x=t.x<0?0:1;break;case Ho:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case He:t.y=t.y-Math.floor(t.y);break;case bn:t.y=t.y<0?0:1;break;case Ho:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Re.DEFAULT_IMAGE=null;Re.DEFAULT_MAPPING=wd;Re.DEFAULT_ANISOTROPY=1;class Zt{constructor(t=0,e=0,n=0,i=1){Zt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,_=(f+1)/2,A=(p+1)/2,T=(h+d)/4,E=(u+v)/4,R=(g+m)/4;return x>_&&x>A?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=T/n,r=E/n):_>A?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=T/i,r=R/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=E/r,i=R/r),this.set(n,i,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-v)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vm extends Vi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Zt(0,0,t,e),this.scissorTest=!1,this.viewport=new Zt(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ne,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Re(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Bd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rn extends vm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class kd extends Re{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class _m extends Re{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ge{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*v,y=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const A=Math.sqrt(x),T=Math.atan2(A,p*y);m=Math.sin(m*T)/A,a=Math.sin(a*T)/A}const _=a*y;if(l=l*m+d*_,c=c*m+f*_,h=h*m+g*_,u=u*m+v*_,m===1-a){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return va.copy(this).projectOnVector(t),this.sub(va)}reflect(t){return this.sub(va.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const va=new C,yh=new ge;class on{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,yn):yn.fromBufferAttribute(r,o),yn.applyMatrix4(t.matrixWorld),this.expandByPoint(yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xr.copy(n.boundingBox)),Xr.applyMatrix4(t.matrixWorld),this.union(Xr)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,yn),yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(js),qr.subVectors(this.max,js),Yi.subVectors(t.a,js),Ki.subVectors(t.b,js),$i.subVectors(t.c,js),ni.subVectors(Ki,Yi),ii.subVectors($i,Ki),Ti.subVectors(Yi,$i);let e=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-Ti.z,Ti.y,ni.z,0,-ni.x,ii.z,0,-ii.x,Ti.z,0,-Ti.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-Ti.y,Ti.x,0];return!_a(e,Yi,Ki,$i,qr)||(e=[1,0,0,0,1,0,0,0,1],!_a(e,Yi,Ki,$i,qr))?!1:(Yr.crossVectors(ni,ii),e=[Yr.x,Yr.y,Yr.z],_a(e,Yi,Ki,$i,qr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const On=[new C,new C,new C,new C,new C,new C,new C,new C],yn=new C,Xr=new on,Yi=new C,Ki=new C,$i=new C,ni=new C,ii=new C,Ti=new C,js=new C,qr=new C,Yr=new C,Ai=new C;function _a(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Ai.fromArray(s,r);const a=i.x*Math.abs(Ai.x)+i.y*Math.abs(Ai.y)+i.z*Math.abs(Ai.z),l=t.dot(Ai),c=e.dot(Ai),h=n.dot(Ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const xm=new on,Zs=new C,xa=new C;class Cn{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):xm.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zs.subVectors(t,this.center);const e=Zs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Zs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(xa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zs.copy(t.center).add(xa)),this.expandByPoint(Zs.copy(t.center).sub(xa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new C,ya=new C,Kr=new C,si=new C,Ma=new C,$r=new C,Sa=new C;class ea{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Bn.copy(this.origin).addScaledVector(this.direction,e),Bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){ya.copy(t).add(e).multiplyScalar(.5),Kr.copy(e).sub(t).normalize(),si.copy(this.origin).sub(ya);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Kr),a=si.dot(this.direction),l=-si.dot(Kr),c=si.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ya).addScaledVector(Kr,d),f}intersectSphere(t,e){Bn.subVectors(t.center,this.origin);const n=Bn.dot(this.direction),i=Bn.dot(Bn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Bn)!==null}intersectTriangle(t,e,n,i,r){Ma.subVectors(e,t),$r.subVectors(n,t),Sa.crossVectors(Ma,$r);let o=this.direction.dot(Sa),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;si.subVectors(this.origin,t);const l=a*this.direction.dot($r.crossVectors(si,$r));if(l<0)return null;const c=a*this.direction.dot(Ma.cross(si));if(c<0||l+c>o)return null;const h=-a*si.dot(Sa);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kt{constructor(t,e,n,i,r,o,a,l,c,h,u,d,f,g,v,m){kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,u,d,f,g,v,m)}set(t,e,n,i,r,o,a,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ji.setFromMatrixColumn(t,0).length(),r=1/ji.setFromMatrixColumn(t,1).length(),o=1/ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-v*c,e[9]=-a*l,e[2]=v-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d+v*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d-v*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ym,t,Mm)}lookAt(t,e,n){const i=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),ri.crossVectors(n,en),ri.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ri.crossVectors(n,en)),ri.normalize(),jr.crossVectors(en,ri),i[0]=ri.x,i[4]=jr.x,i[8]=en.x,i[1]=ri.y,i[5]=jr.y,i[9]=en.y,i[2]=ri.z,i[6]=jr.z,i[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],x=n[7],_=n[11],A=n[15],T=i[0],E=i[4],R=i[8],S=i[12],M=i[1],P=i[5],z=i[9],D=i[13],F=i[2],H=i[6],N=i[10],q=i[14],k=i[3],K=i[7],tt=i[11],rt=i[15];return r[0]=o*T+a*M+l*F+c*k,r[4]=o*E+a*P+l*H+c*K,r[8]=o*R+a*z+l*N+c*tt,r[12]=o*S+a*D+l*q+c*rt,r[1]=h*T+u*M+d*F+f*k,r[5]=h*E+u*P+d*H+f*K,r[9]=h*R+u*z+d*N+f*tt,r[13]=h*S+u*D+d*q+f*rt,r[2]=g*T+v*M+m*F+p*k,r[6]=g*E+v*P+m*H+p*K,r[10]=g*R+v*z+m*N+p*tt,r[14]=g*S+v*D+m*q+p*rt,r[3]=y*T+x*M+_*F+A*k,r[7]=y*E+x*P+_*H+A*K,r[11]=y*R+x*z+_*N+A*tt,r[15]=y*S+x*D+_*q+A*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+v*(+e*l*f-e*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+m*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],y=u*m*c-v*d*c+v*l*f-a*m*f-u*l*p+a*d*p,x=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,_=h*v*c-g*u*c+g*a*f-o*v*f-h*a*p+o*u*p,A=g*u*l-h*v*l-g*a*d+o*v*d+h*a*m-o*u*m,T=e*y+n*x+i*_+r*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=y*E,t[1]=(v*d*r-u*m*r-v*i*f+n*m*f+u*i*p-n*d*p)*E,t[2]=(a*m*r-v*l*r+v*i*c-n*m*c-a*i*p+n*l*p)*E,t[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*E,t[4]=x*E,t[5]=(h*m*r-g*d*r+g*i*f-e*m*f-h*i*p+e*d*p)*E,t[6]=(g*l*r-o*m*r-g*i*c+e*m*c+o*i*p-e*l*p)*E,t[7]=(o*d*r-h*l*r+h*i*c-e*d*c-o*i*f+e*l*f)*E,t[8]=_*E,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*E,t[10]=(o*v*r-g*a*r+g*n*c-e*v*c-o*n*p+e*a*p)*E,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*E,t[12]=A*E,t[13]=(h*v*i-g*u*i+g*n*d-e*v*d-h*n*m+e*u*m)*E,t[14]=(g*a*i-o*v*i-g*n*l+e*v*l+o*n*m-e*a*m)*E,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,y=l*c,x=l*h,_=l*u,A=n.x,T=n.y,E=n.z;return i[0]=(1-(v+p))*A,i[1]=(f+_)*A,i[2]=(g-x)*A,i[3]=0,i[4]=(f-_)*T,i[5]=(1-(d+p))*T,i[6]=(m+y)*T,i[7]=0,i[8]=(g+x)*E,i[9]=(m-y)*E,i[10]=(1-(d+v))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=ji.set(i[0],i[1],i[2]).length();const o=ji.set(i[4],i[5],i[6]).length(),a=ji.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Mn.copy(this);const c=1/r,h=1/o,u=1/a;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=h,Mn.elements[5]*=h,Mn.elements[6]*=h,Mn.elements[8]*=u,Mn.elements[9]*=u,Mn.elements[10]*=u,e.setFromRotationMatrix(Mn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Xn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,g;if(a===Xn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Wo)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Xn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-r),d=(e+t)*c,f=(n+i)*h;let g,v;if(a===Xn)g=(o+r)*u,v=-2*u;else if(a===Wo)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ji=new C,Mn=new kt,ym=new C(0,0,0),Mm=new C(1,1,1),ri=new C,jr=new C,en=new C,Mh=new kt,Sh=new ge;class vn{constructor(t=0,e=0,n=0,i=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Mh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sh.setFromEuler(this),this.setFromQuaternion(Sh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class zd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Sm=0;const wh=new C,Zi=new ge,kn=new kt,Zr=new C,Qs=new C,wm=new C,bm=new ge,bh=new C(1,0,0),Th=new C(0,1,0),Ah=new C(0,0,1),Eh={type:"added"},Tm={type:"removed"},Qi={type:"childadded",child:null},wa={type:"childremoved",child:null};class _e extends Vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=En(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new C,e=new vn,n=new ge,i=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new kt},normalMatrix:{value:new Xt}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.premultiply(Zi),this}rotateX(t){return this.rotateOnAxis(bh,t)}rotateY(t){return this.rotateOnAxis(Th,t)}rotateZ(t){return this.rotateOnAxis(Ah,t)}translateOnAxis(t,e){return wh.copy(t).applyQuaternion(this.quaternion),this.position.add(wh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bh,t)}translateY(t){return this.translateOnAxis(Th,t)}translateZ(t){return this.translateOnAxis(Ah,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Zr.copy(t):Zr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Qs,Zr,this.up):kn.lookAt(Zr,Qs,this.up),this.quaternion.setFromRotationMatrix(kn),i&&(kn.extractRotation(i.matrixWorld),Zi.setFromRotationMatrix(kn),this.quaternion.premultiply(Zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Eh),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Tm),wa.child=t,this.dispatchEvent(wa),wa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Eh),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,t,wm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,bm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}_e.DEFAULT_UP=new C(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Sn=new C,zn=new C,ba=new C,Hn=new C,Ji=new C,ts=new C,Rh=new C,Ta=new C,Aa=new C,Ea=new C,Ra=new Zt,Ca=new Zt,Pa=new Zt;class mn{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Sn.subVectors(t,e),i.cross(Sn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Sn.subVectors(i,e),zn.subVectors(n,e),ba.subVectors(t,e);const o=Sn.dot(Sn),a=Sn.dot(zn),l=Sn.dot(ba),c=zn.dot(zn),h=zn.dot(ba),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(o,Hn.y),l.addScaledVector(a,Hn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return Ra.setScalar(0),Ca.setScalar(0),Pa.setScalar(0),Ra.fromBufferAttribute(t,e),Ca.fromBufferAttribute(t,n),Pa.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Ra,r.x),o.addScaledVector(Ca,r.y),o.addScaledVector(Pa,r.z),o}static isFrontFacing(t,e,n,i){return Sn.subVectors(n,e),zn.subVectors(t,e),Sn.cross(zn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Sn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),Sn.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return mn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Ji.subVectors(i,n),ts.subVectors(r,n),Ta.subVectors(t,n);const l=Ji.dot(Ta),c=ts.dot(Ta);if(l<=0&&c<=0)return e.copy(n);Aa.subVectors(t,i);const h=Ji.dot(Aa),u=ts.dot(Aa);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ji,o);Ea.subVectors(t,r);const f=Ji.dot(Ea),g=ts.dot(Ea);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ts,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Rh.subVectors(r,i),a=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(Rh,a);const p=1/(m+v+d);return o=v*p,a=d*p,e.copy(n).addScaledVector(Ji,o).addScaledVector(ts,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},Qr={h:0,s:0,l:0};function Ia(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class ft{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=Dc(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ia(o,r,t+1/3),this.g=Ia(o,r,t),this.b=Ia(o,r,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=Ae){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){const n=Hd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Kn(t.r),this.g=Kn(t.g),this.b=Kn(t.b),this}copyLinearToSRGB(t){return this.r=_s(t.r),this.g=_s(t.g),this.b=_s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return jt.fromWorkingColorSpace(ze.copy(this),t),Math.round(Ee(ze.r*255,0,255))*65536+Math.round(Ee(ze.g*255,0,255))*256+Math.round(Ee(ze.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(ze.copy(this),e);const n=ze.r,i=ze.g,r=ze.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=Ae){jt.fromWorkingColorSpace(ze.copy(this),t);const e=ze.r,n=ze.g,i=ze.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(oi),this.setHSL(oi.h+t,oi.s+e,oi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(oi),t.getHSL(Qr);const n=xr(oi.h,Qr.h,e),i=xr(oi.s,Qr.s,e),r=xr(oi.l,Qr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ze=new ft;ft.NAMES=Hd;let Am=0;class gn extends Vi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=En(),this.name="",this.blending=Bi,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gl,this.blendDst=vl,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ft(0,0,0),this.blendAlpha=0,this.depthFunc=bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(n.blending=this.blending),this.side!==Zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==gl&&(n.blendSrc=this.blendSrc),this.blendDst!==vl&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class De extends gn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new C,Jr=new it;class ve{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=tc,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Jr.fromBufferAttribute(this,e),Jr.applyMatrix3(t),this.setXY(e,Jr.x,Jr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==tc&&(t.usage=this.usage),t}}class Vd extends ve{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Gd extends ve{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends ve{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Em=0;const hn=new kt,La=new _e,es=new C,nn=new on,Js=new on,Ie=new C;class ye extends Vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=En(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Od(t)?Gd:Vd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return La.lookAt(t),La.updateMatrix(),this.applyMatrix4(La.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new oe(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Js.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(nn.min,Js.min),nn.expandByPoint(Ie),Ie.addVectors(nn.max,Js.max),nn.expandByPoint(Ie)):(nn.expandByPoint(Js.min),nn.expandByPoint(Js.max))}nn.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ie.fromBufferAttribute(a,c),l&&(es.fromBufferAttribute(t,c),Ie.add(es)),i=Math.max(i,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ve(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new C,l[R]=new C;const c=new C,h=new C,u=new C,d=new it,f=new it,g=new it,v=new C,m=new C;function p(R,S,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[R].add(v),a[S].add(v),a[M].add(v),l[R].add(m),l[S].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let R=0,S=y.length;R<S;++R){const M=y[R],P=M.start,z=M.count;for(let D=P,F=P+z;D<F;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const x=new C,_=new C,A=new C,T=new C;function E(R){A.fromBufferAttribute(i,R),T.copy(A);const S=a[R];x.copy(S),x.sub(A.multiplyScalar(A.dot(S))).normalize(),_.crossVectors(T,S);const P=_.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,P)}for(let R=0,S=y.length;R<S;++R){const M=y[R],P=M.start,z=M.count;for(let D=P,F=P+z;D<F;D+=3)E(t.getX(D+0)),E(t.getX(D+1)),E(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ve(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new ve(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ye,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ch=new kt,Ei=new ea,to=new Cn,Ph=new C,eo=new C,no=new C,io=new C,Da=new C,so=new C,Ih=new C,ro=new C;class st extends _e{constructor(t=new ye,e=new De){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){so.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Da.fromBufferAttribute(u,t),o?so.addScaledVector(Da,h):so.addScaledVector(Da.sub(e),h))}e.add(so)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(r),Ei.copy(t.ray).recast(t.near),!(to.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(to,Ph)===null||Ei.origin.distanceToSquared(Ph)>(t.far-t.near)**2))&&(Ch.copy(r).invert(),Ei.copy(t.ray).applyMatrix4(Ch),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ei)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,A=x;_<A;_+=3){const T=a.getX(_),E=a.getX(_+1),R=a.getX(_+2);i=oo(this,p,t,n,c,h,u,T,E,R),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=a.getX(m),x=a.getX(m+1),_=a.getX(m+2);i=oo(this,o,t,n,c,h,u,y,x,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,A=x;_<A;_+=3){const T=_,E=_+1,R=_+2;i=oo(this,p,t,n,c,h,u,T,E,R),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=m,x=m+1,_=m+2;i=oo(this,o,t,n,c,h,u,y,x,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Rm(s,t,e,n,i,r,o,a){let l;if(t.side===Ke?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===Zn,a),l===null)return null;ro.copy(a),ro.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(ro);return c<e.near||c>e.far?null:{distance:c,point:ro.clone(),object:s}}function oo(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,eo),s.getVertexPosition(l,no),s.getVertexPosition(c,io);const h=Rm(s,t,e,n,eo,no,io,Ih);if(h){const u=new C;mn.getBarycoord(Ih,eo,no,io,u),i&&(h.uv=mn.getInterpolatedAttribute(i,a,l,c,u,new it)),r&&(h.uv1=mn.getInterpolatedAttribute(r,a,l,c,u,new it)),o&&(h.normal=mn.getInterpolatedAttribute(o,a,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new C,materialIndex:0};mn.getNormal(eo,no,io,d.normal),h.face=d,h.barycoord=u}return h}class he extends ye{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function g(v,m,p,y,x,_,A,T,E,R,S){const M=_/E,P=A/R,z=_/2,D=A/2,F=T/2,H=E+1,N=R+1;let q=0,k=0;const K=new C;for(let tt=0;tt<N;tt++){const rt=tt*P-D;for(let St=0;St<H;St++){const Mt=St*M-z;K[v]=Mt*y,K[m]=rt*x,K[p]=F,c.push(K.x,K.y,K.z),K[v]=0,K[m]=0,K[p]=T>0?1:-1,h.push(K.x,K.y,K.z),u.push(St/E),u.push(1-tt/R),q+=1}}for(let tt=0;tt<R;tt++)for(let rt=0;rt<E;rt++){const St=d+rt+H*tt,Mt=d+rt+H*(tt+1),G=d+(rt+1)+H*(tt+1),Z=d+(rt+1)+H*tt;l.push(St,Mt,Z),l.push(Mt,G,Z),k+=6}a.addGroup(f,k,S),f+=k,d+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ps(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Xe(s){const t={};for(let e=0;e<s.length;e++){const n=Ps(s[e]);for(const i in n)t[i]=n[i]}return t}function Cm(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Wd(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const Ir={clone:Ps,merge:Xe};var Pm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ue extends gn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pm,this.fragmentShader=Im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ps(t.uniforms),this.uniformsGroups=Cm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Xd extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=Xn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ai=new C,Lh=new it,Dh=new it;class qe extends Xd{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(_r*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(_r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ai.x,ai.y).multiplyScalar(-t/ai.z),ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ai.x,ai.y).multiplyScalar(-t/ai.z)}getViewSize(t,e){return this.getViewBounds(t,Lh,Dh),e.subVectors(Dh,Lh)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(_r*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ns=-90,is=1;class Lm extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new qe(ns,is,t,e);i.layers=this.layers,this.add(i);const r=new qe(ns,is,t,e);r.layers=this.layers,this.add(r);const o=new qe(ns,is,t,e);o.layers=this.layers,this.add(o);const a=new qe(ns,is,t,e);a.layers=this.layers,this.add(a);const l=new qe(ns,is,t,e);l.layers=this.layers,this.add(l);const c=new qe(ns,is,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Wo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class qd extends Re{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ts,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Dm extends Rn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new qd(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ne}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new he(5,5,5),r=new Ue({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ke,blending:qn});r.uniforms.tEquirect.value=e;const o=new st(i,r),a=e.minFilter;return e.minFilter===Ln&&(e.minFilter=Ne),new Lm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const Na=new C,Nm=new C,Um=new Xt;class Ni{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Na.subVectors(n,e).cross(Nm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Na),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Um.getNormalMatrix(t),i=this.coplanarPoint(Na).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ri=new Cn,ao=new C;class Nc{constructor(t=new Ni,e=new Ni,n=new Ni,i=new Ni,r=new Ni,o=new Ni){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Xn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],v=i[10],m=i[11],p=i[12],y=i[13],x=i[14],_=i[15];if(n[0].setComponents(l-r,d-c,m-f,_-p).normalize(),n[1].setComponents(l+r,d+c,m+f,_+p).normalize(),n[2].setComponents(l+o,d+h,m+g,_+y).normalize(),n[3].setComponents(l-o,d-h,m-g,_-y).normalize(),n[4].setComponents(l-a,d-u,m-v,_-x).normalize(),e===Xn)n[5].setComponents(l+a,d+u,m+v,_+x).normalize();else if(e===Wo)n[5].setComponents(a,u,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(t){return Ri.center.set(0,0,0),Ri.radius=.7071067811865476,Ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ao.x=i.normal.x>0?t.max.x:t.min.x,ao.y=i.normal.y>0?t.max.y:t.min.y,ao.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ao)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yd(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Fm(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class Ze extends ye{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const y=p*d-o;for(let x=0;x<c;x++){const _=x*u-r;g.push(_,-y,0),v.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const x=y+c*p,_=y+c*(p+1),A=y+1+c*(p+1),T=y+1+c*p;f.push(x,_,T),f.push(_,A,T)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(v,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ze(t.width,t.height,t.widthSegments,t.heightSegments)}}var Om=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bm=`#ifdef USE_ALPHAHASH
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
#endif`,km=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gm=`#ifdef USE_AOMAP
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
#endif`,Wm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xm=`#ifdef USE_BATCHING
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
#endif`,qm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Km=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$m=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jm=`#ifdef USE_IRIDESCENCE
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
#endif`,Zm=`#ifdef USE_BUMPMAP
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
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,o0=`#define PI 3.141592653589793
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
} // validated`,a0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,l0=`vec3 transformedNormal = objectNormal;
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
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,d0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,f0="gl_FragColor = linearToOutputTexel( gl_FragColor );",p0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m0=`#ifdef USE_ENVMAP
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
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,v0=`#ifdef USE_ENVMAP
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
#endif`,_0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,x0=`#ifdef USE_ENVMAP
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
#endif`,y0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,M0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,S0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,b0=`#ifdef USE_GRADIENTMAP
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
}`,T0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,A0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,E0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,R0=`uniform bool receiveShadow;
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
#endif`,C0=`#ifdef USE_ENVMAP
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
#endif`,P0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,L0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,D0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,N0=`PhysicalMaterial material;
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
#endif`,U0=`struct PhysicalMaterial {
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
}`,F0=`
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
#endif`,O0=`#if defined( RE_IndirectDiffuse )
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
#endif`,B0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,k0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,z0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,G0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,W0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,X0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,q0=`#if defined( USE_POINTS_UV )
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
#endif`,Y0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,K0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,j0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Z0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q0=`#ifdef USE_MORPHTARGETS
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
#endif`,J0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,eg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rg=`#ifdef USE_NORMALMAP
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
#endif`,og=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ug=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,dg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mg=`float getShadowMask() {
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
}`,Sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wg=`#ifdef USE_SKINNING
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
#endif`,bg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tg=`#ifdef USE_SKINNING
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
#endif`,Ag=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Eg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pg=`#ifdef USE_TRANSMISSION
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
#endif`,Ig=`#ifdef USE_TRANSMISSION
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
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ug=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Og=`uniform sampler2D t2D;
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
}`,Bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`#include <common>
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
}`,Gg=`#if DEPTH_PACKING == 3200
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
}`,Wg=`#define DISTANCE
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
}`,Xg=`#define DISTANCE
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
}`,qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`uniform float scale;
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
}`,$g=`uniform vec3 diffuse;
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
}`,jg=`#include <common>
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
}`,Zg=`uniform vec3 diffuse;
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
}`,Qg=`#define LAMBERT
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
}`,Jg=`#define LAMBERT
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
}`,tv=`#define MATCAP
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
}`,ev=`#define MATCAP
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
}`,nv=`#define NORMAL
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
}`,iv=`#define NORMAL
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
}`,sv=`#define PHONG
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
}`,rv=`#define PHONG
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
}`,ov=`#define STANDARD
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
}`,av=`#define STANDARD
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
}`,lv=`#define TOON
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
}`,cv=`#define TOON
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
}`,hv=`uniform float size;
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
}`,uv=`uniform vec3 diffuse;
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
}`,dv=`#include <common>
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
}`,fv=`uniform vec3 color;
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
}`,pv=`uniform float rotation;
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
}`,mv=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:Om,alphahash_pars_fragment:Bm,alphamap_fragment:km,alphamap_pars_fragment:zm,alphatest_fragment:Hm,alphatest_pars_fragment:Vm,aomap_fragment:Gm,aomap_pars_fragment:Wm,batching_pars_vertex:Xm,batching_vertex:qm,begin_vertex:Ym,beginnormal_vertex:Km,bsdfs:$m,iridescence_fragment:jm,bumpmap_pars_fragment:Zm,clipping_planes_fragment:Qm,clipping_planes_pars_fragment:Jm,clipping_planes_pars_vertex:t0,clipping_planes_vertex:e0,color_fragment:n0,color_pars_fragment:i0,color_pars_vertex:s0,color_vertex:r0,common:o0,cube_uv_reflection_fragment:a0,defaultnormal_vertex:l0,displacementmap_pars_vertex:c0,displacementmap_vertex:h0,emissivemap_fragment:u0,emissivemap_pars_fragment:d0,colorspace_fragment:f0,colorspace_pars_fragment:p0,envmap_fragment:m0,envmap_common_pars_fragment:g0,envmap_pars_fragment:v0,envmap_pars_vertex:_0,envmap_physical_pars_fragment:C0,envmap_vertex:x0,fog_vertex:y0,fog_pars_vertex:M0,fog_fragment:S0,fog_pars_fragment:w0,gradientmap_pars_fragment:b0,lightmap_pars_fragment:T0,lights_lambert_fragment:A0,lights_lambert_pars_fragment:E0,lights_pars_begin:R0,lights_toon_fragment:P0,lights_toon_pars_fragment:I0,lights_phong_fragment:L0,lights_phong_pars_fragment:D0,lights_physical_fragment:N0,lights_physical_pars_fragment:U0,lights_fragment_begin:F0,lights_fragment_maps:O0,lights_fragment_end:B0,logdepthbuf_fragment:k0,logdepthbuf_pars_fragment:z0,logdepthbuf_pars_vertex:H0,logdepthbuf_vertex:V0,map_fragment:G0,map_pars_fragment:W0,map_particle_fragment:X0,map_particle_pars_fragment:q0,metalnessmap_fragment:Y0,metalnessmap_pars_fragment:K0,morphinstance_vertex:$0,morphcolor_vertex:j0,morphnormal_vertex:Z0,morphtarget_pars_vertex:Q0,morphtarget_vertex:J0,normal_fragment_begin:tg,normal_fragment_maps:eg,normal_pars_fragment:ng,normal_pars_vertex:ig,normal_vertex:sg,normalmap_pars_fragment:rg,clearcoat_normal_fragment_begin:og,clearcoat_normal_fragment_maps:ag,clearcoat_pars_fragment:lg,iridescence_pars_fragment:cg,opaque_fragment:hg,packing:ug,premultiplied_alpha_fragment:dg,project_vertex:fg,dithering_fragment:pg,dithering_pars_fragment:mg,roughnessmap_fragment:gg,roughnessmap_pars_fragment:vg,shadowmap_pars_fragment:_g,shadowmap_pars_vertex:xg,shadowmap_vertex:yg,shadowmask_pars_fragment:Mg,skinbase_vertex:Sg,skinning_pars_vertex:wg,skinning_vertex:bg,skinnormal_vertex:Tg,specularmap_fragment:Ag,specularmap_pars_fragment:Eg,tonemapping_fragment:Rg,tonemapping_pars_fragment:Cg,transmission_fragment:Pg,transmission_pars_fragment:Ig,uv_pars_fragment:Lg,uv_pars_vertex:Dg,uv_vertex:Ng,worldpos_vertex:Ug,background_vert:Fg,background_frag:Og,backgroundCube_vert:Bg,backgroundCube_frag:kg,cube_vert:zg,cube_frag:Hg,depth_vert:Vg,depth_frag:Gg,distanceRGBA_vert:Wg,distanceRGBA_frag:Xg,equirect_vert:qg,equirect_frag:Yg,linedashed_vert:Kg,linedashed_frag:$g,meshbasic_vert:jg,meshbasic_frag:Zg,meshlambert_vert:Qg,meshlambert_frag:Jg,meshmatcap_vert:tv,meshmatcap_frag:ev,meshnormal_vert:nv,meshnormal_frag:iv,meshphong_vert:sv,meshphong_frag:rv,meshphysical_vert:ov,meshphysical_frag:av,meshtoon_vert:lv,meshtoon_frag:cv,points_vert:hv,points_frag:uv,shadow_vert:dv,shadow_frag:fv,sprite_vert:pv,sprite_frag:mv},ht={common:{diffuse:{value:new ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new ft(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},In={basic:{uniforms:Xe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Xe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new ft(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Xe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new ft(0)},specular:{value:new ft(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Xe([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Xe([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new ft(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Xe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Xe([ht.points,ht.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Xe([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Xe([ht.common,ht.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Xe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Xe([ht.sprite,ht.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Xe([ht.common,ht.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Xe([ht.lights,ht.fog,{color:{value:new ft(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};In.physical={uniforms:Xe([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new ft(0)},specularColor:{value:new ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const lo={r:0,b:0,g:0},Ci=new vn,gv=new kt;function vv(s,t,e,n,i,r,o){const a=new ft(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function v(y){let x=!1;const _=g(y);_===null?p(a,l):_&&_.isColor&&(p(_,1),x=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,x){const _=g(x);_&&(_.isCubeTexture||_.mapping===Jo)?(h===void 0&&(h=new st(new he(1,1,1),new Ue({name:"BackgroundCubeMaterial",uniforms:Ps(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ci.copy(x.backgroundRotation),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(gv.makeRotationFromEuler(Ci)),h.material.toneMapped=jt.getTransfer(_.colorSpace)!==le,(u!==_||d!==_.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new st(new Ze(2,2),new Ue({name:"BackgroundMaterial",uniforms:Ps(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=jt.getTransfer(_.colorSpace)!==le,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,x){y.getRGB(lo,Wd(s)),n.buffers.color.setClear(lo.r,lo.g,lo.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:v,addToRenderList:m}}function _v(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(M,P,z,D,F){let H=!1;const N=u(D,z,P);r!==N&&(r=N,c(r.object)),H=f(M,D,z,F),H&&g(M,D,z,F),F!==null&&t.update(F,s.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,_(M,P,z,D),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,P,z){const D=z.wireframe===!0;let F=n[M.id];F===void 0&&(F={},n[M.id]=F);let H=F[P.id];H===void 0&&(H={},F[P.id]=H);let N=H[D];return N===void 0&&(N=d(l()),H[D]=N),N}function d(M){const P=[],z=[],D=[];for(let F=0;F<e;F++)P[F]=0,z[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:D,object:M,attributes:{},index:null}}function f(M,P,z,D){const F=r.attributes,H=P.attributes;let N=0;const q=z.getAttributes();for(const k in q)if(q[k].location>=0){const tt=F[k];let rt=H[k];if(rt===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(rt=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(rt=M.instanceColor)),tt===void 0||tt.attribute!==rt||rt&&tt.data!==rt.data)return!0;N++}return r.attributesNum!==N||r.index!==D}function g(M,P,z,D){const F={},H=P.attributes;let N=0;const q=z.getAttributes();for(const k in q)if(q[k].location>=0){let tt=H[k];tt===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(tt=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(tt=M.instanceColor));const rt={};rt.attribute=tt,tt&&tt.data&&(rt.data=tt.data),F[k]=rt,N++}r.attributes=F,r.attributesNum=N,r.index=D}function v(){const M=r.newAttributes;for(let P=0,z=M.length;P<z;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){const z=r.newAttributes,D=r.enabledAttributes,F=r.attributeDivisors;z[M]=1,D[M]===0&&(s.enableVertexAttribArray(M),D[M]=1),F[M]!==P&&(s.vertexAttribDivisor(M,P),F[M]=P)}function y(){const M=r.newAttributes,P=r.enabledAttributes;for(let z=0,D=P.length;z<D;z++)P[z]!==M[z]&&(s.disableVertexAttribArray(z),P[z]=0)}function x(M,P,z,D,F,H,N){N===!0?s.vertexAttribIPointer(M,P,z,F,H):s.vertexAttribPointer(M,P,z,D,F,H)}function _(M,P,z,D){v();const F=D.attributes,H=z.getAttributes(),N=P.defaultAttributeValues;for(const q in H){const k=H[q];if(k.location>=0){let K=F[q];if(K===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(K=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(K=M.instanceColor)),K!==void 0){const tt=K.normalized,rt=K.itemSize,St=t.get(K);if(St===void 0)continue;const Mt=St.buffer,G=St.type,Z=St.bytesPerElement,at=G===s.INT||G===s.UNSIGNED_INT||K.gpuType===Tc;if(K.isInterleavedBufferAttribute){const lt=K.data,wt=lt.stride,Lt=K.offset;if(lt.isInstancedInterleavedBuffer){for(let nt=0;nt<k.locationSize;nt++)p(k.location+nt,lt.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let nt=0;nt<k.locationSize;nt++)m(k.location+nt);s.bindBuffer(s.ARRAY_BUFFER,Mt);for(let nt=0;nt<k.locationSize;nt++)x(k.location+nt,rt/k.locationSize,G,tt,wt*Z,(Lt+rt/k.locationSize*nt)*Z,at)}else{if(K.isInstancedBufferAttribute){for(let lt=0;lt<k.locationSize;lt++)p(k.location+lt,K.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let lt=0;lt<k.locationSize;lt++)m(k.location+lt);s.bindBuffer(s.ARRAY_BUFFER,Mt);for(let lt=0;lt<k.locationSize;lt++)x(k.location+lt,rt/k.locationSize,G,tt,rt*Z,rt/k.locationSize*lt*Z,at)}}else if(N!==void 0){const tt=N[q];if(tt!==void 0)switch(tt.length){case 2:s.vertexAttrib2fv(k.location,tt);break;case 3:s.vertexAttrib3fv(k.location,tt);break;case 4:s.vertexAttrib4fv(k.location,tt);break;default:s.vertexAttrib1fv(k.location,tt)}}}}y()}function A(){R();for(const M in n){const P=n[M];for(const z in P){const D=P[z];for(const F in D)h(D[F].object),delete D[F];delete P[z]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const z in P){const D=P[z];for(const F in D)h(D[F].object),delete D[F];delete P[z]}delete n[M.id]}function E(M){for(const P in n){const z=n[P];if(z[M.id]===void 0)continue;const D=z[M.id];for(const F in D)h(D[F].object),delete D[F];delete z[M.id]}}function R(){S(),o=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function xv(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function yv(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==Ve&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===Yn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==ln&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Tn&&!R)}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:A,maxSamples:T}}function Mv(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new Ni,a=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,x=y*4;let _=p.clippingState||null;l.value=_,_=h(g,d,x,f);for(let A=0;A!==x;++A)_[A]=e[A];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,_=f;x!==v;++x,_+=4)o.copy(u[x]).applyMatrix4(y,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Sv(s){let t=new WeakMap;function e(o,a){return a===Tl?o.mapping=Ts:a===Al&&(o.mapping=As),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Tl||a===Al)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Dm(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class na extends Xd{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const fs=4,Nh=[.125,.215,.35,.446,.526,.582],Oi=20,Ua=new na,Uh=new ft;let Fa=null,Oa=0,Ba=0,ka=!1;const Ui=(1+Math.sqrt(5))/2,ss=1/Ui,Fh=[new C(-Ui,ss,0),new C(Ui,ss,0),new C(-ss,0,Ui),new C(ss,0,Ui),new C(0,Ui,-ss),new C(0,Ui,ss),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class nc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Fa=this._renderer.getRenderTarget(),Oa=this._renderer.getActiveCubeFace(),Ba=this._renderer.getActiveMipmapLevel(),ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fa,Oa,Ba),this._renderer.xr.enabled=ka,t.scissorTest=!1,co(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ts||t.mapping===As?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fa=this._renderer.getRenderTarget(),Oa=this._renderer.getActiveCubeFace(),Ba=this._renderer.getActiveMipmapLevel(),ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ne,minFilter:Ne,generateMipmaps:!1,type:Yn,format:Ve,colorSpace:$e,depthBuffer:!1},i=Oh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wv(r)),this._blurMaterial=bv(r,t,e)}return i}_compileMaterial(t){const e=new st(this._lodPlanes[0],t);this._renderer.compile(e,Ua)}_sceneToCubeUV(t,e,n,i){const a=new qe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Uh),h.toneMapping=vi,h.autoClear=!1;const f=new De({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1}),g=new st(new he,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(Uh),v=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;co(i,y*x,p>2?x:0,x,x),h.setRenderTarget(i),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ts||t.mapping===As;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bh());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new st(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;co(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Ua)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Fh[(i-r-1)%Fh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new st(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Oi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Oi;m>Oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oi}`);const p=[];let y=0;for(let E=0;E<Oi;++E){const R=E/v,S=Math.exp(-R*R/2);p.push(S),E===0?y+=S:E<m&&(y+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const _=this._sizeLods[i],A=3*_*(i>x-fs?i-x+fs:0),T=4*(this._cubeSize-_);co(e,A,T,3*_,2*_),l.setRenderTarget(e),l.render(u,Ua)}}function wv(s){const t=[],e=[],n=[];let i=s;const r=s-fs+1+Nh.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-fs?l=Nh[o-s+fs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*f),x=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,R=T>2?0:-1,S=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];y.set(S,v*g*T),x.set(d,m*g*T);const M=[T,T,T,T,T,T];_.set(M,p*g*T)}const A=new ye;A.setAttribute("position",new ve(y,v)),A.setAttribute("uv",new ve(x,m)),A.setAttribute("faceIndex",new ve(_,p)),t.push(A),i>fs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Oh(s,t,e){const n=new Rn(s,t,e);return n.texture.mapping=Jo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function co(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function bv(s,t,e){const n=new Float32Array(Oi),i=new C(0,1,0);return new Ue({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Uc(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Bh(){return new Ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uc(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function kh(){return new Ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Uc(){return`

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
	`}function Tv(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Tl||l===Al,h=l===Ts||l===As;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new nc(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new nc(s)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Av(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&mr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ev(s,t,e,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let x=0,_=y.length;x<_;x+=3){const A=y[x+0],T=y[x+1],E=y[x+2];d.push(A,T,T,E,E,A)}}else if(g!==void 0){const y=g.array;v=g.version;for(let x=0,_=y.length/3-1;x<_;x+=3){const A=x+0,T=x+1,E=x+2;d.push(A,T,T,E,E,A)}}else return;const m=new(Od(d)?Gd:Vd)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Rv(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*v[y];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Cv(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Pv(s,t,e){const n=new WeakMap,i=new Zt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let S=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;f===!0&&(x=1),g===!0&&(x=2),v===!0&&(x=3);let _=a.attributes.position.count*x,A=1;_>t.maxTextureSize&&(A=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const T=new Float32Array(_*A*4*u),E=new kd(T,_,A,u);E.type=Tn,E.needsUpdate=!0;const R=x*4;for(let M=0;M<u;M++){const P=m[M],z=p[M],D=y[M],F=_*A*4*M;for(let H=0;H<P.count;H++){const N=H*R;f===!0&&(i.fromBufferAttribute(P,H),T[F+N+0]=i.x,T[F+N+1]=i.y,T[F+N+2]=i.z,T[F+N+3]=0),g===!0&&(i.fromBufferAttribute(z,H),T[F+N+4]=i.x,T[F+N+5]=i.y,T[F+N+6]=i.z,T[F+N+7]=0),v===!0&&(i.fromBufferAttribute(D,H),T[F+N+8]=i.x,T[F+N+9]=i.y,T[F+N+10]=i.z,T[F+N+11]=D.itemSize===4?i.w:1)}}d={count:u,texture:E,size:new it(_,A)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Iv(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Kd extends Re{constructor(t,e,n,i,r,o,a,l,c,h=vs){if(h!==vs&&h!==Rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===vs&&(n=Qn),n===void 0&&h===Rs&&(n=Es),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Oe,this.minFilter=l!==void 0?l:Oe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const $d=new Re,zh=new Kd(1,1),jd=new kd,Zd=new _m,Qd=new qd,Hh=[],Vh=[],Gh=new Float32Array(16),Wh=new Float32Array(9),Xh=new Float32Array(4);function Vs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Hh[i];if(r===void 0&&(r=new Float32Array(i),Hh[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Ce(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Pe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ia(s,t){let e=Vh[t];e===void 0&&(e=new Int32Array(t),Vh[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Lv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Dv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;s.uniform2fv(this.addr,t),Pe(e,t)}}function Nv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;s.uniform3fv(this.addr,t),Pe(e,t)}}function Uv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;s.uniform4fv(this.addr,t),Pe(e,t)}}function Fv(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Xh.set(n),s.uniformMatrix2fv(this.addr,!1,Xh),Pe(e,n)}}function Ov(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Wh.set(n),s.uniformMatrix3fv(this.addr,!1,Wh),Pe(e,n)}}function Bv(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Gh.set(n),s.uniformMatrix4fv(this.addr,!1,Gh),Pe(e,n)}}function kv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function zv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;s.uniform2iv(this.addr,t),Pe(e,t)}}function Hv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;s.uniform3iv(this.addr,t),Pe(e,t)}}function Vv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;s.uniform4iv(this.addr,t),Pe(e,t)}}function Gv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Wv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;s.uniform2uiv(this.addr,t),Pe(e,t)}}function Xv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;s.uniform3uiv(this.addr,t),Pe(e,t)}}function qv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;s.uniform4uiv(this.addr,t),Pe(e,t)}}function Yv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(zh.compareFunction=Fd,r=zh):r=$d,e.setTexture2D(t||r,i)}function Kv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Zd,i)}function $v(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Qd,i)}function jv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||jd,i)}function Zv(s){switch(s){case 5126:return Lv;case 35664:return Dv;case 35665:return Nv;case 35666:return Uv;case 35674:return Fv;case 35675:return Ov;case 35676:return Bv;case 5124:case 35670:return kv;case 35667:case 35671:return zv;case 35668:case 35672:return Hv;case 35669:case 35673:return Vv;case 5125:return Gv;case 36294:return Wv;case 36295:return Xv;case 36296:return qv;case 35678:case 36198:case 36298:case 36306:case 35682:return Yv;case 35679:case 36299:case 36307:return Kv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return jv}}function Qv(s,t){s.uniform1fv(this.addr,t)}function Jv(s,t){const e=Vs(t,this.size,2);s.uniform2fv(this.addr,e)}function t_(s,t){const e=Vs(t,this.size,3);s.uniform3fv(this.addr,e)}function e_(s,t){const e=Vs(t,this.size,4);s.uniform4fv(this.addr,e)}function n_(s,t){const e=Vs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function i_(s,t){const e=Vs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function s_(s,t){const e=Vs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function r_(s,t){s.uniform1iv(this.addr,t)}function o_(s,t){s.uniform2iv(this.addr,t)}function a_(s,t){s.uniform3iv(this.addr,t)}function l_(s,t){s.uniform4iv(this.addr,t)}function c_(s,t){s.uniform1uiv(this.addr,t)}function h_(s,t){s.uniform2uiv(this.addr,t)}function u_(s,t){s.uniform3uiv(this.addr,t)}function d_(s,t){s.uniform4uiv(this.addr,t)}function f_(s,t,e){const n=this.cache,i=t.length,r=ia(e,i);Ce(n,r)||(s.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||$d,r[o])}function p_(s,t,e){const n=this.cache,i=t.length,r=ia(e,i);Ce(n,r)||(s.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Zd,r[o])}function m_(s,t,e){const n=this.cache,i=t.length,r=ia(e,i);Ce(n,r)||(s.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Qd,r[o])}function g_(s,t,e){const n=this.cache,i=t.length,r=ia(e,i);Ce(n,r)||(s.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||jd,r[o])}function v_(s){switch(s){case 5126:return Qv;case 35664:return Jv;case 35665:return t_;case 35666:return e_;case 35674:return n_;case 35675:return i_;case 35676:return s_;case 5124:case 35670:return r_;case 35667:case 35671:return o_;case 35668:case 35672:return a_;case 35669:case 35673:return l_;case 5125:return c_;case 36294:return h_;case 36295:return u_;case 36296:return d_;case 35678:case 36198:case 36298:case 36306:case 35682:return f_;case 35679:case 36299:case 36307:return p_;case 35680:case 36300:case 36308:case 36293:return m_;case 36289:case 36303:case 36311:case 36292:return g_}}class __{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Zv(e.type)}}class x_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=v_(e.type)}}class y_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const za=/(\w+)(\])?(\[|\.)?/g;function qh(s,t){s.seq.push(t),s.map[t.id]=t}function M_(s,t,e){const n=s.name,i=n.length;for(za.lastIndex=0;;){const r=za.exec(n),o=za.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){qh(e,c===void 0?new __(a,s,t):new x_(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new y_(a),qh(e,u)),e=u}}}class Bo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);M_(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Yh(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const S_=37297;let w_=0;function b_(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Kh=new Xt;function T_(s){jt._getMatrix(Kh,jt.workingColorSpace,s);const t=`mat3( ${Kh.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(s)){case ta:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function $h(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+b_(s.getShaderSource(t),o)}else return i}function A_(s,t){const e=T_(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function E_(s,t){let e;switch(t){case _d:e="Linear";break;case xd:e="Reinhard";break;case yd:e="Cineon";break;case bc:e="ACESFilmic";break;case Md:e="AgX";break;case Sd:e="Neutral";break;case Lp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ho=new C;function R_(){jt.getLuminanceCoefficients(ho);const s=ho.x.toFixed(4),t=ho.y.toFixed(4),e=ho.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gr).join(`
`)}function P_(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function I_(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function gr(s){return s!==""}function jh(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zh(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const L_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ic(s){return s.replace(L_,N_)}const D_=new Map;function N_(s,t){let e=Yt[t];if(e===void 0){const n=D_.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ic(e)}const U_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qh(s){return s.replace(U_,F_)}function F_(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Jh(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function O_(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===gd?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===vd?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Gn&&(t="SHADOWMAP_TYPE_VSM"),t}function B_(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ts:case As:t="ENVMAP_TYPE_CUBE";break;case Jo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function k_(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case As:t="ENVMAP_MODE_REFRACTION";break}return t}function z_(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case wc:t="ENVMAP_BLENDING_MULTIPLY";break;case Pp:t="ENVMAP_BLENDING_MIX";break;case Ip:t="ENVMAP_BLENDING_ADD";break}return t}function H_(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function V_(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=O_(e),c=B_(e),h=k_(e),u=z_(e),d=H_(e),f=C_(e),g=P_(r),v=i.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(gr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(gr).join(`
`),p.length>0&&(p+=`
`)):(m=[Jh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gr).join(`
`),p=[Jh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==vi?"#define TONE_MAPPING":"",e.toneMapping!==vi?Yt.tonemapping_pars_fragment:"",e.toneMapping!==vi?E_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,A_("linearToOutputTexel",e.outputColorSpace),R_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(gr).join(`
`)),o=ic(o),o=jh(o,e),o=Zh(o,e),a=ic(a),a=jh(a,e),a=Zh(a,e),o=Qh(o),a=Qh(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Go?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=y+m+o,_=y+p+a,A=Yh(i,i.VERTEX_SHADER,x),T=Yh(i,i.FRAGMENT_SHADER,_);i.attachShader(v,A),i.attachShader(v,T),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function E(P){if(s.debug.checkShaderErrors){const z=i.getProgramInfoLog(v).trim(),D=i.getShaderInfoLog(A).trim(),F=i.getShaderInfoLog(T).trim();let H=!0,N=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(H=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,A,T);else{const q=$h(i,A,"vertex"),k=$h(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+q+`
`+k)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(D===""||F==="")&&(N=!1);N&&(P.diagnostics={runnable:H,programLog:z,vertexShader:{log:D,prefix:m},fragmentShader:{log:F,prefix:p}})}i.deleteShader(A),i.deleteShader(T),R=new Bo(i,v),S=I_(i,v)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,S_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=w_++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=T,this}let G_=0;class W_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new X_(t),e.set(t,n)),n}}class X_{constructor(t){this.id=G_++,this.code=t,this.usedTimes=0}}function q_(s,t,e,n,i,r,o){const a=new zd,l=new W_,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,M,P,z,D){const F=z.fog,H=D.geometry,N=S.isMeshStandardMaterial?z.environment:null,q=(S.isMeshStandardMaterial?e:t).get(S.envMap||N),k=q&&q.mapping===Jo?q.image.height:null,K=g[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const tt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,rt=tt!==void 0?tt.length:0;let St=0;H.morphAttributes.position!==void 0&&(St=1),H.morphAttributes.normal!==void 0&&(St=2),H.morphAttributes.color!==void 0&&(St=3);let Mt,G,Z,at;if(K){const ae=In[K];Mt=ae.vertexShader,G=ae.fragmentShader}else Mt=S.vertexShader,G=S.fragmentShader,l.update(S),Z=l.getVertexShaderID(S),at=l.getFragmentShaderID(S);const lt=s.getRenderTarget(),wt=s.state.buffers.depth.getReversed(),Lt=D.isInstancedMesh===!0,nt=D.isBatchedMesh===!0,yt=!!S.map,ut=!!S.matcap,j=!!q,L=!!S.aoMap,mt=!!S.lightMap,Rt=!!S.bumpMap,Ot=!!S.normalMap,bt=!!S.displacementMap,Vt=!!S.emissiveMap,Ft=!!S.metalnessMap,I=!!S.roughnessMap,w=S.anisotropy>0,V=S.clearcoat>0,Q=S.dispersion>0,et=S.iridescence>0,$=S.sheen>0,Dt=S.transmission>0,pt=w&&!!S.anisotropyMap,Tt=V&&!!S.clearcoatMap,Jt=V&&!!S.clearcoatNormalMap,ot=V&&!!S.clearcoatRoughnessMap,At=et&&!!S.iridescenceMap,Bt=et&&!!S.iridescenceThicknessMap,zt=$&&!!S.sheenColorMap,Et=$&&!!S.sheenRoughnessMap,Qt=!!S.specularMap,qt=!!S.specularColorMap,de=!!S.specularIntensityMap,U=Dt&&!!S.transmissionMap,dt=Dt&&!!S.thicknessMap,Y=!!S.gradientMap,J=!!S.alphaMap,xt=S.alphaTest>0,gt=!!S.alphaHash,Gt=!!S.extensions;let Se=vi;S.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(Se=s.toneMapping);const Be={shaderID:K,shaderType:S.type,shaderName:S.name,vertexShader:Mt,fragmentShader:G,defines:S.defines,customVertexShaderID:Z,customFragmentShaderID:at,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:nt,batchingColor:nt&&D._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&D.instanceColor!==null,instancingMorph:Lt&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:lt===null?s.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:$e,alphaToCoverage:!!S.alphaToCoverage,map:yt,matcap:ut,envMap:j,envMapMode:j&&q.mapping,envMapCubeUVHeight:k,aoMap:L,lightMap:mt,bumpMap:Rt,normalMap:Ot,displacementMap:d&&bt,emissiveMap:Vt,normalMapObjectSpace:Ot&&S.normalMapType===zp,normalMapTangentSpace:Ot&&S.normalMapType===Lc,metalnessMap:Ft,roughnessMap:I,anisotropy:w,anisotropyMap:pt,clearcoat:V,clearcoatMap:Tt,clearcoatNormalMap:Jt,clearcoatRoughnessMap:ot,dispersion:Q,iridescence:et,iridescenceMap:At,iridescenceThicknessMap:Bt,sheen:$,sheenColorMap:zt,sheenRoughnessMap:Et,specularMap:Qt,specularColorMap:qt,specularIntensityMap:de,transmission:Dt,transmissionMap:U,thicknessMap:dt,gradientMap:Y,opaque:S.transparent===!1&&S.blending===Bi&&S.alphaToCoverage===!1,alphaMap:J,alphaTest:xt,alphaHash:gt,combine:S.combine,mapUv:yt&&v(S.map.channel),aoMapUv:L&&v(S.aoMap.channel),lightMapUv:mt&&v(S.lightMap.channel),bumpMapUv:Rt&&v(S.bumpMap.channel),normalMapUv:Ot&&v(S.normalMap.channel),displacementMapUv:bt&&v(S.displacementMap.channel),emissiveMapUv:Vt&&v(S.emissiveMap.channel),metalnessMapUv:Ft&&v(S.metalnessMap.channel),roughnessMapUv:I&&v(S.roughnessMap.channel),anisotropyMapUv:pt&&v(S.anisotropyMap.channel),clearcoatMapUv:Tt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Et&&v(S.sheenRoughnessMap.channel),specularMapUv:Qt&&v(S.specularMap.channel),specularColorMapUv:qt&&v(S.specularColorMap.channel),specularIntensityMapUv:de&&v(S.specularIntensityMap.channel),transmissionMapUv:U&&v(S.transmissionMap.channel),thicknessMapUv:dt&&v(S.thicknessMap.channel),alphaMapUv:J&&v(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Ot||w),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!H.attributes.uv&&(yt||J),fog:!!F,useFog:S.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:wt,skinning:D.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:St,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Se,decodeVideoTexture:yt&&S.map.isVideoTexture===!0&&jt.getTransfer(S.map.colorSpace)===le,decodeVideoTextureEmissive:Vt&&S.emissiveMap.isVideoTexture===!0&&jt.getTransfer(S.emissiveMap.colorSpace)===le,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===fn,flipSided:S.side===Ke,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Gt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&S.extensions.multiDraw===!0||nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function p(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(y(M,S),x(M,S),M.push(s.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function y(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const M=g[S.type];let P;if(M){const z=In[M];P=Ir.clone(z.uniforms)}else P=S.uniforms;return P}function A(S,M){let P;for(let z=0,D=h.length;z<D;z++){const F=h[z];if(F.cacheKey===M){P=F,++P.usedTimes;break}}return P===void 0&&(P=new V_(s,M,S,r),h.push(P)),P}function T(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function E(S){l.remove(S)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:A,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:R}}function Y_(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function K_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function tu(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function eu(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,g,v,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||K_),n.length>1&&n.sort(d||tu),i.length>1&&i.sort(d||tu)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function $_(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new eu,s.set(n,[o])):i>=r.length?(o=new eu,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function j_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new ft};break;case"SpotLight":e={position:new C,direction:new C,color:new ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new ft,groundColor:new ft};break;case"RectAreaLight":e={color:new ft,position:new C,halfWidth:new C,halfHeight:new C};break}return s[t.id]=e,e}}}function Z_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Q_=0;function J_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function tx(s){const t=new j_,e=Z_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const i=new C,r=new kt,o=new kt;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,y=0,x=0,_=0,A=0,T=0,E=0;c.sort(J_);for(let S=0,M=c.length;S<M;S++){const P=c[S],z=P.color,D=P.intensity,F=P.distance,H=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=z.r*D,u+=z.g*D,d+=z.b*D;else if(P.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(P.sh.coefficients[N],D);E++}else if(P.isDirectionalLight){const N=t.get(P);if(N.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const q=P.shadow,k=e.get(P);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,n.directionalShadow[f]=k,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=P.shadow.matrix,y++}n.directional[f]=N,f++}else if(P.isSpotLight){const N=t.get(P);N.position.setFromMatrixPosition(P.matrixWorld),N.color.copy(z).multiplyScalar(D),N.distance=F,N.coneCos=Math.cos(P.angle),N.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),N.decay=P.decay,n.spot[v]=N;const q=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,q.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[v]=q.matrix,P.castShadow){const k=e.get(P);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,n.spotShadow[v]=k,n.spotShadowMap[v]=H,_++}v++}else if(P.isRectAreaLight){const N=t.get(P);N.color.copy(z).multiplyScalar(D),N.halfWidth.set(P.width*.5,0,0),N.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=N,m++}else if(P.isPointLight){const N=t.get(P);if(N.color.copy(P.color).multiplyScalar(P.intensity),N.distance=P.distance,N.decay=P.decay,P.castShadow){const q=P.shadow,k=e.get(P);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,k.shadowCameraNear=q.camera.near,k.shadowCameraFar=q.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=P.shadow.matrix,x++}n.point[g]=N,g++}else if(P.isHemisphereLight){const N=t.get(P);N.skyColor.copy(P.color).multiplyScalar(D),N.groundColor.copy(P.groundColor).multiplyScalar(D),n.hemi[p]=N,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==y||R.numPointShadows!==x||R.numSpotShadows!==_||R.numSpotMaps!==A||R.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=_+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,R.directionalLength=f,R.pointLength=g,R.spotLength=v,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=y,R.numPointShadows=x,R.numSpotShadows=_,R.numSpotMaps=A,R.numLightProbes=E,n.version=Q_++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const x=c[p];if(x.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(x.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function nu(s){const t=new tx(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function ex(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new nu(s),t.set(i,[a])):r>=o.length?(a=new nu(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Jd extends gn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=kp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class nx extends gn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ix=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sx=`uniform sampler2D shadow_pass;
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
}`;function rx(s,t,e){let n=new Nc;const i=new it,r=new it,o=new Zt,a=new Jd({depthPacking:Ud}),l=new nx,c={},h=e.maxTextureSize,u={[Zn]:Ke,[Ke]:Zn,[fn]:fn},d=new Ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:ix,fragmentShader:sx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new ye;g.setAttribute("position",new ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new st(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gd;let p=this.type;this.render=function(T,E,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=s.getRenderTarget(),M=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),z=s.state;z.setBlending(qn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const D=p!==Gn&&this.type===Gn,F=p===Gn&&this.type!==Gn;for(let H=0,N=T.length;H<N;H++){const q=T[H],k=q.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const K=k.getFrameExtents();if(i.multiply(K),r.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/K.x),i.x=r.x*K.x,k.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/K.y),i.y=r.y*K.y,k.mapSize.y=r.y)),k.map===null||D===!0||F===!0){const rt=this.type!==Gn?{minFilter:Oe,magFilter:Oe}:{};k.map!==null&&k.map.dispose(),k.map=new Rn(i.x,i.y,rt),k.map.texture.name=q.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const tt=k.getViewportCount();for(let rt=0;rt<tt;rt++){const St=k.getViewport(rt);o.set(r.x*St.x,r.y*St.y,r.x*St.z,r.y*St.w),z.viewport(o),k.updateMatrices(q,rt),n=k.getFrustum(),_(E,R,k.camera,q,this.type)}k.isPointLightShadow!==!0&&this.type===Gn&&y(k,R),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(S,M,P)};function y(T,E){const R=t.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Rn(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(E,null,R,d,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(E,null,R,f,v,null)}function x(T,E,R,S){let M=null;const P=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)M=P;else if(M=R.isPointLight===!0?l:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const z=M.uuid,D=E.uuid;let F=c[z];F===void 0&&(F={},c[z]=F);let H=F[D];H===void 0&&(H=M.clone(),F[D]=H,E.addEventListener("dispose",A)),M=H}if(M.visible=E.visible,M.wireframe=E.wireframe,S===Gn?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:u[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=s.properties.get(M);z.light=R}return M}function _(T,E,R,S,M){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Gn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const D=t.update(T),F=T.material;if(Array.isArray(F)){const H=D.groups;for(let N=0,q=H.length;N<q;N++){const k=H[N],K=F[k.materialIndex];if(K&&K.visible){const tt=x(T,K,S,M);T.onBeforeShadow(s,T,E,R,D,tt,k),s.renderBufferDirect(R,null,D,tt,T,k),T.onAfterShadow(s,T,E,R,D,tt,k)}}}else if(F.visible){const H=x(T,F,S,M);T.onBeforeShadow(s,T,E,R,D,H,null),s.renderBufferDirect(R,null,D,H,T,null),T.onAfterShadow(s,T,E,R,D,H,null)}}const z=T.children;for(let D=0,F=z.length;D<F;D++)_(z[D],E,R,S,M)}function A(T){T.target.removeEventListener("dispose",A);for(const R in c){const S=c[R],M=T.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const ox={[_l]:xl,[yl]:wl,[Ml]:bl,[bs]:Sl,[xl]:_l,[wl]:yl,[bl]:Ml,[Sl]:bs};function ax(s,t){function e(){let U=!1;const dt=new Zt;let Y=null;const J=new Zt(0,0,0,0);return{setMask:function(xt){Y!==xt&&!U&&(s.colorMask(xt,xt,xt,xt),Y=xt)},setLocked:function(xt){U=xt},setClear:function(xt,gt,Gt,Se,Be){Be===!0&&(xt*=Se,gt*=Se,Gt*=Se),dt.set(xt,gt,Gt,Se),J.equals(dt)===!1&&(s.clearColor(xt,gt,Gt,Se),J.copy(dt))},reset:function(){U=!1,Y=null,J.set(-1,0,0,0)}}}function n(){let U=!1,dt=!1,Y=null,J=null,xt=null;return{setReversed:function(gt){if(dt!==gt){const Gt=t.get("EXT_clip_control");dt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const Se=xt;xt=null,this.setClear(Se)}dt=gt},getReversed:function(){return dt},setTest:function(gt){gt?lt(s.DEPTH_TEST):wt(s.DEPTH_TEST)},setMask:function(gt){Y!==gt&&!U&&(s.depthMask(gt),Y=gt)},setFunc:function(gt){if(dt&&(gt=ox[gt]),J!==gt){switch(gt){case _l:s.depthFunc(s.NEVER);break;case xl:s.depthFunc(s.ALWAYS);break;case yl:s.depthFunc(s.LESS);break;case bs:s.depthFunc(s.LEQUAL);break;case Ml:s.depthFunc(s.EQUAL);break;case Sl:s.depthFunc(s.GEQUAL);break;case wl:s.depthFunc(s.GREATER);break;case bl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}J=gt}},setLocked:function(gt){U=gt},setClear:function(gt){xt!==gt&&(dt&&(gt=1-gt),s.clearDepth(gt),xt=gt)},reset:function(){U=!1,Y=null,J=null,xt=null,dt=!1}}}function i(){let U=!1,dt=null,Y=null,J=null,xt=null,gt=null,Gt=null,Se=null,Be=null;return{setTest:function(ae){U||(ae?lt(s.STENCIL_TEST):wt(s.STENCIL_TEST))},setMask:function(ae){dt!==ae&&!U&&(s.stencilMask(ae),dt=ae)},setFunc:function(ae,_n,Un){(Y!==ae||J!==_n||xt!==Un)&&(s.stencilFunc(ae,_n,Un),Y=ae,J=_n,xt=Un)},setOp:function(ae,_n,Un){(gt!==ae||Gt!==_n||Se!==Un)&&(s.stencilOp(ae,_n,Un),gt=ae,Gt=_n,Se=Un)},setLocked:function(ae){U=ae},setClear:function(ae){Be!==ae&&(s.clearStencil(ae),Be=ae)},reset:function(){U=!1,dt=null,Y=null,J=null,xt=null,gt=null,Gt=null,Se=null,Be=null}}}const r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,x=null,_=null,A=null,T=null,E=new ft(0,0,0),R=0,S=!1,M=null,P=null,z=null,D=null,F=null;const H=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,q=0;const k=s.getParameter(s.VERSION);k.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(k)[1]),N=q>=1):k.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),N=q>=2);let K=null,tt={};const rt=s.getParameter(s.SCISSOR_BOX),St=s.getParameter(s.VIEWPORT),Mt=new Zt().fromArray(rt),G=new Zt().fromArray(St);function Z(U,dt,Y,J){const xt=new Uint8Array(4),gt=s.createTexture();s.bindTexture(U,gt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Gt=0;Gt<Y;Gt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(dt,0,s.RGBA,1,1,J,0,s.RGBA,s.UNSIGNED_BYTE,xt):s.texImage2D(dt+Gt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,xt);return gt}const at={};at[s.TEXTURE_2D]=Z(s.TEXTURE_2D,s.TEXTURE_2D,1),at[s.TEXTURE_CUBE_MAP]=Z(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[s.TEXTURE_2D_ARRAY]=Z(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),at[s.TEXTURE_3D]=Z(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),lt(s.DEPTH_TEST),o.setFunc(bs),Rt(!1),Ot(lh),lt(s.CULL_FACE),L(qn);function lt(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function wt(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Lt(U,dt){return u[U]!==dt?(s.bindFramebuffer(U,dt),u[U]=dt,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=dt),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=dt),!0):!1}function nt(U,dt){let Y=f,J=!1;if(U){Y=d.get(dt),Y===void 0&&(Y=[],d.set(dt,Y));const xt=U.textures;if(Y.length!==xt.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let gt=0,Gt=xt.length;gt<Gt;gt++)Y[gt]=s.COLOR_ATTACHMENT0+gt;Y.length=xt.length,J=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,J=!0);J&&s.drawBuffers(Y)}function yt(U){return g!==U?(s.useProgram(U),g=U,!0):!1}const ut={[Fi]:s.FUNC_ADD,[fp]:s.FUNC_SUBTRACT,[pp]:s.FUNC_REVERSE_SUBTRACT};ut[mp]=s.MIN,ut[gp]=s.MAX;const j={[vp]:s.ZERO,[_p]:s.ONE,[xp]:s.SRC_COLOR,[gl]:s.SRC_ALPHA,[Tp]:s.SRC_ALPHA_SATURATE,[wp]:s.DST_COLOR,[Mp]:s.DST_ALPHA,[yp]:s.ONE_MINUS_SRC_COLOR,[vl]:s.ONE_MINUS_SRC_ALPHA,[bp]:s.ONE_MINUS_DST_COLOR,[Sp]:s.ONE_MINUS_DST_ALPHA,[Ap]:s.CONSTANT_COLOR,[Ep]:s.ONE_MINUS_CONSTANT_COLOR,[Rp]:s.CONSTANT_ALPHA,[Cp]:s.ONE_MINUS_CONSTANT_ALPHA};function L(U,dt,Y,J,xt,gt,Gt,Se,Be,ae){if(U===qn){v===!0&&(wt(s.BLEND),v=!1);return}if(v===!1&&(lt(s.BLEND),v=!0),U!==dp){if(U!==m||ae!==S){if((p!==Fi||_!==Fi)&&(s.blendEquation(s.FUNC_ADD),p=Fi,_=Fi),ae)switch(U){case Bi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ar:s.blendFunc(s.ONE,s.ONE);break;case ch:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case hh:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Bi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ar:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ch:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case hh:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,x=null,A=null,T=null,E.set(0,0,0),R=0,m=U,S=ae}return}xt=xt||dt,gt=gt||Y,Gt=Gt||J,(dt!==p||xt!==_)&&(s.blendEquationSeparate(ut[dt],ut[xt]),p=dt,_=xt),(Y!==y||J!==x||gt!==A||Gt!==T)&&(s.blendFuncSeparate(j[Y],j[J],j[gt],j[Gt]),y=Y,x=J,A=gt,T=Gt),(Se.equals(E)===!1||Be!==R)&&(s.blendColor(Se.r,Se.g,Se.b,Be),E.copy(Se),R=Be),m=U,S=!1}function mt(U,dt){U.side===fn?wt(s.CULL_FACE):lt(s.CULL_FACE);let Y=U.side===Ke;dt&&(Y=!Y),Rt(Y),U.blending===Bi&&U.transparent===!1?L(qn):L(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const J=U.stencilWrite;a.setTest(J),J&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Vt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?lt(s.SAMPLE_ALPHA_TO_COVERAGE):wt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(U){M!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),M=U)}function Ot(U){U!==hp?(lt(s.CULL_FACE),U!==P&&(U===lh?s.cullFace(s.BACK):U===up?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):wt(s.CULL_FACE),P=U}function bt(U){U!==z&&(N&&s.lineWidth(U),z=U)}function Vt(U,dt,Y){U?(lt(s.POLYGON_OFFSET_FILL),(D!==dt||F!==Y)&&(s.polygonOffset(dt,Y),D=dt,F=Y)):wt(s.POLYGON_OFFSET_FILL)}function Ft(U){U?lt(s.SCISSOR_TEST):wt(s.SCISSOR_TEST)}function I(U){U===void 0&&(U=s.TEXTURE0+H-1),K!==U&&(s.activeTexture(U),K=U)}function w(U,dt,Y){Y===void 0&&(K===null?Y=s.TEXTURE0+H-1:Y=K);let J=tt[Y];J===void 0&&(J={type:void 0,texture:void 0},tt[Y]=J),(J.type!==U||J.texture!==dt)&&(K!==Y&&(s.activeTexture(Y),K=Y),s.bindTexture(U,dt||at[U]),J.type=U,J.texture=dt)}function V(){const U=tt[K];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Dt(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Jt(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ot(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function At(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Bt(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function zt(U){Mt.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),Mt.copy(U))}function Et(U){G.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),G.copy(U))}function Qt(U,dt){let Y=c.get(dt);Y===void 0&&(Y=new WeakMap,c.set(dt,Y));let J=Y.get(U);J===void 0&&(J=s.getUniformBlockIndex(dt,U.name),Y.set(U,J))}function qt(U,dt){const J=c.get(dt).get(U);l.get(dt)!==J&&(s.uniformBlockBinding(dt,J,U.__bindingPointIndex),l.set(dt,J))}function de(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},K=null,tt={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,x=null,_=null,A=null,T=null,E=new ft(0,0,0),R=0,S=!1,M=null,P=null,z=null,D=null,F=null,Mt.set(0,0,s.canvas.width,s.canvas.height),G.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:lt,disable:wt,bindFramebuffer:Lt,drawBuffers:nt,useProgram:yt,setBlending:L,setMaterial:mt,setFlipSided:Rt,setCullFace:Ot,setLineWidth:bt,setPolygonOffset:Vt,setScissorTest:Ft,activeTexture:I,bindTexture:w,unbindTexture:V,compressedTexImage2D:Q,compressedTexImage3D:et,texImage2D:At,texImage3D:Bt,updateUBOMapping:Qt,uniformBlockBinding:qt,texStorage2D:Jt,texStorage3D:ot,texSubImage2D:$,texSubImage3D:Dt,compressedTexSubImage2D:pt,compressedTexSubImage3D:Tt,scissor:zt,viewport:Et,reset:de}}function iu(s,t,e,n){const i=lx(n);switch(e){case Rd:return s*t;case Pd:return s*t;case Id:return s*t*2;case Rc:return s*t/i.components*i.byteLength;case zr:return s*t/i.components*i.byteLength;case Ld:return s*t*2/i.components*i.byteLength;case Cc:return s*t*2/i.components*i.byteLength;case Cd:return s*t*3/i.components*i.byteLength;case Ve:return s*t*4/i.components*i.byteLength;case Pc:return s*t*4/i.components*i.byteLength;case Do:case No:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Uo:case Fo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Rl:case Pl:return Math.max(s,16)*Math.max(t,8)/4;case El:case Cl:return Math.max(s,8)*Math.max(t,8)/2;case Il:case Ll:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Dl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Nl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ul:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Fl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ol:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Bl:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case kl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case zl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Hl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Vl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Gl:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Wl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Xl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case ql:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Yl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Oo:case Kl:case $l:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Dd:case jl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Zl:case Ql:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function lx(s){switch(s){case ln:case Td:return{byteLength:1,components:1};case Er:case Ad:case Yn:return{byteLength:2,components:1};case Ac:case Ec:return{byteLength:2,components:4};case Qn:case Tc:case Tn:return{byteLength:4,components:1};case Ed:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function cx(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new it,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,w){return f?new OffscreenCanvas(I,w):Pr("canvas")}function v(I,w,V){let Q=1;const et=Ft(I);if((et.width>V||et.height>V)&&(Q=V/Math.max(et.width,et.height)),Q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const $=Math.floor(Q*et.width),Dt=Math.floor(Q*et.height);u===void 0&&(u=g($,Dt));const pt=w?g($,Dt):u;return pt.width=$,pt.height=Dt,pt.getContext("2d").drawImage(I,0,0,$,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+$+"x"+Dt+")."),pt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){s.generateMipmap(I)}function y(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(I,w,V,Q,et=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let $=w;if(w===s.RED&&(V===s.FLOAT&&($=s.R32F),V===s.HALF_FLOAT&&($=s.R16F),V===s.UNSIGNED_BYTE&&($=s.R8)),w===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&($=s.R8UI),V===s.UNSIGNED_SHORT&&($=s.R16UI),V===s.UNSIGNED_INT&&($=s.R32UI),V===s.BYTE&&($=s.R8I),V===s.SHORT&&($=s.R16I),V===s.INT&&($=s.R32I)),w===s.RG&&(V===s.FLOAT&&($=s.RG32F),V===s.HALF_FLOAT&&($=s.RG16F),V===s.UNSIGNED_BYTE&&($=s.RG8)),w===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&($=s.RG8UI),V===s.UNSIGNED_SHORT&&($=s.RG16UI),V===s.UNSIGNED_INT&&($=s.RG32UI),V===s.BYTE&&($=s.RG8I),V===s.SHORT&&($=s.RG16I),V===s.INT&&($=s.RG32I)),w===s.RGB_INTEGER&&(V===s.UNSIGNED_BYTE&&($=s.RGB8UI),V===s.UNSIGNED_SHORT&&($=s.RGB16UI),V===s.UNSIGNED_INT&&($=s.RGB32UI),V===s.BYTE&&($=s.RGB8I),V===s.SHORT&&($=s.RGB16I),V===s.INT&&($=s.RGB32I)),w===s.RGBA_INTEGER&&(V===s.UNSIGNED_BYTE&&($=s.RGBA8UI),V===s.UNSIGNED_SHORT&&($=s.RGBA16UI),V===s.UNSIGNED_INT&&($=s.RGBA32UI),V===s.BYTE&&($=s.RGBA8I),V===s.SHORT&&($=s.RGBA16I),V===s.INT&&($=s.RGBA32I)),w===s.RGB&&V===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),w===s.RGBA){const Dt=et?ta:jt.getTransfer(Q);V===s.FLOAT&&($=s.RGBA32F),V===s.HALF_FLOAT&&($=s.RGBA16F),V===s.UNSIGNED_BYTE&&($=Dt===le?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function _(I,w){let V;return I?w===null||w===Qn||w===Es?V=s.DEPTH24_STENCIL8:w===Tn?V=s.DEPTH32F_STENCIL8:w===Er&&(V=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Qn||w===Es?V=s.DEPTH_COMPONENT24:w===Tn?V=s.DEPTH_COMPONENT32F:w===Er&&(V=s.DEPTH_COMPONENT16),V}function A(I,w){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Oe&&I.minFilter!==Ne?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function T(I){const w=I.target;w.removeEventListener("dispose",T),R(w),w.isVideoTexture&&h.delete(w)}function E(I){const w=I.target;w.removeEventListener("dispose",E),M(w)}function R(I){const w=n.get(I);if(w.__webglInit===void 0)return;const V=I.source,Q=d.get(V);if(Q){const et=Q[w.__cacheKey];et.usedTimes--,et.usedTimes===0&&S(I),Object.keys(Q).length===0&&d.delete(V)}n.remove(I)}function S(I){const w=n.get(I);s.deleteTexture(w.__webglTexture);const V=I.source,Q=d.get(V);delete Q[w.__cacheKey],o.memory.textures--}function M(I){const w=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(w.__webglFramebuffer[Q]))for(let et=0;et<w.__webglFramebuffer[Q].length;et++)s.deleteFramebuffer(w.__webglFramebuffer[Q][et]);else s.deleteFramebuffer(w.__webglFramebuffer[Q]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[Q])}else{if(Array.isArray(w.__webglFramebuffer))for(let Q=0;Q<w.__webglFramebuffer.length;Q++)s.deleteFramebuffer(w.__webglFramebuffer[Q]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Q=0;Q<w.__webglColorRenderbuffer.length;Q++)w.__webglColorRenderbuffer[Q]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[Q]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const V=I.textures;for(let Q=0,et=V.length;Q<et;Q++){const $=n.get(V[Q]);$.__webglTexture&&(s.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(V[Q])}n.remove(I)}let P=0;function z(){P=0}function D(){const I=P;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),P+=1,I}function F(I){const w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function H(I,w){const V=n.get(I);if(I.isVideoTexture&&bt(I),I.isRenderTargetTexture===!1&&I.version>0&&V.__version!==I.version){const Q=I.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(V,I,w);return}}e.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+w)}function N(I,w){const V=n.get(I);if(I.version>0&&V.__version!==I.version){G(V,I,w);return}e.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+w)}function q(I,w){const V=n.get(I);if(I.version>0&&V.__version!==I.version){G(V,I,w);return}e.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+w)}function k(I,w){const V=n.get(I);if(I.version>0&&V.__version!==I.version){Z(V,I,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+w)}const K={[He]:s.REPEAT,[bn]:s.CLAMP_TO_EDGE,[Ho]:s.MIRRORED_REPEAT},tt={[Oe]:s.NEAREST,[bd]:s.NEAREST_MIPMAP_NEAREST,[pr]:s.NEAREST_MIPMAP_LINEAR,[Ne]:s.LINEAR,[Lo]:s.LINEAR_MIPMAP_NEAREST,[Ln]:s.LINEAR_MIPMAP_LINEAR},rt={[Hp]:s.NEVER,[Yp]:s.ALWAYS,[Vp]:s.LESS,[Fd]:s.LEQUAL,[Gp]:s.EQUAL,[qp]:s.GEQUAL,[Wp]:s.GREATER,[Xp]:s.NOTEQUAL};function St(I,w){if(w.type===Tn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Ne||w.magFilter===Lo||w.magFilter===pr||w.magFilter===Ln||w.minFilter===Ne||w.minFilter===Lo||w.minFilter===pr||w.minFilter===Ln)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,K[w.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,K[w.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,K[w.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,tt[w.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,tt[w.minFilter]),w.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,rt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Oe||w.minFilter!==pr&&w.minFilter!==Ln||w.type===Tn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");s.texParameterf(I,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Mt(I,w){let V=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",T));const Q=w.source;let et=d.get(Q);et===void 0&&(et={},d.set(Q,et));const $=F(w);if($!==I.__cacheKey){et[$]===void 0&&(et[$]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,V=!0),et[$].usedTimes++;const Dt=et[I.__cacheKey];Dt!==void 0&&(et[I.__cacheKey].usedTimes--,Dt.usedTimes===0&&S(w)),I.__cacheKey=$,I.__webglTexture=et[$].texture}return V}function G(I,w,V){let Q=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Q=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Q=s.TEXTURE_3D);const et=Mt(I,w),$=w.source;e.bindTexture(Q,I.__webglTexture,s.TEXTURE0+V);const Dt=n.get($);if($.version!==Dt.__version||et===!0){e.activeTexture(s.TEXTURE0+V);const pt=jt.getPrimaries(jt.workingColorSpace),Tt=w.colorSpace===pn?null:jt.getPrimaries(w.colorSpace),Jt=w.colorSpace===pn||pt===Tt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let ot=v(w.image,!1,i.maxTextureSize);ot=Vt(w,ot);const At=r.convert(w.format,w.colorSpace),Bt=r.convert(w.type);let zt=x(w.internalFormat,At,Bt,w.colorSpace,w.isVideoTexture);St(Q,w);let Et;const Qt=w.mipmaps,qt=w.isVideoTexture!==!0,de=Dt.__version===void 0||et===!0,U=$.dataReady,dt=A(w,ot);if(w.isDepthTexture)zt=_(w.format===Rs,w.type),de&&(qt?e.texStorage2D(s.TEXTURE_2D,1,zt,ot.width,ot.height):e.texImage2D(s.TEXTURE_2D,0,zt,ot.width,ot.height,0,At,Bt,null));else if(w.isDataTexture)if(Qt.length>0){qt&&de&&e.texStorage2D(s.TEXTURE_2D,dt,zt,Qt[0].width,Qt[0].height);for(let Y=0,J=Qt.length;Y<J;Y++)Et=Qt[Y],qt?U&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,Et.width,Et.height,At,Bt,Et.data):e.texImage2D(s.TEXTURE_2D,Y,zt,Et.width,Et.height,0,At,Bt,Et.data);w.generateMipmaps=!1}else qt?(de&&e.texStorage2D(s.TEXTURE_2D,dt,zt,ot.width,ot.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ot.width,ot.height,At,Bt,ot.data)):e.texImage2D(s.TEXTURE_2D,0,zt,ot.width,ot.height,0,At,Bt,ot.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){qt&&de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,zt,Qt[0].width,Qt[0].height,ot.depth);for(let Y=0,J=Qt.length;Y<J;Y++)if(Et=Qt[Y],w.format!==Ve)if(At!==null)if(qt){if(U)if(w.layerUpdates.size>0){const xt=iu(Et.width,Et.height,w.format,w.type);for(const gt of w.layerUpdates){const Gt=Et.data.subarray(gt*xt/Et.data.BYTES_PER_ELEMENT,(gt+1)*xt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,gt,Et.width,Et.height,1,At,Gt)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,Et.width,Et.height,ot.depth,At,Et.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,zt,Et.width,Et.height,ot.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,Et.width,Et.height,ot.depth,At,Bt,Et.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Y,zt,Et.width,Et.height,ot.depth,0,At,Bt,Et.data)}else{qt&&de&&e.texStorage2D(s.TEXTURE_2D,dt,zt,Qt[0].width,Qt[0].height);for(let Y=0,J=Qt.length;Y<J;Y++)Et=Qt[Y],w.format!==Ve?At!==null?qt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,Et.width,Et.height,At,Et.data):e.compressedTexImage2D(s.TEXTURE_2D,Y,zt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?U&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,Et.width,Et.height,At,Bt,Et.data):e.texImage2D(s.TEXTURE_2D,Y,zt,Et.width,Et.height,0,At,Bt,Et.data)}else if(w.isDataArrayTexture)if(qt){if(de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,zt,ot.width,ot.height,ot.depth),U)if(w.layerUpdates.size>0){const Y=iu(ot.width,ot.height,w.format,w.type);for(const J of w.layerUpdates){const xt=ot.data.subarray(J*Y/ot.data.BYTES_PER_ELEMENT,(J+1)*Y/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,J,ot.width,ot.height,1,At,Bt,xt)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,At,Bt,ot.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,zt,ot.width,ot.height,ot.depth,0,At,Bt,ot.data);else if(w.isData3DTexture)qt?(de&&e.texStorage3D(s.TEXTURE_3D,dt,zt,ot.width,ot.height,ot.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,At,Bt,ot.data)):e.texImage3D(s.TEXTURE_3D,0,zt,ot.width,ot.height,ot.depth,0,At,Bt,ot.data);else if(w.isFramebufferTexture){if(de)if(qt)e.texStorage2D(s.TEXTURE_2D,dt,zt,ot.width,ot.height);else{let Y=ot.width,J=ot.height;for(let xt=0;xt<dt;xt++)e.texImage2D(s.TEXTURE_2D,xt,zt,Y,J,0,At,Bt,null),Y>>=1,J>>=1}}else if(Qt.length>0){if(qt&&de){const Y=Ft(Qt[0]);e.texStorage2D(s.TEXTURE_2D,dt,zt,Y.width,Y.height)}for(let Y=0,J=Qt.length;Y<J;Y++)Et=Qt[Y],qt?U&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,At,Bt,Et):e.texImage2D(s.TEXTURE_2D,Y,zt,At,Bt,Et);w.generateMipmaps=!1}else if(qt){if(de){const Y=Ft(ot);e.texStorage2D(s.TEXTURE_2D,dt,zt,Y.width,Y.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,At,Bt,ot)}else e.texImage2D(s.TEXTURE_2D,0,zt,At,Bt,ot);m(w)&&p(Q),Dt.__version=$.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Z(I,w,V){if(w.image.length!==6)return;const Q=Mt(I,w),et=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+V);const $=n.get(et);if(et.version!==$.__version||Q===!0){e.activeTexture(s.TEXTURE0+V);const Dt=jt.getPrimaries(jt.workingColorSpace),pt=w.colorSpace===pn?null:jt.getPrimaries(w.colorSpace),Tt=w.colorSpace===pn||Dt===pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const Jt=w.isCompressedTexture||w.image[0].isCompressedTexture,ot=w.image[0]&&w.image[0].isDataTexture,At=[];for(let J=0;J<6;J++)!Jt&&!ot?At[J]=v(w.image[J],!0,i.maxCubemapSize):At[J]=ot?w.image[J].image:w.image[J],At[J]=Vt(w,At[J]);const Bt=At[0],zt=r.convert(w.format,w.colorSpace),Et=r.convert(w.type),Qt=x(w.internalFormat,zt,Et,w.colorSpace),qt=w.isVideoTexture!==!0,de=$.__version===void 0||Q===!0,U=et.dataReady;let dt=A(w,Bt);St(s.TEXTURE_CUBE_MAP,w);let Y;if(Jt){qt&&de&&e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,Qt,Bt.width,Bt.height);for(let J=0;J<6;J++){Y=At[J].mipmaps;for(let xt=0;xt<Y.length;xt++){const gt=Y[xt];w.format!==Ve?zt!==null?qt?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt,0,0,gt.width,gt.height,zt,gt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt,Qt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt,0,0,gt.width,gt.height,zt,Et,gt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt,Qt,gt.width,gt.height,0,zt,Et,gt.data)}}}else{if(Y=w.mipmaps,qt&&de){Y.length>0&&dt++;const J=Ft(At[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,Qt,J.width,J.height)}for(let J=0;J<6;J++)if(ot){qt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,At[J].width,At[J].height,zt,Et,At[J].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Qt,At[J].width,At[J].height,0,zt,Et,At[J].data);for(let xt=0;xt<Y.length;xt++){const Gt=Y[xt].image[J].image;qt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt+1,0,0,Gt.width,Gt.height,zt,Et,Gt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt+1,Qt,Gt.width,Gt.height,0,zt,Et,Gt.data)}}else{qt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,zt,Et,At[J]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Qt,zt,Et,At[J]);for(let xt=0;xt<Y.length;xt++){const gt=Y[xt];qt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt+1,0,0,zt,Et,gt.image[J]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt+1,Qt,zt,Et,gt.image[J])}}}m(w)&&p(s.TEXTURE_CUBE_MAP),$.__version=et.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function at(I,w,V,Q,et,$){const Dt=r.convert(V.format,V.colorSpace),pt=r.convert(V.type),Tt=x(V.internalFormat,Dt,pt,V.colorSpace),Jt=n.get(w),ot=n.get(V);if(ot.__renderTarget=w,!Jt.__hasExternalTextures){const At=Math.max(1,w.width>>$),Bt=Math.max(1,w.height>>$);et===s.TEXTURE_3D||et===s.TEXTURE_2D_ARRAY?e.texImage3D(et,$,Tt,At,Bt,w.depth,0,Dt,pt,null):e.texImage2D(et,$,Tt,At,Bt,0,Dt,pt,null)}e.bindFramebuffer(s.FRAMEBUFFER,I),Ot(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,et,ot.__webglTexture,0,Rt(w)):(et===s.TEXTURE_2D||et>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Q,et,ot.__webglTexture,$),e.bindFramebuffer(s.FRAMEBUFFER,null)}function lt(I,w,V){if(s.bindRenderbuffer(s.RENDERBUFFER,I),w.depthBuffer){const Q=w.depthTexture,et=Q&&Q.isDepthTexture?Q.type:null,$=_(w.stencilBuffer,et),Dt=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pt=Rt(w);Ot(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,pt,$,w.width,w.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,pt,$,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,$,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Dt,s.RENDERBUFFER,I)}else{const Q=w.textures;for(let et=0;et<Q.length;et++){const $=Q[et],Dt=r.convert($.format,$.colorSpace),pt=r.convert($.type),Tt=x($.internalFormat,Dt,pt,$.colorSpace),Jt=Rt(w);V&&Ot(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Jt,Tt,w.width,w.height):Ot(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Jt,Tt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,Tt,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function wt(I,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(w.depthTexture);Q.__renderTarget=w,(!Q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),H(w.depthTexture,0);const et=Q.__webglTexture,$=Rt(w);if(w.depthTexture.format===vs)Ot(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,et,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,et,0);else if(w.depthTexture.format===Rs)Ot(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,et,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function Lt(I){const w=n.get(I),V=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){const Q=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Q){const et=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Q.removeEventListener("dispose",et)};Q.addEventListener("dispose",et),w.__depthDisposeCallback=et}w.__boundDepthTexture=Q}if(I.depthTexture&&!w.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");wt(w.__webglFramebuffer,I)}else if(V){w.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[Q]),w.__webglDepthbuffer[Q]===void 0)w.__webglDepthbuffer[Q]=s.createRenderbuffer(),lt(w.__webglDepthbuffer[Q],I,!1);else{const et=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=w.__webglDepthbuffer[Q];s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,et,s.RENDERBUFFER,$)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),lt(w.__webglDepthbuffer,I,!1);else{const Q=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,et=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,et),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,et)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function nt(I,w,V){const Q=n.get(I);w!==void 0&&at(Q.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&Lt(I)}function yt(I){const w=I.texture,V=n.get(I),Q=n.get(w);I.addEventListener("dispose",E);const et=I.textures,$=I.isWebGLCubeRenderTarget===!0,Dt=et.length>1;if(Dt||(Q.__webglTexture===void 0&&(Q.__webglTexture=s.createTexture()),Q.__version=w.version,o.memory.textures++),$){V.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer[pt]=[];for(let Tt=0;Tt<w.mipmaps.length;Tt++)V.__webglFramebuffer[pt][Tt]=s.createFramebuffer()}else V.__webglFramebuffer[pt]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer=[];for(let pt=0;pt<w.mipmaps.length;pt++)V.__webglFramebuffer[pt]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(Dt)for(let pt=0,Tt=et.length;pt<Tt;pt++){const Jt=n.get(et[pt]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&Ot(I)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let pt=0;pt<et.length;pt++){const Tt=et[pt];V.__webglColorRenderbuffer[pt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[pt]);const Jt=r.convert(Tt.format,Tt.colorSpace),ot=r.convert(Tt.type),At=x(Tt.internalFormat,Jt,ot,Tt.colorSpace,I.isXRRenderTarget===!0),Bt=Rt(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Bt,At,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,V.__webglColorRenderbuffer[pt])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),lt(V.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if($){e.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),St(s.TEXTURE_CUBE_MAP,w);for(let pt=0;pt<6;pt++)if(w.mipmaps&&w.mipmaps.length>0)for(let Tt=0;Tt<w.mipmaps.length;Tt++)at(V.__webglFramebuffer[pt][Tt],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Tt);else at(V.__webglFramebuffer[pt],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(w)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let pt=0,Tt=et.length;pt<Tt;pt++){const Jt=et[pt],ot=n.get(Jt);e.bindTexture(s.TEXTURE_2D,ot.__webglTexture),St(s.TEXTURE_2D,Jt),at(V.__webglFramebuffer,I,Jt,s.COLOR_ATTACHMENT0+pt,s.TEXTURE_2D,0),m(Jt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let pt=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(pt=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(pt,Q.__webglTexture),St(pt,w),w.mipmaps&&w.mipmaps.length>0)for(let Tt=0;Tt<w.mipmaps.length;Tt++)at(V.__webglFramebuffer[Tt],I,w,s.COLOR_ATTACHMENT0,pt,Tt);else at(V.__webglFramebuffer,I,w,s.COLOR_ATTACHMENT0,pt,0);m(w)&&p(pt),e.unbindTexture()}I.depthBuffer&&Lt(I)}function ut(I){const w=I.textures;for(let V=0,Q=w.length;V<Q;V++){const et=w[V];if(m(et)){const $=y(I),Dt=n.get(et).__webglTexture;e.bindTexture($,Dt),p($),e.unbindTexture()}}}const j=[],L=[];function mt(I){if(I.samples>0){if(Ot(I)===!1){const w=I.textures,V=I.width,Q=I.height;let et=s.COLOR_BUFFER_BIT;const $=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Dt=n.get(I),pt=w.length>1;if(pt)for(let Tt=0;Tt<w.length;Tt++)e.bindFramebuffer(s.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Dt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Tt=0;Tt<w.length;Tt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(et|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(et|=s.STENCIL_BUFFER_BIT)),pt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Dt.__webglColorRenderbuffer[Tt]);const Jt=n.get(w[Tt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Jt,0)}s.blitFramebuffer(0,0,V,Q,0,0,V,Q,et,s.NEAREST),l===!0&&(j.length=0,L.length=0,j.push(s.COLOR_ATTACHMENT0+Tt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(j.push($),L.push($),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,L)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,j))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pt)for(let Tt=0;Tt<w.length;Tt++){e.bindFramebuffer(s.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.RENDERBUFFER,Dt.__webglColorRenderbuffer[Tt]);const Jt=n.get(w[Tt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Dt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.TEXTURE_2D,Jt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const w=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function Rt(I){return Math.min(i.maxSamples,I.samples)}function Ot(I){const w=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function bt(I){const w=o.render.frame;h.get(I)!==w&&(h.set(I,w),I.update())}function Vt(I,w){const V=I.colorSpace,Q=I.format,et=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||V!==$e&&V!==pn&&(jt.getTransfer(V)===le?(Q!==Ve||et!==ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),w}function Ft(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=z,this.setTexture2D=H,this.setTexture2DArray=N,this.setTexture3D=q,this.setTextureCube=k,this.rebindTextures=nt,this.setupRenderTarget=yt,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=Ot}function hx(s,t){function e(n,i=pn){let r;const o=jt.getTransfer(i);if(n===ln)return s.UNSIGNED_BYTE;if(n===Ac)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ec)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ed)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Td)return s.BYTE;if(n===Ad)return s.SHORT;if(n===Er)return s.UNSIGNED_SHORT;if(n===Tc)return s.INT;if(n===Qn)return s.UNSIGNED_INT;if(n===Tn)return s.FLOAT;if(n===Yn)return s.HALF_FLOAT;if(n===Rd)return s.ALPHA;if(n===Cd)return s.RGB;if(n===Ve)return s.RGBA;if(n===Pd)return s.LUMINANCE;if(n===Id)return s.LUMINANCE_ALPHA;if(n===vs)return s.DEPTH_COMPONENT;if(n===Rs)return s.DEPTH_STENCIL;if(n===Rc)return s.RED;if(n===zr)return s.RED_INTEGER;if(n===Ld)return s.RG;if(n===Cc)return s.RG_INTEGER;if(n===Pc)return s.RGBA_INTEGER;if(n===Do||n===No||n===Uo||n===Fo)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Do)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Do)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===El||n===Rl||n===Cl||n===Pl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===El)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Rl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Cl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Pl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Il||n===Ll||n===Dl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Il||n===Ll)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Dl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Nl||n===Ul||n===Fl||n===Ol||n===Bl||n===kl||n===zl||n===Hl||n===Vl||n===Gl||n===Wl||n===Xl||n===ql||n===Yl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Nl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ul)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ol)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Bl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===kl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===zl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Hl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Vl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Gl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ql)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Yl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Oo||n===Kl||n===$l)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Oo)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Kl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$l)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dd||n===jl||n===Zl||n===Ql)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Oo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===jl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ql)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Es?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class ux extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ue extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dx={type:"move"};class Ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dx)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ue;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const fx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,px=`
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

}`;class mx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Re,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ue({vertexShader:fx,fragmentShader:px,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new st(new Ze(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gx extends Vi{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=new mx,m=e.getContextAttributes();let p=null,y=null;const x=[],_=[],A=new it;let T=null;const E=new qe;E.viewport=new Zt;const R=new qe;R.viewport=new Zt;const S=[E,R],M=new ux;let P=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let Z=x[G];return Z===void 0&&(Z=new Ha,x[G]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(G){let Z=x[G];return Z===void 0&&(Z=new Ha,x[G]=Z),Z.getGripSpace()},this.getHand=function(G){let Z=x[G];return Z===void 0&&(Z=new Ha,x[G]=Z),Z.getHandSpace()};function D(G){const Z=_.indexOf(G.inputSource);if(Z===-1)return;const at=x[Z];at!==void 0&&(at.update(G.inputSource,G.frame,c||o),at.dispatchEvent({type:G.type,data:G.inputSource}))}function F(){i.removeEventListener("select",D),i.removeEventListener("selectstart",D),i.removeEventListener("selectend",D),i.removeEventListener("squeeze",D),i.removeEventListener("squeezestart",D),i.removeEventListener("squeezeend",D),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",H);for(let G=0;G<x.length;G++){const Z=_[G];Z!==null&&(_[G]=null,x[G].disconnect(Z))}P=null,z=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,y=null,Mt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(G){if(i=G,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",D),i.addEventListener("selectstart",D),i.addEventListener("selectend",D),i.addEventListener("squeeze",D),i.addEventListener("squeezestart",D),i.addEventListener("squeezeend",D),i.addEventListener("end",F),i.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(A),i.renderState.layers===void 0){const Z={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,Z),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Rn(f.framebufferWidth,f.framebufferHeight,{format:Ve,type:ln,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Z=null,at=null,lt=null;m.depth&&(lt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=m.stencil?Rs:vs,at=m.stencil?Es:Qn);const wt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(wt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Rn(d.textureWidth,d.textureHeight,{format:Ve,type:ln,depthTexture:new Kd(d.textureWidth,d.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Mt.setContext(i),Mt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function H(G){for(let Z=0;Z<G.removed.length;Z++){const at=G.removed[Z],lt=_.indexOf(at);lt>=0&&(_[lt]=null,x[lt].disconnect(at))}for(let Z=0;Z<G.added.length;Z++){const at=G.added[Z];let lt=_.indexOf(at);if(lt===-1){for(let Lt=0;Lt<x.length;Lt++)if(Lt>=_.length){_.push(at),lt=Lt;break}else if(_[Lt]===null){_[Lt]=at,lt=Lt;break}if(lt===-1)break}const wt=x[lt];wt&&wt.connect(at)}}const N=new C,q=new C;function k(G,Z,at){N.setFromMatrixPosition(Z.matrixWorld),q.setFromMatrixPosition(at.matrixWorld);const lt=N.distanceTo(q),wt=Z.projectionMatrix.elements,Lt=at.projectionMatrix.elements,nt=wt[14]/(wt[10]-1),yt=wt[14]/(wt[10]+1),ut=(wt[9]+1)/wt[5],j=(wt[9]-1)/wt[5],L=(wt[8]-1)/wt[0],mt=(Lt[8]+1)/Lt[0],Rt=nt*L,Ot=nt*mt,bt=lt/(-L+mt),Vt=bt*-L;if(Z.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Vt),G.translateZ(bt),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),wt[10]===-1)G.projectionMatrix.copy(Z.projectionMatrix),G.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Ft=nt+bt,I=yt+bt,w=Rt-Vt,V=Ot+(lt-Vt),Q=ut*yt/I*Ft,et=j*yt/I*Ft;G.projectionMatrix.makePerspective(w,V,Q,et,Ft,I),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function K(G,Z){Z===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(Z.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(i===null)return;let Z=G.near,at=G.far;v.texture!==null&&(v.depthNear>0&&(Z=v.depthNear),v.depthFar>0&&(at=v.depthFar)),M.near=R.near=E.near=Z,M.far=R.far=E.far=at,(P!==M.near||z!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,z=M.far),E.layers.mask=G.layers.mask|2,R.layers.mask=G.layers.mask|4,M.layers.mask=E.layers.mask|R.layers.mask;const lt=G.parent,wt=M.cameras;K(M,lt);for(let Lt=0;Lt<wt.length;Lt++)K(wt[Lt],lt);wt.length===2?k(M,E,R):M.projectionMatrix.copy(E.projectionMatrix),tt(G,M,lt)};function tt(G,Z,at){at===null?G.matrix.copy(Z.matrixWorld):(G.matrix.copy(at.matrixWorld),G.matrix.invert(),G.matrix.multiply(Z.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(Z.projectionMatrix),G.projectionMatrixInverse.copy(Z.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Cs*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=G)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let rt=null;function St(G,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){const at=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let lt=!1;at.length!==M.cameras.length&&(M.cameras.length=0,lt=!0);for(let Lt=0;Lt<at.length;Lt++){const nt=at[Lt];let yt=null;if(f!==null)yt=f.getViewport(nt);else{const j=u.getViewSubImage(d,nt);yt=j.viewport,Lt===0&&(t.setRenderTargetTextures(y,j.colorTexture,d.ignoreDepthValues?void 0:j.depthStencilTexture),t.setRenderTarget(y))}let ut=S[Lt];ut===void 0&&(ut=new qe,ut.layers.enable(Lt),ut.viewport=new Zt,S[Lt]=ut),ut.matrix.fromArray(nt.transform.matrix),ut.matrix.decompose(ut.position,ut.quaternion,ut.scale),ut.projectionMatrix.fromArray(nt.projectionMatrix),ut.projectionMatrixInverse.copy(ut.projectionMatrix).invert(),ut.viewport.set(yt.x,yt.y,yt.width,yt.height),Lt===0&&(M.matrix.copy(ut.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),lt===!0&&M.cameras.push(ut)}const wt=i.enabledFeatures;if(wt&&wt.includes("depth-sensing")){const Lt=u.getDepthInformation(at[0]);Lt&&Lt.isValid&&Lt.texture&&v.init(t,Lt,i.renderState)}}for(let at=0;at<x.length;at++){const lt=_[at],wt=x[at];lt!==null&&wt!==void 0&&wt.update(lt,Z,c||o)}rt&&rt(G,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Mt=new Yd;Mt.setAnimationLoop(St),this.setAnimationLoop=function(G){rt=G},this.dispose=function(){}}}const Pi=new vn,vx=new kt;function _x(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Wd(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,y,x,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ke&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ke&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),x=y.envMap,_=y.envMapRotation;x&&(m.envMap.value=x,Pi.copy(_),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),m.envMapRotation.value.setFromMatrix4(vx.makeRotationFromEuler(Pi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ke&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function xx(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const _=x.program;n.uniformBlockBinding(y,_)}function c(y,x){let _=i[y.id];_===void 0&&(g(y),_=h(y),i[y.id]=_,y.addEventListener("dispose",m));const A=x.program;n.updateUBOMapping(y,A);const T=t.render.frame;r[y.id]!==T&&(d(y),r[y.id]=T)}function h(y){const x=u();y.__bindingPointIndex=x;const _=s.createBuffer(),A=y.__size,T=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,A,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,_),_}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=i[y.id],_=y.uniforms,A=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let T=0,E=_.length;T<E;T++){const R=Array.isArray(_[T])?_[T]:[_[T]];for(let S=0,M=R.length;S<M;S++){const P=R[S];if(f(P,T,S,A)===!0){const z=P.__offset,D=Array.isArray(P.value)?P.value:[P.value];let F=0;for(let H=0;H<D.length;H++){const N=D[H],q=v(N);typeof N=="number"||typeof N=="boolean"?(P.__data[0]=N,s.bufferSubData(s.UNIFORM_BUFFER,z+F,P.__data)):N.isMatrix3?(P.__data[0]=N.elements[0],P.__data[1]=N.elements[1],P.__data[2]=N.elements[2],P.__data[3]=0,P.__data[4]=N.elements[3],P.__data[5]=N.elements[4],P.__data[6]=N.elements[5],P.__data[7]=0,P.__data[8]=N.elements[6],P.__data[9]=N.elements[7],P.__data[10]=N.elements[8],P.__data[11]=0):(N.toArray(P.__data,F),F+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,x,_,A){const T=y.value,E=x+"_"+_;if(A[E]===void 0)return typeof T=="number"||typeof T=="boolean"?A[E]=T:A[E]=T.clone(),!0;{const R=A[E];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return A[E]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(y){const x=y.uniforms;let _=0;const A=16;for(let E=0,R=x.length;E<R;E++){const S=Array.isArray(x[E])?x[E]:[x[E]];for(let M=0,P=S.length;M<P;M++){const z=S[M],D=Array.isArray(z.value)?z.value:[z.value];for(let F=0,H=D.length;F<H;F++){const N=D[F],q=v(N),k=_%A,K=k%q.boundary,tt=k+K;_+=K,tt!==0&&A-tt<q.storage&&(_+=A-tt),z.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=q.storage}}}const T=_%A;return T>0&&(_+=A-T),y.__size=_,y.__cache={},this}function v(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function m(y){const x=y.target;x.removeEventListener("dispose",m);const _=o.indexOf(x.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(const y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class yx{constructor(t={}){const{canvas:e=hm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const y=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ae,this.toneMapping=vi,this.toneMappingExposure=1;const _=this;let A=!1,T=0,E=0,R=null,S=-1,M=null;const P=new Zt,z=new Zt;let D=null;const F=new ft(0);let H=0,N=e.width,q=e.height,k=1,K=null,tt=null;const rt=new Zt(0,0,N,q),St=new Zt(0,0,N,q);let Mt=!1;const G=new Nc;let Z=!1,at=!1;const lt=new kt,wt=new kt,Lt=new C,nt=new Zt,yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function j(){return R===null?k:1}let L=n;function mt(b,O){return e.getContext(b,O)}try{const b={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sc}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),L===null){const O="webgl2";if(L=mt(O,b),L===null)throw mt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Rt,Ot,bt,Vt,Ft,I,w,V,Q,et,$,Dt,pt,Tt,Jt,ot,At,Bt,zt,Et,Qt,qt,de,U;function dt(){Rt=new Av(L),Rt.init(),qt=new hx(L,Rt),Ot=new yv(L,Rt,t,qt),bt=new ax(L,Rt),Ot.reverseDepthBuffer&&d&&bt.buffers.depth.setReversed(!0),Vt=new Cv(L),Ft=new Y_,I=new cx(L,Rt,bt,Ft,Ot,qt,Vt),w=new Sv(_),V=new Tv(_),Q=new Fm(L),de=new _v(L,Q),et=new Ev(L,Q,Vt,de),$=new Iv(L,et,Q,Vt),zt=new Pv(L,Ot,I),ot=new Mv(Ft),Dt=new q_(_,w,V,Rt,Ot,de,ot),pt=new _x(_,Ft),Tt=new $_,Jt=new ex(Rt),Bt=new vv(_,w,V,bt,$,f,l),At=new rx(_,$,Ot),U=new xx(L,Vt,Ot,bt),Et=new xv(L,Rt,Vt),Qt=new Rv(L,Rt,Vt),Vt.programs=Dt.programs,_.capabilities=Ot,_.extensions=Rt,_.properties=Ft,_.renderLists=Tt,_.shadowMap=At,_.state=bt,_.info=Vt}dt();const Y=new gx(_,L);this.xr=Y,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Rt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Rt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(b){b!==void 0&&(k=b,this.setSize(N,q,!1))},this.getSize=function(b){return b.set(N,q)},this.setSize=function(b,O,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=b,q=O,e.width=Math.floor(b*k),e.height=Math.floor(O*k),W===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(N*k,q*k).floor()},this.setDrawingBufferSize=function(b,O,W){N=b,q=O,k=W,e.width=Math.floor(b*W),e.height=Math.floor(O*W),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(rt)},this.setViewport=function(b,O,W,X){b.isVector4?rt.set(b.x,b.y,b.z,b.w):rt.set(b,O,W,X),bt.viewport(P.copy(rt).multiplyScalar(k).round())},this.getScissor=function(b){return b.copy(St)},this.setScissor=function(b,O,W,X){b.isVector4?St.set(b.x,b.y,b.z,b.w):St.set(b,O,W,X),bt.scissor(z.copy(St).multiplyScalar(k).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(b){bt.setScissorTest(Mt=b)},this.setOpaqueSort=function(b){K=b},this.setTransparentSort=function(b){tt=b},this.getClearColor=function(b){return b.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor.apply(Bt,arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha.apply(Bt,arguments)},this.clear=function(b=!0,O=!0,W=!0){let X=0;if(b){let B=!1;if(R!==null){const ct=R.texture.format;B=ct===Pc||ct===Cc||ct===zr}if(B){const ct=R.texture.type,vt=ct===ln||ct===Qn||ct===Er||ct===Es||ct===Ac||ct===Ec,Ct=Bt.getClearColor(),Pt=Bt.getClearAlpha(),Ht=Ct.r,Wt=Ct.g,It=Ct.b;vt?(g[0]=Ht,g[1]=Wt,g[2]=It,g[3]=Pt,L.clearBufferuiv(L.COLOR,0,g)):(v[0]=Ht,v[1]=Wt,v[2]=It,v[3]=Pt,L.clearBufferiv(L.COLOR,0,v))}else X|=L.COLOR_BUFFER_BIT}O&&(X|=L.DEPTH_BUFFER_BIT),W&&(X|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Tt.dispose(),Jt.dispose(),Ft.dispose(),w.dispose(),V.dispose(),$.dispose(),de.dispose(),U.dispose(),Dt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",th),Y.removeEventListener("sessionend",eh),bi.stop()};function J(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const b=Vt.autoReset,O=At.enabled,W=At.autoUpdate,X=At.needsUpdate,B=At.type;dt(),Vt.autoReset=b,At.enabled=O,At.autoUpdate=W,At.needsUpdate=X,At.type=B}function gt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Gt(b){const O=b.target;O.removeEventListener("dispose",Gt),Se(O)}function Se(b){Be(b),Ft.remove(b)}function Be(b){const O=Ft.get(b).programs;O!==void 0&&(O.forEach(function(W){Dt.releaseProgram(W)}),b.isShaderMaterial&&Dt.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,W,X,B,ct){O===null&&(O=yt);const vt=B.isMesh&&B.matrixWorld.determinant()<0,Ct=ap(b,O,W,X,B);bt.setMaterial(X,vt);let Pt=W.index,Ht=1;if(X.wireframe===!0){if(Pt=et.getWireframeAttribute(W),Pt===void 0)return;Ht=2}const Wt=W.drawRange,It=W.attributes.position;let ee=Wt.start*Ht,fe=(Wt.start+Wt.count)*Ht;ct!==null&&(ee=Math.max(ee,ct.start*Ht),fe=Math.min(fe,(ct.start+ct.count)*Ht)),Pt!==null?(ee=Math.max(ee,0),fe=Math.min(fe,Pt.count)):It!=null&&(ee=Math.max(ee,0),fe=Math.min(fe,It.count));const pe=fe-ee;if(pe<0||pe===1/0)return;de.setup(B,X,Ct,W,Pt);let je,ne=Et;if(Pt!==null&&(je=Q.get(Pt),ne=Qt,ne.setIndex(je)),B.isMesh)X.wireframe===!0?(bt.setLineWidth(X.wireframeLinewidth*j()),ne.setMode(L.LINES)):ne.setMode(L.TRIANGLES);else if(B.isLine){let Nt=X.linewidth;Nt===void 0&&(Nt=1),bt.setLineWidth(Nt*j()),B.isLineSegments?ne.setMode(L.LINES):B.isLineLoop?ne.setMode(L.LINE_LOOP):ne.setMode(L.LINE_STRIP)}else B.isPoints?ne.setMode(L.POINTS):B.isSprite&&ne.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ne.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Rt.get("WEBGL_multi_draw"))ne.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Nt=B._multiDrawStarts,Fn=B._multiDrawCounts,ie=B._multiDrawCount,xn=Pt?Q.get(Pt).bytesPerElement:1,Wi=Ft.get(X).currentProgram.getUniforms();for(let tn=0;tn<ie;tn++)Wi.setValue(L,"_gl_DrawID",tn),ne.render(Nt[tn]/xn,Fn[tn])}else if(B.isInstancedMesh)ne.renderInstances(ee,pe,B.count);else if(W.isInstancedBufferGeometry){const Nt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Fn=Math.min(W.instanceCount,Nt);ne.renderInstances(ee,pe,Fn)}else ne.render(ee,pe)};function ae(b,O,W){b.transparent===!0&&b.side===fn&&b.forceSinglePass===!1?(b.side=Ke,b.needsUpdate=!0,Wr(b,O,W),b.side=Zn,b.needsUpdate=!0,Wr(b,O,W),b.side=fn):Wr(b,O,W)}this.compile=function(b,O,W=null){W===null&&(W=b),p=Jt.get(W),p.init(O),x.push(p),W.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),b!==W&&b.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const X=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ct=B.material;if(ct)if(Array.isArray(ct))for(let vt=0;vt<ct.length;vt++){const Ct=ct[vt];ae(Ct,W,B),X.add(Ct)}else ae(ct,W,B),X.add(ct)}),x.pop(),p=null,X},this.compileAsync=function(b,O,W=null){const X=this.compile(b,O,W);return new Promise(B=>{function ct(){if(X.forEach(function(vt){Ft.get(vt).currentProgram.isReady()&&X.delete(vt)}),X.size===0){B(b);return}setTimeout(ct,10)}Rt.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let _n=null;function Un(b){_n&&_n(b)}function th(){bi.stop()}function eh(){bi.start()}const bi=new Yd;bi.setAnimationLoop(Un),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(b){_n=b,Y.setAnimationLoop(b),b===null?bi.stop():bi.start()},Y.addEventListener("sessionstart",th),Y.addEventListener("sessionend",eh),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(O),O=Y.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,O,R),p=Jt.get(b,x.length),p.init(O),x.push(p),wt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),G.setFromProjectionMatrix(wt),at=this.localClippingEnabled,Z=ot.init(this.clippingPlanes,at),m=Tt.get(b,y.length),m.init(),y.push(m),Y.enabled===!0&&Y.isPresenting===!0){const ct=_.xr.getDepthSensingMesh();ct!==null&&fa(ct,O,-1/0,_.sortObjects)}fa(b,O,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(K,tt),ut=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,ut&&Bt.addToRenderList(m,b),this.info.render.frame++,Z===!0&&ot.beginShadows();const W=p.state.shadowsArray;At.render(W,b,O),Z===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,B=m.transmissive;if(p.setupLights(),O.isArrayCamera){const ct=O.cameras;if(B.length>0)for(let vt=0,Ct=ct.length;vt<Ct;vt++){const Pt=ct[vt];ih(X,B,b,Pt)}ut&&Bt.render(b);for(let vt=0,Ct=ct.length;vt<Ct;vt++){const Pt=ct[vt];nh(m,b,Pt,Pt.viewport)}}else B.length>0&&ih(X,B,b,O),ut&&Bt.render(b),nh(m,b,O);R!==null&&(I.updateMultisampleRenderTarget(R),I.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(_,b,O),de.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(p=x[x.length-1],Z===!0&&ot.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function fa(b,O,W,X){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||G.intersectsSprite(b)){X&&nt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(wt);const vt=$.update(b),Ct=b.material;Ct.visible&&m.push(b,vt,Ct,W,nt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||G.intersectsObject(b))){const vt=$.update(b),Ct=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),nt.copy(b.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),nt.copy(vt.boundingSphere.center)),nt.applyMatrix4(b.matrixWorld).applyMatrix4(wt)),Array.isArray(Ct)){const Pt=vt.groups;for(let Ht=0,Wt=Pt.length;Ht<Wt;Ht++){const It=Pt[Ht],ee=Ct[It.materialIndex];ee&&ee.visible&&m.push(b,vt,ee,W,nt.z,It)}}else Ct.visible&&m.push(b,vt,Ct,W,nt.z,null)}}const ct=b.children;for(let vt=0,Ct=ct.length;vt<Ct;vt++)fa(ct[vt],O,W,X)}function nh(b,O,W,X){const B=b.opaque,ct=b.transmissive,vt=b.transparent;p.setupLightsView(W),Z===!0&&ot.setGlobalState(_.clippingPlanes,W),X&&bt.viewport(P.copy(X)),B.length>0&&Gr(B,O,W),ct.length>0&&Gr(ct,O,W),vt.length>0&&Gr(vt,O,W),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function ih(b,O,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new Rn(1,1,{generateMipmaps:!0,type:Rt.has("EXT_color_buffer_half_float")||Rt.has("EXT_color_buffer_float")?Yn:ln,minFilter:Ln,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const ct=p.state.transmissionRenderTarget[X.id],vt=X.viewport||P;ct.setSize(vt.z,vt.w);const Ct=_.getRenderTarget();_.setRenderTarget(ct),_.getClearColor(F),H=_.getClearAlpha(),H<1&&_.setClearColor(16777215,.5),_.clear(),ut&&Bt.render(W);const Pt=_.toneMapping;_.toneMapping=vi;const Ht=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),Z===!0&&ot.setGlobalState(_.clippingPlanes,X),Gr(b,W,X),I.updateMultisampleRenderTarget(ct),I.updateRenderTargetMipmap(ct),Rt.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let It=0,ee=O.length;It<ee;It++){const fe=O[It],pe=fe.object,je=fe.geometry,ne=fe.material,Nt=fe.group;if(ne.side===fn&&pe.layers.test(X.layers)){const Fn=ne.side;ne.side=Ke,ne.needsUpdate=!0,sh(pe,W,X,je,ne,Nt),ne.side=Fn,ne.needsUpdate=!0,Wt=!0}}Wt===!0&&(I.updateMultisampleRenderTarget(ct),I.updateRenderTargetMipmap(ct))}_.setRenderTarget(Ct),_.setClearColor(F,H),Ht!==void 0&&(X.viewport=Ht),_.toneMapping=Pt}function Gr(b,O,W){const X=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ct=b.length;B<ct;B++){const vt=b[B],Ct=vt.object,Pt=vt.geometry,Ht=X===null?vt.material:X,Wt=vt.group;Ct.layers.test(W.layers)&&sh(Ct,O,W,Pt,Ht,Wt)}}function sh(b,O,W,X,B,ct){b.onBeforeRender(_,O,W,X,B,ct),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(_,O,W,X,b,ct),B.transparent===!0&&B.side===fn&&B.forceSinglePass===!1?(B.side=Ke,B.needsUpdate=!0,_.renderBufferDirect(W,O,X,B,b,ct),B.side=Zn,B.needsUpdate=!0,_.renderBufferDirect(W,O,X,B,b,ct),B.side=fn):_.renderBufferDirect(W,O,X,B,b,ct),b.onAfterRender(_,O,W,X,B,ct)}function Wr(b,O,W){O.isScene!==!0&&(O=yt);const X=Ft.get(b),B=p.state.lights,ct=p.state.shadowsArray,vt=B.state.version,Ct=Dt.getParameters(b,B.state,ct,O,W),Pt=Dt.getProgramCacheKey(Ct);let Ht=X.programs;X.environment=b.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(b.isMeshStandardMaterial?V:w).get(b.envMap||X.environment),X.envMapRotation=X.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Ht===void 0&&(b.addEventListener("dispose",Gt),Ht=new Map,X.programs=Ht);let Wt=Ht.get(Pt);if(Wt!==void 0){if(X.currentProgram===Wt&&X.lightsStateVersion===vt)return oh(b,Ct),Wt}else Ct.uniforms=Dt.getUniforms(b),b.onBeforeCompile(Ct,_),Wt=Dt.acquireProgram(Ct,Pt),Ht.set(Pt,Wt),X.uniforms=Ct.uniforms;const It=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(It.clippingPlanes=ot.uniform),oh(b,Ct),X.needsLights=cp(b),X.lightsStateVersion=vt,X.needsLights&&(It.ambientLightColor.value=B.state.ambient,It.lightProbe.value=B.state.probe,It.directionalLights.value=B.state.directional,It.directionalLightShadows.value=B.state.directionalShadow,It.spotLights.value=B.state.spot,It.spotLightShadows.value=B.state.spotShadow,It.rectAreaLights.value=B.state.rectArea,It.ltc_1.value=B.state.rectAreaLTC1,It.ltc_2.value=B.state.rectAreaLTC2,It.pointLights.value=B.state.point,It.pointLightShadows.value=B.state.pointShadow,It.hemisphereLights.value=B.state.hemi,It.directionalShadowMap.value=B.state.directionalShadowMap,It.directionalShadowMatrix.value=B.state.directionalShadowMatrix,It.spotShadowMap.value=B.state.spotShadowMap,It.spotLightMatrix.value=B.state.spotLightMatrix,It.spotLightMap.value=B.state.spotLightMap,It.pointShadowMap.value=B.state.pointShadowMap,It.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=Wt,X.uniformsList=null,Wt}function rh(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=Bo.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function oh(b,O){const W=Ft.get(b);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function ap(b,O,W,X,B){O.isScene!==!0&&(O=yt),I.resetTextureUnits();const ct=O.fog,vt=X.isMeshStandardMaterial?O.environment:null,Ct=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:$e,Pt=(X.isMeshStandardMaterial?V:w).get(X.envMap||vt),Ht=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Wt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),It=!!W.morphAttributes.position,ee=!!W.morphAttributes.normal,fe=!!W.morphAttributes.color;let pe=vi;X.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(pe=_.toneMapping);const je=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ne=je!==void 0?je.length:0,Nt=Ft.get(X),Fn=p.state.lights;if(Z===!0&&(at===!0||b!==M)){const cn=b===M&&X.id===S;ot.setState(X,b,cn)}let ie=!1;X.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==Fn.state.version||Nt.outputColorSpace!==Ct||B.isBatchedMesh&&Nt.batching===!1||!B.isBatchedMesh&&Nt.batching===!0||B.isBatchedMesh&&Nt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Nt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Nt.instancing===!1||!B.isInstancedMesh&&Nt.instancing===!0||B.isSkinnedMesh&&Nt.skinning===!1||!B.isSkinnedMesh&&Nt.skinning===!0||B.isInstancedMesh&&Nt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Nt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Nt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Nt.instancingMorph===!1&&B.morphTexture!==null||Nt.envMap!==Pt||X.fog===!0&&Nt.fog!==ct||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==ot.numPlanes||Nt.numIntersection!==ot.numIntersection)||Nt.vertexAlphas!==Ht||Nt.vertexTangents!==Wt||Nt.morphTargets!==It||Nt.morphNormals!==ee||Nt.morphColors!==fe||Nt.toneMapping!==pe||Nt.morphTargetsCount!==ne)&&(ie=!0):(ie=!0,Nt.__version=X.version);let xn=Nt.currentProgram;ie===!0&&(xn=Wr(X,O,B));let Wi=!1,tn=!1,Ks=!1;const me=xn.getUniforms(),Pn=Nt.uniforms;if(bt.useProgram(xn.program)&&(Wi=!0,tn=!0,Ks=!0),X.id!==S&&(S=X.id,tn=!0),Wi||M!==b){bt.buffers.depth.getReversed()?(lt.copy(b.projectionMatrix),dm(lt),fm(lt),me.setValue(L,"projectionMatrix",lt)):me.setValue(L,"projectionMatrix",b.projectionMatrix),me.setValue(L,"viewMatrix",b.matrixWorldInverse);const ti=me.map.cameraPosition;ti!==void 0&&ti.setValue(L,Lt.setFromMatrixPosition(b.matrixWorld)),Ot.logarithmicDepthBuffer&&me.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&me.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,tn=!0,Ks=!0)}if(B.isSkinnedMesh){me.setOptional(L,B,"bindMatrix"),me.setOptional(L,B,"bindMatrixInverse");const cn=B.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),me.setValue(L,"boneTexture",cn.boneTexture,I))}B.isBatchedMesh&&(me.setOptional(L,B,"batchingTexture"),me.setValue(L,"batchingTexture",B._matricesTexture,I),me.setOptional(L,B,"batchingIdTexture"),me.setValue(L,"batchingIdTexture",B._indirectTexture,I),me.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&me.setValue(L,"batchingColorTexture",B._colorsTexture,I));const $s=W.morphAttributes;if(($s.position!==void 0||$s.normal!==void 0||$s.color!==void 0)&&zt.update(B,W,xn),(tn||Nt.receiveShadow!==B.receiveShadow)&&(Nt.receiveShadow=B.receiveShadow,me.setValue(L,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Pn.envMap.value=Pt,Pn.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(Pn.envMapIntensity.value=O.environmentIntensity),tn&&(me.setValue(L,"toneMappingExposure",_.toneMappingExposure),Nt.needsLights&&lp(Pn,Ks),ct&&X.fog===!0&&pt.refreshFogUniforms(Pn,ct),pt.refreshMaterialUniforms(Pn,X,k,q,p.state.transmissionRenderTarget[b.id]),Bo.upload(L,rh(Nt),Pn,I)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Bo.upload(L,rh(Nt),Pn,I),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&me.setValue(L,"center",B.center),me.setValue(L,"modelViewMatrix",B.modelViewMatrix),me.setValue(L,"normalMatrix",B.normalMatrix),me.setValue(L,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const cn=X.uniformsGroups;for(let ti=0,ei=cn.length;ti<ei;ti++){const ah=cn[ti];U.update(ah,xn),U.bind(ah,xn)}}return xn}function lp(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function cp(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,O,W){Ft.get(b.texture).__webglTexture=O,Ft.get(b.depthTexture).__webglTexture=W;const X=Ft.get(b);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Rt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,O){const W=Ft.get(b);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,W=0){R=b,T=O,E=W;let X=!0,B=null,ct=!1,vt=!1;if(b){const Pt=Ft.get(b);if(Pt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(L.FRAMEBUFFER,null),X=!1;else if(Pt.__webglFramebuffer===void 0)I.setupRenderTarget(b);else if(Pt.__hasExternalTextures)I.rebindTextures(b,Ft.get(b.texture).__webglTexture,Ft.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const It=b.depthTexture;if(Pt.__boundDepthTexture!==It){if(It!==null&&Ft.has(It)&&(b.width!==It.image.width||b.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(b)}}const Ht=b.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(vt=!0);const Wt=Ft.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Wt[O])?B=Wt[O][W]:B=Wt[O],ct=!0):b.samples>0&&I.useMultisampledRTT(b)===!1?B=Ft.get(b).__webglMultisampledFramebuffer:Array.isArray(Wt)?B=Wt[W]:B=Wt,P.copy(b.viewport),z.copy(b.scissor),D=b.scissorTest}else P.copy(rt).multiplyScalar(k).floor(),z.copy(St).multiplyScalar(k).floor(),D=Mt;if(bt.bindFramebuffer(L.FRAMEBUFFER,B)&&X&&bt.drawBuffers(b,B),bt.viewport(P),bt.scissor(z),bt.setScissorTest(D),ct){const Pt=Ft.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,Pt.__webglTexture,W)}else if(vt){const Pt=Ft.get(b.texture),Ht=O||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Pt.__webglTexture,W||0,Ht)}S=-1},this.readRenderTargetPixels=function(b,O,W,X,B,ct,vt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Ft.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&vt!==void 0&&(Ct=Ct[vt]),Ct){bt.bindFramebuffer(L.FRAMEBUFFER,Ct);try{const Pt=b.texture,Ht=Pt.format,Wt=Pt.type;if(!Ot.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ot.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-X&&W>=0&&W<=b.height-B&&L.readPixels(O,W,X,B,qt.convert(Ht),qt.convert(Wt),ct)}finally{const Pt=R!==null?Ft.get(R).__webglFramebuffer:null;bt.bindFramebuffer(L.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(b,O,W,X,B,ct,vt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=Ft.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&vt!==void 0&&(Ct=Ct[vt]),Ct){const Pt=b.texture,Ht=Pt.format,Wt=Pt.type;if(!Ot.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ot.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=b.width-X&&W>=0&&W<=b.height-B){bt.bindFramebuffer(L.FRAMEBUFFER,Ct);const It=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,It),L.bufferData(L.PIXEL_PACK_BUFFER,ct.byteLength,L.STREAM_READ),L.readPixels(O,W,X,B,qt.convert(Ht),qt.convert(Wt),0);const ee=R!==null?Ft.get(R).__webglFramebuffer:null;bt.bindFramebuffer(L.FRAMEBUFFER,ee);const fe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await um(L,fe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,It),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ct),L.deleteBuffer(It),L.deleteSync(fe),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,O=null,W=0){b.isTexture!==!0&&(mr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,b=arguments[1]);const X=Math.pow(2,-W),B=Math.floor(b.image.width*X),ct=Math.floor(b.image.height*X),vt=O!==null?O.x:0,Ct=O!==null?O.y:0;I.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,W,0,0,vt,Ct,B,ct),bt.unbindTexture()},this.copyTextureToTexture=function(b,O,W=null,X=null,B=0){b.isTexture!==!0&&(mr("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,b=arguments[1],O=arguments[2],B=arguments[3]||0,W=null);let ct,vt,Ct,Pt,Ht,Wt,It,ee,fe;const pe=b.isCompressedTexture?b.mipmaps[B]:b.image;W!==null?(ct=W.max.x-W.min.x,vt=W.max.y-W.min.y,Ct=W.isBox3?W.max.z-W.min.z:1,Pt=W.min.x,Ht=W.min.y,Wt=W.isBox3?W.min.z:0):(ct=pe.width,vt=pe.height,Ct=pe.depth||1,Pt=0,Ht=0,Wt=0),X!==null?(It=X.x,ee=X.y,fe=X.z):(It=0,ee=0,fe=0);const je=qt.convert(O.format),ne=qt.convert(O.type);let Nt;O.isData3DTexture?(I.setTexture3D(O,0),Nt=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(I.setTexture2DArray(O,0),Nt=L.TEXTURE_2D_ARRAY):(I.setTexture2D(O,0),Nt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const Fn=L.getParameter(L.UNPACK_ROW_LENGTH),ie=L.getParameter(L.UNPACK_IMAGE_HEIGHT),xn=L.getParameter(L.UNPACK_SKIP_PIXELS),Wi=L.getParameter(L.UNPACK_SKIP_ROWS),tn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,pe.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pe.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Pt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ht),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Wt);const Ks=b.isDataArrayTexture||b.isData3DTexture,me=O.isDataArrayTexture||O.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const Pn=Ft.get(b),$s=Ft.get(O),cn=Ft.get(Pn.__renderTarget),ti=Ft.get($s.__renderTarget);bt.bindFramebuffer(L.READ_FRAMEBUFFER,cn.__webglFramebuffer),bt.bindFramebuffer(L.DRAW_FRAMEBUFFER,ti.__webglFramebuffer);for(let ei=0;ei<Ct;ei++)Ks&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ft.get(b).__webglTexture,B,Wt+ei),b.isDepthTexture?(me&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ft.get(O).__webglTexture,B,fe+ei),L.blitFramebuffer(Pt,Ht,ct,vt,It,ee,ct,vt,L.DEPTH_BUFFER_BIT,L.NEAREST)):me?L.copyTexSubImage3D(Nt,B,It,ee,fe+ei,Pt,Ht,ct,vt):L.copyTexSubImage2D(Nt,B,It,ee,fe+ei,Pt,Ht,ct,vt);bt.bindFramebuffer(L.READ_FRAMEBUFFER,null),bt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else me?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Nt,B,It,ee,fe,ct,vt,Ct,je,ne,pe.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(Nt,B,It,ee,fe,ct,vt,Ct,je,pe.data):L.texSubImage3D(Nt,B,It,ee,fe,ct,vt,Ct,je,ne,pe):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,B,It,ee,ct,vt,je,ne,pe.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,B,It,ee,pe.width,pe.height,je,pe.data):L.texSubImage2D(L.TEXTURE_2D,B,It,ee,ct,vt,je,ne,pe);L.pixelStorei(L.UNPACK_ROW_LENGTH,Fn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ie),L.pixelStorei(L.UNPACK_SKIP_PIXELS,xn),L.pixelStorei(L.UNPACK_SKIP_ROWS,Wi),L.pixelStorei(L.UNPACK_SKIP_IMAGES,tn),B===0&&O.generateMipmaps&&L.generateMipmap(Nt),bt.unbindTexture()},this.copyTextureToTexture3D=function(b,O,W=null,X=null,B=0){return b.isTexture!==!0&&(mr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,b=arguments[2],O=arguments[3],B=arguments[4]||0),mr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,O,W,X,B)},this.initRenderTarget=function(b){Ft.get(b).__webglFramebuffer===void 0&&I.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?I.setTextureCube(b,0):b.isData3DTexture?I.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?I.setTexture2DArray(b,0):I.setTexture2D(b,0),bt.unbindTexture()},this.resetState=function(){T=0,E=0,R=null,bt.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class Fc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ft(t),this.near=e,this.far=n}clone(){return new Fc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Oc extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class tf{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=tc,this.updateRanges=[],this.version=0,this.uuid=En()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const We=new C;class Lr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=wn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new ve(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Lr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class sc extends gn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let rs;const tr=new C,os=new C,as=new C,ls=new it,er=new it,ef=new kt,uo=new C,nr=new C,fo=new C,su=new it,Va=new it,ru=new it;class ou extends _e{constructor(t=new sc){if(super(),this.isSprite=!0,this.type="Sprite",rs===void 0){rs=new ye;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new tf(e,5);rs.setIndex([0,1,2,0,2,3]),rs.setAttribute("position",new Lr(n,3,0,!1)),rs.setAttribute("uv",new Lr(n,2,3,!1))}this.geometry=rs,this.material=t,this.center=new it(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),os.setFromMatrixScale(this.matrixWorld),ef.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),as.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&os.multiplyScalar(-as.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;po(uo.set(-.5,-.5,0),as,o,os,i,r),po(nr.set(.5,-.5,0),as,o,os,i,r),po(fo.set(.5,.5,0),as,o,os,i,r),su.set(0,0),Va.set(1,0),ru.set(1,1);let a=t.ray.intersectTriangle(uo,nr,fo,!1,tr);if(a===null&&(po(nr.set(-.5,.5,0),as,o,os,i,r),Va.set(0,1),a=t.ray.intersectTriangle(uo,fo,nr,!1,tr),a===null))return;const l=t.ray.origin.distanceTo(tr);l<t.near||l>t.far||e.push({distance:l,point:tr.clone(),uv:mn.getInterpolation(tr,uo,nr,fo,su,Va,ru,new it),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function po(s,t,e,n,i,r){ls.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(er.x=r*ls.x-i*ls.y,er.y=i*ls.x+r*ls.y):er.copy(ls),s.copy(t),s.x+=er.x,s.y+=er.y,s.applyMatrix4(ef)}const au=new C,lu=new Zt,cu=new Zt,Mx=new C,hu=new kt,mo=new C,Ga=new Cn,uu=new kt,Wa=new ea;class Sx extends st{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=uh,this.bindMatrix=new kt,this.bindMatrixInverse=new kt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new on),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,mo),this.boundingBox.expandByPoint(mo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Cn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,mo),this.boundingSphere.expandByPoint(mo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ga.copy(this.boundingSphere),Ga.applyMatrix4(i),t.ray.intersectsSphere(Ga)!==!1&&(uu.copy(i).invert(),Wa.copy(t.ray).applyMatrix4(uu),!(this.boundingBox!==null&&Wa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Wa)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Zt,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===uh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Dp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;lu.fromBufferAttribute(i.attributes.skinIndex,t),cu.fromBufferAttribute(i.attributes.skinWeight,t),au.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=cu.getComponent(r);if(o!==0){const a=lu.getComponent(r);hu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Mx.copy(au).applyMatrix4(hu),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class nf extends _e{constructor(){super(),this.isBone=!0,this.type="Bone"}}class _i extends Re{constructor(t=null,e=1,n=1,i,r,o,a,l,c=Oe,h=Oe,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const du=new kt,wx=new kt;class Bc{constructor(t=[],e=[]){this.uuid=En(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new kt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new kt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:wx;du.multiplyMatrices(a,e[r]),du.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Bc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new _i(e,t,t,Ve,Tn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new nf),this.bones.push(o),this.boneInverses.push(new kt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class fi extends ve{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const cs=new kt,fu=new kt,go=[],pu=new on,bx=new kt,ir=new st,sr=new Cn;class An extends st{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new fi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,bx)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new on),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,cs),pu.copy(t.boundingBox).applyMatrix4(cs),this.boundingBox.union(pu)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Cn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,cs),sr.copy(t.boundingSphere).applyMatrix4(cs),this.boundingSphere.union(sr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(ir.geometry=this.geometry,ir.material=this.material,ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sr.copy(this.boundingSphere),sr.applyMatrix4(n),t.ray.intersectsSphere(sr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,cs),fu.multiplyMatrices(n,cs),ir.matrixWorld=fu,ir.raycast(t,go);for(let o=0,a=go.length;o<a;o++){const l=go[o];l.instanceId=r,l.object=this,e.push(l)}go.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new fi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new _i(new Float32Array(i*this.count),i,this.count,Rc,Tn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class sf extends gn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Xo=new C,qo=new C,mu=new kt,rr=new ea,vo=new Cn,Xa=new C,gu=new C;class kc extends _e{constructor(t=new ye,e=new sf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Xo.fromBufferAttribute(e,i-1),qo.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Xo.distanceTo(qo);t.setAttribute("lineDistance",new oe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(i),vo.radius+=r,t.ray.intersectsSphere(vo)===!1)return;mu.copy(i).invert(),rr.copy(t.ray).applyMatrix4(mu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=h.getX(v),y=h.getX(v+1),x=_o(this,t,rr,l,p,y);x&&e.push(x)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(f),p=_o(this,t,rr,l,v,m);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=_o(this,t,rr,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=_o(this,t,rr,l,g-1,f);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function _o(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(Xo.fromBufferAttribute(o,i),qo.fromBufferAttribute(o,r),e.distanceSqToSegment(Xo,qo,Xa,gu)>n)return;Xa.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Xa);if(!(l<t.near||l>t.far))return{distance:l,point:gu.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const vu=new C,_u=new C;class Tx extends kc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)vu.fromBufferAttribute(e,i),_u.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+vu.distanceTo(_u);t.setAttribute("lineDistance",new oe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ax extends kc{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class sa extends gn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const xu=new kt,rc=new ea,xo=new Cn,yo=new C;class ra extends _e{constructor(t=new ye,e=new sa){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xo.copy(n.boundingSphere),xo.applyMatrix4(i),xo.radius+=r,t.ray.intersectsSphere(xo)===!1)return;xu.copy(i).invert(),rc.copy(t.ray).applyMatrix4(xu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,v=f;g<v;g++){const m=c.getX(g);yo.fromBufferAttribute(u,m),yu(yo,m,l,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,v=f;g<v;g++)yo.fromBufferAttribute(u,g),yu(yo,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function yu(s,t,e,n,i,r,o){const a=rc.distanceSqToPoint(s);if(a<e){const l=new C;rc.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class yi extends Re{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new it:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,i=[],r=[],o=[],a=new C,l=new kt;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new C)}r[0]=new C,o[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ee(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Ee(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class zc extends Dn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new it){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Ex extends zc{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Hc(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Mo=new C,qa=new Hc,Ya=new Hc,Ka=new Hc;class rf extends Dn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new C){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Mo.subVectors(i[0],i[1]).add(i[0]),c=Mo);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Mo.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Mo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),qa.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),Ya.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),Ka.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(qa.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Ya.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ka.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(qa.calc(l),Ya.calc(l),Ka.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new C().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Mu(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function Rx(s,t){const e=1-s;return e*e*t}function Cx(s,t){return 2*(1-s)*s*t}function Px(s,t){return s*s*t}function yr(s,t,e,n){return Rx(s,t)+Cx(s,e)+Px(s,n)}function Ix(s,t){const e=1-s;return e*e*e*t}function Lx(s,t){const e=1-s;return 3*e*e*s*t}function Dx(s,t){return 3*(1-s)*s*s*t}function Nx(s,t){return s*s*s*t}function Mr(s,t,e,n,i){return Ix(s,t)+Lx(s,e)+Dx(s,n)+Nx(s,i)}class of extends Dn{constructor(t=new it,e=new it,n=new it,i=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new it){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mr(t,i.x,r.x,o.x,a.x),Mr(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ux extends Dn{constructor(t=new C,e=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new C){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mr(t,i.x,r.x,o.x,a.x),Mr(t,i.y,r.y,o.y,a.y),Mr(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class af extends Dn{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fx extends Dn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class lf extends Dn{constructor(t=new it,e=new it,n=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new it){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(yr(t,i.x,r.x,o.x),yr(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ox extends Dn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(yr(t,i.x,r.x,o.x),yr(t,i.y,r.y,o.y),yr(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cf extends Dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Mu(a,l.x,c.x,h.x,u.x),Mu(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new it().fromArray(i))}return this}}var Su=Object.freeze({__proto__:null,ArcCurve:Ex,CatmullRomCurve3:rf,CubicBezierCurve:of,CubicBezierCurve3:Ux,EllipseCurve:zc,LineCurve:af,LineCurve3:Fx,QuadraticBezierCurve:lf,QuadraticBezierCurve3:Ox,SplineCurve:cf});class Bx extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Su[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Su[i.type]().fromJSON(i))}return this}}class kx extends Bx{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new af(this.currentPoint.clone(),new it(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new lf(this.currentPoint.clone(),new it(t,e),new it(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new of(this.currentPoint.clone(),new it(t,e),new it(n,i),new it(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new cf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){const c=new zc(t,e,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Is extends ye{constructor(t=[new it(0,-.5),new it(.5,0),new it(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ee(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,u=new C,d=new it,f=new C,g=new C,v=new C;let m=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(g)}for(let y=0;y<=e;y++){const x=n+y*h*i,_=Math.sin(x),A=Math.cos(x);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*_,u.y=t[T].y,u.z=t[T].x*A,o.push(u.x,u.y,u.z),d.x=y/e,d.y=T/(t.length-1),a.push(d.x,d.y);const E=l[3*T+0]*_,R=l[3*T+1],S=l[3*T+0]*A;c.push(E,R,S)}}for(let y=0;y<e;y++)for(let x=0;x<t.length-1;x++){const _=x+y*t.length,A=_,T=_+t.length,E=_+t.length+1,R=_+1;r.push(A,T,R),r.push(E,R,T)}this.setIndex(r),this.setAttribute("position",new oe(o,3)),this.setAttribute("uv",new oe(a,2)),this.setAttribute("normal",new oe(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Is(t.points,t.segments,t.phiStart,t.phiLength)}}class Sr extends Is{constructor(t=1,e=1,n=4,i=8){const r=new kx;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Sr(t.radius,t.length,t.capSegments,t.radialSegments)}}class ki extends ye{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new C,h=new it;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new oe(o,3)),this.setAttribute("normal",new oe(a,3)),this.setAttribute("uv",new oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ki(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class be extends ye{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;y(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(f,2));function y(){const _=new C,A=new C;let T=0;const E=(e-t)/n;for(let R=0;R<=r;R++){const S=[],M=R/r,P=M*(e-t)+t;for(let z=0;z<=i;z++){const D=z/i,F=D*l+a,H=Math.sin(F),N=Math.cos(F);A.x=P*H,A.y=-M*n+m,A.z=P*N,u.push(A.x,A.y,A.z),_.set(H,E,N).normalize(),d.push(_.x,_.y,_.z),f.push(D,1-M),S.push(g++)}v.push(S)}for(let R=0;R<i;R++)for(let S=0;S<r;S++){const M=v[S][R],P=v[S+1][R],z=v[S+1][R+1],D=v[S][R+1];(t>0||S!==0)&&(h.push(M,P,D),T+=3),(e>0||S!==r-1)&&(h.push(P,z,D),T+=3)}c.addGroup(p,T,0),p+=T}function x(_){const A=g,T=new it,E=new C;let R=0;const S=_===!0?t:e,M=_===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;const P=g;for(let z=0;z<=i;z++){const F=z/i*l+a,H=Math.cos(F),N=Math.sin(F);E.x=S*N,E.y=m*M,E.z=S*H,u.push(E.x,E.y,E.z),d.push(0,M,0),T.x=H*.5+.5,T.y=N*.5*M+.5,f.push(T.x,T.y),g++}for(let z=0;z<i;z++){const D=A+z,F=P+z;_===!0?h.push(F,F+1,D):h.push(F+1,F,D),R+=3}c.addGroup(p,R,_===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new be(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class xi extends be{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new xi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Mi extends ye{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new C,d=new C,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const y=[],x=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let A=0;A<=e;A++){const T=A/e;u.x=-t*Math.cos(i+T*r)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(i+T*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(T+_,1-x),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const x=h[p][y+1],_=h[p][y],A=h[p+1][y],T=h[p+1][y+1];(p!==0||o>0)&&f.push(x,_,T),(p!==n-1||l<Math.PI)&&f.push(_,A,T)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(v,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ls extends ye{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const v=g/i*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,y=(i+1)*f+g;o.push(v,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(l,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ls(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class zx extends Ue{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Kt extends gn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Qe extends Kt{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ft(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ft(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ft(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class hf extends gn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function So(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Hx(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Vx(s){function t(i,r){return s[i]-s[r]}const e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function wu(s,t,e){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=e[r]*t;for(let l=0;l!==t;++l)i[o++]=s[a+l]}return i}function uf(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push.apply(e,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=s[i++];while(r!==void 0)}class Hr{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=r)){const a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Gx extends Hr{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:us,endingEnd:us}}intervalChanged_(t,e,n){const i=this.parameterPositions;let r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ds:r=t,a=2*e-n;break;case Vo:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ds:o=t,l=2*n-e;break;case Vo:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),v=g*g,m=v*g,p=-d*m+2*d*v-d*g,y=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,x=(-1-f)*m+(1.5+f)*v+.5*g,_=f*m-f*v;for(let A=0;A!==a;++A)r[A]=p*o[h+A]+y*o[c+A]+x*o[l+A]+_*o[u+A];return r}}class df extends Hr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class Wx extends Hr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Nn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=So(e,this.TimeBufferType),this.values=So(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:So(t.times,Array),values:So(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Wx(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new df(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Gx(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Rr:e=this.InterpolantFactoryMethodDiscrete;break;case Cr:e=this.InterpolantFactoryMethodLinear;break;case pa:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rr;case this.InterpolantFactoryMethodLinear:return Cr;case this.InterpolantFactoryMethodSmooth:return pa}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&Hx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===pa,r=t.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const v=e[u+g];if(v!==e[d+g]||v!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=Cr;class Gs extends Nn{constructor(t,e,n){super(t,e,n)}}Gs.prototype.ValueTypeName="bool";Gs.prototype.ValueBufferType=Array;Gs.prototype.DefaultInterpolation=Rr;Gs.prototype.InterpolantFactoryMethodLinear=void 0;Gs.prototype.InterpolantFactoryMethodSmooth=void 0;class ff extends Nn{}ff.prototype.ValueTypeName="color";class Ds extends Nn{}Ds.prototype.ValueTypeName="number";class Xx extends Hr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e);let c=t*a;for(let h=c+a;c!==h;c+=4)ge.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Ns extends Nn{InterpolantFactoryMethodLinear(t){return new Xx(this.times,this.values,this.getValueSize(),t)}}Ns.prototype.ValueTypeName="quaternion";Ns.prototype.InterpolantFactoryMethodSmooth=void 0;class Ws extends Nn{constructor(t,e,n){super(t,e,n)}}Ws.prototype.ValueTypeName="string";Ws.prototype.ValueBufferType=Array;Ws.prototype.DefaultInterpolation=Rr;Ws.prototype.InterpolantFactoryMethodLinear=void 0;Ws.prototype.InterpolantFactoryMethodSmooth=void 0;class Us extends Nn{}Us.prototype.ValueTypeName="vector";class oc{constructor(t="",e=-1,n=[],i=Ic){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=En(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(Yx(n[o]).scale(i));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,o=n.length;r!==o;++r)e.push(Nn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const r=e.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=Vx(l);l=wu(l,1,h),c=wu(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Ds(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){const c=t[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,v){if(f.length!==0){const m=[],p=[];uf(f,m,p,g),m.length!==0&&v.push(new u(d,m,p))}},i=[],r=t.name||"default",o=t.fps||30,a=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let v=0;v<d[g].morphTargets.length;v++)f[d[g].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let y=0;y!==d[g].morphTargets.length;++y){const x=d[g];m.push(x.time),p.push(x.morphTarget===v?1:0)}i.push(new Ds(".morphTargetInfluence["+v+"]",m,p))}l=f.length*o}else{const f=".bones["+e[u].name+"]";n(Us,f+".position",d,"pos",i),n(Ns,f+".quaternion",d,"rot",i),n(Us,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function qx(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ds;case"vector":case"vector2":case"vector3":case"vector4":return Us;case"color":return ff;case"quaternion":return Ns;case"bool":case"boolean":return Gs;case"string":return Ws}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Yx(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=qx(s.type);if(s.times===void 0){const e=[],n=[];uf(s.keys,e,n,"value"),s.times=e,s.values=n}return t.parse!==void 0?t.parse(s):new t(s.name,s.times,s.values,s.interpolation)}const pi={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Kx{constructor(t,e,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const $x=new Kx;class Xs{constructor(t){this.manager=t!==void 0?t:$x,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Xs.DEFAULT_MATERIAL_NAME="__DEFAULT";const Vn={};class jx extends Error{constructor(t,e){super(t),this.response=e}}class pf extends Xs{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=pi.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Vn[t]!==void 0){Vn[t].push({onLoad:e,onProgress:n,onError:i});return}Vn[t]=[],Vn[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Vn[t],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let v=0;const m=new ReadableStream({start(p){y();function y(){u.read().then(({done:x,value:_})=>{if(x)p.close();else{v+=_.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let T=0,E=h.length;T<E;T++){const R=h[T];R.onProgress&&R.onProgress(A)}p.enqueue(_),y()}},x=>{p.error(x)})}}});return new Response(m)}else throw new jx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{pi.add(t,c);const h=Vn[t];delete Vn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Vn[t];if(h===void 0)throw this.manager.itemError(t),c;delete Vn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Zx extends Xs{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=pi.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=Pr("img");function l(){h(),pi.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class Qx extends Xs{constructor(t){super(t)}load(t,e,n,i){const r=new Re,o=new Zx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class oa extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class mf extends oa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const $a=new kt,bu=new C,Tu=new C;class Vc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.map=null,this.mapPass=null,this.matrix=new kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nc,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;bu.setFromMatrixPosition(t.matrixWorld),e.position.copy(bu),Tu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Tu),e.updateMatrixWorld(),$a.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix($a),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($a)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Jx extends Vc{constructor(){super(new qe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Cs*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class ty extends oa{constructor(t,e,n=0,i=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Jx}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Au=new kt,or=new C,ja=new C;class ey extends Vc{constructor(){super(new qe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new it(4,2),this._viewportCount=6,this._viewports=[new Zt(2,1,1,1),new Zt(0,1,1,1),new Zt(3,1,1,1),new Zt(1,1,1,1),new Zt(3,0,1,1),new Zt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),or.setFromMatrixPosition(t.matrixWorld),n.position.copy(or),ja.copy(n.position),ja.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ja),n.updateMatrixWorld(),i.makeTranslation(-or.x,-or.y,-or.z),Au.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Au)}}class gf extends oa{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ey}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class ny extends Vc{constructor(){super(new na(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gc extends oa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new ny}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class wr{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class iy extends Xs{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=pi.get(t);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(c=>{e&&e(c),r.manager.itemEnd(t)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return pi.add(t,c),e&&e(c),r.manager.itemEnd(t),c}).catch(function(c){i&&i(c),pi.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});pi.add(t,l),r.manager.itemStart(t)}}class sy{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Eu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Eu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Eu(){return performance.now()}class ry{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,r,o;switch(e){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,r=t*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-r,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let r=n,o=i;r!==o;++r)e[r]=e[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){ge.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){const o=this._workIndex*r;ge.multiplyQuaternionsFlat(t,o,t,e,t,n),ge.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=e+a;t[l]=t[l]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,r){for(let o=0;o!==r;++o){const a=e+o;t[a]=t[a]+t[n+o]*i}}}const Wc="\\[\\]\\.:\\/",oy=new RegExp("["+Wc+"]","g"),Xc="[^"+Wc+"]",ay="[^"+Wc.replace("\\.","")+"]",ly=/((?:WC+[\/:])*)/.source.replace("WC",Xc),cy=/(WCOD+)?/.source.replace("WCOD",ay),hy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xc),uy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xc),dy=new RegExp("^"+ly+cy+hy+uy+"$"),fy=["material","materials","bones","map"];class py{constructor(t,e,n){const i=n||se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class se{constructor(t,e,n){this.path=e,this.parsedPath=n||se.parseTrackName(e),this.node=se.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new se.Composite(t,e,n):new se(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(oy,"")}static parseTrackName(t){const e=dy.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);fy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let r=e.propertyIndex;if(t||(t=se.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const o=t[i];if(o===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}se.Composite=py;se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};se.prototype.GetterByBindingType=[se.prototype._getValue_direct,se.prototype._getValue_array,se.prototype._getValue_arrayElement,se.prototype._getValue_toArray];se.prototype.SetterByBindingTypeAndVersioning=[[se.prototype._setValue_direct,se.prototype._setValue_direct_setNeedsUpdate,se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[se.prototype._setValue_array,se.prototype._setValue_array_setNeedsUpdate,se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[se.prototype._setValue_arrayElement,se.prototype._setValue_arrayElement_setNeedsUpdate,se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[se.prototype._setValue_fromArray,se.prototype._setValue_fromArray_setNeedsUpdate,se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class my{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const r=e.tracks,o=r.length,a=new Array(o),l={endingStart:us,endingEnd:us};for(let c=0;c!==o;++c){const h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Up,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,r=t._clip.duration,o=r/i,a=i/r;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const l=(t-r)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Op:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Ic:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,r=this._loopCount;const o=n===Fp;if(t===0)return r===-1?i:o&&(r&1)===1?e-i:i;if(n===Np){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){const a=Math.floor(i/e);i-=e*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=ds,i.endingEnd=ds):(t?i.endingStart=this.zeroSlopeAtStart?ds:us:i.endingStart=Vo,e?i.endingEnd=this.zeroSlopeAtEnd?ds:us:i.endingEnd=Vo)}_scheduleFading(t,e,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=e,a[1]=r+t,l[1]=n,this}}const gy=new Float32Array(1);class vy extends Vi{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,r=i.length,o=t._propertyBindings,a=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const v=e&&e._propertyBindings[u].binding.parsedPath;g=new ry(se.create(n,f,v),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,r=this._actionsByClip[i];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,r=this._actionsByClip;let o=r[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=a.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new df(new Float32Array(2),new Float32Array(2),1,gy),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const i=e||this._root,r=i.uuid;let o=typeof t=="string"?oc.findByName(i,t):t;const a=o!==null?o.uuid:t,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Ic),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new my(this,o,e,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(t,e){const n=e||this._root,i=n.uuid,r=typeof t=="string"?oc.findByName(n,t):t,o=r?r.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[e];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sc);function _y(s,t){let e;try{e=new yx({canvas:s,antialias:!0,powerPreference:"high-performance",stencil:!1,depth:!0})}catch(n){return console.error("[render] WebGLRenderer 生成失敗:",n),null}return e.getContext()?(e.setPixelRatio(Math.min(window.devicePixelRatio||1,t)),e.setSize(window.innerWidth,window.innerHeight,!1),e.setClearColor(8894688,1),e.toneMapping=bc,e.toneMappingExposure=1.12,e.outputColorSpace=Ae,e):null}function ac(s,t){s.setPixelRatio(Math.min(window.devicePixelRatio||1,t)),s.setSize(window.innerWidth,window.innerHeight,!1)}function xy(s,t){s.setSize(window.innerWidth,window.innerHeight,!1),t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix()}const vf={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class qs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const yy=new na(-1,1,1,-1,0,1);class My extends ye{constructor(){super(),this.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new oe([0,2,0,0,2,0],2))}}const Sy=new My;class qc{constructor(t){this._mesh=new st(Sy,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,yy)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class wy extends qs{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ue?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Ir.clone(t.uniforms),this.material=new Ue({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new qc(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ru extends qs{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class by extends qs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Ty{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new it);this._width=n.width,this._height=n.height,e=new Rn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Yn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new wy(vf),this.copyPass.material.blending=qn,this.clock=new sy}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Ru!==void 0&&(o instanceof Ru?n=!0:o instanceof by&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new it);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ay extends qs{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ft}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}const Ey={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ft(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Fs extends qs{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new it(t.x,t.y):new it(256,256),this.clearColor=new ft(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Rn(r,o,{type:Yn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new Rn(r,o,{type:Yn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new Rn(r,o,{type:Yn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=Ey;this.highPassUniforms=Ir.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ue({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new it(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=vf;this.copyUniforms=Ir.clone(h.uniforms),this.blendMaterial=new Ue({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Ar,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ft,this.oldClearAlpha=1,this.basic=new De,this.fsQuad=new qc(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new it(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Fs.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Fs.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Ue({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new it(.5,.5)},direction:{value:new it(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Ue({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Fs.BlurDirectionX=new it(1,0);Fs.BlurDirectionY=new it(0,1);const Ry={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Cy extends qs{constructor(){super();const t=Ry;this.uniforms=Ir.clone(t.uniforms),this.material=new zx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new qc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},jt.getTransfer(this._outputColorSpace)===le&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===_d?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===xd?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===yd?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===bc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Md?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Sd&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const ui={x:.55,y:.62,z:.28},rn={SEA_LEVEL:-3,FLAT_RADIUS:3200,FOG_NEAR:2600,FOG_FAR:34e3},li={FOV:60,FOV_COCKPIT:78,BLEND_TIME:.65,ORBIT_SPEED:.12},Dr={ultra:{pixelRatio:3,shadows:!0,shadowMapSize:4096,treeCount:2e3,cityCount:520,cloudCount:44,terrainNearSeg:320,terrainMid:!0,shadowRange:2800,bloom:!0,runwayTexPx:1024},high:{pixelRatio:2,shadows:!0,shadowMapSize:2048,treeCount:1400,cityCount:380,cloudCount:34,terrainNearSeg:256,terrainMid:!0,shadowRange:2600,bloom:!0,runwayTexPx:1024},medium:{pixelRatio:1.5,shadows:!0,shadowMapSize:1024,treeCount:650,cityCount:220,cloudCount:22,terrainNearSeg:128,terrainMid:!0,shadowRange:2e3,bloom:!1,runwayTexPx:512},low:{pixelRatio:1,shadows:!1,shadowMapSize:512,treeCount:320,cityCount:130,cloudCount:14,terrainNearSeg:96,terrainMid:!1,shadowRange:1400,bloom:!1,runwayTexPx:512}},$n=[{id:"b737",name:"B737 相当「ナローボディ」",description:"B737-700 実データ準拠（JAL/JTA SOP マニュアル反映）。単通路機・翼下ナセル。",fuselageLength:33.6,fuselageRadius:1.88,wingspan:35.8,rootChord:7.2,tipChord:1.6,sweep:.436,dihedral:.096,tailHeight:12.6,tailRootChord:5.2,engineDiameter:1.55,engineLength:3.9,engineSpanPos:.3,engineForward:1.6,mainWheelCount:2,liveryName:"SKYLINER",liveryRegistration:"JA73AI",liveryTop:15265524,liveryBottom:2772860,liveryAccent:16757308,mass:62e3,wingArea:124,thrustMax:235e3,vRotate:73,vCruise:230,vApproach:68},{id:"a320",name:"A320 相当「ナローボディ」",description:"単通路機。シャークレット付きの現代的な翼形状。中短距離の主力。",fuselageLength:37.6,fuselageRadius:1.98,wingspan:35.8,rootChord:7.4,tipChord:1.7,sweep:.401,dihedral:.087,tailHeight:11.9,tailRootChord:5,engineDiameter:1.6,engineLength:4.1,engineSpanPos:.31,engineForward:1.7,mainWheelCount:2,liveryName:"SKYLINER",liveryRegistration:"JA20AS",liveryTop:15922423,liveryBottom:1916782,liveryAccent:5227511,mass:78e3,wingArea:122,thrustMax:22e4,vRotate:73,vCruise:232,vApproach:68},{id:"b777",name:"B777 相当「ワイドボディ」",description:"大型双通路機。巨大エンジンと長い胴体。長距離路線の主力。",fuselageLength:73.9,fuselageRadius:3.1,wingspan:64.8,rootChord:13,tipChord:2.6,sweep:.506,dihedral:.07,tailHeight:18.6,tailRootChord:9.4,engineDiameter:3.2,engineLength:7.2,engineSpanPos:.28,engineForward:2.6,mainWheelCount:3,liveryName:"SKYLINER",liveryRegistration:"JA77AJ",liveryTop:15659509,liveryBottom:1323086,liveryAccent:16739162,mass:299e3,wingArea:428,thrustMax:72e4,vRotate:82,vCruise:248,vApproach:76}];function Za(s){return $n.find(t=>t.id===s)??$n[0]}const an=[{id:"hlm",name:"湾岸国際空港",code:"HLM",description:"海沿いの国際空港。滑走路 34/16、海岸線と市街地が隣接。",center:{x:0,z:0},heading:0,length:4e3,width:60,runwayNumbers:["34","16"]},{id:"sky",name:"丘陵空港",code:"SKY",description:"内陸の空港。東西滑走路 27/09（2600m）で風向きに強い。",center:{x:1900,z:-1400},heading:Math.PI/2,length:2600,width:45,runwayNumbers:["27","09"]},{id:"palm",name:"パーム島空港",code:"PMS",description:"南海上の環礁島にある離島空港。滑走路 09/27（1,800m）両端とも海。",center:{x:13500,z:9500},heading:Math.PI/2,length:1800,width:45,runwayNumbers:["09","27"]}];function Cu(s){return an.find(t=>t.id===s)??an[0]}class Py{level="high";preset=Dr.high;fpsSamples=[];fps=60;medAccum=0;setLevel(t){this.level=t,this.preset=Dr[t]}sample(t){if(!(t<=0)&&(this.fpsSamples.push(1/t),this.fpsSamples.length>60&&this.fpsSamples.shift(),this.medAccum+=t,this.medAccum>=.25)){this.medAccum=0;const e=[...this.fpsSamples].sort((n,i)=>n-i);this.fps=e[Math.floor(e.length/2)]??60}}getFps(){return this.fps}}function Iy(s,t){const e=new C(ui.x,ui.y,ui.z).normalize(),n={uTop:{value:new ft(3040192)},uHorizon:{value:new ft(12901102)},uSunDir:{value:e.clone()},uSunColor:{value:new ft(1,.93,.8)}},i=new Ue({uniforms:n,vertexShader:`
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
    `,side:Ke,depthWrite:!1,fog:!1}),r=new st(new Mi(24e3,32,16),i);r.frustumCulled=!1,r.renderOrder=-10,s.add(r);const o=new nc(t),a=new Oc,l=new st(new Mi(100,32,16),i);l.frustumCulled=!1,a.add(l);let c=o.fromScene(a,.04);s.environment=c.texture;const h=o,u=new Gc(16773596,2.4);u.position.copy(e).multiplyScalar(3200),s.add(u),s.add(u.target);const d=new mf(12376304,6978136,.75);s.add(d);const f=1400,g=new Float32Array(f*3),v=new Float32Array(f);{let _=20261104;const A=()=>(_=_*1103515245+12345&2147483647,_/2147483647);for(let T=0;T<f;T++){const E=A()*Math.PI*2,R=Math.acos(1-A()),S=21e3;g[T*3]=Math.sin(R)*Math.cos(E)*S,g[T*3+1]=Math.cos(R)*S,g[T*3+2]=Math.sin(R)*Math.sin(E)*S,v[T]=0}}const m=new ye;m.setAttribute("position",new ve(g,3));const p=(()=>{const _=document.createElement("canvas");_.width=_.height=32;const A=_.getContext("2d"),T=A.createRadialGradient(16,16,1,16,16,15);return T.addColorStop(0,"rgba(255,255,255,1)"),T.addColorStop(.35,"rgba(235,242,255,0.85)"),T.addColorStop(1,"rgba(235,242,255,0)"),A.fillStyle=T,A.fillRect(0,0,32,32),new yi(_)})(),y=new sa({color:14674175,size:3.2,sizeAttenuation:!1,map:p,alphaTest:.02,transparent:!0,opacity:0,blending:Ar,depthWrite:!1,fog:!1}),x=new ra(m,y);return x.renderOrder=-9,x.frustumCulled=!1,s.add(x),{sky:r,sun:u,hemi:d,sunDir:e,setSunElevation(_){const A=Math.sqrt(Math.max(1-_*_,1e-4));e.set(ui.x*A,Math.max(_,.03),ui.z*A).normalize(),n.uSunDir.value.copy(e),u.position.copy(e).multiplyScalar(3200)},setPalette(_,A,T,E,R){n.uTop.value.setHex(_),n.uHorizon.value.setHex(A),n.uSunColor.value.setHex(T),u.color.setHex(T),u.intensity=E,d.intensity=R,d.color.setHex(A)},setStars(_){y.opacity=Math.max(0,Math.min(1,_))*.8,x.visible=_>.02},regenerateEnv(_){const A=c;c=h.fromScene(a,.04),_.environment=c.texture,A.dispose()}}}function Ly(s){return new Worker(""+new URL("worldgen.worker-C-vMh5Gz.js",import.meta.url).href,{name:s?.name})}function ps(s,t,e){return s<t?t:s>e?e:s}function Qa(s,t,e){return s+(t-s)*e}function aa(s,t,e){const n=ps((e-s)/(t-s),0,1);return n*n*(3-2*n)}function Pu(s,t){return 1-Math.exp(-s*t)}function Yc(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function wo(s,t){let e=Math.imul(s,374761393)+Math.imul(t,668265263);return e=Math.imul(e^e>>>13,1274126177),((e^e>>>16)>>>0)/4294967296}function xs(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,r=t-n,o=i*i*(3-2*i),a=r*r*(3-2*r),l=wo(e,n),c=wo(e+1,n),h=wo(e,n+1),u=wo(e+1,n+1);return Qa(Qa(l,c,o),Qa(h,u,o),a)}function Ja(s,t,e){let n=.5,i=1,r=0,o=0;for(let a=0;a<e;a++){const l=xs(s*i,t*i);r+=n*l,o+=n,n=Math.min(.98,n*(.42+1.16*l)),i*=2.03}return r/o}function ar(s,t,e){let n=.5,i=1,r=0,o=0;for(let a=0;a<e;a++)r+=n*xs(s*i,t*i),o+=n,n*=.5,i*=2.03;return r/o}function Dy(s,t){const e=s+900*(ar(s*21e-6+5.2,t*21e-6+1.3,2)-.5),n=t+900*(ar(s*21e-6+9.1,t*21e-6+4.4,2)-.5),i=ar(e*45e-6+3.1,n*45e-6+7.7,3),r=Math.pow(1-Math.abs(2*Ja(e*13e-5+21.3,n*13e-5+5.9,3)-1),2.2),o=Math.pow(1-Math.abs(2*Ja(e*9e-5+40.7,n*9e-5+17.2,3)-1),2.6),a=Math.pow(1-Math.abs(2*Ja(e*26e-5+61.3,n*26e-5+33.7,3)-1),3.1),l=aa(.45,.68,i),c=(ar(s*28e-5+11.7,t*28e-5+2.4,2)-.5)*260,h=(xs(s*.0011+2.2,t*.0011+6.6)-.5)*22,u=(ar(s*35e-5+8.3,t*35e-5+4.1,2)-.5)*150;return(i-.31)*900+(r*1900+o*1100+a*300)*l+c+h+u}function Ny(s,t){let e=0;for(const n of an){const i=Math.hypot(s-n.center.x,t-n.center.z);e=Math.max(e,1-aa(rn.FLAT_RADIUS,rn.FLAT_RADIUS+3800,i))}return 1-e}function Uy(s,t){return aa(7e3,12e3,(s+t)*.7071)}let zi=null;function Fy(s){const t=new DataView(s),e=String.fromCharCode(t.getUint8(0),t.getUint8(1),t.getUint8(2),t.getUint8(3));if(e!=="ERA1"&&e!=="ERA2"||s.byteLength<32)throw new Error("bake magic/size");const n=t.getUint32(4,!0),i=t.getFloat64(16,!0),r=t.getFloat64(24,!0);if(s.byteLength<32+n*n*4*2)throw new Error("bake truncated");const o=n>>1,a=e==="ERA2"&&s.byteLength>=32+n*n*8+o*o*4;zi={N:n,cell:i,min:r,buf:s,ero:new Uint32Array(s,32,n*n),shade:new Uint8Array(s,32+n*n*4,n*n*4),light:a?new Uint8Array(s,32+n*n*8,o*o*4):null}}function Oy(s,t){const e=zi;if(!e?.light)return 0;const n=e.N>>1,i=(s-e.min)/(e.cell*e.N)*n-.5,r=(t-e.min)/(e.cell*e.N)*n-.5,o=Math.floor(i),a=Math.floor(r),l=i-o,c=r-a,h=(u,d)=>u<0||d<0||u>=n||d>=n?0:e.light[(d*n+u)*4+3]/255;return h(o,a)*(1-l)*(1-c)+h(o+1,a)*l*(1-c)+h(o,a+1)*(1-l)*c+h(o+1,a+1)*l*c}const br=()=>zi,By=()=>zi?zi.buf.slice(0):null;function ky(s,t){if(!zi)return 0;const{N:e,ero:n,cell:i,min:r}=zi,o=(s-r)/i-.5,a=(t-r)/i-.5,l=Math.floor(o),c=Math.floor(a),h=o-l,u=a-c,d=(f,g)=>f<0||g<0||f>=e||g>=e?0:(n[g*e+f]&65535)/256-128;return d(l,c)*(1-h)*(1-u)+d(l+1,c)*h*(1-u)+d(l,c+1)*(1-h)*u+d(l+1,c+1)*h*u}function we(s,t){const e=Ny(s,t);return(Dy(s,t)+ky(s,t))*e-Uy(s,t)*520*e}const Iu=2400;function di(s,t,e,n,i,r,o,a,l){const c=Math.cos(r),h=Math.sin(r),u=t*16;s[u]=c*o,s[u+1]=0,s[u+2]=-h*o,s[u+3]=0,s[u+4]=0,s[u+5]=a,s[u+6]=0,s[u+7]=0,s[u+8]=h*l,s[u+9]=0,s[u+10]=c*l,s[u+11]=0,s[u+12]=e,s[u+13]=n,s[u+14]=i,s[u+15]=1}class _f{map=new Map;add(t,e,n,i,r){const o=`${Math.floor(t/Iu)},${Math.floor(e/Iu)}`;let a=this.map.get(o);a||this.map.set(o,a={x:[],z:[],y:[],m:[],c:[]}),a.x.push(t),a.z.push(e),a.y.push(n);for(let l=0;l<16;l++)a.m.push(i[l]);if(r)for(let l=0;l<3;l++)a.c.push(r[l])}pack(){const t=[];for(const e of this.map.values()){let n=0,i=0,r=0;for(let h=0;h<e.x.length;h++)n+=e.x[h],i+=e.y[h],r+=e.z[h];const o=n/e.x.length,a=i/e.x.length,l=r/e.x.length;let c=0;for(let h=0;h<e.x.length;h++)c=Math.max(c,Math.hypot(e.x[h]-o,e.z[h]-l));t.push({cx:o,cy:a,cz:l,r:c+320,n:e.x.length,m:Float32Array.from(e.m),c:e.c.length?Float32Array.from(e.c):new Float32Array(e.x.length*3)})}return t}}function Kc(s){const t=Yc(20261009),e=new _f,n=[],i=[],r=[],o=[],a=7800,l=-3200,c=210,h=new Float32Array(16),u=new Float32Array(3);for(let D=0;D<s;D++){const F=t()*Math.PI*2,H=600+Math.pow(t(),.7)*3400,N=a+Math.cos(F)*H,q=l+Math.sin(F)*H*.8,k=Math.round(N/c)*c,K=Math.round(q/c)*c,tt=t()<.5?0:1,rt=Math.sign(tt===0?N-k:q-K)||1,St=(t()-.5)*(c-70),Mt=tt===0?k+rt*(c/2-26):k+St,G=tt===1?K+rt*(c/2-26):K+St,Z=(Mt-a)/1.24,at=G-l,lt=2450+Math.sin(Math.atan2(at,Z)*5+1.3)*190;if(Math.abs(Math.hypot(Z,at)-lt)<62)continue;const wt=we(Mt,G);if(wt<4)continue;const Lt=ps(1-H/3800,0,1),nt=H>2750&&t()<.55,yt=nt?9+t()*15:22+t()*90*(.35+Lt*1.4),ut=nt?13+t()*16:26+t()*38,j=nt?13+t()*16:26+t()*38,L=(t()-.5)*.1;tt===0?di(h,0,Mt,wt-1,G,L,j,yt,ut):di(h,0,Mt,wt-1,G,L,ut,yt,j);const mt=.72+t()*.28;u[0]=mt*.95,u[1]=mt*.97,u[2]=mt,e.add(Mt,G,wt,h,u),n.push(Mt,G,.4*Math.hypot(ut,j)+3,wt+yt)}const d=46,f=[[a,l,1],[a+1500,l+900,.62],[a-1350,l-650,.55],[a+350,l-1500,.45]];let g=0;for(let D=0;D<f.length&&g<d;D++){const[F,H,N]=f[D],q=Math.min(D===0?22:8,d-g);for(let k=0;k<q;k++){const K=t()*Math.PI*2,tt=Math.pow(t(),.8)*(D===0?620:380),rt=F+Math.cos(K)*tt*1.25,St=H+Math.sin(K)*tt,Mt=we(rt,St);if(Mt<5)continue;const G=150+Math.pow(t(),1.7)*185*(.55+N*.75),Z=24+t()*20,at=24+t()*20,lt=Math.round(t()*4)*(Math.PI/2)+(t()-.5)*.12;di(h,0,rt,Mt-2,St,lt,Z,G,at);for(let Lt=0;Lt<16;Lt++)i.push(h[Lt]);const wt=.82+t()*.18;r.push(wt*.86,wt*.95,wt),o.push(rt,Mt-2,St,G),n.push(rt,St,.42*Math.max(Z,at)+4,Mt+G),g++}}const v=[];for(let D=0;D<o.length;D+=4)v.push(o[D],o[D+1]+o[D+3]-2,o[D+2]);const m=[],p=(D,F)=>({x:D,y:F}),y=(D,F,H,N)=>{const q=Math.sin(H),k=Math.cos(H);m.push([p(D-q*N,F-k*N),p(D+q*N,F+k*N)])};for(let D=0;D<3;D++){const F=.5+D*.55;y(a-2600+D*1900,l+800,F,4500)}m.push([p(2100,-1900),p(3200,-2200),p(4500,-2600),p(6e3,-3e3),p(a,l),p(a+800,l-300)]);{const D=[];for(let F=0;F<=34;F++){const H=F/34*Math.PI*2,N=2450+Math.sin(H*5+1.3)*190;D.push(p(a+Math.cos(H)*N*1.24,l+Math.sin(H)*N))}m.push(D)}m.push([p(a-2260,l+420),p(1200,-1e3),p(-1400,-2500)]),m.push([p(a+1250,l+1560),p(4100,3600),p(2900,6300)]);const x=m.length;{const F=(K,tt)=>Math.hypot(K-a,(tt-l)/.8)>640&&Math.hypot(K-a,(tt-l)/.8)<3650,H=Math.round((a-3650)/c),N=Math.round((a+3650)/c),q=Math.round((l-3650*.8)/c),k=Math.round((l+3650*.8)/c);for(let K=H;K<=N;K++){const tt=(K+.5)*c,rt=[];let St=0;for(let Mt=q-2;Mt<=k+2;Mt++){const G=(Mt+.5)*c;if(F(tt,G))rt.push(p(tt,G)),St=0;else if(++St>2&&rt.length)break}rt.length>2&&m.push(rt)}for(let K=q;K<=k;K++){const tt=(K+.5)*c,rt=[];let St=0;for(let Mt=H-2;Mt<=N+2;Mt++){const G=(Mt+.5)*c;if(F(G,tt))rt.push(p(G,tt)),St=0;else if(++St>2&&rt.length)break}rt.length>2&&m.push(rt)}}const _=[],A=[],T=[],E=[];let R=0;for(let D=0;D<m.length;D++){const F=m[D],H=[];for(let N=0;N<F.length-1;N++){const q=Math.max(1,Math.round(Math.hypot(F[N+1].x-F[N].x,F[N+1].y-F[N].y)/120));for(let k=0;k<q;k++)H.push(p(F[N].x+(F[N+1].x-F[N].x)*(k/q),F[N].y+(F[N+1].y-F[N].y)*(k/q)))}H.push(p(F[F.length-1].x,F[F.length-1].y));for(let N=0;N<H.length;N++){const q=H[Math.max(0,N-1)],k=H[Math.min(H.length-1,N+1)],K=Math.hypot(k.x-q.x,k.y-q.y)||1,tt=(k.x-q.x)/K,rt=(k.y-q.y)/K,St=-rt,Mt=tt,G=11;if(N%2===0&&T.push([H[N].x,H[N].y,Math.atan2(rt,tt),D<x]),N%6===2&&E.length<4500)for(const at of[-1,1])E.push(H[N].x+St*at*27,H[N].y+Mt*at*27,.72+t()*.55);const Z=Math.max(we(H[N].x,H[N].y)+.35,-2.6);if(_.push(H[N].x+St*G,Z,H[N].y+Mt*G),_.push(H[N].x-St*G,Z,H[N].y-Mt*G),N<H.length-1){const at=R+N*2;A.push(at,at+1,at+2,at+1,at+3,at+2)}}R+=H.length*2}const S=620;let M=0;for(const[D,F,H,N]of T){if(M>=S-2)break;const q=Math.hypot(D-a,F-l)<4100;if(q&&!N)continue;let k=!1;for(const K of an)Math.hypot(D-K.center.x,F-K.center.z)<3700&&(k=!0);if(!k)for(const K of[-1,1]){if(M>=S)break;if(!q&&t()>.6)continue;const tt=(q?62:56)+t()*(q?42:120),rt=-Math.sin(H)*K,St=Math.cos(H)*K,Mt=D+rt*tt+(t()-.5)*44,G=F+St*tt+(t()-.5)*44,Z=we(Mt,G);if(Z<(q?2.5:4))continue;const at=q?9+t()*15:7+t()*16,lt=12+t()*15,wt=12+t()*15;di(h,0,Mt,Z-1,G,H+(t()-.5)*.3,lt,at,wt);const Lt=.78+t()*.22;u[0]=Lt,u[1]=Lt*.97,u[2]=Lt*.93,e.add(Mt,G,Z,h,u),n.push(Mt,G,.4*Math.hypot(lt,wt)+3,Z+at),M++}}const P=120;let z=0;for(const D of an){const F=Math.floor(P/an.length);for(let H=0;H<F&&z<P;H++){const N=t()*Math.PI*2,q=3650+t()*1500,k=D.center.x+Math.cos(N)*q*1.12,K=D.center.z+Math.sin(N)*q,tt=we(k,K);if(tt<4)continue;const rt=8+t()*20,St=16+t()*30,Mt=16+t()*30;di(h,0,k,tt-1,K,Math.round(t()*4)*(Math.PI/2),St,rt,Mt);const G=.7+t()*.3;u[0]=G*.96,u[1]=G*.97,u[2]=G,e.add(k,K,tt,h,u),n.push(k,K,.4*Math.hypot(St,Mt)+3,tt+rt),z++}}return{buckets:e.pack(),towers:{m:new Float32Array(i),c:new Float32Array(r),n:i.length/16},beacons:new Float32Array(v),colliders:new Float64Array(n),roads:{pos:new Float32Array(_),idx:new Uint32Array(A)},roadside:new Float32Array(E)}}function xf(s,t){const e=Yc(777001),n=new _f,i=new Float32Array(16),r=new Float32Array(3);let o=0,a=0;for(;o<t&&a++<t*40;){const l=e()*Math.PI*2,c=3800+e()*14e3,h=Math.cos(l)*c-2e3,u=Math.sin(l)*c-2e3,d=we(h,u);if(d<12)continue;const f=760+300*xs(h*22e-5+31.7,u*22e-5+12.1);if(d>f||xs(h*62e-5+17.3,u*62e-5+3.9)<.44)continue;const g=Math.hypot(we(h+40,u)-d,we(h,u+40)-d)/40;if(g>.72)continue;const v=Oy(h,u),m=(v>0?.3+.85*v:.55)+.22*(1-aa(.25,.72,g));if(e()>Math.min(1,m))continue;const p=.8+e()*1.5*(.8+xs(h*.004+5.5,u*.004+8.1)*.5),y=e()*Math.PI*2,x=p*(.85+e()*.55);di(i,0,h,d-.6,u,y,p,x,p);const _=.72+e()*.45;r[0]=_*.9,r[1]=_,r[2]=_*.82,n.add(h,u,d,i,r),o++}for(const l of an)for(let h=0;h<44&&o<t;h++){const u=h/44*Math.PI*2+(e()-.5)*.06,d=u-l.heading;if(Math.abs(Math.cos(d))>.62)continue;const f=3760+e()*260,g=l.center.x+Math.cos(u)*f*1.14,v=l.center.z+Math.sin(u)*f,m=we(g,v);if(m<1)continue;const p=1+e()*.9,y=e()*Math.PI*2,x=p*(.9+e()*.5);di(i,0,g,m-.6,v,y,p,x,p);const _=.68+e()*.4;r[0]=_*.88,r[1]=_,r[2]=_*.8,n.add(g,v,m,i,r),o++}for(let l=0;l+2<s.length&&!(o>=t);l+=3){const c=s[l],h=s[l+1],u=s[l+2],d=we(c,h);if(d<.5)continue;const f=e()*Math.PI*2;di(i,0,c,d-.5,h,f,u,u,u);const g=.8+e()*.3;r[0]=g*.72,r[1]=g,r[2]=g*.7,n.add(c,h,d,i,r),o++}return{buckets:n.pack(),n:o}}function zy(s,t,e,n){const i=n/512;s.save(),s.scale(i,i),s.fillStyle="#31363c",s.fillRect(0,0,512,4096);let r=1234;const o=()=>(r=r*1103515245+12345&2147483647,r/2147483647);for(let a=0;a<90;a++){const l=42+o()*26;s.fillStyle=`rgba(${l},${l+2},${l+6},0.35)`,s.fillRect(o()*512-40,o()*4096-60,40+o()*120,60+o()*220)}for(let a=0;a<6e3*i*i;a++){const l=34+o()*44;s.fillStyle=`rgba(${l},${l+2},${l+7},0.5)`,s.fillRect(o()*512,o()*4096,1+o()*3,1+o()*3)}for(const a of[148,205,307,364]){const l=s.createLinearGradient(a-24,0,a+24,0);l.addColorStop(0,"rgba(18,20,24,0)"),l.addColorStop(.5,"rgba(18,20,24,0.40)"),l.addColorStop(1,"rgba(18,20,24,0)"),s.fillStyle=l,s.fillRect(a-24,300,48,3500)}for(const a of[220,3500]){const l=s.createLinearGradient(0,a-200,0,a+420);l.addColorStop(0,"rgba(12,13,16,0)"),l.addColorStop(.5,"rgba(12,13,16,0.42)"),l.addColorStop(1,"rgba(12,13,16,0)"),s.fillStyle=l,s.fillRect(30,a-200,452,620)}s.fillStyle="#dde2e6",s.fillRect(18,0,8,4096),s.fillRect(486,0,8,4096);for(let a=120;a<3976;a+=150)s.fillRect(248,a,16,80);for(const a of[40,3936]){s.fillRect(30,a,452,26);for(let l=0;l<8;l++)s.fillRect(60+l*52,a+34,30,110)}for(const a of[280,3596])for(let l=0;l<3;l++){const c=150*l,h=a>2e3?a-c:a+c;for(const u of[70,130,352,412])s.fillRect(u,h,26,120)}s.fillStyle="#e6eaee",s.font="bold 150px sans-serif",s.textAlign="center",s.textBaseline="middle",s.save(),s.translate(256,210),s.rotate(Math.PI),s.fillText(t,0,0),s.restore(),s.fillText(e,256,3886),s.strokeStyle="rgba(16,18,22,0.13)",s.lineWidth=1;for(let a=60;a<4036;a+=13)s.beginPath(),s.moveTo(96,a),s.lineTo(416,a),s.stroke();s.restore()}function Hy(s){s.fillStyle="#3a4046",s.fillRect(0,0,256,1024);let t=555;const e=()=>(t=t*1103515245+12345&2147483647,t/2147483647);for(let n=0;n<1800;n++){const i=50+e()*30;s.fillStyle=`rgba(${i},${i+3},${i+8},0.45)`,s.fillRect(e()*256,e()*1024,2+e()*5,2+e()*5)}s.fillStyle="#d8b64a",s.fillRect(122,0,12,1024),s.fillStyle="rgba(210,215,220,0.5)",s.fillRect(6,0,5,1024),s.fillRect(245,0,5,1024);for(const n of[200,512,824]){s.fillStyle="#e8e8e8",s.fillRect(20,n,216,10),s.fillStyle="#d8b64a";for(let i=0;i<6;i++)s.fillRect(24+i*36,n+16,12,26),s.fillRect(24+i*36,n-32,12,26)}}function Vy(s){s.fillStyle="#5a6068",s.fillRect(0,0,256,256);let t=999;const e=()=>(t=t*1103515245+12345&2147483647,t/2147483647);for(let n=0;n<900;n++){const i=78+e()*30;s.fillStyle=`rgba(${i},${i+3},${i+8},0.4)`,s.fillRect(e()*256,e()*256,2+e()*5,2+e()*5)}s.strokeStyle="rgba(40,44,50,0.8)",s.lineWidth=2;for(let n=0;n<=256;n+=64)s.beginPath(),s.moveTo(n,0),s.lineTo(n,256),s.stroke(),s.beginPath(),s.moveTo(0,n),s.lineTo(256,n),s.stroke()}function Gy(s,t){let n=987654321;const i=()=>(n=n*1664525+1013904223>>>0)/4294967296,r=u=>{const d=s(512,512);return d.ctx.fillStyle="#808080",d.ctx.fillRect(0,0,512,512),u(d.ctx),d.ctx.getImageData(0,0,512,512)},o=u=>{for(const d of[-512,0,512])for(const f of[-512,0,512])u(d,f)},a=r(u=>{for(let d=0;d<9e3;d++){const f=i()*512,g=i()*512,v=i()<.5?0:255;u.fillStyle=`rgba(${v},${v},${v},${.05+i()*.12})`;const m=1+d%2;o((p,y)=>u.fillRect(f+p,g+y,m,1+(d>>1)%2))}}),l=r(u=>{for(let d=0;d<260;d++){const f=i()*512,g=i()*512,v=34+i()*110,p=i()<.5?0:255;o((y,x)=>{const _=u.createRadialGradient(f+y,g+x,2,f+y,g+x,v);_.addColorStop(0,`rgba(${p},${p},${p},${.1+i()*.1})`),_.addColorStop(1,`rgba(${p},${p},${p},0)`),u.fillStyle=_,u.beginPath(),u.arc(f+y,g+x,v,0,Math.PI*2),u.fill()})}}),c=r(u=>{u.lineWidth=1;for(let d=0;d<5200;d++){const f=i()*512,g=i()*512,v=-.5+i()*1,m=2+i()*4,p=i()<.55?0:255;u.strokeStyle=`rgba(${p},${p},${p},${.1+i()*.16})`,o((y,x)=>{u.beginPath(),u.moveTo(f+y,g+x),u.lineTo(f+y+Math.cos(v)*m,g+x+Math.sin(v)*m),u.stroke()})}}),h=t.createImageData(512,512);for(let u=0;u<512*512*4;u+=4)h.data[u]=a.data[u],h.data[u+1]=l.data[u+1],h.data[u+2]=c.data[u+2],h.data[u+3]=255;t.putImageData(h,0,0)}const sn=512,Nr=4,mi=sn*Nr,Yo=[{wall:"#6c7480",win:"#45525e",slab:"rgba(40,46,54,0.55)",glass:0,litRate:.5,cool:!1},{wall:"#7d8590",win:"#3c4652",slab:"rgba(52,58,66,0.5)",glass:0,litRate:.42,cool:!1},{wall:"#586270",win:"#39434f",slab:"rgba(30,36,44,0.6)",glass:.18,litRate:.55,cool:!1},{wall:"#8a8f94",win:"#515c66",slab:"rgba(70,74,80,0.45)",glass:0,litRate:.38,cool:!1},{wall:"#46525c",win:"#7fa2b8",slab:"rgba(24,30,36,0.6)",glass:.55,litRate:.6,cool:!0},{wall:"#71818e",win:"#8fb6c8",slab:"rgba(36,44,52,0.5)",glass:.4,litRate:.52,cool:!0},{wall:"#6e6a62",win:"#4a453d",slab:"rgba(52,48,42,0.5)",glass:0,litRate:.44,cool:!1},{wall:"#5d6672",win:"#33404c",slab:"rgba(26,32,40,0.6)",glass:.12,litRate:.58,cool:!1},{wall:"#767e86",win:"#48525c",slab:"rgba(58,64,72,0.4)",glass:0,litRate:.35,cool:!1},{wall:"#675f58",win:"#3e382f",slab:"rgba(46,40,34,0.5)",glass:0,litRate:.4,cool:!1},{wall:"#7c8a94",win:"#9cc2d4",slab:"rgba(40,50,60,0.45)",glass:.5,litRate:.62,cool:!0},{wall:"#555d66",win:"#2f3842",slab:"rgba(22,26,32,0.6)",glass:.08,litRate:.5,cool:!1},{wall:"#84857f",win:"#5a5c58",slab:"rgba(64,64,60,0.4)",glass:0,litRate:.3,cool:!1},{wall:"#5a6a74",win:"#86b0c4",slab:"rgba(30,40,48,0.5)",glass:.45,litRate:.58,cool:!0},{wall:"#6a6470",win:"#423d4a",slab:"rgba(42,38,50,0.5)",glass:0,litRate:.46,cool:!1},{wall:"#78808a",win:"#4e5a66",slab:"rgba(54,62,72,0.45)",glass:.2,litRate:.5,cool:!1}];function Wy(s){s.clearRect(0,0,mi,mi);for(let t=0;t<Yo.length;t++){const e=t%Nr*sn,n=Math.floor(t/Nr)*sn,i=Yo[t],r=40+t%5*6,o=34+t%3*12;s.fillStyle=i.wall,s.fillRect(e,n,sn,sn);for(let c=0;c<sn;c+=r){for(let h=0;h<sn;h+=o){const u=o*.58,d=r*.62;s.fillStyle=i.win,s.fillRect(e+h+o*.16,n+c+r*.18,u,d),i.glass>0&&(s.fillStyle=`rgba(255,255,255,${.1*i.glass})`,s.fillRect(e+h+o*.16,n+c+r*.18,u*.45,d))}s.fillStyle=i.slab,s.fillRect(e,n+c+r-3,sn,3)}s.fillStyle="rgba(24,28,34,0.55)";let a=7+t*13;const l=()=>(a=a*1103515245+12345&2147483647)/2147483647;for(let c=0;c<6;c++){const h=26+l()*70,u=e+l()*(sn-60);s.fillRect(u,n-0+4,h,10+l()*8)}}}function Xy(s){s.fillStyle="#000000",s.fillRect(0,0,mi,mi);for(let t=0;t<Yo.length;t++){const e=t%Nr*sn,n=Math.floor(t/Nr)*sn,i=Yo[t],r=40+t%5*6,o=34+t%3*12;let a=4242+t*777;const l=()=>(a=a*1103515245+12345&2147483647,a/2147483647);for(let c=0;c<sn;c+=r)for(let h=0;h<sn;h+=o){const u=l();if(u<1-i.litRate)continue;const d=170+Math.floor(l()*80),f=i.cool?`rgb(${Math.floor(d*.72)},${Math.floor(d*.86)},${d})`:u>.94?`rgb(${d},${d},${d})`:`rgb(${d},${Math.floor(d*.78)},${Math.floor(d*.5)})`;s.fillStyle=f,s.fillRect(e+h+o*.16,n+c+r*.18,o*.58,r*.62)}}}const yf=(s,t,e)=>`rw:${s}/${t}@${e}`;function qy(s,t){const e=[{id:"detail",kind:"detail",w:512,h:512,srgb:!1,aniso:8,repeat:[1,1]},{id:"building",kind:"building",w:mi,h:mi,srgb:!0,aniso:8,repeat:null},{id:"buildingEm",kind:"buildingEm",w:mi,h:mi,srgb:!0,aniso:8,repeat:null},{id:"taxiway",kind:"taxiway",w:256,h:1024,srgb:!0,aniso:8,repeat:[1,26]},{id:"concrete",kind:"concrete",w:256,h:256,srgb:!0,aniso:8,repeat:[24,24]}];for(const n of s)e.push({id:yf(n.nums[0],n.nums[1],t),kind:"runway",w:t,h:t*8,srgb:!0,aniso:16,repeat:null,nums:n.nums});return e}function Yy(s,t){const e=t(s.w,s.h);switch(s.kind){case"detail":Gy(t,e.ctx);break;case"building":Wy(e.ctx);break;case"buildingEm":Xy(e.ctx);break;case"taxiway":Hy(e.ctx);break;case"concrete":Vy(e.ctx);break;case"runway":zy(e.ctx,s.nums[0],s.nums[1],s.w);break}return e}const Ur=new Map,Ko=new Map;let Le=null,bo=null,Lu=!1;const Ky=(s,t)=>{const e=document.createElement("canvas");e.width=s,e.height=t;const n=e.getContext("2d",{alpha:!1}),i=n;return typeof i.roundRect!="function"&&(i.roundRect=function(r,o,a,l,c){this.beginPath(),this.moveTo(r+c,o),this.arcTo(r+a,o,r+a,o+l,c),this.arcTo(r+a,o+l,r,o+l,c),this.arcTo(r,o+l,r,o,c),this.arcTo(r,o,r+a,o,c),this.closePath()}),{canvas:e,ctx:n}};function Mf(s,t){const e=new yi(t);return e.colorSpace=s.srgb?Ae:pn,e.anisotropy=s.aniso,s.repeat?(e.wrapS=e.wrapT=He,e.repeat.set(s.repeat[0],s.repeat[1])):e.wrapS=e.wrapT=bn,e.needsUpdate=!0,e}function Sf(s){let t=Ur.get(s.id);if(!t){const e=Yy(s,Ky);t=Mf(s,e.canvas),Ur.set(s.id,t)}return t}function $y(s,t){const e=Kc(s);return{cityCount:s,treeCount:t,city:e,nature:xf(e.roadside,t)}}function jy(){return bo||(bo=(async()=>{const s=performance.now(),t=Dr.high,e=qy(an.map(i=>({nums:i.runwayNumbers})),t.runwayTexPx);for(const i of e)Ko.set(i.id,i);if(!Lu&&typeof Worker<"u")try{const i=await Zy(t.cityCount,t.treeCount,e);Le=i.world;for(const o of i.bitmaps)Ur.set(o.id,Mf(Ko.get(o.id),o.bmp));const r=performance.now()-s;return console.info(`[prime] worldgen worker OK in ${r.toFixed(0)}ms (${i.bitmaps.length} tex atlas)`),{ok:!0,viaWorker:!0,ms:r}}catch(i){Lu=!0,console.warn("[prime] worker フォールバック:",i)}Le=$y(t.cityCount,t.treeCount);const n=performance.now()-s;return console.info(`[prime] sync fallback in ${n.toFixed(0)}ms`),{ok:!0,viaWorker:!1,ms:n}})(),bo)}function Zy(s,t,e){return new Promise((n,i)=>{let r;try{r=new Ly}catch(l){i(l);return}const o=window.setTimeout(()=>{r.terminate(),i(new Error("worldgen worker timeout"))},5e3);r.onerror=()=>{window.clearTimeout(o),r.terminate(),i(new Error("worldgen worker error"))},r.onmessage=l=>{window.clearTimeout(o);const c=l.data;if(c.type!=="world"||!c.layout||!c.bitmaps){r.terminate(),i(new Error(c.message??"worldgen worker failed"));return}r.terminate(),n({world:{cityCount:s,treeCount:t,city:c.layout.city,nature:c.layout.nature},bitmaps:c.bitmaps})};const a=By();r.postMessage({type:"world",bake:a,cityCount:s,treeCount:t,defs:e},a?[a]:[])})}function Qy(s){if(Le&&Le.cityCount===s)return Le.city;const t=Kc(s);return Le?Le={cityCount:s,treeCount:Le.treeCount,city:t,nature:null}:Le={cityCount:s,treeCount:Dr.high.treeCount,city:t,nature:null},t}function Jy(s){if(Le&&Le.treeCount===s&&Le.nature)return Le.nature;const t=Le?Le.city:Kc(Dr.high.cityCount),e=xf(t.roadside,s);return Le&&Le.city===t&&(Le.nature=e),e}function Fr(s){const t=Ur.get(s);if(t)return t;const e=Ko.get(s);return e?Sf(e):void 0}function tM(s,t,e){const n=yf(s,t,e);let i=Ur.get(n);if(!i){const r={id:n,kind:"runway",w:e,h:e*8,srgb:!0,aniso:16,repeat:null,nums:[s,t]};Ko.set(n,r),i=Sf(r)}return i}function Jn(s,t){const e=document.createElement("canvas");e.width=s,e.height=t;const n=e.getContext("2d"),i=n;return typeof i.roundRect!="function"&&(i.roundRect=function(r,o,a,l,c){this.beginPath(),this.moveTo(r+c,o),this.arcTo(r+a,o,r+a,o+l,c),this.arcTo(r+a,o+l,r,o+l,c),this.arcTo(r,o+l,r,o,c),this.arcTo(r,o,r+a,o,c),this.closePath()}),[e,n]}function Gi(s,t){const e=new yi(s);return e.colorSpace=Ae,e.anisotropy=8,t&&(e.wrapS=He,e.wrapT=He,e.repeat.set(t[0],t[1])),e}function eM(s,t,e,n,i=512){return tM(e,n,i)}function nM(){return Fr("taxiway")}function iM(s){const[t,e]=Jn(256,128);return e.fillStyle="#c9a227",e.fillRect(0,0,256,128),e.strokeStyle="#1a1a1a",e.lineWidth=10,e.strokeRect(8,8,240,112),e.fillStyle="#141414",e.font="bold 72px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(s,128,68),Gi(t)}function sM(){return Fr("concrete")}function rM(s,t,e,n,i="SKYLINER",r="JA00AI"){const[c,h]=Jn(2048,1024),u=R=>`#${R.toString(16).padStart(6,"0")}`,d=u(s),f=u(t),g=u(e);h.fillStyle=d,h.fillRect(0,0,2048,1024);const v=118,m=h.createLinearGradient(0,512-v,0,512+v);m.addColorStop(0,d),m.addColorStop(.16,f),m.addColorStop(.84,f),m.addColorStop(1,d),h.fillStyle=m,h.fillRect(0,512-v,2048,v*2),h.fillStyle="rgba(30,40,52,0.35)",h.fillRect(0,512-v+12,2048,3),h.fillRect(0,512+v-15,2048,3);const p=320;h.fillStyle=g,h.fillRect(0,p,2048,11),h.fillRect(0,1024-p-11,2048,11),h.fillStyle="rgba(255,255,255,0.75)",h.fillRect(0,p+15,2048,4),h.fillRect(0,1024-p-19,2048,4);const y=1840/n,x=Math.min(30,y-12),_=34;for(const R of[380,644-_])for(let S=0;S<n;S++){const M=300+S*y;h.fillStyle="rgba(190,200,212,0.9)",h.beginPath(),h.roundRect(M-3,R-3,x+6,_+6,9),h.fill();const P=h.createLinearGradient(M,R,M,R+_);P.addColorStop(0,"#1c2c3c"),P.addColorStop(.55,"#0a121b"),P.addColorStop(1,"#131e2a"),h.fillStyle=P,h.beginPath(),h.roundRect(M,R,x,_,7),h.fill(),h.strokeStyle="rgba(168,205,235,0.5)",h.lineWidth=3,h.beginPath(),h.moveTo(M+5,R+_-6),h.lineTo(M+x-6,R+5),h.stroke()}for(const[R,S]of[[228,0],[1290,0],[700,1],[1560,1]]){const M=S===0?306:588;h.fillStyle="rgba(40,60,84,0.05)",h.beginPath(),h.roundRect(R,M,52,130,6),h.fill(),h.strokeStyle="rgba(24,36,48,0.42)",h.lineWidth=2,h.beginPath(),h.roundRect(R,M,52,130,6),h.stroke(),h.fillStyle="#0c1622",h.beginPath(),h.roundRect(R+9,M+12,16,20,5),h.fill(),h.fillStyle="rgba(20,30,40,0.8)",h.fillRect(R+40,M+72,6,14)}const A=250,T=470;h.fillStyle="#101c29",h.fillRect(A+46,0,T-A-46,54),h.fillRect(A+46,970,T-A-46,54);const E=R=>1024-R;for(const R of[!0,!1]){const S=R?M=>M:E;h.beginPath(),h.moveTo(A+6,S(66)),h.lineTo(T,S(104)),h.lineTo(T,S(276)),h.lineTo(A+30,S(300)),h.closePath(),h.fill(),h.fillStyle="rgba(120,160,200,0.16)",h.beginPath(),h.moveTo(A+20,S(84)),h.lineTo(T-8,S(118)),h.lineTo(T-8,S(150)),h.lineTo(A+20,S(118)),h.closePath(),h.fill(),h.fillStyle="#101c29",h.strokeStyle=d,h.lineWidth=8;for(const M of[A+58,A+124,A+182])h.beginPath(),h.moveTo(M,S(56)),h.lineTo(M-8,S(296)),h.stroke();h.lineWidth=1,h.strokeStyle="rgba(150,180,210,0.5)",h.lineWidth=2.5,h.beginPath(),h.moveTo(A+6,S(66)),h.lineTo(T,S(104)),h.stroke(),h.strokeStyle=d,h.lineWidth=8;for(const M of[A+58,A+124,A+182])h.beginPath(),h.moveTo(M,50),h.lineTo(M,0),h.moveTo(M,E(50)),h.lineTo(M,1024),h.stroke()}h.fillStyle=f,h.font='italic bold 92px "Helvetica Neue", Arial, sans-serif',h.textAlign="left",h.textBaseline="alphabetic",h.fillText(i,430,280),h.save(),h.translate(2048,0),h.scale(-1,1),h.fillText(i,430,684),h.restore(),h.font='bold 58px "Helvetica Neue", Arial, sans-serif',h.fillStyle="rgba(40,52,64,0.95)",h.fillText(r,1660,276),h.save(),h.translate(2048,0),h.scale(-1,1),h.fillText(r,1660,706),h.restore(),h.strokeStyle="rgba(28,40,52,0.5)",h.lineWidth=3;for(const R of[560,1020,1460])h.beginPath(),h.roundRect(R,558,96,26,8),h.stroke(),h.beginPath(),h.roundRect(R,440,96,26,8),h.stroke();h.strokeStyle="rgba(50,60,72,0.8)",h.lineWidth=4,h.beginPath(),h.moveTo(212,0),h.lineTo(212,1024),h.stroke(),h.fillStyle="rgba(40,50,60,0.9)";for(const R of[416,608])h.fillRect(236,R,16,7);return Gi(c)}function oM(s,t,e,n){const[o,a]=Jn(512,384),l=h=>`#${h.toString(16).padStart(6,"0")}`,c=a.createLinearGradient(0,384,0,0);return c.addColorStop(0,l(s)),c.addColorStop(.34,l(s)),c.addColorStop(1,l(t)),a.fillStyle=c,a.fillRect(0,0,512,384),a.fillStyle=l(e),a.beginPath(),a.moveTo(0,384*.62),a.quadraticCurveTo(512*.55,384*.66,512*.78,384*.06),a.lineTo(512,384*.06),a.quadraticCurveTo(512*.72,384*.9,0,384*.82),a.closePath(),a.fill(),a.fillStyle="rgba(250,252,255,0.96)",a.beginPath(),a.arc(512*.5,384*.34,64,0,Math.PI*2),a.fill(),a.fillStyle=l(e),a.beginPath(),a.moveTo(512*.5-40,384*.34+14),a.quadraticCurveTo(512*.5,384*.34-44,512*.5+42,384*.34+6),a.quadraticCurveTo(512*.5,384*.34-16,512*.5-40,384*.34+14),a.fill(),Gi(o)}function aM(){const[t,e]=Jn(256,256);e.fillStyle="#0e1216",e.fillRect(0,0,256,256),e.translate(256/2,256/2);for(let i=0;i<30;i++){e.rotate(Math.PI*2/30);const r=e.createLinearGradient(0,0,122,0);r.addColorStop(0,"#3a434d"),r.addColorStop(.35,"#8d99a5"),r.addColorStop(1,"#48525d"),e.fillStyle=r,e.beginPath(),e.moveTo(18,-5),e.lineTo(124,-17),e.lineTo(124,4),e.lineTo(18,6),e.closePath(),e.fill(),e.fillStyle="rgba(0,0,0,0.4)",e.beginPath(),e.moveTo(18,6),e.lineTo(124,4),e.lineTo(124,9),e.lineTo(18,9),e.closePath(),e.fill()}const n=e.createRadialGradient(0,0,2,0,0,26);n.addColorStop(0,"#c2ccd4"),n.addColorStop(.75,"#7c8790"),n.addColorStop(1,"#2c343c"),e.fillStyle=n,e.beginPath(),e.arc(0,0,26,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(24,28,32,0.9)",e.lineWidth=4;for(let i=0;i<3;i++){e.beginPath();for(let r=0;r<=Math.PI*1.5;r+=.08){const o=4+r*4.4,a=Math.cos(r+i*Math.PI*2/3)*o,l=Math.sin(r+i*Math.PI*2/3)*o;r===0?e.moveTo(a,l):e.lineTo(a,l)}e.stroke()}return Gi(t)}function lM(){const[e,n]=Jn(512,512);n.fillStyle="rgb(128,128,255)",n.fillRect(0,0,512,512);for(let h=0;h<512;h+=64){n.fillStyle="rgb(150,128,246)",n.fillRect((h+512-3)%512,0,2,512),n.fillStyle="rgb(106,128,246)",n.fillRect(h+1,0,2,512),n.fillStyle="rgb(128,150,246)",n.fillRect(0,(h+512-3)%512,512,2),n.fillStyle="rgb(128,106,246)",n.fillRect(0,h+1,512,2);for(let u=10;u<512;u+=14)n.fillStyle="rgb(128,140,250)",n.fillRect(u,(h+512-5)%512,2,1),n.fillStyle="rgb(128,116,250)",n.fillRect(u,(h+512-3)%512,2,1),n.fillStyle="rgb(140,128,250)",n.fillRect((h+512-5)%512,u,1,2),n.fillStyle="rgb(116,128,250)",n.fillRect((h+512-3)%512,u,1,2)}const i=new yi(e);i.colorSpace=pn,i.wrapS=i.wrapT=He,i.anisotropy=8;const[r,o]=Jn(512,512);o.fillStyle="rgb(206,206,206)",o.fillRect(0,0,512,512);let a=7;const l=()=>(a=a*16807%2147483647)/2147483647;for(let h=0;h<8;h++)for(let u=0;u<8;u++){const d=186+Math.floor(l()*42);o.fillStyle=`rgb(${d},${d},${d})`,o.fillRect(h*64+1,u*64+1,62,62)}o.fillStyle="rgb(238,238,238)";for(let h=0;h<512;h+=64)o.fillRect(h-1,0,2,512),o.fillRect(0,h-1,512,2);const c=new yi(r);return c.colorSpace=pn,c.wrapS=c.wrapT=He,{normalMap:i,roughnessMap:c}}function cM(){const[s,t]=Jn(512,128),e=t.createLinearGradient(0,0,0,128);e.addColorStop(0,"#9fc4dd"),e.addColorStop(.5,"#5d87a6"),e.addColorStop(1,"#3c5f7c"),t.fillStyle=e,t.fillRect(0,0,512,128),t.fillStyle="rgba(30,42,54,0.9)";for(let n=0;n<512;n+=22)t.fillRect(n,0,6,128);return t.fillRect(0,58,512,6),Gi(s,[6,1])}function tl(s=7,t=!0){const[e,n]=Jn(256,256);let i=s;const r=()=>(i=i*1103515245+12345&2147483647,i/2147483647);for(let o=0;o<12;o++){const a=40+r()*176,l=70+r()*116,c=30+r()*52,h=n.createRadialGradient(a,l,2,a,l,c);h.addColorStop(0,"rgba(255,255,255,0.92)"),h.addColorStop(.55,"rgba(248,251,255,0.42)"),h.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=h,n.fillRect(0,0,256,256)}if(t){const o=n.createLinearGradient(0,150,0,256);o.addColorStop(0,"rgba(140,160,190,0)"),o.addColorStop(1,"rgba(110,130,170,0.34)"),n.fillStyle=o,n.globalCompositeOperation="source-atop",n.fillRect(0,150,256,106),n.globalCompositeOperation="source-over"}return Gi(e)}function hM(){const[s,t]=Jn(1024,512);t.fillStyle="#1a1f26",t.fillRect(0,0,1024,512);const e=(n,i,r,o)=>{t.fillStyle="#0c1116",t.beginPath(),t.arc(n,i,r,0,Math.PI*2),t.fill(),t.strokeStyle="#3d4c5c",t.lineWidth=4,t.beginPath(),t.arc(n,i,r,0,Math.PI*2),t.stroke();for(let a=0;a<=10;a++){const l=-Math.PI*.75+a/10*Math.PI*1.5;t.beginPath(),t.moveTo(n+Math.cos(l)*(r-14),i+Math.sin(l)*(r-14)),t.lineTo(n+Math.cos(l)*(r-4),i+Math.sin(l)*(r-4)),t.stroke()}t.strokeStyle="#ff9d3c",t.lineWidth=5,t.beginPath(),t.moveTo(n,i),t.lineTo(n+Math.cos(-Math.PI*.25)*(r-26),i+Math.sin(-Math.PI*.25)*(r-26)),t.stroke(),t.fillStyle="#9fd6ff",t.font="bold 22px monospace",t.textAlign="center",t.fillText(o,n,i+r+30)};e(190,220,130,"AIRSPEED"),e(512,220,130,"ATTITUDE"),e(834,220,130,"ALTITUDE"),t.fillStyle="#2a323c";for(let n=0;n<14;n++)t.fillRect(60+n*66,420,44,30),t.fillStyle=n%3===0?"#4a9c5c":"#2a323c";return Gi(s)}function uM(){return Fr("detail")}const Si=new Map,Du=new Map;function dM(s,t,e,n,i="SKYLINER",r="JA00AI"){const o=`fus:${s}|${t}|${e}|${n}|${i}|${r}`;let a=Si.get(o);return a||(a=rM(s,t,e,n,i,r),Si.set(o,a)),a}function fM(s,t,e,n){const i=`tail:${s}|${t}|${e}|${n}`;let r=Si.get(i);return r||(r=oM(s,t,e),Si.set(i,r)),r}function pM(){let s=Si.get("fan");return s||(s=aM(),Si.set("fan",s)),s}function mM(){let s=Si.get("panel");return s||(s=hM(),Si.set("panel",s)),s}function gM(){let s=Du.get("panelMaps");return s||(s=lM(),Du.set("panelMaps",s)),s}function vM(){const s=(t,e,n,i)=>{const o=document.createElement("canvas");o.width=64,o.height=64;const a=o.getContext("2d"),l=a.createImageData(64,64),c=_M(i.charCodeAt(0)*7919+i.length*104729),h=new Float32Array(64*64),u=6,d=new Float32Array(u*u);for(let m=0;m<u*u;m++)d[m]=c();const f=(m,p)=>{const y=m/64*u,x=p/64*u,_=Math.floor(y)%u,A=Math.floor(x)%u,T=y-Math.floor(y),E=x-Math.floor(x),R=d[A*u+_],S=d[A*u+(_+1)%u],M=d[(A+1)%u*u+_],P=d[(A+1)%u*u+(_+1)%u];return R+(S-R)*T+(M+(P-M)*T-(R+(S-R)*T))*E};for(let m=0;m<64;m++)for(let p=0;p<64;p++){let y=.5+(f(p,m)-.5)*.3+(c()-.5)*e;if(i==="grass"&&(y+=Math.sin(m*1.9+f(p,m)*7)*.035),i==="sand"&&(y+=Math.sin(m*.8+Math.sin(p*.2)*1.9)*.05),i==="rock"){const x=Math.abs(f(p*1.7+11,m*.35)-.5)<.028?-.3:0;y+=x}i==="dirt"&&(y+=c()<.045?-.16:0),h[m*64+p]=y}let g=0;for(let m=0;m<4096;m++)g+=h[m];g/=4096;for(let m=0;m<4096;m++)h[m]=.5+(h[m]-g)*.92;for(let m=0;m<64;m++)for(let p=0;p<64;p++){const y=m*64+p;let x=t[0],_=t[1],A=t[2];const T=i==="dirt"?.45:.35,E=Math.max(0,(h[y]-.5)*2);x=x+(n[0]-x)*E*T,_=_+(n[1]-_)*E*T,A=A+(n[2]-A)*E*T;const R=.55+.9*h[y];l.data[y*4]=Math.max(0,Math.min(255,Math.round(x*R*255))),l.data[y*4+1]=Math.max(0,Math.min(255,Math.round(_*R*255))),l.data[y*4+2]=Math.max(0,Math.min(255,Math.round(A*R*255))),l.data[y*4+3]=255}a.putImageData(l,0,0);const v=new yi(o);return v.wrapS=v.wrapT=He,v.colorSpace=pn,v.generateMipmaps=!0,v.minFilter=Ln,v.magFilter=Ne,v.needsUpdate=!0,v};return[s([.335,.425,.215],.16,[.52,.6,.3],"grass"),s([.375,.285,.185],.22,[.3,.22,.145],"dirt"),s([.45,.44,.415],.2,[.315,.3,.278],"rock"),s([.7,.64,.47],.13,[.78,.72,.55],"sand")]}function _M(s){let t=s>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}let wf=null,bf=null,Tf=null;async function xM(){if(!(typeof window>"u"||typeof fetch!="function"||br()))try{const t=await fetch("./"+"terrain-bake.bin",{cache:"force-cache"});if(!t.ok)return;Fy(await t.arrayBuffer());const e=br();if(!e)return;const n=new _i(e.ero,e.N,e.N,zr,Qn);n.minFilter=n.magFilter=Oe,n.generateMipmaps=!1,n.needsUpdate=!0;const i=new _i(e.shade,e.N,e.N,Ve,ln);if(i.minFilter=i.magFilter=Ne,i.generateMipmaps=!1,i.needsUpdate=!0,wf=n,bf=i,e.light){const r=new _i(e.light,e.N>>1,e.N>>1,Ve,ln);r.minFilter=r.magFilter=Ne,r.generateMipmaps=!1,r.needsUpdate=!0,Tf=r}}catch{}}const yM=()=>wf??(()=>{const s=new _i(new Uint32Array([32768]),1,1,zr,Qn);return s.minFilter=s.magFilter=Oe,s.generateMipmaps=!1,s.needsUpdate=!0,s})(),MM=()=>bf??(()=>{const s=new _i(new Uint8Array([128,128,0,0]),1,1,Ve,ln);return s.minFilter=s.magFilter=Ne,s.generateMipmaps=!1,s.needsUpdate=!0,s})(),SM=()=>Tf??(()=>{const s=new _i(new Uint8Array([255,255,255,0]),1,1,Ve,ln);return s.minFilter=s.magFilter=Ne,s.generateMipmaps=!1,s.needsUpdate=!0,s})();let wM=null;const bM=()=>wM??=uM();let TM=null;const To=()=>TM??=vM(),Nu=`
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
`,el=`
uniform vec2 uSnap;
uniform float uSpacing;
uniform float uParent;   // 親レベルの間隔（0 = morph なし＝最遠レベル）
uniform float uHalf;     // パッチ半辺 [m]
uniform float uMorphW;   // morph バンド幅 [m]
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
// v23: 多重フラクタル（world/field.ts fbmM と同一式 — reliefV ミラー契約）
float fbm2M(vec2 p, int oct) {
  float amp = 0.5, freq = 1.0, sum = 0.0, norm = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= oct) break;
    float n = vnoise(p * freq);
    sum += amp * n; norm += amp;
    amp = min(0.98, amp * (0.42 + 1.16 * n));
    freq *= 2.03;
  }
  return sum / norm;
}
float reliefV(vec2 p) {
  vec2 wp = p + 900.0 * (vec2(
    fbm2(p * 0.000021 + vec2(5.2, 1.3), 2) - 0.5,
    fbm2(p * 0.000021 + vec2(9.1, 4.4), 2) - 0.5));
  float base = fbm2(wp * 0.000045 + vec2(3.1, 7.7), 3);
  float r1 = pow(1.0 - abs(2.0 * fbm2M(wp * 0.00013 + vec2(21.3, 5.9), 3) - 1.0), 2.2);
  float r2 = pow(1.0 - abs(2.0 * fbm2M(wp * 0.00009 + vec2(40.7, 17.2), 3) - 1.0), 2.6);
  float r3 = pow(1.0 - abs(2.0 * fbm2M(wp * 0.00026 + vec2(61.3, 33.7), 3) - 1.0), 3.1);
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
      fl = max(fl, 1.0 - smoothstep(${rn.FLAT_RADIUS}.0, ${(rn.FLAT_RADIUS+3800).toFixed(1)}, length(p - uAirports[i].xy)));
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
  return (reliefV(p) + eroDeltaV(p)) * f - seaMaskV(p) * 520.0 * f;
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
`,AM=`
  vec2 wp2 = (modelMatrix * vec4(position, 1.0)).xz;
  float hM = terrHM(wp2);
  float eN = max(uSpacing * 0.6, 6.0);
  float hx = terrH(wp2 + vec2(eN, 0.0)) - terrH(wp2 - vec2(eN, 0.0));
  float hz = terrH(wp2 + vec2(0.0, eN)) - terrH(wp2 - vec2(0.0, eN));
  vTN = normalize(vec3(-hx / (2.0 * eN), 1.0, -hz / (2.0 * eN)));
  vTH = hM;
  vTXZ = wp2;
  vec3 objectNormal = vTN;
`,EM=`
  vec3 transformed = vec3(position.x, hM, position.z);
`,RM=`
  vec2 wp2 = (modelMatrix * vec4(position, 1.0)).xz;
  float hM = terrHM(wp2);
  vec3 transformed = vec3(position.x, hM, position.z);
`,CM=`
varying float vTH;
varying vec3 vTN;
varying vec2 vTXZ;
uniform sampler2D uDetail;
uniform mediump sampler2D uShade;
uniform sampler2D uLight;
uniform sampler2D uSplatG;
uniform sampler2D uSplatD;
uniform sampler2D uSplatR;
uniform sampler2D uSplatS;
uniform vec3 uSunView;
uniform vec3 uFogWarm;
uniform float uShadeMix;
uniform float uShadeAmt;
float gDetQ;
vec3 gDet;
vec4 gLight;
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
  float nA = vnoise(vTXZ * 0.00108 + vec2(21.7, 5.3));
  float nB = vnoise(vTXZ * 0.0058 + vec2(3.3, 12.1));
  float snowLine = 1750.0 - 320.0 * (1.0 - clamp(vTN.z * 0.5 + 0.5, 0.0, 1.0));
  float snow = clamp((h - snowLine) / 430.0, 0.0, 1.0) * (1.0 - clamp(slope / 1.15, 0.0, 1.0) * 0.65);
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
    col = mix(col, col * vec3(0.78, 0.84, 0.70), 0.55 * smoothstep(0.40, 0.74, nB));
    if (distC < 7000.0) col *= 0.962 + 0.076 * vnoise(vTXZ * 0.0195 + vec2(7.7, 1.3));
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
    // v23: 谷底収斂影はベイク AO（gLight.r）へ移行。雪は稜線級のみ（snow は冒頭計算）
    float snowNoise = 0.92 + 0.10 * vnoise(vTXZ * 0.0016 + vec2(3.7, 8.2)) * nearQ;
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
  // ===== v23-1: ベイク影×AO（谷の収斂影・夕方の長影。光場 1 サンプル = gLight）=====
  {
    float ao = gLight.r;
    float sh = mix(gLight.g, gLight.b, uShadeMix);
    col *= mix(1.0, (0.50 + 0.50 * ao) * (0.40 + 0.60 * sh), uShadeAmt);
  }
  // ===== v23-3: 川・湖（流域蓄積 field から。谷と一致。水深で色相）=====
  {
    float fl = gLight.a;
    float riv = smoothstep(0.235, 0.40, fl) * (1.0 - smoothstep(0.115, 0.30, slope))
              * (1.0 - af) * (1.0 - smoothstep(160.0, 480.0, h));
    if (h > 1.2 && riv > 0.012) {
      float dep = smoothstep(0.40, 0.88, fl);
      vec3 wc = mix(vec3(0.36, 0.455, 0.40), vec3(0.078, 0.185, 0.285), dep);
      wc *= 0.92 + 0.16 * vnoise(vTXZ * 0.02 + vec2(4.7, 9.1)); // 浅瀬の揺らぎ
      col = mix(col, wc, min(1.0, riv) * 0.93);
    }
  }
  // ===== v23-6: 樹林帯（近景 canopy + 遠景を林帯テクスチャ風に。森林限界つき）=====
  {
    float tl = 760.0 + 300.0 * vnoise(vTXZ * 0.00022 + vec2(31.7, 12.1));
    float forestT2 = clamp((h - 10.0) / 240.0, 0.0, 1.0);
    float humid = 0.55 + 0.45 * smoothstep(0.06, 0.42, gLight.a) + 0.22 * nA;
    float fMask = forestT2 * (1.0 - smoothstep(tl - 130.0, tl + 170.0, h))
                * (1.0 - smoothstep(0.30, 0.62, slope)) * clamp(humid, 0.0, 1.0);
    float canNear = smoothstep(0.52, 0.80, vnoise(vTXZ * 0.0088 + vec2(1.1, 4.4)));
    float canFar = smoothstep(0.46, 0.74, vnoise(vTXZ * 0.0031 + vec2(2.6, 7.9)));
    float canopy = mix(canFar, canNear, step(distC, 7000.0));
    col = mix(col, col * vec3(0.66, 0.80, 0.62) * 0.94, clamp(fMask * canopy * 1.15, 0.0, 1.0) * 0.62 * (1.0 - snow));
  }
  // ===== v23-4: 地表スプラット（傾斜・高度で 草/土/岩/砂 を混合、タイル回転で繰り返し消去）=====
  if (gDetQ > 0.015 && h > 1.2 && af < 0.5) {
    vec2 sp = vTXZ * (1.0 / 15.0);
    vec2 c15 = floor(sp);
    float hj = h2i(int(c15.x) * 7 + 11, int(c15.y) * 13 + 5);
    vec2 f0 = fract(sp) - 0.5;
    vec2 f1 = hj < 0.25 ? f0 : (hj < 0.5 ? vec2(-f0.y, f0.x) : (hj < 0.75 ? -f0 : vec2(f0.y, -f0.x)));
    vec2 uvS = c15 + f1;
    float wr = clamp((slope - 0.20) / 0.36 + clamp((h - 900.0) / 700.0, 0.0, 1.0) * 0.7, 0.0, 1.0);
    float ws2 = (1.0 - smoothstep(6.0, 40.0, h)) * (1.0 - wr) + snow * 0.0;
    float wGr = max(0.0, 1.0 - wr - ws2);
    float wDi = 0.24 * smoothstep(0.34, 0.62, nB) * wGr;
    wGr -= wDi;
    vec3 spl = texture2D(uSplatG, uvS).rgb * wGr + texture2D(uSplatD, uvS).rgb * wDi
             + texture2D(uSplatR, uvS).rgb * wr + texture2D(uSplatS, uvS).rgb * ws2;
    col = mix(col, col * (0.50 + 1.16 * spl), min(1.0, gDetQ) * 0.78);
  }
  return col;
}
`;function PM(){const s=an.slice(0,4).map(n=>new Zt(n.center.x,n.center.z,0,0));for(;s.length<4;)s.push(new Zt(1e7,1e7,0,0));const t={value:s},e={value:Math.min(4,an.length)};return{uAirports:t,uApN:e}}function nl(s,t){const e=s.parent===0?s.seg:s.size<=2200?t:s.seg,n=new Ze(s.size,s.size,e,e);n.rotateX(-Math.PI/2),n.boundingSphere=new Cn(new C(0,0,0),Math.hypot(s.size*.71,3e3));const i=PM(),r=new Kt({roughness:.94,metalness:0});r.glslVersion=Go;const o={uSnap:{value:new it(0,0)},uSpacing:{value:s.size/e},uParent:{value:s.parent},uHalf:{value:s.half},uMorphW:{value:s.morphW},uDetail:{value:bM()},uEro:{value:yM()},uShade:{value:MM()},uEroGeo:{value:(()=>{const h=br();return h?new Zt(h.cell,h.min,h.min,h.N):new Zt(1,0,0,1)})()},uLight:{value:SM()},uSplatG:{value:To()[0]},uSplatD:{value:To()[1]},uSplatR:{value:To()[2]},uSplatS:{value:To()[3]},uSunView:{value:new C(.55,.62,.28)},uFogWarm:{value:new ft(1,.93,.8)},uShadeMix:{value:0},uShadeAmt:{value:1}};r.onBeforeCompile=h=>{Object.assign(h.uniforms,i,o),h.fragmentShader=Nu+h.fragmentShader,h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
`+el+`
varying float vTH;
varying vec3 vTN;
varying vec2 vTXZ;`).replace("#include <beginnormal_vertex>",AM).replace("#include <begin_vertex>",EM),h.fragmentShader=h.fragmentShader.replace("#include <common>",`#include <common>
`+el+`
`+CM).replace("#include <color_fragment>",`#include <color_fragment>
  diffuseColor.rgb = terrainColorV(cameraPosition);
  diffuseColor.rgb *= 1.0 + (gDet - 0.5) * vec3(0.44, 0.34, 0.26) * gDetQ;`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if (vTH < -3.0) discard;
{ gDetQ = 1.0 - smoothstep(320.0, 2600.0, length(cameraPosition - vec3(vTXZ.x, vTH, vTXZ.y)));
  gDet = texture2D(uDetail, vTXZ * (1.0 / 30.0)).rgb;
  gLight = texture2D(uLight, (vTXZ - uEroGeo.yz) / (uEroGeo.x * uEroGeo.w)); }`).replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
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
  // v23: 高さフォグ（低い所ほど濃い）+ 太陽方向の前方散乱（明るく暖色に）
  float altF = 0.40 + 0.60 * exp(-max(vTH, 0.0) * 0.00135) * (0.72 + 0.28 * exp(-max(cameraPosition.y, 0.0) * 0.0011));
  vec3 vd = normalize(vec3(vTXZ.x, vTH, vTXZ.y) - cameraPosition);
  float fwd = pow(clamp(dot(vd, normalize(uSunView)), 0.0, 1.0), 3.2);
  vec3 fcol = mix(fogColor, uFogWarm, fwd * 0.60);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fcol, min(1.0, haze * altF * (0.86 + 0.5 * fwd)));
#endif`)},r.customProgramCacheKey=()=>"terrain-v2-"+s.size+(br()?"-B":"-b");const a=new Jd({depthPacking:Ud});a.glslVersion=Go;const l={uSnap:o.uSnap,uSpacing:o.uSpacing,uParent:o.uParent,uHalf:o.uHalf,uMorphW:o.uMorphW,uEro:o.uEro,uEroGeo:o.uEroGeo};a.onBeforeCompile=h=>{Object.assign(h.uniforms,i,l),h.fragmentShader=Nu+h.fragmentShader,h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
`+el).replace("#include <begin_vertex>",RM)},a.customProgramCacheKey=()=>"terrain-v2-depth-"+s.size+(br()?"-B":"-b");const c=new st(n,r);return c.customDepthMaterial=a,c.receiveShadow=!0,c.castShadow=!0,c.frustumCulled=!1,c.matrixAutoUpdate=!0,{mesh:c,mat:r,depth:a,cfg:s,u:o}}function IM(s,t=160,e=!0){const n=new ue,i=nl({size:48e3,seg:152,parent:0,half:24e3,morphW:0,snap:0},t),r=nl({size:8e3,seg:128,parent:250,half:4e3,morphW:500,snap:250},t),o=nl({size:2e3,seg:t,parent:e?50:250,half:1e3,morphW:130,snap:e?50:250},t);i.mesh.name="terrain",r.mesh.name="terrain-mid",o.mesh.name="terrain-near",r.mesh.visible=e,n.add(i.mesh,r.mesh,o.mesh),s.add(n);const a=(d,f)=>Math.round(d/f)*f;let l="",c="";function h(d,f,g){d.mesh.position.set(f,0,g),d.u.uSnap.value.set(f,g)}function u(d,f){d.u.uParent.value=f,d.cfg.parent=f}return{group:n,levels:[i,r,o],update(d,f){const g=a(d,250),v=a(f,250),m=g+","+v;m!==c&&(c=m,h(r,g,v));const p=r.mesh.visible?50:250,y=a(d,p),x=a(f,p),_=y+","+x;_!==l&&(l=_,h(o,y,x),u(o,r.mesh.visible?50:250),o.cfg.snap=p)},setMid(d){r.mesh.visible=d,u(o,d?50:250),o.cfg.snap=d?50:250,l=""},setAtmos(d){const f=i.u;f.uSunView.value.copy(d.sunDir),f.uFogWarm.value.copy(d.warm),f.uShadeMix.value=d.shadeMix,f.uShadeAmt.value=d.shadeAmt}}}function LM(s){const t={uTime:{value:0},uSunDir:{value:new C(ui.x,ui.y,ui.z).normalize()},uDeep:{value:new ft(800082)},uShallow:{value:new ft(3044247)},uSky:{value:new ft(10274020)},uHorizon:{value:new ft(12901102)},uTop:{value:new ft(3040192)},uSunTint:{value:new ft(1,.93,.8)},uSunUp:{value:.82}},e=new Ue({uniforms:t,vertexShader:`
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
    `.replace("WORLD_FOG_FAR",rn.FOG_FAR.toFixed(1)),fog:!1,depthTest:!1,depthWrite:!1}),n=new st(new Ze(9e4,9e4),e);return n.rotation.x=-Math.PI/2,n.position.y=rn.SEA_LEVEL,n.frustumCulled=!1,n.renderOrder=-9,s.add(n),{mesh:n,update(i){t.uTime.value=i},setHorizon(i){t.uHorizon.value.copy(i)},setPalette(i,r,o,a){t.uTop.value.setHex(i),t.uSky.value.setHex(r),t.uSunTint.value.setHex(o),t.uSunUp.value=a}}}function DM(s,t){const e=new ue,n=Yc(918273),i=tl(11,!0),r=tl(23,!0),o=tl(47,!1),a=new ki(1,20),l=new De({color:2241348,transparent:!0,opacity:.16,depthWrite:!1,fog:!0,polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:0}),c=Math.round(t*.62);for(let g=0;g<c;g++){const v=(n()-.5)*36e3,m=(n()-.5)*36e3,p=1200+n()*1400,y=420+n()*620,x=4+Math.floor(n()*5);for(let A=0;A<x;A++){const T=new sc({map:n()>.5?i:r,transparent:!0,opacity:.78+n()*.18,depthWrite:!1,fog:!0}),E=new ou(T);E.position.set(v+(n()-.5)*y*1.6,p+(n()-.35)*y*.34,m+(n()-.5)*y*1.3);const R=y*(.55+n()*.6);E.scale.set(R,R*.52,1),E.renderOrder=2,e.add(E)}const _=we(v,m);if(_>-2){const A=new st(a,l);A.rotation.x=-Math.PI/2,A.position.set(v,_+60,m);const T=y*1.9;A.scale.set(T,T,1),e.add(A)}}const h=Math.round(t*.38);for(let g=0;g<h;g++){const v=new sc({map:o,transparent:!0,opacity:.3+n()*.22,depthWrite:!1,fog:!0}),m=new ou(v);m.position.set((n()-.5)*42e3,4600+n()*1600,(n()-.5)*42e3);const p=2400+n()*3400;m.scale.set(p,p*.16,1),m.renderOrder=1,e.add(m)}let u=0;s.add(e);const d=[],f=[];for(const g of e.children)if(g.isSprite){const v=g;d.push(v),f.push(v.material.opacity)}return{group:e,update(g){u+=g*2.2,u>4e4&&(u=0),e.position.x=u%800-400},setDensity(g){const v=Math.max(0,Math.min(1,g)),m=d.length;for(let p=0;p<m;p++)d[p].visible=m===0?!0:p/m<v},setDarken(g){const v=Math.max(0,Math.min(1,g));for(let m=0;m<d.length;m++){const p=d[m].material;p.color.setRGB(1-.45*v,1-.42*v,1-.36*v),p.opacity=f[m]*(1-.25*v)}l.opacity=.16*(1+v)}}}function Uu(s,t){if(t===Bp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(t===Jl||t===Nd){let e=s.getIndex();if(e===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),e=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=e.count-2,i=[];if(t===Jl)for(let o=1;o<=n;o++)i.push(e.getX(0)),i.push(e.getX(o)),i.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(e.getX(o)),i.push(e.getX(o+1)),i.push(e.getX(o+2))):(i.push(e.getX(o+2)),i.push(e.getX(o+1)),i.push(e.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),s}class Af extends Xs{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new BM(e)}),this.register(function(e){return new kM(e)}),this.register(function(e){return new KM(e)}),this.register(function(e){return new $M(e)}),this.register(function(e){return new jM(e)}),this.register(function(e){return new HM(e)}),this.register(function(e){return new VM(e)}),this.register(function(e){return new GM(e)}),this.register(function(e){return new WM(e)}),this.register(function(e){return new OM(e)}),this.register(function(e){return new XM(e)}),this.register(function(e){return new zM(e)}),this.register(function(e){return new YM(e)}),this.register(function(e){return new qM(e)}),this.register(function(e){return new UM(e)}),this.register(function(e){return new ZM(e)}),this.register(function(e){return new QM(e)})}load(t,e,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=wr.extractUrlBase(t);o=wr.resolveURL(c,this.path)}else o=wr.extractUrlBase(t);this.manager.itemStart(t);const a=function(c){i?i(c):console.error(c),r.manager.itemError(t),r.manager.itemEnd(t)},l=new pf(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(t,function(c){try{r.parse(c,o,function(h){e(h),r.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(l.decode(new Uint8Array(t,0,4))===Ef){try{o[$t.KHR_BINARY_GLTF]=new JM(t)}catch(u){i&&i(u);return}r=JSON.parse(o[$t.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new dS(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case $t.KHR_MATERIALS_UNLIT:o[u]=new FM;break;case $t.KHR_DRACO_MESH_COMPRESSION:o[u]=new tS(r,this.dracoLoader);break;case $t.KHR_TEXTURE_TRANSFORM:o[u]=new eS;break;case $t.KHR_MESH_QUANTIZATION:o[u]=new nS;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(t,e){const n=this;return new Promise(function(i,r){n.parse(t,e,i,r)})}}function NM(){let s={};return{get:function(t){return s[t]},add:function(t,e){s[t]=e},remove:function(t){delete s[t]},removeAll:function(){s={}}}}const $t={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class UM{constructor(t){this.parser=t,this.name=$t.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){const r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let i=e.cache.get(n);if(i)return i;const r=e.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let c;const h=new ft(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],$e);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Gc(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new gf(h),c.distance=u;break;case"spot":c=new ty(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Wn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=e.createUniqueName(l.name||"light_"+t),i=Promise.resolve(c),e.cache.add(n,i),i}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,r=n.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(e.cache,a,l)})}}class FM{constructor(){this.name=$t.KHR_MATERIALS_UNLIT}getMaterialType(){return De}extendParams(t,e,n){const i=[];t.color=new ft(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],$e),t.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(t,"map",r.baseColorTexture,Ae))}return Promise.all(i)}}class OM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}}class BM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new it(a,a)}return Promise.all(r)}}class kM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class zM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class HM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];e.sheenColor=new ft(0,0,0),e.sheenRoughness=0,e.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],$e)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,Ae)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class VM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class GM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return e.attenuationColor=new ft().setRGB(a[0],a[1],a[2],$e),Promise.all(r)}}class WM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class XM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return e.specularColor=new ft().setRGB(a[0],a[1],a[2],$e),o.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,Ae)),Promise.all(r)}}class qM{constructor(t){this.parser=t,this.name=$t.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(r)}}class YM{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Qe}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class KM{constructor(t){this.parser=t,this.name=$t.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}}class $M{constructor(t){this.parser=t,this.name=$t.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,r=i.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(t,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class jM{constructor(t){this.parser=t,this.name=$t.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,r=i.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(t,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class ZM{constructor(t){this.name=$t.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class QM{constructor(t){this.name=$t.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=e.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==dn.TRIANGLES&&c.mode!==dn.TRIANGLE_STRIP&&c.mode!==dn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const v=new kt,m=new C,p=new ge,y=new C(1,1,1),x=new An(g.geometry,g.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,_),l.SCALE&&y.fromBufferAttribute(l.SCALE,_),x.setMatrixAt(_,v.compose(m,p,y));for(const _ in l)if(_==="_COLOR_0"){const A=l[_];x.instanceColor=new fi(A.array,A.itemSize,A.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,l[_]);_e.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Ef="glTF",lr=12,Fu={JSON:1313821514,BIN:5130562};class JM{constructor(t){this.name=$t.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,lr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Ef)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-lr,r=new DataView(t,lr);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===Fu.JSON){const c=new Uint8Array(t,lr+o,a);this.content=n.decode(c)}else if(l===Fu.BIN){const c=lr+o;this.body=t.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class tS{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$t.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,i=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=lc[h]||h.toLowerCase();a[u]=o[h]}for(const h in t.attributes){const u=lc[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[t.attributes[h]],f=ys[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return e.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const v=f.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}u(f)},a,c,$e,d)})})}}class eS{constructor(){this.name=$t.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class nS{constructor(){this.name=$t.KHR_MESH_QUANTIZATION}}class Rf extends Hr{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i*3+i;for(let o=0;o!==i;o++)e[o]=n[r+o];return e}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-e,u=(n-e)/h,d=u*u,f=d*u,g=t*c,v=g-c,m=-2*f+3*d,p=f-d,y=1-m,x=p-d+u;for(let _=0;_!==a;_++){const A=o[v+_+a],T=o[v+_+l]*h,E=o[g+_+a],R=o[g+_]*h;r[_]=y*A+x*T+m*E+p*R}return r}}const iS=new ge;class sS extends Rf{interpolate_(t,e,n,i){const r=super.interpolate_(t,e,n,i);return iS.fromArray(r).normalize().toArray(r),r}}const dn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ys={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ou={9728:Oe,9729:Ne,9984:bd,9985:Lo,9986:pr,9987:Ln},Bu={33071:bn,33648:Ho,10497:He},il={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},lc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ci={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},rS={CUBICSPLINE:void 0,LINEAR:Cr,STEP:Rr},sl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function oS(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Kt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Zn})),s.DefaultMaterial}function Ii(s,t,e){for(const n in e.extensions)s[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function Wn(s,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(s.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function aS(s,t,e){let n=!1,i=!1,r=!1;for(let c=0,h=t.length;c<h;c++){const u=t[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,h=t.length;c<h;c++){const u=t[c];if(n){const d=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function lS(s,t){if(s.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)s.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(s.morphTargetInfluences.length===e.length){s.morphTargetDictionary={};for(let n=0,i=e.length;n<i;n++)s.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function cS(s){let t;const e=s.extensions&&s.extensions[$t.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+rl(e.attributes):t=s.indices+":"+rl(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)t+=":"+rl(s.targets[n]);return t}function rl(s){let t="";const e=Object.keys(s).sort();for(let n=0,i=e.length;n<i;n++)t+=e[n]+":"+s[e[n]]+";";return t}function cc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hS(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const uS=new kt;class dS{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new NM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new Qx(this.options.manager):this.textureLoader=new iy(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new pf(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Ii(r,a,i),Wn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=e.length;i<r;i++){const o=e[i].joints;for(let a=0,l=o.length;a<l;a++)t[o[a]].isBone=!0}for(let i=0,r=t.length;i<r;i++){const o=t[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const i=t(e[n]);if(i)return i}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let i=0;i<e.length;i++){const r=t(e[i]);r&&n.push(r)}return n}getDependency(t,e){const n=t+":"+e;let i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!i)throw new Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(r,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[$t.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(wr.resolveURL(e.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const i=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(t){const e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){const o=il[i.type],a=ys[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new ve(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=il[i.type],c=ys[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let v,m;if(f&&f!==u){const p=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=e.cache.get(y);x||(v=new c(a,p*f,i.count*f/h),x=new tf(v,f/h),e.cache.add(y,x)),m=new Lr(x,l,d%f/h,g)}else a===null?v=new c(i.count*l):v=new c(a,d,i.count*l),m=new ve(v,l,g);if(i.sparse!==void 0){const p=il.SCALAR,y=ys[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,A=new y(o[1],x,i.sparse.count*p),T=new c(o[2],_,i.sparse.count*l);a!==null&&(m=new ve(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,R=A.length;E<R;E++){const S=A[E];if(m.setX(S,T[E*l]),l>=2&&m.setY(S,T[E*l+1]),l>=3&&m.setZ(S,T[E*l+2]),l>=4&&m.setW(S,T[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){const e=this.json,n=this.options,r=e.textures[t].source,o=e.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,n){const i=this,r=this.json,o=r.textures[t],a=r.images[e],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Ou[d.magFilter]||Ne,h.minFilter=Ou[d.minFilter]||Ln,h.wrapS=Bu[d.wrapS]||He,h.wrapT=Bu[d.wrapT]||He,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Oe&&h.minFilter!==Ne,i.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(t,e){const n=this,i=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const o=i.images[t],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;e.isImageBitmapLoader===!0&&(g=function(v){const m=new Re(v);m.needsUpdate=!0,d(m)}),e.load(wr.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),Wn(u,o),u.userData.mimeType=o.mimeType||hS(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[$t.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[$t.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[$t.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const i=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new sa,gn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(t.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new sf,gn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}t.material=n}getMaterialType(){return Kt}loadMaterial(t){const e=this,n=this.json,i=this.extensions,r=n.materials[t];let o;const a={},l=r.extensions||{},c=[];if(l[$t.KHR_MATERIALS_UNLIT]){const u=i[$t.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,e))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new ft(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],$e),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(e.assignTexture(a,"map",u.baseColorTexture,Ae)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=fn);const h=r.alphaMode||sl.OPAQUE;if(h===sl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===sl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==De&&(c.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new it(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==De&&(c.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==De){const u=r.emissiveFactor;a.emissive=new ft().setRGB(u[0],u[1],u[2],$e)}return r.emissiveTexture!==void 0&&o!==De&&c.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,Ae)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),Wn(u,r),e.associations.set(u,{materials:t}),r.extensions&&Ii(i,u,r),u})}createUniqueName(t){const e=se.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[$t.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(l){return ku(l,a,e)})}const o=[];for(let a=0,l=t.length;a<l;a++){const c=t[a],h=cS(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[$t.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=ku(new ye,c,e),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(t){const e=this,n=this.json,i=this.extensions,r=n.meshes[t],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?oS(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const v=h[f],m=o[f];let p;const y=c[f];if(m.mode===dn.TRIANGLES||m.mode===dn.TRIANGLE_STRIP||m.mode===dn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Sx(v,y):new st(v,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===dn.TRIANGLE_STRIP?p.geometry=Uu(p.geometry,Nd):m.mode===dn.TRIANGLE_FAN&&(p.geometry=Uu(p.geometry,Jl));else if(m.mode===dn.LINES)p=new Tx(v,y);else if(m.mode===dn.LINE_STRIP)p=new kc(v,y);else if(m.mode===dn.LINE_LOOP)p=new Ax(v,y);else if(m.mode===dn.POINTS)p=new ra(v,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&lS(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),Wn(p,r),m.extensions&&Ii(i,p,m),e.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)e.associations.set(u[f],{meshes:t,primitives:f});if(u.length===1)return r.extensions&&Ii(i,u[0],r),u[0];const d=new ue;r.extensions&&Ii(i,d,r),e.associations.set(d,{meshes:t});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new qe(ec.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(e=new na(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),Wn(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let i=0,r=e.joints.length;i<r;i++)n.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new kt;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[c])}return new Bc(a,l)})}loadAnimation(t){const e=this.json,n=this,i=e.animations[t],r=i.name?i.name:"animation_"+t,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],v=f.target,m=v.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,y=i.parameters!==void 0?i.parameters[g.output]:g.output;v.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",y)),c.push(g),h.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],v=u[3],m=u[4],p=[];for(let y=0,x=d.length;y<x;y++){const _=d[y],A=f[y],T=g[y],E=v[y],R=m[y];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const S=n._createAnimationTracks(_,A,T,E,R);if(S)for(let M=0;M<S.length;M++)p.push(S[M])}return new oc(r,void 0,p)})}createNodeMesh(t){const e=this.json,n=this,i=e.nodes[t];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(t){const e=this.json,n=this,i=e.nodes[t],r=n._loadNodeShallow(t),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,uS)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(t){const e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(t)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(t)}).forEach(function(c){a.push(c)}),this.nodeCache[t]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new nf:c.length>1?h=new ue:c.length===1?h=c[0]:h=new _e,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Wn(h,r),r.extensions&&Ii(n,h,r),r.matrix!==void 0){const u=new kt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],i=this,r=new ue;n.name&&(r.name=i.createUniqueName(n.name)),Wn(r,n),n.extensions&&Ii(e,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof gn||d instanceof Re)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(t,e,n,i,r){const o=[],a=t.name?t.name:t.uuid,l=[];ci[r.path]===ci.weights?t.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(ci[r.path]){case ci.weights:c=Ds;break;case ci.rotation:c=Ns;break;case ci.position:case ci.scale:c=Us;break;default:switch(n.itemSize){case 1:c=Ds;break;case 2:case 3:default:c=Us;break}break}const h=i.interpolation!==void 0?rS[i.interpolation]:Cr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+ci[r.path],e.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=cc(e.constructor),i=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)i[r]=e[r]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const i=this instanceof Ns?sS:Rf;return new i(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function fS(s,t,e){const n=t.attributes,i=new on;if(n.POSITION!==void 0){const a=e.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),a.normalized){const h=cc(ys[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const a=new C,l=new C;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=e.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const v=cc(ys[d.componentType]);l.multiplyScalar(v)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Cn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function ku(s,t,e){const n=t.attributes,i=[];function r(o,a){return e.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=lc[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(t.indices!==void 0&&!s.index){const o=e.getDependency("accessor",t.indices).then(function(a){s.setIndex(a)});i.push(o)}return jt.workingColorSpace!==$e&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${jt.workingColorSpace}" not supported.`),Wn(s,t),fS(s,t,e),Promise.all(i).then(function(){return t.targets!==void 0?aS(s,t.targets,e):s})}const pS='This work is based on "Boeing 787-9 Singapore Airlines" (sketchfab.com/3d-models/boeing-787-9-singapore-airlines-d383b7e3b858407e8cff7365820cc4dd) by mudkipz321 (sketchfab.com/mudkipz321), licensed under CC-BY-4.0. The embedded cockpit is based on "Boeing 757-200 Icelandair Cockpit" by VTX, CC-BY-NC-SA-4.0.';let zu=null,Hu=!1;function mS(){return typeof window>"u"||typeof fetch!="function"||new URLSearchParams(window.location.search).has("nomodel")?Promise.resolve(null):(zu??=(async()=>{try{const s="./",t=await fetch(s+"airliner.glb",{cache:"no-cache"});if(!t.ok)return console.warn("[ext] airliner.glb fetch 失敗:",t.status,s+"airliner.glb"),null;const e=await t.arrayBuffer();return await new Promise(n=>{new Af().parse(e,"",i=>n(i),i=>{console.warn("[ext] GLB parse 失敗:",i),n(null)})})}catch(s){return console.warn("[ext] airliner.glb 読込例外:",s),null}})(),zu)}async function gS(s){const t=await mS();if(!t||s.userData.extModel)return!1;const e=t.scene.clone(!0),n=new vy(e);for(const x of t.animations)n.clipAction(x).play();const i=new on().setFromObject(s),r=i.getCenter(new C),o=i.getSize(new C);e.updateMatrixWorld(!0);const a=new on().setFromObject(e),l=a.getSize(new C),c=a.getCenter(new C),h=l.x>=l.z?"x":"z",u=new C;let d=0;e.traverse(x=>{/prop|spinner/i.test(x.name)&&(u.add(x.getWorldPosition(new C)),d++)});let f=1;d>0&&(u.divideScalar(d),f=(h==="x"?u.x-c.x:u.z-c.z)>=0?1:-1);const g=o.z/Math.max(l[h],.001);e.scale.setScalar(g),e.rotation.y=h==="x"?f>0?-Math.PI/2:Math.PI/2:f>0?0:Math.PI,e.updateMatrixWorld(!0);const v=new on().setFromObject(e);e.position.x+=r.x-v.getCenter(new C).x,e.position.z+=r.z-v.getCenter(new C).z,e.position.y+=i.min.y-v.min.y,e.traverse(x=>{const _=x;_.isMesh&&(_.castShadow=!0)});const m=new ue;for(const x of[...s.children])x.userData.keepOutOfProc||(s.remove(x),m.add(x));m.visible=!1,s.add(m,e);const p=new on().setFromObject(e).getSize(new C);let y=null;return e.traverse(x=>{!y&&(x.name==="MergedCockpit"||x.userData?.extras?.mergedCockpit||x.userData?.mergedCockpit)&&(y=x)}),s.userData.extModel={root:e,mixer:n,fit:{size:[+p.x.toFixed(2),+p.y.toFixed(2),+p.z.toFixed(2)],refLen:+o.z.toFixed(2),scale:+g.toFixed(4)},clips:t.animations.length,mergedCockpit:y},Hu||(Hu=!0,console.info("[ext]",pS)),!0}function vS(s,t){const e=s.userData.extModel;e&&(e.clips>0&&e.mixer.update(t),e.mergedCockpit&&(e.mergedCockpit.visible=!s.userData.extCockpitView))}const Vu=1.95;function hc(s,t={}){const e=new ue,n=t.low??!1,i=t.ext??!1,r=dM(s.liveryTop,s.liveryBottom,s.liveryAccent,Math.round(s.fuselageLength*1.6),s.liveryName,s.liveryRegistration);r.anisotropy=16;const o=n?new Kt({map:r,metalness:.42,roughness:.32,envMapIntensity:1.15}):new Qe({map:r,metalness:.28,roughness:.36,clearcoat:.65,clearcoatRoughness:.16,envMapIntensity:1.35}),a=new Kt({color:13226714,metalness:.55,roughness:.38,envMapIntensity:1.1}),l=a.clone(),c=gM();if(!n){const j=c.normalMap.clone();j.needsUpdate=!0;const L=c.roughnessMap.clone();L.needsUpdate=!0,j.wrapS=j.wrapT=He,L.wrapS=L.wrapT=He,j.repeat.set(3,10),L.repeat.set(3,10),l.normalMap=j,l.normalScale=new it(.45,.45),l.roughnessMap=L}const h=new Kt({color:2765112,metalness:.5,roughness:.5}),u=new ft(s.liveryTop),d=n?new Kt({color:u,metalness:.42,roughness:.34,envMapIntensity:1.15}):new Qe({color:u,metalness:.28,roughness:.36,clearcoat:.65,clearcoatRoughness:.16,envMapIntensity:1.35}),f=new Kt({color:5397091,metalness:.15,roughness:.62}),g=new Kt({color:12174284,metalness:.95,roughness:.22,envMapIntensity:1.4}),v=new Kt({map:pM(),metalness:.8,roughness:.35}),m=new Kt({color:1382428,metalness:.1,roughness:.9}),p=new Kt({color:10134701,metalness:.85,roughness:.3}),y=n?a:new Qe({map:fM(s.liveryTop,s.liveryBottom,s.liveryAccent,s.liveryName),metalness:.25,roughness:.34,clearcoat:.5,clearcoatRoughness:.2,envMapIntensity:1.25,side:fn}),x=n?a:new Qe({color:s.liveryBottom,metalness:.3,roughness:.3,clearcoat:.6,clearcoatRoughness:.15,envMapIntensity:1.3,side:fn}),_=s.fuselageRadius,A=s.fuselageLength,T=[],E=n?14:30;for(let j=0;j<=E;j++){const L=j/E;let mt;if(L<.1)mt=_*Math.sqrt(1-Math.pow(1-L/.1,2.1))*.98+.02;else if(L<.8)mt=_;else{const Rt=(L-.8)/.2;mt=_*(1-Rt*.86)}T.push(new it(Math.max(mt,.05),L*A))}const R=new Is(T,n?18:48);R.rotateX(-Math.PI/2),R.translate(0,0,A/2);{const j=R.attributes.position;for(let L=0;L<j.count;L++){const mt=j.getZ(L);if(mt<-A*.18){const Rt=Math.min((-mt-A*.18)/(A*.32),1);j.setY(L,j.getY(L)+Rt*Rt*_*1.15)}}R.computeVertexNormals()}{const j=R.attributes.uv;for(let L=0;L<j.count;L++){const mt=j.getX(L);j.setX(L,j.getY(L)),j.setY(L,mt)}}const S=o.clone();{const j=c.normalMap.clone();j.needsUpdate=!0;const L=c.roughnessMap.clone();L.needsUpdate=!0,j.wrapS=j.wrapT=He,L.wrapS=L.wrapT=He,j.repeat.set(3,4),L.repeat.set(3,4),S.normalMap=j,S.normalScale=new it(.6,.6),S.roughnessMap=L}const M=new st(R,S);if(M.castShadow=!0,M.receiveShadow=!0,e.add(M),!n){const j=[];for(let Ot=0;Ot<=10;Ot++){const bt=Ot/10*.085,Vt=_*Math.sqrt(1-Math.pow(1-bt/.1,2.1))*.98+.02;j.push(new it(Math.max(Vt*1.014,.05),bt*A))}const mt=new Is(j,40);mt.rotateX(-Math.PI/2),mt.translate(0,0,A/2);const Rt=new st(mt,f);Rt.castShadow=!0,e.add(Rt)}if(!n){const j=_*1.15,L=-A/2,mt=new st(new be(_*.11,_*.2,_*.8,14),f);mt.rotation.x=Math.PI/2,mt.position.set(0,j+_*.22,L-_*.3),e.add(mt)}const P=s.wingspan/2,z=cr(s.rootChord,s.tipChord,P,s.sweep,s.dihedral,l,n,-1,!1,s.liveryAccent,x),D=cr(s.rootChord,s.tipChord,P,s.sweep,s.dihedral,l,n,1,!1,s.liveryAccent,x);if(e.add(z,D),!n)for(const j of[-1,1])for(const L of[.05,-.1]){const mt=new st(new Sr(_*.16,s.rootChord*.5,4,10),a);mt.rotation.z=Math.PI/2,mt.scale.set(1,1,L>0?.55:.7),mt.position.set(j*_*1.05,L*_+Math.tan(s.dihedral)*_*1.05,-A*.02),e.add(mt)}const F=cr(s.tailRootChord,s.tailRootChord*.42,s.tailHeight*.92,s.sweep+.12,0,y,n,1,!0);F.position.set(0,_*.55,-A*.36),e.add(F);const H=s.wingspan*.25,N=cr(s.tailRootChord*.52,s.tailRootChord*.22,H,s.sweep+.14,.035,a,n,-1);N.position.set(0,_*.12,-A*.415);const q=cr(s.tailRootChord*.52,s.tailRootChord*.22,H,s.sweep+.14,.035,a,n,1);if(q.position.set(0,_*.12,-A*.415),e.add(N,q),!n){const j=new st(new Sr(_*.3,A*.16,4,12),a);j.rotation.x=Math.PI/2,j.position.set(0,_*.22,-A*.4),j.scale.set(1,.55,1),e.add(j)}const k=[];for(const j of[-1,1]){const L=xS(s,h,v,d,g,n),mt=j*s.engineSpanPos*P,Rt=s.engineForward-Math.tan(s.sweep)*Math.abs(mt)*.55,Ot=Math.abs(mt)*Math.tan(s.dihedral);L.position.set(mt,Ot-s.engineDiameter*.78,Rt+s.engineLength*.28),e.add(L),k.push(...L.userData.rotors);const bt=new st(new he(s.engineDiameter*.22,s.engineDiameter*1.15,s.engineLength*.5),d);if(bt.position.set(mt,Ot-s.engineDiameter*.22,Rt+s.engineLength*.12),bt.castShadow=!n,e.add(bt),!n){const Vt=new st(new be(s.engineDiameter*.11,s.engineDiameter*.11,s.engineDiameter*1.15,3),d);Vt.rotation.z=Math.PI/2,Vt.rotation.y=Math.PI/2,Vt.position.set(mt,Ot-s.engineDiameter*.2,Rt+s.engineLength*.42),e.add(Vt)}}const K=[],tt=[];if(!n){const j=Gu(p,m,g,2,_,_*(Vu-.92),!1);j.position.set(0,-_*.92,A*.3),e.add(j),K.push(j),Wu(e,tt,new C(0,-_*.9,A*.3),_,A,1,1.1);for(const L of[-1,1]){const mt=Gu(p,m,g,s.mainWheelCount*2,_,_*(Vu-.95),!0);mt.position.set(L*_*1.35,-_*.95,-A*.02),e.add(mt),K.push(mt),Wu(e,tt,new C(L*_*1.35,-_*.92,-A*.02),_,A,L,1.5)}}const rt=[],St=[];if(!n)for(const j of[-1,1]){const L=new ue,mt=new st(new he(s.rootChord*.3,.1,P*.52),l);mt.position.set(j*P*.34,Math.abs(P*.34)*Math.tan(s.dihedral)-.12,-s.rootChord*.72),L.add(mt),e.add(L),rt.push(L);for(let Ot=0;Ot<3;Ot++){const bt=j*(P*.22+Ot*P*.13),Vt=new st(new Sr(s.fuselageRadius*.09,s.rootChord*.34,4,8),l);Vt.rotation.x=Math.PI/2,Vt.position.set(bt,Math.abs(bt)*Math.tan(s.dihedral)-s.fuselageRadius*.16,-s.rootChord*.62),Vt.castShadow=!n,e.add(Vt)}const Rt=new ue;for(let Ot=0;Ot<3;Ot++){const bt=new st(new he(s.rootChord*.16,.07,P*.12),l),Vt=j*(P*.18+Ot*P*.11);bt.position.set(Vt,Math.abs(Vt)*Math.tan(s.dihedral)+.16,-s.rootChord*.28-Ot*s.rootChord*.1),Rt.add(bt)}e.add(Rt),St.push(Rt)}n||yS(e,s,_,A);const Mt=[],G=[],Z=(j,L,mt,Rt,Ot,bt=!1)=>{const Vt=new De({color:j,fog:!1}),Ft=new st(new Mi(L,8,6),Vt);return Ft.position.set(mt,Rt,Ot),e.add(Ft),(bt?G:Mt).push(Vt),Ft},at=P*Math.tan(s.dihedral),lt=-Math.tan(s.sweep)*P-s.tipChord*.45;Z(16722458,s.fuselageRadius*.11,-P,at,lt),Z(1769284,s.fuselageRadius*.11,P,at,lt),Z(16773836,s.fuselageRadius*.1,0,_*.55+s.tailHeight*.95,-A*.42),Z(16777215,s.fuselageRadius*.1,-P*.98,at+.3,lt-.4,!0),Z(16777215,s.fuselageRadius*.1,P*.98,at+.3,lt-.4,!0);const wt=new De({color:16720401,fog:!1}),Lt=new st(new Mi(s.fuselageRadius*.1,8,6),wt);Lt.position.set(0,_*1.02,-A*.12),e.add(Lt);const nt=new Kt({color:3159355,emissive:16774095,emissiveIntensity:0,roughness:.2,metalness:.4});if(!n)for(const j of[-1,1]){const L=new st(new ki(_*.13,12),nt);L.position.set(j*_*1.25,-_*.52,A*.16),L.rotation.x=-Math.PI/2+.28,L.rotation.y=j*.18,e.add(L);const mt=new st(new Ls(_*.145,_*.025,6,16),g);mt.position.copy(L.position),mt.rotation.copy(L.rotation),e.add(mt)}const yt=K.map(j=>j.position.y),ut={group:e,gearGroups:K,flapGroups:rt,spoilerGroups:St,fanMeshes:k,setGearPosition(j){const L=Math.max(0,Math.min(1,j));K.forEach((mt,Rt)=>{mt.position.y=yt[Rt]*L+_*.6*(1-L),mt.visible=L>.02});for(const mt of tt)mt.mesh.rotation.x=mt.sign*L*1.15;nt.emissiveIntensity=L>.55?2.6:0},setFlaps(j){const L=j*Math.PI/180;for(const mt of rt)mt.children.forEach(Rt=>{Rt.rotation.x=L*.7})},setSpoilers(j){const L=Math.max(0,Math.min(1,j));for(const mt of St)mt.children.forEach(Rt=>{Rt.rotation.x=-L*.9})},spinFans(j){for(const L of k)L.rotation.z+=j*14;vS(e,j)},updateLights(j){const L=j%1.2<.1;for(const Rt of G)Rt.visible=L;const mt=j%.8<.45;wt.visible=mt;for(const Rt of Mt)Rt.visible=!0}};return i&&gS(e),ut}function cr(s,t,e,n,i,r,o,a,l=!1,c,h){const u=new ue,d=o?6:14,f=o?12:24,g=.11,v=[];for(let T=0;T<=f/2;T++){const E=T/(f/2),R=2*g*(.2969*Math.sqrt(E)-.126*E-.3516*E*E+.2843*E**3-.1015*E**4),S=.022*Math.sin(Math.PI*E);v.push([E,S+R])}for(let T=f/2-1;T>0;T--){const E=T/(f/2),R=2*g*(.2969*Math.sqrt(E)-.126*E-.3516*E*E+.2843*E**3-.1015*E**4),S=.022*Math.sin(Math.PI*E);v.push([E,S-R])}const m=[],p=[],y=[],x=v.length;for(let T=0;T<=d;T++){const E=T/d,R=a*E*e,S=s+(t-s)*E,M=-Math.tan(n)*Math.abs(R),P=l?0:Math.abs(R)*Math.tan(i);for(let z=0;z<x;z++){const[D,F]=v[z],H=M-D*S;if(l)m.push(F*S,Math.abs(R),H);else{const N=R,q=P+F*S;m.push(N,q,H)}p.push(D,E)}}for(let T=0;T<d;T++)for(let E=0;E<x;E++){const R=(E+1)%x,S=T*x+E,M=T*x+R,P=(T+1)*x+E,z=(T+1)*x+R;y.push(S,P,M,M,P,z)}const _=new ye;_.setAttribute("position",new oe(m,3)),_.setAttribute("uv",new oe(p,2)),_.setIndex(y),_.computeVertexNormals();const A=new st(_,r);if(A.castShadow=!0,A.receiveShadow=!0,u.add(A),!l&&!o&&h){const T=Math.max(1.4,e*.115),E=_S(a,e,T,t*.92,t*.4,n,i,h);u.add(E)}return u}function _S(s,t,e,n,i,r,o,a){const u=[],d=[],f=[],g=[];for(let x=0;x<=14/2;x++){const _=x/7,A=2*.1*(.2969*Math.sqrt(_)-.126*_-.3516*_*_+.2843*_**3-.1015*_**4);g.push([_,.02+A])}for(let x=14/2-1;x>0;x--){const _=x/7,A=2*.1*(.2969*Math.sqrt(_)-.126*_-.3516*_*_+.2843*_**3-.1015*_**4);g.push([_,.02-A])}const v=g.length,m=Math.abs(s*t)*Math.tan(o);for(let x=0;x<=7;x++){const _=x/7,A=m+Math.pow(_,.82)*e,T=s*(t+Math.sin(_*Math.PI*.5)*e*.34),E=n+(i-n)*_,R=-Math.tan(r)*t-_*E*.42;for(let S=0;S<v;S++){const[M,P]=g[S];u.push(T,A+P*E*.16,R-M*E),d.push(M,_)}}for(let x=0;x<7;x++)for(let _=0;_<v;_++){const A=(_+1)%v,T=x*v+_,E=x*v+A,R=(x+1)*v+_,S=(x+1)*v+A;f.push(T,R,E,E,R,S)}const p=new ye;p.setAttribute("position",new oe(u,3)),p.setAttribute("uv",new oe(d,2)),p.setIndex(f),p.computeVertexNormals();const y=new st(p,a);return y.castShadow=!0,y}function xS(s,t,e,n,i,r){const o=new ue,a=s.engineDiameter,l=s.engineLength,c=[],h=r?8:20;for(let m=0;m<=h;m++){const p=m/h;let y;p<.12?y=a*.5*(.72+.28*Math.sin(p/.12*Math.PI*.5)):p<.5?y=a*.5:y=a*.5*(1-(p-.5)*.52),c.push(new it(y,p*l))}const u=new Is(c,r?12:28);u.rotateX(-Math.PI/2);const d=new st(u,n);d.castShadow=!0,o.add(d);const f=new st(new be(a*.44,a*.42,l*.42,20,1,!0),t);f.rotation.x=Math.PI/2,f.position.z=l*.18,o.add(f);const g=new ue;g.position.z=l*.19;const v=new st(new ki(a*.4,28),e);if(g.add(v),!r){const m=new he(a*.02,a*.145,a*.3),p=new An(m,new Kt({color:9148324,metalness:.9,roughness:.32,flatShading:!0}),22),y=new kt,x=new ge,_=new vn,A=new C,T=new C(1,1,1);for(let R=0;R<22;R++){const S=R/22*Math.PI*2,M=a*.15+a*.15;A.set(Math.cos(S)*M,Math.sin(S)*M,0),_.set(.62,0,S),x.setFromEuler(_),y.compose(A,x,T),p.setMatrixAt(R,y)}p.instanceMatrix.needsUpdate=!0,g.add(p);const E=new st(new xi(a*.09,a*.16,12),new Kt({color:11450562,metalness:.9,roughness:.25}));E.rotation.x=-Math.PI/2,E.position.z=a*.06,g.add(E)}if(o.add(g),r){const m=new st(new be(a*.16,a*.12,l*.3,12),t);m.rotation.x=Math.PI/2,m.position.z=-l*.38,o.add(m)}else{const m=new st(new Ls(a*.485,a*.048,10,30),i);m.position.z=l*.005,o.add(m);const p=new st(new Ls(a*.505,a*.014,6,28),t);p.position.z=-l*.28,o.add(p);const y=new st(new be(a*.27,a*.21,l*.16,18,1,!0),i);y.rotation.x=Math.PI/2,y.position.z=-l*.42,o.add(y);const x=new st(new xi(a*.16,l*.2,14),t);x.rotation.x=Math.PI/2,x.position.z=-l*.46,o.add(x)}return o.userData.rotors=[g],o}function Gu(s,t,e,n,i,r,o){const a=new ue,l=new st(new be(i*.075,i*.085,r*.52,10),e);l.position.y=-r*.26,a.add(l);const c=new st(new be(i*.105,i*.115,r*.56,10),s);if(c.position.y=-r*.72,a.add(c),o)for(const g of[-1,1]){const v=new st(new he(i*.05,r*.34,i*.09),s);v.position.set(g*i*.11,-r*.44,0),v.rotation.z=g*.42,a.add(v)}const h=new be(i*.3,i*.3,i*.2,16),u=new be(i*.16,i*.16,i*.235,12),d=2,f=Math.max(1,Math.floor(n/d));for(let g=0;g<f;g++){if(o&&f>1){const v=new st(new he(i*.98,i*.1,i*.16),s);v.position.set(0,-r+i*.3,(g-(f-1)/2)*i*.72),a.add(v)}for(let v=0;v<d;v++){const m=new st(h,t);m.rotation.z=Math.PI/2;const p=(v-(d-1)/2)*i*.42,y=(g-(f-1)/2)*i*.72;m.position.set(p,-r+i*.3,y),a.add(m);const x=new st(u,e);x.rotation.z=Math.PI/2,x.position.copy(m.position),a.add(x)}}return a}function Wu(s,t,e,n,i,r,o){const a=new st(new he(n*.62*o,n*.1,n*1.5*o),new Kt({color:1316893,roughness:.9,metalness:.2}));a.position.set(e.x,-n*.99,e.z),s.add(a);for(const l of[-1,1]){const c=new st(new he(n*.6*o,n*.045,n*1.44*o),new Kt({color:14147301,roughness:.42,metalness:.3}));c.position.set(e.x+l*r*n*.31*o,-n*1.02,e.z),c.geometry.translate(-l*n*.3*o,0,0),c.position.x=e.x+l*r*n*.02,s.add(c),t.push({mesh:c,sign:l*r})}}function yS(s,t,e,n){const i=new Kt({color:11450820,metalness:.15,roughness:.55}),r=(h,u,d,f)=>{const g=new st(new he(.06,f,f*.42),i);g.position.set(h,(d?1:-1)*(e+f*.42),u),d||(g.rotation.x=Math.PI),s.add(g)};r(0,n*.1,!0,e*.42),r(0,-n*.16,!0,e*.34),r(0,-n*.05,!1,e*.4),r(.7,-n*.2,!1,e*.28);const o=new Kt({color:15659766,roughness:.4,metalness:.1});for(const h of[n*.24,-n*.2]){const u=new st(new Mi(e*.2,12,8,0,Math.PI*2,0,Math.PI/2),o);u.scale.set(1,.55,1.4),u.position.set(0,e*.985,h),s.add(u)}for(const h of[!0,!1]){const u=new st(new be(e*.24,e*.2,.07,12),o);u.position.set(0,(h?1.02:-1.02)*e,h?n*.02:-n*.1),s.add(u)}const a=t.wingspan/2,l=new Kt({color:2106924,roughness:.7,metalness:.3}),c=(h,u,d)=>{const f=new st(new xi(.05,.4,6),l);f.position.set(h,u,d),f.rotation.x=Math.PI/2,s.add(f)};for(const h of[-1,1]){for(let d=0;d<3;d++){const f=h*(a*(.45+d*.18)),g=-Math.tan(t.sweep)*Math.abs(f)-(t.rootChord+(t.tipChord-t.rootChord)*(f/a))*.98;c(f,Math.abs(f)*Math.tan(t.dihedral),g)}const u=t.wingspan*.25*.88;c(h*u,e*.12,-n*.415-Math.tan(t.sweep+.14)*u-t.tailRootChord*.52*.98)}}const Li={apron:.05,taxiway:.055,runway:.06,marking:.09},hs={marking:{polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:0},runway:{polygonOffset:!1,polygonOffsetFactor:0,polygonOffsetUnits:0},taxiMain:{polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:0},taxi:{polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:0}};function MS(s,t,e,n=512){const i=new ue,{length:r,width:o,center:a,heading:l}=t,c=eM(o,r,t.runwayNumbers[0],t.runwayNumbers[1],n);c.wrapS=bn,c.wrapT=bn;const h=new st(new Ze(o,r),new Kt({map:c,roughness:.92,metalness:.02,...hs.runway}));h.rotation.x=-Math.PI/2,h.position.y=Li.runway,h.receiveShadow=!0,i.add(h);const u=sM(),d=new Kt({map:u,roughness:.9,...hs.taxi}),f=nM(),g=new Kt({map:f,roughness:.9,...hs.taxi}),v=new Kt({map:f,roughness:.9,...hs.taxiMain}),m=new st(new Ze(26,r*.92),v);m.rotation.x=-Math.PI/2,m.position.set(240,Li.taxiway,0),m.receiveShadow=!0,i.add(m);for(const nt of[-r*.36,-r*.05,r*.28]){const yt=new st(new Ze(197,24),g);yt.rotation.x=-Math.PI/2,yt.position.set(128.5,Li.apron,nt),yt.receiveShadow=!0,i.add(yt);const ut=new st(new Ze(24,3.2),new De({color:14170666,...hs.marking}));ut.rotation.x=-Math.PI/2,ut.position.set(22,Li.marking,nt),i.add(ut)}const p=new st(new Ze(520,900),d);p.rotation.x=-Math.PI/2,p.position.set(620,Li.apron,-100),p.receiveShadow=!0,i.add(p);const y=new De({color:14202442,...hs.marking});for(let nt=0;nt<3;nt++)for(const yt of[-1,1]){const ut=new st(new Ze(3,90),y);ut.rotation.x=-Math.PI/2,ut.position.set(620+yt*70,Li.marking,-330+nt*170),i.add(ut)}const x=[{text:"34",x:-22,z:1720,rot:0},{text:"16",x:-22,z:-1720,rot:Math.PI},{text:"A",x:210,z:-640,rot:-Math.PI/2},{text:"B",x:210,z:-100,rot:-Math.PI/2},{text:"G",x:210,z:1120,rot:-Math.PI/2}];for(const nt of x){const yt=new Kt({map:iM(nt.text),roughness:.7}),ut=new st(new Ze(7,3.2),yt);ut.position.set(nt.x,2.6,nt.z),ut.rotation.y=nt.rot,i.add(ut);const j=new st(new be(.18,.18,2.2,6),new Kt({color:5594984}));j.position.set(nt.x,1.1,nt.z),i.add(j)}const _=new Kt({map:cM(),metalness:.75,roughness:.18,envMapIntensity:1.4}),A=new Kt({color:12107976,metalness:.2,roughness:.6}),T=new Kt({color:9081499,metalness:.35,roughness:.55}),E=new ue,R=new st(new he(260,26,620),A);R.position.y=13,R.castShadow=!0,R.receiveShadow=!0,E.add(R);const S=new st(new he(262,12,622),_);S.position.y=16,E.add(S);const M=new st(new he(272,3,632),T);M.position.y=27.5,M.castShadow=!0,E.add(M);for(let nt=0;nt<6;nt++){const yt=new st(new he(18,6,14),T);yt.position.set(-80+nt%3*80,32,-180+Math.floor(nt/3)*340),yt.castShadow=!0,E.add(yt)}E.position.set(850,0,-60),i.add(E);for(let nt=0;nt<3;nt++){const yt=new ue,ut=new st(new he(70,6.5,8),A);ut.position.set(-24,12,0),ut.castShadow=!0,yt.add(ut);const j=new st(new he(12,8,10),_);j.position.set(-64,11,0),yt.add(j);const L=new st(new be(1.2,1.2,12,8),T);L.position.set(-30,6,0),yt.add(L),yt.position.set(740,0,-330+nt*170),i.add(yt)}const P=new ue,z=new st(new be(7,11,52,12),A);z.position.y=26,z.castShadow=!0,P.add(z);const D=new st(new be(13,10,10,12),_);D.position.y=56,D.castShadow=!0,P.add(D);const F=new st(new be(14,14,2,12),T);F.position.y=62,P.add(F),P.position.set(430,0,420),i.add(P);for(let nt=0;nt<2;nt++){const yt=new ue,ut=new st(new be(38,38,96,18,1,!1,0,Math.PI),T);ut.rotation.z=Math.PI/2,ut.rotation.y=Math.PI/2,ut.position.y=0,ut.castShadow=!0,yt.add(ut);const j=new st(new Ze(96,36),_);j.rotation.y=Math.PI/2,j.position.set(-.5,18,0),yt.add(j),yt.position.set(980,0,520+nt*130),i.add(yt)}[{x:700,z:-330,rot:Math.PI},{x:700,z:160,rot:Math.PI},{x:640,z:-520,rot:Math.PI*.92}].forEach((nt,yt)=>{const ut=e[yt%e.length],j=hc(ut,{low:!0});j.setGearPosition(1),j.group.position.set(nt.x,ut.fuselageRadius*1.95+Li.runway,nt.z),j.group.rotation.y=nt.rot,i.add(j.group)});const N=new he(.9,.5,.9),q=new De({color:16771496,fog:!1}),k=2*68,K=new An(N,q,k),tt=new kt;let rt=0;for(let nt=0;nt<68;nt++){const yt=-r/2+nt*r/67;for(const ut of[-1,1])tt.makeTranslation(ut*(o/2+1.2),.6,yt),K.setMatrixAt(rt++,tt)}K.instanceMatrix.needsUpdate=!0,i.add(K);const Mt=[new ft(16777215),new ft(16777215),new ft(16722456),new ft(16722456)].map(nt=>new De({color:nt,fog:!1})),G=new he(.7,.5,1.4);for(const nt of[1,-1])for(let yt=0;yt<4;yt++){const ut=new st(G,Mt[yt]);ut.position.set(o/2+9+yt*1.6,.55,nt*(r/2-210)),ut.rotation.y=nt<0?Math.PI:0,i.add(ut)}const Z=new De({color:4491519,fog:!1}),at=new An(N,Z,2*40);rt=0;for(let nt=0;nt<40;nt++){const yt=-r*.45+nt*r*.9/39;for(const ut of[-1,1])tt.makeTranslation(240+ut*14,.6,yt),at.setMatrixAt(rt++,tt)}at.instanceMatrix.needsUpdate=!0,i.add(at),i.position.set(a.x,0,a.z),i.rotation.y=l;const lt=q.color.clone(),wt=Z.color.clone(),Lt=Mt.map(nt=>nt.color.clone());return i.userData.setNightLights=nt=>{const yt=.16+1.5*nt;q.color.copy(lt).multiplyScalar(yt),Z.color.copy(wt).multiplyScalar(yt),Mt.forEach((ut,j)=>ut.color.copy(Lt[j]).multiplyScalar(.2+1.5*nt))},s.add(i),i}const Cf=new Set,Pf=s=>{Cf.add(s)},SS=s=>{for(const t of Cf)t.update(s)},If=2600,Ms=[],Xu=s=>Math.imul(s+1,2654435761)>>>27&15;function qu(s){s.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float aFace;`).replace("#include <uv_vertex>",`#include <uv_vertex>
      {
        vec2 cell = vec2(mod(aFace, 4.0), floor(aFace * 0.25));
        #ifdef USE_MAP
        vMapUv = (uv + cell) * 0.25;
        #endif
        #ifdef USE_EMISSIVEMAP
        vEmissiveMapUv = (uv + cell) * 0.25;
        #endif
      }`)},s.customProgramCacheKey=()=>"atlas-cell4x4"}function wS(s,t){const e=Qy(t),n=new ue;Ms.length=0;{const v=e.colliders;for(let m=0;m+3<v.length;m+=4)Ms.push({x:v[m],z:v[m+1],r:v[m+2],top:v[m+3]})}const i=new he(1,1,1);i.translate(0,.5,0);const r=Fr("building"),o=Fr("buildingEm"),a=new Kt({map:r,emissiveMap:o,emissive:new ft(16767392),emissiveIntensity:0,metalness:.18,roughness:.72});qu(a);const l=new hf({color:9278621}),c=[];let h=0;const u=v=>{const m=i.clone(),p=new Float32Array(v.n);for(let _=0;_<v.n;_++)p[_]=Xu(h++);m.setAttribute("aFace",new fi(p,1));const y=new An(m,a,v.n);y.instanceMatrix.array.set(v.m),y.instanceMatrix.needsUpdate=!0,y.instanceColor=new fi(v.c,3),y.instanceColor.needsUpdate=!0,y.castShadow=!0,y.receiveShadow=!0,y.computeBoundingSphere();const x=new An(i,l,v.n);x.instanceMatrix.array.set(v.m),x.instanceMatrix.needsUpdate=!0,x.computeBoundingSphere(),n.add(y,x),c.push({hi:y,lo:x,b:v})};for(const v of e.buckets)u(v);const d=new Kt({map:r,color:12441838,emissiveMap:o,emissive:new ft(16773320),emissiveIntensity:0,metalness:.55,roughness:.3});qu(d);{const v=e.towers.n,m=i.clone(),p=new Float32Array(v);for(let x=0;x<v;x++)p[x]=Xu(h++);m.setAttribute("aFace",new fi(p,1));const y=new An(m,d,v);y.name="towers",y.instanceMatrix.array.set(e.towers.m),y.instanceMatrix.needsUpdate=!0,y.instanceColor=new fi(e.towers.c,3),y.instanceColor.needsUpdate=!0,y.castShadow=!0,y.receiveShadow=!1,y.computeBoundingSphere(),n.add(y)}{const v=new Kt({color:3027769,roughness:.95}),m=new ye;m.setAttribute("position",new ve(e.roads.pos,3)),m.setIndex(new ve(e.roads.idx,1)),m.computeVertexNormals();const p=new st(m,v);p.name="roads",p.receiveShadow=!0,p.frustumCulled=!0,n.add(p)}const f=new De({color:16722456,fog:!1,transparent:!0,opacity:0}),g=new An(new Mi(1.6,8,6),f,Math.max(1,e.beacons.length/3));g.name="beacons";{const v=new kt;for(let m=0;m*3+2<e.beacons.length;m++)v.makeTranslation(e.beacons[m*3],e.beacons[m*3+1],e.beacons[m*3+2]),g.setMatrixAt(m,v);g.instanceMatrix.needsUpdate=!0,g.computeBoundingSphere()}return n.add(g),Pf({update:v=>{for(const m of c){const p=Math.hypot(m.b.cx-v.x,m.b.cz-v.z)<If;m.hi.visible!==p&&(m.hi.visible=p,m.lo.visible=!p)}}}),n.userData.setNightLights=v=>{const m=Math.max(0,Math.min(1,(v-.12)/.88));a.emissiveIntensity=m*1.35,d.emissiveIntensity=m*1.55,f.opacity=m*.95,g.visible=m>.03},s.add(n),n}function bS(s,t){const e=Jy(t),n=new ue,i=new xi(2.6,8,6);i.translate(0,6.2,0);const r=new xi(1.9,6,6);r.translate(0,10.2,0);const o=TS(i,r),a=new be(.36,.52,3.6,5);a.translate(0,1.8,0);const l=new xi(2.5,11,4);l.translate(0,6.6,0);const c=new Kt({color:3101234,roughness:.88}),h=new Kt({color:5784628,roughness:.9}),u=new hf({color:2903088}),d=[];for(const f of e.buckets){const g=new An(o,c,f.n),v=new An(a,h,f.n);for(const p of[g,v])p.instanceMatrix.array.set(f.m),p.instanceMatrix.needsUpdate=!0,p.computeBoundingSphere();g.instanceColor=new fi(f.c,3),g.instanceColor.needsUpdate=!0,g.castShadow=!0,n.add(g,v);const m=new An(l,u,f.n);m.instanceMatrix.array.set(f.m),m.instanceMatrix.needsUpdate=!0,m.computeBoundingSphere(),n.add(m),d.push({hi:[g,v],lo:m,b:f})}return Pf({update:f=>{for(const g of d){const v=Math.hypot(g.b.cx-f.x,g.b.cz-f.z)<If;if(g.hi[0].visible!==v){for(const m of g.hi)m.visible=v;g.lo.visible=!v}}}}),s.add(n),n}function TS(s,t){const e=s.toNonIndexed(),n=t.toNonIndexed(),i=new Float32Array(e.attributes.position.array.length+n.attributes.position.array.length);i.set(e.attributes.position.array,0),i.set(n.attributes.position.array,e.attributes.position.array.length);const r=new Float32Array(e.attributes.normal.array.length+n.attributes.normal.array.length);r.set(e.attributes.normal.array,0),r.set(n.attributes.normal.array,e.attributes.normal.array.length);const o=new ye;return o.setAttribute("position",new ve(i,3)),o.setAttribute("normal",new ve(r,3)),o}const AS={cockpit:"コックピット",chase:"三人称",wing:"翼上",orbit:"周回",landing:"進入"},Di=["cockpit","chase"];function Lf(s,t){return t.set(0,s*.045,s*.29)}class ms{mode="chase";camera;static NEAR={cockpit:.45,chase:2.5,wing:.25,orbit:2.5,landing:2};static FAR=46e3;lastMode="chase";blending=!1;blendT=0;fromPos=new C;fromQuat=new ge;desiredPos=new C;desiredQuat=new ge;smoothFwd=new C(0,0,-1);tmpFwd=new C;tmpRight=new C;tmpUp=new C;worldUp=new C(0,1,0);lookTarget=new C;orbitAzimuth=2.2;orbitElevation=.35;orbitAuto=!0;chaseYaw=0;chasePitch=.222;constructor(t){this.camera=t,this.camera.fov=li.FOV,this.updateDepthRange(),this.camera.updateProjectionMatrix()}updateDepthRange(){const t=ms.NEAR[this.mode],e=this.blending?Math.min(t,ms.NEAR[this.lastMode]):t;this.blending||(this.lastMode=this.mode),(Math.abs(this.camera.near-e)>1e-4||this.camera.far!==ms.FAR)&&(this.camera.near=e,this.camera.far=ms.FAR,this.camera.updateProjectionMatrix())}nextMode(){const t=Di.indexOf(this.mode);return this.setMode(Di[(t+1)%Di.length])}prevMode(){const t=Di.indexOf(this.mode);return this.setMode(Di[(t+Di.length-1)%Di.length])}setMode(t){return t!==this.mode&&(this.blending=!0,this.blendT=0,this.fromPos.copy(this.camera.position),this.fromQuat.copy(this.camera.quaternion)),this.mode=t,this.camera.fov=t==="cockpit"?li.FOV_COCKPIT:li.FOV,this.camera.updateProjectionMatrix(),this.mode}addOrbitDelta(t,e){this.orbitAzimuth-=t*.005,this.orbitElevation=ps(this.orbitElevation+e*.004,-.25,1.25),this.orbitAuto=!1}addChaseDelta(t,e){this.chaseYaw-=t*.005,this.chasePitch=ps(this.chasePitch+e*.004,.03,1.25)}update(t,e){const{position:n,quaternion:i,velocity:r,size:o}=e;switch(this.updateDepthRange(),this.mode){case"cockpit":{Lf(o,this.desiredPos).applyQuaternion(i).add(n),this.desiredQuat.copy(i),this.desiredQuat.multiply(Yu);break}case"wing":{this.desiredPos.set(-o*.16,o*.035,o*.06).applyQuaternion(i).add(n),this.desiredQuat.copy(i).multiply(Yu),this.desiredQuat.multiply(ES);break}case"orbit":{this.orbitAuto&&(this.orbitAzimuth+=t*li.ORBIT_SPEED);const a=o*1.35,l=Math.cos(this.orbitElevation);if(this.desiredPos.set(Math.cos(this.orbitAzimuth)*l*a,Math.sin(this.orbitElevation)*a+o*.05,Math.sin(this.orbitAzimuth)*l*a).add(n),this.tmpFwd.copy(n).sub(this.desiredPos).normalize(),this.camera.position.copy(this.desiredPos),this.camera.up.set(0,1,0),this.camera.lookAt(n),this.blending){this.blendT=Math.min(this.blendT+t/li.BLEND_TIME,1);const c=ol(this.blendT);this.camera.position.lerpVectors(this.fromPos,this.desiredPos,c),this.blendT>=1&&(this.blending=!1)}return}case"landing":{if(this.desiredPos.set(0,o*.1,-o*1.15).applyQuaternion(i).add(n),this.tmpFwd.set(0,0,1).applyQuaternion(i),this.tmpFwd.y*=.35,this.tmpFwd.normalize(),this.tmpUp.set(0,1,0).applyQuaternion(i).lerp(this.worldUp,.55).normalize(),this.camera.position.copy(this.desiredPos),this.camera.up.copy(this.tmpUp),this.camera.lookAt(this.lookTarget.copy(n).addScaledVector(this.tmpFwd,o*.9).addScaledVector(this.worldUp,-o*.02)),this.blending){this.blendT=Math.min(this.blendT+t/li.BLEND_TIME,1);const a=ol(this.blendT);this.camera.position.lerpVectors(this.fromPos,this.desiredPos,a),this.blendT>=1&&(this.blending=!1)}return}default:{this.tmpFwd.set(0,0,1).applyQuaternion(i);const a=Pu(5.2,t);this.smoothFwd.lerp(this.tmpFwd,a),this.smoothFwd.lengthSq()<1e-8&&this.smoothFwd.copy(this.tmpFwd),this.smoothFwd.normalize(),this.tmpRight.copy(this.smoothFwd).multiplyScalar(-1),this.tmpRight.applyAxisAngle(this.worldUp,this.chaseYaw),this.tmpUp.crossVectors(this.tmpRight,this.worldUp),this.tmpUp.lengthSq()<1e-6&&this.tmpUp.set(1,0,0),this.tmpUp.normalize(),this.tmpRight.applyAxisAngle(this.tmpUp,this.chasePitch),this.lookTarget.crossVectors(this.tmpUp,this.tmpRight).normalize(),this.desiredPos.copy(n).addScaledVector(this.tmpRight,o*.635),this.camera.position.copy(this.desiredPos),this.camera.up.copy(this.lookTarget),this.tmpUp.copy(this.smoothFwd).multiplyScalar(o*.55*Math.max(0,this.tmpRight.dot(this.tmpFwd.copy(this.smoothFwd).multiplyScalar(-1)))),this.camera.lookAt(this.lookTarget.copy(n).add(this.tmpUp));const l=e.agl!==void 0?ps(1-e.agl/300,0,1):0,c=li.FOV+ps(r.length()*.03,0,8)+l*3.2;this.camera.fov+=(c-this.camera.fov)*Pu(2,t),this.camera.updateProjectionMatrix();return}}if(this.blending){this.blendT=Math.min(this.blendT+t/li.BLEND_TIME,1);const a=ol(this.blendT);this.camera.position.lerpVectors(this.fromPos,this.desiredPos,a),this.camera.quaternion.slerpQuaternions(this.fromQuat,this.desiredQuat,a),this.blendT>=1&&(this.blending=!1)}else this.camera.position.copy(this.desiredPos),this.camera.quaternion.copy(this.desiredQuat)}snap(t){this.blending=!1,this.smoothFwd.set(0,0,1).applyQuaternion(t.quaternion),this.update(1/60,t),this.blending=!1,this.update(1/60,t)}}const Yu=new ge(0,1,0,0),ES=new ge().setFromAxisAngle(new C(0,1,0),-.55);function ol(s){return s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2}const RS='This work is based on "Boeing 757-200 Icelandair Cockpit" (https://sketchfab.com/3d-models/boeing-757-200-icelandair-cockpit-1cb8f8109cb145849282ad703a652859) by VTX (https://sketchfab.com/VTX_car) licensed under CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)',CS="cockpit.glb",PS=1.88,IS=1.15,Df=.22;let Ku=null,jn=null,$u=0,ju=-1;function Nf(){return typeof window>"u"||typeof fetch!="function"||new URLSearchParams(window.location.search).has("nocockpitmodel")?Promise.resolve(null):(Ku??=(async()=>{try{const t=await fetch("./"+CS,{cache:"no-cache"});if(!t.ok)return console.warn("[cockpit] glb fetch 失敗:",t.status),null;const e=await t.arrayBuffer();if(e.byteLength<12||new DataView(e).getUint32(0,!0)!==1179937895)return null;const n=await new Promise(i=>{new Af().parse(e,"",r=>i(r),()=>i(null))});return n?(jn=LS(n.scene),console.info("[cockpit]",RS),jn):null}catch(s){return console.warn("[cockpit] glb parse 失敗:",s),null}})(),Ku.then(s=>s?.root??null))}function LS(s){const t=new Set,e=new Set;return s.traverse(n=>{const i=n;if(!i.isMesh)return;i.castShadow=!1,i.receiveShadow=!1,i.matrixAutoUpdate=!1,i.updateMatrix();const r=Array.isArray(i.material)?i.material:[i.material];for(const o of r){const a=o;if(a.isMeshStandardMaterial){if(a.envMapIntensity=.8,/glass|window|windshield|canopy/i.test(o.name||"")||a.transparent&&a.opacity<.85&&a.metalness===0){a.color.lerp(new ft(16777215),.55),a.transparent=!0,a.opacity=a.opacity>=.85?.22:Math.max(.08,a.opacity*.5),a.depthWrite=!1;const c=a;typeof c.transmission=="number"&&(c.transmission=Math.min(1,c.transmission+.3))}!a.transparent&&a.map&&!a.emissiveMap&&(a.emissive.set(16777215),a.emissiveMap=a.map,a.emissiveIntensity=Df,t.add(a));for(const l of[a.map,a.emissiveMap])l&&(l.anisotropy=4,e.add(l))}}}),{root:s,fillMats:[...t],textures:[...e]}}function DS(s){if(!jn)return null;const t=new ue;return t.name="cockpit-model",t.add(jn.root.clone(!0)),t.scale.setScalar(Math.min(IS,Math.max(1,s.fuselageRadius/PS))),t.userData.sharedResources=!0,t}function NS(s){if(!(!jn||Math.abs(s-ju)<.01)){ju=s;for(const t of jn.fillMats)t.emissiveIntensity=Df*s}}function US(s){!jn||$u>=jn.textures.length||s.initTexture(jn.textures[$u++])}function FS(s){const t=new ue;t.userData.keepOutOfProc=!0;const e=new ue;t.add(e);const n=s.fuselageRadius,i=s.fuselageLength,r=new Kt({color:2304562,metalness:.25,roughness:.7}),o=new Kt({map:mM(),metalness:.15,roughness:.55,emissive:2241348,emissiveIntensity:.35}),a=new Kt({color:3817544,metalness:.5,roughness:.5}),l=new st(new he(n*1.55,n*.85,.12),o);l.position.set(0,-n*.28,i*.3),l.rotation.x=.28,e.add(l);const c=new st(new he(n*1.7,.1,n*.55),r);c.position.set(0,n*.18,i*.33),c.rotation.x=-.18,e.add(c);for(const g of[-1,1]){const v=new ue,m=new st(new be(.035,.045,n*.55,8),a);m.position.y=n*.26,v.add(m);const p=new st(new Ls(n*.16,.032,8,18,Math.PI),a);p.position.y=n*.52,p.rotation.x=Math.PI/2,v.add(p),v.position.set(g*n*.52,-n*.22,i*.34),e.add(v)}for(const g of[-1,1]){const v=new st(new he(.1,n*1.05,.14),a);v.position.set(g*n*.62,n*.42,i*.385),v.rotation.x=-.55,e.add(v);const m=new st(new he(.06,n*.5,n*.5),a);m.position.set(g*n*.86,n*.28,i*.31),e.add(m)}const h=new st(new he(.09,n*1,.12),a);h.position.set(0,n*.42,i*.395),h.rotation.x=-.55,e.add(h);const u=new st(new he(n*1.5,.12,.35),r);u.position.set(0,n*.86,i*.345),u.rotation.x=-.35,e.add(u);let d=null;const f=()=>{if(d)return;const g=DS(s);g&&(Lf(s.fuselageLength,g.position),t.add(g),e.visible=!1,d=g)};return f(),d||Nf().then(f),{group:t,update(g=1){d&&NS(g)},hasModel:()=>d!==null}}class Tr{curve;duration=118;t=0;prevPos=new C;bankSmooth=0;pitchSmooth=0;stPos=new C;stQuat=new ge;stVel=new C;mTmp=new kt;qTmp=new ge;vEye=new C;vTan=new C;vTanAhead=new C;static UP=new C(0,1,0);static AXIS_Z=new C(0,0,1);st={position:this.stPos,quaternion:this.stQuat,velocity:this.stVel,speed:0,altitude:0,heading:0,pitch:0,bank:0,vspeed:0,throttle:0,gear:1,flaps:0,spoilers:0,phase:"PREFLIGHT"};static TIMELINE=[[0,0,0],[20,.105,1],[42,.3,2],[78,.62,3],[106,.915,4],[118,1,5]];constructor(){const t=[new C(0,2.2,1850),new C(0,2.2,400),new C(0,2.2,-700),new C(0,24,-1800),new C(0,260,-4200),new C(1800,760,-8200),new C(6200,1500,-5200),new C(8200,1500,1200),new C(5200,1250,7200),new C(600,620,7600),new C(-1700,240,5200),new C(-1400,90,3e3),new C(0,26,1900),new C(0,6,400),new C(0,2.2,-1200),new C(0,2.2,-1850)];this.curve=new rf(t,!1,"centripetal"),this.prevPos.copy(t[0])}reset(){this.t=0,this.bankSmooth=0,this.pitchSmooth=0,this.prevPos.copy(this.curve.getPointAt(0))}seek(t){this.t=Math.max(0,Math.min(t,this.duration))}get finished(){return this.t>=this.duration}update(t){this.t=Math.min(this.t+t,this.duration);const e=this.mapTimeToU(this.t),n=this.curve.getPointAt(e,this.stPos),i=this.curve.getTangentAt(e,this.vTan).normalize(),r=this.mTmp;r.lookAt(this.vEye.copy(n).addScaledVector(i,100),n,Tr.UP);const o=this.stQuat.setFromRotationMatrix(r),a=this.curve.getTangentAt(Math.min(e+.012,1),this.vTanAhead).normalize(),l=Math.atan2(i.x,i.z);let h=(Math.atan2(a.x,a.z)-l)/(.012*100);for(;h>Math.PI;)h-=Math.PI*2;for(;h<-Math.PI;)h+=Math.PI*2;const u=Math.max(n.distanceTo(this.prevPos)/Math.max(t,.001),1),d=ec.clamp(-h*u*1.15,-.62,.62);this.bankSmooth+=(d-this.bankSmooth)*Math.min(t*1.6,1),o.multiply(this.qTmp.setFromAxisAngle(Tr.AXIS_Z,this.bankSmooth));const f=Math.asin(ec.clamp(i.y,-1,1));this.pitchSmooth+=(f-this.pitchSmooth)*Math.min(t*2.2,1);const g=this.stVel.copy(n).sub(this.prevPos).divideScalar(Math.max(t,.001));this.prevPos.copy(n);const v=this.phaseOf(this.t,n.y),m=this.gearOf(e),p=this.flapsOf(e,n.y),y=e>.975?.85:0,x=this.throttleOf(this.t),_=(Math.atan2(i.x,-i.z)*180/Math.PI+360)%360,A=this.st;return A.speed=u,A.altitude=n.y,A.heading=_,A.pitch=this.pitchSmooth*180/Math.PI,A.bank=this.bankSmooth*180/Math.PI,A.vspeed=g.y,A.throttle=x,A.gear=m,A.flaps=p,A.spoilers=y,A.phase=v,A}mapTimeToU(t){const e=Tr.TIMELINE;for(let n=0;n<e.length-1;n++){const[i,r]=e[n],[o,a]=e[n+1];if(t<=o){const l=(t-i)/(o-i),c=l*l*(3-2*l);return r+(a-r)*c}}return 1}phaseOf(t,e){return t<.5?"PREFLIGHT":t<16?"TAKEOFF ROLL":t<21?"ROTATE":e<900&&t<42?"CLIMB":t<78?"CRUISE":t<104?"DESCENT":t<114.5?"APPROACH":t<117?"LANDING":"ROLLOUT"}gearOf(t){return t<.1?1:t<.16?1-(t-.1)/.06:t<.86?0:t<.92?(t-.86)/.06:1}flapsOf(t,e){return t<.04?5:t<.12?15:t<.2?15-(t-.12)/.08*15:t<.8?0:t<.88?(t-.8)/.08*10:t<.95?25:(e<30,30)}throttleOf(t){return t<18?1:t<40?.92:t<80?.85:t<108?.55:t<116?.32:.15}}function Uf(s){const t=Math.sin(s.heading),e=Math.cos(s.heading),n=s.center.x,i=s.center.z,r=s.length/2,o=(Math.atan2(-t,e)*180/Math.PI+360)%360,a=(o+180)%360;return[{name:s.runwayNumbers[0],headingDeg:(o%360+360)%360,x:n+t*r,z:i+e*r},{name:s.runwayNumbers[1],headingDeg:(a%360+360)%360,x:n-t*r,z:i-e*r}]}function OS(s,t,e,n,i){const[r,o]=Uf(s),a=Math.sin(s.heading),l=Math.cos(s.heading),c=t-s.center.x,h=e-s.center.z,u=c*a+h*l,d=c*l-h*a,f=u>=0?r:o,g=u>=0?u-s.length/2:-u-s.length/2,v=Math.hypot(g,d),m=Math.hypot(n,i);let p=!1;if(m>2&&Math.abs(d)<1500){const _=f.x-t,A=f.z-e,T=Math.atan2(n,-i)*180/Math.PI,E=Math.atan2(_,-A)*180/Math.PI;p=Math.abs((T-E+540)%360-180)<30&&_*n+A*i>0}const y=Math.abs(d)<s.width/2+20&&Math.abs(u)<=s.length/2;let x=null;if(y){const _=m>2?Math.atan2(n,-i)*180/Math.PI:f.headingDeg;x=Math.abs((_-r.headingDeg+540)%360-180)>90?s.length/2-u:s.length/2+u,x=Math.max(0,Math.min(s.length,x))}return{nearest:f,distanceToThreshold:v,lateralOffset:d,alongTrack:g,aligned:p,onRunway:y,remainingRunway:x,groundSpeed:m}}const uc=[{id:"day",label:"昼",sub:"晴天の白昼",sunElevation:.82,skyTop:3040192,skyHorizon:12901102,sunColor:16772556,sunIntensity:2.4,hemiIntensity:.75,fogColor:13229295,nightLights:.15},{id:"sunset",label:"夕焼け",sub:"オレンジの空",sunElevation:.12,skyTop:2572666,skyHorizon:15901276,sunColor:16757866,sunIntensity:1.7,hemiIntensity:.5,fogColor:14721650,nightLights:.55},{id:"night",label:"夜",sub:"星空と滑走路灯",sunElevation:-.12,skyTop:396060,skyHorizon:1713984,sunColor:10335464,sunIntensity:.35,hemiIntensity:.22,fogColor:1186862,nightLights:1}],dc=[{id:"clear",label:"快晴",sub:"雲少なめ・良好",cloudScale:.85,cloudDarken:0,fogScale:1,rain:0,sunScale:1,turbulence:.15},{id:"cloudy",label:"くもり",sub:"雲多め・やや荒れ",cloudScale:1.6,cloudDarken:.35,fogScale:1.6,rain:0,sunScale:.55,turbulence:.45},{id:"rain",label:"雨",sub:"暗い空・乱流・雨",cloudScale:1.35,cloudDarken:.6,fogScale:2.4,rain:1,sunScale:.3,turbulence:.8}],fc=[{id:"calm",label:"無風",sub:"0 m/s",speed:0,directionDeg:0},{id:"breeze",label:"そよ風",sub:"5 m/s 北西",speed:5,directionDeg:315},{id:"strong",label:"強風",sub:"12 m/s 西",speed:12,directionDeg:270}];function BS(s){return uc.find(t=>t.id===s)??uc[0]}function kS(s){return dc.find(t=>t.id===s)??dc[0]}function zS(s){return fc.find(t=>t.id===s)??fc[0]}function HS(s,t){const n=t*Math.PI/180+Math.PI;return{x:s*Math.sin(n),z:-s*Math.cos(n)}}const un=260,Ao=900,VS=22;function GS(s){const t=new Float32Array(Ao*3),e=new Float32Array(Ao);for(let o=0;o<Ao;o++)t[o*3+0]=(Math.random()-.5)*un*2,t[o*3+1]=Math.random()*180,t[o*3+2]=(Math.random()-.5)*un*2,e[o]=VS*(.8+Math.random()*.5);const n=new ye;n.setAttribute("position",new ve(t,3));const i=new sa({color:10467532,size:1.1,transparent:!0,opacity:0,depthWrite:!1,fog:!0,sizeAttenuation:!0}),r=new ra(n,i);return r.frustumCulled=!1,r.visible=!1,s.add(r),{points:r,setIntensity(o){const a=Math.max(0,Math.min(1,o));i.opacity=.1+.35*a,r.visible=a>.01},update(o,a){if(!r.visible)return;const l=n.getAttribute("position"),c=l.array;for(let h=0;h<Ao;h++){c[h*3+1]-=e[h]*o;const u=c[h*3+0]-a.x,d=c[h*3+2]-a.z;u>un?c[h*3+0]-=un*2:u<-un&&(c[h*3+0]+=un*2),d>un?c[h*3+2]-=un*2:d<-un&&(c[h*3+2]+=un*2),c[h*3+1]<a.y-60&&(c[h*3+1]=a.y+120,c[h*3+0]=a.x+(Math.random()-.5)*un*2,c[h*3+2]=a.z+(Math.random()-.5)*un*2)}l.needsUpdate=!0}}}const $o=1.225,al=9.80665;function Zu(s){return $o*Math.exp(-Math.max(s,-500)/8500)}function WS(s,t){return .5*s*t*t}function XS(s,t){return s*Math.sqrt(t/$o)}const qS=.3;function YS(s,t,e){const n=Math.min(1,Math.max(0,(e-s)/(t-s)));return n*n*(3-2*n)}function KS(s,t,e,n,i,r,o){const a=Math.min(e.flapsDeg,40)/40,l=Math.min(Math.max(e.spoilers,0),1),c=qS-9e-4*Math.min(Math.max(e.flapsDeg,0),40),h=YS(c,c+.22,Math.abs(s)),u=.38+5.2*s+.85*a,d=1.15*Math.sin(2*s);let f=(1-h)*u+h*d;f*=1-.42*l;const g=.021+.048*u*u,v=1.2*Math.sin(s)*Math.sin(s)+.04;let m=(1-h)*g+h*v;m+=.055*a*a+.016*a,m+=.018*(e.gearDown?1:0),m+=.03*l,m+=.55*t*t;const p=-.9*t,y=Math.max(i,10),x=n.pitchRateUp*r/(2*y);let _=.025-1.15*s-12*x+1.25*e.elevator;_+=-.055*a,_+=-.02*l,h>0&&(_+=-.85*h*Math.sign(s||1)*Math.abs(s));const A=n.yawRateRight*o/(2*y),T=.12*t-.28*A+.1*e.rudder,E=n.rollRateRight*o/(2*y),R=-.09*t-.52*E+.16*e.aileron;return{CL:f,CD:m,CY:p,Cm:_,Cn:T,Cl:R}}const $S=new C(0,1,0);class jS{spec;position=new C;quaternion=new ge;velocity=new C;omega=new C;throttle=1;flapsDeg=5;spoilers=0;gearDown=!0;brakes=!1;crashed=!1;onGround=!0;wind=new C;turbulence=0;fuelFrac=1;tSim=0;gust=new C;mass;inertia=new C;wingArea;chord;span;gearHeight;groundHeight;distanceFlown=0;gLoadSmooth=1;tmpV=new C;tmpV2=new C;tmpQ=new ge;fBody=new C;mBody=new C;constructor(t,e=()=>0){this.spec=t,this.groundHeight=e,this.mass=t.mass,this.wingArea=t.wingArea,this.span=t.wingspan,this.chord=t.rootChord*.55+t.tipChord*.45;const n=t.fuselageLength,i=t.wingspan;this.inertia.set(.35*this.mass*Math.pow(n*.28,2),.32*this.mass*Math.pow(n*.3,2),.25*this.mass*Math.pow(i*.22,2)),this.gearHeight=t.fuselageRadius*1.35+t.fuselageRadius*.3+t.fuselageRadius*.3,this.reset(new C(0,0,1500),0)}reset(t,e){this.resetBase(t,e);const n=this.groundHeight(this.position.x,this.position.z);this.position.y=n+this.gearHeight,this.onGround=!0}resetAirborne(t,e,n){this.resetBase(t,e),this.velocity.set(0,0,n).applyQuaternion(this.quaternion),this.onGround=!1}resetBase(t,e){this.position.copy(t),this.quaternion.setFromAxisAngle(new C(0,1,0),e),this.velocity.set(0,0,0),this.omega.set(0,0,0),this.throttle=1,this.flapsDeg=5,this.spoilers=0,this.gearDown=!0,this.brakes=!1,this.crashed=!1,this.distanceFlown=0,this.gLoadSmooth=1,this.fuelFrac=1,this.tSim=0,this.gust.set(0,0,0)}simVersion=0;telObj=null;telFwd=new C;telRight=new C;telUp=new C;telVAir=new C;telVBody=new C;telQinv=new ge;liftDirTmp=new C;step(t,e,n=0){if(this.crashed)return;this.simVersion++;const i=this.quaternion;this.tSim+=t;const r=this.turbulence*6;if(r>0){const R=this.tSim;this.gust.set(r*(Math.sin(R*1.7)*.5+Math.sin(R*.91+1.3)*.3+Math.sin(R*2.3+4.1)*.2),r*.7*(Math.sin(R*1.13+2.2)*.5+Math.sin(R*2.7+.6)*.5),r*(Math.sin(R*1.37+5)*.5+Math.sin(R*.77+3.3)*.3+Math.sin(R*2.9+1.9)*.2))}else this.gust.set(0,0,0);this.fuelFrac>0&&this.throttle>.02&&!this.onGround&&(this.fuelFrac=Math.max(0,this.fuelFrac-6e-5*this.throttle*t));const o=this.position.y,a=Zu(o);this.tmpV.copy(this.velocity).sub(this.wind).sub(this.gust);const l=this.tmpV.length();this.tmpQ.copy(i).invert();const c=this.tmpV2.copy(this.tmpV).applyQuaternion(this.tmpQ),h=c.z,u=c.x,d=c.y,f=Math.atan2(-d,Math.max(h,.1)),g=Math.atan2(u,Math.max(h,.1)),v=-this.omega.x,m=this.omega.y,p=-this.omega.z,y={elevator:e.elevator+n,aileron:-e.aileron,rudder:-e.rudder,flapsDeg:e.flapsDeg,spoilers:e.spoilers,gearDown:e.gearDown},x=KS(f,g,y,{pitchRateUp:v,rollRateRight:p,yawRateRight:m},l,this.chord,this.span),_=WS(a,l);if(this.fBody.set(0,0,0),this.mBody.set(0,0,0),l>.5){const R=_*this.wingArea*x.CD;c.divideScalar(l),this.fBody.addScaledVector(c,-R);const S=_*this.wingArea*x.CL;this.liftDirTmp.set(0,c.z,-c.y).normalize(),this.fBody.addScaledVector(this.liftDirTmp,S),this.fBody.x+=_*this.wingArea*x.CY;const M=this.spec.thrustMax*Math.pow(a/$o,.8)*(1-.35*Math.min(l/700,1))*this.throttle;this.fBody.z+=M;const P=_*this.wingArea*this.chord*x.Cm,z=_*this.wingArea*this.span*x.Cn,D=_*this.wingArea*this.span*x.Cl;this.mBody.x+=-P,this.mBody.y+=z,this.mBody.z+=-D}else{const R=this.spec.thrustMax*Math.pow(a/$o,.8)*this.throttle;this.fBody.z+=R}if(this.tmpQ.copy(i),this.tmpV.copy(this.fBody).applyQuaternion(this.tmpQ),this.tmpV.y-=this.mass*al,this.tmpV.divideScalar(this.mass),this.onGround)this.gLoadSmooth+=(1-this.gLoadSmooth)*Math.min(t*5,1);else{const R=this.fBody.y/(this.mass*al);this.gLoadSmooth+=(Math.max(R,-.4)-this.gLoadSmooth)*Math.min(t*6,1)}if(this.velocity.addScaledVector(this.tmpV,t),this.position.addScaledVector(this.velocity,t),this.distanceFlown+=this.velocity.length()*t,this.onGround)this.omega.x+=this.mBody.x/this.inertia.x*t,this.omega.y+=this.mBody.y/this.inertia.y*t,this.omega.z+=this.mBody.z/this.inertia.z*t,this.omega.multiplyScalar(Math.exp(-3.5*t));else{const R=this.inertia,S=this.omega.x,M=this.omega.y,P=this.omega.z;this.tmpV.set(this.mBody.x-(M*R.z*P-P*R.y*M),this.mBody.y-(P*R.x*S-S*R.z*P),this.mBody.z-(S*R.y*M-M*R.x*S)),this.omega.x+=this.tmpV.x/R.x*t,this.omega.y+=this.tmpV.y/R.y*t,this.omega.z+=this.tmpV.z/R.z*t}const A=1.6;this.omega.length()>A&&this.omega.setLength(A),Number.isFinite(this.omega.x+this.omega.y+this.omega.z)||this.omega.set(0,0,0),this.tmpQ.set(this.omega.x*t/2,this.omega.y*t/2,this.omega.z*t/2,1),this.quaternion.multiply(this.tmpQ).normalize();const E=this.groundHeight(this.position.x,this.position.z)+this.gearHeight;if(this.position.y<=E+.02){const R=this.velocity.y;if(R>0)this.onGround=!1;else{if(this.position.y=E,this.onGround=!0,R<-8){this.crashed=!0,this.velocity.multiplyScalar(.2);return}R<-.4?this.velocity.y=-R*.12:this.velocity.y=0;const S=this.tmpV2.copy(this.velocity).applyQuaternion(this.tmpQ.copy(this.quaternion).invert());S.x-=S.x*Math.min(6*t,1);const M=.022+(this.brakes?.32:0)+this.spoilers*.06,P=S.z,z=M*al*t;Math.abs(P)>z?S.z-=Math.sign(P)*z:S.z=0,this.velocity.copy(S).applyQuaternion(this.quaternion);const D=this.velocity.length(),F=Math.min(D/8,1)*Math.max(0,1-(D-30)/25);if(F>.001){const k=-e.rudder*F*.55;this.tmpQ.setFromAxisAngle($S,k*t),this.quaternion.multiply(this.tmpQ)}Math.min(1,Math.abs(e.elevator)+Math.abs(e.aileron));const H=(1-Math.abs(e.aileron)*.9)*6.5,N=Math.abs(e.elevator)<.1?6.5:0,q=this.tmpV.set(0,-1,0).applyQuaternion(this.tmpQ.copy(this.quaternion).invert());this.omega.z+=(q.x*H-this.omega.z*2.2)*t*2,this.omega.x+=(-q.z*N-this.omega.x*2.2)*t*2,Math.hypot(q.x,q.z)>.62&&(this.crashed=!0,this.velocity.multiplyScalar(.1))}}else this.onGround=!1}telemetry(){const t=this.telObj??={position:new C,quaternion:new ge,velocity:new C,omega:new C,tas:0,ias:0,alt:0,agl:0,heading:0,pitch:0,bank:0,vspeed:0,aoa:0,sideslip:0,gLoad:0,throttle:0,onGround:!1,crashed:!1,distanceFlown:0,fuelFrac:0,groundSpeed:0,windSpeed:0,windDirDeg:0},e=this.telFwd.set(0,0,1).applyQuaternion(this.quaternion),n=this.telRight.set(1,0,0).applyQuaternion(this.quaternion),i=this.telUp.set(0,1,0).applyQuaternion(this.quaternion),r=Zu(this.position.y),o=this.telVAir.copy(this.velocity).sub(this.wind).sub(this.gust),a=o.length(),l=this.telVBody.copy(o).applyQuaternion(this.telQinv.copy(this.quaternion).invert());return t.position.copy(this.position),t.quaternion.copy(this.quaternion),t.velocity.copy(this.velocity),t.omega.copy(this.omega),t.tas=a,t.ias=XS(a,r),t.alt=this.position.y,t.agl=this.position.y-this.groundHeight(this.position.x,this.position.z),t.heading=(Math.atan2(e.x,-e.z)*180/Math.PI+360)%360,t.pitch=Math.asin(Math.min(1,Math.max(-1,e.y)))*180/Math.PI,t.bank=-(Math.atan2(-n.y,i.y)*180)/Math.PI,t.vspeed=this.velocity.y,t.aoa=Math.atan2(-l.y,Math.max(l.z,.1))*180/Math.PI,t.sideslip=-(Math.atan2(l.x,Math.max(l.z,.1))*180)/Math.PI,t.gLoad=this.gLoadSmooth,t.throttle=this.throttle,t.onGround=this.onGround,t.crashed=this.crashed,t.distanceFlown=this.distanceFlown,t.fuelFrac=this.fuelFrac,t.groundSpeed=Math.hypot(this.velocity.x,this.velocity.z),t.windSpeed=Math.hypot(this.wind.x,this.wind.z),t.windDirDeg=(Math.atan2(-this.wind.x,this.wind.z)*180/Math.PI+360)%360,t}}function xe(s,t,e){return s<t?t:s>e?e:s}function hr(s){let t=s%360;return t>180&&(t-=360),t<=-180&&(t+=360),t}const ll=1.94404,cl=Math.tan(3*Math.PI/180),ZS=150;function QS(s,t,e,n){const i=Math.sin(s.heading),r=Math.cos(s.heading),o=s.length/2,a=s.center.x+i*o,l=s.center.z+r*o,c=s.center.x-i*o,h=s.center.z-r*o,u=n*Math.PI/180,d=Math.sin(u),f=-Math.cos(u),g=(a-t)*d+(l-e)*f,v=(c-t)*d+(h-e)*f,m=g>=v,p=m?a:c,y=m?l:h,x=m?c:a,_=m?h:l;let A=p-x,T=y-_;const E=Math.hypot(A,T)||1;A/=E,T/=E;const R=(Math.atan2(A,-T)*180/Math.PI%360+360)%360,S=t-p,M=e-y,P=-T,z=A,D=S*P+M*z,F=-(S*A+M*T);return{thrX:p,thrZ:y,rwyHdg:R,xtk:D,along:F,rightX:P,rightZ:z}}class JS{engaged=!1;latMode="HDG";verMode="ALT";spd=62;hdg=0;altTarget=0;vs=0;throttle=.6;events=[];locAlive=!1;gsAlive=!1;debugOn=!1;debug={};itP=0;itR=0;hInt=0;vsInt=0;vsAltV=0;vsAltRef=null;wasAirborne=!0;last={engaged:!1,lat:"HDG",ver:"ALT",spdKt:120,hdgDeg:0,altM:0,vsFpm:0,loc:!1,gs:!1,xtk:0,gsDev:0,dist:0};reset(){this.engaged=!1,this.vsInt=0,this.hInt=0,this.latMode="HDG",this.verMode="ALT",this.locAlive=!1,this.gsAlive=!1,this.wasAirborne=!0,this.events.length=0}drainEvents(){if(this.events.length===0)return this.events;const t=this.events.slice();return this.events.length=0,t}emit(t){this.events.length<8&&this.events.push(t)}toggle(t){if(this.engaged){this.engaged=!1,this.emit("ap-off");return}this.engaged=!0,this.spd=xe(t.ias,41,143),this.hdg=Math.round(t.heading),this.altTarget=t.onGround?t.alt:Math.round(t.alt),this.vs=0,this.verMode="ALT",this.locAlive||(this.latMode="HDG"),this.itP=.05,this.itR=0,this.hInt=0,this.vsInt=0,this.vsAltV=0,this.vsAltRef=null,this.emit("ap-on")}status(){return this.last}nudgeSpd(t){this.spd=xe(this.spd*ll+t,80,280)/ll}nudgeHdg(t){this.hdg=((this.hdg+t)%360+360)%360,this.latMode="HDG",this.hInt=0}setLat(t){this.latMode=t,this.hInt=0,t==="NAV"&&this.emit("nav-arm")}nudgeAlt(t){this.altTarget=Math.max(this.altTarget+t,60),this.verMode==="APPR"&&(this.verMode="ALT",this.emit("gs-off"))}nudgeVs(t){this.vs=xe(this.vs+t/196.85,-10,10),this.verMode="VS",this.vsInt=0,this.vsAltV=0,this.vsAltRef=null}holdAltReset(){this.verMode="ALT",this.vsInt=0}holdAlt(){this.verMode="ALT",this.vsInt=0}alignApproach(){this.latMode="NAV",this.verMode="APPR",this.hInt=0,this.vsInt=0,this.emit("appr-arm")}step(t,e,n){if(!this.engaged)return null;if(this.wasAirborne&&e.onGround)return this.engaged=!1,this.emit("ap-touchdown"),this.wasAirborne=!1,null;if(this.wasAirborne=!e.onGround,e.onGround)return{pitch:0,roll:0,throttle:xe(this.throttle,.02,1)};const i=xe(t,1/240,1/15);this.vsAltRef===null&&(this.vsAltRef=e.alt,this.vsAltV=0);let r=0,o=0,a=this.hdg,l=0,c;if(this.latMode==="NAV"&&n){const P=QS(n,e.x,e.z,e.heading);l=e.vx*P.rightX+e.vz*P.rightZ,r=P.xtk,o=P.along,a=P.rwyHdg;const z=o>-800&&o<14e3,D=Math.abs(hr(P.rwyHdg-e.heading))<16,F=this.locAlive;if(this.locAlive=F&&z&&Math.abs(r)<900||z&&D&&Math.abs(r)<260,this.locAlive){F||(this.emit("loc-alive"),this.hInt=0),this.hdg=Math.round(P.rwyHdg);const H=this.verMode==="APPR"?6:12,N=xe(-r*.05-l*.55,-H,H);c=hr(P.rwyHdg+N-e.heading)}else F&&this.emit("loc-lost"),c=hr(this.hdg-e.heading)}else this.locAlive&&this.emit("loc-lost"),this.locAlive=!1,c=hr(this.hdg-e.heading);this.latMode!=="NAV"&&(this.hInt=xe(this.hInt+c*.08*i,-6,6));const h=xe(c*(this.latMode==="NAV"?.75:.6)+this.hInt,-28,28);if(this.verMode!=="APPR")this.gsAlive=!1;else if(this.locAlive){const P=this.gsAlive,z=Math.max(o,0)*cl,D=e.alt-z;this.gsAlive=P||o>400&&Math.abs(D)<60&&Math.abs(r)<260,this.gsAlive&&!P&&this.emit("gs-alive"),this.gsAlive}const u=hr(h-e.bank),d=xe(u*1.6,-15,15),f=this.itR+.05*u-.01*(e.p-d),g=xe(f,-1,1);this.itR=xe(this.itR+.3*u*i-2*(f-g),-.5,.5);const v=this.gsAlive?e.alt-Math.max(o,0)*cl:0;let m;if(this.verMode==="APPR"&&this.gsAlive)m=-cl*Math.max(e.ias,40)+xe(-v*.35,-3.2,3.2),m=xe(m,-12,6);else if(this.verMode==="VS")m=this.vs;else{const P=this.altTarget-e.alt;m=xe(P*1.15,-8,8),Math.abs(P)<40&&(m*=Math.abs(P)/40)}const p=this.altTarget-e.alt,y=this.verMode==="APPR"&&this.gsAlive?0:.022,x=(1/Math.max(.66,Math.cos(e.bank*Math.PI/180))-1)*Math.max(e.alt,300)*.5;if(this.verMode==="VS"){this.vsAltV+=m*i;var _=.05*xe(this.vsAltV-(e.alt-this.vsAltRef),-240,240)+.45*(m-e.vs)}else{this.vsInt=xe(this.vsInt+(m-e.vs)*.05*i,-5,5),this.verMode==="ALT"&&(this.vsInt=xe(this.vsInt*(1-.8*i),-5,5));var _=this.vsInt+.45*(m-e.vs)}const A=xe(y*(p+x)+_,-4.5,12),T=A-e.pitch,E=this.itP+.25*T-.18*e.q,R=xe(E,-1,1);this.itP=xe(this.itP+.15*T*i-3*(E-R),-.4,.4),this.debugOn&&(this.debug={thDes:A,pitchErr:T,itP:this.itP,q:e.q,pitch:e.pitch}),this.verMode!=="APPR"&&e.agl<ZS&&e.vs<-.5&&(this.altTarget=e.alt+400,this.verMode="ALT",this.emit("min-alt")),this.latMode==="NAV"&&this.locAlive&&o<-500&&(this.locAlive=!1,this.gsAlive=!1,this.verMode=this.verMode==="APPR"?"ALT":this.verMode,this.latMode="HDG",this.hdg=Math.round(a),this.emit("missed"));const S=this.spd-e.ias,M=Math.abs(S)<1?0:S;return this.throttle=xe(this.throttle+xe(M*.05,-.3,.3)*i,.02,1),this.verMode==="APPR"&&this.gsAlive&&e.agl<30&&e.vs<-.4&&(this.throttle=.03),!Number.isFinite(R)||!Number.isFinite(g)?(this.engaged=!1,this.emit("ap-trip"),null):(this.last={engaged:!0,lat:this.latMode,ver:this.verMode,spdKt:Math.round(this.spd*ll),hdgDeg:this.hdg,altM:Math.round(this.altTarget),vsFpm:Math.round(this.vs*196.85),loc:this.locAlive,gs:this.gsAlive,xtk:r,gsDev:v,dist:Math.max(o,0)},{pitch:xe(R,-1,1),roll:xe(g,-1,1),throttle:this.throttle})}}const Qu=180/Math.PI;function Ju(s){return{ias:s.ias,pitch:s.pitch,alt:s.alt,agl:s.agl,heading:s.heading,bank:s.bank,q:-s.omega.x*Qu,p:s.omega.z*Qu,vs:s.vspeed,x:s.position.x,z:s.position.z,vx:s.velocity.x,vz:s.velocity.z,onGround:s.onGround}}const td=new C(0,1,0),t1=new ge().setFromAxisAngle(new C(1,0,0),-Math.PI/2),ed=new C,nd=new ge,e1=new ge;function ko(s){if(s.userData.sharedResources)return;const t=s;t.geometry&&t.geometry.dispose();const e=t.material;Array.isArray(e)?e.forEach(n=>n.dispose()):e?.dispose();for(const n of s.children)ko(n)}function n1(s){return{position:s.position,quaternion:s.quaternion,velocity:s.velocity,omega:new C,tas:s.speed,ias:s.speed,alt:s.altitude,agl:s.altitude,heading:s.heading,pitch:s.pitch,bank:s.bank,vspeed:s.vspeed,aoa:0,sideslip:0,gLoad:1,throttle:s.throttle,onGround:s.altitude<4,crashed:!1,distanceFlown:0,fuelFrac:.8,groundSpeed:s.speed,windSpeed:0,windDirDeg:0}}class i1{state="menu";quality=new Py;lodTimer=0;rig;demo=new Tr;scene;camera;renderer;sky;water;terrain;fogBaseNear=rn.FOG_NEAR;fogBaseFar=rn.FOG_FAR;clouds;rain;airport=Cu("hlm");envWind=new C;envTurbulence=.15;player=null;cockpit=null;playerSpec=$n[0];flightMode="free";physics=null;physicsAccum=0;ap=new JS;lastTel=null;lastTelVersion=-1;apAccum=0;lastApCmd=null;lastDemoState=null;composer=null;bloomPass=null;cityGroup=null;airportGroups=[];groundBlob=null;previewScene;previewAircraft=null;previewAngle=.6;constructor(t,e,n){this.renderer=t,this.scene=e,this.camera=n,this.rig=new ms(n),this.sky=Iy(e,t),e.fog=new Fc(12901102,rn.FOG_NEAR,rn.FOG_FAR);const i=this.quality.preset;this.terrain=IM(e,i.terrainNearSeg,i.terrainMid),this.water=LM(e),this.renderer.shadowMap.enabled=i.shadows,this.renderer.shadowMap.type=vd,this.applyShadowSettings(),this.clouds=DM(e,this.quality.preset.cloudCount),this.rain=GS(e);for(const l of an)this.airportGroups.push(MS(e,l,$n,this.quality.preset.runwayTexPx));this.cityGroup=wS(e,this.quality.preset.cityCount),bS(e,this.quality.preset.treeCount),this.quality.preset.bloom&&this.enableBloom();{const l=document.createElement("canvas");l.width=l.height=128;const c=l.getContext("2d"),h=c.createRadialGradient(64,64,6,64,64,62);h.addColorStop(0,"rgba(0,0,0,0.85)"),h.addColorStop(.6,"rgba(0,0,0,0.38)"),h.addColorStop(1,"rgba(0,0,0,0)"),c.fillStyle=h,c.fillRect(0,0,128,128);const u=new yi(l),d=new st(new ki(1,20),new De({map:u,transparent:!0,opacity:0,depthWrite:!1,fog:!0}));d.rotation.x=-Math.PI/2,d.renderOrder=2,d.visible=!1,e.add(d),this.groundBlob=d}this.previewScene=new Oc,this.previewScene.background=new ft(1120288),this.previewScene.environment=e.environment;const r=new mf(12376304,3359829,1);this.previewScene.add(r);const o=new Gc(16773596,2);o.position.set(60,80,40),this.previewScene.add(o);const a=new st(new ki(260,48),new Kt({color:1778734,metalness:.2,roughness:.8}));a.rotation.x=-Math.PI/2,a.position.y=-32,this.previewScene.add(a),this.buildPreview($n[0])}setQuality(t){this.quality.setLevel(t);const e=this.quality.preset;this.renderer.shadowMap.enabled=e.shadows,this.terrain.setMid(e.terrainMid),this.applyShadowSettings(),e.bloom&&!this.composer&&this.enableBloom(),this.syncPostFx()}enableBloom(){const t=this.renderer,e=new it;t.getSize(e);const n=new Ty(t);n.addPass(new Ay(this.scene,this.camera));const i=new Fs(new it(e.x,e.y),.42,.62,.8);n.addPass(i),n.addPass(new Cy),n.setPixelRatio(t.getPixelRatio()),this.composer=n,this.bloomPass=i}syncPostFx(){if(this.bloomPass&&(this.bloomPass.enabled=this.quality.preset.bloom),!this.composer)return;this.composer.setPixelRatio(this.renderer.getPixelRatio());const t=new it;this.renderer.getSize(t),this.composer.setSize(t.x,t.y)}lastEnvIds=null;reapplyEnvironment(){this.lastEnvIds&&this.applyEnvironment(...this.lastEnvIds)}lastShadowKey="";applyShadowSettings(){const t=this.sky.sun,e=this.quality.preset,n=e.shadows?`on:${e.shadowMapSize}:${e.shadowRange}`:"off";if(n===this.lastShadowKey||(this.lastShadowKey=n,t.castShadow=e.shadows,!e.shadows))return;t.shadow.map&&(t.shadow.map.dispose(),t.shadow.map=null),t.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize);const i=t.shadow.camera,r=e.shadowRange;i.left=-r,i.right=r,i.top=r,i.bottom=-r,i.near=200,i.far=9e3,i.updateProjectionMatrix(),t.shadow.bias=-4e-4,t.shadow.normalBias=6,t.target.position.set(0,0,0),this.scene.add(t.target)}applyEnvironment(t,e,n){this.lastEnvIds=[t,e,n];const i=BS(t),r=kS(e),o=zS(n);this.sky.setSunElevation(i.sunElevation),this.sky.setPalette(i.skyTop,i.skyHorizon,i.sunColor,i.sunIntensity*r.sunScale,i.hemiIntensity*(.55+.45*r.sunScale)),this.sky.setStars(Math.max(0,(i.nightLights-.62)/.38));const a=u=>{const d=u?.userData?.setNightLights;d?.(i.nightLights*(.55+.45*r.sunScale))};a(this.cityGroup);for(const u of this.airportGroups)a(u);this.water.setPalette(i.skyTop,i.skyHorizon,i.sunColor,i.sunElevation),this.sky.regenerateEnv(this.scene),this.terrain?.setAtmos({sunDir:this.sky.sunDir,warm:new ft(i.sunColor),shadeMix:i.id==="sunset"?1:i.id==="night"?.55:0,shadeAmt:(i.id==="night"?.5:1)*(.35+.65*r.sunScale)});const l=this.scene.fog;l.color.setHex(i.fogColor);const c=Math.max(.25,r.fogScale);l.near=rn.FOG_NEAR/c,l.far=rn.FOG_FAR/c,this.fogBaseNear=l.near,this.fogBaseFar=l.far,this.water.setHorizon(l.color),this.clouds.setDensity(Math.min(1,r.cloudScale)),this.clouds.setDarken(r.cloudDarken),this.rain.setIntensity(r.rain);const h=HS(o.speed,o.directionDeg);this.envWind.set(h.x,0,h.z),this.envTurbulence=r.turbulence,this.physics&&(this.physics.wind.copy(this.envWind),this.physics.turbulence=this.envTurbulence,this.lastTelVersion=-1)}apInput(){return!this.ap.engaged||!this.lastTel||!this.physics?null:Ju(this.lastTel)}toggleAp(){const t=this.lastTel??this.physics?.telemetry();return t?this.ap.toggle(Ju(t)):this.ap.toggle({ias:62,alt:0,agl:0,heading:0,bank:0,pitch:0,q:0,p:0,vs:0,x:0,z:0,vx:0,vz:0,onGround:!0}),this.ap.engaged}getApStatus(){return this.ap.status()}drainApEvents(){return this.ap.drainEvents()}getNavInfo(){const t=this.getTelemetry();return t?OS(this.airport,t.position.x,t.position.z,t.velocity.x,t.velocity.z):null}getPlayerGroup(){return this.player?this.player.group:null}buildPreview(t){if(this.previewAircraft){const n=this.previewAircraft.group;ko(n),this.previewScene.remove(n)}this.previewAircraft=hc(t,{low:!1}),this.previewAircraft.setGearPosition(1);const e=t.fuselageLength;this.previewAircraft.group.position.set(0,-e*.06,0),this.previewScene.add(this.previewAircraft.group),this.previewAngle=.7}selectAircraft(t){this.buildPreview(t)}renderPreview(t){this.previewAngle+=t*.22,this.previewAircraft&&Za(this.playerSpec.id),this.previewAircraft&&(this.previewAircraft.group.rotation.y=this.previewAngle,this.previewAircraft.spinFans(t));const e=this.playerSpec.fuselageLength,n=e*1.55;this.camera.position.set(Math.cos(this.previewAngle*.35)*n,e*.32,Math.sin(this.previewAngle*.35)*n),this.camera.lookAt(0,e*.02,0),this.renderer.render(this.previewScene,this.camera)}runwayStartPose(){const t=this.airport,[e]=Uf(t),n=Math.sin(t.heading),i=Math.cos(t.heading);return{pos:new C(e.x-n*220,0,e.z-i*220),headingRad:t.heading+Math.PI}}startFlight(t,e,n){if(n&&(this.airport=Cu(n)),this.playerSpec=Za(t),this.flightMode=e,this.player&&(this.scene.remove(this.player.group),ko(this.player.group)),this.player=hc(this.playerSpec,{ext:!0}),this.cockpit=FS(this.playerSpec),this.player.group.add(this.cockpit.group),this.cockpit.group.visible=this.rig.mode==="cockpit",this.player.group.userData.extCockpitView=this.rig.mode==="cockpit"||this.cockpit.hasModel(),this.scene.add(this.player.group),e==="free"){this.physics=new jS(this.playerSpec,we);const i=this.runwayStartPose();this.physics.reset(i.pos,i.headingRad),this.physics.throttle=0,this.physics.flapsDeg=5,this.ap.reset(),this.lastTel=this.physics.telemetry(),this.lastTelVersion=this.physics.simVersion,this.physics.wind.copy(this.envWind),this.physics.turbulence=this.envTurbulence,this.physicsAccum=0;const r=this.telemetryNow();this.rig.snap({position:r.position,quaternion:r.quaternion,velocity:r.velocity,size:this.playerSpec.fuselageLength})}else{this.physics=null,this.demo.reset();const i=this.demo.update(.001);this.lastDemoState=i,this.applyDemoState(i),this.rig.snap({position:i.position,quaternion:i.quaternion,velocity:i.velocity,size:this.playerSpec.fuselageLength})}this.state="flying"}pause(){this.state==="flying"&&(this.state="paused")}resume(){this.state==="paused"&&(this.state="flying")}toMenu(){this.state="menu",this.buildPreview(Za(this.playerSpec.id))}restartDemo(){if(this.player){if(this.player.group.visible=!0,this.flightMode==="free"&&this.physics){const t=this.runwayStartPose();this.physics.reset(t.pos,t.headingRad),this.physics.throttle=0,this.ap.reset(),this.lastTel=this.physics.telemetry(),this.lastTelVersion=this.physics.simVersion}else this.demo.reset();this.state="flying"}}cycleCamera(t){const e=t===1?this.rig.nextMode():this.rig.prevMode();return this.cockpit&&(this.cockpit.group.visible=e==="cockpit"),this.player&&(this.player.group.userData.extCockpitView=e==="cockpit"),e}cameraName(){return AS[this.rig.mode]}getDemoState(){return this.lastDemoState}telemetryNow(){const t=this.physics;return(t.simVersion!==this.lastTelVersion||!this.lastTel)&&(this.lastTel=t.telemetry(),this.lastTelVersion=t.simVersion),this.lastTel}getTelemetry(){if(this.flightMode==="free"&&this.physics)return(this.physics.simVersion!==this.lastTelVersion||!this.lastTel)&&(this.lastTel=this.physics.telemetry(),this.lastTelVersion=this.physics.simVersion),this.lastTel;const t=this.lastDemoState;return t?n1(t):null}getFlightInfo(){if(this.flightMode==="free"&&this.physics){const e=this.telemetryNow(),n=e.crashed?"CRASHED":e.onGround?e.ias>3?"TAKEOFF ROLL":e.throttle>.02?"GROUND":"PARKED":e.agl<300&&e.vspeed<0?"APPROACH":"FLIGHT";return{flapsDeg:this.physics.flapsDeg,gearDown:this.physics.gearDown,phase:n,crashed:e.crashed}}const t=this.lastDemoState;return{flapsDeg:t?.flaps??0,gearDown:(t?.gear??1)>.5,phase:t?.phase??"—",crashed:!1}}simulate(t,e){if(!this.physics)return;this.physics.throttle=e.throttle,this.physics.flapsDeg=e.flapsDeg,this.physics.spoilers=e.spoilers,this.physics.gearDown=e.gearDown,this.physics.brakes=e.brakes;const n=1/120,i=Math.round(t/n);for(let o=0;o<i;o++)this.physics.step(n,{elevator:e.pitch,aileron:e.roll,rudder:e.yaw,flapsDeg:e.flapsDeg,spoilers:e.spoilers,gearDown:e.gearDown});const r=this.physics.telemetry();this.player?.group.position.copy(r.position),this.player?.group.quaternion.copy(r.quaternion),this.rig.snap({position:r.position,quaternion:r.quaternion,velocity:r.velocity,size:this.playerSpec.fuselageLength})}updateFlight(t,e){if(this.player){if(this.flightMode==="free"&&this.physics){const i={...e??{pitch:0,roll:0,yaw:0,throttle:this.physics.throttle,brakes:this.physics.brakes,flapsDeg:this.physics.flapsDeg,spoilers:this.physics.spoilers,gearDown:this.physics.gearDown}},r=this.apInput();let o=this.lastApCmd;if(r){this.apAccum+=t;const c=1/60;let h=0;for(;this.apAccum>=c&&h<8;){const u=this.ap.step(c,r,this.airport);u&&(o=u),this.apAccum-=c,h++}h>=8&&(this.apAccum=0)}else this.apAccum=0,o=null;this.lastApCmd=o,o&&(i.pitch=o.pitch,i.roll=o.roll,i.throttle=o.throttle),this.physics.throttle=i.throttle,this.physics.flapsDeg=i.flapsDeg,this.physics.spoilers=i.spoilers,this.physics.gearDown=i.gearDown,this.physics.brakes=i.brakes,this.physicsAccum=Math.min(this.physicsAccum+t,.25);const a=1/120;for(;this.physicsAccum>=a;)this.physics.step(a,{elevator:i.pitch,aileron:i.roll,rudder:i.yaw,flapsDeg:i.flapsDeg,spoilers:i.spoilers,gearDown:i.gearDown}),this.physicsAccum-=a;const l=this.telemetryNow();l.crashed&&this.ap.engaged&&this.ap.reset(),this.player.group.position.copy(l.position),this.player.group.quaternion.copy(l.quaternion),this.player.setGearPosition(this.physics.gearDown?1:0),this.player.setFlaps(this.physics.flapsDeg),this.player.setSpoilers(this.physics.spoilers),this.rig.update(t,{position:l.position,quaternion:l.quaternion,velocity:l.velocity,size:this.playerSpec.fuselageLength,agl:Math.max(0,l.position.y-we(l.position.x,l.position.z))})}else{const n=this.demo.update(t);this.lastDemoState=n,this.applyDemoState(n),this.rig.update(t,{position:n.position,quaternion:n.quaternion,velocity:n.velocity,size:this.playerSpec.fuselageLength,agl:Math.max(0,n.position.y-we(n.position.x,n.position.z))})}this.cockpit&&(this.player&&(this.player.group.userData.extCockpitView=this.rig.mode==="cockpit"||this.cockpit.hasModel()),this.cockpit.update(Math.min(1,Math.max(.12,this.sky.hemi.intensity/.75))),US(this.renderer))}}updateWorld(t,e=1/60){this.sky.sky.position.copy(this.camera.position),this.lodTimer-=e,this.lodTimer<=0&&(this.lodTimer=.25,SS(this.camera.position)),this.water.update(t),this.updateTerrainAndFog(),this.clouds.update(e),this.rain.update(e,this.camera.position),this.player?.spinFans(e),this.player?.updateLights(t),this.demo.finished&&this.state==="flying"&&this.demo.reset()}updateTerrainAndFog(){const t=this.camera.position;this.terrain.update(t.x,t.z);const e=this.scene.fog;if(e){const i=Math.max(0,t.y-we(t.x,t.z));if(this.groundBlob&&this.player){const o=this.groundBlob,a=this.player.group.position,l=Math.max(0,a.y-we(a.x,a.z));if(l<400){const c=this.sky.sunDir,h=Math.max(c.y,.06),u=Math.min(l/Math.max(Math.tan(h),.16),l*1.6+46),d=Math.hypot(c.x,c.z)||1,f=c.x/d,g=c.z/d,v=a.x-f*u,m=a.z-g*u,p=Math.max(we(v,m),rn.SEA_LEVEL)+.7;o.position.set(v,p,m);const y=1-l/400,x=this.playerSpec.wingspan*.42+l*.1;o.scale.set(x*(1+u/(x*2.4)),x*.86,1);const _=Math.atan2(-g,f);ed.set(-(we(v+90,m)-we(v-90,m))/180,1,-(we(v,m+90)-we(v,m-90))/180).normalize(),nd.setFromUnitVectors(td,ed),o.quaternion.copy(nd).multiply(e1.setFromAxisAngle(td,_).multiply(t1));const A=.62+.38/(1+u*.0035),T=.45+.55*Math.min(h/.5,1);o.material.opacity=(.12+.34*y*y)*A*T,o.visible=!0}else o.visible=!1}const r=Math.min(i/4e3,2.2);e.near=this.fogBaseNear*(1+.7*r),e.far=this.fogBaseFar*(1+.55*r)}const n=this.sky.sun;if(n.castShadow){const i=this.player?.group.position??t;n.position.copy(i).addScaledVector(this.sky.sunDir,5200),n.target.position.copy(i),n.target.updateMatrixWorld()}}forceCrash(){!this.physics||this.physics.crashed||(this.physics.crashed=!0,this.player&&(this.player.group.visible=!1),this.ap.engaged&&this.ap.reset())}render(){this.composer&&this.quality.preset.bloom?this.composer.render():this.renderer.render(this.scene,this.camera)}applyDemoState(t){if(!this.player)return;const e=this.player.group;e.position.copy(t.position),e.quaternion.copy(t.quaternion),this.player.setGearPosition(t.gear),this.player.setFlaps(t.flaps),this.player.setSpoilers(t.spoilers)}orbitDrag(t,e){this.rig.mode==="orbit"?this.rig.addOrbitDelta(t,e):this.rig.mode==="chase"&&this.rig.addChaseDelta(t,e)}disposePlayer(){this.player&&(this.scene.remove(this.player.group),ko(this.player.group),this.player=null),this.cockpit=null}}class s1{config={aircraftId:$n[0].id,airportId:an[0].id,quality:"high",mode:"free",time:"day",weather:"clear",wind:"calm",fullscreen:!1};els={root:document.getElementById("menu-overlay"),cards:document.getElementById("aircraft-cards"),airports:document.getElementById("airport-chips"),quality:document.getElementById("quality-chips"),modes:document.getElementById("mode-chips"),display:document.getElementById("display-chips"),times:document.getElementById("time-chips"),weathers:document.getElementById("weather-chips"),winds:document.getElementById("wind-chips")};constructor(t){this.buildAircraftCards(),this.buildChips(this.els.airports,an.map(e=>({id:e.id,label:`${e.code} ${e.name}`,sub:e.description})),this.config.airportId,e=>{this.config.airportId=e}),this.buildChips(this.els.modes,[{id:"free",label:"自由飛行",sub:"自分で操縦（滑走路開始）"},{id:"demo",label:"デモ飛行",sub:"自動操縦の観察"}],this.config.mode,e=>{this.config.mode=e}),this.buildChips(this.els.quality,[{id:"ultra",label:"画質: 最高",sub:"Retina3.0×・影4k"},{id:"high",label:"画質: 高",sub:"影・高解像度"},{id:"medium",label:"画質: 中",sub:"バランス"},{id:"low",label:"画質: 低",sub:"軽量"}],this.config.quality,e=>{this.config.quality=e}),this.buildChips(this.els.times,uc.map(e=>({id:e.id,label:`時刻: ${e.label}`,sub:e.sub})),this.config.time,e=>{this.config.time=e}),this.buildChips(this.els.weathers,dc.map(e=>({id:e.id,label:`天候: ${e.label}`,sub:e.sub})),this.config.weather,e=>{this.config.weather=e}),this.buildChips(this.els.winds,fc.map(e=>({id:e.id,label:`風: ${e.label}`,sub:e.sub})),this.config.wind,e=>{this.config.wind=e}),this.buildChips(this.els.display,[{id:"fs",label:"表示: 全画面",sub:"画面いっぱいに拡大"},{id:"win",label:"表示: ウィンドウ",sub:"ブラウザ枠のまま"}],this.config.fullscreen?"fs":"win",e=>{const n=e==="fs";this.config.fullscreen=n,this.onDisplaySelect?.(n)});for(const e of this.els.display.children)e.dataset.fs=e.classList.contains("chip")&&e===this.els.display.children[0]?"1":"0";document.getElementById("btn-start").addEventListener("pointerdown",e=>{e.preventDefault(),t()})}buildAircraftCards(){this.els.cards.innerHTML="";for(const t of $n){const e=document.createElement("div");e.className="card"+(t.id===this.config.aircraftId?" selected":""),e.innerHTML=`<h3>${t.name}</h3><p>${t.description}</p>`,e.addEventListener("pointerdown",n=>{n.preventDefault(),this.config.aircraftId=t.id;for(const i of this.els.cards.children)i.classList.remove("selected");e.classList.add("selected"),this.onAircraftChange?.(t)}),this.els.cards.appendChild(e)}}buildChips(t,e,n,i){t.innerHTML="";for(const r of e){const o=document.createElement("div");o.className="chip"+(r.id===n?" selected":""),o.innerHTML=`${r.label}<br><small>${r.sub}</small>`,o.addEventListener("pointerdown",a=>{a.preventDefault(),i(r.id);for(const l of t.children)l.classList.remove("selected");o.classList.add("selected")}),t.appendChild(o)}}onAircraftChange=null;onDisplaySelect=null;syncDisplay(){const t=this.config.fullscreen;for(const e of this.els.display.children)e.classList.toggle("selected",e.dataset.fs==="1"&&t||e.dataset.fs!=="1"&&!t)}setDisplay(t){this.config.fullscreen=t,this.syncDisplay()}show(){this.els.root.classList.remove("hidden"),this.syncDisplay()}hide(){this.els.root.classList.add("hidden")}}const Ye=.514444,r1=.45359237,Or={mtowLbs:154500,mlwLbs:128e3,vmoKias:340},id=[{flap:1,vfe:250,rec:230},{flap:2,vfe:250,rec:220},{flap:5,vfe:250,rec:200},{flap:10,vfe:210,rec:190},{flap:15,vfe:200,rec:180},{flap:25,vfe:190,rec:170},{flap:30,vfe:175,rec:150},{flap:40,vfe:162,rec:140}],o1=[{load:.15,flap:5,n1:85,v1:125,vr:125,v2:135,trimPct:15,trimUnits:4},{load:.35,flap:5,n1:88,v1:130,vr:130,v2:140,trimPct:18,trimUnits:4.5},{load:.55,flap:15,n1:92,v1:135,vr:135,v2:145,trimPct:20,trimUnits:5},{load:.75,flap:15,n1:96,v1:142,vr:142,v2:152,trimPct:22,trimUnits:5.5},{load:.95,flap:15,n1:98,v1:148,vr:148,v2:158,trimPct:25,trimUnits:6}],a1=[{lwLbs:1e5,f30:121,f40:118},{lwLbs:11e4,f30:127,f40:124},{lwLbs:115e3,f30:130,f40:126},{lwLbs:12e4,f30:133,f40:129},{lwLbs:128e3,f30:137,f40:134}],sd=41140,ur={landingPitchMin:2.5,landingPitchMax:3,flareFt:50,idleFt:30,reverseOffKts:60};function hi(s,t,e){return s+(t-s)*e}function la(s,t,e){return Math.max(t,Math.min(e,s))}function jo(s){const t=Or.mtowLbs*r1;return la((s-sd)/(t-sd),.05,1)}function Ff(s){const t=o1,e=la(s,t[0].load,t[t.length-1].load);for(let i=0;i<t.length-1;i++)if(e<=t[i+1].load){const r=(e-t[i].load)/(t[i+1].load-t[i].load);return{flap:hi(t[i].flap,t[i+1].flap,r)>=10?15:5,n1:hi(t[i].n1,t[i+1].n1,r),v1:hi(t[i].v1,t[i+1].v1,r),vr:hi(t[i].vr,t[i+1].vr,r),v2:hi(t[i].v2,t[i+1].v2,r),trimPct:hi(t[i].trimPct,t[i+1].trimPct,r),trimUnits:hi(t[i].trimUnits,t[i+1].trimUnits,r)}}return{...t[t.length-1]}}function pc(s){const t=Or.vmoKias;if(s<=.5)return{limitMs:t*Ye,recMs:t*Ye,limitKias:t,recKias:t};let e=id[0];for(const n of id)if(n.flap<=s+.01)e=n;else break;return{limitMs:e.vfe*Ye,recMs:e.rec*Ye,limitKias:e.vfe,recKias:e.rec}}function Of(s){return Math.min(Or.vmoKias,pc(s).limitKias)*Ye}function rd(s,t){const e=a1,n=la(s,e[0].lwLbs,e[e.length-1].lwLbs),i=t===30?"f30":"f40";for(let r=0;r<e.length-1;r++)if(n<=e[r+1].lwLbs){const o=(n-e[r].lwLbs)/(e[r+1].lwLbs-e[r].lwLbs);return hi(e[r][i],e[r+1][i],o)}return e[e.length-1][i]}function l1(s,t,e){const n=Math.max(0,e-t),i=s+t/2+n;return la(i,s+5,s+20)}const Ut={face:"#0d1a2b",bezel:"#20364e",tick:"#9fd6ff",text:"#8fe3ff",digital:"#b9f3c9",needle:"#ffffff",needleHub:"#c9d6e4",red:"#ff5f4d",amber:"#ffc873",green:"#7ee787",sky:"#3f7fd0",ground:"#7a5230",sym:"#ff9d2e"};class $c{canvas;ctx;d=null;w=0;h=0;loadFrac;massKg;stat=null;statSig="";lastPaint=0;static PAINT_MIN_MS=32;constructor(t,e){this.canvas=t,this.ctx=t.getContext("2d"),this.loadFrac=e?.loadFrac??.72,this.massKg=e?.massKg??62e3,this.resize()}setAircraft(t,e){this.loadFrac=t,this.massKg=e,this.d&&this.draw()}resize(){const t=this.canvas.getBoundingClientRect();if(t.width<10||t.height<10)return;const e=Math.min(window.devicePixelRatio||1,2);this.w=t.width,this.h=t.height,this.canvas.width=Math.round(this.w*e),this.canvas.height=Math.round(this.h*e),this.ctx.setTransform(e,0,0,e,0,0),this.d&&this.draw()}update(t){this.d=t,performance.now()-this.lastPaint>=$c.PAINT_MIN_MS&&this.draw()}layout(){const e=(this.w-12)/6,n=this.h/2,i=Math.max(6,Math.min(e*.44,this.h*.42));return{pad:6,cellW:e,cy:n,r:i}}staticKey(t){return`${Math.round(this.w)}x${Math.round(this.h)}|${Math.round(t.flapsDeg)}`}buildStatic(t){const e=Math.min(window.devicePixelRatio||1,2);let n=this.stat;n||(n=this.stat=document.createElement("canvas"));const i=Math.max(1,Math.round(this.w*e)),r=Math.max(1,Math.round(this.h*e));(n.width!==i||n.height!==r)&&(n.width=i,n.height=r);const o=n.getContext("2d");o.setTransform(e,0,0,e,0,0),o.clearRect(0,0,this.w,this.h),o.fillStyle="rgba(8, 16, 28, 0.62)",this.roundRect(o,0,0,this.w,this.h,10),o.fill();const{pad:a,cellW:l,cy:c,r:h}=this.layout(),u=190,d=l*.5+a;this.gaugeFace(o,d,c,h);const f=pc(t.flapsDeg);this.drawArcBand(o,d,c,h*.9,0,f.recMs,Ut.green,0,u),f.recMs<f.limitMs-.5&&this.drawArcBand(o,d,c,h*.9,f.recMs,f.limitMs,Ut.amber,0,u),this.drawArcBand(o,d,c,h*.9,f.limitMs,u,Ut.red,0,u),this.sweepTicks(o,d,c,h,0,180,30,10,p=>String(p));const g=(this.valToAngle(Or.vmoKias*Ye,0,u)-90)*Math.PI/180;o.beginPath(),o.moveTo(d+Math.cos(g)*h*.78,c+Math.sin(g)*h*.78),o.lineTo(d+Math.cos(g)*h*.96,c+Math.sin(g)*h*.96),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=Math.max(1.5,h*.035),o.stroke(),o.textAlign="center",o.textBaseline="middle",o.fillStyle=Ut.text,o.font=`600 ${Math.round(h*.17)}px -apple-system, sans-serif`,o.fillText("IAS m/s",d,c+h*.78),o.fillStyle=f.limitKias<=175?Ut.amber:Ut.text,o.font=`600 ${Math.round(h*.15)}px -apple-system, sans-serif`,o.fillText(`VFE ${Math.round(f.limitKias)}kt`,d,c+h*.95),this.gaugeFace(o,l*1.5+a,c,h*1.12);const v=l*2.5+a;this.gaugeFace(o,v,c,h),this.sweepTicks(o,v,c,h,0,2e3,500,100,p=>p===2e3?"2k":String(p/100)+"h");const m=l*3.5+a;this.gaugeFace(o,m,c,h),this.sweepTicks(o,m,c,h,-20,20,5,1,p=>String(p)),o.fillStyle=Ut.text,o.font=`600 ${Math.round(h*.17)}px -apple-system, sans-serif`,o.fillText("V/S m/s",m,c+h*.78),this.gaugeFace(o,l*4.5+a,c,h),this.statSig=this.staticKey(t)}draw(){const t=this.d,e=this.ctx;if(this.w<50||this.h<30||(this.lastPaint=performance.now(),e.clearRect(0,0,this.w,this.h),!t))return;const n=this.staticKey(t);(!this.stat||this.statSig!==n)&&this.buildStatic(t),e.imageSmoothingEnabled=!1,this.stat&&e.drawImage(this.stat,0,0,this.w,this.h);const{pad:i,cellW:r,cy:o,r:a}=this.layout();this.drawSpeed(r*.5+i,o,a,t),this.drawAttitude(r*1.5+i,o,a*1.12,t),this.drawAlt(r*2.5+i,o,a,t),this.drawVsi(r*3.5+i,o,a,t),this.drawHsi(r*4.5+i,o,a,t),this.drawSys(r*5+i+2,i,r-4,this.h-i*2,t),this.drawWarnings(t)}roundRect(t,e,n,i,r,o){t.beginPath(),t.moveTo(e+o,n),t.arcTo(e+i,n,e+i,n+r,o),t.arcTo(e+i,n+r,e,n+r,o),t.arcTo(e,n+r,e,n,o),t.arcTo(e,n,e+i,n,o),t.closePath()}gaugeFace(t,e,n,i){t.beginPath(),t.arc(e,n,i+3,0,Math.PI*2),t.fillStyle=Ut.bezel,t.fill(),t.beginPath(),t.arc(e,n,i,0,Math.PI*2),t.fillStyle=Ut.face,t.fill(),t.strokeStyle="rgba(120, 175, 225, 0.35)",t.lineWidth=1,t.stroke()}sweepTicks(t,e,n,i,r,o,a,l,c){const h=-225*Math.PI/180,u=45*Math.PI/180,d=f=>h+(f-r)/(o-r)*(u-h);for(let f=r;f<=o+1e-6;f+=l){const g=d(f),v=Math.abs(f%a)<1e-6||Math.abs(f%a-a)<1e-6,m=i*.82,p=v?i*.66:i*.74;t.beginPath(),t.moveTo(e+Math.cos(g)*m,n+Math.sin(g)*m),t.lineTo(e+Math.cos(g)*p,n+Math.sin(g)*p),t.strokeStyle=v?Ut.tick:"rgba(140, 190, 235, 0.55)",t.lineWidth=v?2:1,t.stroke(),c&&v&&(t.fillStyle=Ut.tick,t.font=`600 ${Math.round(i*.2)}px -apple-system, sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(c(f),e+Math.cos(g)*i*.52,n+Math.sin(g)*i*.52))}}needle(t,e,n,i,r=.78,o=Ut.needle){const a=this.ctx,l=(i-90)*Math.PI/180;a.beginPath(),a.moveTo(t,e),a.lineTo(t+Math.cos(l)*n*r,e+Math.sin(l)*n*r),a.strokeStyle=o,a.lineWidth=Math.max(2,n*.06),a.lineCap="round",a.stroke(),a.beginPath(),a.arc(t,e,n*.09,0,Math.PI*2),a.fillStyle=Ut.needleHub,a.fill()}valToAngle(t,e,n){return-225+(Math.max(e,Math.min(n,t))-e)/(n-e)*270}drawSpeed(t,e,n,i){const r=this.ctx,o=190,a=Ff(this.loadFrac);if(i.agl<120&&i.vspeed>-2&&i.ias>5&&this.speedBug(t,e,n,a.v2*Ye,0,o,"#e46bff","V2"),i.gearDown&&i.flapsDeg>=25){const l=Math.min(this.massKg/.45359237,Or.mlwLbs),c=i.flapsDeg>=40?rd(l,40):rd(l,30),h=i.windSpeed/Ye*Math.cos((i.heading-i.windDirDeg)*Math.PI/180),u=l1(c,h,h);this.speedBug(t,e,n,u*Ye,0,o,"#5fd7ff","VAPP")}this.needle(t,e,n,this.valToAngle(i.ias,0,o),.8),r.fillStyle=Ut.digital,r.font=`700 ${Math.round(n*.32)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(i.ias.toFixed(0),t,e+n*.52)}speedBug(t,e,n,i,r,o,a,l){const c=this.ctx,h=(this.valToAngle(i,r,o)-90)*Math.PI/180,u=n*1.02,d=t+Math.cos(h)*u,f=e+Math.sin(h)*u;c.save(),c.translate(d,f),c.rotate(h+Math.PI/2),c.fillStyle=a,c.beginPath(),c.moveTo(0,-n*.1),c.lineTo(-n*.07,0),c.lineTo(n*.07,0),c.closePath(),c.fill(),c.restore(),c.fillStyle=a,c.font=`700 ${Math.max(8,Math.round(n*.16))}px -apple-system, sans-serif`,c.textAlign="center",c.textBaseline="middle",c.fillText(l,t+Math.cos(h)*n*.72,e+Math.sin(h)*n*.72)}drawArcBand(t,e,n,i,r,o,a,l=0,c=180){const h=(this.valToAngle(r,l,c)-90)*Math.PI/180,u=(this.valToAngle(o,l,c)-90)*Math.PI/180;t.beginPath(),t.arc(e,n,i,h,u),t.strokeStyle=a,t.lineWidth=Math.max(2,i*.08),t.stroke()}drawAttitude(t,e,n,i){const r=this.ctx;r.save(),r.beginPath(),r.arc(t,e,n*.92,0,Math.PI*2),r.clip();const o=i.pitch/90*n*1.6,a=-i.bank*Math.PI/180;r.translate(t,e+o),r.rotate(a),r.fillStyle=Ut.sky,r.fillRect(-n*3,-n*3,n*6,n*3),r.fillStyle=Ut.ground,r.fillRect(-n*3,0,n*6,n*3),r.beginPath(),r.moveTo(-n*3,0),r.lineTo(n*3,0),r.strokeStyle="#e8f4ff",r.lineWidth=2,r.stroke(),r.strokeStyle="rgba(240, 248, 255, 0.85)",r.fillStyle="rgba(240, 248, 255, 0.95)",r.lineWidth=1.5,r.font=`600 ${Math.round(n*.16)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle";for(let c=-20;c<=20;c+=5){if(c===0)continue;const h=-(c/90)*n*1.6,u=c%10===0?n*.34:n*.18;r.beginPath(),r.moveTo(-u,h),r.lineTo(u,h),r.stroke(),c%10===0&&(r.fillText(String(Math.abs(c)),-u-n*.14,h),r.fillText(String(Math.abs(c)),u+n*.14,h))}r.restore(),r.strokeStyle=Ut.tick,r.lineWidth=2;for(const c of[-60,-45,-30,-20,-10,0,10,20,30,45,60]){const h=(c-90)*Math.PI/180,u=n*.92,d=n*(c%30===0?.72:.8);r.beginPath(),r.moveTo(t+Math.cos(h)*u,e+Math.sin(h)*u),r.lineTo(t+Math.cos(h)*d,e+Math.sin(h)*d),r.stroke()}const l=(i.bank-90)*Math.PI/180;r.beginPath(),r.moveTo(t+Math.cos(l)*n*.66,e+Math.sin(l)*n*.66),r.lineTo(t+Math.cos(l+.12)*n*.56,e+Math.sin(l+.12)*n*.56),r.lineTo(t+Math.cos(l-.12)*n*.56,e+Math.sin(l-.12)*n*.56),r.closePath(),r.fillStyle=Ut.amber,r.fill(),r.strokeStyle=Ut.sym,r.lineWidth=Math.max(2.5,n*.08),r.lineCap="round",r.beginPath(),r.moveTo(t-n*.5,e),r.lineTo(t-n*.18,e),r.moveTo(t+n*.18,e),r.lineTo(t+n*.5,e),r.stroke(),r.beginPath(),r.arc(t,e,n*.07,0,Math.PI*2),r.fillStyle=Ut.sym,r.fill(),r.fillStyle=Ut.digital,r.font=`700 ${Math.round(n*.2)}px -apple-system, sans-serif`,r.textAlign="center",r.fillText(`P${i.pitch.toFixed(0)} B${i.bank.toFixed(0)}`,t,e+n*.72)}drawAlt(t,e,n,i){const r=this.ctx;this.needle(t,e,n,this.valToAngle(i.alt%2e3,0,2e3),.8),r.fillStyle=Ut.digital,r.font=`700 ${Math.round(n*.3)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(String(Math.round(i.alt)),t,e+n*.5),r.fillStyle=Ut.text,r.font=`600 ${Math.round(n*.17)}px -apple-system, sans-serif`,r.fillText(`ALT m · AGL ${Math.round(i.agl)}`,t,e+n*.76)}drawVsi(t,e,n,i){const r=this.ctx;this.needle(t,e,n,this.valToAngle(i.vspeed,-20,20),.8),r.fillStyle=Ut.digital,r.font=`700 ${Math.round(n*.28)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText((i.vspeed>=0?"+":"")+i.vspeed.toFixed(1),t,e+n*.52)}drawHsi(t,e,n,i){const r=this.ctx;r.save(),r.beginPath(),r.arc(t,e,n*.92,0,Math.PI*2),r.clip();const o=-i.heading*Math.PI/180;r.translate(t,e),r.rotate(o),r.font=`700 ${Math.round(n*.2)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle";for(let a=0;a<360;a+=30){const l=(a-90)*Math.PI/180,c=n*.86,h=n*(a%90===0?.68:.76);r.beginPath(),r.moveTo(Math.cos(l)*c,Math.sin(l)*c),r.lineTo(Math.cos(l)*h,Math.sin(l)*h),r.strokeStyle=a%90===0?Ut.tick:"rgba(140,190,235,0.6)",r.lineWidth=a%90===0?2:1,r.stroke();const u=a===0?"N":a===90?"E":a===180?"S":a===270?"W":String(a/10);r.fillStyle=a%90===0?"#e8f4ff":Ut.tick,r.fillText(u,Math.cos(l)*n*.52,Math.sin(l)*n*.52)}if(i.rwyHeading!==null){const a=(i.rwyHeading-90)*Math.PI/180;r.strokeStyle=Ut.green,r.lineWidth=3,r.beginPath(),r.moveTo(Math.cos(a)*n*.95,Math.sin(a)*n*.95),r.lineTo(Math.cos(a)*n*.62,Math.sin(a)*n*.62),r.stroke()}r.restore(),r.strokeStyle=Ut.sym,r.lineWidth=2.5,r.beginPath(),r.moveTo(t,e-n*.95),r.lineTo(t,e-n*.62),r.stroke(),r.beginPath(),r.moveTo(t-n*.12,e-n*.78),r.lineTo(t+n*.12,e-n*.78),r.stroke(),r.fillStyle=Ut.digital,r.font=`700 ${Math.round(n*.3)}px -apple-system, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(String(Math.round(i.heading)%360).padStart(3,"0")+"°",t,e+n*.45),r.fillStyle=Ut.text,r.font=`600 ${Math.round(n*.17)}px -apple-system, sans-serif`,r.fillText("HDG",t,e+n*.72)}drawSys(t,e,n,i,r){const o=this.ctx,a=i/9,l=Math.max(8,Math.round(a*.52));o.textAlign="left",o.textBaseline="middle";const c=(f,g,v,m=Ut.digital)=>{const p=e+a*(f+.5);o.fillStyle=Ut.text,o.font=`600 ${l*.85}px -apple-system, sans-serif`,o.fillText(g,t+2,p),o.fillStyle=m,o.font=`700 ${l}px -apple-system, sans-serif`,o.fillText(v,t+n*.36,p)},h=e+a*.5;o.fillStyle=Ut.text,o.font=`600 ${l*.85}px -apple-system, sans-serif`,o.fillText("THR",t+2,h),o.fillStyle="rgba(120,175,225,0.25)",o.fillRect(t+n*.3,h-l*.5,n*.42,l),o.fillStyle=r.throttle>.95?Ut.amber:Ut.green,o.fillRect(t+n*.3,h-l*.5,n*.42*Math.min(1,r.throttle),l),o.fillStyle=Ut.digital,o.font=`700 ${l}px -apple-system, sans-serif`,o.fillText(`${Math.round(r.throttle*100)}%`,t+n*.75,h);const u=e+a*1.5;o.fillStyle=Ut.text,o.font=`600 ${l*.85}px -apple-system, sans-serif`,o.fillText("FUEL",t+2,u),o.fillStyle="rgba(120,175,225,0.25)",o.fillRect(t+n*.3,u-l*.5,n*.42,l),o.fillStyle=r.fuelFrac<.15?Ut.red:Ut.green,o.fillRect(t+n*.3,u-l*.5,n*.42*r.fuelFrac,l),o.fillStyle=Ut.digital,o.fillText(`${Math.round(r.fuelFrac*100)}%`,t+n*.75,u),c(2,"FLAP",`${r.flapsDeg}°`),c(3,"GEAR",r.gearDown?"DOWN":"UP",r.gearDown?Ut.green:Ut.digital),c(4,"SPD BRK",r.spoilers>0?"ON":"OFF",r.spoilers>0?Ut.amber:Ut.digital);const d=r.agl<3&&r.groundSpeed>.5;if(c(5,"GS",`${r.groundSpeed.toFixed(0)} m/s`,d?r.groundSpeed>10.29?Ut.amber:Ut.green:Ut.digital),c(6,"WIND",`${Math.round(r.windDirDeg).toString().padStart(3,"0")}°/${r.windSpeed.toFixed(0)} m/s`),r.rwyName!==null&&r.rwyDist!==null){const f=r.rwyRemaining!==null&&r.rwyRemaining>=0?`${r.rwyName} 残${Math.round(r.rwyRemaining)}m`:`${r.rwyName} ${r.rwyDist>=1e3?(r.rwyDist/1e3).toFixed(1)+"km":Math.round(r.rwyDist)+"m"}`;c(7,"RWY",f,Ut.amber)}else c(7,"RWY","—");c(8,"FPS",`${Math.round(r.fps)} / ${r.phase}`,r.crashed?Ut.red:Ut.text)}drawWarnings(t){const e=this.ctx,n=Math.floor(performance.now()/500)%2===0,i=[],r=Of(t.flapsDeg),o=pc(t.flapsDeg);if(t.crashed&&i.push({text:"CRASHED — 再スタート",color:Ut.red}),t.ias>r&&i.push({text:"OVERSPEED",color:Ut.red}),t.agl>15&&t.agl<300&&!t.gearDown&&t.vspeed<-1&&i.push({text:"GEAR",color:Ut.amber}),t.aoa>15&&t.agl>10&&i.push({text:"STALL",color:Ut.red}),t.fuelFrac<=0&&i.push({text:"FUEL EMPTY",color:Ut.red}),t.flapsDeg>.5&&t.ias>o.recMs&&i.push({text:"FLAP SPD",color:Ut.amber}),i.length===0)return;const a=i.filter((h,u)=>n||u===0||t.crashed);let l=this.w*.28;const c=2;e.font=`800 ${Math.round(this.h*.13)}px -apple-system, sans-serif`,e.textAlign="left",e.textBaseline="top";for(const h of a){const u=e.measureText(h.text).width+14;e.fillStyle=h.color,this.roundRect(e,l,c,u,this.h*.16,6),e.fill(),e.fillStyle="#0b1220",e.fillText(h.text,l+7,c+this.h*.02),l+=u+6}}}function od(s){try{const t=window.speechSynthesis;if(!t)return;const e=new SpeechSynthesisUtterance(s);e.lang="en-US",e.rate=1.05,t.speak(e)}catch{}}class c1{constructor(t){this.loadFrac=t}call80=!1;callV1=!1;callRotate=!1;callPosRate=!1;ldg1000=!1;ldg500=!1;ldg50=!1;ldg30=!1;call60=!1;wasAirborne=!1;flapCautionAt=0;setLoadFrac(t){this.loadFrac=t,this.reset()}reset(){this.call80=!1,this.callV1=!1,this.callRotate=!1,this.callPosRate=!1,this.ldg1000=!1,this.ldg500=!1,this.ldg50=!1,this.ldg30=!1,this.call60=!1,this.wasAirborne=!1,this.flapCautionAt=0}speeds(){const t=Ff(this.loadFrac);return{v1:t.v1*Ye,vr:t.vr*Ye,v2:t.v2*Ye}}update(t){const e=[],{v1:n,vr:i}=this.speeds();return t.onGround&&(!this.call80&&t.ias>=80*Ye&&(this.call80=!0,e.push({text:"80 KNOTS",speech:"Eighty knots",kind:"info"})),!this.callV1&&t.ias>=n&&(this.callV1=!0,e.push({text:"V1",speech:"V one",kind:"info"})),!this.callRotate&&t.ias>=i&&(this.callRotate=!0,e.push({text:"ROTATE — 15° へ 2°/s",speech:"Rotate",kind:"info"}))),!t.onGround&&!this.callPosRate&&t.vspeed>1.2&&this.wasAirborne===!1&&(this.callPosRate=!0,e.push({text:"POSITIVE RATE — GEAR UP",speech:"Positive rate. Gear up.",kind:"info"})),!t.onGround&&t.vspeed<-.5&&(t.agl>400&&(this.ldg1000=this.ldg500=this.ldg50=this.ldg30=!1),!this.ldg1000&&t.agl<=305&&(this.ldg1000=!0,e.push({text:"1000ft — STABILIZED",speech:"One thousand",kind:"info"})),!this.ldg500&&t.agl<=152&&(this.ldg500=!0,e.push({text:"500ft",speech:"Five hundred",kind:"info"})),!this.ldg50&&t.agl<=ur.flareFt*.3048&&(this.ldg50=!0,e.push({text:`50 FT — フレア ${ur.landingPitchMin}-${ur.landingPitchMax}°`,speech:"Fifty",kind:"info"})),!this.ldg30&&t.agl<=ur.idleFt*.3048&&(this.ldg30=!0,e.push({text:"30 FT — スロットル IDLE",speech:"Thirty",kind:"info"}))),t.onGround&&this.wasAirborne&&(!this.call60&&t.ias<=ur.reverseOffKts*Ye&&(this.call60=!0,e.push({text:"60 KNOTS — リバース解除",speech:"Sixty knots",kind:"info"})),t.ias<5&&(this.call80=this.callV1=this.callRotate=this.callPosRate=!1,this.call60=!1)),t.onGround&&t.ias<5&&!this.wasAirborne&&(this.call80=this.callV1=this.callRotate=this.callPosRate=!1),this.wasAirborne=!t.onGround,e}flapCaution(t,e){if(t.flapsDeg<=.5)return null;const n=[1,2,5,10,15,25,30,40],i=[230,220,200,190,180,170,150,140];let r=i[0];for(let o=0;o<n.length;o++)n[o]<=t.flapsDeg+.01&&(r=i[o]);return t.ias<=r*Ye||e-this.flapCautionAt<5e3?null:(this.flapCautionAt=e,{text:`FLAP SPEED — ${r}kt 以下で展開（マニュアル 1.2）`,speech:null,kind:"warn"})}}class h1{el;timer=0;constructor(){this.el=document.getElementById("sop-banner")}show(t,e=3500){this.el&&(this.el.textContent=t.text,this.el.classList.toggle("warn",t.kind==="warn"),this.el.classList.add("show"),window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this.el?.classList.remove("show")},e))}}class u1{ctx=null;master=null;engineOsc=[];engineGain=null;engineFilter=null;windGain=null;windFilter=null;warnOsc=null;warnGain=null;noiseBuffer=null;muted=!1;ready=!1;ensure(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext??window.webkitAudioContext;if(!t)return;const e=new t;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.muted?0:.85,this.master.connect(e.destination);const n=e.sampleRate*2,i=e.createBuffer(1,n,e.sampleRate),r=i.getChannelData(0);for(let o=0;o<n;o++)r[o]=Math.random()*2-1;this.noiseBuffer=i,this.buildEngine(),this.buildWind(),this.buildWarn(),this.ready=!0,e.state==="suspended"&&e.resume()}setMuted(t){this.muted=t,this.master&&this.ctx&&this.master.gain.setTargetAtTime(t?0:.85,this.ctx.currentTime,.02)}buildEngine(){const t=this.ctx,e=t.createGain();e.gain.value=0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=300,n.connect(e),e.connect(this.master);const i=[48,96,71],r=["sawtooth","sawtooth","square"];for(let c=0;c<i.length;c++){const h=t.createOscillator();h.type=r[c],h.frequency.value=i[c];const u=t.createGain();u.gain.value=c===2?.12:.4,h.connect(u),u.connect(n),h.start(),this.engineOsc.push(h)}const o=t.createBufferSource();o.buffer=this.noiseBuffer,o.loop=!0;const a=t.createBiquadFilter();a.type="lowpass",a.frequency.value=220;const l=t.createGain();l.gain.value=.35,o.connect(a),a.connect(l),l.connect(n),o.start(),this.engineGain=e,this.engineFilter=n}buildWind(){const t=this.ctx,e=t.createBufferSource();e.buffer=this.noiseBuffer,e.loop=!0;const n=t.createBiquadFilter();n.type="bandpass",n.frequency.value=700,n.Q.value=.7;const i=t.createGain();i.gain.value=0,e.connect(n),n.connect(i),i.connect(this.master),e.start(),this.windGain=i,this.windFilter=n}buildWarn(){const t=this.ctx,e=t.createOscillator();e.type="square",e.frequency.value=750;const n=t.createGain();n.gain.value=0,e.connect(n),n.connect(this.master),e.start(),this.warnOsc=e,this.warnGain=n}lastEngineSet=-1;lastEngineThr=-9;lastEngineIas=-9;lastWindSet=-1;lastWindIas=-9;lastWarnKind="";setEngine(t,e){if(!this.ctx||!this.engineGain||!this.engineFilter)return;const n=performance.now();if(Math.abs(t-this.lastEngineThr)<.004&&Math.abs(e-this.lastEngineIas)<.5||!(Math.abs(t-this.lastEngineThr)>.05||Math.abs(e-this.lastEngineIas)>12)&&n-this.lastEngineSet<60)return;this.lastEngineSet=n,this.lastEngineThr=t,this.lastEngineIas=e;const r=this.ctx.currentTime,o=.25+.75*t+Math.min(e/400,.15);this.engineGain.gain.setTargetAtTime(.1+.3*t,r,.15),this.engineFilter.frequency.setTargetAtTime(240+900*o,r,.2),this.engineOsc[0]?.frequency.setTargetAtTime(48*(.7+.9*o),r,.2),this.engineOsc[1]?.frequency.setTargetAtTime(96*(.7+.9*o),r,.2),this.engineOsc[2]?.frequency.setTargetAtTime(71*(.75+.85*o),r,.2)}setWind(t){if(!this.ctx||!this.windGain||!this.windFilter)return;const e=performance.now();if(Math.abs(t-this.lastWindIas)<.4||!(Math.abs(t-this.lastWindIas)>12)&&e-this.lastWindSet<60)return;this.lastWindSet=e,this.lastWindIas=t;const i=this.ctx.currentTime;this.windGain.gain.setTargetAtTime(Math.min(.32,t/250*.38),i,.25),this.windFilter.frequency.setTargetAtTime(500+t*4,i,.25)}setWarning(t){if(!this.ctx||!this.warnOsc||!this.warnGain||t===this.lastWarnKind)return;this.lastWarnKind=t;const e=this.ctx.currentTime;if(t==="none"){this.warnGain.gain.setTargetAtTime(0,e,.05);return}t==="stall"?(this.warnOsc.frequency.setTargetAtTime(750,e,.02),this.warnGain.gain.setTargetAtTime(.16,e,.02)):t==="overspeed"?(this.warnOsc.frequency.setTargetAtTime(1100,e,.02),this.warnGain.gain.setTargetAtTime(.12,e,.02)):(this.warnOsc.frequency.setTargetAtTime(420,e,.02),this.warnGain.gain.setTargetAtTime(.14,e,.02))}burst(t,e,n,i="bandpass"){if(!this.ctx||!this.noiseBuffer||!this.master)return;const r=this.ctx,o=r.createBufferSource();o.buffer=this.noiseBuffer;const a=r.createBiquadFilter();a.type=i,a.frequency.value=t,a.Q.value=1.2;const l=r.createGain(),c=r.currentTime;l.gain.setValueAtTime(n,c),l.gain.exponentialRampToValueAtTime(.001,c+e),o.connect(a),a.connect(l),l.connect(this.master),o.start(c),o.stop(c+e+.05)}tone(t,e,n,i="sine"){if(!this.ctx||!this.master)return;const r=this.ctx,o=r.createOscillator();o.type=i,o.frequency.value=t;const a=r.createGain(),l=r.currentTime;a.gain.setValueAtTime(n,l),a.gain.exponentialRampToValueAtTime(.001,l+e),o.connect(a),a.connect(this.master),o.start(l),o.stop(l+e+.05)}click(){this.burst(1600,.05,.18)}flap(){this.burst(500,.28,.22,"lowpass")}gear(){this.burst(300,.55,.26,"lowpass"),this.tone(180,.5,.05,"triangle")}touchdown(){this.burst(220,.35,.4,"lowpass"),this.tone(140,.25,.12,"triangle"),this.burst(1800,.18,.2)}boom(){if(!this.ctx||!this.master||!this.noiseBuffer)return;const t=this.ctx,e=t.currentTime+.01,n=t.createBufferSource();n.buffer=this.noiseBuffer;const i=t.createBiquadFilter();i.type="lowpass",i.Q.value=.9,i.frequency.setValueAtTime(1400,e),i.frequency.exponentialRampToValueAtTime(55,e+.9);const r=t.createGain();r.gain.setValueAtTime(.95,e),r.gain.exponentialRampToValueAtTime(.001,e+1.5),n.connect(i),i.connect(r),r.connect(this.master),n.start(e),n.stop(e+1.6),this.tone(46,.9,.5,"triangle"),this.tone(72,.55,.3,"sawtooth");for(let o=0;o<5;o++)window.setTimeout(()=>this.burst(1400+Math.random()*1600,.1,.12),260+o*90)}confirm(){this.tone(660,.12,.12),this.tone(880,.18,.1)}suspendAll(){this.setEngine(0,0),this.setWind(0),this.setWarning("none"),this.engineGain&&this.ctx&&this.engineGain.gain.setTargetAtTime(0,this.ctx.currentTime,.08),this.windGain&&this.ctx&&this.windGain.gain.setTargetAtTime(0,this.ctx.currentTime,.08)}}function d1(){const s=document.createElement("canvas");s.width=s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,2,32,32,31);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.55,"rgba(255,255,255,0.55)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new yi(s);return n.needsUpdate=!0,n}const f1=`
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
}`,p1=`
uniform sampler2D uTex;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec4 t = texture2D(uTex, gl_PointCoord);
  gl_FragColor = vec4(vColor, t.a * vAlpha);
  if (gl_FragColor.a < 0.004) discard;
}`;class ad{cap;list=[];geo;pts;posA;sizeA;alphaA;colorA;constructor(t,e,n,i){this.cap=e,this.posA=new Float32Array(e*3),this.sizeA=new Float32Array(e),this.alphaA=new Float32Array(e),this.colorA=new Float32Array(e*3),this.geo=new ye,this.geo.setAttribute("position",new ve(this.posA,3)),this.geo.setAttribute("aSize",new ve(this.sizeA,1)),this.geo.setAttribute("aAlpha",new ve(this.alphaA,1)),this.geo.setAttribute("aColor",new ve(this.colorA,3)),this.geo.setDrawRange(0,0);const r=new Ue({uniforms:{uTex:{value:n}},vertexShader:f1,fragmentShader:p1,transparent:!0,depthWrite:!1,blending:i});this.pts=new ra(this.geo,r),this.pts.frustumCulled=!1,this.pts.renderOrder=6,t.add(this.pts)}add(t){this.list.length>=this.cap&&this.list.shift(),this.list.push(t)}update(t,e){let n=0;for(let i=0;i<this.list.length;i++){const r=this.list[i];if(r.life-=t,r.life<=0)continue;r.vy+=(r.buoy-r.grav)*t,r.x+=r.vx*t,r.y+=r.vy*t,r.z+=r.vz*t;const o=r.life/r.maxLife;this.posA[n*3]=r.x,this.posA[n*3+1]=r.y,this.posA[n*3+2]=r.z,this.sizeA[n]=r.size0+(r.size1-r.size0)*(1-o)+r.grow*(1-o);let a=Math.min(1,o*2.6)*Math.min(1,(1-o)*9+.15);e&&(a*=e(r),a<.004)||(this.alphaA[n]=a,this.colorA[n*3]=r.r,this.colorA[n*3+1]=r.g,this.colorA[n*3+2]=r.b,this.list[n]=r,n++)}this.list.length=n,this.geo.setDrawRange(0,n),this.geo.getAttribute("position").needsUpdate=!0,this.geo.getAttribute("aSize").needsUpdate=!0,this.geo.getAttribute("aAlpha").needsUpdate=!0,this.geo.getAttribute("aColor").needsUpdate=!0}get live(){return this.list.length}dispose(t){t.remove(this.pts),this.geo.dispose(),this.pts.material.dispose()}}class m1{fire;smoke;flash;embers=[];scene;time=0;camera=null;constructor(t){this.scene=t;const e=d1();this.fire=new ad(t,320,e,Ar),this.smoke=new ad(t,240,e,Bi),this.flash=new gf(16757066,0,1600,1.6),this.flash.visible=!1,t.add(this.flash)}boom(t,e,n,i=1){const r=Math.random,o=Math.round(52*i),a=Math.round(24*i),l=Math.round(26*i);for(let c=0;c<o;c++){const h=r()*Math.PI*2,u=(r()*.9+.15)*Math.PI*.5,d=(7+r()*19)*i,f=r()<.55;this.fire.add({x:t,y:e+2,z:n,vx:Math.cos(h)*Math.cos(u)*d,vy:Math.sin(u)*d*.85,vz:Math.sin(h)*Math.cos(u)*d,life:.32+r()*.55,maxLife:.8,size0:26+r()*46,size1:6,grow:10*i,buoy:2.2,grav:0,r:1,g:f?.52+r()*.3:.18+r()*.12,b:f?.08:.02})}for(let c=0;c<a;c++){const h=r()*Math.PI*2,u=(2.5+r()*7)*i,d=.16+r()*.2;this.smoke.add({x:t+Math.cos(h)*4,y:e+5+r()*8,z:n+Math.sin(h)*4,vx:Math.cos(h)*u,vy:2.5+r()*4.5,vz:Math.sin(h)*u,life:2.2+r()*2.6,maxLife:4.8,size0:26+r()*44,size1:66+r()*60,grow:0,buoy:1.1,grav:0,r:d*.9,g:d,b:d*.95})}for(let c=0;c<l;c++){const h=r()*Math.PI*2,u=(24+r()*52)*i;this.fire.add({x:t,y:e+2,z:n,vx:Math.cos(h)*u,vy:10+r()*26,vz:Math.sin(h)*u,life:.5+r()*.75,maxLife:1.2,size0:5+r()*7,size1:2,grow:0,buoy:0,grav:34,r:1,g:.85+r()*.15,b:.45+r()*.4})}this.embers.push({x:t,y:e,z:n,t:this.time+.45,power:i}),this.flash.position.set(t,e+14,n),this.flash.intensity=1500*i,this.flash.visible=!0}get live(){return this.fire.live+this.smoke.live+this.embers.length}update(t){this.time+=t;for(let n=this.embers.length-1;n>=0;n--){const i=this.embers[n];if(this.time>=i.t){const r=Math.random;for(let o=0;o<5;o++){const a=r()*Math.PI*2,l=.14+r()*.16;this.smoke.add({x:i.x+Math.cos(a)*6,y:i.y+2+r()*5,z:i.z+Math.sin(a)*6,vx:Math.cos(a)*1.6,vy:5+r()*4,vz:Math.sin(a)*1.6,life:2.8+r()*2.6,maxLife:5,size0:30+r()*40,size1:120+r()*80,grow:0,buoy:1.2,grav:0,r:l*.85,g:l*.92,b:l})}i.t=this.time+.5,i.power*=.72,i.power<.28&&this.embers.splice(n,1)}}this.flash.intensity*=Math.exp(-9*t),this.flash.intensity<2&&(this.flash.visible=!1),this.fire.update(t);const e=this.camera;if(e){const n=e.position;this.smoke.update(t,i=>{const r=Math.hypot(i.x-n.x,i.y-n.y,i.z-n.z);return r<60?0:r<220?(r-60)/160:1})}else this.smoke.update(t)}clear(){this.embers.length=0}dispose(){this.fire.dispose(this.scene),this.smoke.dispose(this.scene),this.scene.remove(this.flash)}}class g1{els={pause:document.getElementById("pause-overlay"),portrait:document.getElementById("portrait-overlay"),webgl:document.getElementById("webgl-error"),webglDetail:document.getElementById("webgl-error-detail")};actions={};constructor(){const t=(e,n)=>{document.getElementById(e).addEventListener("pointerdown",i=>{i.preventDefault(),this.actions[n]?.()})};t("btn-resume","resume"),t("btn-restart","restart"),t("btn-to-menu","toMenu")}on(t,e){this.actions[t]=e}showPause(){this.els.pause.classList.remove("hidden")}hidePause(){this.els.pause.classList.add("hidden")}updateOrientation(){const t=window.innerHeight>window.innerWidth;return this.els.portrait.classList.toggle("hidden",!t),!t}showWebglError(t){this.els.webglDetail.innerHTML=t,this.els.webgl.classList.remove("hidden")}hideWebglError(){this.els.webgl.classList.add("hidden")}}const hl=[0,1,5,10,15,25,30,40];class v1{pitch=0;roll=0;yaw=0;throttle=.9;brakes=!1;spoilers=0;gearDown=!0;flapIndex=2;keys=new Set;keyHandler=t=>this.onKey(t,!0);keyUpHandler=t=>this.onKey(t,!1);blurHandler=()=>{this.keys.clear(),this.releaseStick()};attachKeyboard(){window.addEventListener("keydown",this.keyHandler),window.addEventListener("keyup",this.keyUpHandler),window.addEventListener("blur",this.blurHandler)}detach(){window.removeEventListener("keydown",this.keyHandler),window.removeEventListener("keyup",this.keyUpHandler),window.removeEventListener("blur",this.blurHandler),this.keys.clear()}onKey(t,e){const n=t.key.toLowerCase();e?(this.keys.add(n),t.repeat||(n==="g"&&(this.gearDown=!this.gearDown),n==="v"&&this.flapUp(),n==="f"&&this.flapDown(),n==="x"&&(this.spoilers=this.spoilers>0?0:1))):this.keys.delete(n)}flapUp(){this.flapIndex=Math.max(0,this.flapIndex-1)}flapDown(){this.flapIndex=Math.min(hl.length-1,this.flapIndex+1)}get flapsDeg(){return hl[this.flapIndex]}setFlapIndex(t){this.flapIndex=Math.max(0,Math.min(hl.length-1,t))}updateFromKeys(t){const e=this.keys.has("arrowup")||this.keys.has("w"),n=this.keys.has("arrowdown")||this.keys.has("s"),i=this.keys.has("arrowleft")||this.keys.has("a"),r=this.keys.has("arrowright")||this.keys.has("d"),o=this.keys.has("q"),a=this.keys.has("e"),l=this.keys.has("b")||this.keys.has(" "),c=this.keys.has("shift"),h=this.keys.has("control");(e||n||i||r)&&(this.pitch=(e?1:0)-(n?1:0),this.roll=(r?1:0)-(i?1:0)),this.yaw=(a?1:0)-(o?1:0),this.brakes=l,c&&(this.throttle=Math.min(1,this.throttle+t*.55)),h&&(this.throttle=Math.max(0,this.throttle-t*.55))}normalized(){return{pitch:ul(this.pitch),roll:ul(this.roll),yaw:ul(this.yaw),throttle:Math.max(0,Math.min(1,this.throttle)),brakes:this.brakes,flapsDeg:this.flapsDeg,spoilers:this.spoilers,gearDown:this.gearDown}}releaseStick(){this.pitch=0,this.roll=0}}function ul(s){return Math.max(-1,Math.min(1,s))}const jc=document.getElementById("game-canvas"),Je=new g1,Bf=_y(jc,2);if(!Bf)throw Je.showWebglError("WebGL コンテキストを取得できませんでした。<br>Safari の設定を確認するか、iOS を最新版に更新してください。"),new Error("WebGL not available");const wi=Bf;jc.addEventListener("webglcontextlost",s=>{s.preventDefault(),Je.showWebglError("WebGL コンテキストが失われました。ページを再読み込みしてください。")});jc.addEventListener("webglcontextrestored",()=>{wi.shadowMap.needsUpdate=!0,wi.setSize(window.innerWidth,window.innerHeight,!1),Je.hideWebglError()});const Zc=new Oc,gi=new qe(60,window.innerWidth/window.innerHeight,2.5,46e3);await xM();await jy();const _t=new i1(wi,Zc,gi);Nf();const ca=new m1(Zc);ca.camera=gi;const re=new v1;re.attachKeyboard();const mc=$n.find(s=>s.id==="b737")??$n[0],_1={ias:0,alt:0,agl:0,vspeed:0,heading:0,pitch:0,bank:0,aoa:0,gLoad:1,throttle:0,fuelFrac:1,groundSpeed:0,windSpeed:0,windDirDeg:0,flapsDeg:0,gearDown:!0,spoilers:0,phase:"PARKED",crashed:!1,rwyName:null,rwyDist:null,rwyRemaining:null,rwyHeading:null,fps:60,onGround:!0},Ys=new $c(document.getElementById("inst-panel"),{loadFrac:jo(mc.mass),massKg:mc.mass}),Os=new c1(jo(mc.mass)),gs=new h1,te=new u1;window.__airliner={game:_t,scene:Zc,camera:gi,controls:re,audio:te,callouts:Os,renderer:wi,terrainHeight:we,explosion:ca,buildingColliders:Ms,instruments:Ys};const Bs=document.getElementById("hud");Bs.style.display="none";let kf="high",dr=0,fr=0,Eo=0;const zf=document.getElementById("touch-ui"),dl=document.getElementById("flight-note");let fl=null;function x1(){dl&&(dl.classList.remove("fade"),fl!==null&&clearTimeout(fl),fl=window.setTimeout(()=>dl.classList.add("fade"),9e3))}const Fe=new s1(()=>{te.ensure(),te.confirm(),_t.setQuality(Fe.config.quality),kf=Fe.config.quality,ac(wi,_t.quality.preset.pixelRatio),_t.syncPostFx(),_t.applyEnvironment(Fe.config.time,Fe.config.weather,Fe.config.wind),Fe.hide(),Bs.style.display="block",document.body.classList.remove("ap-settings"),Vr.style.display="none",zf.style.display="block",Ys.resize(),Os.reset(),Kf()&&!ks()&&$f(),_t.startFlight(Fe.config.aircraftId,Fe.config.mode,Fe.config.airportId),Hf(_t.cameraName()),x1()});Fe.onAircraftChange=s=>{_t.selectAircraft(s),Ys.setAircraft(jo(s.mass),s.mass),Os.setLoadFrac(jo(s.mass))};function y1(){_t.state==="flying"?(_t.pause(),te.suspendAll(),Je.showPause()):_t.state==="paused"&&(_t.resume(),Je.hidePause())}function Me(s,t){const e=document.getElementById(s);e.addEventListener("pointerdown",n=>{n.preventDefault(),e.classList.add("active"),te.ensure(),te.click(),t()}),e.addEventListener("pointerup",()=>e.classList.remove("active")),e.addEventListener("pointercancel",()=>e.classList.remove("active"))}function Qc(s,t,e){const n=document.getElementById(s);n.addEventListener("pointerdown",r=>{r.preventDefault(),n.classList.add("active"),t()});const i=()=>{n.classList.remove("active"),e()};n.addEventListener("pointerup",i),n.addEventListener("pointercancel",i)}const M1=document.getElementById("cam-name");function Hf(s){M1.textContent=s}Me("btn-camera",()=>Hf(_t.cycleCamera(1)));Me("btn-pause",y1);const S1=document.getElementById("btn-ap-set"),Vr=document.getElementById("ap-panel"),ld=document.getElementById("ap-strip");let gc="",Ro="",cd="",hd="";const w1={"ap-on":{text:"オートパイロット 接続",speech:"autopilot engaged",kind:"info"},"ap-off":{text:"オートパイロット 切断",speech:"autopilot disconnect",kind:"info"},"ap-touchdown":{text:"接地 — AP 自動切断",speech:null,kind:"info"},"loc-alive":{text:"LOC 捕捉 — 滑走路延長線",speech:"localizer alive",kind:"info"},"loc-lost":{text:"LOC ロスト — 選定方位へ復帰",speech:"localizer lost",kind:"warn"},"gs-alive":{text:"GS 捕捉 — 3.00° 降下経路",speech:"glide slope alive",kind:"info"},"gs-off":{text:"GS 脱離 — ALT ホールド復帰",speech:null,kind:"info"},"appr-arm":{text:"APPR アライン — 捕捉待ち",speech:"approach armed",kind:"info"},missed:{text:"場周超過 — LOC/GS 解除",speech:"missed approach, heading mode",kind:"warn"},"min-alt":{text:"最低高度割込 — 目標高度引き上げ",speech:"minimums, altitude hold",kind:"warn"},retard:{text:"RETARD — スラストアイドル",speech:"retard",kind:"info"},"ap-trip":{text:"AP 保護遮断",speech:"autopilot disconnect",kind:"warn"}},b1=document.getElementById("ap-strip-txt"),Vf=document.getElementById("ap-ch-hdg"),Gf=document.getElementById("ap-ch-nav"),Wf=document.getElementById("ap-ch-vs"),Xf=document.getElementById("ap-ch-alt");let pl=!1,ud=!1,vr=0;function T1(s){const t=_t.getTelemetry();t&&(ca.boom(t.position.x,Math.max(t.alt-Math.max(t.agl,0)+2,t.alt),t.position.z,s),te.boom(),vr=Math.min(1.4,.7+s*.55))}function ha(s,t){s.addEventListener("pointerdown",e=>{e.preventDefault(),s.classList.add("on"),setTimeout(()=>s.classList.remove("on"),160),te.ensure(),te.click(),t(),Ge()})}function ua(s){const t=_t.ap;_t.flightMode==="free"&&!t.engaged&&_t.toggleAp(),s==="hdg"&&t.setLat("HDG"),s==="nav"&&t.setLat("NAV"),s==="vs"&&t.nudgeVs(0),s==="alt"&&t.holdAlt()}ha(Vf,()=>ua("hdg"));ha(Gf,()=>ua("nav"));ha(Wf,()=>ua("vs"));ha(Xf,()=>ua("alt"));function Co(s,t){const e=document.getElementById(s);e&&(e.textContent=t)}function Ge(){const s=_t.getApStatus();Co("ap-v-spd",`${s.spdKt} kt`),Co("ap-v-hdg",`${String(s.hdgDeg).padStart(3,"0")}°`),Co("ap-v-alt",`${s.altM} m`),Co("ap-v-vs",`${s.vsFpm} fpm`);const t=document.getElementById("ap-lat");t&&(t.textContent=s.loc?`${s.lat}·LOC`:s.lat,t.classList.toggle("on",s.lat==="NAV"));const e=document.getElementById("ap-vrt-alt");e&&e.classList.toggle("on",s.ver!=="APPR");const n=document.getElementById("ap-vrt-appr");n&&(n.textContent=s.gs?"APPR·GS":s.ver==="APPR"?"APPR":`APPR${s.loc&&s.dist>0?` ${Math.round(s.dist/1e3)}k`:""}`,n.classList.toggle("on",s.ver==="APPR")),S1.classList.toggle("on",_t.ap.engaged);const i=document.getElementById("ap-master");i&&(i.textContent=_t.ap.engaged?"AP OFF":"AP ON",i.classList.toggle("on",_t.ap.engaged))}Me("ap-master",()=>{if(_t.flightMode!=="free"){gs.show({text:"AP は自由飛行モードでのみ使用可能",speech:null,kind:"warn"});return}_t.toggleAp(),Ge()});function qf(s){Vr.style.display=s?"block":"none",document.body.classList.toggle("ap-settings",s),gc="",Ge()}Me("btn-ap-set",()=>{qf(Vr.style.display!=="block")});Me("ap-close",()=>qf(!1));Me("ap-spd-dn",()=>{_t.ap.nudgeSpd(-5),Ge()});Me("ap-spd-up",()=>{_t.ap.nudgeSpd(5),Ge()});Me("ap-hdg-l",()=>{_t.ap.nudgeHdg(-5),Ge()});Me("ap-hdg-r",()=>{_t.ap.nudgeHdg(5),Ge()});Me("ap-alt-dn",()=>{_t.ap.nudgeAlt(-100),Ge()});Me("ap-alt-up",()=>{_t.ap.nudgeAlt(100),Ge()});Me("ap-vs-dn",()=>{_t.ap.nudgeVs(-500),Ge()});Me("ap-vs-up",()=>{_t.ap.nudgeVs(500),Ge()});Me("ap-lat",()=>{_t.ap.setLat(_t.ap.latMode==="HDG"?"NAV":"HDG"),Ge()});Me("ap-vrt-alt",()=>{_t.ap.holdAlt(),Ge()});Me("ap-vrt-appr",()=>{_t.ap.alignApproach(),Ge()});Me("ap-align",()=>{_t.ap.alignApproach(),Ge()});Qc("btn-yaw-l",()=>{re.yaw=-1},()=>{re.yaw=0});Qc("btn-yaw-r",()=>{re.yaw=1},()=>{re.yaw=0});Qc("btn-brake",()=>{re.brakes=!0},()=>{re.brakes=!1});Me("btn-gear",()=>{te.ensure(),re.gearDown=!re.gearDown;const s=document.getElementById("btn-gear");s.innerHTML=re.gearDown?"ギア<br>DOWN":"ギア<br>UP",s.classList.toggle("on",!re.gearDown),te.gear()});Me("btn-flap-up",()=>{te.ensure(),re.flapUp(),te.flap()});Me("btn-flap-dn",()=>{te.ensure(),re.flapDown(),te.flap()});Me("btn-spoiler",()=>{te.ensure(),re.spoilers=re.spoilers>0?0:1,document.getElementById("btn-spoiler").classList.toggle("on",re.spoilers>0),te.click()});Me("btn-sound",()=>{te.ensure(),te.setMuted(!te.muted);const s=document.getElementById("btn-sound");s.innerHTML=te.muted?"音<br>OFF":"音<br>ON",s.classList.toggle("on",te.muted)});Me("btn-inst",()=>{const s=Bs.style.display==="none";Bs.style.display=s?"block":"none",s&&Ys.resize();const t=document.getElementById("btn-inst");t.innerHTML=s?"計器<br>ON":"計器<br>OFF",t.classList.toggle("on",!s)});const vc=document,Po=document.getElementById("app")??document.documentElement,Yf="airliner.fs",ks=()=>document.fullscreenElement!=null||vc.webkitFullscreenElement!=null;function Kf(){try{return localStorage.getItem(Yf)==="1"}catch{return!1}}function Ss(s){try{localStorage.setItem(Yf,s?"1":"0")}catch{}}function zs(){Fe.setDisplay(ks()),Ss(ks()),da()}function $f(){try{Po.requestFullscreen?Po.requestFullscreen().then(()=>zs()).catch(()=>{ml(),Fe.setDisplay(!1),Ss(!1)}):Po.webkitRequestFullscreen?(Po.webkitRequestFullscreen(),setTimeout(zs,0)):(ml(),Fe.setDisplay(!1),Ss(!1))}catch{ml(),Fe.setDisplay(!1),Ss(!1)}}function A1(){document.exitFullscreen?document.exitFullscreen().then(()=>zs()).catch(()=>{}):vc.webkitExitFullscreen&&(vc.webkitExitFullscreen(),setTimeout(zs,0))}function ml(){gs.show({text:"このブラウザは全画面 API 非対応です。iPhone は共有→「ホーム画面に追加」で全画面起動",speech:null,kind:"warn"})}document.addEventListener("fullscreenchange",zs);document.addEventListener("webkitfullscreenchange",zs);Fe.setDisplay(ks()||Kf());Fe.onDisplaySelect=s=>{s?ks()||(Ss(!0),$f()):(Ss(!1),ks()&&A1())};Je.on("resume",()=>{_t.resume(),Je.hidePause()});Je.on("restart",()=>{_t.restartDemo(),Os.reset(),Je.hidePause()});Je.on("toMenu",()=>{_t.toMenu(),Je.hidePause(),te.suspendAll(),Bs.style.display="none",document.body.classList.remove("ap-settings"),Vr.style.display="none",zf.style.display="none",Fe.show()});const Br=document.getElementById("stick-zone"),jf=document.getElementById("stick-visual"),ws=document.getElementById("stick-knob"),dd=8,E1=1.45,R1=2.2,fd=.9;let Hi=null,zo=44,Zf=0,Qf=0,Jc=0,Zo=0,_c=!1;function Jf(){const s=jf.getBoundingClientRect();zo=Math.max(26,s.width/2-24)}function tp(s,t){const e=s-Zf,n=t-Qf,i=Math.hypot(e,n),r=i>zo?zo/i:1,o=e*r,a=n*r,l=i*r,c=C1((l-dd)/Math.max(1,zo-dd)),h=l>.001?Math.pow(c,E1)*fd/l:0;Zo=o*h,Jc=a*h,ws.style.left=`calc(50% + ${o}px)`,ws.style.top=`calc(50% + ${a}px)`,ws.style.transform=`rotate(${(Zo/fd*20).toFixed(1)}deg)`}function C1(s){return s<0?0:s>1?1:s}Br.addEventListener("pointerdown",s=>{if(_t.state!=="flying"||Hi!==null)return;const t=jf.getBoundingClientRect();if(Math.hypot(s.clientX-(t.left+t.width/2),s.clientY-(t.top+t.height/2))>t.width*.78){sp(s);return}s.preventDefault(),Hi=s.pointerId,_c=!0,Jf(),Zf=s.clientX,Qf=s.clientY,tp(s.clientX,s.clientY);try{Br.setPointerCapture(s.pointerId)}catch{}});Br.addEventListener("pointermove",s=>{s.pointerId===Hi&&tp(s.clientX,s.clientY)});const ep=s=>{s.pointerId===Hi&&(Hi=null,Jc=0,Zo=0,ws.style.left="50%",ws.style.top="50%",ws.style.transform="rotate(0deg)")};Br.addEventListener("pointerup",ep);Br.addEventListener("pointercancel",ep);window.addEventListener("resize",()=>{Hi!==null&&Jf()});function P1(s){if(!_c||s<=0)return;const t=R1*s,e=Jc,n=Zo,i=e-re.pitch,r=n-re.roll;re.pitch=Math.abs(i)<=t?e:re.pitch+Math.sign(i)*t,re.roll=Math.abs(r)<=t?n:re.roll+Math.sign(r)*t,Hi===null&&re.pitch===0&&re.roll===0&&(_c=!1,re.releaseStick())}const Hs=document.getElementById("throttle-rail"),pd=document.getElementById("throttle-knob");function np(s){const t=Hs.getBoundingClientRect(),e=1-Math.max(0,Math.min(1,(s-t.top-15)/(t.height-30)));re.throttle=e,pd.style.top=`${(1-e)*(t.height-30)+0}px`,pd.textContent=`${Math.round(e*100)}%`}let Qo=null;Hs.addEventListener("pointerdown",s=>{_t.state==="flying"&&(s.preventDefault(),Qo=s.pointerId,Hs.setPointerCapture(s.pointerId),np(s.clientY))});Hs.addEventListener("pointermove",s=>{s.pointerId===Qo&&np(s.clientY)});const ip=s=>{s.pointerId===Qo&&(Qo=null)};Hs.addEventListener("pointerup",ip);Hs.addEventListener("pointercancel",ip);let kr=null,xc=0,yc=0;function sp(s){_t.state==="flying"&&kr===null&&(kr=s.pointerId,xc=s.clientX,yc=s.clientY)}const I1="#stick-zone, #throttle-rail, #btn-cluster, #ap-panel, .overlay, #menu-screen, #portrait-overlay, #webgl-error, .chip, .ap-b, .ap-chip, #sop-banner, button, input, select";window.addEventListener("pointerdown",s=>{const t=s.target;t&&t.closest&&t.closest(I1)||sp(s)});window.addEventListener("pointermove",s=>{if(s.pointerId!==kr)return;const t=s.clientX-xc,e=s.clientY-yc;xc=s.clientX,yc=s.clientY,_t.orbitDrag(t,e)});const rp=s=>{s.pointerId===kr&&(kr=null)};window.addEventListener("pointerup",rp);window.addEventListener("pointercancel",rp);function da(){xy(wi,gi),_t.syncPostFx(),Je.updateOrientation(),Ys.resize()}window.addEventListener("resize",da);window.addEventListener("orientationchange",()=>setTimeout(da,250));da();let Mc=performance.now();document.addEventListener("visibilitychange",()=>{document.hidden?_t.state==="flying"&&(_t.pause(),Je.showPause()):(Mc=performance.now(),Je.updateOrientation())});let md=!0;const Io=["low","medium","high","ultra"];function op(s){requestAnimationFrame(op);let t=(s-Mc)/1e3;Mc=s,t>0||(t=0),t>.25&&(t=.25),_t.quality.sample(t);const e=s*.001;if(_t.state==="menu"){_t.renderPreview(t);return}if(_t.state==="flying"){re.updateFromKeys(t),P1(t),_t.updateFlight(t,re.normalized());const o=_t.getTelemetry();if(o){const a=_t.getFlightInfo(),l=_t.getNavInfo(),c=_1;if(c.ias=o.ias,c.alt=o.alt,c.agl=o.agl,c.vspeed=o.vspeed,c.heading=o.heading,c.pitch=o.pitch,c.bank=o.bank,c.aoa=o.aoa,c.gLoad=o.gLoad,c.throttle=o.throttle,c.fuelFrac=o.fuelFrac,c.groundSpeed=o.groundSpeed,c.windSpeed=o.windSpeed,c.windDirDeg=o.windDirDeg,c.flapsDeg=a.flapsDeg,c.gearDown=a.gearDown,c.spoilers=re.spoilers,c.phase=a.phase,c.crashed=a.crashed,c.rwyName=l?l.nearest.name:null,c.rwyDist=l?l.distanceToThreshold:null,c.rwyRemaining=l?l.remainingRunway:null,c.rwyHeading=l?l.nearest.headingDeg:null,c.fps=_t.quality.getFps(),c.onGround=o.onGround,!o.crashed){if(!o.onGround&&Ms.length){const h=o.position.x,u=o.position.z,d=o.alt;for(let f=0;f<Ms.length;f++){const g=Ms[f],v=h-g.x,m=u-g.z,p=g.r+8;if(v*v+m*m<p*p&&d<g.top+5&&d>g.top-420){_t.forceCrash();break}}}if(ud&&(o.onGround||o.agl<6)){const h=o.vspeed<-5.5&&o.groundSpeed>28,u=!a.gearDown&&o.groundSpeed>46&&o.agl<4;(h||u)&&_t.forceCrash()}}ud=!o.onGround,o.crashed&&!pl&&(pl=!0,T1(1.35),gs.show({text:"ドカーン！！ 💥 衝突爆発",speech:"mayday mayday",kind:"warn"})),o.crashed||(pl=!1);{const h=_t.getApStatus();if(h.engaged){Ro!=="flex"&&(Ro="flex",ld.style.display="flex");const u=`AP ${h.lat}${h.loc?"·LOC":""} | ${h.ver}${h.gs?"·GS":""} · IAS ${Math.round(o.ias*1.94404)}kt · HDG ${String(h.hdgDeg).padStart(3,"0")}° · ALT ${h.altM}m${h.ver==="VS"?` · V/S ${h.vsFpm}`:""}`;u!==cd&&(cd=u,b1.textContent=u);const d=`${h.lat}|${h.ver}`;d!==hd&&(hd=d,Vf.classList.toggle("on",h.lat==="HDG"),Gf.classList.toggle("on",h.lat==="NAV"),Wf.classList.toggle("on",h.ver==="VS"),Xf.classList.toggle("on",h.ver==="ALT"))}else Ro!=="none"&&(Ro="none",ld.style.display="none");if(Vr.style.display==="block"){const u=`${h.engaged?1:0}|${h.lat}|${h.ver}|${h.spdKt}|${h.hdgDeg}|${h.altM}|${h.vsFpm}|${h.loc?1:0}|${h.gs?1:0}`;u!==gc&&(gc=u,Ge())}for(const u of _t.drainApEvents()){const d=w1[u];d&&(gs.show(d),!te.muted&&d.speech&&od(d.speech))}}if(Bs.style.display!=="none"){Ys.update(c);for(const u of Os.update(c))gs.show(u),!te.muted&&u.speech&&od(u.speech);const h=Os.flapCaution(c,performance.now());h&&gs.show(h)}if(te.ready&&!te.muted){te.setEngine(o.throttle,o.ias),te.setWind(o.ias);const h=o.crashed||a.crashed?"none":o.ias>Of(a.flapsDeg)?"overspeed":o.aoa>15&&o.agl>10?"stall":o.agl<300&&!a.gearDown&&o.vspeed<-1?"gear":"none";te.setWarning(h)}md===!1&&o.onGround&&o.vspeed<-.5&&te.ready&&!te.muted&&te.touchdown(),md=o.onGround}}const n=_t.quality.getFps();Eo=Math.max(0,Eo-t);const i=Io.indexOf(_t.quality.level),r=Io.indexOf(kf);if(_t.state==="flying"&&(n<26&&i>0?(fr=0,dr+=t,dr>3&&(dr=0,_t.setQuality(Io[i-1]),ac(wi,_t.quality.preset.pixelRatio),_t.syncPostFx(),Eo=60)):n>55&&i<r&&Eo<=0?(dr=0,fr+=t,fr>8&&(fr=0,_t.setQuality(Io[i+1]),ac(wi,_t.quality.preset.pixelRatio),_t.syncPostFx())):(dr=0,fr=0)),_t.updateWorld(e,t),ca.update(t),vr>.02){const o=vr*1.15;gi.position.x+=(Math.random()-.5)*o,gi.position.y+=(Math.random()-.5)*o,gi.position.z+=(Math.random()-.5)*o,gi.rotateZ((Math.random()-.5)*o*.011),vr*=Math.exp(-2.6*t)}else vr=0;_t.render()}requestAnimationFrame(op);
