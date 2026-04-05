import { ValidationResult } from './result.js';

export interface Validator<Input, Value> {
  validate: (input: Input) => ValidationResult<Value>;
  cancel?: () => void;
}
