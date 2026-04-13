# useField()

React hook that subscribes to a field store and returns the current value, validation state, and change handler.

## Import

```ts
import { useField } from 'formtery';
```

## Signature

```ts
function useField<Input, Value>(field: Field<Input, Value>, ref?: React.Ref<any>): UseFieldResult<Input, Value>;
```

## Parameters

| Parameter | Type                  | Description                     |
| --------- | --------------------- | ------------------------------- |
| `field`   | `Field<Input, Value>` | The field store to subscribe to |
| `ref`     | `React.Ref<any>`      | Optional external ref           |

## Returns

`UseFieldResult<Input, Value>`

| Property       | Type                     | Description                                                              |
| -------------- | ------------------------ | ------------------------------------------------------------------------ |
| `value`        | `Input`                  | Current input value. Use as the controlled value of your input element.  |
| `handleChange` | `(value: Input) => void` | Call with a new value whenever the input changes.                        |
| `state`        | `v.result<Value>`        | Current validation result.                                               |
| `ref`          | `React.Ref<any>`         | Attach to the root DOM element to enable auto-focus on validation error. |

The component re-renders whenever the field's `input` or `state` changes.

## Example: Custom Input Component

```tsx
import { useField, type Field } from 'formtery';

interface TextInputProps {
  store: Field<string, string>;
  label: string;
  type?: string;
}

function TextInput({ store, label, type = 'text' }: TextInputProps) {
  const { ref, value, handleChange, state } = useField(store);

  return (
    <label>
      {label}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        aria-invalid={!state.ok || undefined}
      />
      {!state.ok && <span role="alert">{state.message}</span>}
    </label>
  );
}
```

Use it in a form:

```tsx
<TextInput store={fields.email} label="Email" type="email" />
<TextInput store={fields.password} label="Password" type="password" />
```

## Ref Forwarding

If you need to attach your own ref to the element alongside formtery's internal ref, pass it as the second argument. The
refs are merged automatically.

```tsx
function TextInput({ inputRef, store }: TextInputProps) {
  const { ref, value, state, handleChange } = useField(store, inputRef);
  return <input ref={ref} value={value} onChange={(e) => handleChange(e.target.value)} />;
}
```
