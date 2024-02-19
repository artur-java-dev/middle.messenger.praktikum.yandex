import { LogicError } from "./common-errors";
import { Indexed } from "./common-types";


class MergeErr extends LogicError {

  constructor(msg: string) {

    super(`Невозможно выполнить ${merge.name}.\n Причина: ${msg}`);

  }

}


function merge(lhs: Indexed, rhs: Indexed): Indexed {

  const to = { ...lhs };
  const from = { ...rhs };

  for (const k in from) {

    if (!Object.prototype.hasOwnProperty.call(from, k))
      continue;

    if (!Object.prototype.hasOwnProperty.call(to, k)) {

      to[k] = from[k];
      continue;

    }

    if (typeof to[k] !== "object" || typeof from[k] !== "object") {

      const s = `свойства '${k}' не являются объектами`;
      throw new MergeErr(s);

    }

    to[k] = merge(to[k] as Indexed, from[k] as Indexed);

  }

  return to;

}


function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {

  if (typeof object !== "object" || object === null)
    return object;

  const props = path.split(".");

  let curr = object as Indexed;
  let ref = curr;
  let targetProp = "";

  for (const prop of props) {

    if (!Object.prototype.hasOwnProperty.call(curr, prop))
      curr[prop] = {};

    ref = curr;
    targetProp = prop;

    curr = curr[prop] as Indexed;

  }

  ref[targetProp] = value;

  return object;

}


function cloneDeep<T extends object = object>(obj: T): T {

  if (Array.isArray(obj)) {

    return cloneArray(obj) as T;

  }

  const copy: { [P in keyof T]: unknown } = {} as T;

  for (const key in obj) {

    const nested = obj[key] as unknown;

    if (Array.isArray(nested)) {

      copy[key] = cloneArray(nested);
      continue;

    }

    if (typeof nested === "object") {

      copy[key] = (nested === null) ? null : cloneDeep(nested);
      continue;

    }

    copy[key] = obj[key];

  }

  return copy as T;

}


function cloneArray(a: unknown[]) {

  const copy: unknown[] = [];

  a.forEach((e, i) => {

    if (Array.isArray(e))
      copy[i] = cloneArray(e);

    else if (typeof e === "object")
      if (e === null)
        copy[i] = null;
      else
        copy[i] = cloneDeep(e);

    else
      copy[i] = e;

  });

  return copy;

}


function omit<T extends object>(obj: T, fields: (keyof T)[]) {
  const newObj = cloneDeep(obj);

  for (const f of fields)
    delete newObj[f];

  return newObj;
}



export { merge, set, cloneDeep, cloneArray, omit };

