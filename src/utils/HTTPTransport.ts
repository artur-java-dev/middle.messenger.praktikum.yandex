import { isEmptyObj } from "./common";
import { objToFormData } from "./form-utils";


class HTTPTransport {

  private urlBase: string;

  constructor(urlBase: string) {

    this.urlBase = urlBase;

  }


  public get(url: string, options: OptionsWithoutMethod = {}) {

    return this.request(url, { ...options, method: METHOD.GET });

  }

  public post(url: string, options: OptionsWithoutMethod = {}) {

    return this.request(url, { ...options, method: METHOD.POST });

  }

  public put(url: string, options: OptionsWithoutMethod = {}) {

    return this.request(url, { ...options, method: METHOD.PUT });

  }

  public delete(url: string, options: OptionsWithoutMethod = {}) {

    return this.request(url, { ...options, method: METHOD.DELETE });

  }

  public request(url: string, options: Options): Promise<XMLHttpRequest> {

    const { method, data } = options;
    const isGet = method === METHOD.GET;

    return new Promise((resolve, reject) => {

      const req = new XMLHttpRequest();

      const urlGet = isGet && typeof data === "object"
        ? `${this.urlBase + url}${this.queryStringify(data)}`
        : this.urlBase + url;

      req.withCredentials = options.needCookie ?? true;
      req.open(method, urlGet);

      req.onload = () => resolve(req);
      req.onabort = reject;
      req.onerror = reject;
      req.ontimeout = reject;

      if (method === METHOD.GET || !data) {

        req.send();
        return;

      }

      if (data instanceof FormData) {

        req.send(data);
        return;

      }

      if (typeof data === "object") {

        req.send(objToFormData(data));
        return;

      }

      req.send(data);

    });

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
        const sep = idx < keys.length - 1 ? "&" : "";
        const param = `${key}=${data[k]}${sep}`;
        return `${str}${param}`;

      },
      delim,
    );

  }

}

type Options = {
  method: string;
  data?: Document | XMLHttpRequestBodyInit | FormData | object;
  needCookie?: boolean;
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


export {
  HTTPTransport,
  Options, OptionsWithoutMethod, METHOD
};

