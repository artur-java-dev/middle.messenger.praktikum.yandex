import { CompositeBlock } from "../../view-base/CompositeBlock";
import { ChatCard, ChatInfo } from "../ChatCard/ChatCard";
import template from "./tmpl.hbs?raw";


type IProps = {
  chats: ChatInfo[],
  onSelect: OnSelectFunc
}

type OnSelectFunc = (chatId: ChatID) => void;

type ChatID = number;
const NoneChatID = -1;


class ChatList extends CompositeBlock {

  selectedChat: ChatID = NoneChatID;

  constructor(props: IProps) {

    super(props, {
      chatCards: createChatCards(props)
    });

  }


  protected doInit() {
    // const p = this.props as IProps;
    // this.props.onSelect = (chatId: ChatID) => {
    //   this.selectedChat = chatId;
    //   p.onSelect(chatId);
    // };
  }


  protected render() {
    // this.children.chatCards = createChatCards(this.props as IProps);

    super.render();
  }


  protected template() {

    return template;

  }


  protected override wasUpdate(_oldProps: IProps, _newProps: IProps) {

    return _oldProps.chats.length !== _newProps.chats.length;

  }

}


function createChatCards(props: IProps) {
  const arr = props.chats.map(chat =>
    new ChatCard({ info: chat, onClick: props.onSelect })
  );
  return arr;
}


export { ChatList, ChatID, NoneChatID };
