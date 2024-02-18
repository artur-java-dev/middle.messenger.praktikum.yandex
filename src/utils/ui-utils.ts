import { Block, Events, TProps } from "../view-base/Block";
import Handlebars, { HelperOptions } from "handlebars";
import { Indexed } from "./common-types";
import { isEqual } from "./checks-equal";
import { formatMsgTime } from "./date-time-utils";


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


Handlebars.registerHelper("formatTime", function (date) {

  return formatMsgTime(date);

});


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

// function mapUserToProps(state: Indexed & { user: User }) {

//   return {
//     name: state.user.name,
//     avatar: state.user.avatar,
//   };

// }


export { registerComponent, BlockConstructable, connectFunc, withUser };

