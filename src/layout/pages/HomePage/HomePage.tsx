import React, { useEffect, useState } from 'react';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { peopleRequests } from '../../../api/PeopleRequests/requests';
import { ViewNumInfo } from '../../../shared/components/ViewNumInfo/ViewNumInfo';
import { FaSearch } from 'react-icons/fa';
import { IoPeopleSharp } from 'react-icons/io5';
import { PiBuildingApartmentFill } from 'react-icons/pi';
import { Skeleton } from '../../../shared/components/Skeleton/Skeleton';
import { cityRequests } from '../../../api/CityRequests/request';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { RxDividerVertical } from 'react-icons/rx';
import { userRequest } from '../../../api/UserRequests/request';

export const HomePage: React.FC = () => {
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [onClick, setOnClick] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cityCount, setCityCount] = useState<number>(0);
  const [errorCities, setErrorCities] = useState<string>();
  const [errorPeople, setErrorPeople] = useState<string>();
  const [logUser, setLogUser] = useState<number>();

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      const fetch = await cityRequests.getAllOfTheCities(logUser as number);
      if (fetch instanceof Error) {
        setErrorCities(fetch.message);
      } else {
        setCityCount(fetch.totalCount);
      }

      setLoading(false);
    };
    const fetchPeople = async () => {
      setLoading(true);
      const fetch = await peopleRequests.getAllOfThePeople(logUser as number);
      if (fetch instanceof Error) {
        setErrorPeople(fetch.message);
      } else {
        setPeopleCount(fetch.totalCount);
      }

      setLoading(false);
    };

    fetchCities();
    fetchPeople();
  }, [logUser]);
  useEffect(() => {
    const loggedUser = async () => {
      const email = localStorage.getItem('ACCESS_APPLICATION_EMAIL');
      const dataUser = await userRequest.getUserByEmail(email as string);
      if (dataUser instanceof Error) {
        setErrorPeople(dataUser.message);
      } else {
        setLogUser(dataUser);
      }
    };
    loggedUser();
  }, []);
  return (
    <div className="w-full h-full dark:text-white px-0.5 xs:px-0">
      <ContainerGeneric>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <div
              className="flex items-center px-0.5 py-1  rounded-md cursor-pointer"
              onClick={() => setOnClick((prev) => !prev)}
            >
              <EditComponent icon={<FaSearch />} textIcon="Pesquisar" />
            </div>
            {onClick && (
              <div className="flex gap-3 py-2">
                <EditComponent
                  textIcon="Pessoas"
                  icon={<IoPeopleSharp />}
                  whereToNav="/pessoas"
                />

                <EditComponent
                  textIcon="Cidades"
                  icon={<PiBuildingApartmentFill />}
                  whereToNav="/cidades"
                />
                <RxDividerVertical className="text-4xl" />
              </div>
            )}

            <EditComponent
              textIcon="Nova Pessoa"
              icon={<IoPeopleSharp />}
              whereToNav="/nova-pessoa"
            />
            <EditComponent
              textIcon="Nova Cidade"
              icon={<PiBuildingApartmentFill />}
              whereToNav="/nova-cidade"
            />
          </>
        )}
      </ContainerGeneric>
      {errorCities || errorPeople ? (
        <div className="mt-5 text-xl">Ocorreu um erro inesperado</div>
      ) : loading ? (
        <div className="flex items-center justify-center md:items-start md:justify-start gap-3 w-full h-96 mt-5 flex-col xs:flex-row">
          <div className="w-64 h-48  dark:from-neutral-800 dark:to-stone-800 from-gray-100 to-gray-200 from-20% to-100% bg-gradient-to-r rounded-md animate-pulse"></div>
          <div className="w-64 h-48 dark:from-neutral-800 dark:to-stone-800 from-gray-100 to-gray-200 from-20% to-100% bg-gradient-to-l rounded-md animate-pulse"></div>
        </div>
      ) : (
        <div className="flex gap-3 w-full  mt-5 flex-col items-center sm:flex-row">
          <ViewNumInfo
            numInfo={cityCount as number}
            textInfo="Cidades Cadastradas"
          />
          <ViewNumInfo
            numInfo={peopleCount as number}
            textInfo="Pessoas Cadastradas"
          />
        </div>
      )}
    </div>
  );
};
