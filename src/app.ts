import { BlockConstructable, registerComponent } from "./utils/ui-utils";
import { Message } from "./components/Message/Message";
import { AppController } from "./controllers/AppController";
import { RouteManagement } from "./navigation/RouteManagement";


window.addEventListener("load", () => {

  registerComponent("Message", Message as BlockConstructable);

});


document.addEventListener("DOMContentLoaded", async () => {

  RouteManagement.init();
  await AppController.initApp();

});
