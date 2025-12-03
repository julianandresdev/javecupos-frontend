// src/components/cupos/EditCupoModal.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cupo, CupoBarrios } from '../../types/cupo.types';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { updateCupoSchema, UpdateCupoFormData } from '../../lib/validations/cupo.validations';
import { format } from 'date-fns';

interface EditCupoModalProps {
  cupo: Cupo | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (cupoId: number, data: UpdateCupoFormData) => Promise<void>;
}

export const EditCupoModal: React.FC<EditCupoModalProps> = ({
  cupo,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchBarrio, setSearchBarrio] = useState('');
  const [showBarrios, setShowBarrios] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateCupoFormData>({
    resolver: zodResolver(updateCupoSchema),
    defaultValues: cupo
      ? {
          destino: cupo.destino,
          descripcion: cupo.descripcion || '',
          asientosTotales: cupo.asientosTotales,
          horaSalida: cupo.horaSalida
            ? format(new Date(cupo.horaSalida), "yyyy-MM-dd'T'HH:mm")
            : '',
          precio: cupo.precio,
          puntoEncuentro: cupo.puntoEncuentro,
          telefonoContacto: cupo.telefonoContacto || '',
        }
      : undefined,
  });

  // Actualizar formulario cuando cambia el cupo
  React.useEffect(() => {
    if (cupo) {
      // Asegurar que la fecha esté en formato correcto para el input (yyyy-MM-ddThh:mm)
      // La fecha viene en UTC (ISO string), necesitamos convertirla a local para el input
      const date = new Date(cupo.horaSalida);
      // Ajustar a zona horaria local manualmente para el input datetime-local
      const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
      const formattedDate = localDate.toISOString().slice(0, 16);

      reset({
        destino: cupo.destino,
        descripcion: cupo.descripcion || '',
        asientosTotales: cupo.asientosTotales,
        horaSalida: formattedDate,
        precio: cupo.precio,
        puntoEncuentro: cupo.puntoEncuentro,
        telefonoContacto: cupo.telefonoContacto || '',
      });
      setSearchBarrio(cupo.destino);
    }
  }, [cupo, reset]);

  if (!isOpen || !cupo) return null;

  const destinoSeleccionado = watch('destino');
  const asientosTotales = watch('asientosTotales');

  const barriosFiltrados = Object.values(CupoBarrios).filter((barrio) =>
    barrio.toLowerCase().includes(searchBarrio.toLowerCase())
  ).slice(0, 10);

  const handleBarrioSelect = (barrio: string) => {
    setValue('destino', barrio);
    setSearchBarrio(barrio);
    setShowBarrios(false);
  };

  const onSubmit = async (data: UpdateCupoFormData) => {
    try {
      setIsLoading(true);
      
      // Convertir fecha local a ISO string (UTC) antes de enviar
      const submitData = { ...data };
      if (data.horaSalida) {
        submitData.horaSalida = new Date(data.horaSalida).toISOString();
      }

      await onUpdate(cupo.id, submitData);
      onClose();
    } catch (error) {
      console.error('Error actualizando cupo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular asientos reservados
  const asientosReservados = cupo.asientosTotales - cupo.asientosDisponibles;
  const asientosTotalesActuales = asientosTotales || cupo.asientosTotales;
  const puedeReducirAsientos = asientosTotalesActuales >= asientosReservados;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-white p-6 rounded-t-2xl flex justify-between items-center z-20">
          <h2 className="text-2xl font-bold">Editar cupo</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Advertencia de reservas */}
        {asientosReservados > 0 && (
          <div className="m-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ Este cupo tiene <strong>{asientosReservados} asientos reservados</strong>.
              Los asientos totales no pueden ser menores a esta cantidad.
            </p>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Destino */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destino *
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchBarrio}
                onChange={(e) => {
                  setSearchBarrio(e.target.value);
                  setShowBarrios(true);
                }}
                onFocus={() => setShowBarrios(true)}
                placeholder="Buscar barrio..."
                className="input-primary"
              />
              <input type="hidden" {...register('destino')} />
              
              {showBarrios && searchBarrio && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {barriosFiltrados.length > 0 ? (
                    barriosFiltrados.map((barrio) => (
                      <button
                        key={barrio}
                        type="button"
                        onClick={() => handleBarrioSelect(barrio)}
                        className="w-full text-left px-4 py-2 hover:bg-primary-light transition-colors"
                      >
                        {barrio}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">
                      No se encontraron resultados
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.destino && (
              <p className="mt-1 text-sm text-red-500">{errors.destino.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              {...register('descripcion')}
              rows={3}
              className="input-primary resize-none"
            />
            {errors.descripcion && (
              <p className="mt-1 text-sm text-red-500">{errors.descripcion.message}</p>
            )}
          </div>

          {/* Asientos totales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asientos totales *
            </label>
            <input
              type="number"
              {...register('asientosTotales', { valueAsNumber: true })}
              min={asientosReservados}
              max={8}
              className="input-primary"
            />
            {!puedeReducirAsientos && (
              <p className="mt-1 text-sm text-red-500">
                No puedes reducir los asientos por debajo de {asientosReservados} (ya reservados)
              </p>
            )}
            {errors.asientosTotales && (
              <p className="mt-1 text-sm text-red-500">{errors.asientosTotales.message}</p>
            )}
          </div>

          {/* Fecha de salida */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora de salida *
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                {...register('horaSalida')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white text-gray-700 font-medium shadow-sm appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                style={{ colorScheme: 'light' }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
            </div>
            {errors.horaSalida && (
              <p className="mt-1 text-sm text-red-500">{errors.horaSalida.message}</p>
            )}
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio por asiento *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                {...register('precio', { valueAsNumber: true })}
                className="input-primary pl-8"
                min={1000}
                max={100000}
                step={1000}
              />
            </div>
            {errors.precio && (
              <p className="mt-1 text-sm text-red-500">{errors.precio.message}</p>
            )}
          </div>

          {/* Punto de encuentro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Punto de encuentro *
            </label>
            <input
              type="text"
              {...register('puntoEncuentro')}
              className="input-primary"
            />
            {errors.puntoEncuentro && (
              <p className="mt-1 text-sm text-red-500">{errors.puntoEncuentro.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono de contacto
            </label>
            <input
              type="tel"
              {...register('telefonoContacto')}
              className="input-primary"
            />
            {errors.telefonoContacto && (
              <p className="mt-1 text-sm text-red-500">{errors.telefonoContacto.message}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <Button type="submit" isLoading={isLoading}>
              Guardar cambios
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
