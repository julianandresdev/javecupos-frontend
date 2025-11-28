// src/components/cupos/EditCupoModal.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cupo } from '../../types/cupo.types';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { updateCupoSchema, UpdateCupoFormData } from '../../lib/validations/cupo.validations';
import { BARRIOS_CALI } from '../../constants/barrios';
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
          horaLlegadaEstimada: cupo.horaLlegadaEstimada
            ? format(new Date(cupo.horaLlegadaEstimada), "yyyy-MM-dd'T'HH:mm")
            : '',
          precio: cupo.precio,
          puntoEncuentro: cupo.puntoEncuentro,
          telefonoContacto: cupo.telefonoContacto || '',
        }
      : undefined,
  });

  if (!isOpen || !cupo) return null;

  const destinoSeleccionado = watch('destino');
  const asientosTotales = watch('asientosTotales');

  const barriosFiltrados = BARRIOS_CALI.filter((barrio) =>
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
      await onUpdate(cupo.id, data);
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
        <div className="sticky top-0 bg-primary text-white p-6 rounded-t-2xl flex justify-between items-center">
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
                value={searchBarrio || destinoSeleccionado}
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

          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora de salida *
              </label>
              <input
                type="datetime-local"
                {...register('horaSalida')}
                className="input-primary"
              />
              {errors.horaSalida && (
                <p className="mt-1 text-sm text-red-500">{errors.horaSalida.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Llegada estimada
              </label>
              <input
                type="datetime-local"
                {...register('horaLlegadaEstimada')}
                className="input-primary"
              />
              {errors.horaLlegadaEstimada && (
                <p className="mt-1 text-sm text-red-500">{errors.horaLlegadaEstimada.message}</p>
              )}
            </div>
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
