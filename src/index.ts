/**
 * Clone
 * @param [origin] Origin
 */
function clone<T = any>(origin: T): T {
  if (typeof origin !== 'object' || origin === null) {
    return origin;
  } else {
    return origin;
  }
}

export { clone };
