import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const SignupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  birthDate: yup.date().required(),
  phone: yup.string().required(),
  avatar: yup.mixed(),
  isBusiness: yup.boolean().required(),
});

export const EditUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  birthDate: yup.string().required(),
  phone: yup.string().required(),
  avatar: yup.mixed(),
  password: yup.string().optional(),
  isBusiness: yup.boolean().optional(),
});
