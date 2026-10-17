import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTrialTag } from '../src/m3-native-push.js';

test('normalizes an ASCII lab tag and rejects malformed values', () => {
  assert.equal(normalizeTrialTag('  Alpha-2  '), 'alpha-2');
  assert.equal(normalizeTrialTag('Beta'), 'beta');
  for (const invalid of ['', 'a b', 'a/b', 5, null]) {
    assert.equal(normalizeTrialTag(invalid), null);
  }
});
