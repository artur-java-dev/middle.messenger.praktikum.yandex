import { HTTPTransport } from "../utils/HTTPTransport";
import { EntityBaseAPI } from "./EntityBaseAPI";


class ChatMessagesAPI extends EntityBaseAPI {

  private readonly endpoint = "api/v1/messages";
  private http = new HTTPTransport(this.endpoint);


  create(message: object) {

    return this.http.post("/", { data: message });

  }

  request(urlParams: object) {

    return this.http.get("/", { data: urlParams });

  }

  requestById(id: number) {

    return this.http.get(`/${id}`);

  }

  update(message: object) {

    return this.http.put("/", { data: message });

  }

  delete(message: object) {

    return this.http.delete("/", { data: message });

  }

}


export { ChatMessagesAPI };
