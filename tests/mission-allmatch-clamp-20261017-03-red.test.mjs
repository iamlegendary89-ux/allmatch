import test from 'node:test';
import assert from 'node:assert/strict';
import * as numbers from '../src/numbers.js';

test('numbers.clamp is exported as a function', () => {
  assert.equal(typeof numbers.clamp, 'function');
});

test('numbers.clamp clamps values within [min, max] range', () => {
  assert.equal(typeof numbers.clamp, 'function');
  assert.equal(numbers.clamp(5, 0, 10), 5);
  assert.equal(numbers.clamp(-5, 0, 10), 0);
  assert.equal(numbers.clamp(15, 0, 10), 10);
  assert.equal(numbers.clamp(0, 0, 10), 0);
  assert.equal(numbers.clamp(10, 0, 10), 10);
  assert.equal(numbers.clamp(-5, -10, -2), -5);
  assert.equal(numbers.clamp(-15, -10, -2), -10);
  assert.equal(numbers.clamp(0, -10, -2), -2);
  assert.equal(numbers.clamp(2.5, 1.1, 4.4), 2.5);
  assert.equal(numbers.clamp(0.5, 1.1, 4.4), 1.1);
  assert.equal(numbers.clamp(5.5, 1.1, 4.4), 4.4);
  assert.equal(numbers.clamp(5, 5, 5), 5);
  assert.equal(numbers.clamp(3, 5, 5), 5);
  assert.equal(numbers.clamp(7, 5, 5), 5);
});

test('numbers.clamp throws TypeError("Expected finite numbers") for non-number or non-finite arguments', () => {
  assert.equal(typeof numbers.clamp, 'function');

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
      () => numbers.clamp(invalid, 0, 10),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected clamp(${String(invalid)}, 0, 10) to throw TypeError("Expected finite numbers")`
    );

    assert.throws(
      () => numbers.clamp(5, invalid, 10),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected clamp(5, ${String(invalid)}, 10) to throw TypeError("Expected finite numbers")`
    );

    assert.throws(
      () => numbers.clamp(5, 0, invalid),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected clamp(5, 0, ${String(invalid)}) to throw TypeError("Expected finite numbers")`
    );

    assert.throws(
      () => numbers.clamp(invalid, invalid, invalid),
      {
        name: 'TypeError',
        message: 'Expected finite numbers',
      },
      `Expected clamp(${String(invalid)}, ${String(invalid)}, ${String(invalid)}) to throw TypeError("Expected finite numbers")`
    );
  }

  assert.throws(
    () => numbers.clamp(),
    {
      name: 'TypeError',
      message: 'Expected finite numbers',
    },
    'Expected clamp() with no arguments to throw TypeError("Expected finite numbers")'
  );

  assert.throws(
    () => numbers.clamp(5),
    {
      name: 'TypeError',
      message: 'Expected finite numbers',
    },
    'Expected clamp(5) with one argument to throw TypeError("Expected finite numbers")'
  );

  assert.throws(
    () => numbers.clamp(5, 0),
    {
      name: 'TypeError',
      message: 'Expected finite numbers',
    },
    'Expected clamp(5, 0) with two arguments to throw TypeError("Expected finite numbers")'
  );
});

test('numbers.clamp throws RangeError("min cannot be greater than max") when min > max', () => {
  assert.equal(typeof numbers.clamp, 'function');

  assert.throws(
    () => numbers.clamp(5, 10, 0),
    {
      name: 'RangeError',
      message: 'min cannot be greater than max',
    },
    'Expected clamp(5, 10, 0) to throw RangeError("min cannot be greater than max")'
  );

  assert.throws(
    () => numbers.clamp(0, 1, 0),
    {
      name: 'RangeError',
      message: 'min cannot be greater than max',
    },
    'Expected clamp(0, 1, 0) to throw RangeError("min cannot be greater than max")'
  );

  assert.throws(
    () => numbers.clamp(-2, -1, -5),
    {
      name: 'RangeError',
      message: 'min cannot be greater than max',
    },
    'Expected clamp(-2, -1, -5) to throw RangeError("min cannot be greater than max")'
  );
});
