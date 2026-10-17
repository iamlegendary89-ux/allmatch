export function sum(a, b) {
  return a + b;
}

export function subtract(a, b) {
  if (typeof a !== 'number' || !Number.isFinite(a) || typeof b !== 'number' || !Number.isFinite(b)) {
    throw new TypeError('Expected finite numbers');
  }
  return a - b;
}

export function multiply(a, b) {
  if (typeof a !== 'number' || !Number.isFinite(a) || typeof b !== 'number' || !Number.isFinite(b)) {
    throw new TypeError('Expected finite numbers');
  }
  return a * b;
}

export function clamp(value, min, max) {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value) ||
    typeof min !== 'number' ||
    !Number.isFinite(min) ||
    typeof max !== 'number' ||
    !Number.isFinite(max)
  ) {
    throw new TypeError('Expected finite numbers');
  }
  if (min > max) {
    throw new RangeError('min cannot be greater than max');
  }
  return Math.min(Math.max(value, min), max);
}
