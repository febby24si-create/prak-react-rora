import { useState, useEffect } from "react";
import { FaBell, FaSearch, FaComments, FaGift } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className="flex justify-between items-center px-6 py-3 bg-white rounded-xl shadow-sm dark:bg-gray-800 mb-4">



        {/* ICONS */}
        <div className="flex items-center space-x-2">

          {/* BELL */}
          <div className="relative">
            <div
              onClick={() => setOpenNotif(!openNotif)}
              className="relative p-2.5 bg-blue-50 rounded-2xl text-blue-500 cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <FaBell className="text-base" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
            </div>
            {openNotif && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-4 text-sm z-50 border border-gray-100">
                <p className="font-semibold mb-3 text-gray-700">Notifikasi</p>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2"><span>🛒</span> Order baru masuk</p>
                  <p className="flex items-center gap-2"><span>🚚</span> Pesanan dikirim</p>
                  <p className="flex items-center gap-2"><span>💰</span> Pembayaran diterima</p>
                </div>
              </div>
            )}
          </div>

          {/* CHAT */}
          <div className="relative p-2.5 bg-blue-50 rounded-2xl text-blue-500 cursor-pointer hover:bg-blue-100 transition-colors">
            <FaComments className="text-base" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
          </div>

          {/* GIFT */}
          <div className="relative p-2.5 bg-blue-50 rounded-2xl text-blue-500 cursor-pointer hover:bg-blue-100 transition-colors">
            <FaGift className="text-base" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>

          {/* SETTINGS */}
          <div
            onClick={() => setOpenSettings(true)}
            className="p-2.5 bg-red-50 rounded-2xl text-red-400 cursor-pointer hover:bg-red-100 transition-colors"
          >
            <SlSettings className="text-base" />
          </div>

          {/* PROFILE */}
          <div className="flex items-center space-x-3 border-l border-gray-100 pl-4 ml-2">
            <span className="text-gray-600 text-sm dark:text-white">
              Hello, <b>Febby Fahrezy</b>
            </span>
            <img
              src="ree.jpeg"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-hijau ring-offset-1"
              alt="profile"
            />
          </div>
        </div>
      </div>

      {/* SEARCH MODAL */}
      {openSearch && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
             onClick={() => setOpenSearch(false)}>
          <div className="bg-white p-6 rounded-xl w-80 shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-3 font-semibold text-gray-700">Search</h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 p-2.5 w-full mb-3 rounded-xl outline-none text-sm focus:border-hijau"
              placeholder="Cari menu..."
              autoFocus
            />
            <div className="space-y-1">
              {filteredData.map((item) => (
                <div key={item.id} className="p-2.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-hijau cursor-pointer transition-colors">
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {openSettings && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
             onClick={() => setOpenSettings(false)}>
          <div className="bg-white p-6 rounded-xl w-80 shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            <h2 className="font-semibold mb-4 text-gray-700">Settings</h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2.5 rounded-xl w-full text-sm text-gray-700 font-medium"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}