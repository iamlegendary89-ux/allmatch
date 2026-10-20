import test from 'node:test';
import assert from 'node:assert/strict';
import { sum, isOddInteger } from '../src/numbers.js';

test('sum adds numbers', () => {
  assert.equal(sum(2, 3), 5);
});

test('isOddInteger returns true for positive and negative odd safe integers', () => {
  assert.equal(isOddInteger(1), true);
  assert.equal(isOddInteger(3), true);
  assert.equal(isOddInteger(99999), true);
  assert.equal(isOddInteger(-1), true);
  assert.equal(isOddInteger(-3), true);
  assert.equal(isOddInteger(-99999), true);
  assert.equal(isOddInteger(Number.MAX_SAFE_INTEGER), true);
  assert.equal(isOddInteger(Number.MIN_SAFE_INTEGER), true);
});

test('isOddInteger returns false for even safe integers, zero, and negative evens', () => {
  assert.equal(isOddInteger(0), false);
  assert.equal(isOddInteger(-0), false);
  assert.equal(isOddInteger(2), false);
  assert.equal(isOddInteger(4), false);
  assert.equal(isOddInteger(1000), false);
  assert.equal(isOddInteger(-2), false);
  assert.equal(isOddInteger(-4), false);
  assert.equal(isOddInteger(-1000), false);
  assert.equal(isOddInteger(Number.MAX_SAFE_INTEGER - 1), false);
  assert.equal(isOddInteger(Number.MIN_SAFE_INTEGER + 1), false);
});

test('isOddInteger throws TypeError for arity violations', () => {
  assert.throws(() => isOddInteger(), TypeError);
  assert.throws(() => isOddInteger(1, 2), TypeError);
  assert.throws(() => isOddInteger(1, 2, 3), TypeError);
  assert.throws(() => isOddInteger(1, undefined), TypeError);
});

test('isOddInteger throws TypeError for non-numbers and invalid types', () => {
  assert.throws(() => isOddInteger('1'), TypeError);
  assert.throws(() => isOddInteger(''), TypeError);
  assert.throws(() => isOddInteger('odd'), TypeError);
  assert.throws(() => isOddInteger(1n), TypeError);
  assert.throws(() => isOddInteger(0n), TypeError);
  assert.throws(() => isOddInteger(null), TypeError);
  assert.throws(() => isOddInteger(undefined), TypeError);
  assert.throws(() => isOddInteger({}), TypeError);
  assert.throws(() => isOddInteger([1]), TypeError);
  assert.throws(() => isOddInteger(true), TypeError);
  assert.throws(() => isOddInteger(false), TypeError);
  assert.throws(() => isOddInteger(Symbol('1')), TypeError);
  assert.throws(() => isOddInteger(new Number(1)), TypeError);
  assert.throws(() => isOddInteger(new Number(0)), TypeError);
  assert.throws(() => isOddInteger(() => {}), TypeError);
  assert.throws(() => isOddInteger(function () {}), TypeError);
});

test('isOddInteger throws TypeError for fractional, non-finite, and unsafe numbers', () => {
  assert.throws(() => isOddInteger(1.5), TypeError);
  assert.throws(() => isOddInteger(-2.7), TypeError);
  assert.throws(() => isOddInteger(0.1), TypeError);
  assert.throws(() => isOddInteger(NaN), TypeError);
  assert.throws(() => isOddInteger(Infinity), TypeError);
  assert.throws(() => isOddInteger(-Infinity), TypeError);
  assert.throws(() => isOddInteger(Number.MAX_SAFE_INTEGER + 1), TypeError);
  assert.throws(() => isOddInteger(Number.MAX_SAFE_INTEGER + 2), TypeError);
  assert.throws(() => isOddInteger(Number.MIN_SAFE_INTEGER - 1), TypeError);
  assert.throws(() => isOddInteger(Number.MIN_SAFE_INTEGER - 2), TypeError);
  assert.throws(() => isOddInteger(2 ** 53), TypeError);
  assert.throws(() => isOddInteger(-(2 ** 53)), TypeError);
});
