# \<Controller\>

A render prop component that subscribes to a field store and provides its current value, validation state, and change
handler to a child function.

## Import

```ts
import { Controller } from 'formtery';
```

## Props

| Prop     | Type                                                 | Required | Description                                        |
| -------- | ---------------------------------------------------- | -------- | -------------------------------------------------- |
| `store`  | `Controller<Input, Value>`                           | Yes      | The field store to subscribe to                    |
| `render` | `(props: UseFieldResult<Input, Value>) => ReactNode` | Yes      | Render function called with field props            |
| `ref`    | `React.Ref<any>`                                     | No       | Forwarded and merged with the field's internal ref |

## Render Props

The `render` prop receives a `UseFieldResult<Input, Value>` object:

| Property       | Type                     | Description                                                              |
| -------------- | ------------------------ | ------------------------------------------------------------------------ |
| `value`        | `Input`                  | Current input value. Use as the controlled value of your input element.  |
| `handleChange` | `(value: Input) => void` | Call with a new value whenever the input changes.                        |
| `state`        | `v.result<Value>`        | Current validation result.                                               |
| `ref`          | `React.Ref<any>`         | Attach to the root DOM element to enable auto-focus on validation error. |

## Example

```tsx
<Controller
  store={fields.email}
  render={({ ref, value, handleChange, state }) => (
    <div className="...">
      <input
        ref={ref}
        type="email"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        aria-invalid={!state.ok || undefined}
      />
      {!state.ok && <span role="alert">{state.message ?? 'Invalid value'}</span>}
      {state.isPending && <span>Validating...</span>}
    </div>
  )}
/>
```

## When to Use `<Controller>` vs `useField()`

`<Controller>` is a thin wrapper around the [`useField()`](/api/useField) hook. Use whichever fits your style:

- **`<Controller>`**: convenient for inline render props directly in JSX
- **`useField()`**: better when building a reusable custom input component that takes a `store` prop
