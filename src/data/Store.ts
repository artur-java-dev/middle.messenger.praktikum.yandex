import { set } from "../utils/objects-func";
import { Indexed } from "../utils/common-types";
import { EventBus } from "../view-base/EventBus";


class Store {

  private state: Indexed = {};
  private readonly eventBus = new EventBus();


  public getState() {

    return this.state;

  }


  public set(path: string, value: unknown) {

    set(this.state, path, value);
    this.eventBus.emit(StoreEvent.Updated);

  }


  public onUpdated(callback: () => void, thisArg: unknown = this) {

    this.eventBus.on(StoreEvent.Updated, callback.bind(thisArg));

  }

}


const enum StoreEvent {
  Updated = "updated",
}

export { Store };
