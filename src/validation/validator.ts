import { ValidationResult } from './result.js';
import { ValidationTransaction } from './transaction.js';

export interface Validator<Input, Value> {
  validate: (input: Input, trx: ValidationTransaction) => ValidationResult<Value>;
  cancel?: () => void;
}
