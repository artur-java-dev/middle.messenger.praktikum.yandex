import { ChatAPI } from "../api/ChatAPI";
import { ProtocolWS, WebSocketURL } from "../api/constants";
import { Chat } from "../api/entities/Chat";
import { User } from "../api/entities/User";
import { APIError } from "../api/types/types";
import { hasKey } from "../utils/common";
import { Indexed, NumIndexed } from "../utils/common-types";
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


  static async addUserToChat(chatId: number, userId: number) {
    const response = await ChatAPI.addUser({ users: [userId], chatId: chatId })
      .then(req => req.response)
      .catch(reason => ({ reason }));

    if (apiHasError(response))
      throw Error(response.reason);
  }

  static async removeUserFromChat(chatId: number, userId: number) {
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
    if (hasKey(chatId, SocketsByChat))
      return SocketsByChat[chatId];

    const me = window.store.getState().user as User;
    const userId = me.id;

    const token = await this.getToken(chatId);

    const base = ProtocolWS + WebSocketURL;
    const url = new URL(
      `/${userId}/${chatId}/${token}`,
      base);

    const socket = new WebSocket(url);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');
    });

    socket.addEventListener('close', event => {
      if (event.wasClean)
        console.log('Соединение закрыто чисто');
      else
        console.log('Обрыв соединения');

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', event => {
      console.log('Получены данные', event.data);
    });

    socket.addEventListener('error', event => {
      if (event instanceof ErrorEvent)
        console.log('Ошибка', event.message);
    });

    SocketsByChat[chatId] = socket;

    return socket;
  }


}


const SocketsByChat: NumIndexed<WebSocket> = {};


export { ChatController };
