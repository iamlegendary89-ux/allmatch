export function isZero(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) {
    throw new TypeError("Expected finite number");
  }
  return n === 0;
}
