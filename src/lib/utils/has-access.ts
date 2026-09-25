export type AccessMode = 'every' | 'some';

export function toAccessList(value?: string | readonly string[]): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? [...value] : [value];
}

export function hasAccess(
  needed: readonly string[],
  available: readonly string[],
  mode: AccessMode = 'every'
): boolean {
  if (needed.length === 0) return true;
  if (mode === 'some') {
    return needed.some((item) => available.includes(item));
  }
  return needed.every((item) => available.includes(item));
}
