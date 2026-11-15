import React,{useRef,useState} from 'react';
import './FlexCarousel.css';
export default function FlexCarousel({items,preset='liquid',intro='rise',cardHeight=.5,gap=12,squeeze=.2,focusOnClick,captions}){
 const [active,setActive]=useState(0); const ref=useRef(null);
 const scrollTo=i=>{setActive(i); ref.current?.children[i]?.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'})};
 return <div className={`flex-carousel preset-${preset} intro-${intro}`} ref={ref} style={{'--gap':`${gap}px`,'--cardH':`${Math.max(0.35,cardHeight)*100}%`,'--squeeze':squeeze}}>
  {items.map((item,i)=><button className={`fc-card ${i===active?'active':''}`} key={item.src} onClick={()=>focusOnClick&&scrollTo(i)} aria-label={item.title}>
   <img src={item.src} alt={item.alt}/><span className="fc-shade"/>{captions&&<span className="fc-caption"><b>{item.title}</b>{item.subtitle&&<small>{item.subtitle}</small>}</span>}
  </button>)}
 </div>
}
