import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { apiRequests } from '../../../api/Requests/requests';
import constants, { NENHUM_RESULTADO } from '../../../shared/facilities';
import { TPeopleData } from '../../../shared/types/PeopleData';
import { Link, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../shared/hooks';
import { MdDelete } from 'react-icons/md';
import { Pagination } from '../../../shared/components/Pagination/Pagination';

export const PeoplePage: React.FC = () => {
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
  const [deleted, setDeleted] = useState<number>();

  const loopPagination = () => {
    const arr = [];
    if (numOfPages != undefined) {
      for (let i = 1; i <= numOfPages; i++) {
        arr.push(i);
      }
    }
    return arr;
  };
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
  }, [currentPage, debouncing, deleted]);

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
          <Link to="/nova-pessoa">
            <button
              className={`hidden lg:flex bg-zinc-800 hover:text-amber-300 dark:bg-white border border-slate-300
             md:flex items-center justify-center px-4 py-2 rounded-md
          cursor-pointer dark:text-neutral-800 text-white text-xl font-bold`}
            >
              NEW
            </button>
          </Link>
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
              <tr className="flex items-center justify-center mt-4 mb-4">
                <td className="w-full bg-amber-300 animate-pulse h-2.5 rounded-md border border-slate-500 dark:border-slate-400"></td>
              </tr>
            )}
            {responseError ? (
              <tr>
                <td className="py-4">{constants.ERRO_CARREGAMENTO}</td>
              </tr>
            ) : (
              !loading &&
              peopleData?.map((el, index) => (
                <tr
                  className="w-full truncate items-start flex justify-between odd:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
                  key={index}
                >
                  <td className="w-full py-2 pl-4 flex gap-3 text-xl">
                    <Link to={`/editar/${el.nome}`}>
                      <MdEdit className="cursor-pointer" />
                    </Link>
                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => {
                        apiRequests.deleteById(el.id);
                        setDeleted(el.id);
                        if (peopleLength != undefined) {
                          if (Math.ceil((peopleLength - 1) / 7) < currentPage) {
                            setSearchParams((prev) => {
                              prev.set(
                                'pagina',
                                Math.ceil((peopleLength - 1) / 7).toString(),
                              );
                              return prev;
                            });
                          }
                        }
                      }}
                    />
                  </td>
                  <td className="w-full py-2 pl-4">{el.nome}</td>
                  <td className="w-full py-2 pl-4">{el.email}</td>
                </tr>
              ))
            )}
            {!loading && peopleData?.length == 0 && !responseError && (
              <tr>
                <td className="py-4">{NENHUM_RESULTADO(peopleName || '')}</td>
              </tr>
            )}
          </thead>
          <tbody className="first:bg-amber-300"></tbody>
        </table>
        {!loading && !responseError && (
          <div
            className={`${numOfPages != undefined && numOfPages == 0 && 'absolute'} flex w-full items-center justify-center gap-0.5 pt-4 mb-2`}
          >
            <Pagination
              currentPage={currentPage}
              loopPagination={loopPagination()}
              numOfPages={numOfPages}
              setSearchParams={setSearchParams}
            />
          </div>
        )}
      </div>
    </div>
  );
};
