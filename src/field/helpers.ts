import { MaybeLazy } from '../internal/lazy.js';
import { skip } from '../validation/helpers.js';
import { INIT } from '../validation/result.js';
import { Validator } from '../validation/validator.js';
import { FieldStoreImpl } from './store.js';
import { FieldStore } from './types.js';

export function field<Input, Value>(validator: MaybeLazy<Validator<Input, Value>>): FieldStore<Input, Value>;
export function field<T extends {}>(defaultInput: T): FieldStore<T, T>;
export function field<Input, Value>(
  defaultInput: Input,
  validator: MaybeLazy<Validator<Input, Value>>,
): FieldStore<Input, Value>;
export function field(p0?: any, p1?: any): FieldStore<any, any> {
  if (p1 != null) {
    return new FieldStoreImpl(p0, INIT, p1);
  }

  if (p0 != null) {
    if (typeof p0 === 'function') {
      return new FieldStoreImpl(null, INIT, p0);
    } else {
      return new FieldStoreImpl(p0, INIT, skip());
    }
  }

  return new FieldStoreImpl(null, INIT, skip());
}
