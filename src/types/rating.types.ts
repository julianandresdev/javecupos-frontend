// src/types/rating.types.ts
export interface Rating {
  id: number;
  reservaId: number;
  calificadorId: number;
  calificadoId: number;
  puntuacion: number; // 1-5
  comentario?: string;
  puntualidad?: number;
  conduccion?: number;
  vehiculo?: number;
  trato?: number;
  createdAt: string;
}

export interface CreateRatingData {
  reservaId: number;
  puntuacion: number;
  comentario?: string;
  puntualidad?: number;
  conduccion?: number;
  vehiculo?: number;
  trato?: number;
}
