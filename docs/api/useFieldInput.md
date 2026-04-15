# useFieldInput()

React hook that subscribes only to a field's current input value, without subscribing to its validation state.

```ts
import { useFieldInput } from 'formtery';
```

```ts
function useFieldInput<Input, Value>(store: Field<Input, Value>): Input;
```

## Params

- `store` The field store to read from

## Returns

The current raw input value of the field. The component re-renders only when the field's input changes, **not** when the
validation state changes.
