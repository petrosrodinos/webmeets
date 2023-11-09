import * as yup from 'yup';

export const ProfileSchema = yup.object().shape({
  bio: yup.string(),
  country: yup.string(),
  certificates: yup.array().of(yup.mixed().optional()),
  isOnline: yup.boolean(),
  avatar: yup.mixed().optional(),
  banner: yup.mixed().optional(),
  phone: yup.number().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  area: yup.string().optional(),
  postalCode: yup.number().optional(),
});
