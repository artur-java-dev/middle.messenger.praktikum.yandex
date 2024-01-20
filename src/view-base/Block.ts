import Handlebars from "handlebars";
import { isEmptyObj } from "../utils/common";
import { EventBus } from "./EventBus";
import { v4 as makeUUID } from 'uuid';


class Block {

  protected eventBus = new EventBus();
  protected element: HTMLElement | null = null;
  protected properties: object;
  protected events: EventsObj;
  protected uuid: string;

  protected readonly AttrID = "data-id";

  constructor(props: object = {}, events: EventsObj = {}) {
    this.properties = this.makeProxy({ ...props });
    this.events = { ...events };

    this.uuid = makeUUID();

    this.registerEvents();
    this.eventBus.emit(EVENT.Init);
  }


  public addEventHandler(event: string, f: EventListenerOrEventListenerObject) {
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

  protected template(): string { return ""; }

  protected compiledTmpl(): string { return ""; }

  protected processCompiledTmpl(_tmpl: HTMLTemplateElement) { }

  protected mount(_oldProps: object): void {
  }


  protected update(oldProps: object, newProps: object): void {
    if (this.wasUpdate(oldProps, newProps))
      this.eventBus.emit(EVENT.FlowRender);
  }

  protected wasUpdate(_oldProps: object, _newProps: object): boolean { return false; }


  private makeProxy(props: object): object {
    const thisObj = this;

    const proxy = new Proxy(props,
      {
        get(target: object, prop: string | symbol) {
          const key = <keyof typeof target>prop;
          return target[key];
        },

        set(target: object, prop: string | symbol, value) {
          const key = <keyof typeof target>prop;
          type ObjStrProp = { [k in string]: any };
          const obj = target as ObjStrProp;

          const oldvalue = target[key];

          if (oldvalue === value)
            return true;

          const oldProps = { ...target };
          obj[key] = value;
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


  public get props() {
    return this.properties;
  }


  public set props(nextProps: object) {
    if (isEmptyObj(nextProps))
      return;

    Object.assign(this.properties, nextProps);
  }


  public show() {
    this.content.style.display = "block";
  }

  public hide() {
    this.content.style.display = "none";
  }

}


const enum EVENT {
  Init = "init",
  FlowMount = "flow:mount",
  FlowRender = "flow:render",
  FlowUpdate = "flow:update"
}


type EventsObj = { [k: string]: Handler };
type Handler = EventListenerOrEventListenerObject;
type PropertiesObj = { [k: string]: unknown };


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
  Block, EventsObj, PropertiesObj, EVENT,
  renderBlock, compileBlock
};
