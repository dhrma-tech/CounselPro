"use client";

import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => serverValue);
}

const sessionListeners = new Set<() => void>();

/** A boolean flag in sessionStorage that re-renders subscribers when it changes. */
export function useSessionFlag(key: string, serverValue: boolean): [boolean, () => void] {
  const subscribe = useCallback((onChange: () => void) => {
    sessionListeners.add(onChange);
    return () => { sessionListeners.delete(onChange); };
  }, []);
  const read = () => {
    try {
      return sessionStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  };
  const value = useSyncExternalStore(subscribe, read, () => serverValue);
  const set = useCallback(() => {
    try { sessionStorage.setItem(key, '1'); } catch { /* storage unavailable */ }
    sessionListeners.forEach((l) => l());
  }, [key]);
  return [value, set];
}
