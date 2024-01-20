import { Header } from "../../components/Header/Header";
import { ImageElement } from "../../components/Image/Image";
import { PageLink } from "../../components/PageLink/PageLink";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import img from "/static/assets/err-500.png";


class Page500 extends CompositeBlock {

  constructor(props: object = {}, components: Components = {}) {
    super(props, {
      ...components,
      image: new ImageElement({ path: img }),
      title: new PageTitle({ text: "Ошибка на стороне сервера" }),
      header: new Header({ text: "ведутся работы по устранению" }),
      returnLink: new PageLink({ title: "Вернуться назад", href: "" }),
    });
  }


  protected override template() {
    return `
    <div class="container-500">

    {{{ image }}}
    <h1 class="err-code">500</h1>
    {{{ title }}}
    {{{ header }}}
    {{{ returnLink }}}

    </div>
    `;
  }


  protected override wasUpdate(_oldProps: object, _newProps: object) {
    return false;
  }

}


export { Page500 };
