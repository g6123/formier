export interface ReadonlyAtom<T> {
  get: () => T;
  subscribe: (callback: AtomCallback) => () => void;
}

export interface Atom<T> extends ReadonlyAtom<T> {
  set: (nextState: T) => void;
}

export type AtomCallback = () => void;
