import { useSyncExternalStore } from 'use-sync-external-store';
import { ReadonlyAtom } from './types.js';

export function useAtomValue<T>(atom: ReadonlyAtom<T>): T {
  return useSyncExternalStore(atom.subscribe, atom.get);
}
