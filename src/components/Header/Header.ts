import { getProp } from "../../utils/common";
import { Block, EventsObj, compileBlock } from "../../view-base/Block";


class Header extends Block {

  constructor(props: object, events: EventsObj = {}) {

    super(props, events);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(oldProps: object, newProps: object) {

    return getProp(newProps, "text") !== getProp(oldProps, "text");

  }


  protected override template() {

    return "<h2 class=\"header\">{{text}}</h2>";

  }

}


export { Header };
