import { Block, Events, TProps } from "../view-base/Block";
import Handlebars, { HelperOptions } from "handlebars";
import { Indexed } from "./common-types";
import { isEqual } from "./checks-equal";
import { isEmpty } from "./validators-func";
import { isArray } from "./checks-types";
import { getProp } from "./common";
import { flatten } from "./array-utils";


interface BlockConstructable {
  new <Props extends TProps & Events>(props: Props): Block<Props>
}


function registerComponent(name: string, Component: BlockConstructable) {

  if (name in Handlebars.helpers)
    throw Error(`The ${name} component is already registered!`);

  Handlebars.registerHelper(name,
    function (this: unknown, options: HelperOptions) {

      const { hash } = options;
      const component = new Component(hash);
      return component.content.outerHTML;

    });

}


type MapFunc = (state: Indexed) => Indexed;


function connectFunc(mapStateToProps: MapFunc) {

  return function (Component: typeof Block) {

    return class extends Component {

      constructor(props: TProps) {

        let state = mapStateToProps(window.store.getState());
        super({ ...props, ...state });

        window.store.onUpdated(() => {

          const newState = mapStateToProps(window.store.getState());
          if (!isEqual(state, newState))
            this.props = { ...newState };
          state = newState;

        });

      }

      protected compiledTmpl(): string {

        throw Error("Method not implemented.");

      }

    };

  };

}

const withUser = connectFunc(_ => ({ user: _.user }));


function classNames(...args: unknown[]) {

  const arr = Array<unknown>();

  for (const arg of args) {

    if (isArray(arg))
      flatten(arg).forEach(_ => add(_));
    else
      add(arg);

  }

  function add(arg: unknown) {

    if (arg === null) return;

    if (typeof arg === "object") {

      arr.push(getTrueProps(arg));
      return;

    }

    if (typeof arg === "string" && !isEmpty(arg)) {

      arr.push(arg.trim());
      return;

    }

    if (typeof arg === "number" && arg !== 0)
      arr.push(String(arg));

  }

  function getTrueProps(o: object) {

    return Object.keys(o).filter(k => getProp(o, k) === true).join(" ");

  }

  return arr.join(" ").trim();

}


export {
  registerComponent, BlockConstructable,
  connectFunc, withUser, classNames
};

