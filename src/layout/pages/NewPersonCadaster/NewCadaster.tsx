import React, { use, useEffect, useState } from 'react';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { IconsEditPage } from '../../../shared/types/IconsEditPage';
import { Form, Formik } from 'formik';
import { Input } from '../../../shared/components/Input/Input';
import { peopleRequests } from '../../../api/PeopleRequests/requests';
import { validationSchema } from './validationSchema';
import { HeaderPage } from '../../../shared/components/HeaderPage/HeaderPage';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import { SubmitButton } from '../../../shared/components/SubmitButton/SubmitButton';
import constants from '../../../shared/facilities';
import { useNavigate } from 'react-router-dom';
import { SelectField } from '../../../shared/components/SelectField/SelectField';
import {
  cityRequests,
  TCitiesRequest,
} from '../../../api/CityRequests/request';
import { Skeleton } from '../../../shared/components/Skeleton/Skeleton';
import { userRequest } from '../../../api/UserRequests/request';

export const NewPersonCadaster: React.FC<IconsEditPage> = ({ editIcons }) => {
  const [citiesData, setCitiesData] = useState<TCitiesRequest>();
  const [citiesError, setCitiesError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState({} as number);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllCities = async () => {
      setLoading(true);
      const fetch = await cityRequests.getAllOfTheCities(id);
      if (fetch instanceof Error) {
        setCitiesError(fetch.message);
      } else {
        setCitiesData(fetch.data);
      }

      setLoading(false);
    };
    getAllCities();
  }, [id]);

  useEffect(() => {
    const getUserId = async () => {
      const emailUser = localStorage.getItem('ACCESS_APPLICATION_EMAIL');
      const userId = await userRequest.getUserByEmail(emailUser as string);
      if (userId instanceof Error) {
        setCitiesError(userId.message);
      } else {
        setId(userId);
      }
    };
    getUserId();
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
            initialValues={{
              name: '',
              email: '',
              city: 'Selecionar',
            }}
            validationSchema={validationSchema}
            onSubmit={async ({ name, email, city }, { resetForm }) => {
              await peopleRequests.postNewUser(name.trim(), email, city, id);
              navigate(`/editar/${name.trim()}`);
              resetForm({
                values: { name: '', city: '', email: '' },
              });
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
                data={citiesData as TCitiesRequest}
                id="city"
                label="Cidades"
                name="city"
                FirstValue="Selecionar"
              ></SelectField>
              <SubmitButton loading={loading} text="Enviar" />
            </Form>
          </Formik>
        </FormContainer>
      )}
    </div>
  );
};
