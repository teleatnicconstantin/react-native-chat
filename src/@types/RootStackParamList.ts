import { Chat } from './Chat';

export type RootStackParamList = {
  Conversation: { chat: Chat } | undefined;
};
