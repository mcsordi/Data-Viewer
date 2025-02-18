import { createContext } from 'react';
type TDrawerBtn = {
  showDrawer: boolean;
  handleClick: () => void;
};
export const drawerBtn = createContext({} as TDrawerBtn);
