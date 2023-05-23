import React from 'react';
import { User } from '../@types/User';

export type AuthContextType = {
  auth: User;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authUser: User = {
    id: 1,
    name: 'Teleatnic Constantin',
  };

  return (
    <AuthContext.Provider
      value={{
        auth: authUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
