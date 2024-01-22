import { navigateTo } from "./utils/nav-utils";
import { LoginPage } from "./pages/Login/LoginPage";
import { RegistrationPage } from "./pages/Registration/RegistrationPage";
import { UserProfile } from "./pages/Profile/UserProfile";
import { PasswordSetting } from "./pages/PasswordSetting/PasswordSetting";
import { Page404 } from "./pages/404/Page404";
import { Page500 } from "./pages/500/Page500";
import { CompositeBlock } from "./view-base/CompositeBlock";
import { ChatsPage } from "./pages/Chats/ChatsPage";
import { BlockConstructable, registerComponent } from "./utils/ui-utils";
import { ChatCard } from "./components/ChatCard/ChatCard";
import { Message } from "./components/Message/Message";


registerComponent("ChatCard", ChatCard as BlockConstructable);
registerComponent("Message", Message as BlockConstructable);


const pages: { [k: string]: CompositeBlock } = {
  Login: new LoginPage(),
  Registration: new RegistrationPage(),
  Chats: new ChatsPage(),
  Profile: new UserProfile(),
  ChangePassword: new PasswordSetting(),
  Error404: new Page404(),
  Error500: new Page500(),
};


document.querySelector("nav")!.addEventListener("click",
  e => {

    const elem = e.target as HTMLElement;
    if (elem.tagName === "A") {

      const attr = elem.getAttribute("href");
      navigateTo(pages[attr!.substring(1)]);

    }

  });

document.addEventListener("DOMContentLoaded", () => navigateTo(pages.Login));
