import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUtensils,
  FaUsers,
  FaChartLine
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";

/* =========================
   ANIMATION VARIANTS
========================= */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

/* =========================
   DONUT CHART
========================= */
function DonutChart({ value, color, track = "#f1f5f9", size = 120, sw = 10 }) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)", display: "block" }}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={sw} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        initial={{ strokeDasharray: `0 ${circ}` }}
        whileInView={{ strokeDasharray: `${dash} ${circ}` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </svg>
  );
}

/* =========================
   AREA CHART (WITH LABELS)
========================= */
function AreaChart({ data }) {
  const W = 500;
  const H = 200;
  const pad = { t: 20, r: 20, b: 35, l: 35 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;

  const max = Math.max(...data.map((d) => d.v)) * 1.15;
  const xs = data.map((_, i) => pad.l + (i / (data.length - 1)) * iw);
  const ys = data.map((d) => pad.t + ih - (d.v / max) * ih);

  const linePath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${xs[xs.length - 1].toFixed(1)},${(pad.t + ih).toFixed(1)} L${pad.l},${(pad.t + ih).toFixed(1)} Z`;

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.00" />
        </linearGradient>
      </defs>

      {/* Grid Lines Horizontal */}
      {[0, 0.5, 1].map((p, idx) => (
        <line
          key={idx}
          x1={pad.l}
          y1={pad.t + ih * p}
          x2={W - pad.r}
          y2={pad.t + ih * p}
          stroke="#e2e8f0"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
      ))}

      {/* Area */}
      <motion.path
        d={areaPath}
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      />

      {/* Line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true }}
      />

      {/* Dots on Data Points */}
      {xs.map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={ys[i]}
          r="4"
          fill="#white"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
      ))}

      {/* X Axis Labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={xs[i]}
          y={H - 10}
          textAnchor="middle"
          className="text-[11px] fill-gray-400 font-medium"
        >
          {d.day}
        </text>
      ))}
    </motion.svg>
  );
}

function TrendUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrendDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

/* =========================
   FIXED MOCK DATA
========================= */
const stats = [
  { Icon: FaShoppingCart, value: "75", label: "Total Orders", trend: "+4% (30d)", up: true, iconBg: "bg-emerald-500", textBg: "text-emerald-500" },
  { Icon: FaTruck, value: "357", label: "Total Delivered", trend: "+12% (30d)", up: true, iconBg: "bg-blue-500", textBg: "text-blue-500" },
  { Icon: FaBan, value: "65", label: "Total Canceled", trend: "-25% (30d)", up: false, iconBg: "bg-rose-500", textBg: "text-rose-500" },
  { Icon: FaDollarSign, value: "$12,840", label: "Total Revenue", trend: "+25% (30d)", up: true, iconBg: "bg-amber-500", textBg: "text-amber-500" },
];

const donuts = [
  { label: "Total Order", value: 81, color: "#f43f5e", track: "#ffe4e6" },
  { label: "Customer Growth", value: 22, color: "#10b981", track: "#d1fae5" },
  { label: "Total Revenue", value: 62, color: "#3b82f6", track: "#dbeafe" },
];

const miniStats = [
  { label: "Monthly Target", value: "2,456", trend: "+12.5%", icon: FaChartLine, color: "text-emerald-500" },
  { label: "Active Customers", value: "1,280", trend: "+8.3%", icon: FaUsers, color: "text-blue-500" },
  { label: "Menu Items", value: "48 Dishes", trend: "0.0%", icon: FaUtensils, color: "text-amber-500" },
];

const areaData = [
  { day: "Sun", v: 200 },
  { day: "Mon", v: 300 },
  { day: "Tue", v: 260 },
  { day: "Wed", v: 456 },
  { day: "Thu", v: 380 },
  { day: "Fri", v: 420 },
  { day: "Sat", v: 350 },
];

/* =========================
   MAIN DASHBOARD COMPONENT
========================= */
export default function Dashboard() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader />

      {/* =========================
          STAT CARDS (RESPONSIVE)
      ========================= */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map(({ Icon, value, label, trend, up, iconBg, textBg }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)" }}
            className="bg-white rounded-2xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm"
          >
            <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shadow-md shadow-gray-100 shrink-0`}>
              <Icon className="text-white text-2xl" />
            </div>

            <div className="overflow-hidden">
              <p className="text-2xl font-black text-gray-800 tracking-tight">{value}</p>
              <p className="text-xs font-medium text-gray-400 mt-0.5 truncate">{label}</p>
              <div className={`flex items-center gap-1 text-[11px] font-bold mt-1.5 ${up ? "text-emerald-500" : "text-rose-500"}`}>
                {up ? <TrendUp /> : <TrendDown />}
                <span>{trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* =========================
          CHART SECTION (RESPONSIVE)
      ========================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[1fr_1.3fr] gap-6">
        
        {/* REVENUE OVERVIEW (DONUT CARD) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between"
        >
          <div className="mb-6">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Analytics Center</span>
            <h2 className="text-xl font-extrabold text-gray-800 mt-0.5">Revenue Overview</h2>
            <p className="text-xs text-gray-400 mt-1">Summary performance metrics for this active month</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {donuts.map(({ label, value, color, track }) => (
              <motion.div
                key={label}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                className="bg-gray-50 border border-gray-100/70 rounded-2xl p-4 flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-3 flex items-center justify-center">
                  <DonutChart value={value} color={color} track={track} size={100} sw={10} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-lg font-black text-gray-800">{value}%</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-600 truncate w-full">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ORDER STATISTICS (AREA CHART CARD) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm"
        >
          <div className="mb-5">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Performance Report</span>
            <h2 className="text-xl font-extrabold text-gray-800 mt-0.5">Order Statistics</h2>
          </div>

          {/* DYNAMIC MINI STATS */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {miniStats.map(({ label, value, trend, icon: MiniIcon, color }) => (
              <div key={label} className="rounded-2xl p-3.5 bg-gray-50 border border-gray-100/70 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[11px] font-medium text-gray-400 truncate">{label}</p>
                  <MiniIcon className={`text-xs ${color} shrink-0`} />
                </div>
                <h3 className="text-lg font-black text-gray-800 mt-1.5 tracking-tight">{value}</h3>
                <div className="flex items-center gap-0.5 mt-1 text-emerald-500 text-[10px] font-bold">
                  <TrendUp />
                  <span>{trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* GRAPH WRAPPER */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100/70 p-4 h-[200px] flex items-center justify-center">
            <AreaChart data={areaData} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}