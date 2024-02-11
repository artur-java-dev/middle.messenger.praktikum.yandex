import { BlockConstructable, registerComponent } from "./utils/ui-utils";
import { ChatCard } from "./components/ChatCard/ChatCard";
import { Message } from "./components/Message/Message";
import { AppController } from "./controllers/AppController";
import { Store } from "./data/Store";
import { RouteManagement } from "./navigation/RouteManagement";


registerComponent("ChatCard", ChatCard as BlockConstructable);
registerComponent("Message", Message as BlockConstructable);


// const pages: { [k: string]: CompositeBlock } = {
//   Login: new LoginPage(),
//   Registration: new RegistrationPage(),
//   Chats: new ChatsPage(),
//   Profile: new UserProfile(),
//   ChangePassword: new PasswordSetting(),
//   Error404: new Page404(),
//   Error500: new Page500(),
// };


// document.querySelector("nav")!.addEventListener("click",
//   e => {

//     const elem = e.target as HTMLElement;
//     if (elem.tagName === "A") {

//       const attr = elem.getAttribute("href");
//       navigateTo(pages[attr!.substring(1)]);

//     }

//   });


declare global {

  interface Window {
    store: Store;
  }

}


window.store = new Store();


document.addEventListener("DOMContentLoaded", async () => {

  // if (isTrue(sessionStorage.getItem("initPerformed"))) {
  //   return;
  // }

  await AppController.initApp();
  RouteManagement.init();
  sessionStorage.setItem("initPerformed", "true");
});


// window.addEventListener("load", e => {
// });
