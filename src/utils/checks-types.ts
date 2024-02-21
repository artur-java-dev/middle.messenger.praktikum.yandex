import { ArrayOrObject, PlainObject, Primitive } from "./common-types";


function isPlainObject(o: unknown): o is PlainObject {

  const strfunc = Object.prototype.toString;

  return typeof o === "object" && o !== null
    && o.constructor === Object
    && (strfunc.call(o) === "[object Object]");

}


function isArray<T>(arr: unknown): arr is T[] {

  return Array.isArray(arr);

}


function isPrimitive(value: unknown): value is Primitive {

  const type = typeof value;

  return type === "bigint" ||
    type === "boolean" ||
    type === "number" ||
    type === "string";

}


function isStrArray(arr: unknown): arr is string[] {

  return Array.isArray(arr) && arr.length > 0 && typeof arr[0] === "string";

}


function isArrayOrObject(value: unknown): value is ArrayOrObject {

  return isPlainObject(value) || isArray(value);

}


export {
  isPlainObject, isArray,
  isArrayOrObject, isStrArray,
  isPrimitive
};
