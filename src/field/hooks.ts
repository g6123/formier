import React, { useCallback } from 'react';
import { useMergeRefs } from 'react-merge-refs';
import { useAtomValue } from '../atom/hooks.js';
import { isFunction } from '../internal/misc.js';
import { ValidationResult } from '../validation/result.js';
import { FieldStore } from './types.js';

export interface UseFieldResult<Input, Value> {
  ref: React.Ref<any>;
  value: Input;
  state: ValidationResult<Value>;
  setValue: (value: React.SetStateAction<Input>) => void;
}

export function useField<Input, Value>(
  store: FieldStore<Input, Value>,
  ref?: React.Ref<any>,
): UseFieldResult<Input, Value> {
  const mergedRef = useMergeRefs([ref, store.ref]);
  const value = useAtomValue(store.input);
  const state = useAtomValue(store.state);

  const setValue = useCallback(
    (action: React.SetStateAction<Input>) => {
      if (isFunction(action)) {
        store.set(action(store.input.get()));
      } else {
        store.set(action);
      }
    },
    [store],
  );

  return { ref: mergedRef, value, state, setValue };
}
