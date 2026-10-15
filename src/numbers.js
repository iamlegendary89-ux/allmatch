export function sum(a, b) {
  return a + b;
}

export function isEvenInteger(value) {
  if (arguments.length !== 1 || typeof value !== 'number' || !Number.isSafeInteger(value)) {
    throw new TypeError('Expected exactly one safe integer');
  }
  return value % 2 === 0;
}
