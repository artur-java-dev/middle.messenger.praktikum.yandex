import { getProp } from "../../utils/common";
import { Block, compileBlock } from "../../view-base/Block";


type IProps = {
  type?: string,
  label: string,
}

class Button extends Block {

  constructor(props: IProps) {

    super(props);

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
