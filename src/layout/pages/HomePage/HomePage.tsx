import React, { useContext } from 'react';
import { theme } from '../../../contexts/ThemeContext/context';
import { FaSearch } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { RxDividerVertical } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';

export const HomePage: React.FC = () => {
  const { themeDark } = useContext(theme);
  return (
    <div className={`${themeDark && 'text-white'} flex w-full`}>
      <div
        className={`border flex items-center justify-start border-slate-400 w-full h-12 rounded-md text-2xl gap-3 p-4`}
      >
        <button className="flex items-center gap-2">
          <FaSearch />
          <div className="text-xl">Pesquisar</div>
        </button>
        <FaSave />
        <MdEdit />
        <RxDividerVertical className="text-4xl" />
        <IoArrowBackOutline />
      </div>
    </div>
  );
};
