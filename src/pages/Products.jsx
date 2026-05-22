import { useState } from "react";
import { Link } from "react-router-dom"; // <-- Sudah ditambahkan
import {
  FiSearch,
  FiPlus,
  FiBox,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiTag,
} from "react-icons/fi";
import PageHeader from "../components/PageHeader";

// Import file json Anda
import initialProductData from "../data/productsData.json";

const categoryStyles = {
  Electronics: { bg: "bg-blue-100", text: "text-blue-700", ring: "ring-blue-200" },
  Furniture: { bg: "bg-amber-100", text: "text-amber-700", ring: "ring-amber-200" },
  Apparel: { bg: "bg-purple-100", text: "text-purple-700", ring: "ring-purple-200" },
  "Home & Living": { bg: "bg-pink-100", text: "text-pink-700", ring: "ring-pink-200" },
  Appliances: { bg: "bg-orange-100", text: "text-orange-700", ring: "ring-orange-200" },
  Sports: { bg: "bg-teal-100", text: "text-teal-700", ring: "ring-teal-200" },
};

export default function Products() {
  const [products, setProducts] = useState(initialProductData);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    category: "Electronics",
    brand: "",
    price: "",
    stock: "",
  });

  const formatRupiah = (amount) =>
    `Rp ${Number(amount).toLocaleString("id-ID")}`;

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!formData.title || !formData.code || !formData.brand || !formData.price || !formData.stock) {
      alert("Harap isi semua field!");
      return;
    }

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      title: formData.title,
      code: formData.code,
      category: formData.category,
      brand: formData.brand,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    setProducts([...products, newProduct]);
    setFormData({ title: "", code: "", category: "Electronics", brand: "", price: "", stock: "" });
    setShowModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-5">
      
      {/* HEADER */}
      <PageHeader title="Products" breadcrumb="Manage menu and items data">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-hijau hover:bg-green-600 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-green-100 transition-all duration-200"
        >
          <FiPlus />
          Add Product
        </button>
      </PageHeader>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Products</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">{products.length}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-hijau flex items-center justify-center text-2xl">
              <FiBox />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Electronics Items</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">
                {products.filter((p) => p.category === "Electronics").length}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">⚡</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Available Stock</p>
              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">
                {products.reduce((a, b) => a + b.stock, 0)} <span className="text-sm font-medium text-gray-400">pcs</span>
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-xl">📦</div>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        
        {/* TABLE HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-100">
          <div>
            <h2 className="text-[20px] font-extrabold text-gray-800">Product List</h2>
            <p className="text-sm text-gray-400 mt-1">Manage stock items, categories, and prices</p>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search product or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-hijau transition"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* RENDER TABEL */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="w-[30%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Product Item</th>
                <th className="w-[20%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Product Code</th>
                <th className="w-[15%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Category</th>
                <th className="w-[15%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Price</th>
                <th className="w-[10%] text-left px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Stock Status</th>
                <th className="w-[10%] text-center px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-sm text-gray-400">
                    Belum ada data produk atau tidak ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const style = categoryStyles[p.category] || { bg: "bg-gray-100", text: "text-gray-700", ring: "ring-gray-200" };

                  return (
                    <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                      
                      {/* PRODUCT ITEM (Link Terpasang di Sini) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <Link 
                            to={`/products/${p.id}`} 
                            className="font-bold text-gray-800 text-sm truncate hover:text-hijau transition-colors"
                          >
                            {p.title}
                          </Link>
                          <p className="text-xs text-gray-400 mt-0.5">
                            ID #{String(p.id).padStart(4, "0")} • {p.brand}
                          </p>
                        </div>
                      </td>

                      {/* PRODUCT CODE */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2 font-mono">
                          <FiTag className="text-gray-400 flex-shrink-0" />
                          <span>{p.code}</span>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ${style.bg} ${style.text} ${style.ring}`}>
                          {p.category}
                        </span>
                      </td>

                      {/* PRICE */}
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">
                        {formatRupiah(p.price)}
                      </td>

                      {/* STOCK STATUS */}
                      <td className="px-6 py-4 text-sm font-bold">
                        <span className={p.stock < 10 ? "text-red-500" : "text-gray-700"}>
                          {p.stock} <span className="text-xs text-gray-400 font-medium">pcs</span>
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition">
                            <FiEdit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="w-8 h-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"
                          >
                            <FiTrash2 size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 flex items-center justify-center transition">
                            <FiMoreVertical size={14} />
                          </button>
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

      {/* MODAL ADD PRODUCT */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-7">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Add New Product</h2>
            <p className="text-sm text-gray-400 mb-6">Fill product information below</p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Code (e.g., PROD-031)"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
                />
                <input
                  type="text"
                  placeholder="Brand (e.g., Logitech)"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price (IDR)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
                />
                <input
                  type="number"
                  placeholder="Initial Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
                />
              </div>

              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-hijau"
              >
                {Object.keys(categoryStyles).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddProduct}
                className="flex-1 bg-hijau hover:bg-green-600 text-white py-3 rounded-2xl text-sm font-bold transition"
              >
                Save Product
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