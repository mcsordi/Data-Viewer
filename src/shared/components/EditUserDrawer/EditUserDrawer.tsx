import React, { useContext, useEffect, useState } from 'react';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { Form, Formik } from 'formik';
import { InputLogin } from '../InputLogin/InputLogin';
import { validationSchema } from './validationSchema';
import { TUser, userRequest } from '../../../api/UserRequests/request';
import { CgSpinnerAlt } from 'react-icons/cg';
import { userDrawer } from '../../../contexts/EditUserDrawer/context';

export const EditUserDrawer: React.FC = () => {
  const [error, setError] = useState<string>();
  const [userData, setUserData] = useState<TUser>();
  const [loading, setLoading] = useState(false);
  const { handleOpenClick } = useContext(userDrawer);
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const userEmail = localStorage.getItem('ACCESS_APPLICATION_EMAIL');
      const res = await userRequest.getUserByEmailDataResponse(
        userEmail as string,
      );
      if (res instanceof Error) {
        setError(res.message);
      } else {
        setUserData(res);
      }
      setLoading(false);
    };
    getUserData();
  }, []);
  return (
    <div
      className={`dark:bg-zinc-800 bg-white relative  lg:flex lg:flex-col lg:visible
    w-3/4 xs:w-2/4 sm:w-xs h-screen border border-slate-400`}
    >
      <div
        className={`dark:bg-neutral-800 bg-white border-l-0 border-t-0 border border-r-0
                 border-slate-400 py-3  flex flex-col items-center justify-center gap-2`}
      >
        <ProfileImage />
      </div>
      {userData?.map((el) => {
        return (
          <Formik
            key={el.id}
            initialValues={{ name: el.nome, email: el.email, pass: el.senha }}
            onSubmit={async ({ name, email, pass }, { resetForm }) => {
              setLoading(true);
              const res = await userRequest.updateImageUser(
                name,
                email,
                pass,
                Number(el.id),
                el.imagem,
              );
              if (res instanceof Error) {
                setError(res.message);
                setLoading(false);
              }
              localStorage.setItem('ACCESS_APPLICATION_EMAIL', email);
              setLoading(false);
              resetForm({ values: { name: '', email: '', pass: '' } }),
                handleOpenClick();
            }}
            validationSchema={validationSchema}
          >
            <Form className="w-full px-2 py-4">
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
                typeInput="password"
              />
              <button
                type="submit"
                className="cursor-pointer w-full border border-white bg-zinc-600 text-white py-2 mt-5 rounded-md text-lg font-semibold flex items-center justify-center"
              >
                {loading ? (
                  <CgSpinnerAlt className="text-2xl text-white my-0.5 animate-spin" />
                ) : (
                  'Editar'
                )}
              </button>
            </Form>
          </Formik>
        );
      })}
      <button
        className="bg-slate-500 p-2 mx-2 mt-5 cursor-pointer text-white font-semibold text-xl rounded-md border border-white"
        onClick={handleOpenClick}
      >
        Fechar
      </button>
      {loading && !userData && (
        <div className="w-full text-xl pt-5 flex items-center justify-center">
          carregando<div className="animate-pulse">...</div>
        </div>
      )}
      {error && !loading && !userData && (
        <div className="text-red-600 text-sm font-semibold text-center pt-5">
          Ocorreu um erro inesperado
        </div>
      )}
    </div>
  );
};
