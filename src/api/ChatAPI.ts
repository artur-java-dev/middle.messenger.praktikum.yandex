import { HTTPTransport, RequestBody } from "../utils/HTTPTransport";
import { EntityBaseAPI } from "./EntityBaseAPI";


class ChatAPI extends EntityBaseAPI {

  private readonly endpoint = "/chats";
  private http = new HTTPTransport(this.endpoint);


  create<T extends RequestBody>(chatData: T) {

    return this.http.post("", { data: chatData });

  }

  request<T extends RequestBody>(urlParams?: T) {

    if (urlParams)
      return this.http.get("", { data: urlParams });

    return this.http.get("");
  }

  requestById(id: number) {

    return this.http.get(`/${id}`);

  }

  update<T extends RequestBody>(chatData: T) {

    return this.http.put("/", { data: chatData });

  }

  delete<T extends RequestBody>(chatData: T) {

    return this.http.delete("/", { data: chatData });

  }

  getUsers(id: number) {
    return this.http.get(`/${id}/users`);
  }

  addUser(req: UsersRequest) {
    return this.http.put("/users", { data: req });
  }

  removeUser(req: UsersRequest) {
    return this.http.delete("/users", { data: req });
  }

  getToken(chatId: number) {
    return this.http.post(`/token/${chatId}`);
  }

}


type UsersRequest = {
  users: number[];
  chatId: number;
};

const api = new ChatAPI;


export { api as ChatAPI };
