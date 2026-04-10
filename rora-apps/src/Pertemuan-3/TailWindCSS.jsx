export default function TailWindCSS() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f0f9ff",
        backgroundImage: `radial-gradient(circle at 1px 1px, #bae6fd 1px, transparent 0)`,
        backgroundSize: "28px 28px",
      }}
    >
      <FlexboxGrid />
      <main className="max-w-3xl mx-auto px-5 py-8 flex flex-col gap-4">
        <Hero />
        <StatsRow />
        <Spacing />
        <Typography />
        <div className="grid grid-cols-2 gap-4">
          <BorderRadius />
          <BackgroundColors />
        </div>
        <ShadowEffects />
      </main>
    </div>
  );
}

function FlexboxGrid() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-cyan-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-cyan-200">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M4 12c1.5-5 4.5-7 7.5-7s6 2 6 5c0 2.5-1.8 4-4 4s-3.5-1.5-2.8-3.5c.4-1 1.5-1.6 2.5-1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M7 17c1.5-5 4.5-7 7.5-7"
              stroke="#A5F3FC"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-gray-900">RoraWebsite</div>
          <div className="text-xs text-cyan-400">Tailwind CSS 4</div>
        </div>
      </div>

      <ul className="flex items-center gap-1">
        {["Home", "About", "Contact"].map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-800 hover:bg-cyan-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            className="text-sm text-red-600 bg-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-cyan-100 rounded-2xl p-8 flex items-center justify-between gap-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-2">
          Framework CSS
        </p>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
          Belajar Tailwind CSS 4
        </h1>
        <p className="text-sm text-gray-400">
          Utility-first CSS framework untuk UI modern yang cepat.
        </p>
      </div>
      <button className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap shadow-md shadow-cyan-200">
        Mulai Belajar
      </button>
    </div>
  );
}

function StatsRow() {
  const stats = [
    { label: "Komponen", value: "6" },
    { label: "Utilities", value: "50+" },
    { label: "Versi", value: "4.0" },
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ label, value }) => (
        <div
          key={label}
          className="bg-white/70 backdrop-blur-sm border border-cyan-100 rounded-xl p-4 shadow-sm"
        >
          <p className="text-xs text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
      ))}
    </div>
  );
}

function Spacing() {
  return (
    <div className="bg-cyan-700 rounded-2xl px-8 py-6 flex items-center justify-between gap-6 shadow-lg shadow-cyan-200">
      <div>
        <p className="text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-2">
          Spacing
        </p>
        <h2 className="text-base font-semibold text-white mb-1">Card Title</h2>
        <p className="text-sm text-cyan-100">
          Contoh penggunaan padding dan margin di Tailwind.
        </p>
      </div>
      <div className="flex gap-2 flex-wrap justify-end">
        {["p-8", "m-10", "rounded-lg"].map((cls) => (
          <span
            key={cls}
            className="bg-white/15 text-white text-xs px-3 py-1 rounded-full"
          >
            {cls}
          </span>
        ))}
      </div>
    </div>
  );
}

function Typography() {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-cyan-100 rounded-2xl px-8 py-6 shadow-sm">
      <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">
        Typography
      </p>
      <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
        Tailwind Typography
      </h1>
      <p className="text-sm text-gray-500 mt-2 mb-4">
        Belajar Tailwind sangat menyenangkan dan cepat!
      </p>
      <div className="flex gap-2 flex-wrap">
        {["text-3xl", "font-extrabold", "text-gray-600"].map((cls) => (
          <code
            key={cls}
            className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-mono"
          >
            {cls}
          </code>
        ))}
      </div>
    </div>
  );
}

function BorderRadius() {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-cyan-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Border Radius
      </p>
      <button className="border-2 border-orange-400 text-orange-600 bg-transparent hover:bg-orange-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors w-full">
        Klik Saya
      </button>
      <div className="flex gap-2 flex-wrap">
        <code className="text-xs bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md font-mono">
          rounded-xl
        </code>
        <code className="text-xs bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md font-mono">
          border-2
        </code>
      </div>
    </div>
  );
}

function BackgroundColors() {
  const swatches = ["bg-blue-500", "bg-blue-400", "bg-blue-300", "bg-blue-200"];
  return (
    <div className="bg-blue-600 rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-blue-200">
      <div>
        <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-2">
          Background
        </p>
        <h3 className="text-base font-semibold text-white mb-1">
          Tailwind Colors
        </h3>
        <p className="text-sm text-blue-200">Seru dan fleksibel!</p>
      </div>
      <div className="flex gap-2 mt-4">
        {swatches.map((s) => (
          <div
            key={s}
            className={`w-5 h-5 rounded-full border-2 border-white/40 ${s}`}
          />
        ))}
      </div>
    </div>
  );
}

function ShadowEffects() {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-cyan-100 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-200 rounded-2xl px-8 py-5 flex items-center gap-6 transition-all duration-300 group shadow-sm">
      <div className="w-12 h-12 bg-cyan-50 group-hover:bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="4" stroke="#0891B2" strokeWidth="1.8" />
          <path
            d="M11 2v2M11 18v2M2 11h2M18 11h2M4.93 4.93l1.41 1.41M15.66 15.66l1.41 1.41M4.93 17.07l1.41-1.41M15.66 6.34l1.41-1.41"
            stroke="#0891B2"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-800 mb-1">
          Shadow Effects
        </h3>
        <p className="text-sm text-gray-400">
          Hover untuk lihat efek bayangan dengan{" "}
          <code className="text-xs bg-gray-100 text-cyan-700 px-1.5 py-0.5 rounded font-mono">
            transition
          </code>{" "}
          yang halus.
        </p>
      </div>

      <div className="flex flex-col gap-1.5 items-end">
        <code className="text-xs bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-md font-mono">
          shadow-lg
        </code>
        <code className="text-xs bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-md font-mono">
          hover:shadow-cyan-200
        </code>
      </div>
    </div>
  );
}