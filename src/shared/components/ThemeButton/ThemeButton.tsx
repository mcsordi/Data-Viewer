import React, { useContext } from 'react';
import { MdLightMode } from 'react-icons/md';
import { theme } from '../../../contexts/ThemeContext/context';
import { MdDarkMode } from 'react-icons/md';

export const ThemeButton: React.FC = () => {
  const { themeDark, handleTheme } = useContext(theme);
  return (
    <button
      className={`dark:bg-neutral-800 dark:text-white bg-white cursor-pointer rounded-tl-md rounded-tr-md flex items-center justify-start border
       border-slate-400 border-b-0 border-r-0 py-3 px-5 w-full gap-10 border-l-0 text-lg font-medium`}
      onClick={handleTheme}
    >
      {themeDark ? (
        <MdDarkMode className="text-white text-3xl" />
      ) : (
        <MdLightMode className=" dark:bg-black text-3xl text-amber-400" />
      )}
      Mudar tema
    </button>
  );
};
