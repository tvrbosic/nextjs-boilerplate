// LIB
import { z } from 'zod';

// TYPES
import { Role } from '@prisma/client';

export const postUserValidationSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
    .regex(/[0-9]/, 'Must contain at least one number'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.nativeEnum(Role),
});

export const patchUserValidationSchema = z.object({
  guid: z.string().uuid('Invalid GUID provided.'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export const putUserValidationSchema = z.object({
  guid: z.string().uuid('Invalid GUID provided.'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.nativeEnum(Role),
});

export const updatePasswordValidationSchema = z.object({
  guid: z.string().uuid('Invalid GUID provided.'),
  newPassword: z
    .string()
    .min(8, 'Must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
    .regex(/[0-9]/, 'Must contain at least one number'),
  oldPassword: z
    .string()
    .min(8, 'Must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
    .regex(/[0-9]/, 'Must contain at least one number'),
});

export const deleteUserValidationSchema = z.object({
  guid: z.string().uuid('Invalid GUID provided.'),
});
