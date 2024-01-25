import { LoginAPI } from "../api/LoginAPI";
import { RouteManagement } from "../navigation/RouteManagement";


interface LoginFormModel {
  email: string;
  password: string;
}


class UserLoginController {

  public async login(data: LoginFormModel) {

    try {

      // Запускаем крутилку

      const userID = LoginAPI.request(prepare(data));

      RouteManagement.go("/chats");

      // Останавливаем крутилку

    } catch (error) {

      throw error;

    }

  }

}


function prepare(data: LoginFormModel): object {

  throw new Error("Function not implemented.");

}


export { UserLoginController };
