import { ChangePasswordRequest } from "../../api/entities/User";
import { Button } from "../../components/Button/Button";
import { ErrorBlock } from "../../components/ErrorBlock/ErrorBlock";
import { Input } from "../../components/Input/Input";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { UserController } from "../../controllers/UserController";
import { collectValuesToObj } from "../../utils/form-utils";
import { SpecialChecks, isEmpty } from "../../utils/validators-func";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import { OnSaveDialog } from "./OnSaveDialog";
import template from "./tmpl.hbs?raw";


class PasswordSetting extends CompositeBlock {

  constructor(components: Components = {}) {

    super({
      events: {
        submit: (event: Event) => {

          event.preventDefault();

          this.outErr(null);

          if (isEmpty(passwordCurrent.value))
            return;

          if (!passwordSet.validate())
            return;

          if (!isPasswordRepeated(passwordSet, passwordSetRepeat))
            return;

          const obj = collectValuesToObj(this.form);
          console.log(obj);

          UserController.changePassword(obj as ChangePasswordRequest)
            .then(req => {
              if (req.status === 200)
                OnSaveDialog.open();
              else if (req.status === 400)
                this.outErr(JSON.parse(req.response).reason)
              else
                this.outErr(req.response)
            })
            .catch(reason => this.outErr(reason));

        }
      }
    }, {
      ...components,
      title: title,
      passwordCurrent: passwordCurrent,
      passwordSet: passwordSet,
      passwordSetRepeat: passwordSetRepeat,
      button: new Button({ label: "Сохранить", type: "submit" }),
      OnSaveDialog: OnSaveDialog,
      error: new ErrorBlock(),
    });

  }


  private outErr(reason: unknown) {
    this.child<ErrorBlock>("error").props = { errMessage: reason };
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

const title = new PageTitle({ text: "Смена пароля" });

const passwordCurrent = new Input({
  label: "Текущий пароль",
  type: "password",
  elementName: "oldPassword"
});

const passwordSet = new Input({
  label: "Новый пароль",
  type: "password",
  elementName: "newPassword",
  validate: SpecialChecks.isValidPassword
});

const passwordSetRepeat = new Input({
  label: "Новый пароль (повтор)",
  type: "password",
  elementName: "newPassword_repeat",
});

function isPasswordRepeated(in1: Input, in2: Input) {

  if (in1.value !== in2.value) {

    in2.error = "необходимо повторить пароль";
    return false;

  }

  in2.errorClear();
  return true;

}


export { PasswordSetting, isPasswordRepeated };
