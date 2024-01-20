import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { PageLink } from "../../components/PageLink/PageLink";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { collectValuesToObj } from "../../utils/form-utils";
import { SpecialChecks, isEmpty } from "../../utils/validators-func";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import template from "./tmpl.hbs?raw";


class LoginPage extends CompositeBlock {

  constructor(props: object = {}, components: Components = {}) {

    super(props,
      {
        ...components,
        title: title,
        loginInput: login,
        passwordInput: password,

        button: new Button({ label: "Войти", type: "submit" }),

        regLink: link,
      },
      {
        submit: (event) => {

          event.preventDefault();
          this.preSubmit();
          login.validate();
          password.validate();

        }
      });

  }


  protected override doInit() {

    const self = this;
    this.children.button.addEventHandler("click", (event) => {

      event.preventDefault();
      self.preSubmit();

    });

  }

  private preSubmit() {

    if (isEmpty(login.value))
      return;

    const obj = collectValuesToObj(this.form);
    console.log(obj);

  }


  private get form() {

    return this.element as HTMLFormElement;

  }

  protected override template() {

    return template;

  }


  protected override wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }

}


const title = new PageTitle({ text: "Вход в аккаунт" });

const login = new Input({
  label: "Логин",
  elementName: "login",
  validate: SpecialChecks.isValidLogin
});

const password = new Input({
  label: "Пароль",
  type: "password",
  elementName: "password",
  validate: SpecialChecks.isValidPassword
});

const link = new PageLink({ title: "Создать аккаунт", href: "" });


export { LoginPage };
