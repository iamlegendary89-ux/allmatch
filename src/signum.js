export function signum(n) {
  if (typeof n !== 'number' || !Number.isFinite(n)) {
    throw new TypeError('Expected finite number');
  }
  if (n < 0) return -1;
  if (n > 0) return 1;
  return 0;
}
