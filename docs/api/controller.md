# \<Controller\>

A render prop component that subscribes to a field store and provides its current value, validation state, and change
handler to a child function.

```ts
import { Controller } from 'formtery';
```

## Props

```ts
interface ControllerProps<Input, Value> {
  ref?: React.Ref<any>;
  store: FieldStore<Input, Value>;
  render: (props: UseFieldResult<Input, Value>) => React.ReactNode;
}
```

- `ref` Forwarded and merged with the field's internal ref _(Optional)_
- `store` The field store to subscribe to
- `render` Render function called with field props. See [`UseFieldResult<Input, Value>`](/api/useField.html#returns).

## Notes

### When to Use `<Controller>` vs `useField()`

`<Controller>` is a thin wrapper around the [`useField()`](/api/useField) hook. Use whichever fits your style:

- **`<Controller>`**: convenient for inline field directly in JSX with render props
- **`useField()`**: better when building a reusable custom field component that takes a `store` prop
