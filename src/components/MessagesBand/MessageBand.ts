import { ServerLastMessage, ServerMessage } from "../../api/entities/Message";
import { CompositeBlock } from "../../view-base/CompositeBlock";
import { MessageInfo } from "../Message/Message";
import template from "./tmpl.hbs?raw";


type IProps = {
  messages: MessageInfo[],
}


class MessageBand extends CompositeBlock {

  constructor(props: IProps) {

    super(props, {});

  }

  addMessage(msg: ServerMessage | ServerLastMessage) {
    this.props = {
      messages: [
        ...this.props.messages as MessageInfo[],
        toMessageInfo(msg)]
    };
  }


  protected template() {

    return template;

  }


  protected override wasUpdate(_oldProps: IProps, _newProps: IProps) {

    return _oldProps.messages.length !== _newProps.messages.length;

  }

}

function toMessageInfo(msg: ServerMessage | ServerLastMessage): MessageInfo {
  return {
    text: msg.content,
    time: msg.time,
  };
}


export { MessageBand };

