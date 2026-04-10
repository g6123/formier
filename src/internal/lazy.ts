import { isFunction } from './misc.js';

export type Lazy<T> = () => T;
export type MaybeLazy<T> = T | Lazy<T>;

export function evaluate<T>(value: MaybeLazy<T>) {
  return isFunction(value) ? value() : value;
}
