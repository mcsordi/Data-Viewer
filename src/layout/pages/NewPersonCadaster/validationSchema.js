import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .required('Campo requerido'),
  email: yup
    .string()
    .email('Email precisa ser valido')
    .required('Campo requerido'),
  city: yup.string().required().notOneOf(['Selecionar'], 'Campo Requerido'),
});
