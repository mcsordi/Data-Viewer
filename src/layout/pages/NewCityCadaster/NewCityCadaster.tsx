/* eslint-disable react/prop-types */
import { Form, Formik } from 'formik';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { HeaderPage } from '../../../shared/components/HeaderPage/HeaderPage';
import { IconsEditPage } from '../../../shared/types/IconsEditPage';
import { Input } from '../../../shared/components/Input/Input';
import { SubmitButton } from '../../../shared/components/SubmitButton/SubmitButton';
import { cityValidation } from './CityValidation';
import { cityRequests } from '../../../api/CityRequests/request';
import { useNavigate } from 'react-router-dom';

export const NewCityCadaster: React.FC<IconsEditPage> = ({ editIcons }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen">
      <HeaderPage text="Nova Cidade" />
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
      <div className="pt-5">
        <Formik
          initialValues={{ city: '', state: '' }}
          validationSchema={cityValidation}
          onSubmit={async ({ city, state }, { resetForm }) => {
            resetForm({ values: { city: '', state: '' } });
            await cityRequests.postNewCity(city, state);
            navigate(`/editar/cidade/${city}`);
          }}
        >
          <Form>
            <Input
              id="city"
              label="Cidade"
              name="city"
              placeholder="Campos do Jordão"
              type="text"
            />
            <Input
              id="state"
              label="Estado"
              name="state"
              placeholder="SP"
              type="text"
            />
            <SubmitButton text="Enviar" />
          </Form>
        </Formik>
      </div>
    </div>
  );
};
