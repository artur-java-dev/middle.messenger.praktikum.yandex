import { Block, EventHandler, compileBlock } from "../../view-base/Block";


type IProps = {
  type?: string,
  label: string,
  onClick?: EventHandler
}


class Button extends Block {

  constructor(props: IProps) {

    super(props);

  }

  protected render() {

    const props = this.props as IProps;

    if (props.onClick)
      this.addEventHandler("click", props.onClick);

    super.render();

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(oldProps: IProps, newProps: IProps) {

    return newProps.label !== oldProps.label;

  }


  protected override template() {

    return `<button class="button" type="{{type}}">{{label}}</button>`;

  }

}


export { Button };
