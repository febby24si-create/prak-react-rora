import { useState } from "react";
import PageHeader from "../components/PageHeader";

// Generate 30 data customers
const generateCustomers = () => {
  const loyalties = ["Bronze", "Silver", "Gold"];
  const names = ["Andi", "Budi", "Citra", "Dewi", "Eka", "Fajar", "Gita", "Hadi", "Indah", "Joko"];
  const customers = [];
  for (let i = 1; i <= 30; i++) {
    customers.push({
      customerId: i,
      customerName: `${names[i % names.length]} ${i}`,
      email: `customer${i}@example.com`,
      phone: `0812${String(i).padStart(4,'0')}${String(i).padStart(4,'0')}`,
      loyalty: loyalties[i % 3],
    });
  }
  return customers;
};

const initialCustomers = generateCustomers();

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ customerName: "", email: "", phone: "", loyalty: "Bronze" });

  const handleAddCustomer = () => {
    if (!formData.customerName || !formData.email || !formData.phone) {
      alert("Harap isi semua field!");
      return;
    }
    const newId = customers.length + 1;
    const newCustomer = { customerId: newId, ...formData };
    setCustomers([...customers, newCustomer]);
    setShowModal(false);
    setFormData({ customerName: "", email: "", phone: "", loyalty: "Bronze" });
  };

  return (
    <div>
      <PageHeader title="Customers" breadcrumb="Manage customers">
        <button
          onClick={() => setShowModal(true)}
          className="bg-hijau text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors cursor-pointer"
        >
          + Add Customer
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl p-4 shadow overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Customer ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.customerId} className="border-t hover:bg-gray-50">
                <td className="p-3">{c.customerId}</td>
                <td className="p-3 font-medium">{c.customerName}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${c.loyalty === "Gold" ? "bg-yellow-100 text-yellow-700" : ""}
                    ${c.loyalty === "Silver" ? "bg-gray-100 text-gray-700" : ""}
                    ${c.loyalty === "Bronze" ? "bg-orange-100 text-orange-700" : ""}
                  `}>
                    {c.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form Customer */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 max-w-[90%] shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Tambah Customer Baru</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-hijau"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-hijau"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-hijau"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <select
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-hijau"
                value={formData.loyalty}
                onChange={(e) => setFormData({...formData, loyalty: e.target.value})}
              >
                <option>Bronze</option>
                <option>Silver</option>
                <option>Gold</option>
              </select>
              <div className="flex gap-2 pt-2">
                <button onClick={handleAddCustomer} className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Simpan</button>
                <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">Batal</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}