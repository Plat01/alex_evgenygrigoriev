import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initMotion(): () => void {
 const scope = document.querySelector('main');
 if (!scope) return () => {};
 const media = gsap.matchMedia();
 media.add({ desktop:'(min-width: 761px)', mobile:'(max-width: 760px)', motion:'(prefers-reduced-motion: no-preference)' }, context => {
  if (!context.conditions?.motion) return;
  const desktop = context.conditions.desktop;
  // Text always remains readable, including if a later animation fails.
  gsap.timeline({defaults:{duration:1.2,ease:'expo.out'}})
   .from('.hero-copy h1',{y:26},0)
   .from('.hero-role, .hero-message, .hero-copy .button',{y:18,stagger:.09},.1)
   .from('.hero-art',{scale:1.035,duration:1.8},0);
  gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6},defaults:{ease:'none'}})
   .to('.hero-art',{y:desktop?85:30,scale:desktop?1.05:1.015},0)
   .to('.hero-copy',{y:desktop?-55:-12},0);
  gsap.to('.direction-orbit',{rotation:-12,ease:'none',scrollTrigger:{trigger:'.directions',start:'top bottom',end:'bottom top',scrub:.7}});
  gsap.timeline({scrollTrigger:{trigger:'.approach',start:desktop?'top top':'top 50%',end:desktop?'+=45%':'bottom bottom',pin:desktop?'.approach-stage':false,scrub:.7,invalidateOnRefresh:true},defaults:{ease:'none'}})
   .fromTo('.system-layer',{y:desktop?45:12},{y:desktop?-35:-12},0)
   .fromTo('.thinker-layer',{x:desktop?28:8,y:15},{x:desktop?-22:-6,y:-8},0)
   .fromTo('.foreground-block',{y:50},{y:-50},0);
  gsap.from('.meeting-mark',{y:65,rotation:9,ease:'none',scrollTrigger:{trigger:'.meeting',start:'top bottom',end:'bottom bottom',scrub:.8}});
 },scope);
 let disposed=false;
 const refresh=()=>{if(!disposed) ScrollTrigger.refresh();};
 void document.fonts.ready.then(refresh);
 const images=Array.from(scope.querySelectorAll('img'));
 images.forEach(img=>img.addEventListener('load',refresh,{once:true}));
 void Promise.all(images.filter(img=>img.loading!=='lazy').map(img=>img.decode().catch(()=>{}))).then(refresh);
 const cleanup=()=>{disposed=true;media.revert();images.forEach(img=>img.removeEventListener('load',refresh));};
 document.addEventListener('astro:before-swap',cleanup,{once:true});
 if(import.meta.hot) import.meta.hot.dispose(cleanup);
 return cleanup;
}
