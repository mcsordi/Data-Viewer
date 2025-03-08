import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { BiSolidSearchAlt2 } from 'react-icons/bi';
import { apiRequests } from '../../../api/Requests/requests';
import constants from '../../../shared/facilities';
export type TPeopleData = {
  nome: string;
  email: string;
}[];

export const HomePage: React.FC = () => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const focusRef = useRef<HTMLInputElement>(null);
  const [isWritten, setIsWritten] = useState<string>('');
  const [peopleData, setPeopleData] = useState<TPeopleData | undefined>([]);
  const [responseError, setResponseError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPeopleData = async () => {
      try {
        const result = await apiRequests.getAll();
        setPeopleData(result);
        setLoading(false);
      } catch (error) {
        setResponseError(error);
        setLoading(false);
      }
      setLoading(false);
    };
    getPeopleData();
  }, []);

  const handleFocus = useCallback(() => {
    setInputFocus((prev) => !prev);
  }, []);
  return (
    <div className="dark:text-white flex flex-col gap-3 w-full">
      <ContainerGeneric>
        <div className="w-full h-10">
          <input
            ref={focusRef}
            placeholder="Pesquise algum nome aqui"
            type="search"
            className="w-full p-2 bg-slate-100 dark:bg-neutral-700 border dark:border-white border-slate-500  rounded-md h-full outline-0 md:w-lg
            dark:placeholder:text-gray-300 placeholder:text-gray-500"
            onFocus={(e) => e.target && handleFocus()}
            onBlur={(e) => e.target && handleFocus()}
            onChange={(e) => setIsWritten(e.target.value)}
          />
        </div>
        <div>
          <button
            disabled={isWritten == '' ? true : false}
            className={`hidden lg:flex ${inputFocus && isWritten != '' ? 'bg-amber-300 border-amber-300 border dark:border-amber-300 dark:bg-amber-300 ' : 'bg-neutral-900 border border-slate-400 dark:bg-white'}
             flex items-center justify-center px-4 py-2 rounded-md
          cursor-pointer`}
            onClick={() => focusRef?.current?.focus()}
          >
            <BiSolidSearchAlt2 className={`dark:text-black text-white`} />
          </button>
        </div>
      </ContainerGeneric>
      <div className="dark:bg-neutral-800  border rounded-md px-0 md:px-4 py-2.5 border-slate-400">
        <table className="flex flex-col w-full">
          <thead>
            <tr className="flex  w-full truncate">
              <th className="px-4 py-2 flex border border-gray-400 rounded-l-md w-full">
                Funções
              </th>
              <th className="px-4 py-2 flex border border-gray-400 border-l-0 border-r-0 w-full">
                Nome Completo
              </th>
              <th className="px-4 py-2 flex border border-gray-400 rounded-r-md w-full">
                Email
              </th>
            </tr>
            {loading && (
              <tr>
                <td className="w-screen border bg-amber-300 h-2.5 ">
                  <div className="w-full bg-gray-500 h-2 animate-pulse"></div>
                </td>
              </tr>
            )}
            {responseError ? (
              <tr>
                <td className="py-2">{constants.ERRO_CARREGAMENTO}</td>
              </tr>
            ) : (
              peopleData?.map((el, index) => (
                <tr
                  className="w-full truncate items-start flex justify-between odd:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
                  key={index}
                >
                  <td className="w-full py-2 pl-4 flex gap-3 text-xl">
                    <MdEdit className="cursor-pointer" />
                    <MdEdit className="cursor-pointer" />
                    <MdEdit className="cursor-pointer" />
                  </td>
                  <td className="w-full py-2 pl-4">{el.nome}</td>
                  <td className="w-full py-2 pl-4">{el.email}</td>
                </tr>
              ))
            )}
          </thead>
          <tbody className="first:bg-amber-300 "></tbody>
        </table>
      </div>
    </div>
  );
};
