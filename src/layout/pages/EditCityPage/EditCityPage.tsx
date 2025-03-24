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

export const EditCityPage: React.FC<IconsEditPage> = ({ editIcons }) => {
  const cityParams = useParams().cidade;
  const navigation = useNavigate();
  const [city, setCity] = useState<TCity>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  useEffect(() => {
    const getCityUsingName = async () => {
      setLoading(true);
      const dataCity = await cityRequests.getCityByName(cityParams as string);
      if (typeof dataCity == 'object') {
        setCity(dataCity);
      } else {
        setError(dataCity);
      }
      setLoading(false);
    };
    getCityUsingName();
  }, [cityParams]);
  return (
    <div className="w-full h-screen dark:text-white">
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
                  icon.textIcon == 'Pesquisar' || icon.textIcon == 'Voltar'
                    ? '/cidades'
                    : ''
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
                  await cityRequests.updateCity(id, city, state);
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
                  <SubmitButton text="Editar" />
                </Form>
              </Formik>
            </div>
          );
        })
      )}
    </div>
  );
};
