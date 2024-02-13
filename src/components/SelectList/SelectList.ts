import { isEqualObjects, isEqualObjectsProp } from "../../utils/checks-equal";
import { isStrArray } from "../../utils/checks-types";
import { hasKey } from "../../utils/common";
import { Indexed } from "../../utils/common-types";
import { Block, EventsObj, compileBlock } from "../../view-base/Block";


type IProps = {
  elementName: string,
  items: string[] | Indexed[],
  events?: EventsObj
}


class SelectList extends Block {

  constructor(props: IProps) {

    super(props);

  }

  public get value() {

    return this.select.value;

  }

  private get select() {

    return this.content as HTMLSelectElement;

  }


  addItem(item: string | Indexed) {
    const p = this.props as IProps;
    const items = [...p.items, item];
    this.props = { items: items };
  }


  deleteItem(item: string | Indexed) {
    const p = this.props as IProps;
    const items = p.items.filter(x => notEq(x, item));
    this.props = { items: items };

    function notEq(x: string | Indexed, item: typeof x) {
      return typeof x === "string" ?
        x !== item :
        hasKey("id", x) ?
          !isEqualObjectsProp(x, item as Indexed, "id") :
          !isEqualObjects(x, item as Indexed);
    }
  }

  deleteItemByValue() {
    const p = this.props as IProps;
    const options = this.select.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === this.value) {
        const items = p.items.filter((_, idx) => idx !== i);
        this.props = { items: items };
        return;
      }
    }
  }


  protected override compiledTmpl() {

    return compileBlock(this.template(), this.props);

  }


  protected override template() {

    const p = this.props as IProps;
    return `
          <select name="{{elementName}}" class="select-block" multiple
           size="${p.items.length < 10 ? p.items.length : 10}">
          {{#each items }}
            ${isStrArray(p.items) ? this.strItem() : this.objItem(p.items)}
          {{/each }}
          </select>
          `;
  }

  private strItem() {
    return `<option value="{{ this }}">{{ this }}</option>`;
  }

  private objItem(o: Indexed[]) {
    return o.length > 0 && hasKey("id", o[0]) ?
      `<option value="{{ this.id }}">{{ this.value }}</option>` :
      `<option value="{{@index}}">{{ this }}</option>`;
  }


  protected override wasUpdate(oldProps: IProps, newProps: IProps) {

    return newProps.items.length !== oldProps.items.length;

  }

}


export { SelectList };
