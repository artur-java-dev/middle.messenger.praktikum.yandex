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


  protected template() {

    return template;

  }


  protected wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }

}


export { MessageBand };
