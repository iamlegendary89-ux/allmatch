import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { sum, isEvenInteger } from '../src/numbers.js';

test('sum adds numbers', () => {
  assert.equal(sum(2, 3), 5);
});

describe('isEvenInteger', () => {
  test('returns true for even integers', () => {
    assert.equal(isEvenInteger(0), true);
    assert.equal(isEvenInteger(2), true);
    assert.equal(isEvenInteger(-4), true);
    assert.equal(isEvenInteger(Number.MAX_SAFE_INTEGER - 1), true);
  });

  test('returns false for odd integers', () => {
    assert.equal(isEvenInteger(1), false);
    assert.equal(isEvenInteger(-3), false);
    assert.equal(isEvenInteger(Number.MIN_SAFE_INTEGER), false);
    assert.equal(isEvenInteger(Number.MAX_SAFE_INTEGER), false);
  });

  test('throws TypeError for non-numeric inputs', () => {
    assert.throws(() => isEvenInteger(), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(null), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(undefined), { name: 'TypeError' });
    assert.throws(() => isEvenInteger('2'), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(2n), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(true), { name: 'TypeError' });
    assert.throws(() => isEvenInteger({}), { name: 'TypeError' });
    assert.throws(() => isEvenInteger([]), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(Symbol('test')), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(2, 4), { name: 'TypeError' });
  });

  test('throws TypeError for non-safe or non-integer numbers', () => {
    assert.throws(() => isEvenInteger(NaN), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(Infinity), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(-Infinity), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(2.5), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(-1.1), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(Number.MAX_SAFE_INTEGER + 1), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(Number.MAX_SAFE_INTEGER + 2), { name: 'TypeError' });
    assert.throws(() => isEvenInteger(Number.MIN_SAFE_INTEGER - 1), { name: 'TypeError' });
  });
});
