import { Header } from "../../components/Header/Header";
import { ImageElement } from "../../components/Image/Image";
import { PageLink } from "../../components/PageLink/PageLink";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Components, CompositeBlock } from "../../view-base/CompositeBlock";
import img from "/static/assets/err-404.png";


class Page404 extends CompositeBlock {

  constructor(components: Components = {}) {

    super({}, {
      ...components,
      image: new ImageElement({ path: img }),
      title: new PageTitle({ text: "Ошибка на стороне браузера" }),
      header: new Header({ text: "такой страницы не существует" }),
      returnLink: new PageLink({ title: "Вернуться назад", href: "" }),
    });

  }


  protected override template() {

    return `
    <div class="container-404">

    {{{ image }}}
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


export { Page404 };
