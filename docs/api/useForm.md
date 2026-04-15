# useForm()

React hook that creates and manages a form.

```ts
import { useForm } from 'formtery';
```

```ts
interface UseFormOptions<Fields extends FormFields> {
  fields: Fields | (() => Fields);
}

function useForm<Fields extends FormFields>(
  options: UseFormOptions<Fields>
): Form<Fields>
```

## Params

- `options.fields` The fields object or a factory function that returns one

## Returns

`Form<Fields>`

A store object which holds group of fields and provides actions against them.

### Properties

#### `fields`

The fields object you passed in.

```ts
fields: Fields
```

Use it to pass individual field stores to `<Controller>` or `useField()`:

```tsx
const { fields } = useForm({
  fields: () => ({
    email: field(''),
  }),
});

<Controller store={fields.email} render={(props) => /* ... */} />
```

### Instance Methods

#### `validate()`

Runs validation on every field and returns a combined `v.result<FormValues<Fields>>`.

```ts
validate(): v.result<FormValues<Fields>>
```

After all validations settle, the first invalid field is automatically focused and scrolled into view.

---

#### `reset()`

Resets all fields to their default inputs and clears validation state.

```ts
reset(): void
```

---

#### `handleSubmit(onValid?)`

Returns an event handler suitable for `<form onSubmit={...}>`. It calls `event.preventDefault()`, validates all fields,
and calls `onValid(values)` only if every field passes.

```ts
handleSubmit(onValid?: (values: FormValues<Fields>) => void): (event: React.SyntheticEvent) => void
```

The `values` argument is typed as `FormValues<Fields>`. It is the **validated output types** of each field, not the raw
input types.

For example, a field declared as `field<number | null>(null, v.required<number>())` will produce `number` (not
`number | null`) in `values`.
