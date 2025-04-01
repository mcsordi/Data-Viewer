import { useCallback, useState } from 'react';
import { Children } from '../../shared/types/Children';
import { userDrawer } from './context';

// eslint-disable-next-line react/prop-types
export const UserDrawer: React.FC<Children> = ({ children }) => {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const handleOpenClick = useCallback(() => {
    setOpenedDrawer((value) => !value);
  }, []);
  return (
    <userDrawer.Provider value={{ handleOpenClick, openedDrawer }}>
      {children}
    </userDrawer.Provider>
  );
};
