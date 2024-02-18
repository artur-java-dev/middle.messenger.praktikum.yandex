import { UserAPI } from "../api/UserAPI";
import { ChangePasswordRequest, User, UserTextData } from "../api/entities/User";
import { getData } from "../data/Store";
import { apiHasError } from "../utils/http-utils";


class UserController {


  static async findUsers(login: string) {

    this.checkFindMe(login);

    const response = await UserAPI.findUsersByLogin({ login: login })
      .then(req => JSON.parse(req.response) as User[])
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);

    return response;

  }


  private static checkFindMe(login: string) {

    const me = getData<User>("user");
    if (login === me?.login)
      throw Error("Поиск по логину текущего пользователя невозможен");

  }


  static async findUser(login: string) {

    this.checkFindMe(login);

    const res = await UserAPI.findUsersByLogin({ login: login })
      .then(req => JSON.parse(req.response) as User[])
      .then(users => users.find(x => x.login === login));
    // .catch(reason => ({ reason }));

    if (apiHasError(res))
      throw Error(res.reason);


    return res;

  }


  static async changeUserData(data: UserTextData) {

    const response = await UserAPI.update(data)
      .then(req => JSON.parse(req.response) as User)
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);

    window.store.set("user", response);

  }


  static async changeUserAvatar(data: FormData) {

    const response = await UserAPI.updateAvatar(data)
      .then(req => JSON.parse(req.response) as User)
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);

    window.store.set("user.avatar", (response as User).avatar);

  }


  static async changePassword(data: ChangePasswordRequest) {

    const response = await UserAPI.updatePassword(data);

    return response;

  }


}


export { UserController };
