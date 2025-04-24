import React, { useEffect, useState } from 'react';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import {
  cityRequests,
  TCitiesRequest,
} from '../../../api/CityRequests/request';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchInput } from '../../../shared/components/SearchInput/SearchInput';
import { NewButton } from '../../../shared/components/NewButton/NewButton';
import { useDebounce } from '../../../shared/hooks';
import constants, { NENHUM_RESULTADO } from '../../../shared/facilities';
import { LoadComponent } from '../../../shared/components/LoadComponent/LoadComponent';
import { IssueMessage } from '../../../shared/components/IssueMessage/IssueMessage';
import { InputSkeleton } from '../../../shared/components/InputSkeleton/InputSkeleton';
import { userRequest } from '../../../api/UserRequests/request';
import ReactPaginate from 'react-paginate';

export const CityPage: React.FC = () => {
  const [cities, setCities] = useState<TCitiesRequest>();
  const [cityCount, setCityCount] = useState<number>();
  const [searchParams, setSearchParams] = useSearchParams({
    cidade: '',
    pagina: '1',
  });
  const [fetchError, setFetchError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const cityName = searchParams.get('cidade');
  const cityPage = Number(searchParams.get('pagina'));
  const totalPages = Math.ceil((cityCount as number) / constants.MAX_LINHAS);
  const debounce = useDebounce(cityName ? cityName : '');
  const [deleted, setDeleted] = useState<number>();
  const [userId, setUserId] = useState({} as number);

  useEffect(() => {
    const getIdUser = async () => {
      const emailUser = localStorage.getItem('ACCESS_APPLICATION_EMAIL');
      const dataUser = await userRequest.getUserByEmail(emailUser as string);
      if (dataUser instanceof Error) {
        setFetchError(dataUser.message);
      } else {
        setUserId(dataUser);
      }
    };
    getIdUser();
  }, []);
  useEffect(() => {
    const getCities = async () => {
      setLoading(true);
      const request = await cityRequests.getAll(debounce, cityPage || 1);
      if (request instanceof Error) {
        setFetchError(request.message);
      } else {
        setCities(request.data);
        setCityCount(request.totalCount);
      }

      setLoading(false);
    };
    getCities();
  }, [debounce, cityPage, deleted, userId]);

  return (
    <div className={`dark:text-white flex w-full flex-col px-0.5 xs:px-0`}>
      <ContainerGeneric>
        {loading && !cityName ? (
          <InputSkeleton />
        ) : (
          <>
            <SearchInput
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
      <div className="dark:bg-neutral-800 border rounded-md px-0 md:px-4 py-2.5 mt-3 border-slate-400">
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
                            prev.set('pagina', String(cityPage));
                            return prev;
                          });
                        }}
                      />
                    </td>
                    <td className="truncate w-full px-4 py-2">{nome}</td>
                    <td className="w-full px-4 py-2">{estado}</td>
                  </tr>
                );
              })}
            {cities?.length == 0 &&
              !fetchError &&
              !loading &&
              cityName == '' && (
                <IssueMessage message="Nenhuma cidade foi cadastrada" />
              )}
          </tbody>
        </table>
        <div
          className={`${fetchError && 'hidden'} ${loading && 'hidden'} ${totalPages < 1 && 'hidden'} flex items-baseline justify-center p-2 pt-4`}
        >
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(value) =>
              setSearchParams((prev) => {
                prev.set('pagina', String(value.selected + 1));
                return prev;
              })
            }
            pageRangeDisplayed={1}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={4}
            forcePage={Number(cityPage) - 1}
            className="flex gap-2 cursor-pointer text-xl items-center"
            pageLinkClassName="px-1.5 py-1.5 rounded-md hover:bg-gray-100 hover:dark:text-neutral-800 text-lg font-bold"
            activeClassName="active"
            previousLinkClassName="text-3xl px-1 py-1.5 font-poppins"
            nextLinkClassName="text-3xl px-1 py-1.5 font-poppins"
            activeLinkClassName="bg-amber-300 dark:text-neutral-800 text-white font-bold"

            // currentPage={Number(cityPage)}
            // numOfPages={totalPages}
            // loopPagination={loopPages()}
            // setSearchParams={setSearchParams}
          />
        </div>
      </div>
    </div>
  );
};
