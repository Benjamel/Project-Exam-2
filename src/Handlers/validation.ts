import * as yup from 'yup';

export const registerValidationSchema = yup
  .object({
    email: yup
      .string()
      .email()
      .matches(/[\w\-.]+@stud.noroff.no$/, 'Must be a (stud.noroff.no) email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Your password must be atleast 8 characters.')
      .required('Password is required'),
    name: yup.string().required('Name is required'),
  })
  .required();

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email()
    .matches(/[\w\-.]+@stud.noroff.no$/, 'Must be a (stud.noroff.no) email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});
