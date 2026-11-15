import React from 'react';
import './TextLoop.css';
export default function TextLoop({text,shape='wave',speed=90,direction='forward',separator='✦',curviness=90,tilt=0,fontSize=46,fontWeight=800,letterSpacing=2,uppercase,ribbon,ribbonColor='#5227FF',ribbonWidth=86,edgeFade=0,cross=false,crossAngle=16,draggable=false,scrollBoost=0,outline=false,pauseOnHover}){
 const content=uppercase?text.toUpperCase():text; const repeated=Array.from({length:8},(_,i)=><React.Fragment key={i}><span>{content}</span><b>{separator}</b></React.Fragment>);
 return <div className={`text-loop ${pauseOnHover?'pause-hover':''}`} style={{'--speed':`${speed}s`,'--fontSize':`${fontSize}px`,'--weight':fontWeight,'--spacing':`${letterSpacing}px`,'--tilt':`${tilt}deg`,'--curve':`${curviness}px`,'--ribbon':ribbonColor,'--width':`${ribbonWidth}%`}}><div className="tl-ribbon">{repeated}</div></div>
}
