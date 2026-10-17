export function sum(a, b) {
  return a + b;
}

export function subtract(a, b) {
  if (typeof a !== 'number' || !Number.isFinite(a) || typeof b !== 'number' || !Number.isFinite(b)) {
    throw new TypeError('Expected finite numbers');
  }
  return a - b;
}
