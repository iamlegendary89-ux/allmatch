import test from 'node:test';
import assert from 'node:assert/strict';
import { sum, isPositiveSafeInteger } from '../src/numbers.js';

test('sum adds numbers', () => {
  assert.equal(sum(2, 3), 5);
});

test('isPositiveSafeInteger returns true for positive safe integers', () => {
  assert.equal(isPositiveSafeInteger(1), true);
  assert.equal(isPositiveSafeInteger(2), true);
  assert.equal(isPositiveSafeInteger(42), true);
  assert.equal(isPositiveSafeInteger(1000), true);
  assert.equal(isPositiveSafeInteger(Number.MAX_SAFE_INTEGER), true);
});

test('isPositiveSafeInteger returns false for 0, -0, and negative safe integers', () => {
  assert.equal(isPositiveSafeInteger(0), false);
  assert.equal(isPositiveSafeInteger(-0), false);
  assert.equal(isPositiveSafeInteger(-1), false);
  assert.equal(isPositiveSafeInteger(-42), false);
  assert.equal(isPositiveSafeInteger(Number.MIN_SAFE_INTEGER), false);
});

test('isPositiveSafeInteger throws TypeError when arity is not exactly 1', () => {
  assert.throws(() => isPositiveSafeInteger(), {
    name: 'TypeError',
  });
  assert.throws(() => isPositiveSafeInteger(1, 2), {
    name: 'TypeError',
  });
  assert.throws(() => isPositiveSafeInteger(1, undefined), {
    name: 'TypeError',
  });
  assert.throws(() => isPositiveSafeInteger(1, 2, 3), {
    name: 'TypeError',
  });
});

test('isPositiveSafeInteger throws TypeError for invalid non-number types', () => {
  const invalidTypes = [
    1n,
    0n,
    '42',
    '1',
    '',
    'abc',
    null,
    undefined,
    true,
    false,
    {},
    { value: 1 },
    [],
    [1],
    Symbol('test'),
    () => {},
  ];

  for (const val of invalidTypes) {
    assert.throws(
      () => isPositiveSafeInteger(val),
      { name: 'TypeError' },
      `Expected TypeError for non-number: ${String(val)}`
    );
  }
});

test('isPositiveSafeInteger throws TypeError for non-safe integer numbers', () => {
  const invalidNumbers = [
    1.5,
    -1.5,
    0.1,
    -0.1,
    Math.PI,
    NaN,
    Number.NaN,
    Infinity,
    -Infinity,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.MAX_SAFE_INTEGER + 1,
    Number.MIN_SAFE_INTEGER - 1,
    2 ** 53,
    -(2 ** 53),
  ];

  for (const num of invalidNumbers) {
    assert.throws(
      () => isPositiveSafeInteger(num),
      { name: 'TypeError' },
      `Expected TypeError for invalid number: ${num}`
    );
  }
});
