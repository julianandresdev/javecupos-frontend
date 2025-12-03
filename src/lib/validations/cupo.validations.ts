import { z } from 'zod';

export const createCupoSchema = z.object({
  destino: z
    .string()
    .min(1, 'El destino es obligatorio'),
  descripcion: z
    .string()
    .max(500, 'La descripción no puede superar 500 caracteres')
    .optional(),
  asientosTotales: z
    .number()
    .min(1, 'Debe haber al menos 1 asiento')
    .max(8, 'Máximo 8 asientos'),
  horaSalida: z
    .string()
    .min(1, 'La hora de salida es obligatoria')
    .refine((val) => {
      const fecha = new Date(val);
      const ahora = new Date();
      return fecha > ahora;
    }, { message: 'La hora de salida debe ser en el futuro' }),
  horaLlegadaEstimada: z
    .string()
    .optional(),
  precio: z
    .number()
    .min(1000, 'El precio mínimo es $1,000')
    .max(100000, 'El precio máximo es $100,000'),
  puntoEncuentro: z
    .string()
    .min(5, 'El punto de encuentro debe tener al menos 5 caracteres')
    .max(300, 'Máximo 300 caracteres'),
  telefonoContacto: z
    .string()
    .regex(/^\d{10}$/, 'El teléfono debe tener 10 dígitos')
    .optional()
    .or(z.literal('')),
});

export type CreateCupoFormData = z.infer<typeof createCupoSchema>;

export const updateCupoSchema = createCupoSchema.partial();
export type UpdateCupoFormData = z.infer<typeof updateCupoSchema>;
