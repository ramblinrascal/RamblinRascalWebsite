'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(v:number)=>{const t=clamp(v);return t*t*(3-2*t)};
const frames=[
  [0,-.5,1.65,1.08,.18,.13],
  [.7,-.48,1.65,1.08,.18,.13],
  [1.4,.5,0,2.5,0,0],
  [3.05,.5,0,2.5,0,0],
  [3.75,2.5,-.65,1.5,.04,-.1],
  [4.85,2.5,-.65,1.5,.04,-.1],
  [5.55,3.5,-1.7,1.13,.12,-.08],
  [6.55,3.5,-1.7,1.13,.12,-.08],
  [7.15,5.5,1.65,.95,.17,.14],
  [8.3,7.5,1.65,.95,.17,.14]
];
function stateAt(p:number){let i=0;while(i<frames.length-2&&p>frames[i+1][0])i++;const a=frames[i],b=frames[i+1],t=smooth((p-a[0])/(b[0]-a[0]));return a.map((v,j)=>v+(b[j]-v)*t)}
function imageLoad(src:string){return new Promise<HTMLImageElement>((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=src})}
function fabricTexture(){const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d')!;x.fillStyle='#21364b';x.fillRect(0,0,512,512);let seed=71;const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};for(let i=0;i<65000;i++){const p=rand()*512,q=rand()*512;x.fillStyle=rand()>.6?'rgba(168,190,200,.23)':'rgba(0,6,19,.26)';x.fillRect(p,q,.8,rand()*3+1)}for(let i=-512;i<1024;i+=3){x.strokeStyle=i%2?'#344a6080':'#15294080';x.beginPath();x.moveTo(i,0);x.lineTo(i-512,512);x.stroke()}const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;tx.wrapS=tx.wrapT=THREE.RepeatWrapping;tx.repeat.set(2,2);return tx}

export default function CanScene(){
  const host=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const root=host.current!;let disposed=false,raf=0;let renderer:THREE.WebGLRenderer;
    try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:window.location.search.includes('capture'),powerPreference:'high-performance'})}catch{root.dataset.failed='true';const sync=()=>{const p=window.scrollY/window.innerHeight,s=stateAt(p),mobile=window.innerWidth<760;root.style.setProperty('--can-left',`calc(50% + ${mobile?0:s[2]*window.innerHeight/5.67}px)`);root.style.setProperty('--can-height',`${s[3]/1.08*(mobile?55:80)}vh`);root.style.setProperty('--can-top',mobile&&p<.9?'74%':'52%');const image=root.querySelector('img')!;image.src=p>5.2&&p<6.8?'/images/can-overalls.webp':'/images/can-front.webp'};sync();window.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',sync);return()=>{window.removeEventListener('scroll',sync);window.removeEventListener('resize',sync)}}
    renderer.setPixelRatio(window.location.search.includes('capture')?.7:Math.min(window.devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.9;root.appendChild(renderer.domElement);
    const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,.15,9);camera.lookAt(0,0,0);
    const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();const environment=pmrem.fromScene(room,.025);scene.environment=environment.texture;room.dispose();pmrem.dispose();
    scene.add(new THREE.HemisphereLight('#fff1d5','#211915',1.6));
    const key=new THREE.DirectionalLight('#fff7e7',2);key.position.set(-3,4,6);scene.add(key);
    const rim=new THREE.DirectionalLight('#ffb6a1',1.5);rim.position.set(4,2,-3);scene.add(rim);
    const cold=new THREE.DirectionalLight('#b9c5de',.8);cold.position.set(-5,-1,2);scene.add(cold);
    const assembly=new THREE.Group(),can=new THREE.Group();assembly.add(can);scene.add(assembly);
    const metal=new THREE.MeshStandardMaterial({color:'#d0d0c9',metalness:1,roughness:.23});
    const darkMetal=new THREE.MeshStandardMaterial({color:'#7b7c76',metalness:1,roughness:.29});
    const enamel=new THREE.MeshPhysicalMaterial({color:'#ad1726',metalness:.28,roughness:.36,clearcoat:.5,clearcoatRoughness:.22});
    const profile=[new THREE.Vector2(.86,-1.9),new THREE.Vector2(.92,-1.87),new THREE.Vector2(.975,-1.73),new THREE.Vector2(1,-1.56),new THREE.Vector2(1,1.4),new THREE.Vector2(.97,1.58),new THREE.Vector2(.88,1.73),new THREE.Vector2(.865,1.83)];
    can.add(new THREE.Mesh(new THREE.LatheGeometry(profile,128),enamel));
    const label=new THREE.Mesh(new THREE.CylinderGeometry(1.004,1.004,3.03,128,1,true),new THREE.MeshPhysicalMaterial({color:'#b21f2d',metalness:.15,roughness:.44,clearcoat:.3}));label.position.y=-.02;can.add(label);
    function torus(radius:number,tube:number,y:number){const m=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,12,96),metal);m.rotation.x=Math.PI/2;m.position.y=y;can.add(m)}
    torus(.878,.055,1.83);torus(.89,.034,1.77);torus(.865,.048,-1.89);torus(.925,.022,-1.81);
    const lid=new THREE.Mesh(new THREE.CylinderGeometry(.878,.878,.025,96),metal);lid.position.y=1.812;can.add(lid);torus(.74,.008,1.833);torus(.80,.011,1.838);
    const recess=new THREE.Mesh(new THREE.CircleGeometry(.68,64),darkMetal);recess.rotation.x=-Math.PI/2;recess.position.y=1.83;can.add(recess);
    const tabShape=new THREE.Shape();tabShape.absellipse(0,0,.17,.34,0,Math.PI*2,false,0);const hole=new THREE.Path();hole.absellipse(0,.075,.088,.14,0,Math.PI*2,true,0);tabShape.holes.push(hole);
    const tab=new THREE.Mesh(new THREE.ExtrudeGeometry(tabShape,{depth:.035,bevelEnabled:true,bevelSize:.018,bevelThickness:.012,bevelSegments:3,steps:1,curveSegments:32}),metal);tab.rotation.x=-Math.PI/2;tab.position.set(.02,1.86,-.11);can.add(tab);
    const rivet=new THREE.Mesh(new THREE.SphereGeometry(.065,16,12),metal);rivet.scale.y=.28;rivet.position.set(.025,1.86,-.3);can.add(rivet);
    const opening=new THREE.Mesh(new THREE.CircleGeometry(.26,40),new THREE.MeshStandardMaterial({color:'#44443f',metalness:.8,roughness:.4}));opening.scale.set(.72,1,1);opening.rotation.x=-Math.PI/2;opening.position.set(0,1.839,.37);can.add(opening);
    const droplets=new THREE.InstancedMesh(new THREE.SphereGeometry(1,8,6),new THREE.MeshPhysicalMaterial({color:'#eee5d3',metalness:.15,roughness:.08,transparent:true,opacity:.62,clearcoat:1}),240);
    const dummy=new THREE.Object3D();let seed=291;const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};for(let i=0;i<240;i++){const angle=rand()*Math.PI*2;const size=.006+rand()*.016;dummy.position.set(Math.sin(angle)*1.015,-1.4+rand()*2.78,Math.cos(angle)*1.015);dummy.scale.set(size,size*(1.1+rand()*.7),size*.6);dummy.lookAt(new THREE.Vector3(0,dummy.position.y,0));dummy.updateMatrix();droplets.setMatrixAt(i,dummy.matrix)}can.add(droplets);
    const denimMap=fabricTexture();const denim=new THREE.MeshStandardMaterial({map:denimMap,roughness:.97,color:'#a6b6c3',side:THREE.DoubleSide});
    const copper=new THREE.MeshStandardMaterial({color:'#b88844',metalness:.8,roughness:.38});
    const overalls=new THREE.Group();can.add(overalls);
    const waist=new THREE.Mesh(new THREE.CylinderGeometry(1.04,1.025,1.4,96,1,true),denim);waist.position.y=-1.08;overalls.add(waist);
    const bib=new THREE.Mesh(new THREE.CylinderGeometry(1.046,1.046,1.15,48,1,true,Math.PI/2-.65,1.3),denim);bib.position.y=-.08;overalls.add(bib);
    const pocket=new THREE.Mesh(new THREE.CylinderGeometry(1.06,1.06,.6,36,1,true,Math.PI/2-.39,.78),denim);pocket.position.y=-.72;overalls.add(pocket);
    const stitchMaterial=new THREE.LineBasicMaterial({color:'#c69b5f'});
    function seam(angle:number,min:number,max:number){const points=[];for(let y=min;y<max;y+=.04){points.push(new THREE.Vector3(Math.sin(angle)*1.065,y,Math.cos(angle)*1.065));points.push(new THREE.Vector3(Math.sin(angle)*1.065,y+.018,Math.cos(angle)*1.065))}overalls.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),stitchMaterial))}
    function horizontalSeam(y:number,a:number,b:number,r=1.068){const points=[];for(let angle=a;angle<b;angle+=.035){points.push(new THREE.Vector3(Math.sin(angle)*r,y,Math.cos(angle)*r));points.push(new THREE.Vector3(Math.sin(angle+.016)*r,y,Math.cos(angle+.016)*r))}overalls.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),stitchMaterial))}
    for(const angle of [Math.PI/2-.53,Math.PI/2+.53]){const strap=new THREE.Mesh(new THREE.CylinderGeometry(1.035,1.035,1.38,20,1,true,angle-.085,.17),denim);strap.position.y=1.03;overalls.add(strap);seam(angle-.07,.36,1.7);seam(angle+.07,.36,1.7);const button=new THREE.Mesh(new THREE.SphereGeometry(.065,16,12),copper);button.position.set(Math.sin(angle)*1.08,.39,Math.cos(angle)*1.08);button.scale.set(1,1,.3);button.lookAt(new THREE.Vector3(Math.sin(angle)*2,.39,Math.cos(angle)*2));overalls.add(button);const clasp=new THREE.Mesh(new THREE.TorusGeometry(.085,.013,6,12),copper);clasp.position.set(Math.sin(angle)*1.065,.55,Math.cos(angle)*1.065);clasp.rotation.y=angle;clasp.scale.y=1.25;overalls.add(clasp)}
    seam(Math.PI/2-.63,-.65,.49);seam(Math.PI/2+.63,-.65,.49);seam(Math.PI/2-.37,-1.01,-.42);seam(Math.PI/2+.37,-1.01,-.42);horizontalSeam(.475,Math.PI/2-.65,Math.PI/2+.65);horizontalSeam(-.44,Math.PI/2-.39,Math.PI/2+.39);horizontalSeam(-.98,Math.PI/2-.39,Math.PI/2+.39);horizontalSeam(-.39,0,Math.PI*2,1.05);
    let opened=false;const pop=()=>{opened=true};window.addEventListener('rascal-pop',pop);
    Promise.all([imageLoad('/images/can-wrap.png'),imageLoad('/images/logo.png'),document.fonts.ready]).then(([wrap,logo])=>{
      if(disposed)return;const c=document.createElement('canvas');c.width=4096;c.height=2048;const ctx=c.getContext('2d')!;ctx.drawImage(wrap,0,0,c.width,c.height);ctx.fillStyle='#bb1828';ctx.fillRect(0,0,c.width/2,c.height);ctx.drawImage(wrap,0,0,wrap.width/2,wrap.height,c.width*.10,0,c.width*.30,c.height);
      // The original venue mark is printed on a separate neck band, not regenerated.
      const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;tx.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);(label.material as THREE.MeshPhysicalMaterial).map=tx;(label.material as THREE.MeshPhysicalMaterial).color.set('#ffffff');(label.material as THREE.MeshPhysicalMaterial).needsUpdate=true;
      const markCanvas=document.createElement('canvas');markCanvas.width=636;markCanvas.height=598;const mc=markCanvas.getContext('2d')!;mc.drawImage(logo,0,0);const mark=new THREE.CanvasTexture(markCanvas);mark.colorSpace=THREE.SRGBColorSpace;
      const logoMat=new THREE.MeshStandardMaterial({map:mark,transparent:true,roughness:.6,metalness:.1,depthWrite:false});
      const brandMark=new THREE.Mesh(new THREE.PlaneGeometry(.40,.37),logoMat);brandMark.position.set(.993,1.61,0);brandMark.rotation.y=Math.PI/2;can.add(brandMark);
      const patch=new THREE.Mesh(new THREE.PlaneGeometry(.36,.34),logoMat);patch.position.set(1.067,-.72,0);patch.rotation.y=Math.PI/2;overalls.add(patch);
      root.dataset.ready='true';
    }).catch(()=>{root.dataset.ready='true'});
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let target=window.scrollY/window.innerHeight,current=target;let mouseX=0,mouseY=0;
    const onScroll=()=>{target=window.scrollY/window.innerHeight};
    const resize=()=>{renderer.setSize(root.clientWidth,root.clientHeight);camera.aspect=root.clientWidth/root.clientHeight;camera.updateProjectionMatrix();onScroll()};
    const pointer=(e:PointerEvent)=>{mouseX=e.clientX/window.innerWidth-.5;mouseY=e.clientY/window.innerHeight-.5};
    window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',resize);window.addEventListener('pointermove',pointer,{passive:true});resize();
    let last=0,lastDraw='';
    function render(time:number){raf=requestAnimationFrame(render);if(document.hidden)return;const dt=Math.min((time-last)/1000,.05);last=time;current+= (target-current)*(1-Math.exp(-dt*9));const p=reduced.matches?0:current;const s=stateAt(p);const mobile=window.innerWidth<760;
      can.rotation.y=s[1]*Math.PI;tab.rotation.z+=( (opened?-.5:0)-tab.rotation.z)*.12;tab.position.y+=( (opened?1.98:1.86)-tab.position.y)*.12;assembly.rotation.x=s[4]+(reduced.matches?0:mouseY*.025);assembly.rotation.z=s[5]+(reduced.matches?0:mouseX*.025);assembly.position.x=mobile?0:s[2];assembly.position.y=mobile?(p<.9?-1.42:(p>5.2&&p<6.8?-1.1:0)):-.08;const scale=mobile?s[3]*(p<.9?.64:.73):s[3];assembly.scale.setScalar(scale);
      const denimProgress=smooth((p-4.95)/.55);overalls.position.y=-4.4*(1-denimProgress);overalls.visible=denimProgress>.01;
      root.dataset.rotation=String(can.rotation.y.toFixed(3));root.dataset.denim=String(denimProgress.toFixed(2));const drawKey=[current.toFixed(3),mouseX.toFixed(2),mouseY.toFixed(2),tab.rotation.z.toFixed(3),root.dataset.ready,window.innerWidth,window.innerHeight].join(':');if(drawKey!==lastDraw){renderer.render(scene,camera);lastDraw=drawKey}
    }raf=requestAnimationFrame(render);
    const lost=(event:Event)=>{event.preventDefault();root.dataset.failed='true'};renderer.domElement.addEventListener('webglcontextlost',lost);
    return()=>{disposed=true;cancelAnimationFrame(raf);window.removeEventListener('rascal-pop',pop);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',resize);window.removeEventListener('pointermove',pointer);renderer.domElement.removeEventListener('webglcontextlost',lost);scene.traverse(obj=>{if(obj instanceof THREE.Mesh){obj.geometry.dispose();const mats=Array.isArray(obj.material)?obj.material:[obj.material];for(const m of mats){for(const value of Object.values(m))if(value instanceof THREE.Texture)value.dispose();m.dispose()}}});environment.dispose();denimMap.dispose();renderer.dispose();renderer.domElement.remove()};
  },[]);
  return <div ref={host} className="can-stage" aria-hidden="true"><div className="can-fallback"><img src="/images/can-front.webp" alt=""/></div></div>;
}
