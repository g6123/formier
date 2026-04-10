import { MaybeLazy } from '../internal/lazy.js';
import { skip } from '../validation/helpers.js';
import { INIT } from '../validation/result.js';
import { Validator } from '../validation/validator.js';
import { FieldStore } from './store.js';
import { Field } from './types.js';

export function field<Input, Value>(validator: MaybeLazy<Validator<Input, Value>>): Field<Input, Value>;
export function field<T extends {}>(defaultInput: T): Field<T, T>;
export function field<Input, Value>(
  defaultInput: Input,
  validator: MaybeLazy<Validator<Input, Value>>,
): Field<Input, Value>;
export function field(p0?: any, p1?: any): Field<any, any> {
  if (p1 != null) {
    return new FieldStore(p0, INIT, p1);
  }

  if (p0 != null) {
    if (typeof p0 === 'function') {
      return new FieldStore(null, INIT, p0);
    } else {
      return new FieldStore(p0, INIT, skip());
    }
  }

  return new FieldStore(null, INIT, skip());
}
