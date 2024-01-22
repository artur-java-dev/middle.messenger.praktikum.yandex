import { Nullable } from "../utils/common-types";
import { isEqual } from "../utils/str-utils";
import { Block, TProps, renderBlock } from "../view-base/Block";


interface BlockConstructable {
  new(): Block
}


class Route {

  private pathname: string;
  private BlockClass: BlockConstructable;
  private block: Nullable<Block>;
  private props: TProps;

  constructor(pathname: string, view: typeof Block, props: TProps) {

    this.pathname = pathname;
    this.BlockClass = view as BlockConstructable;
    this.block = null;
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

    if (this.block)
      this.block.hide();

  }


  render() {

    if (!this.block) {

      this.block = new this.BlockClass();
      renderBlock(this.props.rootQuery as string, this.block);
      return;

    }

    this.block.show();

  }


}


export { Route };

