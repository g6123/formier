export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function mapValues<T extends object, K extends keyof T, V>(
  object: T,
  getNewValue: (value: T[K], key: K, object: T) => V,
): Record<K, V> {
  const entries = Object.entries(object).map(([key, value]) => [key, getNewValue(value, key as K, object)]);
  return Object.fromEntries(entries);
}

export function getErrorMessage({ message }: any): string | undefined {
  return message != null ? String(message) : undefined;
}
