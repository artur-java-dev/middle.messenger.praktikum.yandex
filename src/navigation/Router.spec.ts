import { expect } from "chai";
import { Router } from "./Router";
import sinon from "sinon";
import { LoginPage } from "../pages/Login/LoginPage";
import { RegistrationPage } from "../pages/Registration/RegistrationPage";


describe("тесты для роутера", () => {

  let router: Router;


  before(() => {
    router = Router.Instance;
    // sinon.stub(router, "use").resolves();
    // sinon.stub(router, "start").resolves();
    // sinon.stub(router, <any>"onRoute").resolves();

    // window.location.pathname = "/login";

    // router
    //   .use("/login", sinon.createStubInstance(LoginPage))
    // .use("/register", sinon.createStubInstance(RegistrationPage))
    // .start();
  });


  it("состояние объекта history изменяется при переходе на новую страницу", () => {

    router.go("/login");
    router.go("/register");

    const countRecords = window.history.length;
    expect(countRecords).to.eq(3);
  });


});
