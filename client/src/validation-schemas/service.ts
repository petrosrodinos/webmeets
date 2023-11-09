import * as yup from 'yup';

export const ServiceSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  banner: yup.mixed(),
  certificate: yup.string(),
  categories: yup.array().of(yup.string()),
});
