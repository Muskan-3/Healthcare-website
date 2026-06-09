import { useEffect, useRef } from 'react';

export const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (event: PointerEvent) => {
      el.style.setProperty('--cursor-x', `${event.clientX}px`);
      el.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `radial-gradient(220px circle at var(--cursor-x, -999px) var(--cursor-y, -999px), rgba(192, 132, 252, 0.16), transparent 60%)`,
      }}
    />
  );
};