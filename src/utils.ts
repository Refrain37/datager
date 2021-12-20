export function isPrimitive(args) {
  return args => !args || typeof args !== 'object';
}
