# Getting Started

## Installation

::: code-group

```sh [pnpm]
pnpm add formtery
```

```sh [yarn]
yarn add formtery
```

```sh [npm]
npm add formtery
```

:::

## Concepts

- **`field()`** creates a small reactive store holding two pieces of state:
  - `input`: the current raw value from the user
  - `state`: the latest validation result
- **`<Controller>`** subscribes a component subtree to a single field's store. When `input` or `state` changes, only
  that render prop re-renders.
- **`useForm()`** groups field stores together and adds form-level operations: validate all at once, reset all to
  defaults, and create a submit handler.

## Example

```tsx
import { Field, field, useForm, v } from 'formtery';

function ProfileForm() {
  const { fields, handleSubmit } = useForm({
    fields: () => ({
      fullName: field('', v.nonEmpty()),
      age: field<string, number>(
        '',
        v.fn((input) => {
          if (!/^\d$+/.test(input)) {
            return v.result.invalid('Age should be a number');
          }

          return v.result.valid(parseInt(v));
        }),
      ),
    }),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log(`Hello ${values.fullName}`);
        //                          ^? string
        console.log(`Your age is ${values.age}`);
        //                                ^? number
      })}
    >
      <Controller
        store={fields.fullName}
        render={({ ref, value, setValue }) => (
          <label>
            Full Name
            <input ref={ref} value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
        )}
      />
      <Controller
        store={fields.age}
        render={({ ref, value, setValue, state }) => (
          <label>
            Age
            <input ref={ref} type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            {!state.ok && <span>{state.message}</span>}
          </label>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```
