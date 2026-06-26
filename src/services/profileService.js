import { supabase } from "./supabaseClient";

export const profileService = {
  async getProfile(user) {
    const userId = typeof user === "string" ? user : user?.id;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    if (data) return data;

    return this.createProfileForUser(user);
  },

  async createProfileForUser(user) {
    const userId = typeof user === "string" ? user : user?.id;
    const email = typeof user === "string" ? "" : user?.email || "";
    const fullName =
      typeof user === "string"
        ? ""
        : user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";

    if (!userId) {
      throw new Error("User id is required to create profile");
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        full_name: fullName,
        email,
        role: "member",
        point: 0,
        tier: "Bronze",
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getMembershipHistory(memberId) {
    const { data, error } = await supabase
      .from("membership_history")
      .select("*, orders(total, status)")
      .eq("member_id", memberId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getAllProfiles() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getTierInfo(tier) {
    const tiers = {
      Bronze: { min: 0, max: 199, color: "text-amber-700", bg: "bg-amber-100" },
      Silver: { min: 200, max: 499, color: "text-gray-600", bg: "bg-gray-100" },
      Gold: { min: 500, max: 999, color: "text-yellow-600", bg: "bg-yellow-100" },
      Platinum: { min: 1000, max: Infinity, color: "text-purple-600", bg: "bg-purple-100" },
    };
    return tiers[tier] || tiers.Bronze;
  },

  getNextTierInfo(currentTier) {
    const tiers = ["Bronze", "Silver", "Gold", "Platinum"];
    const idx = tiers.indexOf(currentTier);
    if (idx === -1 || idx === tiers.length - 1) return null;
    return {
      name: tiers[idx + 1],
      min: { Bronze: 200, Silver: 500, Gold: 1000 }[currentTier],
    };
  },
};
