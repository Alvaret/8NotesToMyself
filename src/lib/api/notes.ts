import { supabase } from '../supabaseClient';

export interface Note {
  id: string;
  content: string;
  is_private: boolean;
  user_id: string;
  created_at: string;
  category_id?: string;
  created_by?: string;
  by?: string;
}

export async function fetchNotes(userId: string) {
  // Notas propias y públicas
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .or(`user_id.eq.${userId},is_private.eq.false`)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Note[];
}

export async function createNote({ content, is_private, user_id, category_id, by }: {
  content: string;
  is_private?: boolean;
  user_id: string;
  category_id?: string;
  by?: string;
}) {
  const { data, error } = await supabase.from('notes').insert({
    content,
    is_private: is_private ?? true,
    user_id,
    created_by: user_id,
    category_id,
    by
  }).select();
  if (error) throw error;
  return data;
}
