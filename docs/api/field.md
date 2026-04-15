# field()

Factory function that creates a field store.

```ts
import { field } from 'formtery';
```

## Overloads

### `field(defaultInput)`

Creates a field with a default input value and no validation. Any input is valid and the output type equals the input
type.

**Signature:**

```ts
function field<T extends {}>(defaultInput: T): Field<T, T>;
```

**Examples:**

```ts
const name = field(''); // Field<string, string>
const count = field(0); // Field<number, number>
const tags = field<string[]>([]); // Field<string[], string[]>
```

---

### `field(validator)`

Creates a field with a validator. The input is initialized with `null`. Use this when the field starts empty input and
the validator handles the `null` case.

**Signature:**

```ts
function field<Input, Value>(validate: Validator<Input, Value>): Field<Input, Value>;
```

**Example:**

```ts
// Input is number | null, but after v.required the output is number
const age = field(v.required<number>('Age is required'));
// Field<number | null, number>
```

---

### `field(defaultInput, validator)`

Creates a field with both a default input value and a validator.

**Signature:**

```ts
function field<Input, Value>(defaultInput: Input, validate: Validator<Input, Value>): Field<Input, Value>;
```

**Examples:**

```ts
const username = field('', v.nonEmpty('Username is required'));
// Field<string, string>

const email = field('', isEmail);
// Field<string, string>  (where isEmail is a custom Validator<string, string>)
```

## Returns

`Field<Input, Value>`

A field store object that holds state and can be passed to `<Controller>` or `useField()`.

### Properties

#### `ref`

React ref to the element which renders the field. Attach this property to the element to enable auto-focus on validation
error.

```ts
ref: React.Ref<FieldElement>
```

---

#### `input`

```ts
input: ReadonlyAtom<Input>;
```

Reactive atom holding the current input value

---

#### `state`

```ts
state: ReadonlyAtom<ValidationResult<Value>>;
```

Reactive atom holding the current validation result

### Instance Methods

#### `set(input)` {#set}

```ts
set(input: Input): void;
```

Set a new input value. Resets validation state and cancels any pending async validation.

---

#### `reset()`

```ts
reset(): void;
```

Reset the field to its `defaultInput`. Resets validation state and cancels any pending async validation.

---

#### `validate()`

```ts
validate(trx?: ValidationTransaction): ValidationResult<Value>;
```

Run the validator against the current input and subscribe to state updates.

---

#### `focus()`

```ts
focus(): void;
```

Focus the DOM element referenced by `ref` and scroll it into view.

## Notes

The recommended pattern is to pass a factory function to `useForm` as it prevents redundant initialization of field
stores:

```ts
const { fields } = useForm({
  fields: () => ({
    // factory function — called once on mount
    email: field('', isEmail),
    password: field('', v.nonEmpty()),
  }),
});
```

Do **not** create fields at the top level of a component body without memoization:

```ts
// BAD — creates a new field store on every render
function MyForm() {
  const nameField = field(''); // recreated on every render!
  ...
}
```
