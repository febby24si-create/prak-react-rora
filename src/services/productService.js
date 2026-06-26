import { supabase } from "./supabaseClient";

export const productService = {
  async fetchAll(includeInactive = false) {
    let query = supabase.from("products").select("*").order("created_at", { ascending: false });

    if (!includeInactive) {
      query = query.eq("status", true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async fetchById(id) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(product) {
    const { data, error } = await supabase.from("products").insert([product]).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, product) {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },
};
