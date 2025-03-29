import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  name: yup.string().required('Nome é requerido'),
  email: yup.string().email('Email invalido').required('Email é requerido'),
  pass: yup
    .string()
    .min(5, 'Senha precisa ter pelo menos 5 caracteres')
    .required('Senha é requerida'),
});
