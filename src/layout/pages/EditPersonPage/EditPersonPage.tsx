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
import { validationSchema } from '../NewPersonCadaster/SchemaValidation';
import { peopleRequests } from '../../../api/PeopleRequests/requests';
import { TPeopleData } from '../../../shared/types/PeopleData';
import { SelectField } from '../../../shared/components/SelectField/SelectField';
import { TCity } from '../../../shared/types/Cities';
import { cityRequests } from '../../../api/CityRequests/request';
import { Skeleton } from '../../../shared/components/Skeleton/Skeleton';

export const EditPersonPage: React.FC<IconsEditPage> = ({ editIcons }) => {
  const navigate = useNavigate();
  const { nome } = useParams();
  const [personData, setPersonData] = useState<TPeopleData>();
  const [cityData, setCityData] = useState<TCity>();
  const [personError, setPersonError] = useState<string>();
  const [cityError, setCityError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    const getPersonByName = async () => {
      setLoading(true);
      const person = await peopleRequests.getByName(nome || '');
      if (typeof person == 'object') {
        setPersonData(person);
      } else {
        setPersonError(person);
      }
      setLoading(false);
    };
    getPersonByName();
  }, [nome]);

  useEffect(() => {
    const getCities = async () => {
      setLoading(true);

      const fetch = await cityRequests.getAllOfTheCities();
      if (typeof fetch == 'object') {
        setCityData(fetch);
      } else {
        setCityError(fetch);
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
          {personData?.map(({ nome, email, cidade, id }) => {
            return (
              <Formik
                key={id}
                initialValues={{ name: nome, email: email, city: cidade }}
                onSubmit={async ({ name, email, city }) => {
                  return (
                    await peopleRequests.updateByID(id, name, email, city),
                    navigate(`/editar/${name}`)
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
                    data={cityData as TCity}
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
