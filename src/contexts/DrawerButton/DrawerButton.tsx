import React, { useCallback, useState } from 'react';
import { drawerBtn } from './context';

type TDrawerButton = { children: React.ReactNode; visible?: boolean };
export const DrawerButton: React.FC<TDrawerButton> = ({
  children,
  visible = false,
}) => {
  const handleClick = useCallback(() => {
    setShowDrawer((value) => !value);
  }, []);
  const [showDrawer, setShowDrawer] = useState<boolean>(visible);
  return (
    <drawerBtn.Provider value={{ showDrawer, handleClick }}>
      {children}
    </drawerBtn.Provider>
  );
};
