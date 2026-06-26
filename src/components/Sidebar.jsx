import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdInventory,
  MdShoppingCart,
  MdPeople,
  MdErrorOutline,
  MdWarning,
  MdWidgets,
  MdPerson,
  MdAssignment,
} from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";

const adminItems = [
  { icon: MdDashboard, label: "Dashboard", path: "/" },
  { icon: MdInventory, label: "Products", path: "/products" },
  { icon: MdShoppingCart, label: "Order List", path: "/orders" },
  { icon: MdPeople, label: "Customers", path: "/customers" },
];

const memberItems = [
  { icon: MdPerson, label: "My Dashboard", path: "/member" },
  { icon: MdInventory, label: "Products", path: "/products" },
  { icon: MdAssignment, label: "My Orders", path: "/orders" },
];

const commonItems = [
  { icon: MdWidgets, label: "Fitur XYZ", path: "/fitur-xyz" },
  { icon: MdWidgets, label: "Notes", path: "/notes" },
  { icon: MdWidgets, label: "Components", path: "/components" },
  { icon: MdErrorOutline, label: "Error 400", path: "/error-400" },
  { icon: MdWarning, label: "Error 401", path: "/error-401" },
  { icon: MdErrorOutline, label: "Error 403", path: "/error-403" },
];

export default function Sidebar() {
  const { isAdmin, isMember } = useAuth();

  const menuClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl mb-0.5 text-[13px] font-medium transition-all duration-150 border-l-[3px] ${
      isActive
        ? "bg-green-50 text-hijau font-bold border-hijau"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-transparent"
    }`;

  const items = isAdmin ? adminItems : isMember ? memberItems : [];
  const avatarLabel = isAdmin ? "A" : "M";

  return (
    <aside className="flex flex-col min-h-screen w-[240px] bg-white shadow-[2px_0_16px_rgba(0,0,0,0.04)] flex-shrink-0 z-10">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-baseline">
          <span className="text-[28px] font-extrabold text-gray-800 tracking-tight">
            Sedap
          </span>
          <span className="text-[32px] font-black text-hijau leading-none">
            .
          </span>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium tracking-wide">
          {isAdmin ? "Admin Dashboard" : "Member Area"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {/* Main Menu */}
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mb-2">
          {isAdmin ? "Main Menu" : "Member Menu"}
        </p>
        {items.map(({ icon: Icon, label, path }) => (
          <NavLink key={label} to={path} className={menuClass}>
            <Icon className="text-[17px] flex-shrink-0" />
            {label}
          </NavLink>
        ))}

        {/* Learning */}
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mt-4 mb-2">
          Learning
        </p>
        {commonItems.slice(0, 1).map(({ icon: Icon, label, path }) => (
          <NavLink key={label} to={path} className={menuClass}>
            <Icon className="text-[17px] flex-shrink-0" />
            {label}
            <span className="ml-auto text-[9px] font-bold bg-hijau text-white px-1.5 py-0.5 rounded-full">
              P10
            </span>
          </NavLink>
        ))}

        {/* Other Pages */}
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mt-4 mb-2">
          Other
        </p>
        {commonItems.slice(1).map(({ icon: Icon, label, path }) => (
          <NavLink key={label} to={path} className={menuClass}>
            <Icon className="text-[17px] flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Promo Banner */}
      <div className="px-3 pb-5">
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, #00b074 0%, #009060 100%)",
          }}
        >
          <div className="flex-1">

            <div className="bg-white rounded-lg py-1.5 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-[11px] font-bold text-gray-700">
                + Add Menus
              </span>
            </div>
          </div>
          <div className="w-[52px] h-[52px] rounded-full flex-shrink-0 bg-white/95 text-hijau font-black flex items-center justify-center ring-2 ring-white/40">
            {avatarLabel}
          </div>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-3 leading-relaxed">
          Sedap Restaurant Admin Dashboard
          <br />© 2025 All Right Reserved
        </p>
      </div>
    </aside>
  );
}
