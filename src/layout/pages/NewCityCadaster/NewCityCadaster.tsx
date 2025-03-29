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
    <div className="w-full h-screen dark:text-white px-0.5 xs:px-0">
      <HeaderPage text="Cadastrar Cidade" />
      <ContainerGeneric>
        {editIcons.map((icon, index) => {
          {
            return icon.textIcon == 'Cadastrar Cidade' ? (
              ''
            ) : (
              <EditComponent
                key={index}
                icon={icon.icon}
                itsButton={icon.itsButton}
                textIcon={icon.textIcon}
                textClass={icon.textClass}
                theresClass={icon.theresClass}
                whereToNav={
                  (icon.textIcon == 'Voltar' && '/cidades') || icon.whereToNav
                }
              />
            );
          }
        })}
      </ContainerGeneric>
      <div className="pt-5">
        <Formik
          initialValues={{ city: '', state: '', userId: 2 }}
          validationSchema={cityValidation}
          onSubmit={async ({ city, state, userId }, { resetForm }) => {
            resetForm({ values: { city: '', state: '', userId: 0 } });
            await cityRequests.postNewCity(city, state, userId);
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
