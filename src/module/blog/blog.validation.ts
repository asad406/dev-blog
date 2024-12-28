import { z } from 'zod';

const blogValidationSchema = z.object({
  title: z.string({
    required_error: 'Title must be provided and must be a string',
  }),
  content: z.string({
    required_error: 'Content must be provided and must be a string',
  }),
});
const updateBlogValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title must be provided and must be a string',
    })
    .optional(),
  content: z
    .string({
      required_error: 'Content must be provided and must be a string',
    })
    .optional(),
});

export const blogValidation = {
  blogValidationSchema,
  updateBlogValidationSchema,
};
