import { EventsObj } from "../../view-base/Block";
import { CompositeBlock } from "../../view-base/CompositeBlock";
import template from "./tmpl.hbs?raw";


class MessageBand extends CompositeBlock {

  constructor(props: object, events: EventsObj = {}) {
    super(props, {}, events);
  }


  protected template() {
    return template;
  }


  protected wasUpdate(oldProps: object, newProps: object) {
    return false;
  }

}


export { MessageBand };
