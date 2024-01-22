import { getProp } from "../../utils/common";
import { Block, compileBlock } from "../../view-base/Block";


type IProps = {
  type?: string,
  imagePath: string,
}

class ImageButton extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(oldProps: object, newProps: object) {

    return getProp(newProps, "imagePath") !== getProp(oldProps, "imagePath");

  }


  protected override template() {

    return `
    <button
     {{#if type}}
        type="{{type}}"
     {{/if}}
    class="img-button">

    <img src="{{imagePath}}" />

    </button>
    `;

  }

}


export { ImageButton };
