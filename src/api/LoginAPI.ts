import { HTTPTransport } from "../utils/HTTPTransport";
import { EntityBaseAPI } from "./EntityBaseAPI";
import { User } from "./entities/User";


class LoginAPI extends EntityBaseAPI {

  private readonly endpoint = "api/v1/auth";
  private http = new HTTPTransport(this.endpoint);


  create(data: object): Promise<XMLHttpRequest> {

    throw new Error("Method not implemented.");

  }

  request(urlParams: object) {

    return this.http.get("/", { data: urlParams });

  }

  requestById(id: number): Promise<XMLHttpRequest> {

    throw new Error("Method not implemented.");

  }

  update(data: object): Promise<XMLHttpRequest> {

    throw new Error("Method not implemented.");

  }

  delete(data: object): Promise<XMLHttpRequest> {

    throw new Error("Method not implemented.");

  }

  static async request(data: object) {

    const req = await api.request(data);
    const user = req.response as User;
    if (user.userID)
      return user.userID;
    throw Error("Auth failed");

  }

}


const api = new LoginAPI;


export { LoginAPI };
