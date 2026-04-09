import { getErrorMessage } from '../internal/misc.js';
import { ValidationResult } from './result.js';
import { Validator } from './validator.js';

export const fn = <Input, Value>(validate: (input: Input) => ValidationResult<Value>): Validator<Input, Value> => ({
  validate: (input) => {
    try {
      return validate(input);
    } catch (error) {
      return ValidationResult.invalid(getErrorMessage(error));
    }
  },
});

export const asyncFn = <Input, Value>(
  validate: (input: Input, signal: AbortSignal) => Promise<ValidationResult<Value>>,
): Validator<Input, Value> => {
  let controller: AbortController | null = null;

  return {
    validate: (input) => {
      if (controller != null) {
        controller.abort();
      }

      const { signal } = (controller = new AbortController());
      const promise = validate(input, signal).catch((error) => {
        if (signal.aborted) {
          throw error;
        }

        return ValidationResult.invalid(getErrorMessage(error));
      });
      return ValidationResult.pending(promise);
    },
    cancel: () => {
      if (controller != null) {
        controller.abort();
        controller = null;
      }
    },
  };
};

export const skip = <T>(): Validator<T, T> => ({
  validate: (input) => ValidationResult.valid(input),
});

export const required = <T extends {}>(message?: string): Validator<T | null, T> => ({
  validate: (input) => (input != null ? ValidationResult.valid(input) : ValidationResult.invalid(message)),
});

export const nonEmpty = (message?: string): Validator<string, string> => ({
  validate: (input) => (input !== '' ? ValidationResult.valid(input) : ValidationResult.invalid(message)),
});
