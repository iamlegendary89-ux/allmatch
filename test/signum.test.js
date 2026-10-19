import test from 'node:test';
import assert from 'node:assert/strict';
import { signum } from '../src/signum.js';

test('signum returns 1 for positive numbers', () => {
  assert.equal(signum(42), 1);
  assert.equal(signum(1), 1);
  assert.equal(signum(0.001), 1);
  assert.equal(signum(1e10), 1);
});

test('signum returns -1 for negative numbers', () => {
  assert.equal(signum(-42), -1);
  assert.equal(signum(-1), -1);
  assert.equal(signum(-0.001), -1);
  assert.equal(signum(-1e10), -1);
});

test('signum returns 0 for zero values', () => {
  assert.equal(signum(0), 0);
  assert.equal(signum(-0), 0);
});

test('signum throws TypeError for non-finite and non-numbers', () => {
  const errPattern = /^TypeError: Expected finite number$/;
  assert.throws(() => signum(NaN), errPattern);
  assert.throws(() => signum(Infinity), errPattern);
  assert.throws(() => signum(-Infinity), errPattern);
  assert.throws(() => signum('10'), errPattern);
  assert.throws(() => signum(''), errPattern);
  assert.throws(() => signum(null), errPattern);
  assert.throws(() => signum(undefined), errPattern);
  assert.throws(() => signum(), errPattern);
  assert.throws(() => signum({}), errPattern);
  assert.throws(() => signum([]), errPattern);
  assert.throws(() => signum(true), errPattern);
  assert.throws(() => signum(false), errPattern);
  assert.throws(() => signum(10n), errPattern);
  assert.throws(() => signum(Symbol('sym')), errPattern);
});
