import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Nome pricisa ter 5 letras')
    .required('Nome é requerido'),
  email: yup
    .string()
    .email('Campo não é do tipo email')
    .required('Email é requerido'),
  pass: yup
    .string()
    .min(5, 'senha pricisa ter ao menos 5 caracteres')
    .required('Senha é requerida'),
});
