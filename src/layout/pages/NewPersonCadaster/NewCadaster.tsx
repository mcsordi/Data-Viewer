import React from 'react';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { IconsEditPage } from '../../../shared/types/IconsEditPage';
import { Form, Formik } from 'formik';
import { Input } from '../../../shared/components/Input/Input';
import { apiRequests } from '../../../api/Requests/requests';
import { validationSchema } from './SchemaValidation';

export const NewPersonCadaster: React.FC<IconsEditPage> = ({ editIcons }) => {
  return (
    <div className="w-full h-screen dark:text-white">
      <h1>Novo Cadastro</h1>
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
      <div className="w-full flex flex-col pt-5 gap- items-start">
        <Formik
          initialValues={{ name: '', email: '', city: '' }}
          validationSchema={validationSchema}
          onSubmit={({ name, email, city }, { resetForm }) => {
            apiRequests.postNewUser(name, email, city);
            resetForm({ values: { name: '', city: '', email: '' } });
          }}
        >
          <Form>
            <Input
              name="name"
              id="name"
              label="Nome"
              placeholder="Ermelino Matarazo"
              type="text"
            />
            <Input
              name="email"
              id="email"
              label="Email"
              placeholder="ermelino@gmail.com"
              type="email"
            />
            <Input
              name="city"
              id="city"
              label="Cidade"
              placeholder="Mamborê"
              type="text"
            />
            <button
              type="submit"
              className="w-96 disabled:bg-amber-700 border px-2 py-2 mt-2 rounded-md cursor-pointer
               bg-slate-600 dark:bg-amber-300 text-white dark:text-black font-bold
            hover:bg-neutral-800 dark:hover:bg-white"
            >
              Enviar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
