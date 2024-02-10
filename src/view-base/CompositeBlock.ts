import { Block, EVENT, TProps, compileBlock } from "./Block";


type Components = { [k: string]: Block };


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

        propsWithStubs[key] = `
          <div data-id="${child.id}">
          </div>`;

      });

    return compileBlock(template, propsWithStubs);

  }


  private replaceStubs(fragment: HTMLTemplateElement) {

    Object.values(this.children).forEach(
      child => {

        const s = `[data-id="${child.id}"]`;
        const stub = fragment.content.querySelector(s);
        stub!.replaceWith(child.content);

      });

  }


  public dispatchMountEvent() {

    super.dispatchMountEvent();

    Object.values(this.children).forEach(
      b => b.dispatchMountEvent()
    );

  }

}


export { CompositeBlock, Components };
