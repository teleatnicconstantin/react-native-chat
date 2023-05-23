import { User } from './User';

export type Asset = {
  name: string | undefined;
  uri: string | undefined;
};

export type Message = {
  id: number;
  body: string;
  author: User;
  date: string;
  assets?: Asset[];
};
