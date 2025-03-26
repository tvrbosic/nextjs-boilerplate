import { z } from 'zod';

export const registerValidationSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
      .regex(/[0-9]/, 'Must contain at least one number'),
    passwordConfirm: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
      .regex(/[0-9]/, 'Must contain at least one number'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['newPasswordConfirm'],
  });

export const loginValidationSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
    .regex(/[0-9]/, 'Must contain at least one number'),
});

export const resetPasswordValidationSchema = z
  .object({
    resetToken: z.string().min(64, 'Invalid reset token provided'),
    newPassword: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
      .regex(/[0-9]/, 'Must contain at least one number'),
    newPasswordConfirm: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
      .regex(/[0-9]/, 'Must contain at least one number'),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'Passwords do not match',
    path: ['newPasswordConfirm'],
  });

export const forgotPasswordValidationSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});
