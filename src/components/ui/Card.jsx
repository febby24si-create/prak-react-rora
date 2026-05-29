/**
 * Card — Container konten dengan shadow & border
 * Props:
 *  title   : string
 *  subtitle: string
 *  action  : ReactNode (tombol/link di header kanan)
 *  padded  : boolean
 *  hover   : boolean (efek hover)
 *  className
 *  children
 */

export default function Card({
  children,
  title,
  subtitle,
  action,
  padded = true,
  hover = false,
  className = "",
}) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-gray-100 shadow-sm
        ${hover ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-gray-100/80" : ""}
        ${className}
      `}
    >
      {/* Card Header */}
      {(title || action) && (
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-50">
          <div>
            {title && (
              <h3 className="text-[15px] font-bold text-gray-800">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0 ml-3">{action}</div>}
        </div>
      )}

      {/* Card Body */}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </div>
  );
}

/**
 * CardStat — Stat number card kecil
 */
export function CardStat({ label, value, icon, trend, trendUp, iconBg = "bg-gray-100" }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xl font-black text-gray-800 leading-tight">{value}</p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{label}</p>
        {trend && (
          <p className={`text-[11px] font-bold mt-1 ${trendUp ? "text-emerald-500" : "text-rose-500"}`}>
            {trendUp ? "▲" : "▼"} {trend}
          </p>
        )}
      </div>
    </div>
  );
}