import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthService } from '../../lib/auth/authService';
import { ROUTES } from '../../constants';
import Loading from '../ui/Loading';
import type { BaseComponentProps } from '../../types';

interface ProtectedRouteProps extends BaseComponentProps {
  redirectTo?: string;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = ROUTES.LOGIN,
  requireAuth = true,
  fallback
}) => {
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Solo hacer redirect si estamos en el navegador
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        AuthService.redirectBasedOnAuth(isAuthenticated, currentPath);
      }
    }
  }, [loading, isAuthenticated]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return fallback || (
      <Loading 
        fullScreen={true} 
        text="Verificando autenticación..." 
        size="lg"
      />
    );
  }

  // Si requiere autenticación pero no hay usuario
  if (requireAuth && !isAuthenticated) {
    return fallback || (
      <Loading 
        fullScreen={true} 
        text="Redirigiendo..." 
        size="lg"
      />
    );
  }

  // Si no requiere autenticación pero hay usuario (ej: página de login)
  if (!requireAuth && isAuthenticated) {
    return fallback || (
      <Loading 
        fullScreen={true} 
        text="Redirigiendo al dashboard..." 
        size="lg"
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
