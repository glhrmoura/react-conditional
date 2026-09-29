import { useEffect, useRef, useState } from 'react';

export function useDelay(condition: boolean, ms: number, msOut = 0): boolean {
  const [deferred, setDeferred] = useState(() => (ms <= 0 ? condition : false));

  useEffect(() => {
    const wait = condition ? ms : msOut;
    if (wait <= 0) {
      setDeferred(condition);
      return;
    }
    const id = window.setTimeout(() => setDeferred(condition), wait);
    return () => window.clearTimeout(id);
  }, [condition, ms, msOut]);

  return deferred;
}

export function useDebounce(condition: boolean, ms: number): boolean {
  const [deferred, setDeferred] = useState(condition);

  useEffect(() => {
    if (ms <= 0) {
      setDeferred(condition);
      return;
    }
    const id = window.setTimeout(() => setDeferred(condition), ms);
    return () => window.clearTimeout(id);
  }, [condition, ms]);

  return deferred;
}

export function useThrottle(condition: boolean, ms: number): boolean {
  const [throttled, setThrottled] = useState(condition);
  const lastRan = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (ms <= 0) {
      setThrottled(condition);
      return;
    }
    const remaining = ms - (Date.now() - lastRan.current);
    if (remaining <= 0) {
      if (timeout.current != null) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
      lastRan.current = Date.now();
      setThrottled(condition);
      return;
    }
    if (timeout.current != null) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      lastRan.current = Date.now();
      setThrottled(condition);
      timeout.current = null;
    }, remaining);
    return () => {
      if (timeout.current != null) {
        clearTimeout(timeout.current);
      }
    };
  }, [condition, ms]);

  return throttled;
}
