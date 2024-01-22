import { Block, compileBlock } from "../../view-base/Block";


type IProps = {
  imagePath: string,
  elementName: string,
}

class ImageSelect extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected override template() {

    return `
    <div class="img-select-block">
      <input type="image" class="image-button" src="{{imagePath}}" />
      <input type="file" class="file-select" name="{{elementName}}" accept="image/jpeg,image/png" />
    </div>
    `;

  }

  protected compiledTmpl(): string {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }

}


export { ImageSelect };
