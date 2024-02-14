import { Obj } from "../utils/common-types";
import { TProps } from "./Block";

class EventBus<T extends HandlerParam> {

  protected listeners: HandlersMap<T>;

  constructor(events?: string[]) {

    this.listeners = new Map;

    if (events) {

      events.forEach(e => this.listeners.set(e, new Set));

    }

  }


  on(event: string, callback: Handler<T>) {

    if (this.listeners.has(event)) {

      this.listeners.get(event)?.add(callback);
      return;

    }

    this.listeners.set(event, new Set([callback]));

  }


  off(event: string, callback: Handler<T>) {

    if (!this.listeners.has(event))
      throw new Error(`Нет события: ${event}`);

    this.listeners.get(event)?.delete(callback);

  }


  emit(event: string, ...args: T[]) {

    if (!this.listeners.has(event))
      throw new Error(`Нет события: ${event}`);

    this.listeners.get(event)?.forEach(
      f => {

        f(...args);

      });

  }

}


type HandlersMap<T extends HandlerParam> = Map<string, Handlers<T>>;
type Handlers<T extends HandlerParam> = Set<Handler<T>>;


type Handler<T extends HandlerParam> = (...args: T[]) => void;

type HandlerParam = object | Obj | Event | TProps;


export { EventBus };
