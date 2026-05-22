import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaSearch,
  FaComments,
  FaGift,
} from "react-icons/fa";
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
        setOpenNotif(false);
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () =>
      document.removeEventListener("keydown", handleEsc);
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
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="
          flex justify-between items-center
          px-6 py-3
          bg-white dark:bg-gray-800
          rounded-2xl
          shadow-[0_2px_12px_rgba(0,0,0,0.05)]
          mb-4
        "
      >
        {/* SEARCH */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Search Here..."
            onClick={() => setOpenSearch(true)}
            className="
              border border-gray-200
              bg-gray-50
              p-2.5 pr-10
              w-full rounded-xl
              outline-none text-sm
              dark:bg-gray-700
              dark:text-white
              focus:border-hijau
              transition-all duration-200
              focus:shadow-lg focus:shadow-green-100
            "
          />

          <FaSearch
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              text-gray-400 text-sm
            "
          />
        </motion.div>

        {/* RIGHT */}
        <div className="flex items-center space-x-2">

          {/* BELL */}
          <div className="relative">
            <motion.div
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenNotif(!openNotif)}
              className="
                relative p-2.5
                bg-blue-50
                rounded-2xl
                text-blue-500
                cursor-pointer
                hover:bg-blue-100
                transition-all
              "
            >
              <FaBell className="text-base" />

              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
                className="
                  absolute top-1.5 right-1.5
                  w-2 h-2
                  bg-blue-500
                  rounded-full
                  border-2 border-white
                "
              />
            </motion.div>

            <AnimatePresence>
              {openNotif && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                  }}
                  transition={{ duration: 0.2 }}
                  className="
                    absolute right-0 mt-2
                    w-64
                    bg-white
                    shadow-2xl
                    rounded-2xl
                    p-4
                    text-sm
                    z-50
                    border border-gray-100
                  "
                >
                  <p className="font-bold mb-3 text-gray-700">
                    Notifications
                  </p>

                  <div className="space-y-2 text-gray-600">
                    <motion.p
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span>🛒</span>
                      Order baru masuk
                    </motion.p>

                    <motion.p
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span>🚚</span>
                      Pesanan dikirim
                    </motion.p>

                    <motion.p
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span>💰</span>
                      Pembayaran diterima
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CHAT */}
          <motion.div
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              relative p-2.5
              bg-blue-50
              rounded-2xl
              text-blue-500
              cursor-pointer
              hover:bg-blue-100
              transition-all
            "
          >
            <FaComments className="text-base" />

            <span
              className="
                absolute top-1.5 right-1.5
                w-2 h-2
                bg-blue-500
                rounded-full
                border-2 border-white
              "
            />
          </motion.div>

          {/* GIFT */}
          <motion.div
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              relative p-2.5
              bg-blue-50
              rounded-2xl
              text-blue-500
              cursor-pointer
              hover:bg-blue-100
              transition-all
            "
          >
            <FaGift className="text-base" />

            <motion.span
              animate={{
                scale: [1, 1.25, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
              }}
              className="
                absolute top-1.5 right-1.5
                w-2 h-2
                bg-red-500
                rounded-full
                border-2 border-white
              "
            />
          </motion.div>

          {/* SETTINGS */}
          <motion.div
            whileHover={{
              rotate: 90,
              scale: 1.08,
            }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenSettings(true)}
            className="
              p-2.5
              bg-red-50
              rounded-2xl
              text-red-400
              cursor-pointer
              hover:bg-red-100
              transition-all
            "
          >
            <SlSettings className="text-base" />
          </motion.div>

          {/* PROFILE */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="
              flex items-center space-x-3
              border-l border-gray-100
              pl-4 ml-2
            "
          >
            <span className="text-gray-600 text-sm dark:text-white">
              Hello, <b>Febby Fahrezy</b>
            </span>

            <motion.img
              whileHover={{ rotate: 5 }}
              src="ree.jpeg"
              className="
                w-9 h-9
                rounded-full
                object-cover
                ring-2 ring-hijau ring-offset-1
              "
              alt="profile"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {openSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenSearch(false)}
            className="
              fixed inset-0
              bg-black/30 backdrop-blur-sm
              flex justify-center items-center
              z-50
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                bg-white
                p-6
                rounded-3xl
                w-80
                shadow-2xl
              "
            >
              <h2 className="mb-3 font-bold text-gray-700">
                Search Menu
              </h2>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  border border-gray-200
                  p-2.5 w-full mb-3
                  rounded-xl
                  outline-none text-sm
                  focus:border-hijau
                "
                placeholder="Cari menu..."
                autoFocus
              />

              <div className="space-y-1">
                {filteredData.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{
                      x: 5,
                      scale: 1.02,
                    }}
                    className="
                      p-2.5
                      bg-gray-50
                      rounded-xl
                      text-sm
                      text-gray-600
                      hover:bg-green-50
                      hover:text-hijau
                      cursor-pointer
                    "
                  >
                    {item.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SETTINGS MODAL */}
      <AnimatePresence>
        {openSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenSettings(false)}
            className="
              fixed inset-0
              bg-black/30 backdrop-blur-sm
              flex justify-center items-center
              z-50
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                bg-white
                p-6
                rounded-3xl
                w-80
                shadow-2xl
              "
            >
              <h2 className="font-bold mb-4 text-gray-700">
                Settings
              </h2>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setDarkMode(!darkMode)}
                className="
                  bg-gray-100
                  hover:bg-gray-200
                  px-4 py-3
                  rounded-2xl
                  w-full
                  text-sm
                  text-gray-700
                  font-semibold
                  transition-all
                "
              >
                {darkMode
                  ? "☀️ Light Mode"
                  : "🌙 Dark Mode"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}