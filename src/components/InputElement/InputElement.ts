import { Block, EventsObj, compileBlock } from "../../view-base/Block";


class InputElement extends Block {

  constructor(props: object, events: EventsObj = {}) {

    super(props, events);

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
