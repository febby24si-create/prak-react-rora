import { useState, useEffect } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // DATA SEARCH
  const data = [
    { id: 1, name: "Nasi Goreng" },
    { id: 2, name: "Mie Ayam" },
    { id: 3, name: "Ayam Bakar" },
    { id: 4, name: "Es Teh Manis" },
    { id: 5, name: "Kopi Susu" },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ESC close semua modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenSearch(false);
        setOpenSettings(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // DARK MODE APPLY
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        
        {/* SEARCH */}
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search Here..."
            onClick={() => setOpenSearch(true)}
            className="border p-2 pr-10 w-full rounded-md outline-none dark:bg-gray-700 dark:text-white"
          />
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* ICONS */}
        <div className="flex items-center space-x-4">

          {/* 🔔 NOTIF */}
          <div className="relative">
            <div
              onClick={() => setOpenNotif(!openNotif)}
              className="p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer"
            >
              <FaBell />
            </div>

            {openNotif && (
              <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md p-3 text-sm z-50">
                <p className="font-semibold mb-2">Notifikasi</p>
                <p>🛒 Order baru masuk</p>
                <p>🚚 Pesanan dikirim</p>
                <p>💰 Pembayaran diterima</p>
              </div>
            )}
          </div>

          {/* 📊 CHART */}
          <div
            onClick={() => setShowChart(!showChart)}
            className="p-3 bg-blue-100 rounded-2xl cursor-pointer"
          >
            <FcAreaChart />
          </div>

          {/* ⚙️ SETTINGS */}
          <div
            onClick={() => setOpenSettings(true)}
            className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer"
          >
            <SlSettings />
          </div>

          {/* PROFILE */}
          <div className="flex items-center space-x-3 border-l pl-4">
            <span className="text-gray-600 dark:text-white">
              Hello, <b>Febby</b>
            </span>
            <img src="/ree.jpeg" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* 🔍 SEARCH MODAL */}
      {openSearch && (
        <div className="fixed inset-0 bg-white/30 flex justify-center items-center z-50"
             onClick={() => setOpenSearch(false)}>
          <div className="bg-white p-6 rounded-lg w-80"
               onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-3 font-semibold">Search</h2>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 w-full mb-3"
              placeholder="Cari..."
            />

            {filteredData.map((item) => (
              <div key={item.id} className="p-2 bg-gray-100 mb-1 rounded">
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ⚙️ SETTINGS MODAL */}
      {openSettings && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
             onClick={() => setOpenSettings(false)}>
          <div className="bg-white p-6 rounded-lg w-80"
               onClick={(e) => e.stopPropagation()}>
            <h2 className="font-semibold mb-3">Settings</h2>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 px-3 py-2 rounded w-full"
            >
              Toggle Dark Mode
            </button>
          </div>
        </div>
      )}

      {/* 📊 CHART PANEL */}
      {showChart && (
        <div className="fixed bottom-5 right-5 bg-white p-4 shadow-lg rounded-lg">
          <p className="font-semibold">Chart Preview</p>
          <p className="text-sm text-gray-400">
            (Simulasi data grafik)
          </p>
        </div>
      )}
    </>
  );
}