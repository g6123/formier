import { Atom, AtomCallback } from './types.js';

export function atom<T>(initalState: T): Atom<T> {
  let state = initalState;
  const callbacks = new Set<AtomCallback>();

  return {
    get: () => state,
    set: (nextState) => {
      state = nextState;
      callbacks.forEach((callback) => callback());
    },
    subscribe: (callback) => {
      callbacks.add(callback);
      return () => callbacks.delete(callback);
    },
  };
}
