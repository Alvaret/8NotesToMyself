
import React from 'react';
import LogoutButton from '../auth/LogoutButton';

const Header: React.FC<{ onSelectPage?: (page: 'notes' | 'create') => void }> = ({ onSelectPage }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gradient">Notas</h1>
            </div>
          </div>
          {/* Navegación */}
          <div className="flex items-center space-x-4">
            <button
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white"
              onClick={() => onSelectPage && onSelectPage('notes')}
            >
              Ver notas
            </button>
            <button
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 text-white"
              onClick={() => onSelectPage && onSelectPage('create')}
            >
              Crear nota
            </button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
