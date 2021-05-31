export interface Users {
  [key: string]: {
    user: string;
    password: string;
  };
}

export interface UsersProviderProps {
  children: React.ReactNode;
}
