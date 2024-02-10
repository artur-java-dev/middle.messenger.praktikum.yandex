import { RouteManagement } from "../../navigation/RouteManagement";
import { getProp, getValue, hasKey } from "../../utils/common";
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

    if (hasKey("onclick", this.props)) {
      const handler = getValue(this.props, "onclick") as EventHandler;
      const link = this.content.querySelector("a")!;
      link.addEventListener("click", handler);
      return;
    }

    this.content.querySelector("a")!.addEventListener("click",
      e => {
        e.preventDefault();
        const link = e.target as HTMLLinkElement;
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
