import test from 'node:test';
import assert from 'node:assert/strict';
import { isZero } from '../src/is-zero.js';

test('isZero returns true for 0 and -0', () => {
  assert.equal(isZero(0), true);
  assert.equal(isZero(-0), true);
});

test('isZero returns false for non-zero finite numbers', () => {
  assert.equal(isZero(1), false);
  assert.equal(isZero(-1), false);
  assert.equal(isZero(0.0001), false);
});

test('isZero throws TypeError on non-finite numbers', () => {
  assert.throws(() => isZero(NaN), { name: 'TypeError', message: 'Expected finite number' });
  assert.throws(() => isZero(Infinity), { name: 'TypeError', message: 'Expected finite number' });
  assert.throws(() => isZero(-Infinity), { name: 'TypeError', message: 'Expected finite number' });
});

test('isZero throws TypeError on non-numbers', () => {
  assert.throws(() => isZero('0'), { name: 'TypeError', message: 'Expected finite number' });
  assert.throws(() => isZero(null), { name: 'TypeError', message: 'Expected finite number' });
  assert.throws(() => isZero(undefined), { name: 'TypeError', message: 'Expected finite number' });
  assert.throws(() => isZero({}), { name: 'TypeError', message: 'Expected finite number' });
});
