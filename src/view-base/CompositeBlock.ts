import { isArray } from "../utils/checks-types";
import { Block, EVENT, TProps, compileBlock } from "./Block";


type Components = { [k: string]: Block | Block[] };


abstract class CompositeBlock<Props extends TProps = TProps> extends Block<Props> {

  protected children: Components;


  constructor(props: Props, components: Components) {

    super(props);

    this.children = components;
    this.eventBus.emit(EVENT.Init);

  }


  protected child<T extends Block>(name: string): T {

    return this.children[name] as T;

  }


  protected override init() {

    if (this.children) {

      this.doInit();
      this.eventBus.emit(EVENT.FlowRender);

    }

  }

  protected doInit(): void { }


  protected createElem() {

    const fragment = document.createElement("template");
    fragment.innerHTML = this.compiledTmpl();
    this.processCompiledTmpl(fragment);

    const childsCount = fragment.content.childElementCount;
    const newElement = childsCount === 1 ?
      fragment.content.firstElementChild as HTMLElement :
      document.createElement("div");

    if (childsCount > 1)
      newElement.appendChild(fragment.content);

    if (this.element)
      this.element.replaceWith(newElement);

    this.element = newElement;
    this.element.setAttribute(this.AttrID, this.uuid);

  }


  protected override compiledTmpl() {

    return this.compile(this.template());

  }


  protected override processCompiledTmpl(tmpl: HTMLTemplateElement) {

    this.replaceStubs(tmpl);

  }


  private compile(template: string) {

    const propsWithStubs = { ...this.props } as Record<string, unknown>;

    Object.entries(this.children).forEach(
      ([key, child]) => {
        propsWithStubs[key] = this.genStub(child);
      });

    return compileBlock(template, propsWithStubs);

  }


  private genStub(child: Block | Block[]) {
    if (isArray(child)) {
      const arr = child as Block[];
      return arr.map(block => `<div data-id="${block.id}"></div>`);
    }

    const block = child as Block;

    return `<div data-id="${block.id}"></div>`;
  }


  private replaceStubs(fragment: HTMLTemplateElement) {

    Object.values(this.children).forEach(child => {
      this.replaceStub(child, fragment);
    });

  }


  private replaceStub(child: Block | Block[], fragment: HTMLTemplateElement) {
    if (isArray(child)) {
      const arr = child as Block[];
      arr.forEach(block => replace(block));
      return;
    }

    replace((child as Block));

    function replace(block: Block) {
      const s = `[data-id="${block.id}"]`;
      const stub = fragment.content.querySelector(s);
      stub!.replaceWith(block.content);
    }
  }

  public dispatchMountEvent() {

    super.dispatchMountEvent();

    Object.values(this.children)
      .forEach(child =>
        isArray<Block>(child) ?
          child.forEach(x => x.dispatchMountEvent()) :
          child.dispatchMountEvent()
      );

  }

}


export { CompositeBlock, Components };
