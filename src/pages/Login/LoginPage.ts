import { Button } from "../../components/Button/Button";
import { ErrorBlock } from "../../components/ErrorBlock/ErrorBlock";
import { Input } from "../../components/Input/Input";
import { PageLink } from "../../components/PageLink/PageLink";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { LoginController } from "../../controllers/LoginController";
import { Pathname } from "../../navigation/RouteManagement";
import { SpecialChecks } from "../../utils/validators-func";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
// import template from "./tmpl.hbs?raw";


class LoginPage extends CompositeBlock {

  constructor(components: Components = {}) {

    super({
      events: {
        submit: (event: Event) => {

          event.preventDefault();

          const isValid = login.validate() && password.validate();

          if (!isValid)
            return;

          LoginController.signin({
            login: login.value,
            password: password.value
          }
          ).catch((e: Error) => this.outErr(e));

        }
      }
    },
      {
        ...components,
        title: title,
        loginInput: login,
        passwordInput: password,

        button: new Button({ label: "Войти", type: "submit" }),

        regLink: new PageLink({ title: "Создать аккаунт", href: Pathname.Registration }),
        error: new ErrorBlock(),
      });

  }


  private outErr(e: Error) {

    this.child<ErrorBlock>("error").props = { errMessage: e.message };

  }


  protected override template() {

    // return template;
    return `
    <form class="login-form">
    {{{ title }}}

    {{{ loginInput }}}
    {{{ passwordInput }}}

    <div class="button-signin">
        {{{ button }}}
    </div>

    {{{ error }}}

    {{{ regLink }}}

    </form>
    `;

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


export { LoginPage };
