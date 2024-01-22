import { Block, compileBlock } from "../../view-base/Block";
import { ChatInfo } from "../ChatCard/ChatCard";
import template from "./tmpl.hbs?raw";


type IProps = {
  chats: ChatInfo[],
}

class ChatList extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected template() {

    return template;

  }


  protected wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }

}


export { ChatList };
