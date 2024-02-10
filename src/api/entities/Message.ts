import { User } from "./User";

export type Message = {
  user: User,
  time: string,
  content: string
};

export type ServerMessage = {
  id: string,
  time: string,
  user_id: string,
  content: string,
  type: "message"
};

export type MessageFile = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type ServerLastMessage = {
  chat_id: number,
  time: string,
  type: string,
  user_id: string,
  content: string,
  file?: MessageFile
};

export const enum PingPong {
  Pong = "pong",
  Ping = "ping",
};
