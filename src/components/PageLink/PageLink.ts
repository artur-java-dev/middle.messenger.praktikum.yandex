import { getProp } from "../../utils/common";
import { Block, EventsObj, compileBlock } from "../../view-base/Block";


class PageLink extends Block {

  constructor(props: object, events: EventsObj = {}) {

    super(props, events);

  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(oldProps: object, newProps: object) {

    return getProp(newProps, "title") !== getProp(oldProps, "title");

  }


  protected override template() {

    return `
    <div class="link-block">
        <a href="{{href}}">{{title}}</a>
    </div>
    `;

  }

}


export { PageLink };
