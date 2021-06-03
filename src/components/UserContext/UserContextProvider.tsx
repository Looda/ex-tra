import React, { useContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Users, UsersProviderProps } from "./types";
import MD5 from "crypto-js/md5";

interface UserContextProvider {
  users: Users;
  saveUsers: (value: Users) => void;
  currentUser: string;
  setCurrentUser: (value: string) => void;
}

const UsersContext = React.createContext({});

export const useUsers = () => {
  const {
    users = {},
    saveUsers,
    currentUser,
    setCurrentUser,
  } = useContext(UsersContext) as UserContextProvider;

  const addUser = (user: string, password: string) => {
    saveUsers({
      ...users,
      [user]: {
        user,
        password: MD5(password).toString(),
      },
    });
    setCurrentUser(user);
  };

  const authUser = (user: string, password: string) => {
    if (users[user]?.password === MD5(password).toString()) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logOut = () => {
    setCurrentUser("");
  };

  return {
    addUser,
    authUser,
    logOut,
    users: Object.keys(users),
    isAuth: !!currentUser,
    currentUser: currentUser ?? "",
  };
};

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [userStore, setUserStore] = useLocalStorage("users", {} as Users);
  const [users, setUsers] = useState<Users>(userStore);
  const [currentUser, setCurrentUser] = useState("");

  const saveUsers = (value: Users) => {
    setUsers(value);
    setUserStore(value);
  };

  return (
    <UsersContext.Provider
      value={{ users, saveUsers, currentUser, setCurrentUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};
