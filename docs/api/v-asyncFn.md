# v.asyncFn

Creates an asynchronous validator from a function that returns a `Promise`.

## Import

```ts
import { v } from 'formtery';
// use with `v.asyncFn`
```

## Signature

```ts
v.asyncFn<Input, Value>(
  validate: (input: Input, signal: AbortSignal) => Promise<ValidationResult<Value>>
): Lazy<Validator<Input, Value>>
```

## Parameters

| Parameter  | Type                                                                      | Description                                                                                                         |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `validate` | `(input: Input, signal: AbortSignal) => Promise<ValidationResult<Value>>` | Async validation function. The `signal` is aborted automatically when the user types again or `cancel()` is called. |

## Returns

`Lazy<Validator<Input, Value>>`

A function that returns a validator instance. You can pass it to `field()`.

## Notes

### Cancellation

Every call to `Field#validate()` creates a new `AbortController` and aborts the previous one. This means:

- If the user types before the previous request finishes, the old request is aborted and a new one starts.
- The `signal` is passed to you. Forward it to `fetch` or any other signal-aware API to actually cancel the in-flight
  work.

```ts
const checkUsername = v.asyncFn<string, string>(async (input, signal) => {
  const res = await fetch(`/api/check-username?q=${input}`, { signal });
  const { available } = await res.json();
  return available
    ? v.result.valid(input)
    : v.result.invalid('Username is already taken');
});
```

### Error Handling

If the async function throws and the request was **not** intentionally aborted, the error is caught and converted to
`v.result.invalid(error.message)`.

If the error was caused by an intentional abort (i.e. `signal.aborted` is `true`), the error is **re-thrown**. Since
`v.result` ignores rejected promises, your fields should not display an invalid state for a cancelled request.
