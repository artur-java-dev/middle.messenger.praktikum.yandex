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

  public get value() {

    return this.input.value;

  }

  private get input() {

    return this.content as HTMLInputElement;

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
