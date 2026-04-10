import { useSyncExternalStore } from 'use-sync-external-store';

interface ReadonlyAtom<T> {
  get: () => T;
  subscribe: (callback: AtomCallback) => () => void;
}

interface Atom<T> extends ReadonlyAtom<T> {
  set: (nextState: T) => void;
}

type AtomCallback = () => void;

function atom<T>(initalState: T): Atom<T> {
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

function useAtomValue<T>(atom: ReadonlyAtom<T>): T {
  return useSyncExternalStore(atom.subscribe, atom.get);
}

export { type Atom, atom, type ReadonlyAtom, useAtomValue };
