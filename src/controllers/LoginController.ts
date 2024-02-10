import { AuthAPI } from "../api/AuthAPI";
import { CreateUser } from "../api/entities/User";
import { Pathname, RouteManagement } from "../navigation/RouteManagement";
import { apiHasError } from "../utils/http-utils";


interface LoginFormModel {
  login: string;
  password: string;
}


class LoginController {


  static async signin(data: LoginFormModel) {
    const response = await AuthAPI.login({
      login: data.login,
      password: data.password
    });

    if (apiHasError(response))
      throw Error(response.reason);

    const me = await this.getUser();
    window.store.set("user", me);

    RouteManagement.go(Pathname.Chats);
  }


  static async getUser() {
    const responseUser = await AuthAPI.me();

    if (apiHasError(responseUser))
      throw Error(responseUser.reason);

    return responseUser;
  }


  static async signup(data: CreateUser) {
    const response = await AuthAPI.createUser(data);

    if (apiHasError(response))
      throw Error(response.reason);

    const me = await this.getUser();
    window.store.set("user", me);

    RouteManagement.go(Pathname.Chats);
  }


  static async logout() {
    await AuthAPI.logout()
      .then(req =>
        req.response)
      .catch(reason =>
        reason);

    window.store.set("user", null);
    window.store.set("chats", []);

    // RouteManagement.go(Pathname.Login);
  }

}


export { LoginController };
