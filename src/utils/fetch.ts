import { isEmptyObj } from "./common";
import { objToFormData } from "./form-utils";

class HTTPTransport {

  public get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {

    return this.request(
      url,
      { ...options, method: METHOD.GET },
    );

  }

  public post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {

    return this.request(
      url,
      { ...options, method: METHOD.POST },
    );

  }

  public put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {

    return this.request(
      url,
      { ...options, method: METHOD.PUT },
    );

  }

  public delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {

    return this.request(
      url,
      { ...options, method: METHOD.DELETE },
    );

  }

  public request(url: string, options: Options): Promise<XMLHttpRequest> {

    const { method, data } = options;
    const isGet = method === METHOD.GET;

    return new Promise((resolve, reject) => {

      const req = new XMLHttpRequest();
      const urlGet = isGet && typeof data === "object"
        ? `${url}${this.queryStringify(data)}`
        : url;

      req.open(method, urlGet);

      req.onload = () => {

        resolve(req);

      };

      req.onabort = reject;
      req.onerror = reject;
      req.ontimeout = reject;

      if (method === METHOD.GET || !data) {

        req.send();
        return;

      }

      if (data && typeof data === "object") {

        req.send(objToFormData(data));

      } else {

        req.send(data);

      }

    });

  }

  public fetchWithRetry(url: string, options: Options): Promise<XMLHttpRequest> {

    const { retries } = options;

    if (!retries) {

      throw Error("нет свойства 'retries' в параметре 'options'");

    }

    let triesLeft = retries;

    const fetch = (): Promise<XMLHttpRequest> => {

      triesLeft -= 1;

      return this.get(url, options).catch((e) => {

        if (triesLeft > 0) {

          return fetch().then((_) => _.response);

        }
        throw e;

      });

    };

    return fetch();

  }

  private queryStringify(data: object) {

    if (isEmptyObj(data)) {

      return "";

    }

    const keys = Object.keys(data);
    const delim = "?";

    return keys.reduce(
      (str, key, idx) => {

        const k = <keyof typeof data>key;
        return `${str}${key}=${data[k]}${idx < keys.length - 1 ? "&" : ""}`;

      },
      delim,
    );

  }

}

type Options = {
  method: string;
  data?: Document | XMLHttpRequestBodyInit | object;
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

export { HTTPTransport };
