import Handlebars from "handlebars";
import { isEmptyObj } from "../utils/common";
import { EventBus } from "./EventBus";
import { v4 as makeUUID } from "uuid";


type TProps = Record<string, unknown>;

type Events = {
  events?: EventsObj
};

type EventsObj = Record<string, EventHandler>;
type EventHandler = (evt: Event) => void;


abstract class Block<Props extends TProps & Events = TProps> {

  protected properties: Props;
  protected events: EventsObj;
  protected element: HTMLElement | null = null;

  protected readonly uuid: string;
  protected readonly eventBus: EventBus<Props> = new EventBus();
  protected readonly AttrID = "data-id";


  constructor(props: Props = {} as Props) {

    this.properties = this.makeProxy({ ...props });
    this.events = { ...props.events };

    this.uuid = makeUUID();

    this.registerEvents();
    this.eventBus.emit(EVENT.Init);

  }


  public addEventHandler(event: string, f: EventHandler) {

    this.events[event] = f;

  }


  private registerEvents() {

    this.eventBus.on(EVENT.Init, this.init.bind(this));
    this.eventBus.on(EVENT.FlowMount, this.mount.bind(this));
    this.eventBus.on(EVENT.FlowRender, this.render.bind(this));
    this.eventBus.on(EVENT.FlowUpdate, this.update.bind(this));

  }


  protected init() {

    this.eventBus.emit(EVENT.FlowRender);

  }


  protected render() {

    this.deleteEvents();
    this.createElem();
    this.addEvents();

  }


  private addEvents() {

    const events = this.events;

    Object.keys(events).forEach(k => {

      this.content.addEventListener(k, events[k]);

    });

  }

  private deleteEvents() {

    if (this.element === null)
      return;

    const events = this.events;

    Object.keys(events).forEach(k => {

      this.content.removeEventListener(k, events[k]);

    });

  }


  protected createElem() {

    const fragment = document.createElement("template");
    fragment.innerHTML = this.compiledTmpl();
    this.processCompiledTmpl(fragment);

    const newElement = fragment.content.firstElementChild as HTMLElement;

    if (this.element)
      this.element.replaceWith(newElement);

    this.element = newElement;
    this.element.setAttribute(this.AttrID, this.uuid);

  }

  protected template(): string {

    return "";

  }

  protected abstract compiledTmpl(): string

  protected processCompiledTmpl(_tmpl: HTMLTemplateElement) { }

  protected mount(_oldProps: Props): void {
  }


  protected update(oldProps: Props, newProps: Props): void {

    if (this.wasUpdate(oldProps, newProps))
      this.eventBus.emit(EVENT.FlowRender);

  }

  protected wasUpdate(_oldProps: Props, _newProps: Props): boolean {

    return false;

  }


  private makeProxy(props: Props): Props {

    const thisObj = this;

    const proxy = new Proxy<Props>(props,
      {
        get(target: Props, prop: string) {

          return target[prop];

        },

        set(target: Props, prop: string, value: any) {


          if (target[prop] === value)
            return true;

          const oldProps = { ...target } as Props;
          target[prop as keyof Props] = value;

          thisObj.eventBus.emit(EVENT.FlowUpdate, oldProps, target);

          return true;

        },

        deleteProperty() {

          throw new Error("Невозможно удалять свойства через Proxy");

        },

      });

    return proxy;

  }


  public dispatchMountEvent() {

    this.eventBus.emit(EVENT.FlowMount);

  }


  public get content() {

    if (this.element === null)
      throw new Error("Нет элемента DOM");

    return this.element;

  }


  public get id() {

    return this.uuid;

  }


  public get props(): Props {

    return this.properties;

  }


  public set props(nextProps: Props) {

    if (isEmptyObj(nextProps))
      return;

    Object.assign(this.properties, nextProps);

  }


  public show() {

    // this.content.style.display = "block";
    this.content.style.visibility = "visible";

  }

  public hide() {

    // this.content.style.display = "none";
    this.content.style.visibility = "hidden";
  }

}


const enum EVENT {
  Init = "init",
  FlowMount = "flow:mount",
  FlowRender = "flow:render",
  FlowUpdate = "flow:update"
}


function renderBlock(query: string, block: Block) {

  const root = document.querySelector(query);

  if (root === null)
    throw new Error(`Нет элемента, соответствующего селектору ${query}`);

  root.appendChild(block.content);
  block.dispatchMountEvent();

  return root;

}

function compileBlock(template: string, props: object): string {

  const func = Handlebars.compile(template);
  return func(props);

}


export {
  Block, EventsObj, TProps, Events, EventHandler, EVENT,
  renderBlock, compileBlock
};
