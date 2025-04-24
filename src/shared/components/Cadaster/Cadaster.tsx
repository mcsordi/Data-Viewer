import { Form, Formik } from 'formik';
import { InputLogin } from '../../../shared/components/InputLogin/InputLogin';
import { LoginButton } from '../../../shared/components/LoginButton/LoginButton';
import { ValidLink } from '../../../shared/components/ValidLink/ValidLink';
import { userRequest } from '../../../api/UserRequests/request';
import { validationSchema } from './validationSchema';
import { useNavigate } from 'react-router-dom';
export const Cadaster: React.FC = () => {
  const navigation = useNavigate();
  return (
    <section className="w-full h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col w-sm py-6  shadow-neutral-400 shadow-2xl rounded-md items-center justify-center bg-gray-100">
        <Formik
          initialValues={{ name: '', email: '', pass: '' }}
          onSubmit={async ({ name, email, pass }) => {
            await userRequest.postUserData(name, email, pass);
            navigation('/');
          }}
          validationSchema={validationSchema}
        >
          <Form className="flex flex-col w-full px-6 py-3">
            <InputLogin
              id="name"
              labelText="Nome"
              name="name"
              typeInput="text"
            />
            <InputLogin
              id="email"
              labelText="Email"
              name="email"
              typeInput="email"
            />
            <InputLogin
              id="pass"
              labelText="Senha"
              name="pass"
              typeInput="text"
            />
            <LoginButton btnText="Cadastrar" loading={false} />
            <ValidLink begin="Já" textLink="Entrar" whereTo="/" />
          </Form>
        </Formik>
      </div>
    </section>
  );
};
