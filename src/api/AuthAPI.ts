import { HTTPTransport } from "../utils/HTTPTransport";
import { CreateUser, User, UserID } from "./entities/User";
import { APIError, LoginRequest } from "./types/types";


class AuthAPI {

  private readonly endpoint = "/auth";
  private http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport(this.endpoint);
  }


  async me(): Promise<User | APIError> {
    return this.http.get("/user")
      .then(req =>
        JSON.parse(req.response) as User
      )
      .catch(reason => ({ reason }));
  }


  async createUser(dataUser: CreateUser): Promise<UserID | APIError> {
    return this.http.post("/signup",
      { data: dataUser })
      .then(req =>
        JSON.parse(req.response) as UserID)
      .catch(reason => ({ reason }));
  }


  async login(dataLogin: LoginRequest): Promise<void | APIError> {
    return this.http.post("/signin",
      {
        data: dataLogin,
        headers: { "Content-Type": "application/json" }
      })
      .then(req =>
        req.status === 400 ?
          JSON.parse(req.response) :
          req.response)
      .catch(reason => ({ reason }));
  }


  async logout() {
    return this.http.post("/logout");
  }


}


const api = new AuthAPI;


export { api as AuthAPI };
