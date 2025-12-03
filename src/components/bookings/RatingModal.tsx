// src/components/bookings/RatingModal.tsx
'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ratingsAPI } from '../../lib/api/endpoints';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number;
  conductorName: string;
  onSuccess?: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  bookingId,
  conductorName,
  onSuccess,
}) => {
  const [puntuacion, setPuntuacion] = useState(0);
  const [puntualidad, setPuntualidad] = useState(0);
  const [conduccion, setConduccion] = useState(0);
  const [vehiculo, setVehiculo] = useState(0);
  const [trato, setTrato] = useState(0);
  const [comentario, setComentario] = useState('');
  const [reportarProblema, setReportarProblema] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (puntuacion === 0) {
      setError('Por favor selecciona una calificación general');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      await ratingsAPI.create({
        reservaId: bookingId,
        puntuacion,
        puntualidad: puntualidad || undefined,
        conduccion: conduccion || undefined,
        vehiculo: vehiculo || undefined,
        trato: trato || undefined,
        comentario: comentario || undefined,
      });

      alert('¡Gracias por tu calificación!');
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error('Error al enviar calificación:', err);
      setError(err.response?.data?.message || 'Error al enviar la calificación');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({
    value,
    onChange,
    label,
  }: {
    value: number;
    onChange: (val: number) => void;
    label: string;
  }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={star <= value ? '#FFD700' : 'none'}
                stroke={star <= value ? '#FFD700' : '#D1D5DB'}
                strokeWidth={2}
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Calificar a ${conductorName}`}
      size="lg"
    >
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Calificación general */}
        <div className="text-center p-6 bg-primary-light rounded-lg">
          <StarRating
            value={puntuacion}
            onChange={setPuntuacion}
            label="Calificación General *"
          />
        </div>

        {/* Aspectos específicos */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Aspectos específicos (opcional)
          </h3>

          <StarRating
            value={puntualidad}
            onChange={setPuntualidad}
            label="Puntualidad"
          />

          <StarRating
            value={conduccion}
            onChange={setConduccion}
            label="Conducción"
          />

          <StarRating
            value={vehiculo}
            onChange={setVehiculo}
            label="Vehículo / Limpieza"
          />

          <StarRating value={trato} onChange={setTrato} label="Trato / Amabilidad" />
        </div>

        {/* Comentario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comentario (opcional)
          </label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            maxLength={500}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Comparte tu experiencia..."
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            {comentario.length}/500 caracteres
          </p>
        </div>

        {/* Reportar problema */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={reportarProblema}
              onChange={(e) => setReportarProblema(e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              Reportar un problema con este viaje
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Omitir por ahora
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || puntuacion === 0}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Enviando...
              </>
            ) : (
              'Enviar Calificación'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
