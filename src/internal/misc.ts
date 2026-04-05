export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function getErrorMessage({ message }: any): string | undefined {
  return message != null ? String(message) : undefined;
}
