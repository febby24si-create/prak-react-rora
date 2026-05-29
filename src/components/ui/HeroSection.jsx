/**
 * HeroSection — Banner hero di atas halaman
 * Props:
 *  title    : string
 *  subtitle : string
 *  badge    : string
 *  actions  : ReactNode
 *  stats    : [{ label, value }]
 *  gradient : boolean
 */

export default function HeroSection({
  title = "Selamat Datang di Sedap.",
  subtitle = "Dashboard manajemen restoran modern dengan komponen React yang reusable dan terstruktur.",
  badge = "✨ Pertemuan 10 — React Components",
  actions,
  stats = [],
  gradient = true,
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl px-8 py-10
        ${gradient
          ? "bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400"
          : "bg-white border border-gray-100"}
      `}
    >
      {/* Background decoration */}
      {gradient && (
        <>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none" />
        </>
      )}

      <div className="relative z-10">
        {/* Badge */}
        {badge && (
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4
            ${gradient ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}
          >
            {badge}
          </div>
        )}

        {/* Title & Subtitle */}
        <h1 className={`text-3xl font-black leading-tight mb-2 ${gradient ? "text-white" : "text-gray-800"}`}>
          {title}
        </h1>
        <p className={`text-sm leading-relaxed max-w-lg ${gradient ? "text-white/80" : "text-gray-500"}`}>
          {subtitle}
        </p>

        {/* Actions */}
        {actions && (
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {actions}
          </div>
        )}

        {/* Stats row */}
        {stats.length > 0 && (
          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/20">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <p className={`text-2xl font-black ${gradient ? "text-white" : "text-gray-800"}`}>{value}</p>
                <p className={`text-xs mt-0.5 ${gradient ? "text-white/70" : "text-gray-400"}`}>{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}