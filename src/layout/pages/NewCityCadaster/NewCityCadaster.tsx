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
import { useEffect, useState } from 'react';
import { userRequest } from '../../../api/UserRequests/request';
import { IssueMessage } from '../../../shared/components/IssueMessage/IssueMessage';

export const NewCityCadaster: React.FC<IconsEditPage> = ({ editIcons }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [id, setId] = useState<number>();
  const email = localStorage.getItem('ACCESS_APPLICATION_EMAIL');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUserId = async () => {
      setLoading(true);
      const userId = await userRequest.getUserByEmail(email as string);
      if (userId instanceof Error) {
        setError(userId.message);
      } else {
        setId(userId);
      }
      setLoading(false);
    };
    getUserId();
  }, [email]);
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
          initialValues={{ city: '', state: '' }}
          validationSchema={cityValidation}
          onSubmit={async ({ city, state }, { resetForm }) => {
            resetForm({ values: { city: '', state: '' } });
            await cityRequests.postNewCity(city, state, id);
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
            <SubmitButton loading={loading} text="Enviar" />
          </Form>
        </Formik>
      </div>
      {error && <IssueMessage message="Ocorreu um erro inesperado" />}
    </div>
  );
};
