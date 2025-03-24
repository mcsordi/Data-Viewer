import React, { useEffect, useState } from 'react';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { peopleRequests } from '../../../api/PeopleRequests/requests';
import { ViewNumInfo } from '../../../shared/components/ViewNumInfo/ViewNumInfo';
import { FaSearch } from 'react-icons/fa';
import { IoPeopleSharp } from 'react-icons/io5';
import { PiBuildingApartmentFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { Skeleton } from '../../../shared/components/Skeleton/Skeleton';
import { cityRequests } from '../../../api/CityRequests/request';
import { TCity } from '../../../shared/types/Cities';
import { TPeopleData } from '../../../shared/types/PeopleData';

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
    <div className="w-full h-full dark:text-white">
      <ContainerGeneric>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <div
              className={`${onClick ? 'dark:border-amber-300 border-slate-800  border-2 px-2.5  border-l-0 border-b-0 border-t-0' : 'border-0 px-0'} flex gap-3 transition-all`}
            >
              <div
                className="flex items-center border px-2 py-1 gap-3 rounded-md cursor-pointer"
                onClick={() => setOnClick((prev) => !prev)}
              >
                <FaSearch className="text-xl" />{' '}
                <p className="text-lg">Pesquisar</p>
              </div>
              {onClick && (
                <div className="flex gap-3">
                  <Link
                    to="/pessoas"
                    className="flex items-center border px-2 py-1 gap-3 rounded-md "
                  >
                    <IoPeopleSharp className="text-xl" />
                    <p className="text-lg">Pessoa</p>
                  </Link>
                  <Link
                    to="/cidades"
                    className="flex items-center border px-2 py-1 gap-3 rounded-md "
                  >
                    <PiBuildingApartmentFill className="text-xl" />
                    <p className="text-lg">Cidade</p>
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/nova-pessoa"
              className="flex items-center border px-2 py-1 gap-3 rounded-md "
            >
              <IoPeopleSharp className="text-xl" />
              <p className="text-lg">Nova Pessoa</p>
            </Link>
            <Link
              className="flex items-center border px-2 py-1 gap-3 rounded-md "
              to={'/nova-cidade'}
            >
              <PiBuildingApartmentFill className="text-xl" />
              <p className="text-lg">Nova Cidade</p>
            </Link>
          </>
        )}
      </ContainerGeneric>
      {loading ? (
        <div className="flex gap-3 w-full h-96 mt-5 flex-col xs:flex-row">
          <div className="w-64 h-48  dark:from-neutral-800 dark:to-stone-800 from-gray-100 to-gray-200 from-20% to-100% bg-gradient-to-r rounded-md animate-pulse"></div>
          <div className="w-64 h-48 dark:from-neutral-800 dark:to-stone-800 from-gray-100 to-gray-200 from-20% to-100% bg-gradient-to-l rounded-md animate-pulse"></div>
        </div>
      ) : (
        <div className="flex gap-3 w-full h-96 mt-5 flex-col xs:flex-row">
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
