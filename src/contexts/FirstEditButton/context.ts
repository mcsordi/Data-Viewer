import { createContext } from 'react';

type TFirstButton = {
  inBlur: boolean;
  handleBlur: () => void;
};
export const firstButton = createContext({} as TFirstButton);
