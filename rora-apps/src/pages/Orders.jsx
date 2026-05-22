import { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiShoppingCart,
  FiMoreVertical,
  FiCalendar,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";
import PageHeader from "../components/PageHeader";

// ======================================================
// GENERATE 30 INITIAL ORDERS DATA
// ======================================================
const generateOrders = () => {
  const statuses = ["Pending", "Completed", "Cancelled"];
  const customers = [
    { id: 1, name: "Budi Santoso" },
    { id: 2, name: "Siti Aminah" },
    { id: 3, name: "Agus Wijaya" },
    { id: 4, name: "Dewi Kartika" },
    { id: 5, name: "Eko Prasetyo" },
  ];
  const orders = [];
  for (let i = 1; i <= 30; i++) {
    const cust = customers[i % customers.length];
    orders.push({
      orderId: `ORD-${1000 + i}`,
      customerId: cust.id,
      customerName: cust.name,
      status: statuses[i % 3],
      totalPrice: Math.floor(50000 + Math.random() * 450000),
      orderDate: `2026-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
    });
  }
  return orders;
};

const initialOrders = generateOrders();

// ======================================================
// STATUS STYLE CONFIGURATION
// ======================================================
const statusStyles = {
  Completed: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
  Pending: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    ring: "ring-amber-200",
  },
  Cancelled: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    ring: "ring-rose-200",
  },
};

// ======================================================
// MAIN COMPONENT
// ======================================================
export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    status: "Pending",
    totalPrice: "",
    orderDate: "",
  });

  const formatRupiah = (amount) =>
    `Rp ${Number(amount).toLocaleString("id-ID")}`;

  // ======================================================
  // FILTER SEARCH
  // ======================================================
  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(search.toLowerCase()) ||
    order.orderId.toLowerCase().includes(search.toLowerCase())
  );

  // ======================================================
  // ADD ORDER TRANSACTION
  // ======================================================
  const handleAddOrder = () => {
    if (!formData.customerId || !formData.customerName || !formData.totalPrice || !formData.orderDate) {
      alert("Harap isi semua field!");
      return;
    }

    const newOrder = {
      orderId: `ORD-${1000 + orders.length + 1}`,
      ...formData,
      totalPrice: Number(formData.totalPrice),
    };

    setOrders([newOrder, ...orders]);

    setFormData({
      customerId: "",
      customerName: "",
      status: "Pending",
      totalPrice: "",
      orderDate: "",
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-5">
      
      {/* ======================================================
          HEADER SECTION
      ====================================================== */}
      <PageHeader title="Order List" breadcrumb="Manage all restaurant orders">
        <button
          onClick={() => setShowModal(true)}
          className="
            flex items-center gap-2
            bg-hijau hover:bg-green-600
            text-white
            px-4 py-2.5
            rounded-2xl
            text-sm font-semibold
            shadow-lg shadow-green-100
            transition-all duration-200
          "
        >
          <FiPlus />
          Add Orders
        </button>
      </PageHeader>

      {/* ======================================================
          STATS CARDS SECTION
      ====================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Orders</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">
                {orders.length}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-hijau flex items-center justify-center text-2xl">
              <FiShoppingCart />
            </div>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Completed Orders</p>
              <h2 className="text-3xl font-extrabold text-emerald-600 mt-1">
                {orders.filter((o) => o.status === "Completed").length}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
              ✅
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Pending Processing</p>
              <h2 className="text-3xl font-extrabold text-amber-500 mt-1">
                {orders.filter((o) => o.status === "Pending").length} <span className="text-sm font-medium text-gray-400">trx</span>
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center text-xl">
              ⏳
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          TABLE CONTAINER CARD
      ====================================================== */}
      <div
        className="
          bg-white rounded-[28px]
          border border-gray-100
          shadow-[0_4px_24px_rgba(0,0,0,0.04)]
          overflow-hidden
        "
      >
        {/* Table Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-100">
          <div>
            <h2 className="text-[20px] font-extrabold text-gray-800">Transaction Registry</h2>
            <p className="text-sm text-gray-400 mt-1">Monitor sales data, status and invoices</p>
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search customer or Order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full bg-gray-50 border border-gray-200 rounded-2xl
                py-3 pl-11 pr-4 text-sm outline-none focus:border-hijau transition
              "
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Responsive Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                {["Order ID", "Customer Details", "Status", "Total Price", "Order Date", "Action"].map((head) => (
                  <th
                    key={head}
                    className="text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-sm text-gray-400">
                    Belum ada data transaksi order yang cocok dengan kriteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const badgeStyle = statusStyles[order.status] || { bg: "bg-gray-100", text: "text-gray-700", ring: "ring-gray-200" };

                  return (
                    <tr key={order.orderId} className="hover:bg-gray-50/70 transition-colors">
                      
                      {/* ORDER ID */}
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-gray-800 text-sm">
                          {order.orderId}
                        </span>
                      </td>

                      {/* CUSTOMER INFO */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center text-sm">
                            <FiUser />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{order.customerName}</p>
                            <p className="text-xs text-gray-400 mt-0.5">UID #{String(order.customerId).padStart(3, "0")}</p>
                          </div>
                        </div>
                      </td>

                      {/* BADGE STATUS */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ring-1 ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.ring}`}>
                          {order.status}
                        </span>
                      </td>

                      {/* TOTAL INVOICE */}
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-gray-800">{formatRupiah(order.totalPrice)}</span>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                          <FiCalendar />
                          {order.orderDate}
                        </div>
                      </td>

                      {/* QUICK ACTION ROW CONTROLLER */}
                      <td className="px-6 py-4">
                        <button className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition">
                          <FiMoreVertical size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================================
          MODAL ADD NEW ORDER ENTRY
      ====================================================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-7 animate-[fadeIn_.25s_ease]">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Create New Order</h2>
            <p className="text-sm text-gray-400 mb-6">Input customer transaction log parameters</p>

            <div className="space-y-4">
              
              <input
                type="text"
                placeholder="Customer ID (e.g., 5)"
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
              />

              <input
                type="text"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
              />

              <div className="grid grid-cols-1 gap-4">
                <input
                  type="number"
                  placeholder="Total Price (IDR)"
                  value={formData.totalPrice}
                  onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
                />
              </div>

              <input
                type="date"
                value={formData.orderDate}
                onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-500 outline-none focus:border-hijau"
              />

              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddOrder}
                className="flex-1 bg-hijau hover:bg-green-600 text-white py-3 rounded-2xl text-sm font-bold transition shadow-md shadow-green-100"
              >
                Save Transaction
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-bold transition"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}