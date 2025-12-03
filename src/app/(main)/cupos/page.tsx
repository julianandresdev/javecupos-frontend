// src/app/(main)/cupos/page.tsx (actualizado)
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CupoCard } from '../../../components/cupos/CupoCard';
import { CupoDetailsModal } from '../../../components/cupos/CupoDetailsModal';
import { CupoFiltersComponent, CupoFilters } from '../../../components/cupos/CupoFilters';
import { cuposAPI, bookingsAPI } from '../../../lib/api/endpoints';
import { Cupo } from '../../../types/cupo.types';

export default function CuposPage() {
  const [cupos, setCupos] = useState<Cupo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCupo, setSelectedCupo] = useState<Cupo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<CupoFilters>({});

  useEffect(() => {
    loadCupos();
  }, []);

  const loadCupos = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await cuposAPI.getAll();
      
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

  // Aplicar filtros y ordenamiento
  const cuposFiltrados = useMemo(() => {
    let resultado = [...cupos];

    // Filtrar por destino
    if (filters.destino) {
      resultado = resultado.filter((cupo) =>
        cupo.destino.toLowerCase().includes(filters.destino!.toLowerCase())
      );
    }

    // Filtrar por fecha
    if (filters.fecha) {
      const fechaFiltro = new Date(filters.fecha);
      fechaFiltro.setHours(0, 0, 0, 0);
      
      resultado = resultado.filter((cupo) => {
        const fechaCupo = new Date(cupo.horaSalida);
        fechaCupo.setHours(0, 0, 0, 0);
        return fechaCupo.getTime() === fechaFiltro.getTime();
      });
    }

    // Filtrar por precio mínimo
    if (filters.precioMin !== undefined) {
      resultado = resultado.filter((cupo) => cupo.precio >= filters.precioMin!);
    }

    // Filtrar por precio máximo
    if (filters.precioMax !== undefined) {
      resultado = resultado.filter((cupo) => cupo.precio <= filters.precioMax!);
    }

    // Filtrar por asientos mínimos
    if (filters.asientosMin !== undefined) {
      resultado = resultado.filter(
        (cupo) => cupo.asientosDisponibles >= filters.asientosMin!
      );
    }

    // Ordenar
    if (filters.ordenarPor) {
      resultado.sort((a, b) => {
        let valorA: any;
        let valorB: any;

        switch (filters.ordenarPor) {
          case 'fecha':
            valorA = new Date(a.horaSalida).getTime();
            valorB = new Date(b.horaSalida).getTime();
            break;
          case 'precio':
            valorA = a.precio;
            valorB = b.precio;
            break;
          case 'asientos':
            valorA = a.asientosDisponibles;
            valorB = b.asientosDisponibles;
            break;
          default:
            return 0;
        }

        if (filters.direccion === 'asc') {
          return valorA - valorB;
        } else {
          return valorB - valorA;
        }
      });
    }

    return resultado;
  }, [cupos, filters]);

  // Agrupar por día
  const cuposPorDia = useMemo(() => {
    return cuposFiltrados.reduce((grupos, cupo) => {
      const fecha = new Date(cupo.horaSalida);
      const dia = fecha.toLocaleDateString('es-CO', { weekday: 'long' });
      
      if (!grupos[dia]) {
        grupos[dia] = [];
      }
      grupos[dia].push(cupo);
      return grupos;
    }, {} as Record<string, Cupo[]>);
  }, [cuposFiltrados]);

  const handleCupoClick = (cupo: Cupo) => {
    setSelectedCupo(cupo);
    setIsModalOpen(true);
  };

  const handleReservar = async (cupoId: number, asientos: number) => {
    try {
      const cupo = cupos.find((c) => c.id === cupoId);
      if (!cupo) return;
      
      await bookingsAPI.create({
        cupoId,
        asientosReservados: asientos,
      });

      await loadCupos();
    } catch (error: any) {
      console.error('Error al crear reserva:', error);
      throw error;
    }
  };

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

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cupos Disponibles</h2>
          <p className="text-gray-600 text-sm">
            {cuposFiltrados.length} {cuposFiltrados.length === 1 ? 'cupo' : 'cupos'} 
            {cupos.length !== cuposFiltrados.length && ` de ${cupos.length} totales`}
          </p>
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

      {/* Filtros */}
      <CupoFiltersComponent onFiltersChange={setFilters} isLoading={isLoading} />

      {/* Resultados */}
      {cuposFiltrados.length === 0 ? (
        <div className="text-center py-12 card">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No se encontraron cupos
          </h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(cuposPorDia).map(([dia, cuposDia]) => (
            <div key={dia}>
              <h3 className="text-xl font-semibold capitalize mb-4 text-primary">
                {dia} ({cuposDia.length})
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
      )}

      {/* Modal */}
      <CupoDetailsModal
        cupo={selectedCupo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReservar={handleReservar}
      />
    </div>
  );
}
