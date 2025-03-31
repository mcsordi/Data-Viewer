import { useCallback, useState } from 'react';
import { Children } from '../../shared/types/Children';
import { removePhoto } from './context';

// eslint-disable-next-line react/prop-types
export const RemovePhoto: React.FC<Children> = ({ children }) => {
  const [onClickBtn, setOnClickBtn] = useState<boolean>(false);
  const handleClickBtn = useCallback(() => {
    setOnClickBtn((value) => !value);
  }, []);
  return (
    <removePhoto.Provider value={{ onClickBtn, handleClickBtn }}>
      {children}
    </removePhoto.Provider>
  );
};
