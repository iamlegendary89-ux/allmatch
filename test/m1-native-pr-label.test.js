import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeFactoryLabel } from '../src/m1-native-pr-label.js';

test('normalizes plain disposable factory labels', () => {
  assert.equal(normalizeFactoryLabel('  PHASE-ONE  '), 'phase-one');
  assert.equal(normalizeFactoryLabel('Trial42'), 'trial42');
});
test('rejects unsafe labels without coercion', () => {
  for (const v of ['', 'a/b', 'spaces inside', 4, null, '..']) {
    assert.equal(normalizeFactoryLabel(v), null);
  }
});
