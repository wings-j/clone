![Jest](https://img.shields.io/badge/Jest-passing-brightgreen.svg?logo=jest&logoColor=white)
![npm](https://img.shields.io/npm/v/@wings-j/clone.svg?label=NPM)

Deeply clone arbitrary objects in JavaScript.

Non-enumerable properties will not be preserved. Objects will be cloned with the same prototype, while the following types will not be cloned:

- Basic types: undefined, null, bool, number, string, symbol
- Function
- WeakMap
- WeakSet
- Blob and File

Please note:

- This library uses modern JavaScript syntax such as `ESM` and `Object.getPrototypeOf`, so it cannot be used in legacy environments.
- If the original object is a custom class whose constructor may throw errors, this library may fail.
- Only writable properties can be cloned.

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
