const fs = require("fs");
const path = require("path");

function writeFile(relPath, content) {
  const fullPath = path.join(__dirname, relPath);
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("OK:", relPath);
}

// ===== Customer.jsx =====
writeFile("src/pages/Customer.jsx", `import { useState, useEffect } from "react";
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
                        <img src={\`https://ui-avatars.com/api/?name=\${encodeURIComponent(c.name)}&background=00b074&color=fff&bold=true\`} alt="" className="w-11 h-11 rounded-2xl object-cover" />
                        <div><p className="font-bold text-gray-800 text-sm">{c.name}</p><p className="text-xs text-gray-400 mt-1">ID #{(c.id||"").slice(0,8)}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2 text-gray-600 text-sm"><FiMail className="text-gray-400" />{c.email}</div></td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2 text-gray-600 text-sm"><FiPhone className="text-gray-400" />{c.phone}</div></td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2 text-gray-600 text-sm"><FiMapPin className="text-gray-400" /><span className="truncate max-w-[150px]">{c.address||"-"}</span></div></td>
                    <td className="px-6 py-4">
                      <button onClick={()=>toggleStatus(c)} className={\`px-3 py-1.5 rounded-full text-xs font-bold ring-1 transition \${c.status!==false?"bg-emerald-100 text-emerald-700 ring-emerald-200":"bg-rose-100 text-rose-700 ring-rose-200"}\`}>{c.status!==false?"Active":"Inactive"}</button>
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
`);

// ===== Orders.jsx =====
writeFile("src/pages/Orders.jsx", `import { useState, useEffect } from "react";
import { FiSearch, FiPlus, FiShoppingCart, FiCalendar, FiUser, FiX, FiTrash2 } from "react-icons/fi";
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

const initForm = { member_id: "", status: "Pending" };

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
      if (isAdmin) { data = await orderService.fetchAll(); }
      else { data = await orderService.fetchByMember(profile?.id); }
      setOrders(data || []);
      const p = await productService.fetchAll(isAdmin);
      setProducts(p || []);
    } catch (err) { console.error("Gagal:", err); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [isAdmin, profile?.id]);

  const filt = orders.filter(o => (o.id||"").toLowerCase().includes(search.toLowerCase()) || (o.profiles?.full_name||"").toLowerCase().includes(search.toLowerCase()));

  const calcTotal = () => cart.reduce((s,i)=> { const p = products.find(x=>x.id===i.product_id); return s + (p?p.price*(i.qty||1):0); }, 0);

  const openAdd = () => { setForm({...initForm, member_id: profile?.id||""}); setCart([{product_id:"",qty:1}]); setShowModal(true); };
  const addCartRow = () => setCart([...cart, {product_id:"",qty:1}]);
  const updateCart = (idx, field, val) => setCart(cart.map((i,pos) => pos===idx ? {...i,[field]:val} : i));
  const removeCartRow = (idx) => { if(cart.length>1) setCart(cart.filter((_,i)=>i!==idx)); };

  const save = async () => {
    const valid = cart.filter(i=>i.product_id);
    if(!valid.length) { alert("Pilih minimal 1 produk!"); return; }
    try {
      const items = valid.map(i=>{ const p=products.find(x=>x.id===i.product_id); return {product_id:i.product_id,qty:i.qty||1,price:p?p.price:0}; });
      await orderService.create(form, items);
      setShowModal(false); load();
    } catch(err) { alert("Gagal: "+err.message); }
  };

  const updateStatus = async (id, s) => {
    try { await orderService.updateStatus(id, s); setShowStatusModal(false); setStatusTarget(null); load(); }
    catch(err) { alert("Gagal: "+err.message); }
  };

  const del = async (id) => {
    if(!confirm("Yakin hapus?")) return;
    try { await orderService.delete(id); load(); }
    catch(err) { alert("Gagal: "+err.message); }
  };

  const totalRevenue = orders.filter(o=>o.status==="Selesai").reduce((a,b)=>a+Number(b.total||0),0);

  return (
    <div className="space-y-5">
      <PageHeader title="Order List" breadcrumb="Manage all restaurant orders">
        <button onClick={openAdd} className="flex items-center gap-2 bg-hijau hover:bg-green-600 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-green-100 transition-all duration-200"><FiPlus /> Add Order</button>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-400 font-medium">Total Orders</p><h2 className="text-3xl font-extrabold text-gray-800 mt-1">{orders.length}</h2></div><div className="w-14 h-14 rounded-2xl bg-green-100 text-hijau flex items-center justify-center text-2xl"><FiShoppingCart /></div></div></div>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-400 font-medium">Completed</p><h2 className="text-3xl font-extrabold text-emerald-600 mt-1">{orders.filter(o=>o.status==="Selesai").length}</h2></div><div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">✅</div></div></div>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-400 font-medium">Revenue</p><h2 className="text-3xl font-extrabold text-gray-800 mt-1">{rp(totalRevenue)}</h2></div><div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-xl">💰</div></div></div>
      </div>
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-100">
          <div><h2 className="text-[20px] font-extrabold text-gray-800">Transaction Registry</h2><p className="text-sm text-gray-400 mt-1">Monitor sales data, status and invoices</p></div>
          <div className="relative w-full md:w-80"><input type="text" placeholder="Search order ID or customer..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-hijau transition" /><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50"><tr>{["Order ID","Customer","Status","Total","Points","Date","Action"].map(h=><th key={h} className="text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan="7" className="text-center py-10 text-sm text-gray-400">Memuat data...</td></tr>
              : filt.length === 0 ? <tr><td colSpan="7" className="text-center py-10 text-sm text-gray-400">Belum ada data pesanan.</td></tr>
              : filt.map(order => {
                  const sc = statusColors[order.status]||"bg-gray-100 text-gray-700 ring-gray-200";
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4"><span className="font-mono font-bold text-gray-800 text-sm">#{(order.id||"").slice(0,8)}</span></td>
                      <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center text-sm"><FiUser /></div><span className="font-bold text-gray-800 text-sm">{order.profiles?.full_name||"Member"}</span></div></td>
                      <td className="px-6 py-4"><button onClick={()=>{if(!isAdmin)return;setStatusTarget(order);setShowStatusModal(true);}} className={"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ring-1 " + sc + " " + (isAdmin?"hover:ring-2 cursor-pointer":"cursor-default")}>{order.status}</button></td>
                      <td className="px-6 py-4"><span className="font-extrabold text-gray-800">{rp(order.total)}</span></td>
                      <td className="px-6 py-4 text-sm font-bold text-hijau">+{order.point_earned||0}</td>
                      <td className="px-6 py-4"><div className="flex items-center gap-2 text-gray-400 text-sm font-medium"><FiCalendar />{new Date(order.created_at).toLocaleDateString("id-ID")}</div></td>
                      <td className="px-6 py-4"><div className="flex items-center gap-2">{isAdmin&&<button onClick={()=>del(order.id)} className="w-8 h-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"><FiTrash2 size={14}/></button>}</div></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-7 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div><h2 className="text-2xl font-extrabold text-gray-800">Create New Order</h2><p className="text-sm text-gray-400 mt-0.5">Select products and quantities</p></div>
              <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"><FiX size={16}/></button>
            </div>
            <div className="space-y-4">
              {cart.map((item,idx)=>(
                <div key={idx} className="flex gap-2 items-end">
                  <div className="flex-1"><label className="text-xs text-gray-400 font-medium mb-1 block">Product</label>
                    <select value={item.product_id} onChange={e=>updateCart(idx,"product_id",e.target.value)} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau bg-white">
                      <option value="">-- Pilih Produk --</option>
                      {products.filter(p=>p.status!==false).map(p=><option key={p.id} value={p.id}>{p.name} - {rp(p.price)} (Stock: {p.stock})</option>)}
                    </select>
                  </div>
                  <div className="w-20"><label className="text-xs text-gray-400 font-medium mb-1 block">Qty</label>
                    <input type="number" min="1" value={item.qty} onChange={e=>updateCart(idx,"qty",parseInt(e.target.value)||1)} className="w-full border border-gray-200 rounded-2xl px-3 py-3 text-sm outline-none focus:border-hijau text-center" />
                  </div>
                  <button onClick={()=>removeCartRow(idx)} className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition flex-shrink-0"><FiX size={16}/></button>
                </div>
              ))}
              <button onClick={addCartRow} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-400 hover:border-hijau hover:text-hijau transition">+ Add Product</button>
              <div className="text-right"><p className="text-sm text-gray-400">Total: <span className="font-extrabold text-gray-800 text-lg">{rp(calcTotal())}</span></p></div>
            </div>
            <div className="flex gap-3 mt-6"><button onClick={save} className="flex-1 bg-hijau hover:bg-green-600 text-white py-3 rounded-2xl text-sm font-bold transition">Create Order</button><button onClick={()=>setShowModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-bold transition">Cancel</button></div>
          </div>
        </div>
      )}
      {showStatusModal && statusTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-7">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Update Status</h2>
            <p className="text-sm text-gray-400 mb-6">#{(statusTarget.id||"").slice(0,8)} - Current: {statusTarget.status}</p>
            <div className="space-y-3">
              {["Pending","Diproses","Selesai","Dibatalkan"].map(s=>{
                const sc = statusColors[s]||"";
                return <button key={s} onClick={()=>updateStatus(statusTarget.id,s)} className={"w-full py-3 rounded-2xl text-sm font-bold transition hover:ring-2 " + (statusTarget.status===s ? sc + " ring-2 ring-offset-1" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}>{s}</button>;
              })}
            </div>
            <button onClick={()=>{setShowStatusModal(false);setStatusTarget(null);}} className="w-full mt-4 py-3 rounded-2xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
`);

console.log("All files written successfully!");
