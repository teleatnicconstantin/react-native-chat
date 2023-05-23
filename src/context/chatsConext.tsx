import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat } from '../@types/Chat';
import { Message } from '../@types/Message';

export type ChatContextType = {
  loading: boolean;
  chats: Chat[];
  addNewChat: (chat: Chat) => Promise<Chat>;
  updateLastMessage: (chat: Chat, message: Message) => void;
};

export const ChatsContext = React.createContext<ChatContextType | null>(null);

const ChatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const localStorageKey = '@test-whatsapp-chats';
  const [loading, setLoading] = useState<boolean>(true);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(localStorageKey).then(data => {
      if (data) {
        setChats(JSON.parse(data));
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(localStorageKey, JSON.stringify(chats));
    }
  }, [chats]);

  const addNewChat = (chat: Chat): Promise<Chat> => {
    return new Promise(resolve => {
      setChats([chat, ...chats]);

      resolve(chat);
    });
  };

  const updateLastMessage = (chat: Chat, message: Message) => {
    setChats([{ ...chat, lastMessage: message }, ...chats.filter(item => item.id !== chat.id)]);
  };

  return (
    <ChatsContext.Provider
      value={{
        loading,
        chats,
        addNewChat,
        updateLastMessage,
      }}>
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsProvider;
