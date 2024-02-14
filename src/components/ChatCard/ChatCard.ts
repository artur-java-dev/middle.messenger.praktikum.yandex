import { CompositeBlock } from "../../view-base/CompositeBlock";
import { ActionLink } from "../ActionLink/ActionLink";
import { Dialog } from "../Dialog/Dialog";
import { ChatUsers } from "./ChatUsersDialog";
import template from "./tmpl.hbs?raw";


type IProps = {
  info: ChatInfo,
  onClick: (chatId: number) => void
}

type ChatInfo = {
  id: number,
  avatarPath?: string,
  chatName: string,
  lastMessage?: string,
  lastMessageTime?: string,
  unreadedMessages?: number,
}


class ChatCard extends CompositeBlock {

  constructor(props: IProps) {

    super(props, {

      chatUsersLink: new ActionLink({
        label: "участники",
        onClick: () => {

          this.dialog().open();

        }
      }),

      chatUsersDialog: new Dialog(new ChatUsers(props.info.id)),
    });

  }


  protected render() {

    super.render();

    const p = this.props as IProps;
    this.content.addEventListener("click",
      () => p.onClick(p.info.id)
    );

  }


  private dialog() {

    return this.child<Dialog>("chatUsersDialog");

  }


  protected override template() {

    return template;

  }

}


export { ChatCard, ChatInfo };
