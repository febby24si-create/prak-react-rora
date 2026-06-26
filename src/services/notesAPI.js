import { supabase } from "./supabaseClient";

export const notesAPI = {
  async fetchNotes() {
    const { data, error } = await supabase.from("note").select("*").order("id", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createNote(data) {
    const { data: result, error } = await supabase.from("note").insert([data]).select().single();
    if (error) throw error;
    return result;
  },

  async deleteNote(id) {
    const { error } = await supabase.from("note").delete().eq("id", id);
    if (error) throw error;
  },
};