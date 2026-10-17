import test from 'node:test';
import assert from 'node:assert/strict';
import { isStrictlyPositiveSafeInteger } from '../src/m3-factory-smoke.js';

test('accepts only positive safe integers', () => {
  assert.equal(isStrictlyPositiveSafeInteger(1), true);
  assert.equal(isStrictlyPositiveSafeInteger(Number.MAX_SAFE_INTEGER), true);
  for (const value of [0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1, NaN, '2', null]) {
    assert.equal(isStrictlyPositiveSafeInteger(value), false);
  }
});
