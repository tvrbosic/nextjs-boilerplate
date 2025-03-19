import { z } from 'zod';

export const resetPasswordValidationSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
    .regex(/[0-9]/, 'Must contain at least one number.'),
  newPasswordConfirm: z
    .string()
    .min(8, 'Must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
    .regex(/[0-9]/, 'Must contain at least one number.'),
});
