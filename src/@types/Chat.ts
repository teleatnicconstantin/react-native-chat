import {ChatType} from './ChatType';
import { Message } from './Message';
import {User} from './User';

export type Chat = {
  id: number;
  type: ChatType;
  lastMessage?: Message;
  author: User;
  participants: User[];
  name: string;
  avatar: string
};
