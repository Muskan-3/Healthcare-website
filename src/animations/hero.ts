import gsap from 'gsap';

export function initHeroAnimations(container: HTMLElement | null) {
  if (!container) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    tl.to('.hero-blob .rim', { scale: 1.02, duration: 3.6, repeat: -1, yoyo: true }, 0);
    tl.to('.hero-blob .rim-glow', { opacity: 0.28, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' }, 0);
    tl.to('.parallax-layer', { x: '6px', y: '-6px', duration: 5, repeat: -1, yoyo: true }, 0.05);
    tl.to('.parallax-layer-2', { x: '10px', y: '-12px', duration: 5.6, repeat: -1, yoyo: true }, 0.05);

    // subtle pulse on image
    gsap.to('.hero-image', { scale: 1.01, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // small entrance stagger for feature cards
    gsap.from('.glass', { opacity: 0, y: 18, stagger: 0.08, duration: 0.7, ease: 'power2.out' });

    return () => {
      tl.kill();
      gsap.killTweensOf('.hero-blob .rim');
    };
  }, container);

  return () => ctx.revert();
}

export default initHeroAnimations;