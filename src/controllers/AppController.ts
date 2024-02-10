import { RouteManagement } from "../navigation/RouteManagement";
import { ChatController } from "./ChatController";
import { LoginController } from "./LoginController";


class AppController {

  static isAuthorized = false;


  static async initApp() {

    let me = null;
    RouteManagement.init();

    try {
      me = await LoginController.getUser();
      this.isAuthorized = true;

    } catch (e) {
      return;
    }

    const chats = await ChatController.getChats();

    window.store.set("user", me);
    window.store.set("chats", chats);
  }


  static async initChatPage() {
    if (this.isAuthorized) {
      const chats = await ChatController.getChats();
      window.store.set("chats", chats);
    }
  }

}


export { AppController };
