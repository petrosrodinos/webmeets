import * as yup from 'yup';

export const ServiceSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  banner: yup.mixed().optional(),
  certificates: yup.array().of(yup.mixed().optional()),
  categories: yup.array().of(yup.string()),
});
