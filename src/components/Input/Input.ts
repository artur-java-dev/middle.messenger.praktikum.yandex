import { getProp } from "../../utils/common";
import { EventsObj } from "../../view-base/Block";
import { CompositeBlock } from "../../view-base/CompositeBlock";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import { InputElement } from "../InputElement/InputElement";


class Input extends CompositeBlock {

  constructor(props: object, events: EventsObj = {}) {
    super(props, {

      input: new InputElement({ elementName: getProp(props, "elementName") },
        {
          ...events,
          "blur": () => this.validate(),
        }),

      error: new ErrorBlock(),
    },
      events);
  }


  public override addEventHandler(event: string, f: EventListenerOrEventListenerObject) {
    this.children.input.addEventHandler(event, f);
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

  private get input() {
    return this.children.input.content as HTMLInputElement;
  }

  private get validateFunc() {
    return getProp(this.properties, "validate") as ValidateFunc;
  }


  private validate() {

    const f = this.validateFunc;

    if (f === null)
      return;

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

}


type ValidateFunc = (s: string) => [boolean, string];



export { Input };
