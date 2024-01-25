import { ArrayOrObject, PlainObject } from "./common-types";


function isPlainObject(o: unknown): o is PlainObject {

  const strfunc = Object.prototype.toString;

  return typeof o === "object" && o !== null
    && o.constructor === Object
    && (strfunc.call(o) === "[object Object]");

}


function isArray(arr: unknown): arr is [] {

  return Array.isArray(arr);

}


function isArrayOrObject(value: unknown): value is ArrayOrObject {

  return isPlainObject(value) || isArray(value);

}


export { isPlainObject, isArray, isArrayOrObject };
