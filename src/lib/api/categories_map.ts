import { supabase } from '../supabaseClient';
import type { NotesCategory } from './notes_category';

export async function fetchCategoriesMap(): Promise<Record<string, NotesCategory>> {
  const { data, error } = await supabase
    .from('notes_category')
    .select('*');
  if (error) throw error;
  const map: Record<string, NotesCategory> = {};
  (data || []).forEach((cat: NotesCategory) => {
    map[cat.id] = cat;
  });
  return map;
}
