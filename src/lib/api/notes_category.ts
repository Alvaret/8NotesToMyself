import { supabase } from '../supabaseClient';

export interface NotesCategory {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  description?: string;
  is_default?: boolean;
}

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('notes_category')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data as NotesCategory[];
}
