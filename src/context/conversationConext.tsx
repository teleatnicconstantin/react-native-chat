import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat } from '../@types/Chat';
import { Message } from '../@types/Message';

export type MessagesContextType = {
  loading: boolean;
  messages: Message[];
  addNewMessage: (message: Message, chat: Chat) => Promise<Message>;
  getMessages: (chat: Chat) => void;
  resetListOfMessages: () => void;
};

export const MessagesContext = React.createContext<MessagesContextType | null>(null);

const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const localStorageConversationKey = '@conversation-';
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = (chat: Chat): void => {
    setMessages([]);
    setLoading(true);

    AsyncStorage.getItem(localStorageConversationKey + chat.id).then(data => {
      if (data) {
        setMessages(JSON.parse(data));
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  };

  const storeMessages = (chat: Chat, messages: Message[]): void => {
    AsyncStorage.setItem(localStorageConversationKey + chat.id, JSON.stringify(messages));
  };

  const addNewMessage = (message: Message, chat: Chat): Promise<Message> => {
    return new Promise(resolve => {
      let newMessages: Message[] = [];

      chat.participants?.forEach(participant => {
        if (participant.id !== message.author.id) {
          newMessages.push({
            ...message,
            id: newMessages.length + messages.length + 1,
            author: participant,
            body: message.body + ' ❤️',
            assets: [],
          });
        }
      });

      newMessages.push({ ...message, id: newMessages.length + messages.length + 1 });

      newMessages = [...newMessages, ...messages];

      setMessages(newMessages);

      storeMessages(chat, newMessages);

      resolve(message);
    });
  };

  const resetListOfMessages = (): void => {
    setMessages([]);
  };

  return (
    <MessagesContext.Provider
      value={{
        loading,
        messages,
        addNewMessage,
        getMessages,
        resetListOfMessages,
      }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
