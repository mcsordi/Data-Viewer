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
import { TCity } from '../../../shared/types/Cities';
import { cityRequests } from '../../../api/CityRequests/request';

export const NewPersonCadaster: React.FC<IconsEditPage> = ({ editIcons }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState<TCity>();

  useEffect(() => {
    try {
      const getCities = async () => {
        const wholeCities = await cityRequests.getAllOfTheCities();
        setCity(wholeCities);
      };
      getCities();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="w-full h-screen dark:text-white">
      <HeaderPage text="Novo Cadastro" />
      <ContainerGeneric>
        {editIcons.map((icon, index) => {
          return (
            <EditComponent
              key={index}
              icon={icon.icon}
              theresClass={icon.theresClass}
              itsButton={icon.itsButton}
              textClass={icon.textClass}
              textIcon={icon.textIcon}
              whereToNav={
                icon.textIcon == 'Voltar' || icon.textIcon == 'Pesquisar'
                  ? '/pessoas'
                  : ''
              }
            />
          );
        })}
      </ContainerGeneric>
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
              cities={city as TCity}
              id="city"
              label="Cidades"
              name="city"
              FirstValue="Selecionar"
            ></SelectField>
            <SubmitButton text="Enviar" />
          </Form>
        </Formik>
      </FormContainer>
    </div>
  );
};
