import { HTTPTransport } from "../utils/HTTPTransport";
import { EntityBaseAPI } from "./EntityBaseAPI";


class UserAPI extends EntityBaseAPI {

  private readonly endpoint = "api/v1/users";
  private http = new HTTPTransport(this.endpoint);


  create(data: object): Promise<XMLHttpRequest> {

    throw new Error("Method not implemented.");

  }

  request(urlParams: object): Promise<XMLHttpRequest> {

    throw new Error("Method not implemented.");

  }

  requestById(id: number) {

    return this.http.get(`/${id}`);

  }

  update(data: object): Promise<XMLHttpRequest> {

    throw new Error("Method not implemented.");

  }

  delete(data: object): Promise<XMLHttpRequest> {

    throw new Error("Method not implemented.");

  }

  static getUser(id: number) {

    return api.requestById(id);

  }

}


const api = new UserAPI;


export { UserAPI };
