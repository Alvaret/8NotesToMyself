import { supabase } from '../config/supabase';
import { ROUTES, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../constants';
import type { LoginFormData, RegisterFormData, ApiResponse } from '../../types';

export class AuthService {
  /**
   * Iniciar sesión con email y contraseña
   */
  static async signIn(credentials: LoginFormData): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        return {
          data: null,
          error: this.mapAuthError(error.message)
        };
      }

      return {
        data: data.user,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: ERROR_MESSAGES.GENERIC
      };
    }
  }

  /**
   * Registrar nuevo usuario
   */
  static async signUp(userData: RegisterFormData): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName || ''
          }
        }
      });

      if (error) {
        return {
          data: null,
          error: this.mapAuthError(error.message)
        };
      }

      return {
        data: data.user,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: ERROR_MESSAGES.GENERIC
      };
    }
  }

  /**
   * Cerrar sesión
   */
  static async signOut(): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          data: null,
          error: ERROR_MESSAGES.GENERIC
        };
      }

      return {
        data: null,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: ERROR_MESSAGES.GENERIC
      };
    }
  }

  /**
   * Obtener sesión actual
   */
  static async getCurrentSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        return null;
      }

      return data.session;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  /**
   * Obtener usuario actual
   */
  static async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error getting user:', error);
        return null;
      }

      return data.user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  /**
   * Recuperar contraseña
   */
  static async resetPassword(email: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return {
          data: null,
          error: this.mapAuthError(error.message)
        };
      }

      return {
        data: null,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: ERROR_MESSAGES.GENERIC
      };
    }
  }

  /**
   * Mapear errores de autenticación a mensajes amigables
   */
  private static mapAuthError(errorMessage: string): string {
    const errorMap: Record<string, string> = {
      'Invalid login credentials': ERROR_MESSAGES.INVALID_CREDENTIALS,
      'User not found': ERROR_MESSAGES.USER_NOT_FOUND,
      'Email already registered': ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
      'Password should be at least 6 characters': ERROR_MESSAGES.WEAK_PASSWORD
    };

    return errorMap[errorMessage] || ERROR_MESSAGES.GENERIC;
  }

  /**
   * Redirigir según el estado de autenticación
   */
  static redirectBasedOnAuth(isAuthenticated: boolean, currentPath: string) {
    if (typeof window === 'undefined') return;

    const isAuthPage = currentPath === ROUTES.LOGIN;
    const isDashboardPage = currentPath === ROUTES.DASHBOARD;

    if (isAuthenticated && isAuthPage) {
      setTimeout(() => {
        window.location.href = ROUTES.DASHBOARD;
      }, 100);
    } else if (!isAuthenticated && isDashboardPage) {
      setTimeout(() => {
        window.location.href = ROUTES.LOGIN;
      }, 100);
    }
  }
}
