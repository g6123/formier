import { useAtomValue } from './hooks.js';
import { ReadonlyAtom } from './types.js';

export interface ReadProps<T> {
  store: ReadonlyAtom<T>;
  children: (value: T) => React.ReactNode;
}

export function Read<T>({ store, children }: ReadProps<T>) {
  const value = useAtomValue(store);
  return children(value);
}
