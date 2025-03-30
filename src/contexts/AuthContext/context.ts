import { createContext } from 'react';

export type TAuthContext = {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<string | void | Error>;
  logout: () => void;
};

export const authContext = createContext({} as TAuthContext);
