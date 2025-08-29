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
  let o = 'a';
  let r = clone(o);

  expect(r).toBe(o);
});
test('Symbol', () => {
  let o = Symbol();
  let r = clone(o);

  expect(r).toBe(o);
});
test('Wrapper', () => {
  let o = new String('a');
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(String);
  expect(r.valueOf()).toBe(o.valueOf());
});
test('Function', () => {
  let o = function () {};
  let r = clone(o);

  expect(r).toBe(o);
});
test('Error', () => {
  let o = new Error('a');
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(Error);
  expect(r.name).toBe(o.name);
  expect(r.message).toBe(o.message);
  expect(r.stack).toBe(o.stack);
});
test('Object', () => {
  let symbol = Symbol();
  let o = { a: false, b: 0, [symbol]: 'a' };
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(Object);
  expect(r.a).toBe(o.a);
  expect(r.b).toBe(o.b);
  expect(r[symbol]).toBe(o[symbol]);
});
test('Array', () => {
  let o = [false, 0, 'a'];
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(Array);
  expect(r.length).toBe(o.length);
  expect(r[0]).toBe(o[0]);
  expect(r[1]).toBe(o[1]);
  expect(r[2]).toBe(o[2]);
});
test('Map', () => {
  let o = new Map();
  o.set('a', false);
  o.set('b', 0);
  o.set('c', 'a');
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(Map);
  expect(r.get('a')).toBe(o.get('a'));
  expect(r.get('b')).toBe(o.get('b'));
  expect(r.get('c')).toBe(o.get('c'));
});
test('Set', () => {
  let o = new Set();
  o.add(false);
  o.add(0);
  o.add('a');
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(Set);
  expect(r.has(false)).toBe(true);
  expect(r.has(0)).toBe(true);
  expect(r.has('a')).toBe(true);
});
test('Date', () => {
  let o = new Date();
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(Date);
  expect(r.getTime()).toBe(o.getTime());
});
test('Promise', async () => {
  let o = new Promise(resolve => {
    resolve('a');
  });
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(Promise);
  expect(await r).toBe('a');
});
test('RegExp', () => {
  let o = /abc/gim;
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(RegExp);
  expect(r.source).toBe(o.source);
  expect(r.flags).toBe(o.flags);
});
test('URL', () => {
  let o = new URL('https://example.com');
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(URL);
  expect(r.href).toBe(o.href);
  expect(r.origin).toBe(o.origin);
  expect(r.protocol).toBe(o.protocol);
  expect(r.host).toBe(o.host);
  expect(r.pathname).toBe(o.pathname);
});
test('File', () => {
  let o = new File(['a'], '0.txt', { type: 'text/plain' });
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(File);
  expect(r.size).toBe(o.size);
  expect(r.name).toBe(o.name);
  expect(r.type).toBe(o.type);
  expect(r.lastModified).toBe(o.lastModified);
});
test('ArrayBuffer', () => {
  let o = new ArrayBuffer(8);
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(ArrayBuffer);
  expect(r.byteLength).toBe(o.byteLength);
});
test('TypedArray', () => {
  let o = new Uint8Array([0, 1, 2]);
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(Uint8Array);
  expect(r.length).toBe(o.length);
  expect(r[0]).toBe(o[0]);
  expect(r[1]).toBe(o[1]);
  expect(r[2]).toBe(o[2]);
});
test('DataView', () => {
  let buffer = new ArrayBuffer(8);
  let o = new DataView(buffer);
  o.setInt8(0, 1);
  o.setInt8(1, 2);
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(DataView);
  expect(r.byteLength).toBe(o.byteLength);
  expect(r.getInt8(0)).toBe(o.getInt8(0));
  expect(r.getInt8(1)).toBe(o.getInt8(1));
});
test('Class', () => {
  class A {
    constructor() {
      this.x = false;
      this.y = 0;
      this.z = '';
    }
  }
  let o = new A();
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(A);
  expect(r.x).toBe(o.x);
  expect(r.y).toBe(o.y);
  expect(r.z).toBe(o.z);
});
test('Extends', () => {
  class A {
    constructor() {
      this.x = false;
    }
  }
  class B extends A {
    constructor() {
      super();

      this.a = new A();
      this.y = 0;
    }
  }
  let o = new B();
  let r = clone(o);

  expect(r).not.toBe(o);
  expect(r).toBeInstanceOf(B);
  expect(r.x).toBe(o.x);
  expect(r.y).toBe(o.y);
  expect(r.a).not.toBe(o.a);
  expect(r.a).toBeInstanceOf(A);
  expect(r.a.x).toBe(o.a.x);
});
test('Circular', () => {
  let a = { x: 0 };
  let b = { y: 1, a };
  a.b = b;

  let o = a;
  let r = clone(o);
  expect(r).not.toBe(o);
  expect(r.x).toBe(0);
  expect(r.b).not.toBe(b);
  expect(r.b.y).toBe(1);
  expect(r.b.a).toBe(r);
});
