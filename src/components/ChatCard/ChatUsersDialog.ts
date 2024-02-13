import { ChatUser, User } from "../../api/entities/User";
import { ChatController } from "../../controllers/ChatController";
import { UserController } from "../../controllers/UserController";
import { isEmpty } from "../../utils/validators-func";
import { CompositeBlock } from "../../view-base/CompositeBlock";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import { Input } from "../Input/Input";
import { SelectList } from "../SelectList/SelectList";


class ChatUsers extends CompositeBlock {

  private chatId: number;

  constructor(chatId: number) {

    super({ chatId },
      {
        header: new Header({ text: "Участники чата" }),

        inputLogin: inputLogin,
        usersList: usersList,

        addUserButton: new Button({
          label: "Добавить",
          onClick: () => this.addUser(),
        }),

        removeUserButton: new Button({
          label: "Удалить",
          onClick: () => this.removeUser(),
        }),
      });

    this.chatId = chatId;

    ChatController.getChatUsers(chatId).then(users =>
      usersList.props = { items: toListItems(users) }
    );
  }


  protected template() {
    return `
    <div class="chat-users-dialog">
        {{{ header }}}

        <div class="add-user-block">
          {{{ inputLogin }}}
          {{{ addUserButton }}}
        </div>

        <div class="users-block">
          {{{ usersList }}}
          {{{ removeUserButton }}}
        </div>
    </div>
    `;
  }


  protected doInit() {
  }


  addUser() {

    if (isEmpty(inputLogin.value))
      return;

    UserController.findUser(inputLogin.value)
      .then(user => {
        if (user) {
          ChatController.addUserToChat(this.chatId, user.id).then(() =>
            usersList.addItem(toListItem(user))
          );
        }
        else
          inputLogin.error = "Пользователь с таким логином не найден";
      });
  }


  removeUser() {

    if (isEmpty(usersList.value))
      return;

    const userId = Number(usersList.value);
    ChatController.removeUserFromChat(this.chatId, userId).then(() =>
      usersList.deleteItemByValue()
    );
  }


}

const inputLogin = new Input({ elementName: "inputLogin" });
const usersList = new SelectList({ elementName: "usersList", items: [] });

function toListItems(users: ChatUser[]) {
  return users.map(toListItem);
}

function toListItem(x: ChatUser | User) {
  return {
    id: x.id,
    value: `${x.first_name} ${x.second_name}`
  };
}



export { ChatUsers };

