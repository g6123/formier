import type { Field } from '../field/types.js';
import { ValidationResult } from '../validation/result.js';

export type FormFields = Record<string, Field<unknown, unknown>>;

export type FormValues<Fields extends FormFields> = {
  [key in keyof Fields]: Fields[key] extends Field<any, infer Value> ? Value : never;
};

export interface Form<Fields extends FormFields> {
  fields: Fields;
  validate(): ValidationResult<FormValues<Fields>>;
  reset(): void;
  handleSubmit(onValid?: (values: FormValues<Fields>) => void): void;
}
