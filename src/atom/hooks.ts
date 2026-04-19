import React, { useCallback } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { isFunction } from '../internal/misc.js';
import { Atom, ReadonlyAtom } from './types.js';

export function useAtomValue<T>(atom: ReadonlyAtom<T>): T {
  return useSyncExternalStore(atom.subscribe, atom.get);
}

export function useSetAtom<T>(atom: Atom<T>): React.Dispatch<React.SetStateAction<T>> {
  return useCallback(
    (action: React.SetStateAction<T>) => {
      if (isFunction(action)) {
        atom.set(action(atom.get()));
      } else {
        atom.set(action);
      }
    },
    [atom],
  );
}

export function useAtom<T>(atom: Atom<T>) {
  return [useAtomValue(atom), useSetAtom(atom)] as const;
}
