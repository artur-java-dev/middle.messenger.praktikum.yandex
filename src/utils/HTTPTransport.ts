import { BaseURL, Protocol } from "../api/constants";
import { isPrimitive } from "./checks-types";
import { hasKey, isEmptyObj } from "./common";
import { Indexed } from "./common-types";
import { objToFormData } from "./form-utils";


class HTTPTransport {

  private urlBase: string;

  constructor(path: string) {

    this.urlBase = Protocol + BaseURL + path;

  }


  public get(url: string, options: OptionsWithoutMethod = {}) {

    const urlGet
      = typeof options.data === "object" && !isEmptyObj(options.data)
        ? `${url}${this.queryStringify(options.data)}`
        : url;

    return this.request(urlGet, { ...options, method: METHOD.GET });

  }


  public post(url: string, options: OptionsWithoutMethod = {}) {

    setJSONheader(options);
    return this.request(url, { ...options, method: METHOD.POST });

  }


  public put(url: string, options: OptionsWithoutMethod = {}) {

    setJSONheader(options);
    return this.request(url, { ...options, method: METHOD.PUT });

  }


  public delete(url: string, options: OptionsWithoutMethod = {}) {

    setJSONheader(options);
    return this.request(url, { ...options, method: METHOD.DELETE });

  }


  public async request(url: string, options: Options, timeout?: Millisec): Promise<XMLHttpRequest> {

    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {

      const req = new XMLHttpRequest();

      req.open(method, this.urlBase + url);
      req.withCredentials = options.needCookie ?? true;
      if (timeout)
        req.timeout = timeout;
      this.setHeaders(headers, req);

      req.onload = () => resolve(req);
      req.onabort = () => reject(Error("Запрос был прерван"));
      req.onerror = () => reject(Error("Ошибка соединения"));
      req.ontimeout = () => reject(Error(`Истекло время ожидания ответа (${timeout})`));

      if (method === METHOD.GET || !data) {

        req.send(null);
        return;

      }

      if (data instanceof FormData) {

        req.send(data);
        return;

      }

      if (typeof data === "object") {

        const isJSON
          = headers[ContentTypeHeader]?.includes("application/json")
          ?? false;

        const isFormData
          = headers[ContentTypeHeader]?.includes("multipart/form-data")
          ?? false;

        if (isJSON)
          req.send(JSON.stringify(data));
        else
          req.send(isFormData ? objToFormData(data) : data.toString());

        return;

      }

      req.send(data);

    });

  }


  private setHeaders(headers: Indexed<string>, req: XMLHttpRequest) {

    Object.keys(headers)
      .forEach(k => req.setRequestHeader(k, headers[k])
      );

  }


  public fetchWithRetry(url: string, options: Options) {

    const { retries } = options;

    if (!retries)
      throw Error("нет свойства 'retries' в параметре 'options'");

    let triesLeft = retries;

    const fetch = (): Promise<XMLHttpRequest> => {

      triesLeft -= 1;

      return this.get(url, options).catch((e) => {

        if (triesLeft > 0)
          return fetch().then((_) => _.response);

        throw e;

      });

    };

    return fetch();

  }


  private queryStringify(data: object) {

    if (isEmptyObj(data))
      return "";

    const keys = Object.keys(data);
    const delim = "?";

    return keys.reduce(
      (str, key, idx) => {

        const k = <keyof object>key;
        const val = data[k];
        if (val === undefined || !isPrimitive(val))
          return str;

        const param = `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
        const sep = idx < keys.length - 1 ? "&" : "";
        return `${str}${param}${sep}`;

      },
      delim,
    );

  }

}

const ContentTypeHeader = "Content-Type";

type RequestBody = Document | XMLHttpRequestBodyInit | FormData | object | URLSearchParams;

type Options = {
  method: string;
  headers?: Indexed<string>,
  data?: RequestBody;
  needCookie?: boolean;
  withHeaders?: boolean;
  retries?: number;
};

type OptionsWithoutMethod = Omit<Options, "method">;

const enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

type Millisec = number;


function setJSONheader(options: OptionsWithoutMethod) {

  if (!options.data || !(options.withHeaders ?? true))
    return;

  if (!options.headers)
    options.headers = {};

  if (!hasKey(ContentTypeHeader, options.headers))
    options.headers[ContentTypeHeader] = "application/json";

}


export {
  HTTPTransport,
  Options, RequestBody, OptionsWithoutMethod, METHOD
};

