import React, { useCallback, useState } from 'react';
import { Children } from '../../shared/types/Children';
import { firstButton } from './context';

export const FirstEditButton: React.FC<Children> = ({ children }) => {
  const [inBlur, setInBlur] = useState<boolean>(true);
  const handleBlur = useCallback(() => {
    return setInBlur((prev) => !prev);
  }, []);
  return (
    <firstButton.Provider value={{ inBlur, handleBlur }}>
      {children}
    </firstButton.Provider>
  );
};
