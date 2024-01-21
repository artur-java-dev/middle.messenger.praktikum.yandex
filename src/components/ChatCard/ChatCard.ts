import { Block, compileBlock } from "../../view-base/Block";


type IProps = {
  info: ChatInfo,
}

type ChatInfo = {
  avatarPath?: string,
  chatName: string,
  lastMessage?: string,
  lastMessageTime?: string,
  unreadedMessages?: number,
}

class ChatCard extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }


  protected override template() {

    return `
    <div class="chat-block">

    <div class="chat-info-1">
        <img src="{{info.avatarPath}}" />
        <div>
            <h3>{{info.chatName}}</h3>
            <p>{{info.lastMessage}}</p>
        </div>
    </div>


    <div class="chat-info-2">
        <div>{{info.lastMessageTime}}</div>
        {{#if info.unreadedMessages}}
        <div class="unreaded">{{info.unreadedMessages}}</div>
        {{/if}}
    </div>

    </div>
    `;

  }

}


export { ChatCard, ChatInfo };
