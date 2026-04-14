import { Lazy } from '../internal/lazy.js';
import { getErrorMessage } from '../internal/misc.js';
import { ValidationResult } from './result.js';
import { ValidationTransaction } from './transaction.js';
import { Validator } from './validator.js';

interface ValidateOptions {
  trx: ValidationTransaction;
}

export const fn = <Input, Value>(
  validate: (input: Input, options: ValidateOptions) => ValidationResult<Value>,
): Validator<Input, Value> => ({
  validate: (input, trx) => {
    try {
      return validate(input, { trx });
    } catch (error) {
      return ValidationResult.invalid(getErrorMessage(error));
    }
  },
});

interface AsyncValidateOptions extends ValidateOptions {
  signal: AbortSignal;
}

export const asyncFn = <Input, Value>(
  validate: (input: Input, options: AsyncValidateOptions) => Promise<ValidationResult<Value>>,
): Lazy<Validator<Input, Value>> => {
  return () => {
    let controller: AbortController | null = null;

    return {
      validate: (input, trx) => {
        if (controller != null) {
          controller.abort();
        }

        const { signal } = (controller = new AbortController());
        const promise = validate(input, { trx, signal }).catch((error) => {
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
