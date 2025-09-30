import React, { useState, useEffect } from 'react';
import { createNote } from '../lib/api/notes';
import { fetchCategories } from '../lib/api/notes_category';
import type { NotesCategory } from '../lib/api/notes_category';
import { supabase } from '../lib/supabaseClient';

const CreateNotePage: React.FC<{ onNoteCreated?: () => void }> = ({ onNoteCreated }) => {
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<NotesCategory[]>([]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch {}
    };
    getCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('No hay usuario autenticado');
      setLoading(false);
      return;
    }
    try {
      await createNote({
        content,
        is_private: isPrivate,
        user_id: user.id,
  category_id: categoryId || undefined
      });
      setContent('');
      if (onNoteCreated) onNoteCreated();
    } catch (err: any) {
      setError(err.message || 'Error al crear la nota');
    }
    setLoading(false);
  };

  return (
    <main className="w-full max-w-md px-2 py-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Crear nueva nota</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          className="w-full border rounded-xl p-3 bg-white/60 backdrop-blur-md text-gray-800"
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Escribe tu nota..."
          required
        />
        <label className="flex flex-col gap-1 text-sm">
          Categoría
          <select
            className="w-full border rounded-xl p-2 bg-white/60 backdrop-blur-md text-gray-800"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
          >
            <option value="">No tiene</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={e => setIsPrivate(e.target.checked)}
          />
          Nota privada (solo tú la ves)
        </label>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          disabled={loading || !content.trim()}
        >
          {loading ? 'Creando...' : 'Crear nota'}
        </button>
      </form>
    </main>
  );
};

export default CreateNotePage;
