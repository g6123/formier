import type React from 'react';
import { useField, type UseFieldResult } from './hooks.js';
import type { Field } from './types.js';

export interface ControllerProps<Input, Value> {
  ref?: React.Ref<any>;
  store: Field<Input, Value>;
  render: (props: UseFieldResult<Input, Value>) => React.ReactNode;
}

export function Controller<Input, Value>({ ref, store, render }: ControllerProps<Input, Value>) {
  return render(useField(store, ref));
}
