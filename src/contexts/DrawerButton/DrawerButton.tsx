import React, { useCallback, useState } from 'react';
import { Children } from '../../shared/types/Children';
import { drawerBtn } from './context';

export const DrawerButton: React.FC<Children> = ({ children }) => {
  const handleClick = useCallback(() => {
    setShowDrawer((value) => !value);
  }, []);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  return (
    <drawerBtn.Provider value={{ showDrawer, handleClick }}>
      {children}
    </drawerBtn.Provider>
  );
};
