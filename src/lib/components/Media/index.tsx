import React, { ReactNode, useEffect, useState } from 'react';
import { MediaBound, buildMediaQuery, matchMediaQuery } from '@/lib/utils/media-query';
import { renderResolved } from '@/lib/utils/render-resolved';

export interface MediaProps {
  min?: MediaBound;
  max?: MediaBound;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

function useMediaMatch(min?: MediaBound, max?: MediaBound): boolean {
  const query = buildMediaQuery(min, max);
  const [matches, setMatches] = useState(() => matchMediaQuery(query));

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }
    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, [query]);

  return matches;
}

const Media: React.FC<MediaProps> = ({ min, max, children, fallback, asChild }) => {
  const matches = useMediaMatch(min, max);
  if (matches) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

export { Media, useMediaMatch };
