import React from 'react';

type TContainerEditors = {
  children: React.ReactNode;
  height?: string;
};
export const ContainerEditors: React.FC<TContainerEditors> = ({
  children,
  height = '14',
}) => {
  return (
    <div
      className={`dark:bg-neutral-800 bg-white border flex items-center justify-start
         border-slate-400 w-full h-${height} rounded-md text-2xl gap-3 p-4`}
    >
      {children}
    </div>
  );
};
