import { UserAPI } from "../api/UserAPI";
import { Store } from "../data/Store";


class UserController {

  static getUser() {

    UserAPI.getUser().then(data => Store.set("user", data));

  }


}


export { UserController };
