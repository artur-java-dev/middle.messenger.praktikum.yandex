import { Nullable } from "../../utils/common-types";
import { Message } from "./Message";

export type Chat = {
  id: number,
  title: string,
  avatar: Nullable<string>,
  unread_count: number,
  created_by: number,
  last_message: Nullable<Message>,
};
