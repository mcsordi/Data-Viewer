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

export type TCity = {
  id: number;
  nome: string;
  estado: string;
}[];

export const EditCityPage: React.FC<IconsEditPage> = ({ editIcons }) => {
  const cityParams = useParams().cidade;
  const navigation = useNavigate();
  const [city, setCity] = useState<TCity>();
  useEffect(() => {
    const getCityUsingName = async () => {
      const dataCity = await cityRequests.getCityByName(cityParams as string);
      setCity(dataCity);
    };
    getCityUsingName();
  }, [cityParams]);
  return (
    <div className="w-full h-screen">
      <HeaderPage text={cityParams as string} />
      <ContainerGeneric>
        {editIcons.map((icon, index) => {
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
        })}
      </ContainerGeneric>
      {city?.map(({ id, nome, estado }) => {
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
                  label="State"
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
      })}
    </div>
  );
};
