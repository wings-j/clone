/**
 * Clone
 * @param [origin] Origin
 */
function clone<T = any>(origin: T): T {
  let cache = new Map<any, any>();

  if (typeof origin !== 'object' || origin === null || origin instanceof WeakMap || origin instanceof WeakSet) {
    return origin;
  } else {
    if (cache.has(origin)) {
      return cache.get(origin);
    } else {
      let result: any;
      let prototype = Object.getPrototypeOf(origin);
      let constructor = Object.getPrototypeOf(origin).constructor;

      if (origin instanceof Boolean) {
        result = new Boolean(origin);
      } else if (origin instanceof Number) {
        result = new Number(origin);
      } else if (origin instanceof String) {
        result = new String(origin);
      } else if (origin instanceof Error) {
        result = new constructor(origin.message);

        result.name = origin.name;
        result.message = origin.message;
        result.stack = origin.stack;
      } else if (origin instanceof Promise) {
        result = new Promise((resolve, reject) => {
          origin.then(value => resolve(clone(value))).catch(error => reject(clone(error)));
        });
      } else if (origin instanceof RegExp) {
        result = new RegExp(origin.source, origin.flags);
      } else if (origin instanceof URL) {
        result = new URL(origin.href);
      } else if (origin instanceof File) {
        result = new File([origin], origin.name, { type: origin.type, lastModified: origin.lastModified });
      } else if (origin instanceof ArrayBuffer) {
        result = origin.slice();
      } else if (origin instanceof DataView) {
        result = new DataView(clone(origin.buffer), origin.byteOffset, origin.byteLength);
      } else if (ArrayBuffer.isView(origin)) {
        result = new constructor(origin);
      }

      if (result) {
        Object.setPrototypeOf(result, prototype);
        cache.set(origin, result);
      } else {
        result = new constructor();
        cache.set(origin, result); // Need to set cache before cloning properties.

        if (origin instanceof Map) {
          for (let [key, value] of origin.entries()) {
            result.set(clone(key), clone(value));
          }
        } else if (origin instanceof Set) {
          for (let value of origin.values()) {
            result.add(clone(value));
          }
        }
      }

      assignProperties(origin, result);

      return result;
    }
  }
}

/**
 * Is Writable
 * @param [object] Object
 * @param [key] Key
 * @return Writable
 */
function isWritable(object: any, key: string | symbol): boolean {
  let descriptor = Object.getOwnPropertyDescriptor(object, key);

  return descriptor?.writable ?? false;
}
/**
 * Assign Properties
 * @param [origin] Origin
 * @param [result] Result
 */
function assignProperties(origin: any, result: any) {
  for (let i in origin) {
    if (isWritable(origin, i)) {
      result[i] = clone(origin[i]);
    }
  }

  for (let a of Object.getOwnPropertySymbols(origin)) {
    let descriptor = Object.getOwnPropertyDescriptor(origin, a);
    if (descriptor && descriptor.enumerable && isWritable(origin, a)) {
      result[a] = clone(origin[a]);
    }
  }
}

export { clone };
