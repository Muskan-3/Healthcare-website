import { useState, useEffect } from 'react';

/**
 * Minimal client-side routing hook.
 * Reads window.location.pathname and re-renders on popstate events
 * (browser back/forward) as well as programmatic pushState calls.
 */
export const useRoute = (): string => {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return path;
};

/**
 * Navigate to a path using the History API.
 * Use this instead of window.location.href to avoid a full page reload.
 */
export const navigate = (to: string): void => {
  window.history.pushState(null, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
};
