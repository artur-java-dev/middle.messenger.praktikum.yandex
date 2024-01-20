import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { PageLink } from "../../components/PageLink/PageLink";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { SpecialChecks } from "../../utils/validators-func";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import template from "./tmpl.hbs?raw";


class LoginPage extends CompositeBlock {

  constructor(props: object = {}, components: Components = {}) {
    super(props, {
      ...components,
      title: title,
      loginInput: login,
      passwordInput: password,
      button: btn,
      regLink: link,
    });
  }


  protected override template() {
    return template;
  }


  protected override wasUpdate(oldProps: object, newProps: object) {
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
  elementName: "password",
  validate: SpecialChecks.isValidPassword
});

const btn = new Button({ label: "Войти", type: "submit" });

const link = new PageLink({ title: "Создать аккаунт", href: "" });


export { LoginPage };
