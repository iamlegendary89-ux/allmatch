export function isNegativeSafeInteger(value) {
  return Number.isSafeInteger(value) && value < 0;
}
