import { z } from 'zod';
import { UserRole } from '../../types/user.types';

// Esquema de Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo es obligatorio')
    .email('Correo inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Esquema de Registro
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z
    .string()
    .min(1, 'El correo es obligatorio')
    .email('Correo inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un símbolo'),
  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña'),
  phone: z
    .string()
    .min(1, 'El teléfono es obligatorio')
    .regex(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),
  age: z
    .number()
    .min(18, 'Debes ser mayor de 18 años')
    .max(100, 'Edad inválida'),
  role: z.nativeEnum(UserRole, {
    message: 'Selecciona un rol válido',
  }),
  avatar: z
    .string()
    .url('URL inválida')
    .optional()
    .or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Esquema de Forgot Password
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo es obligatorio')
    .email('Correo inválido'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Esquema de Reset Password
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un símbolo'),
  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
