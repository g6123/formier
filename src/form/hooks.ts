import { useState } from 'react';
import { MaybeLazy } from '../internal/lazy.js';
import { FormStoreImpl } from './store.js';
import { type FormFields, FormStore } from './types.js';

export interface UseFormOptions<Fields extends FormFields> {
  fields: MaybeLazy<Fields>;
}

export function useForm<Fields extends FormFields>({ fields: fieldsOpt }: UseFormOptions<Fields>): FormStore<Fields> {
  const [fields] = useState(fieldsOpt);
  const [form] = useState(() => new FormStoreImpl(fields));
  return form;
}
