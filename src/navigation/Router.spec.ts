import { expect } from "chai";
import { Router } from "./Router";
import sinon from "sinon";
import { CompositeBlock } from "../view-base/CompositeBlock";


describe("тесты для роутера", () => {

  let router: Router;


  before(() => {
    router = Router.Instance;

    const stubPage = sinon.createStubInstance(CompositeBlock);

    router
      .use("/login", stubPage)
      .use("/register", stubPage)
      .start();
  });


  afterEach(() => {

    sinon.restore();

  });


  it("состояние объекта history изменяется при переходе на новую страницу", () => {

    router.go("/login");
    router.go("/register");

    const countRecords = window.history.length;
    expect(countRecords).to.eq(3);
  });


  it("тест перехода на предыдущую страницу", () => {

    router.go("/login");
    router.go("/register");
    const spy = sinon.spy(history, "back");

    router.back();

    expect(spy.calledOnce).to.be.true;
  });


  it("тест перехода на следущую страницу", () => {

    router.go("/login");
    router.go("/register");
    router.back();
    const spy = sinon.spy(history, "forward");

    router.forward();

    expect(spy.calledOnce).to.be.true;
  });


});
