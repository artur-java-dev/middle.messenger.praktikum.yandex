import { RouteManagement } from "../../navigation/RouteManagement";
import { getProp } from "../../utils/common";
import { Block, EventHandler, compileBlock } from "../../view-base/Block";


type IProps = {
  href: string,
  title: string,
  onclick?: EventHandler
}

class PageLink extends Block {

  constructor(props: IProps) {

    super(props);

  }


  protected render() {

    super.render();

    const props = this.props as IProps;
    const link = this.content.querySelector("a")!;

    if (props.onclick) {

      link.addEventListener("click", props.onclick);
      return;

    }

    link.addEventListener("click",
      e => {

        e.preventDefault();
        const path = link.getAttribute("href")!;
        RouteManagement.go(path);

      });

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
