import React from 'react';
import { atom } from '../atom/store.js';
import { Atom } from '../atom/types.js';
import { evaluate, MaybeLazy } from '../internal/lazy.js';
import { INIT, ValidationResult } from '../validation/result.js';
import { ValidationTransaction } from '../validation/transaction.js';
import { Validator } from '../validation/validator.js';
import type { FieldElement, FieldStore } from './types.js';

export class FieldStoreImpl<Input, Value> implements FieldStore<Input, Value> {
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

  validate(trx: ValidationTransaction = { shouldFocus: false }) {
    return this.validator
      .validate(this.input.get(), trx)
      .subscribe((state) => {
        this.state.set(state);
      })
      .tap(undefined, () => {
        if (trx != null && trx.shouldFocus) {
          this.focus();
          trx.shouldFocus = false;
        }
      });
  }
}
