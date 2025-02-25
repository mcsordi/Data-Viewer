import React from 'react';

import { ContainerEditors } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { BiSolidSearchAlt2 } from 'react-icons/bi';

export const HomePage: React.FC = () => {
  return (
    <div className={`dark:text-white flex w-full`}>
      <ContainerEditors>
        <div className="w-full h-10">
          <input
            placeholder="Pesquise algum nome aqui"
            type="search"
            className="border-2 border-slate-500 dark:border-amber-300 rounded-md h-full outline-0 p-2 w-lg
            dark:placeholder:text-gray-300 placeholder:text-gray-500"
          />
        </div>
        <div>
          <button
            className="dark:bg-amber-300 bg-slate-600 border-0 flex items-center justify-center p-2 rounded-md
          cursor-pointer hover:bg-slate-200"
          >
            <BiSolidSearchAlt2 className="dark:text-zinc-800 text-white hover:text-black" />
          </button>
        </div>
      </ContainerEditors>
    </div>
  );
};
