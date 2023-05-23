import React, { useState } from 'react';
import { User } from '../@types/User';

export type UsersContextType = {
  users: User[];
};

export const UsersContext = React.createContext<UsersContextType | null>(null);

const APP_USERS = [
  {
    id: 2,
    name: 'Ervin Howell',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
  },
  {
    id: 11,
    name: 'Ervin Smith',
  },
  {
    id: 12,
    name: 'Clementine Smith',
  },
  {
    id: 13,
    name: 'Patricia Smith',
  },
  {
    id: 14,
    name: 'Chelsey Smith',
  },
  {
    id: 15,
    name: 'Mrs. Dennis Smith',
  },
  {
    id: 16,
    name: 'Kurtis Smith',
  },
  {
    id: 17,
    name: 'Nicholas Smith',
  },
  {
    id: 18,
    name: 'Glenna Smith',
  },
  {
    id: 19,
    name: 'Clementina Smith',
  },
  {
    id: 20,
    name: 'john Smith',
  },
];

const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(APP_USERS);

  return (
    <UsersContext.Provider
      value={{
        users: users,
      }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
