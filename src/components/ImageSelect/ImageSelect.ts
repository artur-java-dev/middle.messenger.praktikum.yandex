import { EventsObj } from "../../view-base/Block";
import { CompositeBlock } from "../../view-base/CompositeBlock";
import template from "./tmpl.hbs?raw";


class ImageSelect extends CompositeBlock {

  constructor(props: object, events: EventsObj = {}) {
    super(props, {}, events);
  }


  protected override template() {
    return template;
  }


  protected override wasUpdate(oldProps: object, newProps: object) {
    return false;
  }

}


export { ImageSelect };
