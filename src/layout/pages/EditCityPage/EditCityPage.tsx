/* eslint-disable react/prop-types */
import { Form, Formik } from 'formik';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { HeaderPage } from '../../../shared/components/HeaderPage/HeaderPage';
import { IconsEditPage } from '../../../shared/types/IconsEditPage';
import { Input } from '../../../shared/components/Input/Input';
import { SubmitButton } from '../../../shared/components/SubmitButton/SubmitButton';
import { cityValidation } from '../NewCityCadaster/CityValidation';
import { useEffect, useState } from 'react';
import { cityRequests } from '../../../api/CityRequests/request';
import { useNavigate, useParams } from 'react-router-dom';
import { TCity } from '../../../shared/types/Cities';
import { Skeleton } from '../../../shared/components/Skeleton/Skeleton';
import { userRequest } from '../../../api/UserRequests/request';

export const EditCityPage: React.FC<IconsEditPage> = ({ editIcons }) => {
  const cityParams = useParams().cidade;
  const navigation = useNavigate();
  const [city, setCity] = useState<TCity>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [userID, setUserID] = useState({} as number);
  useEffect(() => {
    const getCityUsingName = async () => {
      setLoading(true);
      const dataCity = await cityRequests.getCityByName(
        cityParams as string,
        userID,
      );
      if (dataCity instanceof Error) {
        setError(dataCity.message);
      } else {
        setCity(dataCity);
      }
      setLoading(false);
    };
    getCityUsingName();
  }, [cityParams, userID]);
  useEffect(() => {
    const getUserById = async () => {
      setLoading(true);
      const userEmail = localStorage.getItem('ACCESS_APPLICATION_EMAIL');
      const userId = await userRequest.getUserByEmail(userEmail as string);
      if (userId instanceof Error) {
        setError(userId.message);
      } else {
        setUserID(userId);
      }
      setLoading(false);
    };
    getUserById();
  }, []);
  return (
    <div className="w-full h-screen dark:text-white px-0.5 xs:px-0">
      <HeaderPage text={cityParams as string} />
      <ContainerGeneric>
        {loading ? (
          <Skeleton />
        ) : (
          editIcons.map((icon, index) => {
            return (
              <EditComponent
                key={index}
                icon={icon.icon}
                itsButton={icon.itsButton}
                textIcon={icon.textIcon}
                textClass={icon.textClass}
                theresClass={icon.theresClass}
                whereToNav={
                  (icon.textIcon == 'Voltar' && '/cidades') || icon.whereToNav
                }
              />
            );
          })
        )}
      </ContainerGeneric>
      {error ? (
        <div className="mt-5 text-xl">Ocorreu um erro inesperado</div>
      ) : (
        city?.map(({ id, nome, estado }) => {
          return (
            <div className="pt-5" key={id}>
              <Formik
                initialValues={{ city: nome, state: estado }}
                onSubmit={async ({ city, state }) => {
                  await cityRequests.updateCity(id, city, state, userID);
                  navigation(`/editar/cidade/${city}`);
                }}
                validationSchema={cityValidation}
              >
                <Form>
                  <Input
                    label="Cidade"
                    placeholder="Campos do Jordão"
                    id="city"
                    name="city"
                    type="text"
                  />
                  <Input
                    label="Estado"
                    placeholder="SP"
                    id="state"
                    name="state"
                    type="text"
                  />
                  <SubmitButton loading={loading} text="Editar" />
                </Form>
              </Formik>
            </div>
          );
        })
      )}
    </div>
  );
};
