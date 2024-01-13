import * as yup from 'yup';

export const BookingSchema = yup.object().shape({
  notes: yup.string().optional(),
  participants: yup.string().optional(),
  date: yup.string().required(),
});

export const EditBookingProfileSchema = yup.object().shape({
  date: yup.string().required(),
});

export const EditBookingUserSchema = yup.object().shape({
  notes: yup.string().optional(),
  participants: yup.string().required(),
  date: yup.string().required(),
});
