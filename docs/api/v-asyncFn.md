# v.asyncFn

Creates a custom validator from an asynchronous function that returns a `Promise`.

```ts
import { v } from 'formtery';
```

```ts
interface AsyncValidateOptions {
  trx: v.Transaction;
  signal: AbortSignal;
}

v.asyncFn<Input, Value>(
  validate: (input: Input, options: AsyncValidateOptions) => Promise<ValidationResult<Value>>
): Lazy<Validator<Input, Value>>
```

## Params

- `validate` The validation implementation.
  - `input` The user input to validate.
  - `options.trx` The transaction object that represents a series of validations.
  - `options.signal` The [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) instance. See the
    note on [cancellation](#cancellation) below.
  - Returns: The promise resolves to validation result. `v.result.valid(value)` on success or
    `v.result.invalid(message)` on failure.

## Returns

A lazy validator instance. You should pass this instance to `field()` factory in most cases.

## Notes

### Cancellation

Every mutation on a field input creates a new `AbortSignal` and aborts the previous one. This means:

- If the user types before the previous request finishes, the old request is aborted.
- The `signal` is passed to you. Forward it to `fetch` or any other signal-aware API to actually cancel the in-flight
  work.

```ts
const checkUsername = v.asyncFn<string, string>(async (input, { signal }) => {
  const res = await fetch(`/api/check-username?q=${input}`, { signal });
  const { available } = await res.json();
  return available ? v.result.valid(input) : v.result.invalid('Username is already taken');
});
```

### Error Handling

If the async function throws **not** because of a cancellation, the error is caught and converted to
`v.result.invalid(error.message)`.

If the error was caused by a cancellation, the error is **re-thrown**. Since `v.result` ignores rejected promises, your
fields should not display an invalid state for a cancelled request.
