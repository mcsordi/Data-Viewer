import { createContext } from 'react';
type TTheme = {
  themeDark: boolean;
  handleTheme: () => void;
};
export const theme = createContext({} as TTheme);
theme.displayName = 'Theme';
