import React, { useCallback } from 'react';
import { useMergeRefs } from 'react-merge-refs';
import { useAtomValue } from '../internal/atom.js';
import { isFunction } from '../internal/misc.js';
import { ValidationResult } from '../validation/result.js';
import { Field } from './types.js';

export interface UseFieldResult<Input, Value> {
  ref: React.Ref<any>;
  value: Input;
  state: ValidationResult<Value>;
  setValue: (value: React.SetStateAction<Input>) => void;
}

export function useField<Input, Value>(field: Field<Input, Value>, ref?: React.Ref<any>): UseFieldResult<Input, Value> {
  const mergedRef = useMergeRefs([ref, field.ref]);
  const value = useAtomValue(field.input);
  const state = useAtomValue(field.state);

  const setValue = useCallback(
    (action: React.SetStateAction<Input>) => {
      if (isFunction(action)) {
        field.set(action(field.input.get()));
      } else {
        field.set(action);
      }
    },
    [field],
  );

  return { ref: mergedRef, value, state, setValue };
}

export function useFieldInput<InputT, ValueT>(store: Field<InputT, ValueT>): InputT {
  return useAtomValue(store.input);
}
