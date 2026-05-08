# useField()

React hook that subscribes to a field store and returns the current value, validation state, and change handler.

The component re-renders whenever the field's `input` or `state` changes.

```ts
import { useField } from 'formtery';
```

```ts
function useField<Input, Value>(
  store: FieldStore<Input, Value>,
  ref?: React.Ref<any>,
): UseFieldResult<Input, Value>;
```

## Params

- `store` The field store to subscribe to
- `ref` External ref (_Optional)_

## Returns

```ts
interface UseFieldResult<Input, Value> {
  ref: React.Ref<any>;
  value: Input;
  state: ValidationResult<Value>;
  setValue: (value: React.SetStateAction<Input>) => void;
}
```

- `ref` Attach to the element to enable auto-focus on validation error.
- `value` Current input value. Use as the controlled value of your input element.
- `setValue` Call with a new value whenever the input changes.
- `state` Current validation result.

## Notes

### Ref Forwarding

If you need to attach your own ref to the element alongside formtery's internal ref, pass it as the second argument. The
refs are merged automatically.

```tsx
function TextInput({ inputRef, store }: TextInputProps) {
  const { ref, value, setValue, state } = useField(store, inputRef);

  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```
