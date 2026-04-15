# v.fn

Creates a custom validator from a plain synchronous function.

```ts
import { v } from 'formtery';
```

```ts
interface ValidateOptions {
  trx: v.Transaction;
}

v.fn<Input, Value>(
  validate: (input: Input, options: ValidateOptions) => v.result<Value>
): Validator<Input, Value>
```

## Params

- `validate` The validation implementation.
  - `input` The user input to validate.
  - `options.trx` The transaction object that represents a series of validations. See the note on
    [Nested Validations](#nested-validations) below.
  - Returns: The validation result. `v.result.valid(value)` on success or `v.result.invalid(message)` on failure.

## Returns

A validator instance. You should pass this instance to `field()` factory in most cases.

## Notes

### Error Handling

If the `validate` function throws, `v.fn` catches the error and returns `v.result.invalid(error.message)`.

### Nested Validations

All validations triggered by the same user action (e.g. a form submit) should share the same transaction object. If your
`validate` function triggers another validation, then you should pass the `options.trx` object to all subsequent
validations.

For example, if you have two nested fields `foo` and `bar` in `Input`:

```ts {11,13,14}
interface Input {
  foo: Field<string, string>;
  bar: Field<number, number>;
}

interface Value {
  foo: string;
  bar: number;
}

v.fn<Input, Value>((input, { trx }) => {
  return v.result.all({
    foo: input.foo.validate(trx),
    bar: input.bar.validate(trx),
  });
});
```
