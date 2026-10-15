import test from 'node:test';
import assert from 'node:assert/strict';
import { sum, clamp } from '../src/numbers.js';

test('sum adds numbers', () => {
  assert.equal(sum(2, 3), 5);
  assert.equal(sum(-1, 1), 0);
  assert.equal(sum(-5, -5), -10);
});

test('clamp - standard and boundary values', () => {
  assert.equal(clamp(5, 1, 10), 5);
  assert.equal(clamp(1, 1, 10), 1);
  assert.equal(clamp(10, 1, 10), 10);
  assert.equal(clamp(0, 1, 10), 1);
  assert.equal(clamp(12, 1, 10), 10);
});

test('clamp - negative and fractional values', () => {
  assert.equal(clamp(-2.5, -5.5, -1.2), -2.5);
  assert.equal(clamp(-7.8, -5.5, -1.2), -5.5);
  assert.equal(clamp(0, -5.5, -1.2), -1.2);
  assert.equal(clamp(3.1415, 0.5, 2.5), 2.5);
  assert.equal(clamp(-20, -10, 10), -10);
  assert.equal(clamp(0, -10, 10), 0);
  assert.equal(clamp(20, -10, 10), 10);
});

test('clamp - equal bounds', () => {
  assert.equal(clamp(10, 4, 4), 4);
  assert.equal(clamp(4, 4, 4), 4);
  assert.equal(clamp(1, 4, 4), 4);
  assert.equal(clamp(-5, -10, -10), -10);
  assert.equal(clamp(5, 0, 0), 0);
});

test('clamp - invalid bound ordering throws RangeError', () => {
  assert.throws(() => clamp(5, 10, 2), RangeError);
  assert.throws(() => clamp(0, 1, -1), RangeError);
  assert.throws(() => clamp(-2, -1, -5), RangeError);
  assert.throws(() => clamp(0, 0.1, 0.0), RangeError);
});

test('clamp - non-number types throw TypeError', () => {
  assert.throws(() => clamp('5', 1, 10), TypeError);
  assert.throws(() => clamp(5, '1', 10), TypeError);
  assert.throws(() => clamp(5, 1, '10'), TypeError);
  assert.throws(() => clamp(true, 1, 10), TypeError);
  assert.throws(() => clamp(null, 1, 10), TypeError);
  assert.throws(() => clamp(undefined, 1, 10), TypeError);
  assert.throws(() => clamp({}, 1, 10), TypeError);
  assert.throws(() => clamp([], 1, 10), TypeError);
  assert.throws(() => clamp(Symbol('test'), 1, 10), TypeError);
  assert.throws(() => clamp(10n, 1, 10), TypeError);
});

test('clamp - non-finite numbers throw TypeError', () => {
  assert.throws(() => clamp(NaN, 1, 10), TypeError);
  assert.throws(() => clamp(5, NaN, 10), TypeError);
  assert.throws(() => clamp(5, 1, NaN), TypeError);
  assert.throws(() => clamp(Infinity, 1, 10), TypeError);
  assert.throws(() => clamp(-Infinity, 1, 10), TypeError);
  assert.throws(() => clamp(5, -Infinity, 10), TypeError);
  assert.throws(() => clamp(5, 1, Infinity), TypeError);
});

test('clamp - missing arguments throw TypeError', () => {
  assert.throws(() => clamp(), TypeError);
  assert.throws(() => clamp(1), TypeError);
  assert.throws(() => clamp(1, 2), TypeError);
});
