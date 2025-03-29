import React, { useEffect, useState } from 'react';
import { IconsEditPage } from '../../../shared/types/IconsEditPage';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { HeaderPage } from '../../../shared/components/HeaderPage/HeaderPage';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Input } from '../../../shared/components/Input/Input';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import constants from '../../../shared/facilities';
import { SubmitButton } from '../../../shared/components/SubmitButton/SubmitButton';
import { validationSchema } from '../NewPersonCadaster/validationSchema';
import {
  peopleRequests,
  TPeopleData,
} from '../../../api/PeopleRequests/requests';
import { SelectField } from '../../../shared/components/SelectField/SelectField';
import {
  cityRequests,
  TCitiesRequest,
} from '../../../api/CityRequests/request';
import { Skeleton } from '../../../shared/components/Skeleton/Skeleton';

export const EditPersonPage: React.FC<IconsEditPage> = ({ editIcons }) => {
  const navigate = useNavigate();
  const { nome } = useParams();
  const [personData, setPersonData] = useState<TPeopleData>();
  const [cityData, setCityData] = useState<TCitiesRequest>();
  const [personError, setPersonError] = useState<string>();
  const [cityError, setCityError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    const getPersonByName = async () => {
      setLoading(true);
      const person = await peopleRequests.getByName(nome || '');
      if (person instanceof Error) {
        setPersonError(person.message);
      } else {
        setPersonData(person.data);
      }
      setLoading(false);
    };
    getPersonByName();
  }, [nome]);

  useEffect(() => {
    const getCities = async () => {
      setLoading(true);

      const fetch = await cityRequests.getAllOfTheCities(1);
      if (fetch instanceof Error) {
        setCityError(fetch.message);
      } else {
        setCityData(fetch.data);
      }

      setLoading(false);
    };
    getCities();
  }, []);

  return (
    <div className="w-full h-screen dark:text-white px-0.5 xs:px-0">
      <HeaderPage text={nome || ''} />
      <ContainerGeneric>
        {loading ? (
          <Skeleton />
        ) : (
          editIcons.map((icon, index) => (
            <EditComponent
              icon={icon.icon}
              itsButton={icon.itsButton}
              textIcon={icon.textIcon}
              key={index}
              whereToNav={
                (icon.textIcon == 'Voltar' && '/pessoas') || icon.whereToNav
              }
            />
          ))
        )}
      </ContainerGeneric>
      {personError || cityError ? (
        <div className="mt-5 text-xl">Ocorreu um erro inesperado</div>
      ) : (
        <FormContainer>
          {personData?.map(({ nome, email, cidade, id, userId }) => {
            return (
              <Formik
                key={id}
                initialValues={{
                  name: nome,
                  email: email,
                  city: cidade,
                  userId: 2,
                }}
                onSubmit={async ({ name, email, city }) => {
                  return (
                    await peopleRequests.updateByID(
                      id,
                      name.trim(),
                      email,
                      city,
                      userId,
                    ),
                    navigate(`/editar/${name.trim()}`)
                  );
                }}
                validationSchema={validationSchema}
              >
                <Form>
                  <Input
                    id="name"
                    label="Nome"
                    name="name"
                    placeholder={constants.NOME_EXEMPLO}
                    type="text"
                  />
                  <Input
                    id="email"
                    label="Email"
                    name="email"
                    placeholder={constants.EMAIL_EXEMPLO}
                    type="email"
                  />
                  <SelectField
                    FirstValue="Selecionar"
                    label="Cidades"
                    id="city"
                    name="city"
                    data={cityData as TCitiesRequest}
                  />
                  <SubmitButton text="Editar" />
                </Form>
              </Formik>
            );
          })}
        </FormContainer>
      )}
    </div>
  );
};
