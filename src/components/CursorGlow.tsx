import { useEffect, useState } from 'react';

export const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300"
      style={{
        background: `radial-gradient(220px circle at ${position.x}px ${position.y}px, rgba(192, 132, 252, 0.16), transparent 60%)`,
      }}
    />
  );
};