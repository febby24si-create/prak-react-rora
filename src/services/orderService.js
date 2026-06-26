import { supabase } from "./supabaseClient";

export const orderService = {
  async fetchAll() {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*), profiles:member_id(full_name, email)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async fetchByMember(memberId) {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(name, price))")
      .eq("member_id", memberId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async fetchById(id) {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(name, price, image_url))")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(orderData, items) {
    // Hitung total
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([{ ...orderData, total }])
      .select()
      .single();
    if (orderError) throw orderError;

    // Insert order_items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      qty: item.qty,
      price: item.price,
      subtotal: item.price * item.qty,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) throw itemsError;

    return order;
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;

    // Jika status Selesai, tambahkan point
    if (status === "Selesai") {
      const { error: pointError } = await supabase.rpc("add_order_points", {
        p_order_id: id,
        p_member_id: data.member_id,
        p_total: data.total,
      });
      if (pointError) console.error("Gagal menambah point:", pointError.message);
    }

    return data;
  },

  async delete(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw error;
  },
};
