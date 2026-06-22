import { useRef } from 'react';

// Mouse-tracking parallax removed for performance (pointermove on every frame).
// Returns a plain ref so call sites remain compatible.
export const useParallax = () => {
  return useRef<HTMLElement | null>(null);
};

export default useParallax;