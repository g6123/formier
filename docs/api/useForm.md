# useForm()

React hook that creates and manages a form with a group of fields.

## Import

```ts
import { useForm } from 'formier';
```

## Signature

```ts
function useForm<Fields extends FormFields>(options: UseFormOptions<Fields>): Form<Fields>;
```

## Options

```ts
interface UseFormOptions<Fields extends FormFields> {
  fields: Fields | (() => Fields);
}
```

| Option   | Type                       | Description                                            |
| -------- | -------------------------- | ------------------------------------------------------ |
| `fields` | `Fields \| (() => Fields)` | A fields object or a factory function that returns one |

## Returns

```ts
interface Form<Fields extends FormFields> {
  fields: Fields;
  validate(): v.result<FormValues<Fields>>;
  reset(): void;
  handleSubmit(onValid?: (values: FormValues<Fields>) => void): (event: React.SyntheticEvent) => void;
}
```

### `form.fields`

The fields object you passed in, typed as `Fields`. Use it to pass individual field stores to `<Field>` or `useField()`:

```tsx
const { fields } = useForm({ fields: () => ({ email: field('') }) });

<Field store={fields.email}>{...}</Field>
```

---

### `form.validate()`

Runs validation on every field and returns a combined `v.result<FormValues<Fields>>`.

```ts
form.validate(): v.result<FormValues<Fields>>
```

After all validations settle, the **first invalid field is automatically focused and scrolled into view**.

---

### `form.reset()`

Resets all fields to their default inputs and clears validation state.

```ts
form.reset(): void
```

---

### `form.handleSubmit(onValid?)`

Returns an event handler suitable for `<form onSubmit={...}>`. It calls `event.preventDefault()`, validates all fields,
and calls `onValid(values)` only if every field passes.

```ts
form.handleSubmit(onValid?: (values: FormValues<Fields>) => void): (event: React.SyntheticEvent) => void
```

The `values` argument is typed as `FormValues<Fields>`. It is the **validated output types** of each field, not the raw
input types.

For example, a field declared as `field<number | null>(null, v.required<number>())` will produce `number` (not
`number | null`) in `values`.
