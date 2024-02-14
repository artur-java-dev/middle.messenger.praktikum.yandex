import { Block, EventHandler, compileBlock } from "../../view-base/Block";


type IProps = {
  label: string,
  onClick: EventHandler
}


class ActionLink extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected render() {

    super.render();

    const p = this.props as IProps;
    this.content.addEventListener("click", p.onClick);

  }


  protected compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override template() {

    return `
        <a href="#" class="action-link" onclick="event.preventDefault()">{{label}}</a>
    `;

  }

}


export { ActionLink };
