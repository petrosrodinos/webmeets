import * as yup from 'yup';

export const MeetSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  images: yup.array().of(yup.mixed()).optional(),
  type: yup.string().required(),
  duration: yup.number().required(),
  maxParticipants: yup.number().required(),
  price: yup.number(),
  phone: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  area: yup.string().optional(),
  postalCode: yup.string().optional(),
});
