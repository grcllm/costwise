import { z } from 'zod';
import { SIMULATOR_CONFIG } from './constants';

// Registration
export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character.'),
});
export type RegisterInput = z.infer<typeof registerSchema>;

// Login — email + password only, no OTP
export const loginSchema = z.object({
  email:    z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});
export type LoginInput = z.infer<typeof loginSchema>;

// Forgot Password
export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// Reset Password
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Must contain at least one number.')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character.'),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// Profile Update
export const profileUpdateSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
  email:       z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .optional()
    .refine(
      val => !val || (val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^a-zA-Z0-9]/.test(val)),
      { message: 'Password must be at least 8 characters with uppercase, number, and special character.' }
    ),
});
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

// Simulator
export const simulatorSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .positive('Amount must be greater than zero.'),
  baseYear: z
    .number()
    .min(SIMULATOR_CONFIG.MIN_YEAR)
    .max(new Date().getFullYear()),
  householdItemId: z.string().optional(),
});
export type SimulatorInputSchema = z.infer<typeof simulatorSchema>;
