import { expect } from "chai";
import sinon from "sinon";
import { EventsObj } from "./Block";
import { HandlebarsBlock } from "./HandlebarsBlock";


type Props = {
  text?: string,
  events?: EventsObj
}


describe("тесты для базового компонента (Block)", () => {


  let Class: typeof HandlebarsBlock<Props>;


  before(() => {

    class SimpleBlock extends HandlebarsBlock<Props> {

      constructor(props: Props) {

        super({ ...props });

      }

      override template() {

        return `
                <div>
                <span id="test-text">{{text}}</span>
                <button>{{text-button}}</button>
                </div>`;

      }


      override wasUpdate(oldProps: Props, newProps: Props) {

        return newProps.text !== oldProps.text;

      }

    }

    Class = SimpleBlock;

  });


  it("состояние компонента соответствует переданным в конструктор данным", () => {

    const text = "Hello? World!";
    const component = new Class({ text });

    const span = component.content.querySelector("#test-text")!;
    expect(span.textContent).to.be.eq(text);

  });


  it("тест реактивного поведения компонента", () => {

    const component = new Class({ text: "Hello" });

    const changedText = "Hello? World!";
    component.props = { text: changedText };

    const span = component.content.querySelector("#test-text")!;
    expect(span.textContent).to.be.eq(changedText);

  });


  it("тест срабатывания обработчиков событий, переданных компоненту", () => {

    const stub = sinon.stub();
    const component = new Class({
      events: {
        click: stub
      }
    });

    component.content.dispatchEvent(new MouseEvent("click"));

    const isWorked = stub.calledOnce;
    expect(isWorked).to.be.true;

  });


});
