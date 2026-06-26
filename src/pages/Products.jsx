import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus, FiBox, FiMoreVertical, FiEdit2, FiTrash2, FiTag, FiX } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

const categoryStyles = {
  Electronics: { bg: "bg-blue-100", text: "text-blue-700", ring: "ring-blue-200" },
  Furniture: { bg: "bg-amber-100", text: "text-amber-700", ring: "ring-amber-200" },
  Apparel: { bg: "bg-purple-100", text: "text-purple-700", ring: "ring-purple-200" },
  "Home & Living": { bg: "bg-pink-100", text: "text-pink-700", ring: "ring-pink-200" },
  Appliances: { bg: "bg-orange-100", text: "text-orange-700", ring: "ring-orange-200" },
  Sports: { bg: "bg-teal-100", text: "text-teal-700", ring: "ring-teal-200" },
};

const initForm = { name: "", description: "", category: "Electronics", price: "", stock: "" };

function StatCard({ title, value, icon, bg, color }) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <h2 className="text-3xl font-extrabold text-gray-800 mt-1">{value}</h2>
        </div>
        <div className={"w-14 h-14 rounded-2xl bg-" + bg + " " + color + " flex items-center justify-center text-2xl"}>
          {typeof icon === "string" ? <span>{icon}</span> : icon}
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initForm);

  const rp = (n) => "Rp " + Number(n).toLocaleString("id-ID");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filt = products.filter((p) =>
    (p.name||"").toLowerCase().includes(search.toLowerCase()) ||
    (p.description||"").toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditTarget(null); setForm(initForm); setShowModal(true); };
  const openEdit = (p) => { setEditTarget(p); setForm({name:p.name,description:p.description,category:p.category,price:String(p.price??""),stock:String(p.stock??"")}); setShowModal(true); };

  const save = async () => {
    if (!form.name||!form.description||!form.price||!form.stock) { alert("Harap isi semua field!"); return; }
    const payload = {name:form.name,description:form.description,category:form.category,price:Number(form.price),stock:Number(form.stock)};
    if (editTarget) {
      const {error} = await supabase.from("products").update(payload).eq("id",editTarget.id);
      if (error) { alert("Gagal: "+error.message); return; }
    } else {
      const {error} = await supabase.from("products").insert([payload]);
      if (error) { alert("Gagal: "+error.message); return; }
    }
    setForm(initForm); setShowModal(false); setEditTarget(null); load();
  };

  const del = async (id) => {
    if (!confirm("Yakin hapus?")) return;
    const {error} = await supabase.from("products").delete().eq("id",id);
    if (error) { alert("Gagal: "+error.message); return; }
    load();
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Products" breadcrumb="Manage menu and items data">
        {isAdmin && <button onClick={openAdd} className="flex items-center gap-2 bg-hijau hover:bg-green-600 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-green-100 transition-all duration-200"><FiPlus /> Add Product</button>}
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="Total Products" value={products.length} icon={<FiBox />} bg="green-100" color="text-hijau" />
        <StatCard title="Electronics Items" value={products.filter(p=>p.category==="Electronics").length} icon="⚡" bg="blue-100" color="text-blue-600" />
        <StatCard title="Total Stock" value={products.reduce((a,b)=>a+(b.stock||0),0)+" pcs"} icon="📦" bg="blue-100" color="text-blue-500" />
      </div>
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-100">
          <div><h2 className="text-[20px] font-extrabold text-gray-800">Product List</h2><p className="text-sm text-gray-400 mt-1">Manage stock items, categories, and prices</p></div>
          <div className="relative w-full md:w-80">
            <input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-hijau transition" />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="w-[30%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Product Item</th>
                <th className="w-[20%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Description</th>
                <th className="w-[15%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Category</th>
                <th className="w-[15%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Price</th>
                <th className="w-[10%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Stock</th>
                <th className="w-[10%] text-center px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-10 text-sm text-gray-400">Memuat data...</td></tr>
              ) : filt.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-10 text-sm text-gray-400">Belum ada data produk atau tidak ditemukan.</td></tr>
              ) : filt.map(p => {
                const s = categoryStyles[p.category] || {bg:"bg-gray-100",text:"text-gray-700",ring:"ring-gray-200"};
                return (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div><Link to={"/products/"+p.id} className="font-bold text-gray-800 text-sm truncate hover:text-hijau transition-colors">{p.name}</Link><p className="text-xs text-gray-400 mt-0.5">ID #{(p.id+"").padStart(4,"0")} &bull; {p.description}</p></div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600"><div className="flex items-center gap-2"><FiTag className="text-gray-400 flex-shrink-0" /><span>{p.description}</span></div></td>
                    <td className="px-6 py-4"><span className={"inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 "+s.bg+" "+s.text+" "+s.ring}>{p.category}</span></td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">{rp(p.price)}</td>
                    <td className="px-6 py-4 text-sm font-bold"><span className={p.stock<10?"text-red-500":"text-gray-700"}>{p.stock} <span className="text-xs text-gray-400 font-medium">pcs</span></span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {isAdmin && <button onClick={()=>openEdit(p)} className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition"><FiEdit2 size={14} /></button>}
                        {isAdmin && <button onClick={()=>del(p.id)} className="w-8 h-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"><FiTrash2 size={14} /></button>}
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
              <div><h2 className="text-2xl font-extrabold text-gray-800">{editTarget?"Edit Product":"Add New Product"}</h2><p className="text-sm text-gray-400 mt-0.5">{editTarget?"Update product information below":"Fill product information below"}</p></div>
              <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"><FiX size={16} /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Product Title" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price (IDR)" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
                <input type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
              </div>
              <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau">
                {Object.keys(categoryStyles).map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 bg-hijau hover:bg-green-600 text-white py-3 rounded-2xl text-sm font-bold transition">{editTarget?"Update Product":"Save Product"}</button>
              <button onClick={()=>setShowModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-bold transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
