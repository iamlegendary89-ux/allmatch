import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { sum, isNonNegativeSafeInteger } from '../src/numbers.js';

test('sum adds numbers', () => {
  assert.equal(sum(2, 3), 5);
});

describe('isNonNegativeSafeInteger', () => {
  it('returns true for non-negative safe integers', () => {
    assert.equal(isNonNegativeSafeInteger(0), true);
    assert.equal(isNonNegativeSafeInteger(-0), true);
    assert.equal(isNonNegativeSafeInteger(1), true);
    assert.equal(isNonNegativeSafeInteger(Number.MAX_SAFE_INTEGER), true);
  });

  it('returns false for negative safe integers', () => {
    assert.equal(isNonNegativeSafeInteger(-1), false);
    assert.equal(isNonNegativeSafeInteger(Number.MIN_SAFE_INTEGER), false);
  });

  it('throws TypeError for arity violations', () => {
    assert.throws(() => isNonNegativeSafeInteger(), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(1, 2), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(0, undefined), TypeError);
  });

  it('throws TypeError for non-numbers', () => {
    assert.throws(() => isNonNegativeSafeInteger(''), TypeError);
    assert.throws(() => isNonNegativeSafeInteger('0'), TypeError);
    assert.throws(() => isNonNegativeSafeInteger('123'), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(null), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(undefined), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(true), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(false), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(0n), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(10n), TypeError);
    assert.throws(() => isNonNegativeSafeInteger([]), TypeError);
    assert.throws(() => isNonNegativeSafeInteger([1]), TypeError);
    assert.throws(() => isNonNegativeSafeInteger({}), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(Symbol('sym')), TypeError);
  });

  it('throws TypeError for non-integers (fractions, NaN, Infinity)', () => {
    assert.throws(() => isNonNegativeSafeInteger(NaN), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(Infinity), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(-Infinity), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(0.1), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(1.5), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(-0.5), TypeError);
  });

  it('throws TypeError for unsafe integers', () => {
    assert.throws(() => isNonNegativeSafeInteger(Number.MAX_SAFE_INTEGER + 1), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(Number.MIN_SAFE_INTEGER - 1), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(2 ** 53), TypeError);
    assert.throws(() => isNonNegativeSafeInteger(-(2 ** 53)), TypeError);
  });
});
