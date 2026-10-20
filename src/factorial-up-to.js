export function factorialUpTo(n) {
  if (typeof n !== 'number' || !Number.isInteger(n) || n < 0 || n > 12) {
    throw new TypeError('Expected an integer between 0 and 12');
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
