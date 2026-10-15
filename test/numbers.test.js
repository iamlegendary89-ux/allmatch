import test from 'node:test';
import assert from 'node:assert/strict';
import { sum } from '../src/numbers.js';

test('sum adds numbers', () => {
  assert.equal(sum(2, 3), 5);
});
