/**
 * CardStat — Card ringkasan angka dengan ikon, label, dan trend
 * Props:
 *  label    : string
 *  value    : string | number
 *  trend    : string
 *  trendUp  : boolean
 *  icon     : ReactNode
 *  iconBg   : string (Tailwind bg class)
 */

export default function CardStat({
  label = "",
  value = "",
  trend = "",
  trendUp = true,
  icon,
  iconBg = "bg-gray-100",
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-gray-400">{label}</p>
        {icon && (
          <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-extrabold text-gray-800 tracking-tight">{value}</p>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trendUp ? "text-emerald-500" : "text-rose-500"}`}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {trendUp ? (
              <>
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </>
            ) : (
              <>
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
              </>
            )}
          </svg>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}
