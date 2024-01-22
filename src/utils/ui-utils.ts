import { Block, Events, TProps } from "../view-base/Block";
import Handlebars, { HelperOptions } from "handlebars";


interface BlockConstructable {
  new <Props extends TProps & Events>(props: Props): Block<Props>
}

function registerComponent(name: string, Component: BlockConstructable) {

  if (name in Handlebars.helpers)
    throw Error(`The ${name} component is already registered!`);

  Handlebars.registerHelper(name,
    function (this: unknown, { hash }: HelperOptions) {

      const component = new Component(hash);
      return component.content.outerHTML;

    });

}


export { registerComponent, BlockConstructable };
