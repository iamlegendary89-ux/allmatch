export function sumSafeIntegers(values) {
  if (!Array.isArray(values)) throw new TypeError('Expected an array');
  let total = 0;
  for (const value of values) {
    if (!Number.isSafeInteger(value)) throw new TypeError('Expected safe integers');
    const next = total + value;
    if (!Number.isSafeInteger(next)) throw new RangeError('Sum exceeds safe integer range');
    total = next;
  }
  return total;
}
