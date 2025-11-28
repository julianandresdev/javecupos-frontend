// src/components/cupos/MyCupoCard.tsx
'use client';

import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Cupo } from '../../types/cupo.types';

interface MyCupoCardProps {
  cupo: Cupo;
  onEdit: () => void;
  onCancel: () => void;
  onViewBookings: () => void;
}

export const MyCupoCard: React.FC<MyCupoCardProps> = ({
  cupo,
  onEdit,
  onCancel,
  onViewBookings,
}) => {
  const fechaSalida = new Date(cupo.horaSalida);
  const diaSemana = format(fechaSalida, 'EEEE', { locale: es });
  const fechaCompleta = format(fechaSalida, "dd 'de' MMMM yyyy", { locale: es });
  const hora = format(fechaSalida, 'HH:mm');

  // Color del badge según estado
  const estadoColors = {
    'Disponible': 'bg-green-100 text-green-800 border-green-300',
    'En curso': 'bg-blue-100 text-blue-800 border-blue-300',
    'Completado': 'bg-gray-100 text-gray-800 border-gray-300',
    'Cancelado': 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className="card border-2 border-accent">
      {/* Header con estado */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800 capitalize">{diaSemana}</h3>
          <p className="text-sm text-gray-600">{fechaCompleta}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${estadoColors[cupo.estado]}`}>
          {cupo.estado}
        </span>
      </div>

      {/* Hora */}
      <p className="text-3xl font-bold text-gray-900 mb-2">{hora}</p>

      {/* Destino */}
      <div className="mb-3">
        <p className="text-sm text-gray-600">Destino</p>
        <p className="font-semibold text-gray-800">{cupo.destino}</p>
      </div>

      {/* Asientos */}
      <div className="flex items-center gap-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <span className="text-sm">
          <span className="font-semibold">{cupo.asientosDisponibles}</span> de {cupo.asientosTotales} disponibles
        </span>
      </div>

      {/* Precio */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">
          ${cupo.precio.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">por persona</span>
      </div>

      {/* Contador de reservas */}
      <button
        onClick={onViewBookings}
        className="w-full mb-3 p-3 bg-primary-light rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium flex items-center justify-between"
      >
        <span>Ver reservas recibidas</span>
        <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
          {cupo.asientosTotales - cupo.asientosDisponibles}
        </span>
      </button>

      {/* Botones de acción */}
      {cupo.estado === 'Disponible' && (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary-light transition-colors text-sm font-medium"
          >
            ✏️ Editar
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
          >
            ❌ Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
