# v.result

`v.result<T>` is the class used throughout formier to represent validation outcomes.

## Import

```ts
import { v } from 'formier';
// use with `v.result`
```

## Static Methods

### `v.result.valid(value)` {#valid}

Creates a valid result holding a typed value.

```ts
static valid<T>(value: T): v.result<T>
```

**Example:**

```ts
return v.result.valid(42); // v.result<number>
return v.result.valid(input.trim()); // v.result<string>
```

---

### `v.result.invalid(message?)` {#invalid}

Creates an invalid result with an optional error message.

```ts
static invalid(message?: string): v.result<never>
```

**Example:**

```ts
return v.result.invalid();
return v.result.invalid('This field is required');
```

The `message` is available via `result.message` and is typically displayed to the user.

---

### `v.result.all(results)` {#all}

Combines multiple `v.result` values into one. Accepts either a record (object) or an array.

```ts
static all<O extends Record<string, v.result<unknown>>>(object: O): v.result<{ [key in keyof O]: ... }>
static all<T>(array: Array<v.result<T>>): v.result<Array<T>>
```

- Returns **valid** if all results are valid, with the combined values.
- Returns **invalid** if any result is invalid, with no message.
- Returns **pending** if any result is still pending; resolves once all pending results settle.

**Example:**

```ts
const combined = v.result.all({
  name: v.result.valid('Alice'),
  age: v.result.valid(30),
});
// v.result<{ name: string; age: number }>

const list = v.result.all([v.result.valid(1), v.result.valid(2)]);
// v.result<number[]>
```

## Properties

### `ok` {#ok}

```ts
ok: boolean;
```

`true` for valid and pending results. `false` for invalid results.

---

### `message` {#message}

```ts
message?: string
```

Present only on invalid results. Set by `v.result.invalid(message)` or by error messages caught from thrown exceptions.

---

### `isPending` {#ispending}

```ts
isPending: boolean;
```

`true` when the result wraps an unresolved promise (created by `v.result.pending`).

## Instance Methods

### `result.map(fn)` {#map}

Transforms the valid value. Returns a new `v.result<U>`. For pending results, the transform is deferred until the
promise resolves.

```ts
map<U>(fn: (value: T) => U): v.result<U>
```

Invalid and pending results pass through without calling `fn`.

**Example:**

```ts
const trimmed = v.result.valid('  hello  ').map((s) => s.trim());
// v.result<string> with value "hello"
```

---

### `result.flatMap(fn)` {#flatmap}

Monadic bind. Chains two validation steps together. `fn` receives the valid value and returns a new `v.result<U>`.
Useful for composing validators where the second depends on the first passing.

```ts
flatMap<U>(fn: (value: T) => v.result<U>): v.result<U>
```

Invalid and pending results pass through without calling `fn`.

---

### `result.tap(onValid?, onInvalid?)` {#tap}

Runs a side effect based on the result state. Returns `this` for chaining.

```ts
tap(
  onValid?: (value: T) => void,
  onInvalid?: (message?: string) => void
): this
```

For pending results, the callbacks fire after the promise resolves.

**Example:**

```ts
form.validate().tap(
  (values) => submitToServer(values),
  (message) => showErrorToast(message),
);
```
