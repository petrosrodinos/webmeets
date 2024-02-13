import * as yup from 'yup';

export const ClosingPeriodSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().optional(),
  from: yup.string().required(),
  to: yup.string().required(),
});

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
  closingPeriods: yup.array().of(ClosingPeriodSchema).optional(),
  hours: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      day: yup.string().required(),
      periods: yup.array().of(
        yup.object().shape({
          id: yup.string().required(),
          from: yup.string().required(),
          to: yup.string().required(),
        }),
      ),
    }),
  ),
});
