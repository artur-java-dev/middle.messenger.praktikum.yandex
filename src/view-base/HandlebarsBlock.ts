import { Block, Events, TProps } from "./Block";
import Handlebars from "handlebars";


class HandlebarsBlock<Props extends TProps & Events = TProps> extends Block<Props> {

  constructor(props: Props) {
    super({ ...props })
  }

  protected override compiledTmpl() {

    const tmpt = this.template();
    const func = Handlebars.compile(tmpt);
    return func(this.props);

  }

}


export { HandlebarsBlock };
