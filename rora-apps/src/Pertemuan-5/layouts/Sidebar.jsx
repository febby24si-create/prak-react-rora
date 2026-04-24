import { useState } from "react";
import { MdDashboard, MdShoppingCart, MdPeople } from "react-icons/md";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const menuClass = (menu) =>
    `flex items-center cursor-pointer rounded-xl p-4 transition
    ${
      active === menu
        ? "bg-green-200 text-hijau font-bold"
        : "text-gray-600 hover:bg-green-100 hover:text-hijau"
    }`;

  return (
    <div className="flex min-h-screen w-80 flex-col bg-white p-6 shadow-lg">
      {/* Logo */}
      <div className="flex flex-col mb-10">
        <span className="font-poppins text-4xl text-gray-900">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="text-gray-400 font-semibold">
          Modern Admin Dashboard
        </span>
      </div>

      {/* Menu */}
      <ul className="space-y-3">
        <li
          onClick={() => setActive("dashboard")}
          className={menuClass("dashboard")}
        >
          <MdDashboard className="mr-4 text-xl" />
          Dashboard
        </li>

        <li
          onClick={() => setActive("orders")}
          className={menuClass("orders")}
        >
          <MdShoppingCart className="mr-4 text-xl" />
          Orders
        </li>

        <li
          onClick={() => setActive("customers")}
          className={menuClass("customers")}
        >
          <MdPeople className="mr-4 text-xl" />
          Customers
        </li>
      </ul>

      {/* Footer */}
      <div className="mt-auto">
        <div className="bg-hijau text-white p-4 rounded-lg shadow mb-6">
          <p className="text-sm">
            Please organize your menus through button below!
          </p>
          <button className="bg-white text-gray-600 w-full mt-3 p-2 rounded">
            Add Menus
          </button>
        </div>

        <p className="text-gray-400 text-sm font-bold">
          Sedap Restaurant Admin
        </p>
        <p className="text-gray-400 text-xs">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}