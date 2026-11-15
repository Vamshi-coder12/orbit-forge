import React,{useEffect,useRef} from 'react';
export default function GlowCursor({color='#5f8bff',intensity=1.3,trailWidth=3,linger=1.4,glow=1.2,clickBurst,theme='dark',children}){
 const ref=useRef(null);
 useEffect(()=>{const c=ref.current,ctx=c.getContext('2d');let w,h,dpr,raf,mx=-999,my=-999;const trail=[];const bursts=[];
 const resize=()=>{w=c.clientWidth;h=c.clientHeight;dpr=devicePixelRatio||1;c.width=w*dpr;c.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
 const move=e=>{mx=e.clientX;my=e.clientY;trail.push({x:mx,y:my,t:performance.now()});while(trail.length>80)trail.shift()};
 const down=e=>{if(!clickBurst)return;for(let i=0;i<18;i++){const a=Math.random()*Math.PI*2,s=1+Math.random()*5;bursts.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1})}};
 resize();addEventListener('resize',resize);addEventListener('mousemove',move);addEventListener('mousedown',down);
 const hexToRgb=h=>{const n=h.replace('#','');const v=n.length===3?n.split('').map(x=>x+x).join(''):n;return [parseInt(v.slice(0,2),16),parseInt(v.slice(2,4),16),parseInt(v.slice(4,6),16)]};
 const [r,g,b]=hexToRgb(color);
 const draw=now=>{ctx.clearRect(0,0,w,h);const live=trail.filter(p=>now-p.t<linger*1000);trail.splice(0,trail.length,...live);
 for(let i=1;i<trail.length;i++){const a=trail[i-1],q=trail[i],age=(now-q.t)/(linger*1000),alpha=(1-age)*intensity*.55;ctx.strokeStyle=`rgba(${r},${g},${b},${alpha})`;ctx.lineWidth=trailWidth*(1-age*.7);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(q.x,q.y);ctx.stroke()}
 if(mx>-900){const grd=ctx.createRadialGradient(mx,my,0,mx,my,32*glow);grd.addColorStop(0,`rgba(${r},${g},${b},${.5*intensity})`);grd.addColorStop(1,`rgba(${r},${g},${b},0)`);ctx.fillStyle=grd;ctx.beginPath();ctx.arc(mx,my,32*glow,0,Math.PI*2);ctx.fill();ctx.fillStyle=`rgba(${r},${g},${b},.95)`;ctx.beginPath();ctx.arc(mx,my,2.5,0,Math.PI*2);ctx.fill()}
 for(let i=bursts.length-1;i>=0;i--){const p=bursts[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.96;p.vy*=.96;p.life-=.035;ctx.fillStyle=`rgba(${r},${g},${b},${Math.max(0,p.life)})`;ctx.beginPath();ctx.arc(p.x,p.y,1.8,0,Math.PI*2);ctx.fill();if(p.life<=0)bursts.splice(i,1)}raf=requestAnimationFrame(draw)};raf=requestAnimationFrame(draw);
 return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);removeEventListener('mousemove',move);removeEventListener('mousedown',down)}},[color,intensity,trailWidth,linger,glow,clickBurst,theme]);
 return <div className="glow-cursor-wrap"><canvas ref={ref} className="glow-cursor"/>{children}</div>;
}
