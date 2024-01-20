type NameSpace = { [k: string]: NameSpace };
type Obj = { [k: string]: unknown };



function namespace(s: string): NameSpace {
  validate(s);

  const names = s.split(".");

  let obj: NameSpace = {};
  let curr = obj;
  for (let name of names) {
    if (name === "" || startsWithDigit(name))
      throw Error("invalid string");
    curr[name] = {};
    curr = curr[name];
  }

  return obj;
}

function validate(s: string) {
  const re = /[a-zA-Z0-9\.]/;
  if (!s.match(re))
    throw Error("invalid string");
}

function startsWithDigit(name: string): boolean {
  const re = /^[0-9]/;
  return re.test(name);
}


function isEmpty(value: unknown) {

  if (value === null || value === undefined)
    return true;

  if (typeof value === "number")
    return true;

  if (typeof value === "boolean")
    return true;

  if (value === "")
    return true;

  if (value instanceof Set)
    return value.size === 0;

  if (value instanceof Map)
    return value.size === 0;

  if (Array.isArray(value))
    return value.length === 0;

  if (typeof value === "object")
    return isEmptyObj(value);

  return false;
}

function isEmptyObj(obj: object) {
  for (let p in obj)
    if (obj.hasOwnProperty(p))
      return false;
  return true;
}


function hasKey(key: string | number, obj: object) {
  return (key in obj);
}

function getProp(obj: object, key: string | number): unknown {
  const k = <keyof typeof obj>key;
  if (hasKey(key, obj))
    return obj[k];
  return null;
  // throw Error(`в 'obj' нет свойства '${key}'`);
}


export {
  namespace,
  isEmpty, isEmptyObj,
  hasKey, getProp,
  Obj
};
