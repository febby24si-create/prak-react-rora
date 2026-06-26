import { useState, useEffect } from "react";
import { FiSearch, FiPlus, FiMail, FiPhone, FiUsers, FiMoreVertical, FiEdit2, FiTrash2, FiX, FiMapPin } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { customerService } from "../services/customerService";

const initForm = { name: "", email: "", phone: "", address: "", status: true };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initForm);

  const load = async () => {
    setLoading(true);
    try { const data = await customerService.fetchAll(); setCustomers(data || []); }
    catch (err) { console.error("Gagal memuat customer:", err); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filt = customers.filter(c => (c.name||"").toLowerCase().includes(search.toLowerCase()) || (c.email||"").toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditTarget(null); setForm(initForm); setShowModal(true); };
  const openEdit = (c) => { setEditTarget(c); setForm({ name:c.name||"", email:c.email||"", phone:c.phone||"", address:c.address||"", status:c.status!==false }); setShowModal(true); };

  const save = async () => {
    if (!form.name) { alert("Nama customer harus diisi!"); return; }
    try {
      if (editTarget) await customerService.update(editTarget.id, form);
      else await customerService.create(form);
      setShowModal(false); setEditTarget(null); setForm(initForm); load();
    } catch (err) { alert("Gagal: "+err.message); }
  };

  const del = async (id) => {
    if (!confirm("Yakin hapus?")) return;
    try { await customerService.delete(id); load(); }
    catch (err) { alert("Gagal: "+err.message); }
  };

  const toggleStatus = async (c) => {
    try { await customerService.update(c.id, { status: !c.status }); load(); }
    catch (err) { alert("Gagal: "+err.message); }
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Customers" breadcrumb="Manage customer data">
        <button onClick={openAdd} className="flex items-center gap-2 bg-hijau hover:bg-green-600 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-green-100 transition-all duration-200"><FiPlus /> Add Customer</button>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-400 font-medium">Total Customers</p><h2 className="text-3xl font-extrabold text-gray-800 mt-1">{customers.length}</h2></div>
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-hijau flex items-center justify-center text-2xl"><FiUsers /></div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-400 font-medium">Active</p><h2 className="text-3xl font-extrabold text-gray-800 mt-1">{customers.filter(c=>c.status!==false).length}</h2></div>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl">✅</div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-400 font-medium">Inactive</p><h2 className="text-3xl font-extrabold text-gray-800 mt-1">{customers.filter(c=>c.status===false).length}</h2></div>
            <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center text-2xl">⬜</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-100">
          <div><h2 className="text-[20px] font-extrabold text-gray-800">Customer List</h2><p className="text-sm text-gray-400 mt-1">Manage all customer information</p></div>
          <div className="relative w-full md:w-80">
            <input type="text" placeholder="Search customer..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-hijau transition" />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50"><tr>{["Customer","Email","Phone","Address","Status","Action"].map(h=><th key={h} className="text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan="6" className="text-center py-10 text-sm text-gray-400">Memuat data...</td></tr>
              : filt.length === 0 ? <tr><td colSpan="6" className="text-center py-10 text-sm text-gray-400">Belum ada data customer.</td></tr>
              : filt.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=00b074&color=fff&bold=true`} alt="" className="w-11 h-11 rounded-2xl object-cover" />
                        <div><p className="font-bold text-gray-800 text-sm">{c.name}</p><p className="text-xs text-gray-400 mt-1">ID #{(c.id||"").slice(0,8)}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2 text-gray-600 text-sm"><FiMail className="text-gray-400" />{c.email}</div></td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2 text-gray-600 text-sm"><FiPhone className="text-gray-400" />{c.phone}</div></td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2 text-gray-600 text-sm"><FiMapPin className="text-gray-400" /><span className="truncate max-w-[150px]">{c.address||"-"}</span></div></td>
                    <td className="px-6 py-4">
                      <button onClick={()=>toggleStatus(c)} className={`px-3 py-1.5 rounded-full text-xs font-bold ring-1 transition ${c.status!==false?"bg-emerald-100 text-emerald-700 ring-emerald-200":"bg-rose-100 text-rose-700 ring-rose-200"}`}>{c.status!==false?"Active":"Inactive"}</button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={()=>openEdit(c)} className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition"><FiEdit2 size={15} /></button>
                        <button onClick={()=>del(c.id)} className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"><FiTrash2 size={15} /></button>
                        <button className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"><FiMoreVertical size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-7">
            <div className="flex items-center justify-between mb-4">
              <div><h2 className="text-2xl font-extrabold text-gray-800">{editTarget?"Edit Customer":"Add New Customer"}</h2><p className="text-sm text-gray-400 mt-0.5">Fill customer information below</p></div>
              <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"><FiX size={16} /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Customer Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
              <input type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
              <input type="text" placeholder="Phone Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau" />
              <textarea placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau resize-none" rows={2} />
              <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={form.status} onChange={e=>setForm({...form,status:e.target.checked})} className="rounded border-gray-300 text-hijau focus:ring-hijau" />Active</label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 bg-hijau hover:bg-green-600 text-white py-3 rounded-2xl text-sm font-bold transition">{editTarget?"Update Customer":"Save Customer"}</button>
              <button onClick={()=>setShowModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-bold transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
