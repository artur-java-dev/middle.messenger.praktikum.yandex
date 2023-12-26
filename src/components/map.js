import { InputElement } from "./InputElement/module.js";
import { ButtonElement } from "./ButtonElement/module.js";
import { ImgButtonElement } from "./ImgButtonElement/module.js";
import { ImageSelectElement } from "./ImageSelectElement/module.js";
import { PageLink } from "./PageLink/module.js";
import { Image } from "./Image/module.js";
import { Search } from "./Search/module.js";
import { ChatList } from "./ChatList/module.js";
import { Conversation } from "./Conversation/module.js";


export const components = new Map([
    ["InputElement", InputElement],
    ["ButtonElement", ButtonElement],
    ["ImgButtonElement", ImgButtonElement],
    ["ImageSelectElement", ImageSelectElement],
    ["PageLink", PageLink],
    ["Image", Image],
    ["Search", Search],
    ["ChatList", ChatList],
    ["Conversation", Conversation]
]);
