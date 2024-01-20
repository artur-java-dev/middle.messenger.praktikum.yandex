import { Block, EventsObj, compileBlock } from "../../view-base/Block";


class TextInput extends Block {

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
    <textarea class="text-input-block"
              name="{{elementName}}"
              placeholder="{{placeholder}}">
    </textarea>
    `;

  }

}


export { TextInput };
