// src/components/cupos/CreateCupoForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { createCupoSchema, CreateCupoFormData } from '../../lib/validations/cupo.validations';
import { BARRIOS_CALI } from '../../constants/barrios';

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
  const barriosFiltrados = BARRIOS_CALI.filter((barrio) =>
    barrio.toLowerCase().includes(searchBarrio.toLowerCase())
  ).slice(0, 10); // Mostrar máximo 10 resultados

  const handleBarrioSelect = (barrio: string) => {
    setValue('destino', barrio);
    setSearchBarrio(barrio);
    setShowBarrios(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            Llegada estimada (opcional)
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
