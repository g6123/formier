const EMPTY = Symbol();

interface ValidationResultOptions {
  cause?: ValidationResult<unknown>;
}

export class ValidationResult<T> {
  ok: boolean;
  message?: string;
  cause?: ValidationResult<unknown>;
  isPending: boolean;

  private value: T | typeof EMPTY;
  private promise?: Promise<ValidationResult<T>>;

  constructor(
    ok: boolean,
    value: T | typeof EMPTY,
    promise?: Promise<ValidationResult<T>>,
    message?: string,
    cause?: ValidationResult<unknown>,
  ) {
    this.ok = ok;
    this.value = value;
    this.promise = promise;
    this.message = message;
    this.cause = cause;
    this.isPending = promise != null;
  }

  unwrap() {
    if (this.value === EMPTY) {
      throw new Error('value is empty');
    }

    return this.value;
  }

  map<U>(fn: (value: T) => U): ValidationResult<U> {
    if (this.promise != null) {
      return new ValidationResult<U>(
        true,
        EMPTY,
        this.promise.then((resolvedState) => resolvedState.map(fn)),
      );
    } else if (this.value !== EMPTY) {
      return new ValidationResult<U>(true, fn(this.value));
    } else {
      return new ValidationResult<U>(this.ok, EMPTY, undefined, this.message, this.cause);
    }
  }

  flatMap<U>(fn: (value: T) => ValidationResult<U>): ValidationResult<U> {
    if (this.promise != null) {
      return new ValidationResult<U>(
        true,
        EMPTY,
        this.promise.then((resolved) => resolved.flatMap(fn)),
      );
    } else if (this.value !== EMPTY) {
      return fn(this.value);
    } else {
      return new ValidationResult<U>(this.ok, EMPTY, undefined, this.message, this.cause);
    }
  }

  tap(onValid?: (value: T) => void, onInvalid?: (message?: string) => void) {
    if (this.promise != null) {
      this.promise.then((v) => v.tap(onValid, onInvalid));
    } else if (this.ok) {
      onValid?.(this.unwrap());
    } else {
      onInvalid?.(this.message);
    }
    return this;
  }

  subscribe(callback: (result: ValidationResult<T>) => void) {
    callback(this);
    this.promise?.then(callback);
    return this;
  }

  toPromise() {
    return this.promise ?? Promise.resolve(this);
  }

  static valid<T>(value: T, options?: ValidationResultOptions) {
    return new ValidationResult<T>(true, value, undefined, undefined, options?.cause);
  }

  static invalid(message?: string, options?: ValidationResultOptions) {
    return new ValidationResult<never>(false, EMPTY, undefined, message, options?.cause);
  }

  static pending<T>(promise: Promise<ValidationResult<T>>, options?: ValidationResultOptions) {
    return new ValidationResult(true, EMPTY, promise, undefined, options?.cause);
  }

  static all<O extends Record<string, ValidationResult<unknown>>>(
    object: O,
  ): ValidationResult<{
    [key in keyof O]: O[key] extends ValidationResult<infer T> ? T : never;
  }>;
  static all<T>(array: Array<ValidationResult<T>>): ValidationResult<Array<T>>;
  static all(input: {}) {
    if (Array.isArray(input)) {
      return this.allElements(input);
    } else {
      return this.allValues(input);
    }
  }

  private static allElements(array: ValidationResult<unknown>[]): ValidationResult<unknown[]> {
    if (array.some((result) => result.isPending)) {
      return this.pending(Promise.all(array.map((state) => state.toPromise())).then(this.allElements));
    }

    const invalid = array.find((result) => !result.ok);
    if (invalid != null) {
      return this.invalid(undefined, { cause: invalid });
    }

    return this.valid(array.map((result) => result.unwrap()));
  }

  private static allValues(
    object: Record<string, ValidationResult<unknown>>,
  ): ValidationResult<Record<string, unknown>> {
    const entries = Object.entries(object);

    if (entries.some(([, result]) => result.isPending)) {
      return this.pending(
        Promise.all(
          entries.map(([key, result]) =>
            result.toPromise().then((resolvedResult): [string, ValidationResult<unknown>] => [key, resolvedResult]),
          ),
        ).then((resolvedEntries) => {
          return this.allValues(Object.fromEntries(resolvedEntries));
        }),
      );
    }

    const invalid = entries.find(([, result]) => !result.ok);
    if (invalid != null) {
      return this.invalid(undefined, { cause: invalid[1] });
    }

    return this.valid(Object.fromEntries(entries.map(([key, result]) => [key, result.unwrap()])));
  }
}

export const INIT = new ValidationResult<never>(true, EMPTY);
