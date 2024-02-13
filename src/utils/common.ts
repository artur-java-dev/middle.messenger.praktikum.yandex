import { NameSpace } from "./common-types";


function namespace(s: string): NameSpace {

  validate(s);

  const names = s.split(".");

  const obj: NameSpace = {};
  let curr = obj;

  for (const name of names) {

    if (name === "" || startsWithDigit(name))
      throw Error("invalid string");

    curr[name] = {};
    curr = curr[name];

  }

  return obj;

}

function validate(s: string) {

  const re = /[a-zA-Z0-9.]/;

  if (!s.match(re))
    throw Error("invalid string");

}

function startsWithDigit(name: string) {

  const re = /^[0-9]/;
  return re.test(name);

}


function isEmpty(value: unknown) {

  if (value === null || value === undefined) {

    return true;

  }

  if (typeof value === "number") {

    return true;

  }

  if (typeof value === "boolean") {

    return true;

  }

  if (value === "") {

    return true;

  }

  if (value instanceof Set) {

    return value.size === 0;

  }

  if (value instanceof Map) {

    return value.size === 0;

  }

  if (Array.isArray(value)) {

    return value.length === 0;

  }

  if (typeof value === "object") {

    return isEmptyObj(value);

  }

  return false;

}

function isEmptyObj(obj: object) {

  return Object.keys(obj).length === 0;

}


function hasKey(key: string | number, obj: object) {

  return !obj ? false : (key in obj);

}

function getProp(obj: object, key: string | number): unknown {

  const k = <keyof typeof obj>key;

  if (hasKey(key, obj))
    return obj[k];

  return null;
  // throw Error(`в 'obj' нет свойства '${key}'`);

}


function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}


function isTrue(value: unknown) {
  if (typeof (value) === 'string')
    value = value.trim().toLowerCase();

  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
}


export {
  namespace, isEmpty, isEmptyObj, hasKey, getProp, getValue, isTrue
};
