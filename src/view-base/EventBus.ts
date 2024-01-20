class EventBus {

  protected listeners: Listeners;

  constructor() {

    this.listeners = new Map;

  }


  on(event: string, callback: EventHandler) {

    if (this.listeners.has(event)) {

      this.listeners.get(event)?.add(callback);
      return;

    }

    this.listeners.set(event, new Set([callback]));

  }


  off(event: string, callback: EventHandler) {

    if (!this.listeners.has(event))
      throw new Error(`Нет события: ${event}`);

    this.listeners.get(event)?.delete(callback);

  }


  emit(event: string, ...args: HandlerParam[]) {

    if (!this.listeners.has(event))
      throw new Error(`Нет события: ${event}`);

    this.listeners.get(event)?.forEach(
      f => {

        f(...args);

      });

  }

}


type Listeners = Map<string, Set<EventHandler>>;

type EventHandler = (...args: HandlerParam[]) => void;

type HandlerParam = object;


export { EventBus };
