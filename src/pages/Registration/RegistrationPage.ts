import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { collectValuesToObj } from "../../utils/form-utils";
import { SpecialChecks } from "../../utils/validators-func";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import { isPasswordRepeated } from "../PasswordSetting/PasswordSetting";
import template from "./tmpl.hbs?raw";


class RegistrationPage extends CompositeBlock {

  constructor(props: object = {}, components: Components = {}) {

    super(props, {
      ...components,
      title: title,
      firstNameInput: firstName,
      secondNameInput: secondName,
      loginInput: login,
      emailInput: email,
      phoneInput: phone,
      passwordInput: password,
      password2Input: password2,
      button: btn,
    }, {
      submit: (event) => {

        event.preventDefault();
        this.preSubmit();
        firstName.validate();
        secondName.validate();
        login.validate();
        email.validate();
        phone.validate();
        password.validate();
        isPasswordRepeated(password, password2);

      }
    });

  }


  private get form() {

    return this.element as HTMLFormElement;

  }

  private preSubmit() {

    console.log(collectValuesToObj(this.form));

  }


  protected override template() {

    return template;

  }


  protected override wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }

}

const title = new PageTitle({ text: "Регистрация" });

const firstName = new Input({
  label: "Имя", elementName: "first_name", validate: SpecialChecks.isValidFirstName
});
const secondName = new Input({
  label: "Фамилия", elementName: "second_name", validate: SpecialChecks.isValidSecondName
});
const login = new Input({
  label: "Логин", elementName: "login", validate: SpecialChecks.isValidLogin
});
const email = new Input({
  label: "Адрес почты", elementName: "email", validate: SpecialChecks.isValidEmail
});
const phone = new Input({
  label: "Номер телефона", elementName: "phone", validate: SpecialChecks.isValidPhone
});
const password = new Input({
  type: "password", label: "Пароль", elementName: "password", validate: SpecialChecks.isValidPassword
});
const password2 = new Input({
  type: "password", label: "Пароль (повтор)", elementName: "password_repeat"
});

const btn = new Button({ label: "Создать аккаунт", type: "submit" });


export { RegistrationPage };
