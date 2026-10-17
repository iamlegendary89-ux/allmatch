import test from 'node:test';
import assert from 'node:assert/strict';
import * as numbers from '../src/numbers.js';

test('numbers.subtract is exported as a function', () => {
  assert.equal(typeof numbers.subtract, 'function');
});

test('numbers.subtract computes the difference between two finite numbers', () => {
  assert.equal(typeof numbers.subtract, 'function');
  assert.equal(numbers.subtract(5, 3), 2);
  assert.equal(numbers.subtract(0, 0), 0);
  assert.equal(numbers.subtract(-2, -5), 3);
  assert.equal(numbers.subtract(5.5, 2.25), 3.25);
  assert.equal(numbers.subtract(10, 20), -10);
});

test('numbers.subtract throws TypeError("Expected finite numbers") for non-number or non-finite arguments', () => {
  assert.equal(typeof numbers.subtract, 'function');

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
      () => numbers.subtract(invalid, 5),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected subtract(${String(invalid)}, 5) to throw TypeError("Expected finite numbers")`
    );

    assert.throws(
      () => numbers.subtract(10, invalid),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected subtract(10, ${String(invalid)}) to throw TypeError("Expected finite numbers")`
    );

    assert.throws(
      () => numbers.subtract(invalid, invalid),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected subtract(${String(invalid)}, ${String(invalid)}) to throw TypeError("Expected finite numbers")`
    );
  }

  assert.throws(
    () => numbers.subtract(),
    {
      name: 'TypeError',
      message: 'Expected finite numbers',
    },
    'Expected subtract() with no arguments to throw TypeError("Expected finite numbers")'
  );
});
