import { useAtomValue } from './hooks.js';
import { Atom } from './types.js';

export interface ReadProps<T> {
  store: Atom<T>;
  children: (value: T) => React.ReactNode;
}

export function Read<T>({ store, children }: ReadProps<T>) {
  const value = useAtomValue(store);
  return children(value);
}
