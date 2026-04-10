import { useState } from 'react';
import { FormStore } from './store.js';
import { MaybeLazy } from '../internal/lazy.js';
import { type FormFields } from './types.js';

export interface UseFormOptions<Fields extends FormFields> {
  fields: MaybeLazy<Fields>;
}

export function useForm<FieldsT extends FormFields>({ fields: fieldsOpt }: UseFormOptions<FieldsT>) {
  const [fields] = useState(() => (typeof fieldsOpt === 'function' ? fieldsOpt() : fieldsOpt));
  const [form] = useState(() => new FormStore(fields));
  return form;
}
