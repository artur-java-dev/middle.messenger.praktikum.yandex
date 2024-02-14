import { ActionLink } from "../../components/ActionLink/ActionLink";
import { ChatID, ChatList, getChatsFromStore } from "../../components/ChatList/ChatList";
import { Conversation } from "../../components/Conversation/Conversation";
import { PageLink } from "../../components/PageLink/PageLink";
import { Search } from "../../components/Search/Search";
import { ChatController } from "../../controllers/ChatController";
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
      conversation: conversBlock,
      newChatDialog: NewChatDialog
    });

  }


  protected doInit() {

    const chats = new ChatList({
      chats: getChatsFromStore(),
      onSelect: (chatId: ChatID) => {

        if (chats.selectedChat === chatId)
          return;
        chats.selectedChat = chatId;
        clearConversation(chatId);
        setConnection(chatId);

      }
    });

    this.children.chats = chats;

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


function clearConversation(chatId: ChatID) {

  conversBlock.setVisible(false);
  conversBlock.messages = [];
  conversBlock.setCurrentChat(chatId);
  conversBlock.setVisible(true);

}

async function setConnection(chatId: number) {

  if (conversBlock.hasActiveConnection(chatId)) {

    return;

  }

  if (conversBlock.hasNonActiveConnection(chatId)) {

    conversBlock.reConnect(chatId);
    return;

  }

  const socket = await ChatController.createWebSocket(chatId);
  conversBlock.setConnection(socket, chatId);

}


export { ChatsPage };

