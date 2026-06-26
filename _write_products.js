const fs = require("fs");

const productsContent = `import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch, FiPlus, FiBox, FiMoreVertical, FiEdit2, FiTrash2, FiTag, FiX
} from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { supabase } from "../services/supabaseClient";

const categoryStyles = {
  Electronics: { bg: "bg-blue-100", text: "text-blue-700", ring: "ring-blue-200" },
  Furniture: { bg: "bg-amber-100", text: "text-amber-700", ring: "ring-amber-200" },
  Apparel: { bg: "bg-purple-100", text: "text-purple-700", ring: "ring-purple-200" },
  "Home & Living": { bg: "bg-pink-100", text: "text-pink-700", ring: "ring-pink-200" },
  Appliances: { bg: "bg-orange-100", text: "text-orange-700", ring: "ring-orange-200" },
  Sports: { bg: "bg-teal-100", text: "text-teal-700", ring: "ring-teal-200" },
};

const initForm = { title: "", code: "", category: "Electronics", brand: "", price: "", stock: "" };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initForm);

  const rp = (n) => "Rp " + Number(n).toLocaleString("id-ID");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = products.filter((p) =>
    (p.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.code || "").toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditTarget(null); setForm(initForm); setShowModal(true); };
  const openEdit = (p) => {
    setEditTarget(p);
    setForm({ title: p.title, code: p.code, category: p.category, brand: p.brand, price: String(p.price ?? ""), stock: String(p.stock ?? "") });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.title || !form.code || !form.brand || !form.price || !form.stock) { alert("Harap isi semua field!"); return; }
    const payload = { title: form.title, code: form.code, category: form.category, brand: form.brand, price: Number(form.price), stock: Number(form.stock) };
    if (editTarget) {
      const { error } = await supabase.from("products").update(payload).eq("id", editTarget.id);
      if (error) { alert("Gagal update: " + error.message); return; }
    } else {
      const { error } = await supabase.from("products").insert([payload]);
      if (error) { alert("Gagal tambah: " + error.message); return; }
    }
    setForm(initForm); setShowModal(false); setEditTarget(null); load();
  };

  const del = async (id) => {
    if (!confirm("Yakin hapus produk ini?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { alert("Gagal hapus: " + error.message); return; }
    load();
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Products" breadcrumb="Manage menu and items data">
        <button onClick={openAdd} className="flex items-center gap-2 bg-hijau hover:bg-green-600 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-green-100 transition-all duration-200">
          <FiPlus /> Add Product
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="Total Products" value={products.length} icon={<FiBox />} bg="green-100" color="text-hijau" />
        <StatCard title="Electronics Items" value={products.filter((p) => p.category === "Electronics").length} icon="⚡" bg="blue-100" color="text-blue-600" />
        <StatCard title="Total Available Stock" value={products.reduce((a, b) => a + (b.stock || 0), 0) + " pcs"} icon="📦" bg="blue-100" color="text-blue-500" />
      </div>

      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-100">
          <div>
            <h2 className="text-[20px] font-extrabold text-gray-800">Product List</h2>
            <p className="text-sm text-gray-400 mt-1">Manage stock items, categories, and prices</p>
          </div>
          <div className="relative w-full md:w-80">
            <input type="text" placeholder="Search product or code..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-hijau transition" />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Product Item", "Product Code", "Category", "Price", "Stock Status", "Action"].map((h, i) => (
                  <th key={h} className={"px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold text-left " + (i === 5 ? "text-center w-[10%]" : i === 0 ? "w-[30%]" : i === 3 ? "w-[15%]" : i === 4 ? "w-[10%]" : "w-[20%]")}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-10 text-sm text-gray-400">Memuat data...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-10 text-sm text-gray-400">Belum ada data produk atau tidak ditemukan.</td></tr>
              ) : filtered.map((p) => {
                const s = categoryStyles[p.category] || { bg: "bg-gray-100", text: "text-gray-700", ring: "ring-gray-200" };
                return (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div><Link to={"/products/"+p.id} className="font-bold text-gray-800 text-sm truncate hover:text-hijau transition-colors">{p.title}</Link><p className="text-xs text-gray-400 mt-0.5">ID #{(p.id+"").padStart(4,"0")} &bull; {p.brand}</p></div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600"><div className="flex items-center gap-2 font-mono"><FiTag className="text-gray-400 flex-shrink-0" /><span>{p.code}</span></div></td>
                    <td className="px-6 py-4"><span className={"inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 "+s.bg+" "+s.text+" "+s.ring}>{p.category}</span></td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">{rp(p.price)}</td>
                    <td className="px-6 py-4 text-sm font-bold"><span className={p.stock < 10 ? "text-red-500" : "text-gray-700"}>{p.stock} <span className="text-xs text-gray-400 font-medium">pcs</span></span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition"><FiEdit2 size={14} /></button>
                        <button onClick={() => del(p.id)} className="w-8 h-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"><FiTrash2 size={14} /></button>
                        <button className="w-8 h-8 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 flex items-center justify-center transition"><FiMoreVertical size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">{editTarget ? "Edit Product" : "Add New Product"}</h2>
                <p className="text-sm text-gray-400 mt-0.5">{editTarget ? "Update product information below" : "Fill product information below"}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"><FiX size={16} /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Product Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Product Code" value={form.code} onChange={(e) => setForm({...form, code: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
                <input type="text" placeholder="Brand" value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price (IDR)" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
                <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
              </div>
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau">
                {Object.keys(categoryStyles).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 bg-hijau hover:bg-green-600 text-white py-3 rounded-2xl text-sm font-bold transition">{editTarget ? "Update Product" : "Save Product"}</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-bold transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, bg, color }) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <h2 className="text-3xl font-extrabold text-gray-800 mt-1">{value}</h2>
        </div>
        <div className={"w-14 h-14 rounded-2xl bg-"+bg+" "+color+" flex items-center justify-center text-2xl"}>{typeof icon === "string" ? <span>{icon}</span> : icon}</div>
      </div>
    </div>
  );
}
`;

const detailContent = `import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiPackage, FiTag, FiBox } from "react-icons/fi";
import { supabase } from "../services/supabaseClient";
import PageHeader from "../components/PageHeader";

const catMeta = {
  Electronics: { emoji: "💻" }, Furniture: { emoji: "🪑" }, Apparel: { emoji: "👕" },
  "Home & Living": { emoji: "🏠" }, Appliances: { emoji: "🔌" }, Sports: { emoji: "⚽" },
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error: err } = await supabase.from("products").select("*").eq("id", id).single();
      if (err) setError(err.message);
      else if (!data) setError("Produk tidak ditemukan.");
      else setProduct(data);
      setLoading(false);
    })();
  }, [id]);

  const rp = (n) => "Rp " + Number(n).toLocaleString("id-ID");

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-hijau border-t-transparent rounded-full animate-spin" /></div>;

  if (error) return (
    <div className="space-y-5">
      <PageHeader title="Product Detail" breadcrumb={["Products", "Detail"]} />
      <div className="bg-white rounded-[28px] p-12 text-center border border-gray-100 shadow-sm">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-gray-400 mb-6">{error}</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-hijau hover:bg-green-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition-colors"><FiArrowLeft /> Kembali</Link>
      </div>
    </div>
  );

  const meta = catMeta[product.category] || { emoji: "📦" };

  return (
    <div className="space-y-5">
      <PageHeader title="Product Detail" breadcrumb={["Products", product.title]}>
        <Link to="/products" className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all"><FiArrowLeft /> Back</Link>
      </PageHeader>
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-8 py-10 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center text-4xl">{meta.emoji}</div>
          <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{product.code}</p><h1 className="text-2xl font-extrabold text-gray-800">{product.title}</h1><p className="text-sm text-gray-400 mt-1">{product.brand}</p></div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 text-blue-500 mb-3"><FiTag size={16} /><span className="text-xs font-bold uppercase tracking-wider text-gray-400">Category</span></div>
              <p className="text-lg font-bold text-gray-800">{product.category}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 text-hijau mb-3"><FiPackage size={16} /><span className="text-xs font-bold uppercase tracking-wider text-gray-400">Price</span></div>
              <p className="text-lg font-bold text-gray-800">{rp(product.price)}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 text-amber-500 mb-3"><FiBox size={16} /><span className="text-xs font-bold uppercase tracking-wider text-gray-400">Stock</span></div>
              <p className={"text-lg font-bold " + (product.stock < 10 ? "text-red-500" : "text-gray-800")}>{product.stock} <span className="text-sm font-medium text-gray-400">pcs</span></p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 text-purple-500 mb-3"><FiBox size={16} /><span className="text-xs font-bold uppercase tracking-wider text-gray-400">Status</span></div>
              <span className={"inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold " + (product.stock === 0 ? "bg-red-100 text-red-700" : product.stock < 10 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700")}>
                {product.stock === 0 ? "Out of Stock" : product.stock < 10 ? "Low Stock" : "In Stock"}
              </span>
            </div>
          </div>
          <div className="mt-6 bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product Identity</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div><span className="text-gray-400">Code:</span><span className="font-mono font-semibold text-gray-700 ml-2">{product.code}</span></div>
              <div><span className="text-gray-400">Brand:</span><span className="font-semibold text-gray-700 ml-2">{product.brand}</span></div>
              <div><span className="text-gray-400">Category:</span><span className="font-semibold text-gray-700 ml-2">{product.category}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/pages/Products.jsx", productsContent, "utf8");
fs.writeFileSync("src/pages/ProductDetail.jsx", detailContent, "utf8");
console.log("Both files written successfully.");
console.log("Products.jsx:", productsContent.length, "chars");
console.log("ProductDetail.jsx:", detailContent.length, "chars");
