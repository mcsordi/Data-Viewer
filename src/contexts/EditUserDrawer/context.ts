import { createContext } from 'react';
type TUseDrawer = {
  handleOpenClick: () => void;
  openedDrawer: boolean;
};

export const userDrawer = createContext({} as TUseDrawer);
