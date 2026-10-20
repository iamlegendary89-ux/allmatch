import test from 'node:test';
import assert from 'node:assert/strict';
import { factorialUpTo } from '../src/factorial-up-to.js';

test('factorialUpTo computes factorials for integers 0 to 12', () => {
  assert.equal(factorialUpTo(0), 1);
  assert.equal(factorialUpTo(1), 1);
  assert.equal(factorialUpTo(5), 120);
  assert.equal(factorialUpTo(12), 479001600);
});

test('factorialUpTo throws TypeError for integers outside 0-12', () => {
  assert.throws(() => factorialUpTo(-1), TypeError);
  assert.throws(() => factorialUpTo(13), TypeError);
  assert.throws(() => factorialUpTo(100), TypeError);
});

test('factorialUpTo throws TypeError for non-integers and invalid types', () => {
  assert.throws(() => factorialUpTo(3.5), TypeError);
  assert.throws(() => factorialUpTo(NaN), TypeError);
  assert.throws(() => factorialUpTo(Infinity), TypeError);
  assert.throws(() => factorialUpTo('5'), TypeError);
  assert.throws(() => factorialUpTo(null), TypeError);
  assert.throws(() => factorialUpTo(undefined), TypeError);
  assert.throws(() => factorialUpTo([]), TypeError);
  assert.throws(() => factorialUpTo({}), TypeError);
});
