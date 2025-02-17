import React, { useContext } from 'react';
import { MdLightMode } from 'react-icons/md';
import { theme } from '../../../contexts/ThemeContext';
import { MdDarkMode } from 'react-icons/md';

export const ThemeButton: React.FC = () => {
  const { themeDefault, handleTheme } = useContext(theme);
  return (
    <div
      className="cursor-pointer bg-white flex items-center justify-center border border-slate-400 border-r-0 h-15 bottom-0 absolute w-full gap-5"
      onClick={handleTheme}
    >
      {themeDefault ? (
        <MdDarkMode className="text-2xl text-neutral-600" />
      ) : (
        <MdLightMode className="text-2xl text-amber-400" />
      )}
      Mudar Tema
    </div>
  );
};
