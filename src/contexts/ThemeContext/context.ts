import { createContext } from 'react';
type TTheme = {
  themeDefault: boolean;
  handleTheme: () => void;
};
export const theme = createContext({} as TTheme);
theme.displayName = 'Theme';
