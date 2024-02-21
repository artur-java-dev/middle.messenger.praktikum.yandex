import sinon from "sinon";
import { HTTPTransport, METHOD } from "./HTTPTransport";
import { BaseURL, Protocol } from "../api/constants";
import { expect } from "chai";


describe("тесты для модуля отправки запросов (HTTPTransport)", () => {

  let http: HTTPTransport;
  let sandbox: sinon.SinonSandbox;

  before(() => {

    http = new HTTPTransport("/test");
    sandbox = sinon.createSandbox();

  });


  afterEach(() => {

    sinon.restore();

  });


  it("тест преобразования объекта data в URL-параметры", async () => {

    const stub = sinon.stub(http, "request").resolves();

    await http.get("", {
      data: {
        param1: "1",
        param2: "2 2"
      }
    });

    const expectedUrl = `${Protocol + BaseURL}/test?param1=1&param2=2%202`;
    const options = { method: METHOD.GET };
    const argsMatch = stub.calledWithMatch(expectedUrl, options);
    expect(argsMatch).to.be.true;
  });


  it("тест установки заголовка 'Content-Type' по умолчанию", async () => {

    const stub = sinon.stub(http, "request").resolves();

    await http.post("", { data: "data" });

    const options = stub.args[0][1];
    const ctype = options.headers!["Content-Type"];
    expect(ctype).to.be.eq("application/json");
  });


  it("тест количества вызовов get при использовании метода fetchWithRetry", async () => {

    const rej = Promise.reject(Error("test"));
    const stub = sandbox.stub(http, "get").returns(rej);
    const triesCount = 4;
    const options = {
      data: "data",
      method: METHOD.GET,
      retries: triesCount
    };

    await http.fetchWithRetry("", options).catch(() => null);

    expect(stub.callCount).to.be.eq(triesCount);
  });


});
