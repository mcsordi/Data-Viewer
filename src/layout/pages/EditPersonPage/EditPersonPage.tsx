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

export const EditPersonPage: React.FC<IconsEditPage> = ({ editIcons }) => {
  const navigate = useNavigate();
  const { nome } = useParams();
  const [personData, setPersonData] = useState<TPeopleData>();
  const [cities, setCities] = useState<TCity>();
  useEffect(() => {
    const getPersonByName = async () => {
      const person: TPeopleData = await peopleRequests.getByName(nome || '');
      setPersonData(person);
    };
    getPersonByName();
  }, [nome]);

  useEffect(() => {
    const allCities = async () => {
      try {
        const wholeCities = await cityRequests.getAllOfTheCities();
        setCities(wholeCities);
      } catch (error) {
        console.log(error);
      }
    };
    allCities();
  }, []);

  return (
    <div className="w-full h-screen dark:text-white">
      <HeaderPage text={nome || ''} />
      <ContainerGeneric>
        {editIcons.map((icon, index) => (
          <EditComponent
            icon={icon.icon}
            itsButton={icon.itsButton}
            textIcon={icon.textIcon}
            key={index}
            whereToNav={
              icon.textIcon == 'Pesquisar' || icon.textIcon == 'Voltar'
                ? '/pessoas'
                : ''
            }
          />
        ))}
      </ContainerGeneric>
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
                  cities={cities as TCity}
                />
                <SubmitButton text="Editar" />
              </Form>
            </Formik>
          );
        })}
      </FormContainer>
    </div>
  );
};
