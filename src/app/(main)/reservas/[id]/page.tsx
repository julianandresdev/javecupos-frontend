// src/app/(main)/reservas/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { bookingsAPI } from '../../../../lib/api/endpoints';
import { Booking } from '../../../../types/booking.types';

export default function ReservaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reservaId = Number(params.id);

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    loadBooking();
  }, [reservaId]);

  const loadBooking = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await bookingsAPI.getById(reservaId);
      setBooking(data);
    } catch (err: any) {
      console.error('Error cargando reserva:', err);
      setError('Error al cargar la reserva');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!booking) return;

    const confirmed = window.confirm(
      '¿Estás seguro de que quieres cancelar esta reserva? Esta acción no se puede deshacer.'
    );

    if (!confirmed) return;

    try {
      setIsCancelling(true);
      await bookingsAPI.cancel(booking.id);
      alert('Reserva cancelada exitosamente');
      await loadBooking();
    } catch (error: any) {
      console.error('Error cancelando reserva:', error);
      alert(error.response?.data?.message || 'Error al cancelar la reserva');
    } finally {
      setIsCancelling(false);
    }
  };

  const copyCode = () => {
    if (booking) {
      navigator.clipboard.writeText(booking.id.toString());
      alert('Código de reserva copiado');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando reserva...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reserva no encontrada</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => router.push('/profile/bookings')}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Ver mis reservas
        </button>
      </div>
    );
  }

  const canCancel = booking.estado === 'PENDIENTE' || booking.estado === 'CONFIRMADO';

  // Timeline states
  const states = ['PENDIENTE', 'CONFIRMADO', 'COMPLETADO'];
  const currentStateIndex = states.indexOf(booking.estado);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
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

        <h1 className="text-2xl font-bold text-gray-800">Detalle de Reserva</h1>
      </div>

      {/* Reservation code */}
      <div className="card mb-6 bg-primary-light">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Código de Reserva</p>
            <p className="text-2xl font-bold text-gray-800">#{booking.id}</p>
          </div>
          <button
            onClick={copyCode}
            className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-white transition-colors"
          >
            Copiar código
          </button>
        </div>
      </div>

      {/* Status badge */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Estado de la Reserva</h2>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              booking.estado === 'PENDIENTE'
                ? 'bg-yellow-100 text-yellow-800'
                : booking.estado === 'CONFIRMADO'
                ? 'bg-green-100 text-green-800'
                : booking.estado === 'COMPLETADO'
                ? 'bg-blue-100 text-blue-800'
                : booking.estado === 'RECHAZADO'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {booking.estado}
          </span>
        </div>

        {/* Timeline */}
        {(booking.estado === 'PENDIENTE' || booking.estado === 'CONFIRMADO' || booking.estado === 'COMPLETADO') && (
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              {states.map((state, index) => (
                <div key={state} className="flex-1 text-center relative">
                  <div
                    className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-sm mb-2 ${
                      index <= currentStateIndex
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index < currentStateIndex ? '✓' : index + 1}
                  </div>
                  <p
                    className={`text-xs font-medium ${
                      index <= currentStateIndex ? 'text-gray-800' : 'text-gray-500'
                    }`}
                  >
                    {state}
                  </p>
                </div>
              ))}
            </div>
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(currentStateIndex / (states.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Trip details */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Información del Viaje</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ruta</p>
              <p className="font-semibold text-gray-800">Cupo ID: {booking.cupoId}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fecha de Reserva</p>
              <p className="font-semibold text-gray-800">
                {new Date(booking.createdAt).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Asientos Reservados</p>
              <p className="font-semibold text-gray-800">{booking.asientosReservados}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Monto Total</span>
              <span className="text-2xl font-bold text-primary">${booking.montoTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {canCancel && (
        <div className="card border-2 border-red-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Cancelar Reserva</h3>
          <p className="text-sm text-gray-600 mb-4">
            {booking.estado === 'PENDIENTE'
              ? 'Puedes cancelar esta reserva sin penalización ya que aún está pendiente de confirmación.'
              : 'Ten en cuenta la política de cancelación antes de proceder.'}
          </p>
          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCancelling ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Cancelando...
              </>
            ) : (
              'Cancelar Reserva'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
