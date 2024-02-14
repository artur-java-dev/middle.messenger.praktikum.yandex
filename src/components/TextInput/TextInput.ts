import { Block, compileBlock } from "../../view-base/Block";


type IProps = {
  elementName: string,
  placeholder: string,
}

class TextInput extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(_oldProps: IProps, _newProps: IProps) {

    return _oldProps.placeholder != _newProps.placeholder;

  }


  protected override template() {

    return `
    <textarea
     class="text-input-block"
     name="{{elementName}}"
     placeholder="{{placeholder}}"></textarea>
    `;

  }

}


export { TextInput };
