import React, { useCallback, useRef, useState } from 'react';

import { ContainerEditors } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { BiSolidSearchAlt2 } from 'react-icons/bi';

export const HomePage: React.FC = () => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const focusRef = useRef<HTMLInputElement>(null);
  const [isWritten, setIsWritten] = useState<string>('');
  console.log('🚀 ~ isWritten:', isWritten);

  const handleFocus = useCallback(() => {
    setInputFocus((prev) => !prev);
  }, []);
  return (
    <div className="dark:text-white flex w-full">
      <ContainerEditors height={'16'}>
        <div className="w-full h-10">
          <input
            ref={focusRef}
            placeholder="Pesquise algum nome aqui"
            type="search"
            className="bg-slate-100 dark:bg-neutral-700 border dark:border-white border-slate-500  rounded-md h-full outline-0 p-2 w-lg
            dark:placeholder:text-gray-300 placeholder:text-gray-500"
            onFocus={(e) => e.target && handleFocus()}
            onBlur={(e) => e.target && handleFocus()}
            onChange={(e) => setIsWritten(e.target.value)}
          />
        </div>
        <div>
          <button
            disabled={isWritten == '' ? true : false}
            className={`${inputFocus && isWritten != '' ? 'bg-gray-800 border-gray-800 text-amber-300 border dark:border-amber-300 dark:bg-amber-300 ' : 'bg-zinc-200 border border-slate-400 dark:bg-white'}
             flex items-center justify-center px-4 py-2 rounded-md
          cursor-pointer`}
            onClick={() => focusRef?.current?.focus()}
          >
            <BiSolidSearchAlt2 className={`dark:text-black`} />
          </button>
        </div>
      </ContainerEditors>
    </div>
  );
};
