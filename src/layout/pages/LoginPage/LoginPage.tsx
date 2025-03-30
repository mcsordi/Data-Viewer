import { Form, Formik } from 'formik';
import { InputLogin } from '../../../shared/components/InputLogin/InputLogin';
import { validationSchema } from './validationSchema';
import { useContext, useMemo, useState } from 'react';
import { LoginButton } from '../../../shared/components/LoginButton/LoginButton';
import { ValidLink } from '../../../shared/components/ValidLink/ValidLink';
import { authContext } from '../../../contexts/AuthContext/context';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deniedUser, setDeniedUser] = useState<boolean>();
  const { login, isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();
  const authenticated = useMemo(() => {
    isAuthenticated && navigate('/pagina-inicial');
  }, [isAuthenticated, navigate]);
  authenticated;
  return (
    <section className="items-center justify-center w-full h-screen flex">
      <div className="flex flex-col w-sm py-6  shadow-neutral-400 shadow-2xl rounded-md items-center justify-center bg-gray-100">
        <Formik
          initialValues={{ email: '', pass: '' }}
          onSubmit={async ({ email, pass }) => {
            setLoading(true);
            const loginResponse = await login(email, pass);
            if (loginResponse == 'Failed to fetch') {
              setError('Failed to fetch');
            }
            loginResponse == 'Erro ao validar token'
              ? setDeniedUser(true)
              : setDeniedUser(false);

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
          className={`${deniedUser ? 'flex' : 'hidden'} mt-0 w-full px-6 text-sm font-bold text-red-600`}
        >
          {deniedUser && 'Email ou senha estão incorretos'}
        </div>
        <div
          className={`${error ? 'flex' : 'hidden'} mt-0 w-full px-6 text-sm font-bold text-red-600`}
        >
          {error && 'Erro ao entrar na página'}
          {!isAuthenticated && 'Email ou senha estão incorretos'}
        </div>
      </div>
    </section>
  );
};
