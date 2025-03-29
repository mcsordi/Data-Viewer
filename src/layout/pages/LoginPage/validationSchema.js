import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  email: yup.string().email('Email Invalido').required('Campo Requerido'),
  pass: yup
    .string()
    .min('5', 'Senha precisa ter no mínimo 5 carateres')
    .required('Campo Requerido'),
});
