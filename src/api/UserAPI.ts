import { HTTPTransport, RequestBody } from "../utils/HTTPTransport";
import { ChangePasswordRequest } from "./entities/User";


class UserAPI {

  private readonly endpoint = "/user";
  private http = new HTTPTransport(this.endpoint);

  requestById(id: number) {

    return this.http.get(`/${id}`);

  }

  update<T extends RequestBody>(userData: T): Promise<XMLHttpRequest> {

    return this.http.put("/profile",
      { data: userData });

  }

  updateAvatar(avatarData: FormData) {

    return this.http.put("/profile/avatar",
      {
        withHeaders: false,
        data: avatarData
      });

  }

  updatePassword(reqData: ChangePasswordRequest) {

    return this.http.put("/password",
      { data: reqData });

  }

  findUsersByLogin(reqData: { login: string; }) {

    return this.http.post("/search",
      { data: reqData });

  }

}


const api = new UserAPI;


export { api as UserAPI };
