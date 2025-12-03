// src/components/cupos/CreateCupoForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { createCupoSchema, CreateCupoFormData } from '../../lib/validations/cupo.validations';
import { CupoBarrios } from '../../types/cupo.types';

interface CreateCupoFormProps {
  onSubmit: (data: CreateCupoFormData) => Promise<void>;
  isLoading?: boolean;
}

export const CreateCupoForm: React.FC<CreateCupoFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [searchBarrio, setSearchBarrio] = useState('');
  const [showBarrios, setShowBarrios] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCupoFormData>({
    resolver: zodResolver(createCupoSchema),
    defaultValues: {
      asientosTotales: 4,
    },
  });

  const destinoSeleccionado = watch('destino');

  // Filtrar barrios según búsqueda
  const barriosList = Object.values(CupoBarrios);
  const barriosFiltrados = barriosList.filter((barrio) =>
    barrio.toLowerCase().includes(searchBarrio.toLowerCase())
  ).slice(0, 10); // Mostrar máximo 10 resultados

  const handleBarrioSelect = (barrio: string) => {
    setValue('destino', barrio);
    setSearchBarrio(barrio);
    setShowBarrios(false);
  };

  const handleFormSubmit = async (data: CreateCupoFormData) => {
    // Convertir la fecha local a ISO string para asegurar consistencia de zona horaria
    const localDate = new Date(data.horaSalida);
    const isoDate = localDate.toISOString();
    
    await onSubmit({
      ...data,
      horaSalida: isoDate,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Destino con autocomplete */}
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
          <input
            type="hidden"
            {...register('destino')}
          />
          
          {/* Dropdown de barrios */}
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
        {destinoSeleccionado && (
          <p className="mt-1 text-sm text-green-600">
            ✓ Seleccionado: {destinoSeleccionado}
          </p>
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
          placeholder="Ej: Tengo espacio en la maleta, acepto mascotas, etc."
          className="input-primary resize-none"
        />
        {errors.descripcion && (
          <p className="mt-1 text-sm text-red-500">{errors.descripcion.message}</p>
        )}
      </div>

      {/* Asientos totales */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Asientos disponibles *
        </label>
        <input
          type="number"
          {...register('asientosTotales', { valueAsNumber: true })}
          min={1}
          max={8}
          className="input-primary"
        />
        {errors.asientosTotales && (
          <p className="mt-1 text-sm text-red-500">{errors.asientosTotales.message}</p>
        )}
      </div>

      {/* Fechas y horas */}
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
        <p className="mt-1 text-xs text-gray-500">
          Selecciona la fecha y hora en que iniciarás el viaje
        </p>
      </div>

      {/* Precio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Precio por asiento *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            {...register('precio', { valueAsNumber: true })}
            min={1000}
            max={100000}
            step={1000}
            className="input-primary pl-8"
            placeholder="5000"
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
          placeholder="Ej: Frente a la Universidad del Valle"
          className="input-primary"
        />
        {errors.puntoEncuentro && (
          <p className="mt-1 text-sm text-red-500">{errors.puntoEncuentro.message}</p>
        )}
      </div>

      {/* Teléfono de contacto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Teléfono de contacto (opcional)
        </label>
        <input
          type="tel"
          {...register('telefonoContacto')}
          placeholder="3001234567"
          className="input-primary"
        />
        {errors.telefonoContacto && (
          <p className="mt-1 text-sm text-red-500">{errors.telefonoContacto.message}</p>
        )}
      </div>

      {/* Botón submit */}
      <Button type="submit" isLoading={isLoading}>
        Publicar cupo
      </Button>
    </form>
  );
};
