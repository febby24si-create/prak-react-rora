import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPackage, FiShoppingCart, FiAward, FiStar, FiTrendingUp } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { profileService } from "../services/profileService";
import { orderService } from "../services/orderService";
import PageHeader from "../components/PageHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const tierColors = {
  Bronze: { bg: "bg-amber-100", text: "text-amber-700", bar: "bg-amber-500", icon: "🥉" },
  Silver: { bg: "bg-gray-100", text: "text-gray-600", bar: "bg-gray-400", icon: "🥈" },
  Gold: { bg: "bg-yellow-100", text: "text-yellow-600", bar: "bg-yellow-500", icon: "🥇" },
  Platinum: { bg: "bg-purple-100", text: "text-purple-600", bar: "bg-purple-500", icon: "💎" },
};

export default function MemberDashboard() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!profile?.id) return;
      try {
        const [orderData, historyData] = await Promise.all([
          orderService.fetchByMember(profile.id),
          profileService.getMembershipHistory(profile.id),
        ]);
        setOrders(orderData || []);
        setHistory(historyData || []);
      } catch (err) {
        console.error("Gagal memuat data member:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [profile?.id]);

  const tier = profile?.tier || "Bronze";
  const point = profile?.point || 0;
  const tierInfo = tierColors[tier] || tierColors.Bronze;
  const nextTier = profileService.getNextTierInfo(tier);
  const progress = nextTier ? Math.min((point / nextTier.min) * 100, 100) : 100;

  const rp = (n) => "Rp " + Number(n).toLocaleString("id-ID");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-hijau border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <PageHeader title="Member Dashboard" breadcrumb="Welcome back, member!" />

      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Profile Card */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm col-span-1 md:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || "User")}&background=00b074&color=fff&bold=true&size=80`}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-hijau ring-offset-2"
            />
            <div>
              <h2 className="text-xl font-extrabold text-gray-800">{profile?.full_name || "Member"}</h2>
              <p className="text-sm text-gray-400">{profile?.email}</p>
              <span className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-bold ${tierInfo.bg} ${tierInfo.text}`}>
                <span>{tierInfo.icon}</span>
                {tier}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Points Card */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Your Points</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">{point}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl">
              <FiStar />
            </div>
          </div>
          {nextTier && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{tier} ({point} pts)</span>
                <span>{nextTier.name} ({nextTier.min} pts)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${tierInfo.bar}`}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{nextTier.min - point} pts lagi ke {nextTier.name}</p>
            </div>
          )}
          {!nextTier && (
            <p className="text-xs text-gray-400 mt-2">Tier tertinggi tercapai! 🎉</p>
          )}
        </motion.div>

        {/* Total Orders */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Orders</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">{orders.length}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-hijau flex items-center justify-center text-2xl">
              <FiShoppingCart />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Orders */}
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-800">Recent Orders</h2>
          <p className="text-sm text-gray-400 mt-1">Your transaction history</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Order ID</th>
                <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Total</th>
                <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Status</th>
                <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Points</th>
                <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-sm text-gray-400">
                    Belum ada pesanan.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const statusColors = {
                    Pending: "bg-amber-100 text-amber-700 ring-amber-200",
                    Diproses: "bg-blue-100 text-blue-700 ring-blue-200",
                    Selesai: "bg-emerald-100 text-emerald-700 ring-emerald-200",
                    Dibatalkan: "bg-rose-100 text-rose-700 ring-rose-200",
                  };
                  const sc = statusColors[order.status] || "bg-gray-100 text-gray-700 ring-gray-200";
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-gray-800 text-sm">#{order.id?.slice(0, 8)}</td>
                      <td className="px-6 py-4 font-extrabold text-gray-800">{rp(order.total)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ring-1 ${sc}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-700">+{order.point_earned || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Membership History */}
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-800">Points History</h2>
          <p className="text-sm text-gray-400 mt-1">Track your membership points</p>
        </div>
        <div className="divide-y divide-gray-100 px-6 py-2">
          {history.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">Belum ada riwayat poin.</p>
          ) : (
            history.map((h) => (
              <div key={h.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-100 text-hijau flex items-center justify-center text-sm">
                    <FiTrendingUp />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{h.description}</p>
                    <p className="text-xs text-gray-400">{new Date(h.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-hijau">+{h.point} pts</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
