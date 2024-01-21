import { Button } from "../../components/Button/Button";
import { ImageSelect } from "../../components/ImageSelect/ImageSelect";
import { Input } from "../../components/Input/Input";
import { PageLink } from "../../components/PageLink/PageLink";
import { PageTitle } from "../../components/PageTitle/PageTitle";
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
          this.preSubmit();
          firstName.validate();
          secondName.validate();
          login.validate();
          email.validate();
          phone.validate();

        }
      }
    }, {
      ...components,
      title: title,
      logoutLink: logoutLink,
      changePasswordLink: passwordLink,
      imageSelect: imgSelect,
      firstNameInput: firstName,
      secondNameInput: secondName,
      displayNameInput: displayName,
      loginInput: login,
      emailInput: email,
      phoneInput: phone,
      button: btn,
    });

  }


  private get form() {

    return this.element as HTMLFormElement;

  }

  private preSubmit() {

    console.log(collectValuesToObj(this.form));

  }

  protected override wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }


  protected override template() {

    return template;

  }

}

const title = new PageTitle({ text: "Профиль пользователя" });
const logoutLink = new PageLink({ title: "Выйти", href: "" });
const passwordLink = new PageLink({ title: "Изменить пароль", href: "" });
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

const btn = new Button({ label: "Сохранить", type: "submit" });


export { UserProfile };
