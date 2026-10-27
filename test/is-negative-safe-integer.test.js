import test from 'node:test';
import assert from 'node:assert/strict';
import { isNegativeSafeInteger } from '../src/is-negative-safe-integer.js';

test('isNegativeSafeInteger returns true for negative safe integers', () => {
  assert.equal(isNegativeSafeInteger(-1), true);
  assert.equal(isNegativeSafeInteger(-42), true);
  assert.equal(isNegativeSafeInteger(Number.MIN_SAFE_INTEGER), true);
});

test('isNegativeSafeInteger returns false for non-negative numbers and zeros', () => {
  assert.equal(isNegativeSafeInteger(+0), false);
  assert.equal(isNegativeSafeInteger(-0), false);
  assert.equal(isNegativeSafeInteger(0), false);
  assert.equal(isNegativeSafeInteger(1), false);
  assert.equal(isNegativeSafeInteger(42), false);
  assert.equal(isNegativeSafeInteger(Number.MAX_SAFE_INTEGER), false);
});

test('isNegativeSafeInteger returns false for negative non-integers and non-finite numbers', () => {
  assert.equal(isNegativeSafeInteger(-0.1), false);
  assert.equal(isNegativeSafeInteger(-1.5), false);
  assert.equal(isNegativeSafeInteger(-3.14159), false);
  assert.equal(isNegativeSafeInteger(NaN), false);
  assert.equal(isNegativeSafeInteger(Infinity), false);
  assert.equal(isNegativeSafeInteger(-Infinity), false);
});

test('isNegativeSafeInteger returns false for numbers beyond safe integer bounds', () => {
  assert.equal(isNegativeSafeInteger(Number.MIN_SAFE_INTEGER - 1), false);
  assert.equal(isNegativeSafeInteger(-9007199254740992), false);
  assert.equal(isNegativeSafeInteger(Number.MAX_SAFE_INTEGER + 1), false);
  assert.equal(isNegativeSafeInteger(9007199254740992), false);
});

test('isNegativeSafeInteger returns false for non-number primitive types', () => {
  assert.equal(isNegativeSafeInteger('-1'), false);
  assert.equal(isNegativeSafeInteger('-42'), false);
  assert.equal(isNegativeSafeInteger(''), false);
  assert.equal(isNegativeSafeInteger('foo'), false);
  assert.equal(isNegativeSafeInteger(null), false);
  assert.equal(isNegativeSafeInteger(undefined), false);
  assert.equal(isNegativeSafeInteger(true), false);
  assert.equal(isNegativeSafeInteger(false), false);
  assert.equal(isNegativeSafeInteger(BigInt(-1)), false);
  assert.equal(isNegativeSafeInteger(BigInt(-42)), false);
  assert.equal(isNegativeSafeInteger(BigInt(0)), false);
  assert.equal(isNegativeSafeInteger(Symbol('test')), false);
  assert.equal(isNegativeSafeInteger(Symbol()), false);
});

test('isNegativeSafeInteger returns false for objects, arrays, functions, and boxed Numbers', () => {
  assert.equal(isNegativeSafeInteger(new Number(-1)), false);
  assert.equal(isNegativeSafeInteger(new Number(-42)), false);
  assert.equal(isNegativeSafeInteger([]), false);
  assert.equal(isNegativeSafeInteger([-1]), false);
  assert.equal(isNegativeSafeInteger({}), false);
  assert.equal(isNegativeSafeInteger({ value: -1 }), false);
  assert.equal(isNegativeSafeInteger(() => -1), false);
});

test('isNegativeSafeInteger does not invoke Symbol.toPrimitive or valueOf on objects', () => {
  const throwingObj = {
    [Symbol.toPrimitive]() {
      throw new Error('Symbol.toPrimitive must not be invoked');
    },
    valueOf() {
      throw new Error('valueOf must not be invoked');
    },
    toString() {
      throw new Error('toString must not be invoked');
    },
  };
  assert.equal(isNegativeSafeInteger(throwingObj), false);
});
