import { useEffect, useRef } from 'react';

export const useParallax = () => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - (rect.left + rect.width / 2)) / rect.width; // -0.5 .. 0.5
      const my = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      el.style.setProperty('--mx', String(mx));
      el.style.setProperty('--my', String(my));
    };

    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  return ref;
};

export default useParallax;