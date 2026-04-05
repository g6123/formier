import type React from 'react';
import { ValidationResult } from '../validation/result.js';
import type { Form, FormFields, FormValues } from './types.js';

export class FormStore<Fields extends FormFields> implements Form<Fields> {
  fields: Fields;

  constructor(fields: Fields) {
    this.fields = fields;
  }

  validate() {
    const fields = Object.entries(this.fields);
    const results = fields.map(([key, field]) => [key, field.validate()] as const);

    Promise.all(results.map(([, result]) => result.toPromise())).then((resolvedStates) => {
      for (let i = 0; i < resolvedStates.length; i++) {
        const resolvedState = resolvedStates[i]!;
        const [, field] = fields[i]!;

        if (!resolvedState.ok) {
          field.focus();
          break;
        }
      }
    });

    return ValidationResult.all(Object.fromEntries(results)) as ValidationResult<FormValues<Fields>>;
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
