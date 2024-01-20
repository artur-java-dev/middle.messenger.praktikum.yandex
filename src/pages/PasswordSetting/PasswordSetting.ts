import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { SpecialChecks } from "../../utils/validators-func";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import template from "./tmpl.hbs?raw";


class PasswordSetting extends CompositeBlock {

  constructor(props: object = {}, components: Components = {}) {
    super(props, {
      ...components,

      title: new PageTitle({ text: "Смена пароля" }),

      passwordCurrent: new Input({ label: "Текущий пароль", elementName: "oldPassword" }),

      passwordSet: new Input({
        label: "Новый пароль",
        elementName: "newPassword",
        validate: SpecialChecks.isValidPassword
      }),

      passwordSetRepeat: new Input({
        label: "Новый пароль (повтор)",
        elementName: "newPassword_repeat",
      }),

      button: new Button({ label: "Сохранить", type: "submit" }),
    });
  }


  protected override init() {
    if (this.children) {
      this.children.passwordSetRepeat.
        addEventHandler("blur", () =>
          this.isPasswordRepeated());

      super.init();
    }
  }

  private isPasswordRepeated() {
    const in1 = this.children.passwordSet as Input;
    const in2 = this.children.passwordSetRepeat as Input;

    if (in1.value !== in2.value) {
      in2.error = "необходимо повторить пароль";
      return false;
    }

    in2.errorClear();
    return true;
  }


  protected override template() {
    return template;
  }


  protected override wasUpdate(oldProps: object, newProps: object) {
    return false;
  }

}


export { PasswordSetting };
