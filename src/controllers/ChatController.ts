import { ChatAPI } from "../api/ChatAPI";
import { ProtocolWS, WebSocketURL } from "../api/constants";
import { Chat } from "../api/entities/Chat";
import { ChatUser, User } from "../api/entities/User";
import { APIError } from "../api/types/types";
import { getData } from "../data/Store";
import { Indexed } from "../utils/common-types";
import { apiHasError } from "../utils/http-utils";


class ChatController {


  static async getChats(): Promise<Chat[] | APIError> {
    const response = ChatAPI.request()
      .then(req => JSON.parse(req.response) as Chat[])
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);

    return response;
  }


  static async createChat(title: string) {
    const response = await ChatAPI.create({ title: title })
      .then(req => req.response)
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);

    const chats = await this.getChats();
    window.store.set("chats", chats);
  }


  static async getChatUsers(chatId: number): Promise<ChatUser[]> {
    const response = ChatAPI.getUsers(chatId)
      .then(req => JSON.parse(req.response) as ChatUser[]);

    return response;
  }


  static async addUserToChat(chatId: number, userId: number) {
    const response = await ChatAPI.addUser({ users: [userId], chatId: chatId })
      .then(req => req.response)
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);
  }


  static async removeUserFromChat(chatId: number, userId: number) {
    const user = getData<User>("user")!;

    if (user.id === userId)
      throw Error("Невозможно удалить из чата текущего пользователя");

    const response = await ChatAPI.removeUser({ users: [userId], chatId: chatId })
      .then(req => req.response)
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);
  }


  static async getToken(chatId: number) {
    const response = await ChatAPI.getToken(chatId)
      .then(req => JSON.parse(req.response) as Indexed)
      .then(data => data.token as string)
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);

    return response;
  }


  static async createWebSocket(chatId: number) {

    const me = window.store.getState().user as User;
    const userId = me.id;
    const token = await this.getToken(chatId);

    const url = `${ProtocolWS}${WebSocketURL}/chats/${userId}/${chatId}/${token}`;
    const socket = new WebSocket(url);

    return socket;
  }


}


export { ChatController };
