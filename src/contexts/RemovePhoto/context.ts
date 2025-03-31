import { createContext } from 'react';
type TRemovePhoto = {
  onClickBtn: boolean;
  handleClickBtn: () => void;
};

export const removePhoto = createContext({} as TRemovePhoto);
