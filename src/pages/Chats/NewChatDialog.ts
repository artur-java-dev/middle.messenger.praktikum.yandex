import { Button } from "../../components/Button/Button";
import { Dialog } from "../../components/Dialog/Dialog";
import { ErrorBlock } from "../../components/ErrorBlock/ErrorBlock";
import { Header } from "../../components/Header/Header";
import { Input } from "../../components/Input/Input";
import { ChatController } from "../../controllers/ChatController";
import { isEmpty } from "../../utils/validators-func";
import { CompositeBlock } from "../../view-base/CompositeBlock";


class NewChatDialog extends CompositeBlock {

  constructor() {

    super({}, {
      header: new Header({ text: "Новый чат" }),

      chatTitle: chatTitle,
      error: error,

      closeButton: new Button({
        label: "Отменить",
        onClick: () => dlg.close()
      }),

      createButton: new Button({
        label: "Создать",
        onClick: () => this.createChat(),
      }),
    });

  }

  private createChat() {

    const title = chatTitle.value;

    if (isEmpty(title))
      return;

    ChatController.createChat(title)
      .then(() => dlg.close())
      .catch(reason => {

        error.props = { errMessage: reason };

      });

  }


  protected template() {

    return `

        {{{ header }}}
        {{{ chatTitle }}}
        {{{ error }}}
        <div>
          {{{ createButton }}}
          {{{ closeButton }}}
        </div>
    `;

  }

}

const chatTitle = new Input({
  label: "название чата",
  elementName: "chatTitle",
});

const error = new ErrorBlock();


const dlg = new Dialog(new NewChatDialog());


export { dlg as NewChatDialog };
