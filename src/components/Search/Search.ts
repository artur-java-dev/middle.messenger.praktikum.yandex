import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import { ImageButton } from "../ImageButton/ImageButton";
import { InputElement } from "../InputElement/InputElement";
import icon from "/static/assets/search.png";


class Search extends CompositeBlock {

  constructor(components: Components = {}) {

    super({}, {
      ...components,
      input: input,
      button: btn,
    });

  }


  protected template() {

    return `
    <div class="search-block">
    {{{ input }}}
    {{{ button }}}
    </div>
    `;

  }

}

const input = new InputElement({ elementName: "search" });
const btn = new ImageButton({ imagePath: icon });


export { Search };
