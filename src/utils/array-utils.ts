import { isArray } from "./checks-types";
import { isEmpty } from "./common";


type NestedArray = Array<NestedArray | unknown>;

function flatten(array: NestedArray, acc: Array<unknown> = []): Array<unknown> {

  array.forEach(elem => {

    if (isArray(elem))
      flatten(elem, acc);
    else
      acc.push(elem);

  });

  return acc;

}


function take<T>(list: T[], num: number = 1): T[] {

  if (!isArray(list))
    throw Error("list должен быть массивом");

  if (typeof num !== "number" || !isInt(num) || (num < 0))
    throw Error("num должен быть целым числом и не меньше 0");

  if (isEmpty(list) || num === 0)
    return [];

  const part: T[] = [];
  const count = Math.min(num, list.length);

  for (let n = 1; n <= count; n++)
    part.push(list[n - 1]);

  return part;

}

function isInt(num: number) {

  return Math.floor(num) === num;

}


function unzip(...arrays: Array<unknown>[]) {

  if (!isArray(arrays))
    throw Error(`${arrays} is not array`);

  for (const arr of arrays)
    if (!isArray(arr))
      throw Error(`${arr} is not array`);

  const result: Array<unknown>[] = [];
  const count = Math.max(...arrays.map(x => x.length));

  for (let n = 1; n <= count; n++)
    result.push(groupValues(n - 1, arrays));

  function groupValues(idx: number, arrays: Array<unknown>[]) {

    return arrays.map(a => (idx < a.length ? a[idx] : undefined));

  }

  return result;

}


export {
  flatten, take, unzip
};

