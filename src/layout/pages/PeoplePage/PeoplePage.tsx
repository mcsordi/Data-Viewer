import React, { useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { peopleRequests } from '../../../api/PeopleRequests/requests';
import constants, { NENHUM_RESULTADO } from '../../../shared/facilities';
import { TPeopleData } from '../../../shared/types/PeopleData';
import { Link, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../shared/hooks';
import { MdDelete } from 'react-icons/md';
import { Pagination } from '../../../shared/components/Pagination/Pagination';
import { SearchInput } from '../../../shared/components/SearchInput/SearchInput';
import { NewButton } from '../../../shared/components/NewButton/NewButton';
import { LoadComponent } from '../../../shared/components/LoadComponent/LoadComponent';
import { IssueMessage } from '../../../shared/components/IssueMessage/IssueMessage';
import { InputSkeleton } from '../../../shared/components/InputSkeleton/InputSkeleton';

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
  const focus = useRef({} as HTMLInputElement);

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
      const response = await peopleRequests.getAll(
        debouncing,
        Number(currentPage),
      );
      if (typeof response == 'object') {
        setPeopleData(response?.data);
        setPeopleLength(response?.totalCount);
      } else {
        setResponseError(response);
      }
      setLoading(false);
    };
    getPeopleData();
  }, [currentPage, debouncing, deleted]);

  useEffect(() => {
    return setNumOfPages(
      Math.ceil((peopleLength as number) / constants.MAX_LINHAS),
    );
  }, [peopleLength]);

  return (
    <div className="dark:text-white flex flex-col gap-3 w-full px-0.5 xs:px-0">
      <ContainerGeneric>
        {loading ? (
          <InputSkeleton />
        ) : (
          <>
            <SearchInput
              focus={focus}
              placeholder="Pesquise alguma pessoa aqui"
              value={peopleName as string}
              onChangeLogic={(e: string) =>
                setSearchParams(
                  (prev) => {
                    prev.set('nome', e || ''), prev.set('pagina', '1');
                    return prev;
                  },
                  { replace: true },
                )
              }
            />
            <div>
              <NewButton whereTo="/nova-pessoa" text="NOVO" />
            </div>
          </>
        )}
      </ContainerGeneric>
      <div className="dark:bg-neutral-800 border rounded-md px-0 md:px-4 py-2.5 border-slate-400">
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
          </thead>
          <tbody className="first:bg-amber-300">
            {loading && <LoadComponent />}
            {responseError ? (
              <IssueMessage message={constants.ERRO_CARREGAMENTO} />
            ) : (
              !loading &&
              peopleData?.map((el, index) => (
                <tr
                  className="w-full hover:bg-amber-300 truncate items-start flex justify-between odd:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
                  key={index}
                >
                  <td className="w-full py-2 pl-4 flex gap-3 text-xl">
                    <Link to={`/editar/${el.nome}`}>
                      <MdEdit className="cursor-pointer" />
                    </Link>
                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => {
                        peopleRequests.deleteById(el.id);
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
                  <td className="truncate w-full py-2 pl-4">{el.nome}</td>
                  <td className="w-full truncate py-2 pl-4">{el.email}</td>
                </tr>
              ))
            )}
            {!loading &&
              peopleData?.length == 0 &&
              !responseError &&
              peopleName != '' && (
                <IssueMessage message={NENHUM_RESULTADO(peopleName || '')} />
              )}
          </tbody>
        </table>
        {!loading && !responseError && (
          <div
            className={`${numOfPages == 0 && 'absolute'} flex w-full items-center justify-center gap-0.5 pt-4 mb-2`}
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
