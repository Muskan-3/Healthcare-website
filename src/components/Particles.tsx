import { useEffect, useRef } from 'react';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const PARTICLE_COLORS = [
  { inner: 'rgba(192,132,252,0.78)', mid: 'rgba(168,85,247,0.48)' },
  { inner: 'rgba(139,61,255,0.72)', mid: 'rgba(139,61,255,0.45)' },
  { inner: 'rgba(245,197,66,0.86)', mid: 'rgba(255,216,107,0.52)' },
  { inner: 'rgba(255,255,255,0.72)', mid: 'rgba(255,255,255,0.35)' },
];

// Cap DPR at 1.5 — retina overkill costs 4× GPU fill rate for minimal visual gain
const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

export const Particles = ({ count = 84 }: { count?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    // Reduce count on small/low-end screens
    const effectiveCount = window.innerWidth < 768 ? Math.min(count, 28) : count;

    const resize = () => {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const particles = Array.from({ length: effectiveCount }).map(() => {
      const color = PARTICLE_COLORS[Math.floor(random(0, PARTICLE_COLORS.length))];
      return {
        x: random(0, canvas.clientWidth),
        y: random(0, canvas.clientHeight),
        r: random(0.6, 4.2),
        vx: random(-0.22, 0.22),
        vy: random(-0.06, -0.5),
        alpha: random(0.12, 0.68),
        inner: color.inner,
        mid: color.mid,
        glowScale: random(4.4, 8.6),
      };
    });

    const draw = () => {
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = canvas.clientWidth + 10;
        if (p.x > canvas.clientWidth + 10) p.x = -10;
        if (p.y < -20) p.y = canvas.clientHeight + 20;

        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * p.glowScale);
        g.addColorStop(0, p.inner.replace(/\d?\.?\d+\)$/, `${p.alpha})`));
        g.addColorStop(0.36, p.mid.replace(/\d?\.?\d+\)$/, `${p.alpha * 0.72})`));
        g.addColorStop(1, 'rgba(8,3,27,0)');
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * p.glowScale, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    // Pause animation when tab is hidden — zero GPU cost when invisible
    const onVisibility = () => { pausedRef.current = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full -z-10" />;
};

export default Particles;