import { Primitive, StringIndexed } from "./common-types";


function queryStringify(data: StringIndexed): string {

  if (data === null || typeof data !== "object")
    throw Error('input must be an object');

  const params: Array<string> = [];
  const keys = Object.keys(data);

  for (const key of keys) {
    const prop = data[key];
    params.push(stringifyNested(prop, key));
  }

  return params.join("&");
}


function stringifyNested(data: unknown, key: string) {
  if (data === null || data === undefined)
    return "";

  if (typeof data !== "object")
    return stringifyPrimitive(key, data as Primitive);

  if (data instanceof Array)
    return stringifyArray(data, key);

  return stringifyObj(data, key);
}


function stringifyPrimitive(key: string, val: Primitive): string {
  return `${key}=${val}`;
}

function stringifyArray(data: unknown[], key: string): string {
  const params: string[] = [];
  data.forEach((e, i) =>
    params.push(stringifyNested(e, `${key}[${i}]`))
  );
  return params.join("&");
}

function stringifyObj(data: object, key: string): string {
  const params: string[] = [];
  Object.keys(data).forEach(k =>
    params.push(
      stringifyNested(data[k as keyof object],
        `${key}[${k}]`))
  );
  return params.join("&");
}


export { queryStringify };
