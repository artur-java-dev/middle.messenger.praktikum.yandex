import { getProp } from "../../utils/common";
import { CompositeBlock } from "../../view-base/CompositeBlock";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import { InputElement } from "../InputElement/InputElement";


type IProps = {
  type?: string,
  elementName: string,
  label: string,
  validate?: ValidateFunc,
}

class Input extends CompositeBlock {

  constructor(props: IProps) {

    super(props, {

      input: new InputElement({
        elementName: props.elementName,
        type: props.type,
        events: {
          blur: () => this.validate()
        }
      }),

      error: new ErrorBlock(),
    });

  }


  protected override template() {

    return `
    <div class="input-composite-block">

      <div class="input-label-block">
        <label>{{label}}</label>
        {{{ input }}}
      </div>

      {{{ error }}}
    </div>
    `;

  }


  public set error(message: string) {

    this.children.error.props = { errMessage: message };

  }

  public errorClear() {

    this.children.error.props = { errMessage: null };

  }

  public get value() {

    return this.input.value;

  }

  public set value(value: string) {

    this.input.value = value;

  }

  private get input() {

    return this.children.input.content as HTMLInputElement;

  }

  private get validateFunc() {

    return getProp(this.properties, "validate") as ValidateFunc;

  }


  validate(): boolean {

    const f = this.validateFunc;

    if (f === null)
      return true;

    const [isValid, msg] = f(this.input.value);

    if (!isValid) {

      const lines = msg.split("\n").map(_ => _.trim()).join("</br>");
      this.children.error.props = { errMessage: lines };
      return false;

    }

    this.children.error.props = { errMessage: null };
    return true;

  }


  protected override wasUpdate(oldProps: object, newProps: object) {

    return getProp(newProps, "label") !== getProp(oldProps, "label");

  }

}


type ValidateFunc = (s: string) => [boolean, string];


export { Input };
