import type React from 'react';
import { useField, type UseFieldResult } from './hooks.js';
import type { Field } from './types.js';

export interface FieldProps<Input, Value> {
  ref?: React.Ref<any>;
  store: Field<Input, Value>;
  children: (props: UseFieldResult<Input, Value>) => React.ReactNode;
}

export function Field<Input, Value>({ ref, store, children }: FieldProps<Input, Value>) {
  return children(useField(store, ref));
}
