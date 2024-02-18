import { Store } from "./data/Store";

declare global {

  interface Window {
    store: Store;
  }

}


window.store = new Store();
