import { z } from 'zod';
import { Role } from '../../utils/types';

export const CreateUserSchema = z.object({
  first_name: z
    .string({ message: 'First name is required' })
    .min(2, { message: 'Your first name should be greater than 3 characters' })
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), {
      message: 'First name can only contain letters and spaces',
    }),
  last_name: z
    .string({ message: 'Last name is required' })
    .min(2, { message: 'Your first name should be greater than 3 characters' })
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), {
      message: 'First name can only contain letters and spaces',
    }),
  email: z
    .string({ message: 'An email is required' })
    .email({ message: 'Enter a valid email' }),
  password: z
    .string({ message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&]/, {
      message: 'Password must contain at least one special character (@$!%*?&)',
    }),
  image: z.string().optional(),
  verified: z.boolean().default(false),
  role: z.enum([Role.ADMIN, Role.USER], {
    message: `Role must be one of ${Role.ADMIN} or ${Role.USER}`,
  }),
});

// z.infer generates type based on CreateUserSchema
export type CreateUserType = z.infer<typeof CreateUserSchema>;

export const LoginSchema = z.object({
  email: z
    .string({ message: 'An email is required' })
    .email({ message: 'Enter a valid email' }),
  password: z
    .string({ message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&]/, {
      message: 'Password must contain at least one special character (@$!%*?&)',
    }),
});

// z.infer generates type based on LoginSchema
export type LoginType = z.infer<typeof LoginSchema>;
