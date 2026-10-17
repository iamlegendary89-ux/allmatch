/**
 * Return true only for positive integers that can be represented exactly.
 * Disposable M3 remote CI acceptance fixture.
 */
export function isStrictlyPositiveSafeInteger(value) {
  return Number.isSafeInteger(value) && value > 0;
}
