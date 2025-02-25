import React, { useContext } from 'react';
import { MdLightMode } from 'react-icons/md';
import { theme } from '../../../contexts/ThemeContext/context';
import { MdDarkMode } from 'react-icons/md';

export const ThemeButton: React.FC = () => {
  const { themeDark, handleTheme } = useContext(theme);
  return (
    <div
      className={`dark:bg-neutral-800 dark:text-white bg-white cursor-pointer rounded-tl-md rounded-tr-md flex items-center justify-center border
       border-slate-400 border-b-0 border-r-0 h-15 bottom-0 absolute w-full gap-5 border-l-0`}
      onClick={handleTheme}
    >
      {themeDark ? (
        <MdDarkMode className="text-neutral-400 text-2xl" />
      ) : (
        <MdLightMode className=" dark:bg-black text-2xl text-amber-400" />
      )}
      Mudar Tema
    </div>
  );
};
