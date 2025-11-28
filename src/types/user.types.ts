export enum UserRole {
  ADMIN = 'administrador',
  DRIVER = 'conductor',
  USER = 'usuario',
}

export enum UserStatus {
  ACTIVE = 'activo',
  INACTIVE = 'inactivo',
  PENDING = 'pendiente',
  SUSPENDED = 'suspendido',
  BANNED = 'baneado',
  DELETED = 'eliminado',
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  online: boolean;
  avatar?: string;
  age: number;
  role: UserRole;
  status: UserStatus;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  role: UserRole;
  avatar?: string;
}

export interface AuthResponse {
  access_token: string;
}
