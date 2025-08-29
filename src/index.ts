/**
 * Clone
 * @param [origin] Origin
 * @param [cache] Cache
 */
function clone<T = any>(origin: T) {
  return cloneWithCache(origin);
}

/**
 * Clone with Cache
 * @param [origin] Origin
 * @param [cache] Cache
 * @return Cloned Value
 */
function cloneWithCache<T = any>(origin: T, cache = new WeakMap<any, any>()): T {
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
          origin.then(value => resolve(cloneWithCache(value, cache))).catch(error => reject(cloneWithCache(error, cache)));
        });
      } else if (origin instanceof Date) {
        result = new Date(origin.getTime());
      } else if (origin instanceof RegExp) {
        result = new RegExp(origin.source, origin.flags);
      } else if (origin instanceof URL) {
        result = new URL(origin.href);
      } else if (origin instanceof File) {
        result = new File([origin], origin.name, { type: origin.type, lastModified: origin.lastModified });
      } else if (origin instanceof ArrayBuffer) {
        result = origin.slice();
      } else if (origin instanceof DataView) {
        result = new DataView(cloneWithCache(origin.buffer, cache), origin.byteOffset, origin.byteLength);
      } else if (ArrayBuffer.isView(origin)) {
        result = new constructor(origin);
      } else if (origin instanceof Array) {
        result = new Array();
        cache.set(origin, result); // Need to set cache before cloning properties.

        for (let a of origin) {
          result.push(cloneWithCache(a, cache));
        }
      } else if (origin instanceof Map) {
        result = new Map();
        cache.set(origin, result); // Need to set cache before cloning properties.

        for (let [key, value] of origin.entries()) {
          result.set(cloneWithCache(key, cache), cloneWithCache(value, cache));
        }
      } else if (origin instanceof Set) {
        result = new Set();
        cache.set(origin, result); // Need to set cache before cloning properties.

        for (let value of origin.values()) {
          result.add(cloneWithCache(value, cache));
        }
      }

      if (result) {
        Object.setPrototypeOf(result, prototype);
      } else {
        result = Object.create(prototype);
      }

      cache.set(origin, result);
      assignProperties(origin, result, cache);

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
 * @param [cache] Cache
 */
function assignProperties(origin: any, result: any, cache: WeakMap<any, any>) {
  for (let i in origin) {
    if (isWritable(origin, i)) {
      result[i] = cloneWithCache(origin[i], cache);
    }
  }

  for (let a of Object.getOwnPropertySymbols(origin)) {
    let descriptor = Object.getOwnPropertyDescriptor(origin, a);
    if (descriptor && descriptor.enumerable && isWritable(origin, a)) {
      result[a] = cloneWithCache(origin[a], cache);
    }
  }
}

export { clone };
