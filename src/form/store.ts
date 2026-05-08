import type React from 'react';
import { mapValues } from '../internal/misc.js';
import { ValidationResult } from '../validation/result.js';
import { ValidationTransaction } from '../validation/transaction.js';
import type { FormFields, FormStore, FormValues } from './types.js';

export class FormStoreImpl<Fields extends FormFields> implements FormStore<Fields> {
  fields: Fields;

  constructor(fields: Fields) {
    this.fields = fields;
  }

  validate() {
    const trx: ValidationTransaction = { shouldFocus: true };
    const results = mapValues(this.fields, (field) => field.validate(trx));
    return ValidationResult.all(results) as ValidationResult<FormValues<Fields>>;
  }

  reset() {
    for (const field of Object.values(this.fields)) {
      field.reset();
    }
  }

  handleSubmit(onValid?: (values: FormValues<Fields>) => void) {
    return (event: React.SyntheticEvent) => {
      this.validate().tap(onValid);
      event.preventDefault();
    };
  }
}
