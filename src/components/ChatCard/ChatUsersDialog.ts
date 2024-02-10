import { ChatController } from "../../controllers/ChatController";
import { UserController } from "../../controllers/UserController";
import { isEmpty } from "../../utils/validators-func";
import { CompositeBlock } from "../../view-base/CompositeBlock";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import { InputElement } from "../InputElement/InputElement";


class ChatUsersDialog extends CompositeBlock {

  private chatId: number;

  constructor(chatId: number) {

    super({},
      {
        header: new Header({ text: "Участники чата" }),

        inputLogin: inputLogin,

        addUserButton: new Button({
          label: "Добавить участника",
          onClick: () => this.addUser(),
        }),

        removeUserButton: new Button({
          label: "Удалить участника",
          onClick: () => this.removeUser(),
        }),
      });

    this.chatId = chatId;
  }


  addUser() {
    const login = inputLogin.value;

    if (isEmpty(login))
      return;

    UserController.findUsers(login)
      .then(users => users.find(x => x.login === login))
      .then(user => {
        if (user)
          ChatController.addUserToChat(this.chatId, user.id);
        else
          alert("Пользователь с таким логином не найден");
      })
      .catch(reason => { reason });
  }


  removeUser() {
    const login = inputLogin.value;

    if (isEmpty(login))
      return;

    UserController.findUsers(login)
      .then(users => users.find(x => x.login === login))
      .then(user => {
        if (user)
          ChatController.removeUserFromChat(this.chatId, user.id);
        else
          alert("Пользователь с таким логином не найден");
      })
      .catch(reason => { reason });
  }


  protected template() {
    return `

        {{{ header }}}
        <div>
          {{{ inputLogin }}}
          {{{ addUserButton }}}
          {{{ removeUserButton }}}
        </div>
    `;
  }


}

const inputLogin = new InputElement({ elementName: "inputLogin" });


export { ChatUsersDialog };
