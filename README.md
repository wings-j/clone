Deeply clone arbitrary objects in Javascript.

Non-enumerable properties will not be maintained. Objects will be cloned with same prototype, while following variables will not be cloned:

- Basic types: undefined, null, bool, number, string, symbol
- Function
- WeakMap
- WeakSet

Watch that:

- This library use modern Javascript syntax such as `ESM`, `Object.getPrototypeOf`, so it can not be use in legacy environments.
- If the original object is a custom class whose constructor may throw errors, this library may fail.
- Only writable members can be copied.

# Installation

```sh
npm install @wings-j/clone
```

# Usage

```ts
import { clone } from '@wings-j/clone';

class A {
  constructor() {
    this.x = false;
    this.y = 0;
    this.z = '';
  }
}
let o = new A();
let r = clone(o);

console.log(r === o); // false
console.log(r instanceof A); // true
console.log(r.x === o.x); // true
console.log(r.y === o.y); // true
console.log(r.z === o.z); // true
```
