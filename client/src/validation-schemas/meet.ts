import * as yup from 'yup';

export const MeetSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  duration: yup.number(),
  maxParticipants: yup.number(),
  price: yup.number(),
  images: yup.array().of(yup.mixed()).optional(),
  phone: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  area: yup.string().optional(),
  postalCode: yup.string().optional(),
});
