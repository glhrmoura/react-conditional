export function warnDev(message: string): void {
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') {
    return;
  }
  console.warn(`[react-conditional] ${message}`);
}
