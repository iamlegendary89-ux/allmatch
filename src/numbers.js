export function sum(a, b) {
  return a + b;
}

export function isPositiveSafeInteger(value) {
  if (arguments.length !== 1) {
    throw new TypeError(`Expected exactly 1 argument, got ${arguments.length}`);
  }
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) {
    throw new TypeError('Value must be a safe integer number');
  }
  return value > 0;
}
