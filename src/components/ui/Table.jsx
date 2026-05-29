/**
 * Table — Tabel data dengan sorting & zebra stripe
 * Props:
 *  columns  : [{ key, label, render?, align? }]
 *  data     : array of objects
 *  striped  : boolean
 *  bordered : boolean
 *  loading  : boolean
 *  emptyText: string
 */

export default function Table({
  columns = [],
  data = [],
  striped = true,
  bordered = false,
  loading = false,
  emptyText = "Tidak ada data",
  className = "",
}) {
  const alignClass = (align) => {
    if (align === "center") return "text-center";
    if (align === "right")  return "text-right";
    return "text-left";
  };

  return (
    <div className={`w-full overflow-x-auto rounded-xl ${bordered ? "border border-gray-200" : ""} ${className}`}>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-semibold text-gray-500 text-[11px] uppercase tracking-wider bg-gray-50/60 ${alignClass(col.align)}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <span className="text-sm">Memuat data...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center text-sm text-gray-400">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className={`
                  border-b border-gray-50 last:border-0
                  transition-colors duration-100 hover:bg-green-50/40
                  ${striped && idx % 2 === 1 ? "bg-gray-50/40" : "bg-white"}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-gray-700 ${alignClass(col.align)}`}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}