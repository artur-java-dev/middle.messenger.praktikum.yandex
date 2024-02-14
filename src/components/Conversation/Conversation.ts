import { CompositeBlock } from "../../view-base/CompositeBlock";
import { ImageButton } from "../ImageButton/ImageButton";
import { MessageBand } from "../MessagesBand/MessageBand";
import { TextInput } from "../TextInput/TextInput";
import attachIcon from "/static/assets/attach.png";
import sendIcon from "/static/assets/send.png";
import template from "./tmpl.hbs?raw";
import { MessageInfo } from "../Message/Message";
import { Indexed, Nullable, NumIndexed } from "../../utils/common-types";
import { isEmpty } from "../../utils/validators-func";
import { PingPong, ServerLastMessage, ServerMessage } from "../../api/entities/Message";
import { isArray } from "../../utils/checks-types";


class Conversation extends CompositeBlock {

  private sockets: NumIndexed<WebSocket> = {};
  private timerIdPing: Nullable<number> = null;
  private lastMsgNum: number = 0;
  private currChat: number = -1;

  private readonly pingInterval = 100 * 1000;
  private readonly lastMessagesLimit = 20;

  constructor(messages: MessageInfo[] = []) {
    super({}, {
      messageBand: new MessageBand({ messages: messages }),
      attachFileButton: new ImageButton({ imagePath: attachIcon }),
      messageInput: new TextInput({ elementName: "message", placeholder: "Сообщение.." }),
      sendMsgButton: new ImageButton({ imagePath: sendIcon }),
    });
  }

  setCurrentChat(chatId: number) {
    this.currChat = chatId;
    this.lastMsgNum = 0;
  }


  public set messages(array: MessageInfo[]) {
    this.messageBand.props.messages = array;
  }


  protected doInit() {
  }


  private get messageBand() {
    return this.children.messageBand as MessageBand;
  }

  private get sendButton() {
    return this.child<ImageButton>("sendMsgButton").content as HTMLButtonElement;
  }

  private get messageInput() {
    return this.child<TextInput>("messageInput").content as HTMLTextAreaElement;
  }


  public hasActiveConnection(chatId: number): boolean {
    const s = this.sockets[chatId];
    const res = s?.readyState === WebSocket.OPEN;
    if (res)
      this.getLastMessages();
    return res;
  }


  public hasNonActiveConnection(chatId: number): boolean {
    const s = this.sockets[chatId];
    return s?.readyState === WebSocket.CLOSED;
  }


  public setConnection(socket: WebSocket, chatId: number) {
    this.sockets[chatId] = socket;
    this.lastMsgNum = 0;
    this.setListeners(chatId);
  }

  public reConnect(chatId: number) {
    const s = this.sockets[chatId];
    this.sockets[chatId] = new WebSocket(s.url);
    this.setListeners(chatId);
  }


  private setListeners(chatId: number) {
    const socket = this.sockets[chatId];
    socket.addEventListener("message", e => {
      this.onMessage(e);
    });

    socket.addEventListener("open", () => this.onOpen());
    socket.addEventListener("close", e => {
      this.onClose(e);
      this.reConnect(chatId);
    });

    socket.addEventListener("error", e => this.onError(e));
  }


  private onMessage(event: MessageEvent) {
    console.log("Получены данные", event.data);

    const data = JSON.parse(event.data);

    if (isArray(data)) {
      data.reverse().forEach(msg => this.handleMsg(msg as ServerLastMessage));
      return;
    }

    const msg = data as Indexed;

    if (msg.type === PingPong.Pong)
      return;

    if (msg.type === "message")
      this.handleMsg(msg as ServerMessage);
  }

  private handleMsg(msg: ServerMessage | ServerLastMessage) {
    if (isEmpty(msg.content))
      return;

    this.messageBand.addMessage(msg);
  }


  private onOpen() {
    this.doPing();
    console.log("Соединение установлено");
    this.getLastMessages();
  }

  private onError(event: Event) {
    if (event instanceof ErrorEvent)
      console.log("Ошибка", event.message);
  }

  private onClose(event: CloseEvent) {
    this.stopPing();

    if (event.wasClean)
      console.log("Соединение закрыто чисто");
    else
      console.log("Обрыв соединения");

    console.log(`Код: ${event.code}. Причина: ${event.reason}.`);
  }

  private getLastMessages() {
    const socket = this.sockets[this.currChat];

    socket!.send(JSON.stringify({
      content: String(this.lastMsgNum),
      type: "get old",
    }));

    this.lastMsgNum += this.lastMessagesLimit;
  }


  private doPing() {
    const socket = this.sockets[this.currChat]!;

    this.timerIdPing = setInterval(
      () => socket.send(""),
      this.pingInterval);
  }

  private stopPing() {
    if (this.timerIdPing !== null)
      clearInterval(this.timerIdPing);
  }

  private sendMessage() {
    const socket = this.sockets[this.currChat]!;

    if (socket.readyState !== WebSocket.OPEN)
      return;

    const msg = this.messageInput.value;
    this.messageInput.value = "";

    if (isEmpty(msg))
      return;

    const data = {
      content: msg,
      type: "message",
    };

    socket.send(JSON.stringify(data));
  }


  protected render() {
    super.render();

    this.sendButton.addEventListener("click",
      () => this.sendMessage());
  }


  protected template() {

    return template;

  }


  protected wasUpdate(_oldProps: object, _newProps: object) {

    return false;

  }

}


export { Conversation };
