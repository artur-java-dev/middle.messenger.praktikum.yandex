import { EventHandler } from "../../view-base/Block";
import { CompositeBlock } from "../../view-base/CompositeBlock";


class Dialog extends CompositeBlock {

  private readonly elemId = "modal";

  constructor(component: CompositeBlock) {
    super({}, { block: component });
  }


  protected template() {
    return `
            <dialog id="${this.elemId}">{{{ block }}}</dialog>
    `;
  }

  protected render() {
    super.render();

    const dlg = this.content as HTMLDialogElement;

    function isOutOfbounds(e: MouseEvent, rect: DOMRect) {
      return e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom;
    }

    dlg.addEventListener("click", (evt) => {
      const bounds = dlg.getBoundingClientRect();
      const e = evt as MouseEvent;
      if (isOutOfbounds(e, bounds))
        dlg.close();
    });

    const func = this.child("block").props.onClose;

    if (func) {
      dlg.addEventListener("close", func as EventHandler);
    }
  }


  public open() {
    const dlg = this.content as HTMLDialogElement;
    dlg.showModal();
  }


  public close() {
    const dlg = this.content as HTMLDialogElement;
    dlg.close();
  }


}


export { Dialog };
