import React from 'react';
import { Children } from '../../types/Children';

export const ContainerEditors: React.FC<Children> = ({ children }) => {
  return (
    <div
      className={`dark:bg-neutral-800 bg-white border flex items-center justify-start
         border-slate-400 w-full h-14 rounded-md text-2xl gap-3 p-4`}
    >
      {children}
    </div>
  );
};
