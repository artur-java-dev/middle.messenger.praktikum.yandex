function bind(fn: Function, context: unknown, ...boundArgs: unknown[]) {

  if (typeof fn !== "function") {
    throw TypeError("Bind must be called on a function");
  }

  return function (...args: unknown[]) {
    return fn.call(context,
      ...boundArgs,
      ...args);
  };

}


export { bind };
