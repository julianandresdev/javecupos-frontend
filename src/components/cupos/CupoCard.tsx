// src/components/cupos/CupoCard.tsx
'use client';

import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Cupo } from '../../types/cupo.types';

interface CupoCardProps {
  cupo: Cupo;
  onClick: () => void;
}

export const CupoCard: React.FC<CupoCardProps> = ({ cupo, onClick }) => {
  // Formatear la fecha
  const fechaSalida = new Date(cupo.horaSalida);
  const diaSemana = format(fechaSalida, 'EEEE', { locale: es }); // "lunes"
  const fechaCompleta = format(fechaSalida, "dd 'de' MMMM yyyy", { locale: es }); // "20 de noviembre 2024"
  const hora = format(fechaSalida, 'HH:mm'); // "07:00"

  return (
    <div
      onClick={onClick}
      className="card hover:shadow-lg transition-shadow cursor-pointer border-2 border-accent relative"
    >
      {/* Día de la semana */}
      <h3 className="text-2xl font-bold text-gray-800 mb-1 capitalize">
        {diaSemana}
      </h3>

      {/* Fecha completa */}
      <p className="text-gray-600 text-sm mb-3">{fechaCompleta}</p>

      {/* Hora */}
      <p className="text-4xl font-bold text-gray-900">{hora}</p>

      {/* Destino */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">Destino</p>
        <p className="font-semibold text-gray-800">{cupo.destino}</p>
      </div>

      {/* Asientos disponibles */}
      <div className="mt-2 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <span className="text-sm text-gray-600">
          {cupo.asientosDisponibles} de {cupo.asientosTotales} disponibles
        </span>
      </div>

      {/* Precio */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">
          ${cupo.precio.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">por persona</span>
      </div>

      {/* Botón de info (icono) */}
      <button
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-light flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
        onClick={(e) => {
          e.stopPropagation(); // Evitar que se dispare el onClick del card
          onClick();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      </button>

      {/* Badge de estado */}
      {cupo.asientosDisponibles === 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          AGOTADO
        </div>
      )}
    </div>
  );
};
