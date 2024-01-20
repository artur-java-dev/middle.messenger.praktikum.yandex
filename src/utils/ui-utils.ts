import { Block } from "../view-base/Block";
import Handlebars, { HelperOptions } from "handlebars";


function registerComponent(name: string, Component: typeof Block) {

  if (name in Handlebars.helpers)
    throw Error(`The ${name} component is already registered!`);

  Handlebars.registerHelper(name,
    function (this: unknown, { hash }: HelperOptions) {

      const component = new Component(hash);
      return component.content.outerHTML;

    });

}


export { registerComponent };
