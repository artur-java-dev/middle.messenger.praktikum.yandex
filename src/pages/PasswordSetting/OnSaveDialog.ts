import { Button } from "../../components/Button/Button";
import { Dialog } from "../../components/Dialog/Dialog";
import { Pathname, RouteManagement } from "../../navigation/RouteManagement";
import { CompositeBlock } from "../../view-base/CompositeBlock";


class OnSaveDialog extends CompositeBlock {

  constructor() {
    super({
      onClose: () => {
        RouteManagement.go(Pathname.Profile);
      }
    }, {
      closeButton: btn,
    });
  }

  protected template() {
    return `
    <div class="On-Save-Dialog">
        <p>Пароль изменен.</p>
        {{{ closeButton }}}
    </div>
    `;
  }
}


const btn = new Button({
  label: "Ok",
  onClick: () =>
    dlg.close()
});


const dlg = new Dialog(new OnSaveDialog());


export { dlg as OnSaveDialog };
