import Handlebars from "handlebars";
import avatar from "/static/assets/no-avatar.png";

export { default as ChatList } from "./tmpl.hbs?raw";

Handlebars.registerHelper("chats", () => [
    { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00", unreadedMessages: 2 },
    { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
    { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
    { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
    { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
    { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
    { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
    { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
]);
