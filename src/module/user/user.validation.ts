import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string({
    required_error: 'Name must be provided and must be a string',
  }),
  email: z
    .string({
      required_error: 'Email must be provided and must be a string',
    })
    .email(),
  password: z.string({
    required_error: 'Password must be provided and must be a string',
  }),
});
const updateUserValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name must be provided and must be a string',
    })
    .optional(),
  email: z
    .string({
      required_error: 'Email must be provided and must be a string',
    })
    .email()
    .optional(),
  password: z
    .string({
      required_error: 'Password must be provided and must be a string',
    })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
  updateUserValidationSchema,
};
