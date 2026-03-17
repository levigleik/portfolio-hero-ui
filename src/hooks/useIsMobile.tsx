import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 768) {
  const getMatches = () =>
    typeof window !== 'undefined'
      ? window.matchMedia(`(max-width: ${breakpoint}px)`).matches
      : false;

  const [isMobile, setIsMobile] = useState(getMatches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = () => setIsMobile(mediaQuery.matches);

    handler();
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}