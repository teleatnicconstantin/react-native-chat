import React from 'react';
import AuthProvider from './authContext';
import ChatsProvider from './chatsConext';
import UsersProvider from './usersContext';
import MessagesProvider from './conversationConext';

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ChatsProvider>
        <MessagesProvider>
          <UsersProvider>{children}</UsersProvider>
        </MessagesProvider>
      </ChatsProvider>
    </AuthProvider>
  );
};

export default Store;
