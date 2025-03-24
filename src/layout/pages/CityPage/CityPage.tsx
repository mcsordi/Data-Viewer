import React, { useEffect, useRef, useState } from 'react';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { cityRequests, TCitiesReques } from '../../../api/CityRequests/request';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchInput } from '../../../shared/components/SearchInput/SearchInput';
import { NewButton } from '../../../shared/components/NewButton/NewButton';
import { useDebounce } from '../../../shared/hooks';
import constants, { NENHUM_RESULTADO } from '../../../shared/facilities';
import { Pagination } from '../../../shared/components/Pagination/Pagination';
import { LoadComponent } from '../../../shared/components/LoadComponent/LoadComponent';
import { IssueMessage } from '../../../shared/components/IssueMessage/IssueMessage';
import { InputSkeleton } from '../../../shared/components/InputSkeleton/InputSkeleton';

export const CityPage: React.FC = () => {
  const [cities, setCities] = useState<TCitiesReques>();
  const [cityCount, setCityCount] = useState<number>();
  const [searchParams, setSearchParams] = useSearchParams({
    cidade: '',
    pagina: '1',
  });
  const [fetchError, setFetchError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const cityName = searchParams.get('cidade');
  const cityPage = searchParams.get('pagina');
  const totalPages = Math.ceil((cityCount as number) / constants.MAX_LINHAS);
  const debounce = useDebounce(cityName ? cityName : '');
  const lessOnePage = Math.ceil(((cityCount as number) - 1) / 7);
  const [deleted, setDeleted] = useState<number>();
  const focus = useRef({} as HTMLInputElement);
  const loopPages = () => {
    const citiesArr = [];
    for (let i = 1; i <= totalPages; i++) {
      citiesArr.push(i);
    }

    return citiesArr;
  };
  useEffect(() => {
    const getCities = async () => {
      setLoading(true);
      const request = await cityRequests.getAll(
        debounce,
        cityPage ? cityPage : '1',
      );
      if (typeof request == 'object') {
        setCities(await request.cities);
        setCityCount(request.totalCount);
      } else {
        setFetchError(request);
      }
      setLoading(false);
    };
    getCities();
  }, [debounce, cityPage, deleted]);

  return (
    <div className={`dark:text-white flex w-full flex-col`}>
      <ContainerGeneric>
        {loading ? (
          <InputSkeleton />
        ) : (
          <>
            <SearchInput
              focus={focus}
              placeholder="Pesquise alguma cidade aqui"
              value={cityName || ''}
              onChangeLogic={(e) => {
                setSearchParams(
                  (prev) => {
                    prev.set('cidade', e);
                    prev.set('pagina', '1');
                    return prev;
                  },
                  { replace: true },
                );
              }}
            />
            <NewButton whereTo="/nova-cidade" text="NOVA" />
          </>
        )}
      </ContainerGeneric>
      <div className="dark:bg-neutral-800  border rounded-md px-0 md:px-4 py-2.5 mt-3 border-slate-400">
        <table className="w-full">
          <thead className="w-full">
            <tr className="flex  w-full truncate">
              <th className="px-4 py-2 flex border border-gray-400 rounded-l-md w-full">
                Funções
              </th>
              <th className="px-4 py-2 flex border border-gray-400 border-l-0 border-r-0 w-full">
                Cidade
              </th>
              <th className="px-4 py-2 flex border border-gray-400 rounded-r-md w-full">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && <LoadComponent />}
            {(cityCount as number) < 1 && cityName != '' && (
              <IssueMessage message={NENHUM_RESULTADO(cityName as string)} />
            )}
            {fetchError && (
              <IssueMessage message={constants.ERRO_CARREGAMENTO} />
            )}
            {}
            {!loading &&
              !fetchError &&
              cities?.map(({ nome, estado, id }) => {
                return (
                  <tr
                    key={id}
                    className="w-full flex justify-start odd:bg-gray-100 dark:odd:bg-neutral-900 hover:bg-amber-300 dark:hover:bg-amber-300 dark:hover:text-black"
                  >
                    <td className="w-full flex text-xl gap-3 px-4 py-2">
                      <Link to={`/editar/cidade/${nome}`}>
                        <MdEdit className="cursor-pointer" />
                      </Link>
                      <MdDelete
                        className="cursor-pointer"
                        onClick={() => {
                          cityRequests.deleteById(id), setDeleted(id);
                          setSearchParams((prev) => {
                            prev.set('pagina', lessOnePage.toString());
                            return prev;
                          });
                        }}
                      />
                    </td>
                    <td className="w-full px-4 py-2">{nome}</td>
                    <td className="w-full px-4 py-2">{estado}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div
          className={`${fetchError && 'hidden'} ${loading && 'hidden'} ${totalPages < 1 && 'hidden'} w-full flex items-baseline justify-center p-2 pt-4`}
        >
          <Pagination
            currentPage={Number(cityPage)}
            numOfPages={totalPages}
            loopPagination={loopPages()}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>
    </div>
  );
};
