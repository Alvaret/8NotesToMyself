import React, { useEffect, useState } from 'react';
import NoteCard from '../components/ui/NoteCard';
import { fetchNotes } from '../lib/api/notes';
import { fetchCategoriesMap } from '../lib/api/categories_map';
import type { Note } from '../lib/api/notes';
import type { NotesCategory } from '../lib/api/notes_category';
import { supabase } from '../lib/supabaseClient';

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Record<string, NotesCategory>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotesAndCategories = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      const cats = await fetchCategoriesMap();
      setCategories(cats);
      if (user) {
        const data = await fetchNotes(user.id);
        setNotes(data);
      }
      setLoading(false);
    };
    getNotesAndCategories();
  }, []);

  return (
    <main className="w-full max-w-md px-2 py-4 flex flex-col gap-2">
      {loading ? (
        <div className="text-center text-gray-400 py-8">Cargando notas...</div>
      ) : notes.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No hay notas aún.</div>
      ) : (
        notes.map(note => (
          <NoteCard key={note.id} note={note} category={note.category_id ? categories[note.category_id] : undefined} />
        ))
      )}
    </main>
  );
};

export default NotesPage;
