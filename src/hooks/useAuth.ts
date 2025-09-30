import { useState, useEffect } from 'react';
import { supabase } from '../lib/config/supabase';
import { AuthService } from '../lib/auth/authService';
import type { AuthState } from '../types';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  });

  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      const session = await AuthService.getCurrentSession();
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false
      });
    };

    getInitialSession();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true }));
    const result = await AuthService.signOut();
    setAuthState(prev => ({ ...prev, loading: false }));
    return result;
  };

  return {
    ...authState,
    signOut,
    isAuthenticated: !!authState.user
  };
}
