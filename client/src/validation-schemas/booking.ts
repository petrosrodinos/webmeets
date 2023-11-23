import * as yup from 'yup';

export const BookingSchema = yup.object().shape({
  notes: yup.string(),
  participants: yup.string().required(),
  date: yup.string().required(),
});
