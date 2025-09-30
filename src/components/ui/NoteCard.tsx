
import React from 'react';
import type { Note } from '../../lib/api/notes';
import type { NotesCategory } from '../../lib/api/notes_category';

const NoteCard: React.FC<{ note: Note; category?: NotesCategory }> = ({ note, category }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-4 p-6 rounded-2xl shadow-2xl border border-white/30 bg-white/30 backdrop-blur-2xl flex flex-col gap-3"
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        border: '1px solid rgba(255,255,255,0.18)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(200,220,255,0.15) 100%)',
      }}
    >
      <div className="flex justify-between items-center">
        <span className="text-base sm:text-lg text-gray-900 font-medium break-words drop-shadow-lg">{note.content}</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400">{new Date(note.created_at).toLocaleDateString()}</span>
        <span className="text-xs text-gray-700 ml-2 flex items-center gap-1">
          {category && category.icon && (
            <span className="inline-block align-middle text-xl mr-1 drop-shadow-lg">{category.icon}</span>
          )}
          {category ? category.name : 'Sin categoría'}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
