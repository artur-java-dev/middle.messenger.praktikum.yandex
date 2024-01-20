import { Block, EventsObj, compileBlock } from "../../view-base/Block";
import template from "./tmpl.hbs?raw";


class ChatList extends Block {

  constructor(props: object = {}, events: EventsObj = {}) {

    super(props, events);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected template() {

    return template;

  }


  protected wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }

}


export { ChatList };
