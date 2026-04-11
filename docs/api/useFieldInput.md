---
outline: deep
---

# useFieldInput()

React hook that subscribes only to a field's current input value, without subscribing to its validation state.

## Import

```ts
import { useFieldInput } from 'formtery';
```

## Signature

```ts
function useFieldInput<Input, Value>(store: Field<Input, Value>): Input;
```

## Parameters

| Parameter | Type                  | Description                  |
| --------- | --------------------- | ---------------------------- |
| `store`   | `Field<Input, Value>` | The field store to read from |

## Returns

`Input`

The current raw input value of the field. The component re-renders only when the field's input changes, **not** when the
validation state changes.

## Example: Character Counter

```tsx
import { useFieldInput } from 'formtery';

function CharCounter({ store }: { store: Field<string, string> }) {
  const value = useFieldInput(store);
  return <span>{value.length} / 200</span>;
}
```

This component re-renders only when the user types; it ignores validation state changes entirely.
