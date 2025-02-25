import { createContext } from 'react';
type TTheme = {
  themeDark: string;
  handleTheme: () => void;
};
export const theme = createContext({} as TTheme);
theme.displayName = 'Theme';
