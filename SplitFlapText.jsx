import React,{useEffect,useState} from 'react';
import './SplitFlapText.css';
export default function SplitFlapText({words,flipDuration=.12,stagger=.06,cycleDelay=2400,charset='alphanumeric',flipsPerChar=8,order='left',align='left',tileStyle='board',tileColor='#111827',textColor='#f8fafc',glare=0,depth=.5,tileRadius=8,gap=6,fontSize=52,loop,padTo=12,intro}){
 const [index,setIndex]=useState(0); useEffect(()=>{if(!loop)return;const t=setInterval(()=>setIndex(i=>(i+1)%words.length),cycleDelay);return()=>clearInterval(t)},[loop,cycleDelay,words.length]);
 return <div className="split-flap" style={{'--tile':tileColor,'--text':textColor,'--radius':`${tileRadius}px`,'--gap':`${gap}px`,'--size':`${fontSize}px`,'--duration':`${flipDuration}s`,'--depth':depth}} aria-live="polite">{words[index].padEnd(padTo,' ').split('').map((ch,i)=><span className="flap" key={`${index}-${i}`} style={{animationDelay:`${i*stagger}s`}}><span>{ch}</span></span>)}</div>
}
