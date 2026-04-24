import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <div className="p-5 space-y-5">
      <PageHeader />

      {/* CARD GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Orders */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-hijau rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">75</h2>
            <p className="text-gray-400">Total Orders</p>
          </div>
        </div>

        {/* Delivered */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-biru rounded-full p-4">
            <FaTruck className="text-3xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">175</h2>
            <p className="text-gray-400">Delivered</p>
          </div>
        </div>

        {/* Canceled */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-merah rounded-full p-4">
            <FaBan className="text-3xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">40</h2>
            <p className="text-gray-400">Canceled</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-kuning rounded-full p-4">
            <FaDollarSign className="text-3xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Rp 128K</h2>
            <p className="text-gray-400">Revenue</p>
          </div>
        </div>
      </div>

      {/* IMPROVISASI 1: Tambahan Card */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-biru p-4 rounded-full">
            <FaUsers className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">120</h2>
            <p className="text-gray-400">Total Customers</p>
          </div>
        </div>

        {/* IMPROVISASI 2: Customer Review */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold mb-3">Customer Review</h2>

          <div className="flex items-center space-x-4 mb-3">
            <img
              src="https://i.pravatar.cc/50?img=1"
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">Andi</p>
              <p className="text-sm text-gray-400">
                Makanannya enak banget!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src="https://i.pravatar.cc/50?img=2"
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">Budi</p>
              <p className="text-sm text-gray-400">
                Pelayanan cepat 👍
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}