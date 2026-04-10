import { useState } from 'react';
import { MaybeLazy } from '../internal/lazy.js';
import { createForm } from './store.js';
import { type FormFields } from './types.js';

export interface UseFormOptions<Fields extends FormFields> {
  fields: MaybeLazy<Fields>;
}

export function useForm<Fields extends FormFields>({ fields: fieldsOpt }: UseFormOptions<Fields>) {
  const [fields] = useState(fieldsOpt);
  const [form] = useState(() => createForm(fields));
  return form;
}
