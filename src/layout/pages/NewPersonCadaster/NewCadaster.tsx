import React, { useEffect, useState } from 'react';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { IconsEditPage } from '../../../shared/types/IconsEditPage';
import { Form, Formik } from 'formik';
import { Input } from '../../../shared/components/Input/Input';
import { peopleRequests } from '../../../api/PeopleRequests/requests';
import { validationSchema } from './SchemaValidation';
import { HeaderPage } from '../../../shared/components/HeaderPage/HeaderPage';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import { SubmitButton } from '../../../shared/components/SubmitButton/SubmitButton';
import constants from '../../../shared/facilities';
import { useNavigate } from 'react-router-dom';
import { SelectField } from '../../../shared/components/SelectField/SelectField';
import { cityRequests } from '../../../api/CityRequests/request';
import { TCity } from '../../../shared/types/Cities';
import { Skeleton } from '../../../shared/components/Skeleton/Skeleton';

export const NewPersonCadaster: React.FC<IconsEditPage> = ({ editIcons }) => {
  const [citiesData, setCitiesData] = useState<TCity>();
  const [citiesError, setCitiesError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllCities = async () => {
      setLoading(true);
      const fetch = await cityRequests.getAllOfTheCities();
      if (typeof fetch == 'object') {
        setCitiesData(fetch);
      } else {
        setCitiesError(fetch);
      }
      setLoading(false);
    };
    getAllCities();
  }, []);

  return (
    <div className="w-full h-screen dark:text-white px-0.5 xs:px-0">
      <HeaderPage text="Cadastrar Pessoa" />
      <ContainerGeneric>
        {loading ? (
          <Skeleton />
        ) : (
          editIcons.map((icon, index) => {
            {
              return icon.textIcon == 'Cadastrar Pessoa' ? (
                ''
              ) : (
                <EditComponent
                  key={index}
                  icon={icon.icon}
                  theresClass={icon.theresClass}
                  itsButton={icon.itsButton}
                  textClass={icon.textClass}
                  textIcon={icon.textIcon}
                  whereToNav={
                    (icon.textIcon == 'Voltar' && '/pessoas') || icon.whereToNav
                  }
                />
              );
            }
          })
        )}
      </ContainerGeneric>
      {citiesError && (
        <div className="mt-5 text-xl">Ocorreu um erro inesperado</div>
      )}
      {!loading && !citiesError && (
        <FormContainer>
          <Formik
            initialValues={{ name: '', email: '', city: 'Selecionar' }}
            validationSchema={validationSchema}
            onSubmit={async ({ name, email, city }, { resetForm }) => {
              await peopleRequests.postNewUser(name, email, city);
              navigate(`/editar/${name}`);
              resetForm({ values: { name: '', city: '', email: '' } });
            }}
          >
            <Form>
              <Input
                name="name"
                id="name"
                label="Nome"
                placeholder={constants.NOME_EXEMPLO}
                type="text"
              />
              <Input
                name="email"
                id="email"
                label="Email"
                placeholder={constants.EMAIL_EXEMPLO}
                type="email"
              />
              <SelectField
                data={citiesData as TCity}
                id="city"
                label="Cidades"
                name="city"
                FirstValue="Selecionar"
              ></SelectField>
              <SubmitButton text="Enviar" />
            </Form>
          </Formik>
        </FormContainer>
      )}
    </div>
  );
};
