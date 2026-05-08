# Built-in Validators

formtery includes several built-in validators.

## v.skip()

A pass-through validator. Every input is valid, and the output value equals the input value.

## v.required()

Rejects `null` and `undefined`. Use this for fields whose initial value is `null` and where a real value must be
provided before submission.

## v.nonEmpty()

Rejects empty strings. This is the simplest way to make a text field required.
