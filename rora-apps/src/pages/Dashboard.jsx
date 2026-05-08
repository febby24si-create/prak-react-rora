import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import PageHeader from "../components/PageHeader";

/* =========================
   ANIMATION VARIANTS
========================= */
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

/* =========================
   DONUT CHART
========================= */
function DonutChart({
  value,
  color,
  track = "#f1f5f9",
  size = 100,
  sw = 10,
}) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <svg
      width={size}
      height={size}
      style={{
        transform: "rotate(-90deg)",
        display: "block",
      }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={track}
        strokeWidth={sw}
      />

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
        transition={{ duration: 1 }}
      />
    </svg>
  );
}

/* =========================
   AREA CHART
========================= */
function AreaChart({ data }) {
  const W = 460;
  const H = 155;

  const pad = {
    t: 16,
    r: 12,
    b: 26,
    l: 28,
  };

  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;

  const max = Math.max(...data.map((d) => d.v)) * 1.12;

  const xs = data.map(
    (_, i) => pad.l + (i / (data.length - 1)) * iw
  );

  const ys = data.map(
    (d) => pad.t + ih - (d.v / max) * ih
  );

  const linePath = xs
    .map((x, i) =>
      `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[
        i
      ].toFixed(1)}`
    )
    .join(" ");

  const areaPath = `${linePath} 
    L${xs[xs.length - 1].toFixed(1)},${(
    pad.t + ih
  ).toFixed(1)} 
    L${pad.l},${(pad.t + ih).toFixed(1)} Z`;

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <defs>
        <linearGradient
          id="areaGrad"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#3b82f6"
            stopOpacity="0.2"
          />
          <stop
            offset="100%"
            stopColor="#3b82f6"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      <motion.path
        d={areaPath}
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.path
        d={linePath}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.4 }}
      />
    </motion.svg>
  );
}

/* =========================
   TREND ICONS
========================= */
function TrendUp() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrendDown() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

/* =========================
   DATA
========================= */
const stats = [
  {
    Icon: FaShoppingCart,
    value: "75",
    label: "Total Orders",
    trend: "+4% (30 days)",
    up: true,
    iconBg: "bg-hijau",
  },
  {
    Icon: FaTruck,
    value: "357",
    label: "Total Delivered",
    trend: "+4% (30 days)",
    up: true,
    iconBg: "bg-biru",
  },
  {
    Icon: FaBan,
    value: "65",
    label: "Total Canceled",
    trend: "-25% (30 days)",
    up: false,
    iconBg: "bg-merah",
  },
  {
    Icon: FaDollarSign,
    value: "$128",
    label: "Total Revenue",
    trend: "+25% (30 days)",
    up: true,
    iconBg: "bg-kuning",
  },
];

const donuts = [
  {
    label: "Total Order",
    value: 81,
    color: "#ef4444",
    track: "#fecaca",
  },
  {
    label: "Customer Growth",
    value: 22,
    color: "#00b074",
    track: "#bbf7d0",
  },
  {
    label: "Total Revenue",
    value: 62,
    color: "#3b82f6",
    track: "#bfdbfe",
  },
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
   DASHBOARD
========================= */
export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader />

      {/* =========================
          STAT CARDS
      ========================= */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-4 gap-4"
      >
        {stats.map(
          ({
            Icon,
            value,
            label,
            trend,
            up,
            iconBg,
          }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
              className="
                bg-white rounded-2xl p-4
                flex items-center gap-3.5
                border border-gray-100
                shadow-[0_1px_8px_rgba(0,0,0,0.06)]
              "
            >
              <motion.div
                whileHover={{ rotate: 8 }}
                className={`
                  w-[52px] h-[52px]
                  rounded-2xl ${iconBg}
                  flex items-center justify-center
                `}
              >
                <Icon className="text-white text-[22px]" />
              </motion.div>

              <div>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                  }}
                  className="
                    text-[22px]
                    font-extrabold
                    text-gray-800
                  "
                >
                  {value}
                </motion.p>

                <p className="text-[11px] text-gray-400 mt-1">
                  {label}
                </p>

                <div
                  className={`
                    flex items-center gap-1
                    text-[10px] font-semibold mt-1
                    ${
                      up
                        ? "text-hijau"
                        : "text-merah"
                    }
                  `}
                >
                  {up ? <TrendUp /> : <TrendDown />}
                  {trend}
                </div>
              </div>
            </motion.div>
          )
        )}
      </motion.div>

      {/* =========================
          CHART SECTION
      ========================= */}
      <div className="grid grid-cols-1 2xl:grid-cols-[0.95fr_1.35fr] gap-6">

        {/* DONUT CARD */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="
            bg-white rounded-[28px] p-6
            border border-gray-100
            shadow-[0_6px_24px_rgba(0,0,0,0.05)]
          "
        >
          <div className="mb-8">
            <p className="text-[13px] font-semibold text-hijau mb-1">
              Dashboard Analytics
            </p>

            <h2 className="text-[24px] font-extrabold text-gray-800">
              Revenue Overview
            </h2>

            <p className="text-[12px] text-gray-400 mt-2">
              Summary report from this month
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {donuts.map(
              ({ label, value, color, track }) => (
                <motion.div
                  key={label}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                  }}
                  viewport={{ once: true }}
                  className="
                    bg-gray-50
                    border border-gray-100
                    rounded-3xl
                    p-5
                    flex flex-col items-center
                  "
                >
                  <div className="relative mb-4">
                    <DonutChart
                      value={value}
                      color={color}
                      track={track}
                      size={118}
                      sw={11}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.p
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                        }}
                        className="
                          text-[24px]
                          font-extrabold
                          text-gray-800
                        "
                      >
                        {value}%
                      </motion.p>
                    </div>
                  </div>

                  <p className="text-[14px] font-bold text-gray-700">
                    {label}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* AREA CHART */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="
            bg-white rounded-[28px] p-6
            border border-gray-100
            shadow-[0_6px_24px_rgba(0,0,0,0.05)]
          "
        >
          <div className="mb-7">
            <p className="text-[13px] font-semibold text-blue-500 mb-1">
              Performance Report
            </p>

            <h2 className="text-[24px] font-extrabold text-gray-800">
              Order Statistics
            </h2>
          </div>

          {/* MINI STATS */}
          <div className="grid grid-cols-3 gap-4 mb-7">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                }}
                className="
                  rounded-3xl p-4
                  bg-gray-50
                  border border-gray-100
                "
              >
                <p className="text-[11px] text-gray-500">
                  Total Orders
                </p>

                <h3 className="text-[24px] font-extrabold text-gray-800 mt-2">
                  2,456
                </h3>

                <div className="flex items-center gap-1 mt-2 text-hijau text-[11px] font-bold">
                  <TrendUp />
                  +12.5%
                </div>
              </motion.div>
            ))}
          </div>

          {/* CHART */}
          <div
            className="
              bg-gray-50 rounded-3xl
              border border-gray-100
              p-5
            "
            style={{ height: 290 }}
          >
            <AreaChart data={areaData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}