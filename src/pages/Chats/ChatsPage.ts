import { Chat } from "../../api/entities/Chat";
import { ActionLink } from "../../components/ActionLink/ActionLink";
import { ChatInfo } from "../../components/ChatCard/ChatCard";
import { ChatID, ChatList } from "../../components/ChatList/ChatList";
import { Conversation } from "../../components/Conversation/Conversation";
import { PageLink } from "../../components/PageLink/PageLink";
import { Search } from "../../components/Search/Search";
import { AppController } from "../../controllers/AppController";
import { ChatController } from "../../controllers/ChatController";
import { Pathname } from "../../navigation/RouteManagement";
import { hasKey } from "../../utils/common";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import { NewChatDialog } from "./NewChatDialog";
import template from "./tmpl.hbs?raw";


class ChatsPage extends CompositeBlock {

  constructor(components: Components = {}) {

    super({}, {
      ...components,
      profileLink: new PageLink({ title: "Профиль", href: Pathname.Profile }),
      newChatLink: newChat,
      search: new Search(),

      chats: new ChatList({
        chats: getChatsFromStore(),
        onSelect: (chatId: ChatID) => {
          setConnection(chatId);
          // conversBlock.messages = ;
        }
      }),

      conversation: conversBlock,
      newChatDialog: NewChatDialog
    });

    window.store.onUpdated(
      () => this.child("chats").props.chats = getChatsFromStore(),
      this);

    // AppController.initChatPage();

  }


  protected render() {
    super.render();

    conversBlock.hide();
  }


  protected override template() {
    return template;
  }

}


const conversBlock = new Conversation();

const newChat = new ActionLink({
  label: "Создать чат",
  onClick: () => {
    NewChatDialog.open();
  }
});


function setConnection(chatId: number) {
  ChatController.createWebSocket(chatId).then(socket =>
    conversBlock.setConnection(socket)
  );
}


function getChatsFromStore() {
  if (!AppController.isAuthorized)
    return [];
  const res = (getData<Chat[]>("chats"))?.map(toChatInfo);
  return res ?? [];
}

function getData<T extends object = object>(key: string) {
  const state = window.store.getState();

  if (!hasKey(key, state))
    return null;

  return state[key] as T;
}

function toChatInfo(value: Chat): ChatInfo {
  return {
    id: value.id,
    avatarPath: value.avatar ?? undefined,
    chatName: value.title,
    lastMessage: value.last_message?.content,
    lastMessageTime: value.last_message?.time,
    unreadedMessages: value.unread_count,
  };
}


export { ChatsPage };

