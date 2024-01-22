import { getProp } from "../../utils/common";
import { Block, compileBlock } from "../../view-base/Block";


type IProps = MessageInfo

type MessageInfo = {
  text: string,
  time: string,
}

class Message extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(oldProps: object, newProps: object) {

    return getProp(newProps, "text") !== getProp(oldProps, "text");

  }


  protected override template() {

    return `
    <div class="message-block">
    <p>{{text}}</p>
    <span>{{time}}</span>
    </div>
    `;

  }

}


export { Message, MessageInfo };
