// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  LOGOUT: '/logout'
} as const;

// Configuración de UI
export const UI_CONFIG = {
  LOADING_DELAY: 300,
  TOAST_DURATION: 5000,
  REDIRECT_DELAY: 300,
  ANIMATION_DURATION: 200
} as const;

// Configuración de Supabase
export const SUPABASE_CONFIG = {
  TABLES: {
    PROFILES: 'profiles'
  },
  BUCKETS: {
    AVATARS: 'avatars'
  }
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  GENERIC: 'Ha ocurrido un error inesperado',
  NETWORK: 'Error de conexión. Verifica tu internet',
  AUTH_REQUIRED: 'Debes iniciar sesión para continuar',
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  USER_NOT_FOUND: 'Usuario no encontrado',
  EMAIL_ALREADY_EXISTS: 'El email ya está registrado',
  WEAK_PASSWORD: 'La contraseña debe tener al menos 6 caracteres'
} as const;

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  LOGIN: 'Sesión iniciada correctamente',
  LOGOUT: 'Sesión cerrada correctamente',
  REGISTER: 'Cuenta creada exitosamente',
  UPDATE_PROFILE: 'Perfil actualizado correctamente'
} as const;
