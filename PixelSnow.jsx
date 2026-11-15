import React,{useEffect,useRef} from 'react';
export default function PixelSnow({color='#ffffff',variant='snowflake',density=.5,speed=1,wind=.25,flakeSize=1,pixelSize=3,glow=.8,mouseInteraction=true}){
 const ref=useRef(null);
 useEffect(()=>{const c=ref.current,ctx=c.getContext('2d');let w,h,dpr,raf,mx=.5,my=.5,flakes=[];
 const resize=()=>{w=c.clientWidth;h=c.clientHeight;dpr=devicePixelRatio||1;c.width=w*dpr;c.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);const n=Math.max(40,Math.floor(w*h/7000*density));flakes=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,s:.45+Math.random()*1.25,phase:Math.random()*Math.PI*2,rot:Math.random()*Math.PI}))};
 const move=e=>{const r=c.getBoundingClientRect();mx=(e.clientX-r.left)/w;my=(e.clientY-r.top)/h};resize();addEventListener('resize',resize);if(mouseInteraction)addEventListener('mousemove',move);
 const draw=()=>{ctx.clearRect(0,0,w,h);ctx.fillStyle=color;for(const f of flakes){f.y+=f.s*speed;f.x+=Math.sin(f.phase+f.y*.008)*wind*.35+(mx-.5)*.12;f.phase+=.01;if(f.y>h+10){f.y=-10;f.x=Math.random()*w}if(f.x>w+10)f.x=-10;if(f.x<-10)f.x=w+10;const size=pixelSize*(.6+f.s*.45)*flakeSize;ctx.globalAlpha=.25+f.s*.45;ctx.save();ctx.translate(Math.round(f.x),Math.round(f.y));ctx.rotate(f.rot);if(variant==='snowflake'){ctx.fillRect(-size/2,-size/2,size,size);ctx.fillRect(-size*1.4,-size/2,size*2.8,size);ctx.fillRect(-size/2,-size*1.4,size,size*2.8)}else ctx.fillRect(-size/2,-size/2,size,size);ctx.restore()}ctx.globalAlpha=1;raf=requestAnimationFrame(draw)};raf=requestAnimationFrame(draw);
 return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);if(mouseInteraction)removeEventListener('mousemove',move)}},[color,variant,density,speed,wind,flakeSize,pixelSize,glow,mouseInteraction]);
 return <canvas ref={ref} className="pixel-snow"/>;
}
