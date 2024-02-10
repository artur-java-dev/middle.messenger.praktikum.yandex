import { isEqual } from "../utils/str-utils";
import { Block, TProps, renderBlock } from "../view-base/Block";
import { CompositeBlock } from "../view-base/CompositeBlock";


// interface BlockConstructable {
//   new(): CompositeBlock
// }


class Route {

  private pathname: string;
  // private BlockClass: BlockConstructable;
  private block: Block;
  private props: TProps;
  private wasRendered = false;

  constructor(pathname: string, view: CompositeBlock, props: TProps) {

    this.pathname = pathname;
    // this.BlockClass = view.constructor as BlockConstructable;
    this.block = view;
    this.props = props;

  }


  navigate(pathname: string) {

    if (this.match(pathname)) {

      this.pathname = pathname;
      this.render();

    }

  }


  match(pathname: string): boolean {

    return isEqual(pathname, this.pathname);

  }


  leave() {

    this.block.hide();

  }


  render() {

    if (!this.wasRendered) {

      // this.block = new this.BlockClass();
      renderBlock(this.props.rootQuery as string, this.block);
      this.wasRendered = true;
      return;

    }

    this.block.show();

  }


}


export { Route };

