import { z } from 'zod';

export const registerValidationSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
    .regex(/[0-9]/, 'Must contain at least one number.'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});
