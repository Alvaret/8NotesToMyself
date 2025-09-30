import React, { useState } from 'react';
import { AuthService } from '../../lib/auth/authService';
import { ROUTES, SUCCESS_MESSAGES } from '../../constants';
import { isValidEmail, isValidPassword } from '../../lib/utils';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Loading from '../ui/Loading';
import type { LoginFormData } from '../../types';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [generalError, setGeneralError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setGeneralError('');
    setSuccessMsg('');

    try {
      const { data, error } = await AuthService.signIn(formData);

      if (error) {
        setGeneralError(error);
      } else {
        setSuccessMsg(SUCCESS_MESSAGES.LOGIN);
        setTimeout(() => {
          window.location.href = ROUTES.DASHBOARD;
        }, 1000);
      }
    } catch (error) {
      setGeneralError('Error inesperado. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="text-gray-600">Accede a tu cuenta de 8Financial</p>
        </div>

        <div className="space-y-5">
          <Input
            type="email"
            label="Email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            disabled={loading}
            required
            className="transition-all duration-200 focus:scale-[1.02]"
          />

          <Input
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            disabled={loading}
            required
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        <div className="space-y-4">
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            fullWidth
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>

          {loading && (
            <div className="flex justify-center">
              <Loading size="sm" text="Autenticando..." />
            </div>
          )}
        </div>

        {generalError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
            <p className="text-red-700 text-sm text-center font-medium">{generalError}</p>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-bounce">
            <p className="text-green-700 text-sm text-center font-medium">{successMsg}</p>
          </div>
        )}

        <div className="text-center pt-4 border-t border-gray-100">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
            disabled={loading}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
