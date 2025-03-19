import React from 'react';
import { Children } from '../../types/Children';

export const FormContainer: React.FC<Children> = ({ children }) => {
  return (
    <div className="w-full flex flex-col pt-5 gap- items-start">{children}</div>
  );
};
