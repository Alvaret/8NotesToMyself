import React, { useState } from 'react';
import Header from '../components/common/Header';
import NotesPage from './NotesPage';
import CreateNotePage from './CreateNotePage';

const MainApp: React.FC = () => {
  const [page, setPage] = useState<'notes' | 'create'>('notes');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center">
      <Header onSelectPage={setPage} />
      {page === 'notes' && <NotesPage />}
      {page === 'create' && <CreateNotePage onNoteCreated={() => setPage('notes')} />}
    </div>
  );
};

export default MainApp;
