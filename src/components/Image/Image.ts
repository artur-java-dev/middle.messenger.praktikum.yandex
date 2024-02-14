import { getProp } from "../../utils/common";
import { Block, compileBlock } from "../../view-base/Block";


type IProps = {
  path: string,
}

class ImageElement extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(oldProps: object, newProps: object) {

    return getProp(newProps, "path") !== getProp(oldProps, "path");

  }


  protected override template() {

    return `
    <div class="img-block">
      <img src="{{path}}">
    </div>
    `;

  }

}


export { ImageElement };
