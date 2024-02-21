import { BaseURL, Protocol } from "../../api/constants";
import { User, UserTextData } from "../../api/entities/User";
import { ActionLink } from "../../components/ActionLink/ActionLink";
import { Button } from "../../components/Button/Button";
import { ImageSelect } from "../../components/ImageSelect/ImageSelect";
import { Input } from "../../components/Input/Input";
import { PageLink } from "../../components/PageLink/PageLink";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { LoginController } from "../../controllers/LoginController";
import { UserController } from "../../controllers/UserController";
import { getData } from "../../data/Store";
import { Pathname } from "../../navigation/Router";
import { isEmpty } from "../../utils/common";
import { collectValuesToObj } from "../../utils/form-utils";
import { SpecialChecks } from "../../utils/validators-func";
import { CompositeBlock, Components } from "../../view-base/CompositeBlock";
import template from "./tmpl.hbs?raw";
import avatar from "/static/assets/no-avatar.png";


class UserProfile extends CompositeBlock {

  constructor(components: Components = {}) {

    super({
      events: {
        submit: (event: Event) => {

          event.preventDefault();

          const isValid = this.validate();

          if (!isValid)
            return;

          const data = collectValuesToObj(this.form) as UserTextData;
          console.log(data);

          UserController.changeUserData(data)
            .catch(reason => this.outErr(reason));

        }
      }
    }, {
      ...components,
      toChatsLink: new PageLink({ title: "< Вернуться", href: Pathname.Chats }),
      title: new PageTitle({ text: "Профиль пользователя" }),
      logoutLink: logoutLink,
      changePasswordLink: new PageLink({ title: "Изменить пароль", href: Pathname.Password }),
      imageSelect: imgSelect,
      updateAvatarLink: avatarLink,
      firstNameInput: firstName,
      secondNameInput: secondName,
      displayNameInput: displayName,
      loginInput: login,
      emailInput: email,
      phoneInput: phone,
      button: new Button({ label: "Сохранить", type: "submit" }),
    });

    window.store.onUpdated(
      () => this.setValues(),
      this);

  }


  protected doInit() {

    this.setValues();

  }


  private setValues() {

    const user = getData<User>("user");

    if (user === null)
      return;

    this.props.user = user;

    const path = isEmpty(user.avatar)
      ? avatar
      : `${Protocol + BaseURL}/resources${user.avatar}`;
    imgSelect.props = { imagePath: path };

    firstName.value = user.first_name;
    secondName.value = user.second_name;
    displayName.value = user.display_name;
    login.value = user.login;
    email.value = user.email;
    phone.value = user.phone;

  }

  private outErr(reason: unknown) {

    this.child("error").props = { errMessage: reason };

  }


  private validate() {

    return firstName.validate()
      && secondName.validate()
      && login.validate()
      && email.validate()
      && phone.validate();

  }


  private get form() {

    return this.element?.querySelector("#profile-data-form") as HTMLFormElement;

  }


  protected override wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }


  protected override template() {

    return template;

  }

}


const logoutLink = new PageLink({
  title: "Выйти из аккаунта",
  href: "",
  onclick: () => {

    LoginController.logout();

  }
});

const avatarLink = new ActionLink({
  label: "обновить аватар",
  onClick: () => {

    if (imgSelect.data)
      UserController.changeUserAvatar(imgSelect.data);

  }
});


const imgSelect = new ImageSelect({ imagePath: avatar, elementName: "avatar" });

const firstName = new Input({
  label: "Имя", elementName: "first_name", validate: SpecialChecks.isValidFirstName
});

const secondName = new Input({
  label: "Фамилия", elementName: "second_name", validate: SpecialChecks.isValidSecondName
});

const displayName = new Input({ label: "Имя в чате", elementName: "display_name" });

const login = new Input({
  label: "Логин", elementName: "login", validate: SpecialChecks.isValidLogin
});

const email = new Input({
  label: "Адрес почты", elementName: "email", validate: SpecialChecks.isValidEmail
});

const phone = new Input({
  label: "Номер телефона", elementName: "phone", validate: SpecialChecks.isValidPhone
});


export { UserProfile };
