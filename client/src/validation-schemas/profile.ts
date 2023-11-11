import * as yup from 'yup';

export const ProfileSchema = yup.object().shape({
  country: yup.string().required(),
  categories: yup.array().of(yup.string()).required(),
  bio: yup.string().required(),
  isOnline: yup.boolean().default(false),
  avatar: yup.mixed().optional(),
  banner: yup.mixed().optional(),
  phone: yup.number().optional(),
  email: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  area: yup.string().optional(),
  postalCode: yup.number().optional(),
});
