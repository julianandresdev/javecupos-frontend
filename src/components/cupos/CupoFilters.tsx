// src/components/cupos/CupoFilters.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { BARRIOS_CALI } from '../../constants/barrios';

export interface CupoFilters {
  destino?: string;
  fecha?: string;
  precioMin?: number;
  precioMax?: number;
  asientosMin?: number;
  ordenarPor?: 'fecha' | 'precio' | 'asientos';
  direccion?: 'asc' | 'desc';
}

interface CupoFiltersProps {
  onFiltersChange: (filters: CupoFilters) => void;
  isLoading?: boolean;
}

export const CupoFiltersComponent: React.FC<CupoFiltersProps> = ({
  onFiltersChange,
  isLoading = false,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchBarrio, setSearchBarrio] = useState('');
  const [showBarrios, setShowBarrios] = useState(false);
  const [filters, setFilters] = useState<CupoFilters>({
    destino: '',
    fecha: '',
    precioMin: undefined,
    precioMax: undefined,
    asientosMin: undefined,
    ordenarPor: 'fecha',
    direccion: 'asc',
  });

  // Debounce para evitar múltiples llamadas
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (key: keyof CupoFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      destino: '',
      fecha: '',
      precioMin: undefined,
      precioMax: undefined,
      asientosMin: undefined,
      ordenarPor: 'fecha',
      direccion: 'asc',
    });
    setSearchBarrio('');
  };

  const barriosFiltrados = BARRIOS_CALI.filter((barrio) =>
    barrio.toLowerCase().includes(searchBarrio.toLowerCase())
  ).slice(0, 10);

  const handleBarrioSelect = (barrio: string) => {
    setSearchBarrio(barrio);
    handleFilterChange('destino', barrio);
    setShowBarrios(false);
  };

  return (
    <div className="card mb-6">
      {/* Header con botón de toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
        </button>

        {/* Contador de filtros activos */}
        {Object.values(filters).filter((v) => v && v !== '').length > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Filtros desplegables */}
      {showFilters && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          {/* Búsqueda por destino */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destino
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchBarrio}
                onChange={(e) => {
                  setSearchBarrio(e.target.value);
                  setShowBarrios(true);
                  if (!e.target.value) {
                    handleFilterChange('destino', '');
                  }
                }}
                onFocus={() => setShowBarrios(true)}
                placeholder="Buscar barrio..."
                className="input-primary"
              />
              
              {showBarrios && searchBarrio && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {barriosFiltrados.length > 0 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchBarrio('');
                          handleFilterChange('destino', '');
                          setShowBarrios(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-600 border-b"
                      >
                        ✕ Limpiar búsqueda
                      </button>
                      {barriosFiltrados.map((barrio) => (
                        <button
                          key={barrio}
                          type="button"
                          onClick={() => handleBarrioSelect(barrio)}
                          className="w-full text-left px-4 py-2 hover:bg-primary-light transition-colors"
                        >
                          {barrio}
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">
                      No se encontraron resultados
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={filters.fecha || ''}
              onChange={(e) => handleFilterChange('fecha', e.target.value)}
              className="input-primary"
            />
          </div>

          {/* Rango de precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de precio
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="Mínimo"
                  value={filters.precioMin || ''}
                  onChange={(e) => handleFilterChange('precioMin', e.target.value ? Number(e.target.value) : undefined)}
                  className="input-primary pl-8"
                  min={0}
                  step={1000}
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="Máximo"
                  value={filters.precioMax || ''}
                  onChange={(e) => handleFilterChange('precioMax', e.target.value ? Number(e.target.value) : undefined)}
                  className="input-primary pl-8"
                  min={0}
                  step={1000}
                />
              </div>
            </div>
          </div>

          {/* Asientos mínimos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asientos disponibles (mínimo)
            </label>
            <select
              value={filters.asientosMin || ''}
              onChange={(e) => handleFilterChange('asientosMin', e.target.value ? Number(e.target.value) : undefined)}
              className="input-primary"
            >
              <option value="">Todos</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Ordenar por */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={filters.ordenarPor || 'fecha'}
                onChange={(e) => handleFilterChange('ordenarPor', e.target.value as any)}
                className="input-primary"
              >
                <option value="fecha">Fecha</option>
                <option value="precio">Precio</option>
                <option value="asientos">Asientos disponibles</option>
              </select>

              <select
                value={filters.direccion || 'asc'}
                onChange={(e) => handleFilterChange('direccion', e.target.value as any)}
                className="input-primary"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
