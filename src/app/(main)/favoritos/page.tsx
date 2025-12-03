// src/app/(main)/favoritos/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CupoCard } from '../../../components/cupos/CupoCard';
import { CupoDetailsModal } from '../../../components/cupos/CupoDetailsModal';
import { favoritesAPI, bookingsAPI } from '../../../lib/api/endpoints';
import { Cupo } from '../../../types/cupo.types';
import { ListSkeleton } from '../../../components/ui/SkeletonLoader';

export default function FavoritosPage() {
  const [cupos, setCupos] = useState<Cupo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCupo, setSelectedCupo] = useState<Cupo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await favoritesAPI.getMyFavorites();
      setCupos(data);
    } catch (err: any) {
      console.error('Error cargando favoritos:', err);
      setError('Error al cargar tus cupos favoritos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCupoClick = (cupo: Cupo) => {
    setSelectedCupo(cupo);
    setIsModalOpen(true);
  };

  const handleRemoveFavorite = async (cupoId: number) => {
    try {
      await favoritesAPI.remove(cupoId);
      // Remove from local state
      setCupos((prev) => prev.filter((cupo) => cupo.id !== cupoId));
    } catch (error: any) {
      console.error('Error removiendo favorito:', error);
      alert('Error al remover de favoritos');
    }
  };

  const handleReservar = async (cupoId: number, asientos: number) => {
    try {
      const cupo = cupos.find((c) => c.id === cupoId);
      if (!cupo) return;

      await bookingsAPI.create({
        cupoId,
        asientosReservados: asientos,
      });

      await loadFavorites();
    } catch (error: any) {
      console.error('Error al crear reserva:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          ❤️ Mis Cupos Favoritos
        </h2>
        <ListSkeleton count={3} type="cupo" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops...</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={loadFavorites}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            ❤️ Mis Cupos Favoritos
          </h2>
          <p className="text-gray-600 text-sm">
            {cupos.length} {cupos.length === 1 ? 'cupo guardado' : 'cupos guardados'}
          </p>
        </div>
        <button
          onClick={loadFavorites}
          className="px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary-light transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Actualizar
        </button>
      </div>

      {cupos.length === 0 ? (
        <div className="text-center py-12 card">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No tienes cupos favoritos
          </h3>
          <p className="text-gray-600 mb-4">
            Explora cupos y guarda tus favoritos haciendo clic en el ícono de corazón
          </p>
          <a
            href="/cupos"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            Explorar Cupos
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cupos.map((cupo) => (
            <div key={cupo.id} className="relative">
              <CupoCard cupo={cupo} onClick={() => handleCupoClick(cupo)} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavorite(cupo.id);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                title="Remover de favoritos"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  className="w-6 h-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <CupoDetailsModal
        cupo={selectedCupo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReservar={handleReservar}
      />
    </div>
  );
}
