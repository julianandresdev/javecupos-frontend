

export enum CupoStatus {
  DISPONIBLE = 'Disponible',
  EN_CURSO = 'En curso',
  COMPLETADO = 'Completado',
  CANCELADO = 'Cancelado',
}

// Lista completa de barrios (simplificada aquí, usa la del backend)
export enum CupoBarrios {
  TERRON_COLORADO = 'Terrón Colorado',
  VISTA_HERMOSA = 'Vista Hermosa',
  // ... agregar todos los demás barrios del enum del backend
}

export interface Cupo {
  id: number;
  conductorId: number;
  conductor?: {
    id: number;
    name: string;
    avatar?: string;
    rate: number;
    phone: string;
  };
  destino: CupoBarrios;
  descripcion?: string;
  asientosTotales: number;
  asientosDisponibles: number;
  horaSalida: Date;
  horaLlegadaEstimada?: Date;
  precio: number;
  estado: CupoStatus;
  activo: boolean;
  puntoEncuentro: string;
  telefonoContacto?: string;
  createdAt: Date;
  updatedAt: Date;
}
