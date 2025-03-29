import { Form, Formik } from 'formik';
import { InputLogin } from '../../../shared/components/InputLogin/InputLogin';
import { validationSchema } from './validationSchema';
import { userRequest } from '../../../api/UserRequests/request';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginButton } from '../../../shared/components/LoginButton/LoginButton';
import { ValidLink } from '../../../shared/components/ValidLink/ValidLink';

export const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <section className="items-center justify-center w-full h-screen flex">
      <div className="flex flex-col w-sm py-6  shadow-neutral-400 shadow-2xl rounded-md items-center justify-center bg-gray-100">
        <Formik
          initialValues={{ email: '', pass: '' }}
          onSubmit={async ({ email, pass }) => {
            setLoading(true);
            const dataUser = await userRequest.getUserByEmail(email, pass);
            if (typeof dataUser == 'object') {
              dataUser.toString() != '' && navigate('/pagina-inicial');
            } else {
              setError(dataUser);
            }
            setLoading(false);
          }}
          validationSchema={validationSchema}
        >
          <Form className="flex flex-col w-full px-6">
            <InputLogin
              id="email"
              label="Email"
              typeInput="email"
              name="email"
            />
            <InputLogin id="pass" label="Senha" typeInput="text" name="pass" />
            <LoginButton loading={loading} btnText="Entrar" />
            <ValidLink
              begin="Não"
              textLink="Criar conta"
              whereTo="/cadastrar"
            />
          </Form>
        </Formik>
        <div
          className={`${error ? 'flex' : 'hidden'} mt-5 w-full px-6 text-sm font-bold text-red-600`}
        >
          {error && 'Ocorreu um erro inesperado'}
        </div>
      </div>
    </section>
  );
};
