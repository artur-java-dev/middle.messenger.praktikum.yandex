import { Obj } from "../../utils/common";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import { ImageButton } from "../ImageButton/ImageButton";
import { MessageBand } from "../MessagesBand/MessageBand";
import { TextInput } from "../TextInput/TextInput";
import attachIcon from "/static/assets/attach.png";
import sendIcon from "/static/assets/send.png";
import template from "./tmpl.hbs?raw";


class Conversation extends CompositeBlock {

  constructor(props: Obj = {}, components: Components = {}) {

    super(props, {
      ...components,
      messageBand: new MessageBand({ messages: props.messages }),
      attachFileButton: new ImageButton({ imagePath: attachIcon }),
      messageInput: new TextInput({ elementName: "message", placeholder: "Сообщение" }),
      sendMsgButton: new ImageButton({ imagePath: sendIcon, type: "submit" }),
    });

  }


  protected template() {

    return template;

  }


  protected wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }

}


export { Conversation };
