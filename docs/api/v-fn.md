# v.fn

Creates a synchronous validator from a plain function.

## Import

```ts
import { v } from 'formtery';
// use with `v.fn`
```

## Signature

```ts
v.fn<Input, Value>(
  validate: (input: Input) => v.result<Value>
): Validator<Input, Value>
```

## Parameters

| Parameter  | Type                                | Description                                                                                                   |
| ---------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `validate` | `(input: Input) => v.result<Value>` | The validation function. Return `v.result.valid(value)` on success or `v.result.invalid(message)` on failure. |

## Returns

`Validator<Input, Value>`

A validator instance. You pass it to `field()` in most cases.

## Notes

### Error Handling

If the `validate` function throws, `v.fn` catches the error and returns `v.result.invalid(error.message)`. Your form
shows an error state rather than crashing.
