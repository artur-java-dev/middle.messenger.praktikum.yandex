import { Block, compileBlock } from "../../view-base/Block";
import { ChatInfo } from "../ChatCard/ChatCard";
import template from "./tmpl.hbs?raw";


type IProps = {
  chats: ChatInfo[],
  onSelect: OnSelectFunc
}

type OnSelectFunc = (chatId: ChatID) => void;

type ChatID = number;
const NoneChatID = -1;


class ChatList extends Block {

  selectedChat: ChatID = NoneChatID;

  constructor(props: IProps) {

    super(props);

  }


  protected doInit() {
    const func = this.props.onSelect as OnSelectFunc;
    this.props.onSelect = (chatId: ChatID) => {
      this.selectedChat = chatId;
      func(chatId);
    };
  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected template() {

    return template;

  }


  protected override wasUpdate(_oldProps: IProps, _newProps: IProps) {

    return _oldProps.chats.length !== _newProps.chats.length;

  }

}


export { ChatList, ChatID, NoneChatID };
