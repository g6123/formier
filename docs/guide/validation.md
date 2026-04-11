# Validation

Validation in formtery is a process in which user inputs are checked against domain constraints, and parsed into the
final output types.

## Writing a validator with `v.fn`

Use `v.fn` to wrap any synchronous validation function. Thrown errors are caught automatically and converted to an
invalid result.

```ts
import { v } from 'formtery';

const isDate = v.fn((input: string) => {
  const ok = /^\d{4}-\d{2}-\d{2}$/.test(input);
  return ok
    ? v.result.valid(new Date(input))
    : v.result.invalid('Must be a valid email address');
});
```

You can use your favorite validators as well:

```ts
import { v } from 'formtery';
import * as z from 'zod';

const isDate = v.fn<string, Date>((input) => z.iso.date().parse(input));
```

Then attach it to a field:

```ts {3}
const { fields } = useForm({
  fields: () => ({
    date: field('', isDate),
  }),
});
```

## Writing an async validator with `v.asyncFn`

Some validation rules can only be checked on the server. For these cases, use `v.asyncFn`. It handles cancellation and
error recovery automatically.

```ts
import { v } from 'formtery';

const checkUsername = v.asyncFn<string, string>(async (input, signal) => {
  const res = await fetch(`/api/check-username?q=${input}`, { signal });
  const { available } = await res.json();
  return available
    ? v.result.valid(input)
    : v.result.invalid('Username is already taken');
});
```

The second argument to your function is an `AbortSignal`. Pass it to `fetch` or any signal-aware API. When the user
input changes before the request finishes, formtery aborts the previous request and starts a new one.

## Displaying validation state

The render prop from `<Field>` gives you `state: v.result<Value>`. Check `state.ok` to decide whether to show an error:

```tsx {9,11}
<Field store={fields.username}>
  {({ ref, state, value, handleChange }) => (
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input
        id="username"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        aria-invalid={!state.ok}
      />
      {!state.ok && <FieldError>{state.message}</FieldError>}
    </Field>
  )}
</Field>
```

The `state.isPending` boolean is `true` while the async validator is running. Use it to show a spinner or a
"checking..." message:

```tsx {7}
<Field store={fields.username}>
  {({ ref, state, value, handleChange }) => (
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input
        id="username"
        endIcon={state.isPending && <Spinner />}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        aria-invalid={!state.ok}
      />
      {!state.ok && <FieldError>{state.message}</FieldError>}
    </Field>
  )}
</Field>
```

Validation runs when the form is submitted via `form.handleSubmit` or when you call `form.validate()` manually.

## Built-in Validators

| Validator              | Input type  | Output type | Rejects                |
| ---------------------- | ----------- | ----------- | ---------------------- |
| `v.skip()`             | `T`         | `T`         | Nothing; always valid  |
| `v.required(message?)` | `T \| null` | `T`         | `null` and `undefined` |
| `v.nonEmpty(message?)` | `string`    | `string`    | Empty string `''`      |

`v.skip` is used internally when you call `field(defaultInput)` with no validator. The field always passes validation
and its input type equals its output type:

```ts
{
  id: field(''),
}
```

`v.required` is the right choice for fields whose initial value is `null` and where the user must provide a value before
submitting:

```ts
{
  age: field(v.required<number>('Age is required')),
}
```

`v.nonEmpty` is the simplest way to make a text field required:

```ts
{
  username: field('', v.nonEmpty('Username is required')),
}
```
