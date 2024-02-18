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


  protected override wasUpdate(oldProps: IProps, newProps: IProps) {

    return newProps.text !== oldProps.text;

  }


  protected override template() {

    return `
    <div class="message-block">
    <p>{{text}}</p>
    <span>{{formatTime time}}</span>
    </div>
    `;

  }

}


export { Message, MessageInfo };
