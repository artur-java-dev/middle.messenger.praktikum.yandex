import { PlainObject } from "./common-types";
import { isArrayOrObject, isPlainObject, isArray } from "./checks-types";


function isEqualObjects(a: object, b: object): boolean {

  if (a === b || (a === null && b === null))
    return true;

  if (a === null || b === null)
    return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length)
    return false;

  return aKeys.every(key => {

    if (!b.hasOwnProperty(key))
      return false;

    const k = <keyof typeof a>key;

    if (typeof a[k] !== "object")
      return (typeof a[k] === typeof b[k]) ? a[k] === b[k] : false;

    return (typeof b[k] === "object") ? isEqualObjects(a[k], b[k]) : false;

  });

}

function isEqualObjectsProp(a: object, b: object, key: string): boolean {
  if (a === null || b === null)
    return false;

  if (a === b)
    return true;

  const k = <keyof typeof a>key;
  return a[k] === b[k];

}


function isEqual(lhs: PlainObject, rhs: PlainObject) {

  if (Object.keys(lhs).length !== Object.keys(rhs).length)
    return false;

  for (const [key, val] of Object.entries(lhs)) {

    const rVal = rhs[key];

    if (isArrayOrObject(val) && isArrayOrObject(rVal)) {
      if (isPlainObject(val) && isPlainObject(rVal) && isEqual(val, rVal))
        continue;
      if (isArray(val) && isArray(rVal) && isEqualArrays(val, rVal))
        continue;
      return false;
    }

    if (Number.isNaN(val) && Number.isNaN(rVal))
      continue;

    if (val !== rVal)
      return false;
  }

  return true;
}


function isEqualArrays(lhs: [], rhs: []) {

  function is(e: unknown, i: number): boolean {
    return isPlainObject(e) && isPlainObject(rhs[i]) ?
      isEqual(e, rhs[i]) :
      Array.isArray(e) && Array.isArray(rhs[i]) ?
        isEqualArrays(e as [], rhs[i]) :
        Number.isNaN(e) && Number.isNaN(rhs[i]) ?
          true :
          e === rhs[i];
  }

  if (lhs.length !== rhs.length)
    return false;

  return lhs.every((e, i) => is(e, i));
}


export { isEqual, isEqualArrays, isEqualObjects, isEqualObjectsProp };
