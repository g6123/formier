import { ReadonlyAtom } from '../internal/atom.js';
import { ValidationResult } from '../validation/result.js';

export interface Field<Input, Value> {
  ref: React.Ref<FieldElement>;
  input: ReadonlyAtom<Input>;
  state: ReadonlyAtom<ValidationResult<Value>>;

  focus(): void;
  set(input: Input): void;
  reset(): void;
  validate(): ValidationResult<Value>;
}

export interface FieldElement {
  focus?(): void;
  scrollIntoView?(): void;
}
