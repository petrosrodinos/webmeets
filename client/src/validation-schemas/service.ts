import * as yup from 'yup';

export const ServiceSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  banner: yup.mixed(),
  certificates: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string(),
        file: yup.mixed(), // Adjust the type accordingly
      }),
    )
    .optional(),
  category: yup.string(),
});
