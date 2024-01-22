import { Block, EventsObj, compileBlock } from "../../view-base/Block";


type IProps = {
  type?: string,
  elementName: string,
  placeholder?: string,
  events?: EventsObj
}

class InputElement extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }


  protected override template() {

    return `
    <input class="input-block"

    {{#if type}}
       type="{{type}}"
    {{else}}
       type="text"
    {{/if}}

    name="{{elementName}}"
    placeholder="{{placeholder}}" />
    `;

  }

}


export { InputElement };
