import { UserAPI } from "../api/UserAPI";
import { ChangePasswordRequest, User, UserTextData } from "../api/entities/User";
import { apiHasError } from "../utils/http-utils";


class UserController {

  static async findUsers(login: string) {
    const response = await UserAPI.findUsersByLogin({ login: login })
      .then(req =>
        JSON.parse(req.response) as User[]);

    return response;
  }


  static async changeUserData(data: UserTextData) {
    const response = await UserAPI.update(data)
      .then(req =>
        JSON.parse(req.response) as User)
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);

    window.store.set("user", response);

    // RouteManagement.go(Pathname.Chats);
  }


  static async changeUserAvatar(data: FormData) {
    const response = await UserAPI.updateAvatar(data)
      .then(req =>
        JSON.parse(req.response) as User)
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);

    window.store.set("user.avatar", (response as User).avatar);
  }


  static async changePassword(data: ChangePasswordRequest) {
    const response = await UserAPI.updatePassword(data)

    return response;
  }


}


export { UserController };
