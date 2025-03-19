import { z } from 'zod';

export const loginValidationSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email address'),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Must contain at least one number.' }),
});
