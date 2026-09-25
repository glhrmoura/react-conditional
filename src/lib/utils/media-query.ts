export type MediaBound = number | string;

export function toMediaBound(value: MediaBound): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export function buildMediaQuery(min?: MediaBound, max?: MediaBound): string {
  const parts: string[] = [];
  if (min !== undefined) {
    parts.push(`(min-width: ${toMediaBound(min)})`);
  }
  if (max !== undefined) {
    parts.push(`(max-width: ${toMediaBound(max)})`);
  }
  return parts.join(' and ') || 'all';
}

export function matchMediaQuery(query: string): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(query).matches;
}
