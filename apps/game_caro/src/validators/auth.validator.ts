import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
})

export type TRegisterForm = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})

export type TLoginForm = z.infer<typeof loginSchema>;
