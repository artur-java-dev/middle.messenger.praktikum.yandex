import { getProp, isEmpty } from "../../utils/common";
import { Block, compileBlock } from "../../view-base/Block";


type IProps = {
  errMessage?: string,
}

class ErrorBlock extends Block {

  constructor(props: IProps = {}) {

    super(props);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(oldProps: object, newProps: object) {

    return getProp(newProps, "errMessage") !== getProp(oldProps, "errMessage");

  }


  protected override render() {

    const msg = getProp(this.properties, "errMessage") as string;

    super.render();

    if (isEmpty(msg))
      this.hide();

  }


  protected override template() {

    return "<div class=\"error-block\">{{{errMessage}}}</div>";

  }

}


export { ErrorBlock };
