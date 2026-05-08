import { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiMail,
  FiPhone,
  FiUsers,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import PageHeader from "../components/PageHeader";

// ======================================================
// GENERATE DUMMY DATA
// ======================================================
const generateCustomers = () => {
  const loyalties = ["Bronze", "Silver", "Gold"];
  const names = [
    "Andi",
    "Budi",
    "Citra",
    "Dewi",
    "Eka",
    "Fajar",
    "Gita",
    "Hadi",
    "Indah",
    "Joko",
  ];

  const customers = [];

  for (let i = 1; i <= 30; i++) {
    customers.push({
      customerId: i,
      customerName: `${names[i % names.length]} ${i}`,
      email: `customer${i}@example.com`,
      phone: `0812${String(i).padStart(4, "0")}${String(i).padStart(4, "0")}`,
      loyalty: loyalties[i % 3],
      totalOrders: Math.floor(Math.random() * 200),
    });
  }

  return customers;
};

const initialCustomers = generateCustomers();

// ======================================================
// LOYALTY STYLE
// ======================================================
const loyaltyStyles = {
  Gold: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    ring: "ring-yellow-200",
  },
  Silver: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    ring: "ring-gray-200",
  },
  Bronze: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    ring: "ring-orange-200",
  },
};

// ======================================================
// COMPONENT
// ======================================================
export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    loyalty: "Bronze",
  });

  // ======================================================
  // FILTER
  // ======================================================
  const filteredCustomers = customers.filter((c) =>
    c.customerName.toLowerCase().includes(search.toLowerCase())
  );

  // ======================================================
  // ADD CUSTOMER
  // ======================================================
  const handleAddCustomer = () => {
    if (!formData.customerName || !formData.email || !formData.phone) {
      alert("Harap isi semua field!");
      return;
    }

    const newCustomer = {
      customerId: customers.length + 1,
      totalOrders: 0,
      ...formData,
    };

    setCustomers([...customers, newCustomer]);

    setFormData({
      customerName: "",
      email: "",
      phone: "",
      loyalty: "Bronze",
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-5">

      {/* ======================================================
          HEADER
      ====================================================== */}
      <PageHeader title="Customers" breadcrumb="Manage customer data">

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
          Add Customer
        </button>

      </PageHeader>

      {/* ======================================================
          STATS
      ====================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Total Customer */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-400 font-medium">
                Total Customers
              </p>

              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">
                {customers.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 text-hijau flex items-center justify-center text-2xl">
              <FiUsers />
            </div>

          </div>
        </div>

        {/* Gold Member */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-400 font-medium">
                Gold Member
              </p>

              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">
                {customers.filter((c) => c.loyalty === "Gold").length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl">
              👑
            </div>

          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-400 font-medium">
                Total Orders
              </p>

              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">
                {customers.reduce((a, b) => a + b.totalOrders, 0)}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl">
              📦
            </div>

          </div>
        </div>
      </div>

      {/* ======================================================
          TABLE CARD
      ====================================================== */}
      <div
        className="
          bg-white rounded-[28px]
          border border-gray-100
          shadow-[0_4px_24px_rgba(0,0,0,0.04)]
          overflow-hidden
        "
      >

        {/* ======================================================
            TABLE HEADER
        ====================================================== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-100">

          <div>
            <h2 className="text-[20px] font-extrabold text-gray-800">
              Customer List
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Manage all customer information
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                bg-gray-50
                border border-gray-200
                rounded-2xl
                py-3 pl-11 pr-4
                text-sm
                outline-none
                focus:border-hijau
                transition
              "
            />

            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

        </div>

        {/* ======================================================
            TABLE
        ====================================================== */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-50">
              <tr>

                {[
                  "Customer",
                  "Email",
                  "Phone",
                  "Orders",
                  "Loyalty",
                  "Action",
                ].map((head) => (
                  <th
                    key={head}
                    className="
                      text-left
                      px-6 py-4
                      text-[11px]
                      uppercase
                      tracking-wider
                      text-gray-400
                      font-bold
                    "
                  >
                    {head}
                  </th>
                ))}

              </tr>
            </thead>

            <tbody>

              {filteredCustomers.map((c) => {
                const style = loyaltyStyles[c.loyalty];

                return (
                  <tr
                    key={c.customerId}
                    className="
                      border-t border-gray-100
                      hover:bg-gray-50/70
                      transition-colors
                    "
                  >

                    {/* CUSTOMER */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={`https://avatar.iran.liara.run/public/${c.customerId}`}
                          alt=""
                          className="w-11 h-11 rounded-2xl object-cover"
                        />

                        <div>
                          <p className="font-bold text-gray-800 text-sm">
                            {c.customerName}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            ID #{String(c.customerId).padStart(4, "0")}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FiMail className="text-gray-400" />
                        {c.email}
                      </div>
                    </td>

                    {/* PHONE */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FiPhone className="text-gray-400" />
                        {c.phone}
                      </div>
                    </td>

                    {/* ORDERS */}
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-700">
                        {c.totalOrders}
                      </span>
                    </td>

                    {/* LOYALTY */}
                    <td className="px-6 py-4">

                      <span
                        className={`
                          inline-flex items-center
                          px-3 py-1.5
                          rounded-full
                          text-xs font-bold
                          ring-1
                          ${style.bg}
                          ${style.text}
                          ${style.ring}
                        `}
                      >
                        {c.loyalty}
                      </span>

                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <button
                          className="
                            w-9 h-9 rounded-xl
                            bg-blue-50 text-blue-500
                            hover:bg-blue-100
                            flex items-center justify-center
                            transition
                          "
                        >
                          <FiEdit2 size={15} />
                        </button>

                        <button
                          className="
                            w-9 h-9 rounded-xl
                            bg-red-50 text-red-500
                            hover:bg-red-100
                            flex items-center justify-center
                            transition
                          "
                        >
                          <FiTrash2 size={15} />
                        </button>

                        <button
                          className="
                            w-9 h-9 rounded-xl
                            bg-gray-100 text-gray-500
                            hover:bg-gray-200
                            flex items-center justify-center
                            transition
                          "
                        >
                          <FiMoreVertical size={15} />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>
          </table>

        </div>
      </div>

      {/* ======================================================
          MODAL
      ====================================================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div
            className="
              w-full max-w-md
              bg-white rounded-[30px]
              shadow-[0_20px_60px_rgba(0,0,0,0.2)]
              p-7
              animate-[fadeIn_.25s_ease]
            "
          >

            <h2 className="text-2xl font-extrabold text-gray-800 mb-1">
              Add New Customer
            </h2>

            <p className="text-sm text-gray-400 mb-6">
              Fill customer information below
            </p>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customerName: e.target.value,
                  })
                }
                className="
                  w-full
                  border border-gray-200
                  rounded-2xl
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:border-hijau
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="
                  w-full
                  border border-gray-200
                  rounded-2xl
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:border-hijau
                "
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="
                  w-full
                  border border-gray-200
                  rounded-2xl
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:border-hijau
                "
              />

              <select
                value={formData.loyalty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loyalty: e.target.value,
                  })
                }
                className="
                  w-full
                  border border-gray-200
                  rounded-2xl
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:border-hijau
                "
              >
                <option>Bronze</option>
                <option>Silver</option>
                <option>Gold</option>
              </select>

            </div>

            {/* BUTTON */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={handleAddCustomer}
                className="
                  flex-1
                  bg-hijau hover:bg-green-600
                  text-white
                  py-3 rounded-2xl
                  text-sm font-bold
                  transition
                "
              >
                Save Customer
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="
                  flex-1
                  bg-gray-100 hover:bg-gray-200
                  text-gray-700
                  py-3 rounded-2xl
                  text-sm font-bold
                  transition
                "
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