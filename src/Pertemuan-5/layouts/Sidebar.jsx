import { useState } from "react";
import {
  MdDashboard, MdShoppingCart, MdDescription, MdPeople,
  MdAnalytics, MdStar, MdFastfood, MdPerson, MdCalendarToday
} from "react-icons/md";

const menuItems = [
  { icon: MdDashboard, label: "Dashboard" },
  { icon: MdShoppingCart, label: "Order List" },
  { icon: MdDescription, label: "Order Detail" },
  { icon: MdPeople, label: "Customer" },
  { icon: MdAnalytics, label: "Analytics" },
  { icon: MdStar, label: "Reviews" },
  { icon: MdFastfood, label: "Foods" },
  { icon: MdDescription, label: "Food Detail" },
  { icon: MdPerson, label: "Customer Detail" },
  { icon: MdCalendarToday, label: "Calendar" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="flex flex-col min-h-screen w-[240px] bg-white shadow-[2px_0_16px_rgba(0,0,0,0.04)] flex-shrink-0 z-10">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-baseline">
          <span className="text-[28px] font-extrabold text-gray-800 tracking-tight">Sedap</span>
          <span className="text-[32px] font-black text-hijau leading-none">.</span>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium tracking-wide">Modern Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {menuItems.map(({ icon: Icon, label }) => {
          const isActive = active === label;
          return (
            <div
              key={label}
              onClick={() => setActive(label)}
              className={[
                "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl cursor-pointer mb-0.5",
                "text-[13px] font-medium transition-all duration-150 border-l-[3px]",
                isActive
                  ? "bg-green-50 text-hijau font-bold border-hijau"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-transparent",
              ].join(" ")}
            >
              <Icon className={`text-[17px] flex-shrink-0 ${isActive ? "text-hijau" : "text-gray-400"}`} />
              {label}
            </div>
          );
        })}
      </nav>

      {/* Promo Banner */}
      <div className="px-3 pb-5">
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, #00b074 0%, #009060 100%)" }}
        >
          <div className="flex-1">
            <p className="text-white/90 text-[11px] leading-relaxed mb-2.5">
              Please organize your menus through button below!
            </p>
            <div className="bg-white rounded-lg py-1.5 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-[11px] font-bold text-gray-700">+ Add Menus</span>
            </div>
          </div>
          <img src="https://avatar.iran.liara.run/public/28" className="w-[52px] h-[52px] rounded-full flex-shrink-0" />
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-3 leading-relaxed">
          Sedap Restaurant Admin Dashboard<br />© 2025 All Right Reserved
        </p>
      </div>
    </aside>
  );
}