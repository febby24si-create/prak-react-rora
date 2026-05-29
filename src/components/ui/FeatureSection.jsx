/**
 * FeatureSection — Grid fitur/keunggulan
 * Props:
 *  title    : string
 *  subtitle : string
 *  features : [{ icon, title, description, color }]
 *  cols     : 2 | 3 | 4
 */

const colsClass = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export default function FeatureSection({
  title = "Kenapa Pakai Component?",
  subtitle = "Komponen React yang reusable mempercepat pengembangan, menjaga konsistensi UI, dan memudahkan pemeliharaan kode.",
  features = [],
  cols = 3,
}) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{subtitle}</p>
      </div>

      {/* Feature Grid */}
      <div className={`grid ${colsClass[cols] ?? colsClass[3]} gap-4`}>
        {features.map(({ icon, title: ftitle, description, color = "emerald" }) => (
          <div
            key={ftitle}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl bg-${color}-100 flex items-center justify-center mb-4 text-lg`}>
              {icon}
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">{ftitle}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}