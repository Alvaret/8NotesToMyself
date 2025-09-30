import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES, SUCCESS_MESSAGES } from '../../constants';
import Button from '../ui/Button';

const LogoutButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    
    try {
      const { error } = await signOut();
      
      if (!error) {
        // Pequeño delay para que el evento se propague
        setTimeout(() => {
          window.location.href = ROUTES.HOME;
        }, 300);
      } else {
        console.error('Error during logout:', error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      setLoading(false);
    }
  };

  return (
    <Button
      variant="danger"
      size="md"
      onClick={handleLogout}
      loading={loading}
      disabled={loading}
    >
      {loading ? 'Cerrando...' : 'Cerrar sesión'}
    </Button>
  );
};

export default LogoutButton;
