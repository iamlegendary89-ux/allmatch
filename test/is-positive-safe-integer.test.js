import test from 'node:test';
import assert from 'node:assert/strict';
import { isPositiveSafeInteger } from '../src/is-positive-safe-integer.js';

test('isPositiveSafeInteger correctly validates positive safe integers', () => {
  assert.equal(isPositiveSafeInteger(1), true);
  assert.equal(isPositiveSafeInteger(42), true);
  assert.equal(isPositiveSafeInteger(Number.MAX_SAFE_INTEGER), true);

  assert.equal(isPositiveSafeInteger(0), false);
  assert.equal(isPositiveSafeInteger(-0), false);
  assert.equal(isPositiveSafeInteger(-1), false);
  assert.equal(isPositiveSafeInteger(-42), false);

  assert.equal(isPositiveSafeInteger(1.5), false);
  assert.equal(isPositiveSafeInteger(0.1), false);

  assert.equal(isPositiveSafeInteger(NaN), false);
  assert.equal(isPositiveSafeInteger(Infinity), false);
  assert.equal(isPositiveSafeInteger(-Infinity), false);

  assert.equal(isPositiveSafeInteger('1'), false);
  assert.equal(isPositiveSafeInteger(''), false);
  assert.equal(isPositiveSafeInteger(null), false);
  assert.equal(isPositiveSafeInteger(undefined), false);

  assert.equal(isPositiveSafeInteger(Number.MAX_SAFE_INTEGER + 1), false);
  assert.equal(isPositiveSafeInteger(9007199254740992), false);
});
