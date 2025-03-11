import React, { useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { BiSolidSearchAlt2 } from 'react-icons/bi';
import { apiRequests } from '../../../api/Requests/requests';
import constants from '../../../shared/facilities';
import { TPeopleData } from '../../../shared/types/PeopleData';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../shared/hooks';
import { FaChevronLeft } from 'react-icons/fa';

export const HomePage: React.FC = () => {
  const focusRef = useRef<HTMLInputElement>(null);
  const [peopleData, setPeopleData] = useState<TPeopleData | undefined>([]);
  const [responseError, setResponseError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams({
    nome: '',
    pagina: '1',
  });
  const peopleName = searchParams.get('nome');
  const currentPage = Number(searchParams.get('pagina'));
  const debouncing = useDebounce(peopleName || '');
  const [peopleLength, setPeopleLength] = useState<number | undefined>(0);
  const [numOfPages, setNumOfPages] = useState<number>();
  const loopPages = () => {
    const arr = [];
    if (numOfPages != undefined) {
      for (let i = 1; i <= numOfPages; i++) {
        arr.push(i);
      }
    }
    return arr;
  };
  loopPages();
  useEffect(() => {
    const getPeopleData = async () => {
      setLoading(true);
      try {
        const response = await apiRequests.getAll(
          debouncing,
          Number(currentPage),
        );
        setPeopleData(response?.data);
        setPeopleLength(response?.totalCount);
        setLoading(false);
      } catch (error) {
        setResponseError(error);
      } finally {
        setLoading(false);
      }
    };
    getPeopleData();
  }, [currentPage, debouncing]);

  useEffect(() => {
    if (peopleLength != undefined) {
      return setNumOfPages(Math.ceil(peopleLength / constants.MAX_LINHAS));
    }
  }, [peopleLength]);

  return (
    <div className="dark:text-white flex flex-col gap-3 w-full">
      <ContainerGeneric>
        <div className="w-full h-10">
          <input
            ref={focusRef}
            value={peopleName || ''}
            placeholder="Pesquise algum nome aqui"
            type="search"
            className="focus:border-2 focus:border-amber-400 w-full p-2 bg-slate-100 dark:bg-neutral-700 border dark:border-white border-slate-500  rounded-md h-full outline-0 md:w-lg
            dark:placeholder:text-gray-300 placeholder:text-gray-500"
            onChange={(e) => {
              setSearchParams((prev) => {
                prev.set('nome', e.target.value.trimStart());
                prev.set('pagina', '1');
                return prev;
              });
            }}
          />
        </div>
        <div>
          <button
            className={`hidden lg:flex bg-neutral-900 border border-slate-400 dark:bg-white
             md:flex items-center justify-center px-4 py-2 rounded-md
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
            {peopleData?.length == 0 && !responseError && (
              <tr>
                <td>Nenhum resultado para {`"${peopleName}"`}</td>
              </tr>
            )}
          </thead>
          <tbody className="first:bg-amber-300"></tbody>
        </table>
        <div className="flex w-full items-center justify-center gap-0.5 pt-4 mb-2">
          <div>
            <FaChevronLeft
              className="text-xl cursor-pointer font-bold"
              onClick={() => {
                const minus = currentPage - 1;
                setSearchParams((prev) => {
                  prev.set('pagina', minus > 1 ? minus.toString() : '1');
                  return prev;
                });
              }}
            />
          </div>
          {loopPages().map((el, idx) => {
            return (
              <div
                className={`${idx + 1 === currentPage && 'bg-amber-300 text-white rounded-md px-2 dark:text-neutral-800'} px-1 cursor-pointer text-2xl`}
                key={idx}
                onClick={(e) => {
                  setSearchParams((prev) => {
                    prev.set('pagina', e.currentTarget.innerHTML);
                    return prev;
                  });
                }}
              >
                {el}
              </div>
            );
          })}
          <div>
            <FaChevronLeft
              className="rotate-180 text-xl cursor-pointer font-bold"
              onClick={() => {
                if (numOfPages !== undefined) {
                  const plus =
                    currentPage < numOfPages ? currentPage + 1 : numOfPages;
                  setSearchParams((prev) => {
                    prev.set('pagina', plus.toString());
                    return prev;
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
