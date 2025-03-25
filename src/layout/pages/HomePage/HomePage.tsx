import React, { useEffect, useState } from 'react';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { peopleRequests } from '../../../api/PeopleRequests/requests';
import { ViewNumInfo } from '../../../shared/components/ViewNumInfo/ViewNumInfo';
import { FaSearch } from 'react-icons/fa';
import { IoPeopleSharp } from 'react-icons/io5';
import { PiBuildingApartmentFill } from 'react-icons/pi';
import { Skeleton } from '../../../shared/components/Skeleton/Skeleton';
import { cityRequests } from '../../../api/CityRequests/request';
import { TCity } from '../../../shared/types/Cities';
import { TPeopleData } from '../../../shared/types/PeopleData';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { RxDividerVertical } from 'react-icons/rx';

export const HomePage: React.FC = () => {
  const [peopleCount, setPeopleCount] = useState<TPeopleData>();
  const [onClick, setOnClick] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cityCount, setCityCount] = useState<TCity>();
  const [errorCities, setErrorCities] = useState<string>();
  const [errorPeople, setErrorPeople] = useState<string>();

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      const fetch = await cityRequests.getAllOfTheCities();
      if (typeof fetch == 'object') {
        setCityCount(fetch);
      } else {
        setErrorCities(fetch);
      }
      setLoading(false);
    };
    const fetchPeople = async () => {
      setLoading(true);
      const fetch = await peopleRequests.getAllOfThePeople();
      if (typeof fetch == 'object') {
        setPeopleCount(fetch);
      } else {
        setErrorPeople(fetch);
      }
      setLoading(false);
    };

    fetchCities();
    fetchPeople();
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
        <div className="flex gap-3 w-full h-96 mt-5 flex-col xs:flex-row">
          <div className="w-64 h-48  dark:from-neutral-800 dark:to-stone-800 from-gray-100 to-gray-200 from-20% to-100% bg-gradient-to-r rounded-md animate-pulse"></div>
          <div className="w-64 h-48 dark:from-neutral-800 dark:to-stone-800 from-gray-100 to-gray-200 from-20% to-100% bg-gradient-to-l rounded-md animate-pulse"></div>
        </div>
      ) : (
        <div className="flex gap-3 w-full  mt-5 flex-col items-center sm:flex-row">
          <ViewNumInfo
            numInfo={cityCount?.length as number}
            textInfo="Cidades Cadastradas"
          />
          <ViewNumInfo
            numInfo={peopleCount?.length as number}
            textInfo="Pessoas Cadastradas"
          />
        </div>
      )}
    </div>
  );
};
