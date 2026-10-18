export function sum(a, b) {
  return a + b;
}

export function isOddInteger(value) {
  if (arguments.length !== 1) {
    throw new TypeError('Expected exactly one argument');
  }
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) {
    throw new TypeError('Expected a safe integer');
  }
  return Math.abs(value % 2) === 1;
}
