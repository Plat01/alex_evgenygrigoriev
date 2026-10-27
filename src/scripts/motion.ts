import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMotion(): () => void {
  const scope = document.querySelector('main');
  if (!scope) return () => {};
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({ defaults: { duration: 0.85, ease: 'expo.out' } })
      .from('.intro-copy > *', { y: 24, opacity: 0, stagger: 0.08 })
      .from('.hero-media', { y: 32, opacity: 0 }, 0.15);
    gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.intro', start: 'top top', end: 'bottom top', scrub: 0.4, invalidateOnRefresh: true },
    }).to('.hero-media img', { yPercent: 8, scale: 1.04 }, 0)
      .to('.intro-copy', { y: -28 }, 0);
    gsap.from('.source-image', {
      y: 32, duration: 0.9, ease: 'expo.out',
      scrollTrigger: { trigger: '.source', start: 'top 85%', once: true },
    });
  }, scope);
  let disposed = false;
  const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
  void Promise.all([
    document.fonts.ready,
    ...Array.from(scope.querySelectorAll('img')).map(img => img.decode().catch(() => {})),
  ]).then(refresh);
  const cleanup = () => { disposed = true; media.revert(); };
  document.addEventListener('astro:before-swap', cleanup, { once: true });
  if (import.meta.hot) import.meta.hot.dispose(cleanup);
  return cleanup;
}
