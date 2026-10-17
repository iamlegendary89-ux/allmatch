import test from 'node:test';
import assert from 'node:assert/strict';
import * as numbers from '../src/numbers.js';

test('numbers.multiply is exported as a function', () => {
  assert.equal(typeof numbers.multiply, 'function');
});

test('numbers.multiply computes the product of two finite numbers', () => {
  assert.equal(typeof numbers.multiply, 'function');
  assert.equal(numbers.multiply(2, 3), 6);
  assert.equal(numbers.multiply(-2, 3), -6);
  assert.equal(numbers.multiply(-4, -5), 20);
  assert.equal(numbers.multiply(0, 5), 0);
  assert.equal(numbers.multiply(5, 0), 0);
  assert.equal(numbers.multiply(0, 0), 0);
  assert.equal(numbers.multiply(2.5, 4), 10);
  assert.equal(numbers.multiply(1.5, 2.5), 3.75);
});

test('numbers.multiply throws TypeError("Expected finite numbers") for non-number or non-finite arguments', () => {
  assert.equal(typeof numbers.multiply, 'function');

  const invalidInputs = [
    '5',
    '10',
    '',
    true,
    false,
    null,
    undefined,
    {},
    [],
    NaN,
    Infinity,
    -Infinity,
    Symbol('sym'),
    10n,
  ];

  for (const invalid of invalidInputs) {
    assert.throws(
      () => numbers.multiply(invalid, 5),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected multiply(${String(invalid)}, 5) to throw TypeError("Expected finite numbers")`
    );

    assert.throws(
      () => numbers.multiply(10, invalid),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected multiply(10, ${String(invalid)}) to throw TypeError("Expected finite numbers")`
    );

    assert.throws(
      () => numbers.multiply(invalid, invalid),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected multiply(${String(invalid)}, ${String(invalid)}) to throw TypeError("Expected finite numbers")`
    );
  }

  assert.throws(
    () => numbers.multiply(),
    {
      name: 'TypeError',
      message: 'Expected finite numbers',
    },
    'Expected multiply() with no arguments to throw TypeError("Expected finite numbers")'
  );
});
