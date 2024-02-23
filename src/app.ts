import { BlockConstructable, registerComponent } from "./utils/ui-utils";
import { Message } from "./components/Message/Message";
import { AppController } from "./controllers/AppController";
import { RouteManagement } from "./navigation/RouteManagement";
import { formatMsgTime } from "./utils/date-time-utils";


window.addEventListener("load", () => {

  registerComponent("Message", Message as BlockConstructable);
  Handlebars.registerHelper("formatTime",
    date => formatMsgTime(date));

});


document.addEventListener("DOMContentLoaded", async () => {

  RouteManagement.init();
  await AppController.initApp();

});
