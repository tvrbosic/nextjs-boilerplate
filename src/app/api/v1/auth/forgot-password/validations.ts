import { z } from 'zod';

export const forgotPasswordValidationSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});
