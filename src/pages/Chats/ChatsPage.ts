import { ChatList } from "../../components/ChatList/ChatList";
import { Conversation } from "../../components/Conversation/Conversation";
import { PageLink } from "../../components/PageLink/PageLink";
import { Search } from "../../components/Search/Search";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import template from "./tmpl.hbs?raw";


class ChatsPage extends CompositeBlock {

  constructor(props: object = {}, components: Components = {}) {
    super(props, {
      ...components,
      profileLink: new PageLink({ title: "Профиль", href: "" }),
      search: new Search(),
      chats: new ChatList({ chats: chats }),
      conversation: new Conversation(),
    });
  }


  protected override template() {
    return template;
  }


  protected override wasUpdate(_oldProps: object, _newProps: object) {
    return false;
  }

}

import avatar from "/static/assets/no-avatar.png";
const chats = [
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00", unreadedMessages: 2 },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00", unreadedMessages: 2 },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00", unreadedMessages: 2 },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
  { avatarPath: avatar, chatName: "User", lastMessage: "message", lastMessageTime: "00:00" },
];


export { ChatsPage };
