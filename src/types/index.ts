import type { User, Session } from '@supabase/supabase-js';

// Tipos de autenticación
export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

// Tipos de perfil
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

// Tipos de respuesta de API
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading?: boolean;
}

// Tipos de props comunes
export interface BaseComponentProps {
  className?: string;
  children?: any;
}

// Tipos de loading
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

// Tipos de formularios
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  confirmPassword: string;
  fullName?: string;
}
