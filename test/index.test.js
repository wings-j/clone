import { clone } from '../dist';

test('Undefined', () => {
  let o = undefined;
  let r = clone(o);

  expect(r).toBe(o);
});

test('Null', () => {
  let o = null;
  let r = clone(o);

  expect(r).toBe(o);
});
test('Boolean', () => {
  let o = false;
  let r = clone(o);

  expect(r).toBe(o);
});
test('Number', () => {
  let o = 0;
  let r = clone(o);

  expect(r).toBe(o);
});
test('String', () => {
  let o = '';
  let r = clone(o);

  expect(r).toBe(o);
});
test('Symbol', () => {
  let o = Symbol();
  let r = clone(o);

  expect(r).toBe(o);
});
test('Function', () => {
  let o = function () {};
  let r = clone(o);

  expect(r).toBe(o);
});
