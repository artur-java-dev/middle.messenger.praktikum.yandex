import { Chat } from "../../api/entities/Chat";
import { getData } from "../../data/Store";
import { CompositeBlock } from "../../view-base/CompositeBlock";
import { ChatCard, ChatInfo } from "../ChatCard/ChatCard";
import template from "./tmpl.hbs?raw";


type IProps = {
  chats: ChatInfo[],
  onSelect: OnSelectFunc
}


class ChatList extends CompositeBlock {

  selectedChat: ChatID = NoneChatID;

  constructor(props: IProps) {

    super(props, {});

    window.store.onUpdated(() => {

      this.props = {
        chats: getChatsFromStore()
      };

    },
    this);

  }


  protected doInit() {

    this.children.chatCards = createChatCards(this.props as IProps);

  }


  protected render() {

    this.children.chatCards = createChatCards(this.props as IProps);

    super.render();

  }


  protected template() {

    return template;

  }


  protected override wasUpdate(_oldProps: IProps, _newProps: IProps) {

    return _oldProps.chats.length !== _newProps.chats.length;

  }

}


type OnSelectFunc = (chatId: ChatID) => void;
type ChatID = number;

const NoneChatID = -1;


function createChatCards(props: IProps) {

  const arr = props.chats.map(chat => new ChatCard({ info: chat, onClick: props.onSelect! })
  );
  return arr;

}


function getChatsFromStore() {

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


export { ChatList, ChatID, NoneChatID, getChatsFromStore };

