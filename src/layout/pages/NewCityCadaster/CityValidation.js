import * as yup from 'yup';
export const cityValidation = yup.object().shape({
  city: yup
    .string()
    .min(4, 'Cidade precisa ter ao menos 4 caracteres')
    .required('Campo requerido')
    .matches(
      /^[A-Z][a-z A-z à-ÿ]*$/,
      'Cidade precisa ter a primeira letra maiuscula e formado apenas por letras',
    ),
  state: yup
    .string()
    .min(2, 'Estado precisa ter 2 caracteres')
    .max(2, 'Estado precisa ter 2 caracteres')
    .required('Campo requerido')
    .matches(/^[A-Z]+$/, 'Estado só é valido com letras maiúsculas'),
});
