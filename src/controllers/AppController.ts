import { ChatController } from "./ChatController";
import { LoginController } from "./LoginController";


class AppController {

  static async initApp() {

    let me = null;

    try {

      me = await LoginController.getUser();

    } catch (e) {

      return;

    }

    const chats = await ChatController.getChats();

    window.store.set("user", me);
    window.store.set("chats", chats);

  }

}


export { AppController };
