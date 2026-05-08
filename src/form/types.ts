import React from 'react';
import type { FieldStore } from '../field/types.js';
import { ValidationResult } from '../validation/result.js';

export type FormFields = Record<string, FieldStore<unknown, unknown>>;

export type FormValues<Fields extends FormFields> = {
  [key in keyof Fields]: Fields[key] extends FieldStore<any, infer Value> ? Value : never;
};

export interface FormStore<Fields extends FormFields> {
  fields: Fields;
  validate(): ValidationResult<FormValues<Fields>>;
  reset(): void;
  handleSubmit(onValid?: (values: FormValues<Fields>) => void): (event: React.SyntheticEvent) => void;
}
