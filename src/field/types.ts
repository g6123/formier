import { ReadonlyAtom } from '../atom/types.js';
import { ValidationResult } from '../validation/result.js';
import { ValidationTransaction } from '../validation/transaction.js';

export interface FieldStore<Input, Value = Input> {
  ref: React.Ref<FieldElement>;
  input: ReadonlyAtom<Input>;
  state: ReadonlyAtom<ValidationResult<Value>>;

  focus(): void;
  set(input: Input): void;
  reset(): void;
  validate(trx?: ValidationTransaction): ValidationResult<Value>;
}

export interface FieldElement {
  focus?(): void;
  scrollIntoView?(): void;
}
