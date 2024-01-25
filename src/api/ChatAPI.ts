import { HTTPTransport } from "../utils/HTTPTransport";
import { EntityBaseAPI } from "./EntityBaseAPI";


class ChatAPI extends EntityBaseAPI {

  private readonly endpoint = "api/v1/chats";
  private http = new HTTPTransport(this.endpoint);


  create(chatData: object) {

    return this.http.post("/", { data: chatData });

  }

  request(urlParams: object) {

    return this.http.get("/", { data: urlParams });

  }

  requestById(id: number) {

    return this.http.get(`/${id}`);

  }

  update(chatData: object) {

    return this.http.put("/", { data: chatData });

  }

  delete(chatData: object) {

    return this.http.delete("/", { data: chatData });

  }

}


export { ChatAPI };
