export function sum(a, b) {
  return a + b;
}

/**
 * Clamps a number within inclusive lower and upper bounds.
 *
 * @param {number} value - The number to clamp.
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {number} The clamped value.
 * @throws {TypeError} If any argument is not a finite number.
 * @throws {RangeError} If min is greater than max.
 */
export function clamp(value, min, max) {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value) ||
    typeof min !== 'number' ||
    !Number.isFinite(min) ||
    typeof max !== 'number' ||
    !Number.isFinite(max)
  ) {
    throw new TypeError('Expected value, min, and max to be finite numbers');
  }

  if (min > max) {
    throw new RangeError('min cannot be greater than max');
  }

  return Math.min(Math.max(value, min), max);
}
