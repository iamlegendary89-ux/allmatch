import test from 'node:test';
import assert from 'node:assert/strict';
import { sumSafeIntegers } from '../src/m3-third-safe-sum.js';

test('safe integers sum deterministically', () => {
  assert.equal(sumSafeIntegers([]), 0);
  assert.equal(sumSafeIntegers([1, 2, 3]), 6);
  assert.equal(sumSafeIntegers([-5, 5]), 0);
});
test('rejects unsafe inputs and overflow', () => {
  assert.throws(() => sumSafeIntegers(null), TypeError);
  assert.throws(() => sumSafeIntegers([1, 2.5]), TypeError);
  assert.throws(() => sumSafeIntegers([Number.MAX_SAFE_INTEGER, 1]), RangeError);
});
