import { FormStore } from './store.js';
import type { FormFields } from './types.js';

export function form<FieldsT extends FormFields>(fields: FieldsT) {
  return new FormStore(fields);
}
