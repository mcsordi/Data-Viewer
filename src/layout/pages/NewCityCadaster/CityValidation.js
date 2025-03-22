import * as yup from 'yup';
export const cityValidation = yup.object().shape({
  city: yup
    .string()
    .min(4, 'Campo nome precisa ter ao menos 4 caracteres')
    .required('Campo requerido')
    .matches(
      /^[A-Z][a-z A-z à-ÿ]*$/,
      'Campo precisa ter a primeira letra maiuscula e formado apenas por letras',
    ),
  state: yup
    .string()
    .min(2, 'Campo estado precisa ter 2 caracteres')
    .max(2, 'Campo estado precisa ter 2 caracteres')
    .required('Campo requerido')
    .matches(/^[A-Z]+$/, 'Este campo só é valido com letras maiúsculas'),
});
