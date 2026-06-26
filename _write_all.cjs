const fs = require("fs");
const path = require("path");

function writeFile(relPath, content) {
  fs.writeFileSync(path.join(__dirname, relPath), content, "utf8");
  console.log("Written:", relPath);
}

// ============================
// CUSTOMER.jsx — Full CRUD Supabase
// ============================
writeFile("src/pages/Customer.jsx", `import { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiMail,
  FiPhone,
  FiUsers,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiX,
  FiMapPin,
} from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { customerService } from "../services/customerService";

const initForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  status: true,
};

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initForm);

  const load = async () => {
    setLoading(true);
    try {
      const data = await customerService.fetchAll();
      setCustomers(data || []);
    } catch (err) {
      console.error("Gagal memuat customer:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const filt = customers.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditTarget(null);
    setForm(initForm);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditTarget(c);
    setForm({
      name: c.name || "",
      email: c.email || "",
      phone: c.phone || "",
      address: c.address || "",
      status: c.status !== false,
    });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.name) {
      alert("Nama customer harus diisi!");
      return;
    }
    try {
      const payload = { ...form };
      if (editTarget) {
        await customerService.update(editTarget.id, payload);
      } else {
        await customerService.create(payload);
      }
      setShowModal(false);
      setEditTarget(null);
      setForm(initForm);
      load();
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  const del = async (id) => {
    if (!confirm("Yakin hapus customer ini?")) return;
    try {
      await customerService.delete(id);
      load();
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  const toggleStatus = async (c) => {
    try {
      await customerService.update(c.id, { status: !c.status });
      load();
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Customers" breadcrumb="Manage customer data">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-hijau hover:bg-green-600 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-green-100 transition-all duration-200"
        >
          <FiPlus />
          Add Customer
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Customers</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">{customers.length}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-hijau flex items-center justify-center text-2xl">
              <FiUsers />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Active Customers</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">
                {customers.filter((c) => c.status !== false).length}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Orders</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">-</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center text-2xl">
              📦
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-100">
          <div>
            <h2 className="text-[20px] font-extrabold text-gray-800">Customer List</h2>
            <p className="text-sm text-gray-400 mt-1">Manage all customer information</p>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-hijau transition"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                {["Customer", "Email", "Phone", "Address", "Status", "Action"].map((head) => (
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
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-sm text-gray-400">
                    Memuat data...
                  </td>
                </tr>
              ) : filt.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-sm text-gray-400">
                    Belum ada data customer.
                  </td>
                </tr>
              ) : (
                filt.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={\`https://ui-avatars.com/api/?name=\${encodeURIComponent(c.name)}&background=00b074&color=fff&bold=true\`}
                          alt=""
                          className="w-11 h-11 rounded-2xl object-cover"
                        />
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{c.name}</p>
                          <p className="text-xs text-gray-400 mt-1">ID #{(c.id || "").slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FiMail className="text-gray-400" />
                        {c.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FiPhone className="text-gray-400" />
                        {c.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FiMapPin className="text-gray-400" />
                        <span className="truncate max-w-[150px]">{c.address || "-"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(c)}
                        className={\`px-3 py-1.5 rounded-full text-xs font-bold ring-1 transition \${
                          c.status !== false
                            ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
                            : "bg-rose-100 text-rose-700 ring-rose-200"
                        }\`}
                      >
                        {c.status !== false ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => del(c.id)}
                          className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"
                        >
                          <FiTrash2 size={15} />
                        </button>
                        <button className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition">
                          <FiMoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">
                  {editTarget ? "Edit Customer" : "Add New Customer"}
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">Fill customer information below</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <FiX size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
              />
              <textarea
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau resize-none"
                rows={2}
              />
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.checked })}
                  className="rounded border-gray-300 text-hijau focus:ring-hijau"
                />
                Active
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={save}
                className="flex-1 bg-hijau hover:bg-green-600 text-white py-3 rounded-2xl text-sm font-bold transition"
              >
                {editTarget ? "Update Customer" : "Save Customer"}
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
`);

// ============================
// ORDERS.jsx — Full CRUD Supabase
// ============================
writeFile("src/pages/Orders.jsx", `import { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiShoppingCart,
  FiMoreVertical,
  FiCalendar,
  FiUser,
  FiX,
  FiCheck,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { orderService } from "../services/orderService";
import { productService } from "../services/productService";
import { useAuth } from "../contexts/AuthContext";

const statusColors = {
  Pending: "bg-amber-100 text-amber-700 ring-amber-200",
  Diproses: "bg-blue-100 text-blue-700 ring-blue-200",
  Selesai: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Dibatalkan: "bg-rose-100 text-rose-700 ring-rose-200",
};

const statusIcons = {
  Pending: <FiClock size={14} />,
  Diproses: <FiCheck size={14} />,
  Selesai: <FiCheck size={14} />,
  Dibatalkan: <FiXCircle size={14} />,
};

const initForm = {
  member_id: "",
  status: "Pending",
};

export default function Orders() {
  const { isAdmin, profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusTarget, setStatusTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initForm);
  const [cart, setCart] = useState([{ product_id: "", qty: 1 }]);

  const rp = (n) => "Rp " + Number(n).toLocaleString("id-ID");

  const load = async () => {
    setLoading(true);
    try {
      let data;
      if (isAdmin) {
        data = await orderService.fetchAll();
      } else {
        data = await orderService.fetchByMember(profile?.id);
      }
      setOrders(data || []);
      const p = await productService.fetchAll(true);
      setProducts(p || []);
    } catch (err) {
      console.error("Gagal memuat pesanan:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, [isAdmin, profile?.id]);

  const filt = orders.filter(
    (o) =>
      (o.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.profiles?.full_name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const calcTotal = () => {
    return cart.reduce((sum, item) => {
      const p = products.find((x) => x.id === item.product_id);
      return sum + (p ? p.price * (item.qty || 1) : 0);
    }, 0);
  };

  const openAdd = () => {
    setForm({ ...initForm, member_id: profile?.id || "" });
    setCart([{ product_id: "", qty: 1 }]);
    setShowModal(true);
  };

  const addCartRow = () => setCart([...cart, { product_id: "", qty: 1 }]);

  const updateCart = (idx, field, value) => {
    const updated = cart.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setCart(updated);
  };

  const removeCartRow = (idx) => {
    if (cart.length === 1) return;
    setCart(cart.filter((_, i) => i !== idx));
  };

  const save = async () => {
    const validItems = cart.filter((item) => item.product_id);
    if (validItems.length === 0) {
      alert("Pilih minimal 1 produk!");
      return;
    }
    try {
      const items = validItems.map((item) => {
        const p = products.find((x) => x.id === item.product_id);
        return {
          product_id: item.product_id,
          qty: item.qty || 1,
          price: p ? p.price : 0,
        };
      });
      await orderService.create(form, items);
      setShowModal(false);
      load();
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  const updateStatus = async () => {
    if (!statusTarget) return;
    try {
      const statusMap = {
        Pending: "Diproses",
        Diproses: "Selesai",
        Selesai: "Selesai",
        Dibatalkan: "Dibatalkan",
      };
      const nextStatus = statusMap[statusTarget.status] || "Selesai";
      await orderService.updateStatus(statusTarget.id, nextStatus);
      setShowStatusModal(false);
      setStatusTarget(null);
      load();
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  const cancelOrder = async (order) => {
    if (!confirm("Batalkan pesanan ini?")) return;
    try {
      await orderService.updateStatus(order.id, "Dibatalkan");
      load();
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  const del = async (id) => {
    if (!confirm("Yakin hapus pesanan ini?")) return;
    try {
      await orderService.delete(id);
      load();
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status === "Selesai")
    .reduce((a, b) => a + Number(b.total || 0), 0);

  return (
    <div className="space-y-5">
      <PageHeader title="Order List" breadcrumb="Manage all restaurant orders">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-hijau hover:bg-green-600 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-green-100 transition-all duration-200"
        >
          <FiPlus />
          Add Order
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Orders</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">{orders.length}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-hijau flex items-center justify-center text-2xl">
              <FiShoppingCart />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Completed</p>
              <h2 className="text-3xl font-extrabold text-emerald-600 mt-1">
                {orders.filter((o) => o.status === "Selesai").length}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
              ✅
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Revenue</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">{rp(totalRevenue)}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-xl">
              💰
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-100">
          <div>
            <h2 className="text-[20px] font-extrabold text-gray-800">Transaction Registry</h2>
            <p className="text-sm text-gray-400 mt-1">Monitor sales data, status and invoices</p>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-hijau transition"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                {["Order ID", "Customer", "Status", "Total", "Points", "Date", "Action"].map((head) => (
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-sm text-gray-400">
                    Memuat data...
                  </td>
                </tr>
              ) : filt.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-sm text-gray-400">
                    Belum ada data pesanan.
                  </td>
                </tr>
              ) : (
                filt.map((order) => {
                  const sc = statusColors[order.status] || "bg-gray-100 text-gray-700 ring-gray-200";
                  const si = statusIcons[order.status] || null;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-gray-800 text-sm">
                          #{(order.id || "").slice(0, 8)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center text-sm">
                            <FiUser />
                          </div>
                          <span className="font-bold text-gray-800 text-sm">
                            {order.profiles?.full_name || "Member"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            if (!isAdmin) return;
                            setStatusTarget(order);
                            setShowStatusModal(true);
                          }}
                          className={\`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ring-1 \${sc} \${
                            isAdmin ? "hover:ring-2 cursor-pointer" : "cursor-default"
                          }\`}
                        >
                          {si}
                          {order.status}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-gray-800">{rp(order.total)}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-hijau">
                        +{order.point_earned || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                          <FiCalendar />
                          {new Date(order.created_at).toLocaleDateString("id-ID")}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {isAdmin && order.status === "Pending" && (
                            <button
                              onClick={() => cancelOrder(order)}
                              className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition"
                              title="Batalkan"
                            >
                              <FiX size={14} />
                            </button>
                          )}
                          {isAdmin && (
                            <button
                              onClick={() => del(order.id)}
                              className="w-8 h-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"
                              title="Hapus"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-7 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">Create New Order</h2>
                <p className="text-sm text-gray-400 mt-0.5">Select products and quantities</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <FiX size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="text-xs text-gray-400 font-medium mb-1 block">Product</label>
                    <select
                      value={item.product_id}
                      onChange={(e) => updateCart(idx, "product_id", e.target.value)}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau bg-white"
                    >
                      <option value="">-- Pilih Produk --</option>
                      {products
                        .filter((p) => p.status !== false)
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} - {rp(p.price)} (Stock: {p.stock})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-20">
                    <label className="text-xs text-gray-400 font-medium mb-1 block">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateCart(idx, "qty", parseInt(e.target.value) || 1)}
                      className="w-full border border-gray-200 rounded-2xl px-3 py-3 text-sm outline-none focus:border-hijau text-center"
                    />
                  </div>
                  <button
                    onClick={() => removeCartRow(idx)}
                    className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition flex-shrink-0"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={addCartRow}
                className="w-full py-2 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-400 hover:border-hijau hover:text-hijau transition"
              >
                + Add Product
              </button>
              <div className="text-right">
                <p className="text-sm text-gray-400">
                  Total: <span className="font-extrabold text-gray-800 text-lg">{rp(calcTotal())}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={save}
                className="flex-1 bg-hijau hover:bg-green-600 text-white py-3 rounded-2xl text-sm font-bold transition"
              >
                Create Order
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

      {showStatusModal && statusTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-7">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Update Status</h2>
            <p className="text-sm text-gray-400 mb-6">
              #{statusTarget.id.slice(0, 8)} - Current: {statusTarget.status}
            </p>
            <div className="space-y-3">
              {["Pending", "Diproses", "Selesai", "Dibatalkan"].map((s) => {
                const sc = statusColors[s] || "";
                return (
                  <button
                    key={s}
                    onClick={async () => {
                      try {
                        await orderService.updateStatus(statusTarget.id, s);
                        setShowStatusModal(false);
                        setStatusTarget(null);
                        load();
                      } catch (err) {
                        alert("Gagal: " + err.message);
                      }
                    }}
                    className={\`w-full py-3 rounded-2xl text-sm font-bold transition hover:ring-2 \${
                      statusTarget.status === s
                        ? sc + " ring-2 ring-offset-1"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }\`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => {
                setShowStatusModal(false);
                setStatusTarget(null);
              }}
              className="w-full mt-4 py-3 rounded-2xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
`);

// ============================
// DASHBOARD.jsx — Real data from Supabase
// ============================
writeFile("src/pages/Dashboard.jsx", `import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUtensils,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { supabase } from "../services/supabaseClient";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

function DonutChart({ value, color, track = "#f1f5f9", size = 120, sw = 10 }) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)", display: "block" }}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={sw} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        initial={{ strokeDasharray: \`0 \${circ}\` }}
        whileInView={{ strokeDasharray: \`\${dash} \${circ}\` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </svg>
  );
}

function AreaChart({ data }) {
  const W = 500;
  const H = 200;
  const pad = { t: 20, r: 20, b: 35, l: 35 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;

  const max = Math.max(...data.map((d) => d.v)) * 1.15;
  const xs = data.map((_, i) => pad.l + (i / (data.length - 1)) * iw);
  const ys = data.map((d) => pad.t + ih - (d.v / max) * ih);

  const linePath = xs
    .map((x, i) => \`\${i === 0 ? "M" : "L"}\${x.toFixed(1)},\${ys[i].toFixed(1)}\`)
    .join(" ");
  const areaPath = \`\${linePath} L\${xs[xs.length - 1].toFixed(1)},\${(pad.t + ih).toFixed(1)} L\${pad.l},\${(pad.t + ih).toFixed(1)} Z\`;

  return (
    <motion.svg
      viewBox={\`0 0 \${W} \${H}\`}
      className="w-full h-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.00" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((p, idx) => (
        <line
          key={idx}
          x1={pad.l}
          y1={pad.t + ih * p}
          x2={W - pad.r}
          y2={pad.t + ih * p}
          stroke="#e2e8f0"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
      ))}
      <motion.path
        d={areaPath}
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true }}
      />
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r="4" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
      ))}
      {data.map((d, i) => (
        <text
          key={i}
          x={xs[i]}
          y={H - 10}
          textAnchor="middle"
          className="text-[11px] fill-gray-400 font-medium"
        >
          {d.day}
        </text>
      ))}
    </motion.svg>
  );
}

function TrendUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrendDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    pendingOrders: 0,
  });
  const [areaData, setAreaData] = useState(weekDays.map((day) => ({ day, v: 0 })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [ordersRes, customersRes, productsRes] = await Promise.all([
          supabase.from("orders").select("total, status, created_at"),
          supabase.from("customers").select("id", { count: "exact", head: true }),
          supabase.from("products").select("id", { count: "exact", head: true }),
        ]);

        const orders = ordersRes.data || [];
        const totalOrders = orders.length;
        const completedOrders = orders.filter((o) => o.status === "Selesai").length;
        const canceledOrders = orders.filter((o) => o.status === "Dibatalkan").length;
        const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Diproses").length;
        const totalRevenue = orders
          .filter((o) => o.status === "Selesai")
          .reduce((a, b) => a + Number(b.total || 0), 0);

        const dailyTotals = weekDays.map((day, i) => {
          const today = new Date();
          const target = new Date(today);
          target.setDate(today.getDate() - (6 - i));
          const dayStr = target.toISOString().slice(0, 10);
          const dayOrders = orders.filter((o) => {
            const d = o.created_at ? o.created_at.slice(0, 10) : "";
            return d === dayStr;
          });
          return {
            day,
            v: dayOrders.filter((o) => o.status === "Selesai").reduce((a, b) => a + Number(b.total || 0), 0),
          };
        });

        setStats({
          totalOrders,
          completedOrders,
          canceledOrders,
          totalRevenue,
          totalCustomers: customersRes.count || 0,
          totalProducts: productsRes.count || 0,
          pendingOrders,
        });
        setAreaData(dailyTotals);
      } catch (err) {
        console.error("Gagal memuat dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const rp = (n) => "Rp " + Number(n).toLocaleString("id-ID");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-hijau border-t-transparent rounded-full" />
      </div>
    );
  }

  const statCards = [
    { Icon: FaShoppingCart, value: stats.totalOrders.toString(), label: "Total Orders", trend: "", up: true, iconBg: "bg-emerald-500", textBg: "text-emerald-500" },
    { Icon: FaTruck, value: stats.completedOrders.toString(), label: "Completed", trend: `${stats.pendingOrders} pending`, up: true, iconBg: "bg-blue-500", textBg: "text-blue-500" },
    { Icon: FaBan, value: stats.canceledOrders.toString(), label: "Canceled", trend: "", up: false, iconBg: "bg-rose-500", textBg: "text-rose-500" },
    { Icon: FaDollarSign, value: rp(stats.totalRevenue), label: "Total Revenue", trend: "", up: true, iconBg: "bg-amber-500", textBg: "text-amber-500" },
  ];

  const donuts = [
    { label: "Completion Rate", value: stats.totalOrders > 0 ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0, color: "#f43f5e", track: "#ffe4e6" },
    { label: "Customers", value: stats.totalCustomers > 0 ? Math.min(stats.totalCustomers, 100) : 0, color: "#10b981", track: "#d1fae5" },
    { label: "Products", value: stats.totalProducts > 0 ? Math.min(stats.totalProducts, 100) : 0, color: "#3b82f6", track: "#dbeafe" },
  ];

  const miniStats = [
    { label: "Total Products", value: stats.totalProducts.toString(), trend: "", icon: FaUtensils, color: "text-amber-500" },
    { label: "Customers", value: stats.totalCustomers.toString(), trend: "", icon: FaUsers, color: "text-blue-500" },
    { label: "Pending Orders", value: stats.pendingOrders.toString(), trend: "", icon: FaChartLine, color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader title="Dashboard" breadcrumb="Admin overview & analytics" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {statCards.map(({ Icon, value, label, trend, up, iconBg, textBg }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)" }}
            className="bg-white rounded-2xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm"
          >
            <div className={\`w-14 h-14 rounded-2xl \${iconBg} flex items-center justify-center shadow-md shadow-gray-100 shrink-0\`}>
              <Icon className="text-white text-2xl" />
            </div>
            <div className="overflow-hidden">
              <p className="text-2xl font-black text-gray-800 tracking-tight">{value}</p>
              <p className="text-xs font-medium text-gray-400 mt-0.5 truncate">{label}</p>
              {trend && (
                <div className={\`flex items-center gap-1 text-[11px] font-bold mt-1.5 \${up ? "text-emerald-500" : "text-rose-500"}\`}>
                  {up ? <TrendUp /> : <TrendDown />}
                  <span>{trend}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[1fr_1.3fr] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between"
        >
          <div className="mb-6">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Analytics Center</span>
            <h2 className="text-xl font-extrabold text-gray-800 mt-0.5">Revenue Overview</h2>
            <p className="text-xs text-gray-400 mt-1">Real-time performance metrics</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {donuts.map(({ label, value, color, track }) => (
              <motion.div
                key={label}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                className="bg-gray-50 border border-gray-100/70 rounded-2xl p-4 flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-3 flex items-center justify-center">
                  <DonutChart value={value} color={color} track={track} size={100} sw={10} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-lg font-black text-gray-800">{value}%</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-600 truncate w-full">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm"
        >
          <div className="mb-5">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Performance Report</span>
            <h2 className="text-xl font-extrabold text-gray-800 mt-0.5">Daily Revenue</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {miniStats.map(({ label, value, trend, icon: MiniIcon, color }) => (
              <div key={label} className="rounded-2xl p-3.5 bg-gray-50 border border-gray-100/70 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[11px] font-medium text-gray-400 truncate">{label}</p>
                  <MiniIcon className={\`text-xs \${color} shrink-0\`} />
                </div>
                <h3 className="text-lg font-black text-gray-800 mt-1.5 tracking-tight">{value}</h3>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-100/70 p-4 h-[200px] flex items-center justify-center">
            <AreaChart data={areaData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
`);

console.log("All files written successfully!");
