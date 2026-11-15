import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import FlexCarousel from './components/FlexCarousel';
import TextLoop from './components/TextLoop';
import SplitFlapText from './components/SplitFlapText';
import GlowCursor from './components/GlowCursor';
import PixelSnow from './components/PixelSnow';
import siteContent from './content/site.json';

const {hero,launch,antigravity,carousel,about,services,contact,footer,navigation}=siteContent;
const menuItems=navigation.items;
const socialItems=navigation.socials;

function StaggeredMenu({position='left',items,socialItems,displaySocials=true,displayItemNumbering=true,menuButtonColor='#fff',openMenuButtonColor='#fff',changeMenuColorOnOpen=true,colors=['#B497CF','#5227FF'],accentColor='#ff6b6b',logoUrl,onMenuOpen,onMenuClose}){
 const [open,setOpen]=useState(false); const toggle=()=>{setOpen(v=>{v?onMenuClose?.():onMenuOpen?.();return !v})};
 return <>
 <button aria-label={open?'Close menu':'Open menu'} className={`menu-trigger ${open?'open':''}`} onClick={toggle} style={{color:open?openMenuButtonColor:menuButtonColor}}><span/><span/><span/><b>MENU</b></button>
 <div className={`menu-panel ${open?'open':''} ${position}`} style={{'--c1':colors[0],'--c2':colors[1],'--accent':accentColor}}>
  <div className="menu-glow"/><div className="menu-brand">ORBIT<span>_</span>FORGE</div>
  <nav>{items.map((item,i)=><a key={item.label} href={item.link} onClick={()=>setOpen(false)} aria-label={item.ariaLabel}><small>{displayItemNumbering?String(i+1).padStart(2,'0'):''}</small><span>{item.label}</span><i>↗</i></a>)}</nav>
  {displaySocials&&<div className="socials">{socialItems.map(s=><a key={s.label} href={s.link} target="_blank" rel="noreferrer">{s.label}</a>)}</div>}
  <div className="menu-foot">SYSTEM NAVIGATION <span>● ONLINE</span></div>
 </div></>;
}

function TextPressure(){return <div className="pressure" aria-label={hero.hello}>{hero.hello}</div>}
function StarBorder({children,onClick}){return <button className="star-border" onClick={onClick}><span>{children}</span></button>}
function Radar(){return <div className="radar"><div className="radar-sweep"/><div className="radar-ring r1"/><div className="radar-ring r2"/><div className="radar-ring r3"/><i/></div>}
function Topography(){return <div className="topography"/>}
function BinaryOrbits(){return <div className="binary-orbits"><div className="orbit o1"><i>01</i></div><div className="orbit o2"><i>10</i></div><div className="orbit o3"><i>11</i></div></div>}
function Antigravity({colors=['#5227FF','#FF9FFC','#B497CF'],count=1500,magnetRadius=9,ringRadius=7,particleSize=.9,autoAnimate=true}){
 const ref=useRef(null); useEffect(()=>{const c=ref.current,ctx=c.getContext('2d'),d=window.devicePixelRatio||1;let w,h,pts=[];function resize(){w=c.clientWidth;h=c.clientHeight;c.width=w*d;c.height=h*d;ctx.setTransform(d,0,0,d,0,0);pts=Array.from({length:Math.min(count,520)},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:particleSize*(.55+Math.random()),phase:Math.random()*7}))} resize();window.addEventListener('resize',resize);let raf,t=0;function draw(){t+=.012;ctx.clearRect(0,0,w,h);for(const p of pts){if(autoAnimate){p.x+=p.vx+Math.sin(t+p.phase)*.07;p.y+=p.vy+Math.cos(t*.9+p.phase)*.07;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0}const k=Math.floor((p.phase+t)*3)%colors.length;ctx.fillStyle=colors[k];ctx.globalAlpha=.55+.35*Math.sin(p.phase+t);ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;raf=requestAnimationFrame(draw)}draw();return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}},[count,particleSize,autoAnimate,colors]);return <canvas ref={ref} className="antigravity"/>}
function Lightning(){return <div className="lightning"><div/><div/><div/></div>}
function Loader({done}){return <div className={`loader ${done?'done':''}`}><Radar/><div className="load-copy"><span>ORBIT_FORGE</span><strong>INITIALIZING SYSTEM</strong><em>CALIBRATING / 100%</em></div></div>}
function App(){const [loading,setLoading]=useState(true);useEffect(()=>{const t=setTimeout(()=>setLoading(false),1500);return()=>clearTimeout(t)},[]);return <div className="app"><div className="pixel-snow-bg"><PixelSnow color="#ffffff" variant="snowflake" density={0.5} speed={1} wind={0.25} flakeSize={1} pixelSize={3} glow={0.8} mouseInteraction={true}/></div><Topography/><BinaryOrbits/><Lightning/><GlowCursor color="#5f8bff" intensity={1.3} trailWidth={3} linger={1.4} glow={1.2} clickBurst theme="dark"><div className="glow-content"/></GlowCursor><div className="right-nav"><div className="right-nav-line"/><span>ORBIT_FORGE</span>{menuItems.map((item,i)=><a key={item.label} href={item.link}><b>{String(i+1).padStart(2,'0')}</b>{item.label}</a>)}</div><StaggeredMenu position="left" items={menuItems} socialItems={socialItems} displaySocials={true} displayItemNumbering={true} menuButtonColor="#fff" openMenuButtonColor="#fff" changeMenuColorOnOpen={true} colors={['#B497CF','#5227FF']} accentColor="#ff6b6b" onMenuOpen={()=>console.log('Menu opened')} onMenuClose={()=>console.log('Menu closed')}/><main id="home">
 <section className="hero"><div className="hero-copy"><div className="eyebrow"><span/> {hero.eyebrow}</div><TextPressure/><div className="front-loop"><TextLoop text={hero.title} shape="wave" speed={90} direction="forward" separator="✦" curviness={90} tilt={0} fontSize={46} fontWeight={800} letterSpacing={2} uppercase ribbon ribbonColor="#5227FF" ribbonWidth={86} edgeFade={0} cross={false} crossAngle={16} draggable={false} scrollBoost={0} outline={false} pauseOnHover /></div><p>{hero.description}</p><div className="actions"><StarBorder onClick={()=>document.querySelector('#launch')?.scrollIntoView({behavior:'smooth'})}>{hero.primaryCta}</StarBorder><a href="#about" className="ghost">{hero.secondaryCta}</a></div></div><div className="hero-visual"><div className="core"><div className="core-ring r1"/><div className="core-ring r2"/><div className="core-ring r3"/><div className="core-dot"/><span>OF</span></div><div className="readout"><b>07.31°</b><span>ORBITAL VECTOR</span></div></div></section>
 <section id="launch" className="launch-section"><span className="section-label">{launch.label}</span><div className="launch-card"><SplitFlapText words={launch.words} flipDuration={0.12} stagger={0.06} cycleDelay={2400} charset="alphanumeric" flipsPerChar={8} order="left" align="left" tileStyle="board" tileColor="#111827" textColor="#f8fafc" glare={0} depth={0.5} tileRadius={8} gap={6} fontSize={52} loop padTo={12} intro /><p>{launch.message}</p></div></section>
 <section className="antigravity-section"><div className="section-label">{antigravity.label}</div><div className="anti-wrap"><Antigravity colors={['#5227FF','#FF9FFC','#B497CF']} count={1500} magnetRadius={9} ringRadius={7} particleSize={.9} autoAnimate={true}/><div className="anti-copy"><h2>{antigravity.heading}<br/><span>{antigravity.highlight}</span></h2><p>{antigravity.description}</p></div></div></section>
 <section className="carousel-section"><div className="section-label">{carousel.label}</div><div className="carousel-frame"><FlexCarousel items={[{src:'/images/one.jpg',alt:'A chrome sculpture',title:'Iridescence'},{src:'/images/two.jpg',alt:'A figure on a white set',title:'White Room'},{src:'/images/three.jpg',alt:'A clay bust in profile',title:'Clay Study',subtitle:'Studio 04'}]} preset="liquid" intro="rise" cardHeight={0.5} gap={12} squeeze={0.2} focusOnClick captions /></div></section>
 <section id="about" className="info"><div><span className="section-label">{about.label}</span><h2>{about.heading}<br/><i>{about.highlight}</i></h2></div><p>{about.body}</p></section>
 <section id="services" className="services"><span className="section-label">{services.label}</span><div className="cards">{services.items.map((item)=><article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p><a href="#contact">{item.linkText}</a></article>)}</div></section>
 <section id="contact" className="contact"><span className="section-label">{contact.label}</span><h2>{contact.heading}<br/><span>{contact.highlight}</span></h2><a href={`mailto:${contact.email}`}>{contact.email} ↗</a></section>
 </main><footer>{footer.copyright} <span>{footer.tagline}</span></footer><Loader done={!loading}/></div>}
createRoot(document.getElementById('root')).render(<App/>);
