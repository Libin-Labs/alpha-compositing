import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('opaque foreground replaces background', () => {
  assert.deepEqual(api.compositeOver({ r: 1, g: 0, b: 0, a: 1 }, { r: 0, g: 0, b: 1, a: 1 }), {
    r: 1,
    g: 0,
    b: 0,
    a: 1,
  });
});
test('half alpha over opaque background', () => {
  const c = api.compositeOver({ r: 1, g: 0, b: 0, a: 0.5 }, { r: 0, g: 0, b: 1, a: 1 });
  assert.equal(c.r, 0.5);
  assert.equal(c.b, 0.5);
  assert.equal(c.a, 1);
});
test('transparent foreground leaves backdrop', () => {
  assert.deepEqual(
    api.compositeOver({ r: 1, g: 1, b: 1, a: 0 }, { r: 0.2, g: 0.3, b: 0.4, a: 1 }),
    { r: 0.2, g: 0.3, b: 0.4, a: 1 },
  );
});
test('transparent result is canonical', () => {
  assert.deepEqual(api.compositeOver({ r: 1, g: 0, b: 0, a: 0 }, { r: 0, g: 1, b: 0, a: 0 }), {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  });
});
test('partial-alpha backdrop is normalized', () => {
  const c = api.compositeOver({ r: 1, g: 0, b: 0, a: 0.5 }, { r: 0, g: 0, b: 1, a: 0.5 });
  assert.ok(Math.abs(c.a - 0.75) < 1e-12);
  assert.ok(Math.abs(c.r - 2 / 3) < 1e-12);
});
test('channel range is enforced', () => {
  assert.throws(
    () => api.compositeOver({ r: 2, g: 0, b: 0, a: 1 }, { r: 0, g: 0, b: 0, a: 1 }),
    RangeError,
  );
});
