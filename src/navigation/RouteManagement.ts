import { Page404 } from "../pages/404/Page404";
import { Page500 } from "../pages/500/Page500";
import { ChatsPage } from "../pages/Chats/ChatsPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { PasswordSetting } from "../pages/PasswordSetting/PasswordSetting";
import { UserProfile } from "../pages/Profile/UserProfile";
import { RegistrationPage } from "../pages/Registration/RegistrationPage";
import { CompositeBlock } from "../view-base/CompositeBlock";
import { Router } from "./Router";


class RouteManagement {

  private static router = Router.Instance;


  static init() {

    this.router.rootQuery = "#app";

    this.router
      .use(Pathname.Login, new LoginPage())
      .use(Pathname.Registration, new RegistrationPage())
      .use(Pathname.Profile, new UserProfile())
      .use(Pathname.Password, new PasswordSetting())
      .use(Pathname.Chats, new ChatsPage())
      .use(Pathname.Err404, new Page404())
      .use(Pathname.Err500, new Page500())
      .start();

  }


  static go(path: string) {
    return this.router.go(path);
  }

  static use(path: string, block: CompositeBlock) {
    return this.router.use(path, block);
  }

}


const enum Pathname {
  Login = "/",
  Registration = "/sign-up",
  Profile = "/settings",
  Password = "/set-password",
  Chats = "/messenger",
  Err404 = "/404-error",
  Err500 = "/500-error",
}


export { RouteManagement, Pathname };
