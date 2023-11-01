import * as yup from 'yup';

export const ProfileSchema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup.string().required(),
  avatar: yup.mixed(),
  banner: yup.mixed(),
  bio: yup.string(),
  country: yup.string(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  area: yup.string().optional(),
});
