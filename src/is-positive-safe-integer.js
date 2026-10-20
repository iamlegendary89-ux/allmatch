export function isPositiveSafeInteger(value) {
  return Number.isSafeInteger(value) && value > 0;
}
