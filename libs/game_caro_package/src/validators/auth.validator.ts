import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  username: z.string().min(3).max(20, {
    message: 'Username must be between 3 and 20 characters',
  }),
  password: z.string().min(6).max(20, {
    message: 'Password must be between 6 and 20 characters',
  }),
});

export type TRegisterForm = z.infer<typeof registerSchema>;

export const activateSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  verificationCode: z.string().min(6, {
    message: 'Activation code must be larger than 6',
  }),
});

export type TActivateForm = z.infer<typeof activateSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6).max(20, {
    message: 'Password must be between 6 and 20 characters',
  }),
});

export type TLoginForm = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
});

export type TForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const changePasswordSchema = z
  .object({
    confirmHash: z.string({ message: 'Confirm hash is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6)
      .max(20, { message: 'Password must be between 6 and 20 characters' }),
    repeatPassword: z.string().min(6).max(20, {
      message: 'Repeat password must be between 6 and 20 characters',
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type TChangePasswordForm = z.infer<typeof changePasswordSchema>;
