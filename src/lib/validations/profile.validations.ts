import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede superar 100 caracteres'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),
  age: z
    .number()
    .min(18, 'Debes ser mayor de 18 años')
    .max(100, 'Edad inválida'),
  avatar: z
    .string()
    .url('URL inválida')
    .optional()
    .or(z.literal('')),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'La contraseña actual es obligatoria'),
  newPassword: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un símbolo'),
  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
