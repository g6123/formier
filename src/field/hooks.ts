import React, { useCallback } from 'react';
import { useMergeRefs } from 'react-merge-refs';
import { useAtomValue } from '../internal/atom.js';
import { ValidationResult } from '../validation/result.js';
import { Field } from './types.js';

export interface UseFieldResult<Input, Value> {
  ref: React.Ref<any>;
  value: Input;
  state: ValidationResult<Value>;
  handleChange: (value: Input) => void;
}

export function useField<Input, Value>(field: Field<Input, Value>, ref?: React.Ref<any>): UseFieldResult<Input, Value> {
  const mergedRef = useMergeRefs([ref, field.ref]);
  const value = useAtomValue(field.input);
  const state = useAtomValue(field.state);

  const handleChange = useCallback(
    (nextValue: Input) => {
      field.set(nextValue);
    },
    [field],
  );

  return { ref: mergedRef, value, state, handleChange };
}

export function useFieldInput<InputT, ValueT>(store: Field<InputT, ValueT>): InputT {
  return useAtomValue(store.input);
}
