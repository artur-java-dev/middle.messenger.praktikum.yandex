import Handlebars from "handlebars";
import attachIcon from "/static/assets/attach.png";
import sendIcon from "/static/assets/send.png";

export { default as Conversation } from "./tmpl.hbs?raw";

Handlebars.registerHelper("messageInputIcons",
    () => { return { attachIcon, sendIcon } });
