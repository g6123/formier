import type React from 'react';
import { ValidationResult } from '../validation/result.js';
import type { Form, FormFields, FormValues } from './types.js';

export const createForm = <Fields extends FormFields>(fields: Fields): Form<Fields> => {
  function validate() {
    const fieldEntries = Object.entries(fields);
    const resultEntries = fieldEntries.map(([key, field]) => [key, field.validate()] as const);

    Promise.all(resultEntries.map(([, result]) => result.toPromise())).then((resolvedStates) => {
      for (let i = 0; i < resolvedStates.length; i++) {
        const resolvedState = resolvedStates[i]!;
        const [, field] = fieldEntries[i]!;

        if (!resolvedState.ok) {
          field.focus();
          break;
        }
      }
    });

    return ValidationResult.all(Object.fromEntries(resultEntries)) as ValidationResult<FormValues<Fields>>;
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
