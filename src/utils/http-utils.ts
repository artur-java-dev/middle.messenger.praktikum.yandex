import { APIError } from "../api/types/types";
import { isArrayOrObject, isPlainObject } from "./checks-types";
import { hasKey } from "./common";
import { PlainObject } from "./common-types";


function queryStringify(data: PlainObject): string {

  if (!isPlainObject(data))
    throw Error("параметр data должен быть объектом");

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
    return stringifyPrimitive(key, data);

  if (data instanceof Array)
    return stringifyArray(data, key);

  return stringifyObj(data, key);
}


function stringifyPrimitive(key: string, val: unknown) {
  return `${key}=${encodeURIComponent(String(val))}`;
}

function stringifyArray(data: unknown[], key: string) {
  const params: string[] = [];
  data.forEach((e, i) =>
    params.push(
      stringifyNested(e, `${key}[${i}]`))
  );
  return params.join("&");
}

function stringifyObj(data: object, key: string) {
  const params: string[] = [];
  Object.keys(data).forEach(k =>
    params.push(
      stringifyNested(data[k as keyof object],
        `${key}[${k}]`))
  );
  return params.join("&");
}




function getKey(key: string, parentKey?: string) {
  return parentKey ?
    `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {

  const result: [string, string][] = [];
  const kvPairs = Object.entries(data);

  for (const [key, val] of kvPairs) {
    const k = getKey(key, parentKey);
    if (isArrayOrObject(val))
      result.push(...getParams(val, k));
    else
      result.push([k, encodeURIComponent(String(val))]);
  }

  return result;
}

function queryString(data: PlainObject) {

  if (!isPlainObject(data))
    throw Error("параметр data должен быть объектом");

  const params = getParams(data);

  return params
    .map(pair => pair.join('='))
    .join('&');

}

function apiHasError(response: unknown): response is APIError {
  return typeof response === "object" &&
    response !== null &&
    hasKey("reason", response);
}


export { queryStringify, queryString, apiHasError };
