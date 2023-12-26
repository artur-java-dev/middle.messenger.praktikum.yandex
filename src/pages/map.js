import { PageLogin } from "./Login/module.js";
import { PageRegistration } from "./Registration/module.js";
import { PageChats } from "./Chats/module.js";
import { PageProfile } from "./Profile/module.js";
import { PageChangePassword } from "./ChangePassword/module.js";
import { PageError404 } from "./Error404/module.js";
import { PageError500 } from "./Error500/module.js";


export const pages = new Map([
    ["Login", PageLogin],
    ["Registration", PageRegistration],
    ["Chats", PageChats],
    ["PageProfile", PageProfile],
    ["PageChangePassword", PageChangePassword],
    ["PageError404", PageError404],
    ["PageError500", PageError500],
]);
