// src/app/(main)/cupos/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CupoCard } from '../../../components/cupos/CupoCard';
import { CupoDetailsModal } from '../../../components/cupos/CupoDetailsModal';
import { cuposAPI, bookingsAPI } from '../../../lib/api/endpoints';
import { Cupo } from '../../../types/cupo.types';

export default function CuposPage() {
  const [cupos, setCupos] = useState<Cupo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCupo, setSelectedCupo] = useState<Cupo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar cupos al montar el componente
  useEffect(() => {
    loadCupos();
  }, []);

  const loadCupos = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await cuposAPI.getAll();
      
      // Filtrar solo cupos disponibles y activos
      const cuposDisponibles = data.filter(
        (cupo) => cupo.activo && cupo.estado === 'Disponible'
      );
      
      setCupos(cuposDisponibles);
    } catch (err: any) {
      console.error('Error cargando cupos:', err);
      setError('Error al cargar los cupos. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCupoClick = (cupo: Cupo) => {
    setSelectedCupo(cupo);
    setIsModalOpen(true);
  };

  const handleReservar = async (cupoId: number, asientos: number) => {
    try {
      const montoTotal = selectedCupo!.precio * asientos;
      
      await bookingsAPI.create({
        cupoId,
        asientosReservados: asientos,
        montoTotal,
      });

      // Recargar cupos para actualizar asientos disponibles
      await loadCupos();
    } catch (error: any) {
      console.error('Error al crear reserva:', error);
      throw error;
    }
  };

  // Estado de carga
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando cupos...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops...</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadCupos}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Estado vacío
  if (cupos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No hay cupos disponibles
          </h2>
          <p className="text-gray-600 mb-4">
            Por el momento no hay viajes programados.
            ¡Vuelve pronto!
          </p>
          <button
            onClick={loadCupos}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Actualizar
          </button>
        </div>
      </div>
    );
  }

  // Agrupar cupos por día
  const cuposPorDia = cupos.reduce((grupos, cupo) => {
    const fecha = new Date(cupo.horaSalida);
    const dia = fecha.toLocaleDateString('es-CO', { weekday: 'long' });
    
    if (!grupos[dia]) {
      grupos[dia] = [];
    }
    grupos[dia].push(cupo);
    return grupos;
  }, {} as Record<string, Cupo[]>);

  return (
    <div>
      {/* Header con botón de actualizar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cupos Disponibles</h2>
          <p className="text-gray-600 text-sm">Encuentra tu viaje ideal</p>
        </div>
        <button
          onClick={loadCupos}
          className="px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary-light transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Actualizar
        </button>
      </div>

      {/* Lista de cupos agrupados por día */}
      <div className="space-y-8">
        {Object.entries(cuposPorDia).map(([dia, cuposDia]) => (
          <div key={dia}>
            <h3 className="text-xl font-semibold capitalize mb-4 text-primary">
              {dia}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cuposDia.map((cupo) => (
                <CupoCard
                  key={cupo.id}
                  cupo={cupo}
                  onClick={() => handleCupoClick(cupo)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      <CupoDetailsModal
        cupo={selectedCupo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReservar={handleReservar}
      />
    </div>
  );
}
