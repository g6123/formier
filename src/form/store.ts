import type React from 'react';
import { mapValues } from '../internal/misc.js';
import { ValidationResult } from '../validation/result.js';
import { ValidationTransaction } from '../validation/transaction.js';
import type { Form, FormFields, FormValues } from './types.js';

export const createForm = <Fields extends FormFields>(fields: Fields): Form<Fields> => {
  function validate() {
    const trx: ValidationTransaction = { shouldFocus: true };
    const results = mapValues(fields, (field) => field.validate(trx));
    return ValidationResult.all(results) as ValidationResult<FormValues<Fields>>;
  }

  function reset() {
    for (const field of Object.values(fields)) {
      field.reset();
    }
  }

  function handleSubmit(onValid?: (values: FormValues<Fields>) => void) {
    return (event: React.SyntheticEvent) => {
      validate().tap(onValid);
      event.preventDefault();
    };
  }

  return { fields, validate, reset, handleSubmit };
};
