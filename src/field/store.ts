import React from 'react';
import { Atom, atom } from '../internal/atom.js';
import { evaluate, MaybeLazy } from '../internal/lazy.js';
import { INIT, ValidationResult } from '../validation/result.js';
import { Validator } from '../validation/validator.js';
import type { Field, FieldElement } from './types.js';

export class FieldStore<Input, Value> implements Field<Input, Value> {
  ref: React.RefObject<FieldElement>;
  input: Atom<Input>;
  state: Atom<ValidationResult<Value>>;

  private defaultInput: Input;
  private validator: Validator<Input, Value>;

  constructor(
    defaultInput: Input,
    defaultState: ValidationResult<Value>,
    validator: MaybeLazy<Validator<Input, Value>>,
  ) {
    this.ref = { current: null };
    this.defaultInput = defaultInput;
    this.input = atom(defaultInput);
    this.state = atom(defaultState);
    this.validator = evaluate(validator);
  }

  focus() {
    this.ref.current?.focus?.();
    this.ref.current?.scrollIntoView?.();
  }

  set(input: Input) {
    this.input.set(input);
    this.state.set(INIT);
    this.validator.cancel?.();
  }

  reset() {
    this.input.set(this.defaultInput);
    this.state.set(INIT);
    this.validator.cancel?.();
  }

  validate() {
    return this.validator.validate(this.input.get()).subscribe((state) => {
      this.state.set(state);
    });
  }
}
