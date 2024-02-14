import { Chat } from "../../api/entities/Chat";
import { ActionLink } from "../../components/ActionLink/ActionLink";
import { ChatInfo } from "../../components/ChatCard/ChatCard";
import { ChatID, ChatList } from "../../components/ChatList/ChatList";
import { Conversation } from "../../components/Conversation/Conversation";
import { PageLink } from "../../components/PageLink/PageLink";
import { Search } from "../../components/Search/Search";
import { AppController } from "../../controllers/AppController";
import { ChatController } from "../../controllers/ChatController";
import { getData } from "../../data/Store";
import { Pathname } from "../../navigation/RouteManagement";
import { CompositeBlock } from "../../view-base/CompositeBlock";
import { NewChatDialog } from "./NewChatDialog";
import template from "./tmpl.hbs?raw";


class ChatsPage extends CompositeBlock {

  constructor() {

    super({}, {

      profileLink: new PageLink({ title: "Профиль", href: Pathname.Profile }),
      newChatLink: newChat,
      search: new Search(),

      chats: new ChatList({
        chats: getChatsFromStore(),
        onSelect: (chatId: ChatID) => {
          clearConversation();
          setConnection(chatId);
        }
      }),

      conversation: conversBlock,

      newChatDialog: NewChatDialog
    });

    window.store.onUpdated(() =>
      this.child("chats").props = {
        chats: getChatsFromStore()
      },
      this);

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


function clearConversation() {
  conversBlock.hide();
  conversBlock.messages = [];
  conversBlock.show();
}

async function setConnection(chatId: number) {

  if (conversBlock.hasActiveConnection(chatId))
    return;

  if (conversBlock.hasNonActiveConnection(chatId)) {
    conversBlock.reConnect(chatId);
    return;
  }

  const socket = await ChatController.createWebSocket(chatId);
  conversBlock.setConnection(socket, chatId);

}


function getChatsFromStore() {
  if (!AppController.isAuthorized)
    return [];
  const chats = getData<Chat[]>("chats");
  const res = chats?.map(toChatInfo);
  return res ?? [];
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

