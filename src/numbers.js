export function sum(a, b) {
  return a + b;
}

export function isNonNegativeSafeInteger(value) {
  if (arguments.length !== 1) {
    throw new TypeError('Expected exactly one argument');
  }
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) {
    throw new TypeError('Value must be a safe integer');
  }
  return value >= 0;
}
