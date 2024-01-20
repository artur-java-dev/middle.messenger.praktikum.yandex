import { getProp } from "../../utils/common";
import { Block, EventsObj, compileBlock } from "../../view-base/Block";


class Button extends Block {

  constructor(props: object, events: EventsObj = {}) {
    super(props, events);
  }


  protected override compiledTmpl() {
    return compileBlock(this.template(), this.props);
  }


  protected override wasUpdate(oldProps: object, newProps: object) {
    return getProp(newProps, "label") !== getProp(oldProps, "label");
  }


  protected override template() {
    return `
    <button class="button" type="{{type}}">{{label}}</button>
    `;
  }

}



export { Button };
