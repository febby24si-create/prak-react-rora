import { useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaStar, FaRegStar } from "react-icons/fa";
import { FiMoreVertical, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import PageHeader from "../components/PageHeader";

// ---- Custom SVG Donut ----
function DonutChart({ value, color, track = "#f1f5f9", size = 100, sw = 10 }) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", display: "block" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={sw} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
      />
    </svg>
  );
}

// ---- Custom SVG Area Chart ----
function AreaChart({ data }) {
  const W = 460, H = 155;
  const pad = { t: 16, r: 12, b: 26, l: 28 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const max = Math.max(...data.map(d => d.v)) * 1.12;
  const xs = data.map((_, i) => pad.l + (i / (data.length - 1)) * iw);
  const ys = data.map(d => pad.t + ih - (d.v / max) * ih);
  const linePath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${xs[xs.length - 1].toFixed(1)},${(pad.t + ih).toFixed(1)} L${pad.l},${(pad.t + ih).toFixed(1)} Z`;
  const peakIdx = data.reduce((bi, d, i) => d.v > data[bi].v ? i : bi, 0);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[0.25, 0.5, 0.75, 1].map(t => (
        <line key={t}
          x1={pad.l} x2={W - pad.r}
          y1={pad.t + ih * (1 - t)} y2={pad.t + ih * (1 - t)}
          stroke="#f1f5f9" strokeWidth="1"
        />
      ))}
      <path d={areaPath} fill="url(#areaGrad)" />
      <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {data.map((d, i) => (
        <circle key={i} cx={xs[i]} cy={ys[i]}
          r={i === peakIdx ? 5 : 3}
          fill={i === peakIdx ? "#3b82f6" : "#fff"}
          stroke="#3b82f6" strokeWidth="2"
        />
      ))}
      {/* Peak tooltip */}
      <g>
        <rect
          x={xs[peakIdx] - 46} y={ys[peakIdx] - 40}
          width={92} height={30} rx={8} fill="#1e293b"
        />
        <polygon
          points={`${xs[peakIdx] - 5},${ys[peakIdx] - 10} ${xs[peakIdx] + 5},${ys[peakIdx] - 10} ${xs[peakIdx]},${ys[peakIdx] - 4}`}
          fill="#1e293b"
        />
        <text x={xs[peakIdx]} y={ys[peakIdx] - 24} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
          {data[peakIdx].v} Order
        </text>
        <text x={xs[peakIdx]} y={ys[peakIdx] - 14} textAnchor="middle" fill="#94a3b8" fontSize="9">
          {data[peakIdx].label}
        </text>
      </g>
      {/* X labels */}
      {data.map((d, i) => (
        <text key={i} x={xs[i]} y={H - 4} textAnchor="middle" fill="#9ca3af" fontSize="9.5">{d.day}</text>
      ))}
    </svg>
  );
}

// ---- Trend Icon ----
function TrendUp() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}
function TrendDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
      <polyline points="17 18 23 18 23 12"/>
    </svg>
  );
}

// ---- Data ----
const stats = [
  {
    Icon: FaShoppingCart,
    value: "75", label: "Total Orders",
    trend: "+4% (30 days)", up: true,
    iconBg: "bg-hijau",
  },
  {
    Icon: FaTruck,
    value: "357", label: "Total Delivered",
    trend: "+4% (30 days)", up: true,
    iconBg: "bg-biru",
  },
  {
    Icon: FaBan,
    value: "65", label: "Total Canceled",
    trend: "-25% (30 days)", up: false,
    iconBg: "bg-merah",
  },
  {
    Icon: FaDollarSign,
    value: "$128", label: "Total Revenue",
    trend: "+25% (30 days)", up: true,
    iconBg: "bg-kuning",
  },
];

const donuts = [
  { label: "Total Order", value: 81, color: "#ef4444", track: "#fecaca" },
  { label: "Customer Growth", value: 22, color: "#00b074", track: "#bbf7d0" },
  { label: "Total Revenue", value: 62, color: "#3b82f6", track: "#bfdbfe" },
];

const areaData = [
  { day: "Sunday", v: 200, label: "Oct 16th, 2020" },
  { day: "Monday", v: 300, label: "Oct 17th" },
  { day: "Tuesday", v: 260, label: "Oct 18th" },
  { day: "Wednesday", v: 456, label: "Oct 19th, 2020" },
  { day: "Thursday", v: 380, label: "Oct 20th" },
  { day: "Friday", v: 420, label: "Oct 21st" },
  { day: "Saturday", v: 350, label: "Oct 22nd" },
];

// ---- Star Rating ----
function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i =>
        i <= Math.round(value)
          ? <FaStar key={i} className="text-kuning text-[11px]" />
          : <FaRegStar key={i} className="text-gray-300 text-[11px]" />
      )}
    </div>
  );
}

// ---- Action Menu ----
function ActionMenu({ open, onToggle }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors border-none bg-transparent cursor-pointer"
      >
        <FiMoreVertical size={14} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 w-36 bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-gray-100 py-1.5 z-50">
          {[
            { icon: <FiEye size={12} />, label: "View Detail", color: "text-gray-600" },
            { icon: <FiEdit2 size={12} />, label: "Edit Product", color: "text-blue-500" },
            { icon: <FiTrash2 size={12} />, label: "Delete", color: "text-red-500" },
          ].map(({ icon, label, color }) => (
            <div key={label} className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 text-[12px] font-medium ${color}`}>
              {icon} {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Recent Products Data ----
const recentProducts = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    category: "Main Course",
    img: "https://images.unsplash.com/photo-1723219939613-a36ddbab82ab?w=56&h=56&fit=crop",
    price: "Rp 45.000",
    stock: 120,
    sold: 98,
    rating: 4.8,
    status: "Available",
  },
  {
    id: 2,
    name: "Ayam Bakar Madu",
    category: "Main Course",
    img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=56&h=56&fit=crop",
    price: "Rp 55.000",
    stock: 80,
    sold: 74,
    rating: 4.6,
    status: "Available",
  },
  {
    id: 3,
    name: "Es Teh Manis",
    category: "Beverage",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=56&h=56&fit=crop",
    price: "Rp 12.000",
    stock: 0,
    sold: 203,
    rating: 4.9,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Mie Ayam Bakso",
    category: "Main Course",
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=56&h=56&fit=crop",
    price: "Rp 35.000",
    stock: 45,
    sold: 61,
    rating: 4.5,
    status: "Available",
  },
  {
    id: 5,
    name: "Kopi Susu Kekinian",
    category: "Beverage",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=56&h=56&fit=crop",
    price: "Rp 28.000",
    stock: 30,
    sold: 155,
    rating: 4.7,
    status: "Available",
  },
  {
    id: 6,
    name: "Sate Ayam Madura",
    category: "Snack",
    img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=56&h=56&fit=crop",
    price: "Rp 32.000",
    stock: 15,
    sold: 42,
    rating: 4.3,
    status: "Low Stock",
  },
];

const statusStyles = {
  "Available":    { bg: "bg-green-50",  text: "text-hijau",  dot: "bg-hijau" },
  "Out of Stock": { bg: "bg-red-50",    text: "text-merah",  dot: "bg-merah" },
  "Low Stock":    { bg: "bg-yellow-50", text: "text-kuning", dot: "bg-kuning" },
};

// ---- Recent Products Table ----
function RecentProducts() {
  const [openMenu, setOpenMenu] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Main Course", "Beverage", "Snack"];
  const filtered = filter === "All" ? recentProducts : recentProducts.filter(p => p.category === filter);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-bold text-[15px] text-gray-800 leading-none">Recent Products</h2>
          <p className="text-[11px] text-gray-400 mt-1">Showing {filtered.length} of {recentProducts.length} products</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Category filter tabs */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={[
                  "px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 border-none cursor-pointer",
                  filter === cat
                    ? "bg-white text-hijau shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                    : "text-gray-500 bg-transparent hover:text-gray-700",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-[11px] font-bold text-hijau border border-hijau rounded-xl px-3 py-1.5 hover:bg-green-50 transition-colors cursor-pointer bg-transparent ml-1">
            + Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/60">
              {["Product", "Category", "Price", "Stock", "Sold", "Rating", "Status", "Action"].map(h => (
                <th key={h} className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => {
              const st = statusStyles[p.status];
              const stockPct = p.stock > 0 ? Math.min((p.stock / 150) * 100, 100) : 0;
              return (
                <tr
                  key={p.id}
                  className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  onClick={() => setOpenMenu(null)}
                >
                  {/* Product */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                        style={{ border: "1.5px solid #f3f4f6" }}
                        onError={e => { e.target.src = `https://avatar.iran.liara.run/public/${p.id + 20}`; }}
                      />
                      <div>
                        <p className="text-[13px] font-semibold text-gray-800 leading-none whitespace-nowrap">{p.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">#{String(p.id).padStart(4, "0")}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3.5">
                    <span className="text-[12px] text-gray-500 font-medium">{p.category}</span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] font-bold text-gray-800">{p.price}</span>
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-1 w-20">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-gray-700">{p.stock}</span>
                        <span className="text-[10px] text-gray-400">{stockPct.toFixed(0)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${stockPct}%`,
                            background: stockPct === 0 ? "#ef4444" : stockPct < 20 ? "#f59e0b" : "#00b074",
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Sold */}
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] font-semibold text-gray-700">{p.sold}</span>
                    <span className="text-[10px] text-gray-400 ml-1">units</span>
                  </td>

                  {/* Rating */}
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <StarRating value={p.rating} />
                      <span className="text-[10px] text-gray-400 font-medium">{p.rating.toFixed(1)}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${st.bg} ${st.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {p.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                    <ActionMenu
                      open={openMenu === p.id}
                      onToggle={() => setOpenMenu(openMenu === p.id ? null : p.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
        <p className="text-[12px] text-gray-400">Showing 1–{filtered.length} of {recentProducts.length} results</p>
        <div className="flex items-center gap-1">
          {["←", "1", "2", "3", "→"].map((p, i) => (
            <button
              key={i}
              className={[
                "w-7 h-7 rounded-lg text-[12px] font-semibold border-none cursor-pointer transition-colors",
                p === "1" ? "bg-hijau text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Component ----
export default function Dashboard() {
  return (
    <div className="space-y-5">
      <PageHeader />

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(({ Icon, value, label, trend, up, iconBg }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-4 flex items-center gap-3.5 border border-gray-100
                       shadow-[0_1px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]
                       hover:-translate-y-0.5 transition-all duration-200 cursor-default"
          >
            <div className={`w-[52px] h-[52px] rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className="text-[22px] text-white" />
            </div>
            <div>
              <p className="text-[22px] font-extrabold text-gray-800 leading-none tracking-tight">{value}</p>
              <p className="text-[11px] text-gray-400 mt-1 mb-1.5 font-medium">{label}</p>
              <div className={`flex items-center gap-1 text-[10px] font-semibold ${up ? "text-hijau" : "text-merah"}`}>
                {up ? <TrendUp /> : <TrendDown />}
                {trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-[1fr_1.45fr] gap-4">

        {/* Pie / Donut */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-5">
            <span className="font-bold text-[15px] text-gray-800">Pie Chart</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-[12px] text-gray-500">
                <input type="checkbox" defaultChecked className="accent-hijau" />
                Chart
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-[12px] text-gray-500">
                <span className="w-3 h-3 rounded-[3px] bg-merah inline-block" />
                Show Value
              </label>
              <span className="text-gray-400 text-[18px] cursor-pointer leading-none select-none">⋯</span>
            </div>
          </div>

          <div className="flex justify-around items-center py-1">
            {donuts.map(({ label, value, color, track }) => (
              <div key={label} className="flex flex-col items-center gap-2.5">
                <div className="relative" style={{ width: 100, height: 100 }}>
                  <DonutChart value={value} color={color} track={track} size={100} sw={10} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[17px] font-extrabold text-gray-800">{value}%</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 font-semibold text-center">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-bold text-[15px] text-gray-800 leading-none">Chart Order</p>
              <p className="text-[11px] text-gray-400 mt-1.5">Lorem ipsum dolor sit amet, consectetur adip</p>
            </div>
            <button className="flex items-center gap-1.5 text-[11px] font-bold text-hijau border border-hijau rounded-xl px-3 py-1.5 hover:bg-green-50 transition-colors cursor-pointer bg-transparent">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Save Report
            </button>
          </div>
          <div style={{ height: 168 }}>
            <AreaChart data={areaData} />
          </div>
        </div>

      </div>

      {/* Recent Products */}
      <RecentProducts />

    </div>
  );
}