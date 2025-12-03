// src/app/(main)/cupos/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { cuposAPI, bookingsAPI, favoritesAPI } from '../../../../lib/api/endpoints';
import { Cupo } from '../../../../types/cupo.types';
import { useAuthStore } from '../../../../lib/stores/authStore';

export default function CupoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const cupoId = Number(params.id);

  const [cupo, setCupo] = useState<Cupo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState(1);
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    loadCupo();
    checkIfFavorite();
  }, [cupoId]);

  const loadCupo = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await cuposAPI.getById(cupoId);
      setCupo(data);
    } catch (err: any) {
      console.error('Error cargando cupo:', err);
      setError('Error al cargar el cupo');
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const result = await favoritesAPI.isFavorite(cupoId);
      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.error('Error verificando favorito:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await favoritesAPI.remove(cupoId);
        setIsFavorite(false);
      } else {
        await favoritesAPI.add(cupoId);
        setIsFavorite(true);
      }
    } catch (error: any) {
      console.error('Error toggling favorito:', error);
      alert('Error al actualizar favoritos');
    }
  };

  const handleReservar = async () => {
    if (!cupo) return;

    try {
      setIsReserving(true);

      await bookingsAPI.create({
        cupoId: cupo.id,
        asientosReservados: asientosSeleccionados,
      });

      alert('¡Reserva creada exitosamente! El conductor deberá confirmarla.');
      router.push('/profile/bookings');
    } catch (error: any) {
      console.error('Error al crear reserva:', error);
      alert(error.response?.data?.message || 'Error al crear la reserva');
    } finally {
      setIsReserving(false);
    }
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('¡Link copiado al portapapeles!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando cupo...</p>
        </div>
      </div>
    );
  }

  if (error || !cupo) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cupo no encontrado</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => router.push('/cupos')}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Ver todos los cupos
        </button>
      </div>
    );
  }

  const isOwner = user?.id === cupo.conductorId;
  const canReserve = !isOwner && cupo.estado === 'Disponible' && cupo.asientosDisponibles > 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Volver
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorite ? 'red' : 'none'}
              stroke={isFavorite ? 'red' : 'currentColor'}
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>

          <button
            onClick={copyLink}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Compartir"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main card */}
      <div className="card mb-6">
        {/* Route */}
        <div className="mb-6">
          <div className="flex items-center gap-4 text-2xl font-bold text-gray-800">
            <span>{cupo.origen}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-primary"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            <span>{cupo.destino}</span>
          </div>
        </div>

        {/* Status badge */}
        <div className="mb-4">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              cupo.estado === 'Disponible'
                ? 'bg-green-100 text-green-800'
                : cupo.estado === 'En curso'
                ? 'bg-blue-100 text-blue-800'
                : cupo.estado === 'Completado'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {cupo.estado}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">📅 Fecha y Hora</h3>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(cupo.horaSalida).toLocaleDateString('es-CO', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-gray-600">
              Salida: {new Date(cupo.horaSalida).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-gray-600">
              Llegada: {cupo.horaLlegada ? new Date(cupo.horaLlegada).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) : 'No especificado'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">💰 Precio y Asientos</h3>
            <p className="text-3xl font-bold text-primary mb-1">${cupo.precio.toLocaleString()}</p>
            <p className="text-sm text-gray-600">por persona</p>
            <p className="text-gray-600 mt-2">
              {cupo.asientosDisponibles} de {cupo.asientos} asientos disponibles
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">📍 Punto de Encuentro</h3>
            <p className="text-gray-800">{cupo.puntoEncuentro}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">📞 Contacto</h3>
            <p className="text-gray-800">{cupo.telefono}</p>
          </div>
        </div>

        {/* Description */}
        {cupo.descripcion && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">ℹ️ Descripción</h3>
            <p className="text-gray-700">{cupo.descripcion}</p>
          </div>
        )}

        {/* Conductor info */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Conductor</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
              C
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">ID: {cupo.conductorId}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>⭐</span>
                <span className="font-medium">Conductor verificado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation section */}
      {canReserve && (
        <div className="card bg-primary-light">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Reservar este cupo</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de asientos
            </label>
            <select
              value={asientosSeleccionados}
              onChange={(e) => setAsientosSeleccionados(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Array.from({ length: Math.min(cupo.asientosDisponibles, 4) }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'asiento' : 'asientos'}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Precio por persona:</span>
              <span className="font-semibold">${cupo.precio.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Asientos:</span>
              <span className="font-semibold">×{asientosSeleccionados}</span>
            </div>
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-primary">
                ${(cupo.precio * asientosSeleccionados).toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleReservar}
            disabled={isReserving}
            className="w-full py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isReserving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Procesando...
              </>
            ) : (
              'Confirmar Reserva'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
