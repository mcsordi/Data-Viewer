import React from 'react';
import { Children } from '../../types/Children';

export const ContainerGeneric: React.FC<Children> = ({ children }) => {
  return (
    <div
      className={`dark:bg-neutral-800 bg-white border flex items-center justify-start
         border-slate-400 w-full h-12 rounded-md text-2xl  px-2 md:px-4 py-8 gap-2.5`}
    >
      {children}
    </div>
  );
};
